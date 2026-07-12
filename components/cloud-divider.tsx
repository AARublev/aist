import { cn } from '@/lib/utils'

/*
 * A scalloped "edge of a cloud" divider.
 * Place it at the very top of a section. The bumps rise up into the
 * previous section, and the shape is filled with the current section's
 * background color to create a soft, wavy cloud transition.
 */
export function CloudDivider({
  fill = 'var(--background)',
  flip = false,
  className,
}: {
  fill?: string
  flip?: boolean
  className?: string
}) {
  // Organic scalloped path across a 1440-wide viewBox.
  const path =
    'M0,80 ' +
    'C 80,80 90,24 180,24 C 270,24 280,72 360,72 ' +
    'C 445,72 450,18 540,18 C 630,18 640,70 720,70 ' +
    'C 800,70 815,20 900,20 C 985,20 995,74 1080,74 ' +
    'C 1160,74 1175,22 1260,22 C 1350,22 1360,80 1440,80 ' +
    'L1440,140 L0,140 Z'

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 z-10 -translate-y-[70px] leading-[0]',
        className,
      )}
      style={flip ? { transform: 'translateY(-70px) scaleX(-1)' } : undefined}
    >
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        className="h-[80px] w-full"
        style={{ display: 'block' }}
      >
        <path d={path} fill={fill} />
      </svg>
    </div>
  )
}
