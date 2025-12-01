import { useMemo, useState } from "react";
import { PlusCircle } from "lucide-react";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import AddBookModal from "./components/AddBookModal";
import ContentCard from "./components/ContentCard";
import type { Book, CreateBookInput } from "./types";
import bookImg1 from "../../assets/images/book.png";
import bookImg2 from "../../assets/images/book2.png";
import bookImg3 from "../../assets/images/book3.png";
import bookImg4 from "../../assets/images/book4.png";

const INITIAL_BOOKS: Book[] = [
  {
    id: 1,
    title: "The Magical Treehouse",
    author: "Lily Green",
    imageUrl: bookImg1,
    tags: ["Adventure", "Fantasy", "Easy"],
    difficulty: "Easy",
    theme: "Adventure",
    status: "Published",
  },
  {
    id: 2,
    title: "Journey to the Stars",
    author: "Leo Cosmos",
    imageUrl: bookImg2,
    tags: ["Science Fiction", "Astronomy", "Medium"],
    difficulty: "Medium",
    theme: "Science Fiction",
    status: "Published",
  },
  {
    id: 3,
    title: "Ocean Secrets",
    author: "Marina Blue",
    imageUrl: bookImg3,
    tags: ["Exploration", "STEM", "Medium"],
    difficulty: "Medium",
    theme: "Marine Biology",
    status: "Published",
  },
  {
    id: 4,
    title: "Legends of the Valley",
    author: "Aria Brook",
    imageUrl: bookImg4,
    tags: ["Mythology", "History", "Hard"],
    difficulty: "Hard",
    theme: "Historical Fantasy",
    status: "PendingApproval",
  },
];

const ContentManagementPage = () => {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "approval">("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const filteredBooks = useMemo(() => {
    let list = books;

    if (activeTab === "approval") {
      list = list.filter((b) => b.status === "PendingApproval");
    }

    const q = search.trim().toLowerCase();
    if (!q) return list;

    return list.filter(
      (b) =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [books, search, activeTab]);

  const handleAddBook = (input: CreateBookInput) => {
    setBooks((prev) => {
      const nextId =
        prev.length > 0 ? Math.max(...prev.map((b) => b.id)) + 1 : 1;

      const tags = input.tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      return [
        ...prev,
        {
          id: nextId,
          title: input.title.trim(),
          author: input.author.trim(),
          imageUrl: input.imageUrl.trim(),
          theme: input.theme.trim() || "General",
          difficulty: input.difficulty,
          tags: tags.length ? tags : ["New"],
          status: "Published",
        },
      ];
    });

    setIsAddOpen(false);
  };

  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book);
  };

  const confirmDelete = () => {
    if (!bookToDelete) return;
    setBooks((prev) => prev.filter((b) => b.id !== bookToDelete.id));
    setBookToDelete(null);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            Content Management
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Manage books, themes, and difficulty levels. Approve new content and
            keep your library up to date.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          {/* Search on the right in desktop */}
          <div className="md:order-2 md:w-80">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search all content..."
            />
          </div>
          <div className="md:order-1">
            <Button
              pill
              className="flex items-center gap-2"
              onClick={() => setIsAddOpen(true)}
            >
              <PlusCircle className="h-4 w-4" />
              Add New Book
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs: All Books / Approval Queue */}
      <div className="flex rounded-full bg-slate-200/70 p-1 text-xs text-slate-600 dark:bg-white/5 dark:text-slate-300">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`flex-1 rounded-full px-4 py-2 font-medium transition ${
            activeTab === "all"
              ? "bg-white text-slate-900 shadow-sm dark:bg-brand-purple dark:text-white"
              : "hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          All Books
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("approval")}
          className={`flex-1 rounded-full px-4 py-2 font-medium transition ${
            activeTab === "approval"
              ? "bg-white text-slate-900 shadow-sm dark:bg-brand-purple dark:text-white"
              : "hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Approval Queue
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredBooks.map((book) => (
          <ContentCard key={book.id} book={book} onDelete={handleDeleteBook} />
        ))}

        {filteredBooks.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-surface-light p-8 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-surface-darkElevated dark:text-slate-400">
            No books match your current filters.
          </div>
        )}
      </div>

      {/* Modals */}
      <AddBookModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddBook}
      />

      <ConfirmDialog
        isOpen={!!bookToDelete}
        title="Delete book"
        description={
          bookToDelete
            ? `Are you sure you want to delete "${bookToDelete.title}"? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        tone="danger"
        onConfirm={confirmDelete}
        onCancel={() => setBookToDelete(null)}
      />
    </section>
  );
};

export default ContentManagementPage;
