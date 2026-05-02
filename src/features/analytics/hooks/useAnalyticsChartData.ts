import { useMemo } from 'react'
import type { Patient } from '@/features/patients/types/patient'

export type StatusSlice = { name: string; value: number }
export type MonthlyPoint = { month: string; admissions: number }
export type ConditionBar = { name: string; count: number }

function monthKeyFromIso(iso: string): string {
  const d = new Date(iso + 'T12:00:00')
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

/** Last N calendar months (including current), labeled for charts */
function rollingMonths(count: number): { key: string; label: string }[] {
  const out: { key: string; label: string }[] = []
  const now = new Date()
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
    out.push({ key, label })
  }
  return out
}

export function useAnalyticsChartData(patients: Patient[]) {
  return useMemo(() => {
    const statusNames = ['Stable', 'Critical', 'Recovering'] as const
    const statusCounts: Record<string, number> = { Stable: 0, Critical: 0, Recovering: 0 }
    const conditionMap = new Map<string, number>()
    const visitByMonth = new Map<string, number>()

    for (const p of patients) {
      statusCounts[p.status] = (statusCounts[p.status] ?? 0) + 1
      conditionMap.set(p.condition, (conditionMap.get(p.condition) ?? 0) + 1)
      const mk = monthKeyFromIso(p.lastVisit)
      visitByMonth.set(mk, (visitByMonth.get(mk) ?? 0) + 1)
    }

    const statusData: StatusSlice[] = statusNames.map((name) => ({
      name,
      value: statusCounts[name] ?? 0,
    }))

    const conditionData: ConditionBar[] = [...conditionMap.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)

    const monthWindow = rollingMonths(6)
    const monthlyData: MonthlyPoint[] = monthWindow.map(({ key, label }) => ({
      month: label,
      admissions: visitByMonth.get(key) ?? 0,
    }))

    return { statusData, conditionData, monthlyData }
  }, [patients])
}
