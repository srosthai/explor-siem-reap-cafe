'use client';

import { formatTime, getOpenStatus } from '@/lib/cafes';
import type { Cafe } from '@/lib/types';

interface StatPillsProps {
  cafe: Cafe;
}

export function StatPills({ cafe }: StatPillsProps) {
  const openStatus = getOpenStatus(cafe.hours.open, cafe.hours.close);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Hours</div>
          <div className={`text-sm font-medium ${openStatus.isOpen ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
            {openStatus.isOpen ? 'Open now' : 'Closed'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formatTime(cafe.hours.open)} – {formatTime(cafe.hours.close)}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Wi-Fi</div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {cafe.wifi.downloadMbps} Mbps
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Tested {formatDate(cafe.wifi.testedAt)}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Min. price</div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            ${cafe.minPriceUsd.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">to sit & work</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Power outlets</div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {cafe.powerOutlets || 'Unknown'}
          </div>
          {cafe.seating && (
            <div className="text-xs text-gray-500 dark:text-gray-400">{cafe.seating}</div>
          )}
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recommended</div>
        <div className="text-sm font-medium text-gray-900 dark:text-white">{cafe.topDrink.name}</div>
        {cafe.topDrink.description && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cafe.topDrink.description}</div>
        )}
      </div>

      {(cafe.lighting || cafe.music) && (
        <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {cafe.lighting && (
            <div>
              <span className="text-gray-500 dark:text-gray-400">Lighting:</span>{' '}
              <span className="font-medium text-gray-900 dark:text-white">{cafe.lighting}</span>
            </div>
          )}
          {cafe.music && (
            <div>
              <span className="text-gray-500 dark:text-gray-400">Music:</span>{' '}
              <span className="font-medium text-gray-900 dark:text-white">{cafe.music}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
