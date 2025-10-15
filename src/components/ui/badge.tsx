import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'subtle';

const baseBadgeClasses = 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

const badgeVariantClasses: Record<BadgeVariant, string> = {
  default: 'border-transparent bg-accent text-white shadow',
  secondary: 'border-transparent bg-muted text-muted-foreground',
  outline: 'border-foreground/20 bg-transparent text-foreground',
  subtle: 'border-transparent bg-foreground/5 text-muted/90'
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(({ className, variant = 'default', ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(baseBadgeClasses, badgeVariantClasses[variant], className)}
    {...props}
  />
));

Badge.displayName = 'Badge';
