'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Cafe } from '@/lib/types';
import { getOpenStatus } from '@/lib/cafes';

interface CafeMapViewProps {
  cafes: Cafe[];
}

export function CafeMapView({ cafes }: CafeMapViewProps) {
  const [MapComponent, setMapComponent] = useState<React.ComponentType<{ cafes: Cafe[] }> | null>(null);

  useEffect(() => {
    import('./MapContent').then((mod) => {
      setMapComponent(() => mod.MapContent);
    });
  }, []);

  if (!MapComponent) {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="h-[350px] sm:h-[450px] lg:h-[500px] flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto mb-3"></div>
            <p className="text-sm text-gray-500">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return <MapComponent cafes={cafes} />;
}
