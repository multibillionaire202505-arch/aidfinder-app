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
      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" fill="red" stroke="red" strokeWidth="1.5" />
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
  "All States",
  "AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA",
  "MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"
];

/** ===== Programs (data) — TOTAL: 34 ===== */
const ALL = [
  // ===== FOOD (8) =====
  {
    category: "Food",
    link: "https://www.fns.usda.gov/snap",
    i18n: {
      en: { title: "SNAP (Food Stamps)", desc: "Monthly funds to buy groceries for eligible households." },
      fr: { title: "SNAP (Bons alimentaires)", desc: "Aide mensuelle pour acheter des produits alimentaires." },
      es: { title: "SNAP (Cupones de Alimentos)", desc: "Fondos mensuales para comprar comestibles." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/wic",
    i18n: {
      en: { title: "WIC (Women, Infants, and Children)", desc: "Nutrition assistance & health referrals for women and young children." },
      fr: { title: "WIC (Femmes, nourrissons et enfants)", desc: "Aide nutritionnelle et orientations santé." },
      es: { title: "WIC (Mujeres, Infantes y Niños)", desc: "Asistencia nutricional y referencias de salud." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/nslp",
    i18n: {
      en: { title: "National School Lunch Program (NSLP)", desc: "Low-cost or free school lunches for eligible children." },
      fr: { title: "Programme national de déjeuner scolaire (NSLP)", desc: "Repas scolaires gratuits ou à faible coût." },
      es: { title: "Programa Nacional de Almuerzos (NSLP)", desc: "Almuerzos escolares gratuitos o de bajo costo." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/sbp",
    i18n: {
      en: { title: "School Breakfast Program (SBP)", desc: "Free or reduced-price breakfasts for eligible students." },
      fr: { title: "Programme de petit-déjeuner scolaire (SBP)", desc: "Petits-déjeuners gratuits ou à tarif réduit pour élèves éligibles." },
      es: { title: "Programa de Desayuno Escolar (SBP)", desc: "Desayunos gratis o a precio reducido para estudiantes elegibles." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/sfsp",
    i18n: {
      en: { title: "Summer Food Service Program (SFSP)", desc: "Free meals for children and teens during the summer." },
      fr: { title: "Programme de repas d’été (SFSP)", desc: "Repas gratuits pour enfants et ados pendant l’été." },
      es: { title: "Programa de Comidas de Verano (SFSP)", desc: "Comidas gratis para niños y adolescentes en verano." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/tefap",
    i18n: {
      en: { title: "The Emergency Food Assistance Program (TEFAP)", desc: "USDA foods distributed through food banks and local agencies." },
      fr: { title: "Programme d’aide alimentaire d’urgence (TEFAP)", desc: "Denrées USDA distribuées via banques alimentaires et organismes locaux." },
      es: { title: "Programa de Asistencia Alimentaria de Emergencia (TEFAP)", desc: "Alimentos del USDA distribuidos por bancos de alimentos y agencias locales." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/cacfp",
    i18n: {
      en: { title: "Child and Adult Care Food Program (CACFP)", desc: "Meal support for child care, afterschool programs, and adult care." },
      fr: { title: "Programme alimentaire pour la garde (CACFP)", desc: "Aide repas pour garderies, après-classe et centres pour adultes." },
      es: { title: "Programa de Alimentos para Cuidado Infantil y Adulto (CACFP)", desc: "Apoyo de comidas para guarderías, programas extraescolares y cuidado de adultos." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/csfp",
    i18n: {
      en: { title: "Commodity Supplemental Food Program (CSFP)", desc: "Monthly food packages for eligible low-income seniors." },
      fr: { title: "Programme CSFP", desc: "Colis alimentaires mensuels pour seniors à faible revenu éligibles." },
      es: { title: "Programa CSFP", desc: "Paquetes de alimentos mensuales para adultos mayores elegibles." },
    },
  },

  // ===== HEALTH (5) =====
  {
    category: "Health",
    link: "https://www.medicaid.gov",
    i18n: {
      en: { title: "Medicaid", desc: "Free or low-cost health coverage for eligible individuals and families." },
      fr: { title: "Medicaid", desc: "Couverture santé gratuite ou à faible coût." },
      es: { title: "Medicaid", desc: "Cobertura de salud gratuita o de bajo costo." },
    },
  },
  {
    category: "Health",
    link: "https://findahealthcenter.hrsa.gov/",
    i18n: {
      en: { title: "Community Health Centers", desc: "Affordable primary care, dental, and mental health services." },
      fr: { title: "Centres de santé communautaires", desc: "Soins primaires, dentaires et de santé mentale abordables." },
      es: { title: "Centros de Salud Comunitarios", desc: "Atención primaria, dental y mental accesible." },
    },
  },
  {
    category: "Health",
    link: "https://www.insurekidsnow.gov/",
    i18n: {
      en: { title: "CHIP (Children’s Health Insurance Program)", desc: "Low-cost health coverage for kids in families who qualify." },
      fr: { title: "CHIP (Assurance santé pour enfants)", desc: "Couverture santé à faible coût pour enfants selon l’éligibilité." },
      es: { title: "CHIP (Seguro Médico para Niños)", desc: "Cobertura médica de bajo costo para niños elegibles." },
    },
  },
  {
    category: "Health",
    link: "https://www.healthcare.gov/",
    i18n: {
      en: { title: "Health Insurance Marketplace (HealthCare.gov)", desc: "Shop for coverage and see if you qualify for savings." },
      fr: { title: "Marché d’assurance santé (HealthCare.gov)", desc: "Comparer des assurances et vérifier les aides/économies." },
      es: { title: "Mercado de Seguros de Salud (HealthCare.gov)", desc: "Buscar cobertura y ver si califica para ahorros." },
    },
  },
  {
    category: "Health",
    link: "https://www.medicare.gov/",
    i18n: {
      en: { title: "Medicare", desc: "Health coverage primarily for people 65+ and some disabilities." },
      fr: { title: "Medicare", desc: "Couverture santé principalement pour 65+ et certains handicaps." },
      es: { title: "Medicare", desc: "Cobertura de salud principalmente para 65+ y algunas discapacidades." },
    },
  },

  // ===== HOUSING (5) =====
  {
    category: "Housing",
    link: "https://www.hud.gov/topics/housing_choice_voucher_program_section8",
    i18n: {
      en: { title: "Section 8 Housing Choice Voucher", desc: "Helps very low-income families afford decent housing." },
      fr: { title: "Bons logement Section 8", desc: "Aide les ménages à très faible revenu à se loger." },
      es: { title: "Vales de Vivienda Sección 8", desc: "Ayuda a familias de muy bajos ingresos a pagar vivienda." },
    },
  },
  {
    category: "Housing",
    link: "https://www.hud.gov/topics/rental_assistance/phprog",
    i18n: {
      en: { title: "Public Housing", desc: "Affordable rentals for eligible low-income families, seniors, and people with disabilities." },
      fr: { title: "Logements publics", desc: "Locations abordables pour ménages à faible revenu, seniors et personnes handicapées." },
      es: { title: "Vivienda Pública", desc: "Alquiler asequible para familias, adultos mayores y personas con discapacidad elegibles." },
    },
  },
  {
    category: "Housing",
    link: "https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/emergency-rental-assistance-program",
    i18n: {
      en: { title: "Emergency Rental Assistance (ERA)", desc: "Help for rent and utilities (availability varies by state/local program)." },
      fr: { title: "Aide d’urgence au loyer (ERA)", desc: "Aide pour loyer et services publics (selon programmes locaux)." },
      es: { title: "Asistencia de Alquiler de Emergencia (ERA)", desc: "Ayuda para renta y servicios (según programas locales)." },
    },
  },
  {
    category: "Housing",
    link: "https://www.hud.gov/program_offices/housing/sfh/hcc",
    i18n: {
      en: { title: "HUD Housing Counseling", desc: "Free/low-cost counseling for renting, buying, avoiding foreclosure, and more." },
      fr: { title: "Conseil logement HUD", desc: "Conseils gratuits/à faible coût pour location, achat, prévention saisie, etc." },
      es: { title: "Asesoría de Vivienda HUD", desc: "Asesoría gratis/de bajo costo para alquilar, comprar y evitar ejecuciones." },
    },
  },
  {
    category: "Housing",
    link: "https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-direct-home-loans",
    i18n: {
      en: { title: "USDA Single Family Housing Direct (Section 502)", desc: "Helps low- and very-low-income applicants buy homes in eligible rural areas." },
      fr: { title: "USDA logement direct (Section 502)", desc: "Aide à acheter un logement en zone rurale (selon éligibilité)." },
      es: { title: "USDA Vivienda Directa (Sección 502)", desc: "Ayuda a comprar vivienda en áreas rurales elegibles (según requisitos)." },
    },
  },

  // ===== UTILITIES (5) =====
  {
    category: "Utilities",
    link: "https://www.acf.hhs.gov/ocs/programs/liheap",
    i18n: {
      en: { title: "LIHEAP", desc: "Help paying heating/cooling bills and some energy repairs." },
      fr: { title: "LIHEAP", desc: "Aide pour factures de chauffage/climatisation et réparations." },
      es: { title: "LIHEAP", desc: "Ayuda para facturas de calefacción/aire y algunas reparaciones." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.lifelinesupport.org/",
    i18n: {
      en: { title: "Lifeline (Phone/Internet)", desc: "Discounted phone or internet for eligible households." },
      fr: { title: "Lifeline (Téléphone/Internet)", desc: "Réductions sur téléphone ou internet." },
      es: { title: "Lifeline (Teléfono/Internet)", desc: "Descuento en teléfono o internet." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.211.org",
    i18n: {
      en: { title: "211 Helpline (United Way)", desc: "Free 24/7 referrals for local help: food, housing, bills, health." },
      fr: { title: "Ligne 211 (United Way)", desc: "Orientation 24/7 vers aides locales : alimentation, logement, factures, santé." },
      es: { title: "Línea 211 (United Way)", desc: "Referencias gratis 24/7: comida, vivienda, facturas, salud." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.energy.gov/scep/wap/weatherization-assistance-program",
    i18n: {
      en: { title: "Weatherization Assistance Program (WAP)", desc: "Home energy upgrades to lower bills and improve safety for eligible households." },
      fr: { title: "Programme de rénovation énergétique (WAP)", desc: "Améliorations pour réduire les factures et améliorer la sécurité du logement." },
      es: { title: "Programa de Climatización del Hogar (WAP)", desc: "Mejoras del hogar para bajar facturas y aumentar la seguridad." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.fcc.gov/acp",
    i18n: {
      en: { title: "Affordable Connectivity Programs (Internet Discounts)", desc: "Check for low-cost internet options and related discount programs in your area." },
      fr: { title: "Programmes de connectivité abordable", desc: "Vérifiez les options internet à bas coût et programmes de réduction." },
      es: { title: "Programas de Conectividad Asequible", desc: "Consulte opciones de internet de bajo costo y programas de descuento." },
    },
  },

  // ===== EDUCATION (3) =====
  {
    category: "Education",
    link: "https://studentaid.gov/understand-aid/types/grants/pell",
    i18n: {
      en: { title: "Federal Pell Grant", desc: "Grants for undergrads with financial need — no repayment." },
      fr: { title: "Bourse fédérale Pell", desc: "Bourses pour étudiants, sans remboursement." },
      es: { title: "Beca Federal Pell", desc: "Becas para estudiantes; no se reembolsan." },
    },
  },
  {
    category: "Education",
    link: "https://studentaid.gov/understand-aid/types/work-study",
    i18n: {
      en: { title: "Federal Work-Study", desc: "Part-time jobs for students with financial need to help pay education costs." },
      fr: { title: "Travail-études fédéral", desc: "Emplois à temps partiel pour aider à payer les études." },
      es: { title: "Trabajo-Estudio Federal", desc: "Empleos de medio tiempo para ayudar a pagar la educación." },
    },
  },
  {
    category: "Education",
    link: "https://eclkc.ohs.acf.hhs.gov/programs/head-start",
    i18n: {
      en: { title: "Head Start", desc: "Free early learning and family support for eligible families with young children." },
      fr: { title: "Head Start", desc: "Éducation préscolaire gratuite et soutien familial (selon éligibilité)." },
      es: { title: "Head Start", desc: "Educación temprana gratuita y apoyo familiar (según requisitos)." },
    },
  },

  // ===== INCOME (5) =====
  {
    category: "Income",
    link: "https://www.dol.gov/general/topic/unemployment-insurance",
    i18n: {
      en: { title: "Unemployment Insurance (UI)", desc: "Temporary income for eligible unemployed workers." },
      fr: { title: "Assurance chômage (UI)", desc: "Revenu temporaire pour travailleurs au chômage." },
      es: { title: "Seguro de Desempleo (UI)", desc: "Ingreso temporal para trabajadores desempleados." },
    },
  },
  {
    category: "Income",
    link: "https://www.acf.hhs.gov/ofa/programs/temporary-assistance-needy-families-tanf",
    i18n: {
      en: { title: "TANF (Cash Assistance)", desc: "Cash support and services for eligible low-income families with children." },
      fr: { title: "TANF (Aide en espèces)", desc: "Aide financière et services pour familles à faible revenu avec enfants." },
      es: { title: "TANF (Asistencia en efectivo)", desc: "Apoyo en efectivo y servicios para familias elegibles con niños." },
    },
  },
  {
    category: "Income",
    link: "https://www.ssa.gov/ssi/",
    i18n: {
      en: { title: "SSI (Supplemental Security Income)", desc: "Monthly payments for older adults or people with disabilities with limited income/resources." },
      fr: { title: "SSI (Revenu de sécurité supplémentaire)", desc: "Paiements mensuels pour personnes âgées/handicapées avec faibles ressources." },
      es: { title: "SSI (Ingreso Suplementario)", desc: "Pagos mensuales para personas mayores o con discapacidad con recursos limitados." },
    },
  },
  {
    category: "Income",
    link: "https://www.ssa.gov/benefits/disability/",
    i18n: {
      en: { title: "SSDI (Disability Insurance)", desc: "Benefits for workers with a disability who have paid into Social Security." },
      fr: { title: "SSDI (Invalidité)", desc: "Prestations pour travailleurs handicapés ayant cotisé." },
      es: { title: "SSDI (Incapacidad)", desc: "Beneficios para trabajadores con discapacidad que cotizaron." },
    },
  },
  {
    category: "Income",
    link: "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc",
    i18n: {
      en: { title: "Earned Income Tax Credit (EITC)", desc: "A tax credit for working people and families with low to moderate income." },
      fr: { title: "Crédit d’impôt pour revenu gagné (EITC)", desc: "Crédit d’impôt pour travailleurs et familles à revenu faible à modéré." },
      es: { title: "Crédito Tributario por Ingreso del Trabajo (EITC)", desc: "Crédito fiscal para trabajadores y familias con ingresos bajos a moderados." },
    },
  },

  // ===== EXTRA “STATE DEMOS” (3) =====
  {
    category: "Food",
    link: "https://www.cdss.ca.gov/calfresh",
    states: ["CA"],
    i18n: {
      en: { title: "CalFresh (CA SNAP)", desc: "California’s SNAP program for food assistance." },
      fr: { title: "CalFresh (SNAP Californie)", desc: "Programme SNAP de Californie." },
      es: { title: "CalFresh (SNAP CA)", desc: "Programa SNAP de California." },
    },
  },
  {
    category: "Food",
    link: "https://www.yourtexasbenefits.com/Learn/SNAP",
    states: ["TX"],
    i18n: {
      en: { title: "Texas SNAP (Your Texas Benefits)", desc: "Food assistance for eligible households in Texas." },
      fr: { title: "SNAP Texas", desc: "Aide alimentaire pour ménages au Texas." },
      es: { title: "SNAP de Texas", desc: "Asistencia alimentaria para Texas." },
    },
  },
  {
    category: "Food",
    link: "https://otda.ny.gov/programs/snap/",
    states: ["NY"],
    i18n: {
      en: { title: "New York SNAP", desc: "Food assistance for eligible households in New York." },
      fr: { title: "SNAP New York", desc: "Aide alimentaire pour ménages à New York." },
      es: { title: "SNAP de Nueva York", desc: "Asistencia alimentaria en Nueva York." },
    },
  },
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
  useEffect(() => setReveal(true), []);

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
                  <span style={{ marginRight: 6, display: "inline-block", transform: "translateY(1px)" }}>
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
                        canNativeShare ? doNativeShare(p) : setShareOpenIndex(shareOpenIndex === i ? null : i)
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
                <span className="badge" style={{ background: BADGE_BG[current.category] || "var(--border)" }}>
                  {UI[lang].catLabels[current.category] || current.category}
                </span>
                <button className="closeX" onClick={() => setOpen(false)} aria-label={T.close}>
                  ✕
                </button>
              </div>

              <h3 className="modalTitle">
                <span style={{ marginRight: 6, display: "inline-block", transform: "translateY(1px)" }}>
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
                  <span style={{ marginLeft: 8 }}>{isFav(current.link) ? T.saved : T.unsaved}</span>
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

      {/* ✅ Styles included INSIDE the page so nothing is missing */}
      <style jsx global>{`
        :root{
          --bg:#ffffff;
          --text:#0f172a;
          --muted:#64748b;
          --card:#ffffff;
          --border:#e2e8f0;
          --shadow: 0 10px 30px rgba(15, 23, 42, .08);
          --radius:16px;

          --tint-food: rgba(34,197,94,.14);
          --tint-health: rgba(225,29,72,.14);
          --tint-housing: rgba(59,130,246,.14);
          --tint-utilities: rgba(245,158,11,.14);
          --tint-education: rgba(168,85,247,.14);
          --tint-income: rgba(20,184,166,.14);
        }

        :root[data-theme="dark"]{
          --bg:#0b1220;
          --text:#e5e7eb;
          --muted:#9aa3b2;
          --card:#0f172a;
          --border:#1f2a44;
          --shadow: 0 10px 30px rgba(0,0,0,.35);
        }

        *{box-sizing:border-box}
        html,body{padding:0;margin:0}
        body{
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji","Segoe UI Emoji";
          background:var(--bg);
          color:var(--text);
        }
        a{color:inherit;text-decoration:none}
        a:hover{text-decoration:underline}

        .container{
          width:min(1100px, 92vw);
          margin:0 auto;
          padding:22px 0 36px;
        }

        .nav{
          position:sticky; top:0; z-index:50;
          background: color-mix(in oklab, var(--bg) 88%, transparent);
          backdrop-filter: blur(10px);
          border-bottom:1px solid var(--border);
        }
        .headerRow{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:14px;
          padding:14px 0;
        }
        .brandRow{
          display:flex;
          align-items:center;
          gap:10px;
          font-size:18px;
        }
        .hero{ padding:18px 0 10px; }
        .hero h1{
          margin:0 0 8px;
          font-size: clamp(28px, 3vw, 44px);
          letter-spacing:-.02em;
        }
        .hero p{
          margin:0;
          color:var(--muted);
          font-size:16px;
          line-height:1.5;
        }

        .toolbar{
          margin-top:14px;
          padding:16px;
          border:1px solid var(--border);
          border-radius: var(--radius);
          background: var(--card);
          box-shadow: var(--shadow);
        }

        .searchInlineForm{margin:0}
        .searchInline{
          display:flex;
          align-items:center;
          border:1px solid var(--border);
          border-radius: 14px;
          overflow:hidden;
          background: color-mix(in oklab, var(--bg) 70%, transparent);
        }
        .searchInlineInput{
          width:100%;
          padding:12px 12px;
          border:0;
          outline:none;
          background:transparent;
          color:var(--text);
          font-size:14px;
        }
        .searchInlineActions{display:flex; align-items:center; padding:0 8px}
        .iconOnly{
          border:0;
          background:transparent;
          color:var(--muted);
          cursor:pointer;
          font-size:16px;
          padding:8px;
        }

        .filtersRow{
          margin-top:12px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          flex-wrap:wrap;
        }
        .chips{
          display:flex;
          flex-wrap:wrap;
          gap:8px;
        }
        .chip{
          border:1px solid var(--border);
          background:transparent;
          color:var(--text);
          padding:8px 12px;
          border-radius:999px;
          cursor:pointer;
          font-size:13px;
        }
        .chipActive{
          background: color-mix(in oklab, var(--text) 10%, transparent);
          border-color: color-mix(in oklab, var(--text) 22%, var(--border));
        }

        .stateSelectWrap{
          display:flex;
          align-items:center;
          gap:8px;
          color:var(--muted);
          font-size:13px;
        }
        .langSelect{
          border:1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          padding:8px 10px;
          border-radius:12px;
          outline:none;
        }

        .countRow{margin-top:10px}
        .muted{color:var(--muted); font-size:13px}

        .grid{
          margin-top:18px;
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap:14px;
        }
        @media (max-width: 980px){
          .grid{grid-template-columns: repeat(2, minmax(0, 1fr));}
        }
        @media (max-width: 640px){
          .grid{grid-template-columns: 1fr;}
        }

        .card{
          border:1px solid var(--border);
          border-radius: var(--radius);
          background: var(--card);
          box-shadow: var(--shadow);
          padding:14px;
          position:relative;
          transform: translateY(8px);
          opacity:0;
          transition: opacity .35s ease, transform .35s ease;
          transition-delay: calc(var(--i) * 18ms);
        }
        .grid.reveal .card{
          opacity:1;
          transform: translateY(0);
        }
        .badge{
          display:inline-flex;
          align-items:center;
          padding:6px 10px;
          border-radius:999px;
          font-size:12px;
          color: color-mix(in oklab, var(--text) 78%, transparent);
          border:1px solid color-mix(in oklab, var(--border) 70%, transparent);
          margin-bottom:10px;
        }

        .card h3{ margin:0 0 6px; font-size:16px; }
        .card p{
          margin:0 0 12px;
          color:var(--muted);
          line-height:1.45;
          font-size:13.5px;
        }

        .cardActions{
          display:flex;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;
        }

        button.secondary{
          border:1px solid var(--border);
          background:transparent;
          color:var(--text);
          padding:9px 12px;
          border-radius:12px;
          cursor:pointer;
          font-size:13px;
        }

        .apply{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          padding:9px 12px;
          border-radius:12px;
          background: #16a34a;
          color:white;
          border:1px solid color-mix(in oklab, #16a34a 70%, black);
          font-size:13px;
        }
        .apply:hover{ text-decoration:none; filter:brightness(1.03) }

        .iconBtn{
          height:40px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border:1px solid var(--border);
          background:transparent;
          border-radius:12px;
          cursor:pointer;
          padding: 0 10px;
        }

        .menuWrap{position:relative}
        .menu{
          position:absolute;
          top:44px;
          left:0;
          min-width:190px;
          background: var(--card);
          border:1px solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow);
          padding:6px;
        }
        .menu button{
          width:100%;
          text-align:left;
          border:0;
          background:transparent;
          color:var(--text);
          padding:10px 10px;
          border-radius:10px;
          cursor:pointer;
        }
        .menu button:hover{
          background: color-mix(in oklab, var(--text) 10%, transparent);
        }

        .empty{
          grid-column: 1 / -1;
          border:1px dashed var(--border);
          border-radius: var(--radius);
          padding:26px;
          text-align:center;
          color:var(--muted);
        }
        .emptyArt{font-size:28px; margin-bottom:8px}

        .backdrop{
          position:fixed; inset:0;
          background: rgba(0,0,0,.45);
          z-index:100;
        }
        .modal{
          position:fixed;
          z-index:101;
          left:50%;
          top:50%;
          transform:translate(-50%,-50%);
          width:min(680px, 92vw);
          border:1px solid var(--border);
          border-radius: 22px;
          background: var(--card);
          box-shadow: var(--shadow);
          padding:16px;
        }
        .modalHeader{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
        }
        .closeX{
          border:1px solid var(--border);
          background:transparent;
          color:var(--text);
          border-radius:12px;
          cursor:pointer;
          padding:8px 10px;
        }
        .modalTitle{margin:12px 0 8px}
        .modalBody{margin:0 0 14px; color:var(--muted); line-height:1.5}
        .modalActions{display:flex; gap:10px; flex-wrap:wrap; align-items:center}

        .footer{
          margin-top:26px;
          padding:18px 0 0;
          border-top:1px solid var(--border);
          color:var(--muted);
          text-align:center;
          font-size:13px;
        }

        .pulse{ animation: pulse .3s ease; }
        @keyframes pulse{
          0%{ transform: scale(1); }
          50%{ transform: scale(1.12); }
          100%{ transform: scale(1); }
        }

        .af-donate{
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding:12px 14px;
          border-radius: 16px;
          border:1px solid color-mix(in oklab, #16a34a 35%, var(--border));
          background: color-mix(in oklab, #16a34a 12%, var(--card));
          box-shadow: var(--shadow);
        }
        .af-donate:hover{ text-decoration:none; filter:brightness(1.02); }
        .af-donate__icon{ font-size:18px; }
        .af-donate__text{ font-weight:700; color: var(--text); }
        .af-donate__sub{ color: var(--muted); font-size:12px; margin-left:6px; }
      `}</style>
    </>
  );
}
