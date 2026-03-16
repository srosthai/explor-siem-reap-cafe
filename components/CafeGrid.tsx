'use client';

import { useState, useMemo } from 'react';
import { SearchInput, FilterSelect, SortDropdown } from './ui';
import { CafeCard } from './CafeCard';
import { CafeListItem } from './CafeListItem';
import { CafeMapView } from './CafeMapView';
import { EmptyState } from './EmptyState';
import { filterCafes, sortCafes, getUniqueTags } from '@/lib/cafes';
import type { Cafe, SortOption } from '@/lib/types';

type ViewMode = 'grid' | 'list' | 'map';

interface CafeGridProps {
  cafes: Cafe[];
}

export function CafeGrid({ cafes }: CafeGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const allTags = useMemo(() => getUniqueTags(), []);

  const filteredAndSortedCafes = useMemo(() => {
    const selectedTags = selectedTag ? [selectedTag] : [];
    const filtered = filterCafes(cafes, searchQuery, selectedTags);
    return sortCafes(filtered, sortBy);
  }, [cafes, searchQuery, selectedTag, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setSortBy('all');
  };

  const hasActiveFilters = selectedTag || searchQuery || sortBy !== 'all';

  return (
    <div className="space-y-6">
      {/* Search and Filters — unified bar */}
      <div className="flex flex-col lg:flex-row gap-3">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          className="w-full lg:flex-1"
        />
        <div className="flex gap-2 lg:w-auto lg:flex-shrink-0">
          <FilterSelect
            tags={allTags}
            selectedTag={selectedTag}
            onTagChange={setSelectedTag}
            className="flex-1 lg:w-44"
          />
          <SortDropdown
            value={sortBy}
            onChange={setSortBy}
            className="flex-1 lg:w-44"
          />
        </div>
      </div>

      {/* Results Count and View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm text-stone-500 dark:text-stone-400 tabular-nums">
            {filteredAndSortedCafes.length} cafe{filteredAndSortedCafes.length !== 1 ? 's' : ''}
          </p>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-medium text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>

        <div className="flex items-center bg-stone-100 dark:bg-stone-800/60 rounded-lg p-0.5">
          {[
            { mode: 'grid' as ViewMode, icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            )},
            { mode: 'list' as ViewMode, icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )},
            { mode: 'map' as ViewMode, icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )},
          ].map(({ mode, icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === mode
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'
              }`}
              aria-label={`${mode} view`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredAndSortedCafes.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAndSortedCafes.map((cafe, index) => (
              <div
                key={cafe.slug}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
              >
                <CafeCard cafe={cafe} priority={index < 3} />
              </div>
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredAndSortedCafes.map((cafe, index) => (
              <div
                key={cafe.slug}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index * 30, 200)}ms` }}
              >
                <CafeListItem cafe={cafe} />
              </div>
            ))}
          </div>
        ) : (
          <CafeMapView cafes={filteredAndSortedCafes} />
        )
      ) : (
        <EmptyState
          action={
            <button
              onClick={handleClearFilters}
              className="px-5 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors"
            >
              Clear filters
            </button>
          }
        />
      )}
    </div>
  );
}
