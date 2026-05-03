import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/services/firebase'
import { Button } from '@/shared/components/Button'

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setSubmitting(true)
    try {
      await sendPasswordResetEmail(auth, email.trim())
      setMessage('If an account exists for that email, we sent a reset link.')
    } catch (err) {
      const code =
        err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : ''
      if (code === 'auth/invalid-email') {
        setError('Enter a valid email address.')
      } else if (code === 'auth/user-not-found') {
        setMessage('If an account exists for that email, we sent a reset link.')
      } else {
        setError(err instanceof Error ? err.message : 'Could not send reset email.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Reset password</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter your email and we&apos;ll send you a link to choose a new password.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
              {error}
            </div>
          )}
          {message && (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              {message}
            </div>
          )}
          <div>
            <label
              htmlFor="reset-email"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Email
            </label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitting} isLoading={submitting}>
            {submitting ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
