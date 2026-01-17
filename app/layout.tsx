import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { TopNav } from '@/components/TopNav';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://siemreapcafes.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Siem Reap Cafes - Find Your Perfect Work & Chill Spot',
    template: '%s | Siem Reap Cafes',
  },
  description:
    'Discover the best cafes in Siem Reap, Cambodia for working, chilling, or grabbing great coffee. We test Wi-Fi speeds, track minimum prices, and rate the vibes. Find your perfect digital nomad workspace.',
  keywords: [
    'Siem Reap cafes',
    'coffee shops Siem Reap',
    'digital nomad Cambodia',
    'work friendly cafes',
    'best wifi Siem Reap',
    'cafes near Angkor Wat',
    'coworking Siem Reap',
    'laptop friendly cafes Cambodia',
    'remote work Cambodia',
    'Siem Reap coffee',
    'Cambodia cafe guide',
    'wifi speed test cafes',
  ],
  authors: [{ name: 'Siem Reap Cafes', url: siteUrl }],
  creator: 'Siem Reap Cafes',
  publisher: 'Siem Reap Cafes',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Siem Reap Cafes',
    title: 'Siem Reap Cafes - Find Your Perfect Work & Chill Spot',
    description:
      'Discover the best cafes in Siem Reap with tested Wi-Fi speeds, minimum prices, and vibe ratings. The ultimate guide for digital nomads in Cambodia.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Siem Reap Cafes - Find cafes with fast Wi-Fi in Cambodia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siem Reap Cafes - Find Your Perfect Work & Chill Spot',
    description:
      'Find the best cafes in Siem Reap with tested Wi-Fi speeds and honest reviews.',
    images: ['/og-image.png'],
    creator: '@siemreapcafes',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'travel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <TopNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
