import cafesData from '@/data/cafes.json';
import type { Cafe, SortOption } from './types';

export function getAllCafes(): Cafe[] {
  return cafesData as Cafe[];
}

export function getCafeBySlug(slug: string): Cafe | undefined {
  return getAllCafes().find((cafe) => cafe.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllCafes().map((cafe) => cafe.slug);
}

export function getUniqueTags(): string[] {
  const tags = new Set<string>();
  getAllCafes().forEach((cafe) => {
    cafe.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getUniqueAreas(): string[] {
  const areas = new Set<string>();
  getAllCafes().forEach((cafe) => areas.add(cafe.area));
  return Array.from(areas).sort();
}

export function filterCafes(
  cafes: Cafe[],
  searchQuery: string,
  selectedTags: string[]
): Cafe[] {
  return cafes.filter((cafe) => {
    const matchesSearch =
      searchQuery === '' ||
      cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cafe.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cafe.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => cafe.tags.includes(tag));

    return matchesSearch && matchesTags;
  });
}

export function sortCafes(cafes: Cafe[], sortBy: SortOption): Cafe[] {
  const sorted = [...cafes];

  switch (sortBy) {
    case 'all':
      return sorted;
    case 'trending':
      return sorted.filter((cafe) => cafe.trending === true);
    case 'fastest-wifi':
      return sorted.sort((a, b) => b.wifi.downloadMbps - a.wifi.downloadMbps);
    case 'cheapest':
      return sorted.sort((a, b) => a.minPriceUsd - b.minPriceUsd);
    default:
      return sorted;
  }
}

export function getWifiSpeedLabel(mbps: number): {
  label: string;
  emoji: string;
  colorClass: string;
} {
  if (mbps < 10) {
    return { label: 'Slow', emoji: '😭', colorClass: 'bg-red-100 text-red-700' };
  }
  if (mbps < 30) {
    return { label: 'OK', emoji: '👌', colorClass: 'bg-yellow-100 text-yellow-700' };
  }
  if (mbps < 80) {
    return { label: 'Fast', emoji: '⚡', colorClass: 'bg-green-100 text-green-700' };
  }
  return { label: 'Insane', emoji: '🚀', colorClass: 'bg-purple-100 text-purple-700' };
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return minutes === 0 ? `${displayHours}${period}` : `${displayHours}:${minutes.toString().padStart(2, '0')}${period}`;
}

export function isOpenNow(open: string, close: string): boolean {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [openHours, openMins] = open.split(':').map(Number);
  const [closeHours, closeMins] = close.split(':').map(Number);

  const openMinutes = openHours * 60 + openMins;
  const closeMinutes = closeHours * 60 + closeMins;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

export function getOpenStatus(open: string, close: string): {
  isOpen: boolean;
  label: string;
} {
  const isOpen = isOpenNow(open, close);
  const openFormatted = formatTime(open);
  const closeFormatted = formatTime(close);

  return {
    isOpen,
    label: isOpen ? `Open until ${closeFormatted}` : `Closed · Opens ${openFormatted}`,
  };
}
