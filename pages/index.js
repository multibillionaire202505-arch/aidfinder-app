// pages/index.js
import { useMemo, useState, useEffect } from "react";
import Head from "next/head";

/** ====== CONFIG: PayPal Merchant ID (no email needed) ====== */
const PAYPAL_MERCHANT_ID = "T7UXDRDVCHGKE";

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

/** ===== UI strings (EN + FR + ES) ===== */
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
    donateH3: "Support AidFinder",
    donateP:  "Your donation helps keep this app free for families in need ❤️",
    donateBtn: "Donate with PayPal",
    donateQuick: "Donate $1",
    donateOr: "or",
    donateAny: "Donate custom amount",
    donateInputPH: "USD (e.g. 5, 10, 25)",
    donateGo: "Donate",
    donateError: "Please enter a valid amount (1–5000).",
  },
  fr: {
    brand: "AidFinder",
    title: "Trouvez facilement des aides",
    subtitle:
      "Découvrez des programmes d’aide Alimentation, Santé, Logement, Services publics, Éducation et Revenus — au même endroit.",
    searchPlaceholder: "Rechercher ex. logement, alimentation, santé…",
    searchBtn: "Rechercher",
    clearBtn: "Effacer",
    categories: ["Tous","Alimentation","Santé","Logement","Services publics","Éducation","Revenus","Enregistrés"],
    catLabels: { All:"Tous", Food:"Alimentation", Health:"Santé", Housing:"Logement", Utilities:"Services publics", Education:"Éducation", Income:"Revenus", Saved:"Enregistrés" },
    noResultsTitle: "Aucun résultat",
    noResultsBody: "Essayez un autre mot-clé ou une autre catégorie.",
    apply: "Postuler",
    details: "Détails",
    saved: "Enregistré",
    unsaved: "Enregistrer",
    footer: "Aperçu démo • © AidFinder",
    programCount: "programmes",
    close: "Fermer",
    stateLabel: "Votre État",
    allStates: "Tous les États",
    share: "Partager",
    shareWhatsApp: "Partager via WhatsApp",
    shareEmail: "Partager par e-mail",
    language: "Langue",
    theme: "Thème",
    dark: "Sombre",
    light: "Clair",
    donateH3: "Soutenir AidFinder",
    donateP:  "Votre don aide à garder cette application gratuite ❤️",
    donateBtn: "Donner avec PayPal",
    donateQuick: "Donner 1 $",
    donateOr: "ou",
    donateAny: "Don personnalisé",
    donateInputPH: "USD (ex. 5, 10, 25)",
    donateGo: "Donner",
    donateError: "Entrez un montant valide (1–5000).",
  },
  es: {
    brand: "AidFinder",
    title: "Encuentre Ayuda Fácilmente",
    subtitle:
      "Explore programas de Alimentos, Salud, Vivienda, Servicios, Educación e Ingresos — todo en un solo lugar.",
    searchPlaceholder: "Buscar p. ej. vivienda, alimentos, salud…",
    searchBtn: "Buscar",
    clearBtn: "Borrar",
    categories: ["Todos","Alimentos","Salud","Vivienda","Servicios","Educación","Ingresos","Guardados"],
    catLabels: { All:"Todos", Food:"Alimentos", Health:"Salud", Housing:"Vivienda", Utilities:"Servicios", Education:"Educación", Income:"Ingresos", Saved:"Guardados" },
    noResultsTitle: "Sin resultados",
    noResultsBody: "Pruebe otra palabra clave o categoría.",
    apply: "Aplicar ahora",
    details: "Detalles",
    saved: "Guardado",
    unsaved: "Guardar",
    footer: "Vista previa • © AidFinder",
    programCount: "programas",
    close: "Cerrar",
    stateLabel: "Su estado",
    allStates: "Todos los estados",
    share: "Compartir",
    shareWhatsApp: "Compartir por WhatsApp",
    shareEmail: "Compartir por correo",
    language: "Idioma",
    theme: "Tema",
    dark: "Oscuro",
    light: "Claro",
    donateH3: "Apoya AidFinder",
    donateP:  "Tu donación ayuda a mantener la app gratuita ❤️",
    donateBtn: "Donar con PayPal",
    donateQuick: "Donar $1",
    donateOr: "o",
    donateAny: "Donación personalizada",
    donateInputPH: "USD (ej. 5, 10, 25)",
    donateGo: "Donar",
    donateError: "Ingresa un monto válido (1–5000).",
  }
};

/** ===== Category Icons (Health = red cross SVG) ===== */
const ICONS = {
  Food: "🍏",
  Housing: "🏠",
  Utilities: "💡",
  Education: "🎓",
  Income: "💲",
  Health: (
    <svg
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      width="20" height="20" style={{ verticalAlign: "middle" }}
      aria-hidden="true" focusable="false"
    >
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

/** ===== Programs (data) =====
 * Keep your full `ALL` array. Add an `id` per item for stable keys.
 * If you can’t add ids now, the code falls back to a derived key.
*/
const ALL = [
  {
    id: "snap",
    category:"Food",
    link:"https://www.fns.usda.gov/snap",
    i18n:{
      en:{ title:"SNAP (Food Stamps)", desc:"Monthly funds to buy groceries for eligible households." },
      fr:{ title:"SNAP (Bons alimentaires)", desc:"Aide mensuelle pour acheter des produits alimentaires." },
      es:{ title:"SNAP (Cupones de Alimentos)", desc:"Fondos mensuales para comestibles." }
    }
  },
  {
    id: "wic",
    category:"Food",
    link:"https://www.fns.usda.gov/wic",
    i18n:{
      en:{ title:"WIC – Women, Infants, and Children", desc:"Nutrition support for pregnant/postpartum women and children under 5." },
      fr:{ title:"WIC – Femmes, nourrissons et enfants", desc:"Soutien nutritionnel pour femmes enceintes/post-partum et enfants < 5 ans." },
      es:{ title:"WIC – Mujeres, Infantes y Niños", desc:"Apoyo nutricional para mujeres embarazadas/posparto y niños menores de 5." }
    }
  },
  {
    id: "chip",
    category:"Health",
    link:"https://www.medicaid.gov/chip",
    i18n:{
      en:{ title:"CHIP – Children’s Health Insurance", desc:"Low-cost coverage for children in families that earn too much for Medicaid." },
      fr:{ title:"CHIP – Assurance santé enfants", desc:"Couverture à faible coût pour enfants ne remplissant pas les critères Medicaid." },
      es:{ title:"CHIP – Seguro de salud infantil", desc:"Cobertura de bajo costo para niños que exceden Medicaid." }
    }
  },
  // 👉 Add the rest of your items here with unique `id`s
];

/** ===== Search helpers (multi-locale, tolerant) ===== */
const norm = (s) => (s || "")
  .toString()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();

const makeSearchText = (p) => {
  const locales = ["en","fr","es"];
  const parts = [];

  for (const L of locales) {
    parts.push(p.i18n?.[L]?.title || "");
    parts.push(p.i18n?.[L]?.desc  || "");
  }
  parts.push(p.category || "");
  for (const L of locales) {
    const labels = UI?.[L]?.catLabels || {};
    parts.push(labels[p.category] || "");
  }
  try {
    const url = new URL(p.link);
    parts.push(url.hostname, url.pathname);
  } catch {}

  return norm(parts.join(" "));
};

const matchesQuery = (blob, q) => {
  const terms = norm(q).split(/\s+/).filter(Boolean);
  return terms.every(t => blob.includes(t));
};

/** ===== Helper: stable key even without `id` ===== */
const programKey = (p, i) =>
  p.id || `${p.category}|${p.link}` || `idx-${i}`;

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

  // share menu state
  const [shareOpenIndex, setShareOpenIndex] = useState(null);
  const [shareOpenModal, setShareOpenModal] = useState(false);

  // heart pulse
  const [animMap, setAnimMap] = useState({});
  const triggerAnim = (id) => {
    setAnimMap(m => ({ ...m, [id]: true }));
    setTimeout(() => setAnimMap(m => ({ ...m, [id]: false })), 300);
  };

  // close share on doc click
  useEffect(() => {
    const onDocClick = () => { setShareOpenIndex(null); setShareOpenModal(false); };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // share helpers
  const shareEmail = (p) => {
    const subject = encodeURIComponent(`Aid program: ${p.i18n[lang].title}`);
    const body = encodeURIComponent(`${p.i18n[lang].title}\n\n${p.i18n[lang].desc}\n\nLink: ${p.link}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  const shareWhatsApp = (p) => {
    const text = encodeURIComponent(`${p.i18n[lang].title} — ${p.i18n[lang].desc}\n${p.link}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };
  const doNativeShare = async (p) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: p.i18n[lang].title, text: p.i18n[lang].desc, url: p.link });
      } catch {}
    } else { setShareOpenModal(true); }
  };

  /** ===== PayPal helpers (Merchant-ID donate) ===== */
  const [showDonate, setShowDonate] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [donateError, setDonateError] = useState("");

  const openPayPal = (amt) => {
    const amount = Number(amt);
    if (Number.isFinite(amount)) {
      const base = "https://www.paypal.com/donate";
      const params = new URLSearchParams({
        business: PAYPAL_MERCHANT_ID,
        currency_code: "USD",
        no_recurring: "0",
        item_name: "Support AidFinder",
        amount: amount.toFixed(2)
      });
      window.open(`${base}?${params.toString()}`, "_blank", "noopener,noreferrer");
    }
  };

  const handleCustomDonate = (e) => {
    e.preventDefault();
    setDonateError("");
    const val = parseFloat((customAmount || "").toString().replace(",", "."));
    if (!Number.isFinite(val) || val < 1 || val > 5000) {
      setDonateError(T.donateError);
      return;
    }
    openPayPal(val);
  };

  /** ===== Filtered Programs (stable, all cards show) ===== */
  const programs = useMemo(()=>{
    let base = ALL;

    if (cat === "Saved") base = base.filter(p => favs.includes(p.link) || favs.includes(p.id));
    else if (cat !== "All") base = base.filter(p => p.category === cat);

    if (stateSel && stateSel !== "All States") {
      base = base.filter(p => !p.states || p.states.includes(stateSel));
    }

    // Precompute blobs for fast search
    const blobs = new Map();
    const getBlob = (p) => {
      const key = programKey(p);
      if (!blobs.has(key)) blobs.set(key, makeSearchText(p));
      return blobs.get(key);
    };

    if (query.trim()) {
      base = base.filter(p => matchesQuery(getBlob(p), query));
    }
    return base;
  }, [cat, favs, stateSel, query]);

  // details modal
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  // simple stagger-on-mount for cards
  const [reveal, setReveal] = useState(false);
  useEffect(() => { setReveal(true); }, []);

  return (
    <>
      <Head>
        <title>AidFinder — {T.title}</title>
        <meta name="description" content={T.subtitle} />
        <meta name="theme-color" content={theme === "dark" ? "#0b1220" : "#16a34a"} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:title" content="AidFinder — Find Aid Programs Easily" />
        <meta property="og:description" content={T.subtitle} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Header */}
      <header className="nav">
        <div className="container headerRow">
          <div className="brandRow">
            <BrandLogo size={40} />
            <strong>{T.brand}</strong>
          </div>

          <div style={{display:"flex", alignItems:"center", gap:10}}>
            {/* Language */}
            <div className="stateSelectWrap">
              <label htmlFor="langSel">{T.language}:</label>
              <select
                id="langSel"
                className="langSelect"
                value={lang}
                onChange={(e)=> setLang(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
              </select>
            </div>

            {/* Theme */}
            <div className="stateSelectWrap">
              <label htmlFor="themeSel">{T.theme}:</label>
              <select
                id="themeSel"
                className="langSelect"
                value={theme}
                onChange={(e)=>setTheme(e.target.value)}
              >
                <option value="light">{T.light}</option>
                <option value="dark">{T.dark}</option>
              </select>
            </div>
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

        {/* Toolbar */}
        <section className="toolbar">
          {/* SEARCH */}
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
                    <button type="submit" className="iconOnly" aria-label={T.searchBtn} title={T.searchBtn}>🔎</button>
                  )}
                  {query && (
                    <button
                      type="button"
                      className="iconOnly"
                      onClick={()=>setQuery("")}
                      aria-label={T.clearBtn}
                      title={T.clearBtn}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="filtersRow">
            {/* Category chips */}
            <div className="chips scrollX" role="tablist" aria-label="Categories">
              {UI[lang].categories.map(key=>{
                const active = cat===key;
                return (
                  <button
                    key={key}
                    className={`chip ${active ? "chipActive":""}`}
                    onClick={()=>setCat(key)}
                    type="button"
                    role="tab"
                    aria-selected={active}
                  >
                    {UI[lang].catLabels[key] || key}
                  </button>
                );
              })}
            </div>

            {/* State selector */}
            <div className="stateSelectWrap">
              <label htmlFor="stateSel">{T.stateLabel}:</label>
              <select
                id="stateSel"
                className="langSelect"
                value={stateSel}
                onChange={(e)=>setStateSel(e.target.value)}
              >
                {US_STATES.map(s => (
                  <option key={s} value={s}>
                    {s === "All States" ? T.allStates : s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="countRow">
            <span className="muted">{programs.length} {T.programCount}</span>
          </div>

          {/* Donate */}
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <h3 style={{ marginBottom: 6 }}>{T.donateH3}</h3>
            <p style={{ margin: "0 0 12px", color: "#4b5563" }}>{T.donateP}</p>

            <button
              type="button"
              className="paypalBtn"
              onClick={(e)=>{ e.stopPropagation(); setShowDonate(v=>!v); }}
            >
              <span style={{marginRight:8}}>🅿️</span>{T.donateBtn}
            </button>

            {showDonate && (
              <div className="donatePanel" onClick={(e)=>e.stopPropagation()}>
                <div className="donateRow">
                  <button type="button" className="quickBtn" onClick={()=>openPayPal(1)}>
                    {T.donateQuick}
                  </button>
                  <span className="muted" style={{margin:"0 8px"}}>{T.donateOr}</span>
                  <form className="customDonate" onSubmit={handleCustomDonate}>
                    <input
                      inputMode="decimal"
                      pattern="[0-9]*[.,]?[0-9]{0,2}"
                      min="1"
                      step="0.01"
                      placeholder={T.donateInputPH}
                      value={customAmount}
                      onChange={(e)=>setCustomAmount(e.target.value)}
                      aria-label={T.donateAny}
                    />
                    <button type="submit" className="goBtn">{T.donateGo}</button>
                  </form>
                </div>
                {/* Optional quick amounts */}
                <div className="donateRow" style={{ marginTop: 8 }}>
                  {[5,10,20,50].map(v => (
                    <button key={v} type="button" className="quickBtn" onClick={() => openPayPal(v)}>
                      ${v}
                    </button>
                  ))}
                </div>
                {donateError && <div className="errorText">{donateError}</div>}
              </div>
            )}
          </div>
        </section>

        {/* Cards */}
        <section className={`grid ${reveal ? "reveal" : ""}`}>
          {programs.map((p,i)=>{
            const title = p.i18n[lang]?.title || p.i18n.en.title;
            const desc  = p.i18n[lang]?.desc  || p.i18n.en.desc;
            const key = programKey(p, i);

            return (
              <article className="card" key={key} style={{ "--i": i }}>
                <div className="badge" style={{background: ICONS_BADGE_BG[p.category] || "var(--border)"}}>
                  {UI[lang].catLabels[p.category] || p.category}
                </div>

                <h3>
                  <span style={{marginRight:6, display:"inline-block", transform:"translateY(1px)"}}>
                    {ICONS[p.category] || "📌"}
                  </span>
                  {title}
                </h3>
                <p>{desc}</p>

                <div className="cardActions">
                  {/* Like */}
                  <button
                    type="button"
                    className="iconBtn"
                    aria-pressed={isFav(p.link) || isFav(p.id)}
                    onClick={(e)=>{ 
                      e.stopPropagation(); 
                      toggleFav(p.id || p.link); 
                      triggerAnim(p.id || p.link);
                    }}
                    title={isFav(p.id || p.link) ? T.saved : T.unsaved}
                    aria-label={isFav(p.id || p.link) ? T.saved : T.unsaved}
                  >
                    <HeartIcon on={isFav(p.id || p.link)} animate={!!animMap[p.id || p.link]} />
                  </button>

                  {/* Share */}
                  <div className="menuWrap" onClick={(e)=>e.stopPropagation()}>
                    <button
                      type="button"
                      className="secondary"
                      onClick={()=>navigator.share ? doNativeShare(p) : setShareOpenIndex(shareOpenIndex===i? null : i)}
                      aria-haspopup="menu"
                      aria-expanded={shareOpenIndex===i}
                    >
                      {T.share} ▾
                    </button>
                    {!navigator.share && shareOpenIndex===i && (
                      <div className="menu" role="menu">
                        <button role="menuitem" onClick={()=>shareWhatsApp(p)}>{T.shareWhatsApp}</button>
                        <button role="menuitem" onClick={()=>shareEmail(p)}>{T.shareEmail}</button>
                      </div>
                    )}
                  </div>

                  {/* Apply */}
                  <a className="apply" href={p.link} target="_blank" rel="noreferrer">
                    {T.apply}
                  </a>

                  {/* Details */}
                  <button
                    type="button"
                    className="secondary"
                    onClick={()=>{
                      setCurrent(p);
                      setShareOpenModal(false);
                      setShareOpenIndex(null);
                      setOpen(true);
                    }}
                  >
                    {T.details}
                  </button>
                </div>
              </article>
            );
          })}

          {programs.length===0 && (
            <div className="empty">
              <div className="emptyArt" aria-hidden>🔍</div>
              <strong>{T.noResultsTitle}</strong>
              <p>{T.noResultsBody}</p>
            </div>
          )}
        </section>

        {/* Details Modal */}
        {open && current && (
          <>
            <div className="backdrop" onClick={()=>{ setOpen(false); setShareOpenModal(false); }} />
            <div className="modal" role="dialog" aria-modal="true" aria-label="Program details">
              <div className="modalHeader">
                <span className="badge" style={{background: ICONS_BADGE_BG[current.category] || "var(--border)"}}>
                  {UI[lang].catLabels[current.category] || current.category}
                </span>
                <button className="closeX" onClick={()=>{ setOpen(false); setShareOpenModal(false); }} aria-label={T.close}>✕</button>
              </div>
              <h3 className="modalTitle">
                <span style={{marginRight:6, display:"inline-block", transform:"translateY(1px)"}}>
                  {ICONS[current.category] || "📌"}
                </span>
                {current.i18n[lang]?.title || current.i18n.en.title}
              </h3>
              <p className="modalBody">{current.i18n[lang]?.desc || current.i18n.en.desc}</p>
              <div className="modalActions" onClick={(e)=>e.stopPropagation()}>
                <button className="iconBtn" onClick={()=>{
                  toggleFav(current.id || current.link);
                  triggerAnim(current.id || current.link);
                }}>
                  <HeartIcon on={isFav(current.id || current.link)} animate={!!animMap[current.id || current.link]} />
                  <span style={{marginLeft:8}}>{isFav(current.id || current.link) ? T.saved : T.unsaved}</span>
                </button>

                <div className="menuWrap">
                  <button className="secondary" onClick={()=>setShareOpenModal(v=>!v)} aria-haspopup="menu" aria-expanded={shareOpenModal}>{T.share} ▾</button>
                  {shareOpenModal && (
                    <div className="menu" role="menu">
                      <button role="menuitem" onClick={()=>shareWhatsApp(current)}>{T.shareWhatsApp}</button>
                      <button role="menuitem" onClick={()=>shareEmail(current)}>{T.shareEmail}</button>
                    </div>
                  )}
                </div>

                <a className="apply" href={current.link} target="_blank" rel="noreferrer">{T.apply}</a>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="footer">
          <div style={{display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap"}}>
            <a href="/about">About</a>
            <span>•</span>
            <a href="/privacy">Privacy</a>
            <span>•</span>
            <a href="/terms">Terms</a>
            <span>•</span>
            <a href="/contact">Contact</a>
            <span>•</span>
            <a href="/support">Support</a>
          </div>
          <div style={{marginTop:8}}>{T.footer}</div>
        </footer>
      </main>

      {/* Global CSS: layout/grid + animations + donate styles */}
      <style jsx global>{`
        .pulse { animation: pulseAnim 0.3s ease-in-out; }
        @keyframes pulseAnim {
          0% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        :root {
          --bg: #ffffff;
          --fg: #111827;
          --muted: #6b7280;
          --border: #e5e7eb;
          --brand: #16a34a;

          --tint-food: #ecfdf5;
          --tint-health: #fee2e2;
          --tint-housing: #eff6ff;
          --tint-utilities: #fefce8;
          --tint-education: #f5f3ff;
          --tint-income: #f0f9ff;
        }
        [data-theme="dark"] {
          --bg: #0b1220;
          --fg: #e5e7eb;
          --muted: #9ca3af;
          --border: #1f2937;
          --brand: #22c55e;

          --tint-food: #052e22;
          --tint-health: #301414;
          --tint-housing: #0e223d;
          --tint-utilities: #2b2608;
          --tint-education: #1c1532;
          --tint-income: #062731;
        }

        body { background: var(--bg); color: var(--fg); }
        .container { max-width: 1100px; margin: 0 auto; padding: 16px; }

        .nav { border-bottom: 1px solid var(--border); background: var(--bg); position: sticky; top: 0; z-index: 20; }
        .headerRow { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 56px; }
        .brandRow { display: flex; align-items: center; gap: 10px; font-weight: 800; }

        .hero { margin: 20px 0 6px; }
        .hero h1 { margin: 0 0 6px; font-size: 26px; }
        .hero p { margin: 0; color: var(--muted); }

        .toolbar { display: grid; gap: 10px; margin-top: 8px; }
        .filtersRow { display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; }
        .chips { display: flex; gap: 8px; flex-wrap: nowrap; overflow: auto; }
        .scrollX { scrollbar-width: thin; }
        .chip {
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--fg);
          cursor: pointer;
          white-space: nowrap;
        }
        .chipActive { background: var(--fg); color: var(--bg); border-color: var(--fg); }
        .stateSelectWrap { display: inline-flex; align-items: center; gap: 6px; }
        .langSelect { padding: 8px 10px; border-radius: 10px; border: 1px solid var(--border); background: var(--bg); color: var(--fg); }
        .countRow { color: var(--muted); font-size: 14px; }

        /* Inline search */
        .searchInlineForm { width: 100%; margin-top: 20px; }
        .searchInline { position: relative; width: 100%; }
        .searchInlineInput {
          width: 100%;
          padding: 12px 96px 12px 14px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          outline: none;
          font-size: 16px;
          background: #fff;
        }
        .searchInlineInput:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,.15);
        }
        .searchInlineActions {
          position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
          display: flex; gap: 6px;
        }
        .iconOnly {
          height: 36px; min-width: 36px; padding: 0 8px; border-radius: 8px;
          border: 1px solid transparent; background: transparent; color: #16a34a;
          cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
          font-size: 18px; line-height: 1;
        }
        .iconOnly:hover, .iconOnly:focus { background: rgba(22,163,74,0.08); outline: none; }

        /* Grid + Card */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
          margin-top: 10px;
          align-items: start;
        }
        .grid .card {
          opacity: 0; transform: translateY(16px);
          transition: opacity 480ms ease, transform 480ms ease, box-shadow 180ms ease, transform 180ms ease;
          transition-delay: calc(var(--i, 0) * 70ms);
          will-change: transform, opacity;
        }
        .grid.reveal .card { opacity: 1; transform: translateY(0); }

        .card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 14px;
          box-shadow: 0 1px 0 rgba(0,0,0,0.03);
          overflow: visible;
        }
        .card:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 6px 18px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06); }
        .card h3 { margin: 6px 0 6px; font-size: 17px; }
        .card p { margin: 0 0 12px; color: var(--muted); }

        .badge {
          display: inline-block;
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--tint-food);
          color: var(--fg);
        }

        .cardActions { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .iconBtn {
          border: 1px solid var(--border); background: transparent; color: var(--fg);
          border-radius: 10px; padding: 8px; cursor: pointer;
        }
        .secondary {
          border: 1px solid var(--border); background: transparent; color: var(--fg);
          border-radius: 10px; padding: 8px 10px; cursor: pointer;
        }
        .apply {
          text-decoration: none; font-weight: 700;
          background: var(--fg); color: var(--bg);
          padding: 10px 12px; border-radius: 10px; border: 1px solid var(--fg);
        }

        /* Share menu */
        .menuWrap { position: relative; }
        .menu {
          position: absolute; top: calc(100% + 6px); left: 0; z-index: 12;
          background: var(--bg); border: 1px solid var(--border); border-radius: 10px;
          min-width: 180px; padding: 6px; box-shadow: 0 10px 24px rgba(0,0,0,0.10);
        }
        .menu button {
          display: block; width: 100%; text-align: left; padding: 8px 10px;
          border: none; background: transparent; color: var(--fg); cursor: pointer; border-radius: 8px;
        }
        .menu button:hover { background: rgba(0,0,0,0.04); }

        /* Empty state */
        .empty { grid-column: 1 / -1; border: 1px dashed var(--border); border-radius: 12px; padding: 20px; text-align: center; }
        .emptyArt { font-size: 28px; margin-bottom: 8px; }
        .muted { color: var(--muted); }

        /* Modal */
        .backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 40; }
        .modal { position: fixed; inset: 0; display: grid; place-items: center; z-index: 41; }
        .modal > * { background: var(--bg); color: var(--fg); width: min(680px, 92vw); border: 1px solid var(--border); border-radius: 14px; padding: 16px; }
        .modalHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        .modalTitle { margin: 8px 0; }
        .modalBody { color: var(--muted); margin: 0 0 12px; }
        .modalActions { display: flex; gap: 8px; flex-wrap: wrap; }
        .closeX { border: 1px solid var(--border); background: transparent; border-radius: 10px; padding: 6px 10px; cursor: pointer; }

        /* Footer */
        .footer { margin: 24px 0 8px; padding-top: 12px; border-top: 1px solid var(--border); text-align: center; color: var(--muted); }

        /* Donate UI */
        .paypalBtn {
          background: #ffd140;
          color: #111827;
          border: 1px solid #f3c43a;
          padding: 12px 18px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
        }
        .paypalBtn:hover { filter: brightness(0.97); }
        .donatePanel {
          margin: 12px auto 0;
          padding: 10px;
          border: 1px solid var(--border);
          border-radius: 12px;
          max-width: 520px;
          background: var(--bg);
        }
        .donateRow { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px; }
        .quickBtn {
          background: #16a34a;
          color: #fff;
          border: 1px solid #15803d;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
        }
        .quickBtn:hover { filter: brightness(0.98); }
        .customDonate { display: inline-flex; gap: 8px; align-items: center; }
        .customDonate input {
          width: 160px;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          outline: none;
          background: var(--bg); color: var(--fg);
        }
        .customDonate input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,.15); }
        .goBtn {
          background: var(--fg);
          color: var(--bg);
          border: 1px solid var(--fg);
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
        }
        .errorText { margin-top: 8px; color: #b91c1c; font-size: 14px; }
      `}</style>
    </>
  );
}
