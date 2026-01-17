'use client';

interface FilterChipsProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  className?: string;
}

export function FilterChips({
  tags,
  selectedTags,
  onTagToggle,
  className = '',
}: FilterChipsProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto chips-scroll ${className}`}>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              isSelected
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
