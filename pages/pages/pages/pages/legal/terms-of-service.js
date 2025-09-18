// File: pages/legal/terms-of-service.js
export default function TermsOfService() {
  const EFFECTIVE_DATE = "September 17, 2025";
  const SUPPORT_EMAIL = "aidfinder.app@gmail.com";

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16, lineHeight: 1.6 }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ fontSize: 14, color: "#666" }}>Effective date: {EFFECTIVE_DATE}</p>
      </header>

      <h2>1) Acceptance of Terms</h2>
      <p>
        By using AidFinder (“Service”), you agree to these Terms of Service. If you do not agree,
        you may not use the Service.
      </p>

      <h2 style={{ marginTop: 24 }}>2) Use of the Service</h2>
      <ul>
        <li>You may only use the Service for lawful purposes.</li>
        <li>You may not attempt to disrupt, hack, or overload the Service.</li>
        <li>You are responsible for any activity under your account.</li>
      </ul>

      <h2 style={{ marginTop: 24 }}>3) Third-Party Resources</h2>
      <p>
        AidFinder connects you with third-party organizations (food banks, housing assistance,
        financial programs, etc.). We do not control or guarantee the accuracy, availability, or
        outcome of those services.
      </p>

      <h2 style={{ marginTop: 24 }}>4) Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, AidFinder is not liable for any damages resulting
        from your use of the Service or reliance on third-party resources. The Service is provided
        “as is.”
      </p>

      <h2 style={{ marginTop: 24 }}>5) Changes to the Service</h2>
      <p>
        We may modify, suspend, or discontinue the Service at any time, with or without notice.
      </p>

      <h2 style={{ marginTop: 24 }}>6) Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. The “Effective date” above shows the last
        revision date. Continued use of the Service means you accept any changes.
      </p>

      <h2 style={{ marginTop: 24 }}>7) Contact Us</h2>
      <p>
        If you have questions about these Terms, please email us at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
          {SUPPORT_EMAIL}
        </a>.
      </p>
    </main>
  );
}
