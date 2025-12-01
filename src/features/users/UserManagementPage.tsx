import { useMemo, useState } from "react";
import { Plus, Upload, Download } from "lucide-react";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import AddUserModal from "./components/AddUserModal";
import UserTable from "./components/UserTable";
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
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          User &amp; Role Management
        </h1>
        <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Manage system admins, school admins, teachers, and parents. Control
          access, roles, and view activity logs.
        </p>
      </div>

      {/* Search + actions row */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search users by name or email..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
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
            className="flex items-center gap-2 text-xs !bg-[#fc6a03] !hover:bg-[#e65a00] !text-white dark:!bg-[#3e3d3b] "
          >
            <Upload className="h-4 w-4" />
            Bulk Import
          </Button>
          <Button
            variant="secondary"
            pill
            className="flex items-center gap-2 text-xs !bg-[#fc6a03] !hover:bg-[#e65a00] !text-white dark:!bg-[#3e3d3b] "
          >
            <Download className="h-4 w-4" />
            Export Users
          </Button>
        </div>
      </div>

      {/* Users table */}
      <UserTable users={filteredUsers} onDelete={handleDeleteUser} />

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
