import { useMemo, useState, useEffect } from "react";
import Head from "next/head";

/** ==== CONFIG: set the email that receives suggestions ==== */
const ADMIN_EMAIL = "you@example.com"; // <-- CHANGE THIS to your email

/** UI translations */
const UI = {
  en: {
    brand: "AidFinder",
    title: "Find Aid Programs Easily",
    subtitle:
      "Explore programs across Food, Health, Housing, Utilities, Education, and Income — all in one place.",
    searchPlaceholder: "Search e.g. housing, food, health…",
    categories: ["All", "Food", "Health", "Housing", "Utilities", "Education", "Income", "Saved"],
    noResultsTitle: "No results",
    noResultsBody: "Try a different keyword or category.",
    apply: "Apply Now",
    details: "Details",
    saved: "Saved",
    unsaved: "Save",
    footer: "Demo preview • © AidFinder",
    language: "Language",
    programCount: "programs",
    clear: "Clear",
    close: "Close",
    stateLabel: "Your State",
    allStates: "All States",
    share: "Share",
    suggest: "Suggest a program",
    formTitle: "Suggest a program",
    formName: "Program name",
    formCategory: "Category",
    formLink: "Official link (if any)",
    formState: "State (optional)",
    formDesc: "Why it helps / short description",
    formSubmit: "Send suggestion",
    formNote: "This opens your email app with the info pre-filled.",
    copied: "Link copied!",
    shared: "Shared!",
  },
  es: {
    brand: "AidFinder",
    title: "Encuentra Programas de Asistencia Fácilmente",
    subtitle:
      "Explora programas de Alimentos, Salud, Vivienda, Servicios, Educación e Ingresos — todo en un solo lugar.",
    searchPlaceholder: "Buscar p. ej. vivienda, alimentos, salud…",
    categories: ["Todos", "Alimentos", "Salud", "Vivienda", "Servicios", "Educación", "Ingresos", "Guardados"],
    noResultsTitle: "Sin resultados",
    noResultsBody: "Prueba con otra palabra clave o categoría.",
    apply: "Solicitar",
    details: "Detalles",
    saved: "Guardado",
    unsaved: "Guardar",
    footer: "Vista de demostración • © AidFinder",
    language: "Idioma",
    programCount: "programas",
    clear: "Limpiar",
    close: "Cerrar",
    stateLabel: "Tu estado",
    allStates: "Todos los estados",
    share: "Compartir",
    suggest: "Sugerir un programa",
    formTitle: "Sugerir un programa",
    formName: "Nombre del programa",
    formCategory: "Categoría",
    formLink: "Enlace oficial (si existe)",
    formState: "Estado (opcional)",
    formDesc: "Por qué ayuda / breve descripción",
    formSubmit: "Enviar sugerencia",
    formNote: "Se abre tu correo con la información pre-completada.",
    copied: "¡Enlace copiado!",
    shared: "¡Compartido!",
  },
  fr: {
    brand: "AidFinder",
    title: "Trouvez facilement des aides",
    subtitle:
      "Découvrez des programmes pour l’Alimentation, la Santé, le Logement, les Services, l’Éducation et les Revenus — au même endroit.",
    searchPlaceholder: "Rechercher ex. logement, alimentation, santé…",
    categories: ["Tous", "Alimentation", "Santé", "Logement", "Services", "Éducation", "Revenus", "Favoris"],
    noResultsTitle: "Aucun résultat",
    noResultsBody: "Essayez un autre mot-clé ou une catégorie différente.",
    apply: "Postuler",
    details: "Détails",
    saved: "Enregistré",
    unsaved: "Enregistrer",
    footer: "Aperçu démo • © AidFinder",
    language: "Langue",
    programCount: "programmes",
    clear: "Effacer",
    close: "Fermer",
    stateLabel: "Votre État",
    allStates: "Tous les États",
    share: "Partager",
    suggest: "Suggérer un programme",
    formTitle: "Suggérer un programme",
    formName: "Nom du programme",
    formCategory: "Catégorie",
    formLink: "Lien officiel (si disponible)",
    formState: "État (optionnel)",
    formDesc: "Pourquoi c’est utile / courte description",
    formSubmit: "Envoyer la suggestion",
    formNote: "Votre application email s’ouvrira avec les infos pré-remplies.",
    copied: "Lien copié !",
    shared: "Partagé !",
  },
};

/** Category labels for translated chips */
const CAT_LABEL = {
  en: { All: "All", Food: "Food", Health: "Health", Housing: "Housing", Utilities: "Utilities", Education: "Education", Income: "Income", Saved: "Saved" },
  es: { All: "Todos", Food: "Alimentos", Health: "Salud", Housing: "Vivienda", Utilities: "Servicios", Education: "Educación", Income: "Ingresos", Saved: "Guardados" },
  fr: { All: "Tous", Food: "Alimentation", Health: "Santé", Housing: "Logement", Utilities: "Services", Education: "Éducation", Income: "Revenus", Saved: "Favoris" },
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

/** US States (short list for demo—you can extend) */
const US_STATES = [
  "All States","AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN",
  "KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY",
  "OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"
];

/** Programs: 26 national + optional state targeting (none set = national) */
const ALL = [
  // Food
  {title:"SNAP (Food Stamps)", category:"Food", desc:"Monthly funds to buy groceries for eligible households.", link:"https://www.fns.usda.gov/snap"},
  {title:"WIC (Women, Infants, and Children)", category:"Food", desc:"Nutrition assistance & health referrals for women and young children.", link:"https://www.fns.usda.gov/wic"},
  {title:"National School Lunch Program (NSLP)", category:"Food", desc:"Provides low-cost or free lunches to eligible children in schools.", link:"https://www.fns.usda.gov/nslp"},
  {title:"Supplemental Nutrition Program for Seniors (CSFP)", category:"Food", desc:"Provides monthly food packages to low-income seniors.", link:"https://www.fns.usda.gov/csfp"},

  // Health
  {title:"Medicaid", category:"Health", desc:"Free or low-cost health coverage for eligible individuals and families.", link:"https://www.medicaid.gov"},
  {title:"Community Health Centers", category:"Health", desc:"Affordable primary care, dental, and mental health services.", link:"https://findahealthcenter.hrsa.gov/"},
  {title:"Children’s Health Insurance Program (CHIP)", category:"Health", desc:"Low-cost health coverage to children whose families earn too much for Medicaid.", link:"https://www.medicaid.gov/chip/index.html"},

  // Housing
  {title:"Emergency Rental Assistance (ERA)", category:"Housing", desc:"Help with rent and utilities during hardship.", link:"https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/emergency-rental-assistance-program"},
  {title:"Section 8 Housing Choice Voucher Program", category:"Housing", desc:"Helps very low-income families, the elderly, and people with disabilities afford housing.", link:"https://www.hud.gov/topics/housing_choice_voucher_program_section8"},

  // Utilities
  {title:"LIHEAP", category:"Utilities", desc:"Help paying heating/cooling bills and some energy-related repairs.", link:"https://www.acf.hhs.gov/ocs/programs/liheap"},
  {title:"Lifeline Program (Phone/Internet Assistance)", category:"Utilities", desc:"Discounted phone or internet service for low-income households.", link:"https://www.lifelinesupport.org/"},
  {title:"Low Income Water Assistance Program (LIHWAP)", category:"Utilities", desc:"Helps low-income households pay water and wastewater bills.", link:"https://www.acf.hhs.gov/ocs/programs/lihwap"},

  // Education
  {title:"Federal Pell Grant", category:"Education", desc:"Grants for undergraduates with financial need — no repayment.", link:"https://studentaid.gov/understand-aid/types/grants/pell"},
  {title:"Head Start", category:"Education", desc:"School readiness & family support for infants, toddlers, and preschoolers.", link:"https://www.acf.hhs.gov/ohs"},
  {title:"Free Application for Federal Student Aid (FAFSA)", category:"Education", desc:"The central application for federal student aid, including loans and grants.", link:"https://studentaid.gov/h/apply-for-aid/fafsa"},

  // Income
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

  // Community / Housing development
  { title:"Community Development Block Grant (CDBG)", category:"Housing", desc:"Funds local housing & community development needs via HUD partners.", link:"https://www.hud.gov/program_offices/comm_planning/communitydevelopment/programs" },

  // Example of a state-specific program (you can add more of these later)
  // { title:"CalFresh (CA SNAP)", category:"Food", desc:"California’s SNAP program for food assistance.", link:"https://www.cdss.ca.gov/calfresh", states:["CA"] },
];

/** Badge tint by category */
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

  // search + category + state
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(T.categories[0]); // translated "All"
  const [stateSel, setStateSel] = useState("All States");
  useEffect(()=>{ setCat(UI[lang].categories[0]); }, [lang]); // sync chip on language change

  // favorites
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(()=>{
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("aidfinder_favs");
      if (raw) setFavs(JSON.parse(raw));
    }
  },[]);
  useEffect(()=>{
    if (typeof window !== "undefined") {
      localStorage.setItem("aidfinder_favs", JSON.stringify(favs));
    }
  },[favs]);
  const toggleFav = (id: string) => setFavs(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  const isFav = (id: string) => favs.includes(id);

  // chip mapping back to canonical category key
  const activeCatKey = useMemo(()=>{
    const map = CAT_LABEL[lang];
    const entry = Object.entries(map).find(([key,label]) => label === cat);
    return entry ? entry[0] : "All";
  }, [cat, lang]);

  // filter programs (category + search + state)
  const programs = useMemo(()=>{
    const q = query.trim().toLowerCase();

    // 1) start from Saved list if Saved chip chosen
    const savedLabel = UI[lang].categories[UI[lang].categories.length-1];
    const savedKey = Object.keys(CAT_LABEL[lang]).find(k => CAT_LABEL[lang][k] === savedLabel) || "Saved";

    let base = ALL;
    if (activeCatKey === "Saved" || activeCatKey === savedKey) {
      base = ALL.filter(p => favs.includes(p.link));
    } else if (activeCatKey !== "All") {
      base = ALL.filter(p => p.category === activeCatKey);
    }

    // 2) state filter: show national programs (no states field) + matching state
    if (stateSel && stateSel !== "All States") {
      base = base.filter(p => !p.states || p.states.includes(stateSel));
    }

    // 3) search filter
    return base.filter(p=>{
      const qOk = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return qOk;
    });
  },[query, activeCatKey, favs, lang, stateSel]);

  // details modal
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<typeof ALL[0] | null>(null);
  const openModal = (p:any) => { setCurrent(p); setOpen(true); };
  const closeModal = () => { setOpen(false); setCurrent(null); };

  // share (Web Share API + clipboard)
  const [toast, setToast] = useState<string>("");
  const flash = (msg:string) => { setToast(msg); setTimeout(()=>setToast(""), 1800); };
  const shareProgram = async (p:any) => {
    try {
      if (navigator.share) {
        await navigator.share({ title: p.title, text: p.desc, url: p.link });
        flash(T.shared);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(p.link);
        flash(T.copied);
      } else {
        // fallback
        prompt("Copy this link:", p.link);
      }
    } catch { /* user canceled */ }
  };

  // suggest a program form modal
  const [openForm, setOpenForm] = useState(false);
  const [fName, setFName] = useState("");
  const [fCat, setFCat] = useState("Food");
  const [fLink, setFLink] = useState("");
  const [fState, setFState] = useState("All States");
  const [fDesc, setFDesc] = useState("");

  const submitSuggestion = () => {
    const subject = encodeURIComponent("AidFinder: Program suggestion");
    const body = encodeURIComponent(
`Program: ${fName}
Category: ${fCat}
Link: ${fLink || "(none)"}
State: ${fState}
Description:
${fDesc}

(Submitted from AidFinder)`
    );
    window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Head>
        <title>AidFinder — Find Aid Programs Easily</title>
        <meta name="description" content="Explore U.S. aid programs across Food, Health, Housing, Utilities, Education, and Income—all in one place. Search and apply quickly with AidFinder." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#16a34a" />
        <link rel="canonical" href="https://aidfinder-app-uqzw.vercel.app/" />
      </Head>

      {/* Header */}
      <header className="nav">
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between', gap: 12}}>
          <div className="brand" style={{display:'flex',alignItems:'center',gap:10}}>
            <img src="/logo.png" alt="AidFinder logo" style={{height:40, borderRadius:8}}/>
            <strong>{T.brand}</strong>
          </div>

          <div className="headerActions">
            <button className="secondary" onClick={()=>setOpenForm(true)}>{T.suggest}</button>
            <div className="langSwitch">
              <label htmlFor="lang" style={{fontSize:13,color:"#64748b"}}>{T.language}:</label>
              <select id="lang" value={lang} onChange={(e)=>setLang(e.target.value)} className="langSelect">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
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

          <div className="filtersRow">
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

            <div className="stateSelectWrap">
              <label htmlFor="stateSel">{T.stateLabel}:</label>
              <select id="stateSel" className="langSelect" value={stateSel} onChange={(e)=>setStateSel(e.target.value)}>
                {US_STATES.map(s=> <option key={s} value={s}>{s === "All States" ? T.allStates : s}</option>)}
              </select>
            </div>
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

              <div className="cardActions">
                <button
                  type="button"
                  className={`heart ${isFav(p.link) ? "heartOn" : ""}`}
                  aria-pressed={isFav(p.link)}
                  onClick={()=>toggleFav(p.link)}
                  title={isFav(p.link) ? T.saved : T.unsaved}
                >
                  {isFav(p.link) ? "❤️" : "🤍"}
                </button>

                <button type="button" className="secondary" onClick={()=>openModal(p)}>
                  {T.details}
                </button>

                <button type="button" className="secondary" onClick={()=>shareProgram(p)}>
                  {T.share}
                </button>

                <a className="apply" href={p.link} target="_blank" rel="noreferrer">
                  {T.apply}
                </a>
              </div>
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

        {/* Details Modal */}
        {open && current && (
          <>
            <div className="backdrop" onClick={closeModal} />
            <div className="modal" role="dialog" aria-modal="true" aria-label="Program details">
              <div className="modalHeader">
                <span className="badge" style={{background: ICONS_BADGE_BG[current.category] || "#e2e8f0"}}>
                  {CAT_LABEL[lang][current.category] || current.category}
                </span>
                <button className="closeX" onClick={closeModal} aria-label={T.close}>✕</button>
              </div>
              <h3 className="modalTitle">{ICONS[current.category] || "📌"} {current.title}</h3>
              <p className="modalBody">{current.desc}</p>
              <div className="modalActions">
                <button
                  className={`heart ${isFav(current.link) ? "heartOn" : ""}`}
                  onClick={()=>toggleFav(current.link)}
                >
                  {isFav(current.link) ? "❤️" : "🤍"} {isFav(current.link) ? T.saved : T.unsaved}
                </button>
                <button className="secondary" onClick={()=>shareProgram(current)}>{T.share}</button>
                <a className="apply" href={current.link} target="_blank" rel="noreferrer">
                  {T.apply}
                </a>
              </div>
            </div>
          </>
        )}

        {/* Suggest Form Modal */}
        {openForm && (
          <>
            <div className="backdrop" onClick={()=>setOpenForm(false)} />
            <div className="modal" role="dialog" aria-modal="true" aria-label={T.formTitle}>
              <div className="modalHeader">
                <strong>{T.formTitle}</strong>
                <button className="closeX" onClick={()=>setOpenForm(false)} aria-label={T.close}>✕</button>
              </div>

              <div className="formCol">
                <label>{T.formName}</label>
                <input className="input" value={fName} onChange={e=>setFName(e.target.value)} />

                <label>{T.formCategory}</label>
                <select className="input" value={fCat} onChange={e=>setFCat(e.target.value)}>
                  {Object.keys(CAT_LABEL.en).filter(k=>k!=="All" && k!=="Saved").map(k=>(
                    <option key={k} value={k}>{CAT_LABEL[lang][k]}</option>
                  ))}
                </select>

                <label>{T.formLink}</label>
                <input className="input" value={fLink} onChange={e=>setFLink(e.target.value)} placeholder="https://..." />

                <label>{T.formState}</label>
                <select className="input" value={fState} onChange={e=>setFState(e.target.value)}>
                  {US_STATES.map(s=> <option key={s} value={s}>{s === "All States" ? T.allStates : s}</option>)}
                </select>

                <label>{T.formDesc}</label>
                <textarea className="textarea" rows={4} value={fDesc} onChange={e=>setFDesc(e.target.value)} />

                <div className="modalActions">
                  <button className="secondary" onClick={submitSuggestion}>{T.formSubmit}</button>
                  <span className="muted">{T.formNote}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Toast */}
        {toast && <div className="toast">{toast}</div>}

        <footer className="footer">{T.footer}</footer>
      </main>
    </>
  );
}