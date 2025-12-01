import { useMemo, useState } from "react";
import StatusTabs, { type StoryStatus } from "./components/StatusTabs";
import SortDropdown, { type SortOrder } from "./components/SortDropdown";
import StoryCard, { type Story } from "./components/StoryCard";
import { classNames } from "../../shared/utils/classNames";

const STORIES: Story[] = [
  {
    id: 1,
    title: "The Magical Treehouse Adventure",
    author: "Lily S.",
    submittedAt: "2024-07-20",
    status: "Pending",
    coverUrl:
      "https://images.pexels.com/photos/2896499/pexels-photo-2896499.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "The Day the Animals Talked",
    author: "Sophia L.",
    submittedAt: "2024-07-18",
    status: "Pending",
    coverUrl:
      "https://images.pexels.com/photos/5726887/pexels-photo-5726887.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "The Day the Animals Talked",
    author: "Sophia L.",
    submittedAt: "2024-07-18",
    status: "Pending",
    coverUrl:
      "https://images.pexels.com/photos/7693919/pexels-photo-7693919.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "Grandpa’s Amazing Inventions",
    author: "William G.",
    submittedAt: "2024-07-13",
    status: "Pending",
    coverUrl:
      "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    title: "Robot’s First Day at School",
    author: "Noah M.",
    submittedAt: "2024-07-17",
    status: "Pending",
    coverUrl:
      "https://images.pexels.com/photos/8294668/pexels-photo-8294668.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    title: "Robot’s First Day at School",
    author: "Noah M.",
    submittedAt: "2024-07-17",
    status: "Pending",
    coverUrl:
      "https://images.pexels.com/photos/10458835/pexels-photo-10458835.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const PAGE_SIZE = 6;

const CreativeBookPage = () => {
  const [stories, setStories] = useState<Story[]>(STORIES);
  const [statusFilter, setStatusFilter] = useState<StoryStatus>("Pending");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [page, setPage] = useState(1);

  const filteredStories = useMemo(
    () => stories.filter((s) => s.status === statusFilter),
    [stories, statusFilter]
  );

  const sortedStories = useMemo(() => {
    const copy = [...filteredStories];
    copy.sort((a, b) => {
      const da = new Date(a.submittedAt).getTime();
      const db = new Date(b.submittedAt).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });
    return copy;
  }, [filteredStories, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sortedStories.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pagedStories = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedStories.slice(start, start + PAGE_SIZE);
  }, [sortedStories, currentPage]);

  const handleApprove = (id: number) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Approved" } : s))
    );
  };

  const handleReject = (id: number) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Rejected" } : s))
    );
  };

  const handleStatusChange = (status: StoryStatus) => {
    setStatusFilter(status);
    setPage(1);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
          Creative Book Builder Oversight
        </h1>
        <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Review and approve kid-created stories and illustrations, ensuring
          content quality and safety.
        </p>
      </div>

      {/* Tabs + sort */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <StatusTabs value={statusFilter} onChange={handleStatusChange} />
        <SortDropdown value={sortOrder} onChange={setSortOrder} />
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pagedStories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}

        {pagedStories.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-surface-light px-6 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-[#190928] dark:text-slate-400">
            No stories in this state yet.
          </div>
        )}
      </div>

      {/* Pagination (simple) */}
      <div className="flex items-center justify-center gap-6 text-[11px] text-slate-500 dark:text-slate-400">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={classNames(
            "flex items-center gap-1",
            currentPage === 1 && "cursor-not-allowed opacity-50"
          )}
        >
          &lt; Previous
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNumber = idx + 1;
            const isActive = currentPage === pageNumber;
            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={classNames(
                  "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold",
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
                )}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className={classNames(
            "flex items-center gap-1",
            currentPage === totalPages && "cursor-not-allowed opacity-50"
          )}
        >
          Next &gt;
        </button>
      </div>
    </section>
  );
};

export default CreativeBookPage;
