import { memo } from 'react'
import type { Patient } from '@/features/patients/types/patient'
import { Badge } from '@/shared/components/Badge'
import { cn } from '@/shared/utils/cn'

type PatientCardProps = {
  patient: Patient
  className?: string
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

export const PatientCard = memo(function PatientCard({ patient, className }: PatientCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900">{patient.name}</h3>
        <Badge status={patient.status} />
      </div>
      <p className="mt-2 text-sm text-gray-600">{patient.condition}</p>
      <dl className="mt-3 space-y-1 text-xs text-gray-500">
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Last visit</dt>
          <dd className="font-medium text-gray-700">{formatVisit(patient.lastVisit)}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Doctor</dt>
          <dd className="truncate text-gray-700" title={patient.doctor}>
            {patient.doctor}
          </dd>
        </div>
      </dl>
    </article>
  )
})
