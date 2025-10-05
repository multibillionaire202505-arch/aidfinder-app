// pages/donate.js
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Donate() {
  // simple mount flag for fade-in (uses your global .grid/.reveal styles if present)
  const [reveal, setReveal] = useState(false);
  useEffect(() => setReveal(true), []);

  // Your PayPal Merchant ID (from earlier)
  const PAYPAL_MERCHANT_ID = "T7UXDRDVCHGKE";

  // Optional local amount state (purely for UX validation before posting to PayPal)
  const [amount, setAmount] = useState("");

  const onSubmit = (e) => {
    // Allow blank (so PayPal shows the amount field on their page)
    if (amount === "") return; // no client validation if empty

    // If provided, do a quick client-side check
    const n = Number(amount);
    if (isNaN(n) || n <= 0) {
      e.preventDefault();
      alert("Please enter a valid amount greater than 0, or leave it blank to choose on PayPal.");
    }
  };

  return (
    <>
      <Head>
        <title>Donate — AidFinder</title>
        <meta
          name="description"
          content="Support AidFinder. Your donation helps keep this app free for families in need."
        />
      </Head>

      <main className="donatePage">
        <section className="hero" style={{ textAlign: "center", margin: "28px 0 10px" }}>
          <img
            src="/logo.png"
            alt="AidFinder logo"
            width={64}
            height={64}
            style={{ borderRadius: 12, objectFit: "contain", display: "inline-block" }}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/icons/icon-192.png"; }}
          />
          <h1 style={{ margin: "10px 0 6px" }}>Support AidFinder</h1>
          <p style={{ margin: 0, color: "#6b7280" }}>
            Your donation helps keep this app free for families in need. Thank you! ❤️
          </p>
        </section>

        <section className={`donateCard ${reveal ? "show" : ""}`}>
          <form
            action="https://www.paypal.com/donate"
            method="post"
            target="_blank"
            onSubmit={onSubmit}
          >
            {/* Required fields */}
            <input type="hidden" name="business" value={PAYPAL_MERCHANT_ID} />
            <input type="hidden" name="currency_code" value="USD" />
            <input type="hidden" name="item_name" value="Support AidFinder" />

            {/* Optional amount: if left blank, PayPal will let the donor choose on their site */}
            <label htmlFor="amount" className="label">
              Amount (USD) <span className="muted">— leave blank to choose on PayPal</span>
            </label>
            <input
              id="amount"
              name="amount"
              inputMode="decimal"
              placeholder="e.g. 10.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="amountInput"
            />

            <button type="submit" className="donateBtn">
              Donate with PayPal
            </button>

            <p className="smallPrint">
              We never store your card details. All payments are processed securely by PayPal.
            </p>
          </form>
        </section>

        <section style={{ textAlign: "center", marginTop: 18 }}>
          <a href="/" className="backLink">← Back to Home</a>
        </section>
      </main>

      <style jsx>{`
        .donatePage {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 16px 40px;
        }
        .muted { color: #6b7280; font-weight: 400; }
        .donateCard {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 18px;
          margin-top: 14px;
          box-shadow: 0 1px 2px rgba(0,0,0,.04);
          opacity: 0;
          transform: translateY(12px);
          transition: opacity .45s ease, transform .45s ease;
        }
        .donateCard.show {
          opacity: 1;
          transform: translateY(0);
        }
        .label {
          display: block;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .amountInput {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          font-size: 16px;
          outline: none;
          margin-bottom: 12px;
        }
        .amountInput:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,.15);
        }
        .donateBtn {
          width: 100%;
          background: #16a34a;
          color: #fff;
          border: none;
          padding: 12px 16px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
          box-shadow: 0 6px 16px rgba(0,0,0,0.10);
        }
        .donateBtn:hover {
          filter: brightness(1.03);
        }
        .smallPrint {
          margin: 10px 0 0;
          font-size: 13px;
          color: #6b7280;
          text-align: center;
        }
        .backLink {
          color: #2563eb;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
