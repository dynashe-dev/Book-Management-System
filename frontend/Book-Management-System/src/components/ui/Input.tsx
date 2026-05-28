import React from 'react';
import { cn } from '@/utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className, ...props }, ref) => {
    const hasIcon = Boolean(icon);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text mb-2">
            {label}
            {props.required && <span className="text-red-500"> *</span>}
          </label>
        )}
        <div className="relative">
          {hasIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-2xl border border-border bg-surface px-4 py-3 text-text placeholder:text-muted transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent-500',
              hasIcon ? 'pl-12' : '',
              error ? 'border-red-500 bg-red-50' : '',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="mt-2 text-sm text-muted">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
