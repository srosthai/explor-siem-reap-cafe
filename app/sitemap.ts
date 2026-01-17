import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/cafes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://siemreapcafes.com';
  const slugs = getAllSlugs();

  const cafeUrls = slugs.map((slug) => ({
    url: `${baseUrl}/cafe/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...cafeUrls,
  ];
}
