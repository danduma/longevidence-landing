import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useMemo, forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { useTranslation } from '../../i18n';

import { useManagerState } from '../../hooks/useManagerState';
import { useReveal } from '../../hooks/useReveal';
import { LandingContentManager } from '../../managers/LandingContentManager';

const RawXBrandIcon = forwardRef<SVGSVGElement, ComponentPropsWithoutRef<'svg'>>((props, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      d="M20.146 3H16.65l-4.34 5.533L9.437 3H3.25l6.353 9.09L3.5 21h3.497l4.68-5.969L14.563 21h6.187l-6.33-9.216L20.146 3Z"
    />
  </svg>
));
RawXBrandIcon.displayName = 'XBrandIcon';
const XBrandIcon = RawXBrandIcon as unknown as LucideIcon;

const customIcons: Record<string, LucideIcon> = {
  XBrand: XBrandIcon
};

const resolveIcon = (name: string): LucideIcon => {
  if (customIcons[name]) {
    return customIcons[name];
  }
  const iconMap = Icons as unknown as Record<string, LucideIcon>;
  return (iconMap[name] ?? (Icons as unknown as { Share2: LucideIcon }).Share2) as LucideIcon;
};

export const FooterSection: React.FC = () => {
  const { t } = useTranslation();
  const socials = useManagerState(LandingContentManager, () => LandingContentManager.getSocialLinks());
  const siteMeta = useManagerState(LandingContentManager, () => LandingContentManager.getSiteMeta());
  const footerReveal = useReveal('footer', { threshold: 0.25, rootMargin: '-10% 0px' });
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="section-shell footer-section">
      <div className="section-container">
        <div
          ref={footerReveal.ref}
          className={`footer-panel fade-up ${footerReveal.visible ? 'is-visible' : ''}`}
        >
          <div className="footer-content">
            <div className="footer-brand vertical-stack gap-2">
              <span className="footer-site-name">{siteMeta.siteName}</span>
              <p className="footer-tagline">
                {t('footer.tagline', {}, 'Clarity for frontier longevity decisions.')}
              </p>
              <span className="footer-handle">{siteMeta.socialHandle}</span>
            </div>
            <div className="footer-socials vertical-stack gap-3">
              <span className="footer-follow-label">
                {t('footer.follow', { handle: siteMeta.socialHandle }, `Follow ${siteMeta.socialHandle}`)}
              </span>
              <div className="footer-social-links">
                {socials.map((social) => {
                  const IconComponent = resolveIcon(social.icon);
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(`footer.socials.${social.id}`, {}, social.label)}
                      className="footer-social-link"
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="footer-legal">
            {t('footer.legal', { year: currentYear, name: siteMeta.siteName }, `© ${currentYear} ${siteMeta.siteName}. All rights reserved.`)}
          </p>
        </div>
      </div>
    </footer>
  );
};
