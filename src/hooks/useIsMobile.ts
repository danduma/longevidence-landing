import { useEffect, useState } from 'react';
import { useIsClient } from './useIsClient';

const MOBILE_QUERY = '(max-width: 768px)';

export const useIsMobile = (): boolean => {
  const isClient = useIsClient();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!isClient) {
      setIsMobile(false);
      return;
    }

    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const updateState = () => setIsMobile(mediaQuery.matches);

    updateState();
    mediaQuery.addEventListener('change', updateState);

    return () => mediaQuery.removeEventListener('change', updateState);
  }, [isClient]);

  return isMobile;
};
