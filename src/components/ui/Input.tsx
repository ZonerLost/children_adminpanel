import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { classNames } from "../../shared/utils/classNames";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>(({ className, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      className={classNames(
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent",
        "dark:bg-surface-darkElevated dark:border-white/10 dark:text-slate-100 dark:placeholder:text-slate-500",
        className
      )}
      {...rest}
    />
  );
});

export default Input;
