import type { MetadataRoute } from 'next'
import {
  DECOR_ITEMS,
  BALLOON_ITEMS,
} from '@/components/catalog/decor-data'

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
      url: `${BASE_URL}/fotozony`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/shary`,
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

  const photozonePages: MetadataRoute.Sitemap = DECOR_ITEMS
    .filter((item) => (item.productType ?? 'photozone') === 'photozone')
    .map((item) => ({
      url: `${BASE_URL}/fotozony/${item.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  const balloonPages: MetadataRoute.Sitemap = BALLOON_ITEMS.map((item) => ({
    url: `${BASE_URL}/shary/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...photozonePages, ...balloonPages]
}