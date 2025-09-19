// pages/contact.js
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — AidFinder</title>
        <meta
          name="description"
          content="Get in touch with the AidFinder team — feedback, partnerships, or support."
        />
      </Head>

      <main
        className="container"
        style={{ maxWidth: "720px", margin: "40px auto", padding: "0 16px" }}
      >
        <h1 style={{ marginTop: 0, fontSize: "28px" }}>Contact Us</h1>
        <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
          We’d love to hear from you — feedback, partnership ideas, or program
          suggestions. Reach out anytime.
        </p>

        <section className="card" style={{ marginTop: 16, padding: "20px" }}>
          <h3>Email</h3>
          <p>
            <a href="mailto:aidfinder.app@gmail.com" style={{ color: "#2563eb" }}>
              aidfinder.app@gmail.com
            </a>
          </p>
        </section>

        <section className="card" style={{ marginTop: 16, padding: "20px" }}>
          <h3>Support</h3>
          <p>
            For help using AidFinder, visit our{" "}
            <a href="/about" style={{ color: "#2563eb" }}>
              About page
            </a>{" "}
            or email us directly.
          </p>
        </section>
      </main>
    </>
  );
}
