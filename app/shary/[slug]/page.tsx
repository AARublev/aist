
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { BALLOON_ITEMS, type DecorItem } from '@/components/catalog/decor-data'
import { DecorCard } from '@/components/catalog/decor-card'
import { DecorDetailClient } from '@/components/catalog/detail/decor-detail-client'

export function generateStaticParams() {
  return BALLOON_ITEMS.map((item) => ({
    slug: item.slug,
  }))
}

function getItem(slug: string): DecorItem | null {
  return (
    BALLOON_ITEMS.find((item) => item.slug === slug) ?? null
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getItem(slug)

  if (!item) return {}

  return {
    title: `${item.title} — воздушные шары на праздник | Аист`,
    description: `${item.description} Цена от ${item.priceFrom.toLocaleString('ru-RU')} ₽. Заказ воздушных шаров в Москве и Московской области.`,
    alternates: {
      canonical: `/shary/${item.slug}`,
    },
    openGraph: {
      title: `${item.title} | Аист`,
      description: item.description,
      images: [{ url: item.image }],
    },
  }
}

export default async function BalloonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getItem(slug)

  if (!item) notFound()


  const similar = BALLOON_ITEMS
    .filter((other) => other.slug !== item.slug)
    .map((other, index) => {
      let score = 0

      // 1. Совпадение повода и категории
      const commonCategories = other.categories.filter((category) =>
        item.categories.includes(category),
      ).length

      score += commonCategories * 5

      // 2. Совпадение гендера.
      // Универсальные композиции подходят обеим категориям.
      const itemGender = item.gender ?? []
      const otherGender = other.gender ?? []

      const genderMatches =
        itemGender.length > 0 &&
        otherGender.length > 0 &&
        itemGender.some((gender) => otherGender.includes(gender))

      if (genderMatches) {
        score += 4
      }

      // 3. Совпадение цветов
      const commonColors = other.colors.filter((color) =>
        item.colors.includes(color),
      ).length

      score += commonColors * 2

      // 4. Совпадение тегов
      const commonTags = other.tags.filter((tag) =>
        item.tags.includes(tag),
      ).length

      score += commonTags * 2

      // 5. Близость цены
      const priceDifference =
        Math.abs(other.priceFrom - item.priceFrom) / item.priceFrom

      if (priceDifference <= 0.15) {
        score += 4
      } else if (priceDifference <= 0.3) {
        score += 2
      } else if (priceDifference <= 0.5) {
        score += 1
      }

      // 6. Небольшой бонус популярным композициям
      if (other.popular) {
        score += 1
      }

      return {
        item: other,
        score,
        index,
      }
    })
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 3)
    .map((entry) => entry.item)


  const productUrl = `https://aist.life/shary/${item.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.title,
    description: item.description,
    image: `https://aist.life${item.image}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: item.priceFrom,
      availability: 'https://schema.org/InStock',
      url: productUrl,
    },
  }

  return (
    <>
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <main className="bg-background px-4 pb-28 pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Хлебные крошки"
            className="text-sm text-muted-foreground"
          >

            <Link
              href="/"
              className="hover:text-primary hover:underline"
            >
              Главная
            </Link>

            <span className="mx-2">—</span>

            <Link
              href="/dekoratsii-i-oformlenie"
              className="hover:text-primary hover:underline"
            >
              Каталог оформления
            </Link>

            <span className="mx-2">—</span>

            <Link
              href="/shary"
              className="hover:text-primary hover:underline"
            >
              Воздушные шары
            </Link>


            <span className="mx-2">—</span>

            <span>{item.title}</span>
          </nav>

          <div className="mt-8">
            <DecorDetailClient item={item} variants={[]} />
          </div>

          {similar.length > 0 && (
            <section className="mt-24">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
                Похожие композиции из шаров
              </h2>

              <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {similar.map((similarItem) => (
                  <DecorCard
                    key={similarItem.slug}
                    item={similarItem}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
