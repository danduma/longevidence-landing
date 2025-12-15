import React, { useEffect } from 'react';
import { FooterSection } from '../sections/FooterSection';
import { Link } from 'react-router-dom';

export const TermsOfServicePage: React.FC = () => {
  const lastUpdated = 'December 15, 2025';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="py-6 border-b border-white/5 bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="section-container">
          <Link
            to="/"
            className="flex items-center gap-3 font-semibold text-lg w-fit hover:opacity-80 transition-opacity"
          >
            <img src="/longevidence_logo.png" alt="" className="h-8 w-8 object-contain" />
            <span>Longevidence</span>
          </Link>
        </div>
      </header>
      <main className="flex-grow py-12 md:py-20">
        <div className="section-container max-w-3xl space-y-10">
          <div className="space-y-4 border-b border-white/10 pb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Terms of Service</h1>
            <p className="text-muted text-lg">
              Last updated:{' '}
              <time dateTime="2025-12-15">
                {lastUpdated}
              </time>
            </p>
          </div>

          <div className="space-y-8 text-foreground/90 leading-relaxed text-lg font-light">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Agreement to Terms</h2>
              <p>
                These Terms of Service (these &quot;Terms&quot;) are a legally binding agreement between you (&quot;you&quot;)
                and Longevidence (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use of our
                websites, applications, and related services (collectively, the &quot;Services&quot;).
              </p>
              <p>
                By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, do not use
                the Services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Eligibility and Accounts</h2>
              <p>
                You must have the legal capacity to enter into these Terms. If you create an account or register for the
                Services, you agree to provide accurate information and keep it up to date.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activity
                that occurs under your account.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the Services in violation of any applicable law or regulation.</li>
                <li>Attempt to gain unauthorized access to any systems, accounts, or data.</li>
                <li>Interfere with or disrupt the integrity or performance of the Services.</li>
                <li>Copy, scrape, or extract content at scale except as permitted by law or with our written permission.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Intellectual Property</h2>
              <p>
                The Services and all content, features, and functionality (including text, graphics, logos, and software)
                are owned by us or our licensors and are protected by intellectual property laws. These Terms do not grant
                you any rights to our trademarks or other intellectual property except as necessary to use the Services as
                permitted.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Disclaimers</h2>
              <p>
                The Services may include information about health, longevity, or scientific research for general
                informational purposes only. The Services are not medical advice and are not a substitute for professional
                diagnosis or treatment.
              </p>
              <p>
                THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
                WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT
                OF OR RELATED TO YOUR USE OF THE SERVICES.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Longevidence and its affiliates, officers, directors, employees,
                and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable
                attorneys&apos; fees) arising out of or related to your use of the Services or your violation of these
                Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Changes to the Services or Terms</h2>
              <p>
                We may modify, suspend, or discontinue the Services at any time. We may also update these Terms from time
                to time. If we make material changes, we will take reasonable steps to provide notice (for example, by
                posting the updated Terms on this page).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">9. Privacy</h2>
              <p>
                Our collection and use of personal information is described in our Privacy Policy. By using the Services,
                you agree that we can collect and use information as described there.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">10. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the jurisdiction in which Longevidence is established, without
                regard to conflict of law principles.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">11. Contact Us</h2>
              <p>If you have questions about these Terms, contact us at support @ &lt;this domain&gt;.</p>
            </section>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};
