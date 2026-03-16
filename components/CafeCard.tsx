'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getOpenStatus, getWifiSpeedLabel } from '@/lib/cafes';
import type { Cafe } from '@/lib/types';

interface CafeCardProps {
  cafe: Cafe;
  priority?: boolean;
}

export function CafeCard({ cafe, priority = false }: CafeCardProps) {
  const openStatus = getOpenStatus(cafe.hours.open, cafe.hours.close);
  const wifiInfo = getWifiSpeedLabel(cafe.wifi.downloadMbps);

  return (
    <Link href={`/cafe/${cafe.slug}`} className="block group">
      <article className="card-hover bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-150 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700 transition-colors">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={cafe.gallery[0] || '/images/placeholder-cafe.jpg'}
            alt={cafe.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
          {/* Subtle gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Trending badge — only if trending */}
          {cafe.trending && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white shadow-lg shadow-amber-500/25">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                Trending
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="font-semibold text-stone-900 dark:text-stone-50 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
              {cafe.name}
            </h3>
            <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 whitespace-nowrap tabular-nums">
              ${cafe.minPriceUsd.toFixed(2)}
            </span>
          </div>

          {/* Area + status */}
          <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-3">
            <span>{cafe.area}</span>
            <span className="text-stone-300 dark:text-stone-600">·</span>
            <span className={openStatus.isOpen ? 'text-emerald-600 dark:text-emerald-400' : ''}>
              {openStatus.isOpen ? 'Open now' : openStatus.label}
            </span>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
            {/* Wi-Fi speed */}
            <div className="flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0" />
              </svg>
              <span className={
                cafe.wifi.downloadMbps >= 80
                  ? 'text-purple-600 dark:text-purple-400 font-semibold'
                  : cafe.wifi.downloadMbps >= 30
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : cafe.wifi.downloadMbps >= 10
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-red-500 dark:text-red-400'
              }>
                {cafe.wifi.downloadMbps} Mbps
              </span>
            </div>

            <span className="text-stone-300 dark:text-stone-700">·</span>

            {/* First tag */}
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {cafe.tags[0]}
            </span>

            {cafe.tags.length > 1 && (
              <>
                <span className="text-stone-300 dark:text-stone-700">·</span>
                <span className="text-xs text-stone-400 dark:text-stone-500">
                  +{cafe.tags.length - 1}
                </span>
              </>
            )}

            {/* Arrow */}
            <svg className="w-4 h-4 ml-auto text-stone-300 dark:text-stone-600 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
