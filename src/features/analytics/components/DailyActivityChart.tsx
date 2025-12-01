import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartColors } from "./chartTheme";

const DAILY_ACTIVITY = [
  { time: "06:00", users: 10 },
  { time: "08:00", users: 45 },
  { time: "10:00", users: 70 },
  { time: "12:00", users: 65 },
  { time: "14:00", users: 90 },
  { time: "16:00", users: 120 },
  { time: "18:00", users: 160 },
  { time: "20:00", users: 130 },
];

const DailyActivityChart = () => {
  const { primary, grid, tooltipBg } = useChartColors();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={DAILY_ACTIVITY} margin={{ left: -15, top: 5 }}>
        <CartesianGrid stroke={grid} strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 10, fill: "currentColor" }}
          tickMargin={6}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "currentColor" }}
          tickFormatter={(v) => `${v}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: tooltipBg,
            borderRadius: 12,
            border: "1px solid rgba(148,163,184,0.4)",
            fontSize: 11,
          }}
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke={primary}
          fill={primary}
          fillOpacity={0.25}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DailyActivityChart;
