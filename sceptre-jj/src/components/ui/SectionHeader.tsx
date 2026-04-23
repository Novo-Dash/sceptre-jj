import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  id: string
  eyebrow?: string
  headline: React.ReactNode
  sub?: string
  centered?: boolean
  inverted?: boolean
  className?: string
  headlineClassName?: string
  headlineStyle?: React.CSSProperties
}

export function SectionHeader({
  id, eyebrow, headline, sub, centered, inverted, className, headlineClassName, headlineStyle,
}: SectionHeaderProps) {
  return (
    <header className={cn('mb-16 max-md:mb-10', centered && 'text-center', className)}>
      {eyebrow && (
        <p className={cn(
          'mb-5 text-[11px] font-semibold uppercase tracking-[0.22em]',
          inverted ? 'text-[var(--color-text-muted-dark)]' : 'text-[var(--color-text-muted)]'
        )}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        style={headlineStyle}
        className={cn(
          'text-fluid-section font-black leading-[0.93]',
          'tracking-[-0.02em]',
          inverted ? 'text-[var(--color-text-dark)]' : 'text-[var(--color-text)]',
          headlineClassName
        )}
      >
        {headline}
      </h2>
      {sub && (
        <p className={cn(
          'mt-6 text-fluid-body leading-[1.7] max-w-2xl',
          centered && 'mx-auto',
          inverted ? 'text-[var(--color-text-muted-dark)]' : 'text-[var(--color-text-secondary)]'
        )}>
          {sub}
        </p>
      )}
    </header>
  )
}
