interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'area' | 'tag';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium';

  if (variant === 'area') {
    return (
      <span
        className={`${baseStyles} bg-paper/90 text-ink backdrop-blur-sm ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === 'tag') {
    return (
      <span
        className={`${baseStyles} bg-ink/5 dark:bg-paper/10 text-ink/70 dark:text-paper/70 ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span className={`${baseStyles} bg-ink/5 dark:bg-paper/10 text-ink/70 dark:text-paper/70 ${className}`}>
      {children}
    </span>
  );
}
