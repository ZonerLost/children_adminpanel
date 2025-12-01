import { useState } from "react";
import { BarChart2, Users, Clock3, UserPlus } from "lucide-react";
import StatCard from "./components/StatCard";
import ChartCard from "./components/ChartCard";
import UsageBarChart from "./components/UsageBarChart";
import DailyActivityChart from "./components/DailyActivityChart";
import ComprehensionGrowthChart from "./components/ComprehensionGrowthChart";
import ProfitLossChart from "./components/ProfitLossChart";

type UsageTab = "school" | "class" | "student";

const AnalyticsReportingPage = () => {
  const [usageTab, setUsageTab] = useState<UsageTab>("school");

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          Analytics &amp; Reporting
        </h1>
        <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Track platform usage, engagement, and performance across schools,
          classes, and students.
        </p>
      </div>

      {/* Top stat cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Active Users"
          value="12,345"
          helper="+5.2% from last month"
          trend="up"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          label="Total Classes"
          value="120"
          helper="+1.5% from last month"
          trend="up"
          icon={<BarChart2 className="h-4 w-4" />}
        />
        <StatCard
          label="Avg. Daily Engagement"
          value="2.5 hours"
          helper="0.3% from last month"
          trend="down"
          icon={<Clock3 className="h-4 w-4" />}
        />
        <StatCard
          label="New Registrations"
          value="450"
          helper="+10.1% from last month"
          trend="up"
          icon={<UserPlus className="h-4 w-4" />}
        />
      </div>

      {/* Usage dashboard */}
      <div className="flex flex-col rounded-3xl border border-slate-200 bg-surface-light px-5 py-4 shadow-sm dark:border-white/10 dark:bg-surface-darkElevated">
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Platform Usage Dashboard
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Detailed breakdown of platform activity by schools, classes, and
            individual students.
          </p>
        </div>

        {/* Segmented tabs */}
        <div className="mb-4 flex rounded-full bg-slate-200/70 p-1 text-[11px] text-slate-600 dark:bg-white/5 dark:text-slate-300">
          {[
            { key: "school", label: "School Usage" },
            { key: "class", label: "Class Usage" },
            { key: "student", label: "Student Usage" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setUsageTab(tab.key as UsageTab)}
              className={`flex-1 rounded-full px-4 py-1.5 font-medium transition ${
                usageTab === tab.key
                  ? "bg-[#a3e635] text-white py-2 shadow-sm dark:bg-brand-purple dark:text-white"
                  : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="h-64 w-full">
          {/* For now all tabs show same chart; later you can swap datasets by tab */}
          <UsageBarChart />
        </div>
      </div>

      {/* Middle row: Daily Activity + Comprehension */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Daily Activity Heatmap"
          subtitle="Platform engagement patterns throughout a typical day."
        >
          <DailyActivityChart />
        </ChartCard>

        <ChartCard
          title="Comprehension & Vocabulary Growth"
          subtitle="Average student progress over the last 6 months."
        >
          <ComprehensionGrowthChart />
        </ChartCard>
      </div>

      {/* Bottom row: Profit / Loss */}
      <ChartCard
        title="Platform Profit/Loss Monitoring"
        subtitle="Monthly revenue vs. operational cost for the platform."
        heightClass="h-64 min-h-[260px]"
      >
        <ProfitLossChart />
      </ChartCard>
    </section>
  );
};

export default AnalyticsReportingPage;
