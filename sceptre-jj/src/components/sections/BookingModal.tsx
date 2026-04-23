import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '../ui'
import { cn } from '../../lib/utils'
import { useUTMs } from '../../hooks/useUTMs'
import type { BookingFormData, ModalStep, ProgramId, LeadPayload } from '../../types'

interface BookingModalProps {
  isOpen: boolean
  defaultProgram: ProgramId | ''
  onClose: () => void
}

const EMPTY_FORM: BookingFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  program: '',
  referral: '',
  website: '',
}

const RATE_LIMIT_MS = 5000

const programOptions: { value: ProgramId | ''; label: string }[] = [
  { value: '', label: 'Select a program...' },
  { value: 'adults', label: 'Adult BJJ (Gi & No-Gi)' },
  { value: 'kids', label: 'Kids BJJ (Ages 5+)' },
  { value: 'womens', label: "Women's BJJ" },
  { value: 'not-sure', label: "Not sure yet" },
]

function pushEvent(event: string, data?: Record<string, unknown>) {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...data })
}

export function BookingModal({ isOpen, defaultProgram, onClose }: BookingModalProps) {
  const [step, setStep] = useState<ModalStep>('form')
  const [form, setForm] = useState<BookingFormData>({ ...EMPTY_FORM, program: defaultProgram })
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})
  const [lastSubmit, setLastSubmit] = useState(0)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const utms = useUTMs()

  // Sync defaultProgram when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({ ...EMPTY_FORM, program: defaultProgram })
      setStep('form')
      setErrors({})
      // Push GTM event
      pushEvent('InitiateCheckout')
    }
  }, [isOpen, defaultProgram])

  // Focus first field on open
  useEffect(() => {
    if (isOpen && step === 'form') {
      const id = setTimeout(() => firstFieldRef.current?.focus(), 100)
      return () => clearTimeout(id)
    }
  }, [isOpen, step])

  // Trap focus within modal & close on Escape
  useEffect(() => {
    if (!isOpen) return

    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [isOpen, onClose])

  const validate = useCallback((): boolean => {
    const next: typeof errors = {}
    if (!form.firstName.trim()) next.firstName = 'Required'
    if (!form.lastName.trim()) next.lastName = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      next.email = 'Enter a valid email address'
    const phone = form.phone.replace(/\D/g, '')
    if (phone.length < 10 || /^(\d)\1{9}$/.test(phone))
      next.phone = 'Phone incomplete — include area code'
    setErrors(next)
    return Object.keys(next).length === 0
  }, [form])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setForm((prev) => ({ ...prev, [name]: value }))
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (form.website) return // honeypot

      const now = Date.now()
      if (now - lastSubmit < RATE_LIMIT_MS) return
      setLastSubmit(now)

      if (!validate()) return

      setStep('loading')

      const payload: LeadPayload = {
        ...form,
        ...utms,
        source: 'sceptre-landing-page',
        tags: ['sceptre-lp'],
      }

      try {
        const res = await fetch('/api/submit-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (res.ok) {
          setStep('success')
          pushEvent('Lead', { program: form.program })
        } else {
          setStep('error')
        }
      } catch {
        setStep('error')
      }
    },
    [form, lastSubmit, validate, utms]
  )

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="modal-backdrop absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-(--radius-lg) shadow-(--shadow-3) overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-6 border-b border-(--color-border)">
          <div>
            <h2 id="modal-title" className="text-[22px] font-black text-(--color-text) leading-tight">
              Reserve Your Free Trial Class
            </h2>
            <p className="text-fluid-sub text-(--color-text-muted) mt-1">
              No experience needed. No contracts.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="ml-4 shrink-0 w-11 h-11 flex items-center justify-center rounded-full hover:bg-(--color-surface-alt) transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 5l10 10M15 5l-10 10" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* STEP: form */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} noValidate aria-label="Free trial class booking form">
              {/* Honeypot */}
              <input
                name="website"
                type="text"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                style={{ display: 'none' }}
                value={form.website}
                onChange={handleChange}
              />

              <div className="flex flex-col gap-5">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="First Name"
                    required
                    error={errors.firstName}
                  >
                    <input
                      ref={firstFieldRef}
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.firstName}
                      className={inputClass(!!errors.firstName)}
                    />
                  </Field>
                  <Field label="Last Name" required error={errors.lastName}>
                    <input
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.lastName}
                      className={inputClass(!!errors.lastName)}
                    />
                  </Field>
                </div>

                {/* Phone */}
                <Field
                  label="Phone* (we'll call to confirm)"
                  required
                  error={errors.phone}
                >
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(650) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    className={inputClass(!!errors.phone)}
                  />
                </Field>

                {/* Email */}
                <Field label="Email" required error={errors.email}>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    className={inputClass(!!errors.email)}
                  />
                </Field>

                {/* Program */}
                <Field label="Program Interest" error={errors.program}>
                  <select
                    name="program"
                    value={form.program}
                    onChange={handleChange}
                    className={inputClass(false)}
                  >
                    {programOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </Field>

                {/* Referral */}
                <Field label="How did you hear about us? (optional)">
                  <input
                    name="referral"
                    type="text"
                    value={form.referral}
                    onChange={handleChange}
                    className={inputClass(false)}
                  />
                </Field>

                <Button type="submit" size="lg" className="w-full mt-2">
                  Reserve My Free Class
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </div>
            </form>
          )}

          {/* STEP: loading */}
          {step === 'loading' && (
            <div className="flex flex-col items-center gap-4 py-12" aria-live="polite" aria-label="Submitting...">
              <div className="w-12 h-12 border-4 border-(--color-border) border-t-black rounded-full animate-spin" aria-hidden="true" />
              <p className="text-(--color-text-muted) text-fluid-sub">Sending your request...</p>
            </div>
          )}

          {/* STEP: success */}
          {step === 'success' && (
            <div className="flex flex-col items-center gap-6 py-8 text-center" aria-live="polite">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#16a34a" strokeWidth="2.5" aria-hidden="true">
                  <path d="M6 16l7 7 13-13" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-[22px] font-black text-(--color-text)">You're in!</h3>
              <p className="text-fluid-sub text-(--color-text-secondary) leading-[1.7] max-w-sm">
                We'll be in touch shortly to confirm your free trial class. Check your phone — we may call or text.
              </p>
              <Button size="md" variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          )}

          {/* STEP: error */}
          {step === 'error' && (
            <div className="flex flex-col items-center gap-6 py-8 text-center" aria-live="polite">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#dc2626" strokeWidth="2.5" aria-hidden="true">
                  <path d="M6 6l20 20M26 6L6 26" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-[22px] font-black text-(--color-text)">Something went wrong</h3>
              <p className="text-fluid-sub text-(--color-text-secondary)">
                Please call us directly:{' '}
                <a href="tel:+16507537486" className="font-semibold underline underline-offset-2">
                  (650) 753-7486
                </a>
              </p>
              <Button size="md" variant="secondary" onClick={() => setStep('form')}>
                Try again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function inputClass(hasError: boolean) {
  return cn(
    'w-full h-12 rounded-(--radius-sm) border px-4 text-fluid-sub text-(--color-text)',
    'bg-white placeholder:text-(--color-text-muted)',
    'focus-visible:outline focus-visible:outline-3 focus-visible:outline-black focus-visible:outline-offset-0',
    'transition-[border-color] duration-(--transition-micro)',
    hasError ? 'border-(--color-danger)' : 'border-(--color-border) hover:border-(--color-text-muted)'
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
      <span className="text-[12px] font-semibold text-(--color-text-secondary) uppercase tracking-wide">
        {label}
        {required && <span className="text-(--color-danger) ml-0.5" aria-hidden="true">*</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="text-[12px] text-(--color-danger)">
          {error}
        </span>
      )}
    </label>
  )
}
