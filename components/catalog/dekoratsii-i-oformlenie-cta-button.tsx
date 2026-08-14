'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { RequestModal } from '@/components/request-modal'

export function CatalogCtaButton({
  label = 'Обсудить проект',
  className,
}: {
  label?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>

      <RequestModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}