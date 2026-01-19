'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getOpenStatus } from '@/lib/cafes';
import type { Cafe } from '@/lib/types';

interface CafeCardProps {
  cafe: Cafe;
  priority?: boolean;
}

export function CafeCard({ cafe, priority = false }: CafeCardProps) {
  const openStatus = getOpenStatus(cafe.hours.open, cafe.hours.close);

  return (
    <Link href={`/cafe/${cafe.slug}`} className="block group">
      <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 p-3">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={cafe.gallery[0] || '/images/placeholder-cafe.jpg'}
            alt={cafe.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
          <div className="absolute top-2 left-2 flex gap-1.5">
            {cafe.trending && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium backdrop-blur-md bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                Trending
              </span>
            )}
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium backdrop-blur-md ${
              openStatus.isOpen
                ? 'bg-emerald-500/90 text-white'
                : 'bg-gray-800/80 text-white'
            }`}>
              {openStatus.isOpen ? 'Open' : 'Closed'}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium backdrop-blur-md bg-white/90 text-gray-700">
              {cafe.wifi.downloadMbps} Mbps
            </span>
          </div>
        </div>

        <div className="pt-3 px-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white leading-tight">
                {cafe.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{cafe.area}</p>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
              ${cafe.minPriceUsd.toFixed(2)}
            </span>
          </div>

          <p className={`text-xs mb-3 ${openStatus.isOpen ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
            {openStatus.label}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span>{cafe.tags[0]}</span>
              {cafe.tags.length > 1 && (
                <span>+{cafe.tags.length - 1} more</span>
              )}
            </div>
            <span className="text-sm font-medium text-violet-600 dark:text-violet-400 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">
              View details →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
