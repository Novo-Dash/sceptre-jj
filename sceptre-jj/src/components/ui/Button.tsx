import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'white' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[var(--color-accent)] text-white ' +
    'hover:bg-[var(--color-accent-hover)] active:scale-[0.97] ' +
    'shadow-[0_4px_20px_rgba(0,0,0,0.20)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.30)]',
  secondary:
    'bg-transparent text-[var(--color-text)] border-2 border-[var(--color-text)] ' +
    'hover:bg-[var(--color-text)] hover:text-white active:scale-[0.97]',
  ghost:
    'bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border)] ' +
    'hover:text-[var(--color-text)] hover:border-[var(--color-text)] ' +
    'hover:bg-[var(--color-surface-alt)]',
  white:
    'bg-white text-[#0A0A0A] ' +
    'hover:bg-[#F0F0F0] active:scale-[0.97] ' +
    'shadow-[0_8px_32px_rgba(0,0,0,0.10)]',
  danger:
    'bg-[var(--color-danger)] text-white ' +
    'hover:bg-[#B91C1C] active:scale-[0.97] ' +
    'shadow-[0_8px_32px_rgba(220,38,38,0.35)]',
}

const sizeStyles: Record<Size, string> = {
  sm: 'min-h-[44px] px-5 py-2 text-[13px]',
  md: 'min-h-[44px] px-7 py-3 text-[13px]',
  lg: 'min-h-[52px] px-9 py-3.5 text-[13px] font-semibold tracking-wide',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2',
    'rounded-full font-semibold uppercase tracking-wider cursor-pointer select-none',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-2 focus-visible:outline-[var(--color-text)] focus-visible:outline-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  if (href) return <a href={href} className={classes}>{children}</a>
  return <button className={classes} {...props}>{children}</button>
}
