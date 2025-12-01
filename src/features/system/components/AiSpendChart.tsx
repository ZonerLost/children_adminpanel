import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartColors } from "../../analytics/components/chartTheme";
import { useTheme } from "../../../shared/hooks/useTheme";
import { brandColors } from "../../../shared/theme/designTokens"; 

const AI_SPEND = [
  { month: "Jan", content: 260, feedback: 90, suggestions: 180 },
  { month: "Feb", content: 270, feedback: 110, suggestions: 190 },
  { month: "Mar", content: 290, feedback: 120, suggestions: 200 },
  { month: "Apr", content: 310, feedback: 130, suggestions: 210 },
  { month: "May", content: 340, feedback: 140, suggestions: 230 },
  { month: "Jun", content: 220, feedback: 100, suggestions: 170 },
];

const AiSpendChart = () => {
  const { grid, tooltipBg } = useChartColors();
  const { theme } = useTheme();

  // Bars:
  // - dark  → purple (matches other dark charts)
  // - light → brand accent (same vibe as your orange buttons)
  const barColor =
    theme === "dark" ? brandColors.purple : brandColors.accent;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={AI_SPEND}
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
            tickFormatter={(v: number) => `$${v}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.4)",
              fontSize: 11,
            }}
            formatter={(value: number | string) => {
              const num = typeof value === "number" ? value : Number(value);
              if (Number.isNaN(num)) return value;
              return `$${num.toLocaleString()}`;
            }}
            labelFormatter={(label) => `Month: ${label}`}
          />

          <Bar
            dataKey="content"
            name="Content Generation"
            fill={barColor}
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="feedback"
            name="Student Feedback"
            fill={barColor}
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="suggestions"
            name="Quiz Suggestions"
            fill={barColor}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AiSpendChart;
