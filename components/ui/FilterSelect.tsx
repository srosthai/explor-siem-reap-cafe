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
        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-paper dark:bg-ink-soft border rounded-xl text-sm font-medium transition-all ${
          selectedTag
            ? 'border-palm/50 text-ink dark:text-paper'
            : 'border-ink/12 dark:border-paper/15 text-ink/65 dark:text-paper/65 hover:border-ink/25 dark:hover:border-paper/30'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <svg className="w-4 h-4 text-ink/40 dark:text-paper/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="truncate">{buttonLabel}</span>
        </div>
        <svg
          className={`h-4 w-4 text-ink/40 dark:text-paper/40 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-52 bg-paper dark:bg-ink-soft border border-ink/12 dark:border-paper/15 rounded-xl shadow-xl shadow-ink/10 dark:shadow-black/30 z-[1100] overflow-hidden py-1">
          <button
            onClick={() => {
              onTagChange(null);
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-left hover:bg-ink/5 dark:hover:bg-paper/10 transition-colors ${
              selectedTag === null
                ? 'text-ink dark:text-paper font-medium'
                : 'text-ink/55 dark:text-paper/55'
            }`}
          >
            <span>All types</span>
            {selectedTag === null && (
              <svg className="h-4 w-4 text-palm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-left hover:bg-ink/5 dark:hover:bg-paper/10 transition-colors ${
                selectedTag === tag
                  ? 'text-ink dark:text-paper font-medium'
                  : 'text-ink/55 dark:text-paper/55'
              }`}
            >
              <span>{tag}</span>
              {selectedTag === tag && (
                <svg className="h-4 w-4 text-palm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
