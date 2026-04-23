import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface WobbleCardProps {
  children: React.ReactNode
  containerClassName?: string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export function WobbleCard({ children, containerClassName, className, style, onClick }: WobbleCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion.current || !ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    setTilt({
      x: (e.clientX - left) / width - 0.5,
      y: (e.clientY - top) / height - 0.5,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }) }}
      style={{
        transform: hovering && !reducedMotion.current
          ? `perspective(1000px) rotateX(${tilt.y * -8}deg) rotateY(${tilt.x * 8}deg) scale3d(1.015,1.015,1.015)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
        transition: hovering
          ? 'transform 0.1s ease-out'
          : 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        willChange: 'transform',
        ...style,
      }}
      onClick={onClick}
      className={cn('relative overflow-hidden rounded-2xl', onClick && 'cursor-pointer', containerClassName)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          mixBlendMode: 'overlay',
        }}
      />
      <div className={cn('relative z-20 flex flex-col flex-1', className)}>
        {children}
      </div>
    </div>
  )
}
