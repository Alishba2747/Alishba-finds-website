import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasTriedFallback, setHasTriedFallback] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasTriedFallback(false);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (!hasTriedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setHasTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div
        className={`bg-[#EAEBEA] flex flex-col items-center justify-center p-6 text-[#777D79] border border-[#D3D6D3] ${className}`}
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-full bg-[#D8E6E4] flex items-center justify-center mb-2">
          <ShoppingBag className="w-5 h-5 text-[#355C4D]" />
        </div>
        <span className="font-editorial text-sm font-medium text-[#272B29] tracking-wider uppercase">
          Alishba Finds
        </span>
        <span className="text-[10px] text-[#777D79] mt-0.5 tracking-wide text-center line-clamp-1 max-w-[200px]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-90'}`}
      onLoad={() => setIsLoaded(true)}
      onError={handleError}
      loading="lazy"
      decoding="async"
      crossOrigin="anonymous"
      {...props}
    />
  );
};
