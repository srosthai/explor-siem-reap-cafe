import type { Metadata, Viewport } from 'next';
import { Manrope, Fraunces } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { TopNav } from '@/components/TopNav';
import { Footer } from '@/components/Footer';
import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  axes: ['opsz', 'SOFT'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://siemreapcafes.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f1e1' },
    { media: '(prefers-color-scheme: dark)', color: '#1c2a20' },
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
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Siem Reap Cafes',
    title: 'Siem Reap Cafes - Find Your Perfect Work & Chill Spot',
    description:
      'Discover the best cafes in Siem Reap with tested Wi-Fi speeds, minimum prices, and vibe ratings. The ultimate guide for digital nomads in Cambodia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siem Reap Cafes - Find Your Perfect Work & Chill Spot',
    description:
      'Find the best cafes in Siem Reap with tested Wi-Fi speeds and honest reviews.',
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
        className={`${manrope.variable} ${fraunces.variable} antialiased bg-paper dark:bg-ink text-ink dark:text-paper transition-colors`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            {children}
            <Footer />
          </div>
          <TopNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
