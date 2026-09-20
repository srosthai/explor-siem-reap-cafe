'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getOpenStatus } from '@/lib/cafes';
import { WifiSignal } from './ui/WifiSignal';
import type { Cafe } from '@/lib/types';

interface CafeCardProps {
  cafe: Cafe;
  priority?: boolean;
}

export function CafeCard({ cafe, priority = false }: CafeCardProps) {
  const openStatus = getOpenStatus(cafe.hours.open, cafe.hours.close);

  return (
    <Link href={`/cafe/${cafe.slug}`} className="block group">
      <article className="card-hover bg-paper dark:bg-ink-soft rounded-xl overflow-hidden border border-ink/8 dark:border-paper/10 hover:border-palm/40 dark:hover:border-palm/40 transition-colors">
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
          <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />

          {/* Trending badge — only if trending */}
          {cafe.trending && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-clay text-paper shadow-lg shadow-clay/30">
                Trending
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-sm sm:text-base font-semibold text-ink dark:text-paper leading-snug truncate group-hover:text-palm dark:group-hover:text-palm transition-colors">
              {cafe.name}
            </h3>
            <span className="text-xs sm:text-sm font-semibold text-ink dark:text-paper whitespace-nowrap tabular-nums">
              ${cafe.minPriceUsd.toFixed(2)}
            </span>
          </div>

          {/* Area + status */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-ink/55 dark:text-paper/55 mb-3 truncate">
            <span className="truncate">{cafe.area}</span>
            {openStatus.isOpen && (
              <>
                <span className="text-ink/20 dark:text-paper/20 hidden sm:inline">/</span>
                <span className="text-palm dark:text-palm font-medium hidden sm:inline">Open now</span>
              </>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-2 sm:gap-3 pt-3 border-t border-ink/8 dark:border-paper/10">
            <WifiSignal mbps={cafe.wifi.downloadMbps} className="text-xs" />

            {/* First tag — hidden on the tight mobile 2-col layout */}
            <span className="text-ink/20 dark:text-paper/20 hidden sm:inline">/</span>
            <span className="text-xs text-ink/55 dark:text-paper/55 truncate hidden sm:inline">
              {cafe.tags[0]}
            </span>

            {/* Arrow */}
            <svg className="w-4 h-4 ml-auto text-ink/25 dark:text-paper/25 group-hover:text-palm group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
