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
      "Explore programs across Food, Health, Housing, Utilities, Education, and Income — all in one place.",
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
