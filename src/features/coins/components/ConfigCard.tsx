import type { ReactNode } from "react";

interface ConfigCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const ConfigCard = ({ title, subtitle, children }: ConfigCardProps) => {
  return (
    <section className="flex flex-col rounded-3xl border border-slate-200 bg-surface-light px-5 py-4 shadow-sm dark:border-white/10 dark:bg-[#190928]">
      <header className="mb-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </header>
      <div className="flex-1 space-y-3 text-xs text-slate-700 dark:text-slate-200">
        {children}
      </div>
    </section>
  );
};

export default ConfigCard;
