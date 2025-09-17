import { useEffect } from 'react';
import { useTranslation } from '../../i18n';

import { useReveal } from '../../hooks/useReveal';
import { useManagerState } from '../../hooks/useManagerState';
import { HeroCarouselManager } from '../../managers/HeroCarouselManager';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { HeroCarousel } from './HeroCarousel';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    HeroCarouselManager.start();
    return () => HeroCarouselManager.stop();
  }, []);

  const carouselItems = useManagerState(HeroCarouselManager, () => HeroCarouselManager.getOrderedItems());

  const columnReveal = useReveal('hero-intro', { threshold: 0.55, rootMargin: '-10% 0px' });
  const badgeReveal = useReveal('hero-badge', { threshold: 0.55, rootMargin: '-10% 0px' });
  const titleReveal = useReveal('hero-title', { threshold: 0.55, rootMargin: '-10% 0px' });
  const subtitleReveal = useReveal('hero-subtitle', { threshold: 0.5, rootMargin: '-10% 0px' });
  const ctaReveal = useReveal('hero-cta', { threshold: 0.5, rootMargin: '-10% 0px' });
  const cardReveal = useReveal('hero-card', { threshold: 0.45, rootMargin: '-5% 0px' });

  return (
    <section className="section-shell hero-section relative overflow-hidden">
      <div className="hero-ambient" aria-hidden>
        <div className="hero-gradient" />
        <div className="hero-orb hero-orb--primary" />
        <div className="hero-orb hero-orb--secondary" />
      </div>
      <div className="section-container relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
        <div
          ref={columnReveal.ref}
          className={`vertical-stack max-w-3xl gap-8 fade-up ${columnReveal.visible ? 'is-visible' : ''}`}
        >
          <span
            ref={badgeReveal.ref}
            className={`trust-badge ${badgeReveal.visible ? 'is-visible' : ''}`}
          >
            {t('hero.trustBadge', {}, 'Trusted by clinicians and researchers')}
          </span>
          <div className="vertical-stack gap-6">
            <h1
              ref={titleReveal.ref}
              className={`hero-title text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl ${titleReveal.visible ? 'is-visible' : ''}`}
            >
              {t('hero.titlePrimary', {}, 'Turn longevity evidence into action')}
            </h1>
            <p
              ref={subtitleReveal.ref}
              className={`hero-subtitle text-lg text-foreground/80 sm:text-xl ${subtitleReveal.visible ? 'is-visible' : ''}`}
            >
              {t('hero.subtitle', {}, 'Track emerging interventions with real clinical traction and guidance.')}
            </p>
          </div>
          <div
            ref={ctaReveal.ref}
            className={`hero-cta-group flex flex-col gap-4 sm:flex-row sm:items-center ${ctaReveal.visible ? 'is-visible' : ''}`}
          >
            <Button className="shadow-xl shadow-[rgba(var(--color-accent-rgb),0.35)]">
              {t('hero.primaryCta', {}, 'Get early access')}
            </Button>
            
          </div>
        </div>
        <Card
          ref={cardReveal.ref}
          className={`hero-highlight-card fade-up fade-delay hero-card ${cardReveal.visible ? 'is-visible' : ''}`}
        >
        <div className="" aria-hidden />
          <div className="vertical-stack gap-6">
            <div className="vertical-stack gap-2">
              <Badge className="w-fit bg-accent/10 text-accent">
                {t('hero.highlightTitle', {}, 'Realtime evidence pulse')}
              </Badge>
              <p className="text-sm text-muted/90">
                {t('hero.highlightSubtitle', {}, 'Live signals from interventions with growing clinical traction.')}
              </p>
            </div>
            <HeroCarousel items={carouselItems} />
          </div>
        </Card>
      </div>
    </section>
  );
};
