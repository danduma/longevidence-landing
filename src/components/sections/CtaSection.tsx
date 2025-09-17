import { useTranslation } from '../../i18n';
import type { CtaContent, RoutingMapping } from '../../managers/LandingContentManager';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useReveal } from '../../hooks/useReveal';

interface CtaSectionProps {
  cta: CtaContent;
  routing: RoutingMapping;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ cta, routing }) => {
  const { t } = useTranslation();
  const targetUrl = `https://${routing.targetDomain}`;

  const ctaReveal = useReveal('cta-block', { threshold: 0.2, rootMargin: '-10% 0px' });

  return (
    <section className="section-shell overflow-hidden">
      <div className="section-container">
        <Card
          ref={ctaReveal.ref}
          className={`p-10 text-center glass-border section-outline-card fade-up ${ctaReveal.visible ? 'is-visible' : ''}`}
        >
          <div className="vertical-stack items-center gap-6">
            <div className="vertical-stack gap-3 max-w-2xl">
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
                {t('cta.title', {}, cta.headline)}
              </h2>
              <p className="text-base text-muted/90">
                {t('cta.subtitle', {}, cta.subhead)}
              </p>
            </div>
            <Button className="px-10" asChild>
              <a href={targetUrl} target="_blank" rel="noreferrer noopener">
                {t('cta.button', {}, cta.buttonLabel)}
              </a>
            </Button>
            <div className="mx-auto h-px w-24 bg-accent/40" aria-hidden />
            <p className="text-xs uppercase tracking-[0.2em] text-muted/70">
              {t('cta.socialProof', {}, cta.socialProof)}
            </p>
            <div className="text-xs text-muted/60">
              {t('cta.routingNotice', {}, 'Research Platform • Academic Tools • Evidence Synthesis')}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
