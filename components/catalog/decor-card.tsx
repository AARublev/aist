'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Ruler, Sparkles } from 'lucide-react'

import { CATEGORY_LABELS, COLOR_VARIANT_SWATCH, DecorItem } from './decor-data'

export function DecorCard({
  item,
  siblings,
}: {
  item: DecorItem
  // Other color variants of the same design (same variantGroup). Only items
  // that actually have `colorVariant` set are used for the swatch picker —
  // if fewer than 2 qualify, no swatches are shown and the card behaves
  // exactly as before.
  siblings?: DecorItem[]
}) {
  const variants = (siblings ?? []).filter((s) => s.colorVariant)
  const showSwatches = variants.length > 1

  const [selectedSlug, setSelectedSlug] = useState(item.slug)
  const active = (showSwatches && variants.find((v) => v.slug === selectedSlug)) || item

  return (
    <Link
      href={`/dekoratsii-i-oformlenie/${active.slug}`}
      className="group block overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={active.image}
          alt={active.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
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

        {/* Color swatch picker — only rendered once real variants exist */}
        {showSwatches && (
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            {variants.map((v) => (
              <button
                key={v.slug}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedSlug(v.slug)
                }}
                aria-label={v.title}
                aria-pressed={v.slug === selectedSlug}
                className={`size-6 rounded-full border-2 shadow-sm transition-transform ${
                  v.slug === selectedSlug
                    ? 'scale-110 border-primary-foreground'
                    : 'border-primary-foreground/50 hover:scale-105'
                }`}
                style={{ backgroundColor: COLOR_VARIANT_SWATCH[v.colorVariant!] }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4 p-6">
        <div>
          <p className="text-sm font-medium text-primary">
            {active.categories.map((c) => CATEGORY_LABELS[c]).join(' · ')}
          </p>
          <h3 className="mt-1 text-2xl font-bold text-foreground">{active.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {active.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {active.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Ruler className="size-4" aria-hidden="true" />
          {active.width} × {active.height} м
        </div>

        <div className="flex items-end justify-between pt-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Стоимость</p>
            <p className="text-3xl font-bold text-foreground">
              {active.priceFrom.toLocaleString('ru-RU')} ₽
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform group-hover:scale-105">
            Подробнее
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}