'use client'

export function TrackedPhoneLink({
  href,
  goal = 'phone_click',
  className,
  children,
}: {
  href: string
  goal?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      onClick={() => window.ym?.(110619987, 'reachGoal', goal)}
      className={className}
    >
      {children}
    </a>
  )
}