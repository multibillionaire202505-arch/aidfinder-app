// pages/about.js
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us — AidFinder</title>
        <meta
          name="description"
          content="AidFinder helps people quickly discover official public aid programs—Food, Health, Housing, Utilities, Education, and Income—in one modern, simple app."
        />
      </Head>

      <main style={{ maxWidth: 720, margin: "40px auto", padding: 16, lineHeight: 1.6 }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>About AidFinder</h1>
          <p style={{ fontSize: 16, color: "#444" }}>
            One place to find real help—fast. Food, Health, Housing, Utilities, Education, and
            Income programs, all in a clean, modern experience.
          </p>
        </header>

        <section style={{ marginBottom: 24 }}>
          <h2>Changing the Perception</h2>
          <p>
            Many people outside the U.S. think America has very little social support. The truth is,
            the U.S. has one of the most generous networks of federal, state, and local aid
            programs. The real challenge is access: people often don’t know where to look or how to
            apply. AidFinder was built to fix that—by making programs visible, clear, and easy to
            navigate.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h2>Our Mission</h2>
          <p>
            We believe access to essential programs should be simple and dignified. AidFinder
            organizes official resources in one place so families, students, seniors, and veterans
            can discover and apply in minutes—not hours.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h2>What We Offer</h2>
          <ul>
            <li>Browse verified programs across categories (Food, Health, Housing, Utilities, Education, Income)</li>
            <li>Filter by category and state</li>
            <li>Clear “Apply Now” links to official websites</li>
            <li>Multilingual experience (English, Spanish, French)</li>
            <li>Save favorites on your device (sync coming soon)</li>
          </ul>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h2>Our Values</h2>
          <ul>
            <li><strong>Clarity:</strong> Plain language and simple steps</li>
            <li><strong>Trust:</strong> Links to official sources; no dark patterns</li>
            <li><strong>Accessibility:</strong> Mobile-friendly, readable, multilingual</li>
            <li><strong>Privacy:</strong> We collect the minimum needed to operate</li>
          </ul>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h2>Contact Us</h2>
          <p>
            Questions or feedback? Email us at{" "}
            <a href="mailto:support@aidfinder.app" style={{ color: "#2563eb", textDecoration: "underline" }}>
              support@aidfinder.app
            </a>.
          </p>
        </section>
      </main>
    </>
  );
}
