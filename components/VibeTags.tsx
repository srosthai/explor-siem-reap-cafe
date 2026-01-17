interface VibeTagsProps {
  tags: string[];
  notes?: string[];
}

export function VibeTags({ tags, notes }: VibeTagsProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Good for
        </h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {notes && notes.length > 0 && (
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
            Quick notes
          </h3>
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <span className="text-violet-500 dark:text-violet-400 mt-0.5">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
