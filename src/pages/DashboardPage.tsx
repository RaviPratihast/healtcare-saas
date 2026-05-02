import { useAuthStore } from '@/features/auth/store/authStore'
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
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Welcome back{isGuest ? ', Guest' : `, ${displayName}`}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base">
          Here is a snapshot of your workspace. Metrics are computed from the shared patient
          directory — the same source as the Patients page.
        </p>
      </header>

      <section aria-label="Summary statistics">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total patients"
            value={stats.total}
            trendText={`${stats.weeklyReachPercent}% seen in the last 7 days`}
            trendVariant="neutral"
            infoLabel="Total rows in the patient directory (mock data in this demo)."
          />
          <StatCard
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
            label="New this week"
            value={stats.visitsLast7Days}
            trendText="Patients with a visit in the last 7 days"
            trendVariant="positive"
            infoLabel="Count of patients whose last visit falls within the past seven days."
          />
          <StatCard
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
  )
}
