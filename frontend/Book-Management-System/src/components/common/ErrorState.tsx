import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ title, message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] rounded-3xl border border-border bg-surface p-10 text-center shadow-sm">
      <AlertCircle className="w-14 h-14 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
      <p className="text-muted max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-3 bg-accent-500 text-white rounded-2xl hover:bg-accent-600 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
