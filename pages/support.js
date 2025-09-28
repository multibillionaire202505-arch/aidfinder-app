// pages/support.js
import Head from "next/head";
import { useEffect, useState } from "react";

const PAYPAL_MERCHANT_ID = "T7UXDRDVCHGKE";

export default function Support() {
  // simple mount flag for fade-in (avoids SSR mismatch)
  const [reveal, setReveal] = useState(false);
  useEffect(() => setReveal(true), []);

  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");

  const openPayPal = (amt) => {
    const amount = Number(amt);
    if (!Number.isFinite(amount)) return;
    const base = "https://www.paypal.com/donate";
    const params = new URLSearchParams({
      business: PAYPAL_MERCHANT_ID,
      currency_code: "USD",
      no_recurring: "0",
      item_name: "Support AidFinder",
      amount: amount.toFixed(2),
    });
    window.open(`${base}?${params.toString()}`, "_blank", "noopener,noreferrer");
  };

  const handleCustomDonate = (e) => {
    e.preventDefault();
    setError("");
    const val = parseFloat((customAmount || "").toString().replace(",", "."));
    if (!Number.isFinite(val) || val < 1 || val > 5000) {
      setError("Please enter a valid amount (1–5000).");
      return;
    }
    openPayPal(val);
  };

  return (
    <>
      <Head>
        <title>Support — AidFinder</title>
        <meta
          name="description"
          content="Support AidFinder so we can keep this app free and accessible. Donate $1 or enter a custom amount via PayPal."
        />
      </Head>

      <main className="supportPage">
        {/* Hero */}
        <section className={`hero ${reveal ? "reveal" : ""}`}>
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
            Your donation keeps AidFinder free for families, students, seniors, and veterans who need it most.
          </p>
        </section>

        {/* Donate card */}
        <section className={`grid ${reveal ? "reveal" : ""}`}>
          <article className="card" style={{ "--i": 0 }}>
            <h3>Make a Donation</h3>
            <p>Choose a quick amount or enter your own. Every dollar helps—thank you! 🙏</p>

            <div className="donateRow">
              <button type="button" className="quickBtn" onClick={() => openPayPal(1)}>
                Donate $1
              </button>

              <form className="customDonate" onSubmit={handleCustomDonate}>
                <input
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]{0,2}"
                  min="1"
                  step="0.01"
                  placeholder="USD (e.g. 5, 10, 25)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  aria-label="Custom amount"
                />
                <button type="submit" className="goBtn">Donate</button>
              </form>
            </div>

            {error && <div className="errorText">{error}</div>}

            <div className="finePrint">
              Payments are processed securely by PayPal to our account (Merchant ID: <code>{PAYPAL_MERCHANT_ID}</code>).
            </div>
          </article>

          <article className="card" style={{ "--i": 1 }}>
            <h3>Other Ways to Help</h3>
            <ul>
              <li>
                Share AidFinder with someone who needs help:{" "}
                <a href="https://aidfinder.app" target="_blank" rel="noreferrer">aidfinder.app</a>
              </li>
              <li>
                Send program suggestions:{" "}
                <a href="mailto:support@aidfinder.app?subject=Program%20Suggestion">support@aidfinder.app</a>
              </li>
              <li>
                Partner with us (nonprofits, schools, libraries):{" "}
                <a href="mailto:support@aidfinder.app?subject=Partnership%20Inquiry">email the team</a>
              </li>
            </ul>
          </article>
        </section>

        {/* Back links */}
        <p className="muted backLinks">
          <a href="/">← Back to Home</a> • <a href="/about">About</a> • <a href="/privacy">Privacy</a> • <a href="/terms">Terms</a>
        </p>
      </main>

      <style jsx>{`
        .supportPage {
          max-width: 840px;
          margin: 40px auto;
          padding: 0 16px 40px;
          line-height: 1.6;
        }
        .hero { text-align: center; margin-bottom: 18px; opacity: 0; transform: translateY(12px); transition: opacity .48s, transform .48s; }
        .hero.reveal { opacity: 1; transform: translateY(0); }
        .logo { display: inline-block; margin-bottom: 10px; border-radius: 12px; object-fit: contain; }
        h1 { margin: 0 0 6px; font-size: 32px; font-weight: 800; }
        .muted { color: #6b7280; margin: 0; }
        .backLinks { margin-top: 16px; text-align: center; }

        .grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 720px) { .grid { grid-template-columns: 1fr 1fr; } }

        .card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 1px 2px rgba(0,0,0,.04);
          transition: box-shadow .18s ease, transform .18s ease, opacity .48s ease, translate .48s ease;
          opacity: 0; translate: 0 12px;
          transition-delay: calc(var(--i, 0) * 80ms);
          will-change: opacity, transform, translate;
        }
        .grid.reveal .card { opacity: 1; translate: 0 0; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.08); }
        h3 { margin: 0 0 8px; }

        .donateRow { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
        .quickBtn {
          background: #16a34a; color: #fff; border: 1px solid #15803d;
          padding: 10px 14px; border-radius: 10px; cursor: pointer; font-weight: 700;
        }
        .quickBtn:hover { filter: brightness(0.98); }
        .customDonate { display: inline-flex; gap: 8px; align-items: center; }
        .customDonate input {
          width: 180px; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 10px; outline: none;
        }
        .customDonate input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,.15); }
        .goBtn { background: #111827; color: #fff; border: 1px solid #111827; padding: 10px 14px; border-radius: 10px; cursor: pointer; font-weight: 700; }
        .errorText { margin-top: 8px; color: #b91c1c; font-size: 14px; }
        .finePrint { margin-top: 10px; font-size: 13px; color: #6b7280; }
      `}</style>
    </>
  );
}
