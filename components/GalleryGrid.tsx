'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from './Lightbox';

interface GalleryGridProps {
  images: string[];
  cafeName: string;
}

export function GalleryGrid({ images, cafeName }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Skip first image as it's shown in hero
  const galleryImages = images.slice(1);

  if (galleryImages.length === 0) {
    return null;
  }

  const handleImageClick = (index: number) => {
    setCurrentIndex(index + 1); // +1 because we skipped the first image
    setLightboxOpen(true);
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-100 dark:border-stone-800">
      <h2 className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-4">
        Gallery
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {galleryImages.map((image, index) => (
          <button
            key={image}
            onClick={() => handleImageClick(index)}
            className="relative aspect-square rounded-xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
          >
            <Image
              src={image}
              alt={`${cafeName} - Photo ${index + 2}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
        cafeName={cafeName}
      />
    </div>
  );
}
