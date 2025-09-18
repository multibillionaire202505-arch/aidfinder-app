// pages/legal/privacy-policy.js
import Head from "next/head";

export default function PrivacyPolicy() {
  const EFFECTIVE_DATE = "September 17, 2025";
  const SUPPORT_EMAIL = "aidfinder.app@gmail.com";

  return (
    <>
      <Head>
        <title>Privacy Policy — AidFinder</title>
        <meta name="description" content="AidFinder privacy policy." />
      </Head>

      <main style={{ maxWidth: 720, margin: "40px auto", padding: 16, lineHeight: 1.6 }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Privacy Policy</h1>
          <p style={{ fontSize: 14, color: "#666" }}>Effective date: {EFFECTIVE_DATE}</p>
        </header>

        <section style={{ border: "1px solid #ddd", background: "#f9f9f9", borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <p>
            <strong>Summary:</strong> We collect the minimum data needed to run AidFinder (e.g., account email and basic usage).
            We <strong>do not sell or share</strong> your personal information for advertising. You can request access or deletion any time at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
              {SUPPORT_EMAIL}
            </a>.
          </p>
        </section>

        <h2>1) Who We Are</h2>
        <p>
          AidFinder (“AidFinder,” “we,” “us,” or “our”) helps people discover assistance resources across Food, Health, Housing,
          Financial, and Education categories. This Privacy Policy explains how we handle information when you use our web or
          mobile app (the “Service”).
        </p>

        <h2 style={{ marginTop: 24 }}>2) Information We Collect</h2>
        <ul>
          <li><strong>Account information you provide:</strong> Email and password if you create an account.</li>
          <li><strong>Communications:</strong> Messages you send us.</li>
          <li><strong>Usage data:</strong> Pages viewed, searches made, device type (no precise location).</li>
          <li><strong>Security logs:</strong> IP address and metadata for safety.</li>
        </ul>

        <h2 style={{ marginTop: 24 }}>3) How We Use Information</h2>
        <ul>
          <li>Provide, maintain, and improve the Service.</li>
          <li>Authenticate users and secure accounts.</li>
          <li>Respond to support requests.</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h2 style={{ marginTop: 24 }}>4) How We Share Information</h2>
        <p>We do not sell or share your personal data for advertising. We only share with:</p>
        <ul>
          <li><strong>Service providers:</strong> Vercel (hosting), Supabase (database, auth), email provider.</li>
          <li><strong>Legal purposes:</strong> If required by law.</li>
          <li><strong>Business transfers:</strong> If AidFinder is merged or acquired.</li>
        </ul>

        <h2 style={{ marginTop: 24 }}>5) Your Rights</h2>
        <p>
          You may request access, correction, or deletion of your data at any time by emailing{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
            {SUPPORT_EMAIL}
          </a>.
        </p>

        <h2 style={{ marginTop: 24 }}>6) Children’s Privacy</h2>
        <p>
          AidFinder is not directed to children under 13, and we do not knowingly collect their personal information.
        </p>

        <h2 style={{ marginTop: 24 }}>7) Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The “Effective date” above shows the last revision date.
        </p>

        <h2 style={{ marginTop: 24 }}>8) Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, email us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
            {SUPPORT_EMAIL}
          </a>.
        </p>
      </main>
    </>
  );
}
