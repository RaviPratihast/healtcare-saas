import { Search, Users } from 'lucide-react'
import { useMemo } from 'react'
import { PatientCard } from '@/features/patients/components/PatientCard'
import { PatientRow } from '@/features/patients/components/PatientRow'
import { ViewToggle } from '@/features/patients/components/ViewToggle'
import { usePatientsStore } from '@/features/patients/store/patientsStore'

export default function PatientDetailsPage() {
  const patients = usePatientsStore((s) => s.patients)
  const viewMode = usePatientsStore((s) => s.viewMode)
  const searchQuery = usePatientsStore((s) => s.searchQuery)
  const setSearchQuery = usePatientsStore((s) => s.setSearchQuery)

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return patients
    return patients.filter((p) => p.name.toLowerCase().includes(q))
  }, [patients, searchQuery])

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Search filters by patient name; grid or list preference is remembered for this session.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative min-w-0 max-w-md flex-1">
          <Search
            size={14}
            strokeWidth={1.5}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            id="patient-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patients…"
            autoComplete="off"
            className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            aria-label="Search patients by name"
          />
        </div>
        <ViewToggle />
      </div>

      <p className="text-xs text-slate-500" aria-live="polite">
        Showing {filtered.length} of {patients.length} patients
        {searchQuery.trim() ? ` matching “${searchQuery.trim()}”` : ''}
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <Users size={40} strokeWidth={1} className="text-slate-300" aria-hidden />
          <p className="mt-4 text-sm font-medium text-slate-900">No patients found</p>
          <p className="mt-1 text-xs text-slate-400">Try adjusting your search or clear the field.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Condition
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Last visit
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400 lg:table-cell"
                >
                  Doctor
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400 md:table-cell"
                >
                  Age
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400 xl:table-cell"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400 xl:table-cell"
                >
                  Blood
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((patient) => (
                <PatientRow key={patient.id} patient={patient} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
