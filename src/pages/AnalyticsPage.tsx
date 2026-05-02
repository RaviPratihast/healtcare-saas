import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAnalyticsChartData } from '@/features/analytics/hooks/useAnalyticsChartData'
import { usePatientsStore } from '@/features/patients/store/patientsStore'
import { Card } from '@/shared/components/Card'

const STATUS_COLORS: Record<string, string> = {
  Stable: '#10b981',
  Critical: '#ef4444',
  Recovering: '#f59e0b',
}

const tooltipStyle = {
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.08)',
}

export default function AnalyticsPage() {
  const patients = usePatientsStore((s) => s.patients)
  const { statusData, monthlyData, conditionData } = useAnalyticsChartData(patients)

  const hasPatients = patients.length > 0

  const statusTotal = useMemo(
    () => statusData.reduce((acc, s) => acc + s.value, 0),
    [statusData],
  )

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Analytics</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base">
          Operational insight derived from your patient directory. Charts update when store data
          changes — same source as Dashboard and Patients.
        </p>
      </header>

      {!hasPatients ? (
        <Card title="No data yet" description="Add patients to the store to see charts.">
          <p className="text-sm text-gray-600">The analytics views need at least one patient row.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card
            title="Patient status distribution"
            description="Stable, critical, and recovering share of the current census."
            className="min-h-0 xl:col-span-1"
          >
            <div className="h-[300px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={92}
                    paddingAngle={2}
                    label={({ name, percent = 0 }) =>
                      `${name} ${(Number(percent) * 100).toFixed(0)}%`
                    }
                  >
                    {statusData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={STATUS_COLORS[entry.name] ?? '#94a3b8'}
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Total census: <span className="font-medium text-gray-700">{statusTotal}</span>
            </p>
          </Card>

          <Card
            title="Admissions over time"
            description="Monthly volume inferred from last-visit dates (rolling six months)."
            className="min-h-0"
          >
            <div className="h-[300px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                    width={36}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line
                    type="monotone"
                    dataKey="admissions"
                    name="Admissions"
                    stroke="#ec4899"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#ec4899', strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card
            title="Condition breakdown"
            description="Patient count by primary condition in the directory."
            className="min-h-0 xl:col-span-2"
          >
            <div className="h-[min(420px,50vh)] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={conditionData}
                  layout="vertical"
                  margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={148}
                    tick={{ fontSize: 11, fill: '#475569' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" name="Patients" radius={[0, 6, 6, 0]} barSize={18}>
                    {conditionData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={i % 2 === 0 ? '#f97316' : '#fb923c'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
