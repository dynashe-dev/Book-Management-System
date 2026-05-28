import React from 'react';
import { cn } from '@/utils/helpers';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('animate-pulse bg-secondary-100 rounded-2xl', className)}
      {...props}
    />
  );
};

export const TableRowSkeleton: React.FC<{ columns: number }> = ({ columns }) => {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm">
      <Skeleton className="h-6 w-1/3 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
};
