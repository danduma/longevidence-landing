import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../../i18n';

import { useManagerState } from '../../hooks/useManagerState';
import { useReveal } from '../../hooks/useReveal';
import { ContentMapManager } from '../../managers/ContentMapManager';
import { Badge } from '../ui/badge';
import { useIsMobile } from '../../hooks/useIsMobile';

const resolveIcon = (icon: string): LucideIcon => {
  const iconMap = Icons as unknown as Record<string, LucideIcon>;
  return (iconMap[icon] ?? (Icons as unknown as { Target: LucideIcon }).Target) as LucideIcon;
};

export const ContentMapSection: React.FC = () => {
  const { t } = useTranslation();
  const categories = useManagerState(ContentMapManager, () => ContentMapManager.getCategories());
  const activeCategoryId = useManagerState(ContentMapManager, () => ContentMapManager.getActiveCategoryId());
  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId) ?? categories[0],
    [categories, activeCategoryId]
  );
  const [expandedId, setExpandedId] = useState<string>(() => activeCategoryId);
  const isMobile = useIsMobile();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const headingReveal = useReveal('content-map-heading', { threshold: 0.35, rootMargin: '-10% 0px' });
  const contentReveal = useReveal('content-map-content', { threshold: 0.35, rootMargin: '-10% 0px' });

  const handleTabClick = useCallback((categoryId: string) => {
    ContentMapManager.setActiveCategory(categoryId);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % categories.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = categories.length - 1;
    }

    if (nextIndex !== currentIndex) {
      ContentMapManager.setActiveCategory(categories[nextIndex].id);
      tabsRef.current[nextIndex]?.focus();
    }
  }, [categories]);

  const handleMobileToggle = useCallback((categoryId: string) => {
    const isCurrentlyExpanded = expandedId === categoryId;
    const newExpandedId = isCurrentlyExpanded ? '' : categoryId;
    setExpandedId(newExpandedId);
    if (!isCurrentlyExpanded) {
      ContentMapManager.setActiveCategory(categoryId);
    }
  }, [expandedId]);

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

  return (
    <section className="pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-12 lg:pb-16">
      <div className="section-container vertical-stack gap-6">
        <div
          ref={headingReveal.ref}
          className={`vertical-stack gap-4 fade-up ${headingReveal.visible ? 'is-visible' : ''}`}
        >
          <Badge className="w-fit">
            {t('contentMap.accent', {}, 'Landscape')}
          </Badge>
          <div className="vertical-stack gap-3">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {t('contentMap.title', {}, 'Map of all longevity interventions')}
            </h2>
            <p className="max-w-2xl text-base text-muted/90">
              {t('contentMap.subtitle', {}, 'Explore six domains shaping how interventions evolve from labs to lifestyle')}
            </p>
          </div>
        </div>

        <div
          ref={contentReveal.ref}
          className={`content-map-shell fade-up ${contentReveal.visible ? 'is-visible' : ''}`}
        >
          {!isMobile && (
            <div className="content-map-tabs-layout">
              <div className="content-map-tabs" role="tablist" aria-label="Content categories">
                {categories.map((category, index) => {
                  const IconComponent = resolveIcon(category.icon);
                  const isActive = category.id === activeCategory.id;
                  return (
                    <button
                      key={category.id}
                      ref={(el) => { tabsRef.current[index] = el; }}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`tab-panel-${category.id}`}
                      tabIndex={isActive ? 0 : -1}
                      className={`content-map-tab ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleTabClick(category.id)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    >
                      <span className="content-map-tab__icon">
                        <IconComponent className="h-5 w-5" />
                      </span>
                      <span className="content-map-tab__label">
                        {t(`contentMap.categories.${category.id}.name`, {}, category.name)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                className="content-map-panel"
                role="tabpanel"
                id={`tab-panel-${activeCategory.id}`}
                aria-labelledby={`tab-${activeCategory.id}`}
                tabIndex={0}
              >
                <div className="content-map-interventions">
                  {activeCategory.interventions.map((intervention) => {
                    const InterventionIcon = intervention.icon ? resolveIcon(intervention.icon) : null;
                    const content = (
                      <>
                        {InterventionIcon && (
                          <span className="content-map-intervention__icon">
                            <InterventionIcon className="h-4 w-4" />
                          </span>
                        )}
                        <div className="content-map-intervention__content">
                          <span className="content-map-intervention__label">
                            {t(`contentMap.categories.${activeCategory.id}.interventions.${intervention.id}.label`, {}, intervention.label)}
                          </span>
                          {intervention.subtitle && (
                            <span className="content-map-intervention__subtitle">
                              {t(`contentMap.categories.${activeCategory.id}.interventions.${intervention.id}.subtitle`, {}, intervention.subtitle)}
                            </span>
                          )}
                        </div>
                      </>
                    );

                    return intervention.url ? (
                      <a
                        key={intervention.id}
                        href={intervention.url}
                        className="content-map-intervention content-map-intervention--linked"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={intervention.id} className="content-map-intervention">
                        {content}
                      </div>
                    );
                  })}
                </div>
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
                        {category.interventions.map((intervention) => {
                          const InterventionIcon = intervention.icon ? resolveIcon(intervention.icon) : null;
                          const content = (
                            <>
                              {InterventionIcon && (
                                <span className="content-map-accordion__item-icon">
                                  <InterventionIcon className="h-4 w-4" />
                                </span>
                              )}
                              <div className="content-map-accordion__item-content">
                                <span className="content-map-accordion__item-label">
                                  {t(`contentMap.categories.${category.id}.interventions.${intervention.id}.label`, {}, intervention.label)}
                                </span>
                                {intervention.subtitle && (
                                  <span className="content-map-accordion__item-subtitle">
                                    {t(`contentMap.categories.${category.id}.interventions.${intervention.id}.subtitle`, {}, intervention.subtitle)}
                                  </span>
                                )}
                              </div>
                            </>
                          );

                          return intervention.url ? (
                            <li key={intervention.id}>
                              <a
                                href={intervention.url}
                                className="content-map-accordion__item-text content-map-accordion__item-text--linked"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {content}
                              </a>
                            </li>
                          ) : (
                            <li key={intervention.id} className="content-map-accordion__item-text">
                              {content}
                            </li>
                          );
                        })}
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
