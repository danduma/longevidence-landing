import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslation } from '../../i18n';

import type { AudienceSegment } from '../../managers/LandingContentManager';
import { Reveal } from '../Reveal';
import { Card } from '../ui/card';
import { useReveal } from '../../hooks/useReveal';

const getIcon = (name: string): LucideIcon => {
  const map = Icons as unknown as Record<string, LucideIcon>;
  return (map[name] ?? (Icons as unknown as { Users: LucideIcon }).Users) as LucideIcon;
};

interface AudienceSectionProps {
  audience: AudienceSegment[];
}

export const AudienceSection: React.FC<AudienceSectionProps> = ({ audience }) => {
  const { t } = useTranslation();

  const headingReveal = useReveal('audience-heading', { threshold: 0.3, rootMargin: '-10% 0px' });
  const gridReveal = useReveal('audience-grid', { threshold: 0.25, rootMargin: '-10% 0px' });

  return (
    <section className="section-shell overflow-hidden">
      <div className="section-container vertical-stack gap-12">
        <div
          ref={headingReveal.ref}
          className={`vertical-stack gap-4 fade-up ${headingReveal.visible ? 'is-visible' : ''}`}
        >
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            {t('audience.title', {}, 'Built for Every Researcher')}
          </h2>
          <p className="max-w-2xl text-base text-muted/90">
            {t('audience.subtitle', {}, 'Tailored solutions for different research needs and workflows')}
          </p>
        </div>
        <div
          ref={gridReveal.ref}
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 fade-up ${gridReveal.visible ? 'is-visible' : ''}`}
        >
          {audience.map((segment) => {
            const IconComponent = getIcon(segment.icon);

            return (
              <Reveal
                key={segment.id}
                id={`audience-${segment.id}`}
                options={{ threshold: 0.25, rootMargin: '-10% 0px' }}
              >
                <Card className="p-6 section-outline-card">
                  <div className="vertical-stack gap-4">
                    <span className="icon-pill">
                      <IconComponent className="h-6 w-6" />
                    </span>
                    <div className="vertical-stack gap-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {t(`audience.items.${segment.id}.name`, {}, segment.name)}
                      </h3>
                      <p className="text-sm text-muted/90">
                        {t(
                          `audience.items.${segment.id}.description`,
                          {},
                          segment.description
                        )}
                      </p>
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
