'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Baby, Calendar, Cake, Phone, PartyPopper, Sparkles, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Balloon, ConfettiField, DriftingCloud, Star, Stork } from '@/components/decor'

type OccasionId = 'discharge' | 'gender' | 'birthday' | 'other'

const OCCASIONS: {
  id: OccasionId
  label: string
  icon: LucideIcon
  sub: 'due' | 'date' | 'none'
}[] = [
  { id: 'discharge', label: 'Выписка из роддома', icon: Baby, sub: 'due' },
  { id: 'gender', label: 'Гендер-пати', icon: PartyPopper, sub: 'date' },
  { id: 'birthday', label: 'Первый день рождения', icon: Cake, sub: 'date' },
  { id: 'other', label: 'Другое', icon: Sparkles, sub: 'none' },
]

const DUE_OPTIONS = ['Скоро', 'Через несколько месяцев', 'Уже родился']

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').replace(/^7/, '').slice(0, 10)

  let result = '+7'

  if (digits.length > 0) result += ` (${digits.slice(0, 3)}`
  if (digits.length >= 3) result += ')'
  if (digits.length > 3) result += ` ${digits.slice(3, 6)}`
  if (digits.length > 6) result += `-${digits.slice(6, 8)}`
  if (digits.length > 8) result += `-${digits.slice(8, 10)}`

  return result
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function MaternityLandingPage() {
  const [occasionId, setOccasionId] = useState<OccasionId | null>(null)
  const [dueStatus, setDueStatus] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = String(formData.get('name') ?? '')
    const phone = String(formData.get('phone') ?? '')
    const date = String(formData.get('date') ?? '')
    const occasion = OCCASIONS.find((o) => o.id === occasionId)?.label

    setSending(true)
    setError(false)
    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'maternity',
          occasion,
          dueStatus: occasionId === 'discharge' ? dueStatus ?? undefined : undefined,
          date: occasionId === 'gender' || occasionId === 'birthday' ? date || undefined : undefined,
          name,
          phone,
        }),
      })
      if (!res.ok) throw new Error('request failed')
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-10">
      {/* Festive background decor, matching the main site */}
      <ConfettiField count={30} className="opacity-70" />
      <DriftingCloud top="10%" duration={80} scale={1.2} opacity={0.7} />
      <DriftingCloud top="62%" duration={110} delay={-40} scale={0.8} opacity={0.5} />
      <Star className="absolute left-[10%] top-[16%] w-6 animate-twinkle" color="var(--gold)" />
      <Star
        className="absolute right-[12%] top-[72%] w-5 animate-twinkle"
        color="var(--blush)"
        style={{ animationDelay: '1s' }}
      />

      <div className="relative z-10 w-full max-w-md">
        {!sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[2.5rem] bg-card shadow-[0_35px_70px_-30px_rgba(70,110,170,0.55)]"
          >
            {/* Decorative header */}
            <div className="relative overflow-hidden bg-primary px-6 pb-9 pt-9 text-center text-primary-foreground sm:px-8">
              <DriftingCloud top="10%" duration={70} scale={1.1} opacity={0.2} />
              <Balloon
                className="absolute -left-4 top-6 w-14 animate-bob opacity-80"
                color="var(--gold)"
              />
              <Balloon
                className="absolute -right-3 top-16 w-12 animate-bob opacity-70"
                color="var(--blush)"
                style={{ animationDelay: '0.6s' }}
              />

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
                className="relative z-[1] mx-auto flex size-16 items-center justify-center rounded-full bg-primary-foreground/15 backdrop-blur"
              >
                <Stork className="w-9" />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
                className="relative z-[1] mt-4 text-balance font-display text-2xl font-bold leading-tight sm:text-3xl"
              >
                Расскажите, что планируете
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="relative z-[1] mt-2 text-sm leading-relaxed text-primary-foreground/85"
              >
                Подберём идеальный сценарий и перезвоним за 30 минут
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-7 sm:px-8">
              {/* Occasion picker with per-item expanding sub-question */}
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
                <span className="mb-2 block text-sm font-semibold text-foreground">
                  Что планируете?
                </span>

                <div className="space-y-2.5">
                  {OCCASIONS.map((o) => {
                    const Icon = o.icon
                    const active = occasionId === o.id
                    return (
                      <div
                        key={o.id}
                        className={`overflow-hidden rounded-2xl border transition-colors ${
                          active ? 'border-primary' : 'border-border'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOccasionId(active ? null : o.id)}
                          aria-pressed={active}
                          className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors ${
                            active ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-secondary'
                          }`}
                        >
                          <span
                            className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                              active ? 'bg-primary-foreground/20' : 'bg-secondary'
                            }`}
                          >
                            <Icon className="size-4" aria-hidden="true" />
                          </span>
                          <span className="flex-1 text-sm font-semibold">{o.label}</span>
                          <span
                            className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              active ? 'border-primary-foreground' : 'border-border'
                            }`}
                          >
                            {active && <span className="size-2 rounded-full bg-primary-foreground" />}
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {active && o.sub !== 'none' && (
                            <motion.div
                              key="sub"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="bg-secondary/60"
                            >
                              <div className="px-4 py-4">
                                {o.sub === 'due' ? (
                                  <>
                                    <span className="mb-2 block text-sm font-semibold text-foreground">
                                      Когда ожидаете малыша?
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                      {DUE_OPTIONS.map((d) => (
                                        <button
                                          key={d}
                                          type="button"
                                          onClick={() => setDueStatus(d)}
                                          aria-pressed={dueStatus === d}
                                          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                            dueStatus === d
                                              ? 'bg-primary text-primary-foreground'
                                              : 'bg-card text-foreground hover:bg-muted'
                                          }`}
                                        >
                                          {d}
                                        </button>
                                      ))}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <label
                                      htmlFor="m-date"
                                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground"
                                    >
                                      <Calendar className="size-4 text-primary" aria-hidden="true" />
                                      Дата, если уже известна
                                    </label>
                                    <input
                                      id="m-date"
                                      name="date"
                                      type="date"
                                      className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
                                    />
                                  </>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}>
                <label
                  htmlFor="m-name"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground"
                >
                  <User className="size-4 text-primary" aria-hidden="true" />
                  Ваше имя
                </label>
                <input
                  id="m-name"
                  name="name"
                  type="text"
                  maxLength={20}
                  placeholder="Как к вам обращаться?"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-base text-foreground outline-none transition-colors focus:border-primary"
                />
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5}>
                <label
                  htmlFor="m-phone"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground"
                >
                  <Phone className="size-4 text-primary" aria-hidden="true" />
                  Номер телефона
                </label>
                <input
                  id="m-phone"
                  name="phone"
                  type="tel"
                  required
                  maxLength={18}
                  placeholder="+7 (___) ___-__-__"
                  onInput={(e) => {
                    e.currentTarget.value = formatPhone(e.currentTarget.value)
                  }}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-base text-foreground outline-none transition-colors focus:border-primary"
                />
              </motion.div>

              {error && (
                <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
                  Не удалось отправить заявку. Позвоните нам:{' '}
                  <a href="tel:+79040003458" className="underline">
                    +7 (904) 000-34-58
                  </a>
                </p>
              )}

              <motion.button
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={6}
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-primary py-4 text-base font-semibold text-primary-foreground shadow-[0_16px_35px_-10px_var(--primary)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {sending ? 'Отправляем…' : 'Подобрать сценарий'}
              </motion.button>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={7}
                className="text-center text-xs text-muted-foreground"
              >
                Нажимая кнопку, вы соглашаетесь с{' '}
                <Link href="/privacy" className="underline hover:text-primary">
                  политикой конфиденциальности
                </Link>{' '}
                и{' '}
                <Link href="/consent" className="underline hover:text-primary">
                  обработкой персональных данных
                </Link>
              </motion.p>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2.5rem] bg-card p-8 text-center shadow-[0_35px_70px_-30px_rgba(70,110,170,0.55)] sm:p-10"
          >
            <ConfettiField count={60} />
            <Balloon className="mx-auto w-20 animate-bob" color="var(--sky)" />
            <h2 className="mt-5 text-balance font-display text-2xl font-bold text-foreground sm:text-3xl">
              Заявка отправлена!
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Спасибо! Мы позвоним вам в ближайшее время и обсудим все детали.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[0_16px_35px_-10px_var(--primary)] transition-transform hover:scale-[1.02]"
            >
              Посмотреть все наши услуги
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  )
}