import { mkdir, mkdtemp, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleAuth } from 'google-auth-library';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const publicDirectory = path.join(projectRoot, 'public');
const outputDirectory = path.join(publicDirectory, 'gallery');

const folderMimeType = 'application/vnd.google-apps.folder';
const supportedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maximumFileSize = 25 * 1024 * 1024;

function validateId(id) {
  if (!id || !/^[a-zA-Z0-9_-]+$/.test(id)) {
    throw new Error('A valid Google Drive file or folder ID is required.');
  }

  return id;
}

async function listChildren(client, parentId) {
  validateId(parentId);

  const files = [];
  let pageToken;

  do {
    const response = await client.request({
      url: 'https://www.googleapis.com/drive/v3/files',
      params: {
        q: `'${parentId}' in parents and trashed = false`,
        fields: 'nextPageToken,incompleteSearch,files(id,name,mimeType,size)',
        pageSize: 100,
        pageToken,
        orderBy: 'name_natural',
      },
      timeout: 60000,
    });

    if (response.data.incompleteSearch) {
      throw new Error('Drive returned incomplete results. Please retry the sync.');
    }

    files.push(...(response.data.files ?? []));
    pageToken = response.data.nextPageToken;
  } while (pageToken);

  return files;
}

async function preparePhoto(client, file, album, index, stagingDirectory) {
  validateId(file.id);

  if (Number(file.size ?? 0) > maximumFileSize) {
    throw new Error(`Photo exceeds the 25 MB limit: ${file.name}`);
  }

  const response = await client.request({
    url: `https://www.googleapis.com/drive/v3/files/${file.id}`,
    params: { alt: 'media' },
    responseType: 'arraybuffer',
    timeout: 120000,
  });

  const source = Buffer.from(response.data);

  if (source.length > maximumFileSize) {
    throw new Error(`Photo exceeds the 25 MB limit: ${file.name}`);
  }

  const filename = `${file.id}.webp`;
  const thumbnailFilename = `${file.id}-thumb.webp`;

  const image = sharp(source, {
    limitInputPixels: 60000000,
  }).rotate();

  const fullImage = await image
    .clone()
    .resize({
      width: 1600,
      height: 1600,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toFile(path.join(stagingDirectory, album.id, filename));

  await image
    .clone()
    .resize({
      width: 600,
      height: 600,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 78 })
    .toFile(path.join(stagingDirectory, album.id, thumbnailFilename));

  return {
    id: file.id,
    src: `/gallery/${album.id}/${filename}`,
    thumbnail: `/gallery/${album.id}/${thumbnailFilename}`,
    alt: `${album.name} — photo ${index + 1}`,
    width: fullImage.width,
    height: fullImage.height,
  };
}

async function syncGallery() {
  const rootFolderId = validateId(process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID);

  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!credentialsJson && !credentialsPath) {
    throw new Error('Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS.');
  }

  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    ...(credentialsJson
      ? { credentials: JSON.parse(credentialsJson) }
      : { keyFilename: credentialsPath }),
  });

  const client = await auth.getClient();

  console.log('Checking access to the gallery folder...');

  const rootResponse = await client.request({
    url: `https://www.googleapis.com/drive/v3/files/${rootFolderId}`,
    params: { fields: 'id,name,mimeType,trashed' },
    timeout: 60000,
  });

  if (rootResponse.data.mimeType !== folderMimeType || rootResponse.data.trashed) {
    throw new Error('The gallery root must be an existing Drive folder.');
  }

  const children = await listChildren(client, rootFolderId);
  const albumFolders = children.filter((file) => file.mimeType === folderMimeType);

  await mkdir(publicDirectory, { recursive: true });

  const stagingDirectory = await mkdtemp(path.join(projectRoot, '.gallery-sync-'));

  try {
    const albums = [];
    let totalPhotos = 0;

    for (const album of albumFolders) {
      validateId(album.id);
      console.log(`Reading album: ${album.name}`);

      const albumFiles = await listChildren(client, album.id);
      const photoFiles = albumFiles.filter((file) => supportedTypes.has(file.mimeType));

      for (const file of albumFiles) {
        if (!supportedTypes.has(file.mimeType)) {
          console.log(`Skipping unsupported file or nested folder: ${file.name}`);
        }
      }

      if (photoFiles.length === 0) {
        console.log('No supported photos yet; this album will remain hidden.');
        continue;
      }

      await mkdir(path.join(stagingDirectory, album.id), { recursive: true });

      const photos = [];

      for (const [index, file] of photoFiles.entries()) {
        console.log(`Preparing photo ${index + 1}/${photoFiles.length}: ${file.name}`);

        const photo = await preparePhoto(client, file, album, index, stagingDirectory);

        photos.push(photo);
      }

      albums.push({
        id: album.id,
        title: album.name,
        cover: photos[0].thumbnail,
        photoCount: photos.length,
        photos,
      });

      totalPhotos += photos.length;
    }

    await writeFile(
      path.join(stagingDirectory, 'albums.json'),
      `${JSON.stringify({ albums }, null, 2)}\n`,
      'utf8',
    );

    // Replace generated output only after every album has processed successfully.
    await rm(outputDirectory, { recursive: true, force: true });
    await rename(stagingDirectory, outputDirectory);

    console.log(`Gallery ready: ${albums.length} albums, ${totalPhotos} photos.`);
  } finally {
    await rm(stagingDirectory, { recursive: true, force: true });
  }
}

syncGallery().catch((error) => {
  const status = error.response?.status;

  if (status === 401 || status === 403) {
    console.error(
      'Drive access failed. Check the credentials, enabled Drive API, and folder Viewer permission.',
    );
  } else if (status === 404) {
    console.error('Drive could not find a folder or photo. Check its ID and sharing permissions.');
  } else if (error.response || error.config) {
    console.error(`Drive request failed${status ? ` (${status})` : ''}. Retry the sync.`);
  } else {
    console.error(`Gallery sync failed: ${error.message}`);
  }

  process.exitCode = 1;
});
