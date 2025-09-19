// pages/about.js
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About — AidFinder</title>
        <meta
          name="description"
          content="AidFinder makes U.S. aid programs visible, clear, and accessible — all in one place."
        />
      </Head>

      <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px", lineHeight: 1.6 }}>
        <h1 style={{ marginTop: 0 }}>About AidFinder</h1>
        <p>
          One place to find real help - fast. Food, Health, Housing, Utilities, Education, and
          Income programs, all in a clean, modern experience.
        </p>
        <p>
          People abroad often say the United States lacks social support. In reality, there are
          thousands of federal, state, and local programs. The real problem is finding the right
          information. AidFinder was built to fix that.
        </p>
        <p>
          Questions or feedback? Email{" "}
          <a href="mailto:aidfinder.app@gmail.com">aidfinder.app@gmail.com</a>.
        </p>
      </main>
    </>
  );
}
