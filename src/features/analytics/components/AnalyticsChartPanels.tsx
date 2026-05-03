import { Calendar } from "lucide-react";
import { memo, useId, useMemo } from "react";
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
} from "recharts";
import type {
  ConditionBar,
  MonthlyPoint,
  StatusSlice,
} from "@/features/analytics/hooks/useAnalyticsChartData";

const STATUS_COLORS: Record<string, string> = {
  Stable: "#10b981",
  Critical: "#f43f5e",
  Recovering: "#d97706",
};

const tooltipStyle = {
  borderRadius: 6,
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
};

type StatusChartProps = { statusData: StatusSlice[] };

export const StatusDistributionChart = memo(function StatusDistributionChart({
  statusData,
}: StatusChartProps) {
  const total = useMemo(
    () => statusData.reduce((acc, s) => acc + s.value, 0),
    [statusData],
  );

  return (
    <>
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
                  fill={STATUS_COLORS[entry.name] ?? "#94a3b8"}
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
      <p className="mt-2 text-xs text-slate-500">
        Total census:{" "}
        <span className="font-medium tabular-nums text-slate-700">{total}</span>
      </p>
    </>
  );
});

type LineChartProps = { monthlyData: MonthlyPoint[] };

export const AdmissionsLineChartPanel = memo(function AdmissionsLineChartPanel({
  monthlyData,
}: LineChartProps) {
  return (
    <div className="h-[300px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={monthlyData}
          margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#64748b" }}
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
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ r: 3, fill: "#4f46e5", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

type BarChartProps = { conditionData: ConditionBar[] };

export const ConditionBarChartPanel = memo(function ConditionBarChartPanel({
  conditionData,
}: BarChartProps) {
  const gradientId = `condition-bar-${useId().replace(/:/g, "")}`;
  const countMax = useMemo(
    () => conditionData.reduce((m, d) => Math.max(m, d.count), 0),
    [conditionData],
  );
  const xMax = Math.max(5, countMax + 1);

  const totalPatients = useMemo(
    () => conditionData.reduce((acc, d) => acc + d.count, 0),
    [conditionData],
  );
  const top = conditionData[0];
  const topSharePct =
    totalPatients > 0 && top
      ? Math.round((top.count / totalPatients) * 1000) / 10
      : 0;

  return (
    <div className="w-full min-w-0">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
            {totalPatients.toLocaleString()}
          </p>
          <p className="mt-0.5 text-sm font-medium text-emerald-600">
            {top
              ? `${topSharePct}% in ${top.name}${top.count !== 1 ? ` (${top.count} patients)` : ""}`
              : "No conditions to rank"}
          </p>
        </div>
        <div className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
          <Calendar className="size-3.5 text-slate-500" strokeWidth={1.75} aria-hidden />
          Full directory
        </div>
      </div>

      <div className="h-[min(380px,48vh)] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={conditionData}
            layout="vertical"
            margin={{ top: 4, right: 12, left: 4, bottom: 4 }}
            barCategoryGap="18%"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="45%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#3730a3" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e8ecf1"
              horizontal={false}
            />
            <XAxis
              type="number"
              domain={[0, xMax]}
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={152}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar
              dataKey="count"
              name="Patients"
              fill={`url(#${gradientId})`}
              radius={12}
              barSize={26}
              background={{ fill: "#eef2f6", radius: 12 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});
