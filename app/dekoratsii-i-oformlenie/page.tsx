import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { CatalogCtaButton } from '@/components/catalog/dekoratsii-i-oformlenie-cta-button'

import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

import { DECOR_ITEMS } from '@/components/catalog/decor-data'
import { CatalogGrid } from '@/components/catalog/catalog-grid'

export const metadata: Metadata = {
  title: 'Каталог фотозон | Аист',
  description:
    'Готовые фотозоны и оформление для выписки из роддома, гендер-пати, дня рождения и крещения в Москве и Московской области.',
}

// Quick-access tags in the hero — same occasions as the filter bar below,
// so clicking one pre-selects that filter and jumps straight to results.
const HERO_TAGS: { label: string; category: string }[] = [
  { label: 'фотозоны на выписку', category: 'baby' },
  { label: 'гендер-пати', category: 'gender' },
  { label: 'дни рождения', category: 'birthday' },
  { label: 'крещение', category: 'christening' },
]

export default function CatalogPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* HERO — looping background video, brand-toned overlay (not the
            competitor's dark-luxury palette, kept true to Аист's pastel look) */}
        <section className="relative isolate overflow-hidden">
          <video
            src="/videos/dekoratsii-i-oformlenie-hero.mp4"
            poster="/images/dekoratsii-i-oformlenie-hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 -z-10 size-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/90 via-primary/55 to-primary/20" />

          <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-28 text-primary-foreground md:pt-32">
            <nav aria-label="Хлебные крошки" className="text-sm text-primary-foreground/70">
              <Link href="/" className="hover:text-primary-foreground hover:underline">
                Главная
              </Link>
              <span className="mx-2">—</span>
              <span>Каталог оформления</span>
            </nav>

            <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Оформление и декор
              <br />
              <span className="italic text-primary-foreground/90">детских праздников</span>
            </h1>

            <p className="mt-4 max-w-lg text-pretty leading-relaxed text-primary-foreground/85">
              Создаём декор, который превращает пространство в мир вашего праздника — тематический,
              продуманный, до мелочей.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {HERO_TAGS.map((tag) => (
                <Link
                  key={tag.category}
                  href={`/dekoratsii-i-oformlenie?category=${tag.category}#dekoratsii-i-oformlenie`}
                  className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-primary-foreground/20"
                >
                  {tag.label}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <CatalogCtaButton className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3.5 text-sm font-semibold text-primary shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl" />
            </div>
          </div>
        </section>

        {/* CATALOG */}
        <section id="dekoratsii-i-oformlenie" className="relative bg-background px-4 pb-28 pt-14">
          <div className="mx-auto max-w-6xl">
            <Suspense fallback={<div className="h-40 animate-pulse rounded-[2rem] bg-muted" />}>
              <CatalogGrid items={DECOR_ITEMS} />
            </Suspense>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}