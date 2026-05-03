import { ChevronRight } from 'lucide-react'
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

function initials(name: string) {
  const p = name.trim().split(/\s+/)
  if (p.length >= 2) return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
  return name.slice(0, 2).toUpperCase()
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
        'overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm ring-1 ring-slate-100/80',
        className,
      )}
    >
      <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
            Recent patient activity
            <span className="inline-block size-1.5 rounded-full bg-indigo-500" aria-hidden />
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest {RECENT_COUNT} updates by visit date - open the directory for full search.
          </p>
        </div>
        <Link
          to="/patients"
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          View all patients
          <ChevronRight size={14} strokeWidth={1.5} className="text-slate-400" aria-hidden />
        </Link>
      </div>

      <ul className="divide-y divide-slate-100">
        {recent.map((patient) => (
          <li key={patient.id}>
            <Link
              to="/patients"
              className="block px-6 py-4 transition-colors hover:bg-slate-50/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-800 ring-2 ring-white"
                  aria-hidden
                >
                  {initials(patient.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">{patient.name}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {patient.condition}
                    <span className="text-slate-400"> · </span>
                    {patient.doctor}
                  </p>
                </div>
                <div className="hidden shrink-0 items-center gap-4 sm:flex">
                  <Badge status={patient.status} />
                  <div className="flex flex-col items-end">
                    <time
                      className="text-xs tabular-nums text-slate-600"
                      dateTime={patient.lastVisit}
                    >
                      {formatVisit(patient.lastVisit)}
                    </time>
                    <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                      Last visit
                    </span>
                  </div>
                  <ChevronRight size={18} strokeWidth={1.5} className="text-slate-300" aria-hidden />
                </div>
                <ChevronRight
                  size={18}
                  strokeWidth={1.5}
                  className="shrink-0 text-slate-300 sm:hidden"
                  aria-hidden
                />
              </div>
              <div className="mt-3 flex items-center justify-between sm:hidden">
                <Badge status={patient.status} />
                <time className="text-xs tabular-nums text-slate-500" dateTime={patient.lastVisit}>
                  {formatVisit(patient.lastVisit)}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
})
