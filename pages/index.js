// pages/index.js
import { useMemo, useState, useEffect } from "react";
import Head from "next/head";

/** ===== Heart icon (red inside only; pulse on click) ===== */
const HeartIcon = ({ on = false, size = 20, animate = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={animate ? "pulse" : ""}
    style={{ display: "block" }}
  >
    <path
      d="M12.001 20.727s-7.2-4.315-10.285-8.32C-0.03 9.74 1.1 6.2 4.14 5.146c1.92-.68 4.02-.12 5.36 1.327l.5.537.5-.537c1.34-1.447 3.44-2.007 5.36-1.327 3.04 1.054 4.17 4.594 2.424 7.261-3.085 4.005-10.283 8.32-10.283 8.32z"
      fill={on ? "#e11d48" : "none"}
      stroke="#e11d48"
      strokeWidth="1.8"
    />
  </svg>
);

/** ===== Category Icons (with red Health cross) ===== */
const ICONS = {
  Food: "🍏",
  Housing: "🏠",
  Utilities: "💡",
  Education: "🎓",
  Income: "💲",
  Health: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      style={{ verticalAlign: "middle" }}
    >
      <path
        d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"
        fill="red"
        stroke="red"
        strokeWidth="1.5"
      />
    </svg>
  ),
};

/** ===== Badge tints ===== */
const ICONS_BADGE_BG = {
  Food: "var(--tint-food)",
  Health: "var(--tint-health, #fee2e2)", // fallback if CSS var not defined
  Housing: "var(--tint-housing)",
  Utilities: "var(--tint-utilities)",
  Education: "var(--tint-education)",
  Income: "var(--tint-income)",
};

/** ===== Example Programs (short demo set; expand to 34) ===== */
const ALL = [
  { category: "Food", link: "https://www.fns.usda.gov/snap",
    i18n: { en: { title: "SNAP (Food Stamps)", desc: "Monthly funds to buy groceries." } } },
  { category: "Health", link: "https://www.medicaid.gov",
    i18n: { en: { title: "Medicaid", desc: "Free or low-cost health coverage." } } },
  { category: "Housing", link: "https://www.hud.gov/topics/housing_choice_voucher_program_section8",
    i18n: { en: { title: "Section 8", desc: "Helps families afford housing." } } },
  { category: "Utilities", link: "https://www.acf.hhs.gov/ocs/programs/liheap",
    i18n: { en: { title: "LIHEAP", desc: "Help paying energy bills." } } },
  { category: "Education", link: "https://studentaid.gov/understand-aid/types/grants/pell",
    i18n: { en: { title: "Pell Grant", desc: "Federal grants for undergrads." } } },
];

/** ===== Main Component ===== */
export default function Home() {
  const [favs, setFavs] = useState([]);
  const toggleFav = (id) =>
    setFavs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const isFav = (id) => favs.includes(id);

  const [animMap, setAnimMap] = useState({});
  const triggerAnim = (id) => {
    setAnimMap((m) => ({ ...m, [id]: true }));
    setTimeout(() => setAnimMap((m) => ({ ...m, [id]: false })), 300);
  };

  return (
    <>
      <Head>
        <title>AidFinder — Find Aid Programs</title>
        <meta name="description" content="Find programs for Food, Health, Housing, Utilities, and Education." />
      </Head>

      {/* Header */}
      <header className="nav">
        <div className="container headerRow">
          <div className="brandRow">
            <img src="/logo.png" alt="AidFinder logo" style={{ height: 40, borderRadius: 8 }} />
            <strong>AidFinder</strong>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container">
        <section className="hero">
          <h1>Find Aid Programs Easily</h1>
          <p>Explore programs across Food, Health, Housing, Utilities, and Education.</p>
        </section>

        <section className="grid">
          {ALL.map((p) => (
            <article className="card" key={p.link}>
              <div className="badge" style={{ background: ICONS_BADGE_BG[p.category] || "var(--border)" }}>
                {p.category}
              </div>
              <h3>
                <span style={{ marginRight: 6 }}>{ICONS[p.category] || "📌"}</span>
                {p.i18n.en.title}
              </h3>
              <p>{p.i18n.en.desc}</p>
              <div className="cardActions">
                <button
                  className="iconBtn"
                  onClick={() => {
                    toggleFav(p.link);
                    triggerAnim(p.link);
                  }}
                >
                  <HeartIcon on={isFav(p.link)} animate={!!animMap[p.link]} />
                </button>
                <a className="apply" href={p.link} target="_blank" rel="noreferrer">
                  Apply Now
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* Footer */}
        <footer className="footer">
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href="/privacy">Privacy</a>
            <span>•</span>
            <a href="/terms">Terms</a>
            <span>•</span>
            <a href="/contact">Contact</a>
          </div>
          <div style={{ marginTop: 8 }}>Demo preview • © AidFinder</div>
        </footer>
      </main>
    </>
  );
}