// File: pages/legal/terms-of-service.js
import Head from "next/head";
import Link from "next/link";

export default function TermsOfService() {
  const SITE_URL = "https://aidfinder-app-uqzw.vercel.app";
  const EFFECTIVE_DATE = "September 17, 2025";
  const SUPPORT_EMAIL = "aidfinder.app@gmail.com";
  // If you prefer a different governing law, change the string below (e.g., "Texas, USA").
  const GOVERNING_LAW = "Illinois, USA";

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16, lineHeight: 1.65 }}>
      <Head>
        <title>Terms &amp; Conditions — AidFinder</title>
        <meta
          name="description"
          content="Read AidFinder’s Terms & Conditions. Use the app responsibly, understand limitations, and learn about your rights and obligations."
        />
        <link rel="canonical" href={`${SITE_URL}/legal/terms-of-service`} />

        {/* Basic OG/Twitter */}
        <meta property="og:site_name" content="AidFinder" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Terms & Conditions — AidFinder" />
        <meta
          property="og:description"
          content="Use AidFinder responsibly. Learn about acceptable use, limitations, and your rights."
        />
        <meta property="og:url" content={`${SITE_URL}/legal/terms-of-service`} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Optional structured data (schema.org) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Terms & Conditions — AidFinder",
              url: `${SITE_URL}/legal/terms-of-service`,
              dateModified: new Date(EFFECTIVE_DATE).toISOString(),
              publisher: {
                "@type": "Organization",
                name: "AidFinder",
                url: SITE_URL,
                logo: `${SITE_URL}/og-image.png`
              }
            })
          }}
        />
      </Head>

      <header style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>Terms &amp; Conditions</h1>
        <p style={{ fontSize: 14, color: "#667085", margin: 0 }}>Effective date: {EFFECTIVE_DATE}</p>
      </header>

      {/* Friendly Summary Box */}
      <section
        style={{
          border: "1px solid #e5e7eb",
          background: "#f9fafb",
          borderRadius: 10,
          padding: 16,
          marginBottom: 24
        }}
        aria-label="Summary"
      >
        <p style={{ margin: 0 }}>
          <strong>Summary:</strong> AidFinder helps you discover assistance resources. Use the app responsibly. We do our best to
          keep information useful and current but cannot guarantee completeness or availability. By using AidFinder, you agree to
          these Terms and our{" "}
          <Link href="/legal/privacy-policy" style={{ color: "#2563eb", textDecoration: "underline" }}>
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <h2 style={{ marginTop: 0 }}>1) Acceptance of Terms</h2>
      <p>
        By accessing or using AidFinder (“AidFinder,” “we,” “us,” or “our”) via web or mobile (the “Service”), you agree to these
        Terms &amp; Conditions (“Terms”). If you do not agree, please do not use the Service.
      </p>

      <h2 style={{ marginTop: 24 }}>2) Use of the Service</h2>
      <ul>
        <li>
          AidFinder provides curated links and information about assistance programs in categories such as Food, Health, Housing,
          Financial, and Education.
        </li>
        <li>You agree to use the Service only for lawful purposes and in accordance with these Terms.</li>
        <li>
          You will not attempt to access the Service using automated means (e.g., bots, scrapers) except as allowed by our
          <code> robots.txt </code> and applicable APIs.
        </li>
        <li>
          You will not interfere with or disrupt the Service, including by introducing malware, attempting unauthorized access, or
          overloading our infrastructure.
        </li>
      </ul>

      <h2 style={{ marginTop: 24 }}>3) Accounts and Security</h2>
      <ul>
        <li>
          If you create an account, you are responsible for safeguarding your credentials and for all activities under your
          account.
        </li>
        <li>Notify us immediately at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> of any unauthorized use.</li>
        <li>
          Third-party login (e.g., Google, Apple) may be used for authentication. Your use of those services is subject to their
          terms and policies.
        </li>
      </ul>

      <h2 style={{ marginTop: 24 }}>4) Content; No Guarantee of Accuracy</h2>
      <ul>
        <li>
          We aim to keep listings, links, and descriptions up to date and helpful, but we cannot guarantee accuracy, completeness,
          or availability of external resources or programs.
        </li>
        <li>
          AidFinder is provided on an “as is” and “as available” basis without warranties of any kind, to the extent permitted by
          law.
        </li>
        <li>
          Some content may link to third-party websites or services. We are not responsible for their content, policies, or
          practices.
        </li>
      </ul>

      <h2 style={{ marginTop: 24 }}>5) Payments and Donations</h2>
      <p>
        If donations or premium features are offered, payments are processed by third-party providers (e.g., Apple, Google,
        PayPal, Stripe). AidFinder does not store your full payment details. Any purchase may be subject to the provider’s terms,
        policies, and applicable taxes.
      </p>

      <h2 style={{ marginTop: 24 }}>6) Prohibited Conduct</h2>
      <ul>
        <li>Reverse engineering, decompiling, or attempting to extract source code except as permitted by law.</li>
        <li>Using the Service to transmit unlawful, harmful, or abusive content; or to harass or harm others.</li>
        <li>Misrepresenting your identity or affiliation, or impersonating another person or entity.</li>
        <li>Infringing intellectual property or other rights of AidFinder or third parties.</li>
      </ul>

      <h2 style={{ marginTop: 24 }}>7) Intellectual Property</h2>
      <p>
        The Service, including its design, logo, text, and code, is owned by AidFinder and protected by intellectual property
        laws. Except as expressly allowed, you may not copy, modify, distribute, or create derivative works without prior written
        consent.
      </p>

      <h2 style={{ marginTop: 24 }}>8) Termination</h2>
      <p>
        We may suspend or terminate access to the Service at any time if you violate these Terms or for any reason permitted by
        law. You may stop using the Service at any time. Some provisions (e.g., IP ownership, disclaimers, limitations) survive
        termination.
      </p>

      <h2 style={{ marginTop: 24 }}>9) Disclaimers</h2>
      <p>
        AidFinder does not provide legal, financial, medical, or professional advice. Information is for general guidance only.
        Consult qualified professionals for advice specific to your situation.
      </p>

      <h2 style={{ marginTop: 24 }}>10) Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, AidFinder and its developers will not be liable for any indirect, incidental,
        special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly,
        or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the
        Service; (b) any content or conduct of any third party; or (c) unauthorized access, use, or alteration of your
        transmissions or content.
      </p>

      <h2 style={{ marginTop: 24 }}>11) Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless AidFinder from and against any claims, liabilities, damages, losses, and
        expenses (including reasonable legal fees) arising out of or in any way connected with your use of the Service or your
        violation of these Terms.
      </p>

      <h2 style={{ marginTop: 24 }}>12) Privacy Policy</h2>
      <p>
        Your use of the Service is also subject to our{" "}
        <Link href="/legal/privacy-policy" style={{ color: "#2563eb", textDecoration: "underline" }}>
          Privacy Policy
        </Link>
        , which explains how we collect, use, and protect your information.
      </p>

      <h2 style={{ marginTop: 24 }}>13) Children’s Use</h2>
      <p>
        The Service is not directed to children under 13. If you believe a child has provided us with personal information,
        please contact us and we will take appropriate steps.
      </p>

      <h2 style={{ marginTop: 24 }}>14) Governing Law</h2>
      <p>
        These Terms are governed by the laws of {GOVERNING_LAW}, without regard to its conflict of law principles. Where
        permitted, you agree to the exclusive jurisdiction of courts located in {GOVERNING_LAW} for disputes arising from these
        Terms or the Service.
      </p>

      <h2 style={{ marginTop: 24 }}>15) Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. The “Effective date” above shows the last revision date. By continuing to
        use the Service after changes take effect, you agree to the revised Terms.
      </p>

      <h2 style={{ marginTop: 24 }}>16) Contact Us</h2>
      <p>
        If you have questions about these Terms, contact us at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
          {SUPPORT_EMAIL}
        </a>
        .
      </p>
    </main>
  );
}
