// pages/about.js
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About — AidFinder</title>
        <meta
          name="description"
          content="AidFinder helps people discover U.S. aid programs — Food, Health, Housing, Utilities, Education, and Income — all in one place."
        />
      </Head>

      <main style={{ maxWidth: 720, margin: "40px auto", padding: 16, lineHeight: 1.6 }}>
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src="/icons/icon-192.png"
            alt="AidFinder logo"
            style={{ width: 72, height: 72, objectFit: "contain", marginBottom: 8, borderRadius: 12 }}
          />
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 8px" }}>About AidFinder</h1>
          <p style={{ fontSize: 16, color: "#666", margin: 0 }}>
            One place to find real help — fast. Food, Health, Housing, Utilities, Education, and Income programs,
            all in a clean, modern experience.
          </p>
        </header>

        {/* Changing the Perception */}
        <section style={{ border: "1px solid #ddd", background: "#fff", borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <h2 style={{ marginTop: 0 }}>Changing the Perception</h2>
          <p>
            People abroad often say the United States lacks social support. In reality, there are thousands of federal,
            state, and local programs — food, housing, healthcare, education, and income. The problem isn’t the lack
            of aid; it’s finding the right information. <strong>AidFinder</strong> makes programs visible, clear, and
            accessible so people get the right help, fast.
          </p>
        </section>

        {/* Mission */}
        <section style={{ border: "1px solid #ddd", background: "#fff", borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <h2 style={{ marginTop: 0 }}>Our Mission</h2>
          <p>
            Make access to essential programs simple and dignified. AidFinder organizes official resources in one place
            so families, students, seniors, and veterans can discover and apply in minutes — not hours.
          </p>
        </section>

        {/* Contact */}
        <section style={{ border: "1px solid #ddd", background: "#fff", borderRadius: 8, padding: 16 }}>
          <h2 style={{ marginTop: 0 }}>Contact</h2>
          <p>
            We’d love to hear from you — feedback, partnership ideas, or program suggestions:{" "}
            <a href="mailto:aidfinder.app@gmail.com">aidfinder.app@gmail.com</a>
          </p>
        </section>
      </main>
    </>
  );
}
