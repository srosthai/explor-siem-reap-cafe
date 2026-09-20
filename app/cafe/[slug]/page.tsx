import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/GalleryGrid';
import { ShareButton } from '@/components/ShareButton';
import { BackButton } from '@/components/BackButton';
import { WifiSignal } from '@/components/ui/WifiSignal';
import { getCafeBySlug, getAllSlugs, formatTime, getOpenStatus, getWifiSpeedLabel } from '@/lib/cafes';

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
      title: 'Cafe Not Found - Siem Reap Cafe Finder',
    };
  }

  return {
    title: `${cafe.name} - Siem Reap Cafe Finder`,
    description: `${cafe.name} in ${cafe.area}. Wi-Fi: ${cafe.wifi.downloadMbps} Mbps, Min price: $${cafe.minPriceUsd}. ${cafe.tags.join(', ')}.`,
    openGraph: {
      title: `${cafe.name} - Siem Reap Cafe Finder`,
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

  const wifiInfo = getWifiSpeedLabel(cafe.wifi.downloadMbps);

  return (
    <main className="min-h-screen bg-paper dark:bg-ink -mt-[70px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section — shorter, more focused */}
      <div className="relative h-[50vh] min-h-[400px] max-h-[600px] w-full">
        <Image
          src={cafe.gallery[0] || '/images/placeholder-cafe.svg'}
          alt={cafe.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/10" />

        {/* Back Button */}
        <div className="absolute top-20 left-4 sm:left-6 lg:left-8 z-10">
          <BackButton />
        </div>

        {/* Hero Content — minimal, just name and location */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
                openStatus.isOpen
                  ? 'bg-palm/90 text-paper'
                  : 'bg-paper/20 text-paper'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${openStatus.isOpen ? 'bg-paper animate-pulse' : 'bg-paper/60'}`} />
                {openStatus.isOpen ? 'Open now' : 'Closed'}
              </span>
              <span className="px-3 py-1 rounded-full bg-paper/15 backdrop-blur-sm text-paper/90 text-sm">
                {cafe.area}
              </span>
              {cafe.trending && (
                <span className="px-3 py-1 rounded-full bg-clay/90 backdrop-blur-sm text-paper text-sm font-medium">
                  Trending
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-paper drop-shadow-lg">
              {cafe.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Quick info bar — immediately below hero */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-5 text-sm text-ink/55 dark:text-paper/55 border-b border-ink/10 dark:border-paper/10">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatTime(cafe.hours.open)} – {formatTime(cafe.hours.close)}
          </span>
          {cafe.addressShort && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {cafe.addressShort}
            </span>
          )}
          <span className={`flex items-center gap-1.5 font-medium ${openStatus.isOpen ? 'text-palm' : ''}`}>
            {openStatus.label}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 py-5">
          <a
            href={cafe.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-palm text-paper rounded-xl text-sm font-medium hover:bg-palm-deep transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Directions
          </a>
          <ShareButton title={cafe.name} />
        </div>

        {/* Wi-Fi Speed — prominent standalone card */}
        <div className="rounded-xl p-5 border border-ink/8 dark:border-paper/10 bg-paper dark:bg-ink-soft mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <WifiSignal mbps={cafe.wifi.downloadMbps} size="md" className="text-2xl" />
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${wifiInfo.colorClass}`}>
                {wifiInfo.label}
              </span>
            </div>
          </div>
          <div className="text-xs text-ink/45 dark:text-paper/45 mt-2">
            {cafe.wifi.uploadMbps} Mbps upload
            {cafe.wifi.latencyMs && ` · ${cafe.wifi.latencyMs}ms ping`}
          </div>
        </div>

        {/* Stats Row — compact horizontal layout */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-paper dark:bg-ink-soft rounded-xl p-4 border border-ink/8 dark:border-paper/10 text-center">
            <div className="text-xl font-bold text-ink dark:text-paper tabular-nums">
              ${cafe.minPriceUsd.toFixed(2)}
            </div>
            <div className="text-xs text-ink/45 dark:text-paper/45 mt-0.5">Min. price</div>
          </div>
          <div className="bg-paper dark:bg-ink-soft rounded-xl p-4 border border-ink/8 dark:border-paper/10 text-center">
            <div className="text-xl font-bold text-ink dark:text-paper">
              {cafe.powerOutlets || '—'}
            </div>
            <div className="text-xs text-ink/45 dark:text-paper/45 mt-0.5">Power outlets</div>
          </div>
          <div className="bg-paper dark:bg-ink-soft rounded-xl p-4 border border-ink/8 dark:border-paper/10 text-center">
            <div className="text-xl font-bold text-ink dark:text-paper">
              {cafe.vibeScore ? `${cafe.vibeScore}/10` : '—'}
            </div>
            <div className="text-xs text-ink/45 dark:text-paper/45 mt-0.5">Vibe score</div>
          </div>
        </div>

        {/* Staff Recommendation */}
        {cafe.topDrink && (
          <div className="bg-clay rounded-xl p-5 mb-6 text-paper">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-paper/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <div className="text-paper/70 text-xs font-medium mb-1">Must try</div>
                <div className="text-lg font-semibold">{cafe.topDrink.name}</div>
                {cafe.topDrink.description && (
                  <p className="text-paper/80 text-sm mt-0.5">{cafe.topDrink.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Two-column info section */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {/* Tags */}
          <div className="bg-paper dark:bg-ink-soft rounded-xl p-5 border border-ink/8 dark:border-paper/10">
            <h2 className="text-sm font-medium text-ink/55 dark:text-paper/55 mb-3">
              Good for
            </h2>
            <div className="flex flex-wrap gap-2">
              {cafe.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1.5 bg-ink/5 dark:bg-paper/10 rounded-lg text-sm text-ink/70 dark:text-paper/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Ambiance */}
          <div className="bg-paper dark:bg-ink-soft rounded-xl p-5 border border-ink/8 dark:border-paper/10">
            <h2 className="text-sm font-medium text-ink/55 dark:text-paper/55 mb-3">
              Ambiance
            </h2>
            <div className="space-y-2.5">
              {cafe.lighting && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink/55 dark:text-paper/55">Lighting</span>
                  <span className="text-sm font-medium text-ink dark:text-paper">{cafe.lighting}</span>
                </div>
              )}
              {cafe.music && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink/55 dark:text-paper/55">Music</span>
                  <span className="text-sm font-medium text-ink dark:text-paper">{cafe.music}</span>
                </div>
              )}
              {cafe.seating && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink/55 dark:text-paper/55">Seating</span>
                  <span className="text-sm font-medium text-ink dark:text-paper">{cafe.seating}</span>
                </div>
              )}
              {!cafe.lighting && !cafe.music && !cafe.seating && (
                <p className="text-sm text-ink/40 dark:text-paper/40">No ambiance details yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        {cafe.notes && cafe.notes.length > 0 && (
          <div className="bg-paper dark:bg-ink-soft rounded-xl p-5 border border-ink/8 dark:border-paper/10 mb-6">
            <h2 className="text-sm font-medium text-ink/55 dark:text-paper/55 mb-3">
              Notes
            </h2>
            <ul className="space-y-2.5">
              {cafe.notes.map((note, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-clay mt-1.5 flex-shrink-0" />
                  <span className="text-ink/65 dark:text-paper/65 leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gallery */}
        {cafe.gallery.length > 1 && (
          <div className="mb-6">
            <GalleryGrid images={cafe.gallery} cafeName={cafe.name} />
          </div>
        )}

        {/* Wi-Fi Test Disclaimer — subtle footer note */}
        <div className="flex items-start gap-2.5 py-4 border-t border-ink/10 dark:border-paper/10 text-xs text-ink/40 dark:text-paper/40">
          <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Wi-Fi tested {formatDate(cafe.wifi.testedAt)} via Speedtest by Ookla. Speeds vary by time and network load.
          </span>
        </div>
      </div>
    </main>
  );
}
