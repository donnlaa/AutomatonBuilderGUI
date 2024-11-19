
import { ClosableModalWindow } from './ModalWindow';
import { createPortal } from 'react-dom';

const ConfirmationDialog: React.FC<{
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}> = ({ isVisible, onConfirm, onCancel, message }) => {
  if (!isVisible) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <p className="mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onCancel}
          >
            No!!!
          </button>
        </div>
      </div>
    </div>,
    document.body // Render directly to the body
  );
};
  
  export default ConfirmationDialog;
  