export type BookDifficulty = "Easy" | "Medium" | "Hard";

export interface Book {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  tags: string[]; // e.g. ["Adventure", "Fantasy", "Easy"]
  difficulty: BookDifficulty;
  theme: string; // e.g. "Adventure", "Science Fiction"
  status: "Published" | "PendingApproval";
}

export interface CreateBookInput {
  title: string;
  author: string;
  imageUrl: string;
  theme: string;
  difficulty: BookDifficulty;
  tagsText: string; // comma-separated tags from the form
}
