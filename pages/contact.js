// pages/contact/index.js
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Contact() {
  const [reveal, setReveal] = useState(false);
  useEffect(() => { setReveal(true); }, []);

  return (
    <>
      <Head>
        <title>Contact Us — AidFinder</title>
        <meta
          name="description"
          content="Contact AidFinder for support, questions, or partnership opportunities."
        />
      </Head>

      <main className="contactPage">
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
          <h1>Contact Us</h1>
          <p className="muted">We’d love to hear from you.</p>
        </section>

        {/* Cards */}
        <section className={`grid ${reveal ? "reveal" : ""}`}>
          <article className="card" style={{ "--i": 0 }}>
            <h3>General Questions</h3>
            <p>
              Have a question about AidFinder or how it works? Reach out and
              we’ll respond as soon as possible.
            </p>
            <p>
              <a className="link" href="mailto:support@aidfinder.app">
                support@aidfinder.app
              </a>
            </p>
          </article>

          <article className="card" style={{ "--i": 1 }}>
            <h3>Partnerships</h3>
            <p>
              Nonprofits, schools, libraries, or agencies interested in
              partnering with AidFinder can contact us here:
            </p>
            <p>
              <a className="link" href="mailto:support@aidfinder.app?subject=Partnership%20Inquiry">
                support@aidfinder.app
              </a>
            </p>
          </article>

          <article className="card" style={{ "--i": 2 }}>
            <h3>Program Suggestions</h3>
            <p>
              Know of an aid program we should include? Help us expand by
              sending suggestions.
            </p>
            <p>
              <a className="link" href="mailto:support@aidfinder.app?subject=Program%20Suggestion">
                support@aidfinder.app
              </a>
            </p>
          </article>
        </section>
      </main>

      <style jsx>{`
        .contactPage {
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
          transition: box-shadow .18s ease, transform .18s ease, opacity .48s ease, translate .48s ease;
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
          box-shadow: 0 8px 20px rgba(0,0,0,.08);
        }
        h3 { margin: 0 0 8px; }
        .link { color: #2563eb; text-decoration: underline; }
      `}</style>
    </>
  );
}
