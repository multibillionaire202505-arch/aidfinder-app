// pages/index.js
import { useMemo, useState, useEffect } from "react";
import Head from "next/head";

/** ===== CONFIG (edit) ===== */
const PAYPAL_BUSINESS =
  process.env.NEXT_PUBLIC_PAYPAL_BUSINESS || "YOUR_PAYPAL_EMAIL"; // e.g. mybiz@example.com
/** ========================= */

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
    clear: "Clear",
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
    donateCta: "Support AidFinder",
    donateCopy: "Your donation helps keep this app free for families in need ❤️",
    donateBtn: "Donate with PayPal",
  },
  fr: {
    brand: "AidFinder",
    title: "Trouvez facilement des aides",
    subtitle:
      "Découvrez des programmes d’aide Alimentation, Santé, Logement, Services publics, Éducation et Revenus — au même endroit.",
    searchPlaceholder: "Rechercher ex. logement, alimentation, santé…",
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
    clear: "Effacer",
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
    donateCta: "Soutenir AidFinder",
    donateCopy: "Votre don aide à garder l’app gratuite pour les familles ❤️",
    donateBtn: "Faire un don via PayPal",
  },
  es: {
    brand: "AidFinder",
    title: "Encuentre Ayuda Fácilmente",
    subtitle:
      "Explore programas de Alimentos, Salud, Vivienda, Servicios, Educación e Ingresos — todo en un solo lugar.",
    searchPlaceholder: "Buscar p. ej. vivienda, alimentos, salud…",
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
    clear: "Borrar",
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
    donateCta: "Apoya AidFinder",
    donateCopy: "Tu donación ayuda a mantener la app gratuita para las familias ❤️",
    donateBtn: "Donar con PayPal",
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
  { category:"Housing", link:"https://home.treasury.gov/.../emergency-rental-assistance-program",
    i18n:{ en:{ title:"Emergency Rental Assistance (ERA)", desc:"Help with rent and utilities during hardship." },
           fr:{ title:"Aide d’urgence au loyer (ERA)", desc:"Aide pour le loyer et les services publics en cas de difficultés." },
           es:{ title:"Asistencia de Alquiler de Emergencia (ERA)", desc:"Ayuda con alquiler y servicios." } } },
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
    i18n:{ en:{ title:"T
