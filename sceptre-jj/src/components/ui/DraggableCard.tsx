import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { cn } from '@/lib/utils'

gsap.registerPlugin(Draggable)

interface DraggableCardContainerProps {
  children: React.ReactNode
  className?: string
}

export function DraggableCardContainer({ children, className }: DraggableCardContainerProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
    </div>
  )
}

interface DraggableCardBodyProps {
  children: React.ReactNode
  className?: string
}

export function DraggableCardBody({ children, className }: DraggableCardBodyProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const [d] = Draggable.create(ref.current, {
      type: 'x,y',
      onPress() {
        gsap.to(this.target, { scale: 1.07, zIndex: 50, duration: 0.15, ease: 'power2.out' })
      },
      onRelease() {
        gsap.to(this.target, { scale: 1, duration: 0.3, ease: 'power2.out' })
      },
    })

    return () => { d.kill() }
  }, [])

  return (
    <div
      ref={ref}
      className={cn('absolute cursor-grab active:cursor-grabbing select-none', className)}
    >
      {children}
    </div>
  )
}
