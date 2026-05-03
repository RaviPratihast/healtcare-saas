import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/shared/utils/cn'
import { Spinner } from '@/shared/components/Spinner'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400',
  secondary:
    'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 disabled:text-slate-400',
  ghost:
    'text-slate-500 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 disabled:text-slate-400',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'gap-1.5 rounded-md px-3 py-1.5 text-xs',
  md: 'gap-2 rounded-md px-4 py-2 text-sm',
  lg: 'gap-2 rounded-md px-5 py-2.5 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  const isDisabled = disabled || isLoading

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading && (
        <span aria-hidden="true">
          <Spinner
            size="sm"
            tone={variant === 'primary' ? 'inverse' : 'default'}
            className="inline-flex! shrink-0"
          />
        </span>
      )}
      {children}
    </button>
  )
})
