import { useEffect, useRef } from 'react'
import type { UtmParams } from '../types'

const UTM_KEYS: (keyof UtmParams)[] = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
]

export function useUTMs(): UtmParams {
  const params = useRef<UtmParams>({
    utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '',
  })

  useEffect(() => {
    const search = new URLSearchParams(window.location.search)
    const stored = sessionStorage.getItem('sceptre_utms')

    if (stored) {
      params.current = JSON.parse(stored)
      return
    }

    const captured: Partial<UtmParams> = {}
    UTM_KEYS.forEach((key) => {
      captured[key] = search.get(key) ?? ''
    })

    params.current = captured as UtmParams
    sessionStorage.setItem('sceptre_utms', JSON.stringify(captured))
  }, [])

  return params.current
}
