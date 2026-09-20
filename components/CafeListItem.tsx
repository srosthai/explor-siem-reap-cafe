'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getOpenStatus } from '@/lib/cafes';
import { WifiSignal } from './ui/WifiSignal';
import type { Cafe } from '@/lib/types';

interface CafeListItemProps {
  cafe: Cafe;
}

export function CafeListItem({ cafe }: CafeListItemProps) {
  const openStatus = getOpenStatus(cafe.hours.open, cafe.hours.close);

  return (
    <Link href={`/cafe/${cafe.slug}`} className="block group">
      <article className="bg-paper dark:bg-ink-soft rounded-xl border border-ink/8 dark:border-paper/10 hover:border-palm/40 dark:hover:border-palm/40 transition-all duration-200 flex p-2.5 group-hover:shadow-md group-hover:shadow-ink/5">
        <div className="relative w-28 sm:w-36 flex-shrink-0 rounded-lg overflow-hidden">
          <div className="aspect-[4/3] relative">
            <Image
              src={cafe.gallery[0] || '/images/placeholder-cafe.jpg'}
              alt={cafe.name}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
          {cafe.trending && (
            <div className="absolute top-1.5 left-1.5">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-clay text-paper">
                Trending
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 pl-3 pr-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-ink dark:text-paper truncate group-hover:text-palm dark:group-hover:text-palm transition-colors">
                  {cafe.name}
                </h3>
                <p className="text-sm text-ink/55 dark:text-paper/55">{cafe.area}</p>
              </div>
              <span className="text-sm font-semibold text-ink dark:text-paper whitespace-nowrap tabular-nums">
                ${cafe.minPriceUsd.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-2 text-sm text-ink/55 dark:text-paper/55">
              <WifiSignal mbps={cafe.wifi.downloadMbps} />
              <span className="text-ink/20 dark:text-paper/20">/</span>
              <span className="hidden sm:inline truncate">{cafe.tags[0]}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2.5">
            <span className={`text-xs ${openStatus.isOpen ? 'text-palm font-medium' : 'text-ink/40 dark:text-paper/40'}`}>
              {openStatus.isOpen ? 'Open now' : openStatus.label}
            </span>
            <svg className="w-4 h-4 text-ink/25 dark:text-paper/25 group-hover:text-palm group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
