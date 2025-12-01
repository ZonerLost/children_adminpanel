import Modal from "./Modal";
import Button from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  tone?: "default" | "danger"; // 👈 new
}

const ConfirmDialog = ({
  isOpen,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
  tone = "default",
}: ConfirmDialogProps) => {
  const confirmVariant = tone === "danger" ? "danger" : "primary";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      size="sm"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmLabel}
          </Button>
        </>
      }
    >
      {description && (
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {description}
        </p>
      )}
    </Modal>
  );
};

export default ConfirmDialog;
