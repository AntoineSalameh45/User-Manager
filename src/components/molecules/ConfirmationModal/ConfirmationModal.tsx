import ReactDOM from "react-dom";
import { memo, useState } from "react";
import { iConfirmationModalProps } from "./ConfirmationModal.type";
import { CustomButton } from "../../atoms/CustomButton";
import { Spinner } from "../../atoms/Spinner";

const ConfirmationModal = memo(({ isOpen, onCancel, onConfirm, title, description }: iConfirmationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
      onCancel();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-[#000000aa] flex items-center justify-center z-50">
      <div className="bg-cardbg dark:bg-cardbg-dark p-6 rounded-2xl shadow-2xl max-w-md w-full relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Spinner />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-txt dark:text-txt-dark text-center mb-4">
              {title}
            </h2>
            <p className="text-txt dark:text-txt-dark text-center mb-6">{description}</p>
            <div className="flex justify-center gap-4">
              <CustomButton
                text="Cancel"
                bgColor="bg-primary"
                textColor="text-white"
                hoverBgColor="hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary border border-transparent hover:border-btn"
                onClick={onCancel}
              />
              <CustomButton
                text="Delete"
                bgColor="bg-red-500"
                textColor="text-white"
                hoverBgColor="hover:bg-red-700 border border-transparent dark:hover:border-white"
                onClick={handleConfirm}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById("modal-root")!);
});

export default ConfirmationModal;
