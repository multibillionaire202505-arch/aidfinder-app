// pages/download.js
import Head from "next/head";

export default function DownloadLanding() {
  const SITE_URL = "https://aidfinder-app-uqzw.vercel.app";
  const APP_STORE_URL = "https://apps.apple.com/app/idXXXXXXXXX"; // TODO: replace
  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.aidfinder"; // TODO: replace

  return (
    <main style={{ maxWidth: 720, margin: "48px auto", padding: 16, textAlign: "center" }}>
      <Head>
        <title>Get AidFinder</title>
        <meta
          name="description"
          content="Download AidFinder for iOS or Android — or use the web app."
        />
        <link rel="canonical" href={`${SITE_URL}/download`} />
        <meta property="og:title" content="Get AidFinder" />
        <meta
          property="og:description"
          content="Download AidFinder for iOS or Android — or use the web app."
        />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="noindex,follow" />
      </Head>

      {/* Logo */}
      <img
        src="/logo.png"
        alt="AidFinder logo"
        width={72}
        height={72}
        style={{ marginBottom: 12 }}
      />
      <h1 style={{ margin: "6px 0 10px", fontSize: 28 }}>Get AidFinder</h1>
      <p style={{ margin: "0 0 20px", color: "#4b5563" }}>
        Find the help you need — Food, Health, Housing, Education, Income.
      </p>

      {/* Store badges */}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <a href={APP_STORE_URL} aria-label="Download on the App Store">
          <img src="/appstore-badge.svg" alt="Download on the App Store" height={60} />
        </a>
        <a href={PLAY_STORE_URL} aria-label="Get it on Google Play">
          <img src="/googleplay-badge.png" alt="Get it on Google Play" height={60} />
        </a>
        <a href="/" aria-label="Use web app" style={webBtnStyle}>
          Use Web App
        </a>
      </div>

      <p style={{ marginTop: 18, fontSize: 13, color: "#6b7280" }}>
        On mobile? You’ll be redirected to your app store automatically.
      </p>
    </main>
  );
}

const webBtnStyle = {
  display: "inline-block",
  background: "#0ea5e9",
  color: "#fff",
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: 10,
  fontWeight: 700,
  minWidth: 160,
  textAlign: "center",
  boxShadow: "0 6px 16px rgba(0,0,0,.12)",
};

// Server-side redirect for mobile devices
export async function getServerSideProps({ req }) {
  const APP_STORE_URL = "https://apple.com"; // TEMP placeholder
  const PLAY_STORE_URL = "https://play.google.com"; // TEMP placeholder

  const ua = String(req.headers["user-agent"] || "").toLowerCase();
  const isAndroid = ua.includes("android");
  const isIOS = /iphone|ipad|ipod/.test(ua);

  if (isIOS) {
    return { redirect: { destination: APP_STORE_URL, permanent: false } };
  }
  if (isAndroid) {
    return { redirect: { destination: PLAY_STORE_URL, permanent: false } };
  }
  return { props: {} };
}
