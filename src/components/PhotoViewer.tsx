import { useEffect, useRef } from 'react';
import type { GalleryPhoto } from '../types/gallery';

type PhotoViewerProps = {
  albumTitle: string;
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

function PhotoViewer({
  albumTitle,
  photos,
  index,
  onClose,
  onChange,
}: PhotoViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photo = photos[index];

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    dialog.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;

      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, []);

  function showPrevious() {
    onChange((index - 1 + photos.length) % photos.length);
  }

  function showNext() {
    onChange((index + 1) % photos.length);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="photo-viewer-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          showPrevious();
        }

        if (event.key === 'ArrowRight') {
          event.preventDefault();
          showNext();
        }
      }}
      className="fixed inset-0 m-auto max-h-[95dvh] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto rounded-2xl border-0 bg-cream p-4 text-charcoal shadow-xl backdrop:bg-black/80 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h3
          id="photo-viewer-title"
          className="text-xl font-bold text-maroon sm:text-2xl"
        >
          {albumTitle}
        </h3>

        <button
          type="button"
          onClick={onClose}
          className="button button-outline shrink-0 px-4 py-2"
        >
          Close
        </button>
      </div>

      <div className="mt-4 flex h-[55dvh] items-center justify-center rounded-xl bg-white sm:h-[65dvh]">
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={showPrevious}
          disabled={photos.length < 2}
          aria-label="Previous photo"
          className="button button-outline px-4 py-2"
        >
          Previous
        </button>

        <p role="status" aria-live="polite" className="text-sm">
          {index + 1} / {photos.length}
        </p>

        <button
          type="button"
          onClick={showNext}
          disabled={photos.length < 2}
          aria-label="Next photo"
          className="button button-outline px-4 py-2"
        >
          Next
        </button>
      </div>
    </dialog>
  );
}

export default PhotoViewer;