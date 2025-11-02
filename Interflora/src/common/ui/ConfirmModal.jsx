import ReactDOM from "react-dom";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <>
      {/* 🔹 Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* 🔹 Modal container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96">
          {/* Header */}
          <div className="flex justify-between items-center border-b px-4 py-2">
            <h5 className="text-lg font-semibold text-gray-800">
              Confirm Action
            </h5>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              &times;
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-4 text-gray-700">
            <p>{message}</p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t px-4 py-3">
            <button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded"
            >
              OK
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal-root")
  );
};

export default ConfirmModal;
