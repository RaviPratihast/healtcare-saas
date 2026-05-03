import {
  AdmissionsLineChartPanel,
  ConditionBarChartPanel,
  StatusDistributionChart,
} from "@/features/analytics/components/AnalyticsChartPanels";
import { useAnalyticsChartData } from "@/features/analytics/hooks/useAnalyticsChartData";
import { usePatientsStore } from "@/features/patients/store/patientsStore";
import { Card } from "@/shared/components/Card";

export default function AnalyticsPage() {
  const patients = usePatientsStore((s) => s.patients);
  const { statusData, monthlyData, conditionData } =
    useAnalyticsChartData(patients);

  const hasPatients = patients.length > 0;

  return (
    <div className="space-y-6">
      <header>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
          Operational insight from your patient directory. Charts update when
          store data changes - same source as Dashboard and Patients.
        </p>
      </header>

      {!hasPatients ? (
        <Card
          title="No data yet"
          description="Add patients to the store to see charts."
        >
          <p className="text-sm text-slate-600">
            The analytics views need at least one patient row.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card
            title="Patient status distribution"
            description="Stable, critical, and recovering share of the current census."
            className="min-h-0 xl:col-span-1"
          >
            <StatusDistributionChart statusData={statusData} />
          </Card>

          <Card
            title="Admissions over time"
            description="Monthly volume inferred from last-visit dates (rolling six months)."
            className="min-h-0"
          >
            <AdmissionsLineChartPanel monthlyData={monthlyData} />
          </Card>

          <Card
            title="Condition breakdown"
            description="Patient count by primary condition in the directory."
            className="min-h-0 xl:col-span-2"
          >
            <ConditionBarChartPanel conditionData={conditionData} />
          </Card>
        </div>
      )}
    </div>
  );
}
