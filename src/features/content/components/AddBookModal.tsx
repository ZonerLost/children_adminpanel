import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import type { BookDifficulty, CreateBookInput } from "../types";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBookInput) => void;
}

const difficulties: BookDifficulty[] = ["Easy", "Medium", "Hard"];

const defaultForm: CreateBookInput = {
  title: "",
  author: "",
  imageUrl: "",
  theme: "",
  difficulty: "Easy",
  tagsText: "",
};

const AddBookModal = ({ isOpen, onClose, onSubmit }: AddBookModalProps) => {
  const [form, setForm] = useState<CreateBookInput>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(defaultForm);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleChange = (field: keyof CreateBookInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) return;

    setIsSubmitting(true);
    onSubmit(form);
    // parent will close the modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Book"
      size="lg"
      footer={
        <>
          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="add-book-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Book"}
          </Button>
        </>
      }
    >
      <form id="add-book-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Book Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="The Magical Treehouse"
              className="w-full rounded-lg border border-slate-300 bg-surface-light px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple dark:border-white/10 dark:bg-surface-dark dark:text-slate-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Author
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => handleChange("author", e.target.value)}
              placeholder="Lily Green"
              className="w-full rounded-lg border border-slate-300 bg-surface-light px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple dark:border-white/10 dark:bg-surface-dark dark:text-slate-50"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Cover Image URL
            </label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              placeholder="https://example.com/cover.jpg"
              className="w-full rounded-lg border border-slate-300 bg-surface-light px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple dark:border-white/10 dark:bg-surface-dark dark:text-slate-50"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              For now, paste an image URL. Later you can replace this with an
              upload field.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Theme / Category
            </label>
            <input
              type="text"
              value={form.theme}
              onChange={(e) => handleChange("theme", e.target.value)}
              placeholder="Adventure, Science Fiction..."
              className="w-full rounded-lg border border-slate-300 bg-surface-light px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple dark:border-white/10 dark:bg-surface-dark dark:text-slate-50"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Difficulty
            </label>
            <select
              value={form.difficulty}
              onChange={(e) => handleChange("difficulty", e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-surface-light px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple dark:border-white/10 dark:bg-surface-dark dark:text-slate-50"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Tags
            </label>
            <input
              type="text"
              value={form.tagsText}
              onChange={(e) => handleChange("tagsText", e.target.value)}
              placeholder="Adventure, Fantasy, Easy"
              className="w-full rounded-lg border border-slate-300 bg-surface-light px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple dark:border-white/10 dark:bg-surface-dark dark:text-slate-50"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Separate tags with commas. They will appear as chips on the book
              card.
            </p>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddBookModal;
