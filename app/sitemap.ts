import type { MetadataRoute } from 'next'
import { DECOR_ITEMS } from '@/components/catalog/decor-data'

const BASE_URL = 'https://aist.life'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/dekoratsii-i-oformlenie`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/form`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/consent`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Every individual photozone page, generated automatically from the
  // catalog data — new items you add later will appear here on their own,
  // no need to touch this file again.
  const catalogPages: MetadataRoute.Sitemap = DECOR_ITEMS.map((item) => ({
    url: `${BASE_URL}/dekoratsii-i-oformlenie/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...catalogPages]
}