import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
}

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    'gradient-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-accent/70',
  ghost:
    'bg-transparent text-foreground border border-transparent hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-accent/50'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ asChild = false, className, variant = 'primary', ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      className={twMerge(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-transform duration-300 ease-out hover:-translate-y-0.5',
        variantClassMap[variant],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';
