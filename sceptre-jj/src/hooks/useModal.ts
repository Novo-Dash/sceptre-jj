import { useState, useCallback } from 'react'
import type { ProgramId } from '../types'

interface ModalState {
  isOpen: boolean
  defaultProgram: ProgramId | ''
}

export function useModal() {
  const [state, setState] = useState<ModalState>({ isOpen: false, defaultProgram: '' })

  const openModal = useCallback((program: ProgramId | '' = '') => {
    setState({ isOpen: true, defaultProgram: program })
    document.body.style.overflow = 'hidden'
    window.fbq?.('track', 'InitiateCheckout', { content_name: 'Free Trial — Sceptre JJ' })
    window.gtag?.('event', 'begin_checkout')
  }, [])

  const closeModal = useCallback(() => {
    setState({ isOpen: false, defaultProgram: '' })
    document.body.style.overflow = ''
  }, [])

  return { ...state, openModal, closeModal }
}
