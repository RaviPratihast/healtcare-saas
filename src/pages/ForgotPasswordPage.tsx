import { type FormEvent, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/features/auth/store/authStore'
import { Spinner } from '@/shared/components/Spinner'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { forgotPassword } = useAuth()
  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Spinner size="lg" label="Loading" />
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const result = await forgotPassword(email)
      if (result.ok) {
        setSent(true)
      } else {
        setError(result.message)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">HealthCare</h1>
          <p className="mt-1 text-sm text-gray-500">Reset your password</p>
        </div>

        {sent ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              If an account exists for <span className="font-medium">{email.trim()}</span>, we sent a
              message with a secure link. Open it in this or another browser tab to choose a new
              password. Check spam or promotions if you do not see it within a few minutes.
            </p>
            <Link
              to="/login"
              className="inline-block cursor-pointer text-sm font-medium text-blue-600 hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm text-gray-600">
              Enter the email you use for HealthCare. We will send a link to reset your password (not
              a one-time code).
            </p>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reset-email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Sending…' : 'Send reset link'}
            </button>
            <Link
              to="/login"
              className="cursor-pointer text-center text-sm text-gray-500 transition-colors hover:text-gray-700"
            >
              Back to sign in
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
