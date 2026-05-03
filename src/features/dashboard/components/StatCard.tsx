import { CircleHelp, type LucideIcon } from 'lucide-react'
import { memo, type ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

export type StatCardTrendVariant = 'positive' | 'negative' | 'neutral'

export type StatCardProps = {
  label: string
  value: ReactNode
  trendText?: string
  trendVariant?: StatCardTrendVariant
  infoLabel?: string
  icon: LucideIcon
  iconTint?: string
  className?: string
}

const trendStyles: Record<StatCardTrendVariant, string> = {
  positive: 'text-emerald-600',
  negative: 'text-rose-600',
  neutral: 'text-slate-500',
}

export const StatCard = memo(function StatCard({
  label,
  value,
  trendText,
  trendVariant = 'neutral',
  infoLabel,
  icon: Icon,
  iconTint = 'bg-indigo-100 text-indigo-600',
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-100/80 transition-shadow duration-200 hover:shadow-md',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            'flex size-11 shrink-0 items-center justify-center rounded-2xl [&>svg]:size-5',
            iconTint,
          )}
        >
          <Icon strokeWidth={1.5} aria-hidden />
        </div>
        {infoLabel ? (
          <span
            className="inline-flex cursor-help text-slate-400 hover:text-slate-500"
            title={infoLabel}
            aria-label={infoLabel}
          >
            <CircleHelp size={16} strokeWidth={1.5} />
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-3xl font-bold tabular-nums tracking-normal text-slate-900">{value}</p>
      {trendText ? (
        <p className={cn('mt-2 text-xs leading-relaxed', trendStyles[trendVariant])}>{trendText}</p>
      ) : null}
    </div>
  )
})
