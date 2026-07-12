'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Stork } from '@/components/decor'
import { cn } from '@/lib/utils'
import { CallbackModal } from '@/components/callback-modal'

const NAV = [
  { label: 'Праздники', href: '#services' },
  { label: 'Услуги', href: '#all-services' },
  { label: 'Как мы работаем', href: '#process' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Отзывы', href: '#reviews' },
]

const PHONE_DISPLAY = '+7 (904) 000-34-58'
const PHONE_HREF = 'tel:+79040003458'

export function SiteHeader() {
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [callbackOpen, setCallbackOpen] = useState(false)

  const navHref = (href: string) => {
    return pathname === '/' ? href : `/${href}`
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)

    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])


  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4'
      )}
    >

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


      <div className="mx-auto max-w-6xl px-4">

        <div
          className={cn(
            'flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6',
            scrolled
              ? 'bg-card/85 shadow-[0_8px_30px_-12px_rgba(80,120,180,0.35)] backdrop-blur-md'
              : 'bg-transparent'
          )}
        >

          <a
            href="/"
            className="flex items-center gap-2"
          >
            <span className="relative flex size-9 items-center justify-center">
              <Stork className="w-9 text-primary" />
            </span>

            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              Аист
            </span>
          </a>


          <nav className="hidden items-center gap-8 md:flex">

            {NAV.map((item) => (

              <a
                key={item.href}
                href={navHref(item.href)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>

            ))}

          </nav>



          <div className="hidden items-center gap-5 md:flex">

            <a
              href={PHONE_HREF}
              className="inline-block origin-center text-lg font-extrabold tracking-tight text-rose-600 transition-opacity hover:opacity-80"
              style={{
                animation: 'phone-pulse 1.8s ease-in-out infinite'
              }}
            >
              {PHONE_DISPLAY}
            </a>


            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:scale-105"
            >
              Обратный звонок
            </button>

          </div>



          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen(!open)}
            className="flex size-10 flex-col items-center justify-center gap-1.5 rounded-full bg-card/70 md:hidden"
          >

            <span className={cn(
              'h-0.5 w-5 bg-foreground transition-all',
              open && 'translate-y-2 rotate-45'
            )}/>

            <span className={cn(
              'h-0.5 w-5 bg-foreground transition-all',
              open && 'opacity-0'
            )}/>

            <span className={cn(
              'h-0.5 w-5 bg-foreground transition-all',
              open && '-translate-y-2 -rotate-45'
            )}/>

          </button>

        </div>



        {open && (

          <div className="mt-2 rounded-3xl bg-card/95 p-4 shadow-lg backdrop-blur-md md:hidden">

            <nav className="flex flex-col gap-1">

              {NAV.map((item)=>(

                <a
                  key={item.href}
                  href={navHref(item.href)}
                  onClick={()=>setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-foreground hover:bg-secondary"
                >
                  {item.label}
                </a>

              ))}


              <a
                href={PHONE_HREF}
                className="rounded-2xl px-4 py-3 text-center text-lg font-extrabold text-rose-600"
              >
                {PHONE_DISPLAY}
              </a>


              <button
                onClick={()=>{
                  setOpen(false)
                  setCallbackOpen(true)
                }}
                className="rounded-2xl bg-primary px-4 py-3 text-base font-semibold text-primary-foreground"
              >
                Обратный звонок
              </button>


            </nav>

          </div>

        )}

      </div>


      <CallbackModal
        open={callbackOpen}
        onClose={()=>setCallbackOpen(false)}
      />

    </header>
  )
}