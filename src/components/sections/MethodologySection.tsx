import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import { useTranslation } from '../../i18n';

import type { MethodologyStep, SectionCopy } from '../../managers/LandingContentManager';
import { Reveal } from '../Reveal';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { useReveal } from '../../hooks/useReveal';

const iconLibrary = Icons as unknown as Record<string, LucideIcon>;

interface MethodologySectionProps {
  steps: MethodologyStep[];
  copy: SectionCopy['methodology'];
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ steps, copy }) => {
  const { t } = useTranslation();

  const headingReveal = useReveal('methodology-heading', { threshold: 0.3, rootMargin: '-10% 0px' });
  const gridReveal = useReveal('methodology-grid', { threshold: 0.25, rootMargin: '-10% 0px' });

  return (
    <section className="section-shell surface-accent overflow-hidden">
      <div className="section-container vertical-stack gap-12">
        <div
          ref={headingReveal.ref}
          className={`vertical-stack gap-4 fade-up ${headingReveal.visible ? 'is-visible' : ''}`}
        >
          <Badge className="w-fit bg-accent/15 text-accent">
            {t('methodology.accent', {}, copy.accent)}
          </Badge>
          <div className="vertical-stack gap-3">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {t('methodology.title', {}, copy.title)}
            </h2>
            <p className="max-w-2xl text-base text-muted/90">
              {t('methodology.subtitle', {}, copy.subtitle)}
            </p>
          </div>
        </div>
        <div
          ref={gridReveal.ref}
          className={`grid grid-cols-1 gap-6 md:grid-cols-3 fade-up ${gridReveal.visible ? 'is-visible' : ''}`}
        >
          {steps.map((step) => {
            const IconComponent = iconLibrary[step.icon] ?? HelpCircle;

            return (
              <Reveal
                key={step.id}
                id={`methodology-${step.id}`}
                options={{ threshold: 0.25, rootMargin: '-10% 0px' }}
              >
                <Card className="p-6 section-outline-card">
                  <div className="vertical-stack gap-4">
                    <span className="icon-pill">
                      <IconComponent className="h-6 w-6" />
                    </span>
                    <div className="vertical-stack gap-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {t(`methodology.items.${step.id}.title`, {}, step.title)}
                      </h3>
                      <p className="text-sm text-muted/90">
                        {t(`methodology.items.${step.id}.description`, {}, step.description)}
                      </p>
                    </div>
                    <div className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      {t(`methodology.items.${step.id}.metric`, {}, step.metric)}
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
