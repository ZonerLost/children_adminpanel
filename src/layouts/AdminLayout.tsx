import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Globe2, MessageCircle, Linkedin, Youtube } from "lucide-react";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface-light text-slate-900 dark:bg-surface-dark dark:text-slate-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex min-h-screen flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-surface-lightMuted px-6 py-6 text-slate-900 dark:bg-surface-dark dark:text-slate-100">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-slate-200 bg-surface-light px-6 py-3 text-[11px] text-slate-500 dark:border-white/10 dark:bg-surface-dark dark:text-slate-400">
          {/* Left links */}
          <div className="flex items-center gap-6">
            <button className="hover:text-slate-700 dark:hover:text-slate-200">
              Company
            </button>
            <button className="hover:text-slate-700 dark:hover:text-slate-200">
              Resources
            </button>
            <button className="hover:text-slate-700 dark:hover:text-slate-200">
              Legal
            </button>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button className="hover:text-brand-purple">
              <Globe2 className="h-4 w-4" />
            </button>
            <button className="hover:text-brand-purple">
              <MessageCircle className="h-4 w-4" />
            </button>
            <button className="hover:text-brand-purple">
              <Linkedin className="h-4 w-4" />
            </button>
            <button className="hover:text-brand-purple">
              <Youtube className="h-4 w-4" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
