'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { CloudDivider } from '@/components/cloud-divider'

type MediaItem = {
  alt: string
  span?: string
} & (
    | { type: 'image'; src: string }
    | { type: 'video'; src: string }
  )

// Order matters: the grid below uses `grid-auto-flow: dense`, so items are
// packed left-to-right, top-to-bottom, backfilling gaps automatically.
// This exact order + span combination was mapped out to tile perfectly
// with zero empty cells (2 vertical videos, 2 vertical photos, 3 horizontal
// photos, 4 square photos = 18 cells = 6 rows x 3 columns on desktop).
const MEDIA: MediaItem[] = [
  {
    type: 'video',
    src: '/videos/gallery-video-1.mp4',
    alt: 'Сладкий финал',
    span: 'col-span-2 row-span-2 lg:col-span-1 lg:row-span-2',
  },
  {
    type: 'image',
    src: '/images/gallery/gallery-photo-1.png',
    alt: '???',
    span: 'col-span-2 lg:col-span-2',
  },
  {
    type: 'image',
    src: '/images/gallery/gallery-photo-4.png',
    alt: 'Музыканты',
    span: 'lg:row-span-2',
  },
  {
    type: 'image',
    src: '/images/gallery/gallery-photo-2.png',
    alt: 'Момент с праздника',
  },
  {
    type: 'image',
    src: '/images/cards/animators.png',
    alt: 'Выписка из роддома',
    span: 'col-span-2 row-span-2 lg:col-span-1 lg:row-span-2',
  },
  {
    type: 'video',
    src: '/videos/gallery-video-2.mp4',
    alt: 'Вертикальное видео с праздника',
    span: 'row-span-2 lg:row-span-2',
  },
  {
    type: 'image',
    src: '/images/gallery/gallery-photo-3.png',
    alt: 'День рождение',
  },
  {
    type: 'video',
    src: '/videos/gallery-video-3.mp4',
    alt: 'Вертикальное фото с праздника',
    span: 'lg:row-span-2',
  },
  {
    type: 'image',
    src: '/images/gallery/gallery-photo-6.png',
    alt: 'Оркестр на выписку из роддома',
    span: 'col-span-2 lg:col-span-2',
  },
  {
    type: 'image',
    src: '/images/gallery/gallery-photo-7.png',
    alt: 'Оформление праздника',
  },
  {
    type: 'video',
    src: '/videos/gallery-video-4.mp4',
    alt: 'Момент с праздника',
  },
]

export function GallerySection() {
  return (
    <section id="gallery" className="relative bg-background px-4 pb-28 pt-32">
      <CloudDivider fill="var(--background)" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="mt-5 text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Моменты, которые мы создали
            </h2>
          </div>
          <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
            Немного волшебства из наших недавних праздников — от нежных выписок до ярких дней
            рождения
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 lg:auto-rows-[220px] lg:grid-cols-3 lg:[grid-auto-flow:dense]">
          {MEDIA.map((item, i) => (
            <motion.div
              key={item.alt + i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-[1.75rem] shadow-[0_20px_45px_-28px_rgba(70,110,170,0.55)] ${item.span ?? ''}`}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.src || '/placeholder.svg'}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <video
                  src={item.src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}