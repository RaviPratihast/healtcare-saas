import { cn } from '@/shared/utils/cn'

type SpinnerProps = {
  className?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  tone?: 'default' | 'inverse'
}

const sizeMap = {
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-10 border-[3px]',
}

const toneMap = {
  default: 'border-indigo-600 border-t-transparent',
  inverse: 'border-white/35 border-t-white',
}

export function Spinner({
  className,
  label = 'Loading',
  size = 'md',
  tone = 'default',
}: SpinnerProps) {
  return (
    <span
      className={cn('inline-flex items-center justify-center', className)}
      role="status"
      aria-label={label}
    >
      <span
        className={cn('animate-spin rounded-full', toneMap[tone], sizeMap[size])}
      />
    </span>
  )
}
