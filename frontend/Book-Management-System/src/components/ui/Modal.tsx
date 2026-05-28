import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 py-6 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        <div className="relative inline-block w-full max-w-xl transform overflow-hidden rounded-[1.75rem] border border-border bg-surface text-left shadow-xl transition-all animate-fade-in">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-text">{title}</h3>
            <button
              onClick={onClose}
              className="text-muted hover:text-text transition"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-6 py-5">{children}</div>

          {footer && <div className="px-6 py-4 bg-background border-t border-border">{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
