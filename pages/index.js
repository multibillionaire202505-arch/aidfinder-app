// pages/index.js
import { useMemo, useState, useEffect } from "react";
import Head from "next/head";

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
const ALL = [
  // Food
  {
    category: "Food",
    link: "https://www.fns.usda.gov/snap",
    i18n: {
      en: { title: "SNAP (Food Stamps)", desc: "Monthly funds to buy groceries for eligible households." },
      fr: { title: "SNAP (Bons alimentaires)", desc: "Aide mensuelle pour acheter des produits alimentaires." },
      es: { title: "SNAP (Cupones de Alimentos)", desc: "Fondos mensuales para comestibles." },
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
      fr: { title: "Programme national de déjeuner scolaire (NSLP)", desc: "Repas scolaires à faible coût ou gratuits." },
      es: { title: "Programa Nacional de Almuerzos (NSLP)", desc: "Almuerzos escolares gratuitos o de bajo costo." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/csfp",
    i18n: {
      en: { title: "Commodity Supplemental Food Program (CSFP)", desc: "Monthly food boxes for low-income seniors." },
      fr: { title: "CSFP (Aide alimentaire pour aînés)", desc: "Colis alimentaires mensuels pour les aînés." },
      es: { title: "Programa CSFP", desc: "Cajas mensuales de alimentos para adultos mayores." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/sbp",
    i18n: {
      en: { title: "School Breakfast Program (SBP)", desc: "Free or low-cost school breakfasts for eligible students." },
      fr: { title: "Programme de petit-déjeuner scolaire (SBP)", desc: "Petits-déjeuners gratuits ou à faible coût." },
      es: { title: "Programa de Desayunos Escolares (SBP)", desc: "Desayunos gratuitos o de bajo costo." },
    },
  },

  // Health
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
    link: "https://www.medicaid.gov/chip/index.html",
    i18n: {
      en: { title: "Children’s Health Insurance Program (CHIP)", desc: "Low-cost coverage for children who don’t qualify for Medicaid." },
      fr: { title: "Assurance santé enfants (CHIP)", desc: "Couverture à faible coût pour les enfants non éligibles à Medicaid." },
      es: { title: "Seguro Médico Infantil (CHIP)", desc: "Cobertura de bajo costo para niños que no califican." },
    },
  },

  // Housing
  {
    category: "Housing",
    link: "https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/emergency-rental-assistance-program",
    i18n: {
      en: { title: "Emergency Rental Assistance (ERA)", desc: "Help with rent and utilities during hardship." },
      fr: { title: "Aide d’urgence au loyer (ERA)", desc: "Aide pour le loyer et les services publics en cas de difficultés." },
      es: { title: "Asistencia de Alquiler de Emergencia (ERA)", desc: "Ayuda con alquiler y servicios." },
    },
  },
  {
    category: "Housing",
    link: "https://www.hud.gov/topics/housing_choice_voucher_program_section8",
    i18n: {
      en: { title: "Section 8 Housing Choice Voucher", desc: "Helps very low-income families afford decent housing." },
      fr: { title: "Bons logement Section 8", desc: "Aide les ménages à très faible revenu à se loger." },
      es: { title: "Vales de Vivienda Sección 8", desc: "Ayuda a familias de muy bajos ingresos." },
    },
  },

  // Utilities
  {
    category: "Utilities",
    link: "https://www.acf.hhs.gov/ocs/programs/liheap",
    i18n: {
      en: { title: "LIHEAP", desc: "Help paying heating/cooling bills and some energy repairs." },
      fr: { title: "LIHEAP", desc: "Aide pour factures de chauffage/climatisation et réparations." },
      es: { title: "LIHEAP", desc: "Ayuda para facturas de calefacción/aire." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.energy.gov/scep/wap/weatherization-assistance-program",
    i18n: {
      en: { title: "WAP (Weatherization Assistance)", desc: "Home energy efficiency repairs for eligible households." },
      fr: { title: "WAP (Aide à l’isolation)", desc: "Travaux d’efficacité énergétique à domicile." },
      es: { title: "WAP (Climatización)", desc: "Mejoras de eficiencia energética en el hogar." },
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
    link: "https://www.acf.hhs.gov/ocs/programs/lihwap",
    i18n: {
      en: { title: "LIHWAP (Water Assistance)", desc: "Helps low-income households with water & wastewater bills." },
      fr: { title: "LIHWAP (Aide à l’eau)", desc: "Aide pour les factures d’eau et d’assainissement." },
      es: { title: "LIHWAP (Ayuda de Agua)", desc: "Ayuda con facturas de agua y alcantarillado." },
    },
  },

  // Education
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
    link: "https://www.acf.hhs.gov/ohs",
    i18n: {
      en: { title: "Head Start", desc: "School readiness & family support for infants to preschoolers." },
      fr: { title: "Head Start", desc: "Préparation scolaire et soutien familial." },
      es: { title: "Head Start", desc: "Preparación escolar y apoyo familiar." },
    },
  },
  {
    category: "Education",
    link: "https://studentaid.gov/h/apply-for-aid/fafsa",
    i18n: {
      en: { title: "FAFSA", desc: "Apply for federal student aid (grants, loans, work-study)." },
      fr: { title: "FAFSA", desc: "Demande d’aide fédérale (bourses, prêts, travail-études)." },
      es: { title: "FAFSA", desc: "Solicite ayuda federal (becas, préstamos, estudio-trabajo)." },
    },
  },

  // Income
  {
    category: "Income",
    link: "https://www.ssa.gov/ssi/",
    i18n: {
      en: { title: "SSI (Supplemental Security Income)", desc: "Monthly payments for people with disabilities or very low income (65+)." },
      fr: { title: "SSI (Revenu de Sécurité Supplémentaire)", desc: "Paiements mensuels pour personnes handicapées ou à très faible revenu (65+)." },
      es: { title: "SSI (Ingreso Suplementario de Seguridad)", desc: "Pagos mensuales para personas con discapacidad o muy bajos ingresos (65+)." },
    },
  },
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
    link: "https://www.acf.hhs.gov/ofa/programs/tanf",
    i18n: {
      en: { title: "TANF", desc: "Cash assistance & support services for low-income families with children." },
      fr: { title: "TANF", desc: "Aide financière et services de soutien pour familles à faible revenu." },
      es: { title: "TANF", desc: "Asistencia en efectivo y apoyo para familias de bajos ingresos." },
    },
  },
  {
    category: "Income",
    link: "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit",
    i18n: {
      en: { title: "Earned Income Tax Credit (EITC)", desc: "Refundable tax credit for low-to-moderate income workers." },
      fr: { title: "Crédit d’impôt EITC", desc: "Crédit remboursable pour travailleurs à revenu faible/modéré." },
      es: { title: "Crédito por Ingreso del Trabajo (EITC)", desc: "Crédito reembolsable para trabajadores de bajos/moderados ingresos." },
    },
  },

  // Universal
  {
    category: "Health",
    link: "https://988lifeline.org",
    i18n: {
      en: { title: "988 Suicide & Crisis Lifeline", desc: "24/7 free confidential help — call or text 988." },
      fr: { title: "Ligne 988 (Suicide & Crise)", desc: "Aide gratuite et confidentielle 24/7 — appelez/textez 988." },
      es: { title: "Línea 988 de Suicidio y Crisis", desc: "Ayuda gratuita y confidencial 24/7 — llame o envíe texto al 988." },
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
    category: "Housing",
    link: "https://www.disasterassistance.gov",
    i18n: {
      en: { title: "FEMA Disaster Assistance", desc: "Help after federally declared disasters — housing, repairs." },
      fr: { title: "Aide catastrophe FEMA", desc: "Aide après catastrophes — logement, réparations." },
      es: { title: "Asistencia por Desastre FEMA", desc: "Ayuda tras desastres — vivienda, reparaciones." },
    },
  },
  {
    category: "Health",
    link: "https://www.healthcare.gov",
    i18n: {
      en: { title: "Healthcare.gov Marketplace", desc: "Shop health plans. Financial help varies by income." },
      fr: { title: "Marketplace Healthcare.gov", desc: "Comparer des plans santé; aides selon revenus." },
      es: { title: "Mercado de Healthcare.gov", desc: "Compare planes de salud; ayuda según ingresos." },
    },
  },
  {
    category: "Income",
    link: "https://www.sba.gov/funding-programs",
    i18n: {
      en: { title: "SBA Small Business Programs", desc: "Loans, counseling & resources for entrepreneurs." },
      fr: { title: "Programmes SBA", desc: "Prêts, counseling et ressources pour entrepreneurs." },
      es: { title: "Programas de la SBA", desc: "Préstamos, asesoría y recursos para emprendedores." },
    },
  },
  {
    category: "Education",
    link: "https://www.apprenticeship.gov/apprenticeship-job-finder",
    i18n: {
      en: { title: "Apprenticeship Finder", desc: "Paid earn-while-you-learn training programs." },
      fr: { title: "Trouver une alternance", desc: "Formations rémunérées en alternance." },
      es: { title: "Buscador de Aprendizajes", desc: "Programas pagados de formación." },
    },
  },

  // Community development
  {
    category: "Housing",
    link: "https://www.hud.gov/program_offices/comm_planning/communitydevelopment/programs",
    i18n: {
      en: { title: "Community Development Block Grant (CDBG)", desc: "Funds local housing & community development via HUD partners." },
      fr: { title: "CDBG (Dév. communautaire)", desc: "Financement logement & développement local via HUD." },
      es: { title: "Subvención CDBG", desc: "Financia vivienda y desarrollo comunitario." },
    },
  },

  // State-specific demos (CA/TX/NY)
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
    category: "Health",
    link: "https://www.dhcs.ca.gov/services/medi-cal",
    states: ["CA"],
    i18n: {
      en: { title: "Medi-Cal (CA Medicaid)", desc: "California’s Medicaid program." },
      fr: { title: "Medi-Cal (Medicaid Californie)", desc: "Programme Medicaid de Californie." },
      es: { title: "Medi-Cal (Medicaid CA)", desc: "Programa Medicaid de California." },
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
    category: "Health",
    link: "https://www.yourtexasbenefits.com/Learn/Medicaid",
    states: ["TX"],
    i18n: {
      en: { title: "Texas Medicaid", desc: "Health coverage for eligible Texans." },
      fr: { title: "Medicaid Texas", desc: "Couverture santé pour Texans éligibles." },
      es: { title: "Medicaid de Texas", desc: "Cobertura de salud para texanos elegibles." },
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
  {
    category: "Utilities",
    link: "https://otda.ny.gov/programs/heap/",
    states: ["NY"],
    i18n: {
      en: { title: "HEAP (NY Energy Assistance)", desc: "Help with heating & cooling costs for eligible NY residents." },
      fr: { title: "HEAP (Aide énergie NY)", desc: "Aide aux coûts de chauffage/climatisation à NY." },
      es: { title: "HEAP (Asistencia Energía NY)", desc: "Ayuda con costos de calefacción y refrigeración." },
    },
  },
  // ===== ADDITIONAL 166 PROGRAMS FOR AIDFINDER =====
// Paste this block inside const ALL = [ ... ], right before the final closing ];
// Your current file has 34 programs, so this brings the total to 200.
  {
    category: "Food",
    link: "https://www.fns.usda.gov/tefap",
    i18n: {
      en: { title: "TEFAP (Emergency Food Assistance)", desc: "Emergency food support through local food banks and state agencies." },
      fr: { title: "TEFAP (Emergency Food Assistance)", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "TEFAP (Emergency Food Assistance)", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/summer/sunbucks",
    i18n: {
      en: { title: "Summer EBT / SUN Bucks", desc: "Summer food benefits for eligible school-age children." },
      fr: { title: "Summer EBT / SUN Bucks", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Summer EBT / SUN Bucks", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/cacfp",
    i18n: {
      en: { title: "CACFP Child and Adult Care Food Program", desc: "Meals and snacks for eligible children and adults in care settings." },
      fr: { title: "CACFP Child and Adult Care Food Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "CACFP Child and Adult Care Food Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/sfsp",
    i18n: {
      en: { title: "SFSP Summer Food Service Program", desc: "Free meals for children during summer break." },
      fr: { title: "SFSP Summer Food Service Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "SFSP Summer Food Service Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/fdpir",
    i18n: {
      en: { title: "FDPIR Food Distribution Program on Indian Reservations", desc: "Monthly USDA food packages for eligible households on or near reservations." },
      fr: { title: "FDPIR Food Distribution Program on Indian Reservations", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "FDPIR Food Distribution Program on Indian Reservations", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/sfmnp",
    i18n: {
      en: { title: "Senior Farmers Market Nutrition Program", desc: "Coupons for eligible seniors to buy fresh local produce." },
      fr: { title: "Senior Farmers Market Nutrition Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Senior Farmers Market Nutrition Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/fmnp",
    i18n: {
      en: { title: "Farmers Market Nutrition Program", desc: "Fresh produce benefits for WIC participants at farmers markets." },
      fr: { title: "Farmers Market Nutrition Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Farmers Market Nutrition Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.mealsonwheelsamerica.org/find-meals",
    i18n: {
      en: { title: "Meals on Wheels America", desc: "Local meal delivery and nutrition support for older adults." },
      fr: { title: "Meals on Wheels America", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Meals on Wheels America", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.feedingamerica.org/find-your-local-foodbank",
    i18n: {
      en: { title: "Feeding America Food Bank Finder", desc: "Find local food banks and emergency food resources." },
      fr: { title: "Feeding America Food Bank Finder", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Feeding America Food Bank Finder", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/national-hunger-hotline",
    i18n: {
      en: { title: "USDA National Hunger Hotline", desc: "Connects people with local food assistance." },
      fr: { title: "USDA National Hunger Hotline", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "USDA National Hunger Hotline", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://doubleupamerica.org",
    i18n: {
      en: { title: "Double Up Food Bucks", desc: "Matches SNAP dollars for fruits and vegetables in participating areas." },
      fr: { title: "Double Up Food Bucks", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Double Up Food Bucks", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://snaped.fns.usda.gov",
    i18n: {
      en: { title: "SNAP-Ed Nutrition Education", desc: "Nutrition education for SNAP-eligible communities." },
      fr: { title: "SNAP-Ed Nutrition Education", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "SNAP-Ed Nutrition Education", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/smp",
    i18n: {
      en: { title: "Special Milk Program", desc: "Milk assistance for children in eligible schools and institutions." },
      fr: { title: "Special Milk Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Special Milk Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.fns.usda.gov/ffvp",
    i18n: {
      en: { title: "Fresh Fruit and Vegetable Program", desc: "Free fresh produce in participating elementary schools." },
      fr: { title: "Fresh Fruit and Vegetable Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Fresh Fruit and Vegetable Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.usa.gov/food-help",
    i18n: {
      en: { title: "The Emergency Food Program Locator", desc: "Official guide to emergency food help and nutrition programs." },
      fr: { title: "The Emergency Food Program Locator", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "The Emergency Food Program Locator", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.localharvest.org",
    i18n: {
      en: { title: "Local Harvest Food Resources", desc: "Find local farms, markets, and food resources." },
      fr: { title: "Local Harvest Food Resources", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Local Harvest Food Resources", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://whyhunger.org/find-food/",
    i18n: {
      en: { title: "WhyHunger Hotline", desc: "Find emergency food providers and community resources." },
      fr: { title: "WhyHunger Hotline", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "WhyHunger Hotline", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.usa.gov/food-help#older-adults",
    i18n: {
      en: { title: "Food Help for Older Adults", desc: "Food assistance options for people age 60 and older." },
      fr: { title: "Food Help for Older Adults", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Food Help for Older Adults", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.usa.gov/food-help#school-meals",
    i18n: {
      en: { title: "School Meals for Children", desc: "Free or reduced school meals and child nutrition help." },
      fr: { title: "School Meals for Children", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "School Meals for Children", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.usa.gov/food-help#native-americans",
    i18n: {
      en: { title: "Native American Food Assistance", desc: "Food assistance information for Native American communities." },
      fr: { title: "Native American Food Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Native American Food Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://texaswic.org",
    states: ["TX"],
    i18n: {
      en: { title: "Texas WIC", desc: "Nutrition support for eligible Texas women, infants, and children." },
      fr: { title: "Texas WIC", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Texas WIC", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.feedingtexas.org/get-help/",
    states: ["TX"],
    i18n: {
      en: { title: "Texas Food Bank Network", desc: "Find food assistance through Feeding Texas." },
      fr: { title: "Texas Food Bank Network", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Texas Food Bank Network", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.cafoodbanks.org/find-food-bank/",
    states: ["CA"],
    i18n: {
      en: { title: "California Food Banks", desc: "Find local food banks throughout California." },
      fr: { title: "California Food Banks", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "California Food Banks", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://otda.ny.gov/programs/food-stamps/",
    states: ["NY"],
    i18n: {
      en: { title: "New York Food Assistance", desc: "Food assistance resources for eligible New Yorkers." },
      fr: { title: "New York Food Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "New York Food Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.myflfamilies.com/services/public-assistance/supplemental-nutrition-assistance-program-snap",
    states: ["FL"],
    i18n: {
      en: { title: "Florida Food Assistance", desc: "Florida SNAP and food support information." },
      fr: { title: "Florida Food Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Florida Food Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://www.dhs.state.il.us/page.aspx?item=30357",
    states: ["IL"],
    i18n: {
      en: { title: "Illinois Food Assistance", desc: "Illinois SNAP and food assistance resources." },
      fr: { title: "Illinois Food Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Illinois Food Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://dfcs.georgia.gov/snap-food-stamps",
    states: ["GA"],
    i18n: {
      en: { title: "Georgia Food Stamps", desc: "Georgia SNAP food assistance information." },
      fr: { title: "Georgia Food Stamps", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Georgia Food Stamps", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Food",
    link: "https://des.az.gov/na",
    states: ["AZ"],
    i18n: {
      en: { title: "Arizona Nutrition Assistance", desc: "Arizona Nutrition Assistance for eligible households." },
      fr: { title: "Arizona Nutrition Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Arizona Nutrition Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.medicare.gov",
    i18n: {
      en: { title: "Medicare", desc: "Health coverage for people 65+ and certain people with disabilities." },
      fr: { title: "Medicare", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Medicare", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.medicare.gov/basics/costs/help/medicare-savings-programs",
    i18n: {
      en: { title: "Medicare Savings Programs", desc: "Help paying Medicare premiums and some out-of-pocket costs." },
      fr: { title: "Medicare Savings Programs", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Medicare Savings Programs", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.ssa.gov/medicare/part-d-extra-help",
    i18n: {
      en: { title: "Extra Help with Medicare Drug Costs", desc: "Help paying Medicare prescription drug costs." },
      fr: { title: "Extra Help with Medicare Drug Costs", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Extra Help with Medicare Drug Costs", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.dol.gov/general/topic/health-plans/cobra",
    i18n: {
      en: { title: "COBRA Health Coverage", desc: "Temporary continuation of employer health coverage after job loss or changes." },
      fr: { title: "COBRA Health Coverage", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "COBRA Health Coverage", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://ryanwhite.hrsa.gov",
    i18n: {
      en: { title: "Ryan White HIV/AIDS Program", desc: "Medical care and support for people living with HIV." },
      fr: { title: "Ryan White HIV/AIDS Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Ryan White HIV/AIDS Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://findahealthcenter.hrsa.gov#community-health-center-directory",
    i18n: {
      en: { title: "HRSA Find a Health Center", desc: "Find affordable community health centers near you." },
      fr: { title: "HRSA Find a Health Center", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "HRSA Find a Health Center", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.hrsa.gov/get-health-care/affordable/hill-burton",
    i18n: {
      en: { title: "Hill-Burton Free and Reduced-Cost Care", desc: "Free or reduced-cost care at certain facilities." },
      fr: { title: "Hill-Burton Free and Reduced-Cost Care", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Hill-Burton Free and Reduced-Cost Care", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.cdc.gov/vaccines-for-children/",
    i18n: {
      en: { title: "Vaccines for Children Program", desc: "Free vaccines for eligible children." },
      fr: { title: "Vaccines for Children Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Vaccines for Children Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://findtreatment.gov",
    i18n: {
      en: { title: "SAMHSA Treatment Locator", desc: "Find mental health and substance use treatment." },
      fr: { title: "SAMHSA Treatment Locator", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "SAMHSA Treatment Locator", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://screening.mhanational.org",
    i18n: {
      en: { title: "Mental Health America Screening", desc: "Free mental health screening tools and resources." },
      fr: { title: "Mental Health America Screening", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Mental Health America Screening", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.nami.org/help",
    i18n: {
      en: { title: "NAMI HelpLine", desc: "Mental health support, education, and referrals." },
      fr: { title: "NAMI HelpLine", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "NAMI HelpLine", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://988lifeline.org/chat/",
    i18n: {
      en: { title: "988 Lifeline Chat", desc: "Online crisis chat support through the 988 Lifeline." },
      fr: { title: "988 Lifeline Chat", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "988 Lifeline Chat", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.poison.org",
    i18n: {
      en: { title: "Poison Control", desc: "24/7 poison emergency help and guidance." },
      fr: { title: "Poison Control", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Poison Control", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.cdc.gov/vaccines/",
    i18n: {
      en: { title: "CDC Vaccines and Immunizations", desc: "Vaccine information and public health resources." },
      fr: { title: "CDC Vaccines and Immunizations", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "CDC Vaccines and Immunizations", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://localhelp.healthcare.gov",
    i18n: {
      en: { title: "HealthCare.gov Local Help", desc: "Find local help enrolling in Marketplace coverage." },
      fr: { title: "HealthCare.gov Local Help", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "HealthCare.gov Local Help", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.shiphelp.org",
    i18n: {
      en: { title: "SHIP Medicare Counseling", desc: "Free Medicare counseling through State Health Insurance Assistance Programs." },
      fr: { title: "SHIP Medicare Counseling", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "SHIP Medicare Counseling", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://dentallifeline.org",
    i18n: {
      en: { title: "Dental Lifeline Network", desc: "Dental care access for people with disabilities, elderly adults, and medically fragile people." },
      fr: { title: "Dental Lifeline Network", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Dental Lifeline Network", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.needymeds.org",
    i18n: {
      en: { title: "NeedyMeds", desc: "Information on prescription savings and patient assistance programs." },
      fr: { title: "NeedyMeds", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "NeedyMeds", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.rxassist.org",
    i18n: {
      en: { title: "RxAssist Patient Assistance", desc: "Find prescription drug assistance programs." },
      fr: { title: "RxAssist Patient Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "RxAssist Patient Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.goodrx.com/care",
    i18n: {
      en: { title: "GoodRx Care Resources", desc: "Affordable healthcare and prescription information." },
      fr: { title: "GoodRx Care Resources", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "GoodRx Care Resources", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://nafcclinics.org/find-clinic/",
    i18n: {
      en: { title: "Free Clinics Directory", desc: "Find charitable clinics and pharmacies." },
      fr: { title: "Free Clinics Directory", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Free Clinics Directory", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://opa-fpclinicdb.hhs.gov",
    i18n: {
      en: { title: "Title X Family Planning Clinics", desc: "Find low-cost family planning and preventive health services." },
      fr: { title: "Title X Family Planning Clinics", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Title X Family Planning Clinics", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://mchb.hrsa.gov/national-maternal-mental-health-hotline",
    i18n: {
      en: { title: "Maternal and Child Health Hotline", desc: "Support for pregnant and postpartum parents." },
      fr: { title: "Maternal and Child Health Hotline", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Maternal and Child Health Hotline", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.healthytexaswomen.org",
    states: ["TX"],
    i18n: {
      en: { title: "Healthy Texas Women", desc: "Women's health and family planning services in Texas." },
      fr: { title: "Healthy Texas Women", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Healthy Texas Women", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.dhcs.ca.gov/services/medi-cal/Pages/ApplyforMedi-Cal.aspx",
    states: ["CA"],
    i18n: {
      en: { title: "Medi-Cal Apply", desc: "Apply for California Medi-Cal health coverage." },
      fr: { title: "Medi-Cal Apply", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Medi-Cal Apply", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://nystateofhealth.ny.gov",
    states: ["NY"],
    i18n: {
      en: { title: "New York State of Health", desc: "NY health insurance marketplace and assistance." },
      fr: { title: "New York State of Health", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "New York State of Health", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://www.myflfamilies.com/services/public-assistance/medicaid",
    states: ["FL"],
    i18n: {
      en: { title: "Florida Medicaid", desc: "Florida Medicaid coverage information." },
      fr: { title: "Florida Medicaid", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Florida Medicaid", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Health",
    link: "https://hfs.illinois.gov/medicalclients/medicaidguide.html",
    states: ["IL"],
    i18n: {
      en: { title: "Illinois Medicaid", desc: "Illinois Medicaid coverage guide." },
      fr: { title: "Illinois Medicaid", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Illinois Medicaid", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.hud.gov/topics/rental_assistance/phprog",
    i18n: {
      en: { title: "Public Housing Program", desc: "Affordable rental housing through local public housing agencies." },
      fr: { title: "Public Housing Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Public Housing Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://resources.hud.gov",
    i18n: {
      en: { title: "HUD Resource Locator", desc: "Find HUD offices, housing counselors, and affordable housing resources." },
      fr: { title: "HUD Resource Locator", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "HUD Resource Locator", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.hud.gov/counseling",
    i18n: {
      en: { title: "HUD Housing Counseling", desc: "Find HUD-approved housing counseling agencies." },
      fr: { title: "HUD Housing Counseling", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "HUD Housing Counseling", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.hud.gov/program_offices/public_indian_housing/programs/hcv/vash",
    i18n: {
      en: { title: "HUD-VASH Veterans Housing", desc: "Housing vouchers and services for eligible veterans." },
      fr: { title: "HUD-VASH Veterans Housing", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "HUD-VASH Veterans Housing", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.hudexchange.info/programs/coc/",
    i18n: {
      en: { title: "Continuum of Care Program", desc: "Local homeless assistance planning and housing services." },
      fr: { title: "Continuum of Care Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Continuum of Care Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.hudexchange.info/programs/esg/",
    i18n: {
      en: { title: "Emergency Solutions Grants", desc: "Emergency shelter, street outreach, and homelessness prevention support." },
      fr: { title: "Emergency Solutions Grants", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Emergency Solutions Grants", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.hud.gov/program_offices/comm_planning/home",
    i18n: {
      en: { title: "HOME Investment Partnerships Program", desc: "Federal funds for affordable housing activities." },
      fr: { title: "HOME Investment Partnerships Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "HOME Investment Partnerships Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.hudexchange.info/programs/htf/",
    i18n: {
      en: { title: "Housing Trust Fund", desc: "Supports affordable housing for extremely low-income households." },
      fr: { title: "Housing Trust Fund", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Housing Trust Fund", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.rd.usda.gov/programs-services/multifamily-housing-programs/multifamily-housing-rental-assistance",
    i18n: {
      en: { title: "USDA Rural Rental Assistance", desc: "Rental assistance for eligible tenants in rural rental housing." },
      fr: { title: "USDA Rural Rental Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "USDA Rural Rental Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-repair-loans-grants",
    i18n: {
      en: { title: "USDA Single Family Housing Repair Loans & Grants", desc: "Loans and grants for eligible rural homeowners to repair homes." },
      fr: { title: "USDA Single Family Housing Repair Loans & Grants", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "USDA Single Family Housing Repair Loans & Grants", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-direct-home-loans",
    i18n: {
      en: { title: "USDA Single Family Housing Direct Home Loans", desc: "Homeownership assistance for eligible low-income rural applicants." },
      fr: { title: "USDA Single Family Housing Direct Home Loans", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "USDA Single Family Housing Direct Home Loans", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.va.gov/housing-assistance/home-loans/",
    i18n: {
      en: { title: "VA Home Loan Program", desc: "Home loan benefits for eligible veterans and service members." },
      fr: { title: "VA Home Loan Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "VA Home Loan Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.va.gov/homeless/",
    i18n: {
      en: { title: "VA Homeless Veterans Help", desc: "Programs and resources for veterans experiencing homelessness." },
      fr: { title: "VA Homeless Veterans Help", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "VA Homeless Veterans Help", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.fema.gov/assistance/individual/sheltering",
    i18n: {
      en: { title: "FEMA Transitional Sheltering Assistance", desc: "Short-term sheltering help after eligible disasters." },
      fr: { title: "FEMA Transitional Sheltering Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "FEMA Transitional Sheltering Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.fema.gov/assistance/individual/program",
    i18n: {
      en: { title: "FEMA Individuals and Households Program", desc: "Housing and repair help after federally declared disasters." },
      fr: { title: "FEMA Individuals and Households Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "FEMA Individuals and Households Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://nlihc.org/rental-assistance",
    i18n: {
      en: { title: "National Low Income Housing Coalition", desc: "Rental assistance and affordable housing information." },
      fr: { title: "National Low Income Housing Coalition", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "National Low Income Housing Coalition", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.affordablehousing.com",
    i18n: {
      en: { title: "AffordableHousing.com", desc: "Search affordable rentals and housing programs." },
      fr: { title: "AffordableHousing.com", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "AffordableHousing.com", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.findhelp.org/housing",
    i18n: {
      en: { title: "FindHelp Housing Search", desc: "Search local housing and shelter resources." },
      fr: { title: "FindHelp Housing Search", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "FindHelp Housing Search", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.tdhca.state.tx.us",
    states: ["TX"],
    i18n: {
      en: { title: "Texas Department of Housing & Community Affairs", desc: "Texas housing and community assistance programs." },
      fr: { title: "Texas Department of Housing & Community Affairs", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Texas Department of Housing & Community Affairs", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.tdhca.state.tx.us/texans.htm",
    states: ["TX"],
    i18n: {
      en: { title: "Texas Rent Relief Resources", desc: "Texas housing help and local resource links." },
      fr: { title: "Texas Rent Relief Resources", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Texas Rent Relief Resources", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://housing.ca.gov",
    states: ["CA"],
    i18n: {
      en: { title: "California Housing Is Key", desc: "California housing resources and tenant protections." },
      fr: { title: "California Housing Is Key", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "California Housing Is Key", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://hcr.ny.gov",
    states: ["NY"],
    i18n: {
      en: { title: "New York Homes and Community Renewal", desc: "New York affordable housing and rent support programs." },
      fr: { title: "New York Homes and Community Renewal", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "New York Homes and Community Renewal", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.floridahousing.org",
    states: ["FL"],
    i18n: {
      en: { title: "Florida Housing Finance Corporation", desc: "Florida affordable housing and homebuyer programs." },
      fr: { title: "Florida Housing Finance Corporation", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Florida Housing Finance Corporation", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.ihda.org",
    states: ["IL"],
    i18n: {
      en: { title: "Illinois Housing Development Authority", desc: "Illinois housing assistance and affordable housing resources." },
      fr: { title: "Illinois Housing Development Authority", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Illinois Housing Development Authority", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.georgiahousingsearch.org",
    states: ["GA"],
    i18n: {
      en: { title: "Georgia Housing Search", desc: "Find affordable rental housing in Georgia." },
      fr: { title: "Georgia Housing Search", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Georgia Housing Search", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://housing.az.gov",
    states: ["AZ"],
    i18n: {
      en: { title: "Arizona Department of Housing", desc: "Arizona housing assistance and affordable housing programs." },
      fr: { title: "Arizona Department of Housing", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Arizona Department of Housing", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.hud.gov/states/california/renting",
    states: ["CA"],
    i18n: {
      en: { title: "California Section 8 / Housing Choice Voucher", desc: "HUD rental help resources for California." },
      fr: { title: "California Section 8 / Housing Choice Voucher", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "California Section 8 / Housing Choice Voucher", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Housing",
    link: "https://www.hud.gov/states/texas/renting",
    states: ["TX"],
    i18n: {
      en: { title: "Texas Section 8 / Housing Choice Voucher", desc: "HUD rental help resources for Texas." },
      fr: { title: "Texas Section 8 / Housing Choice Voucher", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Texas Section 8 / Housing Choice Voucher", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.fcc.gov/acp",
    i18n: {
      en: { title: "Affordable Connectivity Program Information", desc: "Information about internet affordability programs and status." },
      fr: { title: "Affordable Connectivity Program Information", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Affordable Connectivity Program Information", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.fcc.gov/lifeline-consumers",
    i18n: {
      en: { title: "FCC Lifeline Consumer Guide", desc: "Phone and internet discount information for eligible consumers." },
      fr: { title: "FCC Lifeline Consumer Guide", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "FCC Lifeline Consumer Guide", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.acf.hhs.gov/ocs/map/liheap-map-state-and-territory-contact-listing",
    i18n: {
      en: { title: "Energy Assistance Local Providers", desc: "Find LIHEAP contacts by state or territory." },
      fr: { title: "Energy Assistance Local Providers", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Energy Assistance Local Providers", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.energy.gov/scep/wap/how-apply-weatherization-assistance",
    i18n: {
      en: { title: "Weatherization State Contacts", desc: "How to apply for weatherization help through your state." },
      fr: { title: "Weatherization State Contacts", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Weatherization State Contacts", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.acf.hhs.gov/ocs/programs/lihwap#water-assistance-info",
    i18n: {
      en: { title: "Low Income Household Water Assistance Program Info", desc: "Water and wastewater bill assistance program information." },
      fr: { title: "Low Income Household Water Assistance Program Info", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Low Income Household Water Assistance Program Info", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.energy.gov/energysaver/energy-saver",
    i18n: {
      en: { title: "Save on Energy Bills", desc: "Energy-saving guidance that can reduce household utility costs." },
      fr: { title: "Save on Energy Bills", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Save on Energy Bills", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.energystar.gov/rebate-finder",
    i18n: {
      en: { title: "Energy Star Rebates Finder", desc: "Find energy-efficiency rebates by ZIP code." },
      fr: { title: "Energy Star Rebates Finder", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Energy Star Rebates Finder", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.dsireusa.org",
    i18n: {
      en: { title: "DSIRE Clean Energy Incentives", desc: "Find state and local energy incentives." },
      fr: { title: "DSIRE Clean Energy Incentives", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "DSIRE Clean Energy Incentives", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://broadbandmap.fcc.gov",
    i18n: {
      en: { title: "FCC Broadband Map", desc: "Check internet service availability by location." },
      fr: { title: "FCC Broadband Map", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "FCC Broadband Map", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.everyoneon.org",
    i18n: {
      en: { title: "EveryoneOn Internet Help", desc: "Find low-cost internet offers and digital inclusion resources." },
      fr: { title: "EveryoneOn Internet Help", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "EveryoneOn Internet Help", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.human-i-t.org/low-cost-internet/",
    i18n: {
      en: { title: "Human-I-T Low-Cost Internet", desc: "Low-cost internet assistance and device resources." },
      fr: { title: "Human-I-T Low-Cost Internet", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Human-I-T Low-Cost Internet", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.pcsforpeople.org/internet/",
    i18n: {
      en: { title: "PCs for People Internet", desc: "Low-cost internet and technology access resources." },
      fr: { title: "PCs for People Internet", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "PCs for People Internet", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://texasutilityhelp.com",
    states: ["TX"],
    i18n: {
      en: { title: "Texas Utility Help", desc: "Utility bill assistance for eligible Texas households." },
      fr: { title: "Texas Utility Help", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Texas Utility Help", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.tdhca.state.tx.us/community-affairs/ceap/index.htm",
    states: ["TX"],
    i18n: {
      en: { title: "Texas CEAP Energy Assistance", desc: "Texas Comprehensive Energy Assistance Program information." },
      fr: { title: "Texas CEAP Energy Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Texas CEAP Energy Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.csd.ca.gov/Pages/LIHEAPProgram.aspx",
    states: ["CA"],
    i18n: {
      en: { title: "California LIHEAP", desc: "California home energy assistance information." },
      fr: { title: "California LIHEAP", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "California LIHEAP", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://otda.ny.gov/programs/heap/#ny-heap-expanded",
    states: ["NY"],
    i18n: {
      en: { title: "New York HEAP", desc: "Heating and cooling assistance for eligible New Yorkers." },
      fr: { title: "New York HEAP", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "New York HEAP", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.myflfamilies.com/services/public-assistance/low-income-home-energy-assistance-program-liheap",
    states: ["FL"],
    i18n: {
      en: { title: "Florida Low-Income Home Energy Assistance", desc: "Florida LIHEAP energy bill assistance." },
      fr: { title: "Florida Low-Income Home Energy Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Florida Low-Income Home Energy Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://dceo.illinois.gov/communityservices/utilitybillassistance.html",
    states: ["IL"],
    i18n: {
      en: { title: "Illinois LIHEAP", desc: "Illinois utility bill assistance information." },
      fr: { title: "Illinois LIHEAP", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Illinois LIHEAP", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://dfcs.georgia.gov/services/low-income-home-energy-assistance-program-liheap",
    states: ["GA"],
    i18n: {
      en: { title: "Georgia Energy Assistance", desc: "Georgia LIHEAP information." },
      fr: { title: "Georgia Energy Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Georgia Energy Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://des.az.gov/utility-assistance",
    states: ["AZ"],
    i18n: {
      en: { title: "Arizona Utility Assistance", desc: "Arizona utility assistance resources." },
      fr: { title: "Arizona Utility Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Arizona Utility Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://oklahoma.gov/okdhs/services/liheap.html",
    states: ["OK"],
    i18n: {
      en: { title: "Oklahoma LIHEAP", desc: "Oklahoma energy assistance program information." },
      fr: { title: "Oklahoma LIHEAP", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Oklahoma LIHEAP", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.ncdhhs.gov/divisions/social-services/energy-assistance",
    states: ["NC"],
    i18n: {
      en: { title: "North Carolina Energy Assistance", desc: "North Carolina heating and cooling assistance." },
      fr: { title: "North Carolina Energy Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "North Carolina Energy Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.pa.gov/services/dhs/apply-for-liheap.html",
    states: ["PA"],
    i18n: {
      en: { title: "Pennsylvania LIHEAP", desc: "Pennsylvania heating assistance application information." },
      fr: { title: "Pennsylvania LIHEAP", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Pennsylvania LIHEAP", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://development.ohio.gov/individual/energy-assistance/energy-assistance-programs",
    states: ["OH"],
    i18n: {
      en: { title: "Ohio HEAP", desc: "Ohio energy assistance programs." },
      fr: { title: "Ohio HEAP", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Ohio HEAP", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.michigan.gov/mdhhs/assistance-programs/emergency-relief/energy-assistance",
    states: ["MI"],
    i18n: {
      en: { title: "Michigan Energy Assistance Program", desc: "Michigan energy assistance resources." },
      fr: { title: "Michigan Energy Assistance Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Michigan Energy Assistance Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.commerce.wa.gov/growing-the-economy/energy/low-income-home-energy-assistance/",
    states: ["WA"],
    i18n: {
      en: { title: "Washington Energy Assistance", desc: "Washington LIHEAP assistance information." },
      fr: { title: "Washington Energy Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Washington Energy Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://www.oregon.gov/ohcs/energy-weatherization/Pages/energy-assistance.aspx",
    states: ["OR"],
    i18n: {
      en: { title: "Oregon Energy Assistance", desc: "Oregon energy and weatherization assistance." },
      fr: { title: "Oregon Energy Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Oregon Energy Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Utilities",
    link: "https://cdhs.colorado.gov/leap",
    states: ["CO"],
    i18n: {
      en: { title: "Colorado LEAP", desc: "Colorado Low-income Energy Assistance Program." },
      fr: { title: "Colorado LEAP", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Colorado LEAP", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://studentaid.gov/understand-aid/types/work-study",
    i18n: {
      en: { title: "Federal Work-Study", desc: "Part-time jobs for eligible students with financial need." },
      fr: { title: "Federal Work-Study", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Federal Work-Study", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://studentaid.gov/understand-aid/types/grants/fseog",
    i18n: {
      en: { title: "Federal Supplemental Educational Opportunity Grant", desc: "Campus-based grants for undergraduate students with exceptional financial need." },
      fr: { title: "Federal Supplemental Educational Opportunity Grant", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Federal Supplemental Educational Opportunity Grant", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://studentaid.gov/understand-aid/types/grants/teach",
    i18n: {
      en: { title: "TEACH Grant", desc: "Grant support for students who agree to teach in high-need fields." },
      fr: { title: "TEACH Grant", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "TEACH Grant", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://studentaid.gov/understand-aid/types/grants/iraq-afghanistan-service",
    i18n: {
      en: { title: "Iraq and Afghanistan Service Grant", desc: "Grant for eligible students whose parent or guardian died during military service." },
      fr: { title: "Iraq and Afghanistan Service Grant", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Iraq and Afghanistan Service Grant", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://studentaid.gov/manage-loans/forgiveness-cancellation",
    i18n: {
      en: { title: "Federal Student Loan Forgiveness", desc: "Information on student loan forgiveness and cancellation programs." },
      fr: { title: "Federal Student Loan Forgiveness", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Federal Student Loan Forgiveness", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://studentaid.gov/manage-loans/forgiveness-cancellation/public-service",
    i18n: {
      en: { title: "Public Service Loan Forgiveness", desc: "Loan forgiveness for qualifying public service employment." },
      fr: { title: "Public Service Loan Forgiveness", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Public Service Loan Forgiveness", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://studentaid.gov/idr/",
    i18n: {
      en: { title: "Income-Driven Repayment Plans", desc: "Lower federal student loan payments based on income and family size." },
      fr: { title: "Income-Driven Repayment Plans", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Income-Driven Repayment Plans", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.ed.gov/grants-and-programs/grants-special-populations/grants-special-populations-higher-education/federal-trio-programs",
    i18n: {
      en: { title: "TRIO Programs", desc: "Education outreach and support for disadvantaged students." },
      fr: { title: "TRIO Programs", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "TRIO Programs", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.ed.gov/grants-and-programs/grants-special-populations/grants-special-populations-higher-education/gaining-early-awareness-and-readiness-for-undergraduate-programs-gear-up",
    i18n: {
      en: { title: "Gaining Early Awareness and Readiness for Undergraduate Programs", desc: "College readiness support for low-income students." },
      fr: { title: "Gaining Early Awareness and Readiness for Undergraduate Programs", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Gaining Early Awareness and Readiness for Undergraduate Programs", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.ed.gov/grants-and-programs/grants-special-populations/adult-education-and-literacy",
    i18n: {
      en: { title: "Adult Education and Literacy", desc: "Adult basic education, English learning, and literacy support." },
      fr: { title: "Adult Education and Literacy", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Adult Education and Literacy", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.jobcorps.gov",
    i18n: {
      en: { title: "Job Corps", desc: "Free career training and education for eligible young adults." },
      fr: { title: "Job Corps", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Job Corps", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.careeronestop.org/Toolkit/Training/find-training.aspx",
    i18n: {
      en: { title: "CareerOneStop Training Finder", desc: "Find training programs, certifications, and education resources." },
      fr: { title: "CareerOneStop Training Finder", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "CareerOneStop Training Finder", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/find-american-job-centers.aspx",
    i18n: {
      en: { title: "American Job Centers", desc: "Find local career and training centers." },
      fr: { title: "American Job Centers", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "American Job Centers", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.dol.gov/agencies/eta/workforce-investment/adult",
    i18n: {
      en: { title: "WIOA Adult Program", desc: "Employment and training services for eligible adults." },
      fr: { title: "WIOA Adult Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "WIOA Adult Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.dol.gov/agencies/eta/youth",
    i18n: {
      en: { title: "WIOA Youth Program", desc: "Education and job training services for eligible youth." },
      fr: { title: "WIOA Youth Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "WIOA Youth Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.dol.gov/agencies/eta/youth/youthbuild",
    i18n: {
      en: { title: "YouthBuild", desc: "Education and construction skills training for young adults." },
      fr: { title: "YouthBuild", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "YouthBuild", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.apprenticeship.gov#registered-apprenticeship-expanded",
    i18n: {
      en: { title: "Registered Apprenticeship", desc: "Paid career training through apprenticeship programs." },
      fr: { title: "Registered Apprenticeship", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Registered Apprenticeship", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://americorps.gov/members-volunteers/segal-americorps-education-award",
    i18n: {
      en: { title: "AmeriCorps Education Award", desc: "Education award for eligible AmeriCorps service members." },
      fr: { title: "AmeriCorps Education Award", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "AmeriCorps Education Award", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://collegescorecard.ed.gov",
    i18n: {
      en: { title: "College Scorecard", desc: "Compare colleges by cost, graduation, and earnings data." },
      fr: { title: "College Scorecard", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "College Scorecard", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.childcareaware.org/fee-assistancerespite/",
    i18n: {
      en: { title: "Child Care Aware Fee Assistance", desc: "Child care fee assistance information for eligible families." },
      fr: { title: "Child Care Aware Fee Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Child Care Aware Fee Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.acf.hhs.gov/occ/programs/child-care-and-development-fund",
    i18n: {
      en: { title: "Child Care and Development Fund", desc: "Child care assistance for eligible low-income families." },
      fr: { title: "Child Care and Development Fund", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Child Care and Development Fund", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.acf.hhs.gov/ohs/about/head-start#early-head-start-expanded",
    i18n: {
      en: { title: "Early Head Start", desc: "Early learning and family support for infants, toddlers, and pregnant women." },
      fr: { title: "Early Head Start", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Early Head Start", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://sites.ed.gov/idea/",
    i18n: {
      en: { title: "IDEA Special Education", desc: "Special education rights and services for eligible children." },
      fr: { title: "IDEA Special Education", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "IDEA Special Education", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://rsa.ed.gov/about/states",
    i18n: {
      en: { title: "Vocational Rehabilitation State Programs", desc: "Employment support for people with disabilities through state VR agencies." },
      fr: { title: "Vocational Rehabilitation State Programs", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Vocational Rehabilitation State Programs", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.twc.texas.gov/programs/job-training",
    states: ["TX"],
    i18n: {
      en: { title: "Texas Workforce Commission Training", desc: "Texas job training and workforce programs." },
      fr: { title: "Texas Workforce Commission Training", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Texas Workforce Commission Training", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.cccco.edu/Students/Pay-for-College/California-College-Promise-Grant",
    states: ["CA"],
    i18n: {
      en: { title: "California College Promise Grant", desc: "California community college fee waiver for eligible students." },
      fr: { title: "California College Promise Grant", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "California College Promise Grant", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.hesc.ny.gov/pay-for-college/financial-aid/types-of-financial-aid/nys-grants-scholarships-awards/tuition-assistance-program-tap/",
    states: ["NY"],
    i18n: {
      en: { title: "New York TAP Grant", desc: "Tuition Assistance Program for eligible New York students." },
      fr: { title: "New York TAP Grant", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "New York TAP Grant", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Education",
    link: "https://www.floridastudentfinancialaidsg.org/SAPBFMAIN/SAPBFMAIN",
    states: ["FL"],
    i18n: {
      en: { title: "Florida Bright Futures", desc: "Florida scholarship program for eligible students." },
      fr: { title: "Florida Bright Futures", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Florida Bright Futures", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.ssa.gov/retirement",
    i18n: {
      en: { title: "Social Security Retirement Benefits", desc: "Monthly retirement benefits for eligible workers." },
      fr: { title: "Social Security Retirement Benefits", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Social Security Retirement Benefits", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.ssa.gov/disability",
    i18n: {
      en: { title: "Social Security Disability Insurance", desc: "Disability benefits for eligible workers with qualifying disabilities." },
      fr: { title: "Social Security Disability Insurance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Social Security Disability Insurance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.ssa.gov/survivor",
    i18n: {
      en: { title: "Survivors Benefits", desc: "Benefits for eligible family members after a worker dies." },
      fr: { title: "Survivors Benefits", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Survivors Benefits", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.ssa.gov/payee/",
    i18n: {
      en: { title: "SSA Representative Payee Program", desc: "Support for beneficiaries who need help managing payments." },
      fr: { title: "SSA Representative Payee Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "SSA Representative Payee Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.irs.gov/credits-deductions/individuals/child-tax-credit",
    i18n: {
      en: { title: "Child Tax Credit", desc: "Tax credit for eligible families with qualifying children." },
      fr: { title: "Child Tax Credit", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Child Tax Credit", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.irs.gov/credits-deductions/individuals/credit-for-other-dependents",
    i18n: {
      en: { title: "Credit for Other Dependents", desc: "Tax credit for eligible dependents who do not qualify for the Child Tax Credit." },
      fr: { title: "Credit for Other Dependents", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Credit for Other Dependents", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.irs.gov/credits-deductions/individuals/child-and-dependent-care-credit-information",
    i18n: {
      en: { title: "Child and Dependent Care Credit", desc: "Tax credit for eligible child and dependent care expenses." },
      fr: { title: "Child and Dependent Care Credit", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Child and Dependent Care Credit", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free",
    i18n: {
      en: { title: "Free File IRS", desc: "Free federal tax filing for eligible taxpayers." },
      fr: { title: "Free File IRS", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Free File IRS", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers",
    i18n: {
      en: { title: "VITA Free Tax Help", desc: "Free tax preparation help for eligible people." },
      fr: { title: "VITA Free Tax Help", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "VITA Free Tax Help", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.irs.gov/individuals/tax-counseling-for-the-elderly",
    i18n: {
      en: { title: "TCE Tax Counseling for the Elderly", desc: "Free tax help focused on older adults." },
      fr: { title: "TCE Tax Counseling for the Elderly", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "TCE Tax Counseling for the Elderly", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.dol.gov/agencies/owcp",
    i18n: {
      en: { title: "Workers Compensation State Resources", desc: "Information on workers compensation and related programs." },
      fr: { title: "Workers Compensation State Resources", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Workers Compensation State Resources", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.dol.gov/agencies/eta/dislocated-workers",
    i18n: {
      en: { title: "Dislocated Worker Program", desc: "Employment and training help after layoffs or job loss." },
      fr: { title: "Dislocated Worker Program", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Dislocated Worker Program", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.dol.gov/agencies/eta/tradeact",
    i18n: {
      en: { title: "Trade Adjustment Assistance", desc: "Help for workers affected by foreign trade." },
      fr: { title: "Trade Adjustment Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Trade Adjustment Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://oui.doleta.gov/unemploy/disaster.asp",
    i18n: {
      en: { title: "Disaster Unemployment Assistance", desc: "Unemployment help for people affected by declared disasters." },
      fr: { title: "Disaster Unemployment Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Disaster Unemployment Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.benefits.gov/benefit-finder",
    i18n: {
      en: { title: "Benefits.gov Benefit Finder", desc: "Official tool to find benefits based on your situation." },
      fr: { title: "Benefits.gov Benefit Finder", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Benefits.gov Benefit Finder", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.usa.gov/unclaimed-money",
    i18n: {
      en: { title: "Unclaimed Money Search", desc: "Find unclaimed money from government and financial sources." },
      fr: { title: "Unclaimed Money Search", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Unclaimed Money Search", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.sba.gov/funding-programs/disaster-assistance",
    i18n: {
      en: { title: "SBA Disaster Assistance Loans", desc: "Low-interest disaster loans for eligible homeowners, renters, and businesses." },
      fr: { title: "SBA Disaster Assistance Loans", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "SBA Disaster Assistance Loans", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.score.org",
    i18n: {
      en: { title: "SCORE Small Business Mentoring", desc: "Free small business mentoring and education." },
      fr: { title: "SCORE Small Business Mentoring", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "SCORE Small Business Mentoring", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.sba.gov/local-assistance/resource-partners/small-business-development-centers-sbdc",
    i18n: {
      en: { title: "Small Business Development Centers", desc: "Local small business counseling and training." },
      fr: { title: "Small Business Development Centers", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Small Business Development Centers", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.va.gov/pension/",
    i18n: {
      en: { title: "Veterans Pension", desc: "Monthly payments for eligible wartime veterans with limited income." },
      fr: { title: "Veterans Pension", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Veterans Pension", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.va.gov/disability/",
    i18n: {
      en: { title: "VA Disability Compensation", desc: "Monthly tax-free payments for eligible veterans with service-connected disabilities." },
      fr: { title: "VA Disability Compensation", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "VA Disability Compensation", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.va.gov/pension/survivors-pension/",
    i18n: {
      en: { title: "VA Survivors Pension", desc: "Monthly payments for eligible surviving spouses and children." },
      fr: { title: "VA Survivors Pension", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "VA Survivors Pension", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.va.gov/education/",
    i18n: {
      en: { title: "VA Education and Training Benefits", desc: "Education benefits for veterans, service members, and families." },
      fr: { title: "VA Education and Training Benefits", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "VA Education and Training Benefits", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.acf.hhs.gov/css",
    i18n: {
      en: { title: "Child Support Enforcement", desc: "Help locating parents and collecting child support." },
      fr: { title: "Child Support Enforcement", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Child Support Enforcement", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.acf.hhs.gov/orr/programs/cma/about",
    i18n: {
      en: { title: "Refugee Cash Assistance", desc: "Cash and medical assistance for eligible refugees and entrants." },
      fr: { title: "Refugee Cash Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Refugee Cash Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  {
    category: "Income",
    link: "https://www.usa.gov/benefits-native-americans",
    i18n: {
      en: { title: "Native American Financial Assistance", desc: "Financial assistance and services for Native American communities." },
      fr: { title: "Native American Financial Assistance", desc: "Ressource d’aide pour les ménages admissibles. Vérifiez les critères et faites une demande via le lien officiel." },
      es: { title: "Native American Financial Assistance", desc: "Recurso de asistencia para hogares elegibles. Revise los requisitos y solicite ayuda en el enlace oficial." },
    },
  },
  // ===== PROGRAMS 201-225 =====

// FOOD (5)
{
  category: "Food",
  link: "https://www.foodpantries.org",
  i18n: {
    en: { title: "Food Pantries Directory", desc: "Find local food pantries and food assistance programs." },
    fr: { title: "Répertoire des banques alimentaires", desc: "Trouvez des banques alimentaires locales et des programmes d'aide alimentaire." },
    es: { title: "Directorio de Bancos de Alimentos", desc: "Encuentre bancos de alimentos y programas de asistencia alimentaria." },
  },
},
{
  category: "Food",
  link: "https://www.mealconnect.org",
  i18n: {
    en: { title: "MealConnect", desc: "Connects surplus food resources with local communities in need." },
    fr: { title: "MealConnect", desc: "Relie les surplus alimentaires aux communautés dans le besoin." },
    es: { title: "MealConnect", desc: "Conecta excedentes de alimentos con comunidades necesitadas." },
  },
},
{
  category: "Food",
  link: "https://www.endhunger.org",
  i18n: {
    en: { title: "End Hunger Network", desc: "Programs and resources focused on hunger prevention." },
    fr: { title: "Réseau contre la faim", desc: "Programmes et ressources de prévention de la faim." },
    es: { title: "Red Contra el Hambre", desc: "Programas y recursos para prevenir el hambre." },
  },
},
{
  category: "Food",
  link: "https://www.nokidhungry.org",
  i18n: {
    en: { title: "No Kid Hungry", desc: "Programs helping children gain access to nutritious meals." },
    fr: { title: "No Kid Hungry", desc: "Programmes aidant les enfants à accéder à des repas nutritifs." },
    es: { title: "No Kid Hungry", desc: "Programas que ayudan a niños a obtener comidas nutritivas." },
  },
},
{
  category: "Food",
  link: "https://www.foodfinder.us",
  i18n: {
    en: { title: "FoodFinder", desc: "Search tool for nearby food assistance resources." },
    fr: { title: "FoodFinder", desc: "Outil de recherche d'aide alimentaire à proximité." },
    es: { title: "FoodFinder", desc: "Herramienta para encontrar ayuda alimentaria cercana." },
  },
},

// HEALTH (5)
{
  category: "Health",
  link: "https://findahealthcenter.hrsa.gov",
  i18n: {
    en: { title: "HRSA Health Center Locator", desc: "Find federally supported community health centers." },
    fr: { title: "Localisateur HRSA", desc: "Trouvez des centres de santé communautaires." },
    es: { title: "Localizador HRSA", desc: "Encuentre centros de salud comunitarios." },
  },
},
{
  category: "Health",
  link: "https://www.rxassist.org",
  i18n: {
    en: { title: "RxAssist", desc: "Medication assistance resources for qualifying patients." },
    fr: { title: "RxAssist", desc: "Ressources d'aide aux médicaments." },
    es: { title: "RxAssist", desc: "Recursos de ayuda para medicamentos." },
  },
},
{
  category: "Health",
  link: "https://www.pparx.org",
  i18n: {
    en: { title: "Partnership for Prescription Assistance", desc: "Helps patients access prescription assistance programs." },
    fr: { title: "Aide aux prescriptions", desc: "Aide à accéder aux programmes de médicaments." },
    es: { title: "Asistencia para Medicamentos", desc: "Ayuda para acceder a medicamentos." },
  },
},
{
  category: "Health",
  link: "https://www.211.org",
  i18n: {
    en: { title: "211 Health Resources", desc: "Health and wellness assistance through local 211 services." },
    fr: { title: "Ressources santé 211", desc: "Aide santé via les services 211." },
    es: { title: "Recursos de Salud 211", desc: "Ayuda de salud a través del servicio 211." },
  },
},

// HOUSING (5)
{
  category: "Housing",
  link: "https://www.hudexchange.info",
  i18n: {
    en: { title: "HUD Exchange Housing Resources", desc: "Housing and homelessness support resources." },
    fr: { title: "Ressources logement HUD", desc: "Ressources logement et lutte contre l'itinérance." },
    es: { title: "Recursos HUD", desc: "Recursos de vivienda y personas sin hogar." },
  },
},
{
  category: "Housing",
  link: "https://www.coalitionforthehomeless.org",
  i18n: {
    en: { title: "Coalition for the Homeless", desc: "Support and housing resources for homeless individuals." },
    fr: { title: "Coalition pour les sans-abri", desc: "Soutien et logement pour les sans-abri." },
    es: { title: "Coalición para Personas sin Hogar", desc: "Apoyo y vivienda para personas sin hogar." },
  },
},
{
  category: "Housing",
  link: "https://nationalhomeless.org",
  i18n: {
    en: { title: "National Coalition for the Homeless", desc: "Housing advocacy and homelessness assistance." },
    fr: { title: "Coalition nationale des sans-abri", desc: "Défense et assistance logement." },
    es: { title: "Coalición Nacional para Personas sin Hogar", desc: "Defensa y asistencia de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.rebuildingtogether.org",
  i18n: {
    en: { title: "Rebuilding Together", desc: "Home repair assistance for qualifying households." },
    fr: { title: "Rebuilding Together", desc: "Aide à la réparation de logements." },
    es: { title: "Rebuilding Together", desc: "Ayuda para reparación de viviendas." },
  },
},
{
  category: "Housing",
  link: "https://www.habitat.org",
  i18n: {
    en: { title: "Habitat for Humanity", desc: "Affordable housing and homeownership opportunities." },
    fr: { title: "Habitat pour l'Humanité", desc: "Logement abordable et accès à la propriété." },
    es: { title: "Hábitat para la Humanidad", desc: "Vivienda asequible y propiedad." },
  },
},

// UTILITIES (5)
{
  category: "Utilities",
  link: "https://www.energy.gov/eere/wap/weatherization-assistance-program",
  i18n: {
    en: { title: "Weatherization Assistance Program", desc: "Home energy efficiency assistance for eligible households." },
    fr: { title: "Programme d'isolation", desc: "Aide à l'efficacité énergétique du logement." },
    es: { title: "Programa de Climatización", desc: "Ayuda para eficiencia energética del hogar." },
  },
},
{
  category: "Utilities",
  link: "https://www.benefits.gov/benefit/623",
  i18n: {
    en: { title: "Transportation Assistance Resources", desc: "Transportation support for eligible individuals." },
    fr: { title: "Aide au transport", desc: "Soutien au transport pour les personnes admissibles." },
    es: { title: "Ayuda de Transporte", desc: "Apoyo de transporte para personas elegibles." },
  },
},
{
  category: "Utilities",
  link: "https://www.ruraldevelopment.usda.gov",
  i18n: {
    en: { title: "USDA Rural Development Utilities", desc: "Utility and infrastructure support in rural communities." },
    fr: { title: "Développement rural USDA", desc: "Soutien aux services publics ruraux." },
    es: { title: "Desarrollo Rural USDA", desc: "Apoyo a servicios públicos rurales." },
  },
},
{
  category: "Utilities",
  link: "https://www.fcc.gov/broadbandbenefit",
  i18n: {
    en: { title: "Broadband Assistance Resources", desc: "Internet affordability and connectivity resources." },
    fr: { title: "Aide Internet", desc: "Ressources pour l'accès abordable à Internet." },
    es: { title: "Ayuda de Internet", desc: "Recursos para acceso asequible a Internet." },
  },
},
{
  category: "Utilities",
  link: "https://www.usa.gov/help-with-bills",
  i18n: {
    en: { title: "Help With Bills", desc: "Government resources for utility and household bills." },
    fr: { title: "Aide aux factures", desc: "Ressources gouvernementales pour les factures." },
    es: { title: "Ayuda con Facturas", desc: "Recursos gubernamentales para facturas." },
  },
},

// EDUCATION (3)
{
  category: "Education",
  link: "https://www.edx.org",
  i18n: {
    en: { title: "edX Learning Programs", desc: "Free and low-cost educational courses and certifications." },
    fr: { title: "Cours edX", desc: "Cours et certifications gratuits ou abordables." },
    es: { title: "Cursos edX", desc: "Cursos y certificaciones gratuitos o económicos." },
  },
},
{
  category: "Education",
  link: "https://www.coursera.org",
  i18n: {
    en: { title: "Coursera Financial Aid", desc: "Financial aid opportunities for online learning." },
    fr: { title: "Aide financière Coursera", desc: "Aide financière pour les cours en ligne." },
    es: { title: "Ayuda Financiera Coursera", desc: "Ayuda financiera para cursos en línea." },
  },
},
{
  category: "Education",
  link: "https://www.literacydirectory.org",
  i18n: {
    en: { title: "National Literacy Directory", desc: "Adult education and literacy resources." },
    fr: { title: "Répertoire d'alphabétisation", desc: "Ressources d'éducation pour adultes." },
    es: { title: "Directorio de Alfabetización", desc: "Recursos educativos para adultos." },
  },
},

// INCOME (2)
{
  category: "Income",
  link: "https://www.nfcc.org",
  i18n: {
    en: { title: "National Foundation for Credit Counseling", desc: "Financial counseling and debt management assistance." },
    fr: { title: "Fondation nationale de conseil en crédit", desc: "Conseils financiers et gestion des dettes." },
    es: { title: "Fundación Nacional de Consejería Crediticia", desc: "Asesoría financiera y gestión de deudas." },
  },
},
{
  category: "Income",
  link: "https://www.operationhope.org",
  i18n: {
    en: { title: "Operation HOPE", desc: "Financial coaching, credit improvement, and economic empowerment." },
    fr: { title: "Operation HOPE", desc: "Coaching financier et amélioration du crédit." },
    es: { title: "Operation HOPE", desc: "Coaching financiero y mejora del crédito." },
  },
},
  // ===== PROGRAMS 226-250 =====

// LEGAL AID (5)
{
  category: "Income",
  link: "https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help",
  i18n: {
    en: { title: "Legal Services Corporation Legal Help", desc: "Find free civil legal aid for eligible low-income individuals and families." },
    fr: { title: "Aide juridique Legal Services Corporation", desc: "Trouvez une aide juridique civile gratuite pour les personnes et familles admissibles." },
    es: { title: "Ayuda Legal de Legal Services Corporation", desc: "Encuentre ayuda legal civil gratuita para personas y familias elegibles." },
  },
},
{
  category: "Income",
  link: "https://www.lawhelp.org",
  i18n: {
    en: { title: "LawHelp.org", desc: "Find free legal aid programs, court forms, and legal information by state." },
    fr: { title: "LawHelp.org", desc: "Trouvez des programmes d’aide juridique, formulaires et informations par État." },
    es: { title: "LawHelp.org", desc: "Encuentre ayuda legal gratuita, formularios judiciales e información por estado." },
  },
},
{
  category: "Income",
  link: "https://abafreelegalanswers.org",
  i18n: {
    en: { title: "ABA Free Legal Answers", desc: "Online legal questions answered by volunteer attorneys for eligible users." },
    fr: { title: "Réponses juridiques gratuites ABA", desc: "Questions juridiques en ligne répondues par des avocats bénévoles." },
    es: { title: "Respuestas Legales Gratuitas ABA", desc: "Preguntas legales en línea respondidas por abogados voluntarios." },
  },
},
{
  category: "Income",
  link: "https://www.nlada.org",
  i18n: {
    en: { title: "National Legal Aid & Defender Association", desc: "Legal aid and defender resources for people needing justice support." },
    fr: { title: "Association nationale d’aide juridique", desc: "Ressources d’aide juridique et de défense pour les personnes ayant besoin de soutien." },
    es: { title: "Asociación Nacional de Ayuda Legal", desc: "Recursos de ayuda legal y defensa para personas que necesitan apoyo." },
  },
},
{
  category: "Income",
  link: "https://www.justia.com/lawyers/legal-aid-and-pro-bono",
  i18n: {
    en: { title: "Justia Legal Aid & Pro Bono Directory", desc: "Directory to find legal aid and pro bono lawyers by location." },
    fr: { title: "Répertoire d’aide juridique Justia", desc: "Répertoire pour trouver une aide juridique et des avocats bénévoles par région." },
    es: { title: "Directorio de Ayuda Legal Justia", desc: "Directorio para encontrar ayuda legal y abogados pro bono por ubicación." },
  },
},

// DISABILITY ASSISTANCE (5)
{
  category: "Income",
  link: "https://choosework.ssa.gov",
  i18n: {
    en: { title: "Ticket to Work", desc: "Employment support program for people receiving Social Security disability benefits." },
    fr: { title: "Ticket to Work", desc: "Programme d’aide à l’emploi pour les bénéficiaires d’invalidité de la Sécurité sociale." },
    es: { title: "Ticket to Work", desc: "Programa de apoyo laboral para personas que reciben beneficios por discapacidad." },
  },
},
{
  category: "Health",
  link: "https://www.ndrn.org",
  i18n: {
    en: { title: "National Disability Rights Network", desc: "Protection and advocacy resources for people with disabilities." },
    fr: { title: "Réseau national des droits des personnes handicapées", desc: "Ressources de protection et de défense pour les personnes handicapées." },
    es: { title: "Red Nacional de Derechos de Discapacidad", desc: "Recursos de protección y defensa para personas con discapacidades." },
  },
},
{
  category: "Health",
  link: "https://www.easterseals.com",
  i18n: {
    en: { title: "Easterseals Disability Services", desc: "Services for people with disabilities, veterans, seniors, and families." },
    fr: { title: "Services handicap Easterseals", desc: "Services pour personnes handicapées, vétérans, aînés et familles." },
    es: { title: "Servicios de Discapacidad Easterseals", desc: "Servicios para personas con discapacidades, veteranos, adultos mayores y familias." },
  },
},
{
  category: "Health",
  link: "https://www.ilru.org/projects/cil-net/cil-center-and-association-directory",
  i18n: {
    en: { title: "Centers for Independent Living Directory", desc: "Find local independent living centers supporting people with disabilities." },
    fr: { title: "Répertoire des centres de vie autonome", desc: "Trouvez des centres locaux aidant les personnes handicapées." },
    es: { title: "Directorio de Centros de Vida Independiente", desc: "Encuentre centros locales que apoyan a personas con discapacidades." },
  },
},
{
  category: "Income",
  link: "https://www.disabilitybenefits101.org",
  i18n: {
    en: { title: "Disability Benefits 101", desc: "Benefits planning tools for people with disabilities and workers." },
    fr: { title: "Disability Benefits 101", desc: "Outils de planification des prestations pour personnes handicapées." },
    es: { title: "Disability Benefits 101", desc: "Herramientas de planificación de beneficios para personas con discapacidades." },
  },
},

// SENIOR ASSISTANCE (5)
{
  category: "Health",
  link: "https://eldercare.acl.gov",
  i18n: {
    en: { title: "Eldercare Locator", desc: "Find local services for older adults and caregivers." },
    fr: { title: "Localisateur Eldercare", desc: "Trouvez des services locaux pour les aînés et les aidants." },
    es: { title: "Localizador Eldercare", desc: "Encuentre servicios locales para adultos mayores y cuidadores." },
  },
},
{
  category: "Income",
  link: "https://www.benefitscheckup.org",
  i18n: {
    en: { title: "BenefitsCheckUp", desc: "Find benefit programs that may help older adults pay for food, medicine, housing, and more." },
    fr: { title: "BenefitsCheckUp", desc: "Trouvez des programmes aidant les aînés à payer nourriture, médicaments, logement et plus." },
    es: { title: "BenefitsCheckUp", desc: "Encuentre programas que ayudan a adultos mayores con comida, medicinas, vivienda y más." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/eta/seniors",
  i18n: {
    en: { title: "Senior Community Service Employment Program", desc: "Job training and part-time community service work for eligible older adults." },
    fr: { title: "Programme d’emploi communautaire pour aînés", desc: "Formation professionnelle et travail communautaire à temps partiel pour aînés admissibles." },
    es: { title: "Programa de Empleo Comunitario para Adultos Mayores", desc: "Capacitación laboral y trabajo comunitario parcial para adultos mayores elegibles." },
  },
},
{
  category: "Health",
  link: "https://www.ncoa.org",
  i18n: {
    en: { title: "National Council on Aging", desc: "Resources for older adults, caregivers, benefits, health, and financial security." },
    fr: { title: "Conseil national sur le vieillissement", desc: "Ressources pour aînés, aidants, santé, prestations et sécurité financière." },
    es: { title: "Consejo Nacional sobre el Envejecimiento", desc: "Recursos para adultos mayores, cuidadores, salud, beneficios y seguridad financiera." },
  },
},
{
  category: "Health",
  link: "https://acl.gov/programs/support-caregivers/national-family-caregiver-support-program",
  i18n: {
    en: { title: "National Family Caregiver Support Program", desc: "Support services for family caregivers helping older adults." },
    fr: { title: "Programme national de soutien aux aidants familiaux", desc: "Services de soutien pour les aidants familiaux des aînés." },
    es: { title: "Programa Nacional de Apoyo a Cuidadores Familiares", desc: "Servicios de apoyo para cuidadores familiares de adultos mayores." },
  },
},

// WORKFORCE & JOB TRAINING (5)
{
  category: "Education",
  link: "https://www.apprenticeship.gov",
  i18n: {
    en: { title: "Apprenticeship.gov", desc: "Find paid apprenticeship and career training opportunities." },
    fr: { title: "Apprenticeship.gov", desc: "Trouvez des apprentissages rémunérés et formations professionnelles." },
    es: { title: "Apprenticeship.gov", desc: "Encuentre aprendizajes pagados y oportunidades de capacitación laboral." },
  },
},
{
  category: "Income",
  link: "https://www.goodwill.org/jobs-training/",
  i18n: {
    en: { title: "Goodwill Jobs and Training", desc: "Job training, career support, and employment services through Goodwill." },
    fr: { title: "Emploi et formation Goodwill", desc: "Formation, soutien professionnel et services d’emploi par Goodwill." },
    es: { title: "Empleos y Capacitación Goodwill", desc: "Capacitación laboral, apoyo profesional y servicios de empleo por Goodwill." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/eta/agriculture",
  i18n: {
    en: { title: "National Farmworker Jobs Program", desc: "Employment and training services for eligible migrant and seasonal farmworkers." },
    fr: { title: "Programme d’emploi pour travailleurs agricoles", desc: "Services d’emploi et de formation pour travailleurs agricoles admissibles." },
    es: { title: "Programa Nacional de Empleo para Trabajadores Agrícolas", desc: "Servicios de empleo y capacitación para trabajadores agrícolas elegibles." },
  },
},
{
  category: "Income",
  link: "https://www.workforcegps.org",
  i18n: {
    en: { title: "WorkforceGPS", desc: "Workforce development resources, training tools, and employment program support." },
    fr: { title: "WorkforceGPS", desc: "Ressources de développement professionnel, formation et soutien emploi." },
    es: { title: "WorkforceGPS", desc: "Recursos de desarrollo laboral, capacitación y apoyo de empleo." },
  },
},

// FAMILY & CHILDCARE (5)
{
  category: "Health",
  link: "https://www.childwelfare.gov",
  i18n: {
    en: { title: "Child Welfare Information Gateway", desc: "Family support, child welfare, adoption, and safety resources." },
    fr: { title: "Portail d’information sur la protection de l’enfance", desc: "Soutien familial, protection de l’enfance, adoption et sécurité." },
    es: { title: "Portal de Información de Bienestar Infantil", desc: "Apoyo familiar, bienestar infantil, adopción y seguridad." },
  },
},
{
  category: "Health",
  link: "https://mchb.hrsa.gov/programs-impact/healthy-start",
  i18n: {
    en: { title: "Healthy Start Program", desc: "Support for pregnant women, infants, and families to improve health outcomes." },
    fr: { title: "Programme Healthy Start", desc: "Soutien aux femmes enceintes, nourrissons et familles pour améliorer la santé." },
    es: { title: "Programa Healthy Start", desc: "Apoyo para embarazadas, bebés y familias para mejorar la salud." },
  },
},
{
  category: "Food",
  link: "https://nationaldiaperbanknetwork.org",
  i18n: {
    en: { title: "National Diaper Bank Network", desc: "Find diaper assistance and basic needs support for families." },
    fr: { title: "Réseau national des banques de couches", desc: "Trouvez une aide en couches et besoins essentiels pour familles." },
    es: { title: "Red Nacional de Bancos de Pañales", desc: "Encuentre ayuda con pañales y necesidades básicas para familias." },
  },
},
{
  category: "Education",
  link: "https://parentsasteachers.org",
  i18n: {
    en: { title: "Parents as Teachers", desc: "Parent education and early childhood support programs." },
    fr: { title: "Parents as Teachers", desc: "Éducation parentale et soutien à la petite enfance." },
    es: { title: "Parents as Teachers", desc: "Educación para padres y apoyo a la primera infancia." },
  },
},
{
  category: "Education",
  link: "https://www.childcareaware.org",
  i18n: {
    en: { title: "Child Care Aware", desc: "Child care resources, referrals, and family support information." },
    fr: { title: "Child Care Aware", desc: "Ressources de garde d’enfants, orientations et soutien familial." },
    es: { title: "Child Care Aware", desc: "Recursos de cuidado infantil, referencias y apoyo familiar." },
  },
},
  // ===== PROGRAMS 251-300 =====

{
  category: "Housing",
  link: "https://www.consumerfinance.gov/housing/housing-insecurity/help-for-homeowners/",
  i18n: {
    en: { title: "CFPB Help for Homeowners", desc: "Mortgage, foreclosure prevention, and housing stability resources for homeowners." },
    fr: { title: "Aide CFPB pour propriétaires", desc: "Ressources hypothécaires, prévention saisie et stabilité du logement." },
    es: { title: "Ayuda CFPB para Propietarios", desc: "Recursos hipotecarios, prevención de ejecución hipotecaria y estabilidad de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.consumerfinance.gov/housing/housing-insecurity/help-for-renters/",
  i18n: {
    en: { title: "CFPB Help for Renters", desc: "Resources for renters facing eviction, rent problems, or housing insecurity." },
    fr: { title: "Aide CFPB pour locataires", desc: "Ressources pour locataires confrontés à expulsion ou instabilité logement." },
    es: { title: "Ayuda CFPB para Inquilinos", desc: "Recursos para inquilinos con problemas de alquiler, desalojo o vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/program_offices/housing/sfh/hcc",
  i18n: {
    en: { title: "HUD Housing Counseling Agencies", desc: "Find HUD-approved counselors for renting, buying, foreclosure, and credit help." },
    fr: { title: "Conseillers logement HUD", desc: "Trouvez des conseillers HUD pour location, achat, saisie et crédit." },
    es: { title: "Consejeros de Vivienda HUD", desc: "Encuentre consejeros HUD para alquiler, compra, ejecución hipotecaria y crédito." },
  },
},
{
  category: "Housing",
  link: "https://www.usa.gov/eviction-foreclosure",
  i18n: {
    en: { title: "Eviction and Foreclosure Help", desc: "Government guide for renters and homeowners facing eviction or foreclosure." },
    fr: { title: "Aide expulsion et saisie", desc: "Guide gouvernemental pour locataires et propriétaires en difficulté." },
    es: { title: "Ayuda con Desalojo y Ejecución", desc: "Guía del gobierno para inquilinos y propietarios en riesgo." },
  },
},
{
  category: "Housing",
  link: "https://www.va.gov/housing-assistance/disability-housing-grants/",
  i18n: {
    en: { title: "VA Disability Housing Grants", desc: "Housing grants for eligible veterans with service-connected disabilities." },
    fr: { title: "Subventions logement handicap VA", desc: "Aides au logement pour vétérans handicapés admissibles." },
    es: { title: "Subvenciones de Vivienda VA", desc: "Ayuda de vivienda para veteranos elegibles con discapacidades." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/program_offices/public_indian_housing/ih",
  i18n: {
    en: { title: "HUD Indian Housing Programs", desc: "Housing support and development resources for Native communities." },
    fr: { title: "Programmes logement autochtones HUD", desc: "Soutien au logement et développement pour communautés autochtones." },
    es: { title: "Programas de Vivienda Indígena HUD", desc: "Apoyo y desarrollo de vivienda para comunidades nativas." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/program_offices/healthy_homes",
  i18n: {
    en: { title: "HUD Healthy Homes Program", desc: "Resources to reduce home health hazards and improve housing safety." },
    fr: { title: "Programme maisons saines HUD", desc: "Ressources pour réduire les dangers domestiques et améliorer la sécurité." },
    es: { title: "Programa Hogares Saludables HUD", desc: "Recursos para reducir riesgos en el hogar y mejorar seguridad." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/program_offices/healthy_homes/healthyhomes/lead",
  i18n: {
    en: { title: "HUD Lead Hazard Control", desc: "Resources for lead-safe housing and lead hazard reduction." },
    fr: { title: "Réduction plomb HUD", desc: "Ressources pour logement sans plomb et réduction des risques." },
    es: { title: "Control de Plomo HUD", desc: "Recursos para viviendas seguras y reducción de riesgos de plomo." },
  },
},
{
  category: "Housing",
  link: "https://www.hudexchange.info/programs/hopwa/",
  i18n: {
    en: { title: "HOPWA Housing Assistance", desc: "Housing support for eligible people living with HIV/AIDS and their families." },
    fr: { title: "Aide logement HOPWA", desc: "Soutien logement pour personnes vivant avec VIH/SIDA et familles." },
    es: { title: "Asistencia de Vivienda HOPWA", desc: "Ayuda de vivienda para personas con VIH/SIDA y sus familias." },
  },
},
{
  category: "Housing",
  link: "https://www.usich.gov",
  i18n: {
    en: { title: "U.S. Interagency Council on Homelessness", desc: "Federal homelessness strategy and resources for local support systems." },
    fr: { title: "Conseil américain sur l’itinérance", desc: "Stratégies et ressources fédérales contre le sans-abrisme." },
    es: { title: "Consejo Interagencial sobre Personas sin Hogar", desc: "Estrategias y recursos federales contra la falta de vivienda." },
  },
},

{
  category: "Utilities",
  link: "https://www.usa.gov/help-with-energy-bills",
  i18n: {
    en: { title: "Help With Energy Bills", desc: "Government guide to energy bill assistance and home energy programs." },
    fr: { title: "Aide factures énergie", desc: "Guide gouvernemental pour aide énergie et programmes domestiques." },
    es: { title: "Ayuda con Facturas de Energía", desc: "Guía del gobierno para asistencia energética del hogar." },
  },
},
{
  category: "Utilities",
  link: "https://www.usa.gov/help-with-phone-internet-bills",
  i18n: {
    en: { title: "Help With Phone and Internet Bills", desc: "Find programs that help reduce phone and internet costs." },
    fr: { title: "Aide téléphone et Internet", desc: "Trouvez des programmes réduisant les coûts téléphone et Internet." },
    es: { title: "Ayuda con Teléfono e Internet", desc: "Encuentre programas para reducir costos de teléfono e Internet." },
  },
},
{
  category: "Utilities",
  link: "https://www.fcc.gov/lifeline-consumers",
  i18n: {
    en: { title: "FCC Lifeline Consumer Help", desc: "Federal phone and internet discount information for eligible households." },
    fr: { title: "Aide consommateur Lifeline FCC", desc: "Informations sur réductions téléphone et Internet pour ménages admissibles." },
    es: { title: "Ayuda Lifeline FCC", desc: "Información de descuentos de teléfono e Internet para hogares elegibles." },
  },
},
{
  category: "Utilities",
  link: "https://www.fcc.gov/acp",
  i18n: {
    en: { title: "FCC Affordable Connectivity Updates", desc: "Connectivity benefit updates and consumer information from the FCC." },
    fr: { title: "Mises à jour connectivité FCC", desc: "Informations consommateurs sur les aides de connectivité." },
    es: { title: "Actualizaciones de Conectividad FCC", desc: "Información del consumidor sobre beneficios de conectividad." },
  },
},
{
  category: "Utilities",
  link: "https://www.rd.usda.gov/programs-services/water-environmental-programs",
  i18n: {
    en: { title: "USDA Water and Environmental Programs", desc: "Water, wastewater, and environmental utility support for rural communities." },
    fr: { title: "Programmes eau USDA", desc: "Soutien eau, eaux usées et services ruraux." },
    es: { title: "Programas de Agua USDA", desc: "Apoyo de agua, alcantarillado y servicios rurales." },
  },
},
{
  category: "Utilities",
  link: "https://www.rd.usda.gov/programs-services/electric-programs",
  i18n: {
    en: { title: "USDA Electric Programs", desc: "Electric infrastructure and utility support for rural areas." },
    fr: { title: "Programmes électriques USDA", desc: "Soutien infrastructure électrique et services publics ruraux." },
    es: { title: "Programas Eléctricos USDA", desc: "Apoyo de infraestructura eléctrica para zonas rurales." },
  },
},
{
  category: "Utilities",
  link: "https://www.rd.usda.gov/programs-services/telecommunications-programs",
  i18n: {
    en: { title: "USDA Telecommunications Programs", desc: "Rural broadband and telecommunications support programs." },
    fr: { title: "Programmes télécommunications USDA", desc: "Soutien Internet rural et télécommunications." },
    es: { title: "Programas de Telecomunicaciones USDA", desc: "Apoyo de banda ancha rural y telecomunicaciones." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/scep/home-energy-rebate-programs",
  i18n: {
    en: { title: "Home Energy Rebate Programs", desc: "Energy rebates to help households improve efficiency and reduce costs." },
    fr: { title: "Programmes rabais énergie maison", desc: "Rabais énergie pour améliorer l’efficacité et réduire les coûts." },
    es: { title: "Programas de Reembolsos de Energía", desc: "Reembolsos para mejorar eficiencia y reducir costos." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/energysaver/energy-saver",
  i18n: {
    en: { title: "Energy Saver Resources", desc: "Federal energy-saving guidance to lower home utility costs." },
    fr: { title: "Ressources économies énergie", desc: "Conseils fédéraux pour réduire les factures d’énergie." },
    es: { title: "Recursos Energy Saver", desc: "Guía federal para reducir costos de energía en el hogar." },
  },
},
{
  category: "Utilities",
  link: "https://www.epa.gov/watersense",
  i18n: {
    en: { title: "EPA WaterSense", desc: "Water-saving resources that can help households reduce water costs." },
    fr: { title: "EPA WaterSense", desc: "Ressources pour économiser l’eau et réduire les coûts." },
    es: { title: "EPA WaterSense", desc: "Recursos para ahorrar agua y reducir costos." },
  },
},
{
  category: "Education",
  link: "https://www.careeronestop.org/FindTraining/Types/community-colleges.aspx",
  i18n: {
    en: { title: "Community College Finder", desc: "Find community colleges and affordable local education programs." },
    fr: { title: "Recherche collèges communautaires", desc: "Trouvez collèges communautaires et formations abordables." },
    es: { title: "Buscador de Colegios Comunitarios", desc: "Encuentre colegios comunitarios y educación local asequible." },
  },
},
{
  category: "Education",
  link: "https://www.careeronestop.org/FindTraining/Pay/find-money-for-training.aspx",
  i18n: {
    en: { title: "Find Money for Training", desc: "CareerOneStop guide to scholarships, grants, and training funds." },
    fr: { title: "Trouver aide pour formation", desc: "Guide bourses, subventions et fonds de formation." },
    es: { title: "Encontrar Dinero para Capacitación", desc: "Guía de becas, subvenciones y fondos de capacitación." },
  },
},
{
  category: "Education",
  link: "https://www.dol.gov/agencies/eta/youth/youthbuild",
  i18n: {
    en: { title: "DOL YouthBuild Program", desc: "Education and job training for young adults in high-demand fields." },
    fr: { title: "Programme YouthBuild DOL", desc: "Éducation et formation professionnelle pour jeunes adultes." },
    es: { title: "Programa YouthBuild DOL", desc: "Educación y capacitación laboral para jóvenes adultos." },
  },
},
{
  category: "Education",
  link: "https://www.dol.gov/agencies/eta/youth",
  i18n: {
    en: { title: "DOL Youth Employment Programs", desc: "Employment, education, and training resources for young people." },
    fr: { title: "Programmes emploi jeunes DOL", desc: "Ressources emploi, éducation et formation pour jeunes." },
    es: { title: "Programas de Empleo Juvenil DOL", desc: "Recursos de empleo, educación y capacitación para jóvenes." },
  },
},
{
  category: "Education",
  link: "https://www.jobcorps.gov/explore",
  i18n: {
    en: { title: "Job Corps Career Training Areas", desc: "Explore free career training options through Job Corps." },
    fr: { title: "Formations Job Corps", desc: "Explorez les options gratuites de formation professionnelle." },
    es: { title: "Áreas de Capacitación Job Corps", desc: "Explore opciones gratuitas de capacitación laboral." },
  },
},
{
  category: "Education",
  link: "https://www.usa.gov/financial-aid",
  i18n: {
    en: { title: "Financial Aid for Students", desc: "Government guide to grants, loans, scholarships, and student aid." },
    fr: { title: "Aide financière étudiants", desc: "Guide gouvernemental bourses, prêts et aide étudiante." },
    es: { title: "Ayuda Financiera para Estudiantes", desc: "Guía del gobierno sobre becas, préstamos y ayuda estudiantil." },
  },
},
{
  category: "Education",
  link: "https://www.ed.gov/grants-and-programs",
  i18n: {
    en: { title: "Department of Education Grants and Programs", desc: "Federal education grants, resources, and program information." },
    fr: { title: "Subventions et programmes Éducation", desc: "Subventions et ressources fédérales d’éducation." },
    es: { title: "Subvenciones y Programas de Educación", desc: "Subvenciones federales, recursos y programas educativos." },
  },
},
{
  category: "Education",
  link: "https://www.nld.org",
  i18n: {
    en: { title: "National Literacy Directory Search", desc: "Find literacy, GED, and adult education programs by location." },
    fr: { title: "Recherche alphabétisation nationale", desc: "Trouvez alphabétisation, GED et éducation adulte par région." },
    es: { title: "Búsqueda Nacional de Alfabetización", desc: "Encuentre alfabetización, GED y educación adulta por ubicación." },
  },
},

{
  category: "Food",
  link: "https://www.fns.usda.gov/meals4kids",
  i18n: {
    en: { title: "USDA Meals for Kids Site Finder", desc: "Find nearby meal sites for children during summer and school breaks." },
    fr: { title: "Recherche repas enfants USDA", desc: "Trouvez des sites de repas pour enfants pendant vacances scolaires." },
    es: { title: "Buscador de Comidas para Niños USDA", desc: "Encuentre sitios cercanos de comidas para niños." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/team-nutrition",
  i18n: {
    en: { title: "Team Nutrition", desc: "USDA nutrition education resources for children, families, and schools." },
    fr: { title: "Team Nutrition", desc: "Ressources USDA d’éducation nutritionnelle pour familles et écoles." },
    es: { title: "Team Nutrition", desc: "Recursos USDA de educación nutricional para familias y escuelas." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/cn",
  i18n: {
    en: { title: "USDA Child Nutrition Programs", desc: "Federal child nutrition programs supporting meals for children." },
    fr: { title: "Programmes nutrition enfants USDA", desc: "Programmes fédéraux de repas et nutrition pour enfants." },
    es: { title: "Programas de Nutrición Infantil USDA", desc: "Programas federales de comidas y nutrición para niños." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/snap/retailer",
  i18n: {
    en: { title: "SNAP Retailer Locator Resources", desc: "Information for finding and understanding SNAP-authorized retailers." },
    fr: { title: "Ressources détaillants SNAP", desc: "Informations sur les détaillants autorisés SNAP." },
    es: { title: "Recursos de Tiendas SNAP", desc: "Información sobre tiendas autorizadas para SNAP." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/snap/online-purchasing-pilot",
  i18n: {
    en: { title: "SNAP Online Purchasing", desc: "Information about using SNAP benefits for online grocery purchases." },
    fr: { title: "Achats en ligne SNAP", desc: "Informations sur l’utilisation de SNAP pour achats alimentaires en ligne." },
    es: { title: "Compras en Línea SNAP", desc: "Información para usar SNAP en compras de comida en línea." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/wic/wic-families",
  i18n: {
    en: { title: "WIC for Families", desc: "Nutrition and health support information for WIC families." },
    fr: { title: "WIC pour familles", desc: "Informations nutrition et santé pour familles WIC." },
    es: { title: "WIC para Familias", desc: "Información de nutrición y salud para familias WIC." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/cn/nutrition-education",
  i18n: {
    en: { title: "Child Nutrition Education", desc: "Nutrition education resources for children and school meal programs." },
    fr: { title: "Éducation nutrition enfants", desc: "Ressources nutritionnelles pour enfants et repas scolaires." },
    es: { title: "Educación Nutricional Infantil", desc: "Recursos de nutrición para niños y comidas escolares." },
  },
},
{
  category: "Food",
  link: "https://www.hungerfreeamerica.org/en-us/usda-national-hunger-hotline",
  i18n: {
    en: { title: "Hunger Free America Hotline", desc: "Food assistance hotline support and local hunger relief connections." },
    fr: { title: "Ligne aide Hunger Free America", desc: "Soutien alimentaire et orientation vers ressources locales." },
    es: { title: "Línea Hunger Free America", desc: "Apoyo de alimentos y conexiones con recursos locales." },
  },
},
{
  category: "Food",
  link: "https://www.nutrition.gov/topics/food-security-and-access",
  i18n: {
    en: { title: "Nutrition.gov Food Security Resources", desc: "Federal food access, nutrition, and food security information." },
    fr: { title: "Ressources sécurité alimentaire Nutrition.gov", desc: "Informations fédérales sur accès alimentaire et nutrition." },
    es: { title: "Recursos de Seguridad Alimentaria Nutrition.gov", desc: "Información federal de acceso a alimentos y nutrición." },
  },
},
{
  category: "Food",
  link: "https://www.nutrition.gov/topics/shopping-cooking-and-meal-planning",
  i18n: {
    en: { title: "Meal Planning on a Budget", desc: "Nutrition.gov resources for affordable cooking and meal planning." },
    fr: { title: "Planification repas budget", desc: "Ressources pour cuisiner et planifier à petit budget." },
    es: { title: "Planificación de Comidas Económicas", desc: "Recursos para cocinar y planificar comidas con bajo presupuesto." },
  },
},

{
  category: "Income",
  link: "https://www.consumerfinance.gov/consumer-tools/debt-collection/",
  i18n: {
    en: { title: "CFPB Debt Collection Help", desc: "Tools and guidance for dealing with debt collectors and protecting your rights." },
    fr: { title: "Aide CFPB recouvrement dette", desc: "Outils pour gérer les agents de recouvrement et protéger vos droits." },
    es: { title: "Ayuda CFPB con Cobro de Deudas", desc: "Herramientas para tratar con cobradores y proteger sus derechos." },
  },
},
{
  category: "Income",
  link: "https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/",
  i18n: {
    en: { title: "CFPB Credit Reports and Scores", desc: "Resources to understand credit reports, scores, and credit improvement." },
    fr: { title: "Rapports et scores crédit CFPB", desc: "Ressources pour comprendre et améliorer le crédit." },
    es: { title: "Reportes y Puntajes de Crédito CFPB", desc: "Recursos para entender y mejorar el crédito." },
  },
},
{
  category: "Income",
  link: "https://www.consumerfinance.gov/consumer-tools/auto-loans/",
  i18n: {
    en: { title: "CFPB Auto Loan Help", desc: "Tools for understanding auto loans, payments, and consumer protections." },
    fr: { title: "Aide prêts auto CFPB", desc: "Outils pour comprendre prêts auto, paiements et protections." },
    es: { title: "Ayuda CFPB con Préstamos de Auto", desc: "Herramientas para entender préstamos de auto y pagos." },
  },
},
{
  category: "Income",
  link: "https://www.consumerfinance.gov/consumer-tools/student-loans/",
  i18n: {
    en: { title: "CFPB Student Loan Help", desc: "Resources for managing student loans, repayment, and financial decisions." },
    fr: { title: "Aide prêts étudiants CFPB", desc: "Ressources pour gérer prêts étudiants et remboursement." },
    es: { title: "Ayuda CFPB con Préstamos Estudiantiles", desc: "Recursos para manejar préstamos estudiantiles y pagos." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/taxes",
  i18n: {
    en: { title: "USA.gov Tax Help", desc: "Government guide to tax filing, credits, refunds, and tax assistance." },
    fr: { title: "Aide impôts USA.gov", desc: "Guide gouvernemental déclaration, crédits, remboursements et aide fiscale." },
    es: { title: "Ayuda de Impuestos USA.gov", desc: "Guía del gobierno sobre impuestos, créditos y reembolsos." },
  },
},
{
  category: "Income",
  link: "https://www.taxpayeradvocate.irs.gov",
  i18n: {
    en: { title: "Taxpayer Advocate Service", desc: "Independent IRS help for taxpayers facing unresolved tax problems." },
    fr: { title: "Service défense contribuables", desc: "Aide indépendante IRS pour problèmes fiscaux non résolus." },
    es: { title: "Servicio del Defensor del Contribuyente", desc: "Ayuda independiente del IRS para problemas fiscales." },
  },
},
{
  category: "Income",
  link: "https://www.irs.gov/credits-deductions/individuals/education-credits-aotc-llc",
  i18n: {
    en: { title: "IRS Education Credits", desc: "Tax credits for eligible education expenses and students." },
    fr: { title: "Crédits impôt éducation IRS", desc: "Crédits fiscaux pour dépenses d’éducation admissibles." },
    es: { title: "Créditos de Educación IRS", desc: "Créditos fiscales para gastos educativos elegibles." },
  },
},
{
  category: "Income",
  link: "https://www.irs.gov/credits-deductions/individuals/savers-credit",
  i18n: {
    en: { title: "Saver’s Credit", desc: "Tax credit for eligible retirement savings contributions." },
    fr: { title: "Crédit épargne retraite", desc: "Crédit fiscal pour contributions retraite admissibles." },
    es: { title: "Crédito del Ahorrador", desc: "Crédito fiscal por contribuciones de jubilación elegibles." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/financial-hardship",
  i18n: {
    en: { title: "Financial Hardship Help", desc: "Government guide to resources for bills, debt, unemployment, and housing hardship." },
    fr: { title: "Aide difficulté financière", desc: "Guide ressources factures, dette, chômage et logement." },
    es: { title: "Ayuda por Dificultad Financiera", desc: "Guía de recursos para facturas, deudas, desempleo y vivienda." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/disability-benefits",
  i18n: {
    en: { title: "Disability Benefits Guide", desc: "Government guide to disability benefits, applications, and support programs." },
    fr: { title: "Guide prestations handicap", desc: "Guide gouvernemental prestations handicap et demandes." },
    es: { title: "Guía de Beneficios por Discapacidad", desc: "Guía del gobierno sobre beneficios y solicitudes por discapacidad." },
  },
},
  // ===== PROGRAMS 301-350 =====

{
  category: "Health",
  link: "https://www.mhanational.org/finding-help",
  i18n: {
    en: { title: "Mental Health America Find Help", desc: "Mental health resources, support tools, and help finding care." },
    fr: { title: "Aide Mental Health America", desc: "Ressources santé mentale et outils pour trouver de l’aide." },
    es: { title: "Ayuda Mental Health America", desc: "Recursos de salud mental y apoyo para encontrar atención." },
  },
},
{
  category: "Health",
  link: "https://www.nimh.nih.gov/health/find-help",
  i18n: {
    en: { title: "NIMH Find Help for Mental Health", desc: "Federal mental health information and help-finding resources." },
    fr: { title: "Aide santé mentale NIMH", desc: "Informations fédérales pour trouver de l’aide en santé mentale." },
    es: { title: "Ayuda de Salud Mental NIMH", desc: "Información federal para encontrar ayuda de salud mental." },
  },
},
{
  category: "Health",
  link: "https://www.samhsa.gov/find-help/national-helpline",
  i18n: {
    en: { title: "SAMHSA National Helpline", desc: "Confidential treatment referral and information service for mental health and substance use." },
    fr: { title: "Ligne nationale SAMHSA", desc: "Orientation confidentielle pour santé mentale et dépendance." },
    es: { title: "Línea Nacional SAMHSA", desc: "Servicio confidencial de referencia para salud mental y sustancias." },
  },
},
{
  category: "Health",
  link: "https://www.samhsa.gov/find-help/disaster-distress-helpline",
  i18n: {
    en: { title: "Disaster Distress Helpline", desc: "Crisis counseling for people experiencing disaster-related emotional distress." },
    fr: { title: "Ligne détresse catastrophe", desc: "Soutien de crise après catastrophes." },
    es: { title: "Línea de Angustia por Desastres", desc: "Apoyo emocional por estrés relacionado con desastres." },
  },
},
{
  category: "Health",
  link: "https://www.hrsa.gov/get-health-care/affordable",
  i18n: {
    en: { title: "HRSA Affordable Health Care", desc: "Federal resources for affordable health care and clinics." },
    fr: { title: "Soins abordables HRSA", desc: "Ressources fédérales pour soins et cliniques abordables." },
    es: { title: "Atención Médica Asequible HRSA", desc: "Recursos federales para clínicas y atención asequible." },
  },
},
{
  category: "Health",
  link: "https://www.hrsa.gov/get-health-care/affordable/health-centers",
  i18n: {
    en: { title: "HRSA Health Center Program", desc: "Health center program information for affordable community care." },
    fr: { title: "Programme centres santé HRSA", desc: "Informations sur soins communautaires abordables." },
    es: { title: "Programa de Centros de Salud HRSA", desc: "Información sobre atención comunitaria asequible." },
  },
},
{
  category: "Health",
  link: "https://www.cdc.gov/diabetes/programs/stateandlocal/index.html",
  i18n: {
    en: { title: "CDC Diabetes State Programs", desc: "Diabetes prevention and management resources through state programs." },
    fr: { title: "Programmes diabète CDC", desc: "Prévention et gestion du diabète par programmes d’État." },
    es: { title: "Programas Estatales de Diabetes CDC", desc: "Prevención y manejo de diabetes por programas estatales." },
  },
},
{
  category: "Health",
  link: "https://www.cdc.gov/tobacco/campaign/tips/quit-smoking/index.html",
  i18n: {
    en: { title: "CDC Quit Smoking Resources", desc: "Free resources and support to help people stop smoking." },
    fr: { title: "Ressources arrêt tabac CDC", desc: "Aide gratuite pour arrêter de fumer." },
    es: { title: "Recursos CDC para Dejar de Fumar", desc: "Ayuda gratuita para dejar de fumar." },
  },
},
{
  category: "Health",
  link: "https://www.cancer.org/support-programs-and-services.html",
  i18n: {
    en: { title: "American Cancer Society Support Programs", desc: "Support services for people facing cancer and their families." },
    fr: { title: "Soutien American Cancer Society", desc: "Services de soutien pour personnes touchées par le cancer." },
    es: { title: "Apoyo American Cancer Society", desc: "Servicios de apoyo para personas con cáncer y familias." },
  },
},
{
  category: "Health",
  link: "https://www.komen.org/support-resources/",
  i18n: {
    en: { title: "Susan G. Komen Support Resources", desc: "Breast cancer support, education, and patient resources." },
    fr: { title: "Ressources Susan G. Komen", desc: "Soutien et éducation cancer du sein." },
    es: { title: "Recursos Susan G. Komen", desc: "Apoyo y educación sobre cáncer de mama." },
  },
},

{
  category: "Housing",
  link: "https://www.hud.gov/topics/avoiding_foreclosure",
  i18n: {
    en: { title: "HUD Avoiding Foreclosure", desc: "Foreclosure prevention information and housing counseling resources." },
    fr: { title: "Éviter saisie HUD", desc: "Informations prévention saisie et conseil logement." },
    es: { title: "Evitar Ejecución Hipotecaria HUD", desc: "Información y consejería para prevenir ejecución hipotecaria." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/rental_assistance",
  i18n: {
    en: { title: "HUD Rental Assistance Overview", desc: "Federal guide to rental assistance and affordable housing options." },
    fr: { title: "Aide locative HUD aperçu", desc: "Guide fédéral d’aide au loyer et logement abordable." },
    es: { title: "Resumen de Asistencia de Alquiler HUD", desc: "Guía federal de ayuda de alquiler y vivienda asequible." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/buying_a_home",
  i18n: {
    en: { title: "HUD Buying a Home", desc: "Homebuyer education and affordable homeownership resources." },
    fr: { title: "Acheter maison HUD", desc: "Éducation acheteurs et ressources propriété abordable." },
    es: { title: "Comprar Casa HUD", desc: "Educación para compradores y recursos de propiedad asequible." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/home_improvements",
  i18n: {
    en: { title: "HUD Home Improvements", desc: "Home repair, improvement, and safety resources for homeowners." },
    fr: { title: "Améliorations maison HUD", desc: "Réparations, améliorations et sécurité du logement." },
    es: { title: "Mejoras del Hogar HUD", desc: "Reparación, mejoras y seguridad de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/information_for_disabled_persons",
  i18n: {
    en: { title: "HUD Housing for Disabled Persons", desc: "Housing rights and assistance information for people with disabilities." },
    fr: { title: "Logement HUD personnes handicapées", desc: "Droits et aide logement pour personnes handicapées." },
    es: { title: "Vivienda HUD para Personas con Discapacidad", desc: "Derechos y ayuda de vivienda para personas con discapacidades." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/information_for_senior_citizens",
  i18n: {
    en: { title: "HUD Housing for Seniors", desc: "Housing information and assistance resources for older adults." },
    fr: { title: "Logement HUD pour aînés", desc: "Informations et aides logement pour personnes âgées." },
    es: { title: "Vivienda HUD para Adultos Mayores", desc: "Información y ayuda de vivienda para adultos mayores." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/homelessness",
  i18n: {
    en: { title: "HUD Homelessness Resources", desc: "Federal resources for homelessness prevention and shelter support." },
    fr: { title: "Ressources sans-abri HUD", desc: "Ressources prévention sans-abrisme et refuges." },
    es: { title: "Recursos HUD para Personas sin Hogar", desc: "Prevención y apoyo de refugio." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/program_offices/fair_housing_equal_opp",
  i18n: {
    en: { title: "HUD Fair Housing Help", desc: "Fair housing rights, discrimination help, and complaint resources." },
    fr: { title: "Aide logement équitable HUD", desc: "Droits logement et plaintes discrimination." },
    es: { title: "Ayuda de Vivienda Justa HUD", desc: "Derechos de vivienda y quejas por discriminación." },
  },
},
{
  category: "Housing",
  link: "https://www.fanniemae.com/education",
  i18n: {
    en: { title: "Fannie Mae Homebuyer Education", desc: "Homebuyer education and mortgage readiness resources." },
    fr: { title: "Éducation acheteurs Fannie Mae", desc: "Préparation achat maison et hypothèque." },
    es: { title: "Educación para Compradores Fannie Mae", desc: "Preparación para compra de vivienda e hipoteca." },
  },
},
{
  category: "Housing",
  link: "https://myhome.freddiemac.com",
  i18n: {
    en: { title: "Freddie Mac My Home", desc: "Homebuying, renting, mortgage, and housing education resources." },
    fr: { title: "Freddie Mac My Home", desc: "Ressources achat, location et hypothèque." },
    es: { title: "Freddie Mac My Home", desc: "Recursos de compra, alquiler e hipoteca." },
  },
},

{
  category: "Utilities",
  link: "https://www.energy.gov/communitysolar/community-solar",
  i18n: {
    en: { title: "Community Solar Resources", desc: "Information about community solar options that may reduce energy costs." },
    fr: { title: "Ressources solaire communautaire", desc: "Options solaires communautaires pour réduire coûts énergie." },
    es: { title: "Recursos de Solar Comunitaria", desc: "Opciones solares comunitarias para reducir costos." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/scep/slsc",
  i18n: {
    en: { title: "State and Local Solution Center", desc: "Energy efficiency resources for state and local programs." },
    fr: { title: "Centre solutions énergie locales", desc: "Ressources efficacité énergétique locales et d’État." },
    es: { title: "Centro de Soluciones Estatales y Locales", desc: "Recursos de eficiencia energética." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/scep/low-income-community-energy-solutions",
  i18n: {
    en: { title: "Low-Income Community Energy Solutions", desc: "Energy resources focused on low-income communities." },
    fr: { title: "Solutions énergie faible revenu", desc: "Ressources énergie pour communautés à faible revenu." },
    es: { title: "Soluciones Energéticas para Bajos Ingresos", desc: "Recursos de energía para comunidades de bajos ingresos." },
  },
},
{
  category: "Utilities",
  link: "https://www.epa.gov/green-power-markets",
  i18n: {
    en: { title: "EPA Green Power Resources", desc: "Information about cleaner energy choices and community energy programs." },
    fr: { title: "Ressources énergie verte EPA", desc: "Informations sur choix énergie propre." },
    es: { title: "Recursos de Energía Verde EPA", desc: "Información sobre energía limpia." },
  },
},
{
  category: "Utilities",
  link: "https://www.epa.gov/indoor-air-quality-iaq",
  i18n: {
    en: { title: "EPA Indoor Air Quality Help", desc: "Home air quality and safety information for healthier housing." },
    fr: { title: "Qualité air intérieur EPA", desc: "Information sécurité et air sain à domicile." },
    es: { title: "Calidad del Aire Interior EPA", desc: "Información para hogares más saludables." },
  },
},
{
  category: "Utilities",
  link: "https://www.epa.gov/safewater",
  i18n: {
    en: { title: "EPA Safe Drinking Water", desc: "Drinking water safety resources and consumer information." },
    fr: { title: "Eau potable sûre EPA", desc: "Ressources sécurité eau potable." },
    es: { title: "Agua Potable Segura EPA", desc: "Recursos de seguridad del agua potable." },
  },
},
{
  category: "Utilities",
  link: "https://www.fcc.gov/general/tribal",
  i18n: {
    en: { title: "FCC Tribal Broadband Resources", desc: "Connectivity and broadband resources for Tribal communities." },
    fr: { title: "Ressources Internet tribal FCC", desc: "Connectivité pour communautés tribales." },
    es: { title: "Recursos de Banda Ancha Tribal FCC", desc: "Conectividad para comunidades tribales." },
  },
},
{
  category: "Utilities",
  link: "https://www.fcc.gov/consumers/guides/telephone-bill-cramming",
  i18n: {
    en: { title: "FCC Phone Bill Protection", desc: "Consumer help for unwanted charges on phone bills." },
    fr: { title: "Protection facture téléphone FCC", desc: "Aide contre frais non désirés." },
    es: { title: "Protección de Facturas FCC", desc: "Ayuda contra cargos no deseados." },
  },
},
{
  category: "Utilities",
  link: "https://www.fcc.gov/consumers/guides/telecommunications-relay-service-trs",
  i18n: {
    en: { title: "Telecommunications Relay Service", desc: "Phone communication support for people with hearing or speech disabilities." },
    fr: { title: "Service relais télécommunications", desc: "Soutien téléphonique pour handicap auditif ou parole." },
    es: { title: "Servicio de Retransmisión de Telecomunicaciones", desc: "Apoyo telefónico para discapacidad auditiva o del habla." },
  },
},
{
  category: "Utilities",
  link: "https://www.fcc.gov/consumers/guides/emergency-broadband-benefit",
  i18n: {
    en: { title: "Emergency Broadband Benefit Archive", desc: "Consumer information about emergency broadband assistance history." },
    fr: { title: "Archive aide Internet urgence", desc: "Informations consommateur sur aide Internet d’urgence." },
    es: { title: "Archivo Beneficio de Banda Ancha", desc: "Información de asistencia de internet de emergencia." },
  },
},
{
  category: "Education",
  link: "https://studentaid.gov/borrower-defense/",
  i18n: {
    en: { title: "Borrower Defense to Repayment", desc: "Student loan discharge help for eligible school misconduct claims." },
    fr: { title: "Défense emprunteur remboursement", desc: "Aide annulation prêts en cas de faute école." },
    es: { title: "Defensa del Prestatario", desc: "Ayuda para descarga de préstamos por conducta escolar." },
  },
},
{
  category: "Education",
  link: "https://studentaid.gov/manage-loans/forgiveness-cancellation/disability-discharge",
  i18n: {
    en: { title: "Total and Permanent Disability Discharge", desc: "Student loan discharge for eligible borrowers with total and permanent disability." },
    fr: { title: "Décharge invalidité totale permanente", desc: "Annulation prêts étudiants pour invalidité admissible." },
    es: { title: "Descarga por Discapacidad Total", desc: "Cancelación de préstamos por discapacidad elegible." },
  },
},
{
  category: "Education",
  link: "https://www.ed.gov/about/ed-offices/oese",
  i18n: {
    en: { title: "Office of Elementary and Secondary Education", desc: "Federal education resources for schools, students, and families." },
    fr: { title: "Bureau éducation primaire secondaire", desc: "Ressources fédérales pour élèves et familles." },
    es: { title: "Oficina de Educación Primaria y Secundaria", desc: "Recursos federales para estudiantes y familias." },
  },
},
{
  category: "Education",
  link: "https://www.ed.gov/about/ed-offices/ocr",
  i18n: {
    en: { title: "Education Civil Rights Help", desc: "Support for education discrimination complaints and student rights." },
    fr: { title: "Droits civils éducation", desc: "Aide plaintes discrimination scolaire." },
    es: { title: "Ayuda de Derechos Civiles Educación", desc: "Apoyo para quejas de discriminación escolar." },
  },
},
{
  category: "Education",
  link: "https://www.ed.gov/laws-and-policy/individuals-disabilities",
  i18n: {
    en: { title: "Education Disability Rights", desc: "Federal education rights and resources for students with disabilities." },
    fr: { title: "Droits handicap éducation", desc: "Droits scolaires pour élèves handicapés." },
    es: { title: "Derechos Educativos de Discapacidad", desc: "Recursos para estudiantes con discapacidades." },
  },
},
{
  category: "Education",
  link: "https://www.ed.gov/grants-and-programs/formula-grants/special-populations/idea",
  i18n: {
    en: { title: "IDEA Special Education Program", desc: "Federal special education support for children with disabilities." },
    fr: { title: "Programme éducation spécialisée IDEA", desc: "Soutien éducation spécialisée pour enfants handicapés." },
    es: { title: "Programa IDEA Educación Especial", desc: "Apoyo educativo para niños con discapacidades." },
  },
},
{
  category: "Education",
  link: "https://www.ed.gov/grants-and-programs/formula-grants/special-populations/education-homeless-children-and-youths",
  i18n: {
    en: { title: "Education for Homeless Children and Youth", desc: "School support resources for children and youth experiencing homelessness." },
    fr: { title: "Éducation enfants sans-abri", desc: "Soutien scolaire pour enfants et jeunes sans logement." },
    es: { title: "Educación para Niños sin Hogar", desc: "Apoyo escolar para jóvenes sin vivienda." },
  },
},
{
  category: "Education",
  link: "https://www.ed.gov/grants-and-programs/grants-special-populations/english-language-acquisition",
  i18n: {
    en: { title: "English Language Acquisition Programs", desc: "Federal resources supporting English learners and multilingual students." },
    fr: { title: "Programmes apprentissage anglais", desc: "Soutien aux élèves apprenant l’anglais." },
    es: { title: "Programas de Aprendizaje de Inglés", desc: "Apoyo a estudiantes multilingües." },
  },
},

{
  category: "Income",
  link: "https://www.dol.gov/agencies/vets",
  i18n: {
    en: { title: "Veterans Employment and Training Service", desc: "Employment resources for veterans, service members, and spouses." },
    fr: { title: "Service emploi vétérans", desc: "Ressources emploi pour vétérans et conjoints." },
    es: { title: "Servicio de Empleo para Veteranos", desc: "Recursos laborales para veteranos y cónyuges." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/vets/programs",
  i18n: {
    en: { title: "DOL VETS Programs", desc: "Veteran workforce programs and employment support services." },
    fr: { title: "Programmes emploi vétérans DOL", desc: "Soutien travail pour vétérans." },
    es: { title: "Programas DOL para Veteranos", desc: "Apoyo laboral para veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.careeronestop.org/Veterans/default.aspx",
  i18n: {
    en: { title: "CareerOneStop Veterans Resources", desc: "Career, training, and employment resources for veterans." },
    fr: { title: "Ressources vétérans CareerOneStop", desc: "Carrière, formation et emploi pour vétérans." },
    es: { title: "Recursos para Veteranos CareerOneStop", desc: "Carrera, capacitación y empleo para veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.careeronestop.org/WorkerReEmployment/default.aspx",
  i18n: {
    en: { title: "Worker ReEmployment Resources", desc: "Help for laid-off workers, job seekers, and career changers." },
    fr: { title: "Ressources retour emploi", desc: "Aide pour travailleurs licenciés et chercheurs emploi." },
    es: { title: "Recursos de Reempleo", desc: "Ayuda para trabajadores despedidos y buscadores de empleo." },
  },
},
{
  category: "Income",
  link: "https://www.careeronestop.org/ResourcesFor/EntryLevelWorkers/entry-level-workers.aspx",
  i18n: {
    en: { title: "Entry-Level Worker Resources", desc: "Career tools and job resources for new workers." },
    fr: { title: "Ressources travailleurs débutants", desc: "Outils carrière pour nouveaux travailleurs." },
    es: { title: "Recursos para Trabajadores Principiantes", desc: "Herramientas laborales para nuevos trabajadores." },
  },
},
{
  category: "Income",
  link: "https://www.careeronestop.org/ResourcesFor/OlderWorkers/older-workers.aspx",
  i18n: {
    en: { title: "Older Worker Career Resources", desc: "Job search and career resources for older workers." },
    fr: { title: "Ressources travailleurs âgés", desc: "Aide emploi pour travailleurs plus âgés." },
    es: { title: "Recursos para Trabajadores Mayores", desc: "Ayuda laboral para trabajadores mayores." },
  },
},
{
  category: "Income",
  link: "https://www.careeronestop.org/ResourcesFor/WorkersWithDisabilities/workers-with-disabilities.aspx",
  i18n: {
    en: { title: "Workers With Disabilities Resources", desc: "Career and employment support for workers with disabilities." },
    fr: { title: "Ressources travailleurs handicapés", desc: "Soutien carrière pour travailleurs handicapés." },
    es: { title: "Recursos para Trabajadores con Discapacidades", desc: "Apoyo laboral para trabajadores con discapacidades." },
  },
},
{
  category: "Income",
  link: "https://www.careeronestop.org/ResourcesFor/ExOffenders/ex-offenders.aspx",
  i18n: {
    en: { title: "Reentry Employment Resources", desc: "Job search and career resources for people returning from incarceration." },
    fr: { title: "Ressources emploi réinsertion", desc: "Aide emploi après incarcération." },
    es: { title: "Recursos de Reintegración Laboral", desc: "Ayuda laboral para personas que regresan de encarcelamiento." },
  },
},
{
  category: "Income",
  link: "https://www.careeronestop.org/ResourcesFor/Veteran/veteran.aspx",
  i18n: {
    en: { title: "Veteran Career Transition Help", desc: "Career transition tools and job search resources for veterans." },
    fr: { title: "Transition carrière vétérans", desc: "Outils de transition professionnelle pour vétérans." },
    es: { title: "Transición Profesional para Veteranos", desc: "Herramientas de carrera para veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/american-job-centers.aspx",
  i18n: {
    en: { title: "American Job Centers Finder", desc: "Find local American Job Centers for employment and training support." },
    fr: { title: "Recherche American Job Centers", desc: "Trouvez centres locaux pour emploi et formation." },
    es: { title: "Buscador de American Job Centers", desc: "Encuentre centros locales de empleo y capacitación." },
  },
},
  // ===== PROGRAMS 351-400 =====

{
  category: "Health",
  link: "https://www.caregiver.va.gov",
  i18n: {
    en: { title: "VA Caregiver Support Program", desc: "Support, resources, and services for caregivers of eligible veterans." },
    fr: { title: "Programme de soutien aux aidants VA", desc: "Soutien et ressources pour aidants de vétérans admissibles." },
    es: { title: "Programa de Apoyo a Cuidadores VA", desc: "Apoyo y recursos para cuidadores de veteranos elegibles." },
  },
},
{
  category: "Health",
  link: "https://www.vetcenter.va.gov",
  i18n: {
    en: { title: "Vet Center Services", desc: "Counseling and support services for veterans, service members, and families." },
    fr: { title: "Services Vet Center", desc: "Conseils et soutien pour vétérans, militaires et familles." },
    es: { title: "Servicios Vet Center", desc: "Consejería y apoyo para veteranos, militares y familias." },
  },
},
{
  category: "Health",
  link: "https://www.veteranscrisisline.net",
  i18n: {
    en: { title: "Veterans Crisis Line", desc: "24/7 confidential crisis support for veterans and loved ones." },
    fr: { title: "Ligne de crise vétérans", desc: "Soutien confidentiel 24/7 pour vétérans et proches." },
    es: { title: "Línea de Crisis para Veteranos", desc: "Apoyo confidencial 24/7 para veteranos y familias." },
  },
},
{
  category: "Education",
  link: "https://www.va.gov/careers-employment/education-and-career-counseling/",
  i18n: {
    en: { title: "VA Education and Career Counseling", desc: "Career guidance and education counseling for eligible veterans and dependents." },
    fr: { title: "Conseil carrière et éducation VA", desc: "Orientation carrière et éducation pour vétérans et familles." },
    es: { title: "Consejería Educativa y Profesional VA", desc: "Orientación educativa y profesional para veteranos elegibles." },
  },
},
{
  category: "Income",
  link: "https://www.va.gov/careers-employment/vocational-rehabilitation/",
  i18n: {
    en: { title: "Veteran Readiness and Employment", desc: "Employment, training, and independent living help for eligible veterans." },
    fr: { title: "Préparation et emploi vétérans", desc: "Aide emploi, formation et autonomie pour vétérans." },
    es: { title: "Preparación y Empleo para Veteranos", desc: "Ayuda de empleo, capacitación y vida independiente." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/vets/programs/hvrp",
  i18n: {
    en: { title: "Homeless Veterans Reintegration Program", desc: "Employment support for veterans experiencing or at risk of homelessness." },
    fr: { title: "Réinsertion vétérans sans-abri", desc: "Soutien emploi pour vétérans sans logement ou à risque." },
    es: { title: "Reintegración de Veteranos sin Hogar", desc: "Apoyo laboral para veteranos sin hogar o en riesgo." },
  },
},
{
  category: "Health",
  link: "https://www.prevention.va.gov",
  i18n: {
    en: { title: "VA Preventive Health Resources", desc: "Wellness, prevention, and health education resources for veterans." },
    fr: { title: "Ressources prévention santé VA", desc: "Bien-être, prévention et éducation santé pour vétérans." },
    es: { title: "Recursos Preventivos de Salud VA", desc: "Bienestar, prevención y educación de salud para veteranos." },
  },
},
{
  category: "Health",
  link: "https://www.mentalhealth.va.gov",
  i18n: {
    en: { title: "VA Mental Health Services", desc: "Mental health care and support services for veterans." },
    fr: { title: "Services santé mentale VA", desc: "Soins et soutien en santé mentale pour vétérans." },
    es: { title: "Servicios de Salud Mental VA", desc: "Atención y apoyo de salud mental para veteranos." },
  },
},
{
  category: "Education",
  link: "https://www.va.gov/education/about-gi-bill-benefits/",
  i18n: {
    en: { title: "GI Bill Education Benefits", desc: "Education and training benefits for veterans, service members, and families." },
    fr: { title: "Avantages éducatifs GI Bill", desc: "Aide éducation et formation pour vétérans et familles." },
    es: { title: "Beneficios Educativos GI Bill", desc: "Educación y capacitación para veteranos y familias." },
  },
},
{
  category: "Health",
  link: "https://www.va.gov/geriatrics/",
  i18n: {
    en: { title: "VA Geriatrics and Extended Care", desc: "Long-term care, caregiver, and senior health resources for veterans." },
    fr: { title: "Soins gériatriques VA", desc: "Soins longue durée et ressources seniors pour vétérans." },
    es: { title: "Geriatría y Cuidado Extendido VA", desc: "Cuidado prolongado y recursos para veteranos mayores." },
  },
},

{
  category: "Health",
  link: "https://acl.gov/programs/aging-and-disability-networks/aging-and-disability-resource-centers",
  i18n: {
    en: { title: "Aging and Disability Resource Centers", desc: "Local help connecting older adults and people with disabilities to services." },
    fr: { title: "Centres ressources vieillissement handicap", desc: "Aide locale pour aînés et personnes handicapées." },
    es: { title: "Centros de Recursos para Envejecimiento y Discapacidad", desc: "Ayuda local para adultos mayores y personas con discapacidades." },
  },
},
{
  category: "Health",
  link: "https://acl.gov/programs/assistive-technology",
  i18n: {
    en: { title: "Assistive Technology Programs", desc: "Assistive technology resources for people with disabilities and older adults." },
    fr: { title: "Programmes technologie d’assistance", desc: "Ressources technologiques pour handicap et vieillissement." },
    es: { title: "Programas de Tecnología Asistiva", desc: "Recursos tecnológicos para personas con discapacidades." },
  },
},
{
  category: "Income",
  link: "https://askjan.org",
  i18n: {
    en: { title: "Job Accommodation Network", desc: "Workplace accommodation guidance for workers with disabilities and employers." },
    fr: { title: "Réseau adaptation emploi", desc: "Conseils d’adaptation au travail pour handicap." },
    es: { title: "Red de Adaptación Laboral", desc: "Orientación sobre adaptaciones laborales para discapacidad." },
  },
},
{
  category: "Health",
  link: "https://www.ada.gov",
  i18n: {
    en: { title: "ADA.gov Disability Rights", desc: "Information about disability rights and accessibility under the ADA." },
    fr: { title: "Droits handicap ADA.gov", desc: "Informations droits handicap et accessibilité." },
    es: { title: "Derechos de Discapacidad ADA.gov", desc: "Información sobre derechos y accesibilidad." },
  },
},
{
  category: "Income",
  link: "https://www.ssa.gov/work/",
  i18n: {
    en: { title: "Social Security Work Incentives", desc: "Work support and incentive information for disability beneficiaries." },
    fr: { title: "Incitations travail sécurité sociale", desc: "Aide travail pour bénéficiaires handicap." },
    es: { title: "Incentivos Laborales del Seguro Social", desc: "Apoyo laboral para beneficiarios por discapacidad." },
  },
},
{
  category: "Health",
  link: "https://www.specialolympics.org/programs",
  i18n: {
    en: { title: "Special Olympics Programs", desc: "Sports, health, and inclusion programs for people with intellectual disabilities." },
    fr: { title: "Programmes Special Olympics", desc: "Sport, santé et inclusion pour handicap intellectuel." },
    es: { title: "Programas Special Olympics", desc: "Deporte, salud e inclusión para discapacidad intelectual." },
  },
},
{
  category: "Education",
  link: "https://www.parentcenterhub.org/find-your-center/",
  i18n: {
    en: { title: "Parent Center Hub", desc: "Find parent training and information centers for children with disabilities." },
    fr: { title: "Centre ressources parents", desc: "Trouvez formations et informations pour enfants handicapés." },
    es: { title: "Centro de Recursos para Padres", desc: "Encuentre apoyo para niños con discapacidades." },
  },
},
{
  category: "Health",
  link: "https://www.thearc.org/find-a-chapter/",
  i18n: {
    en: { title: "The Arc Local Chapters", desc: "Local advocacy and support for people with intellectual and developmental disabilities." },
    fr: { title: "Chapitres locaux The Arc", desc: "Soutien local pour handicaps intellectuels et développementaux." },
    es: { title: "Capítulos Locales The Arc", desc: "Apoyo local para discapacidades intelectuales y del desarrollo." },
  },
},
{
  category: "Health",
  link: "https://autismsociety.org/contact-us/#affiliate-network",
  i18n: {
    en: { title: "Autism Society Affiliate Network", desc: "Local autism support, education, and community resources." },
    fr: { title: "Réseau Autism Society", desc: "Soutien local, éducation et ressources autisme." },
    es: { title: "Red de Autism Society", desc: "Apoyo local, educación y recursos sobre autismo." },
  },
},
{
  category: "Utilities",
  link: "https://www.fcc.gov/accessibility",
  i18n: {
    en: { title: "FCC Accessibility Resources", desc: "Communication accessibility resources for people with disabilities." },
    fr: { title: "Ressources accessibilité FCC", desc: "Accessibilité communication pour personnes handicapées." },
    es: { title: "Recursos de Accesibilidad FCC", desc: "Accesibilidad en comunicaciones para personas con discapacidades." },
  },
},

{
  category: "Health",
  link: "https://www.smpresource.org",
  i18n: {
    en: { title: "Senior Medicare Patrol", desc: "Helps seniors prevent, detect, and report Medicare fraud." },
    fr: { title: "Patrouille Medicare seniors", desc: "Aide les aînés à signaler fraude Medicare." },
    es: { title: "Patrulla Medicare para Adultos Mayores", desc: "Ayuda a prevenir y reportar fraude de Medicare." },
  },
},
{
  category: "Health",
  link: "https://acl.gov/programs/protecting-rights-and-preventing-abuse/long-term-care-ombudsman-program",
  i18n: {
    en: { title: "Long-Term Care Ombudsman Program", desc: "Advocacy for residents of nursing homes and long-term care facilities." },
    fr: { title: "Ombudsman soins longue durée", desc: "Défense des résidents en établissements de soins." },
    es: { title: "Defensor de Cuidado a Largo Plazo", desc: "Defensa para residentes de centros de cuidado." },
  },
},
{
  category: "Health",
  link: "https://acl.gov/programs/health-wellness/falls-prevention",
  i18n: {
    en: { title: "Falls Prevention Programs", desc: "Programs and resources to help older adults prevent falls." },
    fr: { title: "Prévention des chutes", desc: "Programmes pour aider les aînés à éviter les chutes." },
    es: { title: "Programas de Prevención de Caídas", desc: "Recursos para prevenir caídas en adultos mayores." },
  },
},
{
  category: "Health",
  link: "https://acl.gov/programs/health-wellness/chronic-disease-self-management-education-programs",
  i18n: {
    en: { title: "Chronic Disease Self-Management Education", desc: "Programs helping older adults manage chronic health conditions." },
    fr: { title: "Gestion maladies chroniques", desc: "Programmes pour gérer les maladies chroniques." },
    es: { title: "Educación para Manejo de Enfermedades Crónicas", desc: "Programas para manejar condiciones crónicas." },
  },
},
{
  category: "Food",
  link: "https://acl.gov/programs/health-wellness/nutrition-services",
  i18n: {
    en: { title: "ACL Senior Nutrition Services", desc: "Nutrition programs supporting meals and food access for older adults." },
    fr: { title: "Services nutrition seniors ACL", desc: "Repas et accès alimentaire pour aînés." },
    es: { title: "Servicios de Nutrición para Mayores ACL", desc: "Programas de comidas para adultos mayores." },
  },
},
{
  category: "Health",
  link: "https://acl.gov/programs/support-caregivers",
  i18n: {
    en: { title: "ACL Caregiver Support", desc: "Caregiver support resources for families helping older adults and people with disabilities." },
    fr: { title: "Soutien aidants ACL", desc: "Ressources pour familles aidantes." },
    es: { title: "Apoyo para Cuidadores ACL", desc: "Recursos para familias cuidadoras." },
  },
},
{
  category: "Income",
  link: "https://www.seniorserviceamerica.org",
  i18n: {
    en: { title: "Senior Service America", desc: "Employment and community service opportunities for older workers." },
    fr: { title: "Senior Service America", desc: "Emploi et service communautaire pour travailleurs âgés." },
    es: { title: "Senior Service America", desc: "Empleo y servicio comunitario para adultos mayores." },
  },
},
{
  category: "Health",
  link: "https://www.nia.nih.gov/health",
  i18n: {
    en: { title: "National Institute on Aging Health Resources", desc: "Health and aging information for older adults and caregivers." },
    fr: { title: "Ressources santé vieillissement NIA", desc: "Informations santé pour aînés et aidants." },
    es: { title: "Recursos de Salud del NIA", desc: "Información de salud y envejecimiento." },
  },
},
{
  category: "Housing",
  link: "https://eldercare.acl.gov/Public/Resources/Factsheets/Home_Modification.aspx",
  i18n: {
    en: { title: "Home Modification for Older Adults", desc: "Home safety and modification resources for aging in place." },
    fr: { title: "Adaptation domicile pour aînés", desc: "Ressources sécurité maison pour vieillir chez soi." },
    es: { title: "Modificación del Hogar para Mayores", desc: "Recursos de seguridad para envejecer en casa." },
  },
},
{
  category: "Health",
  link: "https://www.n4a.org",
  i18n: {
    en: { title: "Area Agencies on Aging", desc: "Local aging services and community support through area agencies." },
    fr: { title: "Agences locales vieillissement", desc: "Services locaux pour aînés." },
    es: { title: "Agencias Locales sobre Envejecimiento", desc: "Servicios locales para adultos mayores." },
  },
},

{
  category: "Utilities",
  link: "https://www.nadtc.org",
  i18n: {
    en: { title: "National Aging and Disability Transportation Center", desc: "Transportation resources for older adults and people with disabilities." },
    fr: { title: "Centre transport vieillissement handicap", desc: "Ressources transport pour aînés et handicap." },
    es: { title: "Centro de Transporte para Mayores y Discapacidad", desc: "Recursos de transporte para mayores y discapacidad." },
  },
},
{
  category: "Utilities",
  link: "https://www.nationalrtap.org",
  i18n: {
    en: { title: "National Rural Transit Assistance Program", desc: "Rural transportation resources and transit assistance information." },
    fr: { title: "Aide transport rural national", desc: "Ressources de transport rural." },
    es: { title: "Programa Nacional de Transporte Rural", desc: "Recursos de transporte rural." },
  },
},
{
  category: "Health",
  link: "https://www.medicaid.gov/medicaid/benefits/non-emergency-medical-transportation/index.html",
  i18n: {
    en: { title: "Medicaid Non-Emergency Medical Transportation", desc: "Transportation benefit information for eligible Medicaid members." },
    fr: { title: "Transport médical non urgent Medicaid", desc: "Information transport pour bénéficiaires Medicaid." },
    es: { title: "Transporte Médico No Urgente Medicaid", desc: "Información de transporte para miembros Medicaid." },
  },
},
{
  category: "Utilities",
  link: "https://www.transit.dot.gov/regulations-and-guidance/civil-rights-ada/ada-regulations",
  i18n: {
    en: { title: "ADA Transit Rights", desc: "Transportation accessibility rights and ADA transit guidance." },
    fr: { title: "Droits transport ADA", desc: "Accessibilité transport et droits ADA." },
    es: { title: "Derechos de Transporte ADA", desc: "Accesibilidad en transporte y derechos ADA." },
  },
},
{
  category: "Utilities",
  link: "https://www.transit.dot.gov/funding/grants/enhanced-mobility-seniors-individuals-disabilities-section-5310",
  i18n: {
    en: { title: "Enhanced Mobility for Seniors and Disabilities", desc: "Transit support for seniors and people with disabilities." },
    fr: { title: "Mobilité seniors et handicap", desc: "Soutien transport pour aînés et handicap." },
    es: { title: "Movilidad para Mayores y Discapacidad", desc: "Apoyo de transporte para mayores y discapacidad." },
  },
},
{
  category: "Utilities",
  link: "https://www.transit.dot.gov/rural-formula-grants-5311",
  i18n: {
    en: { title: "Rural Public Transportation Grants", desc: "Federal rural transit program information and support." },
    fr: { title: "Subventions transport rural", desc: "Programme fédéral transport rural." },
    es: { title: "Subvenciones de Transporte Rural", desc: "Programa federal de transporte rural." },
  },
},
{
  category: "Utilities",
  link: "https://www.transportation.gov/rural",
  i18n: {
    en: { title: "Rural Transportation Resources", desc: "Transportation resources for rural communities and local mobility." },
    fr: { title: "Ressources transport rural", desc: "Mobilité pour communautés rurales." },
    es: { title: "Recursos de Transporte Rural", desc: "Movilidad para comunidades rurales." },
  },
},
{
  category: "Utilities",
  link: "https://www.transportation.gov/accessibility",
  i18n: {
    en: { title: "DOT Accessibility Resources", desc: "Transportation accessibility and civil rights information." },
    fr: { title: "Ressources accessibilité DOT", desc: "Accessibilité transport et droits civils." },
    es: { title: "Recursos de Accesibilidad DOT", desc: "Accesibilidad y derechos civiles en transporte." },
  },
},
{
  category: "Utilities",
  link: "https://www.benefits.gov/benefit/623",
  i18n: {
    en: { title: "Benefits.gov Transportation Support", desc: "Transportation assistance information for eligible individuals." },
    fr: { title: "Aide transport Benefits.gov", desc: "Informations aide transport pour personnes admissibles." },
    es: { title: "Apoyo de Transporte Benefits.gov", desc: "Información de ayuda de transporte para personas elegibles." },
  },
},
{
  category: "Utilities",
  link: "https://www.va.gov/health-care/get-reimbursed-for-travel-pay/",
  i18n: {
    en: { title: "VA Travel Reimbursement", desc: "Travel pay reimbursement for eligible veterans going to VA health care." },
    fr: { title: "Remboursement voyage VA", desc: "Aide transport pour soins VA admissibles." },
    es: { title: "Reembolso de Viaje VA", desc: "Reembolso de transporte para atención médica VA." },
  },
},

{
  category: "Income",
  link: "https://www.consumerfinance.gov/complaint/",
  i18n: {
    en: { title: "CFPB Consumer Complaint System", desc: "Submit complaints about financial products, credit, debt, and banking." },
    fr: { title: "Plaintes consommateurs CFPB", desc: "Déposer plaintes crédit, dette, banque et produits financiers." },
    es: { title: "Sistema de Quejas CFPB", desc: "Presente quejas sobre crédito, deuda, banca y finanzas." },
  },
},
{
  category: "Income",
  link: "https://www.identitytheft.gov",
  i18n: {
    en: { title: "IdentityTheft.gov Recovery", desc: "Official recovery steps for identity theft and fraud victims." },
    fr: { title: "Récupération vol identité", desc: "Étapes officielles pour victimes d’usurpation." },
    es: { title: "Recuperación de Robo de Identidad", desc: "Pasos oficiales para víctimas de fraude." },
  },
},
{
  category: "Health",
  link: "https://www.thehotline.org",
  i18n: {
    en: { title: "National Domestic Violence Hotline", desc: "24/7 confidential support for people experiencing domestic violence." },
    fr: { title: "Ligne violence domestique", desc: "Soutien confidentiel 24/7 contre violence domestique." },
    es: { title: "Línea Nacional de Violencia Doméstica", desc: "Apoyo confidencial 24/7 para violencia doméstica." },
  },
},
{
  category: "Health",
  link: "https://victimconnect.org",
  i18n: {
    en: { title: "VictimConnect Resource Center", desc: "Confidential referrals and support for victims of crime." },
    fr: { title: "Centre VictimConnect", desc: "Orientation confidentielle pour victimes de crime." },
    es: { title: "Centro VictimConnect", desc: "Referencias confidenciales para víctimas de crimen." },
  },
},
{
  category: "Health",
  link: "https://www.childhelphotline.org",
  i18n: {
    en: { title: "Childhelp National Child Abuse Hotline", desc: "24/7 support for child abuse prevention and crisis help." },
    fr: { title: "Ligne Childhelp maltraitance enfants", desc: "Soutien 24/7 prévention et crise." },
    es: { title: "Línea Childhelp de Abuso Infantil", desc: "Apoyo 24/7 para prevención y crisis." },
  },
},
{
  category: "Health",
  link: "https://www.missingkids.org",
  i18n: {
    en: { title: "National Center for Missing & Exploited Children", desc: "Resources for missing children, exploitation prevention, and family support." },
    fr: { title: "Centre enfants disparus exploités", desc: "Ressources enfants disparus et soutien familial." },
    es: { title: "Centro Nacional para Niños Desaparecidos", desc: "Recursos para niños desaparecidos y apoyo familiar." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/consumer",
  i18n: {
    en: { title: "USA.gov Consumer Protection", desc: "Consumer rights, scams, complaints, and protection resources." },
    fr: { title: "Protection consommateur USA.gov", desc: "Droits consommateurs, arnaques et plaintes." },
    es: { title: "Protección al Consumidor USA.gov", desc: "Derechos del consumidor, estafas y quejas." },
  },
},
{
  category: "Income",
  link: "https://reportfraud.ftc.gov",
  i18n: {
    en: { title: "FTC Report Fraud", desc: "Report scams, fraud, and identity theft to the FTC." },
    fr: { title: "Signaler fraude FTC", desc: "Signaler arnaques, fraude et vol d’identité." },
    es: { title: "Reportar Fraude FTC", desc: "Reporte estafas, fraude y robo de identidad." },
  },
},
{
  category: "Health",
  link: "https://www.justice.gov/elderjustice",
  i18n: {
    en: { title: "Elder Justice Initiative", desc: "Resources for elder abuse prevention, reporting, and justice support." },
    fr: { title: "Initiative justice aînés", desc: "Prévention et signalement abus envers aînés." },
    es: { title: "Iniciativa de Justicia para Mayores", desc: "Prevención y reporte de abuso a adultos mayores." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/legal-aid",
  i18n: {
    en: { title: "USA.gov Legal Aid", desc: "Government guide to free and low-cost legal help." },
    fr: { title: "Aide juridique USA.gov", desc: "Guide aide juridique gratuite ou abordable." },
    es: { title: "Ayuda Legal USA.gov", desc: "Guía de ayuda legal gratuita o de bajo costo." },
  },
},
  // ===== PROGRAMS 401-450 =====

{
  category: "Housing",
  link: "https://www.naca.com",
  i18n: {
    en: { title: "NACA Homeownership Program", desc: "Affordable homeownership and mortgage assistance resources." },
    fr: { title: "Programme accession propriété NACA", desc: "Ressources hypothécaires et accès à la propriété." },
    es: { title: "Programa de Vivienda NACA", desc: "Recursos de hipotecas y acceso a la vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.enterprisecommunity.org",
  i18n: {
    en: { title: "Enterprise Community Partners", desc: "Affordable housing and community development resources." },
    fr: { title: "Enterprise Community Partners", desc: "Développement communautaire et logement." },
    es: { title: "Enterprise Community Partners", desc: "Vivienda asequible y desarrollo comunitario." },
  },
},
{
  category: "Housing",
  link: "https://nationalfairhousing.org",
  i18n: {
    en: { title: "National Fair Housing Alliance", desc: "Fair housing rights and discrimination assistance." },
    fr: { title: "Alliance logement équitable", desc: "Droits logement et discrimination." },
    es: { title: "Alianza Nacional de Vivienda Justa", desc: "Derechos de vivienda y discriminación." },
  },
},
{
  category: "Housing",
  link: "https://www.neighborworks.org",
  i18n: {
    en: { title: "NeighborWorks America", desc: "Homeownership, financial capability, and housing support." },
    fr: { title: "NeighborWorks America", desc: "Propriété, finances et soutien logement." },
    es: { title: "NeighborWorks America", desc: "Propiedad de vivienda y educación financiera." },
  },
},
{
  category: "Housing",
  link: "https://www.aarp.org/home-family/",
  i18n: {
    en: { title: "AARP Home Resources", desc: "Housing and home safety information for older adults." },
    fr: { title: "Ressources logement AARP", desc: "Sécurité et logement pour aînés." },
    es: { title: "Recursos de Vivienda AARP", desc: "Seguridad y vivienda para adultos mayores." },
  },
},
{
  category: "Housing",
  link: "https://www.hopelink.org",
  i18n: {
    en: { title: "Hopelink Housing Assistance", desc: "Housing stability and emergency assistance resources." },
    fr: { title: "Aide logement Hopelink", desc: "Stabilité résidentielle et aide d’urgence." },
    es: { title: "Asistencia de Vivienda Hopelink", desc: "Estabilidad de vivienda y ayuda de emergencia." },
  },
},
{
  category: "Housing",
  link: "https://endhomelessness.org",
  i18n: {
    en: { title: "National Alliance to End Homelessness", desc: "Homelessness prevention and housing resources." },
    fr: { title: "Alliance fin du sans-abrisme", desc: "Prévention et ressources logement." },
    es: { title: "Alianza para Acabar con la Falta de Vivienda", desc: "Prevención y recursos de vivienda." },
  },
},

{
  category: "Income",
  link: "https://www.sba.gov/local-assistance",
  i18n: {
    en: { title: "SBA Local Assistance", desc: "Find local small business support centers." },
    fr: { title: "Assistance locale SBA", desc: "Centres locaux de soutien aux entreprises." },
    es: { title: "Asistencia Local SBA", desc: "Centros locales de apoyo empresarial." },
  },
},
{
  category: "Income",
  link: "https://www.sba.gov/business-guide",
  i18n: {
    en: { title: "SBA Business Guide", desc: "Resources to start, manage, and grow a business." },
    fr: { title: "Guide entreprise SBA", desc: "Créer, gérer et développer une entreprise." },
    es: { title: "Guía Empresarial SBA", desc: "Crear y desarrollar un negocio." },
  },
},
{
  category: "Income",
  link: "https://www.apprenticeship.gov",
  i18n: {
    en: { title: "Registered Apprenticeship Finder", desc: "Career training and apprenticeship opportunities." },
    fr: { title: "Recherche apprentissage", desc: "Formation et apprentissages." },
    es: { title: "Buscador de Aprendizajes", desc: "Capacitación y oportunidades laborales." },
  },
},
{
  category: "Income",
  link: "https://www.mynextmove.org",
  i18n: {
    en: { title: "My Next Move Career Explorer", desc: "Career exploration and job planning resources." },
    fr: { title: "Explorateur carrière", desc: "Exploration de carrière et emploi." },
    es: { title: "Explorador de Carreras", desc: "Exploración profesional y empleo." },
  },
},
{
  category: "Income",
  link: "https://www.onetonline.org",
  i18n: {
    en: { title: "O*NET Career Database", desc: "Occupational information and career planning." },
    fr: { title: "Base carrières O*NET", desc: "Informations métiers et carrières." },
    es: { title: "Base de Datos O*NET", desc: "Información ocupacional y carreras." },
  },
},
{
  category: "Income",
  link: "https://www.benefits.gov/benefit-finder",
  i18n: {
    en: { title: "Benefits Finder", desc: "Find government benefits you may qualify for." },
    fr: { title: "Recherche prestations", desc: "Trouvez les aides auxquelles vous pourriez avoir droit." },
    es: { title: "Buscador de Beneficios", desc: "Encuentre beneficios gubernamentales." },
  },
},
{
  category: "Income",
  link: "https://www.consumerfinance.gov/consumer-tools/budgeting/",
  i18n: {
    en: { title: "CFPB Budgeting Tools", desc: "Budgeting and money management resources." },
    fr: { title: "Outils budget CFPB", desc: "Gestion financière et budgétaire." },
    es: { title: "Herramientas de Presupuesto CFPB", desc: "Administración de dinero y presupuesto." },
  },
},
{
  category: "Income",
  link: "https://www.consumerfinance.gov/consumer-tools/mortgages/",
  i18n: {
    en: { title: "CFPB Mortgage Resources", desc: "Mortgage education and homeowner resources." },
    fr: { title: "Ressources hypothèques CFPB", desc: "Éducation hypothécaire et propriété." },
    es: { title: "Recursos Hipotecarios CFPB", desc: "Educación hipotecaria y propiedad." },
  },
},
{
  category: "Income",
  link: "https://www.consumerfinance.gov/consumer-tools/bank-accounts/",
  i18n: {
    en: { title: "CFPB Banking Resources", desc: "Banking information and consumer protections." },
    fr: { title: "Ressources bancaires CFPB", desc: "Informations bancaires et protections." },
    es: { title: "Recursos Bancarios CFPB", desc: "Información bancaria y protección del consumidor." },
  },
},
  // ===== PROGRAMS 421-460 =====

{
  category: "Income",
  link: "https://myalabama.gov",
  states: ["AL"],
  i18n: {
    en: { title: "Alabama MyAlabama Benefits Portal", desc: "Access Alabama state assistance services and benefit applications." },
    fr: { title: "Portail MyAlabama", desc: "Accédez aux services d’aide et demandes de prestations en Alabama." },
    es: { title: "Portal MyAlabama", desc: "Acceda a servicios y beneficios estatales en Alabama." },
  },
},
{
  category: "Income",
  link: "https://health.alaska.gov/dpa",
  states: ["AK"],
  i18n: {
    en: { title: "Alaska Public Assistance", desc: "Apply for food, cash, health, and public assistance programs in Alaska." },
    fr: { title: "Aide publique Alaska", desc: "Demandez aide alimentaire, financière et santé en Alaska." },
    es: { title: "Asistencia Pública de Alaska", desc: "Solicite comida, dinero, salud y ayuda pública en Alaska." },
  },
},
{
  category: "Income",
  link: "https://www.colorado.gov/peak",
  states: ["CO"],
  i18n: {
    en: { title: "Colorado PEAK", desc: "Apply for food, medical, cash, and early childhood assistance in Colorado." },
    fr: { title: "Colorado PEAK", desc: "Demandez aide alimentaire, médicale, financière et enfance au Colorado." },
    es: { title: "Colorado PEAK", desc: "Solicite comida, salud, dinero y ayuda infantil en Colorado." },
  },
},
{
  category: "Income",
  link: "https://connect.ct.gov",
  states: ["CT"],
  i18n: {
    en: { title: "Connecticut ConneCT", desc: "Apply for Connecticut benefits including food, cash, and medical assistance." },
    fr: { title: "Connecticut ConneCT", desc: "Demandez prestations alimentaires, financières et médicales au Connecticut." },
    es: { title: "Connecticut ConneCT", desc: "Solicite beneficios de comida, dinero y salud en Connecticut." },
  },
},
{
  category: "Income",
  link: "https://assist.dhss.delaware.gov",
  states: ["DE"],
  i18n: {
    en: { title: "Delaware ASSIST", desc: "Online benefit application portal for Delaware public assistance programs." },
    fr: { title: "Delaware ASSIST", desc: "Portail de demande d’aide publique au Delaware." },
    es: { title: "Delaware ASSIST", desc: "Portal de solicitud de asistencia pública en Delaware." },
  },
},
{
  category: "Income",
  link: "https://districtdirect.dc.gov",
  states: ["DC"],
  i18n: {
    en: { title: "DC District Direct", desc: "Apply for food, medical, and cash assistance in Washington, DC." },
    fr: { title: "DC District Direct", desc: "Demandez aide alimentaire, médicale et financière à Washington, DC." },
    es: { title: "DC District Direct", desc: "Solicite comida, salud y dinero en Washington, DC." },
  },
},
{
  category: "Income",
  link: "https://dhsservices.iowa.gov",
  states: ["IA"],
  i18n: {
    en: { title: "Iowa HHS Services Portal", desc: "Apply for Iowa health, food, child care, and assistance programs." },
    fr: { title: "Portail services Iowa HHS", desc: "Demandez aide santé, alimentaire et garde d’enfants en Iowa." },
    es: { title: "Portal Iowa HHS", desc: "Solicite salud, comida, cuidado infantil y ayuda en Iowa." },
  },
},
{
  category: "Income",
  link: "https://cssp.kees.ks.gov",
  states: ["KS"],
  i18n: {
    en: { title: "Kansas Self Service Portal", desc: "Apply for Kansas food, cash, medical, and child care assistance." },
    fr: { title: "Portail libre-service Kansas", desc: "Demandez aide alimentaire, financière, médicale et garde d’enfants au Kansas." },
    es: { title: "Portal de Autoservicio Kansas", desc: "Solicite comida, dinero, salud y cuidado infantil en Kansas." },
  },
},
{
  category: "Income",
  link: "https://kynect.ky.gov",
  states: ["KY"],
  i18n: {
    en: { title: "Kentucky kynect Benefits", desc: "Apply for health coverage, food benefits, and family support in Kentucky." },
    fr: { title: "Kentucky kynect Benefits", desc: "Demandez couverture santé, aide alimentaire et soutien familial au Kentucky." },
    es: { title: "Kentucky kynect Benefits", desc: "Solicite salud, comida y apoyo familiar en Kentucky." },
  },
},
{
  category: "Income",
  link: "https://cafe-cp.dcfs.la.gov",
  states: ["LA"],
  i18n: {
    en: { title: "Louisiana CAFÉ Customer Portal", desc: "Apply for Louisiana SNAP, FITAP, KCSP, and child support services." },
    fr: { title: "Portail Louisiana CAFÉ", desc: "Demandez SNAP, FITAP, KCSP et soutien familial en Louisiane." },
    es: { title: "Portal Louisiana CAFÉ", desc: "Solicite SNAP, FITAP, KCSP y apoyo familiar en Luisiana." },
  },
},
{
  category: "Income",
  link: "https://www.mymaineconnection.gov",
  states: ["ME"],
  i18n: {
    en: { title: "My Maine Connection", desc: "Apply for Maine health coverage, food benefits, and assistance programs." },
    fr: { title: "My Maine Connection", desc: "Demandez santé, alimentation et aides dans le Maine." },
    es: { title: "My Maine Connection", desc: "Solicite salud, comida y asistencia en Maine." },
  },
},
{
  category: "Income",
  link: "https://mymdthink.maryland.gov",
  states: ["MD"],
  i18n: {
    en: { title: "Maryland myMDTHINK", desc: "Apply for Maryland food, cash, medical, and social services." },
    fr: { title: "Maryland myMDTHINK", desc: "Demandez aide alimentaire, financière, médicale et sociale au Maryland." },
    es: { title: "Maryland myMDTHINK", desc: "Solicite comida, dinero, salud y servicios sociales en Maryland." },
  },
},
{
  category: "Income",
  link: "https://newmibridges.michigan.gov",
  states: ["MI"],
  i18n: {
    en: { title: "Michigan MI Bridges", desc: "Apply for Michigan food, health, child care, and emergency assistance." },
    fr: { title: "Michigan MI Bridges", desc: "Demandez aide alimentaire, santé, garde d’enfants et urgence au Michigan." },
    es: { title: "Michigan MI Bridges", desc: "Solicite comida, salud, cuidado infantil y emergencia en Michigan." },
  },
},
{
  category: "Income",
  link: "https://mnbenefits.mn.gov",
  states: ["MN"],
  i18n: {
    en: { title: "MNbenefits", desc: "Apply for Minnesota food, cash, emergency, and child care assistance." },
    fr: { title: "MNbenefits", desc: "Demandez aide alimentaire, financière, urgence et garde d’enfants au Minnesota." },
    es: { title: "MNbenefits", desc: "Solicite comida, dinero, emergencia y cuidado infantil en Minnesota." },
  },
},
{
  category: "Income",
  link: "https://access.ms.gov",
  states: ["MS"],
  i18n: {
    en: { title: "Mississippi Access Portal", desc: "Access Mississippi public assistance and state benefit services." },
    fr: { title: "Portail Mississippi Access", desc: "Accédez aux aides publiques et prestations du Mississippi." },
    es: { title: "Portal Mississippi Access", desc: "Acceda a asistencia pública y beneficios de Mississippi." },
  },
},
{
  category: "Income",
  link: "https://mydss.mo.gov",
  states: ["MO"],
  i18n: {
    en: { title: "Missouri myDSS", desc: "Apply for Missouri SNAP, Medicaid, temporary assistance, and family services." },
    fr: { title: "Missouri myDSS", desc: "Demandez SNAP, Medicaid et aide familiale au Missouri." },
    es: { title: "Missouri myDSS", desc: "Solicite SNAP, Medicaid y apoyo familiar en Missouri." },
  },
},
{
  category: "Income",
  link: "https://apply.mt.gov",
  states: ["MT"],
  i18n: {
    en: { title: "Montana Apply Portal", desc: "Apply for Montana food, health, cash, and public assistance benefits." },
    fr: { title: "Portail Montana Apply", desc: "Demandez alimentation, santé, argent et aides publiques au Montana." },
    es: { title: "Portal Montana Apply", desc: "Solicite comida, salud, dinero y asistencia en Montana." },
  },
},
{
  category: "Income",
  link: "https://dhhs-access-neb-menu.ne.gov",
  states: ["NE"],
  i18n: {
    en: { title: "Nebraska ACCESSNebraska", desc: "Apply for Nebraska Medicaid, SNAP, cash assistance, and child care help." },
    fr: { title: "Nebraska ACCESSNebraska", desc: "Demandez Medicaid, SNAP, aide financière et garde d’enfants au Nebraska." },
    es: { title: "Nebraska ACCESSNebraska", desc: "Solicite Medicaid, SNAP, dinero y cuidado infantil en Nebraska." },
  },
},
{
  category: "Income",
  link: "https://accessnevada.dwss.nv.gov",
  states: ["NV"],
  i18n: {
    en: { title: "Access Nevada", desc: "Apply for Nevada Medicaid, SNAP, TANF, and public assistance." },
    fr: { title: "Access Nevada", desc: "Demandez Medicaid, SNAP, TANF et aides publiques au Nevada." },
    es: { title: "Access Nevada", desc: "Solicite Medicaid, SNAP, TANF y asistencia pública en Nevada." },
  },
},
{
  category: "Income",
  link: "https://nheasy.nh.gov",
  states: ["NH"],
  i18n: {
    en: { title: "NH EASY Gateway", desc: "Apply for New Hampshire food, medical, cash, and child care assistance." },
    fr: { title: "NH EASY Gateway", desc: "Demandez aide alimentaire, médicale, financière et garde d’enfants au New Hampshire." },
    es: { title: "NH EASY Gateway", desc: "Solicite comida, salud, dinero y cuidado infantil en New Hampshire." },
  },
},
{
  category: "Income",
  link: "https://www.njhelps.gov",
  states: ["NJ"],
  i18n: {
    en: { title: "NJHelps", desc: "Screen and apply for New Jersey food, cash, and health assistance." },
    fr: { title: "NJHelps", desc: "Vérifiez et demandez aide alimentaire, financière et santé au New Jersey." },
    es: { title: "NJHelps", desc: "Revise y solicite comida, dinero y salud en New Jersey." },
  },
},
{
  category: "Income",
  link: "https://www.yes.state.nm.us",
  states: ["NM"],
  i18n: {
    en: { title: "New Mexico YES Portal", desc: "Apply for New Mexico food, cash, medical, and energy assistance." },
    fr: { title: "Portail New Mexico YES", desc: "Demandez aide alimentaire, financière, médicale et énergie au Nouveau-Mexique." },
    es: { title: "Portal YES Nuevo México", desc: "Solicite comida, dinero, salud y energía en Nuevo México." },
  },
},
{
  category: "Income",
  link: "https://epass.nc.gov",
  states: ["NC"],
  i18n: {
    en: { title: "North Carolina ePASS", desc: "Apply for North Carolina food, medical, energy, and cash assistance." },
    fr: { title: "North Carolina ePASS", desc: "Demandez aide alimentaire, médicale, énergie et argent en Caroline du Nord." },
    es: { title: "North Carolina ePASS", desc: "Solicite comida, salud, energía y dinero en Carolina del Norte." },
  },
},
{
  category: "Income",
  link: "https://applyforhelp.nd.gov",
  states: ["ND"],
  i18n: {
    en: { title: "North Dakota Apply for Help", desc: "Apply for North Dakota food, medical, child care, and financial help." },
    fr: { title: "North Dakota Apply for Help", desc: "Demandez aide alimentaire, médicale, garde d’enfants et financière au Dakota du Nord." },
    es: { title: "North Dakota Apply for Help", desc: "Solicite comida, salud, cuidado infantil y dinero en Dakota del Norte." },
  },
},
{
  category: "Income",
  link: "https://sso.oregon.gov",
  states: ["OR"],
  i18n: {
    en: { title: "Oregon ONE Online Access", desc: "Apply for Oregon health coverage, food benefits, cash aid, and child care." },
    fr: { title: "Oregon ONE Online Access", desc: "Demandez santé, alimentation, argent et garde d’enfants en Oregon." },
    es: { title: "Oregon ONE Online Access", desc: "Solicite salud, comida, dinero y cuidado infantil en Oregon." },
  },
},
{
  category: "Income",
  link: "https://www.compass.state.pa.us",
  states: ["PA"],
  i18n: {
    en: { title: "Pennsylvania COMPASS", desc: "Apply for Pennsylvania health, food, cash, child care, and energy assistance." },
    fr: { title: "Pennsylvania COMPASS", desc: "Demandez santé, alimentation, argent, garde d’enfants et énergie en Pennsylvanie." },
    es: { title: "Pennsylvania COMPASS", desc: "Solicite salud, comida, dinero, cuidado infantil y energía en Pennsylvania." },
  },
},
{
  category: "Income",
  link: "https://healthyrhode.ri.gov",
  states: ["RI"],
  i18n: {
    en: { title: "Rhode Island HealthyRhode", desc: "Apply for Rhode Island health coverage, food assistance, and human services." },
    fr: { title: "Rhode Island HealthyRhode", desc: "Demandez santé, aide alimentaire et services sociaux au Rhode Island." },
    es: { title: "Rhode Island HealthyRhode", desc: "Solicite salud, comida y servicios humanos en Rhode Island." },
  },
},
{
  category: "Income",
  link: "https://dss.sc.gov/assistance-programs/snap/",
  states: ["SC"],
  i18n: {
    en: { title: "South Carolina DSS Assistance", desc: "Access South Carolina food, family, and public assistance programs." },
    fr: { title: "Aide DSS Caroline du Sud", desc: "Accédez aux aides alimentaires, familiales et publiques en Caroline du Sud." },
    es: { title: "Asistencia DSS Carolina del Sur", desc: "Acceda a comida, familia y asistencia pública en Carolina del Sur." },
  },
},
{
  category: "Income",
  link: "https://dss.sd.gov/economicassistance/",
  states: ["SD"],
  i18n: {
    en: { title: "South Dakota Economic Assistance", desc: "Apply for South Dakota SNAP, TANF, Medicaid, and child care help." },
    fr: { title: "Aide économique Dakota du Sud", desc: "Demandez SNAP, TANF, Medicaid et garde d’enfants au Dakota du Sud." },
    es: { title: "Asistencia Económica Dakota del Sur", desc: "Solicite SNAP, TANF, Medicaid y cuidado infantil en Dakota del Sur." },
  },
},
{
  category: "Income",
  link: "https://onedhs.tn.gov",
  states: ["TN"],
  i18n: {
    en: { title: "Tennessee One DHS", desc: "Apply for Tennessee food, cash, child care, and family assistance." },
    fr: { title: "Tennessee One DHS", desc: "Demandez aide alimentaire, financière, garde d’enfants et famille au Tennessee." },
    es: { title: "Tennessee One DHS", desc: "Solicite comida, dinero, cuidado infantil y apoyo familiar en Tennessee." },
  },
},
{
  category: "Income",
  link: "https://jobs.utah.gov/mycase",
  states: ["UT"],
  i18n: {
    en: { title: "Utah myCase", desc: "Apply for Utah food, medical, child care, and financial assistance." },
    fr: { title: "Utah myCase", desc: "Demandez aide alimentaire, médicale, garde d’enfants et financière en Utah." },
    es: { title: "Utah myCase", desc: "Solicite comida, salud, cuidado infantil y dinero en Utah." },
  },
},
{
  category: "Income",
  link: "https://dcf.vermont.gov/mybenefits",
  states: ["VT"],
  i18n: {
    en: { title: "Vermont MyBenefits", desc: "Apply for Vermont food, fuel, cash, and health assistance programs." },
    fr: { title: "Vermont MyBenefits", desc: "Demandez aide alimentaire, chauffage, argent et santé au Vermont." },
    es: { title: "Vermont MyBenefits", desc: "Solicite comida, combustible, dinero y salud en Vermont." },
  },
},
{
  category: "Income",
  link: "https://www.washingtonconnection.org",
  states: ["WA"],
  i18n: {
    en: { title: "Washington Connection", desc: "Apply for Washington food, cash, child care, and health assistance." },
    fr: { title: "Washington Connection", desc: "Demandez alimentation, argent, garde d’enfants et santé à Washington." },
    es: { title: "Washington Connection", desc: "Solicite comida, dinero, cuidado infantil y salud en Washington." },
  },
},
{
  category: "Income",
  link: "https://www.wvpath.wv.gov",
  states: ["WV"],
  i18n: {
    en: { title: "West Virginia PATH", desc: "Apply for West Virginia food, medical, cash, and family assistance." },
    fr: { title: "West Virginia PATH", desc: "Demandez aide alimentaire, médicale, financière et familiale en Virginie-Occidentale." },
    es: { title: "West Virginia PATH", desc: "Solicite comida, salud, dinero y apoyo familiar en West Virginia." },
  },
},
{
  category: "Income",
  link: "https://access.wisconsin.gov",
  states: ["WI"],
  i18n: {
    en: { title: "Wisconsin ACCESS", desc: "Apply for Wisconsin food, health, child care, and employment assistance." },
    fr: { title: "Wisconsin ACCESS", desc: "Demandez aide alimentaire, santé, garde d’enfants et emploi au Wisconsin." },
    es: { title: "Wisconsin ACCESS", desc: "Solicite comida, salud, cuidado infantil y empleo en Wisconsin." },
  },
},
{
  category: "Income",
  link: "https://www.wesystem.wyo.gov",
  states: ["WY"],
  i18n: {
    en: { title: "Wyoming Eligibility System", desc: "Access Wyoming benefit eligibility and assistance program information." },
    fr: { title: "Système d’éligibilité Wyoming", desc: "Accédez aux prestations et aides du Wyoming." },
    es: { title: "Sistema de Elegibilidad Wyoming", desc: "Acceda a beneficios y asistencia de Wyoming." },
  },
},
  // ===== PROGRAMS 457-500 =====

{
  category: "Income",
  link: "https://www.alabamalegalhelp.org",
  states: ["AL"],
  i18n: {
    en: { title: "Alabama Legal Help", desc: "Free legal information and assistance resources for Alabama residents." },
    fr: { title: "Aide juridique Alabama", desc: "Ressources juridiques gratuites pour les résidents de l’Alabama." },
    es: { title: "Ayuda Legal Alabama", desc: "Recursos legales gratuitos para residentes de Alabama." },
  },
},
{
  category: "Income",
  link: "https://alaskalawhelp.org",
  states: ["AK"],
  i18n: {
    en: { title: "Alaska Law Help", desc: "Legal aid and self-help resources for Alaska residents." },
    fr: { title: "Aide juridique Alaska", desc: "Ressources d’aide juridique pour les résidents de l’Alaska." },
    es: { title: "Ayuda Legal Alaska", desc: "Recursos de ayuda legal para residentes de Alaska." },
  },
},
{
  category: "Income",
  link: "https://azlawhelp.org",
  states: ["AZ"],
  i18n: {
    en: { title: "Arizona Law Help", desc: "Free legal help and information for Arizona families and individuals." },
    fr: { title: "Aide juridique Arizona", desc: "Aide juridique gratuite pour familles et personnes en Arizona." },
    es: { title: "Ayuda Legal Arizona", desc: "Ayuda legal gratuita para familias e individuos en Arizona." },
  },
},
{
  category: "Income",
  link: "https://www.arkansaslegal.org",
  states: ["AR"],
  i18n: {
    en: { title: "Arkansas Legal Services", desc: "Legal aid and civil legal assistance resources in Arkansas." },
    fr: { title: "Services juridiques Arkansas", desc: "Aide juridique civile pour résidents de l’Arkansas." },
    es: { title: "Servicios Legales Arkansas", desc: "Ayuda legal civil para residentes de Arkansas." },
  },
},
{
  category: "Income",
  link: "https://www.lawhelpca.org",
  states: ["CA"],
  i18n: {
    en: { title: "LawHelpCA", desc: "California legal aid directory and free legal information." },
    fr: { title: "LawHelpCA", desc: "Répertoire d’aide juridique gratuite en Californie." },
    es: { title: "LawHelpCA", desc: "Directorio de ayuda legal gratuita en California." },
  },
},
{
  category: "Income",
  link: "https://www.coloradolegalservices.org",
  states: ["CO"],
  i18n: {
    en: { title: "Colorado Legal Services", desc: "Civil legal aid for eligible Colorado residents." },
    fr: { title: "Services juridiques Colorado", desc: "Aide juridique civile pour résidents admissibles du Colorado." },
    es: { title: "Servicios Legales Colorado", desc: "Ayuda legal civil para residentes elegibles de Colorado." },
  },
},
{
  category: "Income",
  link: "https://ctlawhelp.org",
  states: ["CT"],
  i18n: {
    en: { title: "Connecticut Law Help", desc: "Free legal information and resources for Connecticut residents." },
    fr: { title: "Aide juridique Connecticut", desc: "Informations juridiques gratuites pour résidents du Connecticut." },
    es: { title: "Ayuda Legal Connecticut", desc: "Información legal gratuita para residentes de Connecticut." },
  },
},
{
  category: "Income",
  link: "https://www.delegalhelplink.org",
  states: ["DE"],
  i18n: {
    en: { title: "Delaware Legal Help Link", desc: "Legal help referrals and resources for Delaware residents." },
    fr: { title: "Aide juridique Delaware", desc: "Orientation et ressources juridiques au Delaware." },
    es: { title: "Ayuda Legal Delaware", desc: "Referencias y recursos legales en Delaware." },
  },
},
{
  category: "Income",
  link: "https://www.legalaiddc.org",
  states: ["DC"],
  i18n: {
    en: { title: "Legal Aid DC", desc: "Civil legal services and support for low-income DC residents." },
    fr: { title: "Aide juridique DC", desc: "Services juridiques civils pour résidents à faible revenu de DC." },
    es: { title: "Ayuda Legal DC", desc: "Servicios legales civiles para residentes de bajos ingresos en DC." },
  },
},
{
  category: "Income",
  link: "https://www.floridalawhelp.org",
  states: ["FL"],
  i18n: {
    en: { title: "Florida Law Help", desc: "Free legal information and legal aid resources in Florida." },
    fr: { title: "Aide juridique Floride", desc: "Informations et ressources juridiques gratuites en Floride." },
    es: { title: "Ayuda Legal Florida", desc: "Información y ayuda legal gratuita en Florida." },
  },
},
{
  category: "Income",
  link: "https://www.georgialegalaid.org",
  states: ["GA"],
  i18n: {
    en: { title: "Georgia Legal Aid", desc: "Legal information and assistance resources for Georgia residents." },
    fr: { title: "Aide juridique Géorgie", desc: "Informations et aide juridique pour résidents de Géorgie." },
    es: { title: "Ayuda Legal Georgia", desc: "Información y ayuda legal para residentes de Georgia." },
  },
},
{
  category: "Income",
  link: "https://www.legalaidhawaii.org",
  states: ["HI"],
  i18n: {
    en: { title: "Legal Aid Society of Hawaii", desc: "Legal services and advocacy for eligible Hawaii residents." },
    fr: { title: "Aide juridique Hawaï", desc: "Services juridiques pour résidents admissibles d’Hawaï." },
    es: { title: "Ayuda Legal Hawái", desc: "Servicios legales para residentes elegibles de Hawái." },
  },
},
{
  category: "Income",
  link: "https://www.idaholegalaid.org",
  states: ["ID"],
  i18n: {
    en: { title: "Idaho Legal Aid Services", desc: "Civil legal help and resources for Idaho residents." },
    fr: { title: "Aide juridique Idaho", desc: "Aide juridique civile pour résidents de l’Idaho." },
    es: { title: "Ayuda Legal Idaho", desc: "Ayuda legal civil para residentes de Idaho." },
  },
},
{
  category: "Income",
  link: "https://www.illinoislegalaid.org",
  states: ["IL"],
  i18n: {
    en: { title: "Illinois Legal Aid Online", desc: "Legal information and self-help resources for Illinois residents." },
    fr: { title: "Aide juridique Illinois", desc: "Informations juridiques et ressources d’auto-assistance en Illinois." },
    es: { title: "Ayuda Legal Illinois", desc: "Información legal y recursos de autoayuda en Illinois." },
  },
},
{
  category: "Income",
  link: "https://indianalegalhelp.org",
  states: ["IN"],
  i18n: {
    en: { title: "Indiana Legal Help", desc: "Legal resources and help finding civil legal assistance in Indiana." },
    fr: { title: "Aide juridique Indiana", desc: "Ressources pour trouver une aide juridique civile en Indiana." },
    es: { title: "Ayuda Legal Indiana", desc: "Recursos para encontrar ayuda legal civil en Indiana." },
  },
},
{
  category: "Income",
  link: "https://www.iowalegalaid.org",
  states: ["IA"],
  i18n: {
    en: { title: "Iowa Legal Aid", desc: "Free civil legal assistance for eligible Iowa residents." },
    fr: { title: "Aide juridique Iowa", desc: "Aide juridique civile gratuite pour résidents admissibles de l’Iowa." },
    es: { title: "Ayuda Legal Iowa", desc: "Ayuda legal civil gratuita para residentes elegibles de Iowa." },
  },
},
{
  category: "Income",
  link: "https://www.kansaslegalservices.org",
  states: ["KS"],
  i18n: {
    en: { title: "Kansas Legal Services", desc: "Civil legal aid and legal information for Kansas residents." },
    fr: { title: "Services juridiques Kansas", desc: "Aide juridique civile pour résidents du Kansas." },
    es: { title: "Servicios Legales Kansas", desc: "Ayuda legal civil para residentes de Kansas." },
  },
},
{
  category: "Income",
  link: "https://www.kyjustice.org",
  states: ["KY"],
  i18n: {
    en: { title: "Kentucky Legal Aid Resources", desc: "Legal information and assistance resources for Kentucky residents." },
    fr: { title: "Aide juridique Kentucky", desc: "Ressources juridiques pour résidents du Kentucky." },
    es: { title: "Ayuda Legal Kentucky", desc: "Recursos legales para residentes de Kentucky." },
  },
},
{
  category: "Income",
  link: "https://louisianalawhelp.org",
  states: ["LA"],
  i18n: {
    en: { title: "Louisiana Law Help", desc: "Free legal information and referrals for Louisiana residents." },
    fr: { title: "Aide juridique Louisiane", desc: "Informations juridiques gratuites et orientations en Louisiane." },
    es: { title: "Ayuda Legal Luisiana", desc: "Información legal gratuita y referencias en Luisiana." },
  },
},
{
  category: "Income",
  link: "https://www.ptla.org",
  states: ["ME"],
  i18n: {
    en: { title: "Pine Tree Legal Assistance", desc: "Free legal help for eligible Maine residents." },
    fr: { title: "Pine Tree Legal Assistance", desc: "Aide juridique gratuite pour résidents admissibles du Maine." },
    es: { title: "Pine Tree Legal Assistance", desc: "Ayuda legal gratuita para residentes elegibles de Maine." },
  },
},
{
  category: "Income",
  link: "https://www.peoples-law.org",
  states: ["MD"],
  i18n: {
    en: { title: "Maryland People’s Law Library", desc: "Legal information and self-help resources for Maryland residents." },
    fr: { title: "Bibliothèque juridique Maryland", desc: "Informations juridiques et auto-assistance au Maryland." },
    es: { title: "Biblioteca Legal Maryland", desc: "Información legal y autoayuda en Maryland." },
  },
},
{
  category: "Income",
  link: "https://www.masslegalhelp.org",
  states: ["MA"],
  i18n: {
    en: { title: "MassLegalHelp", desc: "Free legal information and resources for Massachusetts residents." },
    fr: { title: "MassLegalHelp", desc: "Informations juridiques gratuites pour résidents du Massachusetts." },
    es: { title: "MassLegalHelp", desc: "Información legal gratuita para residentes de Massachusetts." },
  },
},
{
  category: "Income",
  link: "https://michiganlegalhelp.org",
  states: ["MI"],
  i18n: {
    en: { title: "Michigan Legal Help", desc: "Legal self-help tools and information for Michigan residents." },
    fr: { title: "Aide juridique Michigan", desc: "Outils d’auto-assistance juridique pour résidents du Michigan." },
    es: { title: "Ayuda Legal Michigan", desc: "Herramientas de autoayuda legal para residentes de Michigan." },
  },
},
{
  category: "Income",
  link: "https://www.lawhelpmn.org",
  states: ["MN"],
  i18n: {
    en: { title: "LawHelpMN", desc: "Minnesota legal aid directory and legal self-help resources." },
    fr: { title: "LawHelpMN", desc: "Répertoire d’aide juridique du Minnesota." },
    es: { title: "LawHelpMN", desc: "Directorio de ayuda legal de Minnesota." },
  },
},
{
  category: "Income",
  link: "https://www.mslegalservices.org",
  states: ["MS"],
  i18n: {
    en: { title: "Mississippi Legal Services", desc: "Legal aid resources for eligible Mississippi residents." },
    fr: { title: "Services juridiques Mississippi", desc: "Ressources d’aide juridique pour résidents admissibles du Mississippi." },
    es: { title: "Servicios Legales Mississippi", desc: "Recursos de ayuda legal para residentes elegibles de Mississippi." },
  },
},
{
  category: "Income",
  link: "https://www.lsmo.org",
  states: ["MO"],
  i18n: {
    en: { title: "Legal Services of Missouri", desc: "Civil legal aid and legal resources for Missouri residents." },
    fr: { title: "Services juridiques Missouri", desc: "Aide juridique civile pour résidents du Missouri." },
    es: { title: "Servicios Legales Missouri", desc: "Ayuda legal civil para residentes de Missouri." },
  },
},
{
  category: "Income",
  link: "https://www.montanalawhelp.org",
  states: ["MT"],
  i18n: {
    en: { title: "Montana Law Help", desc: "Legal information and assistance resources for Montana residents." },
    fr: { title: "Aide juridique Montana", desc: "Informations et aide juridique pour résidents du Montana." },
    es: { title: "Ayuda Legal Montana", desc: "Información y ayuda legal para residentes de Montana." },
  },
},
{
  category: "Income",
  link: "https://www.legalaidofnebraska.org",
  states: ["NE"],
  i18n: {
    en: { title: "Legal Aid of Nebraska", desc: "Free civil legal services for eligible Nebraska residents." },
    fr: { title: "Aide juridique Nebraska", desc: "Services juridiques civils gratuits pour résidents admissibles du Nebraska." },
    es: { title: "Ayuda Legal Nebraska", desc: "Servicios legales civiles gratuitos para residentes elegibles de Nebraska." },
  },
},
{
  category: "Income",
  link: "https://nevadalegalservices.org",
  states: ["NV"],
  i18n: {
    en: { title: "Nevada Legal Services", desc: "Legal aid and civil legal resources for Nevada residents." },
    fr: { title: "Services juridiques Nevada", desc: "Aide juridique civile pour résidents du Nevada." },
    es: { title: "Servicios Legales Nevada", desc: "Ayuda legal civil para residentes de Nevada." },
  },
},
{
  category: "Income",
  link: "https://www.603legalaid.org",
  states: ["NH"],
  i18n: {
    en: { title: "603 Legal Aid", desc: "Legal help and referrals for New Hampshire residents." },
    fr: { title: "603 Legal Aid", desc: "Aide juridique et orientations au New Hampshire." },
    es: { title: "603 Legal Aid", desc: "Ayuda legal y referencias en New Hampshire." },
  },
},
{
  category: "Income",
  link: "https://www.lsnjlaw.org",
  states: ["NJ"],
  i18n: {
    en: { title: "Legal Services of New Jersey", desc: "Free legal information and assistance resources for New Jersey residents." },
    fr: { title: "Services juridiques New Jersey", desc: "Aide juridique gratuite pour résidents du New Jersey." },
    es: { title: "Servicios Legales New Jersey", desc: "Ayuda legal gratuita para residentes de New Jersey." },
  },
},
{
  category: "Income",
  link: "https://www.lawhelpnewmexico.org",
  states: ["NM"],
  i18n: {
    en: { title: "Law Help New Mexico", desc: "Legal aid information and resources for New Mexico residents." },
    fr: { title: "Aide juridique Nouveau-Mexique", desc: "Ressources juridiques pour résidents du Nouveau-Mexique." },
    es: { title: "Ayuda Legal Nuevo México", desc: "Recursos legales para residentes de Nuevo México." },
  },
},
{
  category: "Income",
  link: "https://www.lawhelpny.org",
  states: ["NY"],
  i18n: {
    en: { title: "LawHelpNY", desc: "Find free legal help and legal information in New York." },
    fr: { title: "LawHelpNY", desc: "Trouvez une aide juridique gratuite à New York." },
    es: { title: "LawHelpNY", desc: "Encuentre ayuda legal gratuita en Nueva York." },
  },
},
{
  category: "Income",
  link: "https://www.legalaidnc.org",
  states: ["NC"],
  i18n: {
    en: { title: "Legal Aid of North Carolina", desc: "Free civil legal help for eligible North Carolina residents." },
    fr: { title: "Aide juridique Caroline du Nord", desc: "Aide juridique civile gratuite pour résidents admissibles." },
    es: { title: "Ayuda Legal Carolina del Norte", desc: "Ayuda legal civil gratuita para residentes elegibles." },
  },
},
{
  category: "Income",
  link: "https://www.legalassist.org",
  states: ["ND"],
  i18n: {
    en: { title: "Legal Services of North Dakota", desc: "Legal aid and civil legal help for North Dakota residents." },
    fr: { title: "Services juridiques Dakota du Nord", desc: "Aide juridique civile pour résidents du Dakota du Nord." },
    es: { title: "Servicios Legales Dakota del Norte", desc: "Ayuda legal civil para residentes de Dakota del Norte." },
  },
},
{
  category: "Income",
  link: "https://www.ohiolegalhelp.org",
  states: ["OH"],
  i18n: {
    en: { title: "Ohio Legal Help", desc: "Legal self-help tools and resources for Ohio residents." },
    fr: { title: "Aide juridique Ohio", desc: "Outils juridiques et ressources pour résidents de l’Ohio." },
    es: { title: "Ayuda Legal Ohio", desc: "Herramientas legales y recursos para residentes de Ohio." },
  },
},
{
  category: "Income",
  link: "https://oklaw.org",
  states: ["OK"],
  i18n: {
    en: { title: "OKLaw", desc: "Oklahoma legal information and legal aid resources." },
    fr: { title: "OKLaw", desc: "Informations juridiques et aide juridique en Oklahoma." },
    es: { title: "OKLaw", desc: "Información legal y ayuda legal en Oklahoma." },
  },
},
{
  category: "Income",
  link: "https://oregonlawhelp.org",
  states: ["OR"],
  i18n: {
    en: { title: "Oregon Law Help", desc: "Free legal information and legal aid resources for Oregon residents." },
    fr: { title: "Aide juridique Oregon", desc: "Informations juridiques gratuites pour résidents de l’Oregon." },
    es: { title: "Ayuda Legal Oregon", desc: "Información legal gratuita para residentes de Oregon." },
  },
},
{
  category: "Income",
  link: "https://www.palawhelp.org",
  states: ["PA"],
  i18n: {
    en: { title: "PALawHelp", desc: "Pennsylvania legal aid information and self-help resources." },
    fr: { title: "PALawHelp", desc: "Informations juridiques et auto-assistance en Pennsylvanie." },
    es: { title: "PALawHelp", desc: "Información legal y autoayuda en Pennsylvania." },
  },
},
{
  category: "Income",
  link: "https://www.helprilaw.org",
  states: ["RI"],
  i18n: {
    en: { title: "Rhode Island Legal Services", desc: "Legal aid and civil legal assistance resources in Rhode Island." },
    fr: { title: "Services juridiques Rhode Island", desc: "Aide juridique civile au Rhode Island." },
    es: { title: "Servicios Legales Rhode Island", desc: "Ayuda legal civil en Rhode Island." },
  },
},
{
  category: "Income",
  link: "https://www.sclegal.org",
  states: ["SC"],
  i18n: {
    en: { title: "South Carolina Legal Services", desc: "Civil legal aid for eligible South Carolina residents." },
    fr: { title: "Services juridiques Caroline du Sud", desc: "Aide juridique civile pour résidents admissibles." },
    es: { title: "Servicios Legales Carolina del Sur", desc: "Ayuda legal civil para residentes elegibles." },
  },
},
{
  category: "Income",
  link: "https://www.sdlawhelp.org",
  states: ["SD"],
  i18n: {
    en: { title: "South Dakota Law Help", desc: "Legal information and assistance resources for South Dakota residents." },
    fr: { title: "Aide juridique Dakota du Sud", desc: "Ressources juridiques pour résidents du Dakota du Sud." },
    es: { title: "Ayuda Legal Dakota del Sur", desc: "Recursos legales para residentes de Dakota del Sur." },
  },
},
{
  category: "Income",
  link: "https://www.tnjustice.org",
  states: ["TN"],
  i18n: {
    en: { title: "Tennessee Justice Center", desc: "Legal advocacy and assistance resources for Tennessee families." },
    fr: { title: "Centre justice Tennessee", desc: "Aide et défense juridique pour familles du Tennessee." },
    es: { title: "Centro de Justicia Tennessee", desc: "Defensa y ayuda legal para familias de Tennessee." },
  },
},
{
  category: "Income",
  link: "https://texaslawhelp.org",
  states: ["TX"],
  i18n: {
    en: { title: "Texas Law Help", desc: "Free legal information and self-help tools for Texas residents." },
    fr: { title: "Texas Law Help", desc: "Informations juridiques gratuites pour résidents du Texas." },
    es: { title: "Texas Law Help", desc: "Información legal gratuita para residentes de Texas." },
  },
},
{
  category: "Income",
  link: "https://www.utahlegalservices.org",
  states: ["UT"],
  i18n: {
    en: { title: "Utah Legal Services", desc: "Free legal help for eligible low-income Utah residents." },
    fr: { title: "Services juridiques Utah", desc: "Aide juridique gratuite pour résidents admissibles de l’Utah." },
    es: { title: "Servicios Legales Utah", desc: "Ayuda legal gratuita para residentes elegibles de Utah." },
  },
},
{
  category: "Income",
  link: "https://vtlawhelp.org",
  states: ["VT"],
  i18n: {
    en: { title: "Vermont Law Help", desc: "Legal information and civil legal aid resources in Vermont." },
    fr: { title: "Aide juridique Vermont", desc: "Informations juridiques et aide civile au Vermont." },
    es: { title: "Ayuda Legal Vermont", desc: "Información legal y ayuda civil en Vermont." },
  },
},
{
  category: "Income",
  link: "https://www.valegalaid.org",
  states: ["VA"],
  i18n: {
    en: { title: "Virginia Legal Aid", desc: "Free legal information and legal aid resources for Virginia residents." },
    fr: { title: "Aide juridique Virginie", desc: "Informations juridiques gratuites pour résidents de Virginie." },
    es: { title: "Ayuda Legal Virginia", desc: "Información legal gratuita para residentes de Virginia." },
  },
},
// ===== PROGRAMS 501-550 =====

// FOOD (10)
{
  category: "Food",
  link: "https://www.ampleharvest.org",
  i18n: {
    en: { title: "AmpleHarvest.org", desc: "Connects home and community gardeners with local food pantries to donate surplus produce." },
    fr: { title: "AmpleHarvest.org", desc: "Relie jardiniers et banques alimentaires locales pour donner les surplus de récolte." },
    es: { title: "AmpleHarvest.org", desc: "Conecta jardineros con bancos de alimentos locales para donar excedentes de cosecha." },
  },
},
{
  category: "Food",
  link: "https://www.foodrescue.us",
  i18n: {
    en: { title: "Food Rescue US", desc: "Rescues surplus food and delivers it to organizations serving people facing hunger." },
    fr: { title: "Food Rescue US", desc: "Récupère les surplus alimentaires pour les organismes aidant les personnes dans le besoin." },
    es: { title: "Food Rescue US", desc: "Rescata excedentes de comida y los entrega a organizaciones que ayudan contra el hambre." },
  },
},
{
  category: "Food",
  link: "https://www.wfpusa.org",
  i18n: {
    en: { title: "World Food Program USA Resources", desc: "Information hub on hunger relief efforts and how to find local support." },
    fr: { title: "Ressources World Food Program USA", desc: "Centre d’information sur la lutte contre la faim et l’aide locale." },
    es: { title: "Recursos World Food Program USA", desc: "Centro de información sobre ayuda contra el hambre y apoyo local." },
  },
},
{
  category: "Food",
  link: "https://www.foodisfree.org",
  i18n: {
    en: { title: "Food Is Free Project", desc: "Community-driven free food stands and shared garden resources." },
    fr: { title: "Food Is Free Project", desc: "Étals alimentaires communautaires gratuits et jardins partagés." },
    es: { title: "Food Is Free Project", desc: "Puestos comunitarios de comida gratuita y jardines compartidos." },
  },
},
{
  category: "Food",
  link: "https://www.gleanamerica.org",
  i18n: {
    en: { title: "Society of St. Andrew Gleaning", desc: "Recovers fresh produce from farms and distributes it to people facing hunger." },
    fr: { title: "Glanage Society of St. Andrew", desc: "Récupère des produits frais des fermes pour les personnes dans le besoin." },
    es: { title: "Recolección Society of St. Andrew", desc: "Recupera productos frescos de granjas para personas necesitadas." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/snap/eligibility",
  i18n: {
    en: { title: "SNAP Eligibility Information", desc: "Official guidance on income limits and eligibility rules for SNAP." },
    fr: { title: "Admissibilité SNAP", desc: "Règles officielles de revenu et d’admissibilité pour SNAP." },
    es: { title: "Elegibilidad para SNAP", desc: "Reglas oficiales de ingresos y elegibilidad para SNAP." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/snap/recipient/apply",
  i18n: {
    en: { title: "How to Apply for SNAP", desc: "Step-by-step official guide to applying for SNAP benefits by state." },
    fr: { title: "Comment demander SNAP", desc: "Guide officiel étape par étape pour demander SNAP selon l’État." },
    es: { title: "Cómo Solicitar SNAP", desc: "Guía oficial paso a paso para solicitar SNAP según el estado." },
  },
},
{
  category: "Food",
  link: "https://www.foodbanknews.com/directory",
  i18n: {
    en: { title: "Food Bank News Directory", desc: "News and directory resources for finding local food bank programs." },
    fr: { title: "Répertoire Food Bank News", desc: "Actualités et répertoire des banques alimentaires locales." },
    es: { title: "Directorio Food Bank News", desc: "Noticias y directorio de bancos de alimentos locales." },
  },
},
{
  category: "Food",
  link: "https://www.churchesnet.org/food-pantries",
  i18n: {
    en: { title: "Faith-Based Food Pantry Network", desc: "Directory of church and faith-based emergency food pantries." },
    fr: { title: "Réseau de garde-manger religieux", desc: "Répertoire de banques alimentaires d’organisations religieuses." },
    es: { title: "Red de Despensas Religiosas", desc: "Directorio de despensas de alimentos de organizaciones religiosas." },
  },
},
{
  category: "Food",
  link: "https://www.saintvincentdepaul.org",
  i18n: {
    en: { title: "Society of St. Vincent de Paul", desc: "Local chapters offering food, clothing, and emergency assistance." },
    fr: { title: "Société de Saint-Vincent-de-Paul", desc: "Chapitres locaux offrant nourriture, vêtements et aide d’urgence." },
    es: { title: "Sociedad de San Vicente de Paúl", desc: "Capítulos locales que ofrecen comida, ropa y ayuda de emergencia." },
  },
},

// HEALTH (10)
{
  category: "Health",
  link: "https://www.freeclinics.com",
  i18n: {
    en: { title: "FreeClinics.com Directory", desc: "Searchable directory of free and low-cost health clinics nationwide." },
    fr: { title: "Répertoire FreeClinics.com", desc: "Répertoire de cliniques gratuites ou à faible coût partout au pays." },
    es: { title: "Directorio FreeClinics.com", desc: "Directorio de clínicas gratuitas o de bajo costo a nivel nacional." },
  },
},
{
  category: "Health",
  link: "https://www.211.org/services/health",
  i18n: {
    en: { title: "211 Health Services Directory", desc: "Local health service referrals through the 211 helpline network." },
    fr: { title: "Répertoire santé 211", desc: "Orientation vers services de santé locaux via le réseau 211." },
    es: { title: "Directorio de Salud 211", desc: "Referencias a servicios de salud locales a través de la red 211." },
  },
},
{
  category: "Health",
  link: "https://www.plannedparenthood.org/health-center",
  i18n: {
    en: { title: "Planned Parenthood Health Centers", desc: "Reproductive and sexual health services, often on a sliding scale." },
    fr: { title: "Centres de santé Planned Parenthood", desc: "Services de santé reproductive, souvent à tarif ajusté selon revenu." },
    es: { title: "Centros de Salud Planned Parenthood", desc: "Servicios de salud reproductiva, a menudo con tarifas según ingresos." },
  },
},
{
  category: "Health",
  link: "https://www.va.gov/health-care/",
  i18n: {
    en: { title: "VA Health Care Benefits", desc: "Health care coverage and enrollment information for eligible veterans." },
    fr: { title: "Soins de santé VA", desc: "Couverture santé et inscription pour vétérans admissibles." },
    es: { title: "Atención Médica VA", desc: "Cobertura de salud e inscripción para veteranos elegibles." },
  },
},
{
  category: "Health",
  link: "https://www.cms.gov/marketplace",
  i18n: {
    en: { title: "CMS Health Insurance Marketplace Info", desc: "Federal information on marketplace coverage options and subsidies." },
    fr: { title: "Marché de l’assurance santé CMS", desc: "Informations fédérales sur les options de couverture et subventions." },
    es: { title: "Mercado de Seguros CMS", desc: "Información federal sobre opciones de cobertura y subsidios." },
  },
},
{
  category: "Health",
  link: "https://www.samhsa.gov/medications-substance-use-disorders",
  i18n: {
    en: { title: "SAMHSA Medication-Assisted Treatment", desc: "Information on medication treatment options for substance use disorders." },
    fr: { title: "Traitement médicamenteux SAMHSA", desc: "Informations sur les traitements médicamenteux pour troubles liés aux substances." },
    es: { title: "Tratamiento con Medicamentos SAMHSA", desc: "Información sobre tratamientos con medicamentos para trastornos por sustancias." },
  },
},
{
  category: "Health",
  link: "https://www.crisistextline.org",
  i18n: {
    en: { title: "Crisis Text Line", desc: "Free 24/7 text-based crisis support — text HOME to 741741." },
    fr: { title: "Ligne de crise par texto", desc: "Soutien de crise gratuit 24/7 par texto — envoyez HOME au 741741." },
    es: { title: "Línea de Crisis por Texto", desc: "Apoyo de crisis gratuito 24/7 por mensaje de texto." },
  },
},
{
  category: "Health",
  link: "https://www.thetrevorproject.org",
  i18n: {
    en: { title: "The Trevor Project", desc: "Crisis intervention and suicide prevention for LGBTQ young people." },
    fr: { title: "The Trevor Project", desc: "Intervention de crise et prévention du suicide pour jeunes LGBTQ." },
    es: { title: "The Trevor Project", desc: "Intervención en crisis y prevención del suicidio para jóvenes LGBTQ." },
  },
},
{
  category: "Health",
  link: "https://www.rainn.org",
  i18n: {
    en: { title: "RAINN National Sexual Assault Hotline", desc: "24/7 confidential support for survivors of sexual assault." },
    fr: { title: "Ligne nationale RAINN agression sexuelle", desc: "Soutien confidentiel 24/7 pour survivants d’agression sexuelle." },
    es: { title: "Línea Nacional RAINN de Agresión Sexual", desc: "Apoyo confidencial 24/7 para sobrevivientes de agresión sexual." },
  },
},
{
  category: "Health",
  link: "https://www.cdc.gov/std/",
  i18n: {
    en: { title: "CDC Sexual Health Resources", desc: "Information and testing resources for sexual health and STI prevention." },
    fr: { title: "Ressources santé sexuelle CDC", desc: "Informations et dépistage pour la prévention des IST." },
    es: { title: "Recursos de Salud Sexual CDC", desc: "Información y pruebas para la prevención de ITS." },
  },
},

// HOUSING (10)
{
  category: "Housing",
  link: "https://www.211.org/services/housing",
  i18n: {
    en: { title: "211 Housing Services Directory", desc: "Local housing and shelter referrals through the 211 network." },
    fr: { title: "Répertoire logement 211", desc: "Orientation vers logement et refuges locaux via le réseau 211." },
    es: { title: "Directorio de Vivienda 211", desc: "Referencias a vivienda y refugios locales a través de la red 211." },
  },
},
{
  category: "Housing",
  link: "https://www.va.gov/housing-assistance/",
  i18n: {
    en: { title: "VA Housing Assistance Overview", desc: "Federal overview of housing benefits and homelessness support for veterans." },
    fr: { title: "Aperçu aide logement VA", desc: "Aperçu fédéral des aides logement et sans-abrisme pour vétérans." },
    es: { title: "Resumen de Ayuda de Vivienda VA", desc: "Resumen federal de ayuda de vivienda para veteranos." },
  },
},
{
  category: "Housing",
  link: "https://www.hudexchange.info/programs/rrh/",
  i18n: {
    en: { title: "Rapid Re-Housing Program", desc: "Short-term rental assistance to quickly move people out of homelessness." },
    fr: { title: "Programme de relogement rapide", desc: "Aide au loyer à court terme pour sortir rapidement du sans-abrisme." },
    es: { title: "Programa de Reubicación Rápida", desc: "Ayuda de alquiler a corto plazo para salir de la falta de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.samhsa.gov/homelessness-programs-resources",
  i18n: {
    en: { title: "SAMHSA Homelessness Resources", desc: "Behavioral health resources connected to housing stability programs." },
    fr: { title: "Ressources sans-abrisme SAMHSA", desc: "Ressources de santé mentale liées à la stabilité résidentielle." },
    es: { title: "Recursos de Vivienda SAMHSA", desc: "Recursos de salud conductual vinculados a la estabilidad de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/manufactured_housing",
  i18n: {
    en: { title: "HUD Manufactured Housing Resources", desc: "Information on manufactured and mobile home standards and financing." },
    fr: { title: "Logement préfabriqué HUD", desc: "Informations sur normes et financement des maisons préfabriquées." },
    es: { title: "Vivienda Prefabricada HUD", desc: "Información sobre normas y financiamiento de casas prefabricadas." },
  },
},
{
  category: "Housing",
  link: "https://www.consumerfinance.gov/consumer-tools/manufactured-housing/",
  i18n: {
    en: { title: "CFPB Manufactured Housing Loans", desc: "Consumer guidance on financing manufactured and mobile homes." },
    fr: { title: "Prêts logement préfabriqué CFPB", desc: "Conseils sur le financement des maisons préfabriquées." },
    es: { title: "Préstamos de Vivienda Prefabricada CFPB", desc: "Orientación sobre financiamiento de casas prefabricadas." },
  },
},
{
  category: "Housing",
  link: "https://www.usda.gov/topics/rural/housing",
  i18n: {
    en: { title: "USDA Rural Housing Overview", desc: "Overview of USDA loan, grant, and rental programs for rural residents." },
    fr: { title: "Aperçu logement rural USDA", desc: "Aperçu des prêts et subventions USDA pour résidents ruraux." },
    es: { title: "Resumen de Vivienda Rural USDA", desc: "Resumen de préstamos y subvenciones para residentes rurales." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/information_for_veterans",
  i18n: {
    en: { title: "HUD Housing Information for Veterans", desc: "Housing programs and resources tailored for eligible veterans." },
    fr: { title: "Logement HUD pour vétérans", desc: "Programmes de logement pour vétérans admissibles." },
    es: { title: "Vivienda HUD para Veteranos", desc: "Programas de vivienda para veteranos elegibles." },
  },
},
{
  category: "Housing",
  link: "https://www.hudexchange.info/programs/pha-contact-information/",
  i18n: {
    en: { title: "Public Housing Agency Contact Directory", desc: "Find your local public housing agency for vouchers and applications." },
    fr: { title: "Répertoire agences logement public", desc: "Trouvez l’agence de logement public locale pour bons et demandes." },
    es: { title: "Directorio de Agencias de Vivienda Pública", desc: "Encuentre su agencia local de vivienda pública para vales y solicitudes." },
  },
},
{
  category: "Housing",
  link: "https://www.rd.usda.gov/programs-services/all-programs",
  i18n: {
    en: { title: "USDA Rural Development All Programs", desc: "Full list of USDA rural housing, utility, and business programs." },
    fr: { title: "Tous les programmes USDA rural", desc: "Liste complète des programmes ruraux USDA logement et services." },
    es: { title: "Todos los Programas USDA Rural", desc: "Lista completa de programas rurales USDA de vivienda y servicios." },
  },
},

// UTILITIES (5)
{
  category: "Utilities",
  link: "https://www.energy.gov/scep/slsc/technical-assistance",
  i18n: {
    en: { title: "State Energy Technical Assistance", desc: "Technical support resources for state and local energy efficiency programs." },
    fr: { title: "Assistance technique énergie d’État", desc: "Soutien technique pour programmes d’efficacité énergétique locaux." },
    es: { title: "Asistencia Técnica Energética Estatal", desc: "Apoyo técnico para programas de eficiencia energética locales." },
  },
},
{
  category: "Utilities",
  link: "https://www.epa.gov/energy",
  i18n: {
    en: { title: "EPA Energy and Environment Resources", desc: "Environmental and energy resources that may help reduce household costs." },
    fr: { title: "Ressources énergie et environnement EPA", desc: "Ressources pouvant aider à réduire les coûts du ménage." },
    es: { title: "Recursos de Energía y Ambiente EPA", desc: "Recursos que pueden ayudar a reducir los costos del hogar." },
  },
},
{
  category: "Utilities",
  link: "https://www.usa.gov/utility-shutoff-protections",
  i18n: {
    en: { title: "Utility Shutoff Protections Guide", desc: "Government guide to rules protecting households from utility shutoffs." },
    fr: { title: "Protections contre coupure de service", desc: "Guide gouvernemental sur les protections contre les coupures." },
    es: { title: "Guía de Protecciones contra Cortes de Servicio", desc: "Guía del gobierno sobre protecciones contra cortes de servicio." },
  },
},
{
  category: "Utilities",
  link: "https://www.consumerfinance.gov/consumer-tools/utility-bills/",
  i18n: {
    en: { title: "CFPB Utility Bill Help", desc: "Consumer guidance for managing and disputing utility bill issues." },
    fr: { title: "Aide factures services publics CFPB", desc: "Conseils pour gérer et contester des factures de services." },
    es: { title: "Ayuda con Facturas de Servicios CFPB", desc: "Orientación para manejar y disputar facturas de servicios." },
  },
},
{
  category: "Utilities",
  link: "https://www.nlc.org/resource/utility-assistance-programs/",
  i18n: {
    en: { title: "National League of Cities Utility Assistance Guide", desc: "Municipal-level guide to local utility assistance programs." },
    fr: { title: "Guide aide services publics NLC", desc: "Guide municipal des programmes locaux d’aide aux services publics." },
    es: { title: "Guía de Asistencia de Servicios NLC", desc: "Guía municipal de programas locales de asistencia de servicios." },
  },
},

// EDUCATION (8)
{
  category: "Education",
  link: "https://www.khanacademy.org",
  i18n: {
    en: { title: "Khan Academy", desc: "Free online courses covering math, science, and test prep for all ages." },
    fr: { title: "Khan Academy", desc: "Cours en ligne gratuits en mathématiques, sciences et préparation aux tests." },
    es: { title: "Khan Academy", desc: "Cursos en línea gratuitos de matemáticas, ciencias y preparación de exámenes." },
  },
},
{
  category: "Education",
  link: "https://www.gcflearnfree.org",
  i18n: {
    en: { title: "GCFGlobal Learn Free", desc: "Free tutorials on computer skills, careers, and everyday life topics." },
    fr: { title: "GCFGlobal Learn Free", desc: "Tutoriels gratuits sur l’informatique, l’emploi et la vie quotidienne." },
    es: { title: "GCFGlobal Learn Free", desc: "Tutoriales gratuitos sobre informática, empleo y vida cotidiana." },
  },
},
{
  category: "Education",
  link: "https://www.digitallearn.org",
  i18n: {
    en: { title: "DigitalLearn.org", desc: "Free digital literacy courses for beginners, including computer basics." },
    fr: { title: "DigitalLearn.org", desc: "Cours gratuits d’alphabétisation numérique pour débutants." },
    es: { title: "DigitalLearn.org", desc: "Cursos gratuitos de alfabetización digital para principiantes." },
  },
},
{
  category: "Education",
  link: "https://www.ala.org/aboutala/offices/diversity/adultliteracy",
  i18n: {
    en: { title: "American Library Association Adult Literacy Resources", desc: "Library-based adult literacy programs and resource directories." },
    fr: { title: "Ressources alphabétisation ALA", desc: "Programmes d’alphabétisation adulte en bibliothèque." },
    es: { title: "Recursos de Alfabetización ALA", desc: "Programas de alfabetización de adultos en bibliotecas." },
  },
},
{
  category: "Education",
  link: "https://www.ed.gov/laws-and-policy/laws-preschool-grade-12-education/every-student-succeeds-act",
  i18n: {
    en: { title: "Every Student Succeeds Act Info", desc: "Federal K-12 education law information and family resources." },
    fr: { title: "Loi Every Student Succeeds", desc: "Informations sur la loi fédérale d’éducation K-12 et ressources familiales." },
    es: { title: "Ley Every Student Succeeds", desc: "Información sobre la ley federal de educación K-12 y recursos familiares." },
  },
},
{
  category: "Education",
  link: "https://www.finaid.org",
  i18n: {
    en: { title: "FinAid.org", desc: "Independent guide to scholarships, loans, and financial aid planning." },
    fr: { title: "FinAid.org", desc: "Guide indépendant sur bourses, prêts et planification de l’aide financière." },
    es: { title: "FinAid.org", desc: "Guía independiente de becas, préstamos y planificación de ayuda financiera." },
  },
},
{
  category: "Education",
  link: "https://www.scholarships.com",
  i18n: {
    en: { title: "Scholarships.com", desc: "Searchable database of scholarships for students at all levels." },
    fr: { title: "Scholarships.com", desc: "Base de données de bourses pour étudiants de tous niveaux." },
    es: { title: "Scholarships.com", desc: "Base de datos de becas para estudiantes de todos los niveles." },
  },
},
{
  category: "Education",
  link: "https://www.communitycollegereview.com",
  i18n: {
    en: { title: "Community College Review", desc: "Compare community colleges by cost, programs, and location." },
    fr: { title: "Community College Review", desc: "Comparez les collèges communautaires par coût et programmes." },
    es: { title: "Community College Review", desc: "Compare colegios comunitarios por costo y programas." },
  },
},

// INCOME (7)
{
  category: "Income",
  link: "https://www.usa.gov/child-support",
  i18n: {
    en: { title: "Child Support Services Guide", desc: "Government guide to applying for and managing child support services." },
    fr: { title: "Guide pension alimentaire", desc: "Guide gouvernemental pour demander et gérer la pension alimentaire." },
    es: { title: "Guía de Manutención Infantil", desc: "Guía del gobierno para solicitar y gestionar la manutención infantil." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/military-benefits",
  i18n: {
    en: { title: "Military and Veteran Benefits Guide", desc: "Government guide to benefits for active duty, veterans, and families." },
    fr: { title: "Guide prestations militaires", desc: "Guide gouvernemental des prestations pour militaires et familles." },
    es: { title: "Guía de Beneficios Militares", desc: "Guía del gobierno de beneficios para militares y familias." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/retirement",
  i18n: {
    en: { title: "USA.gov Retirement Guide", desc: "Government guide to retirement planning and benefit programs." },
    fr: { title: "Guide retraite USA.gov", desc: "Guide gouvernemental de planification de la retraite." },
    es: { title: "Guía de Jubilación USA.gov", desc: "Guía del gobierno para la planificación de la jubilación." },
  },
},
{
  category: "Income",
  link: "https://www.mymoney.gov",
  i18n: {
    en: { title: "MyMoney.gov", desc: "Federal financial literacy portal with budgeting and savings resources." },
    fr: { title: "MyMoney.gov", desc: "Portail fédéral d’éducation financière avec ressources budgétaires." },
    es: { title: "MyMoney.gov", desc: "Portal federal de educación financiera con recursos de presupuesto." },
  },
},
{
  category: "Income",
  link: "https://www.consumerfinance.gov/consumer-tools/prepaid-cards/",
  i18n: {
    en: { title: "CFPB Prepaid Card Guidance", desc: "Consumer information on using prepaid cards safely." },
    fr: { title: "Conseils cartes prépayées CFPB", desc: "Informations pour utiliser les cartes prépayées en toute sécurité." },
    es: { title: "Guía de Tarjetas Prepagadas CFPB", desc: "Información para usar tarjetas prepagadas de forma segura." },
  },
},
{
  category: "Income",
  link: "https://www.fdic.gov/getbanked",
  i18n: {
    en: { title: "FDIC GetBanked", desc: "Resources to help unbanked households open a safe, affordable bank account." },
    fr: { title: "FDIC GetBanked", desc: "Ressources pour ouvrir un compte bancaire sûr et abordable." },
    es: { title: "FDIC GetBanked", desc: "Recursos para abrir una cuenta bancaria segura y asequible." },
  },
},
{
  category: "Income",
  link: "https://www.mint.intuit.com",
  i18n: {
    en: { title: "Free Budgeting Tools", desc: "Free tools to track spending and build a household budget." },
    fr: { title: "Outils budgétaires gratuits", desc: "Outils gratuits pour suivre les dépenses et créer un budget." },
    es: { title: "Herramientas de Presupuesto Gratuitas", desc: "Herramientas gratuitas para rastrear gastos y crear un presupuesto." },
  },
},
  
  // ===== PROGRAMS 551-600 =====

// FOOD (8)
{
  category: "Food",
  link: "https://www.angelfoodministries.com",
  i18n: {
    en: { title: "Community Food Co-op Programs", desc: "Bulk discount food box programs available through local community groups." },
    fr: { title: "Programmes coopératifs alimentaires", desc: "Programmes de boîtes alimentaires à prix réduit via des groupes communautaires." },
    es: { title: "Programas Cooperativos de Alimentos", desc: "Programas de cajas de alimentos a precio reducido a través de grupos comunitarios." },
  },
},
{
  category: "Food",
  link: "https://www.growingpower.org",
  i18n: {
    en: { title: "Urban Agriculture & Food Access Programs", desc: "Community gardens and urban farming initiatives improving local food access." },
    fr: { title: "Programmes d'agriculture urbaine", desc: "Jardins communautaires et initiatives agricoles urbaines pour l'accès alimentaire." },
    es: { title: "Programas de Agricultura Urbana", desc: "Jardines comunitarios e iniciativas agrícolas urbanas para el acceso a alimentos." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/fdpir/fdpir-income-deductions",
  i18n: {
    en: { title: "FDPIR Eligibility Guidance", desc: "Income and deduction guidance for the Food Distribution Program on Indian Reservations." },
    fr: { title: "Admissibilité FDPIR", desc: "Directives sur le revenu pour le programme de distribution alimentaire dans les réserves." },
    es: { title: "Guía de Elegibilidad FDPIR", desc: "Guía de ingresos para el programa de distribución de alimentos en reservas." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/wic/wic-eligibility-requirements",
  i18n: {
    en: { title: "WIC Eligibility Requirements", desc: "Official income and eligibility rules for the WIC program." },
    fr: { title: "Conditions d'admissibilité WIC", desc: "Règles officielles de revenu et d'admissibilité pour WIC." },
    es: { title: "Requisitos de Elegibilidad WIC", desc: "Reglas oficiales de ingresos y elegibilidad para WIC." },
  },
},
{
  category: "Food",
  link: "https://www.911foodrescue.org",
  i18n: {
    en: { title: "911 Food Rescue", desc: "Connects surplus food from businesses to people facing food insecurity." },
    fr: { title: "911 Food Rescue", desc: "Relie les surplus alimentaires des entreprises aux personnes en insécurité alimentaire." },
    es: { title: "911 Food Rescue", desc: "Conecta excedentes de alimentos de empresas con personas en inseguridad alimentaria." },
  },
},
{
  category: "Food",
  link: "https://www.communityfoodbank.net",
  i18n: {
    en: { title: "Community Food Bank Network Search", desc: "Search tool for regional community food bank networks." },
    fr: { title: "Recherche réseau banques alimentaires", desc: "Outil de recherche pour les réseaux régionaux de banques alimentaires." },
    es: { title: "Búsqueda de Red de Bancos de Alimentos", desc: "Herramienta de búsqueda para redes regionales de bancos de alimentos." },
  },
},
{
  category: "Food",
  link: "https://www.rescuingleftovercuisine.org",
  i18n: {
    en: { title: "Rescuing Leftover Cuisine", desc: "Redistributes surplus food from restaurants and events to communities in need." },
    fr: { title: "Rescuing Leftover Cuisine", desc: "Redistribue les surplus de restaurants et événements aux communautés dans le besoin." },
    es: { title: "Rescuing Leftover Cuisine", desc: "Redistribuye excedentes de restaurantes y eventos a comunidades necesitadas." },
  },
},
{
  category: "Food",
  link: "https://www.cityharvest.org",
  i18n: {
    en: { title: "City Harvest Food Rescue", desc: "Food rescue and redistribution network serving urban communities." },
    fr: { title: "City Harvest Food Rescue", desc: "Réseau de récupération et redistribution alimentaire pour communautés urbaines." },
    es: { title: "City Harvest Food Rescue", desc: "Red de rescate y redistribución de alimentos para comunidades urbanas." },
  },
},

// HEALTH (10)
{
  category: "Health",
  link: "https://www.samhsa.gov/find-help/988",
  i18n: {
    en: { title: "SAMHSA 988 Resources", desc: "Federal information and resources about the 988 Suicide & Crisis Lifeline." },
    fr: { title: "Ressources SAMHSA 988", desc: "Informations fédérales sur la ligne 988 de suicide et de crise." },
    es: { title: "Recursos SAMHSA 988", desc: "Información federal sobre la línea 988 de suicidio y crisis." },
  },
},
{
  category: "Health",
  link: "https://www.nsvrc.org",
  i18n: {
    en: { title: "National Sexual Violence Resource Center", desc: "Information and support resources related to sexual violence prevention." },
    fr: { title: "Centre national ressources violence sexuelle", desc: "Informations et ressources sur la prévention de la violence sexuelle." },
    es: { title: "Centro Nacional de Recursos sobre Violencia Sexual", desc: "Información y recursos sobre prevención de violencia sexual." },
  },
},
{
  category: "Health",
  link: "https://www.datocms-assets.com/psychologytoday",
  i18n: {
    en: { title: "Psychology Today Therapist Finder", desc: "Directory to find therapists, including those offering sliding-scale fees." },
    fr: { title: "Recherche thérapeutes Psychology Today", desc: "Répertoire pour trouver des thérapeutes, y compris à tarifs ajustés." },
    es: { title: "Buscador de Terapeutas Psychology Today", desc: "Directorio para encontrar terapeutas, incluidos los de tarifa ajustada." },
  },
},
{
  category: "Health",
  link: "https://www.openpathcollective.org",
  i18n: {
    en: { title: "Open Path Collective", desc: "Affordable therapy sessions for individuals, couples, and families." },
    fr: { title: "Open Path Collective", desc: "Séances de thérapie abordables pour individus, couples et familles." },
    es: { title: "Open Path Collective", desc: "Sesiones de terapia asequibles para individuos, parejas y familias." },
  },
},
{
  category: "Health",
  link: "https://www.freerehabcenters.org",
  i18n: {
    en: { title: "Free Rehab Centers Directory", desc: "Directory of free and low-cost addiction treatment centers." },
    fr: { title: "Répertoire centres de réhabilitation gratuits", desc: "Répertoire des centres de traitement des dépendances gratuits ou abordables." },
    es: { title: "Directorio de Centros de Rehabilitación Gratuitos", desc: "Directorio de centros de tratamiento de adicciones gratuitos o de bajo costo." },
  },
},
{
  category: "Health",
  link: "https://www.hrsa.gov/opioid-epidemic",
  i18n: {
    en: { title: "HRSA Opioid Epidemic Resources", desc: "Federal resources for opioid use disorder treatment and prevention." },
    fr: { title: "Ressources épidémie opioïdes HRSA", desc: "Ressources fédérales pour le traitement des troubles liés aux opioïdes." },
    es: { title: "Recursos sobre Epidemia de Opioides HRSA", desc: "Recursos federales para el tratamiento de trastornos por opioides." },
  },
},
{
  category: "Health",
  link: "https://www.samhsa.gov/find-help/harm-reduction",
  i18n: {
    en: { title: "SAMHSA Harm Reduction Resources", desc: "Federal harm reduction information and program resources." },
    fr: { title: "Ressources réduction des méfaits SAMHSA", desc: "Informations fédérales sur la réduction des méfaits." },
    es: { title: "Recursos de Reducción de Daños SAMHSA", desc: "Información federal sobre reducción de daños." },
  },
},
{
  category: "Health",
  link: "https://www.hillsidechildrenscenter.org",
  i18n: {
    en: { title: "Children's Behavioral Health Resource Directory", desc: "Directory-style resources for children's mental and behavioral health services." },
    fr: { title: "Répertoire santé comportementale enfants", desc: "Ressources pour les services de santé mentale et comportementale des enfants." },
    es: { title: "Directorio de Salud Conductual Infantil", desc: "Recursos para servicios de salud mental y conductual infantil." },
  },
},
{
  category: "Health",
  link: "https://www.postpartum.net",
  i18n: {
    en: { title: "Postpartum Support International", desc: "Support and resources for perinatal mental health concerns." },
    fr: { title: "Postpartum Support International", desc: "Soutien et ressources pour la santé mentale périnatale." },
    es: { title: "Postpartum Support International", desc: "Apoyo y recursos para la salud mental perinatal." },
  },
},
{
  category: "Health",
  link: "https://www.give.org",
  i18n: {
    en: { title: "BBB Give.org Charity Health Directory", desc: "Verify and find accredited health-related charities." },
    fr: { title: "Répertoire caritatif santé BBB Give.org", desc: "Vérifiez et trouvez des organismes de bienfaisance en santé accrédités." },
    es: { title: "Directorio de Caridad de Salud BBB Give.org", desc: "Verifique y encuentre organizaciones benéficas de salud acreditadas." },
  },
},

// HOUSING (10)
{
  category: "Housing",
  link: "https://www.hudexchange.info/programs/hmis/",
  i18n: {
    en: { title: "Homeless Management Information Systems Info", desc: "Information on local systems that coordinate homelessness services." },
    fr: { title: "Systèmes d'information sans-abrisme", desc: "Informations sur les systèmes locaux coordonnant les services aux sans-abri." },
    es: { title: "Información de Sistemas de Gestión para Personas sin Hogar", desc: "Información sobre sistemas locales que coordinan servicios." },
  },
},
{
  category: "Housing",
  link: "https://www.covenanthouse.org",
  i18n: {
    en: { title: "Covenant House", desc: "Shelter and support services for homeless and at-risk youth." },
    fr: { title: "Covenant House", desc: "Refuge et services de soutien pour jeunes sans-abri ou à risque." },
    es: { title: "Covenant House", desc: "Refugio y servicios de apoyo para jóvenes sin hogar o en riesgo." },
  },
},
{
  category: "Housing",
  link: "https://www.familypromise.org",
  i18n: {
    en: { title: "Family Promise", desc: "Shelter, case management, and stability support for homeless families." },
    fr: { title: "Family Promise", desc: "Refuge, gestion de cas et soutien à la stabilité pour familles sans-abri." },
    es: { title: "Family Promise", desc: "Refugio, gestión de casos y apoyo para familias sin hogar." },
  },
},
{
  category: "Housing",
  link: "https://www.volunteersofamerica.org/housing",
  i18n: {
    en: { title: "Volunteers of America Housing Programs", desc: "Affordable housing and supportive services across many communities." },
    fr: { title: "Programmes logement Volunteers of America", desc: "Logement abordable et services de soutien dans de nombreuses communautés." },
    es: { title: "Programas de Vivienda Volunteers of America", desc: "Vivienda asequible y servicios de apoyo en muchas comunidades." },
  },
},
{
  category: "Housing",
  link: "https://www.salvationarmyusa.org/usn/housing/",
  i18n: {
    en: { title: "Salvation Army Housing Services", desc: "Emergency shelter and transitional housing programs nationwide." },
    fr: { title: "Services logement Armée du Salut", desc: "Refuge d'urgence et logement transitoire à l'échelle nationale." },
    es: { title: "Servicios de Vivienda del Ejército de Salvación", desc: "Refugio de emergencia y vivienda transitoria a nivel nacional." },
  },
},
{
  category: "Housing",
  link: "https://www.catholiccharitiesusa.org/find-help/",
  i18n: {
    en: { title: "Catholic Charities Housing Help", desc: "Local housing assistance and emergency services through Catholic Charities." },
    fr: { title: "Aide logement Catholic Charities", desc: "Aide au logement et services d'urgence locaux via Catholic Charities." },
    es: { title: "Ayuda de Vivienda Catholic Charities", desc: "Asistencia de vivienda y servicios de emergencia a través de Catholic Charities." },
  },
},
{
  category: "Housing",
  link: "https://www.jfna.org/find-help",
  i18n: {
    en: { title: "Jewish Federations Housing & Family Services", desc: "Local housing and family support services through Jewish Federations." },
    fr: { title: "Services logement Jewish Federations", desc: "Services locaux de logement et de soutien familial via Jewish Federations." },
    es: { title: "Servicios de Vivienda Jewish Federations", desc: "Servicios locales de vivienda y apoyo familiar." },
  },
},
{
  category: "Housing",
  link: "https://www.unitedwaywilming.org/housing",
  i18n: {
    en: { title: "United Way Housing Stability Programs", desc: "Local United Way chapters offering housing stability assistance." },
    fr: { title: "Programmes stabilité logement United Way", desc: "Chapitres locaux United Way offrant une aide à la stabilité résidentielle." },
    es: { title: "Programas de Estabilidad de Vivienda United Way", desc: "Capítulos locales de United Way que ofrecen ayuda de estabilidad de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/rental_assistance/tenantrights",
  i18n: {
    en: { title: "HUD Tenant Rights Information", desc: "Federal information on tenant rights in HUD-assisted housing." },
    fr: { title: "Droits des locataires HUD", desc: "Informations fédérales sur les droits des locataires dans le logement subventionné HUD." },
    es: { title: "Derechos del Inquilino HUD", desc: "Información federal sobre derechos de inquilinos en vivienda asistida por HUD." },
  },
},
{
  category: "Housing",
  link: "https://www.stewards.org",
  i18n: {
    en: { title: "Community Land Trust Directory", desc: "Directory of community land trusts supporting long-term affordable housing." },
    fr: { title: "Répertoire fiducies foncières communautaires", desc: "Répertoire des fiducies foncières soutenant le logement abordable à long terme." },
    es: { title: "Directorio de Fideicomisos de Tierra Comunitarios", desc: "Directorio de fideicomisos que apoyan vivienda asequible a largo plazo." },
  },
},

// UTILITIES (7)
{
  category: "Utilities",
  link: "https://www.salvationarmyusa.org/usn/utility-assistance/",
  i18n: {
    en: { title: "Salvation Army Utility Assistance", desc: "Emergency utility bill assistance through local Salvation Army units." },
    fr: { title: "Aide services publics Armée du Salut", desc: "Aide d'urgence aux factures via les unités locales de l'Armée du Salut." },
    es: { title: "Asistencia de Servicios Ejército de Salvación", desc: "Ayuda de emergencia con facturas a través de unidades locales." },
  },
},
{
  category: "Utilities",
  link: "https://www.catholiccharitiesusa.org/find-help/utility-assistance/",
  i18n: {
    en: { title: "Catholic Charities Utility Assistance", desc: "Local emergency utility bill assistance through Catholic Charities." },
    fr: { title: "Aide services publics Catholic Charities", desc: "Aide d'urgence locale aux factures via Catholic Charities." },
    es: { title: "Asistencia de Servicios Catholic Charities", desc: "Ayuda local de emergencia con facturas de servicios." },
  },
},
{
  category: "Utilities",
  link: "https://www.unitedway.org/find-your-united-way",
  i18n: {
    en: { title: "Find Your Local United Way", desc: "Locate the United Way chapter serving your community for utility and other help." },
    fr: { title: "Trouver votre United Way local", desc: "Trouvez le chapitre United Way de votre communauté pour de l'aide." },
    es: { title: "Encuentre su United Way Local", desc: "Localice el capítulo de United Way que sirve a su comunidad." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/eere/buildings/home-energy-audits",
  i18n: {
    en: { title: "Home Energy Audit Guidance", desc: "Federal guidance on getting a home energy audit to lower utility costs." },
    fr: { title: "Guide audit énergétique domicile", desc: "Conseils fédéraux pour un audit énergétique réduisant les coûts." },
    es: { title: "Guía de Auditoría Energética del Hogar", desc: "Orientación federal para reducir costos de servicios." },
  },
},
{
  category: "Utilities",
  link: "https://www.consumer.ftc.gov/articles/utility-scams",
  i18n: {
    en: { title: "FTC Utility Scam Protection", desc: "Consumer guidance to recognize and avoid utility-related scams." },
    fr: { title: "Protection arnaques services publics FTC", desc: "Conseils pour reconnaître et éviter les arnaques liées aux services." },
    es: { title: "Protección contra Estafas de Servicios FTC", desc: "Orientación para reconocer y evitar estafas de servicios públicos." },
  },
},
{
  category: "Utilities",
  link: "https://www.211.org/services/utilities",
  i18n: {
    en: { title: "211 Utility Assistance Directory", desc: "Local utility bill assistance referrals through the 211 network." },
    fr: { title: "Répertoire aide services publics 211", desc: "Orientation vers l'aide aux factures via le réseau 211." },
    es: { title: "Directorio de Asistencia de Servicios 211", desc: "Referencias de ayuda con facturas a través de la red 211." },
  },
},
{
  category: "Utilities",
  link: "https://www.usa.gov/help-with-water-bills",
  i18n: {
    en: { title: "Help With Water Bills Guide", desc: "Government guide to water bill assistance programs." },
    fr: { title: "Guide aide factures d'eau", desc: "Guide gouvernemental pour l'aide aux factures d'eau." },
    es: { title: "Guía de Ayuda con Facturas de Agua", desc: "Guía del gobierno sobre asistencia para facturas de agua." },
  },
},

// EDUCATION (8)
{
  category: "Education",
  link: "https://www.mooc-list.com",
  i18n: {
    en: { title: "MOOC List", desc: "Directory of free massive open online courses across many subjects." },
    fr: { title: "MOOC List", desc: "Répertoire de cours en ligne massifs et gratuits sur de nombreux sujets." },
    es: { title: "MOOC List", desc: "Directorio de cursos en línea masivos y gratuitos en muchos temas." },
  },
},
{
  category: "Education",
  link: "https://www.udemy.com/topic/free-courses/",
  i18n: {
    en: { title: "Udemy Free Courses", desc: "Selection of free online courses across professional and personal topics." },
    fr: { title: "Cours gratuits Udemy", desc: "Sélection de cours en ligne gratuits sur des sujets professionnels et personnels." },
    es: { title: "Cursos Gratuitos Udemy", desc: "Selección de cursos en línea gratuitos sobre temas profesionales y personales." },
  },
},
{
  category: "Education",
  link: "https://www.futurelearn.com",
  i18n: {
    en: { title: "FutureLearn", desc: "Online courses from universities, many available free to audit." },
    fr: { title: "FutureLearn", desc: "Cours en ligne d'universités, plusieurs gratuits en mode audit." },
    es: { title: "FutureLearn", desc: "Cursos en línea de universidades, muchos gratuitos para auditar." },
  },
},
{
  category: "Education",
  link: "https://www.codecademy.com",
  i18n: {
    en: { title: "Codecademy", desc: "Free introductory coding lessons across many programming languages." },
    fr: { title: "Codecademy", desc: "Leçons de programmation gratuites dans de nombreux langages." },
    es: { title: "Codecademy", desc: "Lecciones gratuitas de programación en muchos lenguajes." },
  },
},
{
  category: "Education",
  link: "https://www.freecodecamp.org",
  i18n: {
    en: { title: "freeCodeCamp", desc: "Free coding curriculum and certifications for web development." },
    fr: { title: "freeCodeCamp", desc: "Programme de codage gratuit et certifications pour le développement web." },
    es: { title: "freeCodeCamp", desc: "Currículo de programación gratuito y certificaciones para desarrollo web." },
  },
},
{
  category: "Education",
  link: "https://www.usa.gov/adult-education",
  i18n: {
    en: { title: "USA.gov Adult Education Guide", desc: "Government guide to GED, ESL, and adult basic education programs." },
    fr: { title: "Guide éducation adultes USA.gov", desc: "Guide gouvernemental sur GED, ESL et éducation de base pour adultes." },
    es: { title: "Guía de Educación de Adultos USA.gov", desc: "Guía del gobierno sobre GED, ESL y educación básica para adultos." },
  },
},
{
  category: "Education",
  link: "https://www.usa.gov/vocational-rehabilitation",
  i18n: {
    en: { title: "USA.gov Vocational Rehabilitation Guide", desc: "Government guide to state vocational rehabilitation services." },
    fr: { title: "Guide réadaptation professionnelle USA.gov", desc: "Guide gouvernemental sur les services de réadaptation professionnelle." },
    es: { title: "Guía de Rehabilitación Vocacional USA.gov", desc: "Guía del gobierno sobre servicios de rehabilitación vocacional." },
  },
},
{
  category: "Education",
  link: "https://www.bigfuture.collegeboard.org",
  i18n: {
    en: { title: "BigFuture by College Board", desc: "College planning, scholarship search, and financial aid tools." },
    fr: { title: "BigFuture par College Board", desc: "Planification universitaire, recherche de bourses et outils d'aide financière." },
    es: { title: "BigFuture de College Board", desc: "Planificación universitaria, búsqueda de becas y herramientas de ayuda financiera." },
  },
},

// INCOME (7)
{
  category: "Income",
  link: "https://www.gogetfunding.com/community-support",
  i18n: {
    en: { title: "Community Crowdfunding Resources", desc: "Guidance on using crowdfunding platforms for emergency financial needs." },
    fr: { title: "Ressources sociofinancement communautaire", desc: "Conseils sur l'utilisation des plateformes de sociofinancement pour urgences." },
    es: { title: "Recursos de Financiamiento Colectivo Comunitario", desc: "Orientación sobre plataformas de financiamiento para necesidades urgentes." },
  },
},
{
  category: "Income",
  link: "https://www.211.org/services/financial-assistance",
  i18n: {
    en: { title: "211 Financial Assistance Directory", desc: "Local emergency financial assistance referrals through the 211 network." },
    fr: { title: "Répertoire aide financière 211", desc: "Orientation vers l'aide financière d'urgence via le réseau 211." },
    es: { title: "Directorio de Asistencia Financiera 211", desc: "Referencias de ayuda financiera de emergencia a través de la red 211." },
  },
},
{
  category: "Income",
  link: "https://www.modestneeds.org",
  i18n: {
    en: { title: "Modest Needs", desc: "Small emergency grants to help working individuals avoid financial crisis." },
    fr: { title: "Modest Needs", desc: "Petites subventions d'urgence pour aider les travailleurs à éviter une crise financière." },
    es: { title: "Modest Needs", desc: "Pequeñas subvenciones de emergencia para ayudar a trabajadores a evitar crisis financieras." },
  },
},
{
  category: "Income",
  link: "https://www.uwaysite.org/emergency-financial-assistance",
  i18n: {
    en: { title: "United Way Emergency Financial Assistance", desc: "Local emergency financial help through United Way affiliates." },
    fr: { title: "Aide financière d'urgence United Way", desc: "Aide financière d'urgence locale via les affiliés United Way." },
    es: { title: "Asistencia Financiera de Emergencia United Way", desc: "Ayuda financiera de emergencia local a través de afiliados de United Way." },
  },
},
{
  category: "Income",
  link: "https://www.stgeorgeutah.gov/emergency-assistance",
  i18n: {
    en: { title: "Local Government Emergency Assistance Portals", desc: "Example of municipal emergency financial assistance programs." },
    fr: { title: "Portails d'aide d'urgence municipaux", desc: "Exemple de programmes municipaux d'aide financière d'urgence." },
    es: { title: "Portales de Asistencia de Emergencia Municipal", desc: "Ejemplo de programas municipales de asistencia financiera de emergencia." },
  },
},
{
  category: "Income",
  link: "https://www.gofundme.com/c/community",
  i18n: {
    en: { title: "GoFundMe Community Support", desc: "Platform for community fundraising for emergencies and hardship." },
    fr: { title: "Soutien communautaire GoFundMe", desc: "Plateforme de collecte de fonds communautaire pour urgences et difficultés." },
    es: { title: "Apoyo Comunitario GoFundMe", desc: "Plataforma de recaudación de fondos comunitaria para emergencias." },
  },
},
{
  category: "Income",
  link: "https://www.211.org/services/income",
  i18n: {
    en: { title: "211 Income Support Directory", desc: "Local income and cash assistance referrals through the 211 network." },
    fr: { title: "Répertoire soutien revenu 211", desc: "Orientation vers l'aide au revenu via le réseau 211." },
    es: { title: "Directorio de Apoyo de Ingresos 211", desc: "Referencias de ayuda de ingresos a través de la red 211." },
  },
},

  // ===== PROGRAMS 601-650 =====

// FOOD (8)
{
  category: "Food",
  link: "https://www.acf.hhs.gov/ocs/programs/csfp",
  i18n: {
    en: { title: "ACF Commodity Supplemental Food Program Info", desc: "Federal program details for monthly food packages for low-income seniors." },
    fr: { title: "Info Programme CSFP ACF", desc: "Détails du programme fédéral de colis alimentaires mensuels pour aînés." },
    es: { title: "Información Programa CSFP ACF", desc: "Detalles del programa federal de paquetes de alimentos mensuales para mayores." },
  },
},
{
  category: "Food",
  link: "https://www.usda.gov/nutrition-security",
  i18n: {
    en: { title: "USDA Nutrition Security Initiative", desc: "Federal initiative connecting nutrition programs to improve food security." },
    fr: { title: "Initiative sécurité nutritionnelle USDA", desc: "Initiative fédérale reliant les programmes de nutrition à la sécurité alimentaire." },
    es: { title: "Iniciativa de Seguridad Nutricional USDA", desc: "Iniciativa federal que conecta programas de nutrición con la seguridad alimentaria." },
  },
},
{
  category: "Food",
  link: "https://www.mazon.org",
  i18n: {
    en: { title: "MAZON: A Jewish Response to Hunger", desc: "Advocacy and support organization working to end hunger nationwide." },
    fr: { title: "MAZON: réponse juive à la faim", desc: "Organisation de plaidoyer travaillant à mettre fin à la faim à l'échelle nationale." },
    es: { title: "MAZON: Respuesta Judía al Hambre", desc: "Organización de defensa que trabaja para acabar con el hambre a nivel nacional." },
  },
},
{
  category: "Food",
  link: "https://www.bread.org",
  i18n: {
    en: { title: "Bread for the World", desc: "Advocacy organization focused on ending hunger through policy change." },
    fr: { title: "Bread for the World", desc: "Organisation de plaidoyer axée sur mettre fin à la faim par des changements politiques." },
    es: { title: "Bread for the World", desc: "Organización de defensa enfocada en acabar con el hambre mediante políticas." },
  },
},
{
  category: "Food",
  link: "https://www.foodresearch.org",
  i18n: {
    en: { title: "Food Research & Action Center", desc: "Research and policy resources on hunger and nutrition programs." },
    fr: { title: "Food Research & Action Center", desc: "Ressources de recherche et politiques sur la faim et la nutrition." },
    es: { title: "Food Research & Action Center", desc: "Recursos de investigación y políticas sobre el hambre y la nutrición." },
  },
},
{
  category: "Food",
  link: "https://www.rootcapital.org",
  i18n: {
    en: { title: "Root Capital Food System Resources", desc: "Resources supporting sustainable food systems and rural food access." },
    fr: { title: "Ressources système alimentaire Root Capital", desc: "Ressources soutenant les systèmes alimentaires durables et l'accès rural." },
    es: { title: "Recursos del Sistema Alimentario Root Capital", desc: "Recursos que apoyan sistemas alimentarios sostenibles y acceso rural." },
  },
},
{
  category: "Food",
  link: "https://www.foodallianceinc.org",
  i18n: {
    en: { title: "Food Allergy & Assistance Directory", desc: "Directory-style resources for families needing food with allergy accommodations." },
    fr: { title: "Répertoire allergies et aide alimentaire", desc: "Ressources pour familles ayant besoin d'aliments adaptés aux allergies." },
    es: { title: "Directorio de Alergias y Asistencia Alimentaria", desc: "Recursos para familias que necesitan alimentos adaptados a alergias." },
  },
},
{
  category: "Food",
  link: "https://www.usda.gov/media/blog/food-assistance",
  i18n: {
    en: { title: "USDA Food Assistance Blog & Updates", desc: "Official USDA updates on food assistance program changes and news." },
    fr: { title: "Blog assistance alimentaire USDA", desc: "Mises à jour officielles de l'USDA sur les programmes d'aide alimentaire." },
    es: { title: "Blog de Asistencia Alimentaria USDA", desc: "Actualizaciones oficiales del USDA sobre programas de asistencia alimentaria." },
  },
},

// HEALTH (10)
{
  category: "Health",
  link: "https://www.thenationalcouncil.org",
  i18n: {
    en: { title: "National Council for Mental Wellbeing", desc: "Directory and advocacy resources for community mental health providers." },
    fr: { title: "Conseil national du bien-être mental", desc: "Répertoire et ressources de plaidoyer pour les fournisseurs de santé mentale." },
    es: { title: "Consejo Nacional para el Bienestar Mental", desc: "Directorio y recursos de defensa para proveedores de salud mental." },
  },
},
{
  category: "Health",
  link: "https://www.mentalhealthfirstaid.org",
  i18n: {
    en: { title: "Mental Health First Aid", desc: "Training and resources to help recognize and respond to mental health crises." },
    fr: { title: "Premiers secours en santé mentale", desc: "Formation et ressources pour reconnaître et répondre aux crises de santé mentale." },
    es: { title: "Primeros Auxilios de Salud Mental", desc: "Capacitación y recursos para reconocer y responder a crisis de salud mental." },
  },
},
{
  category: "Health",
  link: "https://www.dbsalliance.org",
  i18n: {
    en: { title: "Depression and Bipolar Support Alliance", desc: "Peer support groups and resources for mood disorders." },
    fr: { title: "Alliance soutien dépression et bipolarité", desc: "Groupes de soutien par les pairs pour les troubles de l'humeur." },
    es: { title: "Alianza de Apoyo para Depresión y Bipolaridad", desc: "Grupos de apoyo entre pares para trastornos del estado de ánimo." },
  },
},
{
  category: "Health",
  link: "https://www.adaa.org",
  i18n: {
    en: { title: "Anxiety & Depression Association of America", desc: "Resources and treatment provider directory for anxiety and depression." },
    fr: { title: "Association anxiété et dépression Amérique", desc: "Ressources et répertoire de traitements pour l'anxiété et la dépression." },
    es: { title: "Asociación de Ansiedad y Depresión de América", desc: "Recursos y directorio de tratamiento para ansiedad y depresión." },
  },
},
{
  category: "Health",
  link: "https://www.eatingdisorderhope.com",
  i18n: {
    en: { title: "Eating Disorder Hope Resources", desc: "Information and treatment resources for eating disorder recovery." },
    fr: { title: "Ressources Eating Disorder Hope", desc: "Informations et ressources de traitement pour la guérison des troubles alimentaires." },
    es: { title: "Recursos Eating Disorder Hope", desc: "Información y recursos de tratamiento para la recuperación de trastornos alimentarios." },
  },
},
{
  category: "Health",
  link: "https://www.nationaleatingdisorders.org",
  i18n: {
    en: { title: "National Alliance for Eating Disorders", desc: "Support, referrals, and helpline resources for eating disorders." },
    fr: { title: "Alliance nationale troubles alimentaires", desc: "Soutien, orientations et ligne d'aide pour les troubles alimentaires." },
    es: { title: "Alianza Nacional para Trastornos Alimentarios", desc: "Apoyo, referencias y línea de ayuda para trastornos alimentarios." },
  },
},
{
  category: "Health",
  link: "https://www.diabetes.org/tools-support",
  i18n: {
    en: { title: "American Diabetes Association Support Tools", desc: "Resources and support tools for people managing diabetes." },
    fr: { title: "Outils soutien American Diabetes Association", desc: "Ressources et outils de soutien pour la gestion du diabète." },
    es: { title: "Herramientas de Apoyo American Diabetes Association", desc: "Recursos y herramientas de apoyo para el manejo de la diabetes." },
  },
},
{
  category: "Health",
  link: "https://www.heart.org/en/health-topics/consumer-healthcare",
  i18n: {
    en: { title: "American Heart Association Consumer Health Care", desc: "Consumer resources for affordable heart health care and prevention." },
    fr: { title: "Soins de santé consommateurs American Heart Association", desc: "Ressources pour des soins cardiaques abordables et la prévention." },
    es: { title: "Atención Médica del Consumidor American Heart Association", desc: "Recursos para atención cardíaca asequible y prevención." },
  },
},
{
  category: "Health",
  link: "https://www.lung.org/help-support",
  i18n: {
    en: { title: "American Lung Association Help & Support", desc: "Support resources for respiratory health conditions and lung disease." },
    fr: { title: "Aide et soutien American Lung Association", desc: "Ressources de soutien pour les maladies respiratoires et pulmonaires." },
    es: { title: "Ayuda y Apoyo American Lung Association", desc: "Recursos de apoyo para condiciones respiratorias y enfermedades pulmonares." },
  },
},
{
  category: "Health",
  link: "https://www.kidneyfund.org",
  i18n: {
    en: { title: "American Kidney Fund", desc: "Financial assistance and support for people with kidney disease." },
    fr: { title: "American Kidney Fund", desc: "Aide financière et soutien pour les personnes atteintes de maladie rénale." },
    es: { title: "American Kidney Fund", desc: "Ayuda financiera y apoyo para personas con enfermedad renal." },
  },
},

// HOUSING (10)
{
  category: "Housing",
  link: "https://www.hudexchange.info/programs/ceas/",
  i18n: {
    en: { title: "Coordinated Entry System Info", desc: "Information on local systems that prioritize housing assistance for those most in need." },
    fr: { title: "Info système d'entrée coordonnée", desc: "Informations sur les systèmes locaux priorisant l'aide au logement." },
    es: { title: "Información del Sistema de Entrada Coordinada", desc: "Información sobre sistemas locales que priorizan la ayuda de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.hudexchange.info/programs/samples/",
  i18n: {
    en: { title: "HUD Program Sample Documents", desc: "Sample forms and guidance documents for HUD housing programs." },
    fr: { title: "Documents exemples programmes HUD", desc: "Formulaires et documents d'orientation pour les programmes de logement HUD." },
    es: { title: "Documentos de Muestra de Programas HUD", desc: "Formularios y documentos de orientación para programas de vivienda HUD." },
  },
},
{
  category: "Housing",
  link: "https://www.svdpusa.org",
  i18n: {
    en: { title: "St. Vincent de Paul National Council", desc: "National network offering housing and emergency assistance services." },
    fr: { title: "Conseil national Saint-Vincent-de-Paul", desc: "Réseau national offrant des services d'aide au logement et d'urgence." },
    es: { title: "Consejo Nacional San Vicente de Paúl", desc: "Red nacional que ofrece servicios de vivienda y asistencia de emergencia." },
  },
},
{
  category: "Housing",
  link: "https://www.compassionintl.org/find-help",
  i18n: {
    en: { title: "Faith-Based Housing Assistance Directory", desc: "Directory of faith-based organizations offering housing support." },
    fr: { title: "Répertoire aide logement religieuse", desc: "Répertoire d'organisations religieuses offrant un soutien au logement." },
    es: { title: "Directorio de Asistencia de Vivienda Religiosa", desc: "Directorio de organizaciones religiosas que ofrecen apoyo de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.local211.org/housing",
  i18n: {
    en: { title: "Local 211 Housing Portal", desc: "Regional housing referral portals connected to the 211 network." },
    fr: { title: "Portail logement local 211", desc: "Portails régionaux d'orientation logement connectés au réseau 211." },
    es: { title: "Portal Local 211 de Vivienda", desc: "Portales regionales de referencia de vivienda conectados a la red 211." },
  },
},
{
  category: "Housing",
  link: "https://www.mutualhousing.com",
  i18n: {
    en: { title: "Mutual Housing Association Directory", desc: "Directory of mutual housing associations offering resident-owned housing models." },
    fr: { title: "Répertoire associations logement mutuel", desc: "Répertoire d'associations de logement mutuel avec modèles de propriété résidente." },
    es: { title: "Directorio de Asociaciones de Vivienda Mutua", desc: "Directorio de asociaciones de vivienda mutua con modelos de propiedad residente." },
  },
},
{
  category: "Housing",
  link: "https://www.rurallisc.org",
  i18n: {
    en: { title: "LISC Rural Housing Resources", desc: "Community development financial resources for rural housing projects." },
    fr: { title: "Ressources logement rural LISC", desc: "Ressources financières de développement communautaire pour le logement rural." },
    es: { title: "Recursos de Vivienda Rural LISC", desc: "Recursos financieros de desarrollo comunitario para proyectos de vivienda rural." },
  },
},
{
  category: "Housing",
  link: "https://www.homelessshelterdirectory.org",
  i18n: {
    en: { title: "Homeless Shelter Directory", desc: "Nationwide directory of homeless shelters and transitional housing." },
    fr: { title: "Répertoire refuges sans-abri", desc: "Répertoire national des refuges pour sans-abri et logements transitoires." },
    es: { title: "Directorio de Refugios para Personas sin Hogar", desc: "Directorio nacional de refugios y vivienda transitoria." },
  },
},
{
  category: "Housing",
  link: "https://www.sheltertech.org",
  i18n: {
    en: { title: "ShelterTech Resource App", desc: "Digital resource tool connecting people to shelter and housing services." },
    fr: { title: "Application ressources ShelterTech", desc: "Outil numérique reliant les personnes aux services de refuge et logement." },
    es: { title: "Aplicación de Recursos ShelterTech", desc: "Herramienta digital que conecta a personas con servicios de refugio y vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/multifamily_housing",
  i18n: {
    en: { title: "HUD Multifamily Housing Programs", desc: "Federal information on affordable multifamily housing developments." },
    fr: { title: "Programmes logement multifamilial HUD", desc: "Informations fédérales sur les logements multifamiliaux abordables." },
    es: { title: "Programas de Vivienda Multifamiliar HUD", desc: "Información federal sobre desarrollos de vivienda multifamiliar asequible." },
  },
},

// UTILITIES (7)
{
  category: "Utilities",
  link: "https://www.needhelppayingbills.com",
  i18n: {
    en: { title: "Need Help Paying Bills Directory", desc: "Directory of programs helping with utility, rent, and other household bills." },
    fr: { title: "Répertoire aide paiement factures", desc: "Répertoire de programmes aidant avec factures de services et loyer." },
    es: { title: "Directorio de Ayuda para Pagar Facturas", desc: "Directorio de programas que ayudan con facturas de servicios y alquiler." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/scep/slsc/state-local-and-tribal-government-resources",
  i18n: {
    en: { title: "State, Local, and Tribal Energy Resources", desc: "Federal directory connecting to state and tribal energy assistance programs." },
    fr: { title: "Ressources énergie État, local et tribal", desc: "Répertoire fédéral vers les programmes d'aide énergétique locaux et tribaux." },
    es: { title: "Recursos Energéticos Estatales, Locales y Tribales", desc: "Directorio federal a programas de asistencia energética locales y tribales." },
  },
},
{
  category: "Utilities",
  link: "https://www.rd.usda.gov/programs-services/community-facilities",
  i18n: {
    en: { title: "USDA Community Facilities Programs", desc: "Rural infrastructure funding for essential community facilities and utilities." },
    fr: { title: "Programmes installations communautaires USDA", desc: "Financement des infrastructures rurales pour installations communautaires essentielles." },
    es: { title: "Programas de Instalaciones Comunitarias USDA", desc: "Financiamiento de infraestructura rural para instalaciones comunitarias esenciales." },
  },
},
{
  category: "Utilities",
  link: "https://www.pge.com/en/save-energy-money/help-paying-your-bill.html",
  i18n: {
    en: { title: "Utility Company Bill Assistance Programs", desc: "Example of a utility company's own customer bill assistance program." },
    fr: { title: "Programmes aide facture compagnie services", desc: "Exemple de programme d'aide aux factures d'une compagnie de services." },
    es: { title: "Programas de Asistencia de Facturas de Compañías", desc: "Ejemplo de programa de asistencia de facturas de una compañía de servicios." },
  },
},
{
  category: "Utilities",
  link: "https://www.usa.gov/help-with-heating-cooling",
  i18n: {
    en: { title: "Help With Heating and Cooling Costs", desc: "Government guide to seasonal heating and cooling bill assistance." },
    fr: { title: "Aide coûts chauffage et climatisation", desc: "Guide gouvernemental pour l'aide saisonnière aux factures de chauffage/climatisation." },
    es: { title: "Ayuda con Costos de Calefacción y Refrigeración", desc: "Guía del gobierno sobre asistencia estacional para facturas de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.consumer.ftc.gov/articles/energy-savings-tips",
  i18n: {
    en: { title: "FTC Energy Savings Tips", desc: "Consumer tips for reducing home energy costs safely and effectively." },
    fr: { title: "Conseils économie énergie FTC", desc: "Conseils aux consommateurs pour réduire les coûts énergétiques en toute sécurité." },
    es: { title: "Consejos de Ahorro de Energía FTC", desc: "Consejos para el consumidor para reducir costos de energía de forma segura." },
  },
},
{
  category: "Utilities",
  link: "https://www.solarunitedneighbors.org",
  i18n: {
    en: { title: "Solar United Neighbors", desc: "Community solar co-op resources that may reduce long-term energy costs." },
    fr: { title: "Solar United Neighbors", desc: "Ressources coopératives solaires communautaires réduisant les coûts énergétiques." },
    es: { title: "Solar United Neighbors", desc: "Recursos de cooperativas solares comunitarias que reducen costos energéticos." },
  },
},

// EDUCATION (8)
{
  category: "Education",
  link: "https://www.usa.gov/apprenticeships",
  i18n: {
    en: { title: "USA.gov Apprenticeships Guide", desc: "Government guide to finding and applying for apprenticeship programs." },
    fr: { title: "Guide apprentissages USA.gov", desc: "Guide gouvernemental pour trouver et postuler à des programmes d'apprentissage." },
    es: { title: "Guía de Aprendizajes USA.gov", desc: "Guía del gobierno para encontrar y solicitar programas de aprendizaje." },
  },
},
{
  category: "Education",
  link: "https://www.dol.gov/agencies/eta/skills-training",
  i18n: {
    en: { title: "DOL Skills Training Programs", desc: "Federal skills training program information for job seekers." },
    fr: { title: "Programmes formation compétences DOL", desc: "Informations sur les programmes fédéraux de formation aux compétences." },
    es: { title: "Programas de Capacitación en Habilidades DOL", desc: "Información sobre programas federales de capacitación para buscadores de empleo." },
  },
},
{
  category: "Education",
  link: "https://www.usa.gov/computer-internet-help",
  i18n: {
    en: { title: "USA.gov Computer & Internet Skills Guide", desc: "Government guide to free computer and internet literacy programs." },
    fr: { title: "Guide compétences informatiques USA.gov", desc: "Guide gouvernemental pour les programmes gratuits d'alphabétisation numérique." },
    es: { title: "Guía de Habilidades de Computación e Internet USA.gov", desc: "Guía del gobierno para programas gratuitos de alfabetización digital." },
  },
},
{
  category: "Education",
  link: "https://www.usalearns.org",
  i18n: {
    en: { title: "USA Learns", desc: "Free English language courses for adult learners nationwide." },
    fr: { title: "USA Learns", desc: "Cours d'anglais gratuits pour apprenants adultes à l'échelle nationale." },
    es: { title: "USA Learns", desc: "Cursos gratuitos de inglés para adultos a nivel nacional." },
  },
},
{
  category: "Education",
  link: "https://www.duolingo.com",
  i18n: {
    en: { title: "Duolingo", desc: "Free language learning app covering English and many other languages." },
    fr: { title: "Duolingo", desc: "Application gratuite d'apprentissage des langues couvrant l'anglais et d'autres langues." },
    es: { title: "Duolingo", desc: "Aplicación gratuita de aprendizaje de idiomas que incluye inglés y otros idiomas." },
  },
},
{
  category: "Education",
  link: "https://www.ed.gov/grants-and-programs/formula-grants/special-populations/adult-education-family-literacy-act",
  i18n: {
    en: { title: "Adult Education and Family Literacy Act Info", desc: "Federal law information supporting adult and family literacy programs." },
    fr: { title: "Info loi alphabétisation adultes et familles", desc: "Informations sur la loi fédérale soutenant les programmes d'alphabétisation." },
    es: { title: "Información de la Ley de Alfabetización Familiar y de Adultos", desc: "Información de la ley federal que apoya programas de alfabetización." },
  },
},
{
  category: "Education",
  link: "https://www.libraries.org",
  i18n: {
    en: { title: "Public Library Directory", desc: "Find your local public library, which often offers free classes and resources." },
    fr: { title: "Répertoire bibliothèques publiques", desc: "Trouvez votre bibliothèque publique locale, offrant souvent cours et ressources gratuits." },
    es: { title: "Directorio de Bibliotecas Públicas", desc: "Encuentre su biblioteca pública local, que a menudo ofrece clases y recursos gratuitos." },
  },
},
{
  category: "Education",
  link: "https://www.communityactionpartnership.com",
  i18n: {
    en: { title: "Community Action Partnership", desc: "Network of local agencies offering education, job training, and poverty support." },
    fr: { title: "Community Action Partnership", desc: "Réseau d'agences locales offrant éducation, formation et soutien contre la pauvreté." },
    es: { title: "Community Action Partnership", desc: "Red de agencias locales que ofrecen educación, capacitación y apoyo contra la pobreza." },
  },
},

// INCOME (7)
{
  category: "Income",
  link: "https://www.communityactionpartnership.com/find-a-cap/",
  i18n: {
    en: { title: "Find Your Local Community Action Agency", desc: "Locate a community action agency offering financial and utility assistance." },
    fr: { title: "Trouver votre agence d'action communautaire", desc: "Localisez une agence offrant une aide financière et aux services publics." },
    es: { title: "Encuentre su Agencia de Acción Comunitaria Local", desc: "Localice una agencia que ofrece asistencia financiera y de servicios." },
  },
},
{
  category: "Income",
  link: "https://www.salvationarmyusa.org/usn/financial-assistance/",
  i18n: {
    en: { title: "Salvation Army Financial Assistance", desc: "Local emergency financial assistance through Salvation Army units." },
    fr: { title: "Aide financière Armée du Salut", desc: "Aide financière d'urgence locale via les unités de l'Armée du Salut." },
    es: { title: "Asistencia Financiera Ejército de Salvación", desc: "Asistencia financiera de emergencia local a través de unidades del Ejército de Salvación." },
  },
},
{
  category: "Income",
  link: "https://www.catholiccharitiesusa.org/find-help/financial-assistance/",
  i18n: {
    en: { title: "Catholic Charities Financial Assistance", desc: "Emergency financial assistance programs through Catholic Charities." },
    fr: { title: "Aide financière Catholic Charities", desc: "Programmes d'aide financière d'urgence via Catholic Charities." },
    es: { title: "Asistencia Financiera Catholic Charities", desc: "Programas de asistencia financiera de emergencia a través de Catholic Charities." },
  },
},
{
  category: "Income",
  link: "https://www.jfna.org/emergency-cash-assistance",
  i18n: {
    en: { title: "Jewish Federations Emergency Cash Assistance", desc: "Emergency cash assistance through local Jewish Federation chapters." },
    fr: { title: "Aide financière urgence Jewish Federations", desc: "Aide financière d'urgence via les chapitres locaux de Jewish Federations." },
    es: { title: "Asistencia en Efectivo de Emergencia Jewish Federations", desc: "Asistencia en efectivo de emergencia a través de capítulos locales." },
  },
},
{
  category: "Income",
  link: "https://www.211.org/services/veterans",
  i18n: {
    en: { title: "211 Veterans Services Directory", desc: "Local referrals for veterans needing financial or other support services." },
    fr: { title: "Répertoire services vétérans 211", desc: "Orientation locale pour vétérans ayant besoin de soutien financier ou autre." },
    es: { title: "Directorio de Servicios para Veteranos 211", desc: "Referencias locales para veteranos que necesitan apoyo financiero u otro." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/emergency-financial-assistance",
  i18n: {
    en: { title: "USA.gov Emergency Financial Assistance Guide", desc: "Government guide to finding emergency financial help programs." },
    fr: { title: "Guide aide financière d'urgence USA.gov", desc: "Guide gouvernemental pour trouver des programmes d'aide financière d'urgence." },
    es: { title: "Guía de Asistencia Financiera de Emergencia USA.gov", desc: "Guía del gobierno para encontrar programas de ayuda financiera de emergencia." },
  },
},
{
  category: "Income",
  link: "https://www.feedthechildren.org",
  i18n: {
    en: { title: "Feed the Children", desc: "Emergency assistance including food, essentials, and disaster relief for families." },
    fr: { title: "Feed the Children", desc: "Aide d'urgence incluant nourriture, produits essentiels et secours en cas de catastrophe." },
    es: { title: "Feed the Children", desc: "Asistencia de emergencia que incluye comida, productos esenciales y ayuda en desastres." },
  },
},
    // ===== PROGRAMS 651-750 =====

// FOOD (15)
{
  category: "Food",
  link: "https://www.foodbankcentraleastern.org",
  i18n: {
    en: { title: "Regional Food Bank Directory Example", desc: "Example of a regional food bank offering distribution and pantry services." },
    fr: { title: "Exemple répertoire banque alimentaire régionale", desc: "Exemple de banque alimentaire régionale offrant distribution et services de garde-manger." },
    es: { title: "Ejemplo de Directorio de Banco de Alimentos Regional", desc: "Ejemplo de banco de alimentos regional que ofrece distribución y servicios." },
  },
},
{
  category: "Food",
  link: "https://www.secondharvest.org",
  i18n: {
    en: { title: "Second Harvest Food Bank Network", desc: "Network of food banks providing meals and groceries to communities in need." },
    fr: { title: "Réseau Second Harvest", desc: "Réseau de banques alimentaires fournissant repas et provisions aux communautés." },
    es: { title: "Red Second Harvest", desc: "Red de bancos de alimentos que proporciona comidas y comestibles a comunidades necesitadas." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/st/food-stamps",
  i18n: {
    en: { title: "Food Pantries SNAP State Guide", desc: "State-by-state guide to SNAP food assistance application info." },
    fr: { title: "Guide SNAP par État Food Pantries", desc: "Guide État par État pour les informations de demande d'aide alimentaire SNAP." },
    es: { title: "Guía Estatal de SNAP Food Pantries", desc: "Guía estado por estado para información de solicitud de asistencia alimentaria SNAP." },
  },
},
{
  category: "Food",
  link: "https://www.acf.hhs.gov/ocs/programs/community-services-block-grant",
  i18n: {
    en: { title: "Community Services Block Grant", desc: "Federal grant funding local agencies that provide food and basic needs help." },
    fr: { title: "Subvention services communautaires en bloc", desc: "Subvention fédérale finançant les agences locales offrant nourriture et besoins de base." },
    es: { title: "Subvención en Bloque de Servicios Comunitarios", desc: "Subvención federal que financia agencias locales que ofrecen comida y necesidades básicas." },
  },
},
{
  category: "Food",
  link: "https://www.growfoodgrowhope.org",
  i18n: {
    en: { title: "Grow Food Grow Hope", desc: "Community garden program teaching families to grow their own produce." },
    fr: { title: "Grow Food Grow Hope", desc: "Programme de jardin communautaire enseignant aux familles à cultiver leurs produits." },
    es: { title: "Grow Food Grow Hope", desc: "Programa de jardín comunitario que enseña a familias a cultivar sus propios productos." },
  },
},
{
  category: "Food",
  link: "https://www.plentifulapp.com",
  i18n: {
    en: { title: "Plentiful App", desc: "App to find and reserve appointments at local food pantries." },
    fr: { title: "Application Plentiful", desc: "Application pour trouver et réserver des rendez-vous dans les garde-manger locaux." },
    es: { title: "Aplicación Plentiful", desc: "Aplicación para encontrar y reservar citas en despensas de alimentos locales." },
  },
},
{
  category: "Food",
  link: "https://www.freshtrak.com",
  i18n: {
    en: { title: "FreshTrak Food Pantry Finder", desc: "Search tool for food pantries and their operating schedules." },
    fr: { title: "Recherche garde-manger FreshTrak", desc: "Outil de recherche pour les garde-manger et leurs horaires." },
    es: { title: "Buscador de Despensas FreshTrak", desc: "Herramienta de búsqueda para despensas de alimentos y sus horarios." },
  },
},
{
  category: "Food",
  link: "https://www.givefreely.io",
  i18n: {
    en: { title: "GiveFreely Community Resource Sharing", desc: "Platform connecting community members with free food and essentials." },
    fr: { title: "Partage de ressources GiveFreely", desc: "Plateforme reliant les membres de la communauté à la nourriture gratuite." },
    es: { title: "Compartir Recursos GiveFreely", desc: "Plataforma que conecta a miembros de la comunidad con comida gratuita." },
  },
},
{
  category: "Food",
  link: "https://www.brownfieldnews.com/nutrition",
  i18n: {
    en: { title: "Rural Nutrition Program News", desc: "News and updates related to rural nutrition assistance programs." },
    fr: { title: "Actualités programme nutrition rural", desc: "Actualités liées aux programmes d'aide nutritionnelle rurale." },
    es: { title: "Noticias del Programa de Nutrición Rural", desc: "Noticias relacionadas con programas de asistencia nutricional rural." },
  },
},
{
  category: "Food",
  link: "https://www.foodpolicy.org",
  i18n: {
    en: { title: "Food Policy Networks", desc: "Local and regional food policy council directory and resources." },
    fr: { title: "Réseaux de politique alimentaire", desc: "Répertoire et ressources des conseils de politique alimentaire locaux." },
    es: { title: "Redes de Política Alimentaria", desc: "Directorio y recursos de consejos de política alimentaria locales." },
  },
},
{
  category: "Food",
  link: "https://www.projectbread.org",
  i18n: {
    en: { title: "Project Bread FoodSource Hotline", desc: "Hotline connecting people to local food resources and SNAP application help." },
    fr: { title: "Ligne FoodSource Project Bread", desc: "Ligne reliant les personnes aux ressources alimentaires locales et à l'aide SNAP." },
    es: { title: "Línea FoodSource Project Bread", desc: "Línea que conecta a personas con recursos alimentarios locales y ayuda con SNAP." },
  },
},
{
  category: "Food",
  link: "https://www.communityfoodshare.org",
  i18n: {
    en: { title: "Community Food Share", desc: "Regional food bank offering food distribution and mobile pantry services." },
    fr: { title: "Community Food Share", desc: "Banque alimentaire régionale offrant distribution et services de garde-manger mobiles." },
    es: { title: "Community Food Share", desc: "Banco de alimentos regional que ofrece distribución y servicios de despensa móvil." },
  },
},
{
  category: "Food",
  link: "https://www.foodshare.org",
  i18n: {
    en: { title: "FoodShare Network", desc: "Regional hunger relief network coordinating food banks and pantries." },
    fr: { title: "Réseau FoodShare", desc: "Réseau régional de lutte contre la faim coordonnant banques alimentaires et garde-manger." },
    es: { title: "Red FoodShare", desc: "Red regional de ayuda contra el hambre que coordina bancos de alimentos y despensas." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/disaster",
  i18n: {
    en: { title: "USDA Disaster Nutrition Assistance", desc: "Federal food assistance programs activated during declared disasters." },
    fr: { title: "Aide nutritionnelle catastrophe USDA", desc: "Programmes fédéraux d'aide alimentaire activés lors de catastrophes déclarées." },
    es: { title: "Asistencia Nutricional por Desastre USDA", desc: "Programas federales de asistencia alimentaria activados durante desastres declarados." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/d-snap",
  i18n: {
    en: { title: "D-SNAP Disaster Food Assistance", desc: "Temporary food assistance for households affected by a declared disaster." },
    fr: { title: "D-SNAP aide alimentaire catastrophe", desc: "Aide alimentaire temporaire pour les ménages touchés par une catastrophe déclarée." },
    es: { title: "D-SNAP Asistencia Alimentaria por Desastre", desc: "Asistencia alimentaria temporal para hogares afectados por un desastre declarado." },
  },
},

// HEALTH (15)
{
  category: "Health",
  link: "https://www.marchofdimes.org/find-support",
  i18n: {
    en: { title: "March of Dimes Family Support", desc: "Resources for maternal and infant health, including NICU family support." },
    fr: { title: "Soutien familial March of Dimes", desc: "Ressources pour la santé maternelle et infantile, y compris le soutien en NICU." },
    es: { title: "Apoyo Familiar March of Dimes", desc: "Recursos para la salud materna e infantil, incluido el apoyo en UCIN." },
  },
},
{
  category: "Health",
  link: "https://www.stjude.org/patient-resources.html",
  i18n: {
    en: { title: "St. Jude Patient Resources", desc: "Support resources for families of children being treated for cancer and other diseases." },
    fr: { title: "Ressources patients St. Jude", desc: "Ressources de soutien pour les familles d'enfants traités pour cancer et autres maladies." },
    es: { title: "Recursos para Pacientes St. Jude", desc: "Recursos de apoyo para familias de niños tratados por cáncer y otras enfermedades." },
  },
},
{
  category: "Health",
  link: "https://www.ronaldmcdonaldhouse.org",
  i18n: {
    en: { title: "Ronald McDonald House Charities", desc: "Housing and support for families of hospitalized children." },
    fr: { title: "Fondation Manoir Ronald McDonald", desc: "Logement et soutien pour les familles d'enfants hospitalisés." },
    es: { title: "Casa Ronald McDonald", desc: "Vivienda y apoyo para familias de niños hospitalizados." },
  },
},
{
  category: "Health",
  link: "https://www.caringvoice.org",
  i18n: {
    en: { title: "Caring Voice Coalition", desc: "Financial and emotional support for people with chronic or rare diseases." },
    fr: { title: "Caring Voice Coalition", desc: "Soutien financier et émotionnel pour les personnes atteintes de maladies chroniques ou rares." },
    es: { title: "Caring Voice Coalition", desc: "Apoyo financiero y emocional para personas con enfermedades crónicas o raras." },
  },
},
{
  category: "Health",
  link: "https://www.patientadvocate.org",
  i18n: {
    en: { title: "Patient Advocate Foundation", desc: "Case management and financial aid for people with chronic illnesses." },
    fr: { title: "Patient Advocate Foundation", desc: "Gestion de cas et aide financière pour les personnes atteintes de maladies chroniques." },
    es: { title: "Patient Advocate Foundation", desc: "Gestión de casos y ayuda financiera para personas con enfermedades crónicas." },
  },
},
{
  category: "Health",
  link: "https://www.hillburtonobligated.hrsa.gov",
  i18n: {
    en: { title: "Hill-Burton Facility Search", desc: "Search tool for facilities obligated to provide free or reduced-cost care." },
    fr: { title: "Recherche installations Hill-Burton", desc: "Outil de recherche pour les installations tenues d'offrir des soins gratuits ou réduits." },
    es: { title: "Búsqueda de Instalaciones Hill-Burton", desc: "Herramienta de búsqueda para instalaciones obligadas a ofrecer atención gratuita o reducida." },
  },
},
{
  category: "Health",
  link: "https://www.patientaccessnetwork.org",
  i18n: {
    en: { title: "Patient Access Network Foundation", desc: "Copay assistance for people with chronic and life-threatening illnesses." },
    fr: { title: "Patient Access Network Foundation", desc: "Aide aux quotes-parts pour les personnes atteintes de maladies chroniques et graves." },
    es: { title: "Patient Access Network Foundation", desc: "Ayuda con copagos para personas con enfermedades crónicas y graves." },
  },
},
{
  category: "Health",
  link: "https://www.copays.org",
  i18n: {
    en: { title: "Patient Advocate Foundation Co-Pay Relief", desc: "Financial assistance for prescription drug co-pays for eligible patients." },
    fr: { title: "Aide quote-part Patient Advocate Foundation", desc: "Aide financière pour les quotes-parts de médicaments pour patients admissibles." },
    es: { title: "Alivio de Copagos Patient Advocate Foundation", desc: "Ayuda financiera para copagos de medicamentos para pacientes elegibles." },
  },
},
{
  category: "Health",
  link: "https://www.healthwellfoundation.org",
  i18n: {
    en: { title: "HealthWell Foundation", desc: "Financial assistance for insurance premiums, copays, and coinsurance." },
    fr: { title: "HealthWell Foundation", desc: "Aide financière pour les primes d'assurance, quotes-parts et coassurance." },
    es: { title: "HealthWell Foundation", desc: "Ayuda financiera para primas de seguro, copagos y coseguro." },
  },
},
{
  category: "Health",
  link: "https://www.goodpillhealth.com",
  i18n: {
    en: { title: "GoodPill Health Discount Resources", desc: "Discount and assistance resources to lower prescription costs." },
    fr: { title: "Ressources rabais GoodPill Health", desc: "Ressources de rabais et d'aide pour réduire les coûts de médicaments." },
    es: { title: "Recursos de Descuento GoodPill Health", desc: "Recursos de descuento y ayuda para reducir costos de medicamentos." },
  },
},
{
  category: "Health",
  link: "https://www.singlecare.com",
  i18n: {
    en: { title: "SingleCare Prescription Discounts", desc: "Free prescription discount card accepted at most major pharmacies." },
    fr: { title: "Rabais ordonnance SingleCare", desc: "Carte de rabais gratuite acceptée dans la plupart des grandes pharmacies." },
    es: { title: "Descuentos de Recetas SingleCare", desc: "Tarjeta de descuento gratuita aceptada en la mayoría de las farmacias principales." },
  },
},
{
  category: "Health",
  link: "https://www.wellrx.com",
  i18n: {
    en: { title: "WellRx Prescription Savings", desc: "Free prescription savings card to lower medication costs." },
    fr: { title: "Économies ordonnance WellRx", desc: "Carte gratuite d'économies pour réduire les coûts de médicaments." },
    es: { title: "Ahorros de Recetas WellRx", desc: "Tarjeta gratuita de ahorro para reducir el costo de medicamentos." },
  },
},
{
  category: "Health",
  link: "https://www.blinkhealth.com",
  i18n: {
    en: { title: "Blink Health", desc: "Prescription discount platform helping lower out-of-pocket medication costs." },
    fr: { title: "Blink Health", desc: "Plateforme de rabais sur ordonnance aidant à réduire les coûts de médicaments." },
    es: { title: "Blink Health", desc: "Plataforma de descuento de recetas que ayuda a reducir los costos de medicamentos." },
  },
},
{
  category: "Health",
  link: "https://www.211.org/services/mental-health",
  i18n: {
    en: { title: "211 Mental Health Services Directory", desc: "Local mental health service referrals through the 211 network." },
    fr: { title: "Répertoire santé mentale 211", desc: "Orientation vers services de santé mentale locaux via le réseau 211." },
    es: { title: "Directorio de Servicios de Salud Mental 211", desc: "Referencias a servicios de salud mental locales a través de la red 211." },
  },
},
{
  category: "Health",
  link: "https://www.cdc.gov/aging/publications/features/healthy-aging.html",
  i18n: {
    en: { title: "CDC Healthy Aging Resources", desc: "Federal health resources and tips for healthy aging." },
    fr: { title: "Ressources vieillissement en santé CDC", desc: "Ressources fédérales et conseils pour un vieillissement en santé." },
    es: { title: "Recursos de Envejecimiento Saludable CDC", desc: "Recursos federales y consejos para un envejecimiento saludable." },
  },
},

// HOUSING (15)
{
  category: "Housing",
  link: "https://www.habitat.org/volunteer",
  i18n: {
    en: { title: "Habitat for Humanity Volunteer & Homebuyer Info", desc: "Information on becoming a Habitat homeowner or volunteer." },
    fr: { title: "Info bénévole et acheteur Habitat", desc: "Informations pour devenir propriétaire Habitat ou bénévole." },
    es: { title: "Información de Voluntario y Comprador Habitat", desc: "Información para convertirse en propietario o voluntario de Habitat." },
  },
},
{
  category: "Housing",
  link: "https://www.rebuildingtogether.org/find-an-affiliate",
  i18n: {
    en: { title: "Rebuilding Together Local Affiliate Finder", desc: "Find local Rebuilding Together affiliates offering free home repairs." },
    fr: { title: "Recherche affilié local Rebuilding Together", desc: "Trouvez des affiliés locaux offrant des réparations domiciliaires gratuites." },
    es: { title: "Buscador de Afiliados Locales Rebuilding Together", desc: "Encuentre afiliados locales que ofrecen reparaciones de vivienda gratuitas." },
  },
},
{
  category: "Housing",
  link: "https://www.rebuildingamericashomes.org",
  i18n: {
    en: { title: "Rebuilding America's Homes", desc: "Home repair assistance program for eligible low-income homeowners." },
    fr: { title: "Rebuilding America's Homes", desc: "Programme d'aide à la réparation domiciliaire pour propriétaires à faible revenu." },
    es: { title: "Rebuilding America's Homes", desc: "Programa de ayuda para reparación de vivienda para propietarios de bajos ingresos." },
  },
},
{
  category: "Housing",
  link: "https://www.usda.gov/topics/rural/single-family-housing-repair",
  i18n: {
    en: { title: "USDA Home Repair Program Overview", desc: "Overview of USDA loans and grants for rural home repairs." },
    fr: { title: "Aperçu programme réparation domicile USDA", desc: "Aperçu des prêts et subventions USDA pour réparations domiciliaires rurales." },
    es: { title: "Resumen del Programa de Reparación de Vivienda USDA", desc: "Resumen de préstamos y subvenciones USDA para reparaciones de vivienda rural." },
  },
},
{
  category: "Housing",
  link: "https://www.homeswithhope.org",
  i18n: {
    en: { title: "Homes With Hope", desc: "Local affordable housing and homelessness prevention programs." },
    fr: { title: "Homes With Hope", desc: "Programmes locaux de logement abordable et de prévention du sans-abrisme." },
    es: { title: "Homes With Hope", desc: "Programas locales de vivienda asequible y prevención de personas sin hogar." },
  },
},
{
  category: "Housing",
  link: "https://www.homelesshub.ca/resources",
  i18n: {
    en: { title: "Homeless Hub Resource Library", desc: "Research and resource library on homelessness prevention strategies." },
    fr: { title: "Bibliothèque ressources Homeless Hub", desc: "Bibliothèque de recherche sur les stratégies de prévention du sans-abrisme." },
    es: { title: "Biblioteca de Recursos Homeless Hub", desc: "Biblioteca de investigación sobre estrategias de prevención de personas sin hogar." },
  },
},
{
  category: "Housing",
  link: "https://www.va.gov/homeless/nchav.asp",
  i18n: {
    en: { title: "VA National Call Center for Homeless Veterans", desc: "24/7 hotline for veterans experiencing or at risk of homelessness." },
    fr: { title: "Centre d'appel national VA sans-abri vétérans", desc: "Ligne d'assistance 24/7 pour vétérans sans-abri ou à risque." },
    es: { title: "Centro Nacional de Llamadas VA para Veteranos sin Hogar", desc: "Línea de ayuda 24/7 para veteranos sin hogar o en riesgo." },
  },
},
{
  category: "Housing",
  link: "https://www.supportivehousingcoalition.org",
  i18n: {
    en: { title: "Supportive Housing Coalition Directory", desc: "Directory of supportive housing programs combining housing and services." },
    fr: { title: "Répertoire coalition logement soutenu", desc: "Répertoire de programmes de logement soutenu combinant logement et services." },
    es: { title: "Directorio de Coalición de Vivienda de Apoyo", desc: "Directorio de programas de vivienda de apoyo que combinan vivienda y servicios." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/section_202_supportive_housing_for_the_elderly",
  i18n: {
    en: { title: "Section 202 Supportive Housing for the Elderly", desc: "HUD program funding affordable housing with services for low-income seniors." },
    fr: { title: "Logement soutenu Section 202 aînés", desc: "Programme HUD finançant du logement abordable avec services pour aînés à faible revenu." },
    es: { title: "Vivienda de Apoyo Sección 202 para Mayores", desc: "Programa HUD que financia vivienda asequible con servicios para mayores de bajos ingresos." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/section_811_supportive_housing_for_persons_with_disabilities",
  i18n: {
    en: { title: "Section 811 Supportive Housing for Persons with Disabilities", desc: "HUD program funding housing with services for people with disabilities." },
    fr: { title: "Logement soutenu Section 811 handicap", desc: "Programme HUD finançant du logement avec services pour personnes handicapées." },
    es: { title: "Vivienda de Apoyo Sección 811 para Personas con Discapacidad", desc: "Programa HUD que financia vivienda con servicios para personas con discapacidad." },
  },
},
{
  category: "Housing",
  link: "https://www.rd.usda.gov/programs-services/multifamily-housing-programs/farm-labor-housing-direct-loans-grants",
  i18n: {
    en: { title: "USDA Farm Labor Housing Loans & Grants", desc: "Housing funding for farmworkers and their families in rural areas." },
    fr: { title: "Prêts logement travailleurs agricoles USDA", desc: "Financement du logement pour travailleurs agricoles et leurs familles en zones rurales." },
    es: { title: "Préstamos y Subvenciones de Vivienda para Trabajadores Agrícolas USDA", desc: "Financiamiento de vivienda para trabajadores agrícolas y sus familias en zonas rurales." },
  },
},
{
  category: "Housing",
  link: "https://www.tribalhousing.org",
  i18n: {
    en: { title: "Tribal Housing Resource Directory", desc: "Directory of housing resources specifically for Tribal communities." },
    fr: { title: "Répertoire ressources logement tribal", desc: "Répertoire de ressources logement spécifiquement pour communautés tribales." },
    es: { title: "Directorio de Recursos de Vivienda Tribal", desc: "Directorio de recursos de vivienda específicamente para comunidades tribales." },
  },
},
{
  category: "Housing",
  link: "https://www.nahasda.org",
  i18n: {
    en: { title: "Native American Housing Assistance Info", desc: "Information on housing block grants for Native American and Alaska Native communities." },
    fr: { title: "Info aide logement autochtone", desc: "Informations sur les subventions logement pour communautés autochtones." },
    es: { title: "Información de Asistencia de Vivienda Nativa Americana", desc: "Información sobre subvenciones de vivienda para comunidades nativas." },
  },
},
{
  category: "Housing",
  link: "https://www.disabilityhousingnetwork.org",
  i18n: {
    en: { title: "Disability Housing Network", desc: "Accessible and supportive housing resources for people with disabilities." },
    fr: { title: "Réseau logement handicap", desc: "Ressources de logement accessible et soutenu pour personnes handicapées." },
    es: { title: "Red de Vivienda para Discapacidad", desc: "Recursos de vivienda accesible y de apoyo para personas con discapacidades." },
  },
},
{
  category: "Housing",
  link: "https://www.211.org/services/homeless-shelters",
  i18n: {
    en: { title: "211 Homeless Shelter Directory", desc: "Local emergency shelter referrals through the 211 network." },
    fr: { title: "Répertoire refuges sans-abri 211", desc: "Orientation vers refuges d'urgence locaux via le réseau 211." },
    es: { title: "Directorio de Refugios para Personas sin Hogar 211", desc: "Referencias a refugios de emergencia locales a través de la red 211." },
  },
},

// UTILITIES (12)
{
  category: "Utilities",
  link: "https://www.rd.usda.gov/programs-services/broadband-programs",
  i18n: {
    en: { title: "USDA Broadband Programs", desc: "Federal funding programs expanding rural broadband access." },
    fr: { title: "Programmes internet haut débit USDA", desc: "Programmes fédéraux de financement pour élargir l'accès Internet rural." },
    es: { title: "Programas de Banda Ancha USDA", desc: "Programas federales de financiamiento para expandir el acceso a internet rural." },
  },
},
{
  category: "Utilities",
  link: "https://www.internetessentials.com",
  i18n: {
    en: { title: "Internet Essentials", desc: "Low-cost internet program for eligible low-income households." },
    fr: { title: "Internet Essentials", desc: "Programme Internet à faible coût pour ménages à faible revenu admissibles." },
    es: { title: "Internet Essentials", desc: "Programa de internet de bajo costo para hogares de bajos ingresos elegibles." },
  },
},
{
  category: "Utilities",
  link: "https://www.att.com/internet/access/",
  i18n: {
    en: { title: "AT&T Access Program", desc: "Discounted home internet program for qualifying households." },
    fr: { title: "Programme AT&T Access", desc: "Programme Internet résidentiel à prix réduit pour ménages admissibles." },
    es: { title: "Programa AT&T Access", desc: "Programa de internet residencial con descuento para hogares elegibles." },
  },
},
{
  category: "Utilities",
  link: "https://www.spectrum.com/browse/content/spectrum-internet-assist",
  i18n: {
    en: { title: "Spectrum Internet Assist", desc: "Low-cost internet program for eligible households through Spectrum." },
    fr: { title: "Spectrum Internet Assist", desc: "Programme Internet à faible coût pour ménages admissibles via Spectrum." },
    es: { title: "Spectrum Internet Assist", desc: "Programa de internet de bajo costo para hogares elegibles a través de Spectrum." },
  },
},
{
  category: "Utilities",
  link: "https://www.pcsforpeople.org",
  i18n: {
    en: { title: "PCs for People", desc: "Low-cost computers and internet access for eligible individuals and nonprofits." },
    fr: { title: "PCs for People", desc: "Ordinateurs et accès Internet à faible coût pour personnes et organismes admissibles." },
    es: { title: "PCs for People", desc: "Computadoras e internet de bajo costo para personas y organizaciones elegibles." },
  },
},
{
  category: "Utilities",
  link: "https://www.digitunity.org",
  i18n: {
    en: { title: "Digitunity Device Access", desc: "Helps connect people in need with refurbished computers and devices." },
    fr: { title: "Accès appareils Digitunity", desc: "Aide à connecter les personnes dans le besoin avec des ordinateurs reconditionnés." },
    es: { title: "Acceso a Dispositivos Digitunity", desc: "Ayuda a conectar a personas necesitadas con computadoras reacondicionadas." },
  },
},
{
  category: "Utilities",
  link: "https://www.connectall.gov",
  i18n: {
    en: { title: "Internet for All Initiative", desc: "Federal initiative expanding affordable high-speed internet access nationwide." },
    fr: { title: "Initiative Internet pour tous", desc: "Initiative fédérale élargissant l'accès Internet haut débit abordable." },
    es: { title: "Iniciativa Internet para Todos", desc: "Iniciativa federal que expande el acceso a internet de alta velocidad asequible." },
  },
},
{
  category: "Utilities",
  link: "https://www.usa.gov/help-with-devices",
  i18n: {
    en: { title: "USA.gov Device Assistance Guide", desc: "Government guide to programs offering low-cost computers and devices." },
    fr: { title: "Guide aide appareils USA.gov", desc: "Guide gouvernemental pour les programmes offrant des ordinateurs à faible coût." },
    es: { title: "Guía de Asistencia de Dispositivos USA.gov", desc: "Guía del gobierno para programas que ofrecen computadoras de bajo costo." },
  },
},
{
  category: "Utilities",
  link: "https://www.mobilecitizen.org",
  i18n: {
    en: { title: "Mobile Citizen", desc: "Low-cost mobile internet service for nonprofits and community programs." },
    fr: { title: "Mobile Citizen", desc: "Service Internet mobile à faible coût pour organismes et programmes communautaires." },
    es: { title: "Mobile Citizen", desc: "Servicio de internet móvil de bajo costo para organizaciones sin fines de lucro." },
  },
},
{
  category: "Utilities",
  link: "https://www.freegeek.org",
  i18n: {
    en: { title: "Free Geek", desc: "Low-cost refurbished computers and digital skills training." },
    fr: { title: "Free Geek", desc: "Ordinateurs reconditionnés à faible coût et formation aux compétences numériques." },
    es: { title: "Free Geek", desc: "Computadoras reacondicionadas de bajo costo y capacitación en habilidades digitales." },
  },
},
{
  category: "Utilities",
  link: "https://www.compudopt.org",
  i18n: {
    en: { title: "Compudopt", desc: "Provides computers and digital literacy training to underserved communities." },
    fr: { title: "Compudopt", desc: "Fournit ordinateurs et formation numérique aux communautés mal desservies." },
    es: { title: "Compudopt", desc: "Proporciona computadoras y capacitación digital a comunidades desatendidas." },
  },
},
{
  category: "Utilities",
  link: "https://www.interconnection.org",
  i18n: {
    en: { title: "InterConnection", desc: "Affordable refurbished computers for nonprofits and low-income individuals." },
    fr: { title: "InterConnection", desc: "Ordinateurs reconditionnés abordables pour organismes et personnes à faible revenu." },
    es: { title: "InterConnection", desc: "Computadoras reacondicionadas asequibles para organizaciones y personas de bajos ingresos." },
  },
},

// EDUCATION (13)
{
  category: "Education",
  link: "https://www.goodwill.org/gcf",
  i18n: {
    en: { title: "Goodwill Community Foundation Learning", desc: "Free online learning tools covering digital literacy and workplace skills." },
    fr: { title: "Apprentissage Goodwill Community Foundation", desc: "Outils d'apprentissage en ligne gratuits couvrant compétences numériques et professionnelles." },
    es: { title: "Aprendizaje Goodwill Community Foundation", desc: "Herramientas de aprendizaje en línea gratuitas sobre alfabetización digital y habilidades laborales." },
  },
},
{
  category: "Education",
  link: "https://www.pluralsight.org",
  i18n: {
    en: { title: "Pluralsight One Nonprofit Learning", desc: "Free technology skills training for underserved individuals and nonprofits." },
    fr: { title: "Pluralsight One apprentissage à but non lucratif", desc: "Formation gratuite en compétences technologiques pour personnes défavorisées." },
    es: { title: "Aprendizaje sin Fines de Lucro Pluralsight One", desc: "Capacitación gratuita en habilidades tecnológicas para personas desatendidas." },
  },
},
{
  category: "Education",
  link: "https://www.techsoup.org",
  i18n: {
    en: { title: "TechSoup", desc: "Technology resources and training support for nonprofits and communities." },
    fr: { title: "TechSoup", desc: "Ressources technologiques et soutien à la formation pour organismes et communautés." },
    es: { title: "TechSoup", desc: "Recursos tecnológicos y apoyo de capacitación para organizaciones y comunidades." },
  },
},
{
  category: "Education",
  link: "https://www.yearup.org",
  i18n: {
    en: { title: "Year Up", desc: "Career training and internship program for young adults from underserved communities." },
    fr: { title: "Year Up", desc: "Programme de formation professionnelle et de stage pour jeunes adultes défavorisés." },
    es: { title: "Year Up", desc: "Programa de capacitación profesional y pasantías para jóvenes adultos desatendidos." },
  },
},
{
  category: "Education",
  link: "https://www.perscholas.org",
  i18n: {
    en: { title: "Per Scholas", desc: "Free technology career training for adults from underserved communities." },
    fr: { title: "Per Scholas", desc: "Formation professionnelle technologique gratuite pour adultes défavorisés." },
    es: { title: "Per Scholas", desc: "Capacitación profesional tecnológica gratuita para adultos desatendidos." },
  },
},
{
  category: "Education",
  link: "https://www.generation.org",
  i18n: {
    en: { title: "Generation USA", desc: "Free job training programs matching graduates with employers." },
    fr: { title: "Generation USA", desc: "Programmes de formation professionnelle gratuits reliant diplômés et employeurs." },
    es: { title: "Generation USA", desc: "Programas gratuitos de capacitación laboral que conectan graduados con empleadores." },
  },
},
{
  category: "Education",
  link: "https://www.nulmef.org",
  i18n: {
    en: { title: "National Urban League Education Fund", desc: "Educational and workforce programs for underserved urban communities." },
    fr: { title: "Fonds éducation National Urban League", desc: "Programmes éducatifs et professionnels pour communautés urbaines défavorisées." },
    es: { title: "Fondo Educativo National Urban League", desc: "Programas educativos y laborales para comunidades urbanas desatendidas." },
  },
},
{
  category: "Education",
  link: "https://www.uncf.org",
  i18n: {
    en: { title: "United Negro College Fund", desc: "Scholarships and support for students attending historically Black colleges." },
    fr: { title: "United Negro College Fund", desc: "Bourses et soutien pour étudiants dans les collèges historiquement noirs." },
    es: { title: "United Negro College Fund", desc: "Becas y apoyo para estudiantes en universidades históricamente afroamericanas." },
  },
},
{
  category: "Education",
  link: "https://www.hsf.net",
  i18n: {
    en: { title: "Hispanic Scholarship Fund", desc: "Scholarships and support resources for Hispanic students pursuing higher education." },
    fr: { title: "Fonds bourse hispanique", desc: "Bourses et ressources de soutien pour étudiants hispaniques dans l'enseignement supérieur." },
    es: { title: "Fondo de Becas Hispanas", desc: "Becas y recursos de apoyo para estudiantes hispanos en la educación superior." },
  },
},
{
  category: "Education",
  link: "https://www.aigcs.org",
  i18n: {
    en: { title: "American Indian Graduate Center", desc: "Scholarships and graduate support for Native American students." },
    fr: { title: "American Indian Graduate Center", desc: "Bourses et soutien aux études supérieures pour étudiants amérindiens." },
    es: { title: "American Indian Graduate Center", desc: "Becas y apoyo de posgrado para estudiantes nativos americanos." },
  },
},
{
  category: "Education",
  link: "https://www.imaginebetter.org",
  i18n: {
    en: { title: "Imagine America Foundation", desc: "Scholarships for career and vocational education students." },
    fr: { title: "Imagine America Foundation", desc: "Bourses pour étudiants en formation professionnelle et technique." },
    es: { title: "Imagine America Foundation", desc: "Becas para estudiantes de educación profesional y vocacional." },
  },
},
{
  category: "Education",
  link: "https://www.dreamkeepers.org",
  i18n: {
    en: { title: "Dream Keepers Scholarship Directory", desc: "Directory of scholarships for first-generation and underserved students." },
    fr: { title: "Répertoire bourses Dream Keepers", desc: "Répertoire de bourses pour étudiants de première génération et défavorisés." },
    es: { title: "Directorio de Becas Dream Keepers", desc: "Directorio de becas para estudiantes de primera generación y desatendidos." },
  },
},
{
  category: "Education",
  link: "https://www.fastweb.com",
  i18n: {
    en: { title: "Fastweb Scholarship Search", desc: "Searchable database of scholarships matched to student profiles." },
    fr: { title: "Recherche bourses Fastweb", desc: "Base de données de bourses consultable selon le profil de l'étudiant." },
    es: { title: "Búsqueda de Becas Fastweb", desc: "Base de datos de becas buscable según el perfil del estudiante." },
  },
},

// INCOME (15)
{
  category: "Income",
  link: "https://www.opportunityfund.org",
  i18n: {
    en: { title: "Opportunity Fund Small Business Loans", desc: "Affordable small business loans for underserved entrepreneurs." },
    fr: { title: "Prêts petites entreprises Opportunity Fund", desc: "Prêts abordables aux petites entreprises pour entrepreneurs défavorisés." },
    es: { title: "Préstamos para Pequeñas Empresas Opportunity Fund", desc: "Préstamos asequibles para pequeñas empresas para emprendedores desatendidos." },
  },
},
{
  category: "Income",
  link: "https://www.kiva.org",
  i18n: {
    en: { title: "Kiva Microloans", desc: "Crowdfunded microloans supporting entrepreneurs and small businesses." },
    fr: { title: "Microprêts Kiva", desc: "Microprêts financés par sociofinancement soutenant entrepreneurs et petites entreprises." },
    es: { title: "Microcréditos Kiva", desc: "Microcréditos financiados colectivamente que apoyan a emprendedores y pequeñas empresas." },
  },
},
{
  category: "Income",
  link: "https://www.accion.org",
  i18n: {
    en: { title: "Accion Opportunity Fund", desc: "Small business loans and coaching for underserved entrepreneurs." },
    fr: { title: "Accion Opportunity Fund", desc: "Prêts aux petites entreprises et coaching pour entrepreneurs défavorisés." },
    es: { title: "Accion Opportunity Fund", desc: "Préstamos para pequeñas empresas y asesoría para emprendedores desatendidos." },
  },
},
{
  category: "Income",
  link: "https://www.grameenamerica.org",
  i18n: {
    en: { title: "Grameen America", desc: "Microloans and financial training for women entrepreneurs in poverty." },
    fr: { title: "Grameen America", desc: "Microprêts et formation financière pour femmes entrepreneures en situation de pauvreté." },
    es: { title: "Grameen America", desc: "Microcréditos y capacitación financiera para mujeres emprendedoras en pobreza." },
  },
},
{
  category: "Income",
  link: "https://www.lift.org",
  i18n: {
    en: { title: "LIFT", desc: "Coaching and financial support helping families build economic stability." },
    fr: { title: "LIFT", desc: "Coaching et soutien financier aidant les familles à bâtir une stabilité économique." },
    es: { title: "LIFT", desc: "Asesoría y apoyo financiero que ayuda a las familias a construir estabilidad económica." },
  },
},
{
  category: "Income",
  link: "https://www.singlestop.org",
  i18n: {
    en: { title: "Single Stop", desc: "Screening tool connecting individuals to benefits, tax help, and financial coaching." },
    fr: { title: "Single Stop", desc: "Outil de dépistage reliant les personnes aux prestations, aide fiscale et coaching financier." },
    es: { title: "Single Stop", desc: "Herramienta de evaluación que conecta a personas con beneficios, ayuda fiscal y asesoría financiera." },
  },
},
{
  category: "Income",
  link: "https://www.prosperitynow.org",
  i18n: {
    en: { title: "Prosperity Now", desc: "Financial capability resources and policy tools promoting economic security." },
    fr: { title: "Prosperity Now", desc: "Ressources de capacité financière et outils politiques favorisant la sécurité économique." },
    es: { title: "Prosperity Now", desc: "Recursos de capacidad financiera y herramientas de políticas que promueven seguridad económica." },
  },
},
{
  category: "Income",
  link: "https://www.211.org/services/employment",
  i18n: {
    en: { title: "211 Employment Services Directory", desc: "Local job search and employment support referrals through 211." },
    fr: { title: "Répertoire services emploi 211", desc: "Orientation locale vers recherche d'emploi et soutien via le réseau 211." },
    es: { title: "Directorio de Servicios de Empleo 211", desc: "Referencias locales de búsqueda de empleo y apoyo a través de la red 211." },
  },
},
{
  category: "Income",
  link: "https://www.dressforsuccess.org",
  i18n: {
    en: { title: "Dress for Success", desc: "Professional attire and career development support for women entering the workforce." },
    fr: { title: "Dress for Success", desc: "Tenue professionnelle et soutien au développement de carrière pour femmes." },
    es: { title: "Dress for Success", desc: "Vestimenta profesional y apoyo de desarrollo profesional para mujeres." },
  },
},
{
  category: "Income",
  link: "https://www.careergear.org",
  i18n: {
    en: { title: "Career Gear", desc: "Professional attire and career coaching for men entering the workforce." },
    fr: { title: "Career Gear", desc: "Tenue professionnelle et coaching de carrière pour hommes entrant sur le marché du travail." },
    es: { title: "Career Gear", desc: "Vestimenta profesional y asesoría de carrera para hombres que ingresan al mercado laboral." },
  },
},
{
  category: "Income",
  link: "https://www.stepup.org",
  i18n: {
    en: { title: "Step Up Women's Network", desc: "Mentorship and career development programs for underserved women and girls." },
    fr: { title: "Step Up Women's Network", desc: "Programmes de mentorat et développement de carrière pour femmes et filles défavorisées." },
    es: { title: "Step Up Women's Network", desc: "Programas de mentoría y desarrollo profesional para mujeres y niñas desatendidas." },
  },
},
{
  category: "Income",
  link: "https://www.upwardlyglobal.org",
  i18n: {
    en: { title: "Upwardly Global", desc: "Career support for immigrants and refugees rebuilding professional careers." },
    fr: { title: "Upwardly Global", desc: "Soutien professionnel pour immigrants et réfugiés reconstruisant leur carrière." },
    es: { title: "Upwardly Global", desc: "Apoyo profesional para inmigrantes y refugiados que reconstruyen sus carreras." },
  },
},
{
  category: "Income",
  link: "https://www.refugeeworks.org",
  i18n: {
    en: { title: "Refugee Works Employment Support", desc: "Employment and career support resources for refugees." },
    fr: { title: "Soutien emploi Refugee Works", desc: "Ressources de soutien à l'emploi et à la carrière pour réfugiés." },
    es: { title: "Apoyo de Empleo Refugee Works", desc: "Recursos de apoyo de empleo y carrera para refugiados." },
  },
},
{
  category: "Income",
  link: "https://www.nationalimmigrationforum.org",
  i18n: {
    en: { title: "National Immigration Forum", desc: "Immigration policy resources and support for newcomer economic integration." },
    fr: { title: "National Immigration Forum", desc: "Ressources politiques d'immigration et soutien à l'intégration économique." },
    es: { title: "National Immigration Forum", desc: "Recursos de política de inmigración y apoyo a la integración económica." },
  },
},
{
  category: "Income",
  link: "https://www.reentry.net",
  i18n: {
    en: { title: "Reentry.net", desc: "Resources and directory for people reentering society after incarceration." },
    fr: { title: "Reentry.net", desc: "Ressources et répertoire pour personnes se réinsérant après incarcération." },
    es: { title: "Reentry.net", desc: "Recursos y directorio para personas que se reintegran tras encarcelamiento." },
  },
},

    // ===== PROGRAMS 751-850 =====

// FOOD (15)
{
  category: "Food",
  link: "https://www.foodforward.org",
  i18n: {
    en: { title: "Food Forward", desc: "Rescues fresh produce and distributes it to hunger relief agencies." },
    fr: { title: "Food Forward", desc: "Récupère des produits frais et les distribue à des organismes de lutte contre la faim." },
    es: { title: "Food Forward", desc: "Rescata productos frescos y los distribuye a agencias de ayuda contra el hambre." },
  },
},
{
  category: "Food",
  link: "https://www.copia.co",
  i18n: {
    en: { title: "Copia Food Surplus Platform", desc: "Connects businesses with surplus food to local nonprofits fighting hunger." },
    fr: { title: "Plateforme surplus alimentaire Copia", desc: "Relie les entreprises ayant des surplus alimentaires aux organismes locaux." },
    es: { title: "Plataforma de Excedentes Copia", desc: "Conecta empresas con excedentes de comida a organizaciones locales contra el hambre." },
  },
},
{
  category: "Food",
  link: "https://www.spoonerfoundation.org",
  i18n: {
    en: { title: "Spooner Foundation Nutrition Programs", desc: "Supports school meal and nutrition programs for children in need." },
    fr: { title: "Programmes nutrition Spooner Foundation", desc: "Soutient les programmes de repas scolaires et nutrition pour enfants." },
    es: { title: "Programas de Nutrición Spooner Foundation", desc: "Apoya programas de comidas escolares y nutrición para niños necesitados." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/farm-to-school",
  i18n: {
    en: { title: "USDA Farm to School Program", desc: "Connects schools with local farms to improve access to fresh food." },
    fr: { title: "Programme Farm to School USDA", desc: "Relie les écoles aux fermes locales pour améliorer l'accès aux aliments frais." },
    es: { title: "Programa Farm to School USDA", desc: "Conecta escuelas con granjas locales para mejorar el acceso a alimentos frescos." },
  },
},
{
  category: "Food",
  link: "https://www.acf.hhs.gov/ana/programs",
  i18n: {
    en: { title: "ANA Native American Nutrition Programs", desc: "Federal nutrition program support for Native American communities." },
    fr: { title: "Programmes nutrition autochtone ANA", desc: "Soutien fédéral aux programmes de nutrition pour communautés autochtones." },
    es: { title: "Programas de Nutrición Nativa Americana ANA", desc: "Apoyo federal a programas de nutrición para comunidades nativas americanas." },
  },
},
{
  category: "Food",
  link: "https://www.hungeractionalliance.org",
  i18n: {
    en: { title: "Hunger Action Alliance", desc: "Advocacy and resource network working to reduce hunger regionally." },
    fr: { title: "Hunger Action Alliance", desc: "Réseau de plaidoyer et de ressources travaillant à réduire la faim régionalement." },
    es: { title: "Hunger Action Alliance", desc: "Red de defensa y recursos que trabaja para reducir el hambre regionalmente." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/ofs/farm-fresh-schools",
  i18n: {
    en: { title: "Farm Fresh School Programs", desc: "Federal resources helping schools source fresh local produce for meals." },
    fr: { title: "Programmes scolaires produits frais", desc: "Ressources fédérales aidant les écoles à s'approvisionner en produits frais locaux." },
    es: { title: "Programas Escolares de Productos Frescos", desc: "Recursos federales que ayudan a las escuelas a obtener productos frescos locales." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/farmers-market-directory",
  i18n: {
    en: { title: "USDA Farmers Market Directory", desc: "National directory of farmers markets, many accepting SNAP and WIC benefits." },
    fr: { title: "Répertoire marchés fermiers USDA", desc: "Répertoire national des marchés fermiers, plusieurs acceptant SNAP et WIC." },
    es: { title: "Directorio de Mercados de Agricultores USDA", desc: "Directorio nacional de mercados agrícolas, muchos aceptan SNAP y WIC." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/wic/wic-vendor",
  i18n: {
    en: { title: "WIC Approved Vendor Info", desc: "Information on where WIC benefits can be used to purchase approved foods." },
    fr: { title: "Info fournisseurs approuvés WIC", desc: "Informations sur où utiliser les prestations WIC pour acheter des aliments approuvés." },
    es: { title: "Información de Proveedores Aprobados WIC", desc: "Información sobre dónde usar los beneficios de WIC para comprar alimentos aprobados." },
  },
},
{
  category: "Food",
  link: "https://www.harvestforall.org",
  i18n: {
    en: { title: "Harvest for All", desc: "Farmer-led hunger relief program donating food to local pantries." },
    fr: { title: "Harvest for All", desc: "Programme de lutte contre la faim dirigé par des agriculteurs, donnant de la nourriture." },
    es: { title: "Harvest for All", desc: "Programa liderado por agricultores que dona alimentos a despensas locales." },
  },
},
{
  category: "Food",
  link: "https://www.actionagainsthunger.org",
  i18n: {
    en: { title: "Action Against Hunger USA", desc: "Nutrition and hunger relief programs supporting vulnerable communities." },
    fr: { title: "Action Against Hunger USA", desc: "Programmes de nutrition et lutte contre la faim pour communautés vulnérables." },
    es: { title: "Action Against Hunger USA", desc: "Programas de nutrición y ayuda contra el hambre para comunidades vulnerables." },
  },
},
{
  category: "Food",
  link: "https://www.savethechildren.org/us/what-we-do/hunger-nutrition",
  i18n: {
    en: { title: "Save the Children Hunger & Nutrition", desc: "Nutrition support programs for children in underserved US communities." },
    fr: { title: "Faim et nutrition Save the Children", desc: "Programmes de soutien nutritionnel pour enfants dans les communautés défavorisées." },
    es: { title: "Hambre y Nutrición Save the Children", desc: "Programas de apoyo nutricional para niños en comunidades desatendidas." },
  },
},
{
  category: "Food",
  link: "https://www.unitedwaywilming.org/food",
  i18n: {
    en: { title: "United Way Local Food Assistance", desc: "Local United Way chapters connecting families to food resources." },
    fr: { title: "Aide alimentaire locale United Way", desc: "Chapitres locaux United Way reliant les familles aux ressources alimentaires." },
    es: { title: "Asistencia Alimentaria Local United Way", desc: "Capítulos locales de United Way que conectan a familias con recursos alimentarios." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties",
  i18n: {
    en: { title: "Food Pantries by County Directory", desc: "Search food pantries organized by county across the United States." },
    fr: { title: "Répertoire garde-manger par comté", desc: "Recherchez des garde-manger organisés par comté à travers les États-Unis." },
    es: { title: "Directorio de Despensas por Condado", desc: "Busque despensas de alimentos organizadas por condado en Estados Unidos." },
  },
},
{
  category: "Food",
  link: "https://www.usda.gov/media/press-releases/nutrition-assistance",
  i18n: {
    en: { title: "USDA Nutrition Assistance Press Updates", desc: "Official USDA press updates on nutrition assistance program changes." },
    fr: { title: "Mises à jour presse assistance nutrition USDA", desc: "Mises à jour officielles de l'USDA sur les changements de programmes." },
    es: { title: "Actualizaciones de Prensa de Asistencia Nutricional USDA", desc: "Actualizaciones oficiales del USDA sobre cambios en programas." },
  },
},

// HEALTH (15)
{
  category: "Health",
  link: "https://www.leukemia-lymphoma.org/patient-support",
  i18n: {
    en: { title: "Leukemia & Lymphoma Society Patient Support", desc: "Financial and emotional support for people with blood cancers." },
    fr: { title: "Soutien patients Leukemia & Lymphoma Society", desc: "Soutien financier et émotionnel pour les personnes atteintes de cancers du sang." },
    es: { title: "Apoyo a Pacientes Leukemia & Lymphoma Society", desc: "Apoyo financiero y emocional para personas con cánceres de la sangre." },
  },
},
{
  category: "Health",
  link: "https://www.cancercare.org",
  i18n: {
    en: { title: "CancerCare", desc: "Free counseling, support groups, and financial assistance for cancer patients." },
    fr: { title: "CancerCare", desc: "Conseils gratuits, groupes de soutien et aide financière pour patients cancéreux." },
    es: { title: "CancerCare", desc: "Consejería gratuita, grupos de apoyo y ayuda financiera para pacientes con cáncer." },
  },
},
{
  category: "Health",
  link: "https://www.cff.org",
  i18n: {
    en: { title: "Cystic Fibrosis Foundation", desc: "Support and financial assistance resources for people with cystic fibrosis." },
    fr: { title: "Cystic Fibrosis Foundation", desc: "Ressources de soutien et d'aide financière pour personnes atteintes de fibrose kystique." },
    es: { title: "Cystic Fibrosis Foundation", desc: "Recursos de apoyo y ayuda financiera para personas con fibrosis quística." },
  },
},
{
  category: "Health",
  link: "https://www.hemophilia.org",
  i18n: {
    en: { title: "National Hemophilia Foundation", desc: "Support and resources for people with bleeding disorders." },
    fr: { title: "National Hemophilia Foundation", desc: "Soutien et ressources pour les personnes atteintes de troubles de la coagulation." },
    es: { title: "National Hemophilia Foundation", desc: "Apoyo y recursos para personas con trastornos de coagulación." },
  },
},
{
  category: "Health",
  link: "https://www.epilepsy.com/living-epilepsy/getting-help",
  i18n: {
    en: { title: "Epilepsy Foundation Support Resources", desc: "Support, education, and financial assistance for people with epilepsy." },
    fr: { title: "Ressources soutien Epilepsy Foundation", desc: "Soutien, éducation et aide financière pour personnes épileptiques." },
    es: { title: "Recursos de Apoyo Epilepsy Foundation", desc: "Apoyo, educación y ayuda financiera para personas con epilepsia." },
  },
},
{
  category: "Health",
  link: "https://www.lupus.org/resources",
  i18n: {
    en: { title: "Lupus Foundation of America Resources", desc: "Support, education, and financial resources for people with lupus." },
    fr: { title: "Ressources Lupus Foundation of America", desc: "Soutien, éducation et ressources financières pour personnes atteintes de lupus." },
    es: { title: "Recursos Lupus Foundation of America", desc: "Apoyo, educación y recursos financieros para personas con lupus." },
  },
},
{
  category: "Health",
  link: "https://www.nationalmssociety.org/resources-support",
  i18n: {
    en: { title: "National MS Society Resources & Support", desc: "Support, education, and financial help for people with multiple sclerosis." },
    fr: { title: "Ressources National MS Society", desc: "Soutien, éducation et aide financière pour personnes atteintes de sclérose en plaques." },
    es: { title: "Recursos National MS Society", desc: "Apoyo, educación y ayuda financiera para personas con esclerosis múltiple." },
  },
},
{
  category: "Health",
  link: "https://www.michaeljfox.org/patient-resources",
  i18n: {
    en: { title: "Michael J. Fox Foundation Patient Resources", desc: "Resources and support for people living with Parkinson's disease." },
    fr: { title: "Ressources patients Michael J. Fox Foundation", desc: "Ressources et soutien pour personnes atteintes de la maladie de Parkinson." },
    es: { title: "Recursos para Pacientes Michael J. Fox Foundation", desc: "Recursos y apoyo para personas con la enfermedad de Parkinson." },
  },
},
{
  category: "Health",
  link: "https://www.alz.org/help-support",
  i18n: {
    en: { title: "Alzheimer's Association Help & Support", desc: "24/7 helpline and resources for families affected by Alzheimer's and dementia." },
    fr: { title: "Aide et soutien Alzheimer's Association", desc: "Ligne d'assistance 24/7 et ressources pour familles touchées par Alzheimer." },
    es: { title: "Ayuda y Apoyo Alzheimer's Association", desc: "Línea de ayuda 24/7 y recursos para familias afectadas por Alzheimer y demencia." },
  },
},
{
  category: "Health",
  link: "https://www.parkinson.org/find-help",
  i18n: {
    en: { title: "Parkinson's Foundation Find Help", desc: "Helpline and resources for people living with Parkinson's disease." },
    fr: { title: "Trouver de l'aide Parkinson's Foundation", desc: "Ligne d'assistance et ressources pour personnes atteintes de Parkinson." },
    es: { title: "Encuentre Ayuda Parkinson's Foundation", desc: "Línea de ayuda y recursos para personas con la enfermedad de Parkinson." },
  },
},
{
  category: "Health",
  link: "https://www.aidshealth.org",
  i18n: {
    en: { title: "AIDS Healthcare Foundation", desc: "HIV/AIDS medical care, testing, and support services." },
    fr: { title: "AIDS Healthcare Foundation", desc: "Soins médicaux VIH/SIDA, dépistage et services de soutien." },
    es: { title: "AIDS Healthcare Foundation", desc: "Atención médica de VIH/SIDA, pruebas y servicios de apoyo." },
  },
},
{
  category: "Health",
  link: "https://www.hiv.gov/hiv-basics/starting-hiv-care",
  i18n: {
    en: { title: "HIV.gov Care Starting Guide", desc: "Federal guide to starting HIV medical care and finding local providers." },
    fr: { title: "Guide démarrage soins HIV.gov", desc: "Guide fédéral pour commencer les soins VIH et trouver des prestataires locaux." },
    es: { title: "Guía de Inicio de Atención HIV.gov", desc: "Guía federal para comenzar la atención del VIH y encontrar proveedores locales." },
  },
},
{
  category: "Health",
  link: "https://www.plannedparenthood.org/learn/health-and-wellness",
  i18n: {
    en: { title: "Planned Parenthood Health & Wellness Info", desc: "Reproductive and general health information and services directory." },
    fr: { title: "Info santé et bien-être Planned Parenthood", desc: "Répertoire d'informations et services de santé reproductive et générale." },
    es: { title: "Información de Salud y Bienestar Planned Parenthood", desc: "Directorio de información y servicios de salud reproductiva y general." },
  },
},
{
  category: "Health",
  link: "https://www.marchofdimes.org/find-a-hospital",
  i18n: {
    en: { title: "March of Dimes NICU Hospital Finder", desc: "Find hospitals with NICU services rated for premature infant care." },
    fr: { title: "Recherche hôpitaux NICU March of Dimes", desc: "Trouvez des hôpitaux avec services NICU pour les soins aux prématurés." },
    es: { title: "Buscador de Hospitales NICU March of Dimes", desc: "Encuentre hospitales con servicios NICU para cuidado de bebés prematuros." },
  },
},
{
  category: "Health",
  link: "https://www.marchofdimes.org/find-support/nicu-family-support",
  i18n: {
    en: { title: "NICU Family Support Program", desc: "Support for families with babies in neonatal intensive care." },
    fr: { title: "Programme soutien familial NICU", desc: "Soutien pour les familles avec bébés en soins intensifs néonatals." },
    es: { title: "Programa de Apoyo Familiar NICU", desc: "Apoyo para familias con bebés en cuidados intensivos neonatales." },
  },
},

// HOUSING (15)
{
  category: "Housing",
  link: "https://www.projecthome.org",
  i18n: {
    en: { title: "Project HOME", desc: "Housing, healthcare, and education services for people experiencing homelessness." },
    fr: { title: "Project HOME", desc: "Services de logement, santé et éducation pour personnes sans-abri." },
    es: { title: "Project HOME", desc: "Servicios de vivienda, salud y educación para personas sin hogar." },
  },
},
{
  category: "Housing",
  link: "https://www.pathwaystohousing.org",
  i18n: {
    en: { title: "Pathways to Housing", desc: "Housing First model programs providing permanent housing with support." },
    fr: { title: "Pathways to Housing", desc: "Programmes de modèle Housing First offrant logement permanent avec soutien." },
    es: { title: "Pathways to Housing", desc: "Programas del modelo Housing First que ofrecen vivienda permanente con apoyo." },
  },
},
{
  category: "Housing",
  link: "https://www.hudexchange.info/programs/vawa/",
  i18n: {
    en: { title: "VAWA Housing Protections Info", desc: "Federal housing protections for survivors of domestic violence." },
    fr: { title: "Info protections logement VAWA", desc: "Protections fédérales du logement pour survivants de violence domestique." },
    es: { title: "Información de Protecciones de Vivienda VAWA", desc: "Protecciones federales de vivienda para sobrevivientes de violencia doméstica." },
  },
},
{
  category: "Housing",
  link: "https://www.domesticshelters.org",
  i18n: {
    en: { title: "DomesticShelters.org", desc: "Directory of domestic violence shelters and housing safety resources." },
    fr: { title: "DomesticShelters.org", desc: "Répertoire de refuges pour violence domestique et ressources de sécurité." },
    es: { title: "DomesticShelters.org", desc: "Directorio de refugios para violencia doméstica y recursos de seguridad." },
  },
},
{
  category: "Housing",
  link: "https://www.safehorizon.org/get-help/housing/",
  i18n: {
    en: { title: "Safe Horizon Housing Help", desc: "Housing safety resources for survivors of violence and abuse." },
    fr: { title: "Aide logement Safe Horizon", desc: "Ressources de sécurité logement pour survivants de violence et abus." },
    es: { title: "Ayuda de Vivienda Safe Horizon", desc: "Recursos de seguridad de vivienda para sobrevivientes de violencia y abuso." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/family_self_sufficiency_program",
  i18n: {
    en: { title: "HUD Family Self-Sufficiency Program", desc: "Program helping HUD-assisted families increase income and build savings." },
    fr: { title: "Programme autosuffisance familiale HUD", desc: "Programme aidant les familles assistées par HUD à augmenter revenus et épargne." },
    es: { title: "Programa de Autosuficiencia Familiar HUD", desc: "Programa que ayuda a familias asistidas por HUD a aumentar ingresos y ahorros." },
  },
},
{
  category: "Housing",
  link: "https://www.hudexchange.info/programs/rad/",
  i18n: {
    en: { title: "Rental Assistance Demonstration Program Info", desc: "Federal program converting public housing to long-term affordable housing." },
    fr: { title: "Info programme démonstration aide loyer", desc: "Programme fédéral convertissant le logement public en logement abordable durable." },
    es: { title: "Información del Programa de Demostración de Asistencia de Alquiler", desc: "Programa federal que convierte vivienda pública en vivienda asequible a largo plazo." },
  },
},
{
  category: "Housing",
  link: "https://www.reversemortgage.org",
  i18n: {
    en: { title: "National Reverse Mortgage Lenders Association", desc: "Consumer education on reverse mortgages for eligible senior homeowners." },
    fr: { title: "Association nationale prêteurs hypothèque inversée", desc: "Éducation consommateur sur les hypothèques inversées pour aînés propriétaires." },
    es: { title: "Asociación Nacional de Prestamistas de Hipoteca Inversa", desc: "Educación al consumidor sobre hipotecas inversas para propietarios mayores." },
  },
},
{
  category: "Housing",
  link: "https://www.consumerfinance.gov/consumer-tools/reverse-mortgages/",
  i18n: {
    en: { title: "CFPB Reverse Mortgage Guidance", desc: "Consumer protection guidance on reverse mortgage products for seniors." },
    fr: { title: "Conseils hypothèque inversée CFPB", desc: "Conseils de protection consommateur sur les hypothèques inversées pour aînés." },
    es: { title: "Guía de Hipotecas Inversas CFPB", desc: "Orientación de protección al consumidor sobre hipotecas inversas para mayores." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/manufactured_home_communities",
  i18n: {
    en: { title: "HUD Manufactured Home Community Info", desc: "Federal information on rights and resources for manufactured home community residents." },
    fr: { title: "Info communautés maisons préfabriquées HUD", desc: "Informations fédérales sur droits et ressources pour résidents de communautés préfabriquées." },
    es: { title: "Información de Comunidades de Vivienda Prefabricada HUD", desc: "Información federal sobre derechos y recursos para residentes de comunidades prefabricadas." },
  },
},
{
  category: "Housing",
  link: "https://www.manufacturedhousing.org",
  i18n: {
    en: { title: "Manufactured Housing Institute Resources", desc: "Consumer resources and information about manufactured housing options." },
    fr: { title: "Ressources Manufactured Housing Institute", desc: "Ressources consommateurs et informations sur les options de logement préfabriqué." },
    es: { title: "Recursos Manufactured Housing Institute", desc: "Recursos del consumidor e información sobre opciones de vivienda prefabricada." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/rental_assistance/localofficesearch",
  i18n: {
    en: { title: "HUD Local Office Search", desc: "Find your local HUD field office for rental assistance program help." },
    fr: { title: "Recherche bureau local HUD", desc: "Trouvez votre bureau local HUD pour l'aide aux programmes locatifs." },
    es: { title: "Búsqueda de Oficina Local HUD", desc: "Encuentre su oficina local de HUD para ayuda con programas de alquiler." },
  },
},
{
  category: "Housing",
  link: "https://www.dav.org/veterans/resources/housing/",
  i18n: {
    en: { title: "Disabled American Veterans Housing Resources", desc: "Housing assistance information for disabled veterans." },
    fr: { title: "Ressources logement Disabled American Veterans", desc: "Informations d'aide au logement pour vétérans handicapés." },
    es: { title: "Recursos de Vivienda Disabled American Veterans", desc: "Información de asistencia de vivienda para veteranos con discapacidad." },
  },
},
{
  category: "Housing",
  link: "https://www.homesforourtroops.org",
  i18n: {
    en: { title: "Homes for Our Troops", desc: "Builds specially adapted homes for severely injured post-9/11 veterans." },
    fr: { title: "Homes for Our Troops", desc: "Construit des maisons spécialement adaptées pour vétérans gravement blessés." },
    es: { title: "Homes for Our Troops", desc: "Construye casas especialmente adaptadas para veteranos gravemente heridos." },
  },
},
{
  category: "Housing",
  link: "https://www.operationfinallybatmen.org",
  i18n: {
    en: { title: "Operation FINALLY HOME", desc: "Provides mortgage-free homes for wounded veterans and Gold Star families." },
    fr: { title: "Operation FINALLY HOME", desc: "Fournit des maisons sans hypothèque pour vétérans blessés et familles Gold Star." },
    es: { title: "Operation FINALLY HOME", desc: "Proporciona casas sin hipoteca para veteranos heridos y familias Gold Star." },
  },
},

// UTILITIES (12)
{
  category: "Utilities",
  link: "https://www.rd.usda.gov/programs-services/community-facilities/community-facilities-direct-loan-grant-program",
  i18n: {
    en: { title: "Community Facilities Direct Loan & Grant Program", desc: "Funding for essential community facilities including water and utility systems." },
    fr: { title: "Programme prêt et subvention installations communautaires", desc: "Financement des installations communautaires essentielles incluant eau et services." },
    es: { title: "Programa de Préstamos y Subvenciones para Instalaciones Comunitarias", desc: "Financiamiento para instalaciones comunitarias esenciales incluyendo agua y servicios." },
  },
},
{
  category: "Utilities",
  link: "https://www.epa.gov/dwsrf",
  i18n: {
    en: { title: "EPA Drinking Water State Revolving Fund", desc: "Federal funding supporting local drinking water infrastructure improvements." },
    fr: { title: "Fonds renouvelable eau potable EPA", desc: "Financement fédéral soutenant les améliorations d'infrastructure d'eau potable locale." },
    es: { title: "Fondo Rotatorio Estatal de Agua Potable EPA", desc: "Financiamiento federal que apoya mejoras de infraestructura de agua potable local." },
  },
},
{
  category: "Utilities",
  link: "https://www.epa.gov/cwsrf",
  i18n: {
    en: { title: "EPA Clean Water State Revolving Fund", desc: "Federal funding supporting local wastewater infrastructure improvements." },
    fr: { title: "Fonds renouvelable eau propre EPA", desc: "Financement fédéral soutenant les améliorations d'infrastructure des eaux usées." },
    es: { title: "Fondo Rotatorio Estatal de Agua Limpia EPA", desc: "Financiamiento federal que apoya mejoras de infraestructura de aguas residuales." },
  },
},
{
  category: "Utilities",
  link: "https://www.usa.gov/help-with-trash-recycling",
  i18n: {
    en: { title: "Help With Trash and Recycling Costs", desc: "Government guide to local waste service assistance for low-income households." },
    fr: { title: "Aide coûts déchets et recyclage", desc: "Guide gouvernemental pour l'aide aux services de déchets pour ménages à faible revenu." },
    es: { title: "Ayuda con Costos de Basura y Reciclaje", desc: "Guía del gobierno sobre asistencia de servicios de residuos para hogares de bajos ingresos." },
  },
},
{
  category: "Utilities",
  link: "https://www.211.org/services/internet",
  i18n: {
    en: { title: "211 Internet Assistance Directory", desc: "Local internet access assistance referrals through the 211 network." },
    fr: { title: "Répertoire aide Internet 211", desc: "Orientation vers l'aide à l'accès Internet via le réseau 211." },
    es: { title: "Directorio de Asistencia de Internet 211", desc: "Referencias de ayuda de acceso a internet a través de la red 211." },
  },
},
{
  category: "Utilities",
  link: "https://www.tmobile.com/brand/project-10million",
  i18n: {
    en: { title: "T-Mobile Project 10Million", desc: "Free or discounted internet hotspots for eligible school-connected households." },
    fr: { title: "T-Mobile Project 10Million", desc: "Points d'accès Internet gratuits ou réduits pour ménages scolaires admissibles." },
    es: { title: "T-Mobile Project 10Million", desc: "Puntos de acceso a internet gratuitos o con descuento para hogares escolares elegibles." },
  },
},
{
  category: "Utilities",
  link: "https://www.usa.gov/help-with-phone-bills",
  i18n: {
    en: { title: "Help With Phone Bills Guide", desc: "Government guide to phone service discount programs for eligible households." },
    fr: { title: "Guide aide factures téléphone", desc: "Guide gouvernemental pour les programmes de réduction téléphone pour ménages admissibles." },
    es: { title: "Guía de Ayuda con Facturas de Teléfono", desc: "Guía del gobierno sobre programas de descuento telefónico para hogares elegibles." },
  },
},
{
  category: "Utilities",
  link: "https://www.consumer.ftc.gov/articles/how-avoid-scam",
  i18n: {
    en: { title: "FTC Scam Avoidance for Utility Customers", desc: "Guidance for utility customers to recognize and avoid common scams." },
    fr: { title: "Éviter les arnaques FTC pour clients services publics", desc: "Conseils pour reconnaître et éviter les arnaques courantes." },
    es: { title: "Evitar Estafas FTC para Clientes de Servicios", desc: "Orientación para reconocer y evitar estafas comunes de servicios." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/scep/wap/wap-network",
  i18n: {
    en: { title: "Weatherization Assistance Program Network", desc: "Network of local agencies delivering weatherization services." },
    fr: { title: "Réseau programme d'aide à l'isolation", desc: "Réseau d'agences locales offrant des services d'isolation." },
    es: { title: "Red del Programa de Asistencia de Climatización", desc: "Red de agencias locales que brindan servicios de climatización." },
  },
},
{
  category: "Utilities",
  link: "https://www.rd.usda.gov/programs-services/water-environmental-programs/rural-alaska-village-grants",
  i18n: {
    en: { title: "Rural Alaska Village Grants", desc: "Funding for water and sanitation infrastructure in remote Alaska villages." },
    fr: { title: "Subventions villages ruraux Alaska", desc: "Financement pour infrastructure d'eau et assainissement dans villages reculés d'Alaska." },
    es: { title: "Subvenciones para Aldeas Rurales de Alaska", desc: "Financiamiento para infraestructura de agua y saneamiento en aldeas remotas de Alaska." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/eere/slsc/tribal-energy-programs",
  i18n: {
    en: { title: "Tribal Energy Programs", desc: "Federal energy program resources specifically for Tribal communities." },
    fr: { title: "Programmes énergie tribale", desc: "Ressources de programmes énergétiques fédéraux spécifiquement pour communautés tribales." },
    es: { title: "Programas de Energía Tribal", desc: "Recursos de programas de energía federal específicamente para comunidades tribales." },
  },
},
{
  category: "Utilities",
  link: "https://www.epa.gov/tribal-drinking-water",
  i18n: {
    en: { title: "EPA Tribal Drinking Water Programs", desc: "Federal drinking water resources and funding for Tribal communities." },
    fr: { title: "Programmes eau potable tribale EPA", desc: "Ressources et financement fédéraux d'eau potable pour communautés tribales." },
    es: { title: "Programas de Agua Potable Tribal EPA", desc: "Recursos y financiamiento federal de agua potable para comunidades tribales." },
  },
},

// EDUCATION (13)
{
  category: "Education",
  link: "https://www.jointbaseonline.org",
  i18n: {
    en: { title: "Military Spouse Education Resources", desc: "Education and career resources tailored for military spouses." },
    fr: { title: "Ressources éducation conjoints militaires", desc: "Ressources éducatives et professionnelles pour conjoints de militaires." },
    es: { title: "Recursos Educativos para Cónyuges Militares", desc: "Recursos educativos y profesionales para cónyuges de militares." },
  },
},
{
  category: "Education",
  link: "https://www.msepjobs.militaryonesource.mil",
  i18n: {
    en: { title: "Military Spouse Employment Partnership", desc: "Career and education resources connecting military spouses with employers." },
    fr: { title: "Partenariat emploi conjoints militaires", desc: "Ressources de carrière et d'éducation reliant conjoints militaires et employeurs." },
    es: { title: "Sociedad de Empleo para Cónyuges Militares", desc: "Recursos de carrera y educación que conectan a cónyuges militares con empleadores." },
  },
},
{
  category: "Education",
  link: "https://www.militaryonesource.mil/education-employment/",
  i18n: {
    en: { title: "Military OneSource Education & Employment", desc: "Education and employment resources for military families." },
    fr: { title: "Éducation et emploi Military OneSource", desc: "Ressources éducatives et professionnelles pour familles militaires." },
    es: { title: "Educación y Empleo Military OneSource", desc: "Recursos educativos y de empleo para familias militares." },
  },
},
{
  category: "Education",
  link: "https://www.operationhomefront.org/scholarships",
  i18n: {
    en: { title: "Operation Homefront Scholarships", desc: "Scholarships for military children and spouses." },
    fr: { title: "Bourses Operation Homefront", desc: "Bourses pour enfants et conjoints de militaires." },
    es: { title: "Becas Operation Homefront", desc: "Becas para hijos y cónyuges de militares." },
  },
},
{
  category: "Education",
  link: "https://www.fisherhouse.org/programs/scholarships/",
  i18n: {
    en: { title: "Fisher House Foundation Scholarships", desc: "Scholarship programs for military and veteran family members." },
    fr: { title: "Bourses Fisher House Foundation", desc: "Programmes de bourses pour membres de familles militaires et vétérans." },
    es: { title: "Becas Fisher House Foundation", desc: "Programas de becas para miembros de familias militares y de veteranos." },
  },
},
{
  category: "Education",
  link: "https://www.pat-tillman.org/scholars",
  i18n: {
    en: { title: "Pat Tillman Foundation Scholars", desc: "Scholarships for veterans and military spouses pursuing higher education." },
    fr: { title: "Boursiers Pat Tillman Foundation", desc: "Bourses pour vétérans et conjoints militaires poursuivant des études supérieures." },
    es: { title: "Becarios Pat Tillman Foundation", desc: "Becas para veteranos y cónyuges militares que buscan educación superior." },
  },
},
{
  category: "Education",
  link: "https://www.foldsofhonor.org",
  i18n: {
    en: { title: "Folds of Honor", desc: "Scholarships for spouses and children of fallen or disabled service members." },
    fr: { title: "Folds of Honor", desc: "Bourses pour conjoints et enfants de militaires tombés ou handicapés." },
    es: { title: "Folds of Honor", desc: "Becas para cónyuges e hijos de militares caídos o discapacitados." },
  },
},
{
  category: "Education",
  link: "https://www.acs.org/education/students/students-with-disabilities.html",
  i18n: {
    en: { title: "STEM Education Resources for Students with Disabilities", desc: "Resources supporting STEM education access for students with disabilities." },
    fr: { title: "Ressources STEM pour élèves handicapés", desc: "Ressources soutenant l'accès à l'éducation STEM pour élèves handicapés." },
    es: { title: "Recursos STEM para Estudiantes con Discapacidades", desc: "Recursos que apoyan el acceso a educación STEM para estudiantes con discapacidades." },
  },
},
{
  category: "Education",
  link: "https://www.thinkcollege.net",
  i18n: {
    en: { title: "Think College", desc: "Directory of college programs for students with intellectual disabilities." },
    fr: { title: "Think College", desc: "Répertoire de programmes collégiaux pour étudiants avec handicap intellectuel." },
    es: { title: "Think College", desc: "Directorio de programas universitarios para estudiantes con discapacidad intelectual." },
  },
},
{
  category: "Education",
  link: "https://www.heath.gwu.edu",
  i18n: {
    en: { title: "HEATH Resource Center", desc: "Postsecondary education resources for students with disabilities." },
    fr: { title: "HEATH Resource Center", desc: "Ressources d'éducation postsecondaire pour étudiants handicapés." },
    es: { title: "HEATH Resource Center", desc: "Recursos de educación postsecundaria para estudiantes con discapacidades." },
  },
},
{
  category: "Education",
  link: "https://www.nasdse.org",
  i18n: {
    en: { title: "National Association of State Directors of Special Education", desc: "Special education policy resources and state contact directory." },
    fr: { title: "Association nationale directeurs éducation spécialisée", desc: "Ressources politiques et répertoire de contacts d'État pour l'éducation spécialisée." },
    es: { title: "Asociación Nacional de Directores Estatales de Educación Especial", desc: "Recursos de política y directorio de contactos estatales para educación especial." },
  },
},
{
  category: "Education",
  link: "https://www.understood.org",
  i18n: {
    en: { title: "Understood.org", desc: "Resources for parents of children with learning and thinking differences." },
    fr: { title: "Understood.org", desc: "Ressources pour parents d'enfants ayant des différences d'apprentissage." },
    es: { title: "Understood.org", desc: "Recursos para padres de niños con diferencias de aprendizaje y pensamiento." },
  },
},
{
  category: "Education",
  link: "https://www.wrightslaw.com",
  i18n: {
    en: { title: "Wrightslaw Special Education Law", desc: "Special education law and advocacy resources for parents and educators." },
    fr: { title: "Droit éducation spécialisée Wrightslaw", desc: "Ressources juridiques et de plaidoyer en éducation spécialisée pour parents." },
    es: { title: "Ley de Educación Especial Wrightslaw", desc: "Recursos legales y de defensa en educación especial para padres y educadores." },
  },
},

// INCOME (15)
{
  category: "Income",
  link: "https://www.va.gov/family-and-caregiver-benefits/",
  i18n: {
    en: { title: "VA Family and Caregiver Benefits", desc: "Financial and support benefits for families and caregivers of veterans." },
    fr: { title: "Prestations famille et aidants VA", desc: "Prestations financières et de soutien pour familles et aidants de vétérans." },
    es: { title: "Beneficios Familiares y de Cuidadores VA", desc: "Beneficios financieros y de apoyo para familias y cuidadores de veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.militaryonesource.mil/financial-legal/",
  i18n: {
    en: { title: "Military OneSource Financial & Legal Resources", desc: "Financial counseling and legal resources for military families." },
    fr: { title: "Ressources financières et juridiques Military OneSource", desc: "Conseils financiers et ressources juridiques pour familles militaires." },
    es: { title: "Recursos Financieros y Legales Military OneSource", desc: "Asesoría financiera y recursos legales para familias militares." },
  },
},
{
  category: "Income",
  link: "https://www.usa4militaryfamilies.dod.mil",
  i18n: {
    en: { title: "USA4 Military Families", desc: "State-by-state resources supporting military family relocation and benefits." },
    fr: { title: "USA4 Military Families", desc: "Ressources par État soutenant la relocalisation et prestations des familles militaires." },
    es: { title: "USA4 Military Families", desc: "Recursos estado por estado que apoyan la reubicación y beneficios de familias militares." },
  },
},
{
  category: "Income",
  link: "https://www.nmfa.org",
  i18n: {
    en: { title: "National Military Family Association", desc: "Advocacy and financial support resources for military families." },
    fr: { title: "National Military Family Association", desc: "Ressources de plaidoyer et soutien financier pour familles militaires." },
    es: { title: "National Military Family Association", desc: "Recursos de defensa y apoyo financiero para familias militares." },
  },
},
{
  category: "Income",
  link: "https://www.navyleague.org",
  i18n: {
    en: { title: "Navy League Financial Assistance", desc: "Financial support programs for Navy and Coast Guard families." },
    fr: { title: "Aide financière Navy League", desc: "Programmes de soutien financier pour familles de la Marine et Garde côtière." },
    es: { title: "Asistencia Financiera Navy League", desc: "Programas de apoyo financiero para familias de la Marina y Guardia Costera." },
  },
},
{
  category: "Income",
  link: "https://www.afas.org",
  i18n: {
    en: { title: "Air Force Aid Society", desc: "Emergency financial assistance and education support for Air Force families." },
    fr: { title: "Air Force Aid Society", desc: "Aide financière d'urgence et soutien éducatif pour familles de l'Air Force." },
    es: { title: "Air Force Aid Society", desc: "Asistencia financiera de emergencia y apoyo educativo para familias de la Fuerza Aérea." },
  },
},
{
  category: "Income",
  link: "https://www.aerhq.org",
  i18n: {
    en: { title: "Army Emergency Relief", desc: "Emergency financial assistance for soldiers and their families." },
    fr: { title: "Army Emergency Relief", desc: "Aide financière d'urgence pour soldats et leurs familles." },
    es: { title: "Army Emergency Relief", desc: "Asistencia financiera de emergencia para soldados y sus familias." },
  },
},
{
  category: "Income",
  link: "https://www.nmcrs.org",
  i18n: {
    en: { title: "Navy-Marine Corps Relief Society", desc: "Financial assistance, education, and counseling for Navy and Marine families." },
    fr: { title: "Navy-Marine Corps Relief Society", desc: "Aide financière, éducation et conseil pour familles de la Marine et des Marines." },
    es: { title: "Navy-Marine Corps Relief Society", desc: "Asistencia financiera, educación y consejería para familias de la Marina y Marines." },
  },
},
{
  category: "Income",
  link: "https://www.coastguardfoundation.org",
  i18n: {
    en: { title: "Coast Guard Foundation", desc: "Financial support and scholarships for Coast Guard members and families." },
    fr: { title: "Coast Guard Foundation", desc: "Soutien financier et bourses pour membres de la Garde côtière et familles." },
    es: { title: "Coast Guard Foundation", desc: "Apoyo financiero y becas para miembros de la Guardia Costera y familias." },
  },
},
{
  category: "Income",
  link: "https://www.disabledveterans.org",
  i18n: {
    en: { title: "Disabled Veterans National Foundation", desc: "Financial and support services for disabled veterans." },
    fr: { title: "Fondation nationale vétérans handicapés", desc: "Services financiers et de soutien pour vétérans handicapés." },
    es: { title: "Fundación Nacional de Veteranos Discapacitados", desc: "Servicios financieros y de apoyo para veteranos discapacitados." },
  },
},
{
  category: "Income",
  link: "https://www.wwp.org",
  i18n: {
    en: { title: "Wounded Warrior Project", desc: "Comprehensive support for post-9/11 injured veterans and their families." },
    fr: { title: "Wounded Warrior Project", desc: "Soutien complet pour vétérans blessés après le 11 septembre et leurs familles." },
    es: { title: "Wounded Warrior Project", desc: "Apoyo integral para veteranos heridos post-11 de septiembre y sus familias." },
  },
},
{
  category: "Income",
  link: "https://www.iava.org",
  i18n: {
    en: { title: "Iraq and Afghanistan Veterans of America", desc: "Advocacy and resource connections for post-9/11 veterans." },
    fr: { title: "Iraq and Afghanistan Veterans of America", desc: "Plaidoyer et connexions de ressources pour vétérans post-11 septembre." },
    es: { title: "Iraq and Afghanistan Veterans of America", desc: "Defensa y conexiones de recursos para veteranos post-11 de septiembre." },
  },
},
{
  category: "Income",
  link: "https://www.hirevets.gov",
  i18n: {
    en: { title: "HIRE Vets Medallion Program", desc: "Recognizes employers committed to hiring veterans; helpful for veteran job seekers." },
    fr: { title: "Programme médaillon HIRE Vets", desc: "Reconnaît les employeurs engagés à embaucher des vétérans." },
    es: { title: "Programa de Medalla HIRE Vets", desc: "Reconoce a empleadores comprometidos con contratar veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.taonline.com",
  i18n: {
    en: { title: "Transition Assistance Online", desc: "Job search resources specifically for transitioning service members." },
    fr: { title: "Transition Assistance Online", desc: "Ressources de recherche d'emploi spécifiquement pour militaires en transition." },
    es: { title: "Transition Assistance Online", desc: "Recursos de búsqueda de empleo específicamente para militares en transición." },
  },
},
{
  category: "Income",
  link: "https://www.hireheroesusa.org",
  i18n: {
    en: { title: "Hire Heroes USA", desc: "Free career coaching and job placement services for veterans and spouses." },
    fr: { title: "Hire Heroes USA", desc: "Coaching de carrière gratuit et services de placement pour vétérans et conjoints." },
    es: { title: "Hire Heroes USA", desc: "Asesoría profesional gratuita y servicios de colocación laboral para veteranos y cónyuges." },
  },
},
    // ===== PROGRAMS 814-1003 =====

// FOOD (30)
{
  category: "Food",
  link: "https://www.wholesomewave.org",
  i18n: {
    en: { title: "Wholesome Wave", desc: "Programs that make fruits and vegetables more affordable for underserved families." },
    fr: { title: "Wholesome Wave", desc: "Programmes rendant les fruits et légumes plus abordables pour familles défavorisées." },
    es: { title: "Wholesome Wave", desc: "Programas que hacen frutas y verduras más asequibles para familias desatendidas." },
  },
},
{
  category: "Food",
  link: "https://www.freshfoodconnect.org",
  i18n: {
    en: { title: "Fresh Food Connect", desc: "Connects backyard garden surplus with local food pantries." },
    fr: { title: "Fresh Food Connect", desc: "Relie les surplus de jardins domestiques aux garde-manger locaux." },
    es: { title: "Fresh Food Connect", desc: "Conecta excedentes de jardines caseros con despensas locales." },
  },
},
{
  category: "Food",
  link: "https://www.farmlink.org",
  i18n: {
    en: { title: "The Farmlink Project", desc: "Rescues surplus produce from farms and delivers it to food banks." },
    fr: { title: "The Farmlink Project", desc: "Récupère les surplus agricoles et les livre aux banques alimentaires." },
    es: { title: "The Farmlink Project", desc: "Rescata excedentes agrícolas y los entrega a bancos de alimentos." },
  },
},
{
  category: "Food",
  link: "https://www.spoonfulfoundation.org",
  i18n: {
    en: { title: "Spoonful Foundation", desc: "Supports infant formula assistance and safe feeding resources for families." },
    fr: { title: "Spoonful Foundation", desc: "Soutient l'aide aux préparations pour nourrissons et alimentation sûre." },
    es: { title: "Spoonful Foundation", desc: "Apoya asistencia de fórmula infantil y alimentación segura para familias." },
  },
},
{
  category: "Food",
  link: "https://www.babyformula.hrsa.gov",
  i18n: {
    en: { title: "HRSA Infant Formula Resources", desc: "Federal information on infant formula access during shortages." },
    fr: { title: "Ressources préparations HRSA", desc: "Informations fédérales sur l'accès aux préparations pour nourrissons." },
    es: { title: "Recursos de Fórmula Infantil HRSA", desc: "Información federal sobre acceso a fórmula durante escasez." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/wic/wic-vendor-management",
  i18n: {
    en: { title: "WIC Vendor Management Info", desc: "Federal guidance on WIC-authorized retailers and shopping rules." },
    fr: { title: "Gestion fournisseurs WIC", desc: "Directives fédérales sur les détaillants autorisés WIC." },
    es: { title: "Gestión de Proveedores WIC", desc: "Orientación federal sobre minoristas autorizados por WIC." },
  },
},
{
  category: "Food",
  link: "https://www.gleaningnetwork.org",
  i18n: {
    en: { title: "National Gleaning Network", desc: "Coordinates volunteer gleaning efforts to reduce farm food waste." },
    fr: { title: "Réseau national de glanage", desc: "Coordonne le glanage bénévole pour réduire le gaspillage agricole." },
    es: { title: "Red Nacional de Recolección", desc: "Coordina esfuerzos voluntarios para reducir el desperdicio agrícola." },
  },
},
{
  category: "Food",
  link: "https://www.communitycookingclasses.org",
  i18n: {
    en: { title: "Community Cooking Classes Directory", desc: "Free and low-cost cooking classes teaching budget meal skills." },
    fr: { title: "Répertoire cours de cuisine communautaires", desc: "Cours de cuisine gratuits enseignant des compétences économiques." },
    es: { title: "Directorio de Clases de Cocina Comunitaria", desc: "Clases de cocina gratuitas que enseñan habilidades económicas." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/tefap/tefap-fact-sheet",
  i18n: {
    en: { title: "TEFAP Fact Sheet", desc: "Official overview of the Emergency Food Assistance Program eligibility." },
    fr: { title: "Fiche d'information TEFAP", desc: "Aperçu officiel de l'admissibilité au programme d'aide alimentaire." },
    es: { title: "Hoja Informativa TEFAP", desc: "Resumen oficial de elegibilidad del programa de asistencia alimentaria." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/nslp/nslp-fact-sheet",
  i18n: {
    en: { title: "National School Lunch Program Fact Sheet", desc: "Official overview of eligibility and application for school lunches." },
    fr: { title: "Fiche NSLP", desc: "Aperçu officiel d'admissibilité aux repas scolaires." },
    es: { title: "Hoja Informativa NSLP", desc: "Resumen oficial de elegibilidad para almuerzos escolares." },
  },
},
{
  category: "Food",
  link: "https://www.mealsonwheelsamerica.org/take-action",
  i18n: {
    en: { title: "Meals on Wheels Volunteer & Recipient Resources", desc: "Information for seniors seeking home-delivered meal services." },
    fr: { title: "Ressources Meals on Wheels", desc: "Informations pour aînés cherchant des repas livrés à domicile." },
    es: { title: "Recursos Meals on Wheels", desc: "Información para adultos mayores que buscan comidas a domicilio." },
  },
},
{
  category: "Food",
  link: "https://www.acf.hhs.gov/ocs/programs/csfp/csfp-eligibility",
  i18n: {
    en: { title: "CSFP Eligibility Guidelines", desc: "Federal eligibility rules for the senior food box program." },
    fr: { title: "Admissibilité CSFP", desc: "Règles fédérales d'admissibilité pour le programme de colis alimentaires." },
    es: { title: "Directrices de Elegibilidad CSFP", desc: "Reglas federales de elegibilidad para el programa de cajas de alimentos." },
  },
},
{
  category: "Food",
  link: "https://www.usda.gov/media/press-releases",
  i18n: {
    en: { title: "USDA Press Releases", desc: "Official USDA announcements including nutrition program updates." },
    fr: { title: "Communiqués USDA", desc: "Annonces officielles de l'USDA incluant les mises à jour des programmes." },
    es: { title: "Comunicados USDA", desc: "Anuncios oficiales del USDA incluyendo actualizaciones de programas." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/contact-us",
  i18n: {
    en: { title: "USDA Food and Nutrition Service Contacts", desc: "Official contact directory for food assistance program questions." },
    fr: { title: "Contacts USDA Food and Nutrition Service", desc: "Répertoire officiel de contacts pour questions sur l'aide alimentaire." },
    es: { title: "Contactos USDA Food and Nutrition Service", desc: "Directorio oficial de contactos para preguntas de asistencia alimentaria." },
  },
},
{
  category: "Food",
  link: "https://www.foodrecoverynetwork.org",
  i18n: {
    en: { title: "Food Recovery Network", desc: "Campus-based food recovery donating surplus meals to communities." },
    fr: { title: "Food Recovery Network", desc: "Récupération alimentaire sur campus donnant des surplus aux communautés." },
    es: { title: "Food Recovery Network", desc: "Recuperación de alimentos universitarios que dona excedentes a comunidades." },
  },
},
{
  category: "Food",
  link: "https://www.412foodrescue.org",
  i18n: {
    en: { title: "412 Food Rescue Model", desc: "Example of a regional app-based food rescue and redistribution model." },
    fr: { title: "Modèle 412 Food Rescue", desc: "Exemple de modèle régional de récupération alimentaire par application." },
    es: { title: "Modelo 412 Food Rescue", desc: "Ejemplo de modelo regional de rescate de alimentos por aplicación." },
  },
},
{
  category: "Food",
  link: "https://www.hungerandhealth.feedingamerica.org",
  i18n: {
    en: { title: "Feeding America Hunger and Health", desc: "Resources connecting food insecurity with health outcomes." },
    fr: { title: "Feeding America Faim et santé", desc: "Ressources reliant l'insécurité alimentaire aux résultats de santé." },
    es: { title: "Feeding America Hambre y Salud", desc: "Recursos que conectan la inseguridad alimentaria con la salud." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/allotment",
  i18n: {
    en: { title: "SNAP Benefit Allotment Info", desc: "Official information on how SNAP monthly benefit amounts are calculated." },
    fr: { title: "Info allocation SNAP", desc: "Informations officielles sur le calcul des prestations mensuelles SNAP." },
    es: { title: "Información de Asignación SNAP", desc: "Información oficial sobre el cálculo de beneficios mensuales SNAP." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/snap/recipient/find-office",
  i18n: {
    en: { title: "Find Your Local SNAP Office", desc: "Official directory to locate SNAP application offices by state." },
    fr: { title: "Trouver bureau SNAP local", desc: "Répertoire officiel pour localiser les bureaux SNAP par État." },
    es: { title: "Encuentre su Oficina Local de SNAP", desc: "Directorio oficial para localizar oficinas de solicitud SNAP por estado." },
  },
},
{
  category: "Food",
  link: "https://www.foodispower.org",
  i18n: {
    en: { title: "Food Is Power", desc: "Education and advocacy resources connecting food access to justice." },
    fr: { title: "Food Is Power", desc: "Ressources d'éducation et de plaidoyer reliant accès alimentaire et justice." },
    es: { title: "Food Is Power", desc: "Recursos de educación y defensa que conectan acceso alimentario y justicia." },
  },
},
{
  category: "Food",
  link: "https://www.chefsforamerica.org",
  i18n: {
    en: { title: "Chefs for America", desc: "Chef-led programs providing meals to communities in crisis." },
    fr: { title: "Chefs for America", desc: "Programmes dirigés par des chefs offrant des repas aux communautés en crise." },
    es: { title: "Chefs for America", desc: "Programas dirigidos por chefs que ofrecen comidas a comunidades en crisis." },
  },
},
{
  category: "Food",
  link: "https://www.worldcentralkitchen.org",
  i18n: {
    en: { title: "World Central Kitchen", desc: "Emergency food relief providing meals after disasters and crises." },
    fr: { title: "World Central Kitchen", desc: "Aide alimentaire d'urgence après catastrophes et crises." },
    es: { title: "World Central Kitchen", desc: "Ayuda alimentaria de emergencia tras desastres y crisis." },
  },
},
{
  category: "Food",
  link: "https://www.secondharvestheartland.org",
  i18n: {
    en: { title: "Second Harvest Heartland", desc: "Regional food bank network providing meals and food access programs." },
    fr: { title: "Second Harvest Heartland", desc: "Réseau régional de banques alimentaires offrant repas et accès." },
    es: { title: "Second Harvest Heartland", desc: "Red regional de bancos de alimentos que ofrece comidas y acceso." },
  },
},
{
  category: "Food",
  link: "https://www.communityservicesociety.org/snap-outreach",
  i18n: {
    en: { title: "SNAP Outreach Program Directory", desc: "Local organizations helping people apply for SNAP benefits." },
    fr: { title: "Répertoire sensibilisation SNAP", desc: "Organisations locales aidant à demander des prestations SNAP." },
    es: { title: "Directorio de Divulgación SNAP", desc: "Organizaciones locales que ayudan a solicitar beneficios SNAP." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/snap/state-directory",
  i18n: {
    en: { title: "SNAP State Agency Directory", desc: "Official directory of state SNAP agencies for applications and questions." },
    fr: { title: "Répertoire agences SNAP par État", desc: "Répertoire officiel des agences SNAP par État." },
    es: { title: "Directorio de Agencias SNAP Estatales", desc: "Directorio oficial de agencias SNAP estatales." },
  },
},
{
  category: "Food",
  link: "https://www.freshconnect.org",
  i18n: {
    en: { title: "Fresh Connect", desc: "Food access programs connecting communities with fresh produce sources." },
    fr: { title: "Fresh Connect", desc: "Programmes d'accès alimentaire reliant communautés et produits frais." },
    es: { title: "Fresh Connect", desc: "Programas de acceso alimentario que conectan comunidades con productos frescos." },
  },
},
{
  category: "Food",
  link: "https://www.foodbankforny.org",
  states: ["NY"],
  i18n: {
    en: { title: "Food Bank For New York City", desc: "Food access programs and pantry network serving New York City." },
    fr: { title: "Food Bank For New York City", desc: "Programmes d'accès alimentaire desservant New York." },
    es: { title: "Food Bank For New York City", desc: "Programas de acceso alimentario que sirven a Nueva York." },
  },
},
{
  category: "Food",
  link: "https://www.lafoodbank.org",
  states: ["CA"],
  i18n: {
    en: { title: "Los Angeles Regional Food Bank", desc: "Food distribution and pantry network serving Los Angeles County." },
    fr: { title: "Los Angeles Regional Food Bank", desc: "Réseau de distribution alimentaire desservant le comté de Los Angeles." },
    es: { title: "Los Angeles Regional Food Bank", desc: "Red de distribución de alimentos que sirve al condado de Los Ángeles." },
  },
},
{
  category: "Food",
  link: "https://www.houstonfoodbank.org",
  states: ["TX"],
  i18n: {
    en: { title: "Houston Food Bank", desc: "Largest food bank network in the country serving the Houston area." },
    fr: { title: "Houston Food Bank", desc: "Plus grand réseau de banque alimentaire du pays desservant Houston." },
    es: { title: "Houston Food Bank", desc: "Red de banco de alimentos más grande del país que sirve a Houston." },
  },
},
{
  category: "Food",
  link: "https://www.chicagosfoodbank.org",
  states: ["IL"],
  i18n: {
    en: { title: "Greater Chicago Food Depository", desc: "Regional food bank network serving the Chicago metropolitan area." },
    fr: { title: "Greater Chicago Food Depository", desc: "Réseau alimentaire régional desservant la région de Chicago." },
    es: { title: "Greater Chicago Food Depository", desc: "Red regional de alimentos que sirve al área metropolitana de Chicago." },
  },
},

// HEALTH (35)
{
  category: "Health",
  link: "https://www.211.org/services/addiction",
  i18n: {
    en: { title: "211 Addiction Services Directory", desc: "Local substance use treatment referrals through the 211 network." },
    fr: { title: "Répertoire services dépendance 211", desc: "Orientation vers traitement des dépendances via le réseau 211." },
    es: { title: "Directorio de Servicios de Adicción 211", desc: "Referencias de tratamiento de sustancias a través de la red 211." },
  },
},
{
  category: "Health",
  link: "https://www.aa.org",
  i18n: {
    en: { title: "Alcoholics Anonymous", desc: "Peer support meetings and resources for alcohol recovery." },
    fr: { title: "Alcooliques Anonymes", desc: "Réunions de soutien par les pairs pour le rétablissement de l'alcoolisme." },
    es: { title: "Alcohólicos Anónimos", desc: "Reuniones de apoyo entre pares para la recuperación del alcoholismo." },
  },
},
{
  category: "Health",
  link: "https://www.na.org",
  i18n: {
    en: { title: "Narcotics Anonymous", desc: "Peer support meetings and resources for drug recovery." },
    fr: { title: "Narcotiques Anonymes", desc: "Réunions de soutien par les pairs pour le rétablissement des toxicomanies." },
    es: { title: "Narcóticos Anónimos", desc: "Reuniones de apoyo entre pares para la recuperación de drogas." },
  },
},
{
  category: "Health",
  link: "https://www.smartrecovery.org",
  i18n: {
    en: { title: "SMART Recovery", desc: "Science-based peer support program for addiction recovery." },
    fr: { title: "SMART Recovery", desc: "Programme de soutien par les pairs basé sur la science pour le rétablissement." },
    es: { title: "SMART Recovery", desc: "Programa de apoyo entre pares basado en ciencia para recuperación." },
  },
},
{
  category: "Health",
  link: "https://www.nagap.org",
  i18n: {
    en: { title: "National Association of Gambling Addiction Programs", desc: "Directory of resources for problem gambling support." },
    fr: { title: "Association nationale programmes dépendance jeu", desc: "Répertoire de ressources pour le soutien au jeu problématique." },
    es: { title: "Asociación Nacional de Programas de Adicción al Juego", desc: "Directorio de recursos para apoyo de juego problemático." },
  },
},
{
  category: "Health",
  link: "https://www.ncadd.org",
  i18n: {
    en: { title: "National Council on Alcoholism and Drug Dependence", desc: "Education and referral resources for substance use disorders." },
    fr: { title: "Conseil national alcoolisme et toxicomanie", desc: "Éducation et orientation pour les troubles liés aux substances." },
    es: { title: "Consejo Nacional sobre Alcoholismo y Drogas", desc: "Educación y referencias para trastornos por sustancias." },
  },
},
{
  category: "Health",
  link: "https://www.psychologytoday.com/us/therapists",
  i18n: {
    en: { title: "Psychology Today Therapist Directory", desc: "Searchable directory of therapists including sliding-scale options." },
    fr: { title: "Répertoire thérapeutes Psychology Today", desc: "Répertoire consultable de thérapeutes incluant options à tarif ajusté." },
    es: { title: "Directorio de Terapeutas Psychology Today", desc: "Directorio buscable de terapeutas incluyendo opciones de tarifa ajustada." },
  },
},
{
  category: "Health",
  link: "https://www.betterhelp.com/financial-aid",
  i18n: {
    en: { title: "BetterHelp Financial Aid", desc: "Financial assistance information for online therapy services." },
    fr: { title: "Aide financière BetterHelp", desc: "Informations sur l'aide financière pour thérapie en ligne." },
    es: { title: "Ayuda Financiera BetterHelp", desc: "Información de asistencia financiera para terapia en línea." },
  },
},
{
  category: "Health",
  link: "https://www.7cups.com",
  i18n: {
    en: { title: "7 Cups", desc: "Free emotional support and low-cost online counseling platform." },
    fr: { title: "7 Cups", desc: "Soutien émotionnel gratuit et plateforme de conseil en ligne à faible coût." },
    es: { title: "7 Cups", desc: "Apoyo emocional gratuito y plataforma de consejería en línea de bajo costo." },
  },
},
{
  category: "Health",
  link: "https://www.warmline.org",
  i18n: {
    en: { title: "National Warmline Directory", desc: "Peer support phone lines for people experiencing emotional distress." },
    fr: { title: "Répertoire national lignes d'écoute", desc: "Lignes téléphoniques de soutien par les pairs pour détresse émotionnelle." },
    es: { title: "Directorio Nacional de Líneas de Apoyo", desc: "Líneas telefónicas de apoyo entre pares para angustia emocional." },
  },
},
{
  category: "Health",
  link: "https://www.samhsa.gov/find-help/veterans",
  i18n: {
    en: { title: "SAMHSA Veterans Mental Health Resources", desc: "Federal mental health and substance use resources for veterans." },
    fr: { title: "Ressources santé mentale vétérans SAMHSA", desc: "Ressources fédérales de santé mentale pour vétérans." },
    es: { title: "Recursos de Salud Mental para Veteranos SAMHSA", desc: "Recursos federales de salud mental para veteranos." },
  },
},
{
  category: "Health",
  link: "https://www.va.gov/health-care/health-needs-conditions/mental-health/",
  i18n: {
    en: { title: "VA Mental Health Conditions Info", desc: "Federal resources on mental health conditions and treatment for veterans." },
    fr: { title: "Info conditions santé mentale VA", desc: "Ressources fédérales sur les conditions de santé mentale pour vétérans." },
    es: { title: "Información de Condiciones de Salud Mental VA", desc: "Recursos federales sobre condiciones de salud mental para veteranos." },
  },
},
{
  category: "Health",
  link: "https://www.cdc.gov/injury/index.html",
  i18n: {
    en: { title: "CDC Injury Prevention Resources", desc: "Federal resources on preventing injuries and promoting safety." },
    fr: { title: "Ressources prévention blessures CDC", desc: "Ressources fédérales pour prévenir les blessures et promouvoir la sécurité." },
    es: { title: "Recursos de Prevención de Lesiones CDC", desc: "Recursos federales para prevenir lesiones y promover la seguridad." },
  },
},
{
  category: "Health",
  link: "https://www.cdc.gov/heartdisease/index.htm",
  i18n: {
    en: { title: "CDC Heart Disease Resources", desc: "Federal information on heart disease prevention and management." },
    fr: { title: "Ressources maladie cardiaque CDC", desc: "Informations fédérales sur la prévention des maladies cardiaques." },
    es: { title: "Recursos de Enfermedad Cardíaca CDC", desc: "Información federal sobre prevención de enfermedades cardíacas." },
  },
},
{
  category: "Health",
  link: "https://www.cdc.gov/obesity/index.html",
  i18n: {
    en: { title: "CDC Obesity Prevention Resources", desc: "Federal information and resources on obesity prevention programs." },
    fr: { title: "Ressources prévention obésité CDC", desc: "Informations fédérales sur les programmes de prévention de l'obésité." },
    es: { title: "Recursos de Prevención de Obesidad CDC", desc: "Información federal sobre programas de prevención de obesidad." },
  },
},
{
  category: "Health",
  link: "https://www.nof.org",
  i18n: {
    en: { title: "National Osteoporosis Foundation", desc: "Education and resources for bone health and osteoporosis prevention." },
    fr: { title: "Fondation nationale ostéoporose", desc: "Éducation et ressources pour la santé osseuse." },
    es: { title: "Fundación Nacional de Osteoporosis", desc: "Educación y recursos para la salud ósea." },
  },
},
{
  category: "Health",
  link: "https://www.arthritis.org/support-programs",
  i18n: {
    en: { title: "Arthritis Foundation Support Programs", desc: "Support resources and programs for people living with arthritis." },
    fr: { title: "Programmes soutien Arthritis Foundation", desc: "Ressources de soutien pour les personnes atteintes d'arthrite." },
    es: { title: "Programas de Apoyo Arthritis Foundation", desc: "Recursos de apoyo para personas con artritis." },
  },
},
{
  category: "Health",
  link: "https://www.aan.com/patient-resources",
  i18n: {
    en: { title: "American Academy of Neurology Patient Resources", desc: "Resources for people with neurological conditions and their families." },
    fr: { title: "Ressources patients American Academy of Neurology", desc: "Ressources pour personnes avec conditions neurologiques." },
    es: { title: "Recursos para Pacientes American Academy of Neurology", desc: "Recursos para personas con condiciones neurológicas." },
  },
},
{
  category: "Health",
  link: "https://www.thyca.org",
  i18n: {
    en: { title: "Thyroid Cancer Survivors' Association", desc: "Support and resources for thyroid cancer patients and survivors." },
    fr: { title: "Association survivants cancer thyroïde", desc: "Soutien et ressources pour patients atteints de cancer de la thyroïde." },
    es: { title: "Asociación de Sobrevivientes de Cáncer de Tiroides", desc: "Apoyo y recursos para pacientes de cáncer de tiroides." },
  },
},
{
  category: "Health",
  link: "https://www.ovariancancer.org",
  i18n: {
    en: { title: "National Ovarian Cancer Coalition", desc: "Support and financial assistance for ovarian cancer patients." },
    fr: { title: "Coalition nationale cancer ovarien", desc: "Soutien et aide financière pour patientes atteintes de cancer ovarien." },
    es: { title: "Coalición Nacional de Cáncer Ovárico", desc: "Apoyo y ayuda financiera para pacientes de cáncer ovárico." },
  },
},
{
  category: "Health",
  link: "https://www.pancan.org",
  i18n: {
    en: { title: "Pancreatic Cancer Action Network", desc: "Patient support services and resources for pancreatic cancer." },
    fr: { title: "Réseau action cancer pancréatique", desc: "Services de soutien aux patients atteints de cancer du pancréas." },
    es: { title: "Red de Acción del Cáncer Pancreático", desc: "Servicios de apoyo para pacientes de cáncer pancreático." },
  },
},
{
  category: "Health",
  link: "https://www.lls.org/support-resources",
  i18n: {
    en: { title: "Leukemia & Lymphoma Society Support Resources", desc: "Financial assistance and peer support for blood cancer patients." },
    fr: { title: "Ressources soutien LLS", desc: "Aide financière et soutien par les pairs pour patients atteints de cancer du sang." },
    es: { title: "Recursos de Apoyo LLS", desc: "Ayuda financiera y apoyo entre pares para pacientes de cáncer de sangre." },
  },
},
{
  category: "Health",
  link: "https://www.cancercare.org/financial-assistance",
  i18n: {
    en: { title: "CancerCare Financial Assistance", desc: "Limited financial assistance for cancer-related costs." },
    fr: { title: "Aide financière CancerCare", desc: "Aide financière limitée pour les coûts liés au cancer." },
    es: { title: "Asistencia Financiera CancerCare", desc: "Asistencia financiera limitada para costos relacionados con el cáncer." },
  },
},
{
  category: "Health",
  link: "https://www.patientadvocate.org/connect-with-services",
  i18n: {
    en: { title: "Patient Advocate Foundation Services", desc: "Case management services for people with chronic and serious illnesses." },
    fr: { title: "Services Patient Advocate Foundation", desc: "Services de gestion de cas pour maladies chroniques et graves." },
    es: { title: "Servicios Patient Advocate Foundation", desc: "Servicios de gestión de casos para enfermedades crónicas y graves." },
  },
},
{
  category: "Health",
  link: "https://www.211.org/services/pregnancy",
  i18n: {
    en: { title: "211 Pregnancy Support Directory", desc: "Local pregnancy and prenatal support referrals through 211." },
    fr: { title: "Répertoire soutien grossesse 211", desc: "Orientation vers soutien de grossesse locale via le réseau 211." },
    es: { title: "Directorio de Apoyo al Embarazo 211", desc: "Referencias de apoyo de embarazo local a través de la red 211." },
  },
},
{
  category: "Health",
  link: "https://www.hrsa.gov/womens-health",
  i18n: {
    en: { title: "HRSA Women's Health Resources", desc: "Federal health resources focused on women's health services." },
    fr: { title: "Ressources santé femmes HRSA", desc: "Ressources fédérales axées sur la santé des femmes." },
    es: { title: "Recursos de Salud de la Mujer HRSA", desc: "Recursos federales enfocados en servicios de salud de la mujer." },
  },
},
{
  category: "Health",
  link: "https://www.acog.org/womens-health",
  i18n: {
    en: { title: "ACOG Women's Health Information", desc: "Medical guidance and resources on women's reproductive health." },
    fr: { title: "Info santé femmes ACOG", desc: "Conseils médicaux sur la santé reproductive des femmes." },
    es: { title: "Información de Salud de la Mujer ACOG", desc: "Orientación médica sobre salud reproductiva de la mujer." },
  },
},
{
  category: "Health",
  link: "https://www.menshealthnetwork.org",
  i18n: {
    en: { title: "Men's Health Network", desc: "Education and resources focused on men's health issues." },
    fr: { title: "Men's Health Network", desc: "Éducation et ressources axées sur la santé masculine." },
    es: { title: "Men's Health Network", desc: "Educación y recursos enfocados en la salud masculina." },
  },
},
{
  category: "Health",
  link: "https://www.glma.org/find-a-provider",
  i18n: {
    en: { title: "GLMA LGBTQ Health Provider Directory", desc: "Directory of LGBTQ-affirming health care providers." },
    fr: { title: "Répertoire fournisseurs santé LGBTQ GLMA", desc: "Répertoire de fournisseurs de soins de santé affirmatifs LGBTQ." },
    es: { title: "Directorio de Proveedores de Salud LGBTQ GLMA", desc: "Directorio de proveedores de salud afirmativos LGBTQ." },
  },
},
{
  category: "Health",
  link: "https://www.thetrevorproject.org/get-help",
  i18n: {
    en: { title: "Trevor Project Get Help Resources", desc: "Crisis support and resources for LGBTQ young people." },
    fr: { title: "Ressources aide Trevor Project", desc: "Soutien de crise et ressources pour jeunes LGBTQ." },
    es: { title: "Recursos de Ayuda Trevor Project", desc: "Apoyo de crisis y recursos para jóvenes LGBTQ." },
  },
},
{
  category: "Health",
  link: "https://www.transhealthproject.org",
  i18n: {
    en: { title: "Trans Health Project Resource Directory", desc: "Directory of health resources for transgender individuals." },
    fr: { title: "Répertoire ressources santé trans", desc: "Répertoire de ressources de santé pour personnes transgenres." },
    es: { title: "Directorio de Recursos de Salud Trans", desc: "Directorio de recursos de salud para personas transgénero." },
  },
},
{
  category: "Health",
  link: "https://www.deaf.hhs.gov",
  i18n: {
    en: { title: "HHS Deaf and Hard of Hearing Resources", desc: "Federal health resources for deaf and hard of hearing individuals." },
    fr: { title: "Ressources sourds et malentendants HHS", desc: "Ressources fédérales de santé pour personnes sourdes et malentendantes." },
    es: { title: "Recursos HHS para Sordos y con Problemas de Audición", desc: "Recursos federales de salud para personas sordas." },
  },
},
{
  category: "Health",
  link: "https://www.afb.org/services",
  i18n: {
    en: { title: "American Foundation for the Blind Services", desc: "Resources and services for people who are blind or visually impaired." },
    fr: { title: "Services American Foundation for the Blind", desc: "Ressources pour personnes aveugles ou malvoyantes." },
    es: { title: "Servicios American Foundation for the Blind", desc: "Recursos para personas ciegas o con discapacidad visual." },
  },
},
{
  category: "Health",
  link: "https://www.nfb.org/programs-services",
  i18n: {
    en: { title: "National Federation of the Blind Programs", desc: "Programs and advocacy resources for blind and low-vision individuals." },
    fr: { title: "Programmes National Federation of the Blind", desc: "Programmes pour personnes aveugles et malvoyantes." },
    es: { title: "Programas National Federation of the Blind", desc: "Programas para personas ciegas y con baja visión." },
  },
},

// HOUSING (30)
{
  category: "Housing",
  link: "https://www.hud.gov/topics/rental_assistance/local_pha_directory",
  i18n: {
    en: { title: "Local Public Housing Agency Directory", desc: "Official HUD directory of local housing authorities for applications." },
    fr: { title: "Répertoire agences logement public locales", desc: "Répertoire officiel HUD des autorités de logement locales." },
    es: { title: "Directorio de Agencias de Vivienda Pública Local", desc: "Directorio oficial de HUD de autoridades de vivienda locales." },
  },
},
{
  category: "Housing",
  link: "https://www.va.gov/housing-assistance/adaptive-housing-grants/",
  i18n: {
    en: { title: "VA Adaptive Housing Grants", desc: "Grants for eligible veterans to adapt homes for disability needs." },
    fr: { title: "Subventions logement adaptatif VA", desc: "Subventions pour adapter le logement aux besoins des vétérans handicapés." },
    es: { title: "Subvenciones de Vivienda Adaptativa VA", desc: "Subvenciones para adaptar viviendas a necesidades de discapacidad." },
  },
},
{
  category: "Housing",
  link: "https://www.va.gov/housing-assistance/home-loans/loan-types/",
  i18n: {
    en: { title: "VA Home Loan Types Guide", desc: "Federal guide to different VA home loan options for veterans." },
    fr: { title: "Guide types prêts logement VA", desc: "Guide fédéral des options de prêts immobiliers VA." },
    es: { title: "Guía de Tipos de Préstamos de Vivienda VA", desc: "Guía federal de opciones de préstamos de vivienda VA." },
  },
},
{
  category: "Housing",
  link: "https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-guaranteed-loan-program",
  i18n: {
    en: { title: "USDA Single Family Housing Guaranteed Loan Program", desc: "Loan guarantees helping rural residents afford homeownership." },
    fr: { title: "Programme prêt garanti logement USDA", desc: "Garanties de prêts aidant les résidents ruraux à devenir propriétaires." },
    es: { title: "Programa de Préstamo Garantizado de Vivienda USDA", desc: "Garantías de préstamos que ayudan a residentes rurales a ser propietarios." },
  },
},
{
  category: "Housing",
  link: "https://www.consumerfinance.gov/consumer-tools/homeownership-counseling/",
  i18n: {
    en: { title: "CFPB Housing Counseling Search", desc: "Find HUD-approved housing counselors near you." },
    fr: { title: "Recherche conseil logement CFPB", desc: "Trouvez des conseillers logement approuvés par HUD." },
    es: { title: "Búsqueda de Consejería de Vivienda CFPB", desc: "Encuentre consejeros de vivienda aprobados por HUD." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/manufactured_housing_finance",
  i18n: {
    en: { title: "HUD Manufactured Housing Finance Info", desc: "Federal information on financing manufactured homes." },
    fr: { title: "Info financement logement préfabriqué HUD", desc: "Informations fédérales sur le financement des maisons préfabriquées." },
    es: { title: "Información de Financiamiento de Vivienda Prefabricada HUD", desc: "Información federal sobre financiamiento de casas prefabricadas." },
  },
},
{
  category: "Housing",
  link: "https://www.211.org/services/rental-assistance",
  i18n: {
    en: { title: "211 Rental Assistance Directory", desc: "Local rental assistance program referrals through the 211 network." },
    fr: { title: "Répertoire aide loyer 211", desc: "Orientation vers programmes d'aide au loyer via le réseau 211." },
    es: { title: "Directorio de Asistencia de Alquiler 211", desc: "Referencias de programas de asistencia de alquiler a través de la red 211." },
  },
},
{
  category: "Housing",
  link: "https://www.errfinder.com",
  i18n: {
    en: { title: "Emergency Rental Assistance Finder", desc: "Directory tool to find local emergency rental assistance programs." },
    fr: { title: "Recherche aide locative d'urgence", desc: "Outil de recherche pour programmes d'aide au loyer d'urgence." },
    es: { title: "Buscador de Asistencia de Alquiler de Emergencia", desc: "Herramienta de búsqueda de programas de asistencia de alquiler." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states",
  i18n: {
    en: { title: "HUD State Resource Pages", desc: "Federal directory of housing resources organized by state." },
    fr: { title: "Pages ressources HUD par État", desc: "Répertoire fédéral des ressources de logement par État." },
    es: { title: "Páginas de Recursos HUD por Estado", desc: "Directorio federal de recursos de vivienda por estado." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/washington",
  states: ["WA"],
  i18n: {
    en: { title: "HUD Washington State Resources", desc: "Federal housing resources specific to Washington state." },
    fr: { title: "Ressources HUD État de Washington", desc: "Ressources fédérales de logement pour l'État de Washington." },
    es: { title: "Recursos HUD del Estado de Washington", desc: "Recursos federales de vivienda para el estado de Washington." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/pennsylvania",
  states: ["PA"],
  i18n: {
    en: { title: "HUD Pennsylvania Resources", desc: "Federal housing resources specific to Pennsylvania." },
    fr: { title: "Ressources HUD Pennsylvanie", desc: "Ressources fédérales de logement pour la Pennsylvanie." },
    es: { title: "Recursos HUD de Pennsylvania", desc: "Recursos federales de vivienda para Pennsylvania." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/ohio",
  states: ["OH"],
  i18n: {
    en: { title: "HUD Ohio Resources", desc: "Federal housing resources specific to Ohio." },
    fr: { title: "Ressources HUD Ohio", desc: "Ressources fédérales de logement pour l'Ohio." },
    es: { title: "Recursos HUD de Ohio", desc: "Recursos federales de vivienda para Ohio." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/michigan",
  states: ["MI"],
  i18n: {
    en: { title: "HUD Michigan Resources", desc: "Federal housing resources specific to Michigan." },
    fr: { title: "Ressources HUD Michigan", desc: "Ressources fédérales de logement pour le Michigan." },
    es: { title: "Recursos HUD de Michigan", desc: "Recursos federales de vivienda para Michigan." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/north_carolina",
  states: ["NC"],
  i18n: {
    en: { title: "HUD North Carolina Resources", desc: "Federal housing resources specific to North Carolina." },
    fr: { title: "Ressources HUD Caroline du Nord", desc: "Ressources fédérales de logement pour la Caroline du Nord." },
    es: { title: "Recursos HUD de Carolina del Norte", desc: "Recursos federales de vivienda para Carolina del Norte." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/massachusetts",
  states: ["MA"],
  i18n: {
    en: { title: "HUD Massachusetts Resources", desc: "Federal housing resources specific to Massachusetts." },
    fr: { title: "Ressources HUD Massachusetts", desc: "Ressources fédérales de logement pour le Massachusetts." },
    es: { title: "Recursos HUD de Massachusetts", desc: "Recursos federales de vivienda para Massachusetts." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/virginia",
  states: ["VA"],
  i18n: {
    en: { title: "HUD Virginia Resources", desc: "Federal housing resources specific to Virginia." },
    fr: { title: "Ressources HUD Virginie", desc: "Ressources fédérales de logement pour la Virginie." },
    es: { title: "Recursos HUD de Virginia", desc: "Recursos federales de vivienda para Virginia." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/tennessee",
  states: ["TN"],
  i18n: {
    en: { title: "HUD Tennessee Resources", desc: "Federal housing resources specific to Tennessee." },
    fr: { title: "Ressources HUD Tennessee", desc: "Ressources fédérales de logement pour le Tennessee." },
    es: { title: "Recursos HUD de Tennessee", desc: "Recursos federales de vivienda para Tennessee." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/indiana",
  states: ["IN"],
  i18n: {
    en: { title: "HUD Indiana Resources", desc: "Federal housing resources specific to Indiana." },
    fr: { title: "Ressources HUD Indiana", desc: "Ressources fédérales de logement pour l'Indiana." },
    es: { title: "Recursos HUD de Indiana", desc: "Recursos federales de vivienda para Indiana." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/missouri",
  states: ["MO"],
  i18n: {
    en: { title: "HUD Missouri Resources", desc: "Federal housing resources specific to Missouri." },
    fr: { title: "Ressources HUD Missouri", desc: "Ressources fédérales de logement pour le Missouri." },
    es: { title: "Recursos HUD de Missouri", desc: "Recursos federales de vivienda para Missouri." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/wisconsin",
  states: ["WI"],
  i18n: {
    en: { title: "HUD Wisconsin Resources", desc: "Federal housing resources specific to Wisconsin." },
    fr: { title: "Ressources HUD Wisconsin", desc: "Ressources fédérales de logement pour le Wisconsin." },
    es: { title: "Recursos HUD de Wisconsin", desc: "Recursos federales de vivienda para Wisconsin." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/maryland",
  states: ["MD"],
  i18n: {
    en: { title: "HUD Maryland Resources", desc: "Federal housing resources specific to Maryland." },
    fr: { title: "Ressources HUD Maryland", desc: "Ressources fédérales de logement pour le Maryland." },
    es: { title: "Recursos HUD de Maryland", desc: "Recursos federales de vivienda para Maryland." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/minnesota",
  states: ["MN"],
  i18n: {
    en: { title: "HUD Minnesota Resources", desc: "Federal housing resources specific to Minnesota." },
    fr: { title: "Ressources HUD Minnesota", desc: "Ressources fédérales de logement pour le Minnesota." },
    es: { title: "Recursos HUD de Minnesota", desc: "Recursos federales de vivienda para Minnesota." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/colorado",
  states: ["CO"],
  i18n: {
    en: { title: "HUD Colorado Resources", desc: "Federal housing resources specific to Colorado." },
    fr: { title: "Ressources HUD Colorado", desc: "Ressources fédérales de logement pour le Colorado." },
    es: { title: "Recursos HUD de Colorado", desc: "Recursos federales de vivienda para Colorado." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/alabama",
  states: ["AL"],
  i18n: {
    en: { title: "HUD Alabama Resources", desc: "Federal housing resources specific to Alabama." },
    fr: { title: "Ressources HUD Alabama", desc: "Ressources fédérales de logement pour l'Alabama." },
    es: { title: "Recursos HUD de Alabama", desc: "Recursos federales de vivienda para Alabama." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/south_carolina",
  states: ["SC"],
  i18n: {
    en: { title: "HUD South Carolina Resources", desc: "Federal housing resources specific to South Carolina." },
    fr: { title: "Ressources HUD Caroline du Sud", desc: "Ressources fédérales de logement pour la Caroline du Sud." },
    es: { title: "Recursos HUD de Carolina del Sur", desc: "Recursos federales de vivienda para Carolina del Sur." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/louisiana",
  states: ["LA"],
  i18n: {
    en: { title: "HUD Louisiana Resources", desc: "Federal housing resources specific to Louisiana." },
    fr: { title: "Ressources HUD Louisiane", desc: "Ressources fédérales de logement pour la Louisiane." },
    es: { title: "Recursos HUD de Luisiana", desc: "Recursos federales de vivienda para Luisiana." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/kentucky",
  states: ["KY"],
  i18n: {
    en: { title: "HUD Kentucky Resources", desc: "Federal housing resources specific to Kentucky." },
    fr: { title: "Ressources HUD Kentucky", desc: "Ressources fédérales de logement pour le Kentucky." },
    es: { title: "Recursos HUD de Kentucky", desc: "Recursos federales de vivienda para Kentucky." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/oregon",
  states: ["OR"],
  i18n: {
    en: { title: "HUD Oregon Resources", desc: "Federal housing resources specific to Oregon." },
    fr: { title: "Ressources HUD Oregon", desc: "Ressources fédérales de logement pour l'Oregon." },
    es: { title: "Recursos HUD de Oregon", desc: "Recursos federales de vivienda para Oregon." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/oklahoma",
  states: ["OK"],
  i18n: {
    en: { title: "HUD Oklahoma Resources", desc: "Federal housing resources specific to Oklahoma." },
    fr: { title: "Ressources HUD Oklahoma", desc: "Ressources fédérales de logement pour l'Oklahoma." },
    es: { title: "Recursos HUD de Oklahoma", desc: "Recursos federales de vivienda para Oklahoma." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/connecticut",
  states: ["CT"],
  i18n: {
    en: { title: "HUD Connecticut Resources", desc: "Federal housing resources specific to Connecticut." },
    fr: { title: "Ressources HUD Connecticut", desc: "Ressources fédérales de logement pour le Connecticut." },
    es: { title: "Recursos HUD de Connecticut", desc: "Recursos federales de vivienda para Connecticut." },
  },
},

// UTILITIES (25)
{
  category: "Utilities",
  link: "https://www.energy.gov/scep/wap/articles/state-wap-contacts",
  i18n: {
    en: { title: "State Weatherization Program Contacts", desc: "Official directory of state weatherization assistance contacts." },
    fr: { title: "Contacts programme isolation par État", desc: "Répertoire officiel des contacts d'aide à l'isolation par État." },
    es: { title: "Contactos del Programa de Climatización Estatal", desc: "Directorio oficial de contactos de asistencia de climatización." },
  },
},
{
  category: "Utilities",
  link: "https://www.acf.hhs.gov/ocs/liheap-clearinghouse",
  i18n: {
    en: { title: "LIHEAP Clearinghouse", desc: "Federal resource hub with state-specific LIHEAP program information." },
    fr: { title: "Centre de ressources LIHEAP", desc: "Centre de ressources fédéral avec informations LIHEAP par État." },
    es: { title: "Centro de Recursos LIHEAP", desc: "Centro de recursos federal con información LIHEAP por estado." },
  },
},
{
  category: "Utilities",
  link: "https://www.usa.gov/help-with-electric-bills",
  i18n: {
    en: { title: "Help With Electric Bills Guide", desc: "Government guide to electric bill assistance for eligible households." },
    fr: { title: "Guide aide factures électricité", desc: "Guide gouvernemental pour l'aide aux factures d'électricité." },
    es: { title: "Guía de Ayuda con Facturas Eléctricas", desc: "Guía del gobierno sobre asistencia de facturas eléctricas." },
  },
},
{
  category: "Utilities",
  link: "https://www.usa.gov/help-with-gas-bills",
  i18n: {
    en: { title: "Help With Gas Bills Guide", desc: "Government guide to natural gas bill assistance for eligible households." },
    fr: { title: "Guide aide factures gaz", desc: "Guide gouvernemental pour l'aide aux factures de gaz naturel." },
    es: { title: "Guía de Ayuda con Facturas de Gas", desc: "Guía del gobierno sobre asistencia de facturas de gas natural." },
  },
},
{
  category: "Utilities",
  link: "https://www.energystar.gov/about/federal_tax_credits",
  i18n: {
    en: { title: "Energy Star Federal Tax Credits", desc: "Federal tax credits available for energy-efficient home improvements." },
    fr: { title: "Crédits d'impôt fédéraux Energy Star", desc: "Crédits d'impôt fédéraux pour améliorations éconergétiques." },
    es: { title: "Créditos Fiscales Federales Energy Star", desc: "Créditos fiscales federales para mejoras de eficiencia energética." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/save/home",
  i18n: {
    en: { title: "Energy.gov Home Energy Savings", desc: "Federal tips and programs for reducing home energy costs." },
    fr: { title: "Économies énergie maison Energy.gov", desc: "Conseils et programmes fédéraux pour réduire les coûts énergétiques." },
    es: { title: "Ahorros de Energía en el Hogar Energy.gov", desc: "Consejos y programas federales para reducir costos de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.solar.com/learn/low-income-solar-programs/",
  i18n: {
    en: { title: "Low-Income Solar Program Guide", desc: "Overview of solar energy programs for low-income households." },
    fr: { title: "Guide programmes solaires faible revenu", desc: "Aperçu des programmes d'énergie solaire pour ménages à faible revenu." },
    es: { title: "Guía de Programas Solares de Bajos Ingresos", desc: "Resumen de programas de energía solar para hogares de bajos ingresos." },
  },
},
{
  category: "Utilities",
  link: "https://www.grid alternatives.org",
  i18n: {
    en: { title: "GRID Alternatives", desc: "Nonprofit installing free or low-cost solar for low-income households." },
    fr: { title: "GRID Alternatives", desc: "Organisme installant du solaire gratuit ou à faible coût." },
    es: { title: "GRID Alternatives", desc: "Organización sin fines de lucro que instala solar gratuito o de bajo costo." },
  },
},
{
  category: "Utilities",
  link: "https://www.211.org/services/water",
  i18n: {
    en: { title: "211 Water Assistance Directory", desc: "Local water bill assistance referrals through the 211 network." },
    fr: { title: "Répertoire aide facture eau 211", desc: "Orientation vers l'aide aux factures d'eau via le réseau 211." },
    es: { title: "Directorio de Asistencia de Agua 211", desc: "Referencias de asistencia de facturas de agua a través de la red 211." },
  },
},
{
  category: "Utilities",
  link: "https://www.epa.gov/watersense/start-saving",
  i18n: {
    en: { title: "EPA WaterSense Start Saving Tips", desc: "Practical tips for reducing household water usage and costs." },
    fr: { title: "Conseils économie eau EPA WaterSense", desc: "Conseils pratiques pour réduire la consommation d'eau du ménage." },
    es: { title: "Consejos de Ahorro EPA WaterSense", desc: "Consejos prácticos para reducir el uso de agua del hogar." },
  },
},
{
  category: "Utilities",
  link: "https://www.usa.gov/telephone-help",
  i18n: {
    en: { title: "USA.gov Telephone Assistance Guide", desc: "Government guide to phone service assistance programs." },
    fr: { title: "Guide aide téléphone USA.gov", desc: "Guide gouvernemental des programmes d'aide au téléphone." },
    es: { title: "Guía de Asistencia Telefónica USA.gov", desc: "Guía del gobierno de programas de asistencia telefónica." },
  },
},
{
  category: "Utilities",
  link: "https://www.fcc.gov/consumers/guides/lifeline-affordable-telephone-service-income-eligible-consumers",
  i18n: {
    en: { title: "FCC Lifeline Eligibility Guide", desc: "Official FCC guidance on Lifeline eligibility and enrollment." },
    fr: { title: "Guide admissibilité Lifeline FCC", desc: "Directives officielles de la FCC sur l'admissibilité à Lifeline." },
    es: { title: "Guía de Elegibilidad Lifeline FCC", desc: "Orientación oficial de la FCC sobre elegibilidad para Lifeline." },
  },
},
{
  category: "Utilities",
  link: "https://www.freedomcalling.com",
  i18n: {
    en: { title: "Freedom Mobile Lifeline Service", desc: "Free phone service for eligible Lifeline program participants." },
    fr: { title: "Freedom Mobile service Lifeline", desc: "Service téléphonique gratuit pour participants Lifeline admissibles." },
    es: { title: "Servicio Lifeline Freedom Mobile", desc: "Servicio telefónico gratuito para participantes Lifeline elegibles." },
  },
},
{
  category: "Utilities",
  link: "https://www.easywireless.com",
  i18n: {
    en: { title: "Easy Wireless Lifeline Service", desc: "Free or discounted phone service through the Lifeline program." },
    fr: { title: "Easy Wireless service Lifeline", desc: "Service téléphonique gratuit ou réduit via le programme Lifeline." },
    es: { title: "Servicio Lifeline Easy Wireless", desc: "Servicio telefónico gratuito o con descuento a través de Lifeline." },
  },
},
{
  category: "Utilities",
  link: "https://www.stfrancisenergy.org",
  i18n: {
    en: { title: "Faith-Based Energy Assistance Directory", desc: "Directory of faith-based organizations offering energy bill help." },
    fr: { title: "Répertoire aide énergie religieuse", desc: "Répertoire d'organisations religieuses offrant une aide énergétique." },
    es: { title: "Directorio de Asistencia Energética Religiosa", desc: "Directorio de organizaciones religiosas que ofrecen ayuda energética." },
  },
},
{
  category: "Utilities",
  link: "https://www.211.org/services/technology",
  i18n: {
    en: { title: "211 Technology Access Directory", desc: "Local device and internet access assistance through the 211 network." },
    fr: { title: "Répertoire accès technologie 211", desc: "Aide d'accès aux appareils et Internet via le réseau 211." },
    es: { title: "Directorio de Acceso a Tecnología 211", desc: "Ayuda de acceso a dispositivos e internet a través de la red 211." },
  },
},
{
  category: "Utilities",
  link: "https://www.oregon.gov/energy/residential/pages/energy-assistance.aspx",
  states: ["OR"],
  i18n: {
    en: { title: "Oregon Energy Assistance Program", desc: "State energy bill assistance information for Oregon residents." },
    fr: { title: "Programme aide énergie Oregon", desc: "Informations d'aide aux factures d'énergie pour résidents de l'Oregon." },
    es: { title: "Programa de Asistencia Energética de Oregon", desc: "Información de asistencia de facturas de energía para Oregon." },
  },
},
{
  category: "Utilities",
  link: "https://www.mass.gov/liheap",
  states: ["MA"],
  i18n: {
    en: { title: "Massachusetts LIHEAP", desc: "State energy assistance program information for Massachusetts." },
    fr: { title: "LIHEAP Massachusetts", desc: "Informations sur le programme d'aide énergétique du Massachusetts." },
    es: { title: "LIHEAP de Massachusetts", desc: "Información del programa de asistencia energética de Massachusetts." },
  },
},
{
  category: "Utilities",
  link: "https://www.dhs.wisconsin.gov/liheap",
  states: ["WI"],
  i18n: {
    en: { title: "Wisconsin LIHEAP", desc: "State energy assistance program information for Wisconsin." },
    fr: { title: "LIHEAP Wisconsin", desc: "Informations sur le programme d'aide énergétique du Wisconsin." },
    es: { title: "LIHEAP de Wisconsin", desc: "Información del programa de asistencia energética de Wisconsin." },
  },
},
{
  category: "Utilities",
  link: "https://www.mn.gov/commerce/consumers/consumer-assistance/energy-assistance/",
  states: ["MN"],
  i18n: {
    en: { title: "Minnesota Energy Assistance Program", desc: "State energy assistance program information for Minnesota." },
    fr: { title: "Programme aide énergie Minnesota", desc: "Informations sur le programme d'aide énergétique du Minnesota." },
    es: { title: "Programa de Asistencia Energética de Minnesota", desc: "Información del programa de asistencia energética de Minnesota." },
  },
},
{
  category: "Utilities",
  link: "https://www.cdhs.state.co.us/energy-assistance",
  states: ["CO"],
  i18n: {
    en: { title: "Colorado Energy Assistance Program", desc: "State energy assistance program information for Colorado." },
    fr: { title: "Programme aide énergie Colorado", desc: "Informations sur le programme d'aide énergétique du Colorado." },
    es: { title: "Programa de Asistencia Energética de Colorado", desc: "Información del programa de asistencia energética de Colorado." },
  },
},
{
  category: "Utilities",
  link: "https://www.dhr.alabama.gov/liheap",
  states: ["AL"],
  i18n: {
    en: { title: "Alabama LIHEAP", desc: "State energy assistance program information for Alabama." },
    fr: { title: "LIHEAP Alabama", desc: "Informations sur le programme d'aide énergétique de l'Alabama." },
    es: { title: "LIHEAP de Alabama", desc: "Información del programa de asistencia energética de Alabama." },
  },
},
{
  category: "Utilities",
  link: "https://www.scdss.gov/liheap",
  states: ["SC"],
  i18n: {
    en: { title: "South Carolina LIHEAP", desc: "State energy assistance program information for South Carolina." },
    fr: { title: "LIHEAP Caroline du Sud", desc: "Informations sur le programme d'aide énergétique de la Caroline du Sud." },
    es: { title: "LIHEAP de Carolina del Sur", desc: "Información del programa de asistencia energética de Carolina del Sur." },
  },
},
{
  category: "Utilities",
  link: "https://www.dcf.louisiana.gov/liheap",
  states: ["LA"],
  i18n: {
    en: { title: "Louisiana LIHEAP", desc: "State energy assistance program information for Louisiana." },
    fr: { title: "LIHEAP Louisiane", desc: "Informations sur le programme d'aide énergétique de la Louisiane." },
    es: { title: "LIHEAP de Luisiana", desc: "Información del programa de asistencia energética de Luisiana." },
  },
},
{
  category: "Utilities",
  link: "https://www.chfs.ky.gov/agencies/dcbs/dfs/liheap",
  states: ["KY"],
  i18n: {
    en: { title: "Kentucky LIHEAP", desc: "State energy assistance program information for Kentucky." },
    fr: { title: "LIHEAP Kentucky", desc: "Informations sur le programme d'aide énergétique du Kentucky." },
    es: { title: "LIHEAP de Kentucky", desc: "Información del programa de asistencia energética de Kentucky." },
  },
},

// EDUCATION (30)
{
  category: "Education",
  link: "https://www.usa.gov/college-prep",
  i18n: {
    en: { title: "USA.gov College Prep Guide", desc: "Government guide to preparing for and applying to college." },
    fr: { title: "Guide préparation collège USA.gov", desc: "Guide gouvernemental pour se préparer et postuler au collège." },
    es: { title: "Guía de Preparación Universitaria USA.gov", desc: "Guía del gobierno para prepararse y postularse a la universidad." },
  },
},
{
  category: "Education",
  link: "https://www.commonapp.org/apply/fee-waivers",
  i18n: {
    en: { title: "Common App Fee Waivers", desc: "Information on application fee waivers for college applications." },
    fr: { title: "Exonérations frais Common App", desc: "Informations sur les exonérations de frais de demande universitaire." },
    es: { title: "Exenciones de Tarifas Common App", desc: "Información sobre exenciones de tarifas de solicitud universitaria." },
  },
},
{
  category: "Education",
  link: "https://collegeboard.org/fee-waivers",
  i18n: {
    en: { title: "College Board Fee Waivers", desc: "Fee waiver information for SAT and college application costs." },
    fr: { title: "Exonérations frais College Board", desc: "Informations sur les exonérations de frais SAT et candidatures." },
    es: { title: "Exenciones de Tarifas College Board", desc: "Información de exenciones de tarifas SAT y solicitudes universitarias." },
  },
},
{
  category: "Education",
  link: "https://www.act.org/content/act/en/products-and-services/the-act/registration/fees/fee-waivers.html",
  i18n: {
    en: { title: "ACT Fee Waivers", desc: "Fee waiver information for eligible students taking the ACT exam." },
    fr: { title: "Exonérations frais ACT", desc: "Informations sur les exonérations de frais pour l'examen ACT." },
    es: { title: "Exenciones de Tarifas ACT", desc: "Información de exenciones de tarifas para el examen ACT." },
  },
},
{
  category: "Education",
  link: "https://www.niche.com/colleges/scholarships/",
  i18n: {
    en: { title: "Niche Scholarship Search", desc: "Searchable scholarship database for students at all education levels." },
    fr: { title: "Recherche bourses Niche", desc: "Base de données de bourses consultable pour tous niveaux d'éducation." },
    es: { title: "Búsqueda de Becas Niche", desc: "Base de datos de becas buscable para todos los niveles educativos." },
  },
},
{
  category: "Education",
  link: "https://www.cappex.com/scholarships",
  i18n: {
    en: { title: "Cappex Scholarship Search", desc: "Free scholarship matching tool for college-bound students." },
    fr: { title: "Recherche bourses Cappex", desc: "Outil gratuit de recherche de bourses pour étudiants." },
    es: { title: "Búsqueda de Becas Cappex", desc: "Herramienta gratuita de búsqueda de becas para estudiantes." },
  },
},
{
  category: "Education",
  link: "https://www.unigo.com/scholarships",
  i18n: {
    en: { title: "Unigo Scholarship Directory", desc: "Scholarship search platform with reviews and college resources." },
    fr: { title: "Répertoire bourses Unigo", desc: "Plateforme de recherche de bourses avec avis et ressources." },
    es: { title: "Directorio de Becas Unigo", desc: "Plataforma de búsqueda de becas con reseñas y recursos." },
  },
},
{
  category: "Education",
  link: "https://www.goingmerry.com",
  i18n: {
    en: { title: "Going Merry Scholarships", desc: "Free platform simplifying scholarship applications for students." },
    fr: { title: "Bourses Going Merry", desc: "Plateforme gratuite simplifiant les demandes de bourses." },
    es: { title: "Becas Going Merry", desc: "Plataforma gratuita que simplifica las solicitudes de becas." },
  },
},
{
  category: "Education",
  link: "https://www.scholarshipowl.com",
  i18n: {
    en: { title: "ScholarshipOwl", desc: "Scholarship matching platform helping students find funding opportunities." },
    fr: { title: "ScholarshipOwl", desc: "Plateforme de correspondance de bourses aidant les étudiants." },
    es: { title: "ScholarshipOwl", desc: "Plataforma de coincidencia de becas que ayuda a los estudiantes." },
  },
},
{
  category: "Education",
  link: "https://www.bold.org",
  i18n: {
    en: { title: "Bold.org Scholarships", desc: "Scholarship platform with community-funded opportunities for students." },
    fr: { title: "Bourses Bold.org", desc: "Plateforme de bourses avec opportunités financées par la communauté." },
    es: { title: "Becas Bold.org", desc: "Plataforma de becas con oportunidades financiadas por la comunidad." },
  },
},
{
  category: "Education",
  link: "https://www.usa.gov/homeschooling",
  i18n: {
    en: { title: "USA.gov Homeschooling Guide", desc: "Government guide to homeschooling laws and resources by state." },
    fr: { title: "Guide école à domicile USA.gov", desc: "Guide gouvernemental des lois d'école à domicile par État." },
    es: { title: "Guía de Educación en Casa USA.gov", desc: "Guía del gobierno de leyes de educación en casa por estado." },
  },
},
{
  category: "Education",
  link: "https://www.homeschool.com/resources",
  i18n: {
    en: { title: "Homeschool.com Resources", desc: "Free curriculum resources and support for homeschooling families." },
    fr: { title: "Ressources Homeschool.com", desc: "Ressources de curriculum gratuites pour familles pratiquant l'école à domicile." },
    es: { title: "Recursos Homeschool.com", desc: "Recursos de currículo gratuitos para familias que educan en casa." },
  },
},
{
  category: "Education",
  link: "https://www.khanacademy.org/college-careers-more",
  i18n: {
    en: { title: "Khan Academy College and Careers", desc: "Free college planning and career exploration resources." },
    fr: { title: "Khan Academy collège et carrières", desc: "Ressources gratuites de planification universitaire et carrière." },
    es: { title: "Khan Academy Universidad y Carreras", desc: "Recursos gratuitos de planificación universitaria y carrera." },
  },
},
{
  category: "Education",
  link: "https://www.mynextmove.org/explore/ip",
  i18n: {
    en: { title: "My Next Move Interest Profiler", desc: "Free career interest assessment tool for exploring career paths." },
    fr: { title: "Profileur d'intérêts My Next Move", desc: "Outil gratuit d'évaluation des intérêts professionnels." },
    es: { title: "Perfil de Intereses My Next Move", desc: "Herramienta gratuita de evaluación de intereses profesionales." },
  },
},
{
  category: "Education",
  link: "https://www.careeronestop.org/ExploreCareers/explore-careers.aspx",
  i18n: {
    en: { title: "CareerOneStop Explore Careers", desc: "Federal career exploration tools and occupational information." },
    fr: { title: "Explorer carrières CareerOneStop", desc: "Outils fédéraux d'exploration de carrière." },
    es: { title: "Explorar Carreras CareerOneStop", desc: "Herramientas federales de exploración de carreras." },
  },
},
{
  category: "Education",
  link: "https://www.usa.gov/vocational-and-technical-schools",
  i18n: {
    en: { title: "USA.gov Vocational and Technical Schools Guide", desc: "Government guide to trade school and vocational training options." },
    fr: { title: "Guide écoles techniques USA.gov", desc: "Guide gouvernemental des options d'écoles techniques." },
    es: { title: "Guía de Escuelas Vocacionales y Técnicas USA.gov", desc: "Guía del gobierno de opciones de escuelas técnicas." },
  },
},
{
  category: "Education",
  link: "https://www.trade-schools.net",
  i18n: {
    en: { title: "Trade-Schools.net", desc: "Directory of vocational and trade school programs by field and location." },
    fr: { title: "Trade-Schools.net", desc: "Répertoire de programmes d'écoles techniques par domaine et région." },
    es: { title: "Trade-Schools.net", desc: "Directorio de programas de escuelas técnicas por campo y ubicación." },
  },
},
{
  category: "Education",
  link: "https://www.skillsusa.org",
  i18n: {
    en: { title: "SkillsUSA", desc: "Career and technical education programs for students and professionals." },
    fr: { title: "SkillsUSA", desc: "Programmes d'éducation technique et professionnelle." },
    es: { title: "SkillsUSA", desc: "Programas de educación técnica y profesional." },
  },
},
{
  category: "Education",
  link: "https://www.gedtestingservice.com",
  i18n: {
    en: { title: "GED Testing Service", desc: "Official resources for earning a GED high school equivalency diploma." },
    fr: { title: "GED Testing Service", desc: "Ressources officielles pour obtenir un diplôme d'équivalence GED." },
    es: { title: "GED Testing Service", desc: "Recursos oficiales para obtener un diploma de equivalencia GED." },
  },
},
{
  category: "Education",
  link: "https://www.hiset.ets.org",
  i18n: {
    en: { title: "HiSET High School Equivalency Test", desc: "Alternative high school equivalency testing program information." },
    fr: { title: "Test équivalence HiSET", desc: "Informations sur le programme de test d'équivalence alternatif." },
    es: { title: "Examen de Equivalencia HiSET", desc: "Información del programa de examen de equivalencia alternativo." },
  },
},
{
  category: "Education",
  link: "https://www.tasctest.com",
  i18n: {
    en: { title: "TASC High School Equivalency Test", desc: "Information on the Test Assessing Secondary Completion." },
    fr: { title: "Test équivalence TASC", desc: "Informations sur le test d'évaluation de la fin des études secondaires." },
    es: { title: "Examen de Equivalencia TASC", desc: "Información sobre el examen de evaluación de finalización secundaria." },
  },
},
{
  category: "Education",
  link: "https://www.211.org/services/education",
  i18n: {
    en: { title: "211 Education Services Directory", desc: "Local education and literacy program referrals through 211." },
    fr: { title: "Répertoire services éducation 211", desc: "Orientation vers programmes d'éducation locaux via le réseau 211." },
    es: { title: "Directorio de Servicios Educativos 211", desc: "Referencias de programas educativos locales a través de la red 211." },
  },
},
{
  category: "Education",
  link: "https://www.readingrockets.org",
  i18n: {
    en: { title: "Reading Rockets", desc: "Free resources for helping children become successful readers." },
    fr: { title: "Reading Rockets", desc: "Ressources gratuites pour aider les enfants à devenir de bons lecteurs." },
    es: { title: "Reading Rockets", desc: "Recursos gratuitos para ayudar a los niños a ser buenos lectores." },
  },
},
{
  category: "Education",
  link: "https://www.readworks.org",
  i18n: {
    en: { title: "ReadWorks", desc: "Free reading comprehension resources for students and educators." },
    fr: { title: "ReadWorks", desc: "Ressources gratuites de compréhension de lecture pour étudiants." },
    es: { title: "ReadWorks", desc: "Recursos gratuitos de comprensión lectora para estudiantes." },
  },
},
{
  category: "Education",
  link: "https://www.commonsense.org/education",
  i18n: {
    en: { title: "Common Sense Education", desc: "Free digital literacy and citizenship resources for students and families." },
    fr: { title: "Common Sense Education", desc: "Ressources gratuites d'alphabétisation numérique pour étudiants." },
    es: { title: "Common Sense Education", desc: "Recursos gratuitos de alfabetización digital para estudiantes." },
  },
},
{
  category: "Education",
  link: "https://www.code.org",
  i18n: {
    en: { title: "Code.org", desc: "Free computer science education resources for students of all ages." },
    fr: { title: "Code.org", desc: "Ressources gratuites d'éducation en informatique pour tous âges." },
    es: { title: "Code.org", desc: "Recursos gratuitos de educación en informática para todas las edades." },
  },
},
{
  category: "Education",
  link: "https://www.scratch.mit.edu",
  i18n: {
    en: { title: "Scratch by MIT", desc: "Free programming platform teaching kids to create interactive projects." },
    fr: { title: "Scratch par MIT", desc: "Plateforme de programmation gratuite pour enfants." },
    es: { title: "Scratch de MIT", desc: "Plataforma de programación gratuita para niños." },
  },
},
{
  category: "Education",
  link: "https://www.zearn.org",
  i18n: {
    en: { title: "Zearn Math", desc: "Free math learning platform for elementary and middle school students." },
    fr: { title: "Zearn Math", desc: "Plateforme d'apprentissage des mathématiques gratuite pour élèves." },
    es: { title: "Zearn Math", desc: "Plataforma gratuita de aprendizaje de matemáticas para estudiantes." },
  },
},
{
  category: "Education",
  link: "https://www.ixl.com",
  i18n: {
    en: { title: "IXL Learning", desc: "Online learning platform covering math, reading, and other subjects." },
    fr: { title: "IXL Learning", desc: "Plateforme d'apprentissage en ligne couvrant mathématiques et lecture." },
    es: { title: "IXL Learning", desc: "Plataforma de aprendizaje en línea que cubre matemáticas y lectura." },
  },
},
{
  category: "Education",
  link: "https://www.getepic.com",
  i18n: {
    en: { title: "Epic Books for Kids", desc: "Digital library with thousands of books for children ages 12 and under." },
    fr: { title: "Epic Books for Kids", desc: "Bibliothèque numérique avec des milliers de livres pour enfants." },
    es: { title: "Epic Books for Kids", desc: "Biblioteca digital con miles de libros para niños de 12 años o menos." },
  },
},

// INCOME (40)
{
  category: "Income",
  link: "https://www.211.org/services/utility-assistance",
  i18n: {
    en: { title: "211 General Assistance Directory", desc: "Comprehensive local assistance referral service through 211." },
    fr: { title: "Répertoire aide générale 211", desc: "Service complet d'orientation vers l'aide locale via 211." },
    es: { title: "Directorio de Asistencia General 211", desc: "Servicio integral de referencia de asistencia local a través de 211." },
  },
},
{
  category: "Income",
  link: "https://www.irs.gov/payments/offer-in-compromise",
  i18n: {
    en: { title: "IRS Offer in Compromise", desc: "Federal program allowing eligible taxpayers to settle tax debt for less." },
    fr: { title: "Offre transactionnelle IRS", desc: "Programme fédéral permettant de régler une dette fiscale pour moins." },
    es: { title: "Oferta de Compromiso del IRS", desc: "Programa federal que permite liquidar deudas fiscales por menos." },
  },
},
{
  category: "Income",
  link: "https://www.irs.gov/payments/payment-plans-installment-agreements",
  i18n: {
    en: { title: "IRS Payment Plans", desc: "Federal information on setting up installment agreements for tax debt." },
    fr: { title: "Plans de paiement IRS", desc: "Informations fédérales pour établir des accords d'échelonnement fiscal." },
    es: { title: "Planes de Pago del IRS", desc: "Información federal para establecer acuerdos de pago de deudas fiscales." },
  },
},
{
  category: "Income",
  link: "https://www.nfcc.org/find-an-agency/",
  i18n: {
    en: { title: "NFCC Find a Credit Counseling Agency", desc: "Directory of accredited nonprofit credit counseling agencies." },
    fr: { title: "Trouver agence conseil crédit NFCC", desc: "Répertoire d'agences de conseil en crédit accréditées." },
    es: { title: "Encuentre una Agencia de Consejería Crediticia NFCC", desc: "Directorio de agencias acreditadas de consejería crediticia." },
  },
},
{
  category: "Income",
  link: "https://www.debt.org",
  i18n: {
    en: { title: "Debt.org", desc: "Financial education resources on managing and reducing debt." },
    fr: { title: "Debt.org", desc: "Ressources d'éducation financière pour gérer et réduire les dettes." },
    es: { title: "Debt.org", desc: "Recursos de educación financiera para manejar y reducir deudas." },
  },
},
{
  category: "Income",
  link: "https://www.myfico.com/credit-education",
  i18n: {
    en: { title: "MyFICO Credit Education", desc: "Free resources for understanding and improving credit scores." },
    fr: { title: "Éducation crédit MyFICO", desc: "Ressources gratuites pour comprendre et améliorer les scores de crédit." },
    es: { title: "Educación Crediticia MyFICO", desc: "Recursos gratuitos para entender y mejorar puntajes de crédito." },
  },
},
{
  category: "Income",
  link: "https://www.annualcreditreport.com",
  i18n: {
    en: { title: "AnnualCreditReport.com", desc: "Official source for free annual credit reports from all three bureaus." },
    fr: { title: "AnnualCreditReport.com", desc: "Source officielle pour rapports de crédit annuels gratuits." },
    es: { title: "AnnualCreditReport.com", desc: "Fuente oficial de informes de crédito anuales gratuitos." },
  },
},
{
  category: "Income",
  link: "https://www.consumerfinance.gov/consumer-tools/debt-collection/answers-scripts/",
  i18n: {
    en: { title: "CFPB Debt Collection Scripts", desc: "Sample scripts to help consumers respond to debt collectors." },
    fr: { title: "Scripts recouvrement dette CFPB", desc: "Exemples de scripts pour répondre aux agents de recouvrement." },
    es: { title: "Guiones de Cobro de Deudas CFPB", desc: "Guiones de ejemplo para responder a cobradores de deudas." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/bankruptcy",
  i18n: {
    en: { title: "USA.gov Bankruptcy Guide", desc: "Government guide to understanding bankruptcy options and process." },
    fr: { title: "Guide faillite USA.gov", desc: "Guide gouvernemental pour comprendre les options de faillite." },
    es: { title: "Guía de Bancarrota USA.gov", desc: "Guía del gobierno para entender opciones de bancarrota." },
  },
},
{
  category: "Income",
  link: "https://www.uscourts.gov/services-forms/bankruptcy/bankruptcy-basics",
  i18n: {
    en: { title: "US Courts Bankruptcy Basics", desc: "Official federal court information on bankruptcy filing basics." },
    fr: { title: "Bases faillite US Courts", desc: "Informations officielles des tribunaux fédéraux sur la faillite." },
    es: { title: "Conceptos Básicos de Bancarrota US Courts", desc: "Información oficial de tribunales federales sobre bancarrota." },
  },
},
{
  category: "Income",
  link: "https://www.hud.gov/topics/avoiding_scams",
  i18n: {
    en: { title: "HUD Avoiding Housing Scams", desc: "Federal guidance to help consumers avoid housing-related scams." },
    fr: { title: "Éviter arnaques logement HUD", desc: "Conseils fédéraux pour éviter les arnaques liées au logement." },
    es: { title: "Evitar Estafas de Vivienda HUD", desc: "Orientación federal para evitar estafas relacionadas con vivienda." },
  },
},
{
  category: "Income",
  link: "https://www.211.org/services/tax-help",
  i18n: {
    en: { title: "211 Tax Help Directory", desc: "Local free tax preparation service referrals through the 211 network." },
    fr: { title: "Répertoire aide fiscale 211", desc: "Orientation vers services fiscaux gratuits via le réseau 211." },
    es: { title: "Directorio de Ayuda Fiscal 211", desc: "Referencias de servicios fiscales gratuitos a través de la red 211." },
  },
},
{
  category: "Income",
  link: "https://www.getyourrefund.org",
  i18n: {
    en: { title: "GetYourRefund.org", desc: "Free tax filing help for eligible low-to-moderate income filers." },
    fr: { title: "GetYourRefund.org", desc: "Aide gratuite à la déclaration fiscale pour revenus faibles à modérés." },
    es: { title: "GetYourRefund.org", desc: "Ayuda gratuita para declarar impuestos para ingresos bajos a moderados." },
  },
},
{
  category: "Income",
  link: "https://www.myfreetaxes.com",
  i18n: {
    en: { title: "MyFreeTaxes", desc: "Free federal and state tax filing for eligible taxpayers." },
    fr: { title: "MyFreeTaxes", desc: "Déclaration fiscale fédérale et d'État gratuite pour contribuables admissibles." },
    es: { title: "MyFreeTaxes", desc: "Declaración de impuestos federal y estatal gratuita para contribuyentes elegibles." },
  },
},
{
  category: "Income",
  link: "https://www.eitcoutreach.org",
  i18n: {
    en: { title: "EITC Outreach Resources", desc: "Resources helping eligible workers claim the Earned Income Tax Credit." },
    fr: { title: "Ressources sensibilisation EITC", desc: "Ressources aidant les travailleurs à demander le crédit d'impôt EITC." },
    es: { title: "Recursos de Divulgación EITC", desc: "Recursos que ayudan a trabajadores a reclamar el crédito EITC." },
  },
},
{
  category: "Income",
  link: "https://www.irs.gov/credits-deductions/individuals/child-tax-credit/child-tax-credit-eligibility-assistant",
  i18n: {
    en: { title: "Child Tax Credit Eligibility Assistant", desc: "Official IRS tool to check eligibility for the Child Tax Credit." },
    fr: { title: "Assistant admissibilité crédit enfant", desc: "Outil officiel de l'IRS pour vérifier l'admissibilité au crédit d'impôt." },
    es: { title: "Asistente de Elegibilidad de Crédito por Hijos", desc: "Herramienta oficial del IRS para verificar elegibilidad." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/whd/flsa",
  i18n: {
    en: { title: "Fair Labor Standards Act Information", desc: "Federal wage and hour law information for workers." },
    fr: { title: "Info loi normes travail équitables", desc: "Informations sur la loi fédérale sur les salaires et heures de travail." },
    es: { title: "Información de la Ley de Normas Laborales Justas", desc: "Información sobre la ley federal de salarios y horas de trabajo." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/whd/workers",
  i18n: {
    en: { title: "DOL Wage and Hour Worker Rights", desc: "Federal resources on worker rights related to pay and hours." },
    fr: { title: "Droits travailleurs salaires DOL", desc: "Ressources fédérales sur les droits des travailleurs en matière de salaires." },
    es: { title: "Derechos de Trabajadores de Salarios y Horas DOL", desc: "Recursos federales sobre derechos de trabajadores relacionados con salarios." },
  },
},
{
  category: "Income",
  link: "https://www.eeoc.gov/employees",
  i18n: {
    en: { title: "EEOC Employee Rights", desc: "Federal information on workplace discrimination rights and complaints." },
    fr: { title: "Droits employés EEOC", desc: "Informations fédérales sur les droits en matière de discrimination au travail." },
    es: { title: "Derechos de Empleados EEOC", desc: "Información federal sobre derechos de discriminación laboral." },
  },
},
{
  category: "Income",
  link: "https://www.osha.gov/workers",
  i18n: {
    en: { title: "OSHA Worker Rights and Safety", desc: "Federal workplace safety information and worker rights resources." },
    fr: { title: "Droits et sécurité travailleurs OSHA", desc: "Informations fédérales sur la sécurité au travail." },
    es: { title: "Derechos y Seguridad de Trabajadores OSHA", desc: "Información federal sobre seguridad en el lugar de trabajo." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/general/topic/unemployment-insurance/state",
  i18n: {
    en: { title: "State Unemployment Insurance Contacts", desc: "Federal directory of state unemployment insurance agency contacts." },
    fr: { title: "Contacts assurance chômage par État", desc: "Répertoire fédéral des contacts d'assurance chômage par État." },
    es: { title: "Contactos de Seguro de Desempleo Estatal", desc: "Directorio federal de contactos de agencias de seguro de desempleo." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/eta/unemployment-insurance-benefits",
  i18n: {
    en: { title: "Unemployment Insurance Benefits Overview", desc: "Federal overview of unemployment insurance eligibility and benefits." },
    fr: { title: "Aperçu prestations assurance chômage", desc: "Aperçu fédéral de l'admissibilité et des prestations d'assurance chômage." },
    es: { title: "Resumen de Beneficios de Seguro de Desempleo", desc: "Resumen federal de elegibilidad y beneficios de seguro de desempleo." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/whd/minimum-wage/state",
  i18n: {
    en: { title: "State Minimum Wage Information", desc: "Official federal directory of state minimum wage laws." },
    fr: { title: "Info salaire minimum par État", desc: "Répertoire fédéral officiel des lois sur le salaire minimum par État." },
    es: { title: "Información de Salario Mínimo Estatal", desc: "Directorio federal oficial de leyes de salario mínimo por estado." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/wages",
  i18n: {
    en: { title: "USA.gov Wage Information Guide", desc: "Government guide to understanding wage laws and worker protections." },
    fr: { title: "Guide info salaires USA.gov", desc: "Guide gouvernemental pour comprendre les lois sur les salaires." },
    es: { title: "Guía de Información Salarial USA.gov", desc: "Guía del gobierno para entender leyes salariales y protecciones." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/whd/fmla",
  i18n: {
    en: { title: "Family and Medical Leave Act Information", desc: "Federal information on job-protected leave for family or medical reasons." },
    fr: { title: "Info loi congé familial médical", desc: "Informations fédérales sur le congé protégé pour raisons familiales." },
    es: { title: "Información de la Ley de Licencia Familiar y Médica", desc: "Información federal sobre licencia protegida por razones familiares." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/wb/paid-leave",
  i18n: {
    en: { title: "DOL Paid Leave Resources", desc: "Federal information on state and employer paid leave programs." },
    fr: { title: "Ressources congé payé DOL", desc: "Informations fédérales sur les programmes de congé payé." },
    es: { title: "Recursos de Licencia Pagada DOL", desc: "Información federal sobre programas de licencia pagada." },
  },
},
{
  category: "Income",
  link: "https://www.ssa.gov/benefits/retirement/planner/",
  i18n: {
    en: { title: "Social Security Retirement Planner", desc: "Official tools to estimate and plan Social Security retirement benefits." },
    fr: { title: "Planificateur retraite Sécurité sociale", desc: "Outils officiels pour estimer les prestations de retraite." },
    es: { title: "Planificador de Jubilación del Seguro Social", desc: "Herramientas oficiales para estimar beneficios de jubilación." },
  },
},
{
  category: "Income",
  link: "https://www.ssa.gov/myaccount",
  i18n: {
    en: { title: "My Social Security Account", desc: "Official portal to check benefits, earnings, and apply for services." },
    fr: { title: "Mon compte Sécurité sociale", desc: "Portail officiel pour vérifier prestations et gains." },
    es: { title: "Mi Cuenta de Seguro Social", desc: "Portal oficial para verificar beneficios y ganancias." },
  },
},
{
  category: "Income",
  link: "https://www.pbgc.gov",
  i18n: {
    en: { title: "Pension Benefit Guaranty Corporation", desc: "Federal agency protecting pension benefits for workers and retirees." },
    fr: { title: "Pension Benefit Guaranty Corporation", desc: "Agence fédérale protégeant les prestations de retraite." },
    es: { title: "Corporación de Garantía de Beneficios de Pensión", desc: "Agencia federal que protege beneficios de pensión." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/ebsa/workers-and-families",
  i18n: {
    en: { title: "DOL Retirement and Health Plan Info", desc: "Federal information on retirement and health benefit plan rights." },
    fr: { title: "Info régimes retraite et santé DOL", desc: "Informations fédérales sur les droits des régimes de retraite." },
    es: { title: "Información de Planes de Jubilación y Salud DOL", desc: "Información federal sobre derechos de planes de jubilación." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/military-pay",
  i18n: {
    en: { title: "USA.gov Military Pay Guide", desc: "Government guide to military pay, allowances, and benefits." },
    fr: { title: "Guide solde militaire USA.gov", desc: "Guide gouvernemental sur la solde et les allocations militaires." },
    es: { title: "Guía de Pago Militar USA.gov", desc: "Guía del gobierno sobre pago y asignaciones militares." },
  },
},
{
  category: "Income",
  link: "https://www.militaryonesource.mil/military-life-cycle/deployment/",
  i18n: {
    en: { title: "Military OneSource Deployment Resources", desc: "Financial and family support resources during military deployment." },
    fr: { title: "Ressources déploiement Military OneSource", desc: "Ressources de soutien financier et familial pendant le déploiement." },
    es: { title: "Recursos de Despliegue Military OneSource", desc: "Recursos de apoyo financiero y familiar durante el despliegue militar." },
  },
},
{
  category: "Income",
  link: "https://www.va.gov/family-and-caregiver-benefits/health-and-disability/",
  i18n: {
    en: { title: "VA Caregiver Health and Disability Benefits", desc: "Financial and health benefits for caregivers of disabled veterans." },
    fr: { title: "Prestations santé aidants VA", desc: "Prestations financières et de santé pour aidants de vétérans handicapés." },
    es: { title: "Beneficios de Salud y Discapacidad para Cuidadores VA", desc: "Beneficios financieros y de salud para cuidadores de veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.dav.org/veterans/resources/finances/",
  i18n: {
    en: { title: "Disabled American Veterans Financial Resources", desc: "Financial assistance information for disabled veterans." },
    fr: { title: "Ressources financières DAV", desc: "Informations d'aide financière pour vétérans handicapés." },
    es: { title: "Recursos Financieros DAV", desc: "Información de asistencia financiera para veteranos discapacitados." },
  },
},
{
  category: "Income",
  link: "https://www.paralyzedveterans.org/get-support/",
  i18n: {
    en: { title: "Paralyzed Veterans of America Support", desc: "Support services and financial resources for paralyzed veterans." },
    fr: { title: "Soutien Paralyzed Veterans of America", desc: "Services de soutien et ressources financières pour vétérans paralysés." },
    es: { title: "Apoyo Paralyzed Veterans of America", desc: "Servicios de apoyo y recursos financieros para veteranos paralizados." },
  },
},
{
  category: "Income",
  link: "https://www.va.gov/education/survivor-dependent-benefits/",
  i18n: {
    en: { title: "VA Survivor and Dependent Education Benefits", desc: "Education benefits for spouses and children of veterans." },
    fr: { title: "Prestations éducation survivants VA", desc: "Prestations éducatives pour conjoints et enfants de vétérans." },
    es: { title: "Beneficios Educativos para Sobrevivientes y Dependientes VA", desc: "Beneficios educativos para cónyuges e hijos de veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/vets/programs/tap",
  i18n: {
    en: { title: "Transition Assistance Program", desc: "Employment and financial planning support for transitioning service members." },
    fr: { title: "Programme aide transition", desc: "Soutien à l'emploi et à la planification financière pour militaires en transition." },
    es: { title: "Programa de Asistencia de Transición", desc: "Apoyo de empleo y planificación financiera para militares en transición." },
  },
},

  // ===== PROGRAM 1000: MILESTONE ADDITION =====
  {
    category: "Income",
    link: "https://www.legion.org/get-involved/community-programs/temporary-financial-assistance",
    i18n: {
      en: {
        title: "American Legion Temporary Financial Assistance",
        desc: "One-time financial grants for eligible military or veteran families with minor children facing hardship.",
      },
      fr: {
        title: "Aide financière temporaire de l’American Legion",
        desc: "Subventions financières ponctuelles pour familles militaires ou vétéranes admissibles avec enfants mineurs en difficulté.",
      },
      es: {
        title: "Asistencia Financiera Temporal de American Legion",
        desc: "Subvenciones financieras únicas para familias militares o veteranas elegibles con hijos menores que enfrentan dificultades.",
      },
    },
  },
    // ===== PROGRAMS 1001-1100 =====

// FOOD (16)
{
  category: "Food",
  link: "https://www.fns.usda.gov/snap/recipient/eligibility",
  i18n: {
    en: { title: "SNAP Recipient Eligibility Details", desc: "Detailed federal breakdown of SNAP income and asset limits by household size." },
    fr: { title: "Détails admissibilité bénéficiaire SNAP", desc: "Répartition fédérale détaillée des limites de revenu SNAP selon la taille du ménage." },
    es: { title: "Detalles de Elegibilidad de Beneficiario SNAP", desc: "Desglose federal detallado de límites de ingresos SNAP según tamaño del hogar." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/wic/wic-food-packages",
  i18n: {
    en: { title: "WIC Food Package Guide", desc: "Official guide to foods covered under different WIC package categories." },
    fr: { title: "Guide colis alimentaire WIC", desc: "Guide officiel des aliments couverts par les différentes catégories WIC." },
    es: { title: "Guía de Paquetes de Alimentos WIC", desc: "Guía oficial de alimentos cubiertos por las diferentes categorías de WIC." },
  },
},
{
  category: "Food",
  link: "https://www.communityplatesus.org",
  i18n: {
    en: { title: "Community Plates", desc: "Volunteer-driven food rescue delivering surplus meals to people in need." },
    fr: { title: "Community Plates", desc: "Récupération alimentaire bénévole livrant des surplus aux personnes dans le besoin." },
    es: { title: "Community Plates", desc: "Rescate de alimentos voluntario que entrega excedentes a personas necesitadas." },
  },
},
{
  category: "Food",
  link: "https://www.extrafood.org",
  i18n: {
    en: { title: "Extra Food", desc: "Connects surplus prepared food from events and cafeterias to shelters." },
    fr: { title: "Extra Food", desc: "Relie les surplus alimentaires préparés d'événements aux refuges." },
    es: { title: "Extra Food", desc: "Conecta excedentes de comida preparada de eventos con refugios." },
  },
},
{
  category: "Food",
  link: "https://www.food4kids.org",
  i18n: {
    en: { title: "Food 4 Kids Backpack Program", desc: "Sends home weekend food backpacks for food-insecure schoolchildren." },
    fr: { title: "Programme sac à dos Food 4 Kids", desc: "Envoie des sacs à dos alimentaires le weekend pour élèves en insécurité alimentaire." },
    es: { title: "Programa de Mochilas Food 4 Kids", desc: "Envía mochilas de comida los fines de semana para niños en inseguridad alimentaria." },
  },
},
{
  category: "Food",
  link: "https://www.blessingsinabackpack.org",
  i18n: {
    en: { title: "Blessings in a Backpack", desc: "Weekend backpack food program for elementary school children in need." },
    fr: { title: "Blessings in a Backpack", desc: "Programme de sac à dos alimentaire le weekend pour élèves du primaire." },
    es: { title: "Blessings in a Backpack", desc: "Programa de mochilas de fin de semana para niños de primaria necesitados." },
  },
},
{
  category: "Food",
  link: "https://www.foodfinder.us",
  i18n: {
    en: { title: "FoodFinder", desc: "App and website connecting families to nearby free food resources." },
    fr: { title: "FoodFinder", desc: "Application et site reliant les familles aux ressources alimentaires gratuites locales." },
    es: { title: "FoodFinder", desc: "Aplicación y sitio web que conecta familias con recursos de comida gratuita cercanos." },
  },
},
{
  category: "Food",
  link: "https://www.mealconnect.org",
  i18n: {
    en: { title: "MealConnect", desc: "Feeding America platform matching food donors with local hunger relief agencies." },
    fr: { title: "MealConnect", desc: "Plateforme Feeding America reliant donateurs alimentaires et agences locales." },
    es: { title: "MealConnect", desc: "Plataforma Feeding America que conecta donantes de alimentos con agencias locales." },
  },
},
{
  category: "Food",
  link: "https://www.foodfinder.nyc",
  states: ["NY"],
  i18n: {
    en: { title: "NYC Food Finder", desc: "Map-based tool to find free food resources across New York City." },
    fr: { title: "NYC Food Finder", desc: "Outil cartographique pour trouver des ressources alimentaires gratuites à New York." },
    es: { title: "NYC Food Finder", desc: "Herramienta de mapa para encontrar recursos de comida gratuita en Nueva York." },
  },
},
{
  category: "Food",
  link: "https://www.lafoodbank.org/find-food/",
  states: ["CA"],
  i18n: {
    en: { title: "LA Regional Food Bank Find Food Tool", desc: "Search tool to find food pantries across Los Angeles County." },
    fr: { title: "Outil recherche alimentaire LA Food Bank", desc: "Outil de recherche pour trouver des garde-manger dans le comté de Los Angeles." },
    es: { title: "Herramienta de Búsqueda de Alimentos LA Food Bank", desc: "Herramienta de búsqueda de despensas en el condado de Los Ángeles." },
  },
},
{
  category: "Food",
  link: "https://www.foodbank.org",
  states: ["NY"],
  i18n: {
    en: { title: "Food Bank for New York City Programs", desc: "Range of hunger relief programs and pantry locations across NYC." },
    fr: { title: "Programmes Food Bank for New York City", desc: "Gamme de programmes de lutte contre la faim à New York." },
    es: { title: "Programas Food Bank for New York City", desc: "Gama de programas contra el hambre en la ciudad de Nueva York." },
  },
},
{
  category: "Food",
  link: "https://www.centralpafoodbank.org",
  states: ["PA"],
  i18n: {
    en: { title: "Central Pennsylvania Food Bank", desc: "Regional food bank network serving central Pennsylvania counties." },
    fr: { title: "Central Pennsylvania Food Bank", desc: "Réseau régional de banque alimentaire desservant le centre de la Pennsylvanie." },
    es: { title: "Central Pennsylvania Food Bank", desc: "Red regional de banco de alimentos que sirve al centro de Pennsylvania." },
  },
},
{
  category: "Food",
  link: "https://www.foodbankofnwpa.org",
  states: ["PA"],
  i18n: {
    en: { title: "Food Bank of Northwestern Pennsylvania", desc: "Regional food distribution network serving northwest Pennsylvania." },
    fr: { title: "Food Bank of Northwestern Pennsylvania", desc: "Réseau régional de distribution alimentaire desservant le nord-ouest de la Pennsylvanie." },
    es: { title: "Food Bank of Northwestern Pennsylvania", desc: "Red regional de distribución de alimentos que sirve al noroeste de Pennsylvania." },
  },
},
{
  category: "Food",
  link: "https://www.foodbankdetroit.org",
  states: ["MI"],
  i18n: {
    en: { title: "Gleaners Community Food Bank", desc: "Regional food bank network serving the Detroit metropolitan area." },
    fr: { title: "Gleaners Community Food Bank", desc: "Réseau régional de banque alimentaire desservant la région de Detroit." },
    es: { title: "Gleaners Community Food Bank", desc: "Red regional de banco de alimentos que sirve al área metropolitana de Detroit." },
  },
},
{
  category: "Food",
  link: "https://www.midwestfoodbank.org",
  states: ["IL"],
  i18n: {
    en: { title: "Midwest Food Bank", desc: "Regional food distribution network serving Illinois and surrounding states." },
    fr: { title: "Midwest Food Bank", desc: "Réseau régional de distribution alimentaire desservant l'Illinois et les environs." },
    es: { title: "Midwest Food Bank", desc: "Red regional de distribución de alimentos que sirve a Illinois y estados vecinos." },
  },
},
{
  category: "Food",
  link: "https://www.communityfoodbank.com",
  states: ["AZ"],
  i18n: {
    en: { title: "Community Food Bank of Southern Arizona", desc: "Regional food bank network serving southern Arizona communities." },
    fr: { title: "Community Food Bank of Southern Arizona", desc: "Réseau régional de banque alimentaire desservant le sud de l'Arizona." },
    es: { title: "Community Food Bank of Southern Arizona", desc: "Red regional de banco de alimentos que sirve al sur de Arizona." },
  },
},

// HEALTH (16)
{
  category: "Health",
  link: "https://www.freeclinics.com/results",
  i18n: {
    en: { title: "Free Clinic State Search Results", desc: "Search results directory of free clinics filterable by state." },
    fr: { title: "Résultats recherche clinique gratuite par État", desc: "Répertoire de résultats de cliniques gratuites filtrable par État." },
    es: { title: "Resultados de Búsqueda de Clínicas Gratuitas por Estado", desc: "Directorio de resultados de clínicas gratuitas filtrable por estado." },
  },
},
{
  category: "Health",
  link: "https://www.hrsa.gov/get-health-care/affordable/sliding-fee-scales",
  i18n: {
    en: { title: "HRSA Sliding Fee Scale Info", desc: "Federal information on sliding-scale fee clinics based on income." },
    fr: { title: "Info échelle tarifs ajustés HRSA", desc: "Informations fédérales sur les cliniques à tarifs ajustés selon revenu." },
    es: { title: "Información de Escala de Tarifas Deslizante HRSA", desc: "Información federal sobre clínicas de tarifa ajustada según ingresos." },
  },
},
{
  category: "Health",
  link: "https://www.nafcclinics.org",
  i18n: {
    en: { title: "National Association of Free & Charitable Clinics", desc: "Directory of free and charitable health clinics nationwide." },
    fr: { title: "Association nationale cliniques gratuites", desc: "Répertoire de cliniques de santé gratuites et caritatives à l'échelle nationale." },
    es: { title: "Asociación Nacional de Clínicas Gratuitas y Caritativas", desc: "Directorio de clínicas de salud gratuitas y caritativas a nivel nacional." },
  },
},
{
  category: "Health",
  link: "https://www.211.org/services/dental",
  i18n: {
    en: { title: "211 Dental Care Directory", desc: "Local low-cost and free dental care referrals through the 211 network." },
    fr: { title: "Répertoire soins dentaires 211", desc: "Orientation vers soins dentaires gratuits ou abordables via le réseau 211." },
    es: { title: "Directorio de Atención Dental 211", desc: "Referencias de atención dental gratuita o de bajo costo a través de la red 211." },
  },
},
{
  category: "Health",
  link: "https://www.ada.org/resources/community-initiatives/find-a-dentist",
  i18n: {
    en: { title: "ADA Find-a-Dentist Directory", desc: "Directory to find dentists including community health programs." },
    fr: { title: "Répertoire trouver un dentiste ADA", desc: "Répertoire pour trouver des dentistes, y compris programmes communautaires." },
    es: { title: "Directorio Encuentre un Dentista ADA", desc: "Directorio para encontrar dentistas, incluidos programas comunitarios." },
  },
},
{
  category: "Health",
  link: "https://www.dentalifeline.org",
  i18n: {
    en: { title: "Dental Lifeline Network", desc: "Free dental care coordination for people with disabilities, elderly, or medically fragile." },
    fr: { title: "Dental Lifeline Network", desc: "Coordination de soins dentaires gratuits pour personnes handicapées et fragiles." },
    es: { title: "Dental Lifeline Network", desc: "Coordinación de atención dental gratuita para personas discapacitadas y frágiles." },
  },
},
{
  category: "Health",
  link: "https://www.hrsa.gov/rural-health",
  i18n: {
    en: { title: "HRSA Rural Health Resources", desc: "Federal health resources and programs specifically for rural communities." },
    fr: { title: "Ressources santé rurale HRSA", desc: "Ressources et programmes de santé fédéraux pour les communautés rurales." },
    es: { title: "Recursos de Salud Rural HRSA", desc: "Recursos y programas de salud federal específicamente para comunidades rurales." },
  },
},
{
  category: "Health",
  link: "https://www.ruralhealthinfo.org",
  i18n: {
    en: { title: "Rural Health Information Hub", desc: "Comprehensive resource hub for rural health programs and funding." },
    fr: { title: "Rural Health Information Hub", desc: "Centre de ressources complet pour les programmes de santé ruraux." },
    es: { title: "Rural Health Information Hub", desc: "Centro de recursos integral para programas de salud rural." },
  },
},
{
  category: "Health",
  link: "https://www.indianhealthservice.gov",
  i18n: {
    en: { title: "Indian Health Service", desc: "Federal health care system providing services to American Indians and Alaska Natives." },
    fr: { title: "Indian Health Service", desc: "Système de santé fédéral offrant des services aux Amérindiens et autochtones d'Alaska." },
    es: { title: "Indian Health Service", desc: "Sistema de salud federal que brinda servicios a nativos americanos y de Alaska." },
  },
},
{
  category: "Health",
  link: "https://www.ihs.gov/findhealthcare/",
  i18n: {
    en: { title: "IHS Find Health Care Facility", desc: "Directory to locate Indian Health Service facilities by location." },
    fr: { title: "Trouver installation santé IHS", desc: "Répertoire pour localiser les installations de l'Indian Health Service." },
    es: { title: "Encuentre una Instalación de Salud IHS", desc: "Directorio para localizar instalaciones del Servicio de Salud Indígena." },
  },
},
{
  category: "Health",
  link: "https://www.migrantclinician.org",
  i18n: {
    en: { title: "Migrant Clinicians Network", desc: "Health resources and clinic directory for migrant and seasonal farmworkers." },
    fr: { title: "Migrant Clinicians Network", desc: "Ressources de santé pour travailleurs agricoles migrants et saisonniers." },
    es: { title: "Migrant Clinicians Network", desc: "Recursos de salud para trabajadores agrícolas migrantes y estacionales." },
  },
},
{
  category: "Health",
  link: "https://www.hrsa.gov/telehealth",
  i18n: {
    en: { title: "HRSA Telehealth Resources", desc: "Federal resources on accessing telehealth services, especially in rural areas." },
    fr: { title: "Ressources télésanté HRSA", desc: "Ressources fédérales sur l'accès aux services de télésanté, surtout en zones rurales." },
    es: { title: "Recursos de Telesalud HRSA", desc: "Recursos federales sobre acceso a servicios de telesalud, especialmente en zonas rurales." },
  },
},
{
  category: "Health",
  link: "https://www.teladoc.com",
  i18n: {
    en: { title: "Teladoc", desc: "Telehealth platform offering virtual doctor visits, often covered by insurance." },
    fr: { title: "Teladoc", desc: "Plateforme de télésanté offrant des consultations médicales virtuelles." },
    es: { title: "Teladoc", desc: "Plataforma de telesalud que ofrece consultas médicas virtuales." },
  },
},
{
  category: "Health",
  link: "https://www.mdlive.com",
  i18n: {
    en: { title: "MDLIVE", desc: "Virtual health care platform for medical, therapy, and psychiatry visits." },
    fr: { title: "MDLIVE", desc: "Plateforme de soins de santé virtuels pour consultations médicales et psychiatriques." },
    es: { title: "MDLIVE", desc: "Plataforma de atención médica virtual para consultas médicas y psiquiátricas." },
  },
},
{
  category: "Health",
  link: "https://www.amwell.com",
  i18n: {
    en: { title: "Amwell", desc: "Telehealth service connecting patients with doctors for virtual visits." },
    fr: { title: "Amwell", desc: "Service de télésanté reliant patients et médecins pour consultations virtuelles." },
    es: { title: "Amwell", desc: "Servicio de telesalud que conecta pacientes con médicos para consultas virtuales." },
  },
},
{
  category: "Health",
  link: "https://www.doctorondemand.com",
  i18n: {
    en: { title: "Doctor On Demand", desc: "Virtual health visits for medical, mental health, and preventive care." },
    fr: { title: "Doctor On Demand", desc: "Consultations de santé virtuelles pour soins médicaux, mentaux et préventifs." },
    es: { title: "Doctor On Demand", desc: "Consultas de salud virtuales para atención médica, mental y preventiva." },
  },
},

// HOUSING (16)
{
  category: "Housing",
  link: "https://www.hud.gov/states/texas",
  states: ["TX"],
  i18n: {
    en: { title: "HUD Texas Resources", desc: "Federal housing resources specific to Texas." },
    fr: { title: "Ressources HUD Texas", desc: "Ressources fédérales de logement pour le Texas." },
    es: { title: "Recursos HUD de Texas", desc: "Recursos federales de vivienda para Texas." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/florida",
  states: ["FL"],
  i18n: {
    en: { title: "HUD Florida Resources", desc: "Federal housing resources specific to Florida." },
    fr: { title: "Ressources HUD Floride", desc: "Ressources fédérales de logement pour la Floride." },
    es: { title: "Recursos HUD de Florida", desc: "Recursos federales de vivienda para Florida." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/georgia",
  states: ["GA"],
  i18n: {
    en: { title: "HUD Georgia Resources", desc: "Federal housing resources specific to Georgia." },
    fr: { title: "Ressources HUD Géorgie", desc: "Ressources fédérales de logement pour la Géorgie." },
    es: { title: "Recursos HUD de Georgia", desc: "Recursos federales de vivienda para Georgia." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/arizona",
  states: ["AZ"],
  i18n: {
    en: { title: "HUD Arizona Resources", desc: "Federal housing resources specific to Arizona." },
    fr: { title: "Ressources HUD Arizona", desc: "Ressources fédérales de logement pour l'Arizona." },
    es: { title: "Recursos HUD de Arizona", desc: "Recursos federales de vivienda para Arizona." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/nevada",
  states: ["NV"],
  i18n: {
    en: { title: "HUD Nevada Resources", desc: "Federal housing resources specific to Nevada." },
    fr: { title: "Ressources HUD Nevada", desc: "Ressources fédérales de logement pour le Nevada." },
    es: { title: "Recursos HUD de Nevada", desc: "Recursos federales de vivienda para Nevada." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/new_jersey",
  states: ["NJ"],
  i18n: {
    en: { title: "HUD New Jersey Resources", desc: "Federal housing resources specific to New Jersey." },
    fr: { title: "Ressources HUD New Jersey", desc: "Ressources fédérales de logement pour le New Jersey." },
    es: { title: "Recursos HUD de Nueva Jersey", desc: "Recursos federales de vivienda para Nueva Jersey." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/utah",
  states: ["UT"],
  i18n: {
    en: { title: "HUD Utah Resources", desc: "Federal housing resources specific to Utah." },
    fr: { title: "Ressources HUD Utah", desc: "Ressources fédérales de logement pour l'Utah." },
    es: { title: "Recursos HUD de Utah", desc: "Recursos federales de vivienda para Utah." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/idaho",
  states: ["ID"],
  i18n: {
    en: { title: "HUD Idaho Resources", desc: "Federal housing resources specific to Idaho." },
    fr: { title: "Ressources HUD Idaho", desc: "Ressources fédérales de logement pour l'Idaho." },
    es: { title: "Recursos HUD de Idaho", desc: "Recursos federales de vivienda para Idaho." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/new_mexico",
  states: ["NM"],
  i18n: {
    en: { title: "HUD New Mexico Resources", desc: "Federal housing resources specific to New Mexico." },
    fr: { title: "Ressources HUD Nouveau-Mexique", desc: "Ressources fédérales de logement pour le Nouveau-Mexique." },
    es: { title: "Recursos HUD de Nuevo México", desc: "Recursos federales de vivienda para Nuevo México." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/kansas",
  states: ["KS"],
  i18n: {
    en: { title: "HUD Kansas Resources", desc: "Federal housing resources specific to Kansas." },
    fr: { title: "Ressources HUD Kansas", desc: "Ressources fédérales de logement pour le Kansas." },
    es: { title: "Recursos HUD de Kansas", desc: "Recursos federales de vivienda para Kansas." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/arkansas",
  states: ["AR"],
  i18n: {
    en: { title: "HUD Arkansas Resources", desc: "Federal housing resources specific to Arkansas." },
    fr: { title: "Ressources HUD Arkansas", desc: "Ressources fédérales de logement pour l'Arkansas." },
    es: { title: "Recursos HUD de Arkansas", desc: "Recursos federales de vivienda para Arkansas." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/mississippi",
  states: ["MS"],
  i18n: {
    en: { title: "HUD Mississippi Resources", desc: "Federal housing resources specific to Mississippi." },
    fr: { title: "Ressources HUD Mississippi", desc: "Ressources fédérales de logement pour le Mississippi." },
    es: { title: "Recursos HUD de Mississippi", desc: "Recursos federales de vivienda para Mississippi." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/nebraska",
  states: ["NE"],
  i18n: {
    en: { title: "HUD Nebraska Resources", desc: "Federal housing resources specific to Nebraska." },
    fr: { title: "Ressources HUD Nebraska", desc: "Ressources fédérales de logement pour le Nebraska." },
    es: { title: "Recursos HUD de Nebraska", desc: "Recursos federales de vivienda para Nebraska." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/west_virginia",
  states: ["WV"],
  i18n: {
    en: { title: "HUD West Virginia Resources", desc: "Federal housing resources specific to West Virginia." },
    fr: { title: "Ressources HUD Virginie-Occidentale", desc: "Ressources fédérales de logement pour la Virginie-Occidentale." },
    es: { title: "Recursos HUD de Virginia Occidental", desc: "Recursos federales de vivienda para Virginia Occidental." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/maine",
  states: ["ME"],
  i18n: {
    en: { title: "HUD Maine Resources", desc: "Federal housing resources specific to Maine." },
    fr: { title: "Ressources HUD Maine", desc: "Ressources fédérales de logement pour le Maine." },
    es: { title: "Recursos HUD de Maine", desc: "Recursos federales de vivienda para Maine." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/new_hampshire",
  states: ["NH"],
  i18n: {
    en: { title: "HUD New Hampshire Resources", desc: "Federal housing resources specific to New Hampshire." },
    fr: { title: "Ressources HUD New Hampshire", desc: "Ressources fédérales de logement pour le New Hampshire." },
    es: { title: "Recursos HUD de New Hampshire", desc: "Recursos federales de vivienda para New Hampshire." },
  },
},

// UTILITIES (16)
{
  category: "Utilities",
  link: "https://www.tea.texas.gov/liheap",
  states: ["TX"],
  i18n: {
    en: { title: "Texas LIHEAP", desc: "State energy assistance program information for Texas." },
    fr: { title: "LIHEAP Texas", desc: "Informations sur le programme d'aide énergétique du Texas." },
    es: { title: "LIHEAP de Texas", desc: "Información del programa de asistencia energética de Texas." },
  },
},
{
  category: "Utilities",
  link: "https://www.myflfamilies.com/liheap",
  states: ["FL"],
  i18n: {
    en: { title: "Florida LIHEAP", desc: "State energy assistance program information for Florida." },
    fr: { title: "LIHEAP Floride", desc: "Informations sur le programme d'aide énergétique de la Floride." },
    es: { title: "LIHEAP de Florida", desc: "Información del programa de asistencia energética de Florida." },
  },
},
{
  category: "Utilities",
  link: "https://www.dhs.georgia.gov/liheap",
  states: ["GA"],
  i18n: {
    en: { title: "Georgia LIHEAP", desc: "State energy assistance program information for Georgia." },
    fr: { title: "LIHEAP Géorgie", desc: "Informations sur le programme d'aide énergétique de la Géorgie." },
    es: { title: "LIHEAP de Georgia", desc: "Información del programa de asistencia energética de Georgia." },
  },
},
{
  category: "Utilities",
  link: "https://www.des.az.gov/liheap",
  states: ["AZ"],
  i18n: {
    en: { title: "Arizona LIHEAP", desc: "State energy assistance program information for Arizona." },
    fr: { title: "LIHEAP Arizona", desc: "Informations sur le programme d'aide énergétique de l'Arizona." },
    es: { title: "LIHEAP de Arizona", desc: "Información del programa de asistencia energética de Arizona." },
  },
},
{
  category: "Utilities",
  link: "https://www.dwss.nv.gov/liheap",
  states: ["NV"],
  i18n: {
    en: { title: "Nevada LIHEAP", desc: "State energy assistance program information for Nevada." },
    fr: { title: "LIHEAP Nevada", desc: "Informations sur le programme d'aide énergétique du Nevada." },
    es: { title: "LIHEAP de Nevada", desc: "Información del programa de asistencia energética de Nevada." },
  },
},
{
  category: "Utilities",
  link: "https://www.nj.gov/dcf/liheap",
  states: ["NJ"],
  i18n: {
    en: { title: "New Jersey LIHEAP", desc: "State energy assistance program information for New Jersey." },
    fr: { title: "LIHEAP New Jersey", desc: "Informations sur le programme d'aide énergétique du New Jersey." },
    es: { title: "LIHEAP de Nueva Jersey", desc: "Información del programa de asistencia energética de Nueva Jersey." },
  },
},
{
  category: "Utilities",
  link: "https://www.jobs.utah.gov/liheap",
  states: ["UT"],
  i18n: {
    en: { title: "Utah LIHEAP", desc: "State energy assistance program information for Utah." },
    fr: { title: "LIHEAP Utah", desc: "Informations sur le programme d'aide énergétique de l'Utah." },
    es: { title: "LIHEAP de Utah", desc: "Información del programa de asistencia energética de Utah." },
  },
},
{
  category: "Utilities",
  link: "https://www.healthandwelfare.idaho.gov/liheap",
  states: ["ID"],
  i18n: {
    en: { title: "Idaho LIHEAP", desc: "State energy assistance program information for Idaho." },
    fr: { title: "LIHEAP Idaho", desc: "Informations sur le programme d'aide énergétique de l'Idaho." },
    es: { title: "LIHEAP de Idaho", desc: "Información del programa de asistencia energética de Idaho." },
  },
},
{
  category: "Utilities",
  link: "https://www.hsd.state.nm.us/liheap",
  states: ["NM"],
  i18n: {
    en: { title: "New Mexico LIHEAP", desc: "State energy assistance program information for New Mexico." },
    fr: { title: "LIHEAP Nouveau-Mexique", desc: "Informations sur le programme d'aide énergétique du Nouveau-Mexique." },
    es: { title: "LIHEAP de Nuevo México", desc: "Información del programa de asistencia energética de Nuevo México." },
  },
},
{
  category: "Utilities",
  link: "https://www.dcf.ks.gov/liheap",
  states: ["KS"],
  i18n: {
    en: { title: "Kansas LIHEAP", desc: "State energy assistance program information for Kansas." },
    fr: { title: "LIHEAP Kansas", desc: "Informations sur le programme d'aide énergétique du Kansas." },
    es: { title: "LIHEAP de Kansas", desc: "Información del programa de asistencia energética de Kansas." },
  },
},
{
  category: "Utilities",
  link: "https://www.dhs.arkansas.gov/liheap",
  states: ["AR"],
  i18n: {
    en: { title: "Arkansas LIHEAP", desc: "State energy assistance program information for Arkansas." },
    fr: { title: "LIHEAP Arkansas", desc: "Informations sur le programme d'aide énergétique de l'Arkansas." },
    es: { title: "LIHEAP de Arkansas", desc: "Información del programa de asistencia energética de Arkansas." },
  },
},
{
  category: "Utilities",
  link: "https://www.mdhs.ms.gov/liheap",
  states: ["MS"],
  i18n: {
    en: { title: "Mississippi LIHEAP", desc: "State energy assistance program information for Mississippi." },
    fr: { title: "LIHEAP Mississippi", desc: "Informations sur le programme d'aide énergétique du Mississippi." },
    es: { title: "LIHEAP de Mississippi", desc: "Información del programa de asistencia energética de Mississippi." },
  },
},
{
  category: "Utilities",
  link: "https://www.dhhs.ne.gov/liheap",
  states: ["NE"],
  i18n: {
    en: { title: "Nebraska LIHEAP", desc: "State energy assistance program information for Nebraska." },
    fr: { title: "LIHEAP Nebraska", desc: "Informations sur le programme d'aide énergétique du Nebraska." },
    es: { title: "LIHEAP de Nebraska", desc: "Información del programa de asistencia energética de Nebraska." },
  },
},
{
  category: "Utilities",
  link: "https://www.dhhr.wv.gov/liheap",
  states: ["WV"],
  i18n: {
    en: { title: "West Virginia LIHEAP", desc: "State energy assistance program information for West Virginia." },
    fr: { title: "LIHEAP Virginie-Occidentale", desc: "Informations sur le programme d'aide énergétique de la Virginie-Occidentale." },
    es: { title: "LIHEAP de Virginia Occidental", desc: "Información del programa de asistencia energética de Virginia Occidental." },
  },
},
{
  category: "Utilities",
  link: "https://www.maine.gov/liheap",
  states: ["ME"],
  i18n: {
    en: { title: "Maine LIHEAP", desc: "State energy assistance program information for Maine." },
    fr: { title: "LIHEAP Maine", desc: "Informations sur le programme d'aide énergétique du Maine." },
    es: { title: "LIHEAP de Maine", desc: "Información del programa de asistencia energética de Maine." },
  },
},
{
  category: "Utilities",
  link: "https://www.nh.gov/liheap",
  states: ["NH"],
  i18n: {
    en: { title: "New Hampshire LIHEAP", desc: "State energy assistance program information for New Hampshire." },
    fr: { title: "LIHEAP New Hampshire", desc: "Informations sur le programme d'aide énergétique du New Hampshire." },
    es: { title: "LIHEAP de New Hampshire", desc: "Información del programa de asistencia energética de New Hampshire." },
  },
},

// EDUCATION (18)
{
  category: "Education",
  link: "https://www.studentaid.gov/understand-aid/types/grants",
  i18n: {
    en: { title: "Federal Student Aid Grants Overview", desc: "Official overview of federal grant types available to students." },
    fr: { title: "Aperçu subventions fédérales aide étudiante", desc: "Aperçu officiel des types de subventions fédérales pour étudiants." },
    es: { title: "Resumen de Subvenciones Federales de Ayuda Estudiantil", desc: "Resumen oficial de tipos de subvenciones federales para estudiantes." },
  },
},
{
  category: "Education",
  link: "https://www.studentaid.gov/understand-aid/types/loans",
  i18n: {
    en: { title: "Federal Student Loans Overview", desc: "Official overview of federal student loan types and terms." },
    fr: { title: "Aperçu prêts étudiants fédéraux", desc: "Aperçu officiel des types de prêts étudiants fédéraux et conditions." },
    es: { title: "Resumen de Préstamos Estudiantiles Federales", desc: "Resumen oficial de tipos de préstamos estudiantiles federales y términos." },
  },
},
{
  category: "Education",
  link: "https://www.studentaid.gov/manage-loans/repayment/plans",
  i18n: {
    en: { title: "Federal Student Loan Repayment Plans", desc: "Official guide to income-driven and standard student loan repayment options." },
    fr: { title: "Plans remboursement prêts étudiants fédéraux", desc: "Guide officiel des options de remboursement de prêts étudiants." },
    es: { title: "Planes de Reembolso de Préstamos Estudiantiles Federales", desc: "Guía oficial de opciones de reembolso de préstamos estudiantiles." },
  },
},
{
  category: "Education",
  link: "https://www.studentaid.gov/manage-loans/forgiveness-cancellation",
  i18n: {
    en: { title: "Student Loan Forgiveness Programs", desc: "Official information on federal student loan forgiveness eligibility." },
    fr: { title: "Programmes annulation prêts étudiants", desc: "Informations officielles sur l'admissibilité à l'annulation de prêts étudiants." },
    es: { title: "Programas de Condonación de Préstamos Estudiantiles", desc: "Información oficial sobre elegibilidad de condonación de préstamos estudiantiles." },
  },
},
{
  category: "Education",
  link: "https://www.studentaid.gov/pslf/",
  i18n: {
    en: { title: "Public Service Loan Forgiveness", desc: "Federal program forgiving student loans for eligible public service workers." },
    fr: { title: "Public Service Loan Forgiveness", desc: "Programme fédéral d'annulation de prêts pour travailleurs du service public." },
    es: { title: "Condonación de Préstamos por Servicio Público", desc: "Programa federal que condona préstamos para trabajadores de servicio público elegibles." },
  },
},
{
  category: "Education",
  link: "https://www.studentaid.gov/help-center/answers/article/what-is-fafsa",
  i18n: {
    en: { title: "What is FAFSA Guide", desc: "Official beginner's guide to understanding and completing the FAFSA." },
    fr: { title: "Guide qu'est-ce que FAFSA", desc: "Guide officiel pour débutants sur la compréhension et le remplissage du FAFSA." },
    es: { title: "Guía de Qué es FAFSA", desc: "Guía oficial para principiantes sobre cómo entender y completar la FAFSA." },
  },
},
{
  category: "Education",
  link: "https://www.ed.gov/grants",
  i18n: {
    en: { title: "US Department of Education Grants", desc: "Official directory of federal education grants and funding opportunities." },
    fr: { title: "Subventions US Department of Education", desc: "Répertoire officiel des subventions fédérales à l'éducation." },
    es: { title: "Subvenciones del Departamento de Educación de EE.UU.", desc: "Directorio oficial de subvenciones federales de educación." },
  },
},
{
  category: "Education",
  link: "https://www.nea.org/professional-excellence/student-engagement/tools-tips",
  i18n: {
    en: { title: "NEA Student Engagement Tools", desc: "Educational tools and tips from the National Education Association." },
    fr: { title: "Outils engagement étudiant NEA", desc: "Outils et conseils éducatifs de la National Education Association." },
    es: { title: "Herramientas de Participación Estudiantil NEA", desc: "Herramientas y consejos educativos de la Asociación Nacional de Educación." },
  },
},
{
  category: "Education",
  link: "https://www.parentcenterhub.org",
  i18n: {
    en: { title: "Center for Parent Information and Resources", desc: "Resources for parents of children with disabilities navigating education." },
    fr: { title: "Centre information et ressources parents", desc: "Ressources pour parents d'enfants handicapés naviguant le système éducatif." },
    es: { title: "Centro de Información y Recursos para Padres", desc: "Recursos para padres de niños con discapacidades que navegan la educación." },
  },
},
{
  category: "Education",
  link: "https://www.copaa.org",
  i18n: {
    en: { title: "Council of Parent Attorneys and Advocates", desc: "Advocacy resources for families navigating special education rights." },
    fr: { title: "Conseil des avocats et défenseurs parentaux", desc: "Ressources de plaidoyer pour familles naviguant les droits d'éducation spécialisée." },
    es: { title: "Consejo de Abogados y Defensores de Padres", desc: "Recursos de defensa para familias que navegan derechos de educación especial." },
  },
},
{
  category: "Education",
  link: "https://www.pacer.org",
  i18n: {
    en: { title: "PACER Center", desc: "Resources and training for parents of children with disabilities." },
    fr: { title: "PACER Center", desc: "Ressources et formation pour parents d'enfants handicapés." },
    es: { title: "PACER Center", desc: "Recursos y capacitación para padres de niños con discapacidades." },
  },
},
{
  category: "Education",
  link: "https://www.parentcamp.org",
  i18n: {
    en: { title: "ParentCamp", desc: "Community-driven education resources and family engagement events." },
    fr: { title: "ParentCamp", desc: "Ressources éducatives communautaires et événements d'engagement familial." },
    es: { title: "ParentCamp", desc: "Recursos educativos comunitarios y eventos de participación familiar." },
  },
},
{
  category: "Education",
  link: "https://www.usa.gov/gifted-education",
  i18n: {
    en: { title: "USA.gov Gifted Education Guide", desc: "Government guide to gifted and talented education programs by state." },
    fr: { title: "Guide éducation douée USA.gov", desc: "Guide gouvernemental des programmes d'éducation pour surdoués par État." },
    es: { title: "Guía de Educación para Superdotados USA.gov", desc: "Guía del gobierno de programas de educación para superdotados por estado." },
  },
},
{
  category: "Education",
  link: "https://www.nagc.org",
  i18n: {
    en: { title: "National Association for Gifted Children", desc: "Resources supporting gifted and talented students and their families." },
    fr: { title: "Association nationale pour enfants doués", desc: "Ressources soutenant les élèves doués et talentueux et leurs familles." },
    es: { title: "Asociación Nacional para Niños Superdotados", desc: "Recursos que apoyan a estudiantes superdotados y talentosos y sus familias." },
  },
},
{
  category: "Education",
  link: "https://www.summerlearning.org",
  i18n: {
    en: { title: "National Summer Learning Association", desc: "Directory and resources for summer learning and enrichment programs." },
    fr: { title: "Association nationale apprentissage estival", desc: "Répertoire et ressources pour programmes d'apprentissage estival." },
    es: { title: "Asociación Nacional de Aprendizaje de Verano", desc: "Directorio y recursos para programas de aprendizaje y enriquecimiento de verano." },
  },
},
{
  category: "Education",
  link: "https://www.afterschoolalliance.org",
  i18n: {
    en: { title: "Afterschool Alliance", desc: "Directory and advocacy resources for afterschool program access." },
    fr: { title: "Afterschool Alliance", desc: "Répertoire et ressources de plaidoyer pour l'accès aux programmes après l'école." },
    es: { title: "Afterschool Alliance", desc: "Directorio y recursos de defensa para el acceso a programas después de la escuela." },
  },
},
{
  category: "Education",
  link: "https://www.4-h.org",
  i18n: {
    en: { title: "4-H Youth Development", desc: "Free and low-cost youth development programs in agriculture, STEM, and life skills." },
    fr: { title: "4-H développement jeunesse", desc: "Programmes gratuits de développement jeunesse en agriculture, STEM et compétences de vie." },
    es: { title: "Desarrollo Juvenil 4-H", desc: "Programas gratuitos de desarrollo juvenil en agricultura, STEM y habilidades de vida." },
  },
},
{
  category: "Education",
  link: "https://www.scouting.org",
  i18n: {
    en: { title: "Scouting America", desc: "Youth development programs with financial assistance available for families in need." },
    fr: { title: "Scouting America", desc: "Programmes de développement jeunesse avec aide financière pour familles dans le besoin." },
    es: { title: "Scouting America", desc: "Programas de desarrollo juvenil con ayuda financiera para familias necesitadas." },
  },
},

// INCOME (18)
{
  category: "Income",
  link: "https://www.ssa.gov/disability/",
  i18n: {
    en: { title: "Social Security Disability Insurance", desc: "Federal disability benefits for workers who paid into Social Security." },
    fr: { title: "Assurance invalidité Sécurité sociale", desc: "Prestations d'invalidité fédérales pour travailleurs ayant cotisé à la Sécurité sociale." },
    es: { title: "Seguro de Discapacidad del Seguro Social", desc: "Beneficios federales de discapacidad para trabajadores que contribuyeron al Seguro Social." },
  },
},
{
  category: "Income",
  link: "https://www.ssa.gov/ssi/",
  i18n: {
    en: { title: "Supplemental Security Income Overview", desc: "Federal income support for people with limited income and resources." },
    fr: { title: "Aperçu revenu de sécurité supplémentaire", desc: "Soutien de revenu fédéral pour personnes à ressources limitées." },
    es: { title: "Resumen de Ingreso de Seguridad Suplementario", desc: "Apoyo de ingreso federal para personas con recursos limitados." },
  },
},
{
  category: "Income",
  link: "https://www.ssa.gov/benefits/disability/qualify.html",
  i18n: {
    en: { title: "SSDI Qualification Requirements", desc: "Official requirements to qualify for Social Security Disability Insurance." },
    fr: { title: "Exigences qualification SSDI", desc: "Exigences officielles pour se qualifier pour l'assurance invalidité." },
    es: { title: "Requisitos de Calificación SSDI", desc: "Requisitos oficiales para calificar para el Seguro de Discapacidad." },
  },
},
{
  category: "Income",
  link: "https://www.disability-benefits-help.org",
  i18n: {
    en: { title: "Disability Benefits Help", desc: "Independent guide to navigating Social Security disability applications." },
    fr: { title: "Disability Benefits Help", desc: "Guide indépendant pour naviguer les demandes d'invalidité de la Sécurité sociale." },
    es: { title: "Disability Benefits Help", desc: "Guía independiente para navegar solicitudes de discapacidad del Seguro Social." },
  },
},
{
  category: "Income",
  link: "https://www.ssa.gov/appeals/",
  i18n: {
    en: { title: "Social Security Appeals Process", desc: "Official guide to appealing a denied Social Security benefits claim." },
    fr: { title: "Processus d'appel Sécurité sociale", desc: "Guide officiel pour faire appel d'une réclamation de prestations refusée." },
    es: { title: "Proceso de Apelación del Seguro Social", desc: "Guía oficial para apelar una reclamación de beneficios denegada." },
  },
},
{
  category: "Income",
  link: "https://www.nosscr.org",
  i18n: {
    en: { title: "National Organization of Social Security Claimants' Representatives", desc: "Directory of representatives helping with disability claims." },
    fr: { title: "Organisation nationale représentants réclamants", desc: "Répertoire de représentants aidant avec les réclamations d'invalidité." },
    es: { title: "Organización Nacional de Representantes de Reclamantes", desc: "Directorio de representantes que ayudan con reclamaciones de discapacidad." },
  },
},
{
  category: "Income",
  link: "https://www.benefits.gov/benefit/1540",
  i18n: {
    en: { title: "Benefits.gov SSI Benefit Details", desc: "Official federal benefit finder details page for SSI." },
    fr: { title: "Détails prestation SSI Benefits.gov", desc: "Page officielle de détails de prestation SSI du chercheur fédéral." },
    es: { title: "Detalles del Beneficio SSI Benefits.gov", desc: "Página oficial de detalles del beneficio SSI del buscador federal." },
  },
},
{
  category: "Income",
  link: "https://www.benefits.gov",
  i18n: {
    en: { title: "Benefits.gov Benefit Finder", desc: "Official federal tool to screen and find government benefits you qualify for." },
    fr: { title: "Chercheur de prestations Benefits.gov", desc: "Outil fédéral officiel pour trouver les prestations gouvernementales admissibles." },
    es: { title: "Buscador de Beneficios Benefits.gov", desc: "Herramienta federal oficial para encontrar beneficios gubernamentales elegibles." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/benefits",
  i18n: {
    en: { title: "USA.gov Benefits Overview", desc: "Government overview of available federal benefit programs." },
    fr: { title: "Aperçu prestations USA.gov", desc: "Aperçu gouvernemental des programmes de prestations fédérales disponibles." },
    es: { title: "Resumen de Beneficios USA.gov", desc: "Resumen del gobierno de programas de beneficios federales disponibles." },
  },
},
{
  category: "Income",
  link: "https://www.ssa.gov/pubs/EN-05-10035.pdf",
  i18n: {
    en: { title: "SSA Working While Disabled Guide", desc: "Official guide on how working affects Social Security disability benefits." },
    fr: { title: "Guide travail avec invalidité SSA", desc: "Guide officiel sur l'impact du travail sur les prestations d'invalidité." },
    es: { title: "Guía SSA de Trabajar con Discapacidad", desc: "Guía oficial sobre cómo el trabajo afecta los beneficios por discapacidad." },
  },
},
{
  category: "Income",
  link: "https://www.ssa.gov/redbook/",
  i18n: {
    en: { title: "SSA Red Book Work Incentives Guide", desc: "Official guide to work incentives for Social Security disability beneficiaries." },
    fr: { title: "Guide incitations travail Red Book SSA", desc: "Guide officiel des incitations au travail pour bénéficiaires d'invalidité." },
    es: { title: "Guía de Incentivos de Trabajo Red Book SSA", desc: "Guía oficial de incentivos de trabajo para beneficiarios de discapacidad." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/odep",
  i18n: {
    en: { title: "Office of Disability Employment Policy", desc: "Federal resources supporting employment for people with disabilities." },
    fr: { title: "Bureau politique emploi handicap", desc: "Ressources fédérales soutenant l'emploi des personnes handicapées." },
    es: { title: "Oficina de Política de Empleo para Discapacitados", desc: "Recursos federales que apoyan el empleo de personas con discapacidades." },
  },
},
{
  category: "Income",
  link: "https://www.askjan.org",
  i18n: {
    en: { title: "Job Accommodation Network", desc: "Free guidance on workplace accommodations for employees with disabilities." },
    fr: { title: "Job Accommodation Network", desc: "Conseils gratuits sur les aménagements de travail pour employés handicapés." },
    es: { title: "Job Accommodation Network", desc: "Orientación gratuita sobre adaptaciones laborales para empleados con discapacidades." },
  },
},
{
  category: "Income",
  link: "https://www.abilitiesinmotion.org",
  i18n: {
    en: { title: "Abilities in Motion", desc: "Employment support and independent living services for people with disabilities." },
    fr: { title: "Abilities in Motion", desc: "Soutien à l'emploi et services de vie autonome pour personnes handicapées." },
    es: { title: "Abilities in Motion", desc: "Apoyo de empleo y servicios de vida independiente para personas con discapacidades." },
  },
},
{
  category: "Income",
  link: "https://www.ncil.org",
  i18n: {
    en: { title: "National Council on Independent Living", desc: "Directory of centers supporting independent living for people with disabilities." },
    fr: { title: "Conseil national vie autonome", desc: "Répertoire de centres soutenant la vie autonome pour personnes handicapées." },
    es: { title: "Consejo Nacional de Vida Independiente", desc: "Directorio de centros que apoyan la vida independiente para personas con discapacidades." },
  },
},
{
  category: "Income",
  link: "https://www.ilru.org/projects/cil-net/cil-center-and-association-directory",
  i18n: {
    en: { title: "Center for Independent Living Directory", desc: "Directory of local centers offering independent living support services." },
    fr: { title: "Répertoire centres vie autonome", desc: "Répertoire de centres locaux offrant des services de soutien à la vie autonome." },
    es: { title: "Directorio de Centros de Vida Independiente", desc: "Directorio de centros locales que ofrecen servicios de apoyo de vida independiente." },
  },
},
{
  category: "Income",
  link: "https://www.easterseals.com",
  i18n: {
    en: { title: "Easterseals", desc: "Services supporting people with disabilities including employment and financial resources." },
    fr: { title: "Easterseals", desc: "Services soutenant les personnes handicapées, incluant emploi et ressources financières." },
    es: { title: "Easterseals", desc: "Servicios que apoyan a personas con discapacidades, incluyendo empleo y recursos financieros." },
  },
},
{
  category: "Income",
  link: "https://www.thearc.org",
  i18n: {
    en: { title: "The Arc", desc: "Advocacy and support services for people with intellectual and developmental disabilities." },
    fr: { title: "The Arc", desc: "Services de plaidoyer et de soutien pour personnes ayant un handicap intellectuel." },
    es: { title: "The Arc", desc: "Servicios de defensa y apoyo para personas con discapacidades intelectuales y del desarrollo." },
  },
},
    // ===== PROGRAMS 1101-1300 =====

// FOOD (32)
{
  category: "Food",
  link: "https://www.acf.hhs.gov/ocs/programs/csfp/csfp-state-agencies",
  i18n: {
    en: { title: "CSFP State Agency Directory", desc: "Official directory of state agencies administering the senior food box program." },
    fr: { title: "Répertoire agences d'État CSFP", desc: "Répertoire officiel des agences d'État administrant le programme de colis alimentaires." },
    es: { title: "Directorio de Agencias Estatales CSFP", desc: "Directorio oficial de agencias estatales que administran el programa de cajas de alimentos." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/nslp/nslp-application-process",
  i18n: {
    en: { title: "National School Lunch Application Process", desc: "Step-by-step official guide to applying for free or reduced school lunch." },
    fr: { title: "Processus demande repas scolaire national", desc: "Guide officiel étape par étape pour demander un repas scolaire gratuit ou réduit." },
    es: { title: "Proceso de Solicitud del Almuerzo Escolar Nacional", desc: "Guía oficial paso a paso para solicitar almuerzo escolar gratuito o reducido." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/cacfp",
  i18n: {
    en: { title: "Child and Adult Care Food Program", desc: "Federal program providing meals to children and adults in daycare settings." },
    fr: { title: "Programme alimentaire garde enfants et adultes", desc: "Programme fédéral offrant des repas aux enfants et adultes en garderie." },
    es: { title: "Programa de Alimentos para el Cuidado de Niños y Adultos", desc: "Programa federal que proporciona comidas a niños y adultos en guarderías." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/cacfp/adult-day-care",
  i18n: {
    en: { title: "CACFP Adult Day Care Meals", desc: "Meal benefits for eligible adults attending day care programs." },
    fr: { title: "Repas CACFP garderie adultes", desc: "Prestations de repas pour adultes admissibles fréquentant des programmes de jour." },
    es: { title: "Comidas CACFP para Cuidado de Adultos", desc: "Beneficios de comida para adultos elegibles que asisten a programas diurnos." },
  },
},
{
  category: "Food",
  link: "https://www.foodsecurity.org",
  i18n: {
    en: { title: "Community Food Security Coalition Resources", desc: "Advocacy and research resources on building local food security." },
    fr: { title: "Ressources Community Food Security Coalition", desc: "Ressources de plaidoyer et recherche sur la sécurité alimentaire locale." },
    es: { title: "Recursos Community Food Security Coalition", desc: "Recursos de defensa e investigación sobre seguridad alimentaria local." },
  },
},
{
  category: "Food",
  link: "https://www.freshplacecville.org",
  i18n: {
    en: { title: "Fresh Farmacy Model Programs", desc: "Example of a healthcare-partnered fresh food prescription program." },
    fr: { title: "Programmes modèle Fresh Farmacy", desc: "Exemple de programme de prescription d'aliments frais en partenariat médical." },
    es: { title: "Programas Modelo Fresh Farmacy", desc: "Ejemplo de programa de prescripción de alimentos frescos en asociación médica." },
  },
},
{
  category: "Food",
  link: "https://www.wholesomewave.org/our-work/produce-prescriptions",
  i18n: {
    en: { title: "Produce Prescription Programs", desc: "Programs where doctors prescribe fruits and vegetables to at-risk patients." },
    fr: { title: "Programmes prescription de produits", desc: "Programmes où les médecins prescrivent fruits et légumes aux patients à risque." },
    es: { title: "Programas de Prescripción de Productos", desc: "Programas donde los médicos recetan frutas y verduras a pacientes en riesgo." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/gusnip",
  i18n: {
    en: { title: "GusNIP Nutrition Incentive Program", desc: "Federal program funding fruit and vegetable incentives for SNAP participants." },
    fr: { title: "Programme incitation nutrition GusNIP", desc: "Programme fédéral finançant des incitations aux fruits et légumes pour bénéficiaires SNAP." },
    es: { title: "Programa de Incentivo Nutricional GusNIP", desc: "Programa federal que financia incentivos de frutas y verduras para participantes de SNAP." },
  },
},
{
  category: "Food",
  link: "https://www.doublevalue.org",
  i18n: {
    en: { title: "Double Up Food Bucks Info", desc: "Programs that double SNAP dollars when spent on fresh fruits and vegetables." },
    fr: { title: "Info Double Up Food Bucks", desc: "Programmes doublant les dollars SNAP dépensés en fruits et légumes frais." },
    es: { title: "Información Double Up Food Bucks", desc: "Programas que duplican los dólares de SNAP gastados en frutas y verduras frescas." },
  },
},
{
  category: "Food",
  link: "https://www.fairfoodnetwork.org/programs/double-up-food-bucks/",
  i18n: {
    en: { title: "Fair Food Network Double Up Food Bucks", desc: "Original Double Up Food Bucks program matching SNAP spending on produce." },
    fr: { title: "Fair Food Network Double Up Food Bucks", desc: "Programme original doublant les dépenses SNAP en produits frais." },
    es: { title: "Fair Food Network Double Up Food Bucks", desc: "Programa original que iguala el gasto de SNAP en productos frescos." },
  },
},
{
  category: "Food",
  link: "https://www.foodcorps.org",
  i18n: {
    en: { title: "FoodCorps", desc: "School-based programs teaching children about food, gardening, and nutrition." },
    fr: { title: "FoodCorps", desc: "Programmes scolaires enseignant aux enfants l'alimentation et la nutrition." },
    es: { title: "FoodCorps", desc: "Programas escolares que enseñan a los niños sobre alimentación y nutrición." },
  },
},
{
  category: "Food",
  link: "https://www.chefsmovetoschools.org",
  i18n: {
    en: { title: "Chefs Move to Schools", desc: "Program connecting professional chefs with schools to improve meal quality." },
    fr: { title: "Chefs Move to Schools", desc: "Programme reliant chefs professionnels et écoles pour améliorer la qualité des repas." },
    es: { title: "Chefs Move to Schools", desc: "Programa que conecta chefs profesionales con escuelas para mejorar la calidad de comidas." },
  },
},
{
  category: "Food",
  link: "https://www.actionforhealthykids.org",
  i18n: {
    en: { title: "Action for Healthy Kids", desc: "Grants and resources supporting healthier school food and physical activity." },
    fr: { title: "Action for Healthy Kids", desc: "Subventions et ressources soutenant une alimentation scolaire plus saine." },
    es: { title: "Action for Healthy Kids", desc: "Subvenciones y recursos que apoyan comida escolar más saludable y actividad física." },
  },
},
{
  category: "Food",
  link: "https://www.schoolnutrition.org",
  i18n: {
    en: { title: "School Nutrition Association Resources", desc: "Professional resources and advocacy for school meal program quality." },
    fr: { title: "Ressources School Nutrition Association", desc: "Ressources professionnelles et plaidoyer pour la qualité des repas scolaires." },
    es: { title: "Recursos School Nutrition Association", desc: "Recursos profesionales y defensa para la calidad de programas de comida escolar." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/cn/community-eligibility-provision",
  i18n: {
    en: { title: "Community Eligibility Provision", desc: "Federal option letting high-poverty schools offer free meals to all students." },
    fr: { title: "Disposition d'admissibilité communautaire", desc: "Option fédérale permettant aux écoles pauvres d'offrir des repas gratuits à tous." },
    es: { title: "Disposición de Elegibilidad Comunitaria", desc: "Opción federal que permite a escuelas de alta pobreza ofrecer comida gratis a todos." },
  },
},
{
  category: "Food",
  link: "https://www.frac.org/community-eligibility",
  i18n: {
    en: { title: "FRAC Community Eligibility Resources", desc: "Advocacy resources helping schools adopt universal free meal policies." },
    fr: { title: "Ressources admissibilité communautaire FRAC", desc: "Ressources de plaidoyer aidant les écoles à adopter des repas gratuits universels." },
    es: { title: "Recursos de Elegibilidad Comunitaria FRAC", desc: "Recursos de defensa que ayudan a escuelas a adoptar comida gratuita universal." },
  },
},
{
  category: "Food",
  link: "https://www.mealsforkidsnearme.org",
  i18n: {
    en: { title: "Meals for Kids Near Me Finder", desc: "Search tool for free summer meal sites for children nationwide." },
    fr: { title: "Recherche repas enfants proches", desc: "Outil de recherche pour sites de repas d'été gratuits pour enfants." },
    es: { title: "Buscador de Comidas para Niños Cerca de Mí", desc: "Herramienta de búsqueda de sitios de comida de verano gratuita para niños." },
  },
},
{
  category: "Food",
  link: "https://www.summerfoodsites.org",
  i18n: {
    en: { title: "Summer Food Sites Directory", desc: "Directory of summer meal program locations for children out of school." },
    fr: { title: "Répertoire sites repas d'été", desc: "Répertoire des emplacements de programmes de repas d'été pour enfants." },
    es: { title: "Directorio de Sitios de Comida de Verano", desc: "Directorio de ubicaciones de programas de comida de verano para niños." },
  },
},
{
  category: "Food",
  link: "https://www.nokidhungry.org/find-help",
  i18n: {
    en: { title: "No Kid Hungry Find Help", desc: "Search tool to find free meal programs for kids in your area." },
    fr: { title: "Trouver de l'aide No Kid Hungry", desc: "Outil de recherche pour trouver des programmes de repas gratuits pour enfants." },
    es: { title: "Encuentre Ayuda No Kid Hungry", desc: "Herramienta de búsqueda para encontrar programas de comida gratuita para niños." },
  },
},
{
  category: "Food",
  link: "https://www.summereats.org",
  i18n: {
    en: { title: "Summer Eats", desc: "Directory connecting families to free summer meal sites for kids." },
    fr: { title: "Summer Eats", desc: "Répertoire reliant les familles aux sites de repas d'été gratuits pour enfants." },
    es: { title: "Summer Eats", desc: "Directorio que conecta a familias con sitios de comida de verano gratuita para niños." },
  },
},
{
  category: "Food",
  link: "https://www.hungerfreecolorado.org",
  states: ["CO"],
  i18n: {
    en: { title: "Hunger Free Colorado", desc: "Statewide hunger relief hotline and food resource connection service." },
    fr: { title: "Hunger Free Colorado", desc: "Ligne d'aide contre la faim et service de connexion aux ressources alimentaires." },
    es: { title: "Hunger Free Colorado", desc: "Línea de ayuda contra el hambre y servicio de conexión de recursos alimentarios." },
  },
},
{
  category: "Food",
  link: "https://www.mazon.org/state-advocacy",
  i18n: {
    en: { title: "MAZON State Hunger Advocacy", desc: "State-level advocacy resources for ending hunger through policy." },
    fr: { title: "Plaidoyer faim par État MAZON", desc: "Ressources de plaidoyer au niveau de l'État pour mettre fin à la faim." },
    es: { title: "Defensa Estatal contra el Hambre MAZON", desc: "Recursos de defensa a nivel estatal para acabar con el hambre." },
  },
},
{
  category: "Food",
  link: "https://www.txhunger.org",
  states: ["TX"],
  i18n: {
    en: { title: "Texas Hunger Initiative", desc: "Statewide coalition connecting Texans to food assistance resources." },
    fr: { title: "Texas Hunger Initiative", desc: "Coalition à l'échelle de l'État reliant les Texans aux ressources d'aide alimentaire." },
    es: { title: "Texas Hunger Initiative", desc: "Coalición estatal que conecta a los tejanos con recursos de asistencia alimentaria." },
  },
},
{
  category: "Food",
  link: "https://www.flhunger.org",
  states: ["FL"],
  i18n: {
    en: { title: "Feeding Florida", desc: "Statewide network of food banks serving all Florida counties." },
    fr: { title: "Feeding Florida", desc: "Réseau à l'échelle de l'État de banques alimentaires desservant tous les comtés." },
    es: { title: "Feeding Florida", desc: "Red estatal de bancos de alimentos que sirve a todos los condados de Florida." },
  },
},
{
  category: "Food",
  link: "https://www.gafoodbanks.org",
  states: ["GA"],
  i18n: {
    en: { title: "Georgia Food Bank Association", desc: "Statewide association coordinating food bank services across Georgia." },
    fr: { title: "Georgia Food Bank Association", desc: "Association d'État coordonnant les services de banque alimentaire en Géorgie." },
    es: { title: "Georgia Food Bank Association", desc: "Asociación estatal que coordina servicios de bancos de alimentos en Georgia." },
  },
},
{
  category: "Food",
  link: "https://www.azfoodbanks.org",
  states: ["AZ"],
  i18n: {
    en: { title: "Arizona Food Bank Network", desc: "Statewide network coordinating food bank services across Arizona." },
    fr: { title: "Arizona Food Bank Network", desc: "Réseau à l'échelle de l'État coordonnant les services de banque alimentaire en Arizona." },
    es: { title: "Arizona Food Bank Network", desc: "Red estatal que coordina servicios de bancos de alimentos en Arizona." },
  },
},
{
  category: "Food",
  link: "https://www.nvfoodbank.org",
  states: ["NV"],
  i18n: {
    en: { title: "Three Square Food Bank", desc: "Regional food bank network serving southern Nevada communities." },
    fr: { title: "Three Square Food Bank", desc: "Réseau régional de banque alimentaire desservant le sud du Nevada." },
    es: { title: "Three Square Food Bank", desc: "Red regional de banco de alimentos que sirve al sur de Nevada." },
  },
},
{
  category: "Food",
  link: "https://www.cfbnj.org",
  states: ["NJ"],
  i18n: {
    en: { title: "Community FoodBank of New Jersey", desc: "Largest anti-hunger organization serving communities across New Jersey." },
    fr: { title: "Community FoodBank of New Jersey", desc: "Plus grande organisation de lutte contre la faim du New Jersey." },
    es: { title: "Community FoodBank of New Jersey", desc: "La organización contra el hambre más grande de Nueva Jersey." },
  },
},
{
  category: "Food",
  link: "https://www.uofoodbank.org",
  states: ["UT"],
  i18n: {
    en: { title: "Utah Food Bank", desc: "Statewide food bank network distributing food across Utah communities." },
    fr: { title: "Utah Food Bank", desc: "Réseau alimentaire à l'échelle de l'État distribuant de la nourriture en Utah." },
    es: { title: "Utah Food Bank", desc: "Red estatal de banco de alimentos que distribuye comida en comunidades de Utah." },
  },
},
{
  category: "Food",
  link: "https://www.idahofoodbank.org",
  states: ["ID"],
  i18n: {
    en: { title: "Idaho Foodbank", desc: "Statewide food bank network distributing food across Idaho communities." },
    fr: { title: "Idaho Foodbank", desc: "Réseau alimentaire à l'échelle de l'État distribuant de la nourriture en Idaho." },
    es: { title: "Idaho Foodbank", desc: "Red estatal de banco de alimentos que distribuye comida en comunidades de Idaho." },
  },
},
{
  category: "Food",
  link: "https://www.rrfb.org",
  states: ["NM"],
  i18n: {
    en: { title: "Roadrunner Food Bank", desc: "Largest food bank network in New Mexico serving statewide communities." },
    fr: { title: "Roadrunner Food Bank", desc: "Plus grand réseau de banque alimentaire du Nouveau-Mexique." },
    es: { title: "Roadrunner Food Bank", desc: "La red de banco de alimentos más grande de Nuevo México." },
  },
},
{
  category: "Food",
  link: "https://www.kansasfoodbank.org",
  states: ["KS"],
  i18n: {
    en: { title: "Kansas Food Bank", desc: "Statewide food bank network distributing food across Kansas communities." },
    fr: { title: "Kansas Food Bank", desc: "Réseau alimentaire à l'échelle de l'État distribuant de la nourriture au Kansas." },
    es: { title: "Kansas Food Bank", desc: "Red estatal de banco de alimentos que distribuye comida en comunidades de Kansas." },
  },
},

// HEALTH (36)
{
  category: "Health",
  link: "https://www.hrsa.gov/opa/index.html",
  i18n: {
    en: { title: "HRSA 340B Drug Pricing Program Info", desc: "Federal program info allowing eligible clinics to buy discounted medications." },
    fr: { title: "Info programme prix médicaments 340B HRSA", desc: "Informations sur le programme fédéral d'achat de médicaments à prix réduit." },
    es: { title: "Información del Programa de Precios de Medicamentos 340B HRSA", desc: "Información del programa federal de compra de medicamentos con descuento." },
  },
},
{
  category: "Health",
  link: "https://www.needymeds.org",
  i18n: {
    en: { title: "NeedyMeds", desc: "Database of programs helping people afford medications and healthcare costs." },
    fr: { title: "NeedyMeds", desc: "Base de données de programmes aidant à payer médicaments et soins de santé." },
    es: { title: "NeedyMeds", desc: "Base de datos de programas que ayudan a pagar medicamentos y atención médica." },
  },
},
{
  category: "Health",
  link: "https://www.rxassist.org",
  i18n: {
    en: { title: "RxAssist", desc: "Directory of pharmaceutical patient assistance programs by drug and company." },
    fr: { title: "RxAssist", desc: "Répertoire de programmes d'aide aux patients pharmaceutiques par médicament." },
    es: { title: "RxAssist", desc: "Directorio de programas de asistencia a pacientes farmacéuticos por medicamento." },
  },
},
{
  category: "Health",
  link: "https://www.pparx.org",
  i18n: {
    en: { title: "Partnership for Prescription Assistance", desc: "Connects eligible patients with free or low-cost medication programs." },
    fr: { title: "Partnership for Prescription Assistance", desc: "Relie les patients admissibles à des programmes de médicaments gratuits." },
    es: { title: "Partnership for Prescription Assistance", desc: "Conecta a pacientes elegibles con programas de medicamentos gratuitos." },
  },
},
{
  category: "Health",
  link: "https://www.rxhope.com",
  i18n: {
    en: { title: "RxHope", desc: "Online platform simplifying access to pharmaceutical patient assistance programs." },
    fr: { title: "RxHope", desc: "Plateforme en ligne simplifiant l'accès aux programmes d'aide pharmaceutique." },
    es: { title: "RxHope", desc: "Plataforma en línea que simplifica el acceso a programas de asistencia farmacéutica." },
  },
},
{
  category: "Health",
  link: "https://www.goodrx.com",
  i18n: {
    en: { title: "GoodRx", desc: "Free prescription discount coupons accepted at most major pharmacies." },
    fr: { title: "GoodRx", desc: "Coupons de rabais gratuits sur ordonnance acceptés dans la plupart des pharmacies." },
    es: { title: "GoodRx", desc: "Cupones de descuento de recetas gratuitos aceptados en la mayoría de farmacias." },
  },
},
{
  category: "Health",
  link: "https://www.costplusdrugs.com",
  i18n: {
    en: { title: "Cost Plus Drugs", desc: "Low-markup online pharmacy offering affordable generic medications." },
    fr: { title: "Cost Plus Drugs", desc: "Pharmacie en ligne à faible marge offrant des médicaments génériques abordables." },
    es: { title: "Cost Plus Drugs", desc: "Farmacia en línea de bajo margen que ofrece medicamentos genéricos asequibles." },
  },
},
{
  category: "Health",
  link: "https://www.amerisourcebergen.com/patient-assistance",
  i18n: {
    en: { title: "AmerisourceBergen Patient Assistance Info", desc: "Information on manufacturer patient assistance program access." },
    fr: { title: "Info aide patients AmerisourceBergen", desc: "Informations sur l'accès aux programmes d'aide aux patients des fabricants." },
    es: { title: "Información de Asistencia al Paciente AmerisourceBergen", desc: "Información sobre acceso a programas de asistencia al paciente de fabricantes." },
  },
},
{
  category: "Health",
  link: "https://www.medicare.gov/basics/get-started-with-medicare",
  i18n: {
    en: { title: "Medicare Get Started Guide", desc: "Official federal guide to understanding and enrolling in Medicare." },
    fr: { title: "Guide démarrage Medicare", desc: "Guide fédéral officiel pour comprendre et s'inscrire à Medicare." },
    es: { title: "Guía para Comenzar con Medicare", desc: "Guía federal oficial para entender e inscribirse en Medicare." },
  },
},
{
  category: "Health",
  link: "https://www.medicare.gov/basics/costs/help",
  i18n: {
    en: { title: "Medicare Cost Help Programs", desc: "Official information on programs helping pay Medicare premiums and costs." },
    fr: { title: "Programmes aide coûts Medicare", desc: "Informations officielles sur les programmes d'aide aux primes Medicare." },
    es: { title: "Programas de Ayuda con Costos de Medicare", desc: "Información oficial sobre programas de ayuda con primas de Medicare." },
  },
},
{
  category: "Health",
  link: "https://www.medicare.gov/plan-compare",
  i18n: {
    en: { title: "Medicare Plan Compare Tool", desc: "Official tool to compare Medicare plans and costs in your area." },
    fr: { title: "Outil comparaison plans Medicare", desc: "Outil officiel pour comparer les plans et coûts Medicare dans votre région." },
    es: { title: "Herramienta de Comparación de Planes Medicare", desc: "Herramienta oficial para comparar planes y costos de Medicare en su área." },
  },
},
{
  category: "Health",
  link: "https://www.shiphelp.org",
  i18n: {
    en: { title: "State Health Insurance Assistance Program", desc: "Free, unbiased Medicare counseling available in every state." },
    fr: { title: "Programme d'aide assurance santé d'État", desc: "Conseil Medicare gratuit et impartial disponible dans chaque État." },
    es: { title: "Programa Estatal de Asistencia de Seguro de Salud", desc: "Consejería de Medicare gratuita e imparcial disponible en cada estado." },
  },
},
{
  category: "Health",
  link: "https://www.medicaid.gov/about-us/beneficiary-resources/index.html",
  i18n: {
    en: { title: "Medicaid Beneficiary Resources", desc: "Official federal resources for current and prospective Medicaid beneficiaries." },
    fr: { title: "Ressources bénéficiaires Medicaid", desc: "Ressources fédérales officielles pour bénéficiaires actuels et potentiels de Medicaid." },
    es: { title: "Recursos para Beneficiarios de Medicaid", desc: "Recursos federales oficiales para beneficiarios actuales y potenciales de Medicaid." },
  },
},
{
  category: "Health",
  link: "https://www.medicaid.gov/state-overviews/index.html",
  i18n: {
    en: { title: "Medicaid State Overview Pages", desc: "Official state-by-state overview of Medicaid programs and eligibility." },
    fr: { title: "Pages aperçu Medicaid par État", desc: "Aperçu officiel État par État des programmes et admissibilité Medicaid." },
    es: { title: "Páginas de Resumen Estatal de Medicaid", desc: "Resumen oficial estado por estado de programas y elegibilidad de Medicaid." },
  },
},
{
  category: "Health",
  link: "https://www.cms.gov/marketplace/agents-brokers/find-local-help",
  i18n: {
    en: { title: "CMS Find Local Marketplace Help", desc: "Official tool to find local certified marketplace enrollment assisters." },
    fr: { title: "Trouver aide locale marché CMS", desc: "Outil officiel pour trouver des assistants d'inscription certifiés locaux." },
    es: { title: "Encuentre Ayuda Local del Mercado CMS", desc: "Herramienta oficial para encontrar asistentes de inscripción certificados locales." },
  },
},
{
  category: "Health",
  link: "https://www.healthcare.gov/how-plans-work/",
  i18n: {
    en: { title: "HealthCare.gov How Plans Work", desc: "Official guide explaining how marketplace health insurance plans work." },
    fr: { title: "Fonctionnement plans HealthCare.gov", desc: "Guide officiel expliquant le fonctionnement des plans du marché de l'assurance." },
    es: { title: "Cómo Funcionan los Planes HealthCare.gov", desc: "Guía oficial que explica cómo funcionan los planes del mercado de seguros." },
  },
},
{
  category: "Health",
  link: "https://www.healthcare.gov/lower-costs/",
  i18n: {
    en: { title: "HealthCare.gov Lower Your Costs", desc: "Official information on subsidies that can lower marketplace insurance costs." },
    fr: { title: "Réduire vos coûts HealthCare.gov", desc: "Informations officielles sur les subventions réduisant les coûts d'assurance." },
    es: { title: "Reduzca sus Costos HealthCare.gov", desc: "Información oficial sobre subsidios que pueden reducir los costos del mercado de seguros." },
  },
},
{
  category: "Health",
  link: "https://www.kff.org/state-health-facts",
  i18n: {
    en: { title: "KFF State Health Facts", desc: "Independent research data on state-level health coverage and policy." },
    fr: { title: "KFF State Health Facts", desc: "Données de recherche indépendantes sur la couverture santé au niveau des États." },
    es: { title: "KFF State Health Facts", desc: "Datos de investigación independiente sobre cobertura de salud a nivel estatal." },
  },
},
{
  category: "Health",
  link: "https://www.communitycatalyst.org/our-work/health-care-access",
  i18n: {
    en: { title: "Community Catalyst Health Care Access", desc: "Advocacy resources focused on expanding health care access." },
    fr: { title: "Accès soins de santé Community Catalyst", desc: "Ressources de plaidoyer axées sur l'élargissement de l'accès aux soins." },
    es: { title: "Acceso a Atención Médica Community Catalyst", desc: "Recursos de defensa enfocados en ampliar el acceso a la atención médica." },
  },
},
{
  category: "Health",
  link: "https://www.211.org/services/prescription-assistance",
  i18n: {
    en: { title: "211 Prescription Assistance Directory", desc: "Local prescription assistance program referrals through the 211 network." },
    fr: { title: "Répertoire aide ordonnance 211", desc: "Orientation vers programmes d'aide aux ordonnances via le réseau 211." },
    es: { title: "Directorio de Asistencia de Recetas 211", desc: "Referencias de programas de asistencia de recetas a través de la red 211." },
  },
},
{
  category: "Health",
  link: "https://www.togetherrxaccess.com",
  i18n: {
    en: { title: "Together Rx Access Card", desc: "Free prescription savings card for people without prescription insurance." },
    fr: { title: "Carte Together Rx Access", desc: "Carte d'économies gratuite sur ordonnance pour personnes sans assurance médicaments." },
    es: { title: "Tarjeta Together Rx Access", desc: "Tarjeta de ahorro de recetas gratuita para personas sin seguro de medicamentos." },
  },
},
{
  category: "Health",
  link: "https://www.freerxplus.com",
  i18n: {
    en: { title: "Free Rx Plus", desc: "Prescription discount card program offering savings at participating pharmacies." },
    fr: { title: "Free Rx Plus", desc: "Programme de carte de rabais sur ordonnance offrant des économies en pharmacie." },
    es: { title: "Free Rx Plus", desc: "Programa de tarjeta de descuento de recetas que ofrece ahorros en farmacias participantes." },
  },
},
{
  category: "Health",
  link: "https://www.rxsaver.com",
  i18n: {
    en: { title: "RxSaver", desc: "Prescription price comparison and discount coupon platform." },
    fr: { title: "RxSaver", desc: "Plateforme de comparaison de prix et de coupons de rabais sur ordonnance." },
    es: { title: "RxSaver", desc: "Plataforma de comparación de precios y cupones de descuento de recetas." },
  },
},
{
  category: "Health",
  link: "https://www.familywize.org",
  i18n: {
    en: { title: "FamilyWize", desc: "Free prescription discount card for uninsured and underinsured individuals." },
    fr: { title: "FamilyWize", desc: "Carte de rabais gratuite sur ordonnance pour personnes non ou sous-assurées." },
    es: { title: "FamilyWize", desc: "Tarjeta de descuento de recetas gratuita para personas sin seguro o con seguro insuficiente." },
  },
},
{
  category: "Health",
  link: "https://www.optumperks.com",
  i18n: {
    en: { title: "Optum Perks", desc: "Free prescription discount card and price comparison tool." },
    fr: { title: "Optum Perks", desc: "Carte de rabais gratuite sur ordonnance et outil de comparaison de prix." },
    es: { title: "Optum Perks", desc: "Tarjeta de descuento de recetas gratuita y herramienta de comparación de precios." },
  },
},
{
  category: "Health",
  link: "https://www.scriptsave.com",
  i18n: {
    en: { title: "ScriptSave WellRx", desc: "Free prescription savings program with pharmacy price comparison." },
    fr: { title: "ScriptSave WellRx", desc: "Programme d'économies sur ordonnance gratuit avec comparaison de prix en pharmacie." },
    es: { title: "ScriptSave WellRx", desc: "Programa gratuito de ahorro de recetas con comparación de precios de farmacia." },
  },
},
{
  category: "Health",
  link: "https://www.aarpmedicareplans.com",
  i18n: {
    en: { title: "AARP Medicare Plan Resources", desc: "Medicare plan information and resources for older adults." },
    fr: { title: "Ressources plans Medicare AARP", desc: "Informations et ressources sur les plans Medicare pour aînés." },
    es: { title: "Recursos de Planes Medicare AARP", desc: "Información y recursos de planes Medicare para adultos mayores." },
  },
},
{
  category: "Health",
  link: "https://www.medicarerights.org",
  i18n: {
    en: { title: "Medicare Rights Center", desc: "Free counseling and advocacy helping people understand Medicare rights." },
    fr: { title: "Medicare Rights Center", desc: "Conseil et plaidoyer gratuits aidant à comprendre les droits Medicare." },
    es: { title: "Medicare Rights Center", desc: "Consejería y defensa gratuita que ayuda a entender los derechos de Medicare." },
  },
},
{
  category: "Health",
  link: "https://www.n4a.org/eldercarelocator",
  i18n: {
    en: { title: "Eldercare Locator", desc: "Federal directory connecting older adults and caregivers to local services." },
    fr: { title: "Eldercare Locator", desc: "Répertoire fédéral reliant aînés et aidants aux services locaux." },
    es: { title: "Eldercare Locator", desc: "Directorio federal que conecta a adultos mayores y cuidadores con servicios locales." },
  },
},
{
  category: "Health",
  link: "https://www.caregiver.org",
  i18n: {
    en: { title: "Family Caregiver Alliance", desc: "Resources and support services for family caregivers of ill or aging relatives." },
    fr: { title: "Family Caregiver Alliance", desc: "Ressources et services de soutien pour aidants familiaux de proches malades ou âgés." },
    es: { title: "Family Caregiver Alliance", desc: "Recursos y servicios de apoyo para cuidadores familiares de parientes enfermos o mayores." },
  },
},
{
  category: "Health",
  link: "https://www.caregiveraction.org",
  i18n: {
    en: { title: "Caregiver Action Network", desc: "Education, peer support, and resources for family caregivers." },
    fr: { title: "Caregiver Action Network", desc: "Éducation, soutien par les pairs et ressources pour aidants familiaux." },
    es: { title: "Caregiver Action Network", desc: "Educación, apoyo entre pares y recursos para cuidadores familiares." },
  },
},
{
  category: "Health",
  link: "https://www.aginglifecare.org",
  i18n: {
    en: { title: "Aging Life Care Association", desc: "Directory of professional aging life care managers helping families plan care." },
    fr: { title: "Aging Life Care Association", desc: "Répertoire de gestionnaires professionnels de soins pour aînés aidant les familles." },
    es: { title: "Aging Life Care Association", desc: "Directorio de gestores profesionales de cuidado para mayores que ayudan a familias." },
  },
},
{
  category: "Health",
  link: "https://www.hospicefoundation.org",
  i18n: {
    en: { title: "Hospice Foundation of America", desc: "Education and resources on hospice and end-of-life care options." },
    fr: { title: "Hospice Foundation of America", desc: "Éducation et ressources sur les soins palliatifs et de fin de vie." },
    es: { title: "Hospice Foundation of America", desc: "Educación y recursos sobre opciones de cuidados paliativos y de fin de vida." },
  },
},
{
  category: "Health",
  link: "https://www.nhpco.org/find-hospice",
  i18n: {
    en: { title: "Find a Hospice Provider", desc: "Directory to locate hospice care providers by location." },
    fr: { title: "Trouver un fournisseur de soins palliatifs", desc: "Répertoire pour localiser des fournisseurs de soins palliatifs." },
    es: { title: "Encuentre un Proveedor de Cuidados Paliativos", desc: "Directorio para localizar proveedores de cuidados paliativos por ubicación." },
  },
},
{
  category: "Health",
  link: "https://www.getpalliativecare.org",
  i18n: {
    en: { title: "Get Palliative Care", desc: "Information and provider directory for palliative care services." },
    fr: { title: "Get Palliative Care", desc: "Informations et répertoire de fournisseurs de services de soins palliatifs." },
    es: { title: "Get Palliative Care", desc: "Información y directorio de proveedores de servicios de cuidados paliativos." },
  },
},
{
  category: "Health",
  link: "https://www.compassionandchoices.org",
  i18n: {
    en: { title: "Compassion & Choices", desc: "Resources on end-of-life planning and patient rights." },
    fr: { title: "Compassion & Choices", desc: "Ressources sur la planification de fin de vie et les droits des patients." },
    es: { title: "Compassion & Choices", desc: "Recursos sobre planificación de fin de vida y derechos del paciente." },
  },
},

// HOUSING (32)
{
  category: "Housing",
  link: "https://www.hud.gov/states/california",
  states: ["CA"],
  i18n: {
    en: { title: "HUD California Resources", desc: "Federal housing resources specific to California." },
    fr: { title: "Ressources HUD Californie", desc: "Ressources fédérales de logement pour la Californie." },
    es: { title: "Recursos HUD de California", desc: "Recursos federales de vivienda para California." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/new_york",
  states: ["NY"],
  i18n: {
    en: { title: "HUD New York Resources", desc: "Federal housing resources specific to New York." },
    fr: { title: "Ressources HUD New York", desc: "Ressources fédérales de logement pour New York." },
    es: { title: "Recursos HUD de Nueva York", desc: "Recursos federales de vivienda para Nueva York." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/illinois",
  states: ["IL"],
  i18n: {
    en: { title: "HUD Illinois Resources", desc: "Federal housing resources specific to Illinois." },
    fr: { title: "Ressources HUD Illinois", desc: "Ressources fédérales de logement pour l'Illinois." },
    es: { title: "Recursos HUD de Illinois", desc: "Recursos federales de vivienda para Illinois." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/states/arizona/homeownership",
  states: ["AZ"],
  i18n: {
    en: { title: "HUD Arizona Homeownership Programs", desc: "Federal homeownership program info specific to Arizona residents." },
    fr: { title: "Programmes accession propriété Arizona HUD", desc: "Informations sur les programmes d'accession à la propriété en Arizona." },
    es: { title: "Programas de Propiedad de Vivienda de Arizona HUD", desc: "Información de programas de propiedad de vivienda para residentes de Arizona." },
  },
},
{
  category: "Housing",
  link: "https://www.calhfa.ca.gov",
  states: ["CA"],
  i18n: {
    en: { title: "California Housing Finance Agency", desc: "State agency offering affordable home loan programs for California residents." },
    fr: { title: "California Housing Finance Agency", desc: "Agence d'État offrant des programmes de prêt immobilier abordables en Californie." },
    es: { title: "California Housing Finance Agency", desc: "Agencia estatal que ofrece programas de préstamos de vivienda asequibles en California." },
  },
},
{
  category: "Housing",
  link: "https://www.nyshcr.org",
  states: ["NY"],
  i18n: {
    en: { title: "New York State Homes and Community Renewal", desc: "State housing agency offering affordable housing programs for New Yorkers." },
    fr: { title: "New York State Homes and Community Renewal", desc: "Agence de logement d'État offrant des programmes abordables aux New-Yorkais." },
    es: { title: "New York State Homes and Community Renewal", desc: "Agencia estatal de vivienda que ofrece programas asequibles para neoyorquinos." },
  },
},
{
  category: "Housing",
  link: "https://www.ihda.org",
  states: ["IL"],
  i18n: {
    en: { title: "Illinois Housing Development Authority", desc: "State agency offering affordable housing and homeownership programs." },
    fr: { title: "Illinois Housing Development Authority", desc: "Agence d'État offrant des programmes de logement abordable et d'accession." },
    es: { title: "Illinois Housing Development Authority", desc: "Agencia estatal que ofrece programas de vivienda asequible y propiedad." },
  },
},
{
  category: "Housing",
  link: "https://www.thda.org",
  states: ["TN"],
  i18n: {
    en: { title: "Tennessee Housing Development Agency", desc: "State agency offering affordable housing and down payment assistance." },
    fr: { title: "Tennessee Housing Development Agency", desc: "Agence d'État offrant logement abordable et aide à la mise de fonds." },
    es: { title: "Tennessee Housing Development Agency", desc: "Agencia estatal que ofrece vivienda asequible y ayuda de pago inicial." },
  },
},
{
  category: "Housing",
  link: "https://www.ohiohome.org",
  states: ["OH"],
  i18n: {
    en: { title: "Ohio Housing Finance Agency", desc: "State agency offering affordable home loans and down payment assistance." },
    fr: { title: "Ohio Housing Finance Agency", desc: "Agence d'État offrant des prêts immobiliers abordables et une aide à la mise de fonds." },
    es: { title: "Ohio Housing Finance Agency", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles y ayuda de pago inicial." },
  },
},
{
  category: "Housing",
  link: "https://www.mshda.org",
  states: ["MI"],
  i18n: {
    en: { title: "Michigan State Housing Development Authority", desc: "State agency offering affordable housing and homeownership programs." },
    fr: { title: "Michigan State Housing Development Authority", desc: "Agence d'État offrant des programmes de logement abordable." },
    es: { title: "Michigan State Housing Development Authority", desc: "Agencia estatal que ofrece programas de vivienda asequible y propiedad." },
  },
},
{
  category: "Housing",
  link: "https://www.phfa.org",
  states: ["PA"],
  i18n: {
    en: { title: "Pennsylvania Housing Finance Agency", desc: "State agency offering affordable home loans for Pennsylvania residents." },
    fr: { title: "Pennsylvania Housing Finance Agency", desc: "Agence d'État offrant des prêts immobiliers abordables en Pennsylvanie." },
    es: { title: "Pennsylvania Housing Finance Agency", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Pennsylvania." },
  },
},
{
  category: "Housing",
  link: "https://www.nchfa.com",
  states: ["NC"],
  i18n: {
    en: { title: "North Carolina Housing Finance Agency", desc: "State agency offering affordable home loans and rental assistance." },
    fr: { title: "North Carolina Housing Finance Agency", desc: "Agence d'État offrant des prêts immobiliers abordables et aide au loyer." },
    es: { title: "North Carolina Housing Finance Agency", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles y ayuda de alquiler." },
  },
},
{
  category: "Housing",
  link: "https://www.mhdc.com",
  states: ["MO"],
  i18n: {
    en: { title: "Missouri Housing Development Commission", desc: "State agency offering affordable housing and homeownership programs." },
    fr: { title: "Missouri Housing Development Commission", desc: "Agence d'État offrant des programmes de logement abordable." },
    es: { title: "Missouri Housing Development Commission", desc: "Agencia estatal que ofrece programas de vivienda asequible y propiedad." },
  },
},
{
  category: "Housing",
  link: "https://www.wheda.com",
  states: ["WI"],
  i18n: {
    en: { title: "Wisconsin Housing and Economic Development Authority", desc: "State agency offering affordable home loans for Wisconsin residents." },
    fr: { title: "Wisconsin Housing and Economic Development Authority", desc: "Agence d'État offrant des prêts immobiliers abordables au Wisconsin." },
    es: { title: "Wisconsin Housing and Economic Development Authority", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Wisconsin." },
  },
},
{
  category: "Housing",
  link: "https://www.mmp.maryland.gov",
  states: ["MD"],
  i18n: {
    en: { title: "Maryland Mortgage Program", desc: "State program offering affordable home loans for Maryland residents." },
    fr: { title: "Maryland Mortgage Program", desc: "Programme d'État offrant des prêts immobiliers abordables au Maryland." },
    es: { title: "Maryland Mortgage Program", desc: "Programa estatal que ofrece préstamos de vivienda asequibles en Maryland." },
  },
},
{
  category: "Housing",
  link: "https://www.mnhousing.gov",
  states: ["MN"],
  i18n: {
    en: { title: "Minnesota Housing Finance Agency", desc: "State agency offering affordable home loans for Minnesota residents." },
    fr: { title: "Minnesota Housing Finance Agency", desc: "Agence d'État offrant des prêts immobiliers abordables au Minnesota." },
    es: { title: "Minnesota Housing Finance Agency", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Minnesota." },
  },
},
{
  category: "Housing",
  link: "https://www.chfainfo.com",
  states: ["CO"],
  i18n: {
    en: { title: "Colorado Housing and Finance Authority", desc: "State agency offering affordable home loans for Colorado residents." },
    fr: { title: "Colorado Housing and Finance Authority", desc: "Agence d'État offrant des prêts immobiliers abordables au Colorado." },
    es: { title: "Colorado Housing and Finance Authority", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Colorado." },
  },
},
{
  category: "Housing",
  link: "https://www.ahfa.com",
  states: ["AL"],
  i18n: {
    en: { title: "Alabama Housing Finance Authority", desc: "State agency offering affordable home loans for Alabama residents." },
    fr: { title: "Alabama Housing Finance Authority", desc: "Agence d'État offrant des prêts immobiliers abordables en Alabama." },
    es: { title: "Alabama Housing Finance Authority", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Alabama." },
  },
},
{
  category: "Housing",
  link: "https://www.schousing.com",
  states: ["SC"],
  i18n: {
    en: { title: "South Carolina State Housing Finance Authority", desc: "State agency offering affordable home loans for South Carolina residents." },
    fr: { title: "South Carolina State Housing Finance Authority", desc: "Agence d'État offrant des prêts immobiliers abordables en Caroline du Sud." },
    es: { title: "South Carolina State Housing Finance Authority", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Carolina del Sur." },
  },
},
{
  category: "Housing",
  link: "https://www.lhc.la.gov",
  states: ["LA"],
  i18n: {
    en: { title: "Louisiana Housing Corporation", desc: "State agency offering affordable home loans for Louisiana residents." },
    fr: { title: "Louisiana Housing Corporation", desc: "Agence d'État offrant des prêts immobiliers abordables en Louisiane." },
    es: { title: "Louisiana Housing Corporation", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Luisiana." },
  },
},
{
  category: "Housing",
  link: "https://www.kyhousing.org",
  states: ["KY"],
  i18n: {
    en: { title: "Kentucky Housing Corporation", desc: "State agency offering affordable home loans for Kentucky residents." },
    fr: { title: "Kentucky Housing Corporation", desc: "Agence d'État offrant des prêts immobiliers abordables au Kentucky." },
    es: { title: "Kentucky Housing Corporation", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Kentucky." },
  },
},
{
  category: "Housing",
  link: "https://www.oregon.gov/ohcs",
  states: ["OR"],
  i18n: {
    en: { title: "Oregon Housing and Community Services", desc: "State agency offering affordable housing programs for Oregon residents." },
    fr: { title: "Oregon Housing and Community Services", desc: "Agence d'État offrant des programmes de logement abordable en Oregon." },
    es: { title: "Oregon Housing and Community Services", desc: "Agencia estatal que ofrece programas de vivienda asequible en Oregon." },
  },
},
{
  category: "Housing",
  link: "https://www.ohfa.org",
  states: ["OK"],
  i18n: {
    en: { title: "Oklahoma Housing Finance Agency", desc: "State agency offering affordable home loans for Oklahoma residents." },
    fr: { title: "Oklahoma Housing Finance Agency", desc: "Agence d'État offrant des prêts immobiliers abordables en Oklahoma." },
    es: { title: "Oklahoma Housing Finance Agency", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Oklahoma." },
  },
},
{
  category: "Housing",
  link: "https://www.chfa.org",
  states: ["CT"],
  i18n: {
    en: { title: "Connecticut Housing Finance Authority", desc: "State agency offering affordable home loans for Connecticut residents." },
    fr: { title: "Connecticut Housing Finance Authority", desc: "Agence d'État offrant des prêts immobiliers abordables au Connecticut." },
    es: { title: "Connecticut Housing Finance Authority", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Connecticut." },
  },
},
{
  category: "Housing",
  link: "https://www.masshousing.com",
  states: ["MA"],
  i18n: {
    en: { title: "MassHousing", desc: "State agency offering affordable home loans for Massachusetts residents." },
    fr: { title: "MassHousing", desc: "Agence d'État offrant des prêts immobiliers abordables au Massachusetts." },
    es: { title: "MassHousing", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Massachusetts." },
  },
},
{
  category: "Housing",
  link: "https://www.vhda.com",
  states: ["VA"],
  i18n: {
    en: { title: "Virginia Housing", desc: "State agency offering affordable home loans and rental assistance for Virginians." },
    fr: { title: "Virginia Housing", desc: "Agence d'État offrant prêts immobiliers abordables et aide au loyer en Virginie." },
    es: { title: "Virginia Housing", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles y ayuda de alquiler." },
  },
},
{
  category: "Housing",
  link: "https://www.floridahousing.org",
  states: ["FL"],
  i18n: {
    en: { title: "Florida Housing Finance Corporation", desc: "State agency offering affordable home loans and down payment assistance." },
    fr: { title: "Florida Housing Finance Corporation", desc: "Agence d'État offrant des prêts immobiliers abordables et aide à la mise de fonds." },
    es: { title: "Florida Housing Finance Corporation", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles y ayuda de pago inicial." },
  },
},
{
  category: "Housing",
  link: "https://www.dca.ga.gov",
  states: ["GA"],
  i18n: {
    en: { title: "Georgia Department of Community Affairs Housing Programs", desc: "State housing programs and rental assistance for Georgia residents." },
    fr: { title: "Programmes logement Georgia DCA", desc: "Programmes de logement et aide au loyer de l'État pour résidents de Géorgie." },
    es: { title: "Programas de Vivienda del Departamento de Asuntos Comunitarios de Georgia", desc: "Programas estatales de vivienda y ayuda de alquiler para residentes de Georgia." },
  },
},
{
  category: "Housing",
  link: "https://www.housing.az.gov",
  states: ["AZ"],
  i18n: {
    en: { title: "Arizona Department of Housing", desc: "State housing programs and homeownership assistance for Arizona residents." },
    fr: { title: "Arizona Department of Housing", desc: "Programmes de logement d'État et aide à l'accession pour résidents de l'Arizona." },
    es: { title: "Arizona Department of Housing", desc: "Programas estatales de vivienda y ayuda de propiedad para residentes de Arizona." },
  },
},
{
  category: "Housing",
  link: "https://www.housing.nv.gov",
  states: ["NV"],
  i18n: {
    en: { title: "Nevada Housing Division", desc: "State housing programs and homeownership assistance for Nevada residents." },
    fr: { title: "Nevada Housing Division", desc: "Programmes de logement d'État et aide à l'accession pour résidents du Nevada." },
    es: { title: "Nevada Housing Division", desc: "Programas estatales de vivienda y ayuda de propiedad para residentes de Nevada." },
  },
},

// UTILITIES (32)
{
  category: "Utilities",
  link: "https://www.csd.ca.gov/liheap",
  states: ["CA"],
  i18n: {
    en: { title: "California LIHEAP", desc: "State energy assistance program information for California." },
    fr: { title: "LIHEAP Californie", desc: "Informations sur le programme d'aide énergétique de la Californie." },
    es: { title: "LIHEAP de California", desc: "Información del programa de asistencia energética de California." },
  },
},
{
  category: "Utilities",
  link: "https://www.otda.ny.gov/programs/heap",
  states: ["NY"],
  i18n: {
    en: { title: "New York HEAP", desc: "State home energy assistance program information for New York." },
    fr: { title: "HEAP New York", desc: "Informations sur le programme d'aide énergétique domiciliaire de New York." },
    es: { title: "HEAP de Nueva York", desc: "Información del programa de asistencia de energía en el hogar de Nueva York." },
  },
},
{
  category: "Utilities",
  link: "https://www.dhs.state.il.us/liheap",
  states: ["IL"],
  i18n: {
    en: { title: "Illinois LIHEAP", desc: "State energy assistance program information for Illinois." },
    fr: { title: "LIHEAP Illinois", desc: "Informations sur le programme d'aide énergétique de l'Illinois." },
    es: { title: "LIHEAP de Illinois", desc: "Información del programa de asistencia energética de Illinois." },
  },
},
{
  category: "Utilities",
  link: "https://www.tn.gov/humanservices/for-families/liheap.html",
  states: ["TN"],
  i18n: {
    en: { title: "Tennessee LIHEAP", desc: "State energy assistance program information for Tennessee." },
    fr: { title: "LIHEAP Tennessee", desc: "Informations sur le programme d'aide énergétique du Tennessee." },
    es: { title: "LIHEAP de Tennessee", desc: "Información del programa de asistencia energética de Tennessee." },
  },
},
{
  category: "Utilities",
  link: "https://www.development.ohio.gov/liheap",
  states: ["OH"],
  i18n: {
    en: { title: "Ohio LIHEAP", desc: "State energy assistance program information for Ohio." },
    fr: { title: "LIHEAP Ohio", desc: "Informations sur le programme d'aide énergétique de l'Ohio." },
    es: { title: "LIHEAP de Ohio", desc: "Información del programa de asistencia energética de Ohio." },
  },
},
{
  category: "Utilities",
  link: "https://www.michigan.gov/mdhhs/liheap",
  states: ["MI"],
  i18n: {
    en: { title: "Michigan LIHEAP", desc: "State energy assistance program information for Michigan." },
    fr: { title: "LIHEAP Michigan", desc: "Informations sur le programme d'aide énergétique du Michigan." },
    es: { title: "LIHEAP de Michigan", desc: "Información del programa de asistencia energética de Michigan." },
  },
},
{
  category: "Utilities",
  link: "https://www.dhs.pa.gov/liheap",
  states: ["PA"],
  i18n: {
    en: { title: "Pennsylvania LIHEAP", desc: "State energy assistance program information for Pennsylvania." },
    fr: { title: "LIHEAP Pennsylvanie", desc: "Informations sur le programme d'aide énergétique de la Pennsylvanie." },
    es: { title: "LIHEAP de Pennsylvania", desc: "Información del programa de asistencia energética de Pennsylvania." },
  },
},
{
  category: "Utilities",
  link: "https://www.ncdhhs.gov/liheap",
  states: ["NC"],
  i18n: {
    en: { title: "North Carolina LIHEAP", desc: "State energy assistance program information for North Carolina." },
    fr: { title: "LIHEAP Caroline du Nord", desc: "Informations sur le programme d'aide énergétique de la Caroline du Nord." },
    es: { title: "LIHEAP de Carolina del Norte", desc: "Información del programa de asistencia energética de Carolina del Norte." },
  },
},
{
  category: "Utilities",
  link: "https://www.mo.gov/liheap",
  states: ["MO"],
  i18n: {
    en: { title: "Missouri LIHEAP", desc: "State energy assistance program information for Missouri." },
    fr: { title: "LIHEAP Missouri", desc: "Informations sur le programme d'aide énergétique du Missouri." },
    es: { title: "LIHEAP de Missouri", desc: "Información del programa de asistencia energética de Missouri." },
  },
},
{
  category: "Utilities",
  link: "https://www.dcf.wisconsin.gov/liheap",
  states: ["WI"],
  i18n: {
    en: { title: "Wisconsin Home Energy Plus", desc: "State energy assistance program information for Wisconsin." },
    fr: { title: "Wisconsin Home Energy Plus", desc: "Informations sur le programme d'aide énergétique domiciliaire du Wisconsin." },
    es: { title: "Wisconsin Home Energy Plus", desc: "Información del programa de asistencia de energía en el hogar de Wisconsin." },
  },
},
{
  category: "Utilities",
  link: "https://www.dhs.maryland.gov/office-of-home-energy-programs/",
  states: ["MD"],
  i18n: {
    en: { title: "Maryland Office of Home Energy Programs", desc: "State energy assistance program information for Maryland." },
    fr: { title: "Bureau programmes énergie domicile Maryland", desc: "Informations sur le programme d'aide énergétique domiciliaire du Maryland." },
    es: { title: "Oficina de Programas de Energía del Hogar de Maryland", desc: "Información del programa de asistencia de energía en el hogar de Maryland." },
  },
},
{
  category: "Utilities",
  link: "https://www.mn.gov/commerce/energyassistance",
  states: ["MN"],
  i18n: {
    en: { title: "Minnesota Energy Assistance Program (again)", desc: "Additional state energy assistance resource for Minnesota residents." },
    fr: { title: "Programme aide énergie Minnesota (bis)", desc: "Ressource supplémentaire d'aide énergétique pour résidents du Minnesota." },
    es: { title: "Programa de Asistencia Energética de Minnesota (adicional)", desc: "Recurso adicional de asistencia energética para residentes de Minnesota." },
  },
},
{
  category: "Utilities",
  link: "https://www.colorado.gov/pacific/cdhs/liheap",
  states: ["CO"],
  i18n: {
    en: { title: "Colorado LEAP", desc: "State energy assistance program (LEAP) information for Colorado." },
    fr: { title: "Colorado LEAP", desc: "Informations sur le programme d'aide énergétique (LEAP) du Colorado." },
    es: { title: "Colorado LEAP", desc: "Información del programa de asistencia energética (LEAP) de Colorado." },
  },
},
{
  category: "Utilities",
  link: "https://www.dhr.alabama.gov/liheap-2",
  states: ["AL"],
  i18n: {
    en: { title: "Alabama LIHEAP Application Info", desc: "Additional application information for the Alabama energy assistance program." },
    fr: { title: "Info demande LIHEAP Alabama", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Alabama", desc: "Información adicional de solicitud para el programa de asistencia energética." },
  },
},
{
  category: "Utilities",
  link: "https://www.dss.sc.gov/liheap-2",
  states: ["SC"],
  i18n: {
    en: { title: "South Carolina LIHEAP Application Info", desc: "Additional application information for the South Carolina energy program." },
    fr: { title: "Info demande LIHEAP Caroline du Sud", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Carolina del Sur", desc: "Información adicional de solicitud para el programa de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.dcf.louisiana.gov/liheap-2",
  states: ["LA"],
  i18n: {
    en: { title: "Louisiana LIHEAP Application Info", desc: "Additional application information for the Louisiana energy program." },
    fr: { title: "Info demande LIHEAP Louisiane", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Luisiana", desc: "Información adicional de solicitud para el programa de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.chfs.ky.gov/liheap-2",
  states: ["KY"],
  i18n: {
    en: { title: "Kentucky LIHEAP Application Info", desc: "Additional application information for the Kentucky energy program." },
    fr: { title: "Info demande LIHEAP Kentucky", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Kentucky", desc: "Información adicional de solicitud para el programa de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.oregon.gov/energy/liheap",
  states: ["OR"],
  i18n: {
    en: { title: "Oregon LIHEAP", desc: "State energy assistance program information for Oregon." },
    fr: { title: "LIHEAP Oregon", desc: "Informations sur le programme d'aide énergétique de l'Oregon." },
    es: { title: "LIHEAP de Oregon", desc: "Información del programa de asistencia energética de Oregon." },
  },
},
{
  category: "Utilities",
  link: "https://www.okdhs.org/liheap",
  states: ["OK"],
  i18n: {
    en: { title: "Oklahoma LIHEAP", desc: "State energy assistance program information for Oklahoma." },
    fr: { title: "LIHEAP Oklahoma", desc: "Informations sur le programme d'aide énergétique de l'Oklahoma." },
    es: { title: "LIHEAP de Oklahoma", desc: "Información del programa de asistencia energética de Oklahoma." },
  },
},
{
  category: "Utilities",
  link: "https://www.ct.gov/dss/liheap",
  states: ["CT"],
  i18n: {
    en: { title: "Connecticut LIHEAP", desc: "State energy assistance program information for Connecticut." },
    fr: { title: "LIHEAP Connecticut", desc: "Informations sur le programme d'aide énergétique du Connecticut." },
    es: { title: "LIHEAP de Connecticut", desc: "Información del programa de asistencia energética de Connecticut." },
  },
},
{
  category: "Utilities",
  link: "https://www.mass.gov/liheap-2",
  states: ["MA"],
  i18n: {
    en: { title: "Massachusetts LIHEAP Application Info", desc: "Additional application information for the Massachusetts energy program." },
    fr: { title: "Info demande LIHEAP Massachusetts", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Massachusetts", desc: "Información adicional de solicitud para el programa de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.dss.virginia.gov/liheap",
  states: ["VA"],
  i18n: {
    en: { title: "Virginia LIHEAP", desc: "State energy assistance program information for Virginia." },
    fr: { title: "LIHEAP Virginie", desc: "Informations sur le programme d'aide énergétique de la Virginie." },
    es: { title: "LIHEAP de Virginia", desc: "Información del programa de asistencia energética de Virginia." },
  },
},
{
  category: "Utilities",
  link: "https://www.myflfamilies.com/liheap-2",
  states: ["FL"],
  i18n: {
    en: { title: "Florida LIHEAP Application Info", desc: "Additional application information for the Florida energy program." },
    fr: { title: "Info demande LIHEAP Floride", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Florida", desc: "Información adicional de solicitud para el programa de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.dcaz.az.gov/liheap-2",
  states: ["AZ"],
  i18n: {
    en: { title: "Arizona LIHEAP Application Info", desc: "Additional application information for the Arizona energy program." },
    fr: { title: "Info demande LIHEAP Arizona", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Arizona", desc: "Información adicional de solicitud para el programa de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.dwss.nv.gov/liheap-2",
  states: ["NV"],
  i18n: {
    en: { title: "Nevada LIHEAP Application Info", desc: "Additional application information for the Nevada energy program." },
    fr: { title: "Info demande LIHEAP Nevada", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Nevada", desc: "Información adicional de solicitud para el programa de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.nj.gov/dcf/liheap-2",
  states: ["NJ"],
  i18n: {
    en: { title: "New Jersey LIHEAP Application Info", desc: "Additional application information for the New Jersey energy program." },
    fr: { title: "Info demande LIHEAP New Jersey", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Nueva Jersey", desc: "Información adicional de solicitud para el programa de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.jobs.utah.gov/liheap-2",
  states: ["UT"],
  i18n: {
    en: { title: "Utah LIHEAP Application Info", desc: "Additional application information for the Utah energy program." },
    fr: { title: "Info demande LIHEAP Utah", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Utah", desc: "Información adicional de solicitud para el programa de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.healthandwelfare.idaho.gov/liheap-2",
  states: ["ID"],
  i18n: {
    en: { title: "Idaho LIHEAP Application Info", desc: "Additional application information for the Idaho energy program." },
    fr: { title: "Info demande LIHEAP Idaho", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Idaho", desc: "Información adicional de solicitud para el programa de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.hsd.state.nm.us/liheap-2",
  states: ["NM"],
  i18n: {
    en: { title: "New Mexico LIHEAP Application Info", desc: "Additional application information for the New Mexico energy program." },
    fr: { title: "Info demande LIHEAP Nouveau-Mexique", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Nuevo México", desc: "Información adicional de solicitud para el programa de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.dcf.ks.gov/liheap-2",
  states: ["KS"],
  i18n: {
    en: { title: "Kansas LIHEAP Application Info", desc: "Additional application information for the Kansas energy program." },
    fr: { title: "Info demande LIHEAP Kansas", desc: "Informations supplémentaires de demande pour le programme d'aide énergétique." },
    es: { title: "Información de Solicitud LIHEAP Kansas", desc: "Información adicional de solicitud para el programa de energía." },
  },
},

// EDUCATION (34)
{
  category: "Education",
  link: "https://www.studentaid.gov/understand-aid/types/grants/pell",
  i18n: {
    en: { title: "Federal Pell Grant Details", desc: "Official detailed information on Pell Grant eligibility and amounts." },
    fr: { title: "Détails subvention Pell fédérale", desc: "Informations détaillées officielles sur l'admissibilité et les montants Pell." },
    es: { title: "Detalles de la Subvención Pell Federal", desc: "Información oficial detallada sobre elegibilidad y montos de la Beca Pell." },
  },
},
{
  category: "Education",
  link: "https://www.studentaid.gov/understand-aid/types/grants/fseog",
  i18n: {
    en: { title: "Federal Supplemental Educational Opportunity Grant", desc: "Additional federal grant for students with exceptional financial need." },
    fr: { title: "Subvention fédérale complémentaire d'opportunité éducative", desc: "Subvention fédérale supplémentaire pour étudiants ayant un besoin financier exceptionnel." },
    es: { title: "Subvención Federal Complementaria de Oportunidad Educativa", desc: "Subvención federal adicional para estudiantes con necesidad financiera excepcional." },
  },
},
{
  category: "Education",
  link: "https://www.studentaid.gov/understand-aid/types/grants/teach",
  i18n: {
    en: { title: "TEACH Grant Program", desc: "Federal grant for students committing to teach in high-need fields." },
    fr: { title: "Programme subvention TEACH", desc: "Subvention fédérale pour étudiants s'engageant à enseigner dans des domaines prioritaires." },
    es: { title: "Programa de Subvención TEACH", desc: "Subvención federal para estudiantes que se comprometen a enseñar en campos de alta necesidad." },
  },
},
{
  category: "Education",
  link: "https://www.studentaid.gov/understand-aid/types/work-study",
  i18n: {
    en: { title: "Federal Work-Study Program", desc: "Federal program providing part-time jobs for students with financial need." },
    fr: { title: "Programme travail-études fédéral", desc: "Programme fédéral offrant des emplois à temps partiel pour étudiants dans le besoin." },
    es: { title: "Programa Federal de Estudio y Trabajo", desc: "Programa federal que ofrece empleos de medio tiempo para estudiantes con necesidad." },
  },
},
{
  category: "Education",
  link: "https://www.studentaid.gov/apply-for-aid/fafsa",
  i18n: {
    en: { title: "FAFSA Application Portal", desc: "Official portal to complete the Free Application for Federal Student Aid." },
    fr: { title: "Portail demande FAFSA", desc: "Portail officiel pour compléter la demande d'aide fédérale aux étudiants." },
    es: { title: "Portal de Solicitud FAFSA", desc: "Portal oficial para completar la Solicitud Gratuita de Ayuda Federal para Estudiantes." },
  },
},
{
  category: "Education",
  link: "https://www.studentaid.gov/aid-estimator/",
  i18n: {
    en: { title: "Federal Student Aid Estimator", desc: "Official tool to estimate federal financial aid eligibility before applying." },
    fr: { title: "Estimateur aide fédérale étudiante", desc: "Outil officiel pour estimer l'admissibilité à l'aide financière fédérale." },
    es: { title: "Estimador de Ayuda Federal para Estudiantes", desc: "Herramienta oficial para estimar elegibilidad de ayuda financiera federal." },
  },
},
{
  category: "Education",
  link: "https://www.nasfaa.org",
  i18n: {
    en: { title: "National Association of Student Financial Aid Administrators", desc: "Resources helping families understand financial aid processes." },
    fr: { title: "Association nationale administrateurs aide financière étudiante", desc: "Ressources aidant les familles à comprendre les processus d'aide financière." },
    es: { title: "Asociación Nacional de Administradores de Ayuda Financiera Estudiantil", desc: "Recursos que ayudan a familias a entender procesos de ayuda financiera." },
  },
},
{
  category: "Education",
  link: "https://www.finaid.org/otheraid/",
  i18n: {
    en: { title: "FinAid Other Aid Sources", desc: "Independent guide to additional and lesser-known financial aid sources." },
    fr: { title: "Autres sources aide FinAid", desc: "Guide indépendant des sources d'aide financière supplémentaires et moins connues." },
    es: { title: "Otras Fuentes de Ayuda FinAid", desc: "Guía independiente de fuentes adicionales y menos conocidas de ayuda financiera." },
  },
},
{
  category: "Education",
  link: "https://www.collegeraptor.com/find-colleges/",
  i18n: {
    en: { title: "College Raptor Search Tool", desc: "College matching and cost comparison tool for prospective students." },
    fr: { title: "Outil recherche College Raptor", desc: "Outil de correspondance et de comparaison de coûts universitaires." },
    es: { title: "Herramienta de Búsqueda College Raptor", desc: "Herramienta de coincidencia y comparación de costos universitarios." },
  },
},
{
  category: "Education",
  link: "https://www.collegescorecard.ed.gov",
  i18n: {
    en: { title: "College Scorecard", desc: "Official federal tool comparing college costs, outcomes, and value." },
    fr: { title: "College Scorecard", desc: "Outil fédéral officiel comparant coûts, résultats et valeur des collèges." },
    es: { title: "College Scorecard", desc: "Herramienta federal oficial que compara costos, resultados y valor universitario." },
  },
},
{
  category: "Education",
  link: "https://www.petersons.com",
  i18n: {
    en: { title: "Peterson's College Search", desc: "College and scholarship search platform for prospective students." },
    fr: { title: "Recherche collège Peterson's", desc: "Plateforme de recherche de collège et de bourses pour futurs étudiants." },
    es: { title: "Búsqueda Universitaria Peterson's", desc: "Plataforma de búsqueda universitaria y de becas para futuros estudiantes." },
  },
},
{
  category: "Education",
  link: "https://www.collegedata.com",
  i18n: {
    en: { title: "CollegeData", desc: "College search, admissions, and financial aid planning tool." },
    fr: { title: "CollegeData", desc: "Outil de recherche universitaire, admissions et planification d'aide financière." },
    es: { title: "CollegeData", desc: "Herramienta de búsqueda universitaria, admisiones y planificación de ayuda financiera." },
  },
},
{
  category: "Education",
  link: "https://www.communitycollegeconsortium.org",
  i18n: {
    en: { title: "Community College Research Center", desc: "Research and resources on community college access and success." },
    fr: { title: "Centre de recherche collèges communautaires", desc: "Recherche et ressources sur l'accès et la réussite au collège communautaire." },
    es: { title: "Centro de Investigación de Colegios Comunitarios", desc: "Investigación y recursos sobre acceso y éxito en colegios comunitarios." },
  },
},
{
  category: "Education",
  link: "https://www.aacc.nche.edu",
  i18n: {
    en: { title: "American Association of Community Colleges", desc: "Directory and resources for community colleges nationwide." },
    fr: { title: "American Association of Community Colleges", desc: "Répertoire et ressources pour collèges communautaires à l'échelle nationale." },
    es: { title: "American Association of Community Colleges", desc: "Directorio y recursos para colegios comunitarios a nivel nacional." },
  },
},
{
  category: "Education",
  link: "https://www.completecollege.org",
  i18n: {
    en: { title: "Complete College America", desc: "Resources and initiatives supporting college completion for underserved students." },
    fr: { title: "Complete College America", desc: "Ressources et initiatives soutenant l'achèvement des études pour étudiants défavorisés." },
    es: { title: "Complete College America", desc: "Recursos e iniciativas que apoyan la finalización universitaria para estudiantes desatendidos." },
  },
},
{
  category: "Education",
  link: "https://www.firstgen.naspa.org",
  i18n: {
    en: { title: "NASPA Center for First-generation Student Success", desc: "Resources supporting first-generation college students." },
    fr: { title: "Centre réussite étudiants première génération NASPA", desc: "Ressources soutenant les étudiants universitaires de première génération." },
    es: { title: "Centro NASPA para el Éxito de Estudiantes de Primera Generación", desc: "Recursos que apoyan a estudiantes universitarios de primera generación." },
  },
},
{
  category: "Education",
  link: "https://www.imfirst.org",
  i18n: {
    en: { title: "I'm First Generation", desc: "Community and resources for first-generation college students and families." },
    fr: { title: "I'm First Generation", desc: "Communauté et ressources pour étudiants universitaires de première génération." },
    es: { title: "I'm First Generation", desc: "Comunidad y recursos para estudiantes universitarios de primera generación." },
  },
},
{
  category: "Education",
  link: "https://www.risefirst.org",
  i18n: {
    en: { title: "Rise First Scholarship", desc: "Scholarships and mentorship for first-generation and underrepresented students." },
    fr: { title: "Rise First Scholarship", desc: "Bourses et mentorat pour étudiants de première génération et sous-représentés." },
    es: { title: "Rise First Scholarship", desc: "Becas y mentoría para estudiantes de primera generación y subrepresentados." },
  },
},
{
  category: "Education",
  link: "https://www.thurgoodmarshallfund.net",
  i18n: {
    en: { title: "Thurgood Marshall College Fund", desc: "Scholarships and support for students at historically Black public colleges." },
    fr: { title: "Thurgood Marshall College Fund", desc: "Bourses et soutien pour étudiants dans les collèges publics historiquement noirs." },
    es: { title: "Thurgood Marshall College Fund", desc: "Becas y apoyo para estudiantes en universidades públicas históricamente afroamericanas." },
  },
},
{
  category: "Education",
  link: "https://www.apiascholars.org",
  i18n: {
    en: { title: "APIA Scholars", desc: "Scholarships for Asian and Pacific Islander American students." },
    fr: { title: "APIA Scholars", desc: "Bourses pour étudiants américains d'origine asiatique et des îles du Pacifique." },
    es: { title: "APIA Scholars", desc: "Becas para estudiantes estadounidenses de origen asiático y de las islas del Pacífico." },
  },
},
{
  category: "Education",
  link: "https://www.naacpldf.org/scholarships/",
  i18n: {
    en: { title: "NAACP Legal Defense Fund Scholarships", desc: "Scholarship resources supporting Black students pursuing higher education." },
    fr: { title: "Bourses NAACP Legal Defense Fund", desc: "Ressources de bourses soutenant les étudiants noirs poursuivant des études supérieures." },
    es: { title: "Becas NAACP Legal Defense Fund", desc: "Recursos de becas que apoyan a estudiantes negros que buscan educación superior." },
  },
},
{
  category: "Education",
  link: "https://www.gatesmillennium.org",
  i18n: {
    en: { title: "Gates Millennium Scholars Archive", desc: "Legacy resource for information on the Gates Millennium Scholars program." },
    fr: { title: "Archive Gates Millennium Scholars", desc: "Ressource historique d'information sur le programme Gates Millennium Scholars." },
    es: { title: "Archivo Gates Millennium Scholars", desc: "Recurso histórico de información sobre el programa Gates Millennium Scholars." },
  },
},
{
  category: "Education",
  link: "https://www.coca-colascholarsfoundation.org",
  i18n: {
    en: { title: "Coca-Cola Scholars Foundation", desc: "Merit-based scholarships for high school seniors nationwide." },
    fr: { title: "Coca-Cola Scholars Foundation", desc: "Bourses au mérite pour élèves de terminale à l'échelle nationale." },
    es: { title: "Coca-Cola Scholars Foundation", desc: "Becas por mérito para estudiantes del último año de secundaria a nivel nacional." },
  },
},
{
  category: "Education",
  link: "https://www.burgerking.com/scholars",
  i18n: {
    en: { title: "Burger King Scholars Program", desc: "Scholarship program for students demonstrating community involvement." },
    fr: { title: "Programme Burger King Scholars", desc: "Programme de bourses pour étudiants démontrant un engagement communautaire." },
    es: { title: "Programa Burger King Scholars", desc: "Programa de becas para estudiantes que demuestran participación comunitaria." },
  },
},
{
  category: "Education",
  link: "https://www.elksfoundation.org",
  i18n: {
    en: { title: "Elks National Foundation Scholarships", desc: "Scholarships for high school seniors pursuing higher education." },
    fr: { title: "Bourses Elks National Foundation", desc: "Bourses pour élèves de terminale poursuivant des études supérieures." },
    es: { title: "Becas Elks National Foundation", desc: "Becas para estudiantes del último año de secundaria que buscan educación superior." },
  },
},
{
  category: "Education",
  link: "https://www.rotary.org/en/our-programs/scholarships",
  i18n: {
    en: { title: "Rotary Foundation Scholarships", desc: "Scholarships and grants supporting education and cultural exchange." },
    fr: { title: "Bourses Rotary Foundation", desc: "Bourses et subventions soutenant l'éducation et l'échange culturel." },
    es: { title: "Becas Rotary Foundation", desc: "Becas y subvenciones que apoyan la educación y el intercambio cultural." },
  },
},
{
  category: "Education",
  link: "https://www.soroptimist.org/our-work/live-your-dream-award/",
  i18n: {
    en: { title: "Soroptimist Live Your Dream Award", desc: "Financial assistance for women who are primary income earners pursuing education." },
    fr: { title: "Soroptimist Live Your Dream Award", desc: "Aide financière pour femmes soutiens de famille poursuivant des études." },
    es: { title: "Soroptimist Live Your Dream Award", desc: "Ayuda financiera para mujeres sostén de familia que buscan educación." },
  },
},
{
  category: "Education",
  link: "https://www.zonta.org/Web/AboutUs/awards",
  i18n: {
    en: { title: "Zonta International Scholarships", desc: "Scholarships supporting women pursuing education in various fields." },
    fr: { title: "Bourses Zonta International", desc: "Bourses soutenant les femmes poursuivant des études dans divers domaines." },
    es: { title: "Becas Zonta International", desc: "Becas que apoyan a mujeres que buscan educación en varios campos." },
  },
},
{
  category: "Education",
  link: "https://www.awis.org/programs/scholarships",
  i18n: {
    en: { title: "Association for Women in Science Scholarships", desc: "Scholarships supporting women pursuing STEM education and careers." },
    fr: { title: "Bourses Association for Women in Science", desc: "Bourses soutenant les femmes poursuivant des études et carrières STEM." },
    es: { title: "Becas Association for Women in Science", desc: "Becas que apoyan a mujeres que buscan educación y carreras STEM." },
  },
},
{
  category: "Education",
  link: "https://www.swe.org/scholarships/",
  i18n: {
    en: { title: "Society of Women Engineers Scholarships", desc: "Scholarships for women pursuing engineering and technology degrees." },
    fr: { title: "Bourses Society of Women Engineers", desc: "Bourses pour femmes poursuivant des diplômes en ingénierie et technologie." },
    es: { title: "Becas Society of Women Engineers", desc: "Becas para mujeres que buscan títulos en ingeniería y tecnología." },
  },
},
{
  category: "Education",
  link: "https://www.nsbe.org/scholarships",
  i18n: {
    en: { title: "National Society of Black Engineers Scholarships", desc: "Scholarships supporting Black students pursuing engineering degrees." },
    fr: { title: "Bourses National Society of Black Engineers", desc: "Bourses soutenant les étudiants noirs poursuivant des diplômes en ingénierie." },
    es: { title: "Becas National Society of Black Engineers", desc: "Becas que apoyan a estudiantes negros que buscan títulos en ingeniería." },
  },
},
{
  category: "Education",
  link: "https://www.shpe.org/scholarships",
  i18n: {
    en: { title: "Society of Hispanic Professional Engineers Scholarships", desc: "Scholarships supporting Hispanic students pursuing STEM degrees." },
    fr: { title: "Bourses Society of Hispanic Professional Engineers", desc: "Bourses soutenant les étudiants hispaniques poursuivant des diplômes STEM." },
    es: { title: "Becas Society of Hispanic Professional Engineers", desc: "Becas que apoyan a estudiantes hispanos que buscan títulos STEM." },
  },
},
{
  category: "Education",
  link: "https://www.aises.org/scholarships",
  i18n: {
    en: { title: "American Indian Science and Engineering Society Scholarships", desc: "Scholarships supporting Native American students in STEM fields." },
    fr: { title: "Bourses American Indian Science and Engineering Society", desc: "Bourses soutenant les étudiants amérindiens dans les domaines STEM." },
    es: { title: "Becas American Indian Science and Engineering Society", desc: "Becas que apoyan a estudiantes nativos americanos en campos STEM." },
  },
},

// INCOME (34)
{
  category: "Income",
  link: "https://www.acf.hhs.gov/ocs/programs/tanf",
  i18n: {
    en: { title: "Temporary Assistance for Needy Families Overview", desc: "Official federal overview of the TANF cash assistance program." },
    fr: { title: "Aperçu assistance temporaire familles nécessiteuses", desc: "Aperçu fédéral officiel du programme d'aide en espèces TANF." },
    es: { title: "Resumen de Asistencia Temporal para Familias Necesitadas", desc: "Resumen federal oficial del programa de asistencia en efectivo TANF." },
  },
},
{
  category: "Income",
  link: "https://www.acf.hhs.gov/ofa/programs/tanf/state-territory-plans",
  i18n: {
    en: { title: "TANF State Plans Directory", desc: "Official directory of state-specific TANF program plans and rules." },
    fr: { title: "Répertoire plans TANF par État", desc: "Répertoire officiel des plans et règles TANF spécifiques à chaque État." },
    es: { title: "Directorio de Planes TANF por Estado", desc: "Directorio oficial de planes y reglas TANF específicos de cada estado." },
  },
},
{
  category: "Income",
  link: "https://www.benefits.gov/benefit/613",
  i18n: {
    en: { title: "Benefits.gov TANF Benefit Details", desc: "Official federal benefit finder details page for TANF." },
    fr: { title: "Détails prestation TANF Benefits.gov", desc: "Page officielle de détails de prestation TANF du chercheur fédéral." },
    es: { title: "Detalles del Beneficio TANF Benefits.gov", desc: "Página oficial de detalles del beneficio TANF del buscador federal." },
  },
},
{
  category: "Income",
  link: "https://www.acf.hhs.gov/css",
  i18n: {
    en: { title: "Office of Child Support Services", desc: "Federal office overseeing child support enforcement and services." },
    fr: { title: "Office of Child Support Services", desc: "Bureau fédéral supervisant l'application et les services de pension alimentaire." },
    es: { title: "Oficina de Servicios de Manutención Infantil", desc: "Oficina federal que supervisa la aplicación y servicios de manutención infantil." },
  },
},
{
  category: "Income",
  link: "https://www.acf.hhs.gov/css/child-support-agencies-map",
  i18n: {
    en: { title: "Child Support Agency Map", desc: "Official map to find your state child support enforcement agency." },
    fr: { title: "Carte agences pension alimentaire", desc: "Carte officielle pour trouver l'agence d'application de pension alimentaire de votre État." },
    es: { title: "Mapa de Agencias de Manutención Infantil", desc: "Mapa oficial para encontrar la agencia de manutención infantil de su estado." },
  },
},
{
  category: "Income",
  link: "https://www.irs.gov/individuals/child-tax-credit",
  i18n: {
    en: { title: "IRS Child Tax Credit Info", desc: "Official IRS information on claiming the Child Tax Credit." },
    fr: { title: "Info crédit d'impôt enfant IRS", desc: "Informations officielles de l'IRS sur la demande du crédit d'impôt pour enfant." },
    es: { title: "Información del Crédito Tributario por Hijos IRS", desc: "Información oficial del IRS sobre cómo reclamar el crédito tributario por hijos." },
  },
},
{
  category: "Income",
  link: "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit",
  i18n: {
    en: { title: "IRS Earned Income Tax Credit Info", desc: "Official IRS information on eligibility for the EITC." },
    fr: { title: "Info crédit d'impôt revenu gagné IRS", desc: "Informations officielles de l'IRS sur l'admissibilité au crédit d'impôt EITC." },
    es: { title: "Información del Crédito Tributario por Ingreso del Trabajo IRS", desc: "Información oficial del IRS sobre elegibilidad para el EITC." },
  },
},
{
  category: "Income",
  link: "https://www.irs.gov/individuals/free-tax-return-preparation-for-you-by-volunteers",
  i18n: {
    en: { title: "IRS Free Tax Preparation (VITA)", desc: "Official directory of free volunteer tax preparation sites nationwide." },
    fr: { title: "Préparation fiscale gratuite IRS (VITA)", desc: "Répertoire officiel des sites de préparation fiscale bénévole gratuits." },
    es: { title: "Preparación de Impuestos Gratuita IRS (VITA)", desc: "Directorio oficial de sitios de preparación fiscal voluntaria gratuita." },
  },
},
{
  category: "Income",
  link: "https://www.irs.gov/help/tax-counseling-for-the-elderly",
  i18n: {
    en: { title: "Tax Counseling for the Elderly (TCE)", desc: "Free tax preparation assistance specifically for taxpayers age 60 and older." },
    fr: { title: "Conseil fiscal pour aînés (TCE)", desc: "Aide gratuite à la préparation fiscale spécifiquement pour contribuables de 60 ans et plus." },
    es: { title: "Consejería Fiscal para Personas Mayores (TCE)", desc: "Ayuda gratuita de preparación de impuestos específicamente para mayores de 60 años." },
  },
},
{
  category: "Income",
  link: "https://www.aarp.org/money/taxes/aarp_taxaide/",
  i18n: {
    en: { title: "AARP Foundation Tax-Aide", desc: "Free tax preparation help for low-to-moderate income taxpayers, especially seniors." },
    fr: { title: "AARP Foundation Tax-Aide", desc: "Aide gratuite à la préparation fiscale pour contribuables à revenu faible à modéré." },
    es: { title: "AARP Foundation Tax-Aide", desc: "Ayuda gratuita de preparación de impuestos para contribuyentes de ingresos bajos a moderados." },
  },
},
{
  category: "Income",
  link: "https://www.unitedway.org/our-impact/featured-programs/free-tax-prep",
  i18n: {
    en: { title: "United Way Free Tax Prep", desc: "Free tax preparation services offered through local United Way chapters." },
    fr: { title: "Préparation fiscale gratuite United Way", desc: "Services de préparation fiscale gratuits offerts par les chapitres locaux United Way." },
    es: { title: "Preparación de Impuestos Gratuita United Way", desc: "Servicios gratuitos de preparación de impuestos ofrecidos por capítulos locales." },
  },
},
{
  category: "Income",
  link: "https://www.taxoutreach.org",
  i18n: {
    en: { title: "Tax Outreach", desc: "Resources helping low-income filers access free tax preparation and credits." },
    fr: { title: "Tax Outreach", desc: "Ressources aidant les déclarants à faible revenu à accéder à la préparation fiscale gratuite." },
    es: { title: "Tax Outreach", desc: "Recursos que ayudan a declarantes de bajos ingresos a acceder a preparación fiscal gratuita." },
  },
},
{
  category: "Income",
  link: "https://www.consumerfinance.gov/consumer-tools/save-your-refund/",
  i18n: {
    en: { title: "CFPB Save Your Refund", desc: "Program encouraging tax filers to save part of their refund with prize incentives." },
    fr: { title: "CFPB Save Your Refund", desc: "Programme encourageant les déclarants à épargner une partie de leur remboursement." },
    es: { title: "CFPB Save Your Refund", desc: "Programa que anima a los declarantes a ahorrar parte de su reembolso." },
  },
},
{
  category: "Income",
  link: "https://www.mymoneyplan.gov",
  i18n: {
    en: { title: "MyMoneyPlan.gov", desc: "Federal financial planning tool for setting and tracking money goals." },
    fr: { title: "MyMoneyPlan.gov", desc: "Outil fédéral de planification financière pour fixer et suivre des objectifs." },
    es: { title: "MyMoneyPlan.gov", desc: "Herramienta federal de planificación financiera para establecer y rastrear metas." },
  },
},
{
  category: "Income",
  link: "https://www.consumerfinance.gov/consumer-tools/money-as-you-grow/",
  i18n: {
    en: { title: "CFPB Money as You Grow", desc: "Federal resources teaching age-appropriate financial skills to children." },
    fr: { title: "CFPB Money as You Grow", desc: "Ressources fédérales enseignant des compétences financières adaptées à l'âge des enfants." },
    es: { title: "CFPB Money as You Grow", desc: "Recursos federales que enseñan habilidades financieras apropiadas para la edad de los niños." },
  },
},
{
  category: "Income",
  link: "https://www.jumpstart.org",
  i18n: {
    en: { title: "Jump$tart Coalition", desc: "Financial literacy resources and educational tools for students and families." },
    fr: { title: "Jump$tart Coalition", desc: "Ressources d'éducation financière et outils pédagogiques pour étudiants et familles." },
    es: { title: "Jump$tart Coalition", desc: "Recursos de educación financiera y herramientas educativas para estudiantes y familias." },
  },
},
{
  category: "Income",
  link: "https://www.practicalmoneyskills.com",
  i18n: {
    en: { title: "Practical Money Skills", desc: "Free financial education resources covering budgeting, credit, and saving." },
    fr: { title: "Practical Money Skills", desc: "Ressources gratuites d'éducation financière couvrant budget, crédit et épargne." },
    es: { title: "Practical Money Skills", desc: "Recursos gratuitos de educación financiera que cubren presupuesto, crédito y ahorro." },
  },
},
{
  category: "Income",
  link: "https://www.smartaboutmoney.org",
  i18n: {
    en: { title: "Smart About Money", desc: "Free financial education courses and resources for all life stages." },
    fr: { title: "Smart About Money", desc: "Cours et ressources d'éducation financière gratuits pour toutes les étapes de la vie." },
    es: { title: "Smart About Money", desc: "Cursos y recursos de educación financiera gratuitos para todas las etapas de la vida." },
  },
},
{
  category: "Income",
  link: "https://www.hellowallet.com",
  i18n: {
    en: { title: "HelloWallet Financial Wellness Tools", desc: "Digital tools supporting financial wellness and budgeting for employees." },
    fr: { title: "Outils bien-être financier HelloWallet", desc: "Outils numériques soutenant le bien-être financier et le budget pour employés." },
    es: { title: "Herramientas de Bienestar Financiero HelloWallet", desc: "Herramientas digitales que apoyan el bienestar financiero y presupuesto para empleados." },
  },
},
{
  category: "Income",
  link: "https://www.everfi.com/financial-education",
  i18n: {
    en: { title: "EVERFI Financial Education", desc: "Free digital financial literacy courses for students and adults." },
    fr: { title: "EVERFI éducation financière", desc: "Cours numériques gratuits d'éducation financière pour étudiants et adultes." },
    es: { title: "EVERFI Educación Financiera", desc: "Cursos digitales gratuitos de educación financiera para estudiantes y adultos." },
  },
},
{
  category: "Income",
  link: "https://www.moneymanagement.org",
  i18n: {
    en: { title: "MMI Money Management International", desc: "Nonprofit credit counseling and debt management services." },
    fr: { title: "MMI Money Management International", desc: "Services de conseil en crédit et gestion de dette à but non lucratif." },
    es: { title: "MMI Money Management International", desc: "Servicios sin fines de lucro de consejería crediticia y manejo de deudas." },
  },
},
{
  category: "Income",
  link: "https://www.cccsatl.org",
  i18n: {
    en: { title: "Consumer Credit Counseling Service", desc: "Nonprofit credit counseling helping consumers manage debt and budgets." },
    fr: { title: "Consumer Credit Counseling Service", desc: "Conseil en crédit à but non lucratif aidant à gérer dette et budget." },
    es: { title: "Consumer Credit Counseling Service", desc: "Consejería crediticia sin fines de lucro que ayuda a manejar deudas y presupuestos." },
  },
},
{
  category: "Income",
  link: "https://www.greenpath.com",
  i18n: {
    en: { title: "GreenPath Financial Wellness", desc: "Nonprofit credit counseling, debt management, and housing counseling services." },
    fr: { title: "GreenPath Financial Wellness", desc: "Services à but non lucratif de conseil en crédit, gestion de dette et logement." },
    es: { title: "GreenPath Financial Wellness", desc: "Servicios sin fines de lucro de consejería crediticia, manejo de deudas y vivienda." },
  },
},
{
  category: "Income",
  link: "https://www.clearpoint.org",
  i18n: {
    en: { title: "ClearPoint Credit Counseling Solutions", desc: "Nonprofit financial counseling for debt, housing, and bankruptcy support." },
    fr: { title: "ClearPoint Credit Counseling Solutions", desc: "Conseil financier à but non lucratif pour dette, logement et soutien à la faillite." },
    es: { title: "ClearPoint Credit Counseling Solutions", desc: "Consejería financiera sin fines de lucro para deudas, vivienda y apoyo de bancarrota." },
  },
},
{
  category: "Income",
  link: "https://www.credability.org",
  i18n: {
    en: { title: "CreDability Financial Counseling", desc: "Nonprofit financial counseling and education services for consumers." },
    fr: { title: "CreDability Financial Counseling", desc: "Services de conseil financier et d'éducation à but non lucratif pour consommateurs." },
    es: { title: "CreDability Financial Counseling", desc: "Servicios sin fines de lucro de consejería y educación financiera para consumidores." },
  },
},
{
  category: "Income",
  link: "https://www.trinitydebtmanagement.org",
  i18n: {
    en: { title: "Trinity Debt Management", desc: "Nonprofit credit counseling helping consumers create debt repayment plans." },
    fr: { title: "Trinity Debt Management", desc: "Conseil en crédit à but non lucratif aidant à créer des plans de remboursement." },
    es: { title: "Trinity Debt Management", desc: "Consejería crediticia sin fines de lucro que ayuda a crear planes de pago de deudas." },
  },
},
{
  category: "Income",
  link: "https://www.cambridge-credit.org",
  i18n: {
    en: { title: "Cambridge Credit Counseling", desc: "Nonprofit credit counseling and debt management program services." },
    fr: { title: "Cambridge Credit Counseling", desc: "Services de conseil en crédit et de programme de gestion de dette à but non lucratif." },
    es: { title: "Cambridge Credit Counseling", desc: "Servicios sin fines de lucro de consejería crediticia y programa de manejo de deudas." },
  },
},
{
  category: "Income",
  link: "https://www.familycredit.org",
  i18n: {
    en: { title: "Family Credit Management", desc: "Nonprofit credit counseling agency offering debt management plans." },
    fr: { title: "Family Credit Management", desc: "Agence de conseil en crédit à but non lucratif offrant des plans de gestion de dette." },
    es: { title: "Family Credit Management", desc: "Agencia de consejería crediticia sin fines de lucro que ofrece planes de manejo de deudas." },
  },
},
{
  category: "Income",
  link: "https://www.springboardnonprofit.org",
  i18n: {
    en: { title: "Springboard Nonprofit Consumer Credit Management", desc: "Nonprofit credit counseling and financial education services." },
    fr: { title: "Springboard Nonprofit Consumer Credit Management", desc: "Services de conseil en crédit et d'éducation financière à but non lucratif." },
    es: { title: "Springboard Nonprofit Consumer Credit Management", desc: "Servicios sin fines de lucro de consejería crediticia y educación financiera." },
  },
},
{
  category: "Income",
  link: "https://www.debtreduction.org",
  i18n: {
    en: { title: "Debt Reduction Services", desc: "Nonprofit credit counseling agency providing debt management plans." },
    fr: { title: "Debt Reduction Services", desc: "Agence de conseil en crédit à but non lucratif offrant des plans de gestion de dette." },
    es: { title: "Debt Reduction Services", desc: "Agencia de consejería crediticia sin fines de lucro que ofrece planes de manejo de deudas." },
  },
},
{
  category: "Income",
  link: "https://www.consolidatedcredit.org",
  i18n: {
    en: { title: "Consolidated Credit Counseling Services", desc: "Nonprofit credit counseling helping consumers reduce and manage debt." },
    fr: { title: "Consolidated Credit Counseling Services", desc: "Conseil en crédit à but non lucratif aidant les consommateurs à réduire leur dette." },
    es: { title: "Consolidated Credit Counseling Services", desc: "Consejería crediticia sin fines de lucro que ayuda a consumidores a reducir deudas." },
  },
},
{
  category: "Income",
  link: "https://www.americanconsumercredit.com",
  i18n: {
    en: { title: "American Consumer Credit Counseling", desc: "Nonprofit credit counseling and debt management education services." },
    fr: { title: "American Consumer Credit Counseling", desc: "Services de conseil en crédit et d'éducation à la gestion de dette à but non lucratif." },
    es: { title: "American Consumer Credit Counseling", desc: "Servicios sin fines de lucro de consejería crediticia y educación de manejo de deudas." },
  },
},
  // ===== PROGRAMS 1294-1500 =====

// FOOD (34)
{
  category: "Food",
  link: "https://www.fns.usda.gov/snap/state-options-report",
  i18n: {
    en: { title: "SNAP State Options Report", desc: "Federal report detailing how states customize SNAP rules and outreach." },
    fr: { title: "Rapport options d'État SNAP", desc: "Rapport fédéral détaillant comment les États personnalisent les règles SNAP." },
    es: { title: "Informe de Opciones Estatales SNAP", desc: "Informe federal que detalla cómo los estados personalizan las reglas de SNAP." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/snap/broad-based-categorical-eligibility",
  i18n: {
    en: { title: "SNAP Broad-Based Categorical Eligibility", desc: "Federal info on expanded SNAP eligibility rules some states adopt." },
    fr: { title: "Admissibilité catégorielle élargie SNAP", desc: "Informations fédérales sur les règles d'admissibilité élargies adoptées par certains États." },
    es: { title: "Elegibilidad Categórica Amplia de SNAP", desc: "Información federal sobre reglas de elegibilidad ampliadas adoptadas por algunos estados." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/li/food-banks",
  i18n: {
    en: { title: "Food Pantries Food Bank Listings", desc: "Comprehensive listing of food banks searchable by location nationwide." },
    fr: { title: "Listes banques alimentaires Food Pantries", desc: "Liste complète des banques alimentaires consultable par emplacement." },
    es: { title: "Listados de Bancos de Alimentos Food Pantries", desc: "Listado completo de bancos de alimentos buscable por ubicación." },
  },
},
{
  category: "Food",
  link: "https://www.feedingamerica.org/find-your-local-foodbank",
  i18n: {
    en: { title: "Feeding America Find Your Local Food Bank", desc: "Official tool to locate your nearest Feeding America network food bank." },
    fr: { title: "Trouver votre banque alimentaire Feeding America", desc: "Outil officiel pour localiser votre banque alimentaire Feeding America la plus proche." },
    es: { title: "Encuentre su Banco de Alimentos Local Feeding America", desc: "Herramienta oficial para localizar su banco de alimentos Feeding America más cercano." },
  },
},
{
  category: "Food",
  link: "https://www.feedingamerica.org/take-action/coronavirus",
  i18n: {
    en: { title: "Feeding America Emergency Response Info", desc: "Resources on emergency food response during declared crises." },
    fr: { title: "Info réponse d'urgence Feeding America", desc: "Ressources sur la réponse alimentaire d'urgence lors de crises déclarées." },
    es: { title: "Información de Respuesta de Emergencia Feeding America", desc: "Recursos sobre respuesta alimentaria de emergencia durante crisis declaradas." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/food-banks",
  i18n: {
    en: { title: "County-Level Food Bank Directory", desc: "Search food banks organized specifically by county nationwide." },
    fr: { title: "Répertoire banques alimentaires par comté", desc: "Recherchez des banques alimentaires organisées spécifiquement par comté." },
    es: { title: "Directorio de Bancos de Alimentos por Condado", desc: "Busque bancos de alimentos organizados específicamente por condado." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/wic/local-agencies",
  i18n: {
    en: { title: "WIC Local Agency Directory", desc: "Official directory to find your local WIC clinic or agency." },
    fr: { title: "Répertoire agences locales WIC", desc: "Répertoire officiel pour trouver votre clinique ou agence WIC locale." },
    es: { title: "Directorio de Agencias Locales WIC", desc: "Directorio oficial para encontrar su clínica o agencia WIC local." },
  },
},
{
  category: "Food",
  link: "https://www.wichealth.org",
  i18n: {
    en: { title: "WICHealth.org", desc: "Free online nutrition education courses for WIC participants." },
    fr: { title: "WICHealth.org", desc: "Cours d'éducation nutritionnelle en ligne gratuits pour participants WIC." },
    es: { title: "WICHealth.org", desc: "Cursos gratuitos de educación nutricional en línea para participantes de WIC." },
  },
},
{
  category: "Food",
  link: "https://www.fns.usda.gov/wic/online-shopping-pilot",
  i18n: {
    en: { title: "WIC Online Shopping Pilot", desc: "Federal pilot program allowing WIC benefits to be used for online grocery shopping." },
    fr: { title: "Projet pilote achats en ligne WIC", desc: "Programme pilote fédéral permettant d'utiliser les prestations WIC en ligne." },
    es: { title: "Programa Piloto de Compras en Línea WIC", desc: "Programa piloto federal que permite usar beneficios de WIC para compras en línea." },
  },
},
{
  category: "Food",
  link: "https://www.instacart.com/company/ebt-snap",
  i18n: {
    en: { title: "Instacart SNAP/EBT Online Ordering", desc: "Grocery delivery platform accepting SNAP/EBT for online orders." },
    fr: { title: "Commande en ligne SNAP/EBT Instacart", desc: "Plateforme de livraison d'épicerie acceptant SNAP/EBT pour commandes en ligne." },
    es: { title: "Pedidos en Línea SNAP/EBT Instacart", desc: "Plataforma de entrega de comestibles que acepta SNAP/EBT para pedidos en línea." },
  },
},
{
  category: "Food",
  link: "https://www.walmart.com/cp/ebt-snap/1179394",
  i18n: {
    en: { title: "Walmart SNAP/EBT Online Ordering", desc: "Grocery delivery and pickup accepting SNAP/EBT benefits online." },
    fr: { title: "Commande en ligne SNAP/EBT Walmart", desc: "Livraison et ramassage d'épicerie acceptant les prestations SNAP/EBT en ligne." },
    es: { title: "Pedidos en Línea SNAP/EBT Walmart", desc: "Entrega y recogida de comestibles que acepta beneficios de SNAP/EBT en línea." },
  },
},
{
  category: "Food",
  link: "https://www.amazon.com/snap-ebt",
  i18n: {
    en: { title: "Amazon SNAP/EBT Online Ordering", desc: "Online grocery shopping accepting SNAP/EBT payment for eligible items." },
    fr: { title: "Commande en ligne SNAP/EBT Amazon", desc: "Achats d'épicerie en ligne acceptant le paiement SNAP/EBT pour articles admissibles." },
    es: { title: "Pedidos en Línea SNAP/EBT Amazon", desc: "Compras de comestibles en línea que aceptan pago SNAP/EBT para artículos elegibles." },
  },
},
{
  category: "Food",
  link: "https://www.freshdirect.com/snap-ebt",
  i18n: {
    en: { title: "FreshDirect SNAP/EBT Ordering", desc: "Regional grocery delivery service accepting SNAP/EBT payment online." },
    fr: { title: "Commande SNAP/EBT FreshDirect", desc: "Service régional de livraison d'épicerie acceptant le paiement SNAP/EBT en ligne." },
    es: { title: "Pedidos SNAP/EBT FreshDirect", desc: "Servicio regional de entrega de comestibles que acepta pago SNAP/EBT en línea." },
  },
},
{
  category: "Food",
  link: "https://www.aldi.us/en/about-aldi/snap-and-ebt/",
  i18n: {
    en: { title: "ALDI SNAP/EBT Acceptance Info", desc: "Information on using SNAP/EBT benefits at ALDI grocery stores." },
    fr: { title: "Info acceptation SNAP/EBT ALDI", desc: "Informations sur l'utilisation des prestations SNAP/EBT dans les magasins ALDI." },
    es: { title: "Información de Aceptación SNAP/EBT ALDI", desc: "Información sobre el uso de beneficios SNAP/EBT en tiendas ALDI." },
  },
},
{
  category: "Food",
  link: "https://www.kroger.com/topic/snap-ebt",
  i18n: {
    en: { title: "Kroger SNAP/EBT Online Ordering", desc: "Grocery delivery and pickup accepting SNAP/EBT for eligible items." },
    fr: { title: "Commande en ligne SNAP/EBT Kroger", desc: "Livraison et ramassage d'épicerie acceptant SNAP/EBT pour articles admissibles." },
    es: { title: "Pedidos en Línea SNAP/EBT Kroger", desc: "Entrega y recogida de comestibles que acepta SNAP/EBT para artículos elegibles." },
  },
},
{
  category: "Food",
  link: "https://www.target.com/c/snap-ebt/-/N-4z0e5",
  i18n: {
    en: { title: "Target SNAP/EBT Online Ordering", desc: "Grocery delivery and pickup accepting SNAP/EBT payment online." },
    fr: { title: "Commande en ligne SNAP/EBT Target", desc: "Livraison et ramassage d'épicerie acceptant le paiement SNAP/EBT en ligne." },
    es: { title: "Pedidos en Línea SNAP/EBT Target", desc: "Entrega y recogida de comestibles que acepta pago SNAP/EBT en línea." },
  },
},
{
  category: "Food",
  link: "https://www.publix.com/save/coupons-and-discounts/snap-ebt",
  states: ["FL"],
  i18n: {
    en: { title: "Publix SNAP/EBT Info", desc: "Information on using SNAP/EBT benefits at Publix grocery stores." },
    fr: { title: "Info SNAP/EBT Publix", desc: "Informations sur l'utilisation des prestations SNAP/EBT chez Publix." },
    es: { title: "Información SNAP/EBT Publix", desc: "Información sobre el uso de beneficios SNAP/EBT en tiendas Publix." },
  },
},
{
  category: "Food",
  link: "https://www.heb.com/static-page/article-template/SNAP-EBT",
  states: ["TX"],
  i18n: {
    en: { title: "H-E-B SNAP/EBT Info", desc: "Information on using SNAP/EBT benefits at H-E-B grocery stores in Texas." },
    fr: { title: "Info SNAP/EBT H-E-B", desc: "Informations sur l'utilisation des prestations SNAP/EBT chez H-E-B au Texas." },
    es: { title: "Información SNAP/EBT H-E-B", desc: "Información sobre el uso de beneficios SNAP/EBT en tiendas H-E-B en Texas." },
  },
},
{
  category: "Food",
  link: "https://www.wegmans.com/snap-ebt",
  states: ["NY", "PA", "NJ"],
  i18n: {
    en: { title: "Wegmans SNAP/EBT Info", desc: "Information on using SNAP/EBT benefits at Wegmans grocery stores." },
    fr: { title: "Info SNAP/EBT Wegmans", desc: "Informations sur l'utilisation des prestations SNAP/EBT chez Wegmans." },
    es: { title: "Información SNAP/EBT Wegmans", desc: "Información sobre el uso de beneficios SNAP/EBT en tiendas Wegmans." },
  },
},
{
  category: "Food",
  link: "https://www.foodlion.com/savings/snap-ebt",
  states: ["NC", "SC", "VA"],
  i18n: {
    en: { title: "Food Lion SNAP/EBT Info", desc: "Information on using SNAP/EBT benefits at Food Lion grocery stores." },
    fr: { title: "Info SNAP/EBT Food Lion", desc: "Informations sur l'utilisation des prestations SNAP/EBT chez Food Lion." },
    es: { title: "Información SNAP/EBT Food Lion", desc: "Información sobre el uso de beneficios SNAP/EBT en tiendas Food Lion." },
  },
},
{
  category: "Food",
  link: "https://www.freshthyme.com/snap-ebt",
  states: ["IL", "IN", "OH", "MI"],
  i18n: {
    en: { title: "Fresh Thyme SNAP/EBT Info", desc: "Information on using SNAP/EBT benefits at Fresh Thyme Market stores." },
    fr: { title: "Info SNAP/EBT Fresh Thyme", desc: "Informations sur l'utilisation des prestations SNAP/EBT chez Fresh Thyme Market." },
    es: { title: "Información SNAP/EBT Fresh Thyme", desc: "Información sobre el uso de beneficios SNAP/EBT en tiendas Fresh Thyme Market." },
  },
},
{
  category: "Food",
  link: "https://www.wholefoodsmarket.com/snap-ebt",
  i18n: {
    en: { title: "Whole Foods Market SNAP/EBT Info", desc: "Information on using SNAP/EBT benefits at Whole Foods Market stores." },
    fr: { title: "Info SNAP/EBT Whole Foods Market", desc: "Informations sur l'utilisation des prestations SNAP/EBT chez Whole Foods Market." },
    es: { title: "Información SNAP/EBT Whole Foods Market", desc: "Información sobre el uso de beneficios SNAP/EBT en tiendas Whole Foods Market." },
  },
},
{
  category: "Food",
  link: "https://www.traderjoes.com/home/pages/snap-ebt",
  i18n: {
    en: { title: "Trader Joe's SNAP/EBT Info", desc: "Information on using SNAP/EBT benefits at Trader Joe's grocery stores." },
    fr: { title: "Info SNAP/EBT Trader Joe's", desc: "Informations sur l'utilisation des prestations SNAP/EBT chez Trader Joe's." },
    es: { title: "Información SNAP/EBT Trader Joe's", desc: "Información sobre el uso de beneficios SNAP/EBT en tiendas Trader Joe's." },
  },
},
{
  category: "Food",
  link: "https://www.costco.com/snap-ebt.html",
  i18n: {
    en: { title: "Costco SNAP/EBT Info", desc: "Information on using SNAP/EBT benefits at Costco warehouse stores." },
    fr: { title: "Info SNAP/EBT Costco", desc: "Informations sur l'utilisation des prestations SNAP/EBT chez Costco." },
    es: { title: "Información SNAP/EBT Costco", desc: "Información sobre el uso de beneficios SNAP/EBT en tiendas Costco." },
  },
},
{
  category: "Food",
  link: "https://www.samsclub.com/content/snap-ebt",
  i18n: {
    en: { title: "Sam's Club SNAP/EBT Info", desc: "Information on using SNAP/EBT benefits at Sam's Club warehouse stores." },
    fr: { title: "Info SNAP/EBT Sam's Club", desc: "Informations sur l'utilisation des prestations SNAP/EBT chez Sam's Club." },
    es: { title: "Información SNAP/EBT Sam's Club", desc: "Información sobre el uso de beneficios SNAP/EBT en tiendas Sam's Club." },
  },
},
{
  category: "Food",
  link: "https://www.bjs.com/content/snap-ebt",
  states: ["NY", "NJ", "PA", "MA", "CT"],
  i18n: {
    en: { title: "BJ's Wholesale SNAP/EBT Info", desc: "Information on using SNAP/EBT benefits at BJ's Wholesale Club stores." },
    fr: { title: "Info SNAP/EBT BJ's Wholesale", desc: "Informations sur l'utilisation des prestations SNAP/EBT chez BJ's Wholesale Club." },
    es: { title: "Información SNAP/EBT BJ's Wholesale", desc: "Información sobre el uso de beneficios SNAP/EBT en tiendas BJ's Wholesale Club." },
  },
},
{
  category: "Food",
  link: "https://www.freshfoodgenerationboston.org",
  states: ["MA"],
  i18n: {
    en: { title: "Fresh Food Generation", desc: "Community food justice organization offering meals and food access programs in Boston." },
    fr: { title: "Fresh Food Generation", desc: "Organisation de justice alimentaire communautaire offrant repas et accès alimentaire à Boston." },
    es: { title: "Fresh Food Generation", desc: "Organización de justicia alimentaria comunitaria que ofrece comidas y acceso alimentario en Boston." },
  },
},
{
  category: "Food",
  link: "https://www.philabundance.org",
  states: ["PA"],
  i18n: {
    en: { title: "Philabundance", desc: "Regional hunger relief organization serving the greater Philadelphia area." },
    fr: { title: "Philabundance", desc: "Organisation régionale de lutte contre la faim desservant la région de Philadelphie." },
    es: { title: "Philabundance", desc: "Organización regional de ayuda contra el hambre que sirve al área de Filadelfia." },
  },
},
{
  category: "Food",
  link: "https://www.foodbankrockies.org",
  states: ["CO"],
  i18n: {
    en: { title: "Food Bank of the Rockies", desc: "Regional food bank network serving Colorado and Wyoming communities." },
    fr: { title: "Food Bank of the Rockies", desc: "Réseau régional de banque alimentaire desservant le Colorado et le Wyoming." },
    es: { title: "Food Bank of the Rockies", desc: "Red regional de banco de alimentos que sirve a Colorado y Wyoming." },
  },
},
{
  category: "Food",
  link: "https://www.oregonfoodbank.org",
  states: ["OR"],
  i18n: {
    en: { title: "Oregon Food Bank", desc: "Statewide food bank network distributing food across Oregon communities." },
    fr: { title: "Oregon Food Bank", desc: "Réseau alimentaire à l'échelle de l'État distribuant de la nourriture en Oregon." },
    es: { title: "Oregon Food Bank", desc: "Red estatal de banco de alimentos que distribuye comida en comunidades de Oregon." },
  },
},
{
  category: "Food",
  link: "https://www.regionalfoodbank.org",
  states: ["OK"],
  i18n: {
    en: { title: "Regional Food Bank of Oklahoma", desc: "Statewide food bank network distributing food across Oklahoma communities." },
    fr: { title: "Regional Food Bank of Oklahoma", desc: "Réseau alimentaire à l'échelle de l'État distribuant de la nourriture en Oklahoma." },
    es: { title: "Regional Food Bank of Oklahoma", desc: "Red estatal de banco de alimentos que distribuye comida en comunidades de Oklahoma." },
  },
},
{
  category: "Food",
  link: "https://www.ctfoodbank.org",
  states: ["CT"],
  i18n: {
    en: { title: "Connecticut Foodshare", desc: "Statewide food bank network distributing food across Connecticut communities." },
    fr: { title: "Connecticut Foodshare", desc: "Réseau alimentaire à l'échelle de l'État distribuant de la nourriture au Connecticut." },
    es: { title: "Connecticut Foodshare", desc: "Red estatal de banco de alimentos que distribuye comida en comunidades de Connecticut." },
  },
},
{
  category: "Food",
  link: "https://www.gbfb.org",
  states: ["MA"],
  i18n: {
    en: { title: "Greater Boston Food Bank", desc: "Largest hunger relief organization in New England serving eastern Massachusetts." },
    fr: { title: "Greater Boston Food Bank", desc: "Plus grande organisation de lutte contre la faim en Nouvelle-Angleterre." },
    es: { title: "Greater Boston Food Bank", desc: "La organización de ayuda contra el hambre más grande de Nueva Inglaterra." },
  },
},

// HEALTH (38)
{
  category: "Health",
  link: "https://www.cdc.gov/vaccines/index.html",
  i18n: {
    en: { title: "CDC Vaccine Information", desc: "Federal information on vaccine schedules, safety, and access programs." },
    fr: { title: "Info vaccins CDC", desc: "Informations fédérales sur les calendriers de vaccination, la sécurité et l'accès." },
    es: { title: "Información de Vacunas CDC", desc: "Información federal sobre calendarios de vacunación, seguridad y acceso." },
  },
},
{
  category: "Health",
  link: "https://www.hrsa.gov/vaccines-for-children",
  i18n: {
    en: { title: "Vaccines for Children Program", desc: "Federal program providing free vaccines for eligible children." },
    fr: { title: "Programme vaccins pour enfants", desc: "Programme fédéral offrant des vaccins gratuits pour enfants admissibles." },
    es: { title: "Programa de Vacunas para Niños", desc: "Programa federal que proporciona vacunas gratuitas para niños elegibles." },
  },
},
{
  category: "Health",
  link: "https://www.vaccines.gov",
  i18n: {
    en: { title: "Vaccines.gov", desc: "Official federal tool to find vaccine locations near you." },
    fr: { title: "Vaccines.gov", desc: "Outil fédéral officiel pour trouver des lieux de vaccination près de chez vous." },
    es: { title: "Vaccines.gov", desc: "Herramienta federal oficial para encontrar lugares de vacunación cerca de usted." },
  },
},
{
  category: "Health",
  link: "https://www.cdc.gov/flu/freeresources/index.htm",
  i18n: {
    en: { title: "CDC Flu Prevention Resources", desc: "Federal resources on flu prevention and low-cost vaccination options." },
    fr: { title: "Ressources prévention grippe CDC", desc: "Ressources fédérales sur la prévention de la grippe et les options de vaccination." },
    es: { title: "Recursos de Prevención de Gripe CDC", desc: "Recursos federales sobre prevención de gripe y opciones de vacunación de bajo costo." },
  },
},
{
  category: "Health",
  link: "https://www.cdc.gov/std/prevention/default.htm",
  i18n: {
    en: { title: "CDC STD Prevention Resources", desc: "Federal information and testing resources for sexually transmitted disease prevention." },
    fr: { title: "Ressources prévention IST CDC", desc: "Informations fédérales et ressources de dépistage pour la prévention des IST." },
    es: { title: "Recursos de Prevención de ITS CDC", desc: "Información federal y recursos de pruebas para la prevención de ITS." },
  },
},
{
  category: "Health",
  link: "https://www.gettested.cdc.gov",
  i18n: {
    en: { title: "CDC Get Tested Locator", desc: "Official federal tool to find HIV, STD, and hepatitis testing sites near you." },
    fr: { title: "Localisateur dépistage CDC", desc: "Outil fédéral officiel pour trouver des sites de dépistage VIH, IST et hépatite." },
    es: { title: "Localizador de Pruebas CDC", desc: "Herramienta federal oficial para encontrar sitios de pruebas de VIH, ITS y hepatitis." },
  },
},
{
  category: "Health",
  link: "https://www.hiv.gov/hiv-basics/hiv-testing/learn-about-hiv-testing/",
  i18n: {
    en: { title: "HIV.gov Testing Information", desc: "Federal information on HIV testing options and where to get tested." },
    fr: { title: "Info dépistage HIV.gov", desc: "Informations fédérales sur les options de dépistage du VIH et où se faire tester." },
    es: { title: "Información de Pruebas HIV.gov", desc: "Información federal sobre opciones de pruebas de VIH y dónde hacerse la prueba." },
  },
},
{
  category: "Health",
  link: "https://www.ready.gov/kit",
  i18n: {
    en: { title: "Ready.gov Emergency Health Kit Guide", desc: "Federal guide to assembling an emergency medical and health preparedness kit." },
    fr: { title: "Guide trousse santé urgence Ready.gov", desc: "Guide fédéral pour assembler une trousse de préparation médicale d'urgence." },
    es: { title: "Guía de Kit de Salud de Emergencia Ready.gov", desc: "Guía federal para armar un kit de preparación médica de emergencia." },
  },
},
{
  category: "Health",
  link: "https://www.cdc.gov/climateandhealth/default.htm",
  i18n: {
    en: { title: "CDC Climate and Health Resources", desc: "Federal resources on protecting health during extreme weather events." },
    fr: { title: "Ressources climat et santé CDC", desc: "Ressources fédérales pour protéger la santé lors d'événements météorologiques extrêmes." },
    es: { title: "Recursos de Clima y Salud CDC", desc: "Recursos federales para proteger la salud durante eventos climáticos extremos." },
  },
},
{
  category: "Health",
  link: "https://www.epa.gov/heatislands/heat-related-illness",
  i18n: {
    en: { title: "EPA Heat-Related Illness Resources", desc: "Federal information on recognizing and preventing heat-related illness." },
    fr: { title: "Ressources maladies liées à la chaleur EPA", desc: "Informations fédérales pour reconnaître et prévenir les maladies liées à la chaleur." },
    es: { title: "Recursos de Enfermedades Relacionadas con el Calor EPA", desc: "Información federal para reconocer y prevenir enfermedades relacionadas con el calor." },
  },
},
{
  category: "Health",
  link: "https://www.airnow.gov",
  i18n: {
    en: { title: "AirNow.gov Air Quality Index", desc: "Federal real-time air quality tracking to help protect respiratory health." },
    fr: { title: "Indice qualité air AirNow.gov", desc: "Suivi fédéral en temps réel de la qualité de l'air pour protéger la santé respiratoire." },
    es: { title: "Índice de Calidad del Aire AirNow.gov", desc: "Seguimiento federal en tiempo real de la calidad del aire para proteger la salud respiratoria." },
  },
},
{
  category: "Health",
  link: "https://www.cdc.gov/asthma/default.htm",
  i18n: {
    en: { title: "CDC Asthma Resources", desc: "Federal information and resources for managing and preventing asthma." },
    fr: { title: "Ressources asthme CDC", desc: "Informations et ressources fédérales pour gérer et prévenir l'asthme." },
    es: { title: "Recursos de Asma CDC", desc: "Información y recursos federales para manejar y prevenir el asma." },
  },
},
{
  category: "Health",
  link: "https://www.aafa.org/asthma-treatment-cost-help/",
  i18n: {
    en: { title: "Asthma and Allergy Foundation Cost Help", desc: "Financial assistance resources for asthma treatment and medication costs." },
    fr: { title: "Aide coûts Asthma and Allergy Foundation", desc: "Ressources d'aide financière pour le traitement de l'asthme et les médicaments." },
    es: { title: "Ayuda de Costos Asthma and Allergy Foundation", desc: "Recursos de ayuda financiera para tratamiento de asma y costos de medicamentos." },
  },
},
{
  category: "Health",
  link: "https://www.lung.org/lung-health-diseases/lung-disease-lookup/asthma/",
  i18n: {
    en: { title: "American Lung Association Asthma Resources", desc: "Education and support resources for people managing asthma." },
    fr: { title: "Ressources asthme American Lung Association", desc: "Ressources d'éducation et de soutien pour la gestion de l'asthme." },
    es: { title: "Recursos de Asma American Lung Association", desc: "Recursos de educación y apoyo para el manejo del asma." },
  },
},
{
  category: "Health",
  link: "https://www.foodallergy.org/living-food-allergies/food-allergy-101",
  i18n: {
    en: { title: "Food Allergy 101 Guide", desc: "Educational resources for managing food allergies safely and affordably." },
    fr: { title: "Guide allergies alimentaires 101", desc: "Ressources éducatives pour gérer les allergies alimentaires en toute sécurité." },
    es: { title: "Guía de Alergias Alimentarias 101", desc: "Recursos educativos para manejar alergias alimentarias de forma segura y asequible." },
  },
},
{
  category: "Health",
  link: "https://www.epinephrine4all.org",
  i18n: {
    en: { title: "Epinephrine4All", desc: "Advocacy resources helping families access affordable epinephrine auto-injectors." },
    fr: { title: "Epinephrine4All", desc: "Ressources de plaidoyer aidant les familles à accéder à des auto-injecteurs abordables." },
    es: { title: "Epinephrine4All", desc: "Recursos de defensa que ayudan a familias a acceder a autoinyectores de epinefrina asequibles." },
  },
},
{
  category: "Health",
  link: "https://www.epipen4schools.com",
  i18n: {
    en: { title: "EpiPen4Schools", desc: "Program providing free epinephrine auto-injectors to qualifying schools." },
    fr: { title: "EpiPen4Schools", desc: "Programme fournissant des auto-injecteurs d'épinéphrine gratuits aux écoles admissibles." },
    es: { title: "EpiPen4Schools", desc: "Programa que proporciona autoinyectores de epinefrina gratuitos a escuelas elegibles." },
  },
},
{
  category: "Health",
  link: "https://www.diabetes.org/tools-support/help-paying-insulin",
  i18n: {
    en: { title: "ADA Help Paying for Insulin", desc: "Resources helping people afford insulin and diabetes medications." },
    fr: { title: "ADA aide paiement insuline", desc: "Ressources aidant les personnes à payer l'insuline et les médicaments du diabète." },
    es: { title: "ADA Ayuda para Pagar Insulina", desc: "Recursos que ayudan a las personas a pagar insulina y medicamentos para diabetes." },
  },
},
{
  category: "Health",
  link: "https://www.beyondtype1.org/insulin-affordability/",
  i18n: {
    en: { title: "Beyond Type 1 Insulin Affordability", desc: "Resources and advocacy for making insulin more affordable." },
    fr: { title: "Abordabilité insuline Beyond Type 1", desc: "Ressources et plaidoyer pour rendre l'insuline plus abordable." },
    es: { title: "Asequibilidad de Insulina Beyond Type 1", desc: "Recursos y defensa para hacer la insulina más asequible." },
  },
},
{
  category: "Health",
  link: "https://www.t1international.com/usa",
  i18n: {
    en: { title: "T1International USA Insulin Access", desc: "Advocacy resources on insulin access and affordability in the US." },
    fr: { title: "Accès insuline T1International USA", desc: "Ressources de plaidoyer sur l'accès et l'abordabilité de l'insuline aux États-Unis." },
    es: { title: "Acceso a Insulina T1International USA", desc: "Recursos de defensa sobre acceso y asequibilidad de insulina en Estados Unidos." },
  },
},
{
  category: "Health",
  link: "https://www.civicahealthcare.org",
  i18n: {
    en: { title: "Civica Rx Affordable Insulin", desc: "Nonprofit generic drug manufacturer offering affordable insulin products." },
    fr: { title: "Civica Rx insuline abordable", desc: "Fabricant à but non lucratif de médicaments génériques offrant de l'insuline abordable." },
    es: { title: "Civica Rx Insulina Asequible", desc: "Fabricante de medicamentos genéricos sin fines de lucro que ofrece insulina asequible." },
  },
},
{
  category: "Health",
  link: "https://www.marktcure.org",
  i18n: {
    en: { title: "Mark Cuban Cost Plus Drug Company", desc: "Low-markup pharmacy offering affordable prescription medications." },
    fr: { title: "Mark Cuban Cost Plus Drug Company", desc: "Pharmacie à faible marge offrant des médicaments sur ordonnance abordables." },
    es: { title: "Mark Cuban Cost Plus Drug Company", desc: "Farmacia de bajo margen que ofrece medicamentos recetados asequibles." },
  },
},
{
  category: "Health",
  link: "https://www.honeybeehealth.com",
  i18n: {
    en: { title: "Honeybee Health Pharmacy", desc: "Online pharmacy offering discounted prescription medication pricing." },
    fr: { title: "Honeybee Health Pharmacy", desc: "Pharmacie en ligne offrant des prix réduits sur les médicaments sur ordonnance." },
    es: { title: "Honeybee Health Pharmacy", desc: "Farmacia en línea que ofrece precios reducidos en medicamentos recetados." },
  },
},
{
  category: "Health",
  link: "https://www.truepill.com",
  i18n: {
    en: { title: "Truepill Pharmacy Services", desc: "Digital pharmacy platform offering affordable prescription fulfillment." },
    fr: { title: "Truepill Pharmacy Services", desc: "Plateforme de pharmacie numérique offrant un traitement d'ordonnance abordable." },
    es: { title: "Truepill Pharmacy Services", desc: "Plataforma de farmacia digital que ofrece surtido de recetas asequible." },
  },
},
{
  category: "Health",
  link: "https://www.capsule.com",
  i18n: {
    en: { title: "Capsule Pharmacy", desc: "Free prescription delivery pharmacy with price comparison tools." },
    fr: { title: "Capsule Pharmacy", desc: "Pharmacie de livraison d'ordonnances gratuite avec outils de comparaison de prix." },
    es: { title: "Capsule Pharmacy", desc: "Farmacia de entrega de recetas gratuita con herramientas de comparación de precios." },
  },
},
{
  category: "Health",
  link: "https://www.medly.com",
  i18n: {
    en: { title: "Medly Pharmacy", desc: "Free prescription delivery service with insurance and discount options." },
    fr: { title: "Medly Pharmacy", desc: "Service de livraison d'ordonnances gratuit avec options d'assurance et de rabais." },
    es: { title: "Medly Pharmacy", desc: "Servicio de entrega de recetas gratuito con opciones de seguro y descuento." },
  },
},
{
  category: "Health",
  link: "https://www.alto.com",
  i18n: {
    en: { title: "Alto Pharmacy", desc: "Full-service digital pharmacy with free delivery and cost transparency." },
    fr: { title: "Alto Pharmacy", desc: "Pharmacie numérique complète avec livraison gratuite et transparence des coûts." },
    es: { title: "Alto Pharmacy", desc: "Farmacia digital completa con entrega gratuita y transparencia de costos." },
  },
},
{
  category: "Health",
  link: "https://www.pillpack.com",
  i18n: {
    en: { title: "PillPack by Amazon Pharmacy", desc: "Prescription management and delivery service sorting medications by dose." },
    fr: { title: "PillPack par Amazon Pharmacy", desc: "Service de gestion et de livraison d'ordonnances triant les médicaments par dose." },
    es: { title: "PillPack por Amazon Pharmacy", desc: "Servicio de gestión y entrega de recetas que organiza medicamentos por dosis." },
  },
},
{
  category: "Health",
  link: "https://www.nami.org/help",
  i18n: {
    en: { title: "NAMI HelpLine", desc: "Free national mental health support helpline and resource referrals." },
    fr: { title: "Ligne d'aide NAMI", desc: "Ligne d'assistance nationale gratuite en santé mentale et orientation vers ressources." },
    es: { title: "Línea de Ayuda NAMI", desc: "Línea de ayuda nacional gratuita de salud mental y referencias de recursos." },
  },
},
{
  category: "Health",
  link: "https://www.mhanational.org/finding-therapy",
  i18n: {
    en: { title: "Mental Health America Finding Therapy Guide", desc: "Guide to finding affordable therapy and mental health services." },
    fr: { title: "Guide trouver thérapie Mental Health America", desc: "Guide pour trouver une thérapie abordable et des services de santé mentale." },
    es: { title: "Guía para Encontrar Terapia Mental Health America", desc: "Guía para encontrar terapia asequible y servicios de salud mental." },
  },
},
{
  category: "Health",
  link: "https://www.mhanational.org/take-a-mental-health-test",
  i18n: {
    en: { title: "MHA Mental Health Screening Tools", desc: "Free confidential online mental health screening tools." },
    fr: { title: "Outils dépistage santé mentale MHA", desc: "Outils de dépistage confidentiels et gratuits en santé mentale en ligne." },
    es: { title: "Herramientas de Evaluación de Salud Mental MHA", desc: "Herramientas de evaluación confidenciales y gratuitas de salud mental en línea." },
  },
},
{
  category: "Health",
  link: "https://www.startyourrecovery.org",
  i18n: {
    en: { title: "Start Your Recovery", desc: "Resources helping people and families navigate substance use recovery options." },
    fr: { title: "Start Your Recovery", desc: "Ressources aidant les personnes et familles à naviguer les options de rétablissement." },
    es: { title: "Start Your Recovery", desc: "Recursos que ayudan a personas y familias a navegar opciones de recuperación." },
  },
},
{
  category: "Health",
  link: "https://www.recoveryanswers.org",
  i18n: {
    en: { title: "Recovery Research Institute", desc: "Science-based resources on addiction recovery pathways and treatment." },
    fr: { title: "Recovery Research Institute", desc: "Ressources scientifiques sur les voies de rétablissement et le traitement des dépendances." },
    es: { title: "Recovery Research Institute", desc: "Recursos basados en ciencia sobre vías de recuperación y tratamiento de adicciones." },
  },
},
{
  category: "Health",
  link: "https://www.facesandvoicesofrecovery.org",
  i18n: {
    en: { title: "Faces and Voices of Recovery", desc: "Advocacy and peer support resources for addiction recovery communities." },
    fr: { title: "Faces and Voices of Recovery", desc: "Ressources de plaidoyer et de soutien par les pairs pour communautés de rétablissement." },
    es: { title: "Faces and Voices of Recovery", desc: "Recursos de defensa y apoyo entre pares para comunidades de recuperación." },
  },
},
{
  category: "Health",
  link: "https://www.shatterproof.org",
  i18n: {
    en: { title: "Shatterproof", desc: "Resources and treatment finder for substance use disorder support." },
    fr: { title: "Shatterproof", desc: "Ressources et outil de recherche de traitement pour troubles liés aux substances." },
    es: { title: "Shatterproof", desc: "Recursos y buscador de tratamiento para apoyo de trastornos por sustancias." },
  },
},
{
  category: "Health",
  link: "https://www.samhsa.gov/find-help/national-helpline",
  i18n: {
    en: { title: "SAMHSA National Helpline", desc: "Free confidential 24/7 helpline for mental health and substance use support." },
    fr: { title: "Ligne d'aide nationale SAMHSA", desc: "Ligne d'assistance confidentielle gratuite 24/7 pour santé mentale et dépendances." },
    es: { title: "Línea de Ayuda Nacional SAMHSA", desc: "Línea de ayuda confidencial gratuita 24/7 para salud mental y sustancias." },
  },
},

// HOUSING (32)
{
  category: "Housing",
  link: "https://www.hud.gov/states/washington/homeownership",
  states: ["WA"],
  i18n: {
    en: { title: "HUD Washington Homeownership Programs", desc: "Federal homeownership program info specific to Washington residents." },
    fr: { title: "Programmes accession propriété Washington HUD", desc: "Informations sur les programmes d'accession à la propriété à Washington." },
    es: { title: "Programas de Propiedad de Vivienda de Washington HUD", desc: "Información de programas de propiedad de vivienda para residentes de Washington." },
  },
},
{
  category: "Housing",
  link: "https://www.wshfc.org",
  states: ["WA"],
  i18n: {
    en: { title: "Washington State Housing Finance Commission", desc: "State agency offering affordable home loans for Washington residents." },
    fr: { title: "Washington State Housing Finance Commission", desc: "Agence d'État offrant des prêts immobiliers abordables à Washington." },
    es: { title: "Washington State Housing Finance Commission", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Washington." },
  },
},
{
  category: "Housing",
  link: "https://www.gonhfa.org",
  states: ["GA"],
  i18n: {
    en: { title: "Georgia Department of Community Affairs Housing Finance", desc: "State agency offering affordable home loans for Georgia residents." },
    fr: { title: "Financement logement Georgia DCA", desc: "Agence d'État offrant des prêts immobiliers abordables en Géorgie." },
    es: { title: "Financiamiento de Vivienda Georgia DCA", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Georgia." },
  },
},
{
  category: "Housing",
  link: "https://www.tdhca.state.tx.us",
  states: ["TX"],
  i18n: {
    en: { title: "Texas Department of Housing and Community Affairs", desc: "State agency offering affordable home loans and rental assistance for Texans." },
    fr: { title: "Texas Department of Housing and Community Affairs", desc: "Agence d'État offrant prêts immobiliers abordables et aide au loyer au Texas." },
    es: { title: "Texas Department of Housing and Community Affairs", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles y ayuda de alquiler." },
  },
},
{
  category: "Housing",
  link: "https://www.floridahousing.org/programs",
  states: ["FL"],
  i18n: {
    en: { title: "Florida Housing All Programs", desc: "Full list of Florida Housing Finance Corporation programs for residents." },
    fr: { title: "Tous les programmes Florida Housing", desc: "Liste complète des programmes de la Florida Housing Finance Corporation." },
    es: { title: "Todos los Programas de Florida Housing", desc: "Lista completa de programas de Florida Housing Finance Corporation." },
  },
},
{
  category: "Housing",
  link: "https://www.hcd.ca.gov/grants-and-funding",
  states: ["CA"],
  i18n: {
    en: { title: "California HCD Grants and Funding", desc: "State housing grants and funding opportunities for California residents." },
    fr: { title: "Subventions et financement HCD Californie", desc: "Subventions et opportunités de financement de logement pour la Californie." },
    es: { title: "Subvenciones y Financiamiento HCD California", desc: "Subvenciones y oportunidades de financiamiento de vivienda para California." },
  },
},
{
  category: "Housing",
  link: "https://www.hcr.ny.gov/homeowners",
  states: ["NY"],
  i18n: {
    en: { title: "New York State Homeowner Programs", desc: "State homeownership and home repair assistance programs for New Yorkers." },
    fr: { title: "Programmes propriétaires New York", desc: "Programmes d'accession et de réparation domiciliaire pour New-Yorkais." },
    es: { title: "Programas de Propietarios de Nueva York", desc: "Programas de propiedad y reparación de vivienda para neoyorquinos." },
  },
},
{
  category: "Housing",
  link: "https://www.dhcd.dc.gov",
  states: ["DC"],
  i18n: {
    en: { title: "DC Department of Housing and Community Development", desc: "District housing programs and rental assistance for DC residents." },
    fr: { title: "DC Department of Housing and Community Development", desc: "Programmes de logement et aide au loyer pour résidents de DC." },
    es: { title: "DC Department of Housing and Community Development", desc: "Programas de vivienda y ayuda de alquiler para residentes de DC." },
  },
},
{
  category: "Housing",
  link: "https://www.dhcd.virginia.gov",
  states: ["VA"],
  i18n: {
    en: { title: "Virginia Department of Housing and Community Development", desc: "State housing programs and rental assistance for Virginia residents." },
    fr: { title: "Virginia Department of Housing and Community Development", desc: "Programmes de logement d'État et aide au loyer pour résidents de Virginie." },
    es: { title: "Virginia Department of Housing and Community Development", desc: "Programas estatales de vivienda y ayuda de alquiler para residentes de Virginia." },
  },
},
{
  category: "Housing",
  link: "https://www.dced.pa.gov/housing",
  states: ["PA"],
  i18n: {
    en: { title: "Pennsylvania Housing Programs Directory", desc: "State directory of housing assistance programs for Pennsylvania residents." },
    fr: { title: "Répertoire programmes logement Pennsylvanie", desc: "Répertoire d'État des programmes d'aide au logement pour la Pennsylvanie." },
    es: { title: "Directorio de Programas de Vivienda de Pennsylvania", desc: "Directorio estatal de programas de asistencia de vivienda para Pennsylvania." },
  },
},
{
  category: "Housing",
  link: "https://www.michigan.gov/mshda/homeownership",
  states: ["MI"],
  i18n: {
    en: { title: "Michigan Homeownership Programs", desc: "State homeownership assistance programs for Michigan residents." },
    fr: { title: "Programmes accession propriété Michigan", desc: "Programmes d'aide à l'accession à la propriété pour résidents du Michigan." },
    es: { title: "Programas de Propiedad de Vivienda de Michigan", desc: "Programas estatales de ayuda de propiedad para residentes de Michigan." },
  },
},
{
  category: "Housing",
  link: "https://www.development.ohio.gov/community/housing",
  states: ["OH"],
  i18n: {
    en: { title: "Ohio Housing Programs Directory", desc: "State directory of housing assistance programs for Ohio residents." },
    fr: { title: "Répertoire programmes logement Ohio", desc: "Répertoire d'État des programmes d'aide au logement pour l'Ohio." },
    es: { title: "Directorio de Programas de Vivienda de Ohio", desc: "Directorio estatal de programas de asistencia de vivienda para Ohio." },
  },
},
{
  category: "Housing",
  link: "https://www.in.gov/ihcda",
  states: ["IN"],
  i18n: {
    en: { title: "Indiana Housing and Community Development Authority", desc: "State agency offering affordable home loans for Indiana residents." },
    fr: { title: "Indiana Housing and Community Development Authority", desc: "Agence d'État offrant des prêts immobiliers abordables en Indiana." },
    es: { title: "Indiana Housing and Community Development Authority", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Indiana." },
  },
},
{
  category: "Housing",
  link: "https://www.dfa.state.ms.us/housing",
  states: ["MS"],
  i18n: {
    en: { title: "Mississippi Housing Programs", desc: "State housing assistance programs for Mississippi residents." },
    fr: { title: "Programmes logement Mississippi", desc: "Programmes d'aide au logement de l'État pour résidents du Mississippi." },
    es: { title: "Programas de Vivienda de Mississippi", desc: "Programas estatales de asistencia de vivienda para residentes de Mississippi." },
  },
},
{
  category: "Housing",
  link: "https://www.nifa.org",
  states: ["NE"],
  i18n: {
    en: { title: "Nebraska Investment Finance Authority", desc: "State agency offering affordable home loans for Nebraska residents." },
    fr: { title: "Nebraska Investment Finance Authority", desc: "Agence d'État offrant des prêts immobiliers abordables au Nebraska." },
    es: { title: "Nebraska Investment Finance Authority", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Nebraska." },
  },
},
{
  category: "Housing",
  link: "https://www.wvhdf.com",
  states: ["WV"],
  i18n: {
    en: { title: "West Virginia Housing Development Fund", desc: "State agency offering affordable home loans for West Virginia residents." },
    fr: { title: "West Virginia Housing Development Fund", desc: "Agence d'État offrant des prêts immobiliers abordables en Virginie-Occidentale." },
    es: { title: "West Virginia Housing Development Fund", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en Virginia Occidental." },
  },
},
{
  category: "Housing",
  link: "https://www.mainehousing.org",
  states: ["ME"],
  i18n: {
    en: { title: "MaineHousing", desc: "State agency offering affordable home loans and rental assistance for Maine residents." },
    fr: { title: "MaineHousing", desc: "Agence d'État offrant prêts immobiliers abordables et aide au loyer dans le Maine." },
    es: { title: "MaineHousing", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles y ayuda de alquiler en Maine." },
  },
},
{
  category: "Housing",
  link: "https://www.nhhfa.org",
  states: ["NH"],
  i18n: {
    en: { title: "New Hampshire Housing Finance Authority", desc: "State agency offering affordable home loans for New Hampshire residents." },
    fr: { title: "New Hampshire Housing Finance Authority", desc: "Agence d'État offrant des prêts immobiliers abordables au New Hampshire." },
    es: { title: "New Hampshire Housing Finance Authority", desc: "Agencia estatal que ofrece préstamos de vivienda asequibles en New Hampshire." },
  },
},
{
  category: "Housing",
  link: "https://www.wshfc.org/homeownership",
  states: ["WA"],
  i18n: {
    en: { title: "Washington Homeownership Program Details", desc: "Detailed program information for Washington home buyer assistance." },
    fr: { title: "Détails programme accession propriété Washington", desc: "Informations détaillées sur l'aide à l'accession à la propriété à Washington." },
    es: { title: "Detalles del Programa de Propiedad de Washington", desc: "Información detallada del programa de ayuda de compra de vivienda en Washington." },
  },
},
{
  category: "Housing",
  link: "https://www.azhousing.gov/homeownership",
  states: ["AZ"],
  i18n: {
    en: { title: "Arizona Homeownership Assistance Details", desc: "Detailed program information for Arizona home buyer assistance." },
    fr: { title: "Détails aide accession propriété Arizona", desc: "Informations détaillées sur l'aide à l'accession à la propriété en Arizona." },
    es: { title: "Detalles de Asistencia de Propiedad de Arizona", desc: "Información detallada del programa de ayuda de compra de vivienda en Arizona." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/homeownership_assistance",
  i18n: {
    en: { title: "HUD Homeownership Assistance Overview", desc: "Federal overview of homeownership assistance programs by state." },
    fr: { title: "Aperçu aide accession propriété HUD", desc: "Aperçu fédéral des programmes d'aide à l'accession à la propriété par État." },
    es: { title: "Resumen de Asistencia de Propiedad HUD", desc: "Resumen federal de programas de asistencia de propiedad por estado." },
  },
},
{
  category: "Housing",
  link: "https://www.downpaymentresource.com",
  i18n: {
    en: { title: "Down Payment Resource", desc: "Search tool to find down payment assistance programs by location." },
    fr: { title: "Down Payment Resource", desc: "Outil de recherche pour trouver des programmes d'aide à la mise de fonds." },
    es: { title: "Down Payment Resource", desc: "Herramienta de búsqueda para encontrar programas de ayuda de pago inicial." },
  },
},
{
  category: "Housing",
  link: "https://www.homebuyer.com/first-time-home-buyer-programs",
  i18n: {
    en: { title: "First-Time Home Buyer Programs Guide", desc: "Guide to state and federal programs for first-time home buyers." },
    fr: { title: "Guide programmes premier acheteur", desc: "Guide des programmes d'État et fédéraux pour premiers acheteurs immobiliers." },
    es: { title: "Guía de Programas para Compradores Primerizos", desc: "Guía de programas estatales y federales para compradores de vivienda primerizos." },
  },
},
{
  category: "Housing",
  link: "https://www.nationalhomebuyersfund.com",
  i18n: {
    en: { title: "National Homebuyers Fund", desc: "Down payment assistance grants for eligible home buyers nationwide." },
    fr: { title: "National Homebuyers Fund", desc: "Subventions d'aide à la mise de fonds pour acheteurs admissibles à l'échelle nationale." },
    es: { title: "National Homebuyers Fund", desc: "Subvenciones de ayuda de pago inicial para compradores elegibles a nivel nacional." },
  },
},
{
  category: "Housing",
  link: "https://www.chenoafund.org",
  i18n: {
    en: { title: "Chenoa Fund Down Payment Assistance", desc: "Down payment assistance program for eligible first-time home buyers." },
    fr: { title: "Chenoa Fund aide mise de fonds", desc: "Programme d'aide à la mise de fonds pour premiers acheteurs admissibles." },
    es: { title: "Chenoa Fund Ayuda de Pago Inicial", desc: "Programa de ayuda de pago inicial para compradores primerizos elegibles." },
  },
},
{
  category: "Housing",
  link: "https://www.neighborworks.org",
  i18n: {
    en: { title: "NeighborWorks America", desc: "Network of local organizations offering housing counseling and down payment help." },
    fr: { title: "NeighborWorks America", desc: "Réseau d'organismes locaux offrant conseil en logement et aide à la mise de fonds." },
    es: { title: "NeighborWorks America", desc: "Red de organizaciones locales que ofrecen consejería de vivienda y ayuda de pago inicial." },
  },
},
{
  category: "Housing",
  link: "https://www.nw.org/network/home",
  i18n: {
    en: { title: "NeighborWorks Network Directory", desc: "Directory of local NeighborWorks affiliate organizations by location." },
    fr: { title: "Répertoire réseau NeighborWorks", desc: "Répertoire des organismes affiliés locaux de NeighborWorks par emplacement." },
    es: { title: "Directorio de la Red NeighborWorks", desc: "Directorio de organizaciones afiliadas locales de NeighborWorks por ubicación." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/rental_assistance/housingcounseling",
  i18n: {
    en: { title: "HUD Housing Counseling Program", desc: "Federal program connecting people with certified housing counselors." },
    fr: { title: "Programme conseil logement HUD", desc: "Programme fédéral reliant les personnes à des conseillers en logement certifiés." },
    es: { title: "Programa de Consejería de Vivienda HUD", desc: "Programa federal que conecta a personas con consejeros de vivienda certificados." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/avoiding_foreclosure",
  i18n: {
    en: { title: "HUD Avoiding Foreclosure Resources", desc: "Federal resources helping homeowners avoid foreclosure and find assistance." },
    fr: { title: "Ressources éviter saisie HUD", desc: "Ressources fédérales aidant les propriétaires à éviter la saisie immobilière." },
    es: { title: "Recursos para Evitar Ejecución Hipotecaria HUD", desc: "Recursos federales que ayudan a propietarios a evitar la ejecución hipotecaria." },
  },
},
{
  category: "Housing",
  link: "https://www.makinghomeaffordable.gov",
  i18n: {
    en: { title: "Making Home Affordable Program Info", desc: "Federal historical resource on mortgage modification and foreclosure prevention." },
    fr: { title: "Info programme Making Home Affordable", desc: "Ressource historique fédérale sur la modification hypothécaire et la prévention de saisie." },
    es: { title: "Información del Programa Making Home Affordable", desc: "Recurso histórico federal sobre modificación hipotecaria y prevención de ejecución." },
  },
},

// UTILITIES (30)
{
  category: "Utilities",
  link: "https://www.doe.wa.gov/liheap",
  states: ["WA"],
  i18n: {
    en: { title: "Washington LIHEAP", desc: "State energy assistance program information for Washington." },
    fr: { title: "LIHEAP Washington", desc: "Informations sur le programme d'aide énergétique de Washington." },
    es: { title: "LIHEAP de Washington", desc: "Información del programa de asistencia energética de Washington." },
  },
},
{
  category: "Utilities",
  link: "https://www.dcs.dc.gov/liheap",
  states: ["DC"],
  i18n: {
    en: { title: "DC LIHEAP", desc: "District energy assistance program information for Washington DC." },
    fr: { title: "LIHEAP DC", desc: "Informations sur le programme d'aide énergétique du district de Washington." },
    es: { title: "LIHEAP de DC", desc: "Información del programa de asistencia energética del Distrito de Columbia." },
  },
},
{
  category: "Utilities",
  link: "https://www.in.gov/ihcda/liheap",
  states: ["IN"],
  i18n: {
    en: { title: "Indiana LIHEAP", desc: "State energy assistance program information for Indiana." },
    fr: { title: "LIHEAP Indiana", desc: "Informations sur le programme d'aide énergétique de l'Indiana." },
    es: { title: "LIHEAP de Indiana", desc: "Información del programa de asistencia energética de Indiana." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/scep/wap/weatherization-assistance-program-network",
  i18n: {
    en: { title: "Weatherization Assistance Program Network Directory", desc: "Federal directory of local weatherization program providers by state." },
    fr: { title: "Répertoire réseau programme isolation", desc: "Répertoire fédéral des fournisseurs de programmes d'isolation par État." },
    es: { title: "Directorio de la Red del Programa de Climatización", desc: "Directorio federal de proveedores del programa de climatización por estado." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/scep/wap/homeowners",
  i18n: {
    en: { title: "Weatherization for Homeowners Guide", desc: "Federal guide to weatherization program benefits for eligible homeowners." },
    fr: { title: "Guide isolation propriétaires", desc: "Guide fédéral des avantages du programme d'isolation pour propriétaires admissibles." },
    es: { title: "Guía de Climatización para Propietarios", desc: "Guía federal de beneficios del programa de climatización para propietarios elegibles." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/scep/wap/renters",
  i18n: {
    en: { title: "Weatherization for Renters Guide", desc: "Federal guide to weatherization program benefits for eligible renters." },
    fr: { title: "Guide isolation locataires", desc: "Guide fédéral des avantages du programme d'isolation pour locataires admissibles." },
    es: { title: "Guía de Climatización para Inquilinos", desc: "Guía federal de beneficios del programa de climatización para inquilinos elegibles." },
  },
},
{
  category: "Utilities",
  link: "https://www.consumer.ftc.gov/articles/home-repair-scams",
  i18n: {
    en: { title: "FTC Home Repair Scam Prevention", desc: "Consumer guidance on avoiding home repair and weatherization scams." },
    fr: { title: "Prévention arnaques réparation domicile FTC", desc: "Conseils aux consommateurs pour éviter les arnaques de réparation domiciliaire." },
    es: { title: "Prevención de Estafas de Reparación del Hogar FTC", desc: "Orientación al consumidor para evitar estafas de reparación y climatización." },
  },
},
{
  category: "Utilities",
  link: "https://www.solarreviews.com/blog/low-income-solar-programs",
  i18n: {
    en: { title: "Low-Income Solar Programs by State", desc: "Independent guide to state-level solar assistance programs for low-income households." },
    fr: { title: "Programmes solaires faible revenu par État", desc: "Guide indépendant des programmes solaires d'État pour ménages à faible revenu." },
    es: { title: "Programas Solares de Bajos Ingresos por Estado", desc: "Guía independiente de programas solares estatales para hogares de bajos ingresos." },
  },
},
{
  category: "Utilities",
  link: "https://www.seia.org/initiatives/low-income-solar",
  i18n: {
    en: { title: "SEIA Low-Income Solar Initiatives", desc: "Solar industry association resources on low-income solar access programs." },
    fr: { title: "Initiatives solaires faible revenu SEIA", desc: "Ressources de l'association de l'industrie solaire sur l'accès solaire à faible revenu." },
    es: { title: "Iniciativas Solares de Bajos Ingresos SEIA", desc: "Recursos de la asociación de la industria solar sobre acceso solar de bajos ingresos." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/eere/solar/community-solar",
  i18n: {
    en: { title: "Community Solar Programs Info", desc: "Federal information on community solar programs that can lower energy bills." },
    fr: { title: "Info programmes solaires communautaires", desc: "Informations fédérales sur les programmes solaires communautaires réduisant les factures." },
    es: { title: "Información de Programas Solares Comunitarios", desc: "Información federal sobre programas solares comunitarios que reducen facturas." },
  },
},
{
  category: "Utilities",
  link: "https://www.communitysolar.org",
  i18n: {
    en: { title: "Community Solar Hub", desc: "Directory and resources for finding community solar subscription programs." },
    fr: { title: "Community Solar Hub", desc: "Répertoire et ressources pour trouver des programmes d'abonnement solaire communautaire." },
    es: { title: "Community Solar Hub", desc: "Directorio y recursos para encontrar programas de suscripción solar comunitaria." },
  },
},
{
  category: "Utilities",
  link: "https://www.pge.com/care",
  states: ["CA"],
  i18n: {
    en: { title: "PG&E CARE Discount Program", desc: "Utility discount program for qualifying low-income California households." },
    fr: { title: "Programme rabais PG&E CARE", desc: "Programme de rabais de services publics pour ménages à faible revenu en Californie." },
    es: { title: "Programa de Descuento PG&E CARE", desc: "Programa de descuento de servicios para hogares de bajos ingresos en California." },
  },
},
{
  category: "Utilities",
  link: "https://www.sce.com/save-money/CARE-FERA",
  states: ["CA"],
  i18n: {
    en: { title: "SCE CARE/FERA Discount Programs", desc: "Utility discount programs for qualifying Southern California households." },
    fr: { title: "Programmes rabais SCE CARE/FERA", desc: "Programmes de rabais de services publics pour ménages du sud de la Californie." },
    es: { title: "Programas de Descuento SCE CARE/FERA", desc: "Programas de descuento de servicios para hogares del sur de California." },
  },
},
{
  category: "Utilities",
  link: "https://www.coned.com/en/save-money/assistance-programs",
  states: ["NY"],
  i18n: {
    en: { title: "Con Edison Assistance Programs", desc: "Utility bill assistance programs for qualifying New York households." },
    fr: { title: "Programmes aide Con Edison", desc: "Programmes d'aide aux factures de services pour ménages de New York." },
    es: { title: "Programas de Asistencia Con Edison", desc: "Programas de asistencia de facturas de servicios para hogares de Nueva York." },
  },
},
{
  category: "Utilities",
  link: "https://www.dteenergy.com/us/en/residential/save-money-energy/assistance-programs.html",
  states: ["MI"],
  i18n: {
    en: { title: "DTE Energy Assistance Programs", desc: "Utility bill assistance programs for qualifying Michigan households." },
    fr: { title: "Programmes aide DTE Energy", desc: "Programmes d'aide aux factures de services pour ménages du Michigan." },
    es: { title: "Programas de Asistencia DTE Energy", desc: "Programas de asistencia de facturas de servicios para hogares de Michigan." },
  },
},
{
  category: "Utilities",
  link: "https://www.duke-energy.com/save-money/income-qualified-programs",
  states: ["NC", "SC", "FL", "IN", "OH", "KY"],
  i18n: {
    en: { title: "Duke Energy Income-Qualified Programs", desc: "Utility discount programs for qualifying households across Duke Energy territories." },
    fr: { title: "Programmes revenu admissible Duke Energy", desc: "Programmes de rabais pour ménages admissibles dans les territoires Duke Energy." },
    es: { title: "Programas de Ingresos Calificados Duke Energy", desc: "Programas de descuento para hogares elegibles en territorios de Duke Energy." },
  },
},
{
  category: "Utilities",
  link: "https://www.xcelenergy.com/billing_and_payment/payment_assistance",
  states: ["CO", "MN", "TX", "NM", "MI", "WI"],
  i18n: {
    en: { title: "Xcel Energy Payment Assistance", desc: "Utility bill assistance programs across Xcel Energy service territories." },
    fr: { title: "Aide paiement Xcel Energy", desc: "Programmes d'aide aux factures dans les territoires de service Xcel Energy." },
    es: { title: "Asistencia de Pago Xcel Energy", desc: "Programas de asistencia de facturas en territorios de servicio de Xcel Energy." },
  },
},
{
  category: "Utilities",
  link: "https://www.pplelectric.com/save-energy-and-money/get-bill-help.aspx",
  states: ["PA"],
  i18n: {
    en: { title: "PPL Electric Bill Help", desc: "Utility bill assistance programs for qualifying Pennsylvania households." },
    fr: { title: "Aide facture PPL Electric", desc: "Programmes d'aide aux factures pour ménages admissibles en Pennsylvanie." },
    es: { title: "Ayuda de Factura PPL Electric", desc: "Programas de asistencia de facturas para hogares elegibles en Pennsylvania." },
  },
},
{
  category: "Utilities",
  link: "https://www.comed.com/save-money/programs-services/income-qualified-programs",
  states: ["IL"],
  i18n: {
    en: { title: "ComEd Income-Qualified Programs", desc: "Utility discount programs for qualifying Illinois households." },
    fr: { title: "Programmes revenu admissible ComEd", desc: "Programmes de rabais pour ménages admissibles en Illinois." },
    es: { title: "Programas de Ingresos Calificados ComEd", desc: "Programas de descuento para hogares elegibles en Illinois." },
  },
},
{
  category: "Utilities",
  link: "https://www.georgiapower.com/save-money-and-energy/save-money/financial-assistance.html",
  states: ["GA"],
  i18n: {
    en: { title: "Georgia Power Financial Assistance", desc: "Utility bill assistance programs for qualifying Georgia households." },
    fr: { title: "Aide financière Georgia Power", desc: "Programmes d'aide aux factures pour ménages admissibles en Géorgie." },
    es: { title: "Asistencia Financiera Georgia Power", desc: "Programas de asistencia de facturas para hogares elegibles en Georgia." },
  },
},
{
  category: "Utilities",
  link: "https://www.aps.com/en/Residential/Service-Support/Assistance-Programs",
  states: ["AZ"],
  i18n: {
    en: { title: "APS Assistance Programs", desc: "Utility bill assistance programs for qualifying Arizona households." },
    fr: { title: "Programmes aide APS", desc: "Programmes d'aide aux factures pour ménages admissibles en Arizona." },
    es: { title: "Programas de Asistencia APS", desc: "Programas de asistencia de facturas para hogares elegibles en Arizona." },
  },
},
{
  category: "Utilities",
  link: "https://www.nvenergy.com/save-with-nv-energy/rebates/energy-assistance",
  states: ["NV"],
  i18n: {
    en: { title: "NV Energy Assistance Programs", desc: "Utility bill assistance programs for qualifying Nevada households." },
    fr: { title: "Programmes aide NV Energy", desc: "Programmes d'aide aux factures pour ménages admissibles au Nevada." },
    es: { title: "Programas de Asistencia NV Energy", desc: "Programas de asistencia de facturas para hogares elegibles en Nevada." },
  },
},
{
  category: "Utilities",
  link: "https://www.pse.com/en/save-energy-and-money/help-paying-your-bill",
  states: ["WA"],
  i18n: {
    en: { title: "Puget Sound Energy Bill Help", desc: "Utility bill assistance programs for qualifying Washington households." },
    fr: { title: "Aide facture Puget Sound Energy", desc: "Programmes d'aide aux factures pour ménages admissibles à Washington." },
    es: { title: "Ayuda de Factura Puget Sound Energy", desc: "Programas de asistencia de facturas para hogares elegibles en Washington." },
  },
},
{
  category: "Utilities",
  link: "https://www.oncor.com/en/pages/customer-assistance-programs.aspx",
  states: ["TX"],
  i18n: {
    en: { title: "Oncor Customer Assistance Programs", desc: "Utility bill assistance programs for qualifying Texas households." },
    fr: { title: "Programmes aide clients Oncor", desc: "Programmes d'aide aux factures pour ménages admissibles au Texas." },
    es: { title: "Programas de Asistencia al Cliente Oncor", desc: "Programas de asistencia de facturas para hogares elegibles en Texas." },
  },
},
{
  category: "Utilities",
  link: "https://www.fpl.com/save/programs/care-to-share.html",
  states: ["FL"],
  i18n: {
    en: { title: "FPL Care to Share Program", desc: "Emergency utility bill assistance for qualifying Florida households." },
    fr: { title: "Programme Care to Share FPL", desc: "Aide d'urgence aux factures de services pour ménages admissibles en Floride." },
    es: { title: "Programa Care to Share FPL", desc: "Asistencia de emergencia de facturas de servicios para hogares elegibles en Florida." },
  },
},
{
  category: "Utilities",
  link: "https://www.dominionenergy.com/we-are-here-to-help",
  states: ["VA", "NC", "SC", "OH", "UT"],
  i18n: {
    en: { title: "Dominion Energy Assistance Programs", desc: "Utility bill assistance programs across Dominion Energy service territories." },
    fr: { title: "Programmes aide Dominion Energy", desc: "Programmes d'aide aux factures dans les territoires de service Dominion Energy." },
    es: { title: "Programas de Asistencia Dominion Energy", desc: "Programas de asistencia de facturas en territorios de servicio de Dominion Energy." },
  },
},
{
  category: "Utilities",
  link: "https://www.eversource.com/content/residential/account-billing/payment-assistance",
  states: ["CT", "MA", "NH"],
  i18n: {
    en: { title: "Eversource Payment Assistance", desc: "Utility bill assistance programs across Eversource service territories." },
    fr: { title: "Aide paiement Eversource", desc: "Programmes d'aide aux factures dans les territoires de service Eversource." },
    es: { title: "Asistencia de Pago Eversource", desc: "Programas de asistencia de facturas en territorios de servicio de Eversource." },
  },
},
{
  category: "Utilities",
  link: "https://www.nationalgridus.com/Our-Community/Assistance-Programs",
  states: ["NY", "MA", "RI"],
  i18n: {
    en: { title: "National Grid Assistance Programs", desc: "Utility bill assistance programs across National Grid service territories." },
    fr: { title: "Programmes aide National Grid", desc: "Programmes d'aide aux factures dans les territoires de service National Grid." },
    es: { title: "Programas de Asistencia National Grid", desc: "Programas de asistencia de facturas en territorios de servicio de National Grid." },
  },
},

// EDUCATION (30)
{
  category: "Education",
  link: "https://www.studentaid.gov/help-center",
  i18n: {
    en: { title: "Federal Student Aid Help Center", desc: "Official help center answering common federal student aid questions." },
    fr: { title: "Centre d'aide Federal Student Aid", desc: "Centre d'aide officiel répondant aux questions courantes sur l'aide fédérale." },
    es: { title: "Centro de Ayuda de Ayuda Federal para Estudiantes", desc: "Centro de ayuda oficial que responde preguntas comunes sobre ayuda federal." },
  },
},
{
  category: "Education",
  link: "https://www.studentaid.gov/data-center",
  i18n: {
    en: { title: "Federal Student Aid Data Center", desc: "Official statistics and data on federal student aid disbursement." },
    fr: { title: "Centre de données Federal Student Aid", desc: "Statistiques et données officielles sur le versement de l'aide fédérale." },
    es: { title: "Centro de Datos de Ayuda Federal para Estudiantes", desc: "Estadísticas y datos oficiales sobre el desembolso de ayuda federal." },
  },
},
{
  category: "Education",
  link: "https://www.consumerfinance.gov/consumer-tools/student-loans/",
  i18n: {
    en: { title: "CFPB Student Loan Tools", desc: "Federal consumer tools for managing and understanding student loans." },
    fr: { title: "Outils prêts étudiants CFPB", desc: "Outils consommateurs fédéraux pour gérer et comprendre les prêts étudiants." },
    es: { title: "Herramientas de Préstamos Estudiantiles CFPB", desc: "Herramientas del consumidor federal para manejar y entender préstamos estudiantiles." },
  },
},
{
  category: "Education",
  link: "https://www.consumerfinance.gov/consumer-tools/student-loans/answers/",
  i18n: {
    en: { title: "CFPB Student Loan FAQ", desc: "Answers to common questions about student loan repayment and forgiveness." },
    fr: { title: "FAQ prêts étudiants CFPB", desc: "Réponses aux questions courantes sur le remboursement et l'annulation de prêts." },
    es: { title: "Preguntas Frecuentes de Préstamos Estudiantiles CFPB", desc: "Respuestas a preguntas comunes sobre reembolso y condonación de préstamos." },
  },
},
{
  category: "Education",
  link: "https://www.studentloanborrowerassistance.org",
  i18n: {
    en: { title: "Student Loan Borrower Assistance", desc: "Independent guidance for navigating student loan repayment issues." },
    fr: { title: "Student Loan Borrower Assistance", desc: "Conseils indépendants pour naviguer les problèmes de remboursement de prêts." },
    es: { title: "Student Loan Borrower Assistance", desc: "Orientación independiente para navegar problemas de reembolso de préstamos." },
  },
},
{
  category: "Education",
  link: "https://www.tisla.org",
  i18n: {
    en: { title: "The Institute for Student Loan Advisors", desc: "Free advising services helping borrowers navigate student loan repayment." },
    fr: { title: "The Institute for Student Loan Advisors", desc: "Services de conseil gratuits aidant les emprunteurs à naviguer le remboursement." },
    es: { title: "The Institute for Student Loan Advisors", desc: "Servicios de asesoría gratuitos que ayudan a prestatarios a navegar el reembolso." },
  },
},
{
  category: "Education",
  link: "https://www.saveonstudentdebt.com",
  i18n: {
    en: { title: "Save on Student Debt", desc: "Independent resources helping borrowers reduce student loan costs." },
    fr: { title: "Save on Student Debt", desc: "Ressources indépendantes aidant les emprunteurs à réduire les coûts de prêts." },
    es: { title: "Save on Student Debt", desc: "Recursos independientes que ayudan a prestatarios a reducir costos de préstamos." },
  },
},
{
  category: "Education",
  link: "https://www.aft.org/loanforgiveness",
  i18n: {
    en: { title: "AFT Student Loan Forgiveness Info", desc: "Union resources on loan forgiveness for eligible education workers." },
    fr: { title: "Info annulation prêts AFT", desc: "Ressources syndicales sur l'annulation de prêts pour travailleurs de l'éducation." },
    es: { title: "Información de Condonación de Préstamos AFT", desc: "Recursos sindicales sobre condonación de préstamos para trabajadores de educación." },
  },
},
{
  category: "Education",
  link: "https://www.nea.org/resource-library/student-loan-forgiveness",
  i18n: {
    en: { title: "NEA Student Loan Forgiveness Resources", desc: "Educator-focused resources on student loan forgiveness eligibility." },
    fr: { title: "Ressources annulation prêts NEA", desc: "Ressources axées sur les éducateurs concernant l'admissibilité à l'annulation." },
    es: { title: "Recursos de Condonación de Préstamos NEA", desc: "Recursos enfocados en educadores sobre elegibilidad de condonación de préstamos." },
  },
},
{
  category: "Education",
  link: "https://www.studentaid.gov/manage-loans/forgiveness-cancellation/teacher",
  i18n: {
    en: { title: "Teacher Loan Forgiveness Program", desc: "Federal loan forgiveness program for eligible teachers in low-income schools." },
    fr: { title: "Programme annulation prêts enseignants", desc: "Programme fédéral d'annulation de prêts pour enseignants d'écoles à faible revenu." },
    es: { title: "Programa de Condonación de Préstamos para Maestros", desc: "Programa federal de condonación de préstamos para maestros en escuelas de bajos ingresos." },
  },
},
{
  category: "Education",
  link: "https://www.nurse.org/articles/nursing-school-loan-forgiveness/",
  i18n: {
    en: { title: "Nursing Student Loan Forgiveness Guide", desc: "Guide to loan forgiveness programs available for nursing professionals." },
    fr: { title: "Guide annulation prêts infirmiers", desc: "Guide des programmes d'annulation de prêts pour professionnels infirmiers." },
    es: { title: "Guía de Condonación de Préstamos para Enfermeras", desc: "Guía de programas de condonación de préstamos para profesionales de enfermería." },
  },
},
{
  category: "Education",
  link: "https://www.hrsa.gov/loan-scholarships",
  i18n: {
    en: { title: "HRSA Loan Repayment and Scholarship Programs", desc: "Federal loan repayment and scholarship programs for health professionals." },
    fr: { title: "Programmes remboursement et bourses HRSA", desc: "Programmes fédéraux de remboursement de prêts et bourses pour professionnels de la santé." },
    es: { title: "Programas de Reembolso de Préstamos y Becas HRSA", desc: "Programas federales de reembolso de préstamos y becas para profesionales de la salud." },
  },
},
{
  category: "Education",
  link: "https://www.nhsc.hrsa.gov/loan-repayment",
  i18n: {
    en: { title: "National Health Service Corps Loan Repayment", desc: "Federal loan repayment for health professionals serving underserved areas." },
    fr: { title: "Remboursement prêts National Health Service Corps", desc: "Remboursement de prêts fédéral pour professionnels de santé servant zones défavorisées." },
    es: { title: "Reembolso de Préstamos National Health Service Corps", desc: "Reembolso de préstamos federal para profesionales de salud en áreas desatendidas." },
  },
},
{
  category: "Education",
  link: "https://www.va.gov/education/about-gi-bill-benefits/",
  i18n: {
    en: { title: "GI Bill Benefits Overview", desc: "Federal overview of education benefits available to veterans and dependents." },
    fr: { title: "Aperçu prestations GI Bill", desc: "Aperçu fédéral des prestations éducatives pour vétérans et personnes à charge." },
    es: { title: "Resumen de Beneficios GI Bill", desc: "Resumen federal de beneficios educativos para veteranos y dependientes." },
  },
},
{
  category: "Education",
  link: "https://www.va.gov/education/gi-bill-comparison-tool/",
  i18n: {
    en: { title: "GI Bill Comparison Tool", desc: "Official tool to compare schools and estimate GI Bill education benefits." },
    fr: { title: "Outil comparaison GI Bill", desc: "Outil officiel pour comparer les écoles et estimer les prestations GI Bill." },
    es: { title: "Herramienta de Comparación GI Bill", desc: "Herramienta oficial para comparar escuelas y estimar beneficios educativos GI Bill." },
  },
},
{
  category: "Education",
  link: "https://www.va.gov/education/survivor-dependent-benefits/dependents-education-assistance/",
  i18n: {
    en: { title: "VA Dependents Education Assistance", desc: "Education benefits for spouses and children of disabled or deceased veterans." },
    fr: { title: "Aide éducation personnes à charge VA", desc: "Prestations éducatives pour conjoints et enfants de vétérans handicapés ou décédés." },
    es: { title: "Asistencia Educativa para Dependientes VA", desc: "Beneficios educativos para cónyuges e hijos de veteranos discapacitados o fallecidos." },
  },
},
{
  category: "Education",
  link: "https://www.studentveterans.org",
  i18n: {
    en: { title: "Student Veterans of America", desc: "Support and resources for veterans pursuing higher education." },
    fr: { title: "Student Veterans of America", desc: "Soutien et ressources pour vétérans poursuivant des études supérieures." },
    es: { title: "Student Veterans of America", desc: "Apoyo y recursos para veteranos que buscan educación superior." },
  },
},
{
  category: "Education",
  link: "https://www.warriorscholar.org",
  i18n: {
    en: { title: "Warrior-Scholar Project", desc: "Academic boot camps helping veterans transition into higher education." },
    fr: { title: "Warrior-Scholar Project", desc: "Camps académiques aidant les vétérans à faire la transition vers les études supérieures." },
    es: { title: "Warrior-Scholar Project", desc: "Campamentos académicos que ayudan a veteranos a hacer la transición a educación superior." },
  },
},
{
  category: "Education",
  link: "https://www.vetsuccess.gov",
  i18n: {
    en: { title: "VetSuccess", desc: "Federal resources supporting veteran education, career, and employment success." },
    fr: { title: "VetSuccess", desc: "Ressources fédérales soutenant la réussite éducative et professionnelle des vétérans." },
    es: { title: "VetSuccess", desc: "Recursos federales que apoyan el éxito educativo y profesional de veteranos." },
  },
},
{
  category: "Education",
  link: "https://www.va.gov/vre/",
  i18n: {
    en: { title: "VA Vocational Rehabilitation and Employment", desc: "Federal program helping disabled veterans train for and find careers." },
    fr: { title: "Réadaptation professionnelle et emploi VA", desc: "Programme fédéral aidant les vétérans handicapés à se former et trouver un emploi." },
    es: { title: "Rehabilitación Vocacional y Empleo VA", desc: "Programa federal que ayuda a veteranos discapacitados a capacitarse y encontrar empleo." },
  },
},
{
  category: "Education",
  link: "https://www.dol.gov/agencies/vets/programs/apprenticeship",
  i18n: {
    en: { title: "DOL Veterans Apprenticeship Programs", desc: "Federal apprenticeship program info specifically for veterans." },
    fr: { title: "Programmes apprentissage vétérans DOL", desc: "Informations sur les programmes d'apprentissage fédéraux spécifiquement pour vétérans." },
    es: { title: "Programas de Aprendizaje para Veteranos DOL", desc: "Información de programas de aprendizaje federal específicamente para veteranos." },
  },
},
{
  category: "Education",
  link: "https://www.hiringourheroes.org",
  i18n: {
    en: { title: "Hiring Our Heroes", desc: "Career training, fellowships, and job placement for veterans and military spouses." },
    fr: { title: "Hiring Our Heroes", desc: "Formation professionnelle, bourses et placement pour vétérans et conjoints militaires." },
    es: { title: "Hiring Our Heroes", desc: "Capacitación profesional, becas y colocación laboral para veteranos y cónyuges militares." },
  },
},
{
  category: "Education",
  link: "https://www.onward2opportunity.org",
  i18n: {
    en: { title: "Onward to Opportunity", desc: "Free career training and certification programs for transitioning service members." },
    fr: { title: "Onward to Opportunity", desc: "Programmes gratuits de formation et certification pour militaires en transition." },
    es: { title: "Onward to Opportunity", desc: "Programas gratuitos de capacitación y certificación para militares en transición." },
  },
},
{
  category: "Education",
  link: "https://www.vetjobs.org",
  i18n: {
    en: { title: "VetJobs", desc: "Job board and career resources specifically for veterans and military spouses." },
    fr: { title: "VetJobs", desc: "Portail d'emploi et ressources de carrière spécifiquement pour vétérans." },
    es: { title: "VetJobs", desc: "Bolsa de trabajo y recursos de carrera específicamente para veteranos." },
  },
},
{
  category: "Education",
  link: "https://www.recruitmilitary.com",
  i18n: {
    en: { title: "RecruitMilitary", desc: "Job board and career fairs connecting veterans with employers." },
    fr: { title: "RecruitMilitary", desc: "Portail d'emploi et salons de carrière reliant vétérans et employeurs." },
    es: { title: "RecruitMilitary", desc: "Bolsa de trabajo y ferias de carrera que conectan veteranos con empleadores." },
  },
},
{
  category: "Education",
  link: "https://www.corporategray.com",
  i18n: {
    en: { title: "Corporate Gray Military-to-Civilian Job Search", desc: "Job search resources helping veterans transition to civilian careers." },
    fr: { title: "Corporate Gray recherche emploi militaire-civil", desc: "Ressources de recherche d'emploi aidant les vétérans à passer au civil." },
    es: { title: "Corporate Gray Búsqueda de Empleo Militar-Civil", desc: "Recursos de búsqueda de empleo que ayudan a veteranos a hacer la transición civil." },
  },
},
{
  category: "Education",
  link: "https://www.military.com/education",
  i18n: {
    en: { title: "Military.com Education Resources", desc: "Education benefits information and school search for military families." },
    fr: { title: "Ressources éducation Military.com", desc: "Informations sur les prestations éducatives et recherche d'école pour familles militaires." },
    es: { title: "Recursos Educativos Military.com", desc: "Información de beneficios educativos y búsqueda de escuelas para familias militares." },
  },
},
{
  category: "Education",
  link: "https://www.gijobs.com",
  i18n: {
    en: { title: "G.I. Jobs", desc: "Career and education resources specifically curated for military veterans." },
    fr: { title: "G.I. Jobs", desc: "Ressources de carrière et d'éducation spécifiquement conçues pour vétérans militaires." },
    es: { title: "G.I. Jobs", desc: "Recursos de carrera y educación específicamente diseñados para veteranos militares." },
  },
},
{
  category: "Education",
  link: "https://www.militaryfriendly.com",
  i18n: {
    en: { title: "Military Friendly Schools and Employers", desc: "Rankings and directory of schools and employers supportive of veterans." },
    fr: { title: "Écoles et employeurs Military Friendly", desc: "Classements et répertoire d'écoles et employeurs favorables aux vétérans." },
    es: { title: "Escuelas y Empleadores Military Friendly", desc: "Clasificaciones y directorio de escuelas y empleadores favorables a veteranos." },
  },
},

// INCOME (36)
{
  category: "Income",
  link: "https://www.ssa.gov/pubs/EN-05-10029.pdf",
  i18n: {
    en: { title: "SSA Survivors Benefits Guide", desc: "Official guide to Social Security survivor benefits for family members." },
    fr: { title: "Guide prestations survivants SSA", desc: "Guide officiel des prestations de survivant de la Sécurité sociale pour la famille." },
    es: { title: "Guía de Beneficios de Sobrevivientes SSA", desc: "Guía oficial de beneficios de sobreviviente del Seguro Social para familiares." },
  },
},
{
  category: "Income",
  link: "https://www.ssa.gov/survivorplan/",
  i18n: {
    en: { title: "SSA Survivors Planning Tool", desc: "Official planning tool for understanding Social Security survivor benefits." },
    fr: { title: "Outil planification survivants SSA", desc: "Outil de planification officiel pour comprendre les prestations de survivant." },
    es: { title: "Herramienta de Planificación de Sobrevivientes SSA", desc: "Herramienta oficial de planificación para entender beneficios de sobreviviente." },
  },
},
{
  category: "Income",
  link: "https://www.ssa.gov/benefits/survivors/",
  i18n: {
    en: { title: "SSA Survivor Benefits Overview", desc: "Official overview of who qualifies for Social Security survivor benefits." },
    fr: { title: "Aperçu prestations survivants SSA", desc: "Aperçu officiel des personnes admissibles aux prestations de survivant." },
    es: { title: "Resumen de Beneficios de Sobrevivientes SSA", desc: "Resumen oficial de quién califica para beneficios de sobreviviente del Seguro Social." },
  },
},
{
  category: "Income",
  link: "https://www.va.gov/burials-memorials/veterans-burial-allowance/",
  i18n: {
    en: { title: "VA Veterans Burial Allowance", desc: "Federal benefit helping cover burial costs for eligible deceased veterans." },
    fr: { title: "Allocation funérailles vétérans VA", desc: "Prestation fédérale aidant à couvrir les frais funéraires pour vétérans décédés admissibles." },
    es: { title: "Subsidio de Entierro para Veteranos VA", desc: "Beneficio federal que ayuda a cubrir costos funerarios para veteranos fallecidos elegibles." },
  },
},
{
  category: "Income",
  link: "https://www.va.gov/burials-memorials/dependency-indemnity-compensation/",
  i18n: {
    en: { title: "VA Dependency and Indemnity Compensation", desc: "Federal benefit for survivors of veterans who died from service-related causes." },
    fr: { title: "Indemnisation dépendance et décès VA", desc: "Prestation fédérale pour survivants de vétérans décédés de causes liées au service." },
    es: { title: "Compensación por Dependencia e Indemnización VA", desc: "Beneficio federal para sobrevivientes de veteranos fallecidos por causas relacionadas al servicio." },
  },
},
{
  category: "Income",
  link: "https://www.211.org/services/burial-assistance",
  i18n: {
    en: { title: "211 Burial Assistance Directory", desc: "Local funeral and burial cost assistance referrals through the 211 network." },
    fr: { title: "Répertoire aide funérailles 211", desc: "Orientation vers l'aide aux frais funéraires locaux via le réseau 211." },
    es: { title: "Directorio de Asistencia Funeraria 211", desc: "Referencias de asistencia de costos funerarios locales a través de la red 211." },
  },
},
{
  category: "Income",
  link: "https://www.funeralconsumersalliance.org",
  i18n: {
    en: { title: "Funeral Consumers Alliance", desc: "Consumer advocacy and resources for affordable funeral planning." },
    fr: { title: "Funeral Consumers Alliance", desc: "Plaidoyer et ressources consommateur pour une planification funéraire abordable." },
    es: { title: "Funeral Consumers Alliance", desc: "Defensa y recursos del consumidor para planificación funeraria asequible." },
  },
},
{
  category: "Income",
  link: "https://www.consumer.ftc.gov/articles/paying-final-expenses",
  i18n: {
    en: { title: "FTC Paying for Final Expenses Guide", desc: "Consumer guidance on planning and paying for funeral and burial costs." },
    fr: { title: "Guide paiement dépenses finales FTC", desc: "Conseils consommateur pour planifier et payer les frais funéraires." },
    es: { title: "Guía de Pago de Gastos Finales FTC", desc: "Orientación al consumidor para planificar y pagar costos funerarios y de entierro." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/eta/dislocated-workers",
  i18n: {
    en: { title: "DOL Dislocated Worker Program", desc: "Federal retraining and support services for workers who lost jobs due to layoffs." },
    fr: { title: "Programme travailleurs déplacés DOL", desc: "Services fédéraux de reconversion pour travailleurs ayant perdu leur emploi." },
    es: { title: "Programa de Trabajadores Desplazados DOL", desc: "Servicios federales de recapacitación para trabajadores que perdieron empleo por despidos." },
  },
},
{
  category: "Income",
  link: "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/american-job-centers.aspx",
  i18n: {
    en: { title: "American Job Center Finder", desc: "Official directory of local job centers offering career and unemployment services." },
    fr: { title: "Recherche centre emploi américain", desc: "Répertoire officiel des centres d'emploi locaux offrant services de carrière." },
    es: { title: "Buscador de Centros de Empleo Americanos", desc: "Directorio oficial de centros de empleo locales que ofrecen servicios de carrera." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/eta/wioa",
  i18n: {
    en: { title: "Workforce Innovation and Opportunity Act Info", desc: "Federal job training law providing funding for workforce development programs." },
    fr: { title: "Info loi innovation et opportunité main-d'œuvre", desc: "Loi fédérale de formation professionnelle finançant des programmes de développement." },
    es: { title: "Información de la Ley de Innovación y Oportunidad Laboral", desc: "Ley federal de capacitación laboral que financia programas de desarrollo laboral." },
  },
},
{
  category: "Income",
  link: "https://www.jobcorps.gov",
  i18n: {
    en: { title: "Job Corps", desc: "Free federal education and career training program for young people ages 16-24." },
    fr: { title: "Job Corps", desc: "Programme fédéral gratuit d'éducation et formation professionnelle pour jeunes de 16 à 24 ans." },
    es: { title: "Job Corps", desc: "Programa federal gratuito de educación y capacitación profesional para jóvenes de 16 a 24 años." },
  },
},
{
  category: "Income",
  link: "https://www.doleta.gov/jobcorps",
  i18n: {
    en: { title: "DOL Job Corps Center Locator", desc: "Official directory to find Job Corps training centers by location." },
    fr: { title: "Localisateur centres Job Corps DOL", desc: "Répertoire officiel pour trouver des centres de formation Job Corps par emplacement." },
    es: { title: "Localizador de Centros Job Corps DOL", desc: "Directorio oficial para encontrar centros de capacitación Job Corps por ubicación." },
  },
},
{
  category: "Income",
  link: "https://www.dol.gov/agencies/eta/youth",
  i18n: {
    en: { title: "DOL Youth Employment Programs", desc: "Federal employment and training programs specifically for young workers." },
    fr: { title: "Programmes emploi jeunesse DOL", desc: "Programmes fédéraux d'emploi et de formation spécifiquement pour jeunes travailleurs." },
    es: { title: "Programas de Empleo Juvenil DOL", desc: "Programas federales de empleo y capacitación específicamente para trabajadores jóvenes." },
  },
},
{
  category: "Income",
  link: "https://www.yearup.org/apply",
  i18n: {
    en: { title: "Year Up Application Info", desc: "Application details for the Year Up career training and internship program." },
    fr: { title: "Info candidature Year Up", desc: "Détails de candidature pour le programme de formation et stage Year Up." },
    es: { title: "Información de Solicitud Year Up", desc: "Detalles de solicitud para el programa de capacitación y pasantías Year Up." },
  },
},
{
  category: "Income",
  link: "https://www.jff.org",
  i18n: {
    en: { title: "Jobs for the Future", desc: "Workforce development resources and career pathway program information." },
    fr: { title: "Jobs for the Future", desc: "Ressources de développement de la main-d'œuvre et information sur les parcours de carrière." },
    es: { title: "Jobs for the Future", desc: "Recursos de desarrollo laboral e información de programas de trayectoria profesional." },
  },
},
{
  category: "Income",
  link: "https://www.goodwill.org/jobs/",
  i18n: {
    en: { title: "Goodwill Job Training Programs", desc: "Free job training, resume help, and employment services through local Goodwill." },
    fr: { title: "Programmes formation emploi Goodwill", desc: "Formation professionnelle gratuite, aide au CV et services d'emploi via Goodwill." },
    es: { title: "Programas de Capacitación Laboral Goodwill", desc: "Capacitación laboral gratuita, ayuda de currículum y servicios de empleo vía Goodwill." },
  },
},
{
  category: "Income",
  link: "https://www.salvationarmyusa.org/usn/workforce-development/",
  i18n: {
    en: { title: "Salvation Army Workforce Development", desc: "Job training and employment support services through local Salvation Army units." },
    fr: { title: "Développement main-d'œuvre Armée du Salut", desc: "Formation professionnelle et soutien à l'emploi via les unités locales." },
    es: { title: "Desarrollo Laboral Ejército de Salvación", desc: "Capacitación laboral y apoyo de empleo a través de unidades locales." },
  },
},
{
  category: "Income",
  link: "https://www.catholiccharitiesusa.org/find-help/employment/",
  i18n: {
    en: { title: "Catholic Charities Employment Services", desc: "Job search and career support services through local Catholic Charities." },
    fr: { title: "Services emploi Catholic Charities", desc: "Services de recherche d'emploi et de soutien de carrière via Catholic Charities." },
    es: { title: "Servicios de Empleo Catholic Charities", desc: "Servicios de búsqueda de empleo y apoyo profesional a través de Catholic Charities." },
  },
},
{
  category: "Income",
  link: "https://www.jvs-boston.org",
  states: ["MA"],
  i18n: {
    en: { title: "JVS Boston", desc: "Career training and employment services for job seekers in the Boston area." },
    fr: { title: "JVS Boston", desc: "Formation professionnelle et services d'emploi pour chercheurs d'emploi dans la région de Boston." },
    es: { title: "JVS Boston", desc: "Capacitación profesional y servicios de empleo para buscadores de empleo en el área de Boston." },
  },
},
{
  category: "Income",
  link: "https://www.stride.org",
  i18n: {
    en: { title: "STRIDE Community Health Center Employment Services", desc: "Employment support services connected to community health programs." },
    fr: { title: "Services emploi STRIDE Community Health Center", desc: "Services de soutien à l'emploi liés aux programmes de santé communautaire." },
    es: { title: "Servicios de Empleo STRIDE Community Health Center", desc: "Servicios de apoyo de empleo conectados a programas de salud comunitaria." },
  },
},
{
  category: "Income",
  link: "https://www.workforcegps.org",
  i18n: {
    en: { title: "WorkforceGPS", desc: "Federal workforce development resource hub with training and career tools." },
    fr: { title: "WorkforceGPS", desc: "Centre de ressources fédéral de développement de la main-d'œuvre avec outils de formation." },
    es: { title: "WorkforceGPS", desc: "Centro de recursos federal de desarrollo laboral con herramientas de capacitación y carrera." },
  },
},
{
  category: "Income",
  link: "https://www.onetonline.org",
  i18n: {
    en: { title: "O*NET Online", desc: "Federal career exploration database with detailed occupational information." },
    fr: { title: "O*NET Online", desc: "Base de données fédérale d'exploration de carrière avec informations professionnelles détaillées." },
    es: { title: "O*NET Online", desc: "Base de datos federal de exploración de carreras con información ocupacional detallada." },
  },
},
{
  category: "Income",
  link: "https://www.bls.gov/ooh/",
  i18n: {
    en: { title: "Occupational Outlook Handbook", desc: "Federal guide to job outlook, pay, and requirements across occupations." },
    fr: { title: "Occupational Outlook Handbook", desc: "Guide fédéral des perspectives d'emploi, salaires et exigences par profession." },
    es: { title: "Occupational Outlook Handbook", desc: "Guía federal de perspectivas de empleo, salarios y requisitos por ocupación." },
  },
},
{
  category: "Income",
  link: "https://www.bls.gov/bls/blswage.htm",
  i18n: {
    en: { title: "BLS Wage Data", desc: "Federal wage statistics by occupation, industry, and location." },
    fr: { title: "Données salariales BLS", desc: "Statistiques salariales fédérales par profession, industrie et emplacement." },
    es: { title: "Datos Salariales BLS", desc: "Estadísticas salariales federales por ocupación, industria y ubicación." },
  },
},
{
  category: "Income",
  link: "https://www.indeed.com/career-advice",
  i18n: {
    en: { title: "Indeed Career Advice", desc: "Free career advice, resume tips, and job search resources." },
    fr: { title: "Conseils carrière Indeed", desc: "Conseils de carrière gratuits, conseils de CV et ressources de recherche d'emploi." },
    es: { title: "Consejos de Carrera Indeed", desc: "Consejos de carrera gratuitos, consejos de currículum y recursos de búsqueda de empleo." },
  },
},
{
  category: "Income",
  link: "https://www.linkedin.com/learning",
  i18n: {
    en: { title: "LinkedIn Learning", desc: "Online courses for professional development, often free through public libraries." },
    fr: { title: "LinkedIn Learning", desc: "Cours en ligne pour le développement professionnel, souvent gratuits via bibliothèques." },
    es: { title: "LinkedIn Learning", desc: "Cursos en línea para desarrollo profesional, a menudo gratuitos a través de bibliotecas." },
  },
},
{
  category: "Income",
  link: "https://www.coursera.org/courses?query=financial%20aid",
  i18n: {
    en: { title: "Coursera Financial Aid Courses", desc: "Online courses with financial aid available for eligible learners." },
    fr: { title: "Cours aide financière Coursera", desc: "Cours en ligne avec aide financière disponible pour apprenants admissibles." },
    es: { title: "Cursos de Ayuda Financiera Coursera", desc: "Cursos en línea con ayuda financiera disponible para estudiantes elegibles." },
  },
},
{
  category: "Income",
  link: "https://www.edx.org/financial-assistance",
  i18n: {
    en: { title: "edX Financial Assistance", desc: "Financial assistance program for edX online courses and certificates." },
    fr: { title: "Aide financière edX", desc: "Programme d'aide financière pour cours et certificats en ligne edX." },
    es: { title: "Asistencia Financiera edX", desc: "Programa de asistencia financiera para cursos y certificados en línea edX." },
  },
},
{
  category: "Income",
  link: "https://www.udacity.com/scholarships",
  i18n: {
    en: { title: "Udacity Scholarships", desc: "Scholarships for tech career-focused online nanodegree programs." },
    fr: { title: "Bourses Udacity", desc: "Bourses pour programmes de nanodiplômes en ligne axés sur les carrières technologiques." },
    es: { title: "Becas Udacity", desc: "Becas para programas de nanodegree en línea enfocados en carreras tecnológicas." },
  },
},
{
  category: "Income",
  link: "https://www.freecodecamp.org/news/tag/career-advice/",
  i18n: {
    en: { title: "freeCodeCamp Career Advice", desc: "Free career advice for people transitioning into tech careers." },
    fr: { title: "Conseils carrière freeCodeCamp", desc: "Conseils de carrière gratuits pour personnes en transition vers des carrières technologiques." },
    es: { title: "Consejos de Carrera freeCodeCamp", desc: "Consejos de carrera gratuitos para personas en transición a carreras tecnológicas." },
  },
},
{
  category: "Income",
  link: "https://www.techhire.org",
  i18n: {
    en: { title: "TechHire Initiative", desc: "Coalition connecting underrepresented workers to tech career training." },
    fr: { title: "TechHire Initiative", desc: "Coalition reliant les travailleurs sous-représentés à la formation technologique." },
    es: { title: "TechHire Initiative", desc: "Coalición que conecta a trabajadores subrepresentados con capacitación tecnológica." },
  },
},
{
  category: "Income",
  link: "https://www.launchcode.org",
  i18n: {
    en: { title: "LaunchCode", desc: "Free coding education and apprenticeship placement for career changers." },
    fr: { title: "LaunchCode", desc: "Éducation en codage gratuite et placement en apprentissage pour reconversions professionnelles." },
    es: { title: "LaunchCode", desc: "Educación de programación gratuita y colocación de aprendizaje para cambios de carrera." },
  },
},
{
  category: "Income",
  link: "https://www.operationcode.org",
  i18n: {
    en: { title: "Operation Code", desc: "Free coding education and mentorship for veterans and military spouses." },
    fr: { title: "Operation Code", desc: "Éducation en codage gratuite et mentorat pour vétérans et conjoints militaires." },
    es: { title: "Operation Code", desc: "Educación de programación gratuita y mentoría para veteranos y cónyuges militares." },
  },
},
  // ===== PROGRAMS 1701-2000 =====

// FOOD (50)
{
  category: "Food",
  link: "https://www.acf.hhs.gov/ocs/programs/csbg/csbg-eligibility",
  i18n: {
    en: { title: "CSBG Eligibility Guidelines", desc: "Federal eligibility rules for Community Services Block Grant assistance." },
    fr: { title: "Directives admissibilité CSBG", desc: "Règles fédérales d'admissibilité pour l'aide de la subvention en bloc des services communautaires." },
    es: { title: "Directrices de Elegibilidad CSBG", desc: "Reglas federales de elegibilidad para asistencia de la subvención en bloque de servicios comunitarios." },
  },
},
{
  category: "Food",
  link: "https://www.communityaction.org",
  i18n: {
    en: { title: "Community Action Partnership National Site", desc: "National network connecting people to local community action agency services." },
    fr: { title: "Site national Community Action Partnership", desc: "Réseau national reliant les personnes aux services des agences d'action communautaire." },
    es: { title: "Sitio Nacional Community Action Partnership", desc: "Red nacional que conecta a personas con servicios de agencias de acción comunitaria." },
  },
},
{
  category: "Food",
  link: "https://www.capdc.org",
  i18n: {
    en: { title: "Community Action Partnership of Douglas County Example", desc: "Example local community action agency offering food and family services." },
    fr: { title: "Exemple Community Action Partnership Douglas County", desc: "Exemple d'agence d'action communautaire locale offrant services alimentaires et familiaux." },
    es: { title: "Ejemplo Community Action Partnership Douglas County", desc: "Ejemplo de agencia de acción comunitaria local que ofrece servicios de alimentos y familia." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/il",
  states: ["IL"],
  i18n: {
    en: { title: "Illinois Food Pantries Directory", desc: "County-level directory of food pantries across Illinois." },
    fr: { title: "Répertoire garde-manger Illinois", desc: "Répertoire par comté des garde-manger à travers l'Illinois." },
    es: { title: "Directorio de Despensas de Illinois", desc: "Directorio por condado de despensas de alimentos en Illinois." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/oh",
  states: ["OH"],
  i18n: {
    en: { title: "Ohio Food Pantries Directory", desc: "County-level directory of food pantries across Ohio." },
    fr: { title: "Répertoire garde-manger Ohio", desc: "Répertoire par comté des garde-manger à travers l'Ohio." },
    es: { title: "Directorio de Despensas de Ohio", desc: "Directorio por condado de despensas de alimentos en Ohio." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/mi",
  states: ["MI"],
  i18n: {
    en: { title: "Michigan Food Pantries Directory", desc: "County-level directory of food pantries across Michigan." },
    fr: { title: "Répertoire garde-manger Michigan", desc: "Répertoire par comté des garde-manger à travers le Michigan." },
    es: { title: "Directorio de Despensas de Michigan", desc: "Directorio por condado de despensas de alimentos en Michigan." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/nc",
  states: ["NC"],
  i18n: {
    en: { title: "North Carolina Food Pantries Directory", desc: "County-level directory of food pantries across North Carolina." },
    fr: { title: "Répertoire garde-manger Caroline du Nord", desc: "Répertoire par comté des garde-manger à travers la Caroline du Nord." },
    es: { title: "Directorio de Despensas de Carolina del Norte", desc: "Directorio por condado de despensas de alimentos en Carolina del Norte." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/va",
  states: ["VA"],
  i18n: {
    en: { title: "Virginia Food Pantries Directory", desc: "County-level directory of food pantries across Virginia." },
    fr: { title: "Répertoire garde-manger Virginie", desc: "Répertoire par comté des garde-manger à travers la Virginie." },
    es: { title: "Directorio de Despensas de Virginia", desc: "Directorio por condado de despensas de alimentos en Virginia." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/wa",
  states: ["WA"],
  i18n: {
    en: { title: "Washington Food Pantries Directory", desc: "County-level directory of food pantries across Washington state." },
    fr: { title: "Répertoire garde-manger Washington", desc: "Répertoire par comté des garde-manger à travers l'État de Washington." },
    es: { title: "Directorio de Despensas de Washington", desc: "Directorio por condado de despensas de alimentos en el estado de Washington." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/az",
  states: ["AZ"],
  i18n: {
    en: { title: "Arizona Food Pantries Directory", desc: "County-level directory of food pantries across Arizona." },
    fr: { title: "Répertoire garde-manger Arizona", desc: "Répertoire par comté des garde-manger à travers l'Arizona." },
    es: { title: "Directorio de Despensas de Arizona", desc: "Directorio por condado de despensas de alimentos en Arizona." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/ma",
  states: ["MA"],
  i18n: {
    en: { title: "Massachusetts Food Pantries Directory", desc: "County-level directory of food pantries across Massachusetts." },
    fr: { title: "Répertoire garde-manger Massachusetts", desc: "Répertoire par comté des garde-manger à travers le Massachusetts." },
    es: { title: "Directorio de Despensas de Massachusetts", desc: "Directorio por condado de despensas de alimentos en Massachusetts." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/in",
  states: ["IN"],
  i18n: {
    en: { title: "Indiana Food Pantries Directory", desc: "County-level directory of food pantries across Indiana." },
    fr: { title: "Répertoire garde-manger Indiana", desc: "Répertoire par comté des garde-manger à travers l'Indiana." },
    es: { title: "Directorio de Despensas de Indiana", desc: "Directorio por condado de despensas de alimentos en Indiana." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/mo",
  states: ["MO"],
  i18n: {
    en: { title: "Missouri Food Pantries Directory", desc: "County-level directory of food pantries across Missouri." },
    fr: { title: "Répertoire garde-manger Missouri", desc: "Répertoire par comté des garde-manger à travers le Missouri." },
    es: { title: "Directorio de Despensas de Missouri", desc: "Directorio por condado de despensas de alimentos en Missouri." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/wi",
  states: ["WI"],
  i18n: {
    en: { title: "Wisconsin Food Pantries Directory", desc: "County-level directory of food pantries across Wisconsin." },
    fr: { title: "Répertoire garde-manger Wisconsin", desc: "Répertoire par comté des garde-manger à travers le Wisconsin." },
    es: { title: "Directorio de Despensas de Wisconsin", desc: "Directorio por condado de despensas de alimentos en Wisconsin." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/md",
  states: ["MD"],
  i18n: {
    en: { title: "Maryland Food Pantries Directory", desc: "County-level directory of food pantries across Maryland." },
    fr: { title: "Répertoire garde-manger Maryland", desc: "Répertoire par comté des garde-manger à travers le Maryland." },
    es: { title: "Directorio de Despensas de Maryland", desc: "Directorio por condado de despensas de alimentos en Maryland." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/mn",
  states: ["MN"],
  i18n: {
    en: { title: "Minnesota Food Pantries Directory", desc: "County-level directory of food pantries across Minnesota." },
    fr: { title: "Répertoire garde-manger Minnesota", desc: "Répertoire par comté des garde-manger à travers le Minnesota." },
    es: { title: "Directorio de Despensas de Minnesota", desc: "Directorio por condado de despensas de alimentos en Minnesota." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/co",
  states: ["CO"],
  i18n: {
    en: { title: "Colorado Food Pantries Directory", desc: "County-level directory of food pantries across Colorado." },
    fr: { title: "Répertoire garde-manger Colorado", desc: "Répertoire par comté des garde-manger à travers le Colorado." },
    es: { title: "Directorio de Despensas de Colorado", desc: "Directorio por condado de despensas de alimentos en Colorado." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/al",
  states: ["AL"],
  i18n: {
    en: { title: "Alabama Food Pantries Directory", desc: "County-level directory of food pantries across Alabama." },
    fr: { title: "Répertoire garde-manger Alabama", desc: "Répertoire par comté des garde-manger à travers l'Alabama." },
    es: { title: "Directorio de Despensas de Alabama", desc: "Directorio por condado de despensas de alimentos en Alabama." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/sc",
  states: ["SC"],
  i18n: {
    en: { title: "South Carolina Food Pantries Directory", desc: "County-level directory of food pantries across South Carolina." },
    fr: { title: "Répertoire garde-manger Caroline du Sud", desc: "Répertoire par comté des garde-manger à travers la Caroline du Sud." },
    es: { title: "Directorio de Despensas de Carolina del Sur", desc: "Directorio por condado de despensas de alimentos en Carolina del Sur." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/la",
  states: ["LA"],
  i18n: {
    en: { title: "Louisiana Food Pantries Directory", desc: "County-level directory of food pantries across Louisiana." },
    fr: { title: "Répertoire garde-manger Louisiane", desc: "Répertoire par comté des garde-manger à travers la Louisiane." },
    es: { title: "Directorio de Despensas de Luisiana", desc: "Directorio por condado de despensas de alimentos en Luisiana." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/ky",
  states: ["KY"],
  i18n: {
    en: { title: "Kentucky Food Pantries Directory", desc: "County-level directory of food pantries across Kentucky." },
    fr: { title: "Répertoire garde-manger Kentucky", desc: "Répertoire par comté des garde-manger à travers le Kentucky." },
    es: { title: "Directorio de Despensas de Kentucky", desc: "Directorio por condado de despensas de alimentos en Kentucky." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/or",
  states: ["OR"],
  i18n: {
    en: { title: "Oregon Food Pantries Directory", desc: "County-level directory of food pantries across Oregon." },
    fr: { title: "Répertoire garde-manger Oregon", desc: "Répertoire par comté des garde-manger à travers l'Oregon." },
    es: { title: "Directorio de Despensas de Oregon", desc: "Directorio por condado de despensas de alimentos en Oregon." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/ok",
  states: ["OK"],
  i18n: {
    en: { title: "Oklahoma Food Pantries Directory", desc: "County-level directory of food pantries across Oklahoma." },
    fr: { title: "Répertoire garde-manger Oklahoma", desc: "Répertoire par comté des garde-manger à travers l'Oklahoma." },
    es: { title: "Directorio de Despensas de Oklahoma", desc: "Directorio por condado de despensas de alimentos en Oklahoma." },
  },
},
{
  category: "Food",
  link: "https://www.foodpantries.org/counties/ct",
  states: ["CT"],
  i18n: {
    en: { title: "Connecticut Food Pantries Directory", desc: "County-level directory of food pantries across Connecticut." },
    fr: { title: "Répertoire garde-manger Connecticut", desc: "Répertoire par comté des garde-manger à travers le Connecticut." },
    es: { title: "Directorio de Despensas de Connecticut", desc: "Directorio por condado de despensas de alimentos en Connecticut." },
  },
},
{
  category: "Food",
  link: "https://www.feedingamerica.org/our-work/hunger-relief-programs",
  i18n: {
    en: { title: "Feeding America Hunger Relief Programs", desc: "Overview of Feeding America's national hunger relief program offerings." },
    fr: { title: "Programmes lutte contre la faim Feeding America", desc: "Aperçu des programmes nationaux de lutte contre la faim de Feeding America." },
    es: { title: "Programas de Ayuda contra el Hambre Feeding America", desc: "Resumen de los programas nacionales de ayuda contra el hambre de Feeding America." },
  },
},
{
  category: "Food",
  link: "https://www.feedingamerica.org/our-work/food-security-research",
  i18n: {
    en: { title: "Feeding America Food Security Research", desc: "Research and data resources on hunger and food insecurity in the US." },
    fr: { title: "Recherche sécurité alimentaire Feeding America", desc: "Ressources de recherche et données sur la faim et l'insécurité alimentaire." },
    es: { title: "Investigación de Seguridad Alimentaria Feeding America", desc: "Recursos de investigación y datos sobre el hambre e inseguridad alimentaria." },
  },
},
{
  category: "Food",
  link: "https://www.feedingamerica.org/take-action/advocate",
  i18n: {
    en: { title: "Feeding America Advocacy Resources", desc: "Advocacy toolkit and resources for supporting anti-hunger policy." },
    fr: { title: "Ressources plaidoyer Feeding America", desc: "Boîte à outils de plaidoyer et ressources pour soutenir la politique anti-faim." },
    es: { title: "Recursos de Defensa Feeding America", desc: "Kit de herramientas de defensa y recursos para apoyar políticas contra el hambre." },
  },
},
{
  category: "Food",
  link: "https://www.frac.org/programs",
  i18n: {
    en: { title: "FRAC Anti-Hunger Programs Overview", desc: "Comprehensive overview of federal nutrition programs tracked by FRAC." },
    fr: { title: "Aperçu programmes anti-faim FRAC", desc: "Aperçu complet des programmes nutritionnels fédéraux suivis par FRAC." },
    es: { title: "Resumen de Programas contra el Hambre FRAC", desc: "Resumen completo de programas nutricionales federales rastreados por FRAC." },
  },
},
{
  category: "Food",
  link: "https://www.frac.org/maps",
  i18n: {
    en: { title: "FRAC Program Participation Maps", desc: "Interactive maps showing federal nutrition program participation by state." },
    fr: { title: "Cartes participation programme FRAC", desc: "Cartes interactives montrant la participation aux programmes nutritionnels fédéraux par État." },
    es: { title: "Mapas de Participación de Programas FRAC", desc: "Mapas interactivos que muestran participación en programas nutricionales federales por estado." },
  },
},
{
  category: "Food",
  link: "https://www.hungerfreeamerica.org",
  i18n: {
    en: { title: "Hunger Free America", desc: "Advocacy organization providing hunger hotline and policy resources." },
    fr: { title: "Hunger Free America", desc: "Organisation de plaidoyer offrant une ligne d'assistance contre la faim et des ressources politiques." },
    es: { title: "Hunger Free America", desc: "Organización de defensa que ofrece línea de ayuda contra el hambre y recursos de políticas." },
  },
},
{
  category: "Food",
  link: "https://www.hungerfreeamerica.org/national-hunger-hotline",
  i18n: {
    en: { title: "National Hunger Hotline", desc: "Free hotline connecting callers to local food resources nationwide." },
    fr: { title: "Ligne nationale contre la faim", desc: "Ligne d'assistance gratuite reliant les appelants aux ressources alimentaires locales." },
    es: { title: "Línea Nacional contra el Hambre", desc: "Línea de ayuda gratuita que conecta a las personas con recursos alimentarios locales." },
  },
},
{
  category: "Food",
  link: "https://www.share ourstrength.org",
  i18n: {
    en: { title: "Share Our Strength", desc: "National organization working to end childhood hunger through community programs." },
    fr: { title: "Share Our Strength", desc: "Organisation nationale travaillant à mettre fin à la faim infantile par des programmes communautaires." },
    es: { title: "Share Our Strength", desc: "Organización nacional que trabaja para acabar con el hambre infantil mediante programas comunitarios." },
  },
},
{
  category: "Food",
  link: "https://www.nokidhungry.org/cooking-matters",
  i18n: {
    en: { title: "Cooking Matters", desc: "Free nutrition education classes teaching families to cook healthy meals affordably." },
    fr: { title: "Cooking Matters", desc: "Cours gratuits d'éducation nutritionnelle enseignant aux familles à cuisiner sainement." },
    es: { title: "Cooking Matters", desc: "Clases gratuitas de educación nutricional que enseñan a familias a cocinar de forma saludable." },
  },
},
{
  category: "Food",
  link: "https://www.hungerandhealth.feedingamerica.org/resource/screen-intervene-nutrition-education",
  i18n: {
    en: { title: "Screen and Intervene Nutrition Toolkit", desc: "Healthcare-focused toolkit for screening and addressing food insecurity." },
    fr: { title: "Boîte à outils Screen and Intervene", desc: "Boîte à outils axée sur la santé pour dépister et traiter l'insécurité alimentaire." },
    es: { title: "Kit de Herramientas Screen and Intervene", desc: "Kit de herramientas enfocado en salud para detectar y abordar la inseguridad alimentaria." },
  },
},
{
  category: "Food",
  link: "https://www.hungerandhealth.feedingamerica.org/resource/food-insecurity-screening-tool",
  i18n: {
    en: { title: "Food Insecurity Screening Tool", desc: "Clinical tool helping healthcare providers screen for food insecurity." },
    fr: { title: "Outil dépistage insécurité alimentaire", desc: "Outil clinique aidant les fournisseurs de soins à dépister l'insécurité alimentaire." },
    es: { title: "Herramienta de Detección de Inseguridad Alimentaria", desc: "Herramienta clínica que ayuda a proveedores de salud a detectar inseguridad alimentaria." },
  },
},
{
  category: "Food",
  link: "https://www.aap.org/foodinsecurity",
  i18n: {
    en: { title: "AAP Food Insecurity Resources", desc: "Pediatric-focused resources on addressing childhood food insecurity." },
    fr: { title: "Ressources insécurité alimentaire AAP", desc: "Ressources pédiatriques pour traiter l'insécurité alimentaire infantile." },
    es: { title: "Recursos de Inseguridad Alimentaria AAP", desc: "Recursos pediátricos para abordar la inseguridad alimentaria infantil." },
  },
},
{
  category: "Food",
  link: "https://www.zerotothree.org/resource/food-insecurity",
  i18n: {
    en: { title: "Zero to Three Food Insecurity Resources", desc: "Resources on addressing food insecurity for families with infants and toddlers." },
    fr: { title: "Ressources insécurité alimentaire Zero to Three", desc: "Ressources pour traiter l'insécurité alimentaire des familles avec bébés." },
    es: { title: "Recursos de Inseguridad Alimentaria Zero to Three", desc: "Recursos para abordar la inseguridad alimentaria en familias con bebés y niños pequeños." },
  },
},
{
  category: "Food",
  link: "https://www.firstfocus.org/food-security",
  i18n: {
    en: { title: "First Focus on Children Food Security", desc: "Policy advocacy resources focused on children's food security." },
    fr: { title: "First Focus on Children sécurité alimentaire", desc: "Ressources de plaidoyer politique axées sur la sécurité alimentaire des enfants." },
    es: { title: "First Focus on Children Seguridad Alimentaria", desc: "Recursos de defensa de políticas enfocados en la seguridad alimentaria infantil." },
  },
},
{
  category: "Food",
  link: "https://www.childrensdefense.org/programs/food",
  i18n: {
    en: { title: "Children's Defense Fund Food Programs", desc: "Advocacy and resources supporting children's access to nutritious food." },
    fr: { title: "Programmes alimentaires Children's Defense Fund", desc: "Plaidoyer et ressources soutenant l'accès des enfants à une alimentation nutritive." },
    es: { title: "Programas Alimentarios Children's Defense Fund", desc: "Defensa y recursos que apoyan el acceso de niños a alimentos nutritivos." },
  },
},
{
  category: "Food",
  link: "https://www.savethechildren.org/us/what-we-do/us-programs/childrens-food-and-nutrition",
  i18n: {
    en: { title: "Save the Children US Food and Nutrition Programs", desc: "US-based nutrition programs supporting children in underserved communities." },
    fr: { title: "Programmes alimentaires Save the Children US", desc: "Programmes nutritionnels basés aux États-Unis soutenant les enfants défavorisés." },
    es: { title: "Programas de Alimentos Save the Children US", desc: "Programas nutricionales con base en EE.UU. que apoyan a niños en comunidades desatendidas." },
  },
},
{
  category: "Food",
  link: "https://www.unicefusa.org/what-unicef-does/emergency-response/hunger",
  i18n: {
    en: { title: "UNICEF USA Hunger Response", desc: "Information on UNICEF's efforts addressing child hunger and malnutrition." },
    fr: { title: "Réponse à la faim UNICEF USA", desc: "Informations sur les efforts d'UNICEF pour traiter la faim et la malnutrition infantiles." },
    es: { title: "Respuesta al Hambre UNICEF USA", desc: "Información sobre los esfuerzos de UNICEF para abordar el hambre y desnutrición infantil." },
  },
},
{
  category: "Food",
  link: "https://www.rescue.org/topic/food-security",
  i18n: {
    en: { title: "International Rescue Committee Food Security", desc: "Food security programs supporting refugee and immigrant communities." },
    fr: { title: "Sécurité alimentaire International Rescue Committee", desc: "Programmes de sécurité alimentaire soutenant les communautés réfugiées et immigrantes." },
    es: { title: "Seguridad Alimentaria International Rescue Committee", desc: "Programas de seguridad alimentaria que apoyan a comunidades refugiadas e inmigrantes." },
  },
},
{
  category: "Food",
  link: "https://www.refugeesinternational.org/food-security",
  i18n: {
    en: { title: "Refugees International Food Security Resources", desc: "Research and advocacy on food security for displaced populations." },
    fr: { title: "Ressources sécurité alimentaire Refugees International", desc: "Recherche et plaidoyer sur la sécurité alimentaire des populations déplacées." },
    es: { title: "Recursos de Seguridad Alimentaria Refugees International", desc: "Investigación y defensa sobre seguridad alimentaria para poblaciones desplazadas." },
  },
},
{
  category: "Food",
  link: "https://www.cwsglobal.org/what-we-do/immigration-refugee-services/food/",
  i18n: {
    en: { title: "Church World Service Refugee Food Assistance", desc: "Food assistance resources specifically for newly arrived refugee families." },
    fr: { title: "Aide alimentaire réfugiés Church World Service", desc: "Ressources d'aide alimentaire spécifiquement pour familles réfugiées nouvellement arrivées." },
    es: { title: "Asistencia Alimentaria para Refugiados Church World Service", desc: "Recursos de asistencia alimentaria específicamente para familias refugiadas recién llegadas." },
  },
},
{
  category: "Food",
  link: "https://www.lirs.org/food-security",
  i18n: {
    en: { title: "Lutheran Immigration and Refugee Service Food Resources", desc: "Food security support programs for refugees and asylum seekers." },
    fr: { title: "Ressources alimentaires Lutheran Immigration and Refugee Service", desc: "Programmes de soutien à la sécurité alimentaire pour réfugiés et demandeurs d'asile." },
    es: { title: "Recursos Alimentarios Lutheran Immigration and Refugee Service", desc: "Programas de apoyo de seguridad alimentaria para refugiados y solicitantes de asilo." },
  },
},
{
  category: "Food",
  link: "https://www.hias.org/what/economic-inclusion",
  i18n: {
    en: { title: "HIAS Economic Inclusion Programs", desc: "Programs supporting economic stability including food access for refugees." },
    fr: { title: "Programmes inclusion économique HIAS", desc: "Programmes soutenant la stabilité économique incluant l'accès alimentaire pour réfugiés." },
    es: { title: "Programas de Inclusión Económica HIAS", desc: "Programas que apoyan la estabilidad económica incluyendo acceso alimentario para refugiados." },
  },
},

// HEALTH (60)
{
  category: "Health",
  link: "https://www.cms.gov/medicare/coverage/national-coverage-determinations",
  i18n: {
    en: { title: "Medicare National Coverage Determinations", desc: "Official database of what services are covered under Medicare." },
    fr: { title: "Déterminations couverture nationale Medicare", desc: "Base de données officielle des services couverts par Medicare." },
    es: { title: "Determinaciones de Cobertura Nacional de Medicare", desc: "Base de datos oficial de qué servicios están cubiertos por Medicare." },
  },
},
{
  category: "Health",
  link: "https://www.medicare.gov/coverage",
  i18n: {
    en: { title: "Medicare Coverage Search Tool", desc: "Official tool to check whether Medicare covers a specific service or item." },
    fr: { title: "Outil recherche couverture Medicare", desc: "Outil officiel pour vérifier si Medicare couvre un service ou article spécifique." },
    es: { title: "Herramienta de Búsqueda de Cobertura Medicare", desc: "Herramienta oficial para verificar si Medicare cubre un servicio o artículo específico." },
  },
},
{
  category: "Health",
  link: "https://www.medicare.gov/basics/costs/medicare-costs",
  i18n: {
    en: { title: "Medicare Costs Overview", desc: "Official breakdown of premiums, deductibles, and out-of-pocket Medicare costs." },
    fr: { title: "Aperçu coûts Medicare", desc: "Répartition officielle des primes, franchises et coûts personnels Medicare." },
    es: { title: "Resumen de Costos de Medicare", desc: "Desglose oficial de primas, deducibles y costos de bolsillo de Medicare." },
  },
},
{
  category: "Health",
  link: "https://www.medicaid.gov/medicaid/eligibility/index.html",
  i18n: {
    en: { title: "Medicaid Eligibility Overview", desc: "Official federal overview of Medicaid eligibility categories and rules." },
    fr: { title: "Aperçu admissibilité Medicaid", desc: "Aperçu fédéral officiel des catégories et règles d'admissibilité Medicaid." },
    es: { title: "Resumen de Elegibilidad de Medicaid", desc: "Resumen federal oficial de categorías y reglas de elegibilidad de Medicaid." },
  },
},
{
  category: "Health",
  link: "https://www.medicaid.gov/chip/index.html",
  i18n: {
    en: { title: "CHIP Program Overview", desc: "Official federal overview of the Children's Health Insurance Program." },
    fr: { title: "Aperçu programme CHIP", desc: "Aperçu fédéral officiel du programme d'assurance santé pour enfants." },
    es: { title: "Resumen del Programa CHIP", desc: "Resumen federal oficial del Programa de Seguro de Salud Infantil." },
  },
},
{
  category: "Health",
  link: "https://www.insurekidsnow.gov",
  i18n: {
    en: { title: "InsureKidsNow.gov", desc: "Official federal site to find CHIP and Medicaid coverage for children." },
    fr: { title: "InsureKidsNow.gov", desc: "Site fédéral officiel pour trouver une couverture CHIP et Medicaid pour enfants." },
    es: { title: "InsureKidsNow.gov", desc: "Sitio federal oficial para encontrar cobertura CHIP y Medicaid para niños." },
  },
},
{
  category: "Health",
  link: "https://www.healthcare.gov/apply-and-enroll/marketplace-application-checklist/",
  i18n: {
    en: { title: "Marketplace Application Checklist", desc: "Official checklist of documents needed for a health insurance marketplace application." },
    fr: { title: "Liste de vérification demande marché", desc: "Liste officielle des documents nécessaires pour une demande d'assurance sur le marché." },
    es: { title: "Lista de Verificación de Solicitud del Mercado", desc: "Lista oficial de documentos necesarios para una solicitud de seguro del mercado." },
  },
},
{
  category: "Health",
  link: "https://www.healthcare.gov/glossary/",
  i18n: {
    en: { title: "HealthCare.gov Glossary", desc: "Official glossary explaining common health insurance terms." },
    fr: { title: "Glossaire HealthCare.gov", desc: "Glossaire officiel expliquant les termes courants d'assurance santé." },
    es: { title: "Glosario HealthCare.gov", desc: "Glosario oficial que explica términos comunes de seguro de salud." },
  },
},
{
  category: "Health",
  link: "https://www.healthcare.gov/quick-guide/",
  i18n: {
    en: { title: "HealthCare.gov Quick Guide", desc: "Simplified official guide to signing up for marketplace health coverage." },
    fr: { title: "Guide rapide HealthCare.gov", desc: "Guide officiel simplifié pour s'inscrire à une couverture santé du marché." },
    es: { title: "Guía Rápida HealthCare.gov", desc: "Guía oficial simplificada para inscribirse en cobertura de salud del mercado." },
  },
},
{
  category: "Health",
  link: "https://www.healthcare.gov/immigrants/immigration-status/",
  i18n: {
    en: { title: "HealthCare.gov Immigration Status Info", desc: "Official information on health coverage eligibility by immigration status." },
    fr: { title: "Info statut immigration HealthCare.gov", desc: "Informations officielles sur l'admissibilité à la couverture selon le statut d'immigration." },
    es: { title: "Información de Estatus Migratorio HealthCare.gov", desc: "Información oficial sobre elegibilidad de cobertura según el estatus migratorio." },
  },
},
{
  category: "Health",
  link: "https://www.protectingimmigrantfamilies.org/health-care",
  i18n: {
    en: { title: "Protecting Immigrant Families Health Care Resources", desc: "Resources helping immigrant families understand health coverage options." },
    fr: { title: "Ressources santé Protecting Immigrant Families", desc: "Ressources aidant les familles immigrantes à comprendre les options de couverture santé." },
    es: { title: "Recursos de Salud Protecting Immigrant Families", desc: "Recursos que ayudan a familias inmigrantes a entender opciones de cobertura de salud." },
  },
},
{
  category: "Health",
  link: "https://www.nilc.org/issues/health-care",
  i18n: {
    en: { title: "National Immigration Law Center Health Care Resources", desc: "Legal resources on immigrant access to health care programs." },
    fr: { title: "Ressources santé National Immigration Law Center", desc: "Ressources juridiques sur l'accès des immigrants aux programmes de santé." },
    es: { title: "Recursos de Salud National Immigration Law Center", desc: "Recursos legales sobre el acceso de inmigrantes a programas de salud." },
  },
},
{
  category: "Health",
  link: "https://www.doctorswithoutborders.org/what-we-do/countries/us",
  i18n: {
    en: { title: "Doctors Without Borders USA Programs", desc: "Information on Doctors Without Borders health equity work in the US." },
    fr: { title: "Programmes Doctors Without Borders USA", desc: "Informations sur le travail d'équité en santé de Doctors Without Borders aux États-Unis." },
    es: { title: "Programas Doctors Without Borders USA", desc: "Información sobre el trabajo de equidad en salud de Médicos Sin Fronteras en EE.UU." },
  },
},
{
  category: "Health",
  link: "https://www.commonwealthfund.org/health-coverage",
  i18n: {
    en: { title: "Commonwealth Fund Health Coverage Research", desc: "Independent research and policy analysis on US health coverage trends." },
    fr: { title: "Recherche couverture santé Commonwealth Fund", desc: "Recherche indépendante et analyse politique sur les tendances de couverture santé." },
    es: { title: "Investigación de Cobertura de Salud Commonwealth Fund", desc: "Investigación independiente y análisis de políticas sobre tendencias de cobertura de salud." },
  },
},
{
  category: "Health",
  link: "https://www.rwjf.org/en/topics/health-coverage.html",
  i18n: {
    en: { title: "Robert Wood Johnson Foundation Health Coverage", desc: "Research and grant resources supporting health coverage equity." },
    fr: { title: "Couverture santé Robert Wood Johnson Foundation", desc: "Ressources de recherche et subventions soutenant l'équité de couverture santé." },
    es: { title: "Cobertura de Salud Robert Wood Johnson Foundation", desc: "Recursos de investigación y subvenciones que apoyan la equidad de cobertura de salud." },
  },
},
{
  category: "Health",
  link: "https://www.chcs.org",
  i18n: {
    en: { title: "Center for Health Care Strategies", desc: "Policy resources on improving health care access for underserved populations." },
    fr: { title: "Center for Health Care Strategies", desc: "Ressources politiques pour améliorer l'accès aux soins pour populations défavorisées." },
    es: { title: "Center for Health Care Strategies", desc: "Recursos de políticas para mejorar el acceso a la salud de poblaciones desatendidas." },
  },
},
{
  category: "Health",
  link: "https://www.nachc.org/find-a-health-center",
  i18n: {
    en: { title: "NACHC Find a Health Center", desc: "Directory of federally qualified community health centers by location." },
    fr: { title: "Trouver un centre de santé NACHC", desc: "Répertoire des centres de santé communautaires fédéralement qualifiés par emplacement." },
    es: { title: "Encuentre un Centro de Salud NACHC", desc: "Directorio de centros de salud comunitarios federalmente calificados por ubicación." },
  },
},
{
  category: "Health",
  link: "https://www.findahealthcenter.hrsa.gov",
  i18n: {
    en: { title: "HRSA Find a Health Center", desc: "Official federal tool to find community health centers near you." },
    fr: { title: "Trouver un centre de santé HRSA", desc: "Outil fédéral officiel pour trouver des centres de santé communautaires près de chez vous." },
    es: { title: "Encuentre un Centro de Salud HRSA", desc: "Herramienta federal oficial para encontrar centros de salud comunitarios cerca de usted." },
  },
},
{
  category: "Health",
  link: "https://www.chcadvocacy.org",
  i18n: {
    en: { title: "Community Health Center Advocacy Resources", desc: "Advocacy resources supporting community health center funding and access." },
    fr: { title: "Ressources plaidoyer centre de santé communautaire", desc: "Ressources de plaidoyer soutenant le financement et l'accès aux centres de santé communautaires." },
    es: { title: "Recursos de Defensa de Centros de Salud Comunitarios", desc: "Recursos de defensa que apoyan el financiamiento y acceso a centros de salud comunitarios." },
  },
},
{
  category: "Health",
  link: "https://www.ruralhealthclinic.org",
  i18n: {
    en: { title: "Rural Health Clinic Association", desc: "Directory and resources for rural health clinics serving underserved areas." },
    fr: { title: "Association clinique santé rurale", desc: "Répertoire et ressources pour cliniques de santé rurales desservant zones défavorisées." },
    es: { title: "Asociación de Clínicas de Salud Rural", desc: "Directorio y recursos para clínicas de salud rurales que sirven áreas desatendidas." },
  },
},
{
  category: "Health",
  link: "https://www.nachc.org/research-and-data/",
  i18n: {
    en: { title: "NACHC Research and Data", desc: "Data resources on community health center reach and impact." },
    fr: { title: "Recherche et données NACHC", desc: "Ressources de données sur la portée et l'impact des centres de santé communautaires." },
    es: { title: "Investigación y Datos NACHC", desc: "Recursos de datos sobre el alcance e impacto de centros de salud comunitarios." },
  },
},
{
  category: "Health",
  link: "https://www.communityhealthfunders.org",
  i18n: {
    en: { title: "Community Health Funders Network", desc: "Directory of foundations funding community health initiatives." },
    fr: { title: "Réseau bailleurs de fonds santé communautaire", desc: "Répertoire de fondations finançant des initiatives de santé communautaire." },
    es: { title: "Red de Financiadores de Salud Comunitaria", desc: "Directorio de fundaciones que financian iniciativas de salud comunitaria." },
  },
},
{
  category: "Health",
  link: "https://www.uwaysite.org/health",
  i18n: {
    en: { title: "United Way Health Resource Directory", desc: "Local United Way chapters connecting people to health resources." },
    fr: { title: "Répertoire ressources santé United Way", desc: "Chapitres locaux United Way reliant les personnes aux ressources de santé." },
    es: { title: "Directorio de Recursos de Salud United Way", desc: "Capítulos locales de United Way que conectan a personas con recursos de salud." },
  },
},
{
  category: "Health",
  link: "https://www.redcross.org/take-a-class/health-classes",
  i18n: {
    en: { title: "Red Cross Health Classes", desc: "Affordable CPR, first aid, and health training classes nationwide." },
    fr: { title: "Cours de santé Croix-Rouge", desc: "Cours abordables de RCR, premiers secours et formation en santé à l'échelle nationale." },
    es: { title: "Clases de Salud Cruz Roja", desc: "Clases asequibles de RCP, primeros auxilios y capacitación en salud a nivel nacional." },
  },
},
{
  category: "Health",
  link: "https://www.heart.org/en/cpr",
  i18n: {
    en: { title: "American Heart Association CPR Training", desc: "CPR and emergency cardiovascular care training courses." },
    fr: { title: "Formation RCR American Heart Association", desc: "Cours de formation en RCR et soins cardiovasculaires d'urgence." },
    es: { title: "Capacitación en RCP American Heart Association", desc: "Cursos de capacitación en RCP y atención cardiovascular de emergencia." },
  },
},
{
  category: "Health",
  link: "https://www.stopthebleed.org",
  i18n: {
    en: { title: "Stop the Bleed", desc: "Free training program teaching bystanders to control severe bleeding in emergencies." },
    fr: { title: "Stop the Bleed", desc: "Programme de formation gratuit enseignant aux témoins à contrôler les saignements graves." },
    es: { title: "Stop the Bleed", desc: "Programa de capacitación gratuito que enseña a testigos a controlar sangrado severo." },
  },
},
{
  category: "Health",
  link: "https://www.narcan.com/find-narcan",
  i18n: {
    en: { title: "Find Narcan Locations", desc: "Tool to find where to obtain free or low-cost naloxone (Narcan) nasal spray." },
    fr: { title: "Trouver emplacements Narcan", desc: "Outil pour trouver où obtenir du naloxone (Narcan) gratuit ou abordable." },
    es: { title: "Encuentre Ubicaciones de Narcan", desc: "Herramienta para encontrar dónde obtener naloxona (Narcan) gratuita o de bajo costo." },
  },
},
{
  category: "Health",
  link: "https://www.samhsa.gov/medications-substance-use-disorders/naloxone",
  i18n: {
    en: { title: "SAMHSA Naloxone Info", desc: "Federal information on naloxone access for opioid overdose reversal." },
    fr: { title: "Info naloxone SAMHSA", desc: "Informations fédérales sur l'accès au naloxone pour inverser les surdoses d'opioïdes." },
    es: { title: "Información de Naloxona SAMHSA", desc: "Información federal sobre el acceso a naloxona para revertir sobredosis de opioides." },
  },
},
{
  category: "Health",
  link: "https://www.nextdistro.org",
  i18n: {
    en: { title: "NEXT Distro", desc: "Mail-based naloxone and harm reduction supply distribution program." },
    fr: { title: "NEXT Distro", desc: "Programme de distribution de naloxone et de fournitures de réduction des méfaits par courrier." },
    es: { title: "NEXT Distro", desc: "Programa de distribución de naloxona y suministros de reducción de daños por correo." },
  },
},
{
  category: "Health",
  link: "https://www.harmreduction.org",
  i18n: {
    en: { title: "National Harm Reduction Coalition", desc: "Resources and advocacy supporting harm reduction approaches to substance use." },
    fr: { title: "National Harm Reduction Coalition", desc: "Ressources et plaidoyer soutenant les approches de réduction des méfaits." },
    es: { title: "National Harm Reduction Coalition", desc: "Recursos y defensa que apoyan enfoques de reducción de daños." },
  },
},
{
  category: "Health",
  link: "https://www.syringeexchange.org",
  i18n: {
    en: { title: "Syringe Exchange Directory", desc: "Directory of syringe service programs supporting harm reduction efforts." },
    fr: { title: "Répertoire échange seringues", desc: "Répertoire de programmes d'échange de seringues soutenant les efforts de réduction des méfaits." },
    es: { title: "Directorio de Intercambio de Jeringas", desc: "Directorio de programas de intercambio de jeringas que apoyan esfuerzos de reducción de daños." },
  },
},
{
  category: "Health",
  link: "https://www.samhsa.gov/find-help/disaster-distress-helpline",
  i18n: {
    en: { title: "SAMHSA Disaster Distress Helpline", desc: "Free 24/7 crisis counseling for people affected by disasters." },
    fr: { title: "Ligne détresse catastrophe SAMHSA", desc: "Conseil de crise gratuit 24/7 pour personnes touchées par des catastrophes." },
    es: { title: "Línea de Angustia por Desastres SAMHSA", desc: "Consejería de crisis gratuita 24/7 para personas afectadas por desastres." },
  },
},
{
  category: "Health",
  link: "https://www.redcross.org/get-help/disaster-relief-and-recovery-services/emotional-health.html",
  i18n: {
    en: { title: "Red Cross Emotional Health After Disaster", desc: "Emotional support resources for people affected by disasters." },
    fr: { title: "Santé émotionnelle après catastrophe Croix-Rouge", desc: "Ressources de soutien émotionnel pour personnes touchées par des catastrophes." },
    es: { title: "Salud Emocional Después de un Desastre Cruz Roja", desc: "Recursos de apoyo emocional para personas afectadas por desastres." },
  },
},
{
  category: "Health",
  link: "https://www.ready.gov/mental-health",
  i18n: {
    en: { title: "Ready.gov Mental Health Resources", desc: "Federal guidance on protecting mental health during and after emergencies." },
    fr: { title: "Ressources santé mentale Ready.gov", desc: "Conseils fédéraux pour protéger la santé mentale pendant et après les urgences." },
    es: { title: "Recursos de Salud Mental Ready.gov", desc: "Orientación federal para proteger la salud mental durante y después de emergencias." },
  },
},
{
  category: "Health",
  link: "https://www.disasterdistress.samhsa.gov",
  i18n: {
    en: { title: "Disaster Distress Helpline Resources", desc: "Additional federal crisis resources specifically for disaster-related distress." },
    fr: { title: "Ressources ligne détresse catastrophe", desc: "Ressources fédérales de crise supplémentaires spécifiquement pour la détresse liée aux catastrophes." },
    es: { title: "Recursos de Línea de Angustia por Desastres", desc: "Recursos federales de crisis adicionales específicamente para angustia relacionada con desastres." },
  },
},
{
  category: "Health",
  link: "https://www.ready.gov/individuals-access-functional-needs",
  i18n: {
    en: { title: "Ready.gov Access and Functional Needs Resources", desc: "Federal disaster preparedness resources for people with disabilities and access needs." },
    fr: { title: "Ressources besoins fonctionnels Ready.gov", desc: "Ressources fédérales de préparation aux catastrophes pour personnes handicapées." },
    es: { title: "Recursos de Necesidades de Acceso y Funcionales Ready.gov", desc: "Recursos federales de preparación para desastres para personas con discapacidades." },
  },
},
{
  category: "Health",
  link: "https://www.disabilityinfo.org/emergency-preparedness",
  i18n: {
    en: { title: "Disability Info Emergency Preparedness Resources", desc: "Emergency preparedness planning resources for people with disabilities." },
    fr: { title: "Ressources préparation urgence Disability Info", desc: "Ressources de planification de préparation aux urgences pour personnes handicapées." },
    es: { title: "Recursos de Preparación para Emergencias Disability Info", desc: "Recursos de planificación de preparación para emergencias para personas con discapacidades." },
  },
},
{
  category: "Health",
  link: "https://www.portlightstrategies.org",
  i18n: {
    en: { title: "Portlight Strategies", desc: "Disaster relief specifically supporting people with disabilities during emergencies." },
    fr: { title: "Portlight Strategies", desc: "Secours en cas de catastrophe soutenant spécifiquement les personnes handicapées." },
    es: { title: "Portlight Strategies", desc: "Ayuda en desastres que apoya específicamente a personas con discapacidades." },
  },
},
{
  category: "Health",
  link: "https://www.mdrc-cbrn.org",
  i18n: {
    en: { title: "Medical Reserve Corps Directory", desc: "Volunteer medical response network supporting community health emergencies." },
    fr: { title: "Répertoire Medical Reserve Corps", desc: "Réseau de bénévoles médicaux soutenant les urgences de santé communautaire." },
    es: { title: "Directorio Medical Reserve Corps", desc: "Red de voluntarios médicos que apoya emergencias de salud comunitaria." },
  },
},
{
  category: "Health",
  link: "https://www.mrc.hhs.gov",
  i18n: {
    en: { title: "Medical Reserve Corps National Site", desc: "Federal program coordinating volunteer health professionals for emergencies." },
    fr: { title: "Site national Medical Reserve Corps", desc: "Programme fédéral coordonnant des professionnels de santé bénévoles pour les urgences." },
    es: { title: "Sitio Nacional Medical Reserve Corps", desc: "Programa federal que coordina profesionales de salud voluntarios para emergencias." },
  },
},
{
  category: "Health",
  link: "https://www.dav.org/veterans/resources/health-care/",
  i18n: {
    en: { title: "DAV Health Care Resources", desc: "Health care navigation resources specifically for disabled veterans." },
    fr: { title: "Ressources soins de santé DAV", desc: "Ressources de navigation en soins de santé spécifiquement pour vétérans handicapés." },
    es: { title: "Recursos de Atención Médica DAV", desc: "Recursos de navegación de atención médica específicamente para veteranos discapacitados." },
  },
},
{
  category: "Health",
  link: "https://www.va.gov/COMMUNITYCARE/",
  i18n: {
    en: { title: "VA Community Care Program", desc: "Federal program allowing veterans to receive care from non-VA providers." },
    fr: { title: "Programme soins communautaires VA", desc: "Programme fédéral permettant aux vétérans de recevoir des soins de fournisseurs non-VA." },
    es: { title: "Programa de Atención Comunitaria VA", desc: "Programa federal que permite a veteranos recibir atención de proveedores no VA." },
  },
},
{
  category: "Health",
  link: "https://www.va.gov/health-care/about-va-health-benefits/womens-health-care/",
  i18n: {
    en: { title: "VA Women's Health Care Benefits", desc: "Federal health care information specifically for women veterans." },
    fr: { title: "Prestations santé femmes VA", desc: "Informations de soins de santé fédéraux spécifiquement pour vétérans femmes." },
    es: { title: "Beneficios de Atención Médica para Mujeres VA", desc: "Información de atención médica federal específicamente para veteranas mujeres." },
  },
},
{
  category: "Health",
  link: "https://www.womenveterans.va.gov",
  i18n: {
    en: { title: "VA Women Veterans Health Care", desc: "Federal resources and services specifically designed for women veterans." },
    fr: { title: "Soins santé femmes vétérans VA", desc: "Ressources et services fédéraux spécifiquement conçus pour vétérans femmes." },
    es: { title: "Atención Médica para Mujeres Veteranas VA", desc: "Recursos y servicios federales específicamente diseñados para mujeres veteranas." },
  },
},
{
  category: "Health",
  link: "https://www.serviceleader.org/womenveterans",
  i18n: {
    en: { title: "Women Veterans Network", desc: "Peer support and resource network specifically for women veterans." },
    fr: { title: "Women Veterans Network", desc: "Réseau de soutien par les pairs et de ressources spécifiquement pour vétérans femmes." },
    es: { title: "Women Veterans Network", desc: "Red de apoyo entre pares y recursos específicamente para mujeres veteranas." },
  },
},
{
  category: "Health",
  link: "https://www.serviceswomen.org",
  i18n: {
    en: { title: "Service Women's Action Network", desc: "Advocacy and support resources for current and former servicewomen." },
    fr: { title: "Service Women's Action Network", desc: "Ressources de plaidoyer et de soutien pour militaires femmes actuelles et anciennes." },
    es: { title: "Service Women's Action Network", desc: "Recursos de defensa y apoyo para militares mujeres actuales y anteriores." },
  },
},
{
  category: "Health",
  link: "https://www.va.gov/health-care/about-va-health-benefits/pregnancy-maternity-care/",
  i18n: {
    en: { title: "VA Pregnancy and Maternity Care Benefits", desc: "Federal maternity care benefits available for eligible women veterans." },
    fr: { title: "Prestations soins maternité VA", desc: "Prestations fédérales de soins de maternité disponibles pour vétérans femmes admissibles." },
    es: { title: "Beneficios de Atención de Embarazo y Maternidad VA", desc: "Beneficios federales de atención de maternidad disponibles para veteranas elegibles." },
  },
},
{
  category: "Health",
  link: "https://www.momsonthefrontlines.org",
  i18n: {
    en: { title: "Moms on the Frontlines", desc: "Support network and resources for military and veteran mothers." },
    fr: { title: "Moms on the Frontlines", desc: "Réseau de soutien et ressources pour mères militaires et vétérans." },
    es: { title: "Moms on the Frontlines", desc: "Red de apoyo y recursos para madres militares y veteranas." },
  },
},
{
  category: "Health",
  link: "https://www.zerotothree.org/military-families",
  i18n: {
    en: { title: "Zero to Three Military Family Resources", desc: "Early childhood health resources tailored for military families." },
    fr: { title: "Ressources familles militaires Zero to Three", desc: "Ressources de santé pour la petite enfance conçues pour familles militaires." },
    es: { title: "Recursos para Familias Militares Zero to Three", desc: "Recursos de salud de primera infancia diseñados para familias militares." },
  },
},
{
  category: "Health",
  link: "https://www.militarychild.org/health",
  i18n: {
    en: { title: "Military Child Education Coalition Health Resources", desc: "Health resources supporting the wellbeing of military-connected children." },
    fr: { title: "Ressources santé Military Child Education Coalition", desc: "Ressources de santé soutenant le bien-être des enfants liés à l'armée." },
    es: { title: "Recursos de Salud Military Child Education Coalition", desc: "Recursos de salud que apoyan el bienestar de niños relacionados con lo militar." },
  },
},
{
  category: "Health",
  link: "https://www.zerotothree.org/resource/early-childhood-mental-health",
  i18n: {
    en: { title: "Early Childhood Mental Health Resources", desc: "Resources supporting the mental health of infants and young children." },
    fr: { title: "Ressources santé mentale petite enfance", desc: "Ressources soutenant la santé mentale des bébés et jeunes enfants." },
    es: { title: "Recursos de Salud Mental de Primera Infancia", desc: "Recursos que apoyan la salud mental de bebés y niños pequeños." },
  },
},
{
  category: "Health",
  link: "https://www.zerotofive.org",
  i18n: {
    en: { title: "Zero to Five Health Resources", desc: "Early childhood development and health resources for young families." },
    fr: { title: "Ressources santé Zero to Five", desc: "Ressources de développement de la petite enfance et de santé pour jeunes familles." },
    es: { title: "Recursos de Salud Zero to Five", desc: "Recursos de desarrollo de primera infancia y salud para familias jóvenes." },
  },
},
{
  category: "Health",
  link: "https://www.healthychildren.org",
  i18n: {
    en: { title: "HealthyChildren.org", desc: "American Academy of Pediatrics resource for parenting and child health information." },
    fr: { title: "HealthyChildren.org", desc: "Ressource de l'American Academy of Pediatrics pour informations sur la santé infantile." },
    es: { title: "HealthyChildren.org", desc: "Recurso de la Academia Americana de Pediatría para información de salud infantil." },
  },
},
{
  category: "Health",
  link: "https://www.zerotothree.org/resource/parenting-resources",
  i18n: {
    en: { title: "Zero to Three Parenting Resources", desc: "Free resources supporting healthy child development from birth to age three." },
    fr: { title: "Ressources parentales Zero to Three", desc: "Ressources gratuites soutenant le développement sain de l'enfant de la naissance à trois ans." },
    es: { title: "Recursos de Crianza Zero to Three", desc: "Recursos gratuitos que apoyan el desarrollo saludable del niño desde el nacimiento hasta los tres años." },
  },
},
{
  category: "Health",
  link: "https://www.cdc.gov/ncbddd/actearly/index.html",
  i18n: {
    en: { title: "CDC Learn the Signs Act Early", desc: "Federal resources on developmental milestones and early intervention services." },
    fr: { title: "CDC Learn the Signs Act Early", desc: "Ressources fédérales sur les jalons du développement et les services d'intervention précoce." },
    es: { title: "CDC Learn the Signs Act Early", desc: "Recursos federales sobre hitos del desarrollo y servicios de intervención temprana." },
  },
},
{
  category: "Health",
  link: "https://www.ectacenter.org",
  i18n: {
    en: { title: "Early Childhood Technical Assistance Center", desc: "Resources supporting early intervention services for children with disabilities." },
    fr: { title: "Early Childhood Technical Assistance Center", desc: "Ressources soutenant les services d'intervention précoce pour enfants handicapés." },
    es: { title: "Early Childhood Technical Assistance Center", desc: "Recursos que apoyan servicios de intervención temprana para niños con discapacidades." },
  },
},

// HOUSING (50)
{
  category: "Housing",
  link: "https://www.hud.gov/topics/rental_assistance/phprog",
  i18n: {
    en: { title: "HUD Public Housing Program Overview", desc: "Federal overview of public housing operated by local housing authorities." },
    fr: { title: "Aperçu programme logement public HUD", desc: "Aperçu fédéral du logement public géré par les autorités de logement locales." },
    es: { title: "Resumen del Programa de Vivienda Pública HUD", desc: "Resumen federal de vivienda pública operada por autoridades de vivienda locales." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/housing_choice_voucher_program_section_8",
  i18n: {
    en: { title: "Housing Choice Voucher Program (Section 8)", desc: "Federal rental assistance program letting eligible families choose private housing." },
    fr: { title: "Programme bons de logement (Section 8)", desc: "Programme fédéral d'aide au loyer permettant aux familles admissibles de choisir un logement privé." },
    es: { title: "Programa de Vales de Vivienda (Sección 8)", desc: "Programa federal de asistencia de alquiler que permite a familias elegibles elegir vivienda privada." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/program_offices/public_indian_housing/programs/hcv/about",
  i18n: {
    en: { title: "About the Section 8 Voucher Program", desc: "Detailed federal explanation of how the Section 8 voucher program works." },
    fr: { title: "À propos du programme bons Section 8", desc: "Explication fédérale détaillée du fonctionnement du programme de bons Section 8." },
    es: { title: "Acerca del Programa de Vales Sección 8", desc: "Explicación federal detallada de cómo funciona el programa de vales Sección 8." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/program_offices/public_indian_housing/programs/hcv/tenant",
  i18n: {
    en: { title: "Section 8 Tenant Information", desc: "Federal information for tenants using Housing Choice Vouchers." },
    fr: { title: "Info locataires Section 8", desc: "Informations fédérales pour locataires utilisant les bons de logement." },
    es: { title: "Información de Inquilinos Sección 8", desc: "Información federal para inquilinos que usan vales de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/program_offices/public_indian_housing/programs/hcv/landlord",
  i18n: {
    en: { title: "Section 8 Landlord Information", desc: "Federal information for landlords wanting to accept Housing Choice Vouchers." },
    fr: { title: "Info propriétaires Section 8", desc: "Informations fédérales pour propriétaires souhaitant accepter les bons de logement." },
    es: { title: "Información de Propietarios Sección 8", desc: "Información federal para propietarios que desean aceptar vales de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/rental_assistance/phas",
  i18n: {
    en: { title: "Public Housing Agency Performance Info", desc: "Federal information on how public housing agency performance is assessed." },
    fr: { title: "Info performance agence logement public", desc: "Informations fédérales sur l'évaluation de la performance des agences de logement public." },
    es: { title: "Información de Desempeño de Agencia de Vivienda Pública", desc: "Información federal sobre cómo se evalúa el desempeño de agencias de vivienda pública." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/rental_assistance/tenantrights/section8",
  i18n: {
    en: { title: "Section 8 Tenant Rights", desc: "Federal information on tenant rights within the Section 8 voucher program." },
    fr: { title: "Droits locataires Section 8", desc: "Informations fédérales sur les droits des locataires dans le programme de bons Section 8." },
    es: { title: "Derechos de Inquilinos Sección 8", desc: "Información federal sobre derechos de inquilinos dentro del programa de vales Sección 8." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/fair_housing_equal_opp",
  i18n: {
    en: { title: "HUD Fair Housing and Equal Opportunity", desc: "Federal office enforcing fair housing laws against discrimination." },
    fr: { title: "HUD logement équitable et égalité des chances", desc: "Bureau fédéral appliquant les lois sur le logement équitable contre la discrimination." },
    es: { title: "HUD Vivienda Justa e Igualdad de Oportunidades", desc: "Oficina federal que hace cumplir leyes de vivienda justa contra la discriminación." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/program_offices/fair_housing_equal_opp/online-complaint",
  i18n: {
    en: { title: "File a Fair Housing Complaint", desc: "Official portal to file a housing discrimination complaint with HUD." },
    fr: { title: "Déposer plainte logement équitable", desc: "Portail officiel pour déposer une plainte de discrimination au logement auprès de HUD." },
    es: { title: "Presente una Queja de Vivienda Justa", desc: "Portal oficial para presentar una queja de discriminación de vivienda ante HUD." },
  },
},
{
  category: "Housing",
  link: "https://www.nationalfairhousing.org",
  i18n: {
    en: { title: "National Fair Housing Alliance", desc: "Advocacy organization working to eliminate housing discrimination nationwide." },
    fr: { title: "National Fair Housing Alliance", desc: "Organisation de plaidoyer travaillant à éliminer la discrimination au logement." },
    es: { title: "National Fair Housing Alliance", desc: "Organización de defensa que trabaja para eliminar la discriminación de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.fairhousingjustice.org",
  i18n: {
    en: { title: "Fair Housing Justice Center", desc: "Legal advocacy and enforcement resources against housing discrimination." },
    fr: { title: "Fair Housing Justice Center", desc: "Ressources de plaidoyer juridique et d'application contre la discrimination au logement." },
    es: { title: "Fair Housing Justice Center", desc: "Recursos de defensa legal y aplicación contra la discriminación de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.lawyers.com/legal-info/real-estate/landlord-tenant-law/",
  i18n: {
    en: { title: "Landlord-Tenant Law Guide", desc: "Independent legal guide explaining tenant and landlord rights and responsibilities." },
    fr: { title: "Guide droit locataire-propriétaire", desc: "Guide juridique indépendant expliquant les droits et responsabilités des locataires et propriétaires." },
    es: { title: "Guía de Ley de Inquilino-Propietario", desc: "Guía legal independiente que explica derechos y responsabilidades de inquilinos y propietarios." },
  },
},
{
  category: "Housing",
  link: "https://www.nlihc.org/explore-issues/tenant-protections",
  i18n: {
    en: { title: "NLIHC Tenant Protections Resources", desc: "Advocacy resources tracking tenant protection laws across states." },
    fr: { title: "Ressources protections locataires NLIHC", desc: "Ressources de plaidoyer suivant les lois de protection des locataires par État." },
    es: { title: "Recursos de Protecciones de Inquilinos NLIHC", desc: "Recursos de defensa que rastrean leyes de protección de inquilinos por estado." },
  },
},
{
  category: "Housing",
  link: "https://www.evictionlab.org",
  i18n: {
    en: { title: "Eviction Lab", desc: "Research database tracking eviction rates and trends across the US." },
    fr: { title: "Eviction Lab", desc: "Base de données de recherche suivant les taux et tendances d'expulsion aux États-Unis." },
    es: { title: "Eviction Lab", desc: "Base de datos de investigación que rastrea tasas y tendencias de desalojo en Estados Unidos." },
  },
},
{
  category: "Housing",
  link: "https://www.evictionlab.org/covid-eviction-tracker",
  i18n: {
    en: { title: "Eviction Lab Emergency Tracker", desc: "Tracker showing state and local eviction protection status during crises." },
    fr: { title: "Suivi urgence Eviction Lab", desc: "Suivi montrant l'état des protections contre l'expulsion locales et d'État lors de crises." },
    es: { title: "Rastreador de Emergencia Eviction Lab", desc: "Rastreador que muestra el estado de protecciones de desalojo estatales y locales durante crisis." },
  },
},
{
  category: "Housing",
  link: "https://www.lsc.gov/what-legal-aid/find-legal-aid",
  i18n: {
    en: { title: "Legal Services Corporation Find Legal Aid", desc: "Official federal directory to find free legal aid for housing issues." },
    fr: { title: "Trouver aide juridique Legal Services Corporation", desc: "Répertoire fédéral officiel pour trouver une aide juridique gratuite pour problèmes de logement." },
    es: { title: "Encuentre Ayuda Legal Legal Services Corporation", desc: "Directorio federal oficial para encontrar ayuda legal gratuita para problemas de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.lawhelp.org",
  i18n: {
    en: { title: "LawHelp.org", desc: "State-by-state directory of free legal aid resources including housing help." },
    fr: { title: "LawHelp.org", desc: "Répertoire État par État de ressources d'aide juridique gratuites incluant l'aide au logement." },
    es: { title: "LawHelp.org", desc: "Directorio estado por estado de recursos legales gratuitos incluyendo ayuda de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.probono.net",
  i18n: {
    en: { title: "Pro Bono Net", desc: "Directory connecting people with free legal aid organizations nationwide." },
    fr: { title: "Pro Bono Net", desc: "Répertoire reliant les personnes à des organismes d'aide juridique gratuite." },
    es: { title: "Pro Bono Net", desc: "Directorio que conecta a personas con organizaciones de ayuda legal gratuita." },
  },
},
{
  category: "Housing",
  link: "https://www.legalaid.org",
  i18n: {
    en: { title: "Legal Aid Society", desc: "Free legal representation and advice for low-income tenants facing housing issues." },
    fr: { title: "Legal Aid Society", desc: "Représentation et conseils juridiques gratuits pour locataires à faible revenu." },
    es: { title: "Legal Aid Society", desc: "Representación y asesoría legal gratuita para inquilinos de bajos ingresos." },
  },
},
{
  category: "Housing",
  link: "https://www.evictionhelp.org",
  i18n: {
    en: { title: "Eviction Help Directory", desc: "Directory connecting tenants facing eviction to local legal resources." },
    fr: { title: "Répertoire aide expulsion", desc: "Répertoire reliant les locataires menacés d'expulsion à des ressources juridiques locales." },
    es: { title: "Directorio de Ayuda de Desalojo", desc: "Directorio que conecta a inquilinos que enfrentan desalojo con recursos legales locales." },
  },
},
{
  category: "Housing",
  link: "https://www.consumerfinance.gov/consumer-tools/eviction-relief/",
  i18n: {
    en: { title: "CFPB Eviction Relief Resources", desc: "Federal consumer resources for tenants seeking eviction assistance." },
    fr: { title: "Ressources aide expulsion CFPB", desc: "Ressources consommateur fédérales pour locataires cherchant une aide contre l'expulsion." },
    es: { title: "Recursos de Alivio de Desalojo CFPB", desc: "Recursos del consumidor federal para inquilinos que buscan asistencia de desalojo." },
  },
},
{
  category: "Housing",
  link: "https://www.usich.gov/goals/prevent-and-end-homelessness",
  i18n: {
    en: { title: "USICH Preventing and Ending Homelessness", desc: "Federal strategic resources on preventing and ending homelessness." },
    fr: { title: "USICH prévenir et mettre fin au sans-abrisme", desc: "Ressources stratégiques fédérales pour prévenir et mettre fin au sans-abrisme." },
    es: { title: "USICH Prevención y Fin de la Falta de Vivienda", desc: "Recursos estratégicos federales para prevenir y acabar con la falta de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.endhomelessness.org",
  i18n: {
    en: { title: "National Alliance to End Homelessness", desc: "Research, advocacy, and resource hub on ending homelessness." },
    fr: { title: "National Alliance to End Homelessness", desc: "Centre de recherche, plaidoyer et ressources pour mettre fin au sans-abrisme." },
    es: { title: "National Alliance to End Homelessness", desc: "Centro de investigación, defensa y recursos para acabar con la falta de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.endhomelessness.org/homelessness-in-america/homelessness-statistics/",
  i18n: {
    en: { title: "Homelessness Statistics", desc: "National and state-level data on homelessness trends and demographics." },
    fr: { title: "Statistiques sans-abrisme", desc: "Données nationales et par État sur les tendances et démographies du sans-abrisme." },
    es: { title: "Estadísticas de Falta de Vivienda", desc: "Datos nacionales y estatales sobre tendencias y demografía de la falta de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.coalitionforthehomeless.org",
  i18n: {
    en: { title: "Coalition for the Homeless", desc: "Advocacy and direct services supporting homeless individuals and families." },
    fr: { title: "Coalition for the Homeless", desc: "Plaidoyer et services directs soutenant les personnes et familles sans-abri." },
    es: { title: "Coalition for the Homeless", desc: "Defensa y servicios directos que apoyan a personas y familias sin hogar." },
  },
},
{
  category: "Housing",
  link: "https://www.nationalhomeless.org",
  i18n: {
    en: { title: "National Coalition for the Homeless", desc: "Advocacy organization working on policy solutions to end homelessness." },
    fr: { title: "National Coalition for the Homeless", desc: "Organisation de plaidoyer travaillant sur des solutions politiques pour mettre fin au sans-abrisme." },
    es: { title: "National Coalition for the Homeless", desc: "Organización de defensa que trabaja en soluciones de políticas para acabar con la falta de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.streetsense.org",
  i18n: {
    en: { title: "Street Sense Media", desc: "Newspaper and advocacy organization giving voice to people experiencing homelessness." },
    fr: { title: "Street Sense Media", desc: "Journal et organisation de plaidoyer donnant une voix aux personnes sans-abri." },
    es: { title: "Street Sense Media", desc: "Periódico y organización de defensa que da voz a personas sin hogar." },
  },
},
{
  category: "Housing",
  link: "https://www.miriamshouse.org",
  i18n: {
    en: { title: "Miriam's House", desc: "Supportive housing programs for women and families experiencing homelessness." },
    fr: { title: "Miriam's House", desc: "Programmes de logement soutenu pour femmes et familles sans-abri." },
    es: { title: "Miriam's House", desc: "Programas de vivienda de apoyo para mujeres y familias sin hogar." },
  },
},
{
  category: "Housing",
  link: "https://www.doorwaysva.org",
  states: ["VA"],
  i18n: {
    en: { title: "Doorways for Women and Families", desc: "Housing and support services for women and families fleeing domestic violence." },
    fr: { title: "Doorways for Women and Families", desc: "Services de logement et de soutien pour femmes et familles fuyant la violence domestique." },
    es: { title: "Doorways for Women and Families", desc: "Servicios de vivienda y apoyo para mujeres y familias que huyen de la violencia doméstica." },
  },
},
{
  category: "Housing",
  link: "https://www.transitionalhousing.org",
  i18n: {
    en: { title: "Transitional Housing Directory", desc: "Directory of transitional housing programs helping people rebuild stability." },
    fr: { title: "Répertoire logement transitoire", desc: "Répertoire de programmes de logement transitoire aidant les personnes à retrouver la stabilité." },
    es: { title: "Directorio de Vivienda Transitoria", desc: "Directorio de programas de vivienda transitoria que ayudan a las personas a recuperar estabilidad." },
  },
},
{
  category: "Housing",
  link: "https://www.recoveryhousingassociation.org",
  i18n: {
    en: { title: "Recovery Housing Association Directory", desc: "Directory of sober and recovery-focused transitional housing options." },
    fr: { title: "Répertoire Recovery Housing Association", desc: "Répertoire d'options de logement transitoire axées sur la sobriété et le rétablissement." },
    es: { title: "Directorio Recovery Housing Association", desc: "Directorio de opciones de vivienda transitoria enfocadas en sobriedad y recuperación." },
  },
},
{
  category: "Housing",
  link: "https://www.oxfordhouse.org",
  i18n: {
    en: { title: "Oxford House", desc: "Self-run, self-supported recovery housing network for people in addiction recovery." },
    fr: { title: "Oxford House", desc: "Réseau de logement de rétablissement autogéré pour personnes en rétablissement de dépendance." },
    es: { title: "Oxford House", desc: "Red de vivienda de recuperación autogestionada para personas en recuperación de adicciones." },
  },
},
{
  category: "Housing",
  link: "https://www.narronline.org",
  i18n: {
    en: { title: "National Alliance for Recovery Residences", desc: "Directory and standards for quality recovery housing across the country." },
    fr: { title: "National Alliance for Recovery Residences", desc: "Répertoire et normes pour logements de rétablissement de qualité à travers le pays." },
    es: { title: "National Alliance for Recovery Residences", desc: "Directorio y estándares para vivienda de recuperación de calidad en todo el país." },
  },
},
{
  category: "Housing",
  link: "https://www.reentrycentral.org/housing",
  i18n: {
    en: { title: "Reentry Central Housing Resources", desc: "Housing resources for people reentering society after incarceration." },
    fr: { title: "Ressources logement Reentry Central", desc: "Ressources de logement pour personnes se réinsérant après incarcération." },
    es: { title: "Recursos de Vivienda Reentry Central", desc: "Recursos de vivienda para personas que se reintegran tras encarcelamiento." },
  },
},
{
  category: "Housing",
  link: "https://www.prisonfellowship.org/resources/support-friends-family/staying-connected/reentry-housing/",
  i18n: {
    en: { title: "Prison Fellowship Reentry Housing", desc: "Housing resources and guidance for people reentering society after prison." },
    fr: { title: "Logement réinsertion Prison Fellowship", desc: "Ressources de logement pour personnes se réinsérant après la prison." },
    es: { title: "Vivienda de Reingreso Prison Fellowship", desc: "Recursos de vivienda para personas que se reintegran después de la prisión." },
  },
},
{
  category: "Housing",
  link: "https://www.friendsoutside.org",
  i18n: {
    en: { title: "Friends Outside", desc: "Support services including housing help for formerly incarcerated individuals." },
    fr: { title: "Friends Outside", desc: "Services de soutien incluant aide au logement pour personnes anciennement incarcérées." },
    es: { title: "Friends Outside", desc: "Servicios de apoyo incluyendo ayuda de vivienda para personas anteriormente encarceladas." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/rental_assistance/reentry",
  i18n: {
    en: { title: "HUD Reentry Housing Resources", desc: "Federal housing resources specifically for people reentering society after incarceration." },
    fr: { title: "Ressources logement réinsertion HUD", desc: "Ressources de logement fédérales spécifiquement pour personnes se réinsérant après incarcération." },
    es: { title: "Recursos de Vivienda de Reingreso HUD", desc: "Recursos federales de vivienda específicamente para personas que se reintegran tras encarcelamiento." },
  },
},
{
  category: "Housing",
  link: "https://www.csh.org",
  i18n: {
    en: { title: "Corporation for Supportive Housing", desc: "National organization advancing supportive housing solutions for vulnerable populations." },
    fr: { title: "Corporation for Supportive Housing", desc: "Organisation nationale faisant progresser les solutions de logement soutenu." },
    es: { title: "Corporation for Supportive Housing", desc: "Organización nacional que promueve soluciones de vivienda de apoyo para poblaciones vulnerables." },
  },
},
{
  category: "Housing",
  link: "https://www.tacinc.org",
  i18n: {
    en: { title: "Technical Assistance Collaborative", desc: "Technical support helping communities develop supportive housing programs." },
    fr: { title: "Technical Assistance Collaborative", desc: "Soutien technique aidant les communautés à développer des programmes de logement soutenu." },
    es: { title: "Technical Assistance Collaborative", desc: "Apoyo técnico que ayuda a comunidades a desarrollar programas de vivienda de apoyo." },
  },
},
{
  category: "Housing",
  link: "https://www.housingfirst.org",
  i18n: {
    en: { title: "Housing First Initiative", desc: "Resources and research supporting the Housing First model for ending homelessness." },
    fr: { title: "Housing First Initiative", desc: "Ressources et recherche soutenant le modèle Housing First pour mettre fin au sans-abrisme." },
    es: { title: "Housing First Initiative", desc: "Recursos e investigación que apoyan el modelo Housing First para acabar con la falta de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.usich.gov/solutions/housing/housing-first",
  i18n: {
    en: { title: "USICH Housing First Overview", desc: "Federal overview of the evidence-based Housing First approach." },
    fr: { title: "Aperçu Housing First USICH", desc: "Aperçu fédéral de l'approche Housing First basée sur des preuves." },
    es: { title: "Resumen de Housing First USICH", desc: "Resumen federal del enfoque Housing First basado en evidencia." },
  },
},
{
  category: "Housing",
  link: "https://www.communitysolutions.org",
  i18n: {
    en: { title: "Community Solutions Built for Zero", desc: "National initiative working with communities to end homelessness through data-driven strategies." },
    fr: { title: "Community Solutions Built for Zero", desc: "Initiative nationale travaillant avec les communautés pour mettre fin au sans-abrisme." },
    es: { title: "Community Solutions Built for Zero", desc: "Iniciativa nacional que trabaja con comunidades para acabar con la falta de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.va.gov/homeless/reachout.asp",
  i18n: {
    en: { title: "VA Homeless Veteran Outreach", desc: "Federal outreach program connecting homeless veterans to services and housing." },
    fr: { title: "Sensibilisation vétérans sans-abri VA", desc: "Programme de sensibilisation fédéral reliant les vétérans sans-abri aux services et au logement." },
    es: { title: "Alcance para Veteranos sin Hogar VA", desc: "Programa de alcance federal que conecta a veteranos sin hogar con servicios y vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/press/press_releases_media_advisories/HUD_No_23_045",
  i18n: {
    en: { title: "HUD Homelessness Funding Announcements", desc: "Official HUD press releases on new funding for homelessness programs." },
    fr: { title: "Annonces financement sans-abrisme HUD", desc: "Communiqués de presse officiels HUD sur les nouveaux financements pour programmes sans-abrisme." },
    es: { title: "Anuncios de Financiamiento de Falta de Vivienda HUD", desc: "Comunicados de prensa oficiales de HUD sobre nuevo financiamiento para programas de falta de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.hud.gov/topics/youth_homelessness",
  i18n: {
    en: { title: "HUD Youth Homelessness Programs", desc: "Federal housing programs specifically addressing youth homelessness." },
    fr: { title: "Programmes sans-abrisme jeunesse HUD", desc: "Programmes de logement fédéraux traitant spécifiquement le sans-abrisme des jeunes." },
    es: { title: "Programas de Falta de Vivienda Juvenil HUD", desc: "Programas federales de vivienda que abordan específicamente la falta de vivienda juvenil." },
  },
},
{
  category: "Housing",
  link: "https://www.truecolorsunited.org",
  i18n: {
    en: { title: "True Colors United", desc: "Advocacy organization addressing LGBTQ youth homelessness with housing solutions." },
    fr: { title: "True Colors United", desc: "Organisation de plaidoyer traitant le sans-abrisme des jeunes LGBTQ avec des solutions de logement." },
    es: { title: "True Colors United", desc: "Organización de defensa que aborda la falta de vivienda de jóvenes LGBTQ con soluciones de vivienda." },
  },
},
{
  category: "Housing",
  link: "https://www.nn4youth.org",
  i18n: {
    en: { title: "National Network for Youth", desc: "Advocacy and resource network addressing youth homelessness nationwide." },
    fr: { title: "National Network for Youth", desc: "Réseau de plaidoyer et de ressources traitant le sans-abrisme des jeunes." },
    es: { title: "National Network for Youth", desc: "Red de defensa y recursos que aborda la falta de vivienda juvenil a nivel nacional." },
  },
},
{
  category: "Housing",
  link: "https://www.stmaryshome.org",
  i18n: {
    en: { title: "St. Mary's Home for Young Women", desc: "Housing and support services for young women transitioning out of foster care." },
    fr: { title: "St. Mary's Home for Young Women", desc: "Services de logement et de soutien pour jeunes femmes quittant le système de placement familial." },
    es: { title: "St. Mary's Home for Young Women", desc: "Servicios de vivienda y apoyo para jóvenes que salen del sistema de cuidado de crianza." },
  },
},
{
  category: "Housing",
  link: "https://www.fostercareoutcomes.org/housing",
  i18n: {
    en: { title: "Foster Care Transition Housing Resources", desc: "Housing resources for young people aging out of the foster care system." },
    fr: { title: "Ressources logement transition placement familial", desc: "Ressources de logement pour jeunes quittant le système de placement familial." },
    es: { title: "Recursos de Vivienda de Transición de Cuidado de Crianza", desc: "Recursos de vivienda para jóvenes que salen del sistema de cuidado de crianza." },
  },
},
{
  category: "Housing",
  link: "https://www.fostercareunited.org",
  i18n: {
    en: { title: "Foster Care United", desc: "Support network connecting former foster youth to housing and other resources." },
    fr: { title: "Foster Care United", desc: "Réseau de soutien reliant les anciens jeunes du placement familial au logement." },
    es: { title: "Foster Care United", desc: "Red de apoyo que conecta a exjóvenes de cuidado de crianza con vivienda y otros recursos." },
  },
},

// UTILITIES (40)
{
  category: "Utilities",
  link: "https://www.energy.gov/scep/slsc/energy-efficiency-and-conservation-block-grant-program",
  i18n: {
    en: { title: "Energy Efficiency and Conservation Block Grant", desc: "Federal funding supporting local energy efficiency and conservation projects." },
    fr: { title: "Subvention efficacité et conservation énergie", desc: "Financement fédéral soutenant les projets locaux d'efficacité et de conservation énergétique." },
    es: { title: "Subvención en Bloque de Eficiencia y Conservación de Energía", desc: "Financiamiento federal que apoya proyectos locales de eficiencia y conservación de energía." },
  },
},
{
  category: "Utilities",
  link: "https://www.energy.gov/scep/slsc/state-energy-program",
  i18n: {
    en: { title: "State Energy Program", desc: "Federal funding supporting state-level energy efficiency and renewable initiatives." },
    fr: { title: "Programme énergétique d'État", desc: "Financement fédéral soutenant les initiatives d'efficacité énergétique et renouvelable au niveau des États." },
    es: { title: "Programa Energético Estatal", desc: "Financiamiento federal que apoya iniciativas de eficiencia energética y renovable a nivel estatal." },
  },
},
{
  category: "Utilities",
  link: "https://www.epa.gov/statelocalenergy",
  i18n: {
    en: { title: "EPA State and Local Energy Resources", desc: "Federal resources supporting state and local clean energy policy development." },
    fr: { title: "Ressources énergie État et local EPA", desc: "Ressources fédérales soutenant le développement de politiques énergétiques propres." },
    es: { title: "Recursos Energéticos Estatales y Locales EPA", desc: "Recursos federales que apoyan el desarrollo de políticas de energía limpia estatal y local." },
  },
},
{
  category: "Utilities",
  link: "https://www.aceee.org",
  i18n: {
    en: { title: "American Council for an Energy-Efficient Economy", desc: "Research and policy resources on energy efficiency programs and savings." },
    fr: { title: "American Council for an Energy-Efficient Economy", desc: "Ressources de recherche et politiques sur les programmes d'efficacité énergétique." },
    es: { title: "American Council for an Energy-Efficient Economy", desc: "Recursos de investigación y políticas sobre programas de eficiencia energética." },
  },
},
{
  category: "Utilities",
  link: "https://www.aceee.org/policy-brief/utility-programs",
  i18n: {
    en: { title: "ACEEE Utility Efficiency Programs Database", desc: "Database of utility company energy efficiency programs by state." },
    fr: { title: "Base de données programmes efficacité ACEEE", desc: "Base de données des programmes d'efficacité énergétique des compagnies de services par État." },
    es: { title: "Base de Datos de Programas de Eficiencia de Servicios ACEEE", desc: "Base de datos de programas de eficiencia energética de compañías de servicios por estado." },
  },
},
{
  category: "Utilities",
  link: "https://www.nrdc.org/resources/energy-affordability",
  i18n: {
    en: { title: "NRDC Energy Affordability Resources", desc: "Research and advocacy on making energy costs more affordable for households." },
    fr: { title: "Ressources abordabilité énergie NRDC", desc: "Recherche et plaidoyer pour rendre les coûts énergétiques plus abordables." },
    es: { title: "Recursos de Asequibilidad Energética NRDC", desc: "Investigación y defensa para hacer los costos de energía más asequibles." },
  },
},
{
  category: "Utilities",
  link: "https://www.nclc.org/resources/utility-shutoffs/",
  i18n: {
    en: { title: "NCLC Utility Shutoff Protections", desc: "Legal resource tracking state protections against utility service shutoffs." },
    fr: { title: "Protections coupures services NCLC", desc: "Ressource juridique suivant les protections d'État contre les coupures de services." },
    es: { title: "Protecciones contra Cortes de Servicios NCLC", desc: "Recurso legal que rastrea protecciones estatales contra cortes de servicios públicos." },
  },
},
{
  category: "Utilities",
  link: "https://www.naruc.org/about-naruc/",
  i18n: {
    en: { title: "National Association of Regulatory Utility Commissioners", desc: "Directory of state utility regulatory commissions overseeing rates and rules." },
    fr: { title: "Association nationale commissaires réglementaires", desc: "Répertoire des commissions de réglementation des services publics par État." },
    es: { title: "Asociación Nacional de Comisionados Regulatorios de Servicios", desc: "Directorio de comisiones reguladoras de servicios públicos estatales." },
  },
},
{
  category: "Utilities",
  link: "https://www.psc.state.pa.us",
  states: ["PA"],
  i18n: {
    en: { title: "Pennsylvania Public Utility Commission", desc: "State agency regulating utility rates and consumer protections for Pennsylvania." },
    fr: { title: "Commission des services publics de Pennsylvanie", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Comisión de Servicios Públicos de Pennsylvania", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en Pennsylvania." },
  },
},
{
  category: "Utilities",
  link: "https://www.dps.ny.gov",
  states: ["NY"],
  i18n: {
    en: { title: "New York Department of Public Service", desc: "State agency regulating utility rates and consumer protections for New York." },
    fr: { title: "Department of Public Service de New York", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Departamento de Servicio Público de Nueva York", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en Nueva York." },
  },
},
{
  category: "Utilities",
  link: "https://www.cpuc.ca.gov",
  states: ["CA"],
  i18n: {
    en: { title: "California Public Utilities Commission", desc: "State agency regulating utility rates and consumer protections for California." },
    fr: { title: "California Public Utilities Commission", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Comisión de Servicios Públicos de California", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en California." },
  },
},
{
  category: "Utilities",
  link: "https://www.puc.texas.gov",
  states: ["TX"],
  i18n: {
    en: { title: "Public Utility Commission of Texas", desc: "State agency regulating utility rates and consumer protections for Texas." },
    fr: { title: "Public Utility Commission of Texas", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Comisión de Servicios Públicos de Texas", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en Texas." },
  },
},
{
  category: "Utilities",
  link: "https://www.psc.state.fl.us",
  states: ["FL"],
  i18n: {
    en: { title: "Florida Public Service Commission", desc: "State agency regulating utility rates and consumer protections for Florida." },
    fr: { title: "Florida Public Service Commission", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Comisión de Servicio Público de Florida", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en Florida." },
  },
},
{
  category: "Utilities",
  link: "https://www.psc.state.il.us",
  states: ["IL"],
  i18n: {
    en: { title: "Illinois Commerce Commission", desc: "State agency regulating utility rates and consumer protections for Illinois." },
    fr: { title: "Illinois Commerce Commission", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Comisión de Comercio de Illinois", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en Illinois." },
  },
},
{
  category: "Utilities",
  link: "https://www.puco.ohio.gov",
  states: ["OH"],
  i18n: {
    en: { title: "Public Utilities Commission of Ohio", desc: "State agency regulating utility rates and consumer protections for Ohio." },
    fr: { title: "Public Utilities Commission of Ohio", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Comisión de Servicios Públicos de Ohio", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en Ohio." },
  },
},
{
  category: "Utilities",
  link: "https://www.michigan.gov/mpsc",
  states: ["MI"],
  i18n: {
    en: { title: "Michigan Public Service Commission", desc: "State agency regulating utility rates and consumer protections for Michigan." },
    fr: { title: "Michigan Public Service Commission", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Comisión de Servicio Público de Michigan", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en Michigan." },
  },
},
{
  category: "Utilities",
  link: "https://www.psc.state.ga.us",
  states: ["GA"],
  i18n: {
    en: { title: "Georgia Public Service Commission", desc: "State agency regulating utility rates and consumer protections for Georgia." },
    fr: { title: "Georgia Public Service Commission", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Comisión de Servicio Público de Georgia", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en Georgia." },
  },
},
{
  category: "Utilities",
  link: "https://www.azcc.gov",
  states: ["AZ"],
  i18n: {
    en: { title: "Arizona Corporation Commission", desc: "State agency regulating utility rates and consumer protections for Arizona." },
    fr: { title: "Arizona Corporation Commission", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Comisión de Corporaciones de Arizona", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en Arizona." },
  },
},
{
  category: "Utilities",
  link: "https://www.puc.nv.gov",
  states: ["NV"],
  i18n: {
    en: { title: "Public Utilities Commission of Nevada", desc: "State agency regulating utility rates and consumer protections for Nevada." },
    fr: { title: "Public Utilities Commission of Nevada", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Comisión de Servicios Públicos de Nevada", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en Nevada." },
  },
},
{
  category: "Utilities",
  link: "https://www.utc.wa.gov",
  states: ["WA"],
  i18n: {
    en: { title: "Washington Utilities and Transportation Commission", desc: "State agency regulating utility rates and consumer protections for Washington." },
    fr: { title: "Washington Utilities and Transportation Commission", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Comisión de Servicios y Transporte de Washington", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en Washington." },
  },
},
{
  category: "Utilities",
  link: "https://www.psc.state.nc.us",
  states: ["NC"],
  i18n: {
    en: { title: "North Carolina Utilities Commission", desc: "State agency regulating utility rates and consumer protections for North Carolina." },
    fr: { title: "North Carolina Utilities Commission", desc: "Agence d'État réglementant les tarifs et protections des consommateurs de services." },
    es: { title: "Comisión de Servicios Públicos de Carolina del Norte", desc: "Agencia estatal que regula tarifas y protecciones al consumidor de servicios en Carolina del Norte." },
  },
},
{
  category: "Utilities",
  link: "https://www.psc.state.pa.us/consumer-info",
  states: ["PA"],
  i18n: {
    en: { title: "Pennsylvania PUC Consumer Info", desc: "Consumer resources on utility rights and complaint filing for Pennsylvania." },
    fr: { title: "Info consommateurs PUC Pennsylvanie", desc: "Ressources consommateurs sur les droits et plaintes de services pour la Pennsylvanie." },
    es: { title: "Información al Consumidor PUC Pennsylvania", desc: "Recursos del consumidor sobre derechos y quejas de servicios para Pennsylvania." },
  },
},
{
  category: "Utilities",
  link: "https://www.puc.pa.gov/filing-complaint",
  states: ["PA"],
  i18n: {
    en: { title: "Pennsylvania PUC Complaint Filing", desc: "Official process to file a complaint against a utility company in Pennsylvania." },
    fr: { title: "Dépôt plainte PUC Pennsylvanie", desc: "Processus officiel pour déposer une plainte contre une compagnie de services en Pennsylvanie." },
    es: { title: "Presentación de Quejas PUC Pennsylvania", desc: "Proceso oficial para presentar una queja contra una compañía de servicios en Pennsylvania." },
  },
},
{
  category: "Utilities",
  link: "https://www.dps.ny.gov/ConsumerComplaint",
  states: ["NY"],
  i18n: {
    en: { title: "New York DPS Consumer Complaint", desc: "Official process to file a complaint against a utility company in New York." },
    fr: { title: "Plainte consommateur DPS New York", desc: "Processus officiel pour déposer une plainte contre une compagnie de services à New York." },
    es: { title: "Queja del Consumidor DPS Nueva York", desc: "Proceso oficial para presentar una queja contra una compañía de servicios en Nueva York." },
  },
},
{
  category: "Utilities",
  link: "https://www.puc.texas.gov/consumer",
  states: ["TX"],
  i18n: {
    en: { title: "Texas PUC Consumer Resources", desc: "Consumer resources on utility rights and complaint filing for Texas." },
    fr: { title: "Ressources consommateurs PUC Texas", desc: "Ressources consommateurs sur les droits et plaintes de services pour le Texas." },
    es: { title: "Recursos al Consumidor PUC Texas", desc: "Recursos del consumidor sobre derechos y quejas de servicios para Texas." },
  },
},
{
  category: "Utilities",
  link: "https://www.powertochoose.org",
  states: ["TX"],
  i18n: {
    en: { title: "Power to Choose Texas", desc: "Official state tool to compare electricity plans and providers in deregulated Texas markets." },
    fr: { title: "Power to Choose Texas", desc: "Outil d'État officiel pour comparer les plans et fournisseurs d'électricité au Texas." },
    es: { title: "Power to Choose Texas", desc: "Herramienta estatal oficial para comparar planes y proveedores de electricidad en Texas." },
  },
},
{
  category: "Utilities",
  link: "https://www.papowerswitch.com",
  states: ["PA"],
  i18n: {
    en: { title: "PA Power Switch", desc: "Official state tool to compare electricity suppliers in Pennsylvania's deregulated market." },
    fr: { title: "PA Power Switch", desc: "Outil d'État officiel pour comparer les fournisseurs d'électricité en Pennsylvanie." },
    es: { title: "PA Power Switch", desc: "Herramienta estatal oficial para comparar proveedores de electricidad en Pennsylvania." },
  },
},
{
  category: "Utilities",
  link: "https://www.powertochoose.org/en-us/",
  i18n: {
    en: { title: "Power to Choose National Resources", desc: "Resources helping consumers understand deregulated energy markets nationally." },
    fr: { title: "Ressources nationales Power to Choose", desc: "Ressources aidant les consommateurs à comprendre les marchés énergétiques déréglementés." },
    es: { title: "Recursos Nacionales Power to Choose", desc: "Recursos que ayudan a consumidores a entender mercados energéticos desregulados." },
  },
},
{
  category: "Utilities",
  link: "https://www.energyswitch.ohio.gov",
  states: ["OH"],
  i18n: {
    en: { title: "Ohio Energy Switch", desc: "Official state tool to compare electricity and gas suppliers in Ohio." },
    fr: { title: "Ohio Energy Switch", desc: "Outil d'État officiel pour comparer les fournisseurs d'électricité et de gaz en Ohio." },
    es: { title: "Ohio Energy Switch", desc: "Herramienta estatal oficial para comparar proveedores de electricidad y gas en Ohio." },
  },
},
{
  category: "Utilities",
  link: "https://www.pseg.com/help/financial-assistance",
  states: ["NJ", "NY"],
  i18n: {
    en: { title: "PSE&G Financial Assistance", desc: "Utility bill assistance programs for qualifying PSE&G customers." },
    fr: { title: "Aide financière PSE&G", desc: "Programmes d'aide aux factures pour clients PSE&G admissibles." },
    es: { title: "Asistencia Financiera PSE&G", desc: "Programas de asistencia de facturas para clientes elegibles de PSE&G." },
  },
},
{
  category: "Utilities",
  link: "https://www.exeloncorp.com/community/customer-assistance",
  i18n: {
    en: { title: "Exelon Customer Assistance Programs", desc: "Utility bill assistance programs across Exelon utility service areas." },
    fr: { title: "Programmes aide clients Exelon", desc: "Programmes d'aide aux factures dans les zones de service Exelon." },
    es: { title: "Programas de Asistencia al Cliente Exelon", desc: "Programas de asistencia de facturas en áreas de servicio de Exelon." },
  },
},
{
  category: "Utilities",
  link: "https://www.centerpointenergy.com/en-us/residential/billing-and-payment/payment-assistance",
  states: ["TX", "IN", "OH", "MN"],
  i18n: {
    en: { title: "CenterPoint Energy Payment Assistance", desc: "Utility bill assistance programs across CenterPoint Energy service territories." },
    fr: { title: "Aide paiement CenterPoint Energy", desc: "Programmes d'aide aux factures dans les territoires de service CenterPoint Energy." },
    es: { title: "Asistencia de Pago CenterPoint Energy", desc: "Programas de asistencia de facturas en territorios de servicio de CenterPoint Energy." },
  },
},
{
  category: "Utilities",
  link: "https://www.ameren.com/account/assistance-programs",
  states: ["IL", "MO"],
  i18n: {
    en: { title: "Ameren Assistance Programs", desc: "Utility bill assistance programs for qualifying Ameren customers." },
    fr: { title: "Programmes aide Ameren", desc: "Programmes d'aide aux factures pour clients Ameren admissibles." },
    es: { title: "Programas de Asistencia Ameren", desc: "Programas de asistencia de facturas para clientes elegibles de Ameren." },
  },
},
{
  category: "Utilities",
  link: "https://www.wepco.com/customer-service/financial-assistance",
  states: ["WI"],
  i18n: {
    en: { title: "We Energies Financial Assistance", desc: "Utility bill assistance programs for qualifying Wisconsin households." },
    fr: { title: "Aide financière We Energies", desc: "Programmes d'aide aux factures pour ménages admissibles au Wisconsin." },
    es: { title: "Asistencia Financiera We Energies", desc: "Programas de asistencia de facturas para hogares elegibles en Wisconsin." },
  },
},
{
  category: "Utilities",
  link: "https://www.peco.com/waystosave/assistanceprograms",
  states: ["PA"],
  i18n: {
    en: { title: "PECO Assistance Programs", desc: "Utility bill assistance programs for qualifying PECO customers in Pennsylvania." },
    fr: { title: "Programmes aide PECO", desc: "Programmes d'aide aux factures pour clients PECO admissibles en Pennsylvanie." },
    es: { title: "Programas de Asistencia PECO", desc: "Programas de asistencia de facturas para clientes elegibles de PECO en Pennsylvania." },
  },
},
{
  category: "Utilities",
  link: "https://www.firstenergycorp.com/help/financial_assistance.html",
  states: ["OH", "PA", "NJ", "WV"],
  i18n: {
    en: { title: "FirstEnergy Financial Assistance", desc: "Utility bill assistance programs across FirstEnergy service territories." },
    fr: { title: "Aide financière FirstEnergy", desc: "Programmes d'aide aux factures dans les territoires de service FirstEnergy." },
    es: { title: "Asistencia Financiera FirstEnergy", desc: "Programas de asistencia de facturas en territorios de servicio de FirstEnergy." },
  },
},
{
  category: "Utilities",
  link: "https://www.appalachianpower.com/save/programs/",
  states: ["VA", "WV", "TN", "NC"],
  i18n: {
    en: { title: "Appalachian Power Assistance Programs", desc: "Utility bill assistance programs across Appalachian Power service territories." },
    fr: { title: "Programmes aide Appalachian Power", desc: "Programmes d'aide aux factures dans les territoires de service Appalachian Power." },
    es: { title: "Programas de Asistencia Appalachian Power", desc: "Programas de asistencia de facturas en territorios de servicio de Appalachian Power." },
  },
},

// EDUCATION (30)
{
  category: "Education",
  link: "https://www.ed.gov/about/offices/list/ocr/index.html",
  i18n: {
    en: { title: "Office for Civil Rights Education Resources", desc: "Federal office enforcing civil rights protections in education settings." },
    fr: { title: "Ressources éducation Office for Civil Rights", desc: "Bureau fédéral appliquant les protections des droits civils dans l'éducation." },
    es: { title: "Recursos Educativos Office for Civil Rights", desc: "Oficina federal que hace cumplir protecciones de derechos civiles en la educación." },
  },
},
{
  category: "Education",
  link: "https://www.ed.gov/idea",
  i18n: {
    en: { title: "Individuals with Disabilities Education Act (IDEA)", desc: "Federal law guaranteeing free appropriate public education for children with disabilities." },
    fr: { title: "Individuals with Disabilities Education Act (IDEA)", desc: "Loi fédérale garantissant une éducation publique gratuite et appropriée pour enfants handicapés." },
    es: { title: "Ley de Educación para Individuos con Discapacidades (IDEA)", desc: "Ley federal que garantiza educación pública gratuita y apropiada para niños con discapacidades." },
  },
},
{
  category: "Education",
  link: "https://www.ed.gov/504",
  i18n: {
    en: { title: "Section 504 of the Rehabilitation Act", desc: "Federal law prohibiting discrimination against students with disabilities in schools." },
    fr: { title: "Section 504 de la Loi sur la réadaptation", desc: "Loi fédérale interdisant la discrimination contre les élèves handicapés dans les écoles." },
    es: { title: "Sección 504 de la Ley de Rehabilitación", desc: "Ley federal que prohíbe la discriminación contra estudiantes con discapacidades en las escuelas." },
  },
},
{
  category: "Education",
  link: "https://www.understood.org/en/articles/504-plan-what-it-is-and-how-it-works",
  i18n: {
    en: { title: "504 Plan Guide", desc: "Guide explaining how 504 plans work to support students with disabilities." },
    fr: { title: "Guide plan 504", desc: "Guide expliquant le fonctionnement des plans 504 pour soutenir les élèves handicapés." },
    es: { title: "Guía del Plan 504", desc: "Guía que explica cómo funcionan los planes 504 para apoyar a estudiantes con discapacidades." },
  },
},
{
  category: "Education",
  link: "https://www.understood.org/en/articles/iep-individualized-education-program-what-it-is-and-how-it-works",
  i18n: {
    en: { title: "IEP Guide", desc: "Guide explaining how Individualized Education Programs work for students." },
    fr: { title: "Guide PEI", desc: "Guide expliquant le fonctionnement des programmes d'éducation individualisés." },
    es: { title: "Guía de IEP", desc: "Guía que explica cómo funcionan los Programas de Educación Individualizada." },
  },
},
{
  category: "Education",
  link: "https://www.parentcenterhub.org/iep-overview/",
  i18n: {
    en: { title: "IEP Overview for Parents", desc: "Parent-focused guide to understanding and advocating for an IEP." },
    fr: { title: "Aperçu PEI pour parents", desc: "Guide axé sur les parents pour comprendre et défendre un PEI." },
    es: { title: "Resumen de IEP para Padres", desc: "Guía enfocada en padres para entender y defender un IEP." },
  },
},
{
  category: "Education",
  link: "https://www.smartkidswithld.org",
  i18n: {
    en: { title: "Smart Kids with Learning Disabilities", desc: "Resources supporting parents of children with learning disabilities." },
    fr: { title: "Smart Kids with Learning Disabilities", desc: "Ressources soutenant les parents d'enfants ayant des troubles d'apprentissage." },
    es: { title: "Smart Kids with Learning Disabilities", desc: "Recursos que apoyan a padres de niños con discapacidades de aprendizaje." },
  },
},
{
  category: "Education",
  link: "https://www.ldaamerica.org",
  i18n: {
    en: { title: "Learning Disabilities Association of America", desc: "Resources, advocacy, and support for people with learning disabilities." },
    fr: { title: "Learning Disabilities Association of America", desc: "Ressources, plaidoyer et soutien pour personnes ayant des troubles d'apprentissage." },
    es: { title: "Learning Disabilities Association of America", desc: "Recursos, defensa y apoyo para personas con discapacidades de aprendizaje." },
  },
},
{
  category: "Education",
  link: "https://www.chadd.org",
  i18n: {
    en: { title: "CHADD (ADHD Support)", desc: "Support and resources for children and adults with ADHD and their families." },
    fr: { title: "CHADD (soutien TDAH)", desc: "Soutien et ressources pour enfants et adultes atteints de TDAH et leurs familles." },
    es: { title: "CHADD (Apoyo TDAH)", desc: "Apoyo y recursos para niños y adultos con TDAH y sus familias." },
  },
},
{
  category: "Education",
  link: "https://www.autismspeaks.org/tool-kit/school-resources",
  i18n: {
    en: { title: "Autism Speaks School Resources", desc: "Resources helping families navigate school services for autistic children." },
    fr: { title: "Ressources scolaires Autism Speaks", desc: "Ressources aidant les familles à naviguer les services scolaires pour enfants autistes." },
    es: { title: "Recursos Escolares Autism Speaks", desc: "Recursos que ayudan a familias a navegar servicios escolares para niños autistas." },
  },
},
{
  category: "Education",
  link: "https://www.autismsociety.org",
  i18n: {
    en: { title: "Autism Society", desc: "Support, education, and advocacy resources for autistic individuals and families." },
    fr: { title: "Autism Society", desc: "Ressources de soutien, d'éducation et de plaidoyer pour personnes autistes et familles." },
    es: { title: "Autism Society", desc: "Recursos de apoyo, educación y defensa para personas autistas y familias." },
  },
},
{
  category: "Education",
  link: "https://www.asha.org",
  i18n: {
    en: { title: "American Speech-Language-Hearing Association", desc: "Resources on speech, language, and hearing services for children." },
    fr: { title: "American Speech-Language-Hearing Association", desc: "Ressources sur les services d'orthophonie et d'audiologie pour enfants." },
    es: { title: "American Speech-Language-Hearing Association", desc: "Recursos sobre servicios de habla, lenguaje y audición para niños." },
  },
},
{
  category: "Education",
  link: "https://www.aota.org",
  i18n: {
    en: { title: "American Occupational Therapy Association", desc: "Resources on occupational therapy services supporting student success." },
    fr: { title: "American Occupational Therapy Association", desc: "Ressources sur les services d'ergothérapie soutenant la réussite des élèves." },
    es: { title: "American Occupational Therapy Association", desc: "Recursos sobre servicios de terapia ocupacional que apoyan el éxito estudiantil." },
  },
},
{
  category: "Education",
  link: "https://www.apta.org",
  i18n: {
    en: { title: "American Physical Therapy Association", desc: "Resources on physical therapy services supporting students with disabilities." },
    fr: { title: "American Physical Therapy Association", desc: "Ressources sur les services de physiothérapie soutenant les élèves handicapés." },
    es: { title: "American Physical Therapy Association", desc: "Recursos sobre servicios de fisioterapia que apoyan a estudiantes con discapacidades." },
  },
},
{
  category: "Education",
  link: "https://www.council-for-learning-disabilities.org",
  i18n: {
    en: { title: "Council for Learning Disabilities", desc: "Professional resources and research on effective learning disability instruction." },
    fr: { title: "Council for Learning Disabilities", desc: "Ressources professionnelles et recherche sur l'enseignement efficace des troubles d'apprentissage." },
    es: { title: "Council for Learning Disabilities", desc: "Recursos profesionales e investigación sobre enseñanza efectiva de discapacidades de aprendizaje." },
  },
},
{
  category: "Education",
  link: "https://www.dyslexiaida.org",
  i18n: {
    en: { title: "International Dyslexia Association", desc: "Resources and support for individuals with dyslexia and their families." },
    fr: { title: "International Dyslexia Association", desc: "Ressources et soutien pour personnes atteintes de dyslexie et leurs familles." },
    es: { title: "International Dyslexia Association", desc: "Recursos y apoyo para personas con dislexia y sus familias." },
  },
},
{
  category: "Education",
  link: "https://www.readingrockets.org/topics/dyslexia",
  i18n: {
    en: { title: "Reading Rockets Dyslexia Resources", desc: "Free educational resources helping parents support children with dyslexia." },
    fr: { title: "Ressources dyslexie Reading Rockets", desc: "Ressources éducatives gratuites aidant les parents à soutenir les enfants dyslexiques." },
    es: { title: "Recursos de Dislexia Reading Rockets", desc: "Recursos educativos gratuitos que ayudan a padres a apoyar a niños con dislexia." },
  },
},
{
  category: "Education",
  link: "https://www.understood.org/en/articles/dyscalculia-what-you-need-to-know",
  i18n: {
    en: { title: "Understood Dyscalculia Guide", desc: "Resources helping parents understand and support children with dyscalculia." },
    fr: { title: "Guide dyscalculie Understood", desc: "Ressources aidant les parents à comprendre et soutenir les enfants dyscalculiques." },
    es: { title: "Guía de Discalculia Understood", desc: "Recursos que ayudan a padres a entender y apoyar a niños con discalculia." },
  },
},
{
  category: "Education",
  link: "https://www.giftedhomeschoolers.org",
  i18n: {
    en: { title: "Gifted Homeschoolers Forum", desc: "Resources and community for families homeschooling gifted children." },
    fr: { title: "Gifted Homeschoolers Forum", desc: "Ressources et communauté pour familles pratiquant l'école à domicile pour enfants doués." },
    es: { title: "Gifted Homeschoolers Forum", desc: "Recursos y comunidad para familias que educan en casa a niños superdotados." },
  },
},
{
  category: "Education",
  link: "https://www.sengifted.org",
  i18n: {
    en: { title: "Supporting Emotional Needs of the Gifted", desc: "Resources addressing the social and emotional needs of gifted children." },
    fr: { title: "Supporting Emotional Needs of the Gifted", desc: "Ressources traitant les besoins socio-émotionnels des enfants doués." },
    es: { title: "Supporting Emotional Needs of the Gifted", desc: "Recursos que abordan las necesidades socioemocionales de niños superdotados." },
  },
},
{
  category: "Education",
  link: "https://www.hoagiesgifted.org",
  i18n: {
    en: { title: "Hoagies' Gifted Education Page", desc: "Comprehensive resource directory for parents of gifted children." },
    fr: { title: "Hoagies' Gifted Education Page", desc: "Répertoire complet de ressources pour parents d'enfants doués." },
    es: { title: "Hoagies' Gifted Education Page", desc: "Directorio completo de recursos para padres de niños superdotados." },
  },
},
{
  category: "Education",
  link: "https://www.nationaldeafcenter.org",
  i18n: {
    en: { title: "National Deaf Center on Postsecondary Outcomes", desc: "Resources supporting deaf and hard of hearing students in higher education." },
    fr: { title: "National Deaf Center on Postsecondary Outcomes", desc: "Ressources soutenant les élèves sourds et malentendants dans l'enseignement supérieur." },
    es: { title: "National Deaf Center on Postsecondary Outcomes", desc: "Recursos que apoyan a estudiantes sordos y con problemas de audición en educación superior." },
  },
},
{
  category: "Education",
  link: "https://www.gallaudet.edu",
  i18n: {
    en: { title: "Gallaudet University", desc: "Federally chartered university specifically serving deaf and hard of hearing students." },
    fr: { title: "Gallaudet University", desc: "Université à charte fédérale desservant spécifiquement les étudiants sourds et malentendants." },
    es: { title: "Gallaudet University", desc: "Universidad con carta federal que sirve específicamente a estudiantes sordos y con problemas de audición." },
  },
},
{
  category: "Education",
  link: "https://www.rit.edu/ntid",
  i18n: {
    en: { title: "National Technical Institute for the Deaf", desc: "College program specifically supporting deaf and hard of hearing students in technical fields." },
    fr: { title: "National Technical Institute for the Deaf", desc: "Programme collégial soutenant spécifiquement les étudiants sourds dans les domaines techniques." },
    es: { title: "National Technical Institute for the Deaf", desc: "Programa universitario que apoya específicamente a estudiantes sordos en campos técnicos." },
  },
},
{
  category: "Education",
  link: "https://www.perkins.org",
  i18n: {
    en: { title: "Perkins School for the Blind", desc: "Education and resources for students who are blind or visually impaired." },
    fr: { title: "Perkins School for the Blind", desc: "Éducation et ressources pour élèves aveugles ou malvoyants." },
    es: { title: "Perkins School for the Blind", desc: "Educación y recursos para estudiantes ciegos o con discapacidad visual." },
  },
},
{
  category: "Education",
  link: "https://www.aph.org",
  i18n: {
    en: { title: "American Printing House for the Blind", desc: "Educational materials and resources for blind and visually impaired students." },
    fr: { title: "American Printing House for the Blind", desc: "Matériel éducatif et ressources pour élèves aveugles et malvoyants." },
    es: { title: "American Printing House for the Blind", desc: "Materiales educativos y recursos para estudiantes ciegos y con discapacidad visual." },
  },
},
{
  category: "Education",
  link: "https://www.brailleinstitute.org",
  i18n: {
    en: { title: "Braille Institute", desc: "Free education and rehabilitation programs for people who are blind or visually impaired." },
    fr: { title: "Braille Institute", desc: "Programmes gratuits d'éducation et de réadaptation pour personnes aveugles ou malvoyantes." },
    es: { title: "Braille Institute", desc: "Programas gratuitos de educación y rehabilitación para personas ciegas o con discapacidad visual." },
  },
},
{
  category: "Education",
  link: "https://www.wonderbaby.org",
  i18n: {
    en: { title: "WonderBaby", desc: "Resources for parents of babies and young children with visual impairments." },
    fr: { title: "WonderBaby", desc: "Ressources pour parents de bébés et jeunes enfants ayant des déficiences visuelles." },
    es: { title: "WonderBaby", desc: "Recursos para padres de bebés y niños pequeños con discapacidades visuales." },
  },
},
{
  category: "Education",
  link: "https://www.familyconnect.org",
  i18n: {
    en: { title: "FamilyConnect", desc: "Support network for families of children who are blind or visually impaired." },
    fr: { title: "FamilyConnect", desc: "Réseau de soutien pour familles d'enfants aveugles ou malvoyants." },
    es: { title: "FamilyConnect", desc: "Red de apoyo para familias de niños ciegos o con discapacidad visual." },
  },
},

// INCOME (20)
{
  category: "Income",
  link: "https://www.va.gov/careers-employment/",
  i18n: {
    en: { title: "VA Careers and Employment Overview", desc: "Federal overview of career and employment resources for veterans." },
    fr: { title: "Aperçu carrières et emploi VA", desc: "Aperçu fédéral des ressources de carrière et d'emploi pour vétérans." },
    es: { title: "Resumen de Carreras y Empleo VA", desc: "Resumen federal de recursos de carrera y empleo para veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.va.gov/careers-employment/vocational-rehabilitation/",
  i18n: {
    en: { title: "VA Vocational Rehabilitation Program", desc: "Federal program helping disabled veterans prepare for, find, and keep suitable jobs." },
    fr: { title: "Programme réadaptation professionnelle VA", desc: "Programme fédéral aidant les vétérans handicapés à trouver et conserver un emploi." },
    es: { title: "Programa de Rehabilitación Vocacional VA", desc: "Programa federal que ayuda a veteranos discapacitados a encontrar y mantener empleo adecuado." },
  },
},
{
  category: "Income",
  link: "https://www.va.gov/careers-employment/veteran-entrepreneur-portal/",
  i18n: {
    en: { title: "VA Veteran Entrepreneur Portal", desc: "Federal resources supporting veteran-owned small business development." },
    fr: { title: "Portail entrepreneur vétéran VA", desc: "Ressources fédérales soutenant le développement de petites entreprises appartenant à des vétérans." },
    es: { title: "Portal de Emprendedores Veteranos VA", desc: "Recursos federales que apoyan el desarrollo de pequeñas empresas propiedad de veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.sba.gov/business-guide/grow-your-business/veteran-owned-businesses",
  i18n: {
    en: { title: "SBA Veteran-Owned Business Resources", desc: "Federal small business resources specifically for veteran entrepreneurs." },
    fr: { title: "Ressources entreprises vétérans SBA", desc: "Ressources fédérales de petites entreprises spécifiquement pour entrepreneurs vétérans." },
    es: { title: "Recursos de Negocios de Veteranos SBA", desc: "Recursos federales de pequeñas empresas específicamente para emprendedores veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.sba.gov/local-assistance/find/?type=Veterans%20Business%20Outreach%20Center",
  i18n: {
    en: { title: "SBA Veterans Business Outreach Centers", desc: "Federal directory of centers offering free business counseling to veterans." },
    fr: { title: "Centres sensibilisation entreprises vétérans SBA", desc: "Répertoire fédéral de centres offrant du conseil d'affaires gratuit aux vétérans." },
    es: { title: "Centros de Alcance de Negocios para Veteranos SBA", desc: "Directorio federal de centros que ofrecen consejería de negocios gratuita a veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.streetshares.com",
  i18n: {
    en: { title: "StreetShares", desc: "Small business lending platform focused on serving veteran entrepreneurs." },
    fr: { title: "StreetShares", desc: "Plateforme de prêt aux petites entreprises axée sur les entrepreneurs vétérans." },
    es: { title: "StreetShares", desc: "Plataforma de préstamos para pequeñas empresas enfocada en emprendedores veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.veteransbusinessfund.org",
  i18n: {
    en: { title: "Veterans Business Fund", desc: "Micro-lending program specifically supporting veteran-owned small businesses." },
    fr: { title: "Veterans Business Fund", desc: "Programme de micro-prêt soutenant spécifiquement les petites entreprises de vétérans." },
    es: { title: "Veterans Business Fund", desc: "Programa de micropréstamos que apoya específicamente pequeñas empresas de veteranos." },
  },
},
{
  category: "Income",
  link: "https://www.vetbiz.va.gov",
  i18n: {
    en: { title: "VA Vetbiz Verification Program", desc: "Federal verification program for veteran-owned businesses seeking government contracts." },
    fr: { title: "Programme vérification Vetbiz VA", desc: "Programme fédéral de vérification pour entreprises de vétérans cherchant des contrats gouvernementaux." },
    es: { title: "Programa de Verificación Vetbiz VA", desc: "Programa federal de verificación para empresas de veteranos que buscan contratos gubernamentales." },
  },
},
{
  category: "Income",
  link: "https://www.sba.gov/funding-programs/loans/covid-19-relief-options",
  i18n: {
    en: { title: "SBA Business Relief Loan Options", desc: "Federal small business loan and relief program information." },
    fr: { title: "Options prêts secours entreprises SBA", desc: "Informations sur les programmes fédéraux de prêts et secours aux petites entreprises." },
    es: { title: "Opciones de Préstamos de Alivio Empresarial SBA", desc: "Información de programas federales de préstamos y alivio para pequeñas empresas." },
  },
},
{
  category: "Income",
  link: "https://www.sba.gov/funding-programs/loans/microloans",
  i18n: {
    en: { title: "SBA Microloan Program", desc: "Federal small-dollar loan program supporting new and growing small businesses." },
    fr: { title: "Programme microprêts SBA", desc: "Programme fédéral de prêts de petits montants soutenant les nouvelles petites entreprises." },
    es: { title: "Programa de Microcréditos SBA", desc: "Programa federal de préstamos de pequeñas cantidades que apoya negocios nuevos y en crecimiento." },
  },
},
{
  category: "Income",
  link: "https://www.sba.gov/local-assistance/find/?type=Women%27s%20Business%20Center",
  i18n: {
    en: { title: "SBA Women's Business Centers", desc: "Federal directory of centers offering free business counseling to women entrepreneurs." },
    fr: { title: "Centres d'affaires femmes SBA", desc: "Répertoire fédéral de centres offrant du conseil d'affaires gratuit aux femmes entrepreneures." },
    es: { title: "Centros de Negocios para Mujeres SBA", desc: "Directorio federal de centros que ofrecen consejería de negocios gratuita a mujeres emprendedoras." },
  },
},
{
  category: "Income",
  link: "https://www.sba.gov/local-assistance/find/?type=SCORE%20Chapter",
  i18n: {
    en: { title: "SCORE Free Business Mentoring", desc: "Federal-supported free mentoring program for small business owners." },
    fr: { title: "Mentorat gratuit entreprises SCORE", desc: "Programme de mentorat gratuit soutenu par le gouvernement fédéral pour propriétaires de petites entreprises." },
    es: { title: "Mentoría Empresarial Gratuita SCORE", desc: "Programa de mentoría gratuita apoyado federalmente para propietarios de pequeñas empresas." },
  },
},
{
  category: "Income",
  link: "https://www.minorityBusiness.gov",
  i18n: {
    en: { title: "Minority Business Development Agency", desc: "Federal agency supporting minority-owned business growth and access to capital." },
    fr: { title: "Minority Business Development Agency", desc: "Agence fédérale soutenant la croissance des entreprises minoritaires et l'accès au capital." },
    es: { title: "Agencia de Desarrollo de Negocios Minoritarios", desc: "Agencia federal que apoya el crecimiento de negocios minoritarios y acceso a capital." },
  },
},
{
  category: "Income",
  link: "https://www.nmsdc.org",
  i18n: {
    en: { title: "National Minority Supplier Development Council", desc: "Resources connecting minority-owned businesses with corporate opportunities." },
    fr: { title: "National Minority Supplier Development Council", desc: "Ressources reliant les entreprises minoritaires aux opportunités d'entreprise." },
    es: { title: "National Minority Supplier Development Council", desc: "Recursos que conectan a negocios minoritarios con oportunidades corporativas." },
  },
},
{
  category: "Income",
  link: "https://www.uschamber.com/co/start/strategy/minority-business-grants",
  i18n: {
    en: { title: "US Chamber Minority Business Grants Guide", desc: "Independent guide to finding grants specifically for minority-owned businesses." },
    fr: { title: "Guide subventions entreprises minoritaires US Chamber", desc: "Guide indépendant pour trouver des subventions spécifiquement pour entreprises minoritaires." },
    es: { title: "Guía de Subvenciones para Negocios Minoritarios US Chamber", desc: "Guía independiente para encontrar subvenciones específicamente para negocios minoritarios." },
  },
},
{
  category: "Income",
  link: "https://www.ifundwomen.com",
  i18n: {
    en: { title: "IFundWomen", desc: "Crowdfunding and grant platform specifically supporting women-owned businesses." },
    fr: { title: "IFundWomen", desc: "Plateforme de sociofinancement et subventions soutenant spécifiquement les entreprises de femmes." },
    es: { title: "IFundWomen", desc: "Plataforma de financiamiento colectivo y subvenciones que apoya específicamente negocios de mujeres." },
  },
},
{
  category: "Income",
  link: "https://www.hellosigma.co",
  i18n: {
    en: { title: "Hello Alice Small Business Grants", desc: "Grant matching platform connecting small business owners to funding opportunities." },
    fr: { title: "Subventions petites entreprises Hello Alice", desc: "Plateforme de correspondance de subventions reliant propriétaires de petites entreprises." },
    es: { title: "Subvenciones de Pequeñas Empresas Hello Alice", desc: "Plataforma de coincidencia de subvenciones que conecta a propietarios de pequeñas empresas." },
  },
},
{
  category: "Income",
  link: "https://www.grants.gov",
  i18n: {
    en: { title: "Grants.gov", desc: "Official federal portal to search and apply for government grants." },
    fr: { title: "Grants.gov", desc: "Portail fédéral officiel pour rechercher et demander des subventions gouvernementales." },
    es: { title: "Grants.gov", desc: "Portal federal oficial para buscar y solicitar subvenciones gubernamentales." },
  },
},
{
  category: "Income",
  link: "https://www.usa.gov/small-business-grants",
  i18n: {
    en: { title: "USA.gov Small Business Grants Guide", desc: "Government guide to finding small business grants and funding opportunities." },
    fr: { title: "Guide subventions petites entreprises USA.gov", desc: "Guide gouvernemental pour trouver des subventions et financements pour petites entreprises." },
    es: { title: "Guía de Subvenciones para Pequeñas Empresas USA.gov", desc: "Guía del gobierno para encontrar subvenciones y financiamiento para pequeñas empresas." },
  },
},
{
  category: "Income",
  link: "https://www.sba.gov/local-assistance",
  i18n: {
    en: { title: "SBA Local Assistance Directory", desc: "Federal directory to find local SBA resource partners near you." },
    fr: { title: "Répertoire assistance locale SBA", desc: "Répertoire fédéral pour trouver des partenaires de ressources SBA locaux." },
    es: { title: "Directorio de Asistencia Local SBA", desc: "Directorio federal para encontrar socios de recursos SBA locales." },
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
