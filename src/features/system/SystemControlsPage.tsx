import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  DatabaseZap,
  Gauge,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import Button from "../../components/ui/Button";
import StatCard from "./components/StatCard";
import AiSpendChart from "./components/AiSpendChart";

interface ToggleItem {
  id: string;
  label: string;
  description: string;
}

const SECURITY_TOGGLES: ToggleItem[] = [
  {
    id: "gdpr",
    label: "GDPR Data Anonymization",
    description: "Mask personal data in logs and analytics exports.",
  },
  {
    id: "child-filter",
    label: "Child Content Filtering",
    description: "Filter sensitive prompts and responses for minors.",
  },
  {
    id: "secure-login",
    label: "Secure Login Enforcement",
    description: "Require SSO / MFA for all admin roles.",
  },
];

const USAGE_ALERT_TOGGLES: ToggleItem[] = [
  {
    id: "api-usage",
    label: "High API Usage",
    description: "Alert when daily AI usage crosses defined threshold.",
  },
  {
    id: "data-transfer",
    label: "Data Transfer Threshold",
    description: "Monitor outbound data volume to external services.",
  },
  {
    id: "login-activity",
    label: "Unusual Login Activity",
    description: "Detect suspicious login locations or patterns.",
  },
];

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full border text-[0px] transition ${
        checked
          ? "border-lime-400 bg-lime-400"
          : "border-slate-300 bg-slate-200 dark:border-slate-500 dark:bg-slate-700"
      }`}
      aria-pressed={checked}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-3.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
};

const BadgeDelta = ({ value }: { value: string }) => {
  const isPositive = value.startsWith("+");
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        isPositive
          ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-200"
          : "bg-rose-500/10 text-rose-600 dark:bg-rose-500/15 dark:text-rose-200"
      }`}
    >
      {value}
    </span>
  );
};

const SystemControlsPage = () => {
  const [securitySettings, setSecuritySettings] = useState<
    Record<string, boolean>
  >({
    gdpr: true,
    "child-filter": true,
    "secure-login": true,
  });

  const [alertSettings, setAlertSettings] = useState<Record<string, boolean>>({
    "api-usage": true,
    "data-transfer": false,
    "login-activity": true,
  });

  return (
    <section className="space-y-6">
      {/* header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          System Controls &amp; Observability
        </h1>
        <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Manage application infrastructure, monitor performance, and configure
          security settings.
        </p>
      </div>

      {/* KPI row */}
      <div className="grid gap-3 md:grid-cols-4">
        <StatCard
          icon={<DatabaseZap className="h-4 w-4" />}
          label="Total AI Spend"
          value="$1,250"
          subLabel="Current month’s expenditure"
        />
        <StatCard
          icon={<Gauge className="h-4 w-4" />}
          label="Cache Hit Rate"
          value="92.5%"
          subLabel="Average last 24 hours"
        />
        <StatCard
          icon={<AlertTriangle className="h-4 w-4" />}
          label="Active Alerts"
          value="3"
          subLabel="Critical system warnings"
        />
        <StatCard
          icon={<ShieldCheck className="h-4 w-4" />}
          label="GDPR Compliance"
          value="100%"
          subLabel="All policies implemented"
        />
      </div>

      {/* Middle row: chart + caching */}
      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        {/* AI Spend Monitoring */}
        <section className="rounded-3xl border border-slate-200 bg-surface-light px-5 py-4 shadow-sm dark:border-white/10 dark:bg-[#190928]">
          <header className="mb-3">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              AI Spend Monitoring
            </h2>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Monthly expenditure on AI services by category.
            </p>
          </header>
          <AiSpendChart />
          <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Content Generation</span>
            <span>Student Feedback</span>
            <span>Quiz Suggestions</span>
          </div>
        </section>

        {/* Caching & Optimization side panel */}
        <section className="flex flex-col rounded-3xl border border-slate-200 bg-surface-light px-5 py-4 shadow-sm dark:border-white/10 dark:bg-[#190928]">
          <header className="mb-3">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Caching &amp; Optimization
            </h2>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Real-time cache performance and cost metrics.
            </p>
          </header>

          <dl className="space-y-3 text-[11px]">
            <div className="flex items-baseline justify-between">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  Cache Hit Rate
                </dt>
                <dd className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                  92.5%
                </dd>
              </div>
              <BadgeDelta value="+3.2%" />
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  Eviction Count
                </dt>
                <dd className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                  1,200
                </dd>
              </div>
              <BadgeDelta value="-1.5%" />
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  Storage Usage
                </dt>
                <dd className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                  48GB
                </dd>
              </div>
              <BadgeDelta value="+1.1%" />
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  Latency Reduction
                </dt>
                <dd className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                  25ms
                </dd>
              </div>
              <BadgeDelta value="+7.3%" />
            </div>
          </dl>
        </section>
      </div>

      {/* Bottom row: security + usage alerts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Security & Compliance */}
        <section className="flex flex-col rounded-3xl border border-slate-200 bg-surface-light px-5 py-4 shadow-sm dark:border-white/10 dark:bg-[#190928]">
          <header className="mb-3">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Security &amp; Compliance
            </h2>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Manage data privacy and platform security settings.
            </p>
          </header>

          <ul className="flex-1 space-y-3 text-[11px]">
            {SECURITY_TOGGLES.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-3"
              >
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
                <Toggle
                  checked={!!securitySettings[item.id]}
                  onChange={(value) =>
                    setSecuritySettings((prev) => ({
                      ...prev,
                      [item.id]: value,
                    }))
                  }
                />
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Button
              pill
              className="flex w-full items-center justify-center gap-2 bg-brand-accent text-xs font-semibold text-white hover:bg-[#ff8a58] dark:bg-[#a855f7] dark:hover:bg-[#9333ea]"
            >
              <ShieldQuestion className="h-4 w-4" />
              View Security Audit Logs
            </Button>
          </div>
        </section>

        {/* Usage Alerts */}
        <section className="flex flex-col rounded-3xl border border-slate-200 bg-surface-light px-5 py-4 shadow-sm dark:border-white/10 dark:bg-[#190928]">
          <header className="mb-3">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Usage Alerts
            </h2>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Configure thresholds for system notifications.
            </p>
          </header>

          <ul className="flex-1 space-y-3 text-[11px]">
            {USAGE_ALERT_TOGGLES.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-3"
              >
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
                <Toggle
                  checked={!!alertSettings[item.id]}
                  onChange={(value) =>
                    setAlertSettings((prev) => ({ ...prev, [item.id]: value }))
                  }
                />
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Button
              pill
              className="flex w-full items-center justify-center gap-2 bg-brand-accent text-xs font-semibold text-white hover:bg-[#ff8a58] dark:bg-[#a855f7] dark:hover:bg-[#9333ea]"
            >
              <Activity className="h-4 w-4" />
              Add New Alert
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default SystemControlsPage;
