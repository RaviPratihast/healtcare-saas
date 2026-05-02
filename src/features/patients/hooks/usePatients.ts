import { useMemo } from 'react'
import { usePatientsStore } from '@/features/patients/store/patientsStore'

/** Patient list + filters; `filtered` only recomputes when query or list changes. */
export function usePatients() {
  const patients = usePatientsStore((s) => s.patients)
  const viewMode = usePatientsStore((s) => s.viewMode)
  const searchQuery = usePatientsStore((s) => s.searchQuery)
  const setViewMode = usePatientsStore((s) => s.setViewMode)
  const setSearchQuery = usePatientsStore((s) => s.setSearchQuery)

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return patients
    return patients.filter((p) => p.name.toLowerCase().includes(q))
  }, [patients, searchQuery])

  return {
    patients,
    filtered,
    viewMode,
    searchQuery,
    setViewMode,
    setSearchQuery,
  }
}
