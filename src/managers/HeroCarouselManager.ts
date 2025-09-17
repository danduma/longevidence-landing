import { BaseManager } from './BaseManager';

export type HeroCarouselItem = {
  id: string;
  title: string;
  subtitle: string;
  metaLabel: string;
  metaValue: string;
  icon: string;
};

class HeroCarouselManagerClass extends BaseManager {
  private readonly items: HeroCarouselItem[];
  private readonly intervalMs: number;
  private currentIndex = 0;
  private timerId: number | undefined;

  constructor() {
    super();
    this.items = [
      { id: 'prp', title: 'Platelet-rich plasma', subtitle: 'Autologous platelet concentrates accelerating joint recovery', metaLabel: 'Signal', metaValue: 'Emerging clinical consensus', icon: 'Syringe' },
      { id: 'plasmapheresis', title: 'Therapeutic plasma exchange', subtitle: 'Extracorporeal swaps explored for rejuvenation markers', metaLabel: 'Clarity', metaValue: 'Limited randomized data', icon: 'Droplets' },
      { id: 'peptides', title: 'Longevity peptide stacks', subtitle: 'Targeted signaling modulators used in precision protocols', metaLabel: 'Oversight', metaValue: 'Requires specialist guidance', icon: 'Activity' },
      { id: 'hbot', title: 'Hyperbaric oxygen therapy', subtitle: 'Pressurized sessions tracking neuroplastic and recovery gains', metaLabel: 'Momentum', metaValue: 'Strong niche studies', icon: 'Waveform' }
    ];
    this.intervalMs = 4000;
  }

  start(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.timerId !== undefined) {
      return;
    }

    this.timerId = window.setInterval(() => {
      this.advance();
    }, this.intervalMs);
  }

  stop(): void {
    if (this.timerId !== undefined && typeof window !== 'undefined') {
      window.clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  private advance(): void {
    if (this.items.length <= 1) {
      return;
    }

    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.emitChange();
  }

  getOrderedItems(): HeroCarouselItem[] {
    if (this.items.length === 0) {
      return [];
    }

    return this.items.map((_, offset) => this.items[(this.currentIndex + offset) % this.items.length]);
  }
}

export const HeroCarouselManager = new HeroCarouselManagerClass();
