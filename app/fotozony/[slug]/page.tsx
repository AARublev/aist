import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

import { CATEGORY_LABELS, DECOR_ITEMS } from '@/components/catalog/decor-data'
import { DecorCard } from '@/components/catalog/decor-card'
import { DecorDetailClient } from '@/components/catalog/detail/decor-detail-client'

// Предварительно создаём страницы всех фотозон при сборке проекта.
export function generateStaticParams() {
  return DECOR_ITEMS
    .filter((item) => (item.productType ?? 'photozone') === 'photozone')
    .map((item) => ({ slug: item.slug }))
}

function getItem(slug: string) {
  return (
    DECOR_ITEMS.find(
      (item) =>
        item.slug === slug &&
        (item.productType ?? 'photozone') === 'photozone',
    ) ?? null
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

  const occasions = item.categories
    .map((category) => CATEGORY_LABELS[category])
    .join(', ')

  return {
    title: `${item.title} — фотозона на ${occasions} | Аист`,
    description: `${item.description} Цена ${item.priceFrom.toLocaleString('ru-RU')} ₽. Аренда и оформление в Москве и области.`,
    alternates: {
      canonical: `/fotozony/${item.slug}`,
    },
    openGraph: {
      title: item.title,
      description: item.description,
      images: [{ url: item.image }],
    },
  }
}

export default async function DecorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getItem(slug)

  if (!item) notFound()

  // Цветовые варианты этой фотозоны.
  const variants = DECOR_ITEMS.filter(
    (candidate) =>
      (candidate.productType ?? 'photozone') === 'photozone' &&
      item.variantGroup &&
      candidate.variantGroup === item.variantGroup &&
      candidate.colorVariant,
  )


  // Похожие фотозоны: ранжируем по степени сходства.
  const similar = DECOR_ITEMS
    .filter(
      (candidate) =>
        (candidate.productType ?? 'photozone') === 'photozone' &&
        candidate.slug !== item.slug &&
        (!item.variantGroup ||
          candidate.variantGroup !== item.variantGroup),
    )
    .map((candidate, index) => {
      let score = 0

      // 1. Совпадение поводов и категорий
      const commonCategories = candidate.categories.filter((category) =>
        item.categories.includes(category),
      ).length

      score += commonCategories * 5

      // 2. Совпадение цветов
      const commonColors = candidate.colors.filter((color) =>
        item.colors.includes(color),
      ).length

      score += commonColors * 2

      // 3. Совпадение тегов
      const commonTags = candidate.tags.filter((tag) =>
        item.tags.includes(tag),
      ).length

      score += commonTags * 2

      // 4. Близость цены
      const priceDifference =
        Math.abs(candidate.priceFrom - item.priceFrom) /
        Math.max(item.priceFrom, 1)

      if (priceDifference <= 0.15) {
        score += 4
      } else if (priceDifference <= 0.3) {
        score += 2
      } else if (priceDifference <= 0.5) {
        score += 1
      }

      // 5. Небольшой бонус популярным фотозонам
      if (candidate.popular) {
        score += 1
      }

      return {
        item: candidate,
        score,
        index,
      }
    })
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 3)
    .map((entry) => entry.item)


  const productUrl = `https://aist.life/fotozony/${item.slug}`

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
              href="/fotozony"
              className="hover:text-primary hover:underline"
            >
              Фотозоны
            </Link>


            <span className="mx-2">—</span>

            <span>{item.title}</span>
          </nav>

          <div className="mt-8">
            <DecorDetailClient item={item} variants={variants} />
          </div>

          {similar.length > 0 && (
            <section className="mt-24">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
                Похожие варианты
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