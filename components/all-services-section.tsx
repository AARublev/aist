'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Balloon,
  Camera,
  ChevronLeft,
  ChevronRight,
  Drama,
  PartyPopper,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CloudDivider } from '@/components/cloud-divider'
import { RequestModal } from '@/components/request-modal'
import { Balloon as BalloonDecor, Star as StarDecor } from '@/components/decor'

type CategoryId = 'animators' | 'media' | 'welcome' | 'shows' | 'salut'

type Category = {
  id: CategoryId
  label: string
  icon: LucideIcon
  tint: string
}

type Card = {
  category: CategoryId
  title: string
  text: string
  tint: string
} & (
    | { type: 'image'; src: string }
    | { type: 'video'; src: string }
  )

const CATEGORIES: Category[] = [
  { id: 'animators', label: 'аниматоры', icon: Drama, tint: 'var(--sky)' },
  { id: 'media', label: 'фото-видео съёмка', icon: Camera, tint: 'var(--blush)' },
  { id: 'welcome', label: 'welcome и декор', icon: PartyPopper, tint: 'var(--mint)' },
  { id: 'shows', label: 'шоу-программы', icon: WandSparkles, tint: 'var(--gold)' },
  { id: 'salut', label: 'салюты и шарики', icon: Balloon, tint: 'var(--rose)' },
]

const CARDS: Card[] = [
  // — аниматоры —
  {
    category: 'animators',
    type: 'image',
    src: '/images/cards/animators.png',
    title: 'Любимые персонажи',
    text: 'Аниматоры в костюмах героев, взрослые и дети в восторге',
    tint: 'var(--sky)',
  },
  {
    category: 'animators',
    type: 'image',
    src: '/images/cards/musicians.png',
    title: 'Музыканты и танцоры',
    text: 'DJ иил класический оркестр создадут яркий образ для незабываемого дня',
    tint: 'var(--sky)',
  },
  // — фото-видео съёмка —
  {
    category: 'media',
    type: 'image',
    src: '/images/cards/photo-1.png',
    title: 'Репортажная съёмка',
    text: 'Ловим искренние эмоции и лучшие моменты праздника',
    tint: 'var(--blush)',
  },
  {
    category: 'media',
    type: 'video',
    src: '/videos/clip.mp4',
    title: 'Видеоролик на память',
    text: 'Динамичный ролик, который хочется пересматривать',
    tint: 'var(--blush)',
  },
  {
    category: 'media',
    type: 'image',
    src: '/images/cards/photo-2.png',
    title: 'Семейные портреты',
    text: 'Красивые кадры на память для всей семьи и на память малышу',
    tint: 'var(--blush)',
  },
  // — welcome и декор —
  {
    category: 'welcome',
    type: 'image',
    src: '/images/cards/photo_zone.png',
    title: 'Фотозона и арка',
    text: 'Место где все хотят фотографироваться — шары, цветы в цвет вашего праздника',
    tint: 'var(--mint)',
  },
  {
    category: 'welcome',
    type: 'image',
    src: '/images/cards/decor.png',
    title: 'Декор и подсветка',
    text: 'Свечи, гирлянды и живые цветы превращают место для фотосессии',
    tint: 'var(--mint)',
  },
  {
    category: 'welcome',
    type: 'image',
    src: '/images/cards/sweets.png',
    title: 'Кэнди-бар и сладости',
    text: 'Тематический стол с десертами в цвет праздника и тортом ручной работы с цветной начинкой',
    tint: 'var(--mint)',
  },
  // — шоу-программы —
  {
    category: 'shows',
    type: 'video',
    src: '/videos/napoleon.mp4',
    title: 'Встреча маленького Наполеона',
    text: 'Лошадь, карета и оркестр встречают новорождённого как настоящего вельможу',
    tint: 'var(--gold)',
  },
  {
    category: 'shows',
    type: 'image',
    src: '/images/cards/soapbubble.png',
    title: 'Шоу мыльных пузырей',
    text: 'Розовые или голубые пузыри раскрывают секрет и эффектно улетают в небо',
    tint: 'var(--gold)',
  },
  {
    category: 'shows',
    type: 'image',
    src: '/images/cards/smoke.png',
    title: 'Разноцветный дым',
    text: 'Розовый или голубой дым — момент который остаётся в памяти навсегда',
    tint: 'var(--gold)',
  },
  // — салюты и шарики —
  {
    category: 'salut',
    type: 'video',
    src: '/videos/fireworks.mp4',
    title: 'Праздничный салют',
    text: 'Салют в цвет праздника, который остаётся в памяти навсегда',
    tint: 'var(--rose)',
  },
  {
    category: 'salut',
    type: 'video',
    src: '/videos/confetti.mp4',
    title: 'Конфетти-пушка',
    text: 'Взрыв конфетти для самого запоминающегося кадра',
    tint: 'var(--rose)',
  },
  {
    category: 'salut',
    type: 'image',
    src: '/images/cards/balloons.png',
    title: 'Запуск шаров',
    text: 'Когда шары взмывают в небо — яркий и красивый момент который останется в памяти на долго',
    tint: 'var(--rose)',
  },
]

export function AllServicesSection() {
  const laneRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const [activeCat, setActiveCat] = useState<CategoryId>('animators')
  const [modalOpen, setModalOpen] = useState(false)

  // Width of the sticky CTA plus the gap between cards — this is the real
  // "visible start" for every photo/video card, since the CTA permanently
  // covers that much space at the left of the lane.
  const getEdgeOffset = useCallback(() => {
    const lane = laneRef.current
    if (!lane) return 0
    const ctaWidth = ctaRef.current?.offsetWidth ?? 0
    const laneStyle = getComputedStyle(lane)
    const gap = parseFloat(laneStyle.columnGap || laneStyle.gap) || 0
    return ctaWidth + gap
  }, [])

  // Recompute per-card visual state (edge shrink/fade) + active category.
  const update = useCallback(() => {
    const lane = laneRef.current
    if (!lane) return
    const scrollLeft = lane.scrollLeft
    const ctaIsSticky = window.matchMedia('(min-width: 640px)').matches
const edgeOffset = ctaIsSticky ? getEdgeOffset() : 0

    // Card is sliding under the CTA: shrink and fully disappear, no ghosting.
    const applyEdgeShrink = (el: HTMLElement) => {
      const w = el.offsetWidth
      const fadeDistance = w * 0.4 // переход полностью завершится за 40% ширины карточки
      const left = el.offsetLeft - scrollLeft - edgeOffset
      if (left < 0) {
        const p = Math.min(1, -left / fadeDistance)
        el.style.transform = `scale(${1 - p * 0.34})`
        el.style.opacity = String(1 - p)
        el.style.filter = p * 3 > 0.1 ? `blur(${p * 3}px)` : 'none'
      } else {
        el.style.transform = 'scale(1)'
        el.style.opacity = '1'
        el.style.filter = 'none'
      }
    }

    let nextActive: CategoryId = CARDS[0].category
    let firstVisibleFound = false

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const w = card.offsetWidth
      const cardLeft = card.offsetLeft - scrollLeft - edgeOffset

      applyEdgeShrink(card)

      // The first card whose left edge is at/after the CTA's right edge defines the active category.
      if (!firstVisibleFound && cardLeft >= -w * 0.4) {
        nextActive = CARDS[i].category
        firstVisibleFound = true
      }
    })

    setActiveCat((prev) => (prev === nextActive ? prev : nextActive))
  }, [getEdgeOffset])

  const onScroll = useCallback(() => {
    if (rafRef.current != null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      update()
    })
  }, [update])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const scrollToCategory = useCallback((catId: CategoryId) => {
    const lane = laneRef.current
    if (!lane) return
    const idx = CARDS.findIndex((c) => c.category === catId)
    const card = cardRefs.current[idx]
    if (!card) return
    const padLeft = parseFloat(getComputedStyle(lane).paddingLeft) || 0
    // Scroll so the target card lands right after the CTA, never underneath it.
    const ctaIsSticky = window.matchMedia('(min-width: 640px)').matches
const edgeOffset = ctaIsSticky ? getEdgeOffset() : 0
lane.scrollTo({ left: card.offsetLeft - padLeft - edgeOffset, behavior: 'smooth' })
  }, [getEdgeOffset])

  const nudge = useCallback((dir: 1 | -1) => {
    const lane = laneRef.current
    if (!lane) return
    const firstCard = cardRefs.current[0]
    const step = firstCard ? firstCard.offsetWidth + 20 : lane.clientWidth * 0.5
    lane.scrollBy({ left: dir * step, behavior: 'smooth' })
  }, [])

  return (
    <section id="all-services" className="relative bg-secondary pb-28 pt-32">
      <CloudDivider fill="var(--secondary)" />

      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-5 text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Всё для вашего праздника
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Выберите направление в меню — лента ниже плавно перелистнётся к нужным услугам.
          </p>
        </div>

        {/* Category menu */}
        <div className="mt-8 overflow-x-auto px-4 pb-12 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex w-max min-w-full items-stretch justify-start gap-3 sm:justify-center">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const active = cat.id === activeCat
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToCategory(cat.id)}
                  aria-pressed={active}
                  className={`group flex w-28 shrink-0 flex-col items-center gap-2 rounded-3xl px-3 py-4 text-center transition-all duration-300 sm:w-32 ${active
                    ? 'bg-card shadow-[0_18px_40px_-20px_rgba(70,110,170,0.55)]'
                    : 'hover:bg-card/60'
                    }`}
                >
                  <span
                    className="flex size-14 items-center justify-center rounded-full border-2 bg-card transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{
                      borderColor: active ? cat.tint : 'transparent',
                      boxShadow: active ? `0 0 0 4px color-mix(in srgb, ${cat.tint} 22%, transparent)` : 'none',
                    }}
                  >
                    <Icon className="size-6" style={{ color: cat.tint }} aria-hidden="true" />
                  </span>
                  <span
                    className={`text-xs font-semibold leading-tight transition-colors ${active ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                  >
                    {cat.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Arrows */}
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Назад"
            className="flex size-11 items-center justify-center rounded-full bg-card text-foreground shadow-md transition-all hover:-translate-y-0.5 hover:text-primary"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Вперёд"
            className="flex size-11 items-center justify-center rounded-full bg-card text-foreground shadow-md transition-all hover:-translate-y-0.5 hover:text-primary"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Card lane */}
      <div
        ref={laneRef}
        onScroll={onScroll}
        className="mt-6 flex snap-none gap-5 overflow-x-auto scroll-smooth pl-[max(1rem,calc((100vw-72rem)/2))] pr-4 pb-24 pt-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Animated CTA card — sticky, pinned to the left edge of the lane.
            It stays in place while the photo cards scroll and slide underneath it. */}
        <div
          ref={ctaRef}
          className="order-last aspect-[3/4] w-[80%] shrink-0 sm:sticky sm:left-0 sm:z-20 sm:order-none sm:w-[46%] lg:w-[30.5%]"
        >
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="group relative flex size-full flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-primary p-6 text-center text-primary-foreground shadow-[0_25px_50px_-24px_var(--primary)] transition-transform duration-300 hover:-translate-y-1"
          >
            <BalloonDecor className="absolute -left-3 top-6 w-16 animate-bob opacity-70" color="var(--gold)" />
            <BalloonDecor
              className="absolute -right-2 top-16 w-12 animate-bob opacity-60"
              color="var(--blush)"
              style={{ animationDelay: '0.8s' }}
            />
            <StarDecor className="absolute bottom-24 left-8 w-6 animate-twinkle" color="var(--gold)" />
            <StarDecor
              className="absolute right-10 top-10 w-4 animate-twinkle"
              color="var(--primary-foreground)"
              style={{ animationDelay: '0.5s' }}
            />

            <span className="relative z-[1] flex size-16 items-center justify-center rounded-full bg-primary-foreground/15 backdrop-blur transition-transform duration-300 group-hover:scale-110">
              <Sparkles className="size-8" aria-hidden="true" />
            </span>
            <h3 className="relative z-[1] mt-5 text-balance font-display text-2xl font-bold leading-tight">
              Хотите такой праздник?
            </h3>
            <p className="relative z-[1] mt-2 max-w-[15rem] text-sm leading-relaxed text-primary-foreground/85">
              Оставьте заявку — подберём услуги под ваш повод и бюджет.
            </p>
            <span className="relative z-[1] mt-5 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-all duration-300 group-hover:gap-3">
              Оставить заявку
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </button>
        </div>

        {CARDS.map((card, i) => (
          <div
            key={`${card.category}-${card.title}`}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="relative aspect-[3/4] w-[80%] shrink-0 overflow-hidden rounded-[2rem] bg-card shadow-[0_25px_50px_-28px_rgba(70,110,170,0.6)] will-change-transform sm:w-[46%] lg:w-[30.5%]"
          >
            {card.type === 'image' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.src || '/placeholder.svg'}
                alt={card.title}
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <video
                src={card.src}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="absolute inset-0 size-full object-cover"
              />
            )}

            {/* Bottom gradient + text */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-6 pt-16 text-white">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold text-primary-foreground"
                style={{ background: card.tint }}
              >
                {CATEGORIES.find((c) => c.id === card.category)?.label}
              </span>
              <h3 className="mt-2.5 font-display text-xl font-bold leading-tight">{card.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/85">{card.text}</p>
            </div>
          </div>
        ))}
      </div>

      <RequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}