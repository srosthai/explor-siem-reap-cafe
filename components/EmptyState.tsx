interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'No cafés found',
  message = "Try adjusting your search or filters to find what you're looking for.",
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4">
      <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-300 mb-2">{title}</h3>
      <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-6">{message}</p>
      {action}
    </div>
  );
}
