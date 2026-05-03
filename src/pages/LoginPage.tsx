import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { SignUpForm } from '@/features/auth/components/SignUpForm'
import { useAuthStore } from '@/features/auth/store/authStore'
import { Spinner } from '@/shared/components/Spinner'
import { cn } from '@/shared/utils/cn'

type Tab = 'signin' | 'signup'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<Tab>('signin')
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const loginFormNonce = useAuthStore((state) => state.loginFormNonce)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner size="lg" label="Restoring session" />
      </div>
    )
  }

  if (user) return <Navigate to="/dashboard" replace />

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">CarePulse</h1>
          <p className="mt-1 text-sm text-slate-500">
            {activeTab === 'signin' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        <div className="mb-6 flex rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('signin')}
            className={cn(
              'flex-1 cursor-pointer rounded-md py-1.5 text-sm font-medium transition-colors',
              activeTab === 'signin'
                ? 'bg-white text-slate-900'
                : 'text-slate-500 hover:text-slate-700',
            )}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={cn(
              'flex-1 cursor-pointer rounded-md py-1.5 text-sm font-medium transition-colors',
              activeTab === 'signup'
                ? 'bg-white text-slate-900'
                : 'text-slate-500 hover:text-slate-700',
            )}
          >
            Sign Up
          </button>
        </div>

        {activeTab === 'signin' ? (
          <LoginForm key={`signin-${loginFormNonce}`} />
        ) : (
          <SignUpForm key={`signup-${loginFormNonce}`} />
        )}
      </div>
    </div>
  )
}
