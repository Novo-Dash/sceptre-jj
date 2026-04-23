import { useState, useEffect, useCallback, useRef } from 'react'
import { Dialog } from '@base-ui-components/react/dialog'
import { Button } from './Button'
import { cn } from '@/lib/utils'
import { useUTMs } from '@/hooks/useUTMs'
import type { BookingFormData, ModalStep, ProgramId, LeadPayload } from '@/types'

interface BookingModalProps {
  isOpen: boolean
  defaultProgram: ProgramId | ''
  onClose: () => void
}

const EMPTY: BookingFormData = {
  firstName: '', lastName: '', phone: '', email: '',
  program: '', referral: '', website: '',
}

const RATE_LIMIT_MS = 5000

const programOptions = [
  { value: '' as const,         label: 'Select a program...' },
  { value: 'adults' as const,   label: 'Adult BJJ (Gi & No-Gi)' },
  { value: 'kids' as const,     label: 'Kids BJJ (Ages 5+)' },
  { value: 'womens' as const,   label: "Women's BJJ" },
  { value: 'not-sure' as const, label: "Not sure yet" },
]

export function BookingModal({ isOpen, defaultProgram, onClose }: BookingModalProps) {
  const [step, setStep]     = useState<ModalStep>('form')
  const [form, setForm]     = useState<BookingFormData>({ ...EMPTY, program: defaultProgram })
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})
  const lastSubmit          = useRef(0)
  const firstRef            = useRef<HTMLInputElement>(null)
  const utms                = useUTMs()

  useEffect(() => {
    if (isOpen) {
      setForm({ ...EMPTY, program: defaultProgram })
      setStep('form')
      setErrors({})
      setTimeout(() => firstRef.current?.focus(), 100)
    }
  }, [isOpen, defaultProgram])

  const validate = useCallback((): boolean => {
    const next: typeof errors = {}
    if (!form.firstName.trim()) next.firstName = 'Required'
    if (!form.lastName.trim())  next.lastName  = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (form.phone.replace(/\D/g, '').length < 10)       next.phone = 'Include area code'
    setErrors(next)
    return Object.keys(next).length === 0
  }, [form])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    setErrors((p: typeof errors) => ({ ...p, [name]: undefined }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return
    const now = Date.now()
    if (now - lastSubmit.current < RATE_LIMIT_MS) return
    lastSubmit.current = now
    if (!validate()) return

    setStep('loading')

    const payload: LeadPayload = {
      ...form, ...utms,
      source: 'sceptre-landing-page',
      tags: ['sceptre-lp'],
    }

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setStep(res.ok ? 'success' : 'error')
      if (res.ok) {
        window.fbq?.('track', 'Lead', { program: form.program })
        window.gtag?.('event', 'generate_lead')
      }
    } catch {
      setStep('error')
    }
  }, [form, utms, validate])

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-sm transition-opacity duration-300 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden max-h-[90dvh] overflow-y-auto">

            {/* Header */}
            <div className="relative px-8 pt-8 pb-7 bg-[var(--color-bg-dark)]">
              <Dialog.Close
                aria-label="Close"
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Dialog.Close>

              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 mb-2">
                Free Trial Class
              </p>
              <Dialog.Title className="text-[1.75rem] font-black text-white leading-none tracking-tight mb-2">
                Start Your Journey
              </Dialog.Title>
              <Dialog.Description className="text-sm text-white/50 leading-relaxed">
                No experience needed. No contracts. Only commit if you love it.
              </Dialog.Description>
            </div>

            {/* Body */}
            <div className="p-8">

              {step === 'form' && (
                <form onSubmit={handleSubmit} noValidate aria-label="Free trial booking">
                  <input
                    name="website" type="text" tabIndex={-1} aria-hidden="true"
                    autoComplete="off" style={{ display: 'none' }}
                    value={form.website} onChange={handleChange}
                  />
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="First Name" required error={errors.firstName}>
                        <input ref={firstRef} name="firstName" type="text" autoComplete="given-name"
                          value={form.firstName} onChange={handleChange}
                          aria-required="true" className={inputCls(!!errors.firstName)} />
                      </Field>
                      <Field label="Last Name" required error={errors.lastName}>
                        <input name="lastName" type="text" autoComplete="family-name"
                          value={form.lastName} onChange={handleChange}
                          aria-required="true" className={inputCls(!!errors.lastName)} />
                      </Field>
                    </div>

                    <Field label="Phone (we'll call to confirm)" required error={errors.phone}>
                      <input name="phone" type="tel" autoComplete="tel"
                        placeholder="(650) 000-0000"
                        value={form.phone} onChange={handleChange}
                        aria-required="true" className={inputCls(!!errors.phone)} />
                    </Field>

                    <Field label="Email" required error={errors.email}>
                      <input name="email" type="email" autoComplete="email"
                        value={form.email} onChange={handleChange}
                        aria-required="true" className={inputCls(!!errors.email)} />
                    </Field>

                    <Field label="Program Interest">
                      <select name="program" value={form.program} onChange={handleChange}
                        className={inputCls(false)}>
                        {programOptions.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </Field>

                    <Field label="How did you hear about us? (optional)">
                      <input name="referral" type="text"
                        value={form.referral} onChange={handleChange}
                        className={inputCls(false)} />
                    </Field>

                    <Button type="submit" size="lg" className="w-full mt-2">
                      Reserve My Free Class
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Button>
                  </div>
                </form>
              )}

              {step === 'loading' && (
                <div className="flex flex-col items-center gap-4 py-12" aria-live="polite">
                  <div className="w-10 h-10 border-4 border-[var(--color-border)] border-t-black rounded-full animate-spin" aria-hidden="true" />
                  <p className="text-sm text-[var(--color-text-muted)]">Sending your request...</p>
                </div>
              )}

              {step === 'success' && (
                <div className="flex flex-col items-center gap-6 py-8 text-center" aria-live="polite">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#16a34a" strokeWidth="2.5" aria-hidden="true">
                      <path d="M4 14l7 7 13-13" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[var(--color-text)] mb-2">You're in!</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm">
                      We'll be in touch shortly to confirm your free trial class.
                    </p>
                  </div>
                  <Button variant="secondary" size="md" onClick={onClose}>Close</Button>
                </div>
              )}

              {step === 'error' && (
                <div className="flex flex-col items-center gap-6 py-8 text-center" aria-live="polite">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#dc2626" strokeWidth="2.5" aria-hidden="true">
                      <path d="M4 4l20 20M24 4L4 24" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[var(--color-text)] mb-2">Something went wrong</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Call us directly:{' '}
                      <a href="tel:+16507537486" className="font-semibold underline">(650) 753-7486</a>
                    </p>
                  </div>
                  <Button variant="secondary" size="md" onClick={() => setStep('form')}>Try again</Button>
                </div>
              )}

            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function inputCls(hasError: boolean) {
  return cn(
    'w-full h-12 rounded-xl border px-4 text-sm text-[var(--color-text)]',
    'bg-white placeholder:text-[var(--color-text-muted)]',
    'focus-visible:outline-2 focus-visible:outline-[var(--color-text)] focus-visible:outline-offset-0',
    'transition-[border-color] duration-200',
    hasError
      ? 'border-[var(--color-danger)]'
      : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
  )
}

interface FieldProps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

function Field({ label, required, error, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
        {label}
        {required && <span className="text-[var(--color-danger)] ml-0.5" aria-hidden="true">*</span>}
      </span>
      {children}
      {error && <span role="alert" className="text-[11px] text-[var(--color-danger)]">{error}</span>}
    </label>
  )
}
