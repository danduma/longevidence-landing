import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '../../i18n';

import { useManagerState } from '../../hooks/useManagerState';
import { useReveal } from '../../hooks/useReveal';
import { ContentMapManager } from '../../managers/ContentMapManager';
import { LandingContentManager } from '../../managers/LandingContentManager';
import { Badge } from '../ui/badge';
import { useIsMobile } from '../../hooks/useIsMobile';

const resolveIcon = (icon: string): LucideIcon => {
  const iconMap = Icons as unknown as Record<string, LucideIcon>;
  return (iconMap[icon] ?? (Icons as unknown as { Target: LucideIcon }).Target) as LucideIcon;
};

export const ContentMapSection: React.FC = () => {
  const { t } = useTranslation();
  const categories = useManagerState(ContentMapManager, () => ContentMapManager.getCategories());
  const copy = useManagerState(LandingContentManager, () => LandingContentManager.getCopy());
  const activeCategoryId = useManagerState(ContentMapManager, () => ContentMapManager.getActiveCategoryId());
  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId) ?? categories[0],
    [categories, activeCategoryId]
  );
  const [expandedId, setExpandedId] = useState<string>(() => activeCategoryId);
  const isMobile = useIsMobile();

  const headingReveal = useReveal('content-map-heading', { threshold: 0.35, rootMargin: '-10% 0px' });
  const contentReveal = useReveal('content-map-content', { threshold: 0.35, rootMargin: '-10% 0px' });

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const fallbackId = activeCategoryId || categories[0]?.id || '';
    if (fallbackId) {
      setExpandedId(fallbackId);
    }
  }, [isMobile, activeCategoryId, categories]);

  if (!activeCategory) {
    return null;
  }

  const handleDesktopHover = (categoryId: string) => {
    if (!isMobile) {
      ContentMapManager.setActiveCategory(categoryId);
    }
  };

  const handleMobileToggle = (categoryId: string) => {
    if (isMobile) {
      setExpandedId(categoryId);
      ContentMapManager.setActiveCategory(categoryId);
    }
  };

  return (
    <section className="section-shell">
      <div className="section-container vertical-stack gap-10">
        <div
          ref={headingReveal.ref}
          className={`vertical-stack gap-4 fade-up ${headingReveal.visible ? 'is-visible' : ''}`}
        >
          <Badge variant="subtle" className="w-fit">
            {t('contentMap.accent', {}, copy.contentMap.accent)}
          </Badge>
          <div className="vertical-stack gap-3">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {t('contentMap.title', {}, copy.contentMap.title)}
            </h2>
            <p className="max-w-2xl text-base text-muted/90">
              {t('contentMap.subtitle', {}, copy.contentMap.subtitle)}
            </p>
          </div>
        </div>

        <div
          ref={contentReveal.ref}
          className={`content-map-shell fade-up ${contentReveal.visible ? 'is-visible' : ''}`}
        >
          {!isMobile && (
            <div className="content-map-layout">
              <div className="content-map-node-grid">
                {categories.map((category) => {
                  const IconComponent = resolveIcon(category.icon);
                  const isActive = category.id === activeCategory.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      className={`content-map-node ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => handleDesktopHover(category.id)}
                      onFocus={() => handleDesktopHover(category.id)}
                      aria-pressed={isActive}
                    >
                      <span className="content-map-node__icon">
                        <IconComponent className="h-6 w-6" />
                      </span>
                      <span className="content-map-node__label">
                        {t(`contentMap.categories.${category.id}.name`, {}, category.name)}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="content-map-detail" aria-live="polite">
                <div className="content-map-detail__header">
                  {(() => {
                    const IconComponent = resolveIcon(activeCategory.icon);
                    return (
                      <span className="content-map-detail__icon">
                        <IconComponent className="h-5 w-5" />
                      </span>
                    );
                  })()}
                  <div className="vertical-stack gap-1">
                    <h3 className="content-map-detail__title">
                      {t(`contentMap.categories.${activeCategory.id}.name`, {}, activeCategory.name)}
                    </h3>
                    <p className="content-map-detail__summary">
                      {t(`contentMap.categories.${activeCategory.id}.summary`, {}, activeCategory.summary)}
                    </p>
                  </div>
                </div>
                <ul className="content-map-detail__list">
                  {activeCategory.interventions.map((intervention) => (
                    <li key={intervention.id} className="content-map-detail__item">
                      {t(`contentMap.categories.${activeCategory.id}.interventions.${intervention.id}`, {}, intervention.label)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {isMobile && (
            <div className="content-map-accordion">
              {categories.map((category) => {
                const IconComponent = resolveIcon(category.icon);
                const isExpanded = expandedId === category.id;

                return (
                  <div key={category.id} className={`content-map-accordion__item ${isExpanded ? 'is-expanded' : ''}`}>
                    <button
                      type="button"
                      className="content-map-accordion__trigger"
                      onClick={() => handleMobileToggle(category.id)}
                    >
                      <span className="content-map-accordion__icon">
                        <IconComponent className="h-5 w-5" />
                      </span>
                      <span className="content-map-accordion__label">
                        {t(`contentMap.categories.${category.id}.name`, {}, category.name)}
                      </span>
                      <span className="content-map-accordion__chevron">
                        <Icons.ChevronDown className="h-5 w-5" />
                      </span>
                    </button>
                    <div className="content-map-accordion__content" hidden={!isExpanded}>
                      <p className="content-map-accordion__summary">
                        {t(`contentMap.categories.${category.id}.summary`, {}, category.summary)}
                      </p>
                      <ul className="content-map-accordion__list">
                        {category.interventions.map((intervention) => (
                          <li key={intervention.id} className="content-map-accordion__item-text">
                            {t(`contentMap.categories.${category.id}.interventions.${intervention.id}`, {}, intervention.label)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
