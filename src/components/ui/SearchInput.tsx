import { Search } from "lucide-react";

interface Props {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ placeholder, value, onChange }: Props) => {
  return (
    <div className="flex items-center rounded-pill border border-white/15 bg-transparent px-3 py-1.5 text-sm text-slate-100 dark:bg-surface-darkElevated">
      <Search className="mr-2 h-4 w-4 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
      />
    </div>
  );
};

export default SearchInput;
