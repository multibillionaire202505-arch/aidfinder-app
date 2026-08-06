// pages/index.js
import { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { ALL } from "../data/programs";

/** ===== Robust logo (fixed first load) ===== */
const BrandLogo = ({ size = 40 }) => (
  <img
    src="/icons/icon-192.png"
    alt="AidFinder logo"
    width={size}
    height={size}
    loading="eager"
    decoding="sync"
    style={{
      width: size,
      height: size,
      borderRadius: 8,
      objectFit: "contain",
      display: "block",
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
    title: "Find Real Assistance Programs Fast",
    subtitle:
     "Discover verified assistance programs across the United States — all in one place.",
    searchPlaceholder: "Search e.g. housing, food, health…",
    searchBtn: "Search",
    clearBtn: "Clear",
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
    footer: "© 2026 AidFinder — Helping people find real assistance programs.",
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
  },
  fr: {
    brand: "AidFinder",
    title: "Trouvez facilement des aides",
    subtitle:
      "Découvrez des programmes d’aide Alimentation, Santé, Logement, Services publics, Éducation et Revenus — au même endroit.",
    searchPlaceholder: "Rechercher ex. logement, alimentation, santé…",
    searchBtn: "Rechercher",
    clearBtn: "Effacer",
    categories: ["All", "Food", "Health", "Housing", "Utilities", "Education", "Income", "Saved"],
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
  },
  es: {
    brand: "AidFinder",
    title: "Encuentre Ayuda Fácilmente",
    subtitle:
      "Explore programas de Alimentos, Salud, Vivienda, Servicios, Educación e Ingresos — todo en un solo lugar.",
    searchPlaceholder: "Buscar p. ej. vivienda, alimentos, salud…",
    searchBtn: "Buscar",
    clearBtn: "Borrar",
    categories: ["All", "Food", "Health", "Housing", "Utilities", "Education", "Income", "Saved"],
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
  },
};

/** ===== Hero announcements =====
 * Keep the main AidFinder message first.
 * To publish a paid announcement later, add an item with active: true,
 * sponsored: true, and its official destination URL.
 */
const HERO_ANNOUNCEMENTS = {
  en: [
    {
      id: "main",
      eyebrow: "AidFinder",
      title: "Find Real Assistance Programs Fast",
      subtitle: "Discover verified assistance programs across the United States — all in one place.",
      active: true,
    },
    {
      id: "milestone-1000",
      eyebrow: "Milestone",
      title: "1,000 Assistance Programs in One Place",
      subtitle: "Search food, health, housing, utilities, education, and income resources for free.",
      active: true,
    },
    {
      id: "always-free",
      eyebrow: "Our Promise",
      title: "AidFinder Is Free for Everyone",
      subtitle: "People searching for assistance will never be charged to use AidFinder.",
      active: true,
    },
    // Paid announcement template — leave inactive until approved and paid.
    {
      id: "sponsor-template",
      eyebrow: "Featured Announcement",
      title: "Organization announcement goes here",
      subtitle: "Add a short, accurate description of the opportunity.",
      url: "https://example.org",
      cta: "Learn More",
      sponsored: true,
      active: false,
    },
  ],
  fr: [
    { id: "main", eyebrow: "AidFinder", title: "Trouvez facilement des aides", subtitle: "Découvrez des programmes d’aide vérifiés aux États-Unis — au même endroit.", active: true },
    { id: "milestone-1000", eyebrow: "Étape importante", title: "1 000 programmes d’aide au même endroit", subtitle: "Recherchez gratuitement des ressources d’alimentation, santé, logement, services publics, éducation et revenus.", active: true },
    { id: "always-free", eyebrow: "Notre promesse", title: "AidFinder est gratuit pour tous", subtitle: "Les personnes recherchant de l’aide ne paieront jamais pour utiliser AidFinder.", active: true },
  ],
  es: [
    { id: "main", eyebrow: "AidFinder", title: "Encuentre Ayuda Fácilmente", subtitle: "Descubra programas de asistencia verificados en Estados Unidos — todo en un solo lugar.", active: true },
    { id: "milestone-1000", eyebrow: "Hito", title: "1,000 programas de ayuda en un solo lugar", subtitle: "Busque gratis recursos de alimentos, salud, vivienda, servicios, educación e ingresos.", active: true },
    { id: "always-free", eyebrow: "Nuestra promesa", title: "AidFinder es gratis para todos", subtitle: "Las personas que buscan ayuda nunca pagarán por usar AidFinder.", active: true },
  ],
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
      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" fill="red" stroke="red" strokeWidth="1.5" />
    </svg>
  ),
};

/** ===== Badge tints ===== */
const ICONS_BADGE_BG = {
  Food: "var(--tint-food)",
  Health: "var(--tint-health, #fee2e2)",
  Housing: "var(--tint-housing)",
  Utilities: "var(--tint-utilities)",
  Education: "var(--tint-education)",
  Income: "var(--tint-income)",
};

/** ===== US states ===== */
const US_STATES = [
  "All States",
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "FL",
  "GA",
  "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY",
];

/** ===== Programs (data) ===== */

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

  // rotating hero announcements
  const heroItems = useMemo(
    () => (HERO_ANNOUNCEMENTS[lang] || HERO_ANNOUNCEMENTS.en).filter((item) => item.active),
    [lang]
  );
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    setHeroIndex(0);
  }, [lang]);

  useEffect(() => {
    if (heroPaused || heroItems.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroItems.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [heroItems.length, heroPaused]);

  const heroItem = heroItems[heroIndex] || {
    eyebrow: T.brand,
    title: T.title,
    subtitle: T.subtitle,
  };

  // search, category, state
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [stateSel, setStateSel] = useState("All States");

  // favorites (persist)
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    const raw = localStorage.getItem("aidfinder_favs");
    if (raw) setFavs(JSON.parse(raw));
  }, []);
  useEffect(() => {
    localStorage.setItem("aidfinder_favs", JSON.stringify(favs));
  }, [favs]);
  const toggleFav = (id) =>
    setFavs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
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

  // close share on doc click
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
    const subject = encodeURIComponent(`Aid program: ${p.i18n[lang].title}`);
    const body = encodeURIComponent(
      `${p.i18n[lang].title}\n\n${p.i18n[lang].desc}\n\nLink: ${p.link}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  const shareWhatsApp = (p) => {
    const text = encodeURIComponent(
      `${p.i18n[lang].title} — ${p.i18n[lang].desc}\n${p.link}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };
  const doNativeShare = async (p) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: p.i18n[lang].title,
          text: p.i18n[lang].desc,
          url: p.link,
        });
      } catch {}
    } else {
      setShareOpenModal(true);
    }
  };
const categoryCounts = useMemo(() => {
  return ALL.reduce((acc, program) => {
    acc[program.category] = (acc[program.category] || 0) + 1;
    acc.All = (acc.All || 0) + 1;
    return acc;
  }, {});
}, []);
  /** ===== SEARCHED PROGRAMS (improved) ===== */
  const programs = useMemo(() => {
    let base = ALL;

    if (cat === "Saved") base = base.filter((p) => favs.includes(p.link));
    else if (cat !== "All") base = base.filter((p) => p.category === cat);

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

          {/* Right side: Language + Theme */}
          <div className="headerControls">
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
        {/* Hero */}
        <section
          className="hero heroRotator"
          aria-live="polite"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
          onFocusCapture={() => setHeroPaused(true)}
          onBlurCapture={() => setHeroPaused(false)}
        >
          <div className="heroMessage" key={`${lang}-${heroItem.id || heroIndex}`}>
            <div className="heroEyebrowRow">
              <span className="heroEyebrow">{heroItem.eyebrow}</span>
              {heroItem.sponsored && <span className="sponsoredBadge">Sponsored</span>}
            </div>
            <h1>{heroItem.title}</h1>
            <p>{heroItem.subtitle}</p>
            {heroItem.url && heroItem.cta && (
              <a
                className="heroCta"
                href={heroItem.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                {heroItem.cta}
              </a>
            )}
          </div>

          {heroItems.length > 1 && (
            <div className="heroDots" aria-label="Announcement navigation">
              {heroItems.map((item, index) => (
                <button
                  key={item.id || index}
                  type="button"
                  className={`heroDot ${index === heroIndex ? "heroDotActive" : ""}`}
                  aria-label={`Show announcement ${index + 1}`}
                  aria-current={index === heroIndex ? "true" : undefined}
                  onClick={() => setHeroIndex(index)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Toolbar */}
        <section className="toolbar">
          <div className="searchWrap">
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
                  {query.trim().length > 0 && (
                    <button
                      type="submit"
                      className="iconOnly"
                      aria-label={T.searchBtn}
                      title={T.searchBtn}
                    >
                      🔎
                    </button>
                  )}

                  {query && (
                    <button
                      type="button"
                      className="iconOnly"
                      onClick={() => setQuery("")}
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
            <div className="chips scrollX" role="tablist" aria-label="Categories">
              {UI[lang].categories.map((key) => {
                const active = cat === key;
                return (
                  <button
                    key={key}
                    className={`chip chip-${key.toLowerCase()} ${active ? "chipActive" : ""}`}
                    onClick={() => {
  setOpen(false);
  setCurrent(null);
  setShareOpenModal(false);
  setShareOpenIndex(null);
  setCat(key);
}}
                    type="button"
                    role="tab"
                    aria-selected={active}
                  >
                 {UI[lang].catLabels[key] || key}
{key !== "Saved" && categoryCounts[key]
  ? ` (${categoryCounts[key]})`
  : ""}

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
  <span className="programCount">
    ✅ {programs.length} Verified Assistance Programs
  </span>
</div>

          {/* Donate */}
          <div className="donatePanel">
            <h3>Support AidFinder</h3>
            <p>
              Your donation helps keep this app free for families in need ❤️
            </p>
            <a
              className="af-donate"
              href="https://www.paypal.com/donate?business=T7UXDRDVCHGKE&currency_code=USD"
              target="_blank"
              rel="noopener"
              aria-label="Donate to AidFinder"
              onClick={() => {
                try {
                  window.dispatchEvent(new CustomEvent("donate_clicked"));
                } catch {}
              }}
            >
              <span className="af-donate__icon">💚</span>
              <span className="af-donate__text">Donate</span>
              <span className="af-donate__sub">Keep AidFinder Free</span>
            </a>
          </div>
        </section>

        {/* Cards */}
        <section className={`grid ${reveal ? "reveal" : ""}`}>
          {programs.map((p, i) => {
            const title = p.i18n[lang]?.title || p.i18n.en.title;
            const desc = p.i18n[lang]?.desc || p.i18n.en.desc;
            return (
              <article className={`card card-${p.category.toLowerCase()}`} key={`${p.link}-${p.category}-${i}`} style={{ "--i": i }}>
                <div
  className={`badge ${p.category.toLowerCase()}`}
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
                        navigator.share
                          ? doNativeShare(p)
                          : setShareOpenIndex(shareOpenIndex === i ? null : i)
                      }
                      aria-haspopup="menu"
                      aria-expanded={shareOpenIndex === i}
                    >
                      {T.share} ▾
                    </button>
                    {!navigator.share && shareOpenIndex === i && (
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

        {/* Details Modal */}
        {open && current && (
          <>
            <div
              className="backdrop"
              onClick={() => {
                setOpen(false);
                setShareOpenModal(false);
              }}
            />
            <div className="modal" role="dialog" aria-modal="true" aria-label="Program details">
              <div className="modalHeader">
                <span
                  className="badge"
                  style={{
                    background: ICONS_BADGE_BG[current.category] || "var(--border)",
                  }}
                >
                  {UI[lang].catLabels[current.category] || current.category}
                </span>
                <button
                  className="closeX"
                  onClick={() => {
                    setOpen(false);
                    setShareOpenModal(false);
                  }}
                  aria-label={T.close}
                >
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
              <p className="modalBody">{current.i18n[lang]?.desc || current.i18n.en.desc}</p>
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

        {/* Footer (✅ aligned clean) */}
        <footer className="footer">
          <div className="topLinks">
            <a href="/about">About</a>
            <span className="dot">•</span>
            <a href="/legal/privacy-policy">Privacy</a>
            <span className="dot">•</span>
            <a href="/terms">Terms</a>
            <span className="dot">•</span>
            <a href="/contact">Contact</a>
          </div>
          <div className="footerNote">{T.footer}</div>
        </footer>
      </main>

      {/* Global CSS */}
      <style jsx global>{`
        :root {
          --tint-food: #ecfdf5;
          --tint-health: #fee2e2;
          --tint-housing: #eef2ff;
          --tint-utilities: #f0f9ff;
          --tint-education: #fff7ed;
          --tint-income: #f5f3ff;
          --border: #e5e7eb;
          --muted: #6b7280;
          --bg: #ffffff;
          --text: #0f172a;
          --af-green: #19c37d;
          --af-green-dark: #17a56b;
          --af-text-on-green: #0b1f17;
          --food: #f59e0b;
          --food-soft: #fff7e6;
          --health: #e11d48;
          --health-soft: #fff1f4;
          --housing: #2563eb;
          --housing-soft: #eff6ff;
          --utilities: #ca8a04;
          --utilities-soft: #fefce8;
          --education: #7c3aed;
          --education-soft: #f5f3ff;
          --income: #059669;
          --income-soft: #ecfdf5;
        }
        :root[data-theme="dark"] {
  --bg: #0b1220;
  --text: #e5e7eb;
  --border: #1f2937;
  --muted: #94a3b8;
}

        html,
        body {
          margin: 0;
          padding: 0;
          background: var(--bg);
          color: var(--text);
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial,
            sans-serif;
        }
        .container {
          width: min(1100px, 92%);
          margin: 0 auto;
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 20;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }

        /* ✅ HEADER ALIGNMENT (logo + language + theme) */
        .headerRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          gap: 12px;
          flex-wrap: wrap;
        }
        .brandRow {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1 1 auto;
          min-width: 180px;
        }
        .headerControls {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 0 0 auto;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .hero {
          text-align: center;
          padding: 28px 0 8px;
        }
        .heroRotator {
          min-height: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .heroMessage {
          width: min(820px, 100%);
          animation: heroFadeUp 0.55s ease both;
        }
        .heroEyebrowRow {
          min-height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .heroEyebrow,
        .sponsoredBadge {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 5px 10px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .heroEyebrow {
          background: var(--tint-food, #dcfce7);
          color: #166534;
        }
        .sponsoredBadge {
          background: #fff7ed;
          color: #9a3412;
          border: 1px solid #fed7aa;
        }
        [data-theme="dark"] .heroEyebrow {
          background: #123326;
          color: #bbf7d0;
        }
        [data-theme="dark"] .sponsoredBadge {
          background: #3b2414;
          color: #fed7aa;
          border-color: #7c2d12;
        }
        .heroRotator h1 {
          margin: 0;
        }
        .heroRotator p {
          max-width: 720px;
          margin: 10px auto 0;
        }
        .heroCta {
          display: inline-flex;
          margin-top: 16px;
          padding: 10px 16px;
          border-radius: 999px;
          background: #16a34a;
          color: white;
          text-decoration: none;
          font-weight: 800;
        }
        .heroCta:hover {
          background: #15803d;
          transform: translateY(-1px);
        }
        .heroDots {
          display: flex;
          justify-content: center;
          gap: 7px;
          margin-top: 18px;
        }
        .heroDot {
          width: 8px;
          height: 8px;
          border: 0;
          border-radius: 999px;
          background: var(--border);
          padding: 0;
          cursor: pointer;
          transition: width 0.2s ease, background 0.2s ease;
        }
        .heroDotActive {
          width: 24px;
          background: #16a34a;
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .heroMessage { animation: none; }
          .heroDot { transition: none; }
        }
        @media (max-width: 560px) {
          .heroRotator { min-height: 210px; padding-top: 22px; }
          .heroRotator h1 { font-size: clamp(28px, 9vw, 42px); }
        }
        .toolbar {
          margin-top: 12px;
          padding: 18px;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.045), rgba(5, 150, 105, 0.055));
        }
        [data-theme="dark"] .toolbar {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(5, 150, 105, 0.1));
        }

        .filtersRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .stateSelectWrap {
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .langSelect {
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          border-radius: 10px;
          padding: 8px 10px;
        }

        .countRow {
          margin-top: 14px;
        }
        .programCount {
          display: inline-flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: var(--income-soft);
          color: #065f46;
          border: 1px solid #a7f3d0;
          font-weight: 800;
        }
        [data-theme="dark"] .programCount {
          background: #063b30;
          color: #a7f3d0;
          border-color: #047857;
        }
        .muted {
          color: var(--muted);
        }

        /* ✅ MOBILE: keep header clean */
        @media (max-width: 560px) {
          .headerControls {
            width: 100%;
            justify-content: space-between;
          }
          .brandRow strong {
            font-size: 16px;
          }
          .brandRow img {
            width: 32px !important;
            height: 32px !important;
          }
          .stateSelectWrap label {
            display: none;
          }
          .langSelect {
            padding: 8px 10px;
            font-size: 14px;
            max-width: 46vw;
          }
        }

        /* Chips */
        .chips {
          display: flex;
          gap: 8px;
          overflow: auto;
          padding: 2px 0;
        }
        .chips::-webkit-scrollbar {
          display: none;
        }
        .chip {
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          border-radius: 999px;
          padding: 8px 12px;
          cursor: pointer;
        }
        .chipActive {
          background: #e6f8f0;
          border-color: #cdeee1;
          color: #0b3d2b;
        }
        [data-theme="dark"] .chipActive {
          background: #0f2a22;
          border-color: #0e3527;
          color: #c6f0dc;
        }
        .chip-food.chipActive { background: var(--food-soft); border-color: #fcd34d; color: #92400e; }
        .chip-health.chipActive { background: var(--health-soft); border-color: #fda4af; color: #9f1239; }
        .chip-housing.chipActive { background: var(--housing-soft); border-color: #93c5fd; color: #1e40af; }
        .chip-utilities.chipActive { background: var(--utilities-soft); border-color: #fde047; color: #854d0e; }
        .chip-education.chipActive { background: var(--education-soft); border-color: #c4b5fd; color: #5b21b6; }
        .chip-income.chipActive { background: var(--income-soft); border-color: #6ee7b7; color: #065f46; }
        .chip-saved.chipActive { background: #fff1f2; border-color: #fda4af; color: #9f1239; }
        [data-theme="dark"] .chip-food.chipActive,
        [data-theme="dark"] .chip-health.chipActive,
        [data-theme="dark"] .chip-housing.chipActive,
        [data-theme="dark"] .chip-utilities.chipActive,
        [data-theme="dark"] .chip-education.chipActive,
        [data-theme="dark"] .chip-income.chipActive,
        [data-theme="dark"] .chip-saved.chipActive { color: #f8fafc; }

        /* Buttons */
        .apply {
          background: #111827;
          color: #fff;
          border: 0;
          border-radius: 10px;
          padding: 10px 14px;
          text-decoration: none;
          font-weight: 700;
        }
        [data-theme="dark"] .apply {
          background: #e5e7eb;
          color: #0b1220;
        }
        .secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 9px 12px;
          cursor: pointer;
        }
        .iconBtn {
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 8px 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* Search */
        .searchInlineForm {
          width: 100%;
          margin-top: 20px;
        }
        .searchInline {
          position: relative;
          width: 100%;
        }
        .searchInlineInput {
          width: 100%;
          padding: 12px 96px 12px 14px;
          border-radius: 12px;
          border: 1px solid var(--border);
          outline: none;
          font-size: 16px;
          background: var(--bg);
          color: var(--text);
        }
        .searchInlineInput:focus {
          border-color: var(--af-green);
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15);
        }
        .searchInlineActions {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          gap: 6px;
        }
        .iconOnly {
          height: 36px;
          min-width: 36px;
          padding: 0 8px;
          border-radius: 8px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--af-green);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .donatePanel {
          text-align: center;
          margin-top: 18px;
          padding: 18px;
          border-radius: 18px;
          border: 1px solid #bbf7d0;
          background: linear-gradient(135deg, #ecfdf5, #eff6ff);
        }
        .donatePanel h3 { margin: 0 0 6px; }
        .donatePanel p { margin: 0 0 12px; color: #475569; }
        [data-theme="dark"] .donatePanel {
          background: linear-gradient(135deg, #082f2a, #13213a);
          border-color: #166534;
        }
        [data-theme="dark"] .donatePanel p { color: #cbd5e1; }

        /* Cards + grid */
        .grid {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          margin: 16px 0 28px;
        }
        .card {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--bg);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
          transition: box-shadow 180ms ease, transform 180ms ease, opacity 480ms ease;
          opacity: 0;
          transform: translateY(16px);
        }
        .card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: var(--card-accent, #16a34a);
          border-radius: 16px 16px 7px 7px;
        }
        .card-food { --card-accent: var(--food); background: linear-gradient(180deg, var(--food-soft), var(--bg) 38%); }
        .card-health { --card-accent: var(--health); background: linear-gradient(180deg, var(--health-soft), var(--bg) 38%); }
        .card-housing { --card-accent: var(--housing); background: linear-gradient(180deg, var(--housing-soft), var(--bg) 38%); }
        .card-utilities { --card-accent: var(--utilities); background: linear-gradient(180deg, var(--utilities-soft), var(--bg) 38%); }
        .card-education { --card-accent: var(--education); background: linear-gradient(180deg, var(--education-soft), var(--bg) 38%); }
        .card-income { --card-accent: var(--income); background: linear-gradient(180deg, var(--income-soft), var(--bg) 38%); }
        [data-theme="dark"] .card-food,
        [data-theme="dark"] .card-health,
        [data-theme="dark"] .card-housing,
        [data-theme="dark"] .card-utilities,
        [data-theme="dark"] .card-education,
        [data-theme="dark"] .card-income { background: var(--bg); }
        .grid.reveal .card {
          opacity: 1;
          transform: translateY(0);
        }
        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.10), 0 3px 8px rgba(15, 23, 42, 0.05);
        }
        .card:focus-within {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.10), 0 3px 8px rgba(15, 23, 42, 0.05);
        }
        @media (prefers-reduced-motion: reduce) {
          .card,
          .card:hover,
          .card:focus-within {
            transition: none;
            transform: none;
          }
        }
        .card h3 {
          display: flex;
          align-items: center;
          gap: 6px;
          margin: 6px 0 6px;
        }
        .badge {
          display: inline-block;
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid var(--border);
          margin-bottom: 8px;
          color: #0f172a;
        }
        [data-theme="dark"] .badge {
          color: #cbd5e1;
        }
        .badge.food { background: var(--food-soft); border-color: #fcd34d; color: #92400e; }
        .badge.health { background: var(--health-soft); border-color: #fda4af; color: #9f1239; }
        .badge.housing { background: var(--housing-soft); border-color: #93c5fd; color: #1e40af; }
        .badge.utilities { background: var(--utilities-soft); border-color: #fde047; color: #854d0e; }
        .badge.education { background: var(--education-soft); border-color: #c4b5fd; color: #5b21b6; }
        .badge.income { background: var(--income-soft); border-color: #6ee7b7; color: #065f46; }
        [data-theme="dark"] .badge.food,
        [data-theme="dark"] .badge.health,
        [data-theme="dark"] .badge.housing,
        [data-theme="dark"] .badge.utilities,
        [data-theme="dark"] .badge.education,
        [data-theme="dark"] .badge.income { color: #f8fafc; background: #172033; }
        .cardActions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        /* Modal */
        .backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 40;
        }
        .modal {
          position: fixed;
          inset: auto 0 0 0;
          margin: auto;
          top: 10%;
          width: min(680px, 92%);
          background: var(--bg);
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 16px;
          z-index: 50;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .modalHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .modalTitle {
          margin: 0.25rem 0 0.5rem;
        }
        .modalActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 12px;
        }
        .closeX {
          background: transparent;
          border: 0;
          cursor: pointer;
          font-size: 18px;
          color: var(--text);
        }

        /* Menus */
        .menuWrap {
          position: relative;
          display: inline-block;
        }
        .menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 6px;
          min-width: 220px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 6px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          z-index: 30;
        }
        .menu button {
          width: 100%;
          text-align: left;
          background: transparent;
          border: 0;
          padding: 8px 10px;
          border-radius: 8px;
          cursor: pointer;
          color: var(--text);
        }
        .menu button:hover {
          background: rgba(22, 163, 74, 0.08);
        }

        /* Empty state */
        .empty {
          text-align: center;
          padding: 32px 0;
          color: var(--muted);
        }
        .emptyArt {
          font-size: 46px;
          margin-bottom: 10px;
        }

        /* ✅ FOOTER ALIGNMENT */
        .footer {
          border-top: 1px solid var(--border);
          text-align: center;
          padding: 18px 0;
          color: var(--muted);
        }
        .topLinks {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
        }
        .topLinks .dot {
          opacity: 0.6;
        }
        .footerNote {
          margin-top: 8px;
        }

        /* Mobile: footer becomes clean swipe row */
        @media (max-width: 560px) {
          .topLinks {
            justify-content: flex-start;
            overflow-x: auto;
            white-space: nowrap;
            flex-wrap: nowrap;
            -webkit-overflow-scrolling: touch;
            padding: 6px 0;
          }
          .topLinks::-webkit-scrollbar {
            display: none;
          }
          .topLinks a,
          .topLinks .dot {
            flex: 0 0 auto;
          }
        }

        /* Heart pulse */
        .pulse {
          animation: pulseAnim 0.3s ease-in-out;
        }
        @keyframes pulseAnim {
          0% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Donate button (animated) */
        :root {
          --af-donate-bg: #19c37d;
          --af-donate-bg-dark: #17a56b;
          --af-donate-text: #0b1f17;
          --af-donate-ring: rgba(25, 195, 125, 0.45);
          --af-donate-shadow: rgba(25, 195, 125, 0.55);
        }
        .af-donate {
          position: relative;
          display: inline-grid;
          grid-auto-flow: column;
          align-items: center;
          gap: 0.6rem;
          padding: 1.05rem 1.4rem;
          border-radius: 999px;
          background: var(--af-donate-bg);
          color: var(--af-donate-text);
          font-weight: 700;
          text-decoration: none;
          line-height: 1;
          box-shadow: 0 10px 24px -8px var(--af-donate-shadow),
            0 2px 0 rgba(0, 0, 0, 0.06) inset;
          isolation: isolate;
          transform: translateZ(0);
          transition: transform 0.16s ease, box-shadow 0.2s ease,
            background-color 0.2s ease, color 0.2s ease;
        }
        .af-donate__icon {
          font-size: 1.35rem;
        }
        .af-donate__text {
          font-size: 1.15rem;
          letter-spacing: 0.2px;
        }
        .af-donate__sub {
          font-size: 0.86rem;
          font-weight: 600;
          opacity: 0.9;
        }
        .af-donate:hover {
          background: var(--af-donate-bg-dark);
          box-shadow: 0 16px 36px -10px var(--af-donate-shadow),
            0 2px 0 rgba(0, 0, 0, 0.08) inset;
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );

}

