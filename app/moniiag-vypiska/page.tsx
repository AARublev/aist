// app/moniiag-vypiska/page.tsx
import { Suspense } from 'react'
import { MoniiagVypiskaPageClient } from '@/components/moniiag-vypiska'

export default function MoniiagVypiskaPage() {
  return (
    <Suspense fallback={null}>
      <MoniiagVypiskaPageClient />
    </Suspense>
  )
}