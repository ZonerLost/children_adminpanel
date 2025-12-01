import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import type { CreateUserInput } from "../types";
import type { UserRole } from "../types";
import type { UserStatus } from "../types";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserInput) => void;
}

const roles: UserRole[] = ["System Admin", "School Admin", "Teacher", "Parent"];

const statuses: UserStatus[] = ["Active", "Pending", "Inactive"];

const defaultForm: CreateUserInput = {
  name: "",
  email: "",
  role: "Teacher",
  status: "Active",
};

const AddUserModal = ({ isOpen, onClose, onSubmit }: AddUserModalProps) => {
  const [form, setForm] = useState<CreateUserInput>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(defaultForm);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleChange = (field: keyof CreateUserInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setIsSubmitting(true);
    onSubmit(form);
    // parent closes the modal; keep this simple
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New User"
      size="md"
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
            form="add-user-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add User"}
          </Button>
        </>
      }
    >
      <form id="add-user-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Alice Johnson"
              className="w-full rounded-lg border border-slate-300 bg-surface-light px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple dark:border-white/10 dark:bg-surface-dark dark:text-slate-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="user@example.com"
              className="w-full rounded-lg border border-slate-300 bg-surface-light px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple dark:border-white/10 dark:bg-surface-dark dark:text-slate-50"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-surface-light px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple dark:border-white/10 dark:bg-surface-dark dark:text-slate-50"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-surface-light px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple dark:border-white/10 dark:bg-surface-dark dark:text-slate-50"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;
