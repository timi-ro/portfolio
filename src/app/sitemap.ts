import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: '/',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: '/#about',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: '/#experience',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: '/#skills',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: '/#contact',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];
}