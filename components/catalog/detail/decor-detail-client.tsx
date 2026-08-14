'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Ruler, Sparkles } from 'lucide-react'

import { COLOR_VARIANT_SWATCH, DecorItem } from '../decor-data'
import { ServiceModal } from '@/components/service-modal'

export function DecorDetailClient({
  item,
  variants,
}: {
  item: DecorItem
  // Sibling color variants (same variantGroup, each with colorVariant set).
  // Empty/undefined when this design has no recolored variants yet.
  variants: DecorItem[]
}) {
  const showSwatches = variants.length > 1
  const [selectedSlug, setSelectedSlug] = useState(item.slug)
  const active = (showSwatches && variants.find((v) => v.slug === selectedSlug)) || item

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Photo */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-muted shadow-[0_25px_50px_-28px_rgba(70,110,170,0.6)]">
          <Image
            src={active.image}
            alt={active.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            {active.premium && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                <Sparkles className="size-3" aria-hidden="true" />
                Premium
              </span>
            )}
            {active.new && (
              <span className="rounded-full bg-[var(--mint)] px-3 py-1 text-xs font-semibold text-primary-foreground">
                Новинка
              </span>
            )}
            {active.popular && (
              <span className="rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-semibold text-primary-foreground">
                Хит
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {active.title}
          </h1>

          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {active.description}
          </p>

          {showSwatches && (
            <div className="mt-6">
              <span className="mb-2 block text-sm font-semibold text-foreground">Цвет</span>
              <div className="flex gap-2">
                {variants.map((v) => (
                  <button
                    key={v.slug}
                    type="button"
                    onClick={() => setSelectedSlug(v.slug)}
                    aria-label={v.title}
                    aria-pressed={v.slug === selectedSlug}
                    className={`size-9 rounded-full border-2 shadow-sm transition-transform ${
                      v.slug === selectedSlug
                        ? 'scale-110 border-primary'
                        : 'border-border hover:scale-105'
                    }`}
                    style={{ backgroundColor: COLOR_VARIANT_SWATCH[v.colorVariant!] }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {active.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-muted-foreground">
            <Ruler className="size-4" aria-hidden="true" />
            Размер: {active.width} × {active.height} м
          </div>

          {active.colors.length > 0 && (
            <p className="mt-2 text-muted-foreground">Цвета оформления: {active.colors.join(', ')}</p>
          )}

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6 rounded-[1.75rem] bg-card p-6 shadow-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Стоимость</p>
              <p className="text-4xl font-bold text-foreground">
                {active.priceFrom.toLocaleString('ru-RU')} ₽
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-[0_16px_35px_-10px_var(--primary)] transition-transform hover:scale-[1.02]"
            >
              Заказать
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <ServiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        service={{ title: active.title }}
      />
    </>
  )
}