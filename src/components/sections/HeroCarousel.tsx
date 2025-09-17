import { useEffect, useRef, useState } from 'react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { HeroCarouselItem } from '../../managers/HeroCarouselManager';
import { useTranslation } from '../../i18n';

const getIcon = (name: string): LucideIcon => {
  const map = Icons as unknown as Record<string, LucideIcon>;
  return (map[name] ?? (Icons as unknown as { Sparkles: LucideIcon }).Sparkles) as LucideIcon;
};

interface HeroCarouselProps {
  items: HeroCarouselItem[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ items }) => {
  const { t } = useTranslation();
  const visibleItems = items.slice(0, 4);
  const [isShuffling, setIsShuffling] = useState(false);
  const [oldFrontCard, setOldFrontCard] = useState<HeroCarouselItem | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const previousItemsRef = useRef<HeroCarouselItem[]>([]);
  const isShufflingRef = useRef(false);

  useEffect(() => {
    const currentFrontId = visibleItems[0]?.id;
    const previousFrontId = previousItemsRef.current[0]?.id;

    // Only trigger animation if items changed and we're not already animating
    if (previousItemsRef.current.length > 0 && previousFrontId !== currentFrontId && !isShufflingRef.current) {
      const currentItems = [...visibleItems]; // Capture current state
      setOldFrontCard(previousItemsRef.current[0]);
      setAnimationKey(prev => prev + 1);
      setIsShuffling(true);
      isShufflingRef.current = true;

      // Don't return cleanup - let the timeout complete even if effect re-runs
      setTimeout(() => {
        setIsShuffling(false);
        setOldFrontCard(null);
        isShufflingRef.current = false;
        // Update reference to the items that were current when animation started
        previousItemsRef.current = currentItems;
      }, 1200);
    }

    // Only update reference when not animating
    if (!isShufflingRef.current) {
      previousItemsRef.current = visibleItems;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleItems]);

  return (
    <div className="hero-carousel">
      {/* Old front card flying to back during shuffle */}
      {oldFrontCard && isShuffling && (
        <div key={`flying-${animationKey}`} className="hero-carousel-card hero-carousel-card--flying-to-back">
          <div className="hero-carousel-card__icon">
            <span className="icon-pill icon-pill--lg">
              {(() => {
                const IconComponent = getIcon(oldFrontCard.icon);
                return <IconComponent className="h-6 w-6" />;
              })()}
            </span>
          </div>
          <div className="hero-carousel-card__content">
            <h3 className="hero-carousel-card__title">{t(`carousel.items.${oldFrontCard.id}.title`, {}, oldFrontCard.title)}</h3>
            <p className="hero-carousel-card__subtitle">{t(`carousel.items.${oldFrontCard.id}.subtitle`, {}, oldFrontCard.subtitle)}</p>
            <div className="hero-carousel-card__meta">
              <span className="hero-carousel-card__meta-label">{t(`carousel.items.${oldFrontCard.id}.metaLabel`, {}, oldFrontCard.metaLabel)}</span>
              <span className="hero-carousel-card__meta-value">{t(`carousel.items.${oldFrontCard.id}.metaValue`, {}, oldFrontCard.metaValue)}</span>
            </div>
          </div>
        </div>
      )}

      {/* New cards sliding into position */}
      {visibleItems.map((item, index) => {
        const IconComponent = getIcon(item.icon);
        const positionClass = `hero-carousel-card--${index}`;
        const shufflingClass = isShuffling ? 'shuffling' : '';

        return (
          <div key={item.id} className={`hero-carousel-card ${positionClass} ${shufflingClass}`}>
            <div className="hero-carousel-card__icon">
              <span className="icon-pill icon-pill--lg">
                <IconComponent className="h-6 w-6" />
              </span>
            </div>
            <div className="hero-carousel-card__content">
              <h3 className="hero-carousel-card__title">{t(`carousel.items.${item.id}.title`, {}, item.title)}</h3>
              <p className="hero-carousel-card__subtitle">{t(`carousel.items.${item.id}.subtitle`, {}, item.subtitle)}</p>
              <div className="hero-carousel-card__meta">
                <span className="hero-carousel-card__meta-label">{t(`carousel.items.${item.id}.metaLabel`, {}, item.metaLabel)}</span>
                <span className="hero-carousel-card__meta-value">{t(`carousel.items.${item.id}.metaValue`, {}, item.metaValue)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
