import {
  Users,
  Layers3,
  LineChart,
  GraduationCap,
  Coins,
  Wrench,
  BookOpenCheck,
} from "lucide-react";

export type NavItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const navItems: NavItem[] = [
  { label: "User & Role Management", path: "/admin/users", icon: Users },
  { label: "Content Management", path: "/admin/content", icon: Layers3 },
  { label: "Analytics & Reporting", path: "/admin/analytics", icon: LineChart },
  {
    label: "Classroom & Assignment Tools",
    path: "/admin/classroom",
    icon: GraduationCap,
  },
  {
    label: "Coin Economy & Rewards",
    path: "/admin/coins",
    icon: Coins,
  },
  { label: "System Controls", path: "/admin/system", icon: Wrench },
  {
    label: "Creative Book Builder",
    path: "/admin/books",
    icon: BookOpenCheck,
  },
];
