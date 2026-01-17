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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('fastest-wifi');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const allTags = useMemo(() => getUniqueTags(), []);

  const filteredAndSortedCafes = useMemo(() => {
    const filtered = filterCafes(cafes, searchQuery, selectedTags);
    return sortCafes(filtered, sortBy);
  }, [cafes, searchQuery, selectedTags, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          className="flex-1"
        />
        <div className="flex gap-2">
          <FilterSelect
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
          <SortDropdown
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {filteredAndSortedCafes.length} result{filteredAndSortedCafes.length !== 1 ? 's' : ''}
        </p>

        <div className="flex items-center gap-2">
          {(selectedTags.length > 0 || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mr-2"
            >
              Clear all
            </button>
          )}

          <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              aria-label="Grid view"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              aria-label="List view"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'map'
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              aria-label="Map view"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {filteredAndSortedCafes.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAndSortedCafes.map((cafe, index) => (
              <CafeCard key={cafe.slug} cafe={cafe} priority={index < 3} />
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredAndSortedCafes.map((cafe) => (
              <CafeListItem key={cafe.slug} cafe={cafe} />
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
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Clear filters
            </button>
          }
        />
      )}
    </div>
  );
}
