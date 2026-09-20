import { getWifiSpeedLabel } from '@/lib/cafes';

interface WifiSignalProps {
  mbps: number;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function WifiSignal({ mbps, showLabel = false, size = 'sm', className = '' }: WifiSignalProps) {
  const { label, bars, textClass } = getWifiSpeedLabel(mbps);
  const barHeight = size === 'md' ? 'h-4' : 'h-[13px]';

  return (
    <span className={`inline-flex items-center gap-1.5 ${textClass} ${className}`}>
      <span className={`signal-bars ${barHeight}`} aria-hidden="true">
        {[1, 2, 3, 4].map((bar) => (
          <span key={bar} className={bar <= bars ? 'is-filled' : ''} />
        ))}
      </span>
      <span className="font-semibold tabular-nums">{mbps} Mbps</span>
      {showLabel && <span className="opacity-70 font-normal">· {label}</span>}
    </span>
  );
}
