// ─── Program ──────────────────────────────────────────────────────────────────
export type ProgramId = 'adults' | 'kids' | 'womens' | 'not-sure'

export interface Program {
  id: ProgramId
  title: string
  subtitle: string
  description: string
  badge?: string
  bullets: string[]
  cta: string
  image?: string
  pills?: string[]
}

// ─── Instructor ───────────────────────────────────────────────────────────────
export interface Instructor {
  id: string
  name: string
  title: string
  belt: string
  beltColor: 'black' | 'purple' | 'brown' | 'blue'
  credential?: string
  bio: string
  imageSrc?: string
  imageAlt: string
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
export type PersonaTag = 'parent' | 'adult' | 'women' | 'drop-in'

export interface Testimonial {
  id: string
  author: string
  initial: string
  role?: string
  rating: 5 | 4 | 3 | 2 | 1
  text: string
  persona: PersonaTag
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export interface FaqItem {
  id: string
  question: string
  answer: string
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

export interface ScheduleSlot {
  id: string
  day: DayOfWeek
  time: string
  duration: string
  className: string
  programId: ProgramId | 'all'
  instructor?: string
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export type ModalStep = 'form' | 'loading' | 'success' | 'error'

export interface BookingFormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  program: ProgramId | ''
  referral: string
  website: string // honeypot
}

// ─── UTMs ─────────────────────────────────────────────────────────────────────
export interface UtmParams {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
}

// ─── Lead Payload ─────────────────────────────────────────────────────────────
export interface LeadPayload extends BookingFormData, UtmParams {
  source: string
  tags: string[]
}

// Augment window for tracking pixels
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}
