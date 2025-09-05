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
  }
};

/** Category labels */
const CAT_LABEL = {
  en: { All: "All", Food: "Food", Health: "Health", Housing: "Housing", Utilities: "Utilities", Education: "Education", Income: "Income" }
};

/** Full 20 Programs */
const ALL = [
  {title:"SNAP (Food Stamps)", title_es:"SNAP (Cupones de Alimentos)", title_fr:"SNAP (Aide alimentaire)", category:"Food", desc:"Monthly funds to buy groceries for eligible households.", link:"https://www.fns.usda.gov/snap"},
  {title:"WIC (Women, Infants, and Children)", title_es:"WIC (Mujeres, Bebés y Niños)", title_fr:"WIC (Femmes, nourrissons et enfants)", category:"Food", desc:"Nutrition assistance & health referrals for women and young children.", link:"https://www.fns.usda.gov/wic"},
  {title:"National School Lunch Program (NSLP)", title_es:"Programa Nacional de Almuerzos Escolares", title_fr:"Programme national de déjeuner scolaire", category:"Food", desc:"Provides low-cost or free lunches to eligible children in schools.", link:"https://www.fns.usda.gov/nslp"},
  {title:"Medicaid", title_es:"Medicaid", title_fr:"Medicaid", category:"Health", desc:"Free or low-cost health coverage for eligible individuals and families.", link:"https://www.medicaid.gov"},
  {title:"Community Health Centers", title_es:"Centros de Salud Comunitarios", title_fr:"Centres de santé communautaires", category:"Health", desc:"Affordable primary care, dental, and mental health services.", link:"https://findahealthcenter.hrsa.gov/"},
  {title:"LIHEAP", title_es:"LIHEAP", title_fr:"LIHEAP", category:"Utilities", desc:"Help paying heating/cooling bills and some energy-related repairs.", link:"https://www.acf.hhs.gov/ocs/programs/liheap"},
  {title:"Emergency Rental Assistance (ERA)", title_es:"Asistencia de Alquiler de Emergencia (ERA)", title_fr:"Aide d’urgence au loyer (ERA)", category:"Housing", desc:"Helps renters cover housing costs such as rent and utilities during hardship.", link:"https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/emergency-rental-assistance-program"},
  {title:"Federal Pell Grant", title_es:"Beca Federal Pell", title_fr:"Bourse fédérale Pell", category:"Education", desc:"Grants for undergraduates with financial need; no repayment.", link:"https://studentaid.gov/understand-aid/types/grants/pell"},
  {title:"Head Start", title_es:"Head Start", title_fr:"Head Start", category:"Education", desc:"School readiness & family support for infants, toddlers, and preschoolers.", link:"https://www.acf.hhs.gov/ohs"},
  {title:"Supplemental Security Income (SSI)", title_es:"Ingreso de Seguridad Suplementaria (SSI)", title_fr:"Revenu de sécurité supplémentaire (SSI)", category:"Income", desc:"Monthly payments for people with disabilities or very low income aged 65+.", link:"https://www.ssa.gov/ssi/"},
  {title:"Section 8 Housing Choice Voucher Program", title_es:"Programa de Vales de Vivienda Sección 8", title_fr:"Programme de bons de logement Section 8", category:"Housing", desc:"Helps very low-income families, the elderly, and the disabled afford safe housing.", link:"https://www.hud.gov/topics/housing_choice_voucher_program_section8"},
  {title:"Unemployment Insurance (UI)", title_es:"Seguro de Desempleo (UI)", title_fr:"Assurance chômage (UI)", category:"Income", desc:"Provides temporary income support for workers who lose jobs through no fault of their own.", link:"https://www.dol.gov/general/topic/unemployment-insurance"},
  {title:"Children’s Health Insurance Program (CHIP)", title_es:"Programa de Seguro de Salud para Niños (CHIP)", title_fr:"Programme d'assurance santé pour enfants (CHIP)", category:"Health", desc:"Provides low-cost health coverage to children in families who earn too much for Medicaid.", link:"https://www.medicaid.gov/chip/index.html"},
  {title:"Temporary Assistance for Needy Families (TANF)", title_es:"Asistencia Temporal para Familias Necesitadas (TANF)", title_fr:"Aide temporaire pour familles nécessiteuses (TANF)", category:"Income", desc:"Provides cash assistance and support services to low-income families with children.", link:"https://www.acf.hhs.gov/ofa/programs/tanf"},
  {title:"Lifeline Program (Phone/Internet Assistance)", title_es:"Programa Lifeline (Asistencia de Teléfono/Internet)", title_fr:"Programme Lifeline (Aide Téléphone/Internet)", category:"Utilities", desc:"Provides discounted phone or internet services to low-income households.", link:"https://www.lifelinesupport.org/"},
  {title:"Earned Income Tax Credit (EITC)", title_es:"Crédito Tributario por Ingreso del Trabajo (EITC)", title_fr:"Crédit d'impôt sur le revenu du travail (EITC)", category:"Income", desc:"Refundable tax credit for low- to moderate-income working individuals and families.", link:"https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit"},
  {title:"Supplemental Nutrition Program for Seniors (CSFP)", title_es:"Programa Suplementario de Nutrición para Personas Mayores (CSFP)", title_fr:"Programme supplémentaire de nutrition pour personnes âgées (CSFP)", category:"Food", desc:"Provides monthly food packages to low-income seniors.", link:"https://www.fns.usda.gov/csfp"},
  {title:"Free Application for Federal Student Aid (FAFSA)", title_es:"Solicitud Gratuita de Ayuda Federal para Estudiantes (FAFSA)", title_fr:"Demande gratuite d’aide fédérale aux étudiants (FAFSA)", category:"Education", desc:"Central application for federal student financial aid programs, including loans and grants.", link:"https://studentaid.gov/h/apply-for-aid/fafsa"},
  {title:"Low Income Water Assistance Program (LIHWAP)", title_es:"Programa de Asistencia de Agua para Hogares de Bajos Ingresos (LIHWAP)", title_fr:"Programme d’aide à l’eau pour ménages à faible revenu (LIHWAP)", category:"Utilities", desc:"Helps low-income households pay water and wastewater bills.", link:"https://www.acf.hhs.gov/ocs/programs/lihwap"}
];

export default function Home() {
  const [lang, setLang] = useState("en");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const T = UI[lang];
  const programs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL.filter((p) => {
      const catOk = cat === "All" || p.category === cat;
      const qOk = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [query, cat]);

  return (
    <>
      <header className="nav">
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div className="brand" style={{display:'flex',alignItems:'center',gap:10}}>
            <img src="/logo.png" alt="AidFinder logo" style={{height:40}}/>
            <strong>{T.brand}</strong>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>{T.title}</h1>
          <p>{T.subtitle}</p>
        </section>

        <input className="search" placeholder={T.searchPlaceholder} value={query} onChange={(e)=>setQuery(e.target.value)} />

        <section className="grid">
          {programs.map((p,i)=>(
            <article className="card" key={i}>
              <div className="badge">{p.category}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <a className="apply" href={p.link} target="_blank" rel="noreferrer">{T.apply}</a>
            </article>
          ))}
        </section>

        <footer className="footer">{T.footer}</footer>
      </main>
    </>
  );
}
