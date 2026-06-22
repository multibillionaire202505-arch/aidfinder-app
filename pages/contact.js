// pages/contact/index.js
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Contact() {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    setReveal(true);
  }, []);

  return (
    <>
      <Head>
        <title>Contact Us — AidFinder</title>
        <meta
          name="description"
          content="Contact AidFinder for support, program suggestions, broken links, updates, or partnership opportunities."
        />
      </Head>

      <main className="contactPage">
        <section className="hero">
          <img
            src="/icons/icon-192.png"
            alt="AidFinder logo"
            width={72}
            height={72}
            className="logo"
            loading="eager"
          />
          <h1>Contact AidFinder</h1>
          <p className="muted">
            Questions, program updates, broken links, suggestions, and partnership opportunities are welcome.
          </p>
        </section>

        <section className={`grid ${reveal ? "reveal" : ""}`}>
          <article className="card" style={{ "--i": 0 }}>
            <h3>General Support</h3>
            <p>
              Have a question about AidFinder or how it works? Contact us and we’ll respond as soon as possible.
            </p>
            <p>
              <a className="link" href="mailto:support@aidfinder.org">
                support@aidfinder.org
              </a>
            </p>
          </article>

          <article className="card" style={{ "--i": 1 }}>
            <h3>Program Suggestions</h3>
            <p>
              Know of an assistance program we should include? Send us the program name, website, location, and category.
            </p>
            <p>
              <a className="link" href="mailto:support@aidfinder.org?subject=Program%20Suggestion">
                Suggest a program
              </a>
            </p>
          </article>

          <article className="card" style={{ "--i": 2 }}>
            <h3>Report an Update</h3>
            <p>
              Found a broken link, outdated information, or a program that needs review? Let us know so we can improve the directory.
            </p>
            <p>
              <a className="link" href="mailto:support@aidfinder.org?subject=Program%20Update%20or%20Broken%20Link">
                Report an update
              </a>
            </p>
          </article>

          <article className="card" style={{ "--i": 3 }}>
            <h3>Partnerships</h3>
            <p>
              Nonprofits, schools, libraries, community organizations, and agencies are welcome to connect with AidFinder.
            </p>
            <p>
              <a className="link" href="mailto:support@aidfinder.org?subject=Partnership%20Inquiry">
                Partnership inquiry
              </a>
            </p>
          </article>

          <article className="card" style={{ "--i": 4 }}>
            <h3>Important Notice</h3>
            <p>
              AidFinder does not administer benefits, process applications, or determine eligibility.
              We connect users directly to official programs and trusted resources.
            </p>
          </article>

          <article className="card" style={{ "--i": 5 }}>
            <h3>Our Commitment</h3>
            <p>
              AidFinder is committed to keeping assistance information clear, accessible, and useful for individuals,
              families, students, seniors, veterans, and communities.
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
