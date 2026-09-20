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
      <h3 className="font-display text-xl text-ink dark:text-paper mb-2">{title}</h3>
      <p className="text-sm text-ink/55 dark:text-paper/55 max-w-md mx-auto mb-6">{message}</p>
      {action}
    </div>
  );
}
