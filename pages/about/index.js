// pages/about/index.js
import Head from "next/head";
import { useEffect, useState } from "react";

export default function About() {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    setReveal(true);
  }, []);

  return (
    <>
      <Head>
        <title>About Us — AidFinder</title>
        <meta
          name="description"
          content="AidFinder helps people quickly discover official public aid programs for food, health, housing, utilities, education, and income support."
        />
      </Head>

      <main className="aboutPage">
        <section className="hero">
          <img
            src="/icons/icon-192.png"
            alt="AidFinder logo"
            width={72}
            height={72}
            className="logo"
            loading="eager"
          />
          <h1>About AidFinder</h1>
          <p className="muted">
            One place to find real help—fast. Food, Health, Housing, Utilities,
            Education, and Income programs, all in a clean, modern experience.
          </p>
        </section>

        <section className={`grid ${reveal ? "reveal" : ""}`}>
          <article className="card" style={{ "--i": 0 }}>
            <h3>Our Mission</h3>
            <p>
              We believe access to essential programs should be simple and
              dignified. AidFinder organizes official federal, state, and local
              resources in one place so families, students, seniors, and
              veterans can discover and apply in minutes—not hours.
            </p>
          </article>

          <article className="card" style={{ "--i": 1 }}>
            <h3>Changing the Perception</h3>
            <p>
              The United States offers many social supports—SNAP, Medicaid,
              Section 8, LIHEAP, Pell Grants, and more. Too often, people just
              don’t know where to start. AidFinder exists to make these
              resources visible and easy to act on, replacing confusion with
              clarity.
            </p>
          </article>

          <article className="card" style={{ "--i": 2 }}>
            <h3>What We Offer</h3>
            <ul>
              <li>Browse verified programs by category and state</li>
              <li>Clear “Apply Now” links to official websites</li>
              <li>Save favorites locally</li>
              <li>Privacy-first: no account required to use AidFinder</li>
            </ul>
          </article>

          <article className="card" style={{ "--i": 3 }}>
            <h3>Multilingual Experience</h3>
            <p>
              AidFinder supports multiple languages so more people can get help
              without barriers:
            </p>
            <ul>
              <li>English</li>
              <li>Français</li>
              <li>Español</li>
            </ul>
            <p className="muted">More languages coming soon.</p>
          </article>

          <article className="card" style={{ "--i": 4 }}>
            <h3>Our Values</h3>
            <ul>
              <li>
                <strong>Clarity:</strong> Plain language and simple steps
              </li>
              <li>
                <strong>Trust:</strong> Links to official sources
              </li>
              <li>
                <strong>Accessibility:</strong> Mobile-first, readable, and
                multilingual
              </li>
              <li>
                <strong>Privacy:</strong> We respect your data —{" "}
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </article>

          <article className="card" style={{ "--i": 5 }}>
            <h3>Our Story</h3>
            <p>
              AidFinder was created to make it easier for individuals and
              families to discover assistance programs without searching through
              dozens of websites. Our goal is to bring trusted resources
              together in one simple directory so people can find help faster,
              with dignity and confidence.
            </p>
          </article>

          <article className="card" style={{ "--i": 6 }}>
            <h3>How AidFinder Works</h3>
            <p>
              AidFinder does not administer benefits, process applications, or
              determine eligibility. We organize publicly available assistance
              programs and connect users directly to official government
              agencies, nonprofit organizations, and trusted service providers.
            </p>
          </article>

          <article className="card" style={{ "--i": 7 }}>
            <h3>AidFinder Today</h3>
            <ul>
              <li>500+ assistance programs</li>
              <li>Federal, state, and local resources</li>
              <li>
                Food, Health, Housing, Utilities, Education, and Income support
              </li>
              <li>Available in English, French, and Spanish</li>
              <li>Free to use — no account required</li>
            </ul>
            <p className="muted">Program Directory Last Updated: June 2026</p>
          </article>

          <article className="card" style={{ "--i": 8 }}>
            <h3>Get Involved</h3>
            <ul>
              <li>
                <a className="link" href="/support">
                  Support the project
                </a>{" "}
                — keep AidFinder free for everyone
              </li>
              <li>
                <a
                  className="link"
                  href="mailto:support@aidfinder.app?subject=Program%20Suggestion"
                >
                  Suggest a program
                </a>
              </li>
              <li>
                <a
                  className="link"
                  href="mailto:support@aidfinder.app?subject=Partnership%20Inquiry"
                >
                  Partner with us
                </a>{" "}
                — nonprofits, schools, libraries, and agencies
              </li>
            </ul>
            <p className="muted">
              Questions? <a href="/contact">Contact us</a> • Read our{" "}
              <a href="/terms">Terms</a>
            </p>
          </article>
        </section>
      </main>

      <style jsx>{`
        .aboutPage {
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
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
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

        a {
          color: #2563eb;
        }
      `}</style>
    </>
  );
}
