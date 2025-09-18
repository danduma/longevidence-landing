import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface HeroShowcaseCardProps extends React.HTMLAttributes<HTMLDivElement> {}

// Hero-specific surface tuned for the animated carousel area
export const HeroShowcaseCard = forwardRef<HTMLDivElement, HeroShowcaseCardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      'relative overflow-hidden flex flex-col h-full hero-highlight-card card-surface glass-border',
      className
    )}
    {...props}
  />
));

HeroShowcaseCard.displayName = 'HeroShowcaseCard';


