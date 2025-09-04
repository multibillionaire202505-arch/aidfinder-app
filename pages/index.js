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

/** Program catalog (same as we set before, with EN/ES/FR translations) */
const ALL = [
  // 👉 Keep your full translated list here (SNAP, WIC, NSLP, etc.)
];

/** Main component */
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
  const [cat, setCat] = useState(CATEGORIES[0]);

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

      <main className="container">
        {/* ✅ Full Logo Block */}
        <section className="hero" style={{textAlign:"center", padding:"30px 0", background:"#f9fafb", borderRadius:"12px", marginBottom:"30px"}}>
          <img 
            src="/logo-full.png" 
            alt="AidFinder Full Logo" 
            style={{maxWidth:"300px", height:"auto", marginBottom:"20px"}} 
          />
          <h1>{T.title}</h1>
          <p>{T.subtitle}</p>
        </section>

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
