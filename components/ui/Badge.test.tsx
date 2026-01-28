import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge, WifiBadge } from './Badge';

describe('Badge', () => {
    it('renders default badge correctly', () => {
        render(<Badge>Test Badge</Badge>);
        expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders area badge with purple styling', () => {
        render(<Badge variant="area">Old Market</Badge>);
        const badge = screen.getByText('Old Market');
        expect(badge).toBeInTheDocument();
        expect(badge.className).toContain('purple');
    });

    it('renders tag badge correctly', () => {
        render(<Badge variant="tag">Work-friendly</Badge>);
        expect(screen.getByText('Work-friendly')).toBeInTheDocument();
    });
});

describe('WifiBadge', () => {
    it('renders wifi speed with emoji', () => {
        render(<WifiBadge speed={50} />);
        expect(screen.getByText('50 Mbps')).toBeInTheDocument();
        expect(screen.getByText('⚡')).toBeInTheDocument();
    });

    it('shows label when showLabel is true', () => {
        render(<WifiBadge speed={100} showLabel />);
        expect(screen.getByText(/Insane/)).toBeInTheDocument();
    });

    it('displays correct color for slow wifi', () => {
        const { container } = render(<WifiBadge speed={5} />);
        const badge = container.firstChild as HTMLElement;
        expect(badge.className).toContain('red');
    });

    it('displays correct color for fast wifi', () => {
        const { container } = render(<WifiBadge speed={85} />);
        const badge = container.firstChild as HTMLElement;
        expect(badge.className).toContain('purple');
    });
});
