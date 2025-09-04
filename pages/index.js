export default function Home(){
  const ALL_PROGRAMS = [
  { 
    title:'SNAP (Food Stamps)', 
    category:'Food', 
    desc:'Monthly funds to buy groceries for eligible households.', 
    link:'https://www.fns.usda.gov/snap' 
  },

  { 
    title:'Medicaid', 
    category:'Health', 
    desc:'Free or low-cost health coverage for eligible individuals and families.', 
    link:'https://www.medicaid.gov' 
  },

  { 
    title:'WIC (Women, Infants, and Children)', 
    category:'Food', 
    desc:'Nutrition assistance and health referrals for women and young children.', 
    link:'https://www.fns.usda.gov/wic' 
  },

  { 
    title:'LIHEAP', 
    category:'Utilities', 
    desc:'Help paying heating/cooling bills and some energy-related repairs.', 
    link:'https://www.acf.hhs.gov/ocs/programs/liheap' 
  },

  { 
    title:'Federal Pell Grant', 
    category:'Education', 
    desc:'Grants for undergraduates with financial need; does not require repayment.', 
    link:'https://studentaid.gov/understand-aid/types/grants/pell' 
  },

  { 
    title: "Supplemental Security Income (SSI)", 
    category: "Income", 
    desc: "Provides monthly payments to people with disabilities or low income who are aged 65 and older.", 
    link: "https://www.ssa.gov/ssi/" 
  },

  { 
    title: "Head Start", 
    category: "Education", 
    desc: "School readiness and family support program for infants, toddlers, and preschoolers from low-income families.", 
    link: "https://www.acf.hhs.gov/ohs" 
  },

  { 
    title: "National School Lunch Program (NSLP)", 
    category: "Food", 
    desc: "Provides low-cost or free lunches to eligible children in schools.", 
    link: "https://www.fns.usda.gov/nslp" 
  },

  { 
    title: "Community Health Centers", 
    category: "Health", 
    desc: "Local clinics that provide affordable primary care, dental, and mental health services, regardless of ability to pay.", 
    link: "https://findahealthcenter.hrsa.gov/" 
  },

  { 
    title: "Emergency Rental Assistance (ERA)", 
    category: "Housing", 
    desc: "Helps renters cover housing costs such as rent and utilities during financial hardship.", 
    link: "https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/emergency-rental-assistance-program" 
  }
];

  return (<>
    <header className="nav">
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div className="brand">
          <img src="/logo.png" alt="AidFinder logo"/>
          <strong style={{fontSize:20}}>AidFinder</strong>
        </div>
      </div>
    </header>

    <main className="container">
      <section className="hero">
        <h1>Find Aid Programs Easily</h1>
        <p>Explore programs across Food, Health, Housing, Utilities and Education — all in one place.</p>
      </section>

      <section className="grid">
        {programs.map((p,i)=>(
          <article className="card" key={i}>
            <div className="badge">{p.category}</div>
            <h3 style={{margin:0,fontWeight:800,fontSize:18}}>{p.title}</h3>
            <p style={{color:'#475569'}}>{p.desc}</p>
            <div><a className="apply" href={p.link} target="_blank" rel="noreferrer">Apply Now</a></div>
          </article>
        ))}
      </section>

      <footer className="footer">Demo preview • © AidFinder</footer>
    </main>
  </>)
}
