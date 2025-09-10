import Head from "next/head";
import { useState } from "react";

export default function Home() {
  // 👉 Replace this with your full 34+ programs array
  const programs = [
    { title: "SNAP (Food Stamps)", category: "Food", desc: "Monthly funds to buy groceries for eligible households.", link: "https://www.fns.usda.gov/snap" },
    { title: "Medicaid", category: "Health", desc: "Free or low-cost health coverage for eligible individuals and families.", link: "https://www.medicaid.gov" },
    { title: "WIC (Women, Infants, and Children)", category: "Food", desc: "Nutrition assistance and health referrals for women and young children.", link: "https://www.fns.usda.gov/wic" },
    { title: "LIHEAP", category: "Utilities", desc: "Help paying heating/cooling bills and some energy-related repairs.", link: "https://www.acf.hhs.gov/ocs/programs/liheap" },
    { title: "Federal Pell Grant", category: "Education", desc: "Grants for undergraduates with financial need; does not require repayment.", link: "https://studentaid.gov/understand-aid/types/grants/pell" }
    // ... add all remaining programs
  ];

  const [filter, setFilter] = useState("All");

  const filteredPrograms =
    filter === "All" ? programs : programs.filter((p) => p.category === filter);

  return (
    <>
      <Head>
        <title>AidFinder — Find Programs</title>
        <meta
          name="description"
          content="AidFinder helps people quickly discover official public aid programs in Food, Health, Housing, Utilities, and Education."
        />
      </Head>

      {/* 🔝 Professional Header with navigation */}
      <header className="nav">
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            className="brand"
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <img
              src="/logo.png"
              alt="AidFinder logo"
              style={{ width: 28, height: 28, objectFit: "contain" }}
            />
            <strong style={{ fontSize: 20 }}>AidFinder</strong>
          </div>

          <nav
            style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 14 }}
          >
            <a href="#about">About</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="container">
        {/* Hero */}
        <section className="hero">
          <h1>Find Aid Programs Easily</h1>
          <p>
            Explore programs across Food, Health, Housing, Utilities, and Education — all in one
            place.
          </p>
        </section>

        {/* Filter bar */}
        <div style={{ marginBottom: 20 }}>
          {["All", "Food", "Health", "Housing", "Utilities", "Education"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={filter === cat ? "apply" : "secondary"}
              style={{ marginRight: 8 }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs grid */}
        <section className="grid">
          {filteredPrograms.map((p, i) => (
            <article className="card" key={i}>
              <div className="badge">{p.category}</div>
              <h3 style={{ margin: 0, fontWeight: 800, fontSize: 18 }}>{p.title}</h3>
              <p style={{ color: "#475569" }}>{p.desc}</p>
              <div>
                <a
                  className="apply"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Apply Now
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* 🔎 About section */}
        <section id="about" className="card" style={{ marginTop: 40 }}>
          <h2>About AidFinder</h2>
          <p>
            AidFinder is built to make it easier for everyone — families, students, seniors, and
            veterans — to discover help quickly. From food assistance to housing and education, we
            bring programs together in one simple, modern app.
          </p>
          <p>
            Our values: <strong>Clarity</strong>, <strong>Trust</strong>, <strong>Accessibility</strong>, and <strong>Privacy</strong>.
          </p>
        </section>

        {/* 🔚 Professional Footer with navigation */}
        <footer
          className="footer"
          style={{
            marginTop: 40,
            textAlign: "center",
            padding: "20px 0",
            fontSize: 14,
          }}
        >
          © {new Date().getFullYear()} AidFinder
          <span> • </span><a href="#about">About</a>
          <span> • </span><a href="/privacy">Privacy</a>
          <span> • </span><a href="/terms">Terms</a>
          <span> • </span><a href="/contact">Contact</a>
        </footer>
      </main>
    </>
  );
}