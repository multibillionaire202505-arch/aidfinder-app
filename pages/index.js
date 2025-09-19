// pages/index.js
import { useMemo, useState, useEffect } from "react";
import Head from "next/head";

/** ===== Heart icon ===== */
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

/** ===== UI strings ===== */
const UI = {
  en: {
    brand: "AidFinder",
    title: "Find Aid Programs Easily",
    subtitle:
      "Explore programs across Food, Health, Housing, Utilities, Education, and Income — all in one place.",
    searchPlaceholder: "Search e.g. housing, food, health…",
    categories: ["All","Food","Health","Housing","Utilities","Education","Income","Saved"],
    catLabels: { All:"All", Food:"Food", Health:"Health", Housing:"Housing", Utilities:"Utilities", Education:"Education", Income:"Income", Saved:"Saved" },
    noResultsTitle: "No results",
    noResultsBody: "Try a different keyword or category.",
    apply: "Apply Now",
    details: "Details",
    saved: "Saved",
    unsaved: "Save",
    footer: "Demo preview • © AidFinder",
    programCount: "programs",
    clear: "Clear",
    close: "Close",
    stateLabel: "Your State",
    allStates: "All States",
    share: "Share",
    shareWhatsApp: "Share via WhatsApp",
    shareEmail: "Share via Email",
    language: "Language",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
  }
};

/** ===== Example program (keep your full ALL list here) ===== */
const ALL = [
  {
    category: "Food",
    link: "https://www.fns.usda.gov/snap",
    i18n: {
      en: {
        title: "SNAP (Food Stamps)",
        desc: "Monthly funds to buy groceries for eligible households."
      }
    }
  }
];

/** ===== Main Component ===== */
export default function Home() {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [programs, setPrograms] = useState(ALL);
  const T = UI[lang];

  return (
    <>
      <Head>
        <title>AidFinder — {T.title}</title>
        <meta name="description" content={T.subtitle} />
      </Head>

      <header className="nav">
        <div className="container headerRow">
          <div className="brandRow">
            <img src="/logo.png" alt="AidFinder logo" style={{ height: 40, borderRadius: 8 }} />
            <strong>{T.brand}</strong>
          </div>
        </div>
      </header>

      <main className="container">
        {/* Hero */}
        <section className="hero">
          <h1>{T.title}</h1>
          <p>{T.subtitle}</p>
        </section>

        {/* Toolbar */}
        <section className="toolbar">
          <div className="searchWrap">
            <input
              className="search"
              placeholder={T.searchPlaceholder}
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
            {query && <button className="clearBtn" onClick={()=>setQuery("")}>{T.clear}</button>}
          </div>

          <div className="countRow">
            <span className="muted">{programs.length} {T.programCount}</span>
          </div>

          {/* ===== Donate with PayPal ===== */}
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <h3 style={{ marginBottom: 6 }}>Support AidFinder</h3>
            <p style={{ margin: "0 0 12px", color: "#4b5563" }}>
              Your donation helps keep this app free for families in need ❤️
            </p>
            <form
              action="https://www.paypal.com/donate"
              method="post"
              target="_blank"
              style={{ display: "inline-block" }}
            >
              {/* Replace with your PayPal email */}
              <input type="hidden" name="business" value="your-paypal-email@example.com" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="no_recurring" value="0" />
              <input type="hidden" name="item_name" value="Support AidFinder" />
              <button
                type="submit"
                style={{
                  backgroundColor: "#0070f3",
                  color: "#fff",
                  border: "none",
                  padding: "12px 18px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 600,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.12)"
                }}
              >
                Donate with PayPal
              </button>
            </form>
          </div>
        </section>

        {/* Cards */}
        <section className="grid">
          {programs.map((p)=>(
            <article className="card" key={p.link}>
              <h3>{p.i18n[lang].title}</h3>
              <p>{p.i18n[lang].desc}</p>
              <a href={p.link} target="_blank" rel="noreferrer">{T.apply}</a>
            </article>
          ))}
        </section>

        {/* Footer */}
        <footer className="footer" style={{ marginTop: 40, textAlign: "center" }}>
          <a href="/legal/privacy-policy">Privacy Policy</a> • 
          <a href="/legal/terms" style={{ marginLeft: 8 }}>Terms</a>
          <div style={{ marginTop: 8 }}>{T.footer}</div>
        </footer>
      </main>
    </>
  );
}
