import { useEffect, useRef, useState } from 'react';
import GalleryImage from '../components/GalleryImage';
import PhotoViewer from '../components/PhotoViewer';
import type { GalleryAlbum, GalleryData } from '../types/gallery';

function Gallery() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [requestNumber, setRequestNumber] = useState(0);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  const albumHeadingRef = useRef<HTMLHeadingElement>(null);
  const albumButtonsRef = useRef(new Map<string, HTMLButtonElement>());

  const selectedAlbum =
    albums.find((album) => album.id === selectedAlbumId) ?? null;

  useEffect(() => {
    const controller = new AbortController();

    async function loadAlbums() {
      try {
        const response = await fetch('/gallery/albums.json', {
          signal: controller.signal,
          cache: 'no-cache',
        });

        if (!response.ok) {
          throw new Error('Unable to load gallery.');
        }

        const data: GalleryData = await response.json();

        if (!Array.isArray(data.albums)) {
          throw new Error('Invalid gallery data.');
        }

        if (!controller.signal.aborted) {
          setAlbums(data.albums.filter((album) => album.photos.length > 0));
        }
      } catch {
        if (!controller.signal.aborted) {
          setHasError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadAlbums();

    return () => controller.abort();
  }, [requestNumber]);

  useEffect(() => {
    if (selectedAlbumId) {
      albumHeadingRef.current?.focus();
    }
  }, [selectedAlbumId]);

  function returnToAlbums() {
    const previousAlbumId = selectedAlbumId;

    setSelectedAlbumId(null);
    setPhotoIndex(null);

    requestAnimationFrame(() => {
      if (previousAlbumId) {
        albumButtonsRef.current.get(previousAlbumId)?.focus();
      }
    });
  }

  function retryLoading() {
    setHasError(false);
    setIsLoading(true);
    setRequestNumber((previous) => previous + 1);
  }

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="scroll-mt-36 bg-white py-14 sm:py-20"
    >
      <div className="page-container">
        <p className="text-sm font-semibold tracking-widest text-maroon uppercase">
          Our moments
        </p>

        <h2
          id="gallery-title"
          className="mt-4 text-3xl font-bold text-maroon sm:text-4xl lg:text-5xl"
        >
          Little moments. Big memories.
        </h2>

        <p className="mt-5 max-w-2xl">
          Explore the celebrations, discoveries, and everyday moments that make our
          community special.
        </p>

        {isLoading && (
          <div className="mt-8" role="status">
            <span className="sr-only">Loading photo albums</span>

            <div
              aria-hidden="true"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-maroon/10"
                >
                  <div className="aspect-[4/3] bg-coral/30 motion-safe:animate-pulse" />

                  <div className="space-y-3 p-5">
                    <div className="h-6 w-3/4 rounded bg-cream" />
                    <div className="h-4 w-1/3 rounded bg-cream" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && hasError && (
          <div className="surface-card mt-8">
            <p role="alert">
              We couldn’t load the photos right now. Please try again.
            </p>

            <button
              type="button"
              onClick={retryLoading}
              className="button button-primary mt-5"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !hasError && albums.length === 0 && (
          <p className="mt-8 rounded-2xl bg-cream p-6">
            New memories are on their way. Check back soon for our photos.
          </p>
        )}

        {!isLoading && !hasError && !selectedAlbum && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <button
                key={album.id}
                ref={(element) => {
                  if (element) {
                    albumButtonsRef.current.set(album.id, element);
                  } else {
                    albumButtonsRef.current.delete(album.id);
                  }
                }}
                type="button"
                onClick={() => setSelectedAlbumId(album.id)}
                aria-label={`Open ${album.title}, ${album.photos.length} ${
                  album.photos.length === 1 ? 'photo' : 'photos'
                }`}
                className="group overflow-hidden rounded-2xl border border-maroon/10 bg-cream text-left hover:border-maroon"
              >
                <GalleryImage
                  key={album.cover}
                  src={album.cover}
                  alt=""
                  className="aspect-[4/3]"
                />

                <div className="p-5">
                  <h3 className="text-2xl font-bold text-maroon group-hover:underline">
                    {album.title}
                  </h3>

                  <p className="mt-2 text-sm">
                    {album.photos.length}{' '}
                    {album.photos.length === 1 ? 'photo' : 'photos'}
                  </p>

                  <span className="mt-4 inline-block text-sm font-semibold text-maroon">
                    View album →
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {selectedAlbum && (
          <div className="mt-8">
            <button
              type="button"
              onClick={returnToAlbums}
              className="button button-outline"
            >
              ← All Albums
            </button>

            <h3
              ref={albumHeadingRef}
              tabIndex={-1}
              className="mt-6 rounded text-2xl font-bold text-maroon sm:text-3xl"
            >
              {selectedAlbum.title}
            </h3>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {selectedAlbum.photos.map((photo, index) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setPhotoIndex(index)}
                  aria-label={`Enlarge ${photo.alt}`}
                  aria-haspopup="dialog"
                  className="overflow-hidden rounded-xl border border-maroon/10 hover:border-maroon"
                >
                  <GalleryImage
                    src={photo.thumbnail}
                    alt=""
                    className="aspect-square"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedAlbum && photoIndex !== null && (
          <PhotoViewer
            albumTitle={selectedAlbum.title}
            photos={selectedAlbum.photos}
            index={photoIndex}
            onChange={setPhotoIndex}
            onClose={() => setPhotoIndex(null)}
          />
        )}
      </div>
    </section>
  );
}

export default Gallery;