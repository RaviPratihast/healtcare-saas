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
    'bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400',
  secondary:
    'border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 active:bg-gray-100 disabled:text-gray-400',
  ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-400',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'gap-1.5 rounded-md px-3 py-1.5 text-xs',
  md: 'gap-2 rounded-lg px-4 py-2 text-sm',
  lg: 'gap-2 rounded-lg px-5 py-2.5 text-base',
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
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading && <Spinner size="sm" className="inline-flex!" aria-hidden />}
      {children}
    </button>
  )
})
