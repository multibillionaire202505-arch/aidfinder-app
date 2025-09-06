import { useMemo, useState, useEffect } from "react";
import Head from "next/head";

/** ====== CONFIG: set where suggestions go (email subject only) ====== */
const ADMIN_EMAIL = "you@example.com"; // ← change this to your email (for mailto link)

/** Reusable Heart SVG (always visible) */
const HeartIcon = ({ on = false, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block" }}>
    <path
      d="M12.001 20.727s-7.2-4.315-10.285-8.32C-0.03 9.74 1.1 6.2 4.14 5.146c1.92-.68 4.02-.12 5.36 1.327l.5.537.5-.537c1.34-1.447 3.44-2.007 5.36-1.327 3.04 1.054 4.17 4.594 2.424 7.261-3.085 4.005-10.283 8.32-10.283 8.32z"
      fill={on ? "#e11d48" : "none"}
      stroke="#e11d48"
      strokeWidth="1.8"
    />
  </svg>
);

/** UI (English kept for clarity) */
const UI = {
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
  programCount: "programs",
  clear: "Clear",
  close: "Close",
  stateLabel: "Your State",
  allStates: "All States",
  share: "Share",
  shareCopy: "Copy Link",
  shareWhatsApp: "WhatsApp",
  shareEmail: "Email",
  suggest: "Suggest a program",
  formTitle: "Suggest a program",
  formName: "Program name",
  formCategory: "Category",
  formLink: "Official link (if any)",
  formState: "State (optional)",
  formDesc: "Why it helps / short description",
  formSendEmail: "Send Email",
  formSendWhatsApp: "Send WhatsApp",
  formCopy: "Copy",
  formNote: "Choose Email, WhatsApp or Copy.",
  copied: "Link copied!",
  shared: "Shared!",
};

/** Category icons */
const ICONS = { Food:"🍏", Health:"➕", Housing:"🏠", Utilities:"💡", Education:"🎓", Income:"💲" };

/** Badge tint */
const ICONS_BADGE_BG = {
  Food:"#E1F5EB", Health:"#E6F3FF", Housing:"#F4EBFF", Utilities:"#FFF4E5", Education:"#EAF0FF", Income:"#E8FFF4",
};

/** Full US states list (incl. DC) */
const US_STATES = [
  "All States","AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA",
  "MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"
];

/** Programs (national + examples of state-specific) */
const ALL = [
  // Food
  {title:"SNAP (Food Stamps)", category:"Food", desc:"Monthly funds to buy groceries for eligible households.", link:"https://www.fns.usda.gov/snap"},
  {title:"WIC (Women, Infants, and Children)", category:"Food", desc:"Nutrition assistance & health referrals for women and young children.", link:"https://www.fns.usda.gov/wic"},
  {title:"National School Lunch Program (NSLP)", category:"Food", desc:"Low-cost or free school lunches for eligible children.", link:"https://www.fns.usda.gov/nslp"},
  {title:"Supplemental Nutrition Program for Seniors (CSFP)", category:"Food", desc:"Monthly food boxes for low-income seniors.", link:"https://www.fns.usda.gov/csfp"},

  // Health
  {title:"Medicaid", category:"Health", desc:"Free or low-cost health coverage for eligible individuals and families.", link:"https://www.medicaid.gov"},
  {title:"Community Health Centers", category:"Health", desc:"Affordable primary care, dental, and mental health services.", link:"https://findahealthcenter.hrsa.gov/"},
  {title:"Children’s Health Insurance Program (CHIP)", category:"Health", desc:"Low-cost coverage for children who don’t qualify for Medicaid.", link:"https://www.medicaid.gov/chip/index.html"},

  // Housing
  {title:"Emergency Rental Assistance (ERA)", category:"Housing", desc:"Help with rent and utilities during hardship.", link:"https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/emergency-rental-assistance-program"},
  {title:"Section 8 Housing Choice Voucher Program", category:"Housing", desc:"Helps very low-income families afford decent housing.", link:"https://www.hud.gov/topics/housing_choice_voucher_program_section8"},

  // Utilities
  {title:"LIHEAP", category:"Utilities", desc:"Help paying heating/cooling bills and some energy repairs.", link:"https://www.acf.hhs.gov/ocs/programs/liheap"},
  {title:"Lifeline (Phone/Internet)", category:"Utilities", desc:"Discounted phone or internet for eligible households.", link:"https://www.lifelinesupport.org/"},
  {title:"LIHWAP (Water Assistance)", category:"Utilities", desc:"Helps low-income households with water & wastewater bills.", link:"https://www.acf.hhs.gov/ocs/programs/lihwap"},

  // Education
  {title:"Federal Pell Grant", category:"Education", desc:"Grants for undergrads with financial need — no repayment.", link:"https://studentaid.gov/understand-aid/types/grants/pell"},
  {title:"Head Start", category:"Education", desc:"School readiness & family support for infants to preschoolers.", link:"https://www.acf.hhs.gov/ohs"},
  {title:"FAFSA", category:"Education", desc:"Apply for federal student aid (grants, loans, work-study).", link:"https://studentaid.gov/h/apply-for-aid/fafsa"},

  // Income
  {title:"SSI (Supplemental Security Income)", category:"Income", desc:"Monthly payments for people with disabilities or very low income aged 65+.", link:"https://www.ssa.gov/ssi/"},
  {title:"Unemployment Insurance (UI)", category:"Income", desc:"Temporary income for eligible unemployed workers.", link:"https://www.dol.gov/general/topic/unemployment-insurance"},
  {title:"TANF", category:"Income", desc:"Cash assistance & support services for low-income families with children.", link:"https://www.acf.hhs.gov/ofa/programs/tanf"},
  {title:"Earned Income Tax Credit (EITC)", category:"Income", desc:"Refundable tax credit for low-to-moderate income workers.", link:"https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit"},

  // Universal
  {title:"988 Suicide & Crisis Lifeline", category:"Health", desc:"24/7 free confidential help — call or text 988.", link:"https://988lifeline.org"},
  {title:"211 Helpline (United Way)", category:"Utilities", desc:"Free 24/7 referrals for local help: food, housing, bills, health.", link:"https://www.211.org"},
  {title:"FEMA Disaster Assistance", category:"Housing", desc:"Help after federally declared disasters — housing, repairs.", link:"https://www.disasterassistance.gov"},
  {title:"Healthcare.gov Marketplace", category:"Health", desc:"Shop health plans. Financial help varies by income.", link:"https://www.healthcare.gov"},
  {title:"SBA Small Business Programs", category:"Income", desc:"Loans, counseling & resources for entrepreneurs.", link:"https://www.sba.gov/funding-programs"},
  {title:"Apprenticeship Finder", category:"Education", desc:"Paid earn-while-you-learn training programs.", link:"https://www.apprenticeship.gov/apprenticeship-job-finder"},

  // Community development
  {title:"Community Development Block Grant (CDBG)", category:"Housing", desc:"Funds local housing & community development via HUD partners.", link:"https://www.hud.gov/program_offices/comm_planning/communitydevelopment/programs"},

  // ---- Example state-specific programs ----
  {title:"CalFresh (CA SNAP)", category:"Food", desc:"California’s SNAP program for food assistance.", link:"https://www.cdss.ca.gov/calfresh", states:["CA"]},
  {title:"Medi-Cal (CA Medicaid)", category:"Health", desc:"California’s Medicaid program.", link:"https://www.dhcs.ca.gov/services/medi-cal", states:["CA"]},
  {title:"HEAP (NY Home Energy Assistance)", category:"Utilities", desc:"Help with heating & cooling costs for eligible NY residents.", link:"https://otda.ny.gov/programs/heap/", states:["NY"]},
];

export default function Home() {
  // search, category, state
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(UI.categories[0]); // "All"
  const [stateSel, setStateSel] = useState("All States");

  // favorites
  const [favs, setFavs] = useState([]);
  useEffect(()=>{ const raw = localStorage.getItem("aidfinder_favs"); if(raw) setFavs(JSON.parse(raw)); },[]);
  useEffect(()=>{ localStorage.setItem("aidfinder_favs", JSON.stringify(favs)); },[favs]);
  const toggleFav = (id)=> setFavs(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  const isFav = (id)=> favs.includes(id);

  // share helpers
  const [toast, setToast] = useState("");
  const flash = (m)=>{ setToast(m); setTimeout(()=>setToast(""), 1600); };
  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard) { await navigator.clipboard.writeText(text); flash(UI.copied); }
      else { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand("copy"); document.body.removeChild(t); flash(UI.copied); }
    } catch {}
  };
  const shareWhatsApp = (p) => {
    const text = encodeURIComponent(`${p.title} — ${p.desc}\n${p.link}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };
  const shareEmail = (p) => {
    const subject = encodeURIComponent(`Aid program: ${p.title}`);
    const body = encodeURIComponent(`${p.title}\n\n${p.desc}\n\nLink: ${p.link}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // details modal
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  // suggestion modal
  const [openForm, setOpenForm] = useState(false);
  const [fName, setFName] = useState("");
  const [fCat, setFCat] = useState("Food");
  const [fLink, setFLink] = useState("");
  const [fState, setFState] = useState("All States");
  const [fDesc, setFDesc] = useState("");
  const buildSuggestionText = () =>
`Program: ${fName}
Category: ${fCat}
Link: ${fLink || "(none)"}
State: ${fState}
Description:
${fDesc}

(Submitted from AidFinder)`;

  const sendSuggestionEmail = () => {
    const subject = encodeURIComponent("AidFinder: Program suggestion");
    const body = encodeURIComponent(buildSuggestionText());
    window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
  };
  const sendSuggestionWhatsApp = () => {
    const text = encodeURIComponent(buildSuggestionText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };
  const copySuggestion = () => copyToClipboard(buildSuggestionText());

  // filtering
  const programs = useMemo(()=>{
    let base = ALL;

    // Saved category
    if (cat === "Saved") {
      base = base.filter(p => favs.includes(p.link));
    } else if (cat !== "All") {
      base = base.filter(p => p.category === cat);
    }

    // State filter: include national (no p.states) + those matching the state
    if (stateSel && stateSel !== "All States") {
      base = base.filter(p => !p.states || p.states.includes(stateSel));
    }

    // Search
    if (query.trim()) {
      const q = query.toLowerCase();
      base = base.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return base;
  }, [cat, favs, stateSel, query]);

  return (
    <>
      <Head>
        <title>AidFinder — Find Aid Programs Easily</title>
        <meta name="description" content="Explore aid programs across Food, Health, Housing, Utilities, Education, and Income — all in one place." />
      </Head>

      {/* Header */}
      <header className="nav">
        <div className="container headerRow">
          <div className="brandRow">
            <img src="/logo.png" alt="AidFinder logo" style={{height:40, borderRadius:8}}/>
            <strong>{UI.brand}</strong>
          </div>
          <div className="headerActions">
            <button className="secondary" onClick={()=>setOpenForm(true)}>{UI.suggest}</button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container">
        {/* Hero */}
        <section className="hero">
          <h1>{UI.title}</h1>
          <p>{UI.subtitle}</p>
        </section>

        {/* Toolbar */}
        <section className="toolbar">
          <div className="searchWrap">
            <input
              className="search"
              placeholder={UI.searchPlaceholder}
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
            {query && <button className="clearBtn" onClick={()=>setQuery("")}>{UI.clear}</button>}
          </div>

          <div className="filtersRow">
            {/* Category chips */}
            <div className="chips scrollX">
              {UI.categories.map(label=>(
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

            {/* State selector */}
            <div className="stateSelectWrap">
              <label htmlFor="stateSel">{UI.stateLabel}:</label>
              <select
                id="stateSel"
                className="langSelect"
                value={stateSel}
                onChange={(e)=>setStateSel(e.target.value)}
              >
                {US_STATES.map(s => (
                  <option key={s} value={s}>
                    {s === "All States" ? UI.allStates : s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="countRow">
            <span className="muted">{programs.length} {UI.programCount}</span>
          </div>
        </section>

        {/* Cards */}
        <section className="grid">
          {programs.map((p,i)=>(
            <article className="card" key={i}>
              <div className="badge" style={{background: ICONS_BADGE_BG[p.category] || "#e2e8f0"}}>
                {p.category}
              </div>

              <h3>{ICONS[p.category] || "📌"} {p.title}</h3>
              <p>{p.desc}</p>

              <div className="cardActions">
                {/* Favorite */}
                <button
                  type="button"
                  className={`iconBtn ${isFav(p.link) ? "heartOn":""}`}
                  aria-pressed={isFav(p.link)}
                  onClick={()=>toggleFav(p.link)}
                  title={isFav(p.link) ? UI.saved : UI.unsaved}
                >
                  <HeartIcon on={isFav(p.link)} />
                </button>

                {/* Details */}
                <button type="button" className="secondary" onClick={()=>{setCurrent(p); setOpen(true);}}>
                  {UI.details}
                </button>

                {/* Share menu: Copy | WhatsApp | Email */}
                <div className="btnGroup">
                  <button type="button" className="secondary" onClick={()=>copyToClipboard(p.link)}>
                    {UI.shareCopy}
                  </button>
                  <button type="button" className="secondary" onClick={()=>shareWhatsApp(p)}>
                    {UI.shareWhatsApp}
                  </button>
                  <button type="button" className="secondary" onClick={()=>shareEmail(p)}>
                    {UI.shareEmail}
                  </button>
                </div>

                {/* Apply */}
                <a className="apply" href={p.link} target="_blank" rel="noreferrer">
                  {UI.apply}
                </a>
              </div>
            </article>
          ))}

          {programs.length===0 && (
            <div className="empty">
              <div className="emptyArt" aria-hidden>🔍</div>
              <strong>{UI.noResultsTitle}</strong>
              <p>{UI.noResultsBody}</p>
            </div>
          )}
        </section>

        {/* Details Modal */}
        {open && current && (
          <>
            <div className="backdrop" onClick={()=>setOpen(false)} />
            <div className="modal" role="dialog" aria-modal="true" aria-label="Program details">
              <div className="modalHeader">
                <span className="badge" style={{background: ICONS_BADGE_BG[current.category] || "#e2e8f0"}}>
                  {current.category}
                </span>
                <button className="closeX" onClick={()=>setOpen(false)} aria-label={UI.close}>✕</button>
              </div>
              <h3 className="modalTitle">{ICONS[current.category] || "📌"} {current.title}</h3>
              <p className="modalBody">{current.desc}</p>
              <div className="modalActions">
                <button className={`iconBtn ${isFav(current.link) ? "heartOn":""}`} onClick={()=>toggleFav(current.link)}>
                  <HeartIcon on={isFav(current.link)} />
                  <span style={{marginLeft:8}}>{isFav(current.link) ? UI.saved : UI.unsaved}</span>
                </button>

                <div className="btnGroup">
                  <button className="secondary" onClick={()=>copyToClipboard(current.link)}>{UI.shareCopy}</button>
                  <button className="secondary" onClick={()=>shareWhatsApp(current)}>{UI.shareWhatsApp}</button>
                  <button className="secondary" onClick={()=>shareEmail(current)}>{UI.shareEmail}</button>
                </div>

                <a className="apply" href={current.link} target="_blank" rel="noreferrer">{UI.apply}</a>
              </div>
            </div>
          </>
        )}

        {/* Suggest Form Modal */}
        {openForm && (
          <>
            <div className="backdrop" onClick={()=>setOpenForm(false)} />
            <div className="modal" role="dialog" aria-modal="true" aria-label={UI.formTitle}>
              <div className="modalHeader">
                <strong>{UI.formTitle}</strong>
                <button className="closeX" onClick={()=>setOpenForm(false)} aria-label={UI.close}>✕</button>
              </div>

              <div className="formCol">
                <label>{UI.formName}</label>
                <input className="input" value={fName} onChange={e=>setFName(e.target.value)} />

                <label>{UI.formCategory}</label>
                <select className="input" value={fCat} onChange={e=>setFCat(e.target.value)}>
                  {["Food","Health","Housing","Utilities","Education","Income"].map(k=>(
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>

                <label>{UI.formLink}</label>
                <input className="input" value={fLink} onChange={e=>setFLink(e.target.value)} placeholder="https://..." />

                <label>{UI.formState}</label>
                <select className="input" value={fState} onChange={e=>setFState(e.target.value)}>
                  {US_STATES.map(s=> <option key={s} value={s}>{s}</option>)}
                </select>

                <label>{UI.formDesc}</label>
                <textarea className="textarea" rows={4} value={fDesc} onChange={e=>setFDesc(e.target.value)} />

                <div className="modalActions" style={{justifyContent:"space-between", flexWrap:"wrap"}}>
                  <div className="btnGroup">
                    <button className="secondary" onClick={sendSuggestionEmail}>{UI.formSendEmail}</button>
                    <button className="secondary" onClick={sendSuggestionWhatsApp}>{UI.formSendWhatsApp}</button>
                    <button className="secondary" onClick={copySuggestion}>{UI.formCopy}</button>
                  </div>
                  <span className="muted">{UI.formNote}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Toast */}
        {toast && <div className="toast">{toast}</div>}

        <footer className="footer">{UI.footer}</footer>
      </main>
    </>
  );
}