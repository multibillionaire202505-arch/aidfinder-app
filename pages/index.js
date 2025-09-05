import { useMemo, useState, useEffect } from "react";

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
  },
};

/** Category labels */
const CAT_LABEL = {
  en: {All:"All", Food:"Food", Health:"Health", Housing:"Housing", Utilities:"Utilities", Education:"Education", Income:"Income"},
  es: {All:"Todos", Food:"Alimentos", Health:"Salud", Housing:"Vivienda", Utilities:"Servicios", Education:"Educación", Income:"Ingresos"},
  fr: {All:"Tous", Food:"Alimentation", Health:"Santé", Housing:"Logement", Utilities:"Services", Education:"Éducation", Income:"Revenus"}
};

/** Program catalog (EN/ES/FR) — make sure this stays populated */
const ALL = [
  {title:"SNAP (Food Stamps)", title_es:"SNAP (Cupones de Alimentos)", title_fr:"SNAP (Aide alimentaire)", category:"Food", desc:"Monthly funds to buy groceries for eligible households.", desc_es:"Fondos mensuales para comprar alimentos para hogares elegibles.", desc_fr:"Aide mensuelle pour acheter des produits alimentaires pour les foyers éligibles.", link:"https://www.fns.usda.gov/snap"},
  {title:"WIC (Women, Infants, and Children)", title_es:"WIC (Mujeres, Bebés y Niños)", title_fr:"WIC (Femmes, nourrissons et enfants)", category:"Food", desc:"Nutrition assistance & health referrals for women and young children.", desc_es:"Asistencia de nutrición y remisiones de salud para mujeres y niños pequeños.", desc_fr:"Aide nutritionnelle et orientations de santé pour les femmes et les jeunes enfants.", link:"https://www.fns.usda.gov/wic"},
  {title:"National School Lunch Program (NSLP)", title_es:"Programa Nacional de Almuerzos Escolares", title_fr:"Programme national de déjeuner scolaire", category:"Food", desc:"Provides low-cost or free lunches to eligible children in schools.", desc_es:"Ofrece almuerzos gratuitos o de bajo costo a estudiantes elegibles.", desc_fr:"Fournit des repas à faible coût ou gratuits aux élèves éligibles.", link:"https://www.fns.usda.gov/nslp"},
  {title:"Medicaid", title_es:"Medicaid", title_fr:"Medicaid", category:"Health", desc:"Free or low-cost health coverage for eligible individuals and families.", desc_es:"Cobertura de salud gratuita o de bajo costo para personas y familias elegibles.", desc_fr:"Couverture santé gratuite ou à faible coût pour les personnes et familles éligibles.", link:"https://www.medicaid.gov"},
  {title:"Community Health Centers", title_es:"Centros de Salud Comunitarios", title_fr:"Centres de santé communautaires", category:"Health", desc:"Affordable primary care, dental, and mental health services.", desc_es:"Atención primaria, dental y de salud mental a bajo costo.", desc_fr:"Soins primaires, dentaires et de santé mentale à coût abordable.", link:"https://findahealthcenter.hrsa.gov/"},
  {title:"LIHEAP", title_es:"LIHEAP", title_fr:"LIHEAP", category:"Utilities", desc:"Help paying heating/cooling bills and some energy-related repairs.", desc_es:"Ayuda para pagar facturas de calefacción/enfriamiento y reparaciones de energía.", desc_fr:"Aide pour payer les factures de chauffage/climatisation et certaines réparations énergétiques.", link:"https://www.acf.hhs.gov/ocs/programs/liheap"},
  {title:"Emergency Rental Assistance (ERA)", title_es:"Asistencia de Alquiler de Emergencia (ERA)", title_fr:"Aide d’urgence au loyer (ERA)", category:"Housing", desc:"Helps renters cover housing costs such as rent and utilities during hardship.", desc_es:"Ayuda a inquilinos a cubrir costos de vivienda como renta y servicios.", desc_fr:"Aide les locataires à couvrir le loyer et les services publics en période de difficulté.", link:"https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/emergency-rental-assistance-program"},
  {title:"Federal Pell Grant", title_es:"Beca Federal Pell", title_fr:"Bourse fédérale Pell", category:"Education", desc:"Grants for undergraduates with financial need; no repayment.", desc_es:"Becas para estudiantes universitarios con necesidad económica; no se devuelve.", desc_fr:"Aides pour étudiants de premier cycle ayant des besoins financiers ; sans remboursement.", link:"https://studentaid.gov/understand-aid/types/grants/pell"},
  {title:"Head Start", title_es:"Head Start", title_fr:"Head Start", category:"Education", desc:"School readiness & family support for infants, toddlers, and preschoolers.", desc_es:"Preparación escolar y apoyo familiar para bebés, niños pequeños y preescolares.", desc_fr:"Préparation scolaire et soutien familial pour nourrissons, tout-petits et enfants d’âge préscolaire.", link:"https://www.acf.hhs.gov/ohs"},
  {title:"Supplemental Security Income (SSI)", title_es:"Ingreso de Seguridad Suplementaria (SSI)", title_fr:"Revenu de sécurité supplémentaire (SSI)", category:"Income", desc:"Monthly payments for people with disabilities or very low income aged 65+.", desc_es:"Pagos mensuales para personas con discapacidad o bajos ingresos de 65+.", desc_fr:"Paiements mensuels pour les personnes handicapées ou à très faible revenu de 65 ans et plus.", link:"https://www.ssa.gov/ssi/"},
];

export default function Home(){
  const [lang, setLang] = useState("en");
  useEffect(()=>{
    const saved = typeof window !== "undefined" && localStorage.getItem("aidfinder_lang");
    if (saved) setLang(saved);
    else {
      const browser = (typeof navigator !== "undefined" && navigator.language || "en").slice(0,2);
      if (browser === "es") setLang("es");
      if (browser === "fr") setLang("fr");
    }
  },[]);
  useEffect(()=>{
    if (typeof window !== "undefined") localStorage.setItem("aidfinder_lang", lang);
  },[lang]);

  const T = UI[lang];
  const CATEGORIES = UI[lang].categories;

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(CATEGORIES[0]); // All/Todos/Tous

  const activeCatKey = useMemo(()=>{
    const map = CAT_LABEL[lang];
    const entry = Object.entries(map).find(([enKey, label]) => label === cat);
    return entry ? entry[0] : "All";
  }, [cat, lang]);

  const programs = useMemo(()=>{
    const q = query.trim().toLowerCase();
    return ALL.filter(p=>{
      const catOk = activeCatKey === "All" || p.category === activeCatKey;
      const titleShow = (lang === "es" && p.title_es) ? p.title_es
                      : (lang === "fr" && p.title_fr) ? p.title_fr
                      : p.title;
      const descShow  = (lang === "es" && p.desc_es) ? p.desc_es
                      : (lang === "fr" && p.desc_fr) ? p.desc_fr
                      : p.desc;
      const qOk = !q || titleShow.toLowerCase().includes(q) || descShow.toLowerCase().includes(q)
                 || p.category.toLowerCase().includes(q);
      return catOk && qOk;
    }).map(p=>({
      ...p,
      titleShow: (lang === "es" && p.title_es) ? p.title_es
                : (lang === "fr" && p.title_fr) ? p.title_fr
                : p.title,
      descShow:  (lang === "es" && p.desc_es) ? p.desc_es
                : (lang === "fr" && p.desc_fr) ? p.desc_fr
                : p.desc,
      catShow:   CAT_LABEL[lang][p.category] || p.category
    }));
  }, [query, activeCatKey, lang]);

  const countsByCat = useMemo(()=>{
    const counts = { All: ALL.length };
    ["Food","Health","Housing","Utilities","Education","Income"].forEach(k=>{
      counts[k] = ALL.filter(p=>p.category===k).length;
    });
    return counts;
  }, []);

  return (
    <>
      <header className="nav">
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between', gap: 12}}>
          <div className="brand" style={{display:'flex',alignItems:'center',gap:10}}>
            <img src="/logo.png" alt="AidFinder logo" style={{height:40, width:'auto', borderRadius:8}}/>
            <strong style={{fontSize:20}}>{T.brand}</strong>
          </div>

        {/* Language selector */}
          <div className="langSwitch">
            <label style={{fontSize:12, color:'#64748b', marginRight:6}}>{T.language}:</label>
            <select value={lang} onChange={(e)=>setLang(e.target.value)} className="langSelect" aria-label="Language">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </header>

      {/* Hero with full logo */}
      <main className="container">
        <section className="hero">
          <img src="/logo-full.png" alt="AidFinder Full Logo" style={{maxWidth:"300px", height:"auto", marginBottom:"20px"}} />
          <h1>{T.title}</h1>
          <p>{T.subtitle}</p>
        </section>

        {/* Search + Chips */}
        <section className="toolbar">
          <input className="search" placeholder={T.searchPlaceholder} value={query} onChange={(e)=>setQuery(e.target.value)} />
          <div className="chips">
            {CATEGORIES.map((label) => {
              const enKey = Object.entries(CAT_LABEL[lang]).find(([k,v])=>v===label)?.[0] || "All";
              const count = enKey === "All" ? countsByCat["All"] : countsByCat[enKey] || 0;
              return (
                <button key={label} className={`chip ${cat===label ? "chipActive":""}`} onClick={()=>setCat(label)} title={`${label} (${count})`}>
                  {label} {count ? `(${count})` : ""}
                </button>
              )
            })}
          </div>
        </section>

        {/* Program Cards */}
        <section className="grid">
          {programs.map((p,i)=>(
            <article className="card" key={i}>
              <div className="badge">{p.catShow}</div>
              <h3 style={{margin:0,fontWeight:800,fontSize:18}}>{p.titleShow}</h3>
              <p style={{color:'#475569'}}>{p.descShow}</p>
              <div>
                <a className="apply" href={p.link} target="_blank" rel="noreferrer">{T.apply}</a>
              </div>
            </article>
          ))}

          {programs.length===0 && (
            <div className="empty">
              <strong>{T.noResultsTitle}</strong>
              <p>{T.noResultsBody}</p>
            </div>
          )}
        </section>

        <footer className="footer">{T.footer}</footer>
      </main>
    </>
  );
}
