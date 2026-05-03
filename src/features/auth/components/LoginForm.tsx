import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/features/auth/store/authStore'
import { Button } from '@/shared/components/Button'

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'

export function LoginForm() {
  const { login, googleLogin, guestLogin } = useAuth()
  const loginFormNonce = useAuthStore((s) => s.loginFormNonce)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    const trimmedEmail = String(fd.get('email') ?? '').trim()
    const passwordVal = String(fd.get('password') ?? '')
    if (!trimmedEmail) {
      setError('Enter your email address.')
      return
    }
    if (!passwordVal) {
      setError('Enter your password.')
      return
    }
    setIsLoading(true)
    try {
      await login(trimmedEmail, passwordVal)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError(null)
    setIsLoading(true)
    try {
      await googleLogin()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuest = async () => {
    setError(null)
    setIsLoading(true)
    try {
      await guestLogin()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Guest sign-in failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
      {error && (
        <div
          role="alert"
          className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800"
        >
          {error}
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500"
        >
          Email
        </label>
        <input
          key={`signin-email-${loginFormNonce}`}
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          defaultValue=""
          required
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <div className="mb-1 flex items-baseline justify-between gap-2">
          <label
            htmlFor="password"
            className="text-xs font-medium uppercase tracking-wide text-slate-500"
          >
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            key={`signin-password-${loginFormNonce}`}
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            defaultValue=""
            required
            className={`${inputClass} pr-10`}
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2.5 text-slate-500 transition-colors hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-0"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOff className="size-4.5" strokeWidth={1.75} /> : <Eye className="size-4.5" strokeWidth={1.75} />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading} isLoading={isLoading}>
        {isLoading ? 'Signing in…' : 'Sign In'}
      </Button>
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wide text-slate-400">
          <span className="bg-white px-2">Or continue with</span>
        </div>
      </div>
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={() => void handleGoogle()}
        disabled={isLoading}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Google
      </Button>
      <div className="pt-1 text-center">
        <button
          type="button"
          onClick={() => void handleGuest()}
          disabled={isLoading}
          className="text-sm font-medium text-slate-500 underline-offset-4 hover:text-slate-900 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue as guest
        </button>
      </div>
    </form>
  )
}
