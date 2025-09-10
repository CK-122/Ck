'use client';

import Image from 'next/image';

interface PreloaderProps {
  isVisible: boolean;
}

export function Preloader({ isVisible }: PreloaderProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative">
        <div className="absolute -inset-4 animate-ping rounded-full bg-primary/20"></div>
        <div className="relative animate-pulse">
          <Image
            src="/logo.png"
            alt="CK High School Logo"
            width={100}
            height={100}
            className="animate-bounce"
          />
        </div>
        <div className="mt-4 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground font-medium">Loading CK High School...</p>
        </div>
      </div>
    </div>
  );
}