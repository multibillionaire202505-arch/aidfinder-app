// File: pages/legal/privacy-policy.js
import Head from "next/head";

export default function PrivacyPolicy() {
  const SITE_URL = "https://aidfinder-app-uqzw.vercel.app";
  const EFFECTIVE_DATE = "September 17, 2025";
  const SUPPORT_EMAIL = "aidfinder.app@gmail.com";

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16, lineHeight: 1.65 }}>
      <Head>
        <title>Privacy Policy — AidFinder</title>
        <meta
          name="description"
          content="Learn how AidFinder collects, uses, and protects your information. We don’t sell your data and we only store what’s needed to make the app work for you."
        />
        <link rel="canonical" href={`${SITE_URL}/legal/privacy-policy`} />
        {/* Basic OG/Twitter for good sharing/SEO */}
        <meta property="og:site_name" content="AidFinder" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Privacy Policy — AidFinder" />
        <meta
          property="og:description"
          content="We collect the minimum data needed to run AidFinder and never sell your personal information."
        />
        <meta property="og:url" content={`${SITE_URL}/legal/privacy-policy`} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Optional structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PrivacyPolicy",
              name: "Privacy Policy — AidFinder",
              url: `${SITE_URL}/legal/privacy-policy`,
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
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>Privacy Policy</h1>
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
          <strong>Summary:</strong> We collect the minimum data needed to run AidFinder (e.g., account email and basic usage).
          We <strong>do not sell or share</strong> your personal information for advertising. You can request access or deletion
          any time at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
            {SUPPORT_EMAIL}
          </a>.
        </p>
      </section>

      <h2 style={{ marginTop: 0 }}>1) Who We Are</h2>
      <p>
        AidFinder (“AidFinder,” “we,” “us,” or “our”) helps people discover assistance resources across Food, Health, Housing,
        Financial, and Education categories. This Privacy Policy explains how we handle information when you use our web or
        mobile app (the “Service”).
      </p>

      <h2 style={{ marginTop: 24 }}>2) Information We Collect</h2>
      <ul>
        <li>
          <strong>Account information you provide:</strong> Email and password if you create an account (or email/ID from a
          third-party login like Google or Apple).
        </li>
        <li>
          <strong>Communications:</strong> Messages you send us (e.g., support requests).
        </li>
        <li>
          <strong>Usage data:</strong> Pages viewed, searches made, preferences, device/browser type. We do not collect precise
          location.
        </li>
        <li>
          <strong>Security logs:</strong> IP address and metadata used for fraud prevention and to keep the Service secure.
        </li>
      </ul>
      <p style={{ marginTop: 8 }}>
        <strong>We do not collect</strong> sensitive personal information such as credit card numbers, banking details, or Social
        Security numbers. Payments and logins are handled by trusted third parties.
      </p>

      <h2 style={{ marginTop: 24 }}>3) How We Use Information</h2>
      <ul>
        <li>Provide, maintain, and improve the Service.</li>
        <li>Authenticate users and secure accounts.</li>
        <li>Save your preferences (e.g., language, categories, saved items).</li>
        <li>Respond to support requests and communicate about updates.</li>
        <li>Comply with legal obligations and enforce our Terms.</li>
      </ul>

      <h2 style={{ marginTop: 24 }}>4) How We Share Information</h2>
      <p style={{ marginBottom: 8 }}>
        We do not sell or share your personal data for advertising. We only share information with:
      </p>
      <ul>
        <li>
          <strong>Service providers:</strong> e.g., <em>Vercel</em> (hosting), <em>Supabase/Firebase</em> (auth/database),
          email provider, analytics (if enabled). They are bound by contracts to process data only on our instructions.
        </li>
        <li>
          <strong>Legal purposes:</strong> When required by law, regulation, or valid legal process.
        </li>
        <li>
          <strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, where permitted by law.
        </li>
      </ul>

      <h2 style={{ marginTop: 24 }}>5) Third-Party Logins & Payments</h2>
      <p>
        Logins are handled by providers like Google/Apple. Payments or donations (if offered) are processed by providers such as
        Apple, Google, PayPal, or Stripe. AidFinder does not store your full payment details.
      </p>

      <h2 style={{ marginTop: 24 }}>6) Data Security</h2>
      <p>
        We rely on secure, industry-standard services and reasonable safeguards to protect information. However, no method of
        transmission or storage is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 style={{ marginTop: 24 }}>7) Data Retention</h2>
      <p>
        We keep personal data only as long as necessary for the purposes described in this policy (e.g., while your account is
        active) or as required by law. You can request deletion at any time.
      </p>

      <h2 style={{ marginTop: 24 }}>8) Your Rights</h2>
      <p>
        You may request access, correction, export, or deletion of your data by emailing{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
          {SUPPORT_EMAIL}
        </a>
        . Depending on your location, you may have additional rights under local laws.
      </p>

      <h2 style={{ marginTop: 24 }}>9) Children’s Privacy</h2>
      <p>
        AidFinder is not directed to children under 13, and we do not knowingly collect their personal information. If you
        believe a child has provided us information, contact us to request deletion.
      </p>

      <h2 style={{ marginTop: 24 }}>10) International Users</h2>
      <p>
        Our Service may be operated from the United States. By using AidFinder, you understand your information may be processed
        in the U.S. and other countries that may have different data protection laws than your country.
      </p>

      <h2 style={{ marginTop: 24 }}>11) Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The “Effective date” above shows the last revision date. We will
        post the updated policy on this page and update the date.
      </p>

      <h2 style={{ marginTop: 24 }}>12) Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, email us at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
          {SUPPORT_EMAIL}
        </a>
        .
      </p>
    </main>
  );
}
