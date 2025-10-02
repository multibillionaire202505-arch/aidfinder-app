// pages/support.js
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Support() {
  const [amount, setAmount] = useState("5"); // default custom amount
  const formRef = useRef(null);

  // Safety: keep only numbers + dot, clamp minimum to 1
  const sanitize = (v) => {
    const cleaned = (v || "").replace(/[^\d.]/g, "");
    const num = parseFloat(cleaned || "0");
    if (!isFinite(num)) return "";
    return num < 1 ? "1" : num.toString();
  };

  const quickDonate = (v) => {
    setAmount(String(v));
    // Small delay to ensure state applies before submit
    setTimeout(() => formRef.current?.requestSubmit(), 0);
  };

  useEffect(() => {
    // focus the input on mount for convenience
    try { document.getElementById("amt").focus(); } catch {}
  }, []);

  return (
    <>
      <Head>
        <title>Support AidFinder — Donate</title>
        <meta
          name="description"
          content="Support AidFinder. Donate securely with PayPal — choose a quick $1 donation or enter your own amount."
        />
        <meta name="robots" content="index,follow" />
      </Head>

      <main className="supportPage">
        <section className="hero">
          <img
            src="/logo.png"
            alt="AidFinder logo"
            width={64}
            height={64}
            style={{ borderRadius: 12, objectFit: "contain" }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/icons/icon-192.png";
            }}
          />
          <h1>Support AidFinder</h1>
          <p className="muted">
            Your gift keeps this app free for families, students, seniors, and veterans.
          </p>
        </section>

        <section className="grid reveal">
          {/* Quick $1 */}
          <article className="card" style={{ "--i": 0 }}>
            <h3>Quick Donate</h3>
            <p>Tap once to donate $1 via PayPal.</p>
            <button className="primary" onClick={() => quickDonate(1)}>
              Donate $1
            </button>
          </article>

          {/* Custom amount */}
          <article className="card" style={{ "--i": 1 }}>
            <h3>Choose Your Amount</h3>
            <p>Enter any amount (minimum $1), then pay with PayPal.</p>

            {/* Classic Donate form to PayPal (uses Merchant ID) */}
            <form
              ref={formRef}
              action="https://www.paypal.com/donate"
              method="post"
              target="_blank"
              style={{ display: "grid", gap: 10 }}
            >
              {/* IMPORTANT: Your live Merchant ID */}
              <input type="hidden" name="business" value="T7UXDRDVCHGKE" />
              <input type="hidden" name="item_name" value="Support AidFinder" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="no_note" value="1" />
              <input type="hidden" name="no_shipping" value="1" />
              {/* Optional return/cancel pages (adjust paths if you have them) */}
              {/* <input type="hidden" name="return" value="https://aidfinder.org/support?thankyou=1" /> */}
              {/* <input type="hidden" name="cancel_return" value="https://aidfinder.org/support?canceled=1" /> */}

              <label htmlFor="amt" className="amountLabel">
                Amount (USD)
              </label>
              <div className="amountRow">
                <span className="prefix">$</span>
                <input
                  id="amt"
                  name="amount"
                  inputMode="decimal"
                  placeholder="5"
                  value={amount}
                  onChange={(e) => setAmount(sanitize(e.target.value))}
                  className="amountInput"
                  aria-label="Donation amount in dollars"
                />
              </div>

              <button type="submit" className="primary">Donate with PayPal</button>
              <p className="muted" style={{ marginTop: 4 }}>
                Powered by PayPal • Merchant ID: <code>T7UXDRDVCHGKE</code>
              </p>
            </form>
          </article>

          {/* Why donate */}
          <article className="card" style={{ "--i": 2 }}>
            <h3>Where your donation goes</h3>
            <ul>
              <li>Keeping AidFinder free and ad-free</li>
              <li>Adding more states, languages, and programs</li>
              <li>Accessibility and mobile performance improvements</li>
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
        .hero { text-align: center; margin-bottom: 18px; }
        h1 { margin: 10px 0 6px; font-size: 32px; font-weight: 800; }
        .muted { color: #6b7280; margin: 0; }

        .grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 720px) { .grid { grid-template-columns: 1fr 1fr; } }
        .card {
          background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 16px;
          box-shadow: 0 1px 2px rgba(0,0,0,.04);
          opacity: 0; translate: 0 12px;
          transition: opacity .48s ease, translate .48s ease, box-shadow .18s ease, transform .18s ease;
          transition-delay: calc(var(--i, 0) * 80ms);
        }
        .reveal .card { opacity: 1; translate: 0 0; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.08); }

        .primary {
          background: #16a34a; color: #fff; border: none; border-radius: 10px;
          padding: 12px 16px; font-weight: 700; cursor: pointer;
          box-shadow: 0 6px 16px rgba(0,0,0,.12);
        }
        .primary:hover { filter: brightness(0.95); }

        .amountLabel { font-weight: 600; }
        .amountRow { display: flex; align-items: center; border: 1px solid #d1d5db; border-radius: 10px; }
        .prefix { padding: 10px 10px 10px 12px; color: #6b7280; }
        .amountInput {
          flex: 1; border: 0; outline: none; padding: 10px 12px; font-size: 16px; border-radius: 10px;
        }
        .amountInput:focus { box-shadow: inset 0 0 0 2px rgba(22,163,74,.3); }
      `}</style>
    </>
  );
}
