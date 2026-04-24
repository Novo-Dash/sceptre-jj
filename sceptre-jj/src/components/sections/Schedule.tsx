import { useEffect, useRef, useState } from 'react'
import { scheduleSlots } from '../../data/schedule'
import { SectionHeader } from '../ui'
import type { DayOfWeek } from '../../types'

const DAYS: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const DAY_LABELS: Record<DayOfWeek, string> = {
  Mon: 'Mon', Tue: 'Tue', Wed: 'Wed',
  Thu: 'Thu', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun',
}

const JS_DAY_TO_DOW: Record<number, DayOfWeek> = {
  0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat',
}

const clockIcon = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0 opacity-60">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
)

function SlotCard({ slot }: { slot: typeof scheduleSlots[number] }) {
  return (
    <div className="rounded-xl bg-white/[0.06] px-4 py-3 border border-white/[0.08] backdrop-blur-xl">
      <p className="mb-1 flex items-center gap-1.5 text-[13px] font-bold leading-none text-white tabular-nums">
        {clockIcon}
        {slot.time}
      </p>
      <p className="text-[12px] leading-tight text-white/55">{slot.className}</p>
    </div>
  )
}

function DayCard({ day, slots }: { day: DayOfWeek; slots: typeof scheduleSlots }) {
  return (
    <div className="flex w-[148px] flex-shrink-0 flex-col gap-2 rounded-2xl border border-white/[0.09] bg-white/[0.04] p-4 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] lg:w-auto">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
        {DAY_LABELS[day]}
      </p>
      {slots.length === 0 ? (
        <p className="text-[11px] text-white/18 italic">No classes</p>
      ) : (
        slots.map((slot) => (
          <div
            key={slot.id}
            className="rounded-lg bg-white/[0.06] px-3 py-2.5 border border-white/[0.08] backdrop-blur-xl"
          >
            <p className="mb-1 flex items-center gap-1 text-[13px] font-bold leading-none text-white tabular-nums">
              {clockIcon}
              {slot.time}
            </p>
            <p className="text-[11px] leading-tight text-white/55">{slot.className}</p>
          </div>
        ))
      )}
    </div>
  )
}

export function Schedule() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const today = JS_DAY_TO_DOW[new Date().getDay()]
  const [activeDay, setActiveDay] = useState<DayOfWeek>(today)

  useEffect(() => {
    const video = videoRef.current
    if (video) video.play().catch(() => {})
  }, [])

  const byDay = Object.fromEntries(
    DAYS.map((d) => [d, scheduleSlots.filter((s) => s.day === d)])
  ) as Record<DayOfWeek, typeof scheduleSlots>

  const activeSlots = byDay[activeDay]

  return (
    <section
      id="schedule"
      aria-labelledby="schedule-heading"
      className="relative py-20"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        src="/videos/herobackground.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/82" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <SectionHeader
          id="schedule-heading"
          headline="Weekly Schedule"
          sub="Pick a slot and start training — classes run 7 days a week."
          inverted
          headlineClassName="!text-[clamp(3.2rem,8vw+0.5rem,7rem)] max-md:tracking-[-0.01em] md:tracking-[-0.03em] md:whitespace-nowrap"
          headlineStyle={{ fontFamily: "'Noken', system-ui, sans-serif" }}
        />

        {/* Mobile: tab filter */}
        <div className="lg:hidden">
          {/* Day tabs */}
          <div className="flex flex-wrap gap-2 mb-5 items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.07] border border-white/[0.10] shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50" aria-hidden="true">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </span>
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={[
                  'flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-bold uppercase tracking-[0.18em] transition-all duration-200',
                  activeDay === day
                    ? 'bg-white text-black'
                    : 'bg-white/[0.07] text-white/50 border border-white/[0.10] hover:bg-white/[0.12] hover:text-white/80',
                ].join(' ')}
              >
                {DAY_LABELS[day]}
              </button>
            ))}
          </div>

          {/* Slots for selected day */}
          {activeSlots.length === 0 ? (
            <p className="text-sm text-white/30 italic">No classes on {DAY_LABELS[activeDay]}.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {activeSlots.map((slot) => (
                <SlotCard key={slot.id} slot={slot} />
              ))}
            </div>
          )}
        </div>

        {/* Desktop: 7-column grid */}
        <div className="hidden lg:grid grid-cols-7 gap-3">
          {DAYS.map((day) => (
            <DayCard key={day} day={day} slots={byDay[day]} />
          ))}
        </div>
      </div>
    </section>
  )
}
