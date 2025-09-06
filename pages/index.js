import { useMemo, useState, useEffect } from "react";
import Head from "next/head";

/** UI translations */
const UI = {
  en: {
    brand: "AidFinder",
    title: "Find Aid Programs Easily",
    subtitle:
      "Explore programs across Food, Health, Housing, Utilities, Education, and Income — all in one place.",
    searchPlaceholder: "Search e.g. housing, food, health…",
    categories: ["All", "Food", "Health", "Housing", "Utilities", "Education", "Income"],
    noResultsTitle: "No results",
    noResultsBody: "Try a different keyword or category.",
    apply: "Apply Now",
    footer: "Demo preview • © AidFinder",
    language: "Language",
    programCount: "programs",
    clear: "Clear",
  },
  es: {
    brand: "AidFinder",
    title: "Encuentra Programas de Asistencia Fácilmente",
    subtitle:
      "Explora programas de Alimentos, Salud, Vivienda, Servicios, Educación e Ingresos — todo en un solo lugar.",
    searchPlaceholder: "Buscar p. ej. vivienda, alimentos, salud…",
    categories: ["Todos", "Alimentos", "Salud", "Vivienda", "Servicios", "Educación", "Ingresos"],
    noResultsTitle: "Sin resultados",
    noResultsBody: "Prueba con otra palabra clave o categoría.",
    apply: "Solicitar",
    footer: "Vista de demostración • © AidFinder",
    language: "Idioma",
    programCount: "programas",
    clear: "Limpiar",
  },
  fr: {
    brand: "AidFinder",
    title: "Trouvez facilement des aides",
    subtitle:
      "Découvrez des programmes pour l’Alimentation, la Santé, le Logement, les Services, l’Éducation et les Revenus — au même endroit.",
    searchPlaceholder: "Rechercher ex. logement, alimentation, santé…",
    categories: ["Tous", "Alimentation", "Santé", "Logement", "Services", "Éducation", "Revenus"],
    noResultsTitle: "Aucun résultat",
    noResultsBody: "Essayez un autre mot-clé ou une catégorie différente.",
    apply: "Postuler",
    footer: "Aperçu démo • © AidFinder",
    language: "Langue",
    programCount: "programmes",
    clear: "Effacer",
  },
};

/** Category labels for translated chips */
const CAT_LABEL = {
  en: { All: "All", Food: "Food", Health: "Health", Housing: "Housing", Utilities: "Utilities", Education: "Education", Income: "Income" },
  es: { All: "Todos", Food: "Alimentos", Health: "Salud", Housing: "Vivienda", Utilities: "Servicios", Education: "Educación", Income: "Ingresos" },
  fr: { All: "Tous", Food: "Alimentation", Health: "Santé", Housing: "Logement", Utilities: "Services", Education: "Éducation", Income: "Revenus" },
};

/** Simple emoji icons for categories */
const ICONS = {
  Food: "🍏",
  Health: "➕",
  Housing: "🏠",
  Utilities: "💡",
  Education: "🎓",
  Income: "💲",
};

/** Programs: 20 originals + 6 universal (total 26) */
const ALL = [
  {title:"SNAP (Food Stamps)", category:"Food", desc:"Monthly funds to buy groceries for eligible households.", link:"https://www.fns.usda.gov/snap"},
  {title:"WIC (Women, Infants, and Children)", category:"Food", desc:"Nutrition assistance & health referrals for women and young children.", link:"https://www.fns.usda.gov/wic"},
  {title:"National School Lunch Program (NSLP)", category:"Food", desc:"Provides low-cost or free lunches to eligible children in schools.", link:"https://www.fns.usda.gov/nslp"},
  {title:"Supplemental Nutrition Program for Seniors (CSFP)", category:"Food", desc:"Provides monthly food packages to low-income seniors.", link:"https://www.fns.usda.gov/csfp"},

  {title:"Medicaid", category:"Health", desc:"Free or low-cost health coverage for eligible individuals and families.", link:"https://www.medicaid.gov"},
  {title:"Community Health Centers", category:"Health", desc:"Affordable primary care, dental, and mental health services.", link:"https://findahealthcenter.hrsa.gov/"},
  {title:"Children’s Health Insurance Program (CHIP)", category:"Health", desc:"Low-cost health coverage to children whose families earn too much for Medicaid.", link:"https://www.medicaid.gov/chip/index.html"},

  {title:"Emergency Rental Assistance (ERA)", category:"Housing", desc:"Help with rent and utilities during hardship.", link:"https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/emergency-rental-assistance-program"},
  {title:"Section 8 Housing Choice Voucher Program", category:"Housing", desc:"Helps very low-income families, the elderly, and people with disabilities afford housing.", link:"https://www.hud.gov/topics/housing_choice_voucher_program_section8"},

  {title:"LIHEAP", category:"Utilities", desc:"Help paying heating/cooling bills and some energy-related repairs.", link:"https://www.acf.hhs.gov/ocs/programs/liheap"},
  {title:"Lifeline Program (Phone/Internet Assistance)", category:"Utilities", desc:"Discounted phone or internet service for low-income households.", link:"https://www.lifelinesupport.org/"},
  {title:"Low Income Water Assistance Program (LIHWAP)", category:"Utilities", desc:"Helps low-income households pay water and wastewater bills.", link:"https://www.acf.hhs.gov/ocs/programs/lihwap"},

  {title:"Federal Pell Grant", category:"Education", desc:"Grants for undergraduates with financial need — no repayment.", link:"https://studentaid.gov/understand-aid/types/grants/pell"},
  {title:"Head Start", category:"Education", desc:"School readiness & family support for infants, toddlers, and preschoolers.", link:"https://www.acf.hhs.gov/ohs"},
  {title:"Free Application for Federal Student Aid (FAFSA)", category:"Education", desc:"The central application for federal student aid, including loans and grants.", link:"https://studentaid.gov/h/apply-for-aid/fafsa"},

  {title:"Supplemental Security Income (SSI)", category:"Income", desc:"Monthly payments for people with disabilities or very low income aged 65+.", link:"https://www.ssa.gov/ssi/"},
  {title:"Unemployment Insurance (UI)", category:"Income", desc:"Temporary income support for eligible unemployed workers.", link:"https://www.dol.gov/general/topic/unemployment-insurance"},
  {title:"Temporary Assistance for Needy Families (TANF)", category:"Income", desc:"Cash assistance and support services for low-income families with children.", link:"https://www.acf.hhs.gov/ofa/programs/tanf"},
  {title:"Earned Income Tax Credit (EITC)", category:"Income", desc:"Refundable tax credit for low- to moderate-income working people.", link:"https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit"},

  // Universal
  { title:"988 Suicide & Crisis Lifeline", category:"Health", desc:"24/7 free and confidential support for anyone in distress — call or text 988.", link:"https://988lifeline.org" },
  { title:"211 Helpline (United Way)", category:"Utilities", desc:"Free, confidential 24/7 referrals for local help: food, housing, health, bills, and more.", link:"https://www.211.org" },
  { title:"FEMA Disaster Assistance", category:"Housing", desc:"Help after federally declared disasters — housing, repairs, and other needs.", link:"https://www.disasterassistance.gov" },
  { title:"Healthcare.gov Marketplace", category:"Health", desc:"Shop health plans. Marketplace is open to all; financial help depends on income.", link:"https://www.healthcare.gov" },
  { title:"SBA Small Business Programs", category:"Income", desc:"Loans, counseling, and resources for entrepreneurs and small businesses.", link:"https://www.sba.gov/funding-programs" },
  { title:"Apprenticeship Finder", category:"Education", desc:"Paid ‘earn-while-you-learn’ training programs across many careers.", link:"https://www.apprenticeship.gov/apprenticeship-job-finder" },

  { title:"Community Development Block Grant (CDBG)", category:"Housing", desc:"Funds local housing & community development needs via HUD partners.", link:"https://www.hud.gov/program_offices/comm_planning/communitydevelopment/programs" }
];

/** Icons per category */
const ICONS_BADGE_BG = {
  Food: "#E1F5EB",
  Health: "#E6F3FF",
  Housing: "#F4EBFF",
  Utilities: "#FFF4E5",
  Education: "#EAF0FF",
  Income: "#E8FFF4",
};

export default function Home() {
  // language remember
  const [lang, setLang] = useState("en");
  useEffect(()=>{
    const saved = typeof window!=="undefined" && localStorage.getItem("aidfinder_lang");
    if (saved) setLang(saved);
  },[]);
  useEffect(()=>{
    if (typeof window!=="undefined") localStorage.setItem("aidfinder_lang", lang);
  },[lang]);

  const T = UI[lang];

  // search + category
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(T.categories[0]); // translated "All"
  useEffect(()=>{ setCat(UI[lang].categories[0]); }, [lang]); // keep chip in sync when language changes

  // map translated chip back to canonical category key
  const activeCatKey = useMemo(()=>{
    const map = CAT_LABEL[lang];
    const entry = Object.entries(map).find(([key,label]) => label === cat);
    return entry ? entry[0] : "All";
  }, [cat, lang]);

  // filtered list
  const programs = useMemo(()=>{
    const q = query.trim().toLowerCase();
    return ALL.filter(p=>{
      const catOk = activeCatKey === "All" || p.category === activeCatKey;
      const qOk = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
  },[query, activeCatKey]);

  return (
    <>
      <Head>
        <title>AidFinder — Find Aid Programs Easily</title>
        <meta name="description" content="Explore U.S. aid programs across Food, Health, Housing, Utilities, Education, and Income—all in one place. Search and apply quickly with AidFinder." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#16a34a" />
        <link rel="canonical" href="https://aidfinder-app-uqzw.vercel.app/" />
        <meta property="og:title" content="AidFinder — Find Aid Programs Easily" />
        <meta property="og:description" content="Explore aid programs across Food, Health, Housing, Utilities, Education, and Income—search and apply, all in one place." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aidfinder-app-uqzw.vercel.app/" />
        <meta property="og:site_name" content="AidFinder" />
        <meta property="og:image" content="https://aidfinder-app-uqzw.vercel.app/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AidFinder — Find Aid Programs Easily" />
        <meta name="twitter:description" content="Explore U.S. aid programs across Food, Health, Housing, Utilities, Education, and Income—search and apply quickly." />
        <meta name="twitter:image" content="https://aidfinder-app-uqzw.vercel.app/og-image.png" />
        <link rel="alternate" hrefLang="en" href="https://aidfinder-app-uqzw.vercel.app/" />
        <link rel="alternate" hrefLang="es" href="https://aidfinder-app-uqzw.vercel.app/" />
        <link rel="alternate" hrefLang="fr" href="https://aidfinder-app-uqzw.vercel.app/" />
        <link rel="alternate" hrefLang="x-default" href="https://aidfinder-app-uqzw.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Head>

      {/* Header */}
      <header className="nav">
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between', gap: 12}}>
          <div className="brand" style={{display:'flex',alignItems:'center',gap:10}}>
            <img src="/logo.png" alt="AidFinder logo" style={{height:40, borderRadius:8}}/>
            <strong>{T.brand}</strong>
          </div>

          <nav className="topnav">
            <a href="#" className="toplink">Home</a>
            <a href="#" className="toplink">About</a>
            <a href="#" className="toplink">Contact</a>
          </nav>

          <div className="langSwitch">
            <label htmlFor="lang" style={{fontSize:13,color:"#64748b"}}>{T.language}:</label>
            <select id="lang" value={lang} onChange={(e)=>setLang(e.target.value)} className="langSelect">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
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
          <div className="searchWrap">
            <input
              className="search"
              placeholder={T.searchPlaceholder}
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
            {query && (
              <button className="clearBtn" onClick={()=>setQuery("")}>{T.clear}</button>
            )}
          </div>
          <div className="chips scrollX">
            {UI[lang].categories.map((label)=>(
              <button
                key={label}
                className={`chip ${cat===label ? "chipActive":""}`}
                onClick={()=>setCat(label)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="countRow">
            <span className="muted">{programs.length} {T.programCount}</span>
          </div>
        </section>

        {/* Cards */}
        <section className="grid">
          {programs.map((p,i)=>(
            <article className="card" key={i}>
              <div className="badge" style={{background: ICONS_BADGE_BG[p.category] || "#e2e8f0"}}>
                {CAT_LABEL[lang][p.category] || p.category}
              </div>
              <h3>{ICONS[p.category] || "📌"} {p.title}</h3>
              <p>{p.desc}</p>
              <a className="apply" href={p.link} target="_blank" rel="noreferrer">{T.apply}</a>
            </article>
          ))}

          {programs.length===0 && (
            <div className="empty">
              <div className="emptyArt" aria-hidden>🔍</div>
              <strong>{T.noResultsTitle}</strong>
              <p>{T.noResultsBody}</p>
            </div>
          )}
        </section>

        {/* Back to top */}
        <button className="totop" onClick={()=>window.scrollTo({top:0, behavior:"smooth"})} title="Back to top">↑</button>

        <footer className="footer">{T.footer}</footer>
      </main>
    </>
  );
}