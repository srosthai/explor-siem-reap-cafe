# Siem Reap Cafes

A modern web application to discover the best cafes in Siem Reap, Cambodia. Find your perfect spot for working, chilling, or grabbing great coffee with tested Wi-Fi speeds, minimum prices, and vibe ratings.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)

## Features

- **Wi-Fi Speed Testing** - Real speed tests using Speedtest by Ookla
- **Minimum Prices** - Know the cheapest item to sit and work
- **Multiple Views** - Grid, list, and map view options
- **Search & Filter** - Find cafes by name, area, or tags
- **Sort Options** - Sort by Wi-Fi speed, price, or name
- **Dark/Light Mode** - Toggle between themes
- **Responsive Design** - Works on all devices
- **Interactive Map** - See cafe locations with Leaflet/OpenStreetMap

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Maps**: Leaflet + OpenStreetMap
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/siem-reap-cafe.git
cd siem-reap-cafe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
siem-reap-cafe/
├── app/
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   ├── about/
│   │   └── page.tsx      # About page
│   └── cafe/
│       └── [slug]/
│           └── page.tsx  # Cafe detail page
├── components/
│   ├── CafeCard.tsx      # Cafe card component
│   ├── CafeGrid.tsx      # Main grid with filters
│   ├── CafeListItem.tsx  # List view item
│   ├── CafeMapView.tsx   # Map view component
│   ├── GalleryGrid.tsx   # Image gallery
│   ├── Lightbox.tsx      # Image lightbox
│   ├── ShareButton.tsx   # Share functionality
│   ├── ThemeProvider.tsx # Dark mode context
│   ├── TopNav.tsx        # Navigation bar
│   └── ui/               # Reusable UI components
├── lib/
│   ├── cafes.ts          # Cafe data functions
│   └── types.ts          # TypeScript types
└── data/
    └── cafes.json        # Cafe data
```

## Adding a New Cafe

Edit `data/cafes.json` and add a new entry:

```json
{
  "slug": "cafe-slug",
  "name": "Cafe Name",
  "area": "Old Market",
  "wifi": {
    "downloadMbps": 50,
    "uploadMbps": 20,
    "testedAt": "2025-01-15"
  },
  "minPriceUsd": 2.50,
  "hours": {
    "open": "07:00",
    "close": "21:00"
  },
  "tags": ["Work-friendly", "Aircon", "Quiet"],
  "topDrink": {
    "name": "Iced Latte",
    "description": "Smooth and refreshing"
  },
  "gallery": [
    "https://example.com/image1.jpg"
  ],
  "googleMapsUrl": "https://maps.google.com/...",
  "coordinates": {
    "lat": 13.3633,
    "lng": 103.8564
  }
}
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/siem-reap-cafe)

### Other Platforms

Build the production version:
```bash
npm run build
npm start
```

## Contributing

Contributions are welcome! If you'd like to:

- Add a new cafe
- Update existing information
- Report inaccurate data
- Suggest improvements

Please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Cafe owners in Siem Reap for their hospitality
- [Speedtest by Ookla](https://www.speedtest.net/) for Wi-Fi testing
- [OpenStreetMap](https://www.openstreetmap.org/) for map data
- [Unsplash](https://unsplash.com/) for placeholder images
