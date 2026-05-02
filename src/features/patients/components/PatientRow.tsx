import { memo } from 'react'
import type { Patient } from '@/features/patients/types/patient'
import { Badge } from '@/shared/components/Badge'

type PatientRowProps = {
  patient: Patient
}

function formatVisit(isoDate: string) {
  try {
    const d = new Date(isoDate + 'T12:00:00')
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return isoDate
  }
}

export const PatientRow = memo(function PatientRow({ patient }: PatientRowProps) {
  return (
    <tr className="border-b border-gray-100 transition-colors hover:bg-gray-50/80">
      <th scope="row" className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900">
        {patient.name}
      </th>
      <td className="px-4 py-3">
        <Badge status={patient.status} />
      </td>
      <td className="max-w-48 truncate px-4 py-3 text-sm text-gray-600" title={patient.condition}>
        {patient.condition}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">{formatVisit(patient.lastVisit)}</td>
      <td className="hidden px-4 py-3 text-sm text-gray-600 lg:table-cell">{patient.doctor}</td>
      <td className="hidden whitespace-nowrap px-4 py-3 text-sm text-gray-600 md:table-cell">
        {patient.age}
      </td>
      <td className="hidden whitespace-nowrap px-4 py-3 text-sm text-gray-600 xl:table-cell">
        {patient.gender}
      </td>
      <td className="hidden whitespace-nowrap px-4 py-3 text-sm text-gray-600 xl:table-cell">
        {patient.bloodGroup}
      </td>
    </tr>
  )
})
