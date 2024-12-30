interface ErrorModalProps {
  closeErrorModal: () => void;
  deletionText: string;
}

const ErrorModal = ({ closeErrorModal, deletionText }: ErrorModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {deletionText}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{deletionText}</p>
        <button
          onClick={() => closeErrorModal()}
          className="mt-4 w-full bg-blue-500 dark:bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
