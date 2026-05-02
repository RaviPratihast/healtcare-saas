import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
  children: ReactNode
  /** Extra padding / prose for main surfaces */
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
        'rounded-xl border border-gray-200 bg-white shadow-sm',
        padded && 'p-5',
        className,
      )}
      {...props}
    >
      {(title || description) && (
        <div className={cn(padded && 'mb-4')}>
          {title && <h2 className="text-base font-semibold text-gray-900">{title}</h2>}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
