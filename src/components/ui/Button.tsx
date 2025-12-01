import type { ButtonHTMLAttributes } from "react";
import { classNames } from "../../shared/utils/classNames";
import { forwardRef } from "react";
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  pill?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "primary", pill, ...rest }, ref) => {
    const base =
      "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

    const styles: Record<ButtonVariant, string> = {
      primary: [
        // light: lime
        "bg-[#a4de02] text-slate-900 hover:bg-[#92c902] focus:ring-[#a4de02]",
        // dark: purple
        "dark:bg-[#610f90] dark:hover:bg-[#610f90]/90 dark:text-white dark:focus:ring-[#610f90]",
      ].join(" "),
      secondary: [
        "bg-surface-lightMuted text-slate-900 hover:bg-surface-light",
        "dark:bg-surface-darkElevated dark:text-slate-100 dark:hover:bg-surface-dark",
      ].join(" "),
      ghost:
        "bg-transparent text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-white/10",
      danger: [
        "bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500",
        "dark:bg-rose-500 dark:hover:bg-rose-600 dark:text-white dark:focus:ring-rose-500",
      ].join(" "),
    };

    return (
      <button
        ref={ref}
        className={classNames(
          base,
          styles[variant],
          pill ? "rounded-pill" : "rounded-lg",
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
