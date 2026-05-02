import { PatientCard } from '@/features/patients/components/PatientCard'
import { PatientRow } from '@/features/patients/components/PatientRow'
import { ViewToggle } from '@/features/patients/components/ViewToggle'
import { usePatients } from '@/features/patients/hooks/usePatients'

export default function PatientDetailsPage() {
  const { filtered, viewMode, searchQuery, setSearchQuery, patients } = usePatients()

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Browse the directory. Search filters by patient name; layout preference is remembered for this
        session via the patients store.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex max-w-md flex-1 flex-col gap-1.5">
          <label htmlFor="patient-search" className="text-sm font-medium text-gray-700">
            Search by name
          </label>
          <input
            id="patient-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. Amelia, Chen, diabetes…"
            autoComplete="off"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <ViewToggle />
      </div>

      <p className="text-xs text-gray-500" aria-live="polite">
        Showing {filtered.length} of {patients.length} patients
        {searchQuery.trim() ? ` matching “${searchQuery.trim()}”` : ''}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
          <p className="text-sm font-medium text-gray-900">No patients match your search</p>
          <p className="mt-1 text-sm text-gray-500">Try a different name or clear the search field.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Condition
                </th>
                <th scope="col" className="px-4 py-3">
                  Last visit
                </th>
                <th scope="col" className="hidden px-4 py-3 lg:table-cell">
                  Doctor
                </th>
                <th scope="col" className="hidden px-4 py-3 md:table-cell">
                  Age
                </th>
                <th scope="col" className="hidden px-4 py-3 xl:table-cell">
                  Gender
                </th>
                <th scope="col" className="hidden px-4 py-3 xl:table-cell">
                  Blood
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
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
