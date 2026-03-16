'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getOpenStatus } from '@/lib/cafes';
import type { Cafe } from '@/lib/types';

interface CafeListItemProps {
  cafe: Cafe;
}

export function CafeListItem({ cafe }: CafeListItemProps) {
  const openStatus = getOpenStatus(cafe.hours.open, cafe.hours.close);

  return (
    <Link href={`/cafe/${cafe.slug}`} className="block group">
      <article className="bg-white dark:bg-stone-900 rounded-xl border border-stone-150 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700 transition-all duration-200 flex p-2.5 group-hover:shadow-md group-hover:shadow-stone-900/5">
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
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500 text-white">
                Trending
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 pl-3 pr-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-stone-900 dark:text-stone-50 truncate group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                  {cafe.name}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">{cafe.area}</p>
              </div>
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 whitespace-nowrap tabular-nums">
                ${cafe.minPriceUsd.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-2 text-sm text-stone-500 dark:text-stone-400">
              <span className={
                cafe.wifi.downloadMbps >= 80
                  ? 'text-purple-600 dark:text-purple-400 font-medium'
                  : cafe.wifi.downloadMbps >= 30
                    ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                    : cafe.wifi.downloadMbps >= 10
                      ? 'text-amber-600 dark:text-amber-400 font-medium'
                      : 'text-red-500 dark:text-red-400 font-medium'
              }>
                {cafe.wifi.downloadMbps} Mbps
              </span>
              <span className="text-stone-300 dark:text-stone-700">·</span>
              <span className="hidden sm:inline">{cafe.tags[0]}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2.5">
            <span className={`text-xs ${openStatus.isOpen ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400 dark:text-stone-500'}`}>
              {openStatus.isOpen ? 'Open now' : openStatus.label}
            </span>
            <svg className="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
