// File: pages/404.js
import Link from "next/link";

export default function Custom404() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
        textAlign: "center",
        padding: "20px",
        background: "var(--bg)",
        color: "var(--fg)",
      }}
    >
      {/* Logo & Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <img
          src="/logo.png"
          alt="AidFinder logo"
          style={{ height: 48, borderRadius: 10 }}
        />
        <h1 style={{ fontSize: "28px", fontWeight: 800, margin: 0 }}>AidFinder</h1>
      </div>

      {/* Error Title */}
      <h1 style={{ fontSize: "56px", marginBottom: "12px", color: "#16a34a" }}>404</h1>
      <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
        Oops! Page not found
      </h2>

      {/* Message */}
      <p style={{ color: "var(--muted)", maxWidth: "480px", marginBottom: "28px" }}>
        The page you’re looking for doesn’t exist or may have been moved.
        Don’t worry — let’s get you back on track!
      </p>

      {/* Back Button */}
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "12px 22px",
          background: "#16a34a",
          color: "#fff",
          borderRadius: "10px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        ← Back to Home
      </Link>
    </main>
  );
}
