import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartColors } from "./chartTheme";

const PROFIT_LOSS = [
  { month: "Jan", revenue: 8000, cost: 5000 },
  { month: "Feb", revenue: 8500, cost: 5200 },
  { month: "Mar", revenue: 9000, cost: 5300 },
  { month: "Apr", revenue: 9500, cost: 5400 },
  { month: "May", revenue: 10200, cost: 5600 },
  { month: "Jun", revenue: 10800, cost: 5800 },
  { month: "Jul", revenue: 11200, cost: 5900 },
  { month: "Aug", revenue: 11800, cost: 6000 },
];

const ProfitLossChart = () => {
  const { secondary, accent, grid, tooltipBg } = useChartColors();

  return (
    // 👇 makes sure the chart actually has height
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={PROFIT_LOSS}
          margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            stroke={grid}
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: "currentColor" }}
            tickMargin={6}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "currentColor" }}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.4)",
              fontSize: 11,
            }}
            // 👇 safe for number | string
            formatter={(value: number | string) => {
              const num =
                typeof value === "number" ? value : Number(value);
              if (Number.isNaN(num)) return value;
              return `$${num.toLocaleString()}`;
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke={secondary}
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="cost"
            name="Costs"
            stroke={accent}
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitLossChart;
