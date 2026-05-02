import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/features/auth/store/authStore'
import { Button } from '@/shared/components/Button'
import { cn } from '@/shared/utils/cn'

const ROUTE_TITLES: { prefix: string; title: string }[] = [
  { prefix: '/dashboard', title: 'Dashboard' },
  { prefix: '/analytics', title: 'Analytics' },
  { prefix: '/patients', title: 'Patients' },
]

function titleForPath(pathname: string): string {
  const hit = ROUTE_TITLES.find((r) => pathname === r.prefix || pathname.startsWith(`${r.prefix}/`))
  return hit?.title ?? 'HealthCare'
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
  const { logout } = useAuth()

  const title = useMemo(() => titleForPath(location.pathname), [location.pathname])

  const displayName = user?.displayName ?? user?.email ?? 'User'
  const guest = user?.isAnonymous
  const initials = userInitials(user?.email ?? null, user?.displayName ?? null)

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-white/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/80 md:h-16 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuOpen}
          className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
          aria-controls="app-sidebar"
          aria-expanded={isMobileNavOpen}
          aria-label="Open navigation menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-gray-900 md:text-xl">{title}</h1>
          <p className="hidden truncate text-xs text-gray-500 sm:block">
            {guest ? 'Guest session' : displayName}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div
          className={cn(
            'flex size-9 cursor-default items-center justify-center rounded-full text-xs font-semibold text-white shadow-inner ring-2 ring-white',
            guest ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-blue-500 to-blue-700',
          )}
          title={displayName}
          aria-hidden
        >
          {initials}
        </div>
        <Button type="button" variant="secondary" size="sm" onClick={() => void logout()}>
          Sign out
        </Button>
      </div>
    </header>
  )
}
