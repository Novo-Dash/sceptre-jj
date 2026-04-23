import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
  inverted?: boolean
  labelledBy?: string
}

export function Section({ id, children, className, inverted, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'py-20',
        inverted
          ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)]'
          : 'bg-[var(--color-bg)]',
        className
      )}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        {children}
      </div>
    </section>
  )
}
