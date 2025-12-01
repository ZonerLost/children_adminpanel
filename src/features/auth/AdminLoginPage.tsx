import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../shared/hooks/useTheme";
import lightLogo from "../../assets/icons/lightLogo.png";
import darkLogo from "../../assets/icons/darkLogo.png";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? darkLogo : lightLogo;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log("Login", { email, password });
      navigate("/admin/users");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-lightMuted px-4 text-slate-900 dark:bg-[#0B0217] dark:text-slate-100">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-surface-light px-8 py-10 text-center shadow-xl dark:border-purple-900/60 dark:bg-[#190928]">
        {/* Logo mark */}
        <div className="mb-6 flex justify-center">
          <img src={logoSrc} alt="Xego Admin" className="h-10 w-auto" />
        </div>

        {/* Heading */}
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          {" "}
          Admin Login
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
          Access your EduManage administration panel
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
          {/* Email */}
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-lime-400 focus:bg-white focus:ring-2 focus:ring-lime-300/70 dark:border-purple-900/60 dark:bg-[#120322] dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-brand-purple dark:focus:ring-brand-purple/60"
              placeholder="admin@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-lime-400 focus:bg-white focus:ring-2 focus:ring-lime-300/70 dark:border-purple-900/60 dark:bg-[#120322] dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-brand-purple dark:focus:ring-brand-purple/60"
              placeholder="••••••••"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-lime-400 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-lime-400/90 focus:outline-none focus:ring-2 focus:ring-lime-300/70 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#610f90] dark:text-white dark:hover:bg-[#610f90] dark:focus:ring-brand-purple/60"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer link */}
        <button
          type="button"
          className="mt-6 text-[11px] font-medium text-slate-500 underline-offset-2 hover:text-slate-700 hover:underline dark:text-slate-400 dark:hover:text-slate-200"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
