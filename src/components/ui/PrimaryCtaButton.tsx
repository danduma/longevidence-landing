import { useMemo } from 'react';

import { useManagerState } from '../../hooks/useManagerState';
import { LandingContentManager } from '../../managers/LandingContentManager';
import { Button } from './button';

type PrimaryCtaButtonProps = {
  label: string;
  className?: string;
};

const buildClassName = (base: string, extra?: string): string => {
  if (!extra || extra.trim().length === 0) {
    return base;
  }
  return `${base} ${extra}`;
};

const resolveTargetUrl = (routing: ReturnType<typeof LandingContentManager.getRoutingMapping>): string => {
  const fallback = `https://${routing.appDomain}`;
  if (typeof window === 'undefined') {
    return fallback;
  }
  const host = window.location.hostname;
  if (host.endsWith(routing.alternateDomain)) {
    return `https://${routing.targetDomain}`;
  }
  return `https://${routing.appDomain}`;
};

export const PrimaryCtaButton: React.FC<PrimaryCtaButtonProps> = ({ label, className }) => {
  const routing = useManagerState(LandingContentManager, () => LandingContentManager.getRoutingMapping());

  const targetUrl = useMemo(() => resolveTargetUrl(routing), [routing]);
  const computedClassName = useMemo(() => buildClassName('hero-cta-button', className), [className]);

  return (
    <span className="hero-cta-shadow-wrapper">
      <Button asChild className={computedClassName}>
        <a href={targetUrl}>{label}</a>
      </Button>
    </span>
  );
};
