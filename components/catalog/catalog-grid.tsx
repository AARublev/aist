'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowUpDown, SearchX, SlidersHorizontal, X } from 'lucide-react'

import {
  CATEGORY_LABELS,
  COLOR_VARIANT_LABELS,
  ColorVariant,
  DecorCategory,
  DecorItem,
  PRICE_RANGES,
  SORT_LABELS,
  SortOption,
} from './decor-data'

import { DecorCard } from './decor-card'
import { CatalogCtaButton } from './dekoratsii-i-oformlenie-cta-button'

const CATEGORIES: DecorCategory[] = ['baby', 'gender', 'birthday', 'christening', 'other']

const COLOR_VARIANTS: ColorVariant[] = ['boy', 'girl', 'neutral']

const SORT_OPTIONS: SortOption[] = ['default', 'popular', 'price-asc', 'price-desc']

type Group = {
  key: string
  items: DecorItem[]
  minPrice: number
  isPopular: boolean
}

export function CatalogGrid({ items }: { items: DecorItem[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const [filtersOpen, setFiltersOpen] = useState(false)

  const activeCategory = params.get('category') ?? 'all'
  const activePrice = params.get('price') ?? 'all'
  const activeColor = params.get('color') ?? 'all'
  const activeSort = (params.get('sort') as SortOption) ?? 'default'

  const hasColorData = useMemo(() => items.some((item) => item.colorVariant), [items])

  const extraFilterCount = (activePrice !== 'all' ? 1 : 0) + (activeColor !== 'all' ? 1 : 0)

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)

    if (value === '' || value === 'all' || value === 'default') {
      next.delete(key)
    } else {
      next.set(key, value)
    }

    const query = next.toString()

    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    })
  }

  const resetExtraFilters = () => {
    const next = new URLSearchParams(params)

    next.delete('price')
    next.delete('color')

    const query = next.toString()

    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    })
  }

  useEffect(() => {
    if (!filtersOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFiltersOpen(false)
      }
    }

    document.addEventListener('keydown', onKey)

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [filtersOpen])

  const filtered = useMemo(() => {
    const priceRange = PRICE_RANGES.find((range) => range.id === activePrice)

    return items.filter((item) => {
      if (activeCategory !== 'all' && !item.categories.includes(activeCategory as DecorCategory)) {
        return false
      }

      if (priceRange) {
        if (priceRange.min !== undefined && item.priceFrom < priceRange.min) {
          return false
        }

        if (priceRange.max !== undefined && item.priceFrom >= priceRange.max) {
          return false
        }
      }

      if (activeColor !== 'all' && item.colorVariant !== activeColor) {
        return false
      }

      return true
    })
  }, [items, activeCategory, activePrice, activeColor])

  const groups = useMemo<Group[]>(() => {
    const map = new Map<string, DecorItem[]>()

    for (const item of filtered) {
      const key = item.variantGroup ?? `single:${item.slug}`

      if (!map.has(key)) {
        map.set(key, [])
      }

      map.get(key)!.push(item)
    }

    return Array.from(map.entries()).map(([key, groupItems]) => ({
      key,
      items: groupItems,
      minPrice: Math.min(...groupItems.map((item) => item.priceFrom)),
      isPopular: groupItems.some((item) => item.popular),
    }))
  }, [filtered])

  const sortedGroups = useMemo(() => {
    const sorted = [...groups]

    if (activeSort === 'price-asc') {
      sorted.sort((a, b) => a.minPrice - b.minPrice)
    } else if (activeSort === 'price-desc') {
      sorted.sort((a, b) => b.minPrice - a.minPrice)
    } else if (activeSort === 'popular') {
      sorted.sort((a, b) => Number(b.isPopular) - Number(a.isPopular))
    }

    return sorted
  }, [groups, activeSort])

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setParam('category', 'all')}
            aria-pressed={activeCategory === 'all'}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              activeCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground shadow-sm hover:bg-muted'
            }`}
          >
            Все поводы
          </button>

          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setParam('category', category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground shadow-sm hover:bg-muted'
              }`}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Фильтры

            {extraFilterCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {extraFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="size-4 text-muted-foreground" aria-hidden="true" />

          <label htmlFor="catalog-sort" className="text-sm text-muted-foreground">
            Сортировка:
          </label>

          <select
            id="catalog-sort"
            value={activeSort}
            onChange={(e) => setParam('sort', e.target.value)}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {SORT_LABELS[option]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtersOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Фильтры каталога"
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 bg-foreground/45 backdrop-blur-sm"
          />

          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h3 className="font-display text-lg font-bold text-foreground">Фильтры</h3>

              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Закрыть окно"
                className="flex size-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-border"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[60vh] space-y-6 overflow-y-auto px-6 py-6">
              <div>
                <span className="mb-2 block text-sm font-semibold text-foreground">Цена</span>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setParam('price', 'all')}
                    aria-pressed={activePrice === 'all'}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activePrice === 'all'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-muted'
                    }`}
                  >
                    Любая
                  </button>

                  {PRICE_RANGES.map((range) => (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => setParam('price', range.id)}
                      aria-pressed={activePrice === range.id}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        activePrice === range.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-muted'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {hasColorData && (
                <div>
                  <span className="mb-2 block text-sm font-semibold text-foreground">Цвет</span>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setParam('color', 'all')}
                      aria-pressed={activeColor === 'all'}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        activeColor === 'all'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-muted'
                      }`}
                    >
                      Любой
                    </button>

                    {COLOR_VARIANTS.map((variant) => (
                      <button
                        key={variant}
                        type="button"
                        onClick={() => setParam('color', variant)}
                        aria-pressed={activeColor === variant}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                          activeColor === variant
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-foreground hover:bg-muted'
                        }`}
                      >
                        {COLOR_VARIANT_LABELS[variant]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-5">
              <button
                type="button"
                onClick={resetExtraFilters}
                className="text-sm font-semibold text-muted-foreground underline-offset-2 hover:underline"
              >
                Сбросить
              </button>

              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Показать {sortedGroups.length}
              </button>
            </div>
          </div>
        </div>
      )}

      {sortedGroups.length > 0 ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {sortedGroups.map((group) => (
            <DecorCard
              key={group.key}
              item={group.items[0]}
              siblings={group.items.length > 1 ? group.items : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-[2rem] border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <SearchX className="size-10 text-muted-foreground" aria-hidden="true" />

          <h3 className="mt-4 font-display text-xl font-bold text-foreground">
            Ничего не нашлось под эти условия
          </h3>

          <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
            Не нашли то, что искали? Опишите идею — подберём или разработаем оформление под ваш
            праздник индивидуально.
          </p>

          <CatalogCtaButton
            label="Обсудить индивидуальный проект"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_25px_-8px_var(--primary)] transition-transform hover:scale-105"
          />
        </div>
      )}
    </div>
  )
}