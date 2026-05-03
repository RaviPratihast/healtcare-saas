import { Activity, AlertCircle, CalendarPlus, Users } from 'lucide-react'
import { useAuthStore } from '@/features/auth/store/authStore'
import { DashboardRightRail } from '@/features/dashboard/components/DashboardRightRail'
import { RecentPatients } from '@/features/dashboard/components/RecentPatients'
import { StatCard } from '@/features/dashboard/components/StatCard'
import { useDashboardStats } from '@/features/dashboard/hooks/useDashboardStats'
import { usePatientsStore } from '@/features/patients/store/patientsStore'

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const patients = usePatientsStore((s) => s.patients)
  const stats = useDashboardStats(patients)

  const displayName = user?.displayName ?? user?.email ?? 'Guest'
  const isGuest = user?.isAnonymous

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_min(100%,280px)] xl:items-start xl:gap-8">
      <div className="min-w-0 space-y-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900">
              Overview
              <span className="inline-block size-1.5 rounded-full bg-indigo-500" aria-hidden />
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              <span className="font-medium text-slate-900">
                Welcome back{isGuest ? ', Guest' : `, ${displayName}`}
              </span>
              <span className="text-slate-500"> - snapshot from the shared patient directory.</span>
            </p>
          </div>
        </header>

        <section aria-label="Summary statistics">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={Users}
              iconTint="bg-indigo-100 text-indigo-600"
              label="Total patients"
              value={stats.total}
              trendText={`${stats.weeklyReachPercent}% seen in the last 7 days`}
              trendVariant="neutral"
              infoLabel="Total rows in the patient directory (mock data in this demo)."
            />
            <StatCard
              icon={AlertCircle}
              iconTint="bg-rose-100 text-rose-600"
              label="Critical cases"
              value={stats.critical}
              trendText={
                stats.critical > 0
                  ? `${stats.critical} require immediate follow-up`
                  : 'No critical cases right now'
              }
              trendVariant={stats.critical > 0 ? 'negative' : 'positive'}
              infoLabel="Patients flagged with Critical status in the directory."
            />
            <StatCard
              icon={CalendarPlus}
              iconTint="bg-emerald-100 text-emerald-600"
              label="New this week"
              value={stats.visitsLast7Days}
              trendText="Patients with a visit in the last 7 days"
              trendVariant="positive"
              infoLabel="Count of patients whose last visit falls within the past seven days."
            />
            <StatCard
              icon={Activity}
              iconTint="bg-amber-100 text-amber-600"
              label="Recovering"
              value={stats.recovering}
              trendText="Under recovery protocols"
              trendVariant="neutral"
              infoLabel="Patients currently marked as Recovering."
            />
          </div>
        </section>

        <RecentPatients patients={patients} />
      </div>

      <aside className="hidden min-w-0 xl:block xl:sticky xl:top-24" aria-label="Schedule and follow-ups">
        <DashboardRightRail patients={patients} />
      </aside>
    </div>
  )
}
