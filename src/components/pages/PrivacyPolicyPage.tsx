import React, { useEffect } from 'react';
import { FooterSection } from '../sections/FooterSection';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
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
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Privacy Policy</h1>
            <p className="text-muted text-lg">
              Last updated:{' '}
              <time dateTime="2025-12-15">
                {lastUpdated}
              </time>
            </p>
          </div>

          <div className="space-y-8 text-foreground/90 leading-relaxed text-lg font-light">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Overview</h2>
              <p>
                This Privacy Policy explains how Longevidence (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
                collects, uses, and shares information when you use our websites, applications, and related services
                (collectively, the &quot;Services&quot;).
              </p>
              <p>
                If you have any questions about this Privacy Policy, contact us at support @ &lt;this domain&gt;.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Account and registration information:</span> information you provide when
                  you register or create an account (for example, your name, email address, and authentication-related
                  details).
                </li>
                <li>
                  <span className="font-medium">Usage and device information:</span> information about how you use the
                  Services, including device information, approximate location derived from IP address, pages viewed, and
                  interactions.
                </li>
                <li>
                  <span className="font-medium">Cookies and similar technologies:</span> we and our service providers may
                  use cookies and similar technologies to help operate the Services and understand usage.
                </li>
                <li>
                  <span className="font-medium">Communications:</span> information you provide when you contact us or
                  otherwise communicate with us.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. How We Use Information</h2>
              <p>We use information to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide, maintain, and improve the Services.</li>
                <li>Create and administer accounts and authenticate users.</li>
                <li>Monitor for security issues, fraud, abuse, and service interruptions.</li>
                <li>Respond to requests and provide customer support.</li>
                <li>Send service-related communications (for example, changes to the Services or policies).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. How We Share Information</h2>
              <p>We may share information in the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Service providers:</span> with vendors that help operate the Services (for
                  example, hosting, analytics, and error monitoring) under appropriate contractual protections.
                </li>
                <li>
                  <span className="font-medium">Legal and safety:</span> to comply with law, respond to lawful requests,
                  or protect the rights, safety, and security of users, the public, or the Services.
                </li>
                <li>
                  <span className="font-medium">Business transfers:</span> in connection with a merger, acquisition,
                  financing, reorganization, or sale of assets, where information may be transferred as part of that
                  transaction.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Cookies and Analytics</h2>
              <p>
                We may use analytics tools (for example, PostHog) to understand how the Services are used and to help
                improve performance and user experience. These tools may collect information such as pages viewed and
                interactions, and may use cookies or similar technologies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Data Retention</h2>
              <p>
                We retain personal information for as long as reasonably necessary to provide the Services, comply with
                legal obligations, resolve disputes, and enforce our agreements. Retention periods depend on the type of
                information and the purposes for which we use it.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Security</h2>
              <p>
                We use reasonable administrative, technical, and organizational safeguards designed to protect personal
                information. No method of transmission or storage is completely secure, so we cannot guarantee absolute
                security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Your Rights and Choices</h2>
              <p>
                Depending on where you live, you may have rights to access, correct, delete, or obtain a copy of your
                personal information, or to object to or restrict certain processing. To make a request, contact us at
                support @ &lt;this domain&gt;.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">9. Children&apos;s Privacy</h2>
              <p>
                The Services are not directed to children under 13, and we do not knowingly collect personal information
                from children under 13.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will post the updated version on this page and
                update the &quot;Last updated&quot; date above.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">11. Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, contact us at support @ &lt;this domain&gt;.</p>
            </section>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};
