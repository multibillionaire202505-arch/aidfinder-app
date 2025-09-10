import Head from "next/head";

export default function Terms() {
  const today = new Date().toISOString().slice(0,10);
  return (
    <>
      <Head>
        <title>Terms of Service — AidFinder</title>
        <meta name="description" content="AidFinder Terms of Service" />
      </Head>

      <main className="container" style={{padding:"32px 0"}}>
        <h1 style={{marginTop:0}}>Terms of Service</h1>
        <p style={{color:"var(--muted)"}}>Last updated: {today}</p>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>1) About AidFinder</h3>
          <p>
            AidFinder helps users discover official public aid programs. We provide links to
            government and nonprofit websites. Unless explicitly stated, we are not affiliated
            with those agencies.
          </p>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>2) No Legal or Financial Advice</h3>
          <p>
            AidFinder is for informational purposes only. It does not provide legal, tax, medical,
            or financial advice. For eligibility or application details, please consult the official
            program site or a qualified professional.
          </p>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>3) Accuracy of Information</h3>
          <p>
            We aim to keep information up to date, but programs can change without notice. Always
            confirm the latest details directly with the program before applying.
          </p>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>4) Acceptable Use</h3>
          <ul>
            <li>Do not misuse or disrupt the service</li>
            <li>Do not attempt to reverse engineer the app</li>
            <li>Do not post unlawful, harmful, or misleading content</li>
          </ul>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>5) Intellectual Property</h3>
          <p>
            AidFinder’s name, logo, and original content are our property. Third-party trademarks
            and program logos belong to their respective owners.
          </p>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>6) Limitation of Liability</h3>
          <p>
            AidFinder is provided “as is.” We are not liable for indirect or consequential damages
            arising from your use of the service, to the fullest extent permitted by law.
          </p>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>7) Changes to Terms</h3>
          <p>
            We may update these Terms. Continued use of AidFinder after updates constitutes
            acceptance of the new Terms.
          </p>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>8) Contact</h3>
          <p>
            Email: <a href="mailto:support@aidfinder.app">support@aidfinder.app</a>
          </p>
        </section>
      </main>
    </>
  );
}