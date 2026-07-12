'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { CloudDivider } from '@/components/cloud-divider'
import { useState } from 'react'
import { ServiceModal } from '@/components/service-modal'


type Service = {
  tag: string
  title: string
  image: string
  text: string
  price: string
  tint: string
  items: string[]
}

const SERVICES = [
  {
    tag: '01',
    title: 'Выписка из роддома',
    image: '/images/service-discharge.png',
    text: 'Встретим маму и малыша так, чтобы этот день запомнился навсегда: нежный декор, шары, дорожка из лепестков',
    price: 'от 15.000 ₽',
    tint: 'var(--sky)',
    items: ['Оформление входа и авто', 'Букеты и подарки', 'Фото- и видеосъёмка'],
  },
  {
    tag: '02',
    title: 'Гендер-пати',
    image: '/images/service-gender.png',
    price: 'от 8.000 ₽',
    text: 'Раскроем главную тайну эффектно и красиво — с конфетти, дымом или шаром-сюрпризом, чтобы эмоции зашкаливали',
    tint: 'var(--blush)',
    items: ['Сценарий раскрытия', 'Розовый / голубой декор', 'Пиротехника и конфетти'],
  },
  {
    tag: '03',
    title: 'Дни рождения',
    image: '/images/service-birthday.png',
    price: 'от 20.000 ₽',
    text: 'Праздник для детей и взрослых под ключ: тематический декор, торт, аниматоры, шоу-программа и уютная атмосфера',
    tint: 'var(--gold)',
    items: ['Тематическое оформление', 'Аниматоры и шоу', 'Торт и кэнди-бар'],
  },
]

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  return (
    <section id="services" className="relative bg-background px-4 pb-28 pt-32">
      <CloudDivider fill="var(--background)" />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-5 text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Три повода для настоящего волшебства
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Выберите событие — остальное мы возьмём на себя. Каждый праздник создаётся индивидуально
            под вашу историю
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col overflow-hidden rounded-[2rem] bg-card shadow-[0_20px_45px_-25px_rgba(70,110,170,0.5)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_35px_60px_-25px_rgba(70,110,170,0.6)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.image || '/placeholder.svg'}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-full font-display text-sm font-bold text-primary-foreground shadow-md"
                  style={{ background: s.tint }}
                >
                  {s.tag}
                </span>
                <span
                  className="absolute right-4 top-4 rounded-full px-4 py-2 font-display text-sm font-bold text-primary-foreground shadow-md"
                  style={{ background: s.tint }}
                >
                  {s.price}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-bold text-foreground">{s.title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{s.text}</p>

                <ul className="mt-5 space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                      <span className="size-1.5 shrink-0 rounded-full" style={{ background: s.tint }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setSelectedService(s)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent-foreground"
                >
                  Расчитать стоимость
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <ServiceModal
        open={!!selectedService}
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  )
}
