import { Pencil, Trash2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import type { Book } from "../types";

interface ContentCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete: (book: Book) => void;
}

const ContentCard = ({ book, onEdit, onDelete }: ContentCardProps) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-surface-light shadow-sm dark:border-white/5 dark:bg-surface-darkElevated">
      {/* Title + author */}
      <div className="px-5 pt-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          {book.title}
        </h3>
        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
          {book.author}
        </p>
      </div>

      {/* Cover image */}
      <div className="mt-3 px-5">
        <div className="h-40 w-full overflow-hidden rounded-2xl bg-slate-200 dark:bg-black/40">
          {book.imageUrl ? (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2 px-5">
        {book.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-medium text-purple-700 dark:bg-purple-500/20 dark:text-purple-100"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer: actions */}
      <div className="mt-4 flex items-center justify-between px-5 pb-4">
        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-300">
          <button
            type="button"
            className="flex items-center gap-1 hover:text-brand-purple"
            onClick={() => onEdit?.(book)}
          >
            <Pencil className="h-3.5 w-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <Button
          variant="danger"
          className="flex items-center gap-1 px-3 py-1 text-[11px]"
          onClick={() => onDelete(book)}
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Delete</span>
        </Button>
      </div>
    </article>
  );
};

export default ContentCard;
