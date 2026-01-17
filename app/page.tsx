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
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://siemreapcafes.com'}/icon.svg`,
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find your next cafe vibe in Siem Reap
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the best spots for working, chilling, or grabbing a great
            coffee. We test the Wi-Fi so you don&apos;t have to.
          </p>
        </header>

        <CafeGrid cafes={cafes} />
      </div>
    </main>
  );
}
