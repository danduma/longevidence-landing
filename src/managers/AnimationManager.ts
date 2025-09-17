import { BaseManager } from './BaseManager';

export type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

class AnimationManagerClass extends BaseManager {
  private readonly visibility = new Map<string, boolean>();

  observe(id: string, element: Element, options: RevealOptions = {}): () => void {
    const threshold = options.threshold ?? 0.25;
    const rootMargin = options.rootMargin ?? '0px';
    const once = options.once ?? true;

    this.visibility.set(id, this.visibility.get(id) ?? false);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;
        const isVisible = ratio >= threshold || entry.isIntersecting;
        if (isVisible) {
          this.visibility.set(id, true);
          this.emitChange();
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          this.visibility.set(id, false);
          this.emitChange();
        }
      });
    }, { threshold, rootMargin });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }

  isVisible(id: string): boolean {
    return this.visibility.get(id) ?? false;
  }
}

export const AnimationManager = new AnimationManagerClass();
