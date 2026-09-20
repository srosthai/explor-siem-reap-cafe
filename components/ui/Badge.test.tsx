import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';
import { WifiSignal } from './WifiSignal';

describe('Badge', () => {
    it('renders default badge correctly', () => {
        render(<Badge>Test Badge</Badge>);
        expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders area badge correctly', () => {
        render(<Badge variant="area">Old Market</Badge>);
        const badge = screen.getByText('Old Market');
        expect(badge).toBeInTheDocument();
        expect(badge.className).toContain('bg-paper');
    });

    it('renders tag badge correctly', () => {
        render(<Badge variant="tag">Work-friendly</Badge>);
        expect(screen.getByText('Work-friendly')).toBeInTheDocument();
    });
});

describe('WifiSignal', () => {
    it('renders wifi speed', () => {
        render(<WifiSignal mbps={50} />);
        expect(screen.getByText('50 Mbps')).toBeInTheDocument();
    });

    it('shows label when showLabel is true', () => {
        render(<WifiSignal mbps={100} showLabel />);
        expect(screen.getByText(/Insane/)).toBeInTheDocument();
    });

    it('displays correct color for slow wifi', () => {
        const { container } = render(<WifiSignal mbps={5} />);
        const badge = container.firstChild as HTMLElement;
        expect(badge.className).toContain('text-clay');
    });

    it('displays correct color for fast wifi', () => {
        const { container } = render(<WifiSignal mbps={85} />);
        const badge = container.firstChild as HTMLElement;
        expect(badge.className).toContain('text-palm-deep');
    });
});
