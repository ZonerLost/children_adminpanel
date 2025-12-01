import type { ReactNode } from "react";
import Button from "../../../components/ui/Button";
import type { AiTool } from "../types";

interface AiToolCardProps {
  tool: AiTool;
  icon: ReactNode;
  onUseTool?: (tool: AiTool) => void;
}

const AiToolCard = ({ tool, icon, onUseTool }: AiToolCardProps) => {
  return (
    <article className="flex flex-col rounded-3xl border border-slate-200 bg-surface-light px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#190928]">
      {/* icon + title */}
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-100">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {tool.name}
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            {tool.description}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-5">
        <Button
          pill
          className="flex items-center gap-2 px-4 py-1.5 text-[11px]"
          onClick={() => onUseTool?.(tool)}
        >
          {tool.ctaLabel}
          <span className="text-xs">➜</span>
        </Button>
      </div>
    </article>
  );
};

export default AiToolCard;
