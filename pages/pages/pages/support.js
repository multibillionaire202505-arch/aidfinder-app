// pages/support.js
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Support() {
  const [reveal, setReveal] = useState(false);
  useEffect(() => { setReveal(true); }, []);

  return (
    <>
      <Head>
        <title>Support — AidFinder</title>
        <meta
          name="description"
          content="Keep AidFinder free and fast for families in need. Donate via PayPal or get involved in other ways."
        />
      </Head>

      <main className="supportPage">
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
          <h1>Support AidFinder</h1>
          <p className="muted">
            Your contribution keeps this app free, fast, and accessible to everyone.
          </p>
        </section>

        {/* Content cards */}
        <section className={`grid ${reveal ? "reveal" : ""}`}>
          <article className="card" style={{ "--i": 0 }}>
            <h3>Why your support matters</h3>
            <p>
              Every day, people search for food, health, housing, utilities, education, and income programs.
              Your donation helps us maintain accurate links, improve multilingual access, and keep the
              experience simple and dignified.
            </p>
          </article>

          <article className="card" style={{ "--i": 1 }}>
            <h3>Where funds go</h3>
            <ul>
              <li>Hosting and uptime monitoring</li>
              <li>Content refresh and link verification</li>
              <li>Accessibility & multilingual improvements</li>
              <li>New features and performance work</li>
            </ul>
          </article>

          <article className="card" style={{ "--i": 2 }}>
            <h3>Donate with PayPal</h3>
            <p className="muted" style={{ marginTop: -4 }}>
              You can choose the amount on the PayPal page. One-time or recurring—both help a lot. ❤️
            </p>

            <form
              action="https://www.paypal.com/donate"
              method="post"
              target="_blank"
              style={{ marginTop: 10 }}
            >
              {/* Your PayPal Merchant ID */}
              <input type="hidden" name="business" value="T7UXDRDVCHGKE" />
              <input type="hidden" name="no_recurring" value="0" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="item_name" value="Support AidFinder" />
              <button type="submit" className="btn primary">Donate with PayPal</button>
            </form>

            <p className="fineprint">
              Secure payment is handled by PayPal. We don’t store card details.
              See our <a href="/privacy">Privacy Policy</a>.
            </p>
          </article>

          <article className="card" style={{ "--i": 3 }}>
            <h3>Other ways to help</h3>
            <ul>
              <li>
                Share AidFinder with friends, schools, libraries, and community groups.
              </li>
              <li>
                Suggest new programs or corrections:{" "}
                <a className="link" href="mailto:support@aidfinder.app?subject=Program%20Suggestion">
                  support@aidfinder.app
                </a>
              </li>
              <li>
                Partner with us: nonprofits, agencies, campuses—{" "}
                <a className="link" href="mailto:support@aidfinder.app?subject=Partnership%20Inquiry">
                  get in touch
                </a>
                .
              </li>
            </ul>
          </article>
        </section>
      </main>

      <style jsx>{`
        .supportPage {
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
        ul { margin: 0 0 8px 18px; }
        .link { color: #2563eb; text-decoration: underline; }

        .btn.primary {
          background: #0ea5e9;
          color: #fff;
          font-weight: 700;
          border: 0;
          border-radius: 10px;
          padding: 12px 16px;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
        .btn.primary:hover { filter: brightness(0.95); }
        .fineprint {
          font-size: 12.5px;
          color: #6b7280;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}
