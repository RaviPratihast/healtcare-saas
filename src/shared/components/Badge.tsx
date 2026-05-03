import { memo } from 'react'
import { cn } from '@/shared/utils/cn'

export type BadgeStatus = 'Stable' | 'Critical' | 'Recovering' | 'active' | 'critical' | 'stable'

type BadgeProps = {
  status: BadgeStatus
  className?: string
}

const normalized = (s: BadgeStatus) => s.toLowerCase()

const styles: Record<string, string> = {
  stable:
    'border-emerald-200 bg-emerald-50 text-emerald-800 ring-emerald-600/10',
  recovering:
    'border-amber-200 bg-amber-50 text-amber-900 ring-amber-600/10',
  critical: 'border-red-200 bg-red-50 text-red-800 ring-red-600/10',
  active: 'border-emerald-200 bg-emerald-50 text-emerald-800 ring-emerald-600/10',
}

const label = (s: BadgeStatus) => {
  const n = normalized(s)
  if (n === 'active') return 'Active'
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export const Badge = memo(function Badge({ status, className }: BadgeProps) {
  const key = normalized(status) === 'active' ? 'active' : normalized(status)
  const styleKey =
    key === 'stable' || key === 'active'
      ? 'stable'
      : key === 'recovering'
        ? 'recovering'
        : 'critical'

  return (
    <span
      className={cn(
        'inline-flex max-w-max cursor-default items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        styles[styleKey],
        className,
      )}
    >
      {label(status)}
    </span>
  )
})
