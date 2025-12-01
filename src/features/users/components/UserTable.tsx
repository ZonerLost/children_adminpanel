import { Pencil, Trash2 } from "lucide-react";
import Avatar from "../../../components/ui/Avatar";
import type { User, UserStatus } from "../types";

interface UserTableProps {
  users: User[];
  onDelete: (user: User) => void;
  onEdit?: (user: User) => void;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const RoleBadge = ({ role }: { role: User["role"] }) => {
  return (
    <span className="inline-flex items-center rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-0.5 text-[11px] font-medium text-purple-700 dark:border-purple-400/40 dark:bg-purple-500/15 dark:text-purple-100">
      {role}
    </span>
  );
};

const StatusBadge = ({ status }: { status: UserStatus }) => {
  const base =
    "inline-flex items-center rounded-full border px-3 py-0.5 text-[11px] font-medium";
  if (status === "Active") {
    return (
      <span
        className={`${base} border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-200`}
      >
        Active
      </span>
    );
  }
  if (status === "Pending") {
    return (
      <span
        className={`${base} border-amber-500/40 bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-200`}
      >
        Pending
      </span>
    );
  }
  return (
    <span
      className={`${base} border-rose-500/40 bg-rose-500/10 text-rose-600 dark:bg-rose-500/15 dark:text-rose-200`}
    >
      Inactive
    </span>
  );
};

const UserTable = ({ users, onDelete, onEdit }: UserTableProps) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-surface-light shadow-sm dark:border-white/10 dark:bg-surface-darkElevated">
      {/* Card header */}
      <div className="border-b border-slate-200 px-6 py-4 dark:border-white/10">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          All Users
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          A comprehensive list of all users and their assigned roles within the
          EduManage platform.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 dark:bg-white/5 dark:text-slate-300">
            <tr>
              <th className="w-10 px-6 py-3">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border-slate-300"
                />
              </th>
              <th className="px-3 py-3 font-semibold">User</th>
              <th className="px-3 py-3 font-semibold">Email</th>
              <th className="px-3 py-3 font-semibold">Role</th>
              <th className="px-3 py-3 font-semibold">Status</th>
              <th className="px-3 py-3 font-semibold">Last Activity</th>
              <th className="px-3 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-slate-100 bg-white hover:bg-slate-50 dark:border-white/5 dark:bg-transparent dark:hover:bg-white/5"
              >
                <td className="px-6 py-3 align-middle">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-slate-300"
                  />
                </td>
                <td className="px-3 py-3 align-middle">
                  <div className="flex items-center gap-3">
                    <Avatar
                      initials={getInitials(user.name)}
                      src={user.avatarUrl}
                    />
                    <span className="text-xs font-medium text-slate-900 dark:text-slate-50">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3 align-middle text-xs text-slate-700 dark:text-slate-200">
                  {user.email}
                </td>
                <td className="px-3 py-3 align-middle">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-3 py-3 align-middle">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-3 py-3 align-middle text-xs text-slate-600 dark:text-slate-300">
                  {user.lastActivity}
                </td>
                <td className="px-3 py-3 align-middle">
                  <div className="flex justify-end gap-3 text-slate-500 dark:text-slate-300">
                    <button
                      type="button"
                      className="hover:text-emerald-500"
                      onClick={() => onEdit?.(user)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      className="hover:text-rose-500"
                      onClick={() => onDelete(user)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-xs text-slate-500 dark:text-slate-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer (static demo) */}
      <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 text-[11px] text-slate-500 dark:border-white/10 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <button className="cursor-not-allowed text-slate-400 dark:text-slate-600">
            &lt; Previous
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white dark:bg-white dark:text-slate-900">
            1
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="cursor-not-allowed text-slate-400 dark:text-slate-600">
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
