type SortOrder = "newest" | "oldest";

interface SortDropdownProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-surface-light px-3 py-1 text-xs text-slate-700 shadow-sm dark:border-white/10 dark:bg-[#190928] dark:text-slate-200">
      <select
        className="w-full cursor-pointer appearance-none bg-transparent pr-4 text-xs font-medium outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOrder)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
      <span className="pointer-events-none text-[10px] text-slate-400 dark:text-slate-500">
        ▼
      </span>
    </div>
  );
};

export type { SortOrder };
export default SortDropdown;
