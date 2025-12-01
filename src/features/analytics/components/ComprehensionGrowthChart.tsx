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

const COMPREHENSION = [
  { month: "Jan", comprehension: 72, vocabulary: 120 },
  { month: "Feb", comprehension: 75, vocabulary: 135 },
  { month: "Mar", comprehension: 78, vocabulary: 150 },
  { month: "Apr", comprehension: 80, vocabulary: 165 },
  { month: "May", comprehension: 82, vocabulary: 180 },
  { month: "Jun", comprehension: 84, vocabulary: 195 },
];

const ComprehensionGrowthChart = () => {
  const { secondary, accent, grid, tooltipBg } = useChartColors();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={COMPREHENSION} margin={{ left: -15, top: 5 }}>
        <CartesianGrid stroke={grid} strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 10, fill: "currentColor" }}
          tickMargin={6}
        />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 10, fill: "currentColor" }}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 10, fill: "currentColor" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: tooltipBg,
            borderRadius: 12,
            border: "1px solid rgba(148,163,184,0.4)",
            fontSize: 11,
          }}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="comprehension"
          name="Comprehension Score"
          stroke={secondary}
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 4 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="vocabulary"
          name="Vocabulary Words"
          stroke={accent}
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ComprehensionGrowthChart;
