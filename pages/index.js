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

/** ===== UI strings (EN + FR + ES) ===== */
const UI = {
  en: {
    brand: "AidFinder",
    title: "Find Aid Programs Easily",
    subtitle:
      "Explore programs across Food, Health, Housing, Utilities, Education, and Income — all in one place.",
    searchPlaceholder: "Search e.g. housing, food, health…",
    categories: ["All", "Food", "Health", "Housing", "Utilities", "Education", "Income", "Saved"],
    catLabels: {
      All: "All",
      Food: "Food",
      Health: "Health",
      Housing: "Housing",
      Utilities: "Utilities",
      Education: "Education",
      Income: "Income",
      Saved: "Saved",
    },
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
    supportTitle: "Support AidFinder",
    supportDesc: "Your donation helps keep this app free for families in need ❤️",
    donate: "Donate",
    donateSub: "Keep AidFinder Free",
  },
  fr: {
    brand: "AidFinder",
    title: "Trouvez facilement des aides",
    subtitle:
      "Découvrez des programmes d’aide Alimentation, Santé, Logement, Services publics, Éducation et Revenus — au même endroit.",
    searchPlaceholder: "Rechercher ex. logement, alimentation, santé…",
    categories: ["Tous", "Alimentation", "Santé", "Logement", "Services publics", "Éducation", "Revenus", "Enregistrés"],
    catLabels: {
      All: "Tous",
      Food: "Alimentation",
      Health: "Santé",
      Housing: "Logement",
      Utilities: "Services publics",
      Education: "Éducation",
      Income: "Revenus",
      Saved: "Enregistrés",
    },
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
    supportTitle: "Soutenir AidFinder",
    supportDesc: "Votre don aide à garder l’app gratuite pour les familles ❤️",
    donate: "Donner",
    donateSub: "Garder AidFinder Gratuit",
  },
  es: {
    brand: "AidFinder",
    title: "Encuentre Ayuda Fácilmente",
    subtitle:
      "Explore programas de Alimentos, Salud, Vivienda, Servicios, Educación e Ingresos — todo en un solo lugar.",
    searchPlaceholder: "Buscar p. ej. vivienda, alimentos, salud…",
    categories: ["Todos", "Alimentos", "Salud", "Vivienda", "Servicios", "Educación", "Ingresos", "Guardados"],
    catLabels: {
      All: "Todos",
      Food: "Alimentos",
      Health: "Salud",
      Housing: "Vivienda",
      Utilities: "Servicios",
      Education: "Educación",
      Income: "Ingresos",
      Saved: "Guardados",
    },
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
    supportTitle: "Apoyar AidFinder",
    supportDesc: "Tu donación ayuda a mantener la app gratis para familias ❤️",
    donate: "Donar",
    donateSub: "Mantener AidFinder Gratis",
  },
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
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      style={{ verticalAlign: "middle" }}
      aria-hidden="true"
      focusable="false"
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
const BADGE_BG = {
  Food: "var(--tint-food)",
  Health: "var(--tint-health)",
  Housing: "var(--tint-housing)",
  Utilities: "var(--tint-utilities)",
  Education: "var(--tint-education)",
  Income: "var(--tint-income)",
};

/** ===== US states ===== */
const US_STATES = [
  "All States","AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA",
  "MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"
];

/** ===== Programs (data) ===== */
const ALL = [
  // Food
  { category:"Food", link:"https://www.fns.usda.gov/snap",
    i18n:{ en:{ title:"SNAP (Food Stamps)", desc:"Monthly funds to buy groceries for eligible households." },
           fr:{ title:"SNAP (Bons alimentaires)", desc:"Aide mensuelle pour acheter des produits alimentaires." },
           es:{ title:"SNAP (Cupones de Alimentos)", desc:"Fondos mensuales para comestibles." } } },
  { category:"Food", link:"https://www.fns.usda.gov/wic",
    i18n:{ en:{ title:"WIC (Women, Infants, and Children)", desc:"Nutrition assistance & health referrals for women and young children." },
           fr:{ title:"WIC (Femmes, nourrissons et enfants)", desc:"Aide nutritionnelle et orientations santé." },
           es:{ title:"WIC (Mujeres, Infantes y Niños)", desc:"Asistencia nutricional y referencias de salud." } } },
  { category:"Food", link:"https://www.fns.usda.gov/nslp",
    i18n:{ en:{ title:"National School Lunch Program (NSLP)", desc:"Low-cost or free school lunches for eligible children." },
           fr:{ title:"Programme national de déjeuner scolaire (NSLP)", desc:"Repas scolaires à faible coût ou gratuits." },
           es:{ title:"Programa Nacional de Almuerzos (NSLP)", desc:"Almuerzos escolares gratuitos o de bajo costo." } } },

  // Health
  { category:"Health", link:"https://www.medicaid.gov",
    i18n:{ en:{ title:"Medicaid", desc:"Free or low-cost health coverage for eligible individuals and families." },
           fr:{ title:"Medicaid", desc:"Couverture santé gratuite ou à faible coût." },
           es:{ title:"Medicaid", desc:"Cobertura de salud gratuita o de bajo costo." } } },
  { category:"Health", link:"https://findahealthcenter.hrsa.gov/",
    i18n:{ en:{ title:"Community Health Centers", desc:"Affordable primary care, dental, and mental health services." },
           fr:{ title:"Centres de santé communautaires", desc:"Soins primaires, dentaires et de santé mentale abordables." },
           es:{ title:"Centros de Salud Comunitarios", desc:"Atención primaria, dental y mental accesible." } } },

  // Housing
  { category:"Housing", link:"https://www.hud.gov/topics/housing_choice_voucher_program_section8",
    i18n:{ en:{ title:"Section 8 Housing Choice Voucher", desc:"Helps very low-income families afford decent housing." },
           fr:{ title:"Bons logement Section 8", desc:"Aide les ménages à très faible revenu à se loger." },
           es:{ title:"Vales de Vivienda Sección 8", desc:"Ayuda a familias de muy bajos ingresos." } } },

  // Utilities
  { category:"Utilities", link:"https://www.acf.hhs.gov/ocs/programs/liheap",
    i18n:{ en:{ title:"LIHEAP", desc:"Help paying heating/cooling bills and some energy repairs." },
           fr:{ title:"LIHEAP", desc:"Aide pour factures de chauffage/climatisation et réparations." },
           es:{ title:"LIHEAP", desc:"Ayuda para facturas de calefacción/aire." } } },
  { category:"Utilities", link:"https://www.lifelinesupport.org/",
    i18n:{ en:{ title:"Lifeline (Phone/Internet)", desc:"Discounted phone or internet for eligible households." },
           fr:{ title:"Lifeline (Téléphone/Internet)", desc:"Réductions sur téléphone ou internet." },
           es:{ title:"Lifeline (Teléfono/Internet)", desc:"Descuento en teléfono o internet." } } },

  // Education
  { category:"Education", link:"https://studentaid.gov/understand-aid/types/grants/pell",
    i18n:{ en:{ title:"Federal Pell Grant", desc:"Grants for undergrads with financial need — no repayment." },
           fr:{ title:"Bourse fédérale Pell", desc:"Bourses pour étudiants, sans remboursement." },
           es:{ title:"Beca Federal Pell", desc:"Becas para estudiantes; no se reembolsan." } } },

  // Income
  { category:"Income", link:"https://www.dol.gov/general/topic/unemployment-insurance",
    i18n:{ en:{ title:"Unemployment Insurance (UI)", desc:"Temporary income for eligible unemployed workers." },
           fr:{ title:"Assurance chômage (UI)", desc:"Revenu temporaire pour travailleurs au chômage." },
           es:{ title:"Seguro de Desempleo (UI)", desc:"Ingreso temporal para trabajadores desempleados." } } },

  // Universal
  { category:"Utilities", link:"https://www.211.org",
    i18n:{ en:{ title:"211 Helpline (United Way)", desc:"Free 24/7 referrals for local help: food, housing, bills, health." },
           fr:{ title:"Ligne 211 (United Way)", desc:"Orientation 24/7 vers aides locales : alimentation, logement, factures, santé." },
           es:{ title:"Línea 211 (United Way)", desc:"Referencias gratis 24/7: comida, vivienda, facturas, salud." } } },

  // State-specific demos (CA/TX/NY)
  { category:"Food", link:"https://www.cdss.ca.gov/calfresh", states:["CA"],
    i18n:{ en:{ title:"CalFresh (CA SNAP)", desc:"California’s SNAP program for food assistance." },
           fr:{ title:"CalFresh (SNAP Californie)", desc:"Programme SNAP de Californie." },
           es:{ title:"CalFresh (SNAP CA)", desc:"Programa SNAP de California." } } },
  { category:"Food", link:"https://www.yourtexasbenefits.com/Learn/SNAP", states:["TX"],
    i18n:{ en:{ title:"Texas SNAP (Your Texas Benefits)", desc:"Food assistance for eligible households in Texas." },
           fr:{ title:"SNAP Texas", desc:"Aide alimentaire pour ménages au Texas." },
           es:{ title:"SNAP de Texas", desc:"Asistencia alimentaria para Texas." } } },
  { category:"Food", link:"https://otda.ny.gov/programs/snap/", states:["NY"],
    i18n:{ en:{ title:"New York SNAP", desc:"Food assistance for eligible households in New York." },
           fr:{ title:"SNAP New York", desc:"Aide alimentaire pour ménages à New York." },
           es:{ title:"SNAP de Nueva York", desc:"Asistencia alimentaria en Nueva York." } } },
];

/** ===== Search helpers (multi-locale, tolerant) ===== */
const norm = (s) =>
  (s || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const makeSearchText = (p) => {
  const locales = ["en", "fr", "es"];
  const parts = [];

  for (const L of locales) {
    parts.push(p.i18n?.[L]?.title || "");
    parts.push(p.i18n?.[L]?.desc || "");
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
  return terms.every((t) => blob.includes(t));
};

/** ===== Main Component ===== */
export default function Home() {
  // language (persist)
  const [lang, setLang] = useState("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aidfinder_lang");
      if (saved) setLang(saved);
      else {
        const br = (navigator.language || "en").slice(0, 2);
        if (["en", "fr", "es"].includes(br)) setLang(br);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("aidfinder_lang", lang);
    } catch {}
  }, [lang]);

  // theme (persist)
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aidfinder_theme");
      const sysDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const t = saved || (sysDark ? "dark" : "light");
      setTheme(t);
      document.documentElement.setAttribute(
        "data-theme",
        t === "dark" ? "dark" : "light"
      );
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("aidfinder_theme", theme);
      document.documentElement.setAttribute(
        "data-theme",
        theme === "dark" ? "dark" : "light"
      );
    } catch {}
  }, [theme]);

  const T = UI[lang];

  // ✅ SSR-safe share detection
  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  // search, category, state
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [stateSel, setStateSel] = useState("All States");

  // favorites (persist)
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("aidfinder_favs");
      if (raw) setFavs(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("aidfinder_favs", JSON.stringify(favs));
    } catch {}
  }, [favs]);

  const toggleFav = (id) =>
    setFavs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const isFav = (id) => favs.includes(id);

  // share menu state
  const [shareOpenIndex, setShareOpenIndex] = useState(null);
  const [shareOpenModal, setShareOpenModal] = useState(false);

  // heart pulse
  const [animMap, setAnimMap] = useState({});
  const triggerAnim = (id) => {
    setAnimMap((m) => ({ ...m, [id]: true }));
    setTimeout(() => setAnimMap((m) => ({ ...m, [id]: false })), 300);
  };

  // close share menus on doc click
  useEffect(() => {
    const onDocClick = () => {
      setShareOpenIndex(null);
      setShareOpenModal(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // share helpers
  const shareEmail = (p) => {
    if (typeof window === "undefined") return;
    const subject = encodeURIComponent(`Aid program: ${p.i18n[lang].title}`);
    const body = encodeURIComponent(
      `${p.i18n[lang].title}\n\n${p.i18n[lang].desc}\n\nLink: ${p.link}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareWhatsApp = (p) => {
    if (typeof window === "undefined") return;
    const text = encodeURIComponent(
      `${p.i18n[lang].title} — ${p.i18n[lang].desc}\n${p.link}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const doNativeShare = async (p) => {
    if (!canNativeShare) return;
    try {
      await navigator.share({
        title: p.i18n[lang].title,
        text: p.i18n[lang].desc,
        url: p.link,
      });
    } catch {}
  };

  /** ===== FILTERED PROGRAMS ===== */
  const programs = useMemo(() => {
    let base = ALL;

    if (cat === "Saved") base = base.filter((p) => favs.includes(p.link));
    else if (cat !== "All") {
      // For FR/ES category tabs, we map them back to canonical category names:
      const reverseMap = {
        Tous: "All",
        Alimentation: "Food",
        Santé: "Health",
        Logement: "Housing",
        "Services publics": "Utilities",
        Éducation: "Education",
        Revenus: "Income",
        Enregistrés: "Saved",
        Todos: "All",
        Alimentos: "Food",
        Salud: "Health",
        Vivienda: "Housing",
        Servicios: "Utilities",
        Ingresos: "Income",
        Guardados: "Saved",
      };
      const canon = reverseMap[cat] || cat;
      base = base.filter((p) => p.category === canon);
    }

    if (stateSel && stateSel !== "All States") {
      base = base.filter((p) => !p.states || p.states.includes(stateSel));
    }

    const blobs = new Map();
    const getBlob = (p) => {
      if (!blobs.has(p)) blobs.set(p, makeSearchText(p));
      return blobs.get(p);
    };

    if (query.trim()) {
      base = base.filter((p) => matchesQuery(getBlob(p), query));
    }
    return base;
  }, [cat, favs, stateSel, query]);

  // details modal
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  // stagger-on-mount for cards
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    setReveal(true);
  }, []);

  return (
    <>
      <Head>
        <title>AidFinder — {T.title}</title>
        <meta name="description" content={T.subtitle} />
        <meta
          name="theme-color"
          content={theme === "dark" ? "#0b1220" : "#16a34a"}
        />
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

          {/* Right side: Language + Theme */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="stateSelectWrap">
              <label htmlFor="langSel">{T.language}:</label>
              <select
                id="langSel"
                className="langSelect"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
              </select>
            </div>

            <div className="stateSelectWrap">
              <label htmlFor="themeSel">{T.theme}:</label>
              <select
                id="themeSel"
                className="langSelect"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
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
        <section className="hero">
          <h1>{T.title}</h1>
          <p>{T.subtitle}</p>
        </section>

        <section className="toolbar">
          {/* Search */}
          <form
            className="searchInlineForm"
            onSubmit={(e) => e.preventDefault()}
            role="search"
            aria-label={T.searchPlaceholder}
          >
            <div className="searchInline">
              <input
                className="searchInlineInput"
                placeholder={T.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={T.searchPlaceholder}
              />

              <div className="searchInlineActions">
                {query && (
                  <button
                    type="button"
                    className="iconOnly"
                    onClick={() => setQuery("")}
                    aria-label="Clear"
                    title="Clear"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Filters */}
          <div className="filtersRow">
            <div className="chips" role="tablist" aria-label="Categories">
              {UI[lang].categories.map((key) => {
                const active = cat === key;
                return (
                  <button
                    key={key}
                    className={`chip ${active ? "chipActive" : ""}`}
                    onClick={() => setCat(key)}
                    type="button"
                    role="tab"
                    aria-selected={active}
                  >
                    {UI[lang].catLabels[key] || key}
                  </button>
                );
              })}
            </div>

            <div className="stateSelectWrap">
              <label htmlFor="stateSel">{T.stateLabel}:</label>
              <select
                id="stateSel"
                className="langSelect"
                value={stateSel}
                onChange={(e) => setStateSel(e.target.value)}
              >
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s === "All States" ? T.allStates : s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="countRow">
            <span className="muted">
              {programs.length} {T.programCount}
            </span>
          </div>

          {/* Donate */}
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <h3 style={{ marginBottom: 6 }}>{T.supportTitle}</h3>
            <p style={{ margin: "0 0 12px", color: "var(--muted)" }}>
              {T.supportDesc}
            </p>
            <a
              className="af-donate"
              href="https://www.paypal.com/donate?business=T7UXDRDVCHGKE&currency_code=USD"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Donate to AidFinder"
            >
              <span className="af-donate__icon">💚</span>
              <span className="af-donate__text">{T.donate}</span>
              <span className="af-donate__sub">{T.donateSub}</span>
            </a>
          </div>
        </section>

        {/* Cards */}
        <section className={`grid ${reveal ? "reveal" : ""}`}>
          {programs.map((p, i) => {
            const title = p.i18n[lang]?.title || p.i18n.en.title;
            const desc = p.i18n[lang]?.desc || p.i18n.en.desc;

            return (
              <article className="card" key={p.link} style={{ "--i": i }}>
                <div
                  className="badge"
                  style={{ background: BADGE_BG[p.category] || "var(--border)" }}
                >
                  {UI[lang].catLabels[p.category] || p.category}
                </div>

                <h3>
                  <span
                    style={{
                      marginRight: 6,
                      display: "inline-block",
                      transform: "translateY(1px)",
                    }}
                  >
                    {ICONS[p.category] || "📌"}
                  </span>
                  {title}
                </h3>

                <p>{desc}</p>

                <div className="cardActions">
                  <button
                    type="button"
                    className="iconBtn"
                    aria-pressed={isFav(p.link)}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFav(p.link);
                      triggerAnim(p.link);
                    }}
                    title={isFav(p.link) ? T.saved : T.unsaved}
                    aria-label={isFav(p.link) ? T.saved : T.unsaved}
                  >
                    <HeartIcon on={isFav(p.link)} animate={!!animMap[p.link]} />
                  </button>

                  <div className="menuWrap" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() =>
                        canNativeShare
                          ? doNativeShare(p)
                          : setShareOpenIndex(shareOpenIndex === i ? null : i)
                      }
                      aria-haspopup="menu"
                      aria-expanded={shareOpenIndex === i}
                    >
                      {T.share} ▾
                    </button>

                    {!canNativeShare && shareOpenIndex === i && (
                      <div className="menu" role="menu">
                        <button role="menuitem" onClick={() => shareWhatsApp(p)}>
                          {T.shareWhatsApp}
                        </button>
                        <button role="menuitem" onClick={() => shareEmail(p)}>
                          {T.shareEmail}
                        </button>
                      </div>
                    )}
                  </div>

                  <a className="apply" href={p.link} target="_blank" rel="noreferrer">
                    {T.apply}
                  </a>

                  <button
                    type="button"
                    className="secondary"
                    onClick={() => {
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

          {programs.length === 0 && (
            <div className="empty">
              <div className="emptyArt" aria-hidden>
                🔍
              </div>
              <strong>{T.noResultsTitle}</strong>
              <p>{T.noResultsBody}</p>
            </div>
          )}
        </section>

        {/* Details modal */}
        {open && current && (
          <>
            <div className="backdrop" onClick={() => setOpen(false)} />
            <div className="modal" role="dialog" aria-modal="true">
              <div className="modalHeader">
                <span
                  className="badge"
                  style={{
                    background: BADGE_BG[current.category] || "var(--border)",
                  }}
                >
                  {UI[lang].catLabels[current.category] || current.category}
                </span>
                <button className="closeX" onClick={() => setOpen(false)} aria-label={T.close}>
                  ✕
                </button>
              </div>

              <h3 className="modalTitle">
                <span
                  style={{
                    marginRight: 6,
                    display: "inline-block",
                    transform: "translateY(1px)",
                  }}
                >
                  {ICONS[current.category] || "📌"}
                </span>
                {current.i18n[lang]?.title || current.i18n.en.title}
              </h3>

              <p className="modalBody">
                {current.i18n[lang]?.desc || current.i18n.en.desc}
              </p>

              <div className="modalActions" onClick={(e) => e.stopPropagation()}>
                <button
                  className="iconBtn"
                  onClick={() => {
                    toggleFav(current.link);
                    triggerAnim(current.link);
                  }}
                >
                  <HeartIcon on={isFav(current.link)} animate={!!animMap[current.link]} />
                  <span style={{ marginLeft: 8 }}>
                    {isFav(current.link) ? T.saved : T.unsaved}
                  </span>
                </button>

                <div className="menuWrap">
                  <button
                    className="secondary"
                    onClick={() => setShareOpenModal((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={shareOpenModal}
                  >
                    {T.share} ▾
                  </button>

                  {shareOpenModal && (
                    <div className="menu" role="menu">
                      <button role="menuitem" onClick={() => shareWhatsApp(current)}>
                        {T.shareWhatsApp}
                      </button>
                      <button role="menuitem" onClick={() => shareEmail(current)}>
                        {T.shareEmail}
                      </button>
                    </div>
                  )}
                </div>

                <a className="apply" href={current.link} target="_blank" rel="noreferrer">
                  {T.apply}
                </a>
              </div>
            </div>
          </>
        )}

        <footer className="footer">
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/about">About</a>
            <span>•</span>
            <a href="/privacy">Privacy</a>
            <span>•</span>
            <a href="/terms">Terms</a>
            <span>•</span>
            <a href="/contact">Contact</a>
          </div>
          <div style={{ marginTop: 8 }}>{T.footer}</div>
        </footer>
      </main>
    </>
  );
}
