'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Phone, Sparkles, User, X } from 'lucide-react'
import { Balloon, ConfettiField, DriftingCloud } from '@/components/decor'

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

export function CallbackModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!open) return

    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', escape)

    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', escape)
      document.body.style.overflow = oldOverflow
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSent(false)
        setError(false)
      }, 200)
    }
  }, [open])

  if (!open) return null

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = String(formData.get('name') ?? '')
    const phone = String(formData.get('phone') ?? '')

    setSending(true)
    setError(false)
    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'callback', name, phone }),
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >

      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/45 backdrop-blur-sm"
      />


      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-[2rem] bg-card shadow-2xl">


        <div className="relative bg-primary px-6 pb-8 pt-7 text-primary-foreground">

          <DriftingCloud
            top="16%"
            duration={90}
            scale={1.2}
            opacity={0.18}
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30"
          >
            <X className="size-5" />
          </button>


          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">
            <Sparkles className="size-3.5" />
            Перезвоним за 30 минут
          </span>


          <h3 className="mt-3 text-2xl font-bold">
            Закажите обратный звонок
          </h3>


          <p className="mt-2 text-sm text-primary-foreground/80">
            Оставьте имя и телефон — мы свяжемся с вами.
          </p>

        </div>


        <div className="px-6 py-6">

          {sent ? (

            <div className="flex min-h-[220px] flex-col items-center justify-center text-center">

              <ConfettiField count={50} />

              <Balloon className="w-16 animate-bob" color="var(--sky)" />

              <h4 className="mt-4 text-xl font-bold">
                Заявка отправлена!
              </h4>

              <p className="mt-2 text-muted-foreground">
                Скоро мы свяжемся с вами.
              </p>

            </div>

          ) : (

            <form onSubmit={handleSubmit} className="space-y-5">


              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <User className="size-4 text-primary" />
                  Ваше имя
                </label>


                <input
                  name="name"
                  required
                  maxLength={20}
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                />

              </div>



              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Phone className="size-4 text-primary" />
                  Телефон
                </label>


                <input
                  name="phone"
                  required
                  type="tel"
                  maxLength={18}
                  placeholder="+7 (___) ___-__-__"
                  onInput={(e) => {
                    e.currentTarget.value = formatPhone(e.currentTarget.value)
                  }}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                />

              </div>


              {error && (
                <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
                  Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам напрямую.
                </p>
              )}


              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-primary py-4 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? 'Отправляем…' : 'Жду звонка'}
              </button>



              <p className="text-center text-xs text-muted-foreground">

                Нажимая кнопку, вы соглашаетесь с{' '}

                <Link
                  href="/privacy"
                  className="underline hover:text-primary"
                >
                  политикой конфиденциальности
                </Link>

                {' '}и{' '}

                <Link
                  href="/consent"
                  className="underline hover:text-primary"
                >
                  обработкой персональных данных
                </Link>

              </p>


            </form>

          )}

        </div>

      </div>

    </div>
  )
}