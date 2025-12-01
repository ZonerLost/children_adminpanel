import { ArrowRight } from "lucide-react";
import type { ClassGroup } from "../types";

interface ClassCardProps {
  item: ClassGroup;
  onViewDetails?: (group: ClassGroup) => void;
}

const ClassCard = ({ item, onViewDetails }: ClassCardProps) => {
  return (
    <article className="flex flex-col rounded-3xl border border-slate-200 bg-surface-light px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#190928]">
      {/* header row */}
      <div className="flex items-center gap-3">
        {/* avatar circle */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-200">
          {/* simple initials fallback */}
          {item.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {item.name}
          </h3>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
            Students: {item.students}
          </p>
        </div>

        {/* assignments pill */}
        <span className="inline-flex items-center rounded-full bg-brand-accent px-3 py-1 text-[11px] font-medium text-white dark:bg-brand-accent">
          Assignments: {item.assignments}
        </span>
      </div>

      {/* footer row */}
      <button
        type="button"
        onClick={() => onViewDetails?.(item)}
        className="mt-6 flex items-center justify-between text-[11px] font-medium text-slate-600 transition hover:text-brand-purple dark:text-slate-300 dark:hover:text-brand-purple"
      >
        <span>View Details</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </article>
  );
};

export default ClassCard;
