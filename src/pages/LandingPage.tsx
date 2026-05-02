import { Link, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'

/**
 * Public home at `/`. Does not block the whole screen on Firebase init so refresh
 * always shows content; only redirects to the app once auth state is known.
 */
export default function LandingPage() {
  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)

  if (!isLoading && user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="text-lg font-bold text-gray-900">HealthCare</span>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="cursor-pointer text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link
              to="/login"
              className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
            Healthcare operations
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Run your practice from one calm, clear dashboard.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Sign in to access patient context, analytics, and day-to-day workflows built for clinical
            teams—not spreadsheets.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="cursor-pointer rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Sign in to your account
            </Link>
            <a
              href="#how-it-works"
              className="cursor-pointer rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50"
            >
              How it works
            </a>
          </div>
        </div>

        <section id="how-it-works" className="mt-24 scroll-mt-24 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold text-gray-900">How it works</h2>
          <ul className="mt-8 space-y-6 text-gray-600">
            <li className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                1
              </span>
              <div>
                <p className="font-medium text-gray-900">Create or sign in</p>
                <p className="mt-1 text-sm leading-relaxed">
                  Use your work email or continue with Google. Guest access is available for quick
                  demos.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                2
              </span>
              <div>
                <p className="font-medium text-gray-900">Open your dashboard</p>
                <p className="mt-1 text-sm leading-relaxed">
                  After sign-in you land on the dashboard with shortcuts to patients and analytics.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                3
              </span>
              <div>
                <p className="font-medium text-gray-900">Reset access anytime</p>
                <p className="mt-1 text-sm leading-relaxed">
                  Forgot your password? Use the link on the sign-in page—we email you a secure reset
                  link in a new tab.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}
