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

      <main className="container" style={{ padding: "32px 0" }}>
        {/* Hero */}
        <section style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src="/logo.png"
            alt="AidFinder logo"
            style={{ width: 72, height: 72, objectFit: "contain", marginBottom: 8 }}
          />
          <h1 style={{ margin: "0 0 8px" }}>About AidFinder</h1>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            One place to find real help — fast.  
            Food, Health, Housing, Utilities, Education, and Income programs,  
            all in a clean, modern experience.
          </p>
        </section>

        {/* Social perception */}
        <section className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>Changing the Perception</h3>
          <p>
            Around the world, people often say the United States has little or no social support.  
            The truth is very different: America is one of the most generous countries in terms of
            aid programs — from food and housing to healthcare, education, and income assistance.  
            The problem is not the lack of aid, but the difficulty in finding the right information.
          </p>
          <p>
            <strong>AidFinder was built to close that gap:</strong> making social programs visible,
            clear, and accessible — so people can get the right help, fast.
          </p>
        </section>

        {/* Mission */}
        <section className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>Our Mission</h3>
          <p>
            We believe access to essential programs should be simple and dignified. AidFinder organizes official
            federal, state, and local resources in one place so families, students, seniors, and veterans can
            discover and apply in minutes — not hours.
          </p>
        </section>

        {/* Values */}
        <section className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>Our Values</h3>
          <ul>
            <li><strong>Clarity:</strong> Plain language and simple steps</li>
            <li><strong>Trust:</strong> Links to official sources; no dark patterns</li>
            <li><strong>Accessibility:</strong> Mobile-friendly, readable, multilingual</li>
            <li><strong>Privacy:</strong> We collect the minimum needed to operate</li>
          </ul>
          <p style={{ marginTop: 8, color: "var(--muted)" }}>
            Read more: <a href="/legal/privacy-policy">Privacy Policy</a> • <a href="/legal/terms-of-service">Terms of Service</a>
          </p>
        </section>

        {/* Contact */}
        <section className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>Contact</h3>
          <p>
            Questions or feedback? Email us at{" "}
            <a href="mailto:support@aidfinder.app">support@aidfinder.app</a> or visit the{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </section>
      </main>
    </>
  );
}
