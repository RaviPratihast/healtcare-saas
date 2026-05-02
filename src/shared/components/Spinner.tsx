import { cn } from '@/shared/utils/cn'

type SpinnerProps = {
  className?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-10 border-[3px]',
}

export function Spinner({ className, label = 'Loading', size = 'md' }: SpinnerProps) {
  return (
    <span
      className={cn('inline-flex items-center justify-center', className)}
      role="status"
      aria-label={label}
    >
      <span
        className={cn(
          'animate-spin rounded-full border-blue-600 border-t-transparent',
          sizeMap[size],
        )}
      />
    </span>
  )
}
