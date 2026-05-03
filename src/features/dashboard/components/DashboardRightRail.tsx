import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Patient } from '@/features/patients/types/patient'
import { cn } from '@/shared/utils/cn'

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1)
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function patientInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

type DashboardRightRailProps = {
  patients: Patient[]
}

export const DashboardRightRail = memo(function DashboardRightRail({
  patients,
}: DashboardRightRailProps) {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()))
  const today = useMemo(() => new Date(), [])

  const { label, days } = useMemo(() => {
    const first = startOfMonth(cursor)
    const y = first.getFullYear()
    const m = first.getMonth()
    const lastDate = new Date(y, m + 1, 0).getDate()
    const startWeekday = first.getDay()
    const pad = startWeekday === 0 ? 6 : startWeekday - 1
    const cells: (number | null)[] = []
    for (let i = 0; i < pad; i++) cells.push(null)
    for (let d = 1; d <= lastDate; d++) cells.push(d)
    return {
      label: cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
      days: cells,
    }
  }, [cursor])

  const followUps = useMemo(() => {
    return [...patients]
      .filter((p) => p.status === 'Critical' || p.status === 'Recovering')
      .slice(0, 4)
      .map((p) => ({
        id: p.id,
        title: p.status === 'Critical' ? 'Urgent review' : 'Follow-up',
        patient: p.name,
        time: new Date(p.lastVisit + 'T12:00:00').toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        }),
      }))
  }, [patients])

  return (
    <div className="flex flex-col gap-6">
      <div
        className={cn(
          'rounded-2xl border border-slate-100 bg-white p-5 shadow-sm ring-1 ring-slate-100/80',
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900">Calendar</h3>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => setCursor((c) => addMonths(c, -1))}
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="Previous month"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setCursor((c) => addMonths(c, 1))}
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="Next month"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays size={14} strokeWidth={1.5} className="shrink-0 text-slate-400" aria-hidden />
          {label}
        </p>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] font-medium uppercase tracking-wide text-slate-400">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            if (d === null) {
              return <div key={`e-${i}`} className="aspect-square" />
            }
            const cellDate = new Date(cursor.getFullYear(), cursor.getMonth(), d)
            const isToday = sameDay(cellDate, today)
            return (
              <div
                key={d}
                className={cn(
                  'flex aspect-square items-center justify-center rounded-full text-xs font-medium tabular-nums',
                  isToday
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100',
                )}
              >
                {d}
              </div>
            )
          })}
        </div>
      </div>

      <div
        className={cn(
          'rounded-2xl border border-slate-100 bg-white p-5 shadow-sm ring-1 ring-slate-100/80',
        )}
      >
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900">Follow-ups</h3>
          <Link
            to="/patients"
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            View all
          </Link>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">Priority from patient status</p>
        <ul className="relative mt-4 space-y-0 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-12px)] before:w-px before:bg-slate-200">
          {followUps.length === 0 ? (
            <li className="py-6 text-center text-xs text-slate-400">No items this week</li>
          ) : (
            followUps.map((item) => (
              <li key={item.id} className="relative flex gap-3 pl-5">
                <span
                  className="absolute left-0 top-2 size-2 rounded-full bg-indigo-500 ring-4 ring-white"
                  aria-hidden
                />
                <div className="min-w-0 flex-1 pb-4">
                  <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                  <p className="truncate text-xs text-slate-500">{item.patient}</p>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-slate-400">{item.time}</span>
              </li>
            ))
          )}
        </ul>
        <div className="mt-2 flex flex-wrap gap-2">
          {patients.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600"
              title={p.name}
            >
              {patientInitials(p.name)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
