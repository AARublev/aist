import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

import { CATEGORY_LABELS, DECOR_ITEMS } from '@/components/catalog/decor-data'
import { DecorCard } from '@/components/catalog/decor-card'
import { DecorDetailClient } from '@/components/catalog/detail/decor-detail-client'

// Pre-render every photozone page at build time — much better for SEO/speed
// than generating them on demand.
export function generateStaticParams() {
  return DECOR_ITEMS.map((item) => ({ slug: item.slug }))
}

function getItem(slug: string) {
  return DECOR_ITEMS.find((i) => i.slug === slug) ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getItem(slug)
  if (!item) return {}

  const occasions = item.categories.map((c) => CATEGORY_LABELS[c]).join(', ')

  return {
    title: `${item.title} — фотозона на ${occasions} | Аист`,
    description: `${item.description} Цена ${item.priceFrom.toLocaleString('ru-RU')} ₽. Аренда и оформление в Москве и области.`,
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

  // Sibling color variants of the same design.
  const variants = DECOR_ITEMS.filter(
    (i) => item.variantGroup && i.variantGroup === item.variantGroup && i.colorVariant,
  )

  // A handful of other designs sharing at least one occasion, excluding
  // this item and its own color siblings.
  const similar = DECOR_ITEMS.filter(
    (i) =>
      i.slug !== item.slug &&
      (!item.variantGroup || i.variantGroup !== item.variantGroup) &&
      i.categories.some((c) => item.categories.includes(c)),
  ).slice(0, 3)

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
      url: `https://aist.life/dekoratsii-i-oformlenie/${item.slug}`,
    },
  }

  return (
    <>
      <SiteHeader />

      {/* eslint-disable-next-line @next/next/no-script-component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-background px-4 pb-28 pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary hover:underline">
              Главная
            </Link>
            <span className="mx-2">—</span>
            <Link href="/dekoratsii-i-oformlenie" className="hover:text-primary hover:underline">
              Каталог оформления
            </Link>
            <span className="mx-2">—</span>
            <span>{item.title}</span>
          </nav>

          <div className="mt-8">
            <DecorDetailClient item={item} variants={variants} />
          </div>

          {similar.length > 0 && (
            <div className="mt-24">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
                Похожие варианты
              </h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {similar.map((i) => (
                  <DecorCard key={i.slug} item={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  )
}