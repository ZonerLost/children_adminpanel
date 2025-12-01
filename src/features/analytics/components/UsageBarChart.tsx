import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartColors } from "./chartTheme";

const SCHOOL_USAGE = [
  { school: "Northwood High", activeUsers: 4800 },
  { school: "Eastside Middle", activeUsers: 4400 },
  { school: "Westview Primary", activeUsers: 3200 },
  { school: "Lakeside Academy", activeUsers: 2800 },
  { school: "Maple Grove Elem.", activeUsers: 2100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  const { tooltipBg } = useChartColors();
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 shadow-md dark:border-white/10 dark:text-slate-100"
      style={{ backgroundColor: tooltipBg }}
    >
      <div className="font-medium">{label}</div>
      <div className="mt-1 text-[11px] text-slate-600 dark:text-slate-300">
        Active Users:{" "}
        <span className="font-semibold">
          {payload[0].value.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const UsageBarChart = () => {
  const { primary, grid } = useChartColors();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={SCHOOL_USAGE} margin={{ left: -20, right: 10, top: 10 }}>
        <CartesianGrid
          stroke={grid}
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          dataKey="school"
          tick={{ fontSize: 10, fill: "currentColor" }}
          tickMargin={8}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "currentColor" }}
          tickFormatter={(v) => `${v / 1000}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="activeUsers"
          radius={[10, 10, 0, 0]}
          fill={primary}
          maxBarSize={120}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsageBarChart;
