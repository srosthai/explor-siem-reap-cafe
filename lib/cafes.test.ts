import { describe, it, expect } from 'vitest';
import {
    getWifiSpeedLabel,
    formatTime,
    filterCafes,
    sortCafes,
    isOpenNow,
} from './cafes';
import type { Cafe } from './types';

describe('getWifiSpeedLabel', () => {
    it('returns "Slow" for speeds under 10 Mbps', () => {
        const result = getWifiSpeedLabel(5);
        expect(result.label).toBe('Slow');
        expect(result.emoji).toBe('😭');
        expect(result.colorClass).toContain('red');
    });

    it('returns "OK" for speeds 10-30 Mbps', () => {
        const result = getWifiSpeedLabel(20);
        expect(result.label).toBe('OK');
        expect(result.emoji).toBe('👌');
        expect(result.colorClass).toContain('yellow');
    });

    it('returns "Fast" for speeds 30-80 Mbps', () => {
        const result = getWifiSpeedLabel(50);
        expect(result.label).toBe('Fast');
        expect(result.emoji).toBe('⚡');
        expect(result.colorClass).toContain('green');
    });

    it('returns "Insane" for speeds 80+ Mbps', () => {
        const result = getWifiSpeedLabel(100);
        expect(result.label).toBe('Insane');
        expect(result.emoji).toBe('🚀');
        expect(result.colorClass).toContain('purple');
    });
});

describe('formatTime', () => {
    it('formats morning time correctly', () => {
        expect(formatTime('07:00')).toBe('7AM');
        expect(formatTime('09:30')).toBe('9:30AM');
    });

    it('formats afternoon time correctly', () => {
        expect(formatTime('14:00')).toBe('2PM');
        expect(formatTime('15:45')).toBe('3:45PM');
    });

    it('handles noon correctly', () => {
        expect(formatTime('12:00')).toBe('12PM');
    });

    it('handles midnight correctly', () => {
        expect(formatTime('00:00')).toBe('12AM');
    });
});

describe('filterCafes', () => {
    const mockCafes: Cafe[] = [
        {
            name: 'Test Cafe A',
            slug: 'test-cafe-a',
            area: 'Old Market',
            googleMapsUrl: 'https://maps.google.com',
            coordinates: { lat: 13.36, lng: 103.86 },
            minPriceUsd: 2.5,
            topDrink: { name: 'Latte' },
            wifi: { downloadMbps: 50, uploadMbps: 20, testedAt: '2025-01-01' },
            hours: { open: '07:00', close: '22:00' },
            tags: ['Work-friendly', 'Aircon'],
            gallery: [],
            notes: [],
        },
        {
            name: 'Test Cafe B',
            slug: 'test-cafe-b',
            area: 'Wat Bo',
            googleMapsUrl: 'https://maps.google.com',
            coordinates: { lat: 13.36, lng: 103.86 },
            minPriceUsd: 1.5,
            topDrink: { name: 'Coffee' },
            wifi: { downloadMbps: 20, uploadMbps: 10, testedAt: '2025-01-01' },
            hours: { open: '08:00', close: '20:00' },
            tags: ['Quiet', 'Cozy'],
            gallery: [],
            notes: [],
        },
    ];

    it('filters by search query (name)', () => {
        const result = filterCafes(mockCafes, 'Cafe A', []);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Test Cafe A');
    });

    it('filters by search query (area)', () => {
        const result = filterCafes(mockCafes, 'Wat Bo', []);
        expect(result).toHaveLength(1);
        expect(result[0].area).toBe('Wat Bo');
    });

    it('filters by tags', () => {
        const result = filterCafes(mockCafes, '', ['Aircon']);
        expect(result).toHaveLength(1);
        expect(result[0].tags).toContain('Aircon');
    });

    it('returns all cafes with empty filters', () => {
        const result = filterCafes(mockCafes, '', []);
        expect(result).toHaveLength(2);
    });
});

describe('sortCafes', () => {
    const mockCafes: Cafe[] = [
        {
            name: 'Cheap Cafe',
            slug: 'cheap-cafe',
            area: 'Old Market',
            googleMapsUrl: 'https://maps.google.com',
            coordinates: { lat: 13.36, lng: 103.86 },
            minPriceUsd: 1.0,
            topDrink: { name: 'Coffee' },
            wifi: { downloadMbps: 20, uploadMbps: 10, testedAt: '2025-01-01' },
            hours: { open: '07:00', close: '22:00' },
            tags: [],
            gallery: [],
            notes: [],
        },
        {
            name: 'Fast Cafe',
            slug: 'fast-cafe',
            area: 'Wat Bo',
            googleMapsUrl: 'https://maps.google.com',
            coordinates: { lat: 13.36, lng: 103.86 },
            minPriceUsd: 3.0,
            topDrink: { name: 'Latte' },
            wifi: { downloadMbps: 100, uploadMbps: 50, testedAt: '2025-01-01' },
            hours: { open: '08:00', close: '20:00' },
            tags: [],
            gallery: [],
            notes: [],
            trending: true,
        },
    ];

    it('sorts by fastest wifi', () => {
        const result = sortCafes(mockCafes, 'fastest-wifi');
        expect(result[0].name).toBe('Fast Cafe');
    });

    it('sorts by cheapest', () => {
        const result = sortCafes(mockCafes, 'cheapest');
        expect(result[0].name).toBe('Cheap Cafe');
    });

    it('filters trending only', () => {
        const result = sortCafes(mockCafes, 'trending');
        expect(result).toHaveLength(1);
        expect(result[0].trending).toBe(true);
    });

    it('returns all with "all" option', () => {
        const result = sortCafes(mockCafes, 'all');
        expect(result).toHaveLength(2);
    });
});
