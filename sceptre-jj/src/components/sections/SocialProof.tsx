import { useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'

interface Stat {
  value: string
  label: string
  suffix?: string
}

const stats: Stat[] = [
  { value: '5.0', label: 'Google Rating', suffix: '★' },
  { value: '21',  label: 'Five-Star Reviews' },
  { value: '3',   label: 'Expert Instructors' },
  { value: 'IBJJF', label: 'World Masters Gold' },
]

export function SocialProof() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !prefersReduced) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.3 }
    )
    itemRefs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="social-proof" aria-label="Social proof statistics" className="bg-[var(--color-bg-dark)] py-0">
      <dl
        className="grid grid-cols-2 md:grid-cols-4"
        aria-label="Key statistics"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            ref={(el) => { itemRefs.current[i] = el }}
            className={cn(
              'flex flex-col items-center justify-center gap-2 py-12 px-6',
              'border-[var(--color-border-dark)] text-center',
              i < stats.length - 1 && 'border-r',
              'opacity-0 translate-y-4 transition-all duration-700',
              '[&.animate-in]:opacity-100 [&.animate-in]:translate-y-0'
            )}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 order-2">
              {stat.label}
            </dt>
            <dd className="font-black text-white leading-none order-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
              {stat.value}
              {stat.suffix && (
                <span className="ml-1 text-yellow-400" aria-hidden="true">
                  {stat.suffix}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
