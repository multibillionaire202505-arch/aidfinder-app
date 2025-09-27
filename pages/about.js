// pages/about.js
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

      <main className={`container ${reveal ? "reveal" : ""}`} style={{ padding: "32px 0" }}>
        {/* Hero */}
        <section className="aboutHero" style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src="/logo.png"
            alt="AidFinder logo"
            style={{ width: 72, height: 72, objectFit: "contain", marginBottom: 8 }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/icons/icon-192.png";
            }}
          />
          <h1 style={{ margin: "0 0 8px" }}>About AidFinder</h1>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            One place to find real help—fast. Food, Health, Housing, Utilities, Education, and Income programs,
            all in a clean, modern experience.
          </p>
        </section>

        {/* Changing Perception */}
        <section className="card anim" style={{ marginTop: 16, "--i": 0 }}>
          <h3 style={{ marginTop: 0 }}>Changing the Perception</h3>
          <p>
            Many people think the U.S. lacks social support. In reality, there are hundreds of federal, state,
            and local programs. The real problem is <strong>finding them</strong>. AidFinder was built to fix that—by
            making programs visible, clear, and accessible to everyone. Our country is among the most socially
            supportive in the world, but too often people miss out simply because they can’t find the right
            information. AidFinder was built to change that.
          </p>
        </section>

        {/* Mission */}
        <section className="card anim" style={{ marginTop: 16, "--i": 1 }}>
          <h3 style={{ marginTop: 0 }}>Our Mission</h3>
          <p>
            We believe access to essential programs should be simple and dignified. AidFinder organizes official
            federal, state, and local resources in one place so families, students, seniors, and veterans can
            discover and apply in minutes—not hours.
          </p>
        </section>

        {/* Multilingual Support */}
        <section className="card anim" style={{ marginTop: 16, "--i": 2 }}>
          <h3 style={{ marginTop: 0 }}>Multilingual Support</h3>
          <p>
            AidFinder is designed to serve everyone. The app is currently available in{" "}
            <strong>English</strong> <span aria-hidden>🇺🇸</span>,{" "}
            <strong>Spanish</strong> <span aria-hidden>🇪🇸</span>, and{" "}
            <strong>French</strong> <span aria-hidden>🇫🇷</span>, with more languages planned. Access to help
            should not depend on the language you speak.
          </p>
        </section>

        {/* What we offer */}
        <section className="card anim" style={{ marginTop: 16, "--i": 3 }}>
          <h3 style={{ marginTop: 0 }}>What We Offer</h3>
          <ul>
            <li>Browse verified programs across categories (Food, Health, Housing, Utilities, Education, Income)</li>
            <li>Filter by category and state</li>
            <li>Clear “Apply Now” links to official websites</li>
            <li>Multilingual experience (English, Spanish, French)</li>
            <li>Save favorites on your device (sync coming soon)</li>
          </ul>
        </section>

        {/* Our story */}
        <section className="card anim" style={{ marginTop: 16, "--i": 4 }}>
          <h3 style={{ marginTop: 0 }}>Our Story</h3>
          <p>
            AidFinder started with a simple idea: make it easier for people to find help when they need it most.
            From a single page of links, it grew into a modern web app with dozens of programs—designed to be
            fast, trustworthy, and easy for everyone.
          </p>
        </section>

        {/* Values */}
        <section className="card anim" style={{ marginTop: 16, "--i": 5 }}>
          <h3 style={{ marginTop: 0 }}>Our Values</h3>
          <ul>
            <li><strong>Clarity:</strong> Plain language and simple steps</li>
            <li><strong>Trust:</strong> Links to official sources; no dark patterns</li>
            <li><strong>Accessibility:</strong> Mobile-friendly, readable, multilingual</li>
            <li><strong>Privacy:</strong> We collect the minimum needed to operate</li>
          </ul>
          <p style={{ marginTop: 8, color: "var(--muted)" }}>
            Read more: <a href="/privacy">Privacy Policy</a> • <a href="/terms">Terms of Service</a>
          </p>
        </section>

        {/* Get involved */}
        <section className="card anim" style={{ marginTop: 16, "--i": 6 }}>
          <h3 style={{ marginTop: 0 }}>Get Involved</h3>
          <ul>
            <li>
              <a className="secondary" href="/support">Support the project</a> — keep AidFinder free for everyone
            </li>
            <li>
              <a className="secondary" href="mailto:support@aidfinder.app?subject=Program%20Suggestion">
                Suggest a program
              </a>
            </li>
            <li>
              <a className="secondary" href="mailto:support@aidfinder.app?subject=Partnership%20Inquiry">
                Partner with us (nonprofits, schools, libraries, agencies)
              </a>
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="card anim" style={{ marginTop: 16, "--i": 7 }}>
          <h3 style={{ marginTop: 0 }}>Contact</h3>
          <p>
            Questions or feedback? Email us at{" "}
            <a href="mailto:support@aidfinder.app">support@aidfinder.app</a> or visit the{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </section>
      </main>

      {/* Page-scoped animations */}
      <style jsx>{`
        .aboutHero {
          opacity: 0;
          transform: translateY(8px);
          animation: fadeUp 500ms ease forwards;
          animation-delay: 40ms;
        }
        .anim {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp 520ms cubic-bezier(.2,.7,.2,1) forwards;
          animation-delay: calc(80ms + (var(--i, 0) * 90ms));
          will-change: opacity, transform;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
