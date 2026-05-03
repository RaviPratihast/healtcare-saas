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
        'flex flex-col rounded-xl border border-slate-200 bg-white p-5',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{patient.name}</h3>
        <Badge status={patient.status} />
      </div>
      <p className="mt-1 text-sm text-slate-500">
        {patient.age} · {patient.gender}
      </p>
      <p className="mt-2 text-sm text-slate-700">{patient.condition}</p>
      <p className="mt-3 text-xs text-slate-400">
        Last visit{' '}
        <span className="font-medium tabular-nums text-slate-600">{formatVisit(patient.lastVisit)}</span>
      </p>
    </article>
  )
})
