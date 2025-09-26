// pages/index.js
import { useMemo, useState, useEffect } from "react";
import Head from "next/head";

/** ===== Robust logo (fallback to /icons/icon-192.png) ===== */
const BrandLogo = ({ size = 40 }) => (
  <img
    src="/logo.png"
    alt="AidFinder logo"
    width={size}
    height={size}
    style={{ width: size, height: size, borderRadius: 8, objectFit: "contain" }}
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/icons/icon-192.png";
    }}
  />
);

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

/** ===== UI strings (EN only here for brevity, keep your full UI object) ===== */
const UI = {
  en: {
    brand: "AidFinder",
    title: "Find Aid Programs Easily",
    subtitle:
      "Explore programs across Food, Health, Housing, Utilities, Education, and Income — all in one place.",
    searchPlaceholder: "Search e.g. housing, food, health…",
    searchBtn: "Search",
    clearBtn: "Clear",
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

// Example data (trimmed for brevity)
const ALL = [
  { category:"Food", link:"https://www.fns.usda.gov/snap",
    i18n:{ en:{ title:"SNAP (Food Stamps)", desc:"Monthly funds to buy groceries for eligible households." } } }
];

/** ===== Helpers ===== */
const norm = (s) => (s || "")
  .toString()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();

const makeSearchText = (p) => {
  const parts = [p.i18n.en.title, p.i18n.en.desc, p.category];
  try { const url = new URL(p.link); parts.push(url.hostname, url.pathname); } catch {}
  return norm(parts.join(" "));
};

const matchesQuery = (blob, q) => {
  const terms = norm(q).split(/\s+/).filter(Boolean);
  return terms.every(t => blob.includes(t));
};

/** ===== Main Component ===== */
export default function Home() {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("light");
  const T = UI[lang];

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [favs, setFavs] = useState([]);
  const [animMap, setAnimMap] = useState({});

  const programs = useMemo(()=>{
    let base = ALL;
    if (cat !== "All") base = base.filter(p => p.category === cat);
    if (query.trim()) base = base.filter(p => matchesQuery(makeSearchText(p), query));
    return base;
  }, [cat, query]);

  return (
    <>
      <Head>
        <title>AidFinder — {T.title}</title>
        <meta name="description" content={T.subtitle} />
      </Head>

      {/* Header */}
      <header className="nav">
        <div className="container headerRow">
          <div className="brandRow">
            <BrandLogo size={40} />
            <strong>{T.brand}</strong>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container">
        {/* Hero */}
        <section className="hero">
          <h1>{T.title}</h1>
          <p>{T.subtitle}</p>
        </section>

        {/* Search Bar */}
        <section className="toolbar">
          <div className="searchWrap">
            <form
              className="searchInlineForm"
              onSubmit={(e)=>{ e.preventDefault(); }}
              role="search"
              aria-label={T.searchPlaceholder}
            >
              <div className="searchInline">
                <input
                  className="searchInlineInput"
                  placeholder={T.searchPlaceholder}
                  value={query}
                  onChange={(e)=>setQuery(e.target.value)}
                  aria-label={T.searchPlaceholder}
                />

                <div className="searchInlineActions">
                  {(query.trim().length > 0) && (
                    <button type="submit" className="searchInlineBtn iconOnly" aria-label={T.searchBtn}>
                      🔎
                    </button>
                  )}

                  {query && (
                    <button
                      type="button"
                      className="searchInlineBtn iconOnly"
                      onClick={()=>setQuery("")}
                      aria-label={T.clearBtn}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* Cards */}
        <section className="grid">
          {programs.map((p)=>(
            <article className="card" key={p.link}>
              <h3>{p.i18n.en.title}</h3>
              <p>{p.i18n.en.desc}</p>
              <a className="apply" href={p.link} target="_blank" rel="noreferrer">{T.apply}</a>
            </article>
          ))}
        </section>

        {/* Footer */}
        <footer className="footer">
          <a href="/about">About</a> • <a href="/privacy">Privacy</a> • <a href="/terms">Terms</a> • <a href="/contact">Contact</a>
          <div style={{marginTop:8}}>{T.footer}</div>
        </footer>
      </main>

      {/* Styles */}
      <style jsx global>{`
        .searchInlineForm { width: 100%; margin-top: 20px; }
        .searchInline { position: relative; width: 100%; }
        .searchInlineInput {
          width: 100%;
          padding: 12px 80px 12px 14px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          font-size: 16px;
          background: #fff;
        }
        .searchInlineActions {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          display: flex; gap: 6px;
        }
        .searchInlineBtn.iconOnly {
          background: transparent;
          border: none;
          color: #16a34a; /* green */
          font-size: 18px;
          cursor: pointer;
        }
        .searchInlineBtn.iconOnly:hover {
          color: #15803d; /* darker green */
        }
      `}</style>
    </>
  );
}