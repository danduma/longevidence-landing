import { useEffect, useMemo, type ReactNode } from 'react';
import { useTranslation } from '../../i18n';

import { useReveal } from '../../hooks/useReveal';
import { useManagerState } from '../../hooks/useManagerState';
import { HeroCarouselManager } from '../../managers/HeroCarouselManager';
import { Badge } from '../ui/badge';
import { HeroShowcaseCard } from '../ui/HeroShowcaseCard';
import { HeroCarousel } from './HeroCarousel';
import { PrimaryCtaButton } from '../ui/PrimaryCtaButton';

type HeroTitleDecorations = {
  underlineTargets: string[];
  highlightTargets: string[];
};

type DecorationMatch = {
  start: number;
  end: number;
  type: 'underline' | 'highlight';
};

const defaultHeroTitleDecorations: HeroTitleDecorations = {
  underlineTargets: ['what actually works'],
  highlightTargets: ['longevity']
};

const ensureStringArray = (value: unknown, fallback: string[]): string[] => {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const filtered = value.filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0);

  return filtered.length > 0 ? filtered : fallback;
};

const normalizeDecorations = (raw: unknown): HeroTitleDecorations => {
  if (typeof raw === 'object' && raw !== null && !Array.isArray(raw)) {
    const tentative = raw as Partial<HeroTitleDecorations>;
    return {
      underlineTargets: ensureStringArray(tentative.underlineTargets, defaultHeroTitleDecorations.underlineTargets),
      highlightTargets: ensureStringArray(tentative.highlightTargets, defaultHeroTitleDecorations.highlightTargets)
    };
  }

  return defaultHeroTitleDecorations;
};

const createDecoratedTitle = (title: string, decorations: HeroTitleDecorations): ReactNode[] => {
  const normalizedTitle = title.toLowerCase();
  const matches: DecorationMatch[] = [];
  const underlineTargets = Array.isArray(decorations.underlineTargets) ? decorations.underlineTargets : [];
  const highlightTargets = Array.isArray(decorations.highlightTargets) ? decorations.highlightTargets : [];

  const enqueueMatches = (targets: string[], type: DecorationMatch['type']) => {
    targets.forEach((target) => {
      const normalizedTarget = target.toLowerCase();

      if (!normalizedTarget.trim()) {
        return;
      }

      let searchIndex = 0;

      while (searchIndex < normalizedTitle.length) {
        const matchIndex = normalizedTitle.indexOf(normalizedTarget, searchIndex);

        if (matchIndex === -1) {
          break;
        }

        matches.push({
          start: matchIndex,
          end: matchIndex + normalizedTarget.length,
          type
        });

        searchIndex = matchIndex + normalizedTarget.length;
      }
    });
  };

  enqueueMatches(underlineTargets, 'underline');
  enqueueMatches(highlightTargets, 'highlight');

  if (matches.length === 0) {
    return [title];
  }

  matches.sort((a, b) => {
    if (a.start !== b.start) {
      return a.start - b.start;
    }

    const aLength = a.end - a.start;
    const bLength = b.end - b.start;

    return bLength - aLength;
  });

  const segments: ReactNode[] = [];
  let cursor = 0;
  let matchIndex = 0;

  while (matchIndex < matches.length) {
    const match = matches[matchIndex];

    if (match.start < cursor) {
      matchIndex += 1;
      continue;
    }

    if (match.start > cursor) {
      segments.push(title.slice(cursor, match.start));
    }

    const content = title.slice(match.start, match.end);
    const baseClass = match.type === 'underline' ? 'hero-title__underline' : 'hero-title__highlight';

    if (match.type === 'highlight') {
      segments.push(
        <span key={`hero-title-segment-${match.start}-${match.end}`} className={`hero-title__segment ${baseClass} relative inline-block`}>
          <span className="absolute bg-highlight -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
          <span className="relative text-white">{content}</span>
        </span>
      );
    } else {
      segments.push(
        <span key={`hero-title-segment-${match.start}-${match.end}`} className={`hero-title__segment ${baseClass}`}>
          {content}
        </span>
      );
    }

    cursor = match.end;
    matchIndex += 1;
  }

  if (cursor < title.length) {
    segments.push(title.slice(cursor));
  }

  return segments;
};

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    HeroCarouselManager.start();
    return () => HeroCarouselManager.stop();
  }, []);

  const carouselItems = useManagerState(HeroCarouselManager, () => HeroCarouselManager.getOrderedItems());

  const columnReveal = useReveal('hero-intro', { threshold: 0.55, rootMargin: '-10% 0px' });
  const titleReveal = useReveal('hero-title', { threshold: 0.55, rootMargin: '-10% 0px' });
  const subtitleReveal = useReveal('hero-subtitle', { threshold: 0.5, rootMargin: '-10% 0px' });
  const ctaReveal = useReveal('hero-cta', { threshold: 0.5, rootMargin: '-10% 0px' });
  const cardReveal = useReveal('hero-card', { threshold: 0.45, rootMargin: '-5% 0px' });

  const rawDecorations = t('hero.titleDecorations', { returnObjects: true }) as unknown;
  const decorations = useMemo(() => normalizeDecorations(rawDecorations), [rawDecorations]);
  const heroTitle = t('hero.titlePrimary', {}, 'Find out what actually works in longevity');

  const decoratedTitle = useMemo(() => createDecoratedTitle(heroTitle, decorations), [heroTitle, decorations]);

  return (
    <section className="py-12 md:py-16 lg:py-18 hero-section relative overflow-hidden">
      <div className="hero-ambient" aria-hidden>
        <div className="hero-gradient" />
        <div className="hero-orb hero-orb--primary" />
        <div className="hero-orb hero-orb--secondary" />
      </div>
      <div className="section-container relative z-10">
        <a href="/" className="hero-brand" aria-label="Longevidence home">
          <img src="/longevidence_logo.png" alt="" className="hero-brand__logo" />
          <span className="hero-brand__text">Longevidence</span>
        </a>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
        <div
          ref={columnReveal.ref}
          className={`vertical-stack max-w-3xl gap-8 fade-up ${columnReveal.visible ? 'is-visible' : ''}`}
        >
          <div className="vertical-stack gap-6">
            <h1
              ref={titleReveal.ref}
              className={`hero-title text-4xl font-bold tracking-tight text-black  sm:text-5xl leading-[1.4] lg:text-6xl ${titleReveal.visible ? 'is-visible' : ''}`}
            >
              {decoratedTitle}
            </h1>
            <p
              ref={subtitleReveal.ref}
              className={`hero-subtitle text-lg text-foreground/80 sm:text-xl ${subtitleReveal.visible ? 'is-visible' : ''}`}
            >
              {t('hero.subtitle', {}, 'Evidence-based reviews of the latest longevity interventions, written by AI, curated by the community, updated daily')}
            </p>
          </div>
          <div
          ref={ctaReveal.ref}
          className={`hero-cta-group flex flex-col gap-4 sm:flex-row sm:items-center ${ctaReveal.visible ? 'is-visible' : ''}`}
        >
            <PrimaryCtaButton
              label={t('hero.primaryCta', {}, 'Get early access')}
              className="px-8 py-4 md:px-9 md:py-4 font-semibold"
            />
            
          </div>
        </div>
        <HeroShowcaseCard
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
        </HeroShowcaseCard>
        </div>
      </div>

      <div 
        className="absolute bottom-[2] left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => {
          // Find the next section and scroll to it
          const heroSection = document.querySelector('.hero-section');
          if (heroSection && heroSection.nextElementSibling) {
            heroSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        aria-label={t('hero.scroll', {}, 'Scroll down')}
      >
        <div className="mouse-scroll" aria-hidden />
      </div>
      
    </section>
  );
};
