'use client'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowUpDown, Gift, SearchX, SlidersHorizontal, X } from 'lucide-react'
import {
  BALLOON_ITEMS,
  BALLOON_PRICE_RANGES,
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
type CatalogType = 'all' | 'photozone' | 'balloons'
const CATEGORIES: DecorCategory[] = [
  'baby',
  'gender',
  'birthday',
  'christening',
  'other',
]
const COLOR_VARIANTS: ColorVariant[] = ['boy', 'girl', 'neutral']
const SORT_OPTIONS: SortOption[] = [
  'default',
  'popular',
  'price-asc',
  'price-desc',
]
const CATALOG_PATHS: Record<CatalogType, string> = {
  all: '/dekoratsii-i-oformlenie',
  photozone: '/fotozony',
  balloons: '/shary',
}
type Group = {
  key: string
  items: DecorItem[]
  minPrice: number
  isPopular: boolean
}
function groupItems(items: DecorItem[]): Group[] {
  const map = new Map<string, DecorItem[]>()
  for (const item of items) {
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
}
function sortGroups(groups: Group[], sort: SortOption): Group[] {
  const result = [...groups]
  if (sort === 'price-asc') {
    result.sort((a, b) => a.minPrice - b.minPrice)
  } else if (sort === 'price-desc') {
    result.sort((a, b) => b.minPrice - a.minPrice)
  } else if (sort === 'popular') {
    result.sort(
      (a, b) => Number(b.isPopular) - Number(a.isPopular),
    )
  }
  return result
}
export function CatalogGrid({
  items,
  initialType = 'all',
}: {
  items: DecorItem[]
  initialType?: CatalogType
}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  // Тип каталога определяется страницей:  // /dekoratsii-i-oformlenie — всё,  // /fotozony — фотозоны,  // /shary — воздушные шары.
  const activeType = initialType
  const activeCategory = params.get('category') ?? 'all'
  const activePrice = params.get('price') ?? 'all'
  const activeColor = params.get('color') ?? 'all'
  const activeGender = params.get('gender') ?? 'all'
  const sortParam = params.get('sort')
  const activeSort: SortOption = SORT_OPTIONS.includes(
    sortParam as SortOption,
  )
    ? (sortParam as SortOption)
    : 'default'
  // Объединяем фотозоны и отдельный ассортимент шаров.  // Защита от дубликатов по slug.
  const allItems = useMemo(() => {
    const bySlug = new Map<string, DecorItem>()
    for (const item of [...items, ...BALLOON_ITEMS]) {
      const type = item.productType ?? 'photozone'
      bySlug.set(`${type}:${item.slug}`, item)
    }
    return Array.from(bySlug.values())
  }, [items])
  const hasColorData = useMemo(
    () =>
      allItems.some(
        (item) =>
          (item.productType ?? 'photozone') === 'photozone' &&
          item.colorVariant,
      ),
    [allItems],
  )
  const extraFilterCount =
    (activePrice !== 'all' ? 1 : 0) +
    (activeColor !== 'all' && activeType !== 'balloons' ? 1 : 0) +
    (activeGender !== 'all' ? 1 : 0)
  // Меняем фильтры, сохраняя остальные параметры URL.
  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString())
    if (!value || value === 'all' || value === 'default') {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    const query = next.toString()
    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    })
  }
  // Переключаем именно страницы, а не параметр ?type=...
  const navigateType = (type: CatalogType) => {
    const next = new URLSearchParams(params.toString())
    next.delete('type')
    // Цветовой фильтр относится только к фотозонам.
    if (type === 'balloons') {
      next.delete('color')
    }
    const query = next.toString()
    const targetPath = CATALOG_PATHS[type]
    const targetUrl = query ? `${targetPath}?${query}` : targetPath
    router.push(targetUrl, { scroll: false })
  }
  const resetExtraFilters = () => {
    const next = new URLSearchParams(params.toString())
    next.delete('price')
    next.delete('color')
    next.delete('gender')
    const query = next.toString()
    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    })
  }
  useEffect(() => {
    if (!filtersOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFiltersOpen(false)
      }
    }
    const previousOverflow = document.body.style.overflow
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [filtersOpen])
  const currentPriceRanges =
    activeType === 'balloons'
      ? BALLOON_PRICE_RANGES
      : PRICE_RANGES
  const filtered = useMemo(() => {
    const priceRange = currentPriceRanges.find(
      (range) => range.id === activePrice,
    )
    return allItems.filter((item) => {
      const itemType = item.productType ?? 'photozone'
      if (activeType !== 'all' && itemType !== activeType) {
        return false
      }
      if (
        activeCategory !== 'all' &&
        !item.categories.includes(activeCategory as DecorCategory)
      ) {
        return false
      }

      if (activeGender !== 'all') {
        const itemGender = item.gender ?? []

        if (activeGender === 'boy' && !itemGender.includes('boy')) {
          return false
        }

        if (activeGender === 'girl' && !itemGender.includes('girl')) {
          return false
        }

        if (
          activeGender === 'neutral' &&
          !(itemGender.includes('boy') && itemGender.includes('girl'))
        ) {
          return false
        }
      }
      if (
        priceRange?.min !== undefined &&
        item.priceFrom < priceRange.min
      ) {
        return false
      }
      if (
        priceRange?.max !== undefined &&
        item.priceFrom >= priceRange.max
      ) {
        return false
      }
      // При выборе цвета показываем только подходящие фотозоны.
      if (activeColor !== 'all') {
        if (
          itemType === 'balloons' ||
          item.colorVariant !== activeColor
        ) {
          return false
        }
      }
      return true
    })

  }, [
    allItems,
    activeType,
    activeCategory,
    activePrice,
    activeColor,
    activeGender,
    currentPriceRanges,
  ])
  const sortedGroups = useMemo(
    () => sortGroups(groupItems(filtered), activeSort),
    [filtered, activeSort],
  )
  const photozoneGroups = useMemo(
    () =>
      sortGroups(
        groupItems(
          filtered.filter(
            (item) =>
              (item.productType ?? 'photozone') === 'photozone',
          ),
        ),
        activeSort,
      ),
    [filtered, activeSort],
  )
  const balloonGroups = useMemo(
    () =>
      sortGroups(
        groupItems(
          filtered.filter(
            (item) => item.productType === 'balloons',
          ),
        ),
        activeSort,
      ),
    [filtered, activeSort],
  )
  const showShopfront = activeType === 'all'
  const shownCount = showShopfront
    ? photozoneGroups.length + balloonGroups.length
    : sortedGroups.length
  const renderCards = (groups: Group[]) => (
    <div className="mt-6 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {groups.map((group) => (
        <DecorCard
          key={group.key}
          item={group.items[0]}
          siblings={
            group.items.length > 1 ? group.items : undefined
          }
        />
      ))}
    </div>
  )
  const renderEmpty = () => (
    <div className="mt-10 flex flex-col items-center rounded-[2rem] border border-dashed border-border bg-card/50 px-6 py-16 text-center">
      <SearchX
        className="size-10 text-muted-foreground"
        aria-hidden="true"
      />
      <h3 className="mt-4 font-display text-xl font-bold text-foreground">
        Ничего не нашлось под эти условия
      </h3>
      <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
        Не нашли то, что искали? Опишите идею — подберём или
        разработаем оформление под ваш праздник индивидуально.
      </p>
      <CatalogCtaButton
        label="Обсудить индивидуальный проект"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_25px_-8px_var(--primary)] transition-transform hover:scale-105"
      />
    </div>
  )
  return (
    <div>
      {/* Панель фильтров каталога */}
      <div className="rounded-[1.5rem] bg-sky-50/80 p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Категории */}
          <nav
            className="inline-flex w-fit max-w-full flex-wrap items-center gap-1 rounded-full border border-sky-100 bg-white/60 p-1.5 shadow-sm"
            aria-label="Тип товара"
          >
            {(
              [
                ['all', 'Всё'],
                ['photozone', 'Фотозоны'],
                ['balloons', 'Шары'],
              ] as const
            ).map(([type, label]) => (
              <button
                key={type}
                type="button"
                onClick={() => navigateType(type)}
                aria-current={activeType === type ? 'page' : undefined}
                aria-pressed={activeType === type}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 sm:min-w-[120px] ${activeType === type
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground hover:bg-white'
                  }`}
              >
                {label}
              </button>
            ))}
          </nav>
          {/* Повод, сортировка и дополнительные фильтры */}
          <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
            {/* Повод */}
            <div className="relative flex min-w-0 items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-3 transition-colors hover:border-primary/40 focus-within:border-primary">
              <Gift
                className="size-5 shrink-0 text-foreground"
                aria-hidden="true"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <label
                  htmlFor="catalog-occasion"
                  className="text-sm font-semibold text-foreground"
                >
                  Повод
                </label>
                <select
                  id="catalog-occasion"
                  value={activeCategory}
                  onChange={(event) =>
                    setParam('category', event.target.value)
                  }
                  className="w-full min-w-0 cursor-pointer appearance-none truncate bg-transparent pr-5 text-sm text-slate-500 outline-none"
                >
                  <option value="all">Любой повод</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {CATEGORY_LABELS[category]}
                    </option>
                  ))}
                </select>
              </div>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground">
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m7 10 5 5 5-5" />
                </svg>
              </span>
            </div>
            {/* Сортировка */}
            <div className="relative flex min-w-0 items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-3 transition-colors hover:border-primary/40 focus-within:border-primary">
              <ArrowUpDown
                className="size-5 shrink-0 text-foreground"
                aria-hidden="true"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <label
                  htmlFor="catalog-sort"
                  className="text-sm font-semibold text-foreground"
                >
                  Сортировка
                </label>
                <select
                  id="catalog-sort"
                  value={activeSort}
                  onChange={(event) =>
                    setParam('sort', event.target.value)
                  }
                  className="w-full min-w-0 cursor-pointer appearance-none truncate bg-transparent pr-5 text-sm text-slate-500 outline-none"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {SORT_LABELS[option]}
                    </option>
                  ))}
                </select>
              </div>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground">
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m7 10 5 5 5-5" />
                </svg>
              </span>
            </div>
            {/* Дополнительные фильтры */}
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full border border-sky-200 bg-white/80 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <SlidersHorizontal
                className="size-5"
                aria-hidden="true"
              />
              Фильтры
              {extraFilterCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {extraFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Модальное окно фильтров */}
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
              <h3 className="font-display text-lg font-bold text-foreground">
                Фильтры
              </h3>
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
              {/* Фильтр по цене */}
              <div>
                <span className="mb-2 block text-sm font-semibold text-foreground">
                  Цена
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setParam('price', 'all')}
                    aria-pressed={activePrice === 'all'}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activePrice === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-muted'
                      }`}
                  >
                    Любая
                  </button>
                  {currentPriceRanges.map((range) => (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => setParam('price', range.id)}
                      aria-pressed={activePrice === range.id}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activePrice === range.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-muted'
                        }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Цветовой вариант — только для фотозон */}
              {hasColorData && activeType !== 'balloons' && (
                <div>
                  <span className="mb-2 block text-sm font-semibold text-foreground">
                    Цветовой вариант фотозоны
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setParam('color', 'all')}
                      aria-pressed={activeColor === 'all'}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeColor === 'all'
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
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeColor === variant
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

            <div className="px-6">
              <span className="mb-2 block text-sm font-semibold text-foreground">
                Гендер
              </span>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Любой' },
                  { id: 'boy', label: 'Для мальчика' },
                  { id: 'girl', label: 'Для девочки' },
                  { id: 'neutral', label: 'Универсальные' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setParam('gender', option.id)}
                    aria-pressed={activeGender === option.id}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeGender === option.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-muted'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
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
                Показать {shownCount}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Главная витрина: шары и фотозоны */}
      {showShopfront ? (
        <div className="mt-8 space-y-12">
          {balloonGroups.length > 0 && (
            <section>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Шары для праздника
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Композиции и наборы воздушных шаров
                  </p>
                </div>
                <Link
                  href="/shary"
                  className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Смотреть все
                </Link>
              </div>
              {renderCards(balloonGroups.slice(0, 3))}
            </section>
          )}
          {photozoneGroups.length > 0 && (
            <section>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Популярные фотозоны
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Оформление для самых важных моментов
                  </p>
                </div>
                <Link
                  href="/fotozony"
                  className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Смотреть все
                </Link>
              </div>
              {renderCards(
                photozoneGroups
                  .filter((group) => group.isPopular)
                  .slice(0, 3).length > 0
                  ? photozoneGroups
                    .filter((group) => group.isPopular)
                    .slice(0, 3)
                  : photozoneGroups.slice(0, 3),
              )}
            </section>
          )}
          {balloonGroups.length === 0 &&
            photozoneGroups.length === 0 &&
            renderEmpty()}
        </div>
      ) : sortedGroups.length > 0 ? (
        <>
          <p className="mt-6 text-sm text-muted-foreground">
            Найдено товаров: {sortedGroups.length}
          </p>
          {renderCards(sortedGroups)}
        </>
      ) : (
        renderEmpty()
      )}
    </div>
  )
}
