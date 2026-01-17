import { getWifiSpeedLabel } from '@/lib/cafes';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'wifi' | 'area' | 'tag';
  wifiSpeed?: number;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  wifiSpeed,
  className = '',
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium';

  if (variant === 'wifi' && wifiSpeed !== undefined) {
    const { emoji, colorClass } = getWifiSpeedLabel(wifiSpeed);
    const isInsane = wifiSpeed >= 80;
    return (
      <span
        className={`${baseStyles} ${colorClass} ${isInsane ? 'wifi-badge-fast' : ''} ${className}`}
      >
        {emoji} {wifiSpeed} Mbps
      </span>
    );
  }

  if (variant === 'area') {
    return (
      <span
        className={`${baseStyles} bg-purple-100 text-purple-700 ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === 'tag') {
    return (
      <span
        className={`${baseStyles} bg-white/60 text-gray-700 backdrop-blur-sm ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span className={`${baseStyles} bg-gray-100 text-gray-700 ${className}`}>
      {children}
    </span>
  );
}

export function WifiBadge({
  speed,
  showLabel = false,
  className = '',
}: {
  speed: number;
  showLabel?: boolean;
  className?: string;
}) {
  const { label, emoji, colorClass } = getWifiSpeedLabel(speed);
  const isInsane = speed >= 80;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${colorClass} ${isInsane ? 'wifi-badge-fast' : ''} ${className}`}
    >
      <span>{emoji}</span>
      <span>{speed} Mbps</span>
      {showLabel && <span className="opacity-75">• {label}</span>}
    </span>
  );
}
