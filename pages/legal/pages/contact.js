// pages/contact.js
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — AidFinder</title>
        <meta name="description" content="Contact the AidFinder team." />
      </Head>

      <section style={{ maxWidth: 720, margin: "40px auto", padding: 16, lineHeight: 1.6 }}>
        <h1>Contact Us</h1>
        <p>Have feedback or suggestions? We’d love to hear from you.</p>
        <ul>
          <li>Email: <a href="mailto:support@aidfinder.app">support@aidfinder.app</a></li>
        </ul>
        <p>Note: This is a demo app and not an official government website.</p>
      </section>
    </>
  );
}
