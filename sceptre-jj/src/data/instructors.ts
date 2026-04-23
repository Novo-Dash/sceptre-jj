import type { Instructor } from '../types'

export const instructors: Instructor[] = [
  {
    id: 'john',
    name: 'John Miller',
    title: 'Head Instructor',
    belt: 'Black Belt',
    beltColor: 'black',
    bio: '[JOHN BIO — CONFIRMAR]',
    imageSrc: '/images/professor/John.webp',
    imageAlt: 'John Miller, Head Instructor and Black Belt at Sceptre Jiu-Jitsu in San Mateo, CA',
  },
  {
    id: 'sean',
    name: 'Sean "Higgie"',
    title: 'Instructor',
    belt: 'Purple Belt',
    beltColor: 'purple',
    bio: '[SEAN BIO — CONFIRMAR]',
    imageSrc: '/images/professor/Sean.webp',
    imageAlt: 'Sean Higgie, Instructor and IBJJF World Masters Gold 2024 champion at Sceptre Jiu-Jitsu',
  },
  {
    id: 'mira',
    name: 'Miranda "Mira"',
    title: "Women's Instructor",
    belt: 'Purple Belt',
    beltColor: 'purple',
    bio: '[MIRA BIO — CONFIRMAR]',
    imageSrc: '/images/professor/mira.webp',
    imageAlt: 'Miranda, Women\'s Instructor and Purple Belt at Sceptre Jiu-Jitsu in San Mateo, CA',
  },
]
