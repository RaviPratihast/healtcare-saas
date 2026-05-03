import { memo } from 'react'
import { cn } from '@/shared/utils/cn'

export type BadgeStatus = 'Stable' | 'Critical' | 'Recovering' | 'active' | 'critical' | 'stable'

type BadgeProps = {
  status: BadgeStatus
  className?: string
}

const normalized = (s: BadgeStatus) => s.toLowerCase()

const styles: Record<'stable' | 'recovering' | 'critical', { wrap: string; dot: string }> = {
  stable: {
    wrap: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  recovering: {
    wrap: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  critical: {
    wrap: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
  },
}

const displayLabel = (s: BadgeStatus) => {
  const n = normalized(s)
  if (n === 'active') return 'Active'
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export const Badge = memo(function Badge({ status, className }: BadgeProps) {
  const key = normalized(status)
  const styleKey: keyof typeof styles =
    key === 'recovering' ? 'recovering' : key === 'critical' ? 'critical' : 'stable'
  const palette = styles[styleKey]

  return (
    <span
      className={cn(
        'inline-flex max-w-max cursor-default items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        palette.wrap,
        className,
      )}
    >
      <span className={cn('size-1.5 shrink-0 rounded-full', palette.dot)} aria-hidden />
      {displayLabel(status)}
    </span>
  )
})
