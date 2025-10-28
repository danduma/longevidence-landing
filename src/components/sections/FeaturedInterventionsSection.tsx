import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslation } from '../../i18n';

import type { FeaturedIntervention } from '../../managers/LandingContentManager';
import { Reveal } from '../Reveal';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { useReveal } from '../../hooks/useReveal';

const getIcon = (name: string): LucideIcon => {
  const map = Icons as unknown as Record<string, LucideIcon>;
  return (map[name] ?? (Icons as unknown as { Beaker: LucideIcon }).Beaker) as LucideIcon;
};

interface FeaturedInterventionsSectionProps {
  interventions: FeaturedIntervention[];
}

export const FeaturedInterventionsSection: React.FC<FeaturedInterventionsSectionProps> = ({ interventions }) => {
  const { t } = useTranslation();

  const headingReveal = useReveal('interventions-heading', { threshold: 0.3, rootMargin: '-10% 0px' });
  const gridReveal = useReveal('interventions-grid', { threshold: 0.25, rootMargin: '-10% 0px' });

  return (
    <section className="section-shell surface-accent overflow-hidden">
      <div className="section-container vertical-stack gap-1">
        <div
          ref={headingReveal.ref}
          className={`vertical-stack gap-4 fade-up ${headingReveal.visible ? 'is-visible' : ''}`}
        >
          <Badge className="w-fit">
            {t('interventions.accent', {}, 'Solutions')}
          </Badge>
          <div className="vertical-stack gap-3">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {t('interventions.title', {}, 'Featured Pages')}
            </h2>
            <p className="max-w-2xl text-base text-muted/90">
              {t('interventions.subtitle', {}, 'Powerful tools designed for modern research workflows')}
            </p>
          </div>
        </div>
        <div
          ref={gridReveal.ref}
          className={`grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 fade-up ${gridReveal.visible ? 'is-visible' : ''}`}
        >
          {interventions.map((intervention) => {
            const IconComponent = getIcon(intervention.icon);

            return (
              <Reveal
                key={intervention.id}
                id={`intervention-${intervention.id}`}
                options={{ threshold: 0.3, rootMargin: '-10% 0px' }}
              >
                <Card className="p-6 section-outline-card">
                  <div className="vertical-stack gap-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="icon-pill icon-pill--lg">
                          <IconComponent className="h-6 w-6" />
                        </span>
                        <div className="vertical-stack gap-1">
                          <h3 className="text-xl font-semibold text-accent">
                            {t(`interventions.items.${intervention.id}.name`, {}, intervention.name)}
                          </h3>
                          <p className="text-sm text-muted/90">
                            {t(
                              `interventions.items.${intervention.id}.summary`,
                              {},
                              intervention.summary
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 rounded-3xl border border-accent/15 bg-accent/10 px-4 py-3 text-sm font-medium text-foreground/90 shadow-inner">
                      <div className="vertical-stack gap-1">
                        <span className="text-xs uppercase tracking-[0.2em] text-muted/70">
                          {t('interventions.evidenceLevelLabel', {}, 'Evidence Level')}
                        </span>
                        <span className="text-base">
                          {t(
                            `interventions.items.${intervention.id}.evidenceLevel`,
                            {},
                            intervention.evidenceLevel
                          )}
                        </span>
                      </div>
                      <div className="vertical-stack gap-1">
                        <span className="text-xs uppercase tracking-[0.2em] text-muted/70">
                          {t('interventions.safetyRatingLabel', {}, 'Safety Rating')}
                        </span>
                        <span className="text-base">
                          {t(
                            `interventions.items.${intervention.id}.safetyRating`,
                            {},
                            intervention.safetyRating
                          )}
                        </span>
                      </div>
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
