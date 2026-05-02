import { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Patient } from '@/features/patients/types/patient'
import { Badge } from '@/shared/components/Badge'
import { cn } from '@/shared/utils/cn'

const RECENT_COUNT = 5

function parseVisitDate(iso: string): number {
  return new Date(iso + 'T12:00:00').getTime()
}

function formatVisit(iso: string) {
  try {
    const d = new Date(iso + 'T12:00:00')
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

type RecentPatientsProps = {
  patients: Patient[]
  className?: string
}

export const RecentPatients = memo(function RecentPatients({
  patients,
  className,
}: RecentPatientsProps) {
  const recent = useMemo(() => {
    return [...patients]
      .sort((a, b) => parseVisitDate(b.lastVisit) - parseVisitDate(a.lastVisit))
      .slice(0, RECENT_COUNT)
  }, [patients])

  return (
    <section
      className={cn(
        'overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm',
        className,
      )}
    >
      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Recent patient activity</h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Latest {RECENT_COUNT} updates by visit date. Open the directory for full search and
            filters.
          </p>
        </div>
        <Link
          to="/patients"
          className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          View all patients
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th scope="col" className="px-5 py-3">
                Patient
              </th>
              <th scope="col" className="px-5 py-3">
                Condition
              </th>
              <th scope="col" className="px-5 py-3">
                Status
              </th>
              <th scope="col" className="px-5 py-3">
                Last visit
              </th>
              <th scope="col" className="hidden px-5 py-3 lg:table-cell">
                Doctor
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {recent.map((patient) => (
              <tr
                key={patient.id}
                className="transition-colors hover:bg-gray-50/90"
              >
                <td className="px-5 py-3">
                  <Link
                    to="/patients"
                    className="cursor-pointer font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {patient.name}
                  </Link>
                </td>
                <td className="max-w-xs truncate px-5 py-3 text-gray-600" title={patient.condition}>
                  {patient.condition}
                </td>
                <td className="px-5 py-3">
                  <Badge status={patient.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-gray-600">
                  {formatVisit(patient.lastVisit)}
                </td>
                <td className="hidden whitespace-nowrap px-5 py-3 text-gray-600 lg:table-cell">
                  {patient.doctor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
})
