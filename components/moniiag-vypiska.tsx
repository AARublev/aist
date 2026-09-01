'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Balloon, ConfettiField, DriftingCloud, Stork } from '@/components/decor'
import { MoniiagVypiskaCtaModal } from '@/components/moniiag-vypiska-modal'

type VideoVariant = 'promo' | 'real'

const VIDEO_META: Record<
    VideoVariant,
    {
        heading: string
        subtitle?: string
        firstVideo: string
        firstPoster: string
        secondCaption: string
        secondVideo: string
        secondPoster: string
    }
> = {
    promo: {
        heading: 'Выписка бывает один раз.\nСделайте её незабываемой',
        //subtitle: 'Посмотрите, как «Аист» превращает обычную выписку в красивое семейное событие.',
        firstVideo: '/videos/vypiska-promo.mp4',
        firstPoster: '/images/vypiska-promo-poster.jpg',
        secondCaption: 'Понравилось? Посмотрите настоящую выписку, которую мы организовали для семьи',
        secondVideo: '/videos/vypiska-real.mp4',
        secondPoster: '/images/vypiska-real-poster.jpg',
    },
    real: {
        heading: 'Так выглядит момент,\nкоторый хочется помнить всегда',
        //subtitle: 'Реальный пример нашей работы.',
        firstVideo: '/videos/vypiska-real.mp4',
        firstPoster: '/images/vypiska-real-poster.jpg',
        secondCaption: 'А теперь посмотрите, как ещё можно оформить этот день',
        secondVideo: '/videos/vypiska-promo.mp4',
        secondPoster: '/images/vypiska-promo-poster.jpg',
    },
}

const TIERS: { name: string; price: string; badge?: boolean; note: string; items: string[] }[] = [
    {
        name: 'Красивая встреча',
        price: '25 000 ₽',
        note: 'ВКЛЮЧЕНО:',
        items: ['Профессиональный видеограф', 'Фильм о выписке с монтажом и музыкой', 'Ростовая кукла на выбор', 'Музыкальное сопровождение', 'Организация встречи'],
    },
    {
        name: 'Большой праздник',
        price: '35 000 ₽',
        badge: true,
        note: 'ВСЁ ИЗ ПАКЕТА «КРАСИВАЯ ВСТРЕЧА» +',
        items: ['Запуск воздушных шаров', 'Праздничный дым в цвет пола малыша', 'Эффектные кадры для фильма', 'Расширенный сценарий встречи'],
    },
    {
        name: 'Шоу-выписка',
        price: 'от 89 000 ₽',
        note: 'ВСЁ ИЗ «БОЛЬШОЙ ПРАЗДНИК» +',
        items: ['Профессиональные танцоры и флешмоб', 'Шоу барабанщиц и оркестр', 'Организация шоу под ключ', 'Индивидуальный сценарий'],
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
    }),
}

export function MoniiagVypiskaPageClient() {
    const params = useSearchParams()
    const variant: VideoVariant = params.get('video') === 'real' ? 'real' : 'promo'
    const source = params.get('source')
    const meta = VIDEO_META[variant]

    const [modalOpen, setModalOpen] = useState(false)
    const [secondVideoShown, setSecondVideoShown] = useState(false)

    return (
        <main className="relative min-h-[100svh] overflow-hidden pb-28 md:pb-16">
            <style jsx global>{`
                @keyframes phone-pulse {
                  0%,100% {
                    transform: scale(1);
                  }
                  50% {
                    transform: scale(1.06);
                  }
                }
            `}</style>

            <ConfettiField count={22} className="opacity-60" />
            <DriftingCloud top="6%" duration={90} scale={1.1} opacity={0.5} />
            <DriftingCloud top="55%" duration={120} delay={-40} scale={0.8} opacity={0.35} />

            <div className="relative z-10 mx-auto max-w-xl px-4 pt-8 md:max-w-3xl lg:max-w-4xl">
                {/* Minimal brand mark — no nav, keeps the funnel focused */}
                <div className="flex items-center justify-between">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center">
                            <Stork className="w-8 text-primary" />
                        </span>
                        <span className="font-display text-lg font-bold text-foreground">Аист</span>
                    </Link>

                    <a
                        href="tel:+79040003458"
                        className="inline-block origin-center text-base font-extrabold tracking-tight text-rose-600 transition-opacity hover:opacity-80 sm:text-lg"
                        style={{ animation: 'phone-pulse 1.8s ease-in-out infinite' }}
                    >
                        8 (904) 000-34-58
                    </a>
                </div>

                <motion.h1
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={0}
                    className="mt-6 whitespace-pre-line text-balance font-display text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                >
                    {meta.heading}
                </motion.h1>

                {meta.subtitle && (
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={1}
                        className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
                    >
                        {meta.subtitle}
                    </motion.p>
                )}

                {/* First video — matches the QR that was scanned */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={2}
                    className="mt-6 overflow-hidden rounded-[1.75rem] bg-card shadow-[0_25px_50px_-28px_rgba(70,110,170,0.6)]"
                >
                    <video
                        key={meta.firstVideo}
                        src={meta.firstVideo}
                        poster={meta.firstPoster}
                        controls
                        playsInline
                        className="w-full max-h-[80vh] bg-black object-contain"
                    />
                </motion.div>

                {/* Bridge to the second video */}
                {!secondVideoShown ? (
                    <motion.button
                        type="button"
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={3}
                        onClick={() => setSecondVideoShown(true)}
                        className="mt-5 flex w-full items-center justify-between gap-3 rounded-2xl bg-secondary px-5 py-4 text-left transition-colors hover:bg-muted"
                    >
                        <span className="font-semibold text-foreground">{meta.secondCaption}</span>
                        <ChevronDown className="size-5 shrink-0 text-primary" aria-hidden="true" />
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.4 }}
                        className="mt-5 overflow-hidden rounded-[1.75rem] bg-card shadow-[0_25px_50px_-28px_rgba(70,110,170,0.6)]"
                    >
                        <video
                            key={meta.secondVideo}
                            src={meta.secondVideo}
                            poster={meta.secondPoster}
                            controls
                            playsInline
                            autoPlay
                            className="w-full max-h-[80vh] bg-black object-contain"
                        />
                    </motion.div>
                )}

                {/* Story bridge */}
                <div className="mt-10 rounded-[1.75rem] bg-primary px-6 py-7 text-primary-foreground">
                    <h2 className="text-balance font-display text-2xl font-bold leading-tight">
                        А теперь представьте это на вашей выписке
                    </h2>
                    <p className="mt-3 text-pretty leading-relaxed text-primary-foreground/85">
                        Сценарий, реквизит, встреча, съёмка и монтаж — всё берём на себя. Вам остаётся только наслаждаться моментом
                    </p>
                </div>

                {/* Pricing tiers — now as CTA cards */}
                <div className="mt-10">
                    <h3 className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
                        Выберите формат
                    </h3>

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {TIERS.map((tier) => (
                            <div
                                key={tier.name}
                                className={`flex flex-col rounded-[1.75rem] border p-6 shadow-[0_20px_45px_-25px_rgba(70,110,170,0.5)] transition-transform hover:-translate-y-1 ${tier.badge ? 'border-primary bg-primary/5' : 'border-border bg-card'
                                    }`}
                            >
                                {tier.badge && (
                                    <span className="mb-3 inline-flex w-fit items-center rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-semibold text-primary-foreground">
                                        ⭐ Рекомендуем
                                    </span>
                                )}

                                <span className="font-display text-xl font-bold text-foreground">{tier.name}</span>
                                <span className="mt-1 font-display text-2xl font-bold text-primary">{tier.price}</span>

                                <span className="mt-3 text-sm font-bold text-accent-foreground">{tier.note}</span>

                                <ul className="mt-4 flex-1 space-y-2">
                                    {tier.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    type="button"
                                    onClick={() => setModalOpen(true)}
                                    className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                                >
                                    Выбрать
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop / inline CTA (mobile gets the sticky bar below) */}
                <div className="mt-10 hidden md:block">
                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[0_16px_35px_-10px_var(--primary)] transition-transform hover:scale-[1.02]"
                    >
                        ЗАБРОНИРОВАТЬ ВЫПИСКУ
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </button>

                    <p className="mt-4 text-center text-muted-foreground">
                        Или позвоните:{' '}
                        <a href="tel:+79040003458" className="font-semibold text-foreground hover:text-primary">
                            8 (904) 000-34-58
                        </a>
                    </p>
                </div>

                <div className="h-4 md:hidden" />
            </div>

            {/* Sticky bottom CTA — most visitors arrive from a phone via QR */}
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-3 backdrop-blur-md md:hidden">
                <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_25px_-8px_var(--primary)]"
                >
                    ЗАБРОНИРОВАТЬ ВЫПИСКУ
                    <ArrowRight className="size-4" aria-hidden="true" />
                </button>
            </div>

            <Balloon
                className="pointer-events-none absolute -left-6 top-24 w-16 animate-bob opacity-70"
                color="var(--blush)"
            />
            <Balloon
                className="pointer-events-none absolute -right-6 top-64 w-14 animate-bob opacity-60"
                color="var(--gold)"
                style={{ animationDelay: '0.6s' }}
            />

            <MoniiagVypiskaCtaModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                video={variant}
                source={source}
            />
        </main>
    )
}