'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CloudDivider } from '@/components/cloud-divider'
import { Balloon, ConfettiField, DriftingCloud } from '@/components/decor'


const OCCASIONS = [
  'Выписка из роддома',
  'Гендер-пати',
  'День рождения',
  'Другое',
]


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



export function ContactSection() {

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [occasion, setOccasion] = useState(OCCASIONS[0])

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
        body: JSON.stringify({ kind: 'contact', name, phone, occasion }),
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

    <section
      id="contact"
      className="relative overflow-hidden bg-primary px-4 pb-28 pt-32 text-primary-foreground"
    >

      <CloudDivider fill="var(--primary)" />


      {sent && <ConfettiField count={60} />}


      <DriftingCloud
        top="14%"
        duration={95}
        scale={1.4}
        opacity={0.16}
      />


      <Balloon
        className="absolute -left-4 top-[30%] w-16 animate-bob opacity-80"
        color="var(--blush)"
      />

      <Balloon
        className="absolute right-6 top-[20%] w-20 animate-bob opacity-80"
        color="var(--gold)"
        style={{ animationDelay: '0.8s' }}
      />




      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">



        <div>


          <h2 className="text-balance font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">

            Давайте создадим ваш праздник вместе

          </h2>



          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-primary-foreground/85">

            Оставьте заявку — мы свяжемся с вами в течение 30 минут,
            обсудим детали и подготовим идеи специально для вашего события

          </p>




          <div className="mt-8 space-y-3 text-primary-foreground/90">

            <a
              href="tel:+79040003458"
              className="block text-2xl font-semibold hover:underline"
            >
              +7 (904) 000-34-58
            </a>


            <a
              href="mailto:hello@aist.life"
              className="block hover:underline"
            >
              hello@aist.life
            </a>


            <p className="text-primary-foreground/70">
              Работаем ежедневно с 9:00 до 21:00
            </p>

          </div>


        </div>





        <div className="rounded-[2rem] bg-card p-6 text-foreground shadow-2xl sm:p-8">


          {
            sent ? (

              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">


                <Balloon
                  className="w-20 animate-bob"
                  color="var(--sky)"
                />


                <h3 className="mt-4 text-2xl font-bold">

                  Заявка отправлена!

                </h3>


                <p className="mt-2 max-w-xs text-muted-foreground">

                  Спасибо! Мы скоро свяжемся с вами.

                </p>



                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-full bg-secondary px-6 py-3 text-sm font-semibold hover:bg-muted"
                >

                  Отправить ещё одну

                </button>


              </div>



            ) : (


              <form onSubmit={handleSubmit} className="space-y-5">




                <div>

                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-sm font-medium"
                  >

                    Ваше имя

                  </label>


                  <input

                    id="contact-name"

                    name="name"

                    required

                    maxLength={20}

                    placeholder="Как к вам обращаться?"

                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"

                  />


                </div>






                <div>


                  <label
                    htmlFor="contact-phone"
                    className="mb-1.5 block text-sm font-medium"
                  >

                    Телефон

                  </label>



                  <input

                    id="contact-phone"

                    name="phone"

                    type="tel"

                    required

                    maxLength={18}

                    placeholder="+7 (___) ___-__-__"


                    onInput={(e) => {

                      e.currentTarget.value =
                        formatPhone(e.currentTarget.value)

                    }}


                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"

                  />


                </div>







                <div>


                  <span className="mb-1.5 block text-sm font-medium">

                    Повод

                  </span>




                  <div className="flex flex-wrap gap-2">


                    {
                      OCCASIONS.map((item) => (


                        <button

                          key={item}

                          type="button"

                          onClick={() => setOccasion(item)}

                          className={

                            occasion === item

                              ?

                              'rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground'

                              :

                              'rounded-full bg-secondary px-4 py-2 text-sm font-medium hover:bg-muted'

                          }

                        >

                          {item}

                        </button>


                      ))
                    }


                  </div>


                </div>


                {error && (
                  <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
                    Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам напрямую.
                  </p>
                )}




                <button

                  type="submit"

                  disabled={sending}

                  className="w-full rounded-full bg-primary py-4 text-base font-semibold text-primary-foreground shadow-[0_16px_35px_-10px_var(--primary)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"

                >

                  {sending ? 'Отправляем…' : 'Оставить заявку'}

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


            )
          }



        </div>


      </div>


    </section>

  )
}