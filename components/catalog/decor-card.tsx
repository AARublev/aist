'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Ruler, Sparkles, CircleDot } from 'lucide-react'

import { CATEGORY_LABELS, COLOR_VARIANT_SWATCH, DecorItem } from './decor-data'

function getBallWord(count: number) {
  const lastTwo = count % 100
  const last = count % 10

  if (lastTwo >= 11 && lastTwo <= 14) return 'шаров'
  if (last === 1) return 'шар'
  if (last >= 2 && last <= 4) return 'шара'
  return 'шаров'
}

export function DecorCard({
  item,
  siblings,
}: {
  item: DecorItem
  siblings?: DecorItem[]
}) {
  const variants = (siblings ?? []).filter((s) => s.colorVariant && (s.productType ?? 'photozone') === 'photozone')
  const showSwatches = variants.length > 1
  const [selectedSlug, setSelectedSlug] = useState(item.slug)
  const active = (showSwatches && variants.find((v) => v.slug === selectedSlug)) || item
  const isBalloon = active.productType === 'balloons'
  const href = isBalloon
    ? `/shary/${active.slug}`
    : `/fotozony/${active.slug}`

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={active.image}
            alt={active.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
              {isBalloon ? 'Воздушные шары' : 'Фотозона'}
            </span>
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

          {showSwatches && (
            <div className="absolute bottom-4 left-4 flex gap-1.5">
              {variants.map((variant) => (
                <button
                  key={variant.slug}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setSelectedSlug(variant.slug)
                  }}
                  aria-label={variant.title}
                  aria-pressed={variant.slug === selectedSlug}
                  className={`size-6 rounded-full border-2 shadow-sm transition-transform ${variant.slug === selectedSlug
                    ? 'scale-110 border-primary-foreground'
                    : 'border-primary-foreground/50 hover:scale-105'
                    }`}
                  style={{ backgroundColor: COLOR_VARIANT_SWATCH[variant.colorVariant!] }}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-4 p-6">
        <div>
          <p className="text-sm font-medium text-primary">
            {active.categories.map((category) => CATEGORY_LABELS[category]).join(' · ')}
          </p>
          <Link href={href} className="block">
            <h3 className="mt-1 text-2xl font-bold text-foreground">{active.title}</h3>
          </Link>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {active.description}
          </p>
        </div>

        {isBalloon && (active.quantity || active.composition || active.size) ? (
          <div className="space-y-1.5 text-sm text-muted-foreground">
            {active.quantity ? (
              <p className="inline-flex items-center gap-2">
                <CircleDot className="size-4" aria-hidden="true" />
                {active.quantity} {getBallWord(active.quantity)}
              </p>
            ) : null}
            {active.composition ? <p>{active.composition}</p> : null}
            {active.size ? <p>Размер: {active.size}</p> : null}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Ruler className="size-4" aria-hidden="true" />
            {active.width} × {active.height} м
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {active.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between pt-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Стоимость</p>
            <p className="text-3xl font-bold text-foreground">
              {active.priceFrom.toLocaleString('ru-RU')} ₽
            </p>
          </div>
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Подробнее
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
