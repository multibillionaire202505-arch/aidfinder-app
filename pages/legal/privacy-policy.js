// pages/privacy/index.js
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Privacy() {
  // trigger fade-in after mount
  const [reveal, setReveal] = useState(false);
  useEffect(() => { setReveal(true); }, []);

  return (
    <>
      <Head>
        <title>Privacy Policy — AidFinder</title>
        <meta
          name="description"
          content="AidFinder Privacy Policy – how we collect, use, and protect your data."
        />
      </Head>

      <main className="privacyPage">
        {/* Hero */}
        <section className="hero">
          <img
            src="/logo.png"
            alt="AidFinder logo"
            width={72}
            height={72}
            className="logo"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/icons/icon-192.png";
            }}
          />
          <h1>Privacy Policy</h1>
          <p className="muted">
            Last updated: September 27, 2025
          </p>
          <p className="muted">
            We respect your privacy. This page explains what we collect and how
            we handle your information.
          </p>
        </section>

        {/* Cards */}
        <section className={`grid ${reveal ? "reveal" : ""}`}>
          <article className="card" style={{ "--i": 0 }}>
            <h3>1. Information We Collect</h3>
            <p>
              We collect only the minimum information needed to operate the app
              (such as language preference, device type) and any details you
              voluntarily submit. We do not sell your data.
            </p>
          </article>

          <article className="card" style={{ "--i": 1 }}>
            <h3>2. How We Use It</h3>
            <ul>
              <li>Provide and improve AidFinder features</li>
              <li>Personalize your experience</li>
              <li>Maintain app security and reliability</li>
            </ul>
          </article>

          <article className="card" style={{ "--i": 2 }}>
            <h3>3. Sharing</h3>
            <p>
              We never share personal information except when required by law or
              to protect users and the service. Trusted providers working on our
              behalf must follow strict confidentiality.
            </p>
          </article>

          <article className="card" style={{ "--i": 3 }}>
            <h3>4. Data Security</h3>
            <p>
              We use reasonable safeguards to protect your data but cannot
              guarantee absolute security. We continuously improve our measures.
            </p>
          </article>

          <article className="card" style={{ "--i": 4 }}>
            <h3>5. Your Rights</h3>
            <ul>
              <li>Request access or deletion of your data</li>
              <li>Contact us for privacy questions</li>
              <li>Opt out of optional communications</li>
            </ul>
          </article>

          <article className="card" style={{ "--i": 5 }}>
            <h3>6. Children’s Privacy</h3>
            <p>
              AidFinder is not directed to children under 13. We do not knowingly
              collect their information.
            </p>
          </article>

          <article className="card" style={{ "--i": 6 }}>
            <h3>7. Changes & Contact</h3>
            <p>
              We may update this policy; changes will be posted here. Questions?
              Email us at <a className="link" href="mailto:support@aidfinder.app">support@aidfinder.app</a>.
            </p>
          </article>
        </section>
      </main>

      <style jsx>{`
        .privacyPage {
          max-width: 840px;
          margin: 40px auto;
          padding: 0 16px 40px;
          line-height: 1.6;
        }
        .hero {
          text-align: center;
          margin-bottom: 18px;
        }
        .logo {
          display: inline-block;
          margin-bottom: 10px;
          border-radius: 12px;
          object-fit: contain;
        }
        h1 {
          margin: 0 0 6px;
          font-size: 32px;
          font-weight: 800;
        }
        .muted {
          color: #6b7280;
          margin: 0;
        }
        /* Cards grid + staggered appear */
        .grid {
          display: grid;
          grid-template-columns: 1fr;
