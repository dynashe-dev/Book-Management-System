import React from 'react';
import { BookOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, action }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] rounded-3xl border border-border bg-surface p-10 text-center shadow-sm">
      <BookOpen className="w-14 h-14 text-accent-500 mb-4" />
      <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
      <p className="text-muted max-w-md mb-6">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-5 py-3 bg-accent-500 text-white rounded-2xl hover:bg-accent-600 transition"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
