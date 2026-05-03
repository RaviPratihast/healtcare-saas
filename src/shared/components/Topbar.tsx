import { Menu } from 'lucide-react'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'
import { cn } from '@/shared/utils/cn'

const ROUTE_TITLES: { prefix: string; title: string }[] = [
  { prefix: '/dashboard', title: 'Dashboard' },
  { prefix: '/analytics', title: 'Analytics' },
  { prefix: '/patients', title: 'Patients' },
]

function titleForPath(pathname: string): string {
  const hit = ROUTE_TITLES.find((r) => pathname === r.prefix || pathname.startsWith(`${r.prefix}/`))
  return hit?.title ?? 'CarePulse'
}

function userInitials(email: string | null | undefined, displayName: string | null | undefined) {
  if (displayName?.trim()) {
    const parts = displayName.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
    }
    return displayName.slice(0, 2).toUpperCase()
  }
  if (email) {
    return email.slice(0, 2).toUpperCase()
  }
  return 'U'
}

type TopbarProps = {
  onMenuOpen: () => void
  isMobileNavOpen: boolean
}

export function Topbar({ onMenuOpen, isMobileNavOpen }: TopbarProps) {
  const location = useLocation()
  const user = useAuthStore((s) => s.user)

  const title = useMemo(() => titleForPath(location.pathname), [location.pathname])

  const displayName = user?.displayName ?? user?.email ?? 'User'
  const guest = user?.isAnonymous
  const initials = userInitials(user?.email ?? null, user?.displayName ?? null)

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/95 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80 md:h-16 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuOpen}
          className="flex cursor-pointer items-center justify-center rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 md:hidden"
          aria-controls="app-sidebar"
          aria-expanded={isMobileNavOpen}
          aria-label="Open navigation menu"
        >
          <Menu size={20} strokeWidth={1.5} aria-hidden />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="hidden truncate text-xs text-slate-500 sm:block">
            {guest ? 'Guest session' : displayName}
          </p>
        </div>
      </div>

      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-2 ring-white',
          guest ? 'bg-slate-200 text-slate-700' : 'bg-indigo-100 text-indigo-800',
        )}
        title={displayName}
        aria-label={displayName}
      >
        {initials}
      </div>
    </header>
  )
}
