export type UserStatus = "Active" | "Pending" | "Inactive";

export type UserRole = "System Admin" | "School Admin" | "Teacher" | "Parent";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActivity: string;
  avatarUrl?: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
