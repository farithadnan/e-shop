/**
 * ErrorMessage Component - Display error messages
 * 
 * Props:
 * - message: Error message to display
 * - retry: Optional retry callback
 */

interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="mt-2 text-sm text-red-700">{message}</p>
            {retry && (
              <button
                onClick={retry}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
