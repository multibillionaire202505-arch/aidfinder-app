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
  },
  es: {
    brand: "AidFinder",
    title: "Encuentre Ayuda Fácilmente",
    subtitle:
      "Explore programas de Alimentos, Salud, Vivienda, Servicios, Educación e Ingresos — todo en un solo lugar.",
    searchPlaceholder: "Buscar p. ej. vivienda, alimentos, salud…",
    searchBtn: "Buscar",
    clearBtn: "Borrar",
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
  link: "https://www2.ed.gov/about/offices/list/ovae/pi/AdultEd/index.html",
  i18n: {
    en: { title: "Adult Education and Literacy", desc: "Federal resources for adult education, literacy, and basic skills." },
    fr: { title: "Éducation adultes et alphabétisation", desc: "Ressources fédérales pour éducation adulte et compétences de base." },
    es: { title: "Educación de Adultos y Alfabetización", desc: "Recursos federales para educación adulta y habilidades básicas." },
  },
},
{
  category: "Education",
  link: "https://www.careeronestop.org/FindTraining/find-training.aspx",
  i18n: {
    en: { title: "CareerOneStop Training Finder", desc: "Search training programs, certifications, and local education options." },
    fr: { title: "Recherche formation CareerOneStop", desc: "Trouvez formations, certifications et options locales." },
    es: { title: "Buscador de Capacitación CareerOneStop", desc: "Busque capacitaciones, certificaciones y opciones locales." },
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
  link: "https://studentaid.gov/manage-loans/repayment/plans/income-driven",
  i18n: {
    en: { title: "Income-Driven Repayment Plans", desc: "Student loan repayment plans based on income and family size." },
    fr: { title: "Remboursement selon revenu", desc: "Plans prêts étudiants selon revenu et famille." },
    es: { title: "Planes de Pago Según Ingresos", desc: "Pagos de préstamos estudiantiles según ingresos." },
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
  link: "https://www.score.org",
  i18n: {
    en: { title: "SCORE Small Business Mentoring", desc: "Free mentoring and business guidance." },
    fr: { title: "Mentorat SCORE", desc: "Mentorat gratuit pour entrepreneurs." },
    es: { title: "Mentoría SCORE", desc: "Mentoría gratuita para emprendedores." },
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
        <section className="hero">
          <h1>{T.title}</h1>
          <p>{T.subtitle}</p>
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
                  style={{ background: ICONS_BADGE_BG[p.category] || "var(--border)" }}
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
