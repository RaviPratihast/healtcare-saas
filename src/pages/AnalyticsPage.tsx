import { Card } from '@/shared/components/Card'

export default function AnalyticsPage() {
  return (
    <Card
      title="Analytics"
      description="Status distribution, admissions, and conditions will load from shared patient data in a later phase."
    >
      <p className="text-sm leading-relaxed text-gray-600">
        Charts and filters will appear here. Use the sidebar to move between Dashboard, Analytics, and
        Patients without losing context — navigation stays in this shell.
      </p>
    </Card>
  )
}
