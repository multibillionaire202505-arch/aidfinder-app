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

/** ===== UI strings (EN + FR + ES) ===== */
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
  },
  // ... keep FR & ES here (unchanged, omitted for brevity)
};

/** ===== Category Icons (Health = red cross SVG) ===== */
const ICONS = {
  Food: "🍏",
  Housing: "🏠",
  Utilities: "💡",
  Education: "🎓",
  Income: "💲",
  Health: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      width="20" height="20" style={{ verticalAlign: "middle" }}
      aria-hidden="true" focusable="false">
      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"
        fill="red" stroke="red" strokeWidth="1.5" />
    </svg>
  ),
};

/** ===== Badge tints ===== */
const ICONS_BADGE_BG = {
  Food:"var(--tint-food)",
  Health:"var(--tint-health, #fee2e2)",
  Housing:"var(--tint-housing)",
  Utilities:"var(--tint-utilities)",
  Education:"var(--tint-education)",
  Income:"var(--tint-income)"
};

/** ===== US states ===== */
const US_STATES = [
  "All States","AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA",
  "MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"
];

/** ===== Programs (data) ===== */
const ALL = [
  // ... keep your programs list here (unchanged, omitted for brevity)
];

/** ===== Main Component ===== */
export default function Home() {
  // language (persist)
  const [lang, setLang] = useState("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aidfinder_lang");
      if (saved) setLang(saved);
      else {
        const br = (navigator.language || "en").slice(0,2);
        if (["en","fr","es"].includes(br)) setLang(br);
      }
    } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem("aidfinder_lang", lang); } catch {} }, [lang]);

  // theme (persist)
  const [theme, setTheme] = useState("light");
  useEffect(()=>{
    try{
      const saved = localStorage.getItem("aidfinder_theme");
      const sysDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const t = saved || (sysDark ? "dark":"light");
      setTheme(t);
      document.documentElement.setAttribute("data-theme", t==="dark" ? "dark": "light");
    }catch{}
  },[]);
  useEffect(()=>{
    try{
      localStorage.setItem("aidfinder_theme", theme);
      document.documentElement.setAttribute("data-theme", theme==="dark" ? "dark": "light");
    }catch{}
  },[theme]);

  const T = UI[lang];

  // search, category, state
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [stateSel, setStateSel] = useState("All States");

  // favorites (persist)
  const [favs, setFavs] = useState([]);
  useEffect(()=>{ const raw = localStorage.getItem("aidfinder_favs"); if(raw) setFavs(JSON.parse(raw)); },[]);
  useEffect(()=>{ localStorage.setItem("aidfinder_favs", JSON.stringify(favs)); },[favs]);
  const toggleFav = (id)=> setFavs(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  const isFav = (id)=> favs.includes(id);

  // SEO & Social Meta
  const SEO = (
    <Head>
      <title>AidFinder — Find Aid Programs Easily</title>
      <meta name="description" content="Discover Food, Health, Housing, Utilities, Education, and Income aid programs — all in one place with AidFinder." />
      <meta name="keywords" content="aid, assistance programs, SNAP, Medicaid, housing help, utilities, education aid, income support, financial help" />
      <meta name="author" content="AidFinder Team" />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content="AidFinder — Find Aid Programs Easily" />
      <meta property="og:description" content="Discover Food, Health, Housing, Utilities, Education, and Income aid programs — all in one place with AidFinder." />
      <meta property="og:url" content="https://www.aidfinder.org" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.aidfinder.org/preview.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AidFinder — Find Aid Programs Easily" />
      <meta name="twitter:description" content="Explore programs across Food, Health, Housing, Utilities, Education, and Income — all in one place." />
      <meta name="twitter:image" content="https://www.aidfinder.org/preview.png" />

      {/* Favicons */}
      <link rel="icon" href="/icons/icon-32.png" sizes="32x32" />
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );

  // reveal animations
  const [reveal, setReveal] = useState(false);
  useEffect(() => { setReveal(true); }, []);

  return (
    <>
      {SEO}
      {/* ===== Your homepage content stays unchanged below ===== */}
      <header className="nav">
        <div className="container headerRow">
          <div className="brandRow">
            <img src="/logo.png" alt="AidFinder logo" style={{height:40, borderRadius:8}}/>
            <strong>{T.brand}</strong>
          </div>
        </div>
      </header>
      <main className="container">
        <section className="hero">
          <h1>{T.title}</h1>
          <p>{T.subtitle}</p>
        </section>
      </main>
    </>
  );
}
