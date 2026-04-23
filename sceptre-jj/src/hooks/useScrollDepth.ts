import { useEffect, useRef } from 'react'

const DEPTHS = [25, 50, 75, 90] as const

export function useScrollDepth() {
  const fired = useRef<Set<number>>(new Set())

  useEffect(() => {
    const onScroll = () => {
      const scrolled =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      DEPTHS.forEach((depth) => {
        if (scrolled >= depth && !fired.current.has(depth)) {
          fired.current.add(depth)
          window.fbq?.('trackCustom', 'ScrollDepth', { depth: `${depth}%` })
          window.gtag?.('event', 'scroll', { percent_scrolled: depth })
          window.dataLayer = window.dataLayer ?? []
          window.dataLayer.push({ event: 'scroll_depth', depth_percent: depth })
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
