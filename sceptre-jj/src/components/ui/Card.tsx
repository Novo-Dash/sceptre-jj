import { cn } from '../../lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  inverted?: boolean
}

export function Card({ children, className, inverted }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-8 flex flex-col',
        'border transition-colors duration-200',
        inverted
          ? 'bg-white/5 border-white/10 text-white hover:border-white/20'
          : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-text)]',
        className
      )}
    >
      {children}
    </div>
  )
}
