// pages/legal/privacy-policy.js
import Head from "next/head";
import { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  // Trigger staggered fade-in after mount (avoids SSR mismatch)
  const [reveal, setReveal] = useState(false);
  useEffect(() => { setReveal(true); }, []);

  return (
    <>
      <Head>
        <title>Privacy Policy — AidFinder</title>
        <meta
          name="description"
          content="AidFinder Privacy Policy — how we collect, use, and protect your data."
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
        <p className="muted">Last updated: September 27, 2025</p>
        <p className="muted">
          We respect your privacy. This page explains what we collect and how we handle your information.
        </p>
        </section>

        {/* Cards (staggered fade-in like About) */}
        <section className={`grid ${reveal ? "reveal" : ""}`}>
          <article className="card" style={{ "--i": 0 }}>
            <h3>1) Information We Collect</h3>
            <p>
              We collect the minimum information needed to operate the app, such as basic device/usage data
              (e.g., language preference, app version) and any details you voluntarily submit (like feedback or
              support emails). We do <strong>not</strong> sell personal data.
            </p>
          </article>

          <article className="card" style={{ "--i": 1 }}>
            <h3>2) How We Use Your Information</h3>
            <ul>
              <li>Provide core AidFinder features and functionality</li>
              <li>Personalize content (e.g., language, location-based results if enabled)</li>
              <li>Maintain security, prevent abuse, and debug issues</li>
              <li>Analyze aggregated usage to improve the app</li>
            </ul>
          </article>

          <article className="card" style={{ "--i": 2 }}>
            <h3>3) Sharing</h3>
            <p>
              We do not share personal information except:
            </p>
            <ul>
              <li>When required by law or legal process</li>
              <li>To protect the rights, property, or safety of users and AidFinder</li>
              <li>
                With trusted service providers who help us operate the app under confidentiality obligations
              </li>
            </ul>
          </article>

          <article className="card" style={{ "--i": 3 }}>
            <h3>4) Data Security</h3>
            <p>
              We use reasonable technical and organizational measures to protect your information. However,
              no method of transmission or storage is 100% secure.
            </p>
          </article>

          <article className="card" style={{ "--i": 4 }}>
            <h3>5) Your Choices & Rights</h3>
            <ul>
              <li>Request access to or deletion of your personal information</li>
              <li>Opt out of optional communications</li>
              <li>Ask questions about how your data is handled</li>
            </ul>
            <p className="muted">
              Contact: <a className="link" href="mailto:support@aidfinder.app">support@aidfinder.app</a>
            </p>
          </article>

          <article className="card" style={{ "--i": 5 }}>
            <h3>6) Children’s Privacy</h3>
            <p>
              AidFinder is not directed to children under 13. We do not knowingly collect personal information
              from children.
            </p>
          </article>

          <article className="card" style={{ "--i": 6 }}>
            <h3>7) Changes to This Policy</h3>
            <p>
              We may update this policy from time to time. Updates will appear on this page with a new
              “Last updated” date.
            </p>
          </article>

          <article className="card" style={{ "--i": 7 }}>
            <h3>8) Contact Us</h3>
            <p>
              Email <a className="link" href="mailto:support@aidfinder.app">support@aidfinder.app</a> for any
              privacy questions or requests.
            </p>
            <p className="muted">
              See also our <a className="link" href="/terms">Terms</a>.
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

        /* Cards grid + staggered appear (matches About) */
        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 720px) {
          .grid { grid-template-columns: 1fr 1fr; }
        }
        .card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 1px 2px rgba(0,0,0,.04);
          transition:
            box-shadow .18s ease,
            transform .18s ease,
            opacity .48s ease,
            translate .48s ease;
          /* start hidden for animation */
          opacity: 0;
          translate: 0 12px;
          /* stagger per card */
          transition-delay: calc(var(--i, 0) * 80ms);
          will-change: opacity, transform, translate;
        }
        .grid.reveal .card {
          opacity: 1;
          translate: 0 0;
        }
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,.08);
        }
        h3 { margin: 0 0 8px; }
        ul { margin: 0 0 8px 18px; }
        .link { color: #2563eb; text-decoration: underline; }
      `}</style>
    </>
  );
}
