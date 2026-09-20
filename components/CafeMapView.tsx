'use client';

import { useEffect, useState } from 'react';
import type { Cafe } from '@/lib/types';

interface CafeMapViewProps {
  cafes: Cafe[];
}

export function CafeMapView({ cafes }: CafeMapViewProps) {
  const [MapComponent, setMapComponent] = useState<React.ComponentType<{ cafes: Cafe[]; isFullScreen?: boolean }> | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    import('./MapContent').then((mod) => {
      setMapComponent(() => mod.MapContent);
    });
  }, []);

  // Prevent body scroll when full-screen map is open
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullScreen]);

  const loadingHeightClass = 'h-[350px] sm:h-[450px] lg:h-[500px]';

  if (!MapComponent) {
    return (
      <div className="bg-paper dark:bg-ink-soft rounded-xl border border-ink/8 dark:border-paper/10 overflow-hidden relative">
        <div className={`${loadingHeightClass} flex items-center justify-center bg-paper-soft dark:bg-ink`}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-palm mx-auto mb-3"></div>
            <p className="text-sm text-ink/55 dark:text-paper/55">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Regular map view */}
      <div className="relative">
        <MapComponent cafes={cafes} isFullScreen={false} />

        {/* Full-screen button - visible on mobile */}
        <button
          onClick={() => setIsFullScreen(true)}
          className="absolute bottom-4 right-4 sm:hidden flex items-center gap-2 px-3 py-2 bg-paper dark:bg-ink-soft rounded-lg shadow-lg border border-ink/12 dark:border-paper/15 text-sm font-medium text-ink/70 dark:text-paper/70 hover:bg-paper-soft dark:hover:bg-ink transition-colors z-[1000]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          Full Screen
        </button>
      </div>

      {/* Full-screen modal overlay */}
      {isFullScreen && (
        <div className="fixed inset-0 z-[9999] bg-paper dark:bg-ink-soft">
          {/* Close button */}
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-4 right-4 z-[10000] flex items-center gap-2 px-3 py-2 bg-paper dark:bg-ink-soft rounded-lg shadow-lg border border-ink/12 dark:border-paper/15 text-sm font-medium text-ink/70 dark:text-paper/70 hover:bg-paper-soft dark:hover:bg-ink transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>

          {/* Cafe count badge */}
          <div className="absolute top-4 left-4 z-[10000] px-3 py-2 bg-paper dark:bg-ink-soft rounded-lg shadow-lg border border-ink/12 dark:border-paper/15">
            <span className="text-sm font-medium text-ink/70 dark:text-paper/70">
              {cafes.length} cafe{cafes.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Full-screen map */}
          <MapComponent cafes={cafes} isFullScreen={true} />
        </div>
      )}
    </>
  );
}
