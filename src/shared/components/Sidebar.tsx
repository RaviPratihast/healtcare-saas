import { BarChart2, Building2, LayoutDashboard, LogOut, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/features/auth/store/authStore'
import { Button } from '@/shared/components/Button'
import { cn } from '@/shared/utils/cn'

type SidebarProps = {
  mobileOpen: boolean
  onCloseMobile?: () => void
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
    isActive
      ? 'bg-indigo-50 font-semibold text-indigo-600 shadow-sm ring-1 ring-indigo-100/80'
      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
  )

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const closeIfMobile = () => onCloseMobile?.()
  const user = useAuthStore((s) => s.user)
  const { logout } = useAuth()

  const display = user?.displayName ?? user?.email ?? 'Guest'
  const guest = user?.isAnonymous

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-slate-900/50 transition-opacity md:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!mobileOpen}
        onClick={onCloseMobile}
        onKeyDown={(e) => e.key === 'Escape' && onCloseMobile?.()}
      />

      <aside
        id="app-sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[min(15rem,85vw)] flex-col border-r border-slate-200/80 bg-white transition-transform duration-200 ease-out md:static md:z-0 md:w-60 md:min-h-screen md:translate-x-0 md:shadow-none',
          'max-md:shadow-lg',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <div className="flex h-16 shrink-0 items-center border-b border-slate-100 px-4">
          <span className="text-base font-semibold tracking-tight text-slate-900">
            CarePulse
            <span className="ml-0.5 text-indigo-600">.</span>
          </span>
        </div>

        <div className="mx-3 mt-3 rounded-2xl border border-slate-100 bg-slate-50/90 p-3 shadow-sm ring-1 ring-slate-100/60">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <Building2 size={18} strokeWidth={1.5} aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-slate-900">Clinical workspace</p>
              <p className="truncate text-[11px] text-slate-500">
                {guest ? 'Guest access' : display}
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-2 flex flex-1 flex-col gap-1 p-3" aria-label="Main navigation">
          <NavLink to="/dashboard" end className={linkClass} onClick={closeIfMobile}>
            <LayoutDashboard size={18} strokeWidth={1.5} aria-hidden />
            Dashboard
          </NavLink>
          <NavLink to="/analytics" className={linkClass} onClick={closeIfMobile}>
            <BarChart2 size={18} strokeWidth={1.5} aria-hidden />
            Analytics
          </NavLink>
          <NavLink to="/patients" className={linkClass} onClick={closeIfMobile}>
            <Users size={18} strokeWidth={1.5} aria-hidden />
            Patients
          </NavLink>
        </nav>

        <div className="border-t border-slate-100 p-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900"
            onClick={() => {
              closeIfMobile()
              void logout()
            }}
          >
            <LogOut size={16} strokeWidth={1.5} aria-hidden />
            Sign out
          </Button>
        </div>
      </aside>
    </>
  )
}
