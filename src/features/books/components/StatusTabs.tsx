import { classNames } from "../../../shared/utils/classNames";

export type StoryStatus = "Pending" | "Approved" | "Rejected";

const STATUS_OPTIONS: { value: StoryStatus; label: string }[] = [
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];

interface StatusTabsProps {
  value: StoryStatus;
  onChange: (status: StoryStatus) => void;
}

const StatusTabs = ({ value, onChange }: StatusTabsProps) => {
  return (
    <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs dark:bg-white/10">
      {STATUS_OPTIONS.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={classNames(
              "min-w-[90px] rounded-full px-4 py-1.5 text-center font-medium transition-all",
              "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
              isActive &&
                "bg-lime-400 text-slate-900 shadow-sm hover:bg-lime-400/90 dark:bg-brand-purple dark:text-white dark:hover:bg-brand-purple"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default StatusTabs;
