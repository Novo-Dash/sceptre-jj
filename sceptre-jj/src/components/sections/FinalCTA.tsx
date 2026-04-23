import { Button } from '../ui'

interface FinalCTAProps {
  onBooking: () => void
}

export function FinalCTA({ onBooking }: FinalCTAProps) {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="bg-[var(--color-bg-dark)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 text-center flex flex-col items-center gap-8">
        <h2
          id="final-cta-heading"
          className="font-black text-white leading-[0.92] tracking-[-0.03em] max-w-4xl"
          style={{ fontSize: 'clamp(2.8rem, 6vw + 0.5rem, 7rem)', fontFamily: "'Noken', system-ui, sans-serif" }}
        >
          Your First Class is Free.<br />
          What Are You Waiting For?
        </h2>

        <p className="text-base text-white/50 leading-[1.7] max-w-xl">
          No experience needed. No contracts. Only sign up if you love it.
          Join the Sceptre community today.
        </p>

        <Button
          variant="white"
          size="lg"
          onClick={onBooking}
          className="mt-2"
        >
          Book Your Free Trial Class
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>

        <p className="text-sm text-white/30">
          Or call us:{' '}
          <a
            href="tel:+16507537486"
            className="text-white/60 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-sm"
          >
            (650) 753-7486
          </a>
        </p>
      </div>
    </section>
  )
}
