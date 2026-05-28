import React from 'react';
import { cn } from '@/utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-2xl border border-transparent font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-sm',
      secondary: 'bg-surface text-primary-700 hover:bg-secondary-100 focus:ring-accent-200 border border-border',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
      ghost: 'text-primary-700 hover:bg-secondary-100 focus:ring-accent-200',
    };

    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-5 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? 'Loading...' : props.children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
