import { useMemo, useState } from "react";
import { Plus, Upload, Download } from "lucide-react";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import AddUserModal from "./components/AddUserModal";
import UserTable from "./components/UserTable";
import { classNames } from "../../shared/utils/classNames";
import type { CreateUserInput, User } from "./types";

// initial mock data (same as before)
const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@edumanage.com",
    role: "System Admin",
    status: "Active",
    lastActivity: "2024-07-28 10:30 AM",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob.williams@schoolx.com",
    role: "School Admin",
    status: "Active",
    lastActivity: "2024-07-27 04:15 PM",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@iteach.org",
    role: "Teacher",
    status: "Active",
    lastActivity: "2024-07-28 09:00 AM",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david.lee@parent.net",
    role: "Parent",
    status: "Pending",
    lastActivity: "2024-07-26 01:00 PM",
  },
  {
    id: 5,
    name: "Eve Green",
    email: "eve.green@edumanage.com",
    role: "Teacher",
    status: "Inactive",
    lastActivity: "2024-07-20 11:45 AM",
  },
  {
    id: 6,
    name: "Frank White",
    email: "frank.white@schoolz.edu",
    role: "School Admin",
    status: "Active",
    lastActivity: "2024-07-28 11:00 AM",
  },
];

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [search, users]);

  const handleAddUser = (input: CreateUserInput) => {
    setUsers((prev) => {
      const nextId =
        prev.length > 0 ? Math.max(...prev.map((u) => u.id)) + 1 : 1;
      const lastActivity = new Date().toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

      return [
        ...prev,
        {
          id: nextId,
          name: input.name.trim(),
          email: input.email.trim(),
          role: input.role,
          status: input.status,
          lastActivity,
        },
      ];
    });
    setIsAddOpen(false);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
  };

  const confirmDelete = () => {
    if (!userToDelete) return;
    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    setUserToDelete(null);
  };

  return (
    <section className="space-y-6">
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 sm:text-3xl">
          User &amp; Role Management
        </h1>
        <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Manage system admins, school admins, teachers, and parents. Control
          access, roles, and view activity logs.
        </p>
      </div>

      {/* Search + actions row */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search users by name or email..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button
            pill
            className="flex items-center gap-2"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add New User
          </Button>
          <Button
            variant="secondary"
            pill
            className="flex items-center gap-2 text-xs !bg-[#fc6a03] !hover:bg-[#e65a00] !text-white dark:!bg-[#3e3d3b]"
          >
            <Upload className="h-4 w-4" />
            Bulk Import
          </Button>
          <Button
            variant="secondary"
            pill
            className="flex items-center gap-2 text-xs !bg-[#fc6a03] !hover:bg-[#e65a00] !text-white dark:!bg-[#3e3d3b]"
          >
            <Download className="h-4 w-4" />
            Export Users
          </Button>
        </div>
      </div>

      {/* Users table / cards */}
      <div className="hidden md:block">
        <UserTable users={filteredUsers} onDelete={handleDeleteUser} />
      </div>

      {/* Mobile & tablet cards */}
      <div className="grid gap-3 md:hidden">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-surface-darkElevated"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user.email}
                </p>
              </div>
              <button
                className="rounded-full bg-rose-500/10 px-2 py-1 text-[11px] font-medium text-rose-700 dark:text-rose-200"
                onClick={() => handleDeleteUser(user)}
              >
                Delete
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300">
              <span className="rounded-full bg-purple-500/10 px-2 py-1 text-purple-700 dark:text-purple-200">
                {user.role}
              </span>
              <span
                className={classNames(
                  "rounded-full px-2 py-1",
                  user.status === "Active" &&
                    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-200",
                  user.status === "Pending" &&
                    "bg-amber-500/10 text-amber-700 dark:text-amber-200",
                  user.status === "Inactive" &&
                    "bg-rose-500/10 text-rose-700 dark:text-rose-200"
                )}
              >
                {user.status}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                Last active: {user.lastActivity}
              </span>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-surface-darkElevated dark:text-slate-300">
            No users found.
          </div>
        )}
      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddUser}
      />

      <ConfirmDialog
        isOpen={!!userToDelete}
        title="Delete user"
        description={
          userToDelete
            ? `Are you sure you want to delete ${userToDelete.name}? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        tone="danger"
        onConfirm={confirmDelete}
        onCancel={() => setUserToDelete(null)}
      />
    </section>
  );
};

export default UserManagementPage;
