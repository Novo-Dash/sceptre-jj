import { useEffect, useRef } from 'react'
import { scheduleSlots } from '../../data/schedule'
import { SectionHeader } from '../ui'
import type { DayOfWeek } from '../../types'

const DAYS: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const DAY_LABELS: Record<DayOfWeek, string> = {
  Mon: 'Mon', Tue: 'Tue', Wed: 'Wed',
  Thu: 'Thu', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun',
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
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0 opacity-60">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {slot.time}
            </p>
            <p className="text-[11px] leading-tight text-white/55">
              {slot.className}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export function Schedule() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {})
    }
  }, [])

  const byDay = Object.fromEntries(
    DAYS.map((d) => [d, scheduleSlots.filter((s) => s.day === d)])
  ) as Record<DayOfWeek, typeof scheduleSlots>

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

        {/* Mobile: swipeable horizontal scroll */}
        <div className="lg:hidden schedule-scroll scrollbar-hide -mx-6 px-6">
          <div className="flex gap-3 w-max pb-2">
            {DAYS.map((day) => (
              <DayCard key={day} day={day} slots={byDay[day]} />
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden lg:grid grid-cols-7 gap-3">
          {DAYS.map((day) => (
            <DayCard key={day} day={day} slots={byDay[day]} />
          ))}
        </div>

      </div>
    </section>
  )
}
