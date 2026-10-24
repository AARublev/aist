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

  // Похожие фотозоны для того же повода.
  const similar = DECOR_ITEMS.filter(
    (candidate) =>
      (candidate.productType ?? 'photozone') === 'photozone' &&
      candidate.slug !== item.slug &&
      (!item.variantGroup ||
        candidate.variantGroup !== item.variantGroup) &&
      candidate.categories.some((category) =>
        item.categories.includes(category),
      ),
  ).slice(0, 3)

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