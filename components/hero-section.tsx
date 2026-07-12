'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Balloon, DriftingCloud, Star, ConfettiField } from '@/components/decor'
import { RequestModal } from '@/components/request-modal'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pb-28 pt-28"
    >
      {/* Sky decor */}
      <ConfettiField count={36} className="opacity-70" />
      <DriftingCloud top="14%" duration={70} scale={1.1} opacity={0.95} />
      <DriftingCloud top="28%" duration={95} delay={-30} scale={0.75} opacity={0.8} />
      <DriftingCloud top="8%" duration={120} delay={-60} scale={1.4} opacity={0.6} />

      <Star className="absolute left-[12%] top-[22%] w-6 animate-twinkle" color="var(--gold)" />
      <Star className="absolute right-[16%] top-[16%] w-4 animate-twinkle" color="var(--blush)" style={{ animationDelay: '1s' }} />
      <Star className="absolute right-[30%] top-[34%] w-5 animate-twinkle" color="var(--sky)" style={{ animationDelay: '2s' }} />

      <div className="relative z-20 mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2">
        {/* Copy */}
        <div className="text-center lg:text-left">


          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Праздники,
            <br />
            которые остаются{' '}
            <span className="relative inline-block text-primary">
              в сердцах
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground lg:mx-0"
          >
            Организуем выписку из роддома, гендер-пати и дни рождения под ключ. Декор, съёмка,
            сценарий и волшебная атмосфера — а вы просто наслаждаетесь моментом
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="w-full rounded-full bg-primary px-8 py-4 text-center text-base font-semibold text-primary-foreground shadow-[0_16px_35px_-10px_var(--primary)] transition-transform hover:scale-105 sm:w-auto"
            >
              Хочу праздник
            </button>
            <a
              href="#services"
              className="w-full rounded-full bg-card px-8 py-4 text-center text-base font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary sm:w-auto"
            >
              Наши услуги
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 flex items-center justify-center gap-6 lg:justify-start"
          >
            {[
              { n: '300+', l: 'праздников' },
              { n: '6 лет', l: 'дарим первые эмоции' },
              { n: '4.9', l: 'средняя оценка' },
            ].map((s) => (
              <div key={s.l} className="text-center lg:text-left">
                <div className="font-display text-2xl font-bold text-foreground">{s.n}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="animate-bob-slow">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-card shadow-[0_40px_80px_-30px_rgba(70,110,170,0.55)]">
              <Image
                src="/images/hero-celebration.png"
                alt="Праздничный декор с воздушными шарами в пастельных тонах"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Floating balloons around the photo */}
          <Balloon className="absolute -left-8 top-6 w-16 animate-bob" color="var(--blush)" style={{ animationDelay: '0.4s' }} />
          <Balloon className="absolute -right-6 top-24 w-20 animate-bob" color="var(--rose)" style={{ animationDelay: '1.1s' }} />
          <Balloon className="absolute -bottom-6 left-10 w-14 animate-bob" color="var(--blush)" style={{ animationDelay: '0.8s' }} />

          {/* Floating card */}
          <div className="absolute -bottom-4 right-2 flex items-center gap-3 rounded-2xl bg-card/95 px-4 py-3 shadow-xl backdrop-blur">
            <span className="flex size-9 items-center justify-center rounded-full bg-accent/30">
              <Star className="w-5" color="var(--gold)" />
            </span>
            <div>
              <div className="text-sm font-semibold text-foreground">Под ключ</div>
              <div className="text-xs text-muted-foreground">от идеи до уборки</div>
            </div>
          </div>
        </motion.div>
      </div>

      <RequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}