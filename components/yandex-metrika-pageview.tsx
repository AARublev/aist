'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: string,
      ...args: unknown[]
    ) => void
  }
}

export function YandexMetrikaPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastUrl = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname) return

    const query = searchParams.toString()
    const url = `${window.location.origin}${pathname}${query ? `?${query}` : ''}`

    if (lastUrl.current === url) return
    lastUrl.current = url

    const sendHit = () => {
      window.ym?.(110619987, 'hit', url, {
        title: document.title,
      })
    }

    if (window.ym) {
      sendHit()
    } else {
      const handleReady = () => sendHit()
      window.addEventListener('yandex-metrika-ready', handleReady, {
        once: true,
      })

      return () => {
        window.removeEventListener('yandex-metrika-ready', handleReady)
      }
    }
  }, [pathname, searchParams])

  return null
}