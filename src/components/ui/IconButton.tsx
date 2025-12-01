import type { ButtonHTMLAttributes } from "react";
import { classNames } from "../../shared/utils/classNames";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({ className, ...rest }: Props) => (
  <button
    className={classNames(
      "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-transparent text-slate-300 hover:bg-white/10 transition",
      className
    )}
    {...rest}
  />
);

export default IconButton;
