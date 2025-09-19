// pages/about.js
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About — AidFinder</title>
        <meta
          name="description"
          content="AidFinder helps people discover the many aid programs in the U.S. — Food, Health, Housing, Utilities, Education, and Income — all in one place."
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
          <p style={{ color: "var(--muted)", margin: 0 }}>
            One place to find real help—fast. Food, Health, Housing, Utilities, Education, and Income programs,
            all in a clean, modern experience.
          </p>
        </section>

        {/* Changing the Perception */}
        <section className="card" style={{ marginTop: 16, padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>Changing the Perception</h3>
          <p style={{ margin: 0 }}>
            Around the world, people often say the United States has little social support. The truth is different:
            there are thousands of federal, state, and local programs—food, housing, healthcare, education, and income.
            The real problem isn’t the lack of aid—it’s finding the right information.
          </p>
        </section>

        {/* Mission */}
        <section className="card" style={{ marginTop: 16, padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>Our Mission</h3>
          <p style={{ margin: 0 }}>
            AidFinder was built to make those programs visible, clear, and accessible—so people can get the right help, fast.
          </p>
        </section>

        {/* Trust & Policies */}
        <section className="card" style={{ marginTop: 16, padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>Trust & Policies</h3>
          <p style={{ margin: 0 }}>
            We respect your privacy and keep things transparent. Read our{" "}
            <a href="/legal/privacy-policy">Privacy Policy</a> and{" "}
            <a href="/legal/terms-of-service">Terms of Service</a>.
          </p>
        </section>

        {/* Contact */}
        <section className="card" style={{ marginTop: 16, padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>Contact</h3>
          <p style={{ margin: 0 }}>
            We’d love to hear from you — feedback, partnership ideas, or program suggestions:
            {" "}<a href="mailto:aidfinder.app@gmail.com">aidfinder.app@gmail.com</a>
          </p>
        </section>
      </main>
    </>
  );
}
