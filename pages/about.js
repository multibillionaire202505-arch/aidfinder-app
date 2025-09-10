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
            One place to find real help—fast. Food, Health, Housing, Utilities, Education, and Income programs,
            all in a clean, modern experience.
          </p>
        </section>

        {/* Mission */}
        <section className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>Our Mission</h3>
          <p>
            We believe access to essential programs should be simple and dignified. AidFinder organizes official
            federal, state, and local resources in one place so families, students, seniors, and veterans can
            discover and apply in minutes—not hours.
          </p>
        </section>

        {/* What we offer */}
        <section className="card" style={{ marginTop: 16 }}>
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
        <section className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>Our Story</h3>
          <p>
            AidFinder started with a simple idea: make it easier for people to find help when they need it most.
            From a single page of links, it grew into a modern web app with dozens of programs—designed to be
            fast, trustworthy, and easy for everyone.
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
            Read more: <a href="/privacy">Privacy Policy</a> • <a href="/terms">Terms of Service</a>
          </p>
        </section>

        {/* Get involved */}
        <section className="card" style={{ marginTop: 16 }}>
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