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
  { category:"Food", link:"https://www.fns.usda.gov/csfp",
    i18n:{ en:{ title:"Commodity Supplemental Food Program (CSFP)", desc:"Monthly food boxes for low-income seniors." },
           fr:{ title:"CSFP (Aide alimentaire pour aînés)", desc:"Colis alimentaires mensuels pour les aînés." },
           es:{ title:"Programa CSFP", desc:"Cajas mensuales de alimentos para adultos mayores." } } },
  { category:"Food", link:"https://www.fns.usda.gov/sbp",
    i18n:{ en:{ title:"School Breakfast Program (SBP)", desc:"Free or low-cost school breakfasts for eligible students." },
           fr:{ title:"Programme de petit-déjeuner scolaire (SBP)", desc:"Petits-déjeuners gratuits ou à faible coût." },
           es:{ title:"Programa de Desayunos Escolares (SBP)", desc:"Desayunos gratuitos o de bajo costo." } } },

  // Health
  { category:"Health", link:"https://www.medicaid.gov",
    i18n:{ en:{ title:"Medicaid", desc:"Free or low-cost health coverage for eligible individuals and families." },
           fr:{ title:"Medicaid", desc:"Couverture santé gratuite ou à faible coût." },
           es:{ title:"Medicaid", desc:"Cobertura de salud gratuita o de bajo costo." } } },
  { category:"Health", link:"https://findahealthcenter.hrsa.gov/",
    i18n:{ en:{ title:"Community Health Centers", desc:"Affordable primary care, dental, and mental health services." },
           fr:{ title:"Centres de santé communautaires", desc:"Soins primaires, dentaires et de santé mentale abordables." },
           es:{ title:"Centros de Salud Comunitarios", desc:"Atención primaria, dental y mental accesible." } } },
  { category:"Health", link:"https://www.medicaid.gov/chip/index.html",
    i18n:{ en:{ title:"Children’s Health Insurance Program (CHIP)", desc:"Low-cost coverage for children who don’t qualify for Medicaid." },
           fr:{ title:"Assurance santé enfants (CHIP)", desc:"Couverture à faible coût pour les enfants non éligibles à Medicaid." },
           es:{ title:"Seguro Médico Infantil (CHIP)", desc:"Cobertura de bajo costo para niños que no califican." } } },

  // Housing
  {
    category:"Housing",
    link:"https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/emergency-rental-assistance-program",
    i18n:{
      en:{ title:"Emergency Rental Assistance (ERA)", desc:"Help with rent and utilities during hardship." },
      fr:{ title:"Aide d’urgence au loyer (ERA)", desc:"Aide pour le loyer et les services publics en cas de difficultés." },
      es:{ title:"Asistencia de Alquiler de Emergencia (ERA)", desc:"Ayuda con alquiler y servicios." }
    }
  },
  { category:"Housing", link:"https://www.hud.gov/topics/housing_choice_voucher_program_section8",
    i18n:{ en:{ title:"Section 8 Housing Choice Voucher", desc:"Helps very low-income families afford decent housing." },
           fr:{ title:"Bons logement Section 8", desc:"Aide les ménages à très faible revenu à se loger." },
           es:{ title:"Vales de Vivienda Sección 8", desc:"Ayuda a familias de muy bajos ingresos." } } },

  // Utilities
  { category:"Utilities", link:"https://www.acf.hhs.gov/ocs/programs/liheap",
    i18n:{ en:{ title:"LIHEAP", desc:"Help paying heating/cooling bills and some energy repairs." },
           fr:{ title:"LIHEAP", desc:"Aide pour factures de chauffage/climatisation et réparations." },
           es:{ title:"LIHEAP", desc:"Ayuda para facturas de calefacción/aire." } } },
  { category:"Utilities", link:"https://www.energy.gov/scep/wap/weatherization-assistance-program",
    i18n:{ en:{ title:"WAP (Weatherization Assistance)", desc:"Home energy efficiency repairs for eligible households." },
           fr:{ title:"WAP (Aide à l’isolation)", desc:"Travaux d’efficacité énergétique à domicile." },
           es:{ title:"WAP (Climatización)", desc:"Mejoras de eficiencia energética en el hogar." } } },
  { category:"Utilities", link:"https://www.lifelinesupport.org/",
    i18n:{ en:{ title:"Lifeline (Phone/Internet)", desc:"Discounted phone or internet for eligible households." },
           fr:{ title:"Lifeline (Téléphone/Internet)", desc:"Réductions sur téléphone ou internet." },
           es:{ title:"Lifeline (Teléfono/Internet)", desc:"Descuento en teléfono o internet." } } },
  { category:"Utilities", link:"https://www.acf.hhs.gov/ocs/programs/lihwap",
    i18n:{ en:{ title:"LIHWAP (Water Assistance)", desc:"Helps low-income households with water & wastewater bills." },
           fr:{ title:"LIHWAP (Aide à l’eau)", desc:"Aide pour les factures d’eau et d’assainissement." },
           es:{ title:"LIHWAP (Ayuda de Agua)", desc:"Ayuda con facturas de agua y alcantarillado." } } },

  // Education
  { category:"Education", link:"https://studentaid.gov/understand-aid/types/grants/pell",
    i18n:{ en:{ title:"Federal Pell Grant", desc:"Grants for undergrads with financial need — no repayment." },
           fr:{ title:"Bourse fédérale Pell", desc:"Bourses pour étudiants, sans remboursement." },
           es:{ title:"Beca Federal Pell", desc:"Becas para estudiantes; no se reembolsan." } } },
  { category:"Education", link:"https://www.acf.hhs.gov/ohs",
    i18n:{ en:{ title:"Head Start", desc:"School readiness & family support for infants to preschoolers." },
           fr:{ title:"Head Start", desc:"Préparation scolaire et soutien familial." },
           es:{ title:"Head Start", desc:"Preparación escolar y apoyo familiar." } } },
  { category:"Education", link:"https://studentaid.gov/h/apply-for-aid/fafsa",
    i18n:{ en:{ title:"FAFSA", desc:"Apply for federal student aid (grants, loans, work-study)." },
           fr:{ title:"FAFSA", desc:"Demande d’aide fédérale (bourses, prêts, travail-études)." },
           es:{ title:"FAFSA", desc:"Solicite ayuda federal (becas, préstamos, estudio-trabajo)." } } },

  // Income
  { category:"Income", link:"https://www.ssa.gov/ssi/",
    i18n:{ en:{ title:"SSI (Supplemental Security Income)", desc:"Monthly payments for people with disabilities or very low income (65+)." },
           fr:{ title:"SSI (Revenu de Sécurité Supplémentaire)", desc:"Paiements mensuels pour personnes handicapées ou à très faible revenu (65+)." },
           es:{ title:"SSI (Ingreso Suplementario de Seguridad)", desc:"Pagos mensuales para personas con discapacidad o muy bajos ingresos (65+)." } } },
  { category:"Income", link:"https://www.dol.gov/general/topic/unemployment-insurance",
    i18n:{ en:{ title:"Unemployment Insurance (UI)", desc:"Temporary income for eligible unemployed workers." },
           fr:{ title:"Assurance chômage (UI)", desc:"Revenu temporaire pour travailleurs au chômage." },
           es:{ title:"Seguro de Desempleo (UI)", desc:"Ingreso temporal para trabajadores desempleados." } } },
  { category:"Income", link:"https://www.acf.hhs.gov/ofa/programs/tanf",
    i18n:{ en:{ title:"TANF", desc:"Cash assistance & support services for low-income families with children." },
           fr:{ title:"TANF", desc:"Aide financière et services de soutien pour familles à faible revenu." },
           es:{ title:"TANF", desc:"Asistencia en efectivo y apoyo para familias de bajos ingresos." } } },
  { category:"Income", link:"https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit",
    i18n:{ en:{ title:"Earned Income Tax Credit (EITC)", desc:"Refundable tax credit for low-to-moderate income workers." },
           fr:{ title:"Crédit d’impôt EITC", desc:"Crédit remboursable pour travailleurs à revenu faible/modéré." },
           es:{ title:"Crédito por Ingreso del Trabajo (EITC)", desc:"Crédito reembolsable para trabajadores de bajos/moderados ingresos." } } },

  // Universal
  { category:"Health", link:"https://988lifeline.org",
    i18n:{ en:{ title:"988 Suicide & Crisis Lifeline", desc:"24/7 free confidential help — call or text 988." },
           fr:{ title:"Ligne 988 (Suicide & Crise)", desc:"Aide gratuite et confidentielle 24/7 — appelez/textez 988." },
           es:{ title:"Línea 988 de Suicidio y Crisis", desc:"Ayuda gratuita y confidencial 24/7 — llame o envíe texto al 988." } } },
  { category:"Utilities", link:"https://www.211.org",
    i18n:{ en:{ title:"211 Helpline (United Way)", desc:"Free 24/7 referrals for local help: food, housing, bills, health." },
           fr:{ title:"Ligne 211 (United Way)", desc:"Orientation 24/7 vers aides locales : alimentation, logement, factures, santé." },
           es:{ title:"Línea 211 (United Way)", desc:"Referencias gratis 24/7: comida, vivienda, facturas, salud." } } },
  { category:"Housing", link:"https://www.disasterassistance.gov",
    i18n:{ en:{ title:"FEMA Disaster Assistance", desc:"Help after federally declared disasters — housing, repairs." },
           fr:{ title:"Aide catastrophe FEMA", desc:"Aide après catastrophes — logement, réparations." },
           es:{ title:"Asistencia por Desastre FEMA", desc:"Ayuda tras desastres — vivienda, reparaciones." } } },
  { category:"Health", link:"https://www.healthcare.gov",
    i18n:{ en:{ title:"Healthcare.gov Marketplace", desc:"Shop health plans. Financial help varies by income." },
           fr:{ title:"Marketplace Healthcare.gov", desc:"Comparer des plans santé; aides selon revenus." },
           es:{ title:"Mercado de Healthcare.gov", desc:"Compare planes de salud; ayuda según ingresos." } } },
  { category:"Income", link:"https://www.sba.gov/funding-programs",
    i18n:{ en:{ title:"SBA Small Business Programs", desc:"Loans, counseling & resources for entrepreneurs." },
           fr:{ title:"Programmes SBA", desc:"Prêts, counseling et ressources pour entrepreneurs." },
           es:{ title:"Programas de la SBA", desc:"Préstamos, asesoría y recursos para emprendedores." } } },
  { category:"Education", link:"https://www.apprenticeship.gov/apprenticeship-job-finder",
    i18n:{ en:{ title:"Apprenticeship Finder", desc:"Paid earn-while-you-learn training programs." },
           fr:{ title:"Trouver une alternance", desc:"Formations rémunérées en alternance." },
           es:{ title:"Buscador de Aprendizajes", desc:"Programas pagados de formación." } } },

  // Community development
  { category:"Housing", link:"https://www.hud.gov/program_offices/comm_planning/communitydevelopment/programs",
    i18n:{ en:{ title:"Community Development Block Grant (CDBG)", desc:"Funds local housing & community development via HUD partners." },
           fr:{ title:"CDBG (Dév. communautaire)", desc:"Financement logement & développement local via HUD." },
           es:{ title:"Subvención CDBG", desc:"Financia vivienda y desarrollo comunitario." } } },

  // State-specific demos (CA/TX/NY)
  { category:"Food", link:"https://www.cdss.ca.gov/calfresh", states:["CA"],
    i18n:{ en:{ title:"CalFresh (CA SNAP)", desc:"California’s SNAP program for food assistance." },
           fr:{ title:"CalFresh (SNAP Californie)", desc:"Programme SNAP de Californie." },
           es:{ title:"CalFresh (SNAP CA)", desc:"Programa SNAP de California." } } },
  { category:"Health", link:"https://www.dhcs.ca.gov/services/medi-cal", states:["CA"],
    i18n:{ en:{ title:"Medi-Cal (CA Medicaid)", desc:"California’s Medicaid program." },
           fr:{ title:"Medi-Cal (Medicaid Californie)", desc:"Programme Medicaid de Californie." },
           es:{ title:"Medi-Cal (Medicaid CA)", desc:"Programa Medicaid de California." } } },

  { category:"Food", link:"https://www.yourtexasbenefits.com/Learn/SNAP", states:["TX"],
    i18n:{ en:{ title:"Texas SNAP (Your Texas Benefits)", desc:"Food assistance for eligible households in Texas." },
           fr:{ title:"SNAP Texas", desc:"Aide alimentaire pour ménages au Texas." },
           es:{ title:"SNAP de Texas", desc:"Asistencia alimentaria para Texas." } } },
  { category:"Health", link:"https://www.yourtexasbenefits.com/Learn/Medicaid", states:["TX"],
    i18n:{ en:{ title:"Texas Medicaid", desc:"Health coverage for eligible Texans." },
           fr:{ title:"Medicaid Texas", desc:"Couverture santé pour Texans éligibles." },
           es:{ title:"Medicaid de Texas", desc:"Cobertura de salud para texanos elegibles." } } },

  { category:"Food", link:"https://otda.ny.gov/programs/snap/", states:["NY"],
    i18n:{ en:{ title:"New York SNAP", desc:"Food assistance for eligible households in New York." },
           fr:{ title:"SNAP New York", desc:"Aide alimentaire pour ménages à New York." },
           es:{ title:"SNAP de Nueva York", desc:"Asistencia alimentaria en Nueva York." } } },
  { category:"Utilities", link:"https://otda.ny.gov/programs/heap/", states:["NY"],
    i18n:{ en:{ title:"HEAP (NY Energy Assistance)", desc:"Help with heating & cooling costs for eligible NY residents." },
           fr:{ title:"HEAP (Aide énergie NY)", desc:"Aide aux coûts de chauffage/climatisation à NY." },
           es:{ title:"HEAP (Asistencia Energía NY)", desc:"Ayuda con costos de calefacción y refrigeración." } } },
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
        <title>
          AidFinder — {T.title}
        </title>
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
            {/* Language */}
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

            {/* Theme */}
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
        <section className="hero">
          <h1>{T.title}</h1>
          <p>{T.subtitle}</p>
        </section>

        {/* Toolbar */}
        <section className="toolbar">
          {/* SEARCH with inline Search/Clear inside the field */}
          <div className="searchWrap">
            <form
              className="searchInlineForm"
              onSubmit={(e) => {
                e.preventDefault();
              }}
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
            {/* Category chips */}
            <div className="chips scrollX" role="tablist" aria-label="Categories">
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

            {/* State selector */}
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

          {/* Donate (single button → PayPal custom amount page) */}
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <h3 style={{ marginBottom: 6 }}>Support AidFinder</h3>
            <p style={{ margin: "0 0 12px", color: "#4b5563" }}>
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
              <article className="card" key={p.link} style={{ "--i": i }}>
                <div
                  className="badge"
                  style={{
                    background: ICONS_BADGE_BG[p.category] || "var(--border)",
                  }}
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
                  {/* Like */}
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

                  {/* Share */}
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

                  {/* Apply */}
                  <a className="apply" href={p.link} target="_blank" rel="noreferrer">
                    {T.apply}
                  </a>

                  {/* Details */}
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

        {/* Footer */}
        <footer className="footer">
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/about">About</a>
            <span>•</span>
            <a href="/legal/privacy-policy">Privacy</a>
            <span>•</span>
            <a href="/terms">Terms</a>
            <span>•</span>
            <a href="/contact">Contact</a>
          </div>
          <div style={{ marginTop: 8 }}>{T.footer}</div>
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
        }
        [data-theme="dark"] :root,
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

        /* ✅ FIX: header wraps nicely on small screens (prevents logo + language overlap) */
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
        .toolbar {
          margin-top: 8px;
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
          margin-top: 10px;
        }
        .muted {
          color: var(--muted);
        }

        /* ✅ FIX: mobile tweaks */
        @media (max-width: 560px) {
          .headerControls {
            width: 100%;
            justify-content: space-between;
          }
          .brandRow strong {
            font-size: 16px;
          }
          /* shrink the logo on small screens (inline styles require !important) */
          .brandRow img {
            width: 32px !important;
            height: 32px !important;
          }
          /* hide labels to save space (still accessible via select options) */
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

        /* Cards + grid */
        .grid {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          margin: 16px 0 28px;
        }
        .card {
          border: 1px solid var(--border);
          background: var(--bg);
          border-radius: 16px;
          padding: 14px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
          transition: box-shadow 180ms ease, transform 180ms ease, opacity 480ms ease;
          opacity: 0;
          transform: translateY(16px);
        }
        .grid.reveal .card {
          opacity: 1;
          transform: translateY(0);
        }
        .card:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.06);
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
        .modalBody {
          color: var(--text);
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

        /* Footer */
        .footer {
          border-top: 1px solid var(--border);
          text-align: center;
          padding: 18px 0;
          color: var(--muted);
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
