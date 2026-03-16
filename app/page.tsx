import Image from 'next/image';
import { CafeGrid } from '@/components/CafeGrid';
import { getAllCafes } from '@/lib/cafes';

export default function HomePage() {
  const cafes = getAllCafes();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Siem Reap Cafes',
    description: 'Find the best cafes in Siem Reap, Cambodia with tested Wi-Fi speeds, minimum prices, and vibe ratings.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://siemreapcafes.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://siemreapcafes.com'}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Siem Reap Cafes',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://siemreapcafes.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://siemreapcafes.com'}/images/logo-icon.svg`,
    description: 'Your guide to the best cafes in Siem Reap, Cambodia for digital nomads and coffee lovers.',
    areaServed: {
      '@type': 'City',
      name: 'Siem Reap',
      containedInPlace: {
        '@type': 'Country',
        name: 'Cambodia',
      },
    },
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: cafes.slice(0, 10).map((cafe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CafeOrCoffeeShop',
        name: cafe.name,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://siemreapcafes.com'}/cafe/${cafe.slug}`,
        image: cafe.gallery[0],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Siem Reap',
          addressRegion: cafe.area,
          addressCountry: 'Cambodia',
        },
        priceRange: `$${cafe.minPriceUsd}+`,
      },
    })),
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/logo-full.svg"
              alt="Siem Reap Cafe Finder"
              width={260}
              height={80}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-50 mb-4 leading-[1.1]">
            Find your next
            <br />
            cafe vibe
          </h1>
          <p className="text-base sm:text-lg text-stone-500 dark:text-stone-400 max-w-lg mx-auto leading-relaxed">
            We test the Wi-Fi, track the prices, and rate the vibes — so you can just enjoy the coffee.
          </p>
        </header>

        <CafeGrid cafes={cafes} />
      </div>
    </main>
  );
}
