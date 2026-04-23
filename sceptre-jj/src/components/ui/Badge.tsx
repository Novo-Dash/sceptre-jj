import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'inverted' | 'outline'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default:  'bg-[var(--color-accent-subtle)] text-[var(--color-text)]',
  inverted: 'bg-white text-[var(--color-bg-dark)]',
  outline:  'border border-[var(--color-border)] text-[var(--color-text-muted)]',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full',
        'px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
