import { useTranslation } from '../../i18n';

import { useManagerState } from '../../hooks/useManagerState';
import { useReveal } from '../../hooks/useReveal';
import { LandingContentManager } from '../../managers/LandingContentManager';
import { PrimaryCtaButton } from '../ui/PrimaryCtaButton';

export const CtaSection: React.FC = () => {
  const { t } = useTranslation();
  const cta = useManagerState(LandingContentManager, () => LandingContentManager.getCtaContent());
  const panelReveal = useReveal('cta-panel', { threshold: 0.4, rootMargin: '-10% 0px' });

  return (
    <section className="section-shell cta-section">
      <div className="section-container">
        <div
          ref={panelReveal.ref}
          className={`cta-panel fade-up ${panelReveal.visible ? 'is-visible' : ''}`}
        >
          <div className="vertical-stack gap-6 text-center">
            <span className="cta-badge">
              {t('cta.socialProof', {}, cta.socialProof)}
            </span>
            <div className="vertical-stack gap-4">
              <h2 className="cta-title">
                {t('cta.title', {}, cta.headline)}
              </h2>
              <p className="cta-subtitle">
                {t('cta.subtitle', {}, cta.subhead)}
              </p>
            </div>
            <div className="cta-actions">
              <PrimaryCtaButton label={t('cta.button', {}, cta.buttonLabel)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
