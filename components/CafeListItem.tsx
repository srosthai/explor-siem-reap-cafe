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
      <article className="bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex p-2.5">
        <div className="relative w-28 sm:w-40 flex-shrink-0 rounded-lg overflow-hidden">
          <div className="aspect-[4/3]">
            <Image
              src={cafe.gallery[0] || '/images/placeholder-cafe.jpg'}
              alt={cafe.name}
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
        </div>

        <div className="flex-1 pl-3 pr-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {cafe.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{cafe.area}</p>
              </div>
              <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium ${
                openStatus.isOpen
                  ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}>
                {openStatus.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>

            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{cafe.wifi.downloadMbps} Mbps</span>
              <span>${cafe.minPriceUsd.toFixed(2)}</span>
              <span className="hidden sm:inline">{cafe.tags[0]}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <p className={`text-xs ${openStatus.isOpen ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
              {openStatus.label}
            </p>
            <span className="text-sm font-medium text-violet-600 dark:text-violet-400 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">
              View →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
