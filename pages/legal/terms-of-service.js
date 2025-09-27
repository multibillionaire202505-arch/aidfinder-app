// pages/legal/terms.js
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Terms() {
  // Trigger staggered fade-in after mount (avoids SSR mismatch)
  const [reveal, setReveal] = useState(false);
  useEffect(() => { setReveal(true); }, []);

  return (
    <>
      <Head>
        <title>Terms & Conditions — AidFinder</title>
        <meta
          name="description"
          content="AidFinder Terms & Conditions — the rules for using our app and services."
        />
      </Head>

      <main className="termsPage">
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
          <h1>Terms & Conditions</h1>
          <p className="muted">Last updated: September 27, 2025</p>
          <p className="muted">
            Please read these terms carefully before using AidFinder. By
            accessing or using our app, you agree to these Terms.
          </p>
        </section>

        {/* Cards (staggered fade-in) */}
        <section className={`grid ${reveal ? "reveal" : ""}`}>
          <article className="card" style={{ "--i": 0 }}>
            <h3>1) Acceptance of Terms</h3>
            <p>
              By using AidFinder, you confirm that you are at least 13 years old
              and agree to comply with these Terms. If you do not agree, please
              do not use the app.
            </p>
          </article>

          <article className="card" style={{ "--i": 1 }}>
            <h3>2) Purpose of AidFinder</h3>
            <p>
              AidFinder helps users discover and access official assistance
              programs. We do not provide aid directly and are not responsible
              for third-party services linked in the app.
            </p>
          </article>

          <article className="card" style={{ "--i": 2 }}>
            <h3>3) User Responsibilities</h3>
            <ul>
              <li>Use the app lawfully and respectfully</li>
              <li>Do not misuse, disrupt, or exploit the service</li>
              <li>
                You are responsible for verifying program details with the
                official source
              </li>
            </ul>
          </article>

          <article className="card" style={{ "--i": 3 }}>
            <h3>4) Intellectual Property</h3>
            <p>
              All content, branding, and design in AidFinder are owned by us or
              licensed to us. You may not copy, modify, or distribute them
              without permission.
            </p>
          </article>

          <article className="card" style={{ "--i": 4 }}>
            <h3>5) Disclaimers</h3>
            <p>
              AidFinder is provided “as is.” While we strive for accuracy, we
              cannot guarantee that program listings are always complete,
              up-to-date, or error-free.
            </p>
          </article>

          <article className="card" style={{ "--i": 5 }}>
            <h3>6) Limitation of Liability</h3>
            <p>
              We are not liable for any direct or indirect damages arising from
              your use of the app or reliance on third-party programs or
              websites.
            </p>
          </article>

          <article className="card" style={{ "--i": 6 }}>
            <h3>7) Changes to Terms</h3>
            <p>
              We may update these Terms periodically. Updates will be posted
              here with a new “Last updated” date.
            </p>
          </article>

          <article className="card" style={{ "--i": 7 }}>
            <h3>8) Governing Law</h3>
            <p>
              These Terms are governed by the laws of the United States. Any
              disputes will be handled in courts located in your state of
              residence.
            </p>
          </article>

          <article className="card" style={{ "--i": 8 }}>
            <h3>9) Contact Us</h3>
            <p>
              For questions about these Terms, email{" "}
              <a className="link" href="mailto:support@aidfinder.app">
                support@aidfinder.app
              </a>
            </p>
          </article>
        </section>
      </main>

      <style jsx>{`
        .termsPage {
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
          gap: 14px;
        }
        @media (min-width: 720px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 1px 2px rgba(0,0,0,.04);
          transition: box-shadow 0.18s ease, transform 0.18s ease,
            opacity 0.48s ease, translate 0.48s ease;
          opacity: 0;
          translate: 0 12px;
          transition-delay: calc(var(--i, 0) * 80ms);
          will-change: opacity, transform, translate;
        }
        .grid.reveal .card {
          opacity: 1;
          translate: 0 0;
        }
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }
        h3 {
          margin: 0 0 8px;
        }
        ul {
          margin: 0 0 8px 18px;
        }
        .link {
          color: #2563eb;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
