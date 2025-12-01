import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  subLabel: string;
}

const StatCard = ({ icon, label, value, subLabel }: StatCardProps) => {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-surface-light px-4 py-3 shadow-sm dark:border-white/10 dark:bg-[#190928]">
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-100">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {value}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {subLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
