import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { navItems } from "../../shared/constants/navigation";
import { classNames } from "../../shared/utils/classNames";
import { useTheme } from "../../shared/hooks/useTheme";
import lightLogo from "../../assets/icons/lightLogo.png";
import darkLogo from "../../assets/icons/darkLogo.png";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? darkLogo : lightLogo;

  return (
    <>
      <div
        className={classNames(
          "fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <aside
        className={classNames(
          "fixed inset-y-0 left-0 z-40 w-64 flex flex-col shadow-xl transition-transform duration-300",
          "bg-surface-light text-slate-700 border-r border-slate-200",
          "dark:bg-surface-dark dark:text-slate-200 dark:border-[#2b124e]",
          open ? "translate-x-0" : "-translate-x-full",
          "md:static md:translate-x-0 md:flex"
        )}
      >
        {/* Logo section */}
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <img src={logoSrc} alt="Xego Admin" className="h-7 w-auto" />
            <span className="text-xl font-bold text-[#20c303] dark:text-[#b76cff]">
              Admin Dashboard
            </span>
          </div>
          <button
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-white/10"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  classNames(
                    "group relative mb-1 flex items-center gap-3 rounded-full px-3 py-2 text-sm",
                    "transition-all duration-200 ease-out",
                    "text-slate-600 hover:-translate-x-0.5 hover:bg-slate-100/80 hover:shadow-sm",
                    "dark:text-slate-200 dark:hover:-translate-x-0.5 dark:hover:bg-white/5 dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
                    isActive &&
                      "bg-lime-400 text-slate-900 shadow-md hover:bg-lime-400/90 dark:bg-brand-purple dark:text-white dark:hover:bg-brand-purple"
                  )
                }
                onClick={onClose}
              >
                <Icon className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                <span className="truncate text-xs transition-colors duration-200 group-hover:text-slate-900 dark:group-hover:text-white">
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 px-4 py-3 text-[11px] text-slate-500 dark:border-white/10 dark:text-slate-500">
          Company ƒ?› Version 1.0
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
