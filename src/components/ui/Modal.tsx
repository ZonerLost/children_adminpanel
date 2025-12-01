import type { ReactNode } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { classNames } from "../../shared/utils/classNames";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  hideCloseButton?: boolean;
}

const sizeMap: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  hideCloseButton = false,
}: ModalProps) => {
  if (!isOpen) return null;

  // ESC to close
  useEffect(() => {
    const handler = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const content = (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div
        className={classNames(
          "relative z-50 w-full rounded-2xl border border-slate-200 bg-surface-light p-5 shadow-xl transition-transform duration-150 ease-out dark:border-white/10 dark:bg-surface-darkElevated",
          sizeMap[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          {title && (
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {title}
            </h2>
          )}
          {!hideCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="text-sm text-slate-700 dark:text-slate-200">
          {children}
        </div>

        {footer && (
          <div className="mt-6 flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Optional <div id="modal-root" /> in index.html, else fall back to body
  const target = document.getElementById("modal-root") ?? document.body;
  return ReactDOM.createPortal(content, target);
};

export default Modal;
