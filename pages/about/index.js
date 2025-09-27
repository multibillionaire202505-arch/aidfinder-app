// pages/about/index.js
import Head from "next/head";
import { useEffect, useState } from "react";

export default function About() {
  const [reveal, setReveal] = useState(false);
  useEffect(() => setReveal(true), []);

  return (
    <>
      <Head>
        <title>About Us — AidFinder</title>
        <meta
          name="description"
          content="AidFinder helps people quickly discover official public aid programs—Food, Health, Housing, Utilities, Education, and Income—in one modern, simple app."
        />
      </Head>

      <main style={{ padding: "32px 16px", maxWidth: 880, margin: "0 auto" }}>
        {/* Hero */}
        <section className={`fadeItem ${reveal ? "in" : ""}`} style={{ textAlign: "center", marginBottom: 24, ["--i"]: 0 }}>
          <img
            src="/logo.png"
            alt="AidFinder logo"
            width={72}
            height={72}
            style={{ width: 72, height: 72, objectFit: "contain", marginBottom: 8 }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/icons/icon-192.png";
            }}
          />
          <h1 style={{ margin: "0 0 8px" }}>About AidFinder</h1>
          <p style={{ margin: 0, opacity: 0.85 }}>
            One place to find real help—fast. Food, Health, Housing, Utilities, Education, and Income programs,
            all in a clean, modern experience.
          </p>
        </section>

        {/* Changing Perception */}
        <section className={`card fadeItem ${reveal ? "in" : ""}`} style={{ ["--i"]: 1 }}>
          <h3 style={{ marginTop: 0 }}>Changing the Perception</h3>
          <p style={{ margin: 0 }}>
            Many people (especially abroad) think the U.S. lacks social support. In reality, there are hundreds of
            federal, state, and local programs—the real challenge is <strong>finding them</strong>. AidFinder was
            built to fix that: by making programs visible, clear, and accessible to everyone. Our country has extensive
            support; people miss out because the right information is hard to find. We’re changing that.
          </p>
        </section>

        {/* Mission */}
        <section className={`card fadeItem ${reveal ? "in" : ""}`} style={{ ["--i"]: 2 }}>
          <h3 style={{ marginTop: 0 }}>Our Mission</h3>
          <p style={{ margin: 0 }}>
            We believe access to essential programs should be simple and dignified. AidFinder organizes official
            federal, state, and local resources in one place so families, students, seniors, and veterans can
            discover and apply in minutes—not hours.
          </p>
        </section>

        {/* Multilingual Support */}
        <section className={`card fadeItem ${reveal ? "in" : ""}`} style={{ ["--i"]: 3 }}>
          <h3 style={{ marginTop: 0 }}>Multilingual Support</h3>
          <p style={{ margin: 0 }}>
            AidFinder is designed for everyone. The app is available in <strong>English</strong> 🇺🇸,{" "}
            <strong>Spanish</strong> 🇪🇸, and <strong>French</strong> 🇫🇷 (more coming). Access to help should not
            depend on the language you speak.
          </p>
        </section>

        {/* What we offer */}
        <section className={`card fadeItem ${reveal ? "in" : ""}`} style={{ ["--i"]: 4 }}>
          <h3 style={{ marginTop: 0 }}>What We Offer</h3>
          <ul style={{ margin: "0 0 0 1.2rem" }}>
            <li>Verified programs across Food, Health, Housing, Utilities, Education, Income</li>
            <li>Filter by category and state</li>
            <li>Clear “Apply Now” links to official websites</li>
            <li>Multilingual experience (English, Spanish, French)</li>
            <li>Save favorites on your device (sync coming soon)</li>
          </ul>
        </section>

        {/* Values */}
        <section className={`card fadeItem ${reveal ? "in" : ""}`} style={{ ["--i"]: 5 }}>
          <h3 style={{ marginTop: 0 }}>Our Values</h3>
          <ul style={{ margin: "0 0 0 1.2rem" }}>
            <li><strong>Clarity:</strong> Plain language and simple steps</li>
            <li><strong>Trust:</strong> Links to official sources; no dark patterns</li>
            <li><strong>Accessibility:</strong> Mobile-friendly, readable, multilingual</li>
            <li><strong>Privacy:</strong> We collect the minimum needed to operate</li>
          </ul>
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            Read more: <a href="/privacy">Privacy Policy</a> • <a href="/terms">Terms of Service</a>
          </p>
        </section>

        {/* Contact */}
        <section className={`card fadeItem ${reveal ? "in" : ""}`} style={{ ["--i"]: 6 }}>
          <h3 style={{ marginTop: 0 }}>Contact</h3>
          <p style={{ margin: 0 }}>
            Questions or feedback? Email{" "}
            <a href="mailto:support@aidfinder.app">support@aidfinder.app</a> or visit the{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </section>
      </main>

      {/* Page-scoped minimal styles + staggered fade-up */}
      <style jsx>{`
        .card {
          padding: 16px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,.03);
          margin-top: 16px;
        }
        .fadeItem {
          opacity: 0;
          transform: translateY(10px);
        }
        .fadeItem.in {
          animation: fadeUp .5s ease forwards;
          animation-delay: calc(80ms * var(--i));
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
