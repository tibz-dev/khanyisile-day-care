import { useState } from 'react';

type GalleryImageProps = {
  src: string;
  alt: string;
  className?: string;
};

function GalleryImage({
  src,
  alt,
  className = '',
}: GalleryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-cream ${className}`}>
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-coral/30 motion-safe:animate-pulse"
        />
      )}

      {hasError ? (
        <div
          role="img"
          aria-label={`${alt} — image unavailable`}
          className="flex h-full items-center justify-center p-4 text-center text-sm text-charcoal"
        >
          Photo unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}

export default GalleryImage;