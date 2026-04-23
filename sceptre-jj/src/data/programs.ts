import type { Program } from '../types'

export const programs: Program[] = [
  {
    id: 'adults',
    title: 'Adult BJJ',
    subtitle: 'Gi & No-Gi',
    pills: ['Gi', 'No-Gi'],
    image: '/images/classes/adults.webp',
    description:
      '[PROGRAM DESCRIPTION — CONFIRMAR]',
    bullets: [
      'Gi and No-Gi classes available',
      'All skill levels welcome',
      'Modern CLA methodology',
      'Beginner-friendly environment',
    ],
    cta: 'Book Free Trial',
  },
  {
    id: 'womens',
    title: "Women's BJJ",
    subtitle: 'All Levels',
    image: '/images/classes/women.webp',
    description:
      '[PROGRAM DESCRIPTION — CONFIRMAR]',
    bullets: [
      'Women-only weekly class',
      'Free monthly open mat',
      'Taught by Miranda "Mira" — Purple Belt',
      'Welcoming and inclusive atmosphere',
    ],
    cta: 'Book Free Trial',
  },
  {
    id: 'kids',
    title: 'Kids BJJ',
    subtitle: 'Ages 5+',
    image: '/images/classes/kids.webp',
    description:
      '[PROGRAM DESCRIPTION — CONFIRMAR]',
    bullets: [
      'Ages 5 and up',
      'Fun and safe environment',
      'Builds confidence and discipline',
      'Parents welcome to train at no extra charge',
    ],
    cta: 'Book Free Trial',
  },
]
