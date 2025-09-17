import { cloneElement, isValidElement } from 'react';
import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

import type { RevealOptions } from '../managers/AnimationManager';
import { useReveal } from '../hooks/useReveal';

type RevealChild = ReactElement<{ className?: string }>;

interface RevealProps {
  id: string;
  options?: RevealOptions;
  className?: string;
  children: RevealChild;
}

export const Reveal: React.FC<RevealProps> = ({ id, options, className, children }) => {
  const { ref, visible } = useReveal(id, options);

  if (!isValidElement(children)) {
    throw new Error('Reveal expects a single React element child');
  }

  const mergedChild = cloneElement(children, {
    className: twMerge(children.props.className, className)
  });

  return (
    <div ref={ref} className={twMerge('fade-up', visible ? 'is-visible' : '')}>
      {mergedChild}
    </div>
  );
};
