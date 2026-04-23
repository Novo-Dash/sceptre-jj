import type { ScheduleSlot } from '../types'

export const scheduleSlots: ScheduleSlot[] = [
  // Monday
  { id: 'mon-adults-9am', day: 'Mon', time: '9 – 10am', duration: '60 min', className: 'Adults Class', programId: 'adults' },

  // Tuesday
  { id: 'tue-adults-9am',       day: 'Tue', time: '9 – 10am',     duration: '60 min', className: 'Adults Class',      programId: 'adults' },
  { id: 'tue-adults-6pm',       day: 'Tue', time: '6 – 7pm',      duration: '60 min', className: 'Adults Class',      programId: 'adults' },

  // Wednesday
  { id: 'wed-adults-9am',       day: 'Wed', time: '9 – 10am',     duration: '60 min', className: 'Adults Class',      programId: 'adults' },
  { id: 'wed-openmat-12',       day: 'Wed', time: '12 – 1pm',     duration: '60 min', className: 'Open Mat',          programId: 'all'    },
  { id: 'wed-kids-5-9',         day: 'Wed', time: '3 – 3:45pm',   duration: '45 min', className: 'Kids (5–9)',        programId: 'kids'   },
  { id: 'wed-kids-9-12',        day: 'Wed', time: '4 – 5pm',      duration: '60 min', className: 'Kids (9–12)',       programId: 'kids'   },
  { id: 'wed-womens-6pm',       day: 'Wed', time: '6 – 7pm',      duration: '60 min', className: "Women's Class",     programId: 'womens' },
  { id: 'wed-womens-openmat',   day: 'Wed', time: '7 – 8pm',      duration: '60 min', className: "Women's Open Mat",  programId: 'womens' },

  // Thursday
  { id: 'thu-judo-9am',         day: 'Thu', time: '9 – 10am',     duration: '60 min', className: 'Judo All Levels',   programId: 'all'    },
  { id: 'thu-adults-11am',      day: 'Thu', time: '11am – 12pm',  duration: '60 min', className: 'Adults Class',      programId: 'adults' },
  { id: 'thu-kids-6-9',         day: 'Thu', time: '1 – 1:45pm',   duration: '45 min', className: 'Kids (6–9)',        programId: 'kids'   },
  { id: 'thu-kids-9-12',        day: 'Thu', time: '2 – 3pm',      duration: '60 min', className: 'Kids (9–12)',       programId: 'kids'   },
  { id: 'thu-adults-6pm',       day: 'Thu', time: '6 – 7pm',      duration: '60 min', className: 'Adults Class',      programId: 'adults' },
  { id: 'thu-openmat-7pm',      day: 'Thu', time: '7 – 8pm',      duration: '60 min', className: 'Open Mat',          programId: 'all'    },

  // Friday
  { id: 'fri-adults-9am',       day: 'Fri', time: '9 – 10am',     duration: '60 min', className: 'Adults Class',      programId: 'adults' },
  { id: 'fri-adults-11am',      day: 'Fri', time: '11am – 12pm',  duration: '60 min', className: 'Adults Class',      programId: 'adults' },
  { id: 'fri-openmat-12',       day: 'Fri', time: '12 – 1pm',     duration: '60 min', className: 'Open Mat',          programId: 'all'    },
  { id: 'fri-kids-5-9',         day: 'Fri', time: '3 – 3:45pm',   duration: '45 min', className: 'Kids (5–9)',        programId: 'kids'   },
  { id: 'fri-kids-9-12',        day: 'Fri', time: '4 – 5pm',      duration: '60 min', className: 'Kids (9–12)',       programId: 'kids'   },
  { id: 'fri-adults-6pm',       day: 'Fri', time: '6 – 7pm',      duration: '60 min', className: 'Adults Class',      programId: 'adults' },
  { id: 'fri-openmat-7pm',      day: 'Fri', time: '7 – 8pm',      duration: '60 min', className: 'Open Mat',          programId: 'all'    },

  // Saturday
  { id: 'sat-adults-9am',       day: 'Sat', time: '9 – 10am',     duration: '60 min', className: 'Adults Class',      programId: 'adults' },
  { id: 'sat-adults-11am',      day: 'Sat', time: '11am – 12pm',  duration: '60 min', className: 'Adults Class',      programId: 'adults' },
  { id: 'sat-openmat-12',       day: 'Sat', time: '12 – 1pm',     duration: '60 min', className: 'Open Mat',          programId: 'all'    },

  // Sunday
  { id: 'sun-adults-9am',       day: 'Sun', time: '9 – 10am',     duration: '60 min', className: 'Adults Class',      programId: 'adults' },
  { id: 'sun-openmat-10am',     day: 'Sun', time: '10 – 11am',    duration: '60 min', className: 'Open Mat',          programId: 'all'    },
]
