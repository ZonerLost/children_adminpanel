import Button from "../../../components/ui/Button";
import { classNames } from "../../../shared/utils/classNames";

export type StoryStatus = "Pending" | "Approved" | "Rejected";

export interface Story {
  id: number;
  title: string;
  author: string;
  submittedAt: string; // ISO string
  coverUrl?: string;
  status: StoryStatus;
}

interface StoryCardProps {
  story: Story;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const statusLabelConfig: Record<
  StoryStatus,
  { label: string; className: string }
> = {
  Pending: {
    label: "Pending Review",
    className:
      "bg-amber-400 text-slate-900 dark:bg-amber-400 dark:text-slate-900",
  },
  Approved: {
    label: "Approved",
    className:
      "bg-emerald-400 text-slate-900 dark:bg-emerald-400 dark:text-slate-900",
  },
  Rejected: {
    label: "Rejected",
    className:
      "bg-rose-400 text-slate-900 dark:bg-rose-400 dark:text-slate-900",
  },
};

const StoryCard = ({ story, onApprove, onReject }: StoryCardProps) => {
  const submitted = new Date(story.submittedAt).toLocaleDateString();

  const statusCfg = statusLabelConfig[story.status];

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-surface-light shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#190928]">
      {/* Cover image */}
      <div className="relative">
        {story.coverUrl ? (
          <img
            src={story.coverUrl}
            alt={story.title}
            className="h-44 w-full object-cover"
          />
        ) : (
          <div className="h-44 w-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-amber-400" />
        )}

        <div className="pointer-events-none absolute right-4 top-4">
          <span
            className={classNames(
              "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold shadow-sm",
              statusCfg.className
            )}
          >
            {statusCfg.label}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-4 pb-3 pt-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
          {story.title}
        </h3>
        <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
          <p>By: {story.author}</p>
          <p>Submitted: {submitted}</p>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex gap-3 border-t border-slate-200 px-4 py-3 dark:border-white/10">
        <Button
          pill
          type="button"
          onClick={() => onApprove(story.id)}
          disabled={story.status === "Approved"}
          className={classNames(
            "flex-1 text-xs font-semibold",
            "bg-lime-400 text-slate-900 hover:bg-lime-400/90",
            "disabled:cursor-not-allowed disabled:opacity-60",
            "dark:bg-brand-purple dark:text-white dark:hover:bg-brand-purple"
          )}
        >
          Approve
        </Button>
        <Button
          pill
          variant="secondary"
          type="button"
          onClick={() => onReject(story.id)}
          disabled={story.status === "Rejected"}
          className="flex-1 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        >
          Reject
        </Button>
      </div>
    </article>
  );
};

export default StoryCard;
