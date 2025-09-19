import Head from "next/head";

export default function Contact() {
  const subject = encodeURIComponent("AidFinder — Contact");
  return (
    <>
      <Head>
        <title>Contact — AidFinder</title>
        <meta name="description" content="Contact the AidFinder team" />
      </Head>

      <main className="container" style={{padding:"32px 0"}}>
        <h1 style={{marginTop:0}}>Contact</h1>
        <p style={{color:"var(--muted)"}}>
          We’d love to hear from you — feedback, partnership ideas, or program suggestions.
        </p>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>Email</h3>
          <p>
            <a className="apply" href={`mailto:support@aidfinder.app?subject=${subject}`}>
              Email support@aidfinder.app
            </a>
          </p>
          <p style={{color:"var(--muted)"}}>
            Tip: include your state and program name to help us respond faster.
          </p>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>Suggest a Program</h3>
          <p style={{marginBottom:12}}>
            If a program is missing or a link is outdated, send it our way:
          </p>
          <a
            className="secondary"
            href={`mailto:support@aidfinder.app?subject=${encodeURIComponent("Program Suggestion — AidFinder")}`}
          >
            Send a suggestion
          </a>
        </section>
      </main>
    </>
  );
}
