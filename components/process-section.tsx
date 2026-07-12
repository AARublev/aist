'use client'

import { motion } from 'motion/react'
import { CloudDivider } from '@/components/cloud-divider'
import { DriftingCloud } from '@/components/decor'

const STEPS = [
  {
    n: '1',
    title: 'Знакомимся',
    text: 'Обсуждаем повод, ваши пожелания, бюджет и настроение будущего праздника',
  },
  {
    n: '2',
    title: 'Придумываем концепцию',
    text: 'Готовим сценарий, подбираем декор, палитру и локацию под',
  },
  {
    n: '3',
    title: 'Организуем всё',
    text: 'Берём на себя декор, аренду, артистов, съёмку и логистику. Вы отдыхаете',
  },
  {
    n: '4',
    title: 'Дарим эмоции',
    text: 'Вы наслаждаетесь моментом, а мы следим, чтобы всё прошло идеально',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden bg-secondary px-4 pb-28 pt-32">
      <CloudDivider fill="var(--secondary)" />
      <DriftingCloud top="20%" duration={100} scale={1.3} opacity={0.5} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-5 text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Четыре шага до вашего праздника
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-[1.75rem] bg-card p-7 shadow-[0_20px_45px_-30px_rgba(70,110,170,0.5)]"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 font-display text-2xl font-bold text-primary">
                {step.n}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
