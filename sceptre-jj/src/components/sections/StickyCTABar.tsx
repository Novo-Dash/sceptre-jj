import { useState, useEffect } from 'react'
import { Button } from '../ui'
import { cn } from '../../lib/utils'

interface StickyCTABarProps {
  onBooking: () => void
  threshold?: number
}

export function StickyCTABar({ onBooking, threshold = 600 }: StickyCTABarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > threshold) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 md:hidden',
        'pb-[env(safe-area-inset-bottom)] px-4 pt-3',
        'bg-white border-t border-[var(--color-border)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]',
        'transition-transform duration-300',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <Button
        size="lg"
        onClick={onBooking}
        className="w-full"
        tabIndex={visible ? 0 : -1}
      >
        Book Free Class
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>
    </div>
  )
}
