import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
  children: ReactNode
  padded?: boolean
}

export function Card({
  className,
  title,
  description,
  children,
  padded = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-100 bg-white shadow-sm ring-1 ring-slate-100/80',
        padded && 'p-5',
        className,
      )}
      {...props}
    >
      {(title || description) && (
        <div className={cn(padded && 'mb-4')}>
          {title && <h2 className="text-base font-semibold text-slate-900">{title}</h2>}
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
