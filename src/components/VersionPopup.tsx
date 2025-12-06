interface VersionPopupProps {
  onClose: () => void;
}

export default function VersionPopup({ onClose }: VersionPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Update Required</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">
            A new version of the study planner is available. Please <strong>refresh your browser</strong> to get the latest updates.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-800">
              <strong>💡 Best Experience:</strong> This app works best on iPad or laptop for optimal viewing and interaction.
            </p>
          </div>
          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500 text-center">
              by Mohammed Amjad
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
        >
          Got it, I'll refresh
        </button>
      </div>
    </div>
  );
}

