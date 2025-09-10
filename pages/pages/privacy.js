import Head from "next/head";

export default function Privacy() {
  const today = new Date().toISOString().slice(0,10); // YYYY-MM-DD
  return (
    <>
      <Head>
        <title>Privacy Policy — AidFinder</title>
        <meta name="description" content="AidFinder Privacy Policy" />
      </Head>

      <main className="container" style={{padding:"32px 0"}}>
        <h1 style={{marginTop:0}}>Privacy Policy</h1>
        <p style={{color:"var(--muted)"}}>Last updated: {today}</p>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>Overview</h3>
          <p>
            AidFinder helps people discover official public aid programs. Browsing is available without
            creating an account. We collect minimal information to operate, improve, and secure the service.
          </p>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>Information We Collect</h3>
          <ul>
            <li>Basic usage data (pages viewed, language, approximate region)</li>
            <li>Device/browser info for performance and compatibility</li>
            <li>Details you choose to send us (e.g., email to support)</li>
          </ul>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>How We Use Information</h3>
          <ul>
            <li>Operate, maintain, and improve AidFinder</li>
            <li>Respond to support requests</li>
            <li>Detect, prevent, and address abuse or technical issues</li>
          </ul>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>Cookies & Local Storage</h3>
          <p>
            We use local storage for preferences (language, theme, saved items on this device).
            You can clear data anytime in your browser settings.
          </p>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>Third-Party Links</h3>
          <p>
            AidFinder links to official government and nonprofit sites. Their policies apply when you visit them.
          </p>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>Your Choices</h3>
          <ul>
            <li>Clear local storage in your browser</li>
            <li>Contact us to delete information you sent to us directly</li>
          </ul>
        </section>

        <section className="card" style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>Contact</h3>
          <p>
            Email: <a href="mailto:support@aidfinder.app">support@aidfinder.app</a>
          </p>
        </section>
      </main>
    </>
  );
}