'use client'

import { cn } from '@/lib/utils'

/* ---------------------------------- Cloud --------------------------------- */

export function Cloud({
  className,
  style,
  opacity = 1,
}: {
  className?: string
  style?: React.CSSProperties
  opacity?: number
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 100"
      className={cn('pointer-events-none select-none', className)}
      style={style}
      fill="currentColor"
    >
      <g opacity={opacity}>
        <ellipse cx="60" cy="62" rx="52" ry="30" />
        <ellipse cx="105" cy="48" rx="45" ry="34" />
        <ellipse cx="145" cy="64" rx="45" ry="28" />
        <rect x="40" y="62" width="120" height="30" rx="15" />
      </g>
    </svg>
  )
}

/* A drifting cloud layer that floats across its container. */
export function DriftingCloud({
  className,
  duration = 60,
  delay = 0,
  top = '10%',
  scale = 1,
  opacity = 0.9,
}: {
  className?: string
  duration?: number
  delay?: number
  top?: string
  scale?: number
  opacity?: number
}) {
  return (
    <div
      className={cn('absolute left-0 w-[180px]', className)}
      style={{
        top,
        animation: `float-cloud ${duration}s linear ${delay}s infinite`,
      }}
    >
      <Cloud style={{ transform: `scale(${scale})`, opacity }} className="w-full text-card" />
    </div>
  )
}

/* --------------------------------- aist -------------------------------- */


// Добавьте этот компонент в ваш файл components/decor.tsx (рядом с другими декор-иконками),
// либо оставьте отдельным файлом и импортируйте Stork оттуда в site-header.tsx.
//
// Заливка переведена на currentColor, поэтому цвет иконки берётся из className,
// например: <Stork className="w-9 text-primary" />

export function Stork({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="m44 7c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1zm9 32v2c3.309 0 6-2.691 6-6h-2c0 2.206-1.794 4-4 4zm7-14c-.058 0-.139-.024-.204-.03 2.268 3.398 3.204 7.429 3.204 10.03 0 5.514-4.486 10-10 10s-10-4.486-10-10c0-2.601.936-6.632 3.204-10.03-.065.006-.146.03-.204.03-1.13 0-3-2.337-3-5 0-2.815 1.613-5 3-5 1.188 0 3.704 1.407 5.423 2.459.18-.112.374-.202.577-.275v-9.227l-2.844 1.551c-.272.73-.731 1.48-1.449 2.198-.344.345-.775.747-1.274 1.212-2.362 2.203-6.315 5.89-9.565 11.577-1.609 2.816-2.368 5.425-3.102 7.947-1.019 3.501-1.98 6.809-5.142 9.338-3.426 2.74-7.626 3.152-9.105 3.21-.415.369-.728.645-.861.762l-.431.377-1.441-.48c-3.983 4.141-11.786 13.124-11.786 17.351h-2c0-1.414.617-3.131 1.582-4.956l-2.211.884-.743-1.857 4.658-1.863c2.622-3.941 6.195-7.923 8.323-10.176-2.299.322-6.454 3.239-8.995 5.024-2.066 1.452-2.903 2.04-3.532 2.04-.177 0-.338-.047-.505-.134l-.577-.962c0-.66.489-1.924 1.317-3.299-.747-.295-1.317-.829-1.317-1.701 0-1.399.961-2.658 2.131-3.672-.684-.55-1.131-1.384-1.131-2.328 0-1.951 2.14-3.021 4.405-4.153 1.029-.515 2.092-1.047 3.041-1.679 3.244-2.162 4.944-4.003 5.805-5.168h-.251c-3.991 0-7-2.579-7-6v-.721l2.216-.738c-2.526-.887-4.216-2.978-4.216-5.541v-.847l2.096-.35c-1.866-1.258-3.096-3.39-3.096-5.803v-1h6.141c6.918 0 12.827 2.619 16.64 7.375 1.135 1.415 1.892 3.335 2.113 5.317l3.4-3.399c1.307-1.307 2.17-2.535 2.737-3.619-3.838-1.203-7.031-5.534-7.031-7.674v-1h3.285c-.169-.425-.244-.713-.255-.758l-.627-2.509 2.152 1.435c1.693 1.129 3.94.693 6.115.271 1.166-.225 2.268-.439 3.33-.439 1.816 0 3.177.296 4.244.946l11.592-1.932c.488-.085.951.199 1.11.66s-.038.971-.466 1.204l-5.48 2.988v10.318c.203.072.396.162.577.275 1.719-1.052 4.235-2.459 5.423-2.459 1.387 0 3 2.185 3 5 0 2.663-1.87 5-3 5zm-11.02-19.316c.209.372.374.851.452 1.396l3.885-2.119zm-12.198 6.134c.258-.899.306-1.607.296-2.05-1.739-.604-2.915-1.706-3.691-2.768h-2.063c.808 1.594 3.023 4.13 5.458 4.818zm10.407-5.233c-.578-.802-1.378-1.585-4.189-1.585-.87 0-1.88.196-2.95.403-1.616.312-3.375.654-5.067.395.654.898 1.685 1.838 3.26 2.232l.582.146.146.582c.046.186 1.076 4.61-4.263 9.949l-4.908 4.908c-.275 1.533-.926 2.971-2.05 4.093l-1.413-1.416c2.427-2.422 1.94-7.101-.117-9.667-3.426-4.272-8.781-6.625-15.079-6.625h-4.04c.466 2.279 2.491 4 4.912 4h2.004v2h-.934l-4.988.831c.439 1.878 2.367 3.169 4.905 3.169h4v2h-1.839l-5.095 1.698c.378 1.95 2.337 3.302 4.934 3.302h4v2h-1.372c-.645 1.177-2.455 3.753-7.074 6.832-1.052.701-2.223 1.287-3.256 1.803-1.545.773-3.298 1.65-3.298 2.365 0 .539.431.974.965.993.605-.376 1.167-.677 1.587-.888l.895 1.789c-2.491 1.245-4.267 2.834-4.435 3.939.122.051.312.094.51.124.831-1.054 1.823-2.057 2.922-2.79l1.109 1.664c-1.535 1.023-2.753 2.59-3.542 3.905.151-.106.303-.213.451-.317 3.836-2.695 7.493-5.127 10.082-5.393.882-.943 3.908-4.354 5.525-8.398l1.857.742c-1.423 3.557-3.781 6.587-5.15 8.168l.993.331c3.062-2.704 7.701-7.05 8.334-8.317l1.789.895c-.621 1.242-3.404 3.976-5.769 6.174 1.598-.357 3.557-1.048 5.25-2.403 2.667-2.134 3.463-4.87 4.471-8.334.73-2.512 1.559-5.358 3.286-8.381 3.4-5.951 7.492-9.768 9.937-12.048.479-.446.894-.833 1.224-1.163 1.724-1.721 1.146-3.362.898-3.707zm12.715 10.425c-.629.105-2.373 1.013-4.075 2.033.103.302.171.62.171.957 0 .327-.066.635-.162.93.102.069.201.141.301.213 1.509.889 2.997 1.658 3.657 1.824.397-.367 1.204-1.46 1.204-2.967 0-1.738-.792-2.768-1.096-2.99zm-9.589 16.033c-1.684.19-3.211 1.043-3.911 1.957h2.596c.735 0 1.427-.169 2.056-.454-.298-.419-.554-.919-.741-1.503zm3.685-3.043v-1.816c-1.161.414-2 1.514-2 2.816 0 1.079.313 1.85.672 2.366.817-.89 1.328-2.066 1.328-3.366zm-1-9c.551 0 1-.448 1-1s-.449-1-1-1-1 .448-1 1 .449 1 1 1zm-6.795 1.967c.659-.166 2.146-.933 3.655-1.823.101-.072.2-.145.303-.214-.097-.295-.163-.603-.163-.93 0-.337.068-.655.171-.957-1.701-1.02-3.445-1.927-4.075-2.033-.304.222-1.096 1.252-1.096 2.99 0 1.507.807 2.601 1.205 2.967zm4.715-.122c-3.725 2.729-5.371 7.507-5.797 10.605 1.108-1.219 2.916-2.142 4.882-2.382-.001-.024-.005-.044-.005-.068 0-2.414 1.721-4.434 4-4.899v-3.285c-.314.112-.648.184-1 .184-.58 0-1.117-.173-1.577-.459-.164.1-.327.199-.503.304zm10.08 12.155c0-2.562-1.285-8.037-5-11.406v6.406c0 3.859-3.14 7-7 7h-3.737c.892 3.445 4.017 6 7.737 6 4.411 0 8-3.589 8-8zm-40.548-20.893-.903 1.785c2.62 1.327 4.451 3.426 4.451 5.108 0 1.519-.689 2.273-.718 2.305l.718.695.707.707c.132-.132 1.293-1.36 1.293-3.707 0-2.481-2.178-5.187-5.548-6.893z"
      />
    </svg>
  )
}

/* --------------------------------- Balloon -------------------------------- */

export function Balloon({
  className,
  color = 'var(--sky)',
  style,
}: {
  className?: string
  color?: string
  style?: React.CSSProperties
}) {
  // Sanitize the color into a valid, unique SVG id (var(--x) has invalid chars).
  const gid = 'balloon-' + color.replace(/[^a-z0-9]/gi, '')
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 120"
      className={cn('pointer-events-none select-none', className)}
      style={style}
    >
      <defs>
        <radialGradient id={gid} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="white" stopOpacity="0.55" />
          <stop offset="45%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </radialGradient>
      </defs>
      <path
        d="M40 4c19 0 33 15 33 36 0 24-20 40-33 49C27 80 7 64 7 40 7 19 21 4 40 4Z"
        fill={`url(#${gid})`}
      />
      <path d="M40 89l6 8H34l6-8Z" fill={color} />
      <path
        d="M40 97c0 10 8 12 8 22"
        fill="none"
        stroke="var(--muted-foreground)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

/* ---------------------------------- Star ---------------------------------- */

export function Star({
  className,
  color = 'var(--gold)',
  style,
}: {
  className?: string
  color?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn('pointer-events-none select-none', className)}
      style={style}
      fill={color}
    >
      <path d="M12 0c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12C6.5 11 11 6.5 12 0Z" />
    </svg>
  )
}

/* ------------------------------ Confetti field ---------------------------- */

const CONFETTI_COLORS = ['var(--sky)', 'var(--blush)', 'var(--gold)', 'var(--mint)', 'var(--primary)']

export function ConfettiField({
  count = 40,
  className,
}: {
  count?: number
  className?: string
}) {
  // Deterministic pseudo-random so SSR and client match.
  const pieces = Array.from({ length: count }).map((_, i) => {
    const rand = (n: number) => {
      const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453
      return x - Math.floor(x)
    }
    const r2 = (n: number) => Math.round(n * 100) / 100
    const left = r2(rand(1) * 100)
    const delay = r2(rand(2) * 6)
    const duration = r2(5 + rand(3) * 6)
    const size = r2(6 + rand(4) * 8)
    const color = CONFETTI_COLORS[Math.floor(rand(5) * CONFETTI_COLORS.length)]
    const round = rand(6) > 0.5
    return { left, delay, duration, size, color, round, id: i }
  })

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute -top-6 animate-[confetti-fall_linear_infinite]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.5,
            background: p.color,
            borderRadius: p.round ? '9999px' : '2px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-10%) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(1200%) rotate(540deg); opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}

/* -------------------------------- Firework -------------------------------- */

export function Firework({
  className,
  color = 'var(--gold)',
  delay = 0,
}: {
  className?: string
  color?: string
  delay?: number
}) {
  const rays = Array.from({ length: 12 })
  return (
    <div className={cn('pointer-events-none absolute size-24', className)} aria-hidden="true">
      <div
        className="relative size-full"
        style={{ animation: `firework-burst 2.6s ease-out ${delay}s infinite` }}
      >
        {rays.map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-[38px] w-[3px] origin-top rounded-full"
            style={{
              background: `linear-gradient(to bottom, ${color}, transparent)`,
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes firework-burst {
          0% { transform: scale(0); opacity: 0; }
          15% { opacity: 1; }
          60% { transform: scale(1); opacity: 1; }
          80% { opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="firework-burst"] { animation: none !important; opacity: 0.85 !important; transform: scale(0.9) !important; }
        }
      `}</style>
    </div>
  )
}
