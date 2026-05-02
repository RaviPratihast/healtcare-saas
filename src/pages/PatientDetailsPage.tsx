import { Card } from '@/shared/components/Card'

export default function PatientDetailsPage() {
  return (
    <Card
      title="Patients"
      description="Browse and search the patient directory. Grid and list views arrive with the patients feature."
    >
      <p className="text-sm leading-relaxed text-gray-600">
        This area will host patient cards and table rows fed from the global Zustand store. For now,
        focus on the sidebar and top bar — they persist across all authenticated routes.
      </p>
    </Card>
  )
}
