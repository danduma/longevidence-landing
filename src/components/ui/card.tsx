import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      'card-surface glass-border relative overflow-hidden flex flex-col h-full transition-transform duration-500 hover:-translate-y-1 hover:shadow-glass',
      className
    )}
    {...props}
  />
));

Card.displayName = 'Card';
