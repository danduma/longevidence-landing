import { useCallback, useRef } from 'react';
import type { RevealOptions } from '../managers/AnimationManager';
import { AnimationManager } from '../managers/AnimationManager';
import { useManagerState } from './useManagerState';

export const useReveal = (id: string, options?: RevealOptions) => {
  const threshold = options?.threshold ?? 0.25;
  const rootMargin = options?.rootMargin ?? '0px';
  const once = options?.once ?? true;

  const visible = useManagerState(AnimationManager, () => AnimationManager.isVisible(id));
  const cleanupRef = useRef<() => void>();

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = undefined;
      }

      if (node) {
        cleanupRef.current = AnimationManager.observe(id, node, { threshold, rootMargin, once });
      }
    },
    [id, once, rootMargin, threshold]
  );

  return {
    ref: setRef,
    visible
  };
};
