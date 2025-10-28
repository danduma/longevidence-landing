import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../i18n';
import { useReveal } from '../../hooks/useReveal';
import { Badge } from '../ui/badge';
import * as Icons from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const conveyorRef = useRef<HTMLDivElement>(null);
  const robotEyesRef = useRef<HTMLDivElement>(null);

  const headingReveal = useReveal('how-it-works-heading', { threshold: 0.35, rootMargin: '-10% 0px' });
  const step1Reveal = useReveal('how-it-works-step-1', { threshold: 0.35, rootMargin: '-10% 0px' });
  const step2Reveal = useReveal('how-it-works-step-2', { threshold: 0.35, rootMargin: '-10% 0px' });
  const step3Reveal = useReveal('how-it-works-step-3', { threshold: 0.35, rootMargin: '-10% 0px' });
  const step4Reveal = useReveal('how-it-works-step-4', { threshold: 0.35, rootMargin: '-10% 0px' });

  // Robot eye movement
  useEffect(() => {
    if (!isVisible || !robotEyesRef.current) return;

    const eyes = robotEyesRef.current;
    const moveEyes = () => {
      eyes.style.transform = 'translateX(2px)';
      setTimeout(() => {
        eyes.style.transform = 'translateX(-2px)';
      }, 1000);
    };

    const interval = setInterval(moveEyes, 2000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleVisibilityChange = useCallback((visible: boolean) => {
    setIsVisible(visible);
  }, []);

  useEffect(() => {
    if (step1Reveal.visible || step2Reveal.visible || step3Reveal.visible || step4Reveal.visible) {
      handleVisibilityChange(true);
    }
  }, [step1Reveal.visible, step2Reveal.visible, step3Reveal.visible, step4Reveal.visible, handleVisibilityChange]);

  const conveyorItems = [
    { icon: Icons.FileText, label: 'Studies' },
    { icon: Icons.Globe, label: 'Websites' },
    { icon: Icons.MessageCircle, label: 'Social' },
    { icon: Icons.BookOpen, label: 'Articles' },
    { icon: Icons.RefreshCw, label: 'Updates' },
  ];

  return (
    <section className="pt-16 pb-8 md:pt-20 md:pb-12 lg:pt-24 lg:pb-16 how-it-works-section">
      <div className="section-container vertical-stack gap-12">
        <div
          ref={headingReveal.ref}
          className={`vertical-stack gap-4 fade-up ${headingReveal.visible ? 'is-visible' : ''}`}
        >
          <Badge className="w-fit">
            {t('howItWorks.accent', {}, 'Process')}
          </Badge>
          <div className="vertical-stack gap-3">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {t('howItWorks.title', {}, 'How it works')}
            </h2>
            <p className="max-w-2xl text-base text-muted/90">
              {t('howItWorks.subtitle', {}, 'From request to publication in four simple steps')}
            </p>
          </div>
        </div>

        <div className="how-it-works-steps">
          {/* Step 1: Chat Bubbles - Animation Left, Text Right */}
          <div 
            ref={step1Reveal.ref}
            className={`how-it-works-step how-it-works-step--left fade-up ${step1Reveal.visible ? 'is-visible' : ''}`}
          >
            <div className="how-it-works-graphic">
              <div className="chat-bubbles">
                <div className={`chat-bubble chat-bubble-1 ${isVisible ? 'animate-bounce-in' : ''}`}>
                  <div className="chat-bubble-content">
                    <div className="chat-line"></div>
                    <div className="chat-line"></div>
                    <div className="chat-line chat-line--short"></div>
                  </div>
                </div>
                <div className={`chat-bubble chat-bubble-2 ${isVisible ? 'animate-bounce-in-delayed' : ''}`}>
                  <div className="chat-bubble-content">
                    <div className="chat-line"></div>
                    <div className="chat-line"></div>
                    <div className="chat-line chat-line--short"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="how-it-works-text">
              <p className="text-lg font-medium text-foreground">
                <span className="step-number-inline">1</span>
                {t('howItWorks.steps.request.text', {}, 'You request new content and add suggestions')}
              </p>
            </div>
          </div>

          {/* Step 2: Robot with Conveyor - Text Left, Animation Right */}
          <div 
            ref={step2Reveal.ref}
            className={`how-it-works-step how-it-works-step--right fade-up ${step2Reveal.visible ? 'is-visible' : ''}`}
          >
            <div className="how-it-works-text">
              <p className="text-lg font-medium text-foreground">
                <span className="step-number-inline">2</span>
                {t('howItWorks.steps.aiProcessing.text', {}, 'Longevidence AI reads every study, article and expert post on social media — then writes new articles')}
              </p>
            </div>
            <div className="how-it-works-graphic">
              <div className="robot-container">
                <div className="robot">
                  <div className="robot-head">
                    <div ref={robotEyesRef} className="robot-eyes">
                      <div className="robot-eye"></div>
                      <div className="robot-eye"></div>
                    </div>
                  </div>
                </div>
                <div ref={conveyorRef} className="conveyor-belt">
                  {conveyorItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={index}
                        className={`conveyor-item ${isVisible ? 'animate-conveyor' : ''}`}
                        style={{ 
                          animationDelay: `${index * 0.8}s`,
                          animationDuration: '4s'
                        }}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="text-xs">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Magnifying Glass - Animation Left, Text Right */}
          <div 
            ref={step3Reveal.ref}
            className={`how-it-works-step how-it-works-step--left fade-up ${step3Reveal.visible ? 'is-visible' : ''}`}
          >
            <div className="how-it-works-graphic">
              <div className="magnifying-container">
                <div className="articles">
                  <div className="article article-1">
                    <Icons.FileText className="h-8 w-8" />
                  </div>
                  <div className="article article-2">
                    <Icons.BookOpen className="h-8 w-8" />
                  </div>
                </div>
                <div className={`magnifying-glass ${isVisible ? 'animate-magnify' : ''}`}>
                  <Icons.Search className="h-12 w-12" />
                </div>
              </div>
            </div>
            <div className="how-it-works-text">
              <p className="text-lg font-medium text-foreground">
                <span className="step-number-inline">3</span>
                {t('howItWorks.steps.expertReview.text', {}, 'Experts review the AI creation')}
              </p>
            </div>
          </div>

          {/* Step 4: Encyclopedia with Star - Text Left, Animation Right */}
          <div 
            ref={step4Reveal.ref}
            className={`how-it-works-step how-it-works-step--right fade-up ${step4Reveal.visible ? 'is-visible' : ''}`}
          >
            <div className="how-it-works-text">
              <p className="text-lg font-medium text-foreground">
                <span className="step-number-inline">4</span>
                {t('howItWorks.steps.publication.text', {}, 'The highest quality content is created')}
              </p>
            </div>
            <div className="how-it-works-graphic">
              <div className="encyclopedia-container">
                <div className={`encyclopedia ${isVisible ? 'animate-float' : ''}`}>
                  <Icons.Book className="h-12 w-12" />
                  <div className={`star ${isVisible ? 'animate-shine' : ''}`}>
                    <Icons.Star className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
