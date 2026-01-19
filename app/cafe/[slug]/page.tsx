import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/GalleryGrid';
import { ShareButton } from '@/components/ShareButton';
import { BackButton } from '@/components/BackButton';
import { getCafeBySlug, getAllSlugs, formatTime, getOpenStatus } from '@/lib/cafes';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cafe = getCafeBySlug(slug);

  if (!cafe) {
    return {
      title: 'Cafe Not Found - Siem Reap Cafes',
    };
  }

  return {
    title: `${cafe.name} - Siem Reap Cafes`,
    description: `${cafe.name} in ${cafe.area}. Wi-Fi: ${cafe.wifi.downloadMbps} Mbps, Min price: $${cafe.minPriceUsd}. ${cafe.tags.join(', ')}.`,
    openGraph: {
      title: `${cafe.name} - Siem Reap Cafes`,
      description: `Discover ${cafe.name} in ${cafe.area}. Fast Wi-Fi at ${cafe.wifi.downloadMbps} Mbps, minimum price $${cafe.minPriceUsd}.`,
      images: cafe.gallery[0] ? [{ url: cafe.gallery[0] }] : [],
    },
  };
}

export default async function CafeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cafe = getCafeBySlug(slug);

  if (!cafe) {
    notFound();
  }

  const openStatus = getOpenStatus(cafe.hours.open, cafe.hours.close);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: cafe.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Siem Reap',
      addressRegion: cafe.area,
      addressCountry: 'Cambodia',
    },
    url: cafe.googleMapsUrl,
    image: cafe.gallery[0],
    priceRange: `$${cafe.minPriceUsd}+`,
    amenityFeature: cafe.tags.map((tag) => ({
      '@type': 'LocationFeatureSpecification',
      name: tag,
      value: true,
    })),
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 -mt-[70px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Full Cover Hero Section */}
      <div className="relative h-[65vh] min-h-[500px] max-h-[750px] w-full">
        <Image
          src={cafe.gallery[0] || '/images/placeholder-cafe.jpg'}
          alt={cafe.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay - stronger at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

        {/* Back Button */}
        <div className="absolute top-20 left-4 sm:left-6 lg:left-8 z-10">
          <BackButton />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm ${
                openStatus.isOpen
                  ? 'bg-emerald-500/90 text-white'
                  : 'bg-gray-500/90 text-white'
              }`}>
                <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-white animate-pulse' : 'bg-gray-300'}`} />
                {openStatus.isOpen ? 'Open now' : 'Closed'}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                {cafe.area}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg">
              {cafe.name}
            </h1>
            <p className="text-white/80 text-lg sm:text-xl font-medium">
              {formatTime(cafe.hours.open)} - {formatTime(cafe.hours.close)} · {cafe.addressShort}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 pb-12">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href={cafe.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Open in Maps
          </a>
          <ShareButton title={cafe.name} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {cafe.wifi.downloadMbps}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Mbps download</div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${cafe.minPriceUsd.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Min. price</div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {cafe.powerOutlets || 'N/A'}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Power outlets</div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatTime(cafe.hours.open)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Opens daily</div>
          </div>
        </div>

        {/* Info Cards Row */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {/* Tags */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
              Good for
            </h2>
            <div className="flex flex-wrap gap-2">
              {cafe.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Ambiance */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
              Ambiance
            </h2>
            <div className="space-y-3">
              {cafe.lighting && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Lighting</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{cafe.lighting}</span>
                </div>
              )}
              {cafe.music && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Music</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{cafe.music}</span>
                </div>
              )}
              {cafe.seating && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Seating</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{cafe.seating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommendation */}
        {cafe.topDrink && (
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 sm:p-6 mb-8 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <div className="text-white/70 text-sm mb-1">Staff Recommendation</div>
                <div className="text-xl font-semibold mb-1">{cafe.topDrink.name}</div>
                {cafe.topDrink.description && (
                  <p className="text-white/80 text-sm">{cafe.topDrink.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        {cafe.notes && cafe.notes.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-100 dark:border-gray-800 mb-8">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
              Quick Notes
            </h2>
            <ul className="space-y-3">
              {cafe.notes.map((note, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Wi-Fi Test Info */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-4 sm:p-5 mb-8 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Wi-Fi speed tested on {formatDate(cafe.wifi.testedAt)} using Speedtest by Ookla.
              Speeds may vary based on time and network conditions.
            </span>
          </div>
        </div>

        {/* Gallery */}
        {cafe.gallery.length > 1 && (
          <GalleryGrid images={cafe.gallery} cafeName={cafe.name} />
        )}
      </div>
    </main>
  );
}
