import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  className?: string
  inverted?: boolean
}

export function StarRating({ rating, className, inverted }: StarRatingProps) {
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="12" height="12" viewBox="0 0 20 20"
          fill={i < rating ? 'currentColor' : 'none'}
          stroke="currentColor" strokeWidth="1.5"
          aria-hidden="true"
          className={cn(
            i < rating
              ? inverted ? 'text-white' : 'text-[var(--color-text)]'
              : inverted ? 'text-white/20' : 'text-[var(--color-border)]'
          )}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
        </svg>
      ))}
    </div>
  )
}
