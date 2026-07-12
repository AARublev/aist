'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { DriftingCloud, Firework, Star } from '@/components/decor'

const WORDS = [
  { text: 'выписки из роддома', color: 'var(--sky)' },
  { text: 'гендер-пати', color: 'var(--blush)' },
  { text: 'дню рождения', color: 'var(--gold)' },
]

export function ComprehensiveSection() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2600)
    return () => clearInterval(id)
  }, [])

  const current = WORDS[index]

  return (
    <section className="relative flex min-h-[85svh] items-center justify-center overflow-hidden bg-primary px-4 py-28 text-primary-foreground">
      {/* Decor */}
      <DriftingCloud top="12%" duration={90} scale={1.2} opacity={0.18} />
      <DriftingCloud top="70%" duration={110} delay={-40} scale={1.6} opacity={0.14} />
      <Firework className="left-[10%] top-[18%]" color="var(--gold)" delay={0} />
      <Firework className="right-[12%] top-[24%]" color="var(--blush)" delay={0.9} />
      <Firework className="bottom-[16%] left-[18%]" color="white" delay={1.7} />
      <Star className="absolute right-[22%] top-[60%] w-6 animate-twinkle" color="white" />
      <Star className="absolute left-[30%] top-[30%] w-4 animate-twinkle" color="var(--gold)" style={{ animationDelay: '1.2s' }} />

      <div className="relative z-10 mx-auto max-w-5xl text-center">

        <h2 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
          Мы подходим комплексно
          <br className="hidden sm:block" /> к организации
        </h2>

        <div className="mt-6 flex min-h-[1.4em] items-center justify-center text-3xl font-bold sm:text-5xl lg:text-6xl">
          <AnimatePresence mode="wait">
            <motion.span
              key={current.text}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)', rotateX: -40 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0 }}
              exit={{ opacity: 0, y: -30, filter: 'blur(8px)', rotateX: 40 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex rounded-2xl bg-card px-6 py-2 font-display shadow-lg"
              style={{ color: current.color }}
            >
              {current.text}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-10 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/80"
        >
          Продумываем каждую деталь: концепцию, декор, локацию, тайминг и съёмку. Вам остаётся
          только прийти и наслаждаться самыми тёплыми эмоциями
        </motion.p>
      </div>
    </section>
  )
}
