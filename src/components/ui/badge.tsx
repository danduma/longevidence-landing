import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      'inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent',
      className
    )}
    {...props}
  />
));

Badge.displayName = 'Badge';
