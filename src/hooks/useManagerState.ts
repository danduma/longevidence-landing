import { useCallback, useRef, useSyncExternalStore } from 'react';
import type { BaseManager } from '../managers/BaseManager';

function shallowEqual<T>(a: T, b: T): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => item === b[index]);
  }
  return false;
}

export const useManagerState = <T>(
  manager: BaseManager,
  selector: () => T
): T => {
  const subscribe = useCallback(
    (listener: () => void) => manager.subscribe(listener),
    [manager]
  );

  const cachedSnapshot = useRef<T>();
  const getSnapshot = useCallback(() => {
    const newSnapshot = selector();

    // Return cached version if data hasn't changed
    if (cachedSnapshot.current !== undefined && shallowEqual(cachedSnapshot.current, newSnapshot)) {
      return cachedSnapshot.current;
    }

    cachedSnapshot.current = newSnapshot;
    return newSnapshot;
  }, [selector]);

  return useSyncExternalStore(subscribe, getSnapshot);
};
