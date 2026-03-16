'use client';

import { useState, useRef, useEffect } from 'react';
import type { SortOption } from '@/lib/types';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'all', label: 'Default' },
  { value: 'trending', label: 'Trending' },
  { value: 'fastest-wifi', label: 'Fastest Wi-Fi' },
  { value: 'cheapest', label: 'Lowest price' },
];

export function SortDropdown({
  value,
  onChange,
  className = '',
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-white dark:bg-stone-900 border rounded-xl text-sm font-medium transition-all ${
          value !== 'all'
            ? 'border-amber-400/50 dark:border-amber-500/30 text-stone-900 dark:text-stone-100'
            : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-700'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <svg className="w-4 h-4 text-stone-400 dark:text-stone-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <span className="truncate">{selectedOption?.label}</span>
        </div>
        <svg
          className={`h-4 w-4 text-stone-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl shadow-stone-900/5 dark:shadow-black/30 z-[1100] overflow-hidden py-1">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors ${
                value === option.value
                  ? 'text-stone-900 dark:text-white font-medium'
                  : 'text-stone-500 dark:text-stone-400'
              }`}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <svg className="h-4 w-4 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
