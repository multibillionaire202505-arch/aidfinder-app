// pages/support.js
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Support() {
  // Trigger staggered fade-in
  const [reveal, setReveal] = useState(false);
  useEffect(() => { setReveal(true); }, []);

  return (
    <>
      <Head>
        <title>Support AidFinder</title>
        <meta
          name="description"
          content="Support AidFinder — keep access to aid programs free and simple for everyone."
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
            Your support helps keep AidFinder free, simple, and available to everyone in need.
          </p>
        </section>

        {/* Cards */}
        <section className={`grid ${reveal ? "reveal" : ""}`}>
          {/* 1. Why Support */}
          <article className="card" style={{ "--i": 0 }}>
            <h3>Why Your Support Matters</h3>
            <p>
              AidFinder connects families, students, seniors, and veterans with official programs like SNAP,
              Medicaid, Section 8, Pell Grants, and more. Donations help us stay independent, improve accessibility,
              and expand multilingual support.
            </p>
          </article>

          {/* 2. Ways to Help */}
          <article className="card" style={{ "--i": 1 }}>
            <h3>Ways to Help</h3>
            <ul>
              <li>Donate to keep AidFinder free for everyone</li>
              <li>Share AidFinder with your community</li>
              <li>Partner with us (nonprofits, schools, libraries, agencies)</li>
            </ul>
          </article>

          {/* 3. Donate */}
          <article className="card" style={{ "--i": 2 }}>
            <h3>Donate Online</h3>
            <p>Quick and secure via PayPal:</p>
            <form
              action="https://www.paypal.com/donate"
              method="post"
              target="_blank"
              style={{ marginTop: 12 }}
            >
              <input type="hidden" name="business" value="YOUR-MERCHANT-ID-HERE" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="item_name" value="Support AidFinder" />
              <button
                type="submit"
                style={{
                  backgroundColor: "#0070f3",
                  color: "#fff",
                  border: "none",
                  padding: "12px 18px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 600,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.12)"
                }}
              >
                Donate with PayPal
              </button>
            </form>
          </article>

          {/* 4. Contact */}
          <article className="card" style={{ "--i": 3 }}>
            <h3>Contact Us</h3>
            <p>
              For partnerships, program suggestions, or questions about donations, email us at{" "}
              <a href="mailto:support@aidfinder.app">support@aidfinder.app</a>.
            </p>
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
          margin-bottom: 20px;
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

        /* Grid + stagger animation */
        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
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
          opacity: 0;
          translate: 0 12px;
          transition: box-shadow .18s ease, transform .18s ease, opacity .48s ease, translate .48s ease;
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
        a { color: #2563eb; }
      `}</style>
    </>
  );
}
