import { memo, type ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

export type StatCardTrendVariant = 'positive' | 'negative' | 'neutral'

export type StatCardProps = {
  label: string
  /** Main metric — number or short string */
  value: ReactNode
  /** Optional comparison or context line (e.g. “vs last month +3”) */
  trendText?: string
  trendVariant?: StatCardTrendVariant
  /** Optional screen-reader / tooltip for the info control */
  infoLabel?: string
  className?: string
}

const trendStyles: Record<StatCardTrendVariant, string> = {
  positive: 'text-emerald-600',
  negative: 'text-red-600',
  neutral: 'text-gray-500',
}

export const StatCard = memo(function StatCard({
  label,
  value,
  trendText,
  trendVariant = 'neutral',
  infoLabel,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {infoLabel ? (
          <span
            className="inline-flex cursor-help text-gray-400"
            title={infoLabel}
            aria-label={infoLabel}
            role="img"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
              />
            </svg>
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 tabular-nums">{value}</p>
      {trendText ? (
        <p className={cn('mt-2 text-xs font-medium', trendStyles[trendVariant])}>{trendText}</p>
      ) : null}
    </div>
  )
})
