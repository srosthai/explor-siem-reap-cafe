export interface OpeningHours {
  open: string;  // "07:00"
  close: string; // "22:00"
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Cafe {
  name: string;
  slug: string;
  area: string;
  addressShort?: string;
  googleMapsUrl: string;
  coordinates: Coordinates;
  minPriceUsd: number;
  topDrink: {
    name: string;
    description?: string;
  };
  wifi: {
    downloadMbps: number;
    uploadMbps: number;
    latencyMs?: number;
    testedAt: string;
  };
  hours: OpeningHours;
  tags: string[];
  gallery: string[];
  notes: string[];
  vibeScore?: number;
  lighting?: 'Warm' | 'Bright' | 'Moody';
  powerOutlets?: 'Many' | 'Some' | 'Rare';
  seating?: string;
  music?: 'Lo-fi' | 'Pop' | 'Chill' | 'None';
}

export type SortOption = 'fastest-wifi' | 'cheapest' | 'most-aesthetic';

export type FilterTag =
  | 'Work-friendly'
  | 'Aircon'
  | 'Quiet'
  | 'Aesthetic'
  | 'Power outlets'
  | 'Cozy'
  | 'Outdoor';
