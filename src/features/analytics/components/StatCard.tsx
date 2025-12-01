import type { ReactNode } from "react";
import { classNames } from "../../../shared/utils/classNames";

interface StatCardProps {
  label: string;
  value: string;
  helper: string;
  trend: "up" | "down" | "neutral";
  icon?: ReactNode;
}

const StatCard = ({ label, value, helper, trend, icon }: StatCardProps) => {
  const trendColor =
    trend === "up"
      ? "text-emerald-500"
      : trend === "down"
      ? "text-rose-500"
      : "text-slate-400";

  return (
    <div className="flex flex-1 items-center gap-4 rounded-3xl border border-slate-200 bg-surface-light px-5 py-4 shadow-sm dark:border-white/10 dark:bg-surface-darkElevated">
      {icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-50">
          {icon}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            {value}
          </span>
          <span
            className={classNames(
              "text-[11px] font-medium",
              trendColor
            )}
          >
            {helper}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
