# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm run test:ci` - Run tests once (for CI)
- `npm run test:coverage` - Run tests with coverage report

## Architecture

This is a Next.js 16 application using the App Router pattern with React 19, TypeScript, and Tailwind CSS v4.

**App Router Structure:**
- `app/layout.tsx` - Root layout with Geist fonts and metadata
- `app/page.tsx` - Home page component
- `app/globals.css` - Global styles with Tailwind and CSS custom properties for theming

**Key Configuration:**
- TypeScript path alias: `@/*` maps to project root
- ESLint uses flat config format with Next.js core-web-vitals and TypeScript presets
- Tailwind CSS v4 integrated via PostCSS plugin

---

## Project Plan: Siem Reap Café Directory

### Overview
A Gen Z-style static café directory for Siem Reap, Cambodia featuring Wi-Fi speeds, minimum prices, top drinks, and photo galleries.

### Design System
- **Style**: Glassmorphism, soft gradients (lavender → sky → peach), bold typography
- **Components**: Rounded corners (2xl/3xl), glass cards with blur, animated microinteractions
- **Badges**: Wi-Fi speed color scale (<10 Mbps = slow, 10-30 = ok, 30-80 = fast, 80+ = insane)

### Pages
1. **Home/Explore (`/`)** - Café grid with search, filter chips, sort options
2. **Café Detail (`/cafe/[slug]`)** - Hero, stats, gallery, vibe tags, map CTA
3. **About (`/about`)** - Wi-Fi testing methodology, transparency info

### Data Structure
Location: `/data/cafes.json`

```typescript
interface Cafe {
  name: string;
  slug: string;
  area: string; // Wat Bo, Old Market, Taphul, Sok San Road
  addressShort?: string;
  googleMapsUrl: string;
  minPriceUsd: number;
  topDrink: { name: string; description?: string };
  wifi: {
    downloadMbps: number;
    uploadMbps: number;
    latencyMs?: number;
    testedAt: string;
  };
  tags: string[]; // Work-friendly, Aircon, Quiet, Aesthetic, Power outlets
  gallery: string[];
  notes: string[];
  // Optional Gen Z extras
  vibeScore?: number;
  lighting?: 'Warm' | 'Bright' | 'Moody';
  powerOutlets?: 'Many' | 'Some' | 'Rare';
  seating?: string;
  music?: 'Lo-fi' | 'Pop' | 'Chill' | 'None';
}
```

### Components to Build
**Shared:**
- `TopNav` - Logo + Explore + About links
- `SearchInput` - With icon, placeholder text
- `FilterChips` - Horizontal scrollable filter tags
- `SortDropdown` - Fastest Wi-Fi, Cheapest, Most aesthetic
- `CafeCard` - Image, name, area, Wi-Fi badge, min price, top drink, vibe tags
- `EmptyState` - Cute illustration when no results

**Detail Page:**
- `HeroImage` - Large cover with gradient overlay
- `StatPills` - Wi-Fi, min price, top drink, outlets
- `GalleryGrid` - Masonry/carousel with lightbox
- `VibeTags` - Tag badges
- `MapCTA` - Google Maps button
- `ShareButton` - Copy link functionality

### File Structure
```
app/
├── layout.tsx          # Root layout with fonts, gradient bg
├── page.tsx            # Explore/Home page
├── globals.css         # Tailwind + custom properties
├── about/
│   └── page.tsx        # About page
└── cafe/
    └── [slug]/
        └── page.tsx    # Café detail page (generateStaticParams)

components/
├── ui/                 # Reusable UI components
│   ├── SearchInput.tsx
│   ├── FilterChips.tsx
│   ├── SortDropdown.tsx
│   ├── Badge.tsx
│   └── Button.tsx
├── CafeCard.tsx
├── TopNav.tsx
├── HeroImage.tsx
├── StatPills.tsx
├── GalleryGrid.tsx
├── Lightbox.tsx
├── VibeTags.tsx
└── EmptyState.tsx

data/
└── cafes.json          # Café data

lib/
└── cafes.ts            # Data fetching utilities

public/
└── images/
    └── cafes/          # Café gallery images
```

### MVP Checklist
- [ ] Data model + sample café entries (3-5 cafés)
- [ ] Design system (colors, typography, spacing)
- [ ] TopNav component
- [ ] Explore page with CafeCard grid
- [ ] Search + Filter + Sort functionality
- [ ] Café detail page with all sections
- [ ] Gallery with lightbox
- [ ] About page
- [ ] SEO (metadata, OpenGraph, JSON-LD)
- [ ] Responsive design (mobile-first)
- [ ] Microinteractions (hover, tap effects)

### V2 Features (Future)
- [ ] "Near me" sorting (geolocation)
- [ ] User submissions form
- [ ] Bookmarking (localStorage)
- [ ] Map view page
- [ ] Real-time busy level
