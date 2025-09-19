// pages/about.js
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About — AidFinder</title>
        <meta
          name="description"
          content="AidFinder makes U.S. aid programs visible, clear, and accessible — Food, Health, Housing, Utilities, Education, and Income."
        />
      </Head>

      <main className="container" style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
        {/* Logo + Tagline */}
        <section style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src="/icons/icon-192.png"
            alt="AidFinder logo"
            style={{ width: 72, height: 72, objectFit: "contain", marginBottom: 10, borderRadius: 12 }}
          />
          <h1 style={{ margin: "0 0 10px" }}>About AidFinder</h1>
          <p style={{ margin: 0, color: "#111", fontSize: 18 }}>
            One place to find real help—fast. Food, Health, Housing, Utilities, Education, and Income programs,
            all in a clean, modern experience.
          </p>
        </section>

        {/* Changing the Perception (forced visible) */}
        <section
          className="card"
          style={{
            marginTop: 16,
            padding: 20,
            border: "2px dashed #16a34a",   // make the box unmistakable
            background: "#fff",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Changing the Perception</h3>
          <p
            style={{
              margin: 0,
              color: "#111",                 // force visible text color
              lineHeight: 1.6,
              fontSize: 16,
            }}
          >
            People abroad often say the United States lacks social support. In reality, the U.S. has thousands of
            federal, state, and local programs — food, housing, healthcare, education, and income support.
            The challenge isn’t the amount of aid; it’s finding the right information. <strong>AidFinder</strong>
            makes these programs visible, clear, and accessible — so people can get the right help, fast.
          </p>
        </section>

        {/* Contact (kept simple) */}
        <section className="card" style={{ marginTop: 16, padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>Contact</h3>
          <p style={{ margin: 0, color: "#111" }}>
            We’d love to hear from you — feedback, partnership ideas, or program suggestions:
            {" "}
            <a href="mailto:aidfinder.app@gmail.com">aidfinder.app@gmail.com</a>
          </p>
        </section>
      </main>
    </>
  );
}
