import { useMemo, useState, useEffect } from "react";
import Head from "next/head";

/** ===== Heart icon (inside red only; outline constant; pulse on click) ===== */
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
  },
  fr: {
    brand: "AidFinder",
    title: "Trouvez facilement des aides",
    subtitle:
      "Découvrez des programmes d’aide pour l’alimentation, la santé, le logement, les services publics, l’éducation et les revenus — au même endroit.",
    searchPlaceholder: "Rechercher ex. logement, alimentation, santé…",
    categories: ["Tous", "Alimentation", "Santé", "Logement", "Services publics", "Éducation", "Revenus", "Enregistrés"],
    catLabels: { All:"Tous", Food:"Alimentation", Health:"Santé", Housing:"Logement", Utilities:"Services publics", Education:"Éducation", Income:"Revenus", Saved:"Enregistrés" },
    noResultsTitle: "Aucun résultat",
    noResultsBody: "Essayez un autre mot-clé ou une autre catégorie.",
    apply: "Postuler",
    details: "Détails",
    saved: "Enregistré",
    unsaved: "Enregistrer",
    footer: "Aperçu démo • © AidFinder",
    programCount: "programmes",
    clear: "Effacer",
    close: "Fermer",
    stateLabel: "Votre État",
    allStates: "Tous les États",
    share: "Partager",
    shareWhatsApp: "Partager via WhatsApp",
    shareEmail: "Partager par e-mail",
    language: "Langue",
  },
  es: {
    brand: "AidFinder",
    title: "Encuentre Ayuda Fácilmente",
    subtitle:
      "Explore programas de Alimentos, Salud, Vivienda, Servicios, Educación e Ingresos — todo en un solo lugar.",
    searchPlaceholder: "Buscar p. ej. vivienda, alimentos, salud…",
    categories: ["Todos", "Alimentos", "Salud", "Vivienda", "Servicios", "Educación", "Ingresos", "Guardados"],
    catLabels: { All:"Todos", Food:"Alimentos", Health:"Salud", Housing:"Vivienda", Utilities:"Servicios", Education:"Educación", Income:"Ingresos", Saved:"Guardados" },
    noResultsTitle: "Sin resultados",
    noResultsBody: "Pruebe otra palabra clave o categoría.",
    apply: "Aplicar ahora",
    details: "Detalles",
    saved: "Guardado",
    unsaved: "Guardar",
    footer: "Vista previa de demostración • © AidFinder",
    programCount: "programas",
    clear: "Borrar",
    close: "Cerrar",
    stateLabel: "Su estado",
    allStates: "Todos los estados",
    share: "Compartir",
    shareWhatsApp: "Compartir por WhatsApp",
    shareEmail: "Compartir por correo",
    language: "Idioma",
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
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      style={{ fill: "red", verticalAlign: "middle" }}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
    </svg>
  ),
};

/** ===== Badge tints ===== */
const ICONS_BADGE_BG = {
  Food:"var(--tint-food)", Health:"var(--tint-health)", Housing:"var(--tint-housing)",
  Utilities:"var(--tint-utilities)", Education:"var(--tint-education)", Income:"var(--tint-income)"
};

/** ===== US States incl. DC ===== */
const US_STATES = [
  "All States","AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA",
  "MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"
];

/** ===== Program data with i18n (national + CA/TX/NY samples) ===== */
const ALL = [
  // Food
  { category:"Food", link:"https://www.fns.usda.gov/snap",
    i18n:{ en:{ title:"SNAP (Food Stamps)", desc:"Monthly funds to buy groceries for eligible households." },
           fr:{ title:"SNAP (Bons alimentaires)", desc:"Aide mensuelle pour acheter des produits alimentaires pour les ménages éligibles." },
           es:{ title:"SNAP (Cupones de Alimentos)", desc:"Fondos mensuales para comprar comestibles para hogares elegibles." } } },
  { category:"Food", link:"https://www.fns.usda.gov/wic",
    i18n:{ en:{ title:"WIC (Women, Infants, and Children)", desc:"Nutrition assistance & health referrals for women and young children." },
           fr:{ title:"WIC (Femmes, nourrissons et enfants)", desc:"Aide nutritionnelle et orientations santé pour les femmes et les jeunes enfants." },
           es:{ title:"WIC (Mujeres, Infantes y Niños)", desc:"Asistencia nutricional y referencias de salud para mujeres y niños pequeños." } } },
  { category:"Food", link:"https://www.fns.usda.gov/nslp",
    i18n:{ en:{ title:"National School Lunch Program (NSLP)", desc:"Low-cost or free school lunches for eligible children." },
           fr:{ title:"Programme national de déjeuner scolaire (NSLP)", desc:"Repas scolaires à faible coût ou gratuits pour les enfants éligibles." },
           es:{ title:"Programa Nacional de Almuerzos Escolares (NSLP)", desc:"Almuerzos escolares gratuitos o de bajo costo para niños elegibles." } } },
  { category:"Food", link:"https://www.fns.usda.gov/csfp",
    i18n:{ en:{ title:"Commodity Supplemental Food Program (CSFP)", desc:"Monthly food boxes for low-income seniors." },
           fr:{ title:"CSFP (Aide alimentaire pour aînés)", desc:"Colis alimentaires mensuels pour les personnes âgées à faible revenu." },
           es:{ title:"Programa CSFP (Alimentos para Mayores)", desc:"Cajas mensuales de alimentos para adultos mayores de bajos ingresos." } } },
  { category:"Food", link:"https://www.fns.usda.gov/sbp",
    i18n:{ en:{ title:"School Breakfast Program (SBP)", desc:"Free or low-cost school breakfasts for eligible students." },
           fr:{ title:"Programme de petit-déjeuner scolaire (SBP)", desc:"Petits-déjeuners scolaires gratuits ou à faible coût pour élèves éligibles." },
           es:{ title:"Programa de Desayunos Escolares (SBP)", desc:"Desayunos escolares gratuitos o de bajo costo para estudiantes elegibles." } } },

  // Health
  { category:"Health", link:"https://www.medicaid.gov",
    i18n:{ en:{ title:"Medicaid", desc:"Free or low-cost health coverage for eligible individuals and families." },
           fr:{ title:"Medicaid", desc:"Couverture santé gratuite ou à faible coût pour les personnes et familles éligibles." },
           es:{ title:"Medicaid", desc:"Cobertura de salud gratuita o de bajo costo para personas y familias elegibles." } } },
  { category:"Health", link:"https://findahealthcenter.hrsa.gov/",
    i18n:{ en:{ title:"Community Health Centers", desc:"Affordable primary care, dental, and mental health services." },
           fr:{ title:"Centres de santé communautaires", desc:"Soins primaires, dentaires et de santé mentale à coût réduit." },
           es:{ title:"Centros de Salud Comunitarios", desc:"Atención primaria, dental y de salud mental a precios accesibles." } } },
  { category:"Health", link:"https://www.medicaid.gov/chip/index.html",
    i18n:{ en:{ title:"Children’s Health Insurance Program (CHIP)", desc:"Low-cost coverage for children who don’t qualify for Medicaid." },
           fr:{ title:"Programme d’assurance santé pour enfants (CHIP)", desc:"Couverture à faible coût pour les enfants non éligibles à Medicaid." },
           es:{ title:"Programa de Seguro Médico Infantil (CHIP)", desc:"Cobertura de bajo costo para niños que no califican para Medicaid." } } },

  // Housing
  { category:"Housing", link:"https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/emergency-rental-assistance-program",
    i18n:{ en:{ title:"Emergency Rental Assistance (ERA)", desc:"Help with rent and utilities during hardship." },
           fr:{ title:"Aide d’urgence au loyer (ERA)", desc:"Aide pour le loyer et les services publics en cas de difficultés." },
           es:{ title:"Asistencia de Alquiler de Emergencia (ERA)", desc:"Ayuda con el alquiler y servicios durante dificultades." } } },
  { category:"Housing", link:"https://www.hud.gov/topics/housing_choice_voucher_program_section8",
    i18n:{ en:{ title:"Section 8 Housing Choice Voucher", desc:"Helps very low-income families afford decent housing." },
           fr:{ title:"Bons logement Section 8", desc:"Aide les ménages à très faible revenu à se loger décemment." },
           es:{ title:"Vales de Vivienda Sección 8", desc:"Ayuda a familias de muy bajos ingresos a pagar vivienda digna." } } },

  // Utilities
  { category:"Utilities", link:"https://www.acf.hhs.gov/ocs/programs/liheap",
    i18n:{ en:{ title:"LIHEAP", desc:"Help paying heating/cooling bills and some energy repairs." },
           fr:{ title:"LIHEAP", desc:"Aide pour payer les factures de chauffage/climatisation et certaines réparations énergétiques." },
           es:{ title:"LIHEAP", desc:"Ayuda para pagar facturas de calefacción/aire y algunas reparaciones energéticas." } } },
  { category:"Utilities", link:"https://www.energy.gov/scep/wap/weatherization-assistance-program",
    i18n:{ en:{ title:"WAP (Weatherization Assistance)", desc:"Home energy efficiency repairs for eligible households." },
           fr:{ title:"WAP (Aide à l’isolation)", desc:"Travaux d’efficacité énergétique pour les ménages éligibles." },
           es:{ title:"WAP (Asistencia de Climatización)", desc:"Reparaciones de eficiencia energética para hogares elegibles." } } },
  { category:"Utilities", link:"https://www.lifelinesupport.org/",
    i18n:{ en:{ title:"Lifeline (Phone/Internet)", desc:"Discounted phone or internet for eligible households." },
           fr:{ title:"Lifeline (Téléphone/Internet)", desc:"Réduction sur le téléphone ou l’internet pour les ménages éligibles." },
           es:{ title:"Lifeline (Teléfono/Internet)", desc:"Descuento en teléfono o internet para hogares elegibles." } } },
  { category:"Utilities", link:"https://www.acf.hhs.gov/ocs/programs/lihwap",
    i18n:{ en:{ title:"LIHWAP (Water Assistance)", desc:"Helps low-income households with water & wastewater bills." },
           fr:{ title:"LIHWAP (Aide à l’eau)", desc:"Aide les ménages à faible revenu pour les factures d’eau et d’assainissement." },
           es:{ title:"LIHWAP (Ayuda de Agua)", desc:"Ayuda a hogares de bajos ingresos con facturas de agua y alcantarillado." } } },

  // Education
  { category:"Education", link:"https://studentaid.gov/understand-aid/types/grants/pell",
    i18n:{ en:{ title:"Federal Pell Grant", desc:"Grants for undergrads with financial need — no repayment." },
           fr:{ title:"Bourse fédérale Pell", desc:"Bourses pour étudiants de 1er cycle ayant des besoins financiers — sans remboursement." },
           es:{ title:"Beca Federal Pell", desc:"Becas para estudiantes con necesidad económica — no se reembolsan." } } },
  { category:"Education", link:"https://www.acf.hhs.gov/ohs",
    i18n:{ en:{ title:"Head Start", desc:"School readiness & family support for infants to preschoolers." },
           fr:{ title:"Head Start", desc:"Préparation scolaire et soutien aux familles, de la petite enfance à la maternelle." },
           es:{ title:"Head Start", desc:"Preparación escolar y apoyo familiar desde la primera infancia hasta preescolar." } } },
  { category:"Education", link:"https://studentaid.gov/h/apply-for-aid/fafsa",
    i18n:{ en:{ title:"FAFSA", desc:"Apply for federal student aid (grants, loans, work-study)." },
           fr:{ title:"FAFSA", desc:"Demande d’aide fédérale aux études (bourses, prêts, travail-études)." },
           es:{ title:"FAFSA", desc:"Solicite ayuda federal para estudiantes (becas, préstamos, estudio y trabajo)." } } },

  // Income
  { category:"Income", link:"https://www.ssa.gov/ssi/",
    i18n:{ en:{ title:"SSI (Supplemental Security Income)", desc:"Monthly payments for people with disabilities or very low income aged 65+." },
           fr:{ title:"SSI (Revenu de Sécurité Supplémentaire)", desc:"Paiements mensuels pour personnes handicapées ou à très faible revenu (65+)." },
           es:{ title:"SSI (Ingreso Suplementario de Seguridad)", desc:"Pagos mensuales para personas con discapacidad o muy bajos ingresos (65+)." } } },
  { category:"Income", link:"https://www.dol.gov/general/topic/unemployment-insurance",
    i18n:{ en:{ title:"Unemployment Insurance (UI)", desc:"Temporary income for eligible unemployed workers." },
           fr:{ title:"Assurance chômage (UI)", desc:"Revenu temporaire pour les travailleurs au chômage éligibles." },
           es:{ title:"Seguro de Desempleo (UI)", desc:"Ingreso temporal para trabajadores desempleados elegibles." } } },
  { category:"Income", link:"https://www.acf.hhs.gov/ofa/programs/tanf",
    i18n:{ en:{ title:"TANF", desc:"Cash assistance & support services for low-income families with children." },
           fr:{ title:"TANF", desc:"Aide financière et services de soutien pour familles à faible revenu avec enfants." },
           es:{ title:"TANF", desc:"Asistencia en efectivo y servicios de apoyo para familias de bajos ingresos con hijos." } } },
  { category:"Income", link:"https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit",
    i18n:{ en:{ title:"Earned Income Tax Credit (EITC)", desc:"Refundable tax credit for low-to-moderate income workers." },
           fr:{ title:"Crédit d’impôt EITC", desc:"Crédit d’impôt remboursable pour les travailleurs à revenu faible ou modéré." },
           es:{ title:"Crédito Tributario por Ingreso del Trabajo (EITC)", desc:"Crédito fiscal reembolsable para trabajadores de ingresos bajos o moderados." } } },

  // Universal
  { category:"Health", link:"https://988lifeline.org",
    i18n:{ en:{ title:"988 Suicide & Crisis Lifeline", desc:"24/7 free confidential help — call or text 988." },
           fr:{ title:"Ligne 988 (Suicide & Crise)", desc:"Aide gratuite et confidentielle 24/7 — appelez ou textez 988." },
           es:{ title:"Línea 988 de Suicidio y Crisis", desc:"Ayuda gratuita y confidencial 24/7 — llame o envíe texto al 988." } } },
  { category:"Utilities", link:"https://www.211.org",
    i18n:{ en:{ title:"211 Helpline (United Way)", desc:"Free 24/7 referrals for local help: food, housing, bills, health." },
           fr:{ title:"Ligne 211 (United Way)", desc:"Orientation 24/7 vers des aides locales : alimentation, logement, factures, santé." },
           es:{ title:"Línea 211 (United Way)", desc:"Referencias gratis 24/7 a ayuda local: comida, vivienda, facturas, salud." } } },
  { category:"Housing", link:"https://www.disasterassistance.gov",
    i18n:{ en:{ title:"FEMA Disaster Assistance", desc:"Help after federally declared disasters — housing, repairs." },
           fr:{ title:"Aide en cas de catastrophe (FEMA)", desc:"Aide après catastrophes déclarées — logement, réparations." },
           es:{ title:"Asistencia por Desastre de FEMA", desc:"Ayuda tras desastres declarados — vivienda, reparaciones." } } },
  { category:"Health", link:"https://www.healthcare.gov",
    i18n:{ en:{ title:"Healthcare.gov Marketplace", desc:"Shop health plans. Financial help varies by income." },
           fr:{ title:"Marketplace Healthcare.gov", desc:"Comparer des plans santé. Aides financières selon le revenu." },
           es:{ title:"Mercado de Healthcare.gov", desc:"Compare planes de salud. La ayuda financiera varía según ingresos." } } },
  { category:"Income", link:"https://www.sba.gov/funding-programs",
    i18n:{ en:{ title:"SBA Small Business Programs", desc:"Loans, counseling & resources for entrepreneurs." },
           fr:{ title:"Programmes SBA (petites entreprises)", desc:"Prêts, accompagnement et ressources pour entrepreneurs." },
           es:{ title:"Programas de la SBA (Pequeñas Empresas)", desc:"Préstamos, asesoría y recursos para emprendedores." } } },
  { category:"Education", link:"https://www.apprenticeship.gov/apprenticeship-job-finder",
    i18n:{ en:{ title:"Apprenticeship Finder", desc:"Paid earn-while-you-learn training programs." },
           fr:{ title:"Trouver une alternance", desc:"Formations rémunérées en alternance (earn-while-you-learn)." },
           es:{ title:"Buscador de Aprendizajes", desc:"Programas pagados de formación mientras trabaja." } } },

  // Community development
  { category:"Housing", link:"https://www.hud.gov/program_offices/comm_planning/communitydevelopment/programs",
    i18n:{ en:{ title:"Community Development Block Grant (CDBG)", desc:"Funds local housing & community development via HUD partners." },
           fr:{ title:"CDBG (Dév. communautaire)", desc:"Financement du logement et du développement local via les partenaires HUD." },
           es:{ title:"Subvención en Bloque para Desarrollo Comunitario (CDBG)", desc:"Financia vivienda y desarrollo comunitario a través de socios de HUD." } } },

  // State-specific demos (CA/TX/NY)
  { category:"Food", link:"https://www.cdss.ca.gov/calfresh", states:["CA"],
    i18n:{ en:{ title:"CalFresh (CA SNAP)", desc:"California’s SNAP program for food assistance." },
           fr:{ title:"CalFresh (SNAP Californie)", desc:"Programme SNAP de Californie pour l’aide alimentaire." },
           es:{ title:"CalFresh (SNAP de California)", desc:"Programa SNAP de California para asistencia alimentaria." } } },
  { category:"Health", link:"https://www.dhcs.ca.gov/services/medi-cal", states:["CA"],
    i18n:{ en:{ title:"Medi-Cal (CA Medicaid)", desc:"California’s Medicaid program." },
           fr:{ title:"Medi-Cal (Medicaid Californie)", desc:"Programme Medicaid de Californie." },
           es:{ title:"Medi-Cal (Medicaid de California)", desc:"Programa Medicaid del estado de California." } } },

  { category:"Food", link:"https://www.yourtexasbenefits.com/Learn/SNAP", states:["TX"],
    i18n:{ en:{ title:"Texas SNAP (Your Texas Benefits)", desc:"Food assistance for eligible households in Texas." },
           fr:{ title:"SNAP Texas (Your Texas Benefits)", desc:"Aide alimentaire pour ménages éligibles au Texas." },
           es:{ title:"SNAP de Texas (Your Texas Benefits)", desc:"Asistencia alimentaria para hogares elegibles en Texas." } } },
  { category:"Health", link:"https://www.yourtexasbenefits.com/Learn/Medicaid", states:["TX"],
    i18n:{ en:{ title:"Texas Medicaid", desc:"Health coverage for eligible Texans via Your Texas Benefits." },
           fr:{ title:"Medicaid Texas", desc:"Couverture santé pour Texans éligibles via Your Texas Benefits." },
           es:{ title:"Medicaid de Texas", desc:"Cobertura de salud para texanos elegibles vía Your Texas Benefits." } } },

  { category:"Food", link:"https://otda.ny.gov/programs/snap/", states:["NY"],
    i18n:{ en:{ title:"New York SNAP", desc:"Food assistance for eligible households in New York." },
           fr:{ title:"SNAP New York", desc:"Aide alimentaire pour ménages éligibles à New York." },
           es:{ title:"SNAP de Nueva York", desc:"Asistencia alimentaria para hogares elegibles en Nueva York." } } },
  { category:"Utilities", link:"https://otda.ny.gov/programs/heap/", states:["NY"],
    i18n:{ en:{ title:"HEAP (NY Home Energy Assistance)", desc:"Help with heating & cooling costs for eligible NY residents." },
           fr:{ title:"HEAP (Aide énergie NY)", desc:"Aide aux coûts de chauffage/climatisation pour résidents éligibles de NY." },
           es:{ title:"HEAP (Asistencia de Energía de NY)", desc:"Ayuda con costos de calefacción y refrigeración para residentes elegibles de NY." } } },
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

  const T = UI[lang];

  // search, category, state
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [stateSel, setStateSel] = useState("All States");

  // favorites
  const [favs, setFavs] = useState([]);
  useEffect(()=>{ const raw = localStorage.getItem("aidfinder_favs"); if(raw) setFavs(JSON.parse(raw)); },[]);
  useEffect(()=>{ localStorage.setItem("aidfinder_favs", JSON.stringify(favs)); },[favs]);
  const toggleFav = (id)=> setFavs(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  const isFav = (id)=> favs.includes(id);

  // share menu state
  const [shareOpenIndex, setShareOpenIndex] = useState(null);
  const [shareOpenModal, setShareOpenModal] = useState(false);

  // pulse animation mapping
  const [animMap, setAnimMap] = useState({});
  const triggerAnim = (id) => {
    setAnimMap(m => ({ ...m, [id]: true }));
    setTimeout(() => setAnimMap(m => ({ ...m, [id]: false })), 300);
  };

  // close share on outside click
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

  // filtering
  const programs = useMemo(()=>{
    let base = ALL;

    if (cat === "Saved") base = base.filter(p => favs.includes(p.link));
    else if (cat !== "All") base = base.filter(p => p.category === cat);

    if (stateSel && stateSel !== "All States") {
      base = base.filter(p => !p.states || p.states.includes(stateSel));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      base = base.filter(p => {
        const t = p.i18n[lang].title.toLowerCase();
        const d = p.i18n[lang].desc.toLowerCase();
        const c = (UI[lang].catLabels[p.category] || p.category).toLowerCase();
        return t.includes(q) || d.includes(q) || c.includes(q);
      });
    }
    return base;
  }, [cat, favs, stateSel, query, lang]);

  // details modal
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  return (
    <>
      <Head>
        <title>AidFinder — {T.title}</title>
        <meta name="description" content={T.subtitle} />
        <meta name="theme-color" content="#16a34a" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header className="nav">
        <div className="container headerRow">
          <div className="brandRow">
            <img src="/logo.png" alt="AidFinder logo" style={{height:40, borderRadius:8}}/>
            <strong>{T.brand}</strong>
          </div>

          {/* Language selector */}
          <div className="stateSelectWrap">
            <label htmlFor="langSel">{T.language}:</label>
            <select
              id="langSel"
              className="langSelect"
              value={lang}
              onChange={(e)=>{
                const v = e.target.value;
                setLang(v);
                setCat("All"); // reset on switch
              }}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
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
            {query && <button className="clearBtn" onClick={()=>setQuery("")}>{T.clear}</button>}
          </div>

          <div className="filtersRow">
            {/* Category chips */}
            <div className="chips scrollX" role="tablist" aria-label="Categories">
              {["All","Food","Health","Housing","Utilities","Education","Income","Saved"].map(key=>{
                const label = UI[lang].catLabels[key] || key;
                return (
                  <button
                    key={key}
                    className={`chip ${cat===key ? "chipActive":""}`}
                    onClick={()=>setCat(key)}
                    type="button"
                    role="tab"
                    aria-selected={cat===key}
                  >
                    {label}
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
        </section>

        {/* Cards */}
        <section className="grid">
          {programs.map((p,i)=>{
            const title = p.i18n[lang].title;
            const desc  = p.i18n[lang].desc;
            return (
              <article className="card" key={p.link}>
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
                    aria-pressed={isFav(p.link)}
                    onClick={(e)=>{ 
                      e.stopPropagation(); 
                      toggleFav(p.link); 
                      triggerAnim(p.link);
                    }}
                    title={isFav(p.link) ? T.saved : T.unsaved}
                  >
                    <HeartIcon on={isFav(p.link)} animate={!!animMap[p.link]} />
                  </button>

                  {/* Details */}
                  <button type="button" className="secondary" onClick={()=>{setCurrent(p); setShareOpenModal(false); setShareOpenIndex(null); setOpen(true);}}>
                    {T.details}
                  </button>

                  {/* Share (menu) */}
                  <div className="menuWrap" onClick={(e)=>e.stopPropagation()}>
                    <button
                      type="button"
                      className="secondary"
                      onClick={()=>setShareOpenIndex(shareOpenIndex===i? null : i)}
                      aria-haspopup="menu"
                      aria-expanded={shareOpenIndex===i}
                    >
                      {T.share} ▾
                    </button>
                    {shareOpenIndex===i && (
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
                {current.i18n[lang].title}
              </h3>
              <p className="modalBody">{current.i18n[lang].desc}</p>
              <div className="modalActions" onClick={(e)=>e.stopPropagation()}>
                <button className="iconBtn" onClick={()=>{
                  toggleFav(current.link);
                  triggerAnim(current.link);
                }}>
                  <HeartIcon on={isFav(current.link)} animate={!!animMap[current.link]} />
                  <span style={{marginLeft:8}}>{isFav(current.link) ? T.saved : T.unsaved}</span>
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

        {/* Footer with legal & contact links */}
        <footer className="footer">
          <div style={{display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap"}}>
            <a href="/privacy">Privacy</a>
            <span>•</span>
            <a href="/terms">Terms</a>
            <span>•</span>
            <a href="/contact">Contact</a>
          </div>
          <div style={{marginTop:8}}>{T.footer}</div>
        </footer>
      </main>

      {/* Tiny global CSS just for heart pulse (rest is in styles/globals.css) */}
      <style jsx global>{`
        .pulse { animation: pulseAnim 0.3s ease-in-out; }
        @keyframes pulseAnim {
          0% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}