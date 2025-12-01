import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  heightClass?: string;
}

const ChartCard = ({ title, subtitle, children, heightClass }: ChartCardProps) => {
  const contentHeight = heightClass ?? "h-56 min-h-[220px]";

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-surface-light px-5 py-4 shadow-sm dark:border-[#2b124e] dark:bg-gradient-to-br dark:from-[#14082a] dark:to-[#0b0217]">
      <div className="mb-3">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-50">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      <div className={`${contentHeight} w-full flex-1 text-slate-700 dark:text-slate-100`}>
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default ChartCard;
