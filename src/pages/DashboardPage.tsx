import { useAuthStore } from '@/features/auth/store/authStore'
import { Card } from '@/shared/components/Card'

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)

  const displayName = user?.displayName ?? user?.email ?? 'Guest'
  const isGuest = user?.isAnonymous

  return (
    <>
      <p className="mb-8 text-sm text-gray-600">
        Welcome back{isGuest ? ', Guest' : `, ${displayName}`}. Here is a snapshot of your
        workspace.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-gray-500">Total Patients</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">124</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Critical Cases</p>
          <p className="mt-1 text-3xl font-bold text-red-600">8</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">New This Week</p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">14</p>
        </Card>
      </div>
    </>
  )
}
