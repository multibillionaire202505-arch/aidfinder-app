// pages/about.js
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us — AidFinder</title>
        <meta
          name="description"
          content="AidFinder helps people quickly discover official public aid programs—Food, Health, Housing, Utilities, Education, and Income—in one modern, simple app."
        />
      </Head>

      <main style={{ maxWidth: 720, margin: "40px auto", padding: 16, lineHeight: 1.6 }}>
        <h1 style={{ marginTop: 0 }}>About AidFinder</h1>
        <p>
          One place to find real help—fast. Food, Health, Housing, Utilities, Education, and Income programs, all in
          a clean, modern experience.
        </p>

        <h2 style={{ marginTop: 24 }}>Changing the Perception</h2>
        <p>
          Many people think the U.S. lacks social support. In reality, America is one of the most socially supportive
          countries in the world — but people often don’t know how to access the right programs. 
          <strong> AidFinder was built to fix that</strong> by making programs visible, clear, and easy to reach.
        </p>

        <h2 style={{ marginTop: 24 }}>Our Mission</h2>
        <p>
          We believe access to essential programs should be simple and dignified. AidFinder organizes official federal,
          state, and local resources in one place so families, students, seniors, and veterans can discover and apply in
          minutes — not hours.
        </p>
      </main>
    </>
  );
}
