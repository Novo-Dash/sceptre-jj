import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  label?: string
  aspect?: string
  className?: string
}

export function ImagePlaceholder({
  label = 'Image pending',
  aspect = 'aspect-[4/3]',
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3',
        'bg-[var(--color-surface-alt)] border border-dashed border-[var(--color-border)]',
        'rounded-2xl w-full',
        aspect,
        className
      )}
      role="img"
      aria-label={label}
    >
      <svg
        width="32" height="32" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.5"
        aria-hidden="true"
        className="text-[var(--color-text-muted)] opacity-40"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-600">
        {label}
      </span>
    </div>
  )
}
