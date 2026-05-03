import { useMemo } from 'react'
import type { Patient } from '@/features/patients/types/patient'

function startOfRollingWeek(): Date {
  const d = new Date()
  d.setDate(d.getDate() - 7)
  d.setHours(0, 0, 0, 0)
  return d
}

function visitDate(p: Patient): Date {
  return new Date(p.lastVisit + 'T12:00:00')
}

export type DashboardStats = {
  total: number
  critical: number
  recovering: number
  visitsLast7Days: number
  weeklyReachPercent: number
}

export function useDashboardStats(patients: Patient[]): DashboardStats {
  return useMemo(() => {
    const total = patients.length
    const critical = patients.filter((p) => p.status === 'Critical').length
    const recovering = patients.filter((p) => p.status === 'Recovering').length
    const weekStart = startOfRollingWeek()
    const now = new Date()
    const visitsLast7Days = patients.filter((p) => {
      const d = visitDate(p)
      return d >= weekStart && d <= now
    }).length
    const weeklyReachPercent =
      total > 0 ? Math.round((visitsLast7Days / total) * 100) : 0

    return {
      total,
      critical,
      recovering,
      visitsLast7Days,
      weeklyReachPercent,
    }
  }, [patients])
}
