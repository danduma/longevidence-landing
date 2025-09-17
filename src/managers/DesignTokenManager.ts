import { BaseManager } from './BaseManager';

export type DesignTokens = {
  backgroundRgb: string;
  surfaceRgb: string;
  accentRgb: string;
  mutedRgb: string;
  foregroundRgb: string;
  ringRgb: string;
  shadowRgb: string;
  fontFamily: string;
  sectionVerticalSpacing: string;
  sectionMaxWidth: string;
  gridGap: string;
  cardRadius: string;
  animationDuration: string;
  animationEasing: string;
  blurStrength: string;
  backgroundGradient: string;
  surfaceGradient: string;
  accentGradient: string;
  heroGlowPrimary: string;
  heroGlowSecondary: string;
  floatAmplitude: string;
  floatDuration: string;
  backgroundNoiseOpacity: string;
};

class DesignTokenManagerClass extends BaseManager {
  private readonly tokens: DesignTokens;

  constructor() {
    super();
    this.tokens = {
      backgroundRgb: '255 255 255',
      surfaceRgb: '255 255 255',
      accentRgb: '255 136 90',
      mutedRgb: '111 119 133',
      foregroundRgb: '18 23 41',
      ringRgb: '255 181 130',
      shadowRgb: '23 30 53',
      fontFamily: '"Inter", "Space Grotesk", sans-serif',
      sectionVerticalSpacing: '8rem',
      sectionMaxWidth: '1200px',
      gridGap: '2rem',
      cardRadius: '28px',
      animationDuration: '950ms',
      animationEasing: 'cubic-bezier(0.16, 1, 0.32, 1)',
      blurStrength: '26px',
      backgroundGradient: 'radial-gradient(180% 180% at 10% 12%, rgba(255, 255, 255, 1), rgba(243, 248, 255, 0.96))',
      surfaceGradient: 'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(243,247,255,0.9))',
      accentGradient: 'linear-gradient(120deg, rgba(255,166,102,1), rgba(255,132,64,1))',
      heroGlowPrimary: 'rgba(214, 236, 255, 0.5)',
      heroGlowSecondary: 'rgba(255, 255, 255, 0.85)',
      floatAmplitude: '16px',
      floatDuration: '12s',
      backgroundNoiseOpacity: '0.05'
    };
    this.applyTokens();
  }

  getTokens(): DesignTokens {
    return this.tokens;
  }

  private applyTokens(): void {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const map: Record<string, string> = {
      '--color-background-rgb': this.tokens.backgroundRgb,
      '--color-surface-rgb': this.tokens.surfaceRgb,
      '--color-accent-rgb': this.tokens.accentRgb,
      '--color-muted-rgb': this.tokens.mutedRgb,
      '--color-foreground-rgb': this.tokens.foregroundRgb,
      '--color-ring-rgb': this.tokens.ringRgb,
      '--color-shadow-rgb': this.tokens.shadowRgb,
      '--font-sans': this.tokens.fontFamily,
      '--section-vertical-spacing': this.tokens.sectionVerticalSpacing,
      '--section-max-width': this.tokens.sectionMaxWidth,
      '--grid-gap': this.tokens.gridGap,
      '--card-radius': this.tokens.cardRadius,
      '--animation-duration': this.tokens.animationDuration,
      '--animation-easing': this.tokens.animationEasing,
      '--blur-strength': this.tokens.blurStrength,
      '--background-gradient': this.tokens.backgroundGradient,
      '--surface-gradient': this.tokens.surfaceGradient,
      '--accent-gradient': this.tokens.accentGradient,
      '--hero-glow-primary': this.tokens.heroGlowPrimary,
      '--hero-glow-secondary': this.tokens.heroGlowSecondary,
      '--float-amplitude': this.tokens.floatAmplitude,
      '--float-duration': this.tokens.floatDuration,
      '--background-noise-opacity': this.tokens.backgroundNoiseOpacity
    };

    Object.entries(map).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    this.emitChange();
  }
}

export const DesignTokenManager = new DesignTokenManagerClass();
