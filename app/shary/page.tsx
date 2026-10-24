import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'

import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { DECOR_ITEMS } from '@/components/catalog/decor-data'
import { CatalogGrid } from '@/components/catalog/catalog-grid'
import { CatalogCtaButton } from '@/components/catalog/dekoratsii-i-oformlenie-cta-button'

export const metadata: Metadata = {
  title: 'Воздушные шары на праздник в Москве и области | Аист',
  description:
    'Воздушные шары, праздничные наборы и композиции для выписки из роддома, дня рождения и детского праздника в Москве и Московской области.',
  alternates: {
    canonical: '/shary',
  },
}

export default function SharyPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative isolate overflow-hidden">
          <video
            src="/videos/dekoratsii-i-oformlenie-hero.mp4"
            poster="/images/dekoratsii-i-oformlenie-hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full object-cover"
          />

          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/90 via-primary/55 to-primary/20" />

          <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-28 text-primary-foreground md:pt-32">
            <nav
              aria-label="Хлебные крошки"
              className="text-sm text-primary-foreground/75"
            >
              <Link href="/" className="hover:underline">
                Главная
              </Link>
              <span className="mx-2">—</span>
              <Link
                href="/dekoratsii-i-oformlenie"
                className="hover:underline"
              >
                Каталог оформления
              </Link>
              <span className="mx-2">—</span>
              <span>Воздушные шары</span>
            </nav>

            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Воздушные шары на праздник
            </h1>

            <p className="mt-4 max-w-2xl leading-relaxed text-primary-foreground/90">
              Праздничные композиции и наборы воздушных шаров для выписки
              из роддома, дня рождения и других важных событий.
              Подберём оформление под вашу идею.
            </p>

            <div className="mt-8">
              <CatalogCtaButton className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3.5 text-sm font-semibold text-primary shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl" />
            </div>
          </div>
        </section>

        <section
          id="catalog"
          className="bg-background px-4 pb-24 pt-10"
        >
          <div className="mx-auto max-w-6xl">
            <Suspense
              fallback={
                <div className="h-40 animate-pulse rounded-[2rem] bg-muted" />
              }
            >
              <CatalogGrid
                items={DECOR_ITEMS}
                initialType="balloons"
              />
            </Suspense>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}