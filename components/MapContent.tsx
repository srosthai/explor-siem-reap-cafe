'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';
import type { Cafe } from '@/lib/types';
import { getOpenStatus } from '@/lib/cafes';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with webpack
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapContentProps {
  cafes: Cafe[];
  isFullScreen?: boolean;
}

export function MapContent({ cafes, isFullScreen = false }: MapContentProps) {
  // Center on Siem Reap
  const center: [number, number] = [13.3561, 103.8570];

  const mapHeightClass = isFullScreen
    ? 'h-screen w-screen'
    : 'h-[350px] sm:h-[450px] lg:h-[500px]';

  const containerClass = isFullScreen
    ? ''
    : 'bg-paper dark:bg-ink-soft rounded-xl border border-ink/8 dark:border-paper/10 overflow-hidden';

  const mapClass = isFullScreen
    ? mapHeightClass
    : `rounded-xl ${mapHeightClass} w-full`;

  return (
    <div className={containerClass}>
      <MapContainer
        center={center}
        zoom={14}
        className={mapClass}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cafes.map((cafe) => {
          const openStatus = getOpenStatus(cafe.hours.open, cafe.hours.close);
          return (
            <Marker
              key={cafe.slug}
              position={[cafe.coordinates.lat, cafe.coordinates.lng]}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-semibold text-ink mb-1">{cafe.name}</h3>
                  <p className="text-sm text-ink/55 mb-2">{cafe.area}</p>
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <span className={`px-2 py-0.5 rounded font-medium ${
                      openStatus.isOpen
                        ? 'bg-palm-soft text-palm-deep'
                        : 'bg-ink/5 text-ink/55'
                    }`}>
                      {openStatus.isOpen ? 'Open' : 'Closed'}
                    </span>
                    <span className="text-ink/55">{cafe.wifi.downloadMbps} Mbps</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">${cafe.minPriceUsd.toFixed(2)}</span>
                    <Link
                      href={`/cafe/${cafe.slug}`}
                      className="text-sm font-medium text-palm hover:text-palm-deep"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
