import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/Button'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-base font-semibold text-slate-900">CarePulse</span>
          <nav className="flex items-center gap-2 sm:gap-3">
            <a
              href="#how-it-works"
              className="hidden text-sm font-medium text-slate-500 hover:text-slate-900 sm:inline"
            >
              How it works
            </a>
            <Button type="button" variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Sign in
            </Button>
            <Button type="button" size="sm" onClick={() => navigate('/login')}>
              Get started
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
              Healthcare operations, simplified
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              A calm dashboard for patient care teams
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Track patients, spot risk early, and keep your team aligned - without switching between
              spreadsheets and inboxes.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button type="button" size="lg" onClick={() => navigate('/login')}>
                Start free
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => navigate('/login')}
              >
                View demo
              </Button>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              How it works
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: 'Unified patient view',
                  body: 'Grid or list, search instantly, and open details without losing context.',
                },
                {
                  title: 'Operational clarity',
                  body: 'Dashboard stats and analytics charts built on the same patient dataset.',
                },
                {
                  title: 'Works everywhere',
                  body: 'Responsive layout with a collapsible sidebar for phones and tablets.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-xl bg-indigo-700 px-8 py-12 text-center text-white sm:px-12">
            <h2 className="text-2xl font-semibold sm:text-3xl">Ready when you are</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-indigo-100">
              Sign in with email, Google, or continue as a guest to explore the dashboard.
            </p>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="mt-8 border-0 bg-white text-indigo-700 hover:bg-indigo-50"
              onClick={() => navigate('/login')}
            >
              Go to sign in
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        CarePulse - demo healthcare SaaS UI
      </footer>
    </div>
  )
}
