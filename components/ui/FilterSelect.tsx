'use client';

import { useState, useRef, useEffect } from 'react';

interface FilterSelectProps {
  tags: string[];
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
  className?: string;
}

export function FilterSelect({
  tags,
  selectedTag,
  onTagChange,
  className = '',
}: FilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const buttonLabel = selectedTag || 'All types';

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-white dark:bg-stone-900 border rounded-xl text-sm font-medium transition-all ${
          selectedTag
            ? 'border-amber-400/50 dark:border-amber-500/30 text-stone-900 dark:text-stone-100'
            : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-700'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <svg className="w-4 h-4 text-stone-400 dark:text-stone-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="truncate">{buttonLabel}</span>
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
        <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl shadow-stone-900/5 dark:shadow-black/30 z-[1100] overflow-hidden py-1">
          <button
            onClick={() => {
              onTagChange(null);
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors ${
              selectedTag === null
                ? 'text-stone-900 dark:text-white font-medium'
                : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            <span>All types</span>
            {selectedTag === null && (
              <svg className="h-4 w-4 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                onTagChange(tag);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors ${
                selectedTag === tag
                  ? 'text-stone-900 dark:text-white font-medium'
                  : 'text-stone-500 dark:text-stone-400'
              }`}
            >
              <span>{tag}</span>
              {selectedTag === tag && (
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
