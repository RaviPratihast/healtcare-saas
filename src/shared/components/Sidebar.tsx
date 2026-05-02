import { NavLink } from 'react-router-dom'
import { cn } from '@/shared/utils/cn'

type SidebarProps = {
  mobileOpen: boolean
  /** Close mobile drawer after navigation or backdrop tap */
  onCloseMobile?: () => void
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    isActive
      ? 'bg-blue-50 text-blue-800 ring-1 ring-inset ring-blue-100'
      : 'text-gray-700 hover:bg-gray-100 active:bg-gray-100',
  )

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 13h6V4H4v9zm0 7h6v-5H4v5zm8 0h6v-9h-6v9zm0-18v5h6V2h-6z"
      />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14zM7 10h2v7H7v-7zm4-3h2v10h-2V7zm4 6h2v4h-2v-4z"
      />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
      />
    </svg>
  )
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const closeIfMobile = () => onCloseMobile?.()

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-gray-900/50 transition-opacity md:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!mobileOpen}
        onClick={onCloseMobile}
        onKeyDown={(e) => e.key === 'Escape' && onCloseMobile?.()}
      />

      <aside
        id="app-sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[min(17rem,85vw)] flex-col border-r border-gray-200 bg-white shadow-xl transition-transform duration-200 ease-out md:static md:z-0 md:w-64 md:min-h-screen md:shadow-none',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <div className="flex h-14 shrink-0 items-center border-b border-gray-100 px-4 md:h-16">
          <span className="text-lg font-bold tracking-tight text-gray-900">HealthCare</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Main navigation">
          <NavLink to="/dashboard" end className={linkClass} onClick={closeIfMobile}>
            <DashboardIcon />
            Dashboard
          </NavLink>
          <NavLink to="/analytics" className={linkClass} onClick={closeIfMobile}>
            <ChartIcon />
            Analytics
          </NavLink>
          <NavLink to="/patients" className={linkClass} onClick={closeIfMobile}>
            <UsersIcon />
            Patients
          </NavLink>
        </nav>

        <div className="border-t border-gray-100 p-3 text-xs leading-relaxed text-gray-500">
          Signed-in workspace view. Use the top bar to sign out or switch pages anytime.
        </div>
      </aside>
    </>
  )
}
