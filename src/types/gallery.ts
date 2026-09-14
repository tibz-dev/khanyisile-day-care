export type GalleryPhoto = {
  id: string;
  src: string;
  thumbnail: string;
  alt: string;
  width: number;
  height: number;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  cover: string;
  photoCount: number;
  photos: GalleryPhoto[];
};

export type GalleryData = {
  albums: GalleryAlbum[];
};