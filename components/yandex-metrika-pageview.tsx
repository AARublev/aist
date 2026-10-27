'use client'

import { Suspense, useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function PageviewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastUrl = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname) return

    const query = searchParams.toString()
    const url = `${window.location.origin}${pathname}${query ? `?${query}` : ''}`

    // Первый просмотр уже учитывается при инициализации Метрики.
    // Отправляем hit только при последующих переходах.
    if (lastUrl.current === null) {
      lastUrl.current = url
      return
    }

    if (lastUrl.current === url) return
    lastUrl.current = url

    window.ym?.(110619987, 'hit', url, {
      title: document.title,
    })
  }, [pathname, searchParams])

  return null
}

export function YandexMetrikaPageview() {
  return (
    <Suspense fallback={null}>
      <PageviewTracker />
    </Suspense>
  )
}