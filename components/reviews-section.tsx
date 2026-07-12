'use client'

import { motion } from 'motion/react'
import { CloudDivider } from '@/components/cloud-divider'
import { Star } from '@/components/decor'

const REVIEWS = [
  {
    name: 'Анна',
    role: 'Выписка из роддома',
    text: 'Ревела от счастья, когда вышла из роддома! Всё было так нежно и красиво, а малышку встретили как принцессу. Спасибо за эмоции!',
    color: 'var(--sky)',
  },
  {
    name: 'Марина и Дмитрий',
    role: 'Гендер-пати',
    text: 'Момент раскрытия с конфетти получился киношным. Гости были в восторге, а фото просто волшебные. Организация на высоте!',
    color: 'var(--blush)',
  },
  {
    name: 'Екатерина',
    role: 'День рождения дочки',
    text: 'Дети не отходили от аниматоров, декор был сказочный. Я впервые за долгое время просто отдыхала на празднике собственного ребёнка.',
    color: 'var(--gold)',
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="relative bg-secondary px-4 pb-28 pt-32">
      <CloudDivider fill="var(--secondary)" />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-5 text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Нам доверяют самое дорогое
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="flex flex-col rounded-[1.75rem] bg-card p-7 shadow-[0_20px_45px_-30px_rgba(70,110,170,0.5)]"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-4" color="var(--gold)" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
                {r.text}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="flex size-11 items-center justify-center rounded-full font-display text-lg font-bold text-primary-foreground"
                  style={{ background: r.color }}
                >
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold text-foreground">{r.name}</span>
                  <span className="block text-sm text-muted-foreground">{r.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
