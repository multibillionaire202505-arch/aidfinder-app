// pages/404.js
import Link from "next/link";

export default function Custom404() {
  return (
    <main style={{ maxWidth: 720, margin: "60px auto", textAlign: "center", padding: 16 }}>
      <h1 style={{ fontSize: 48, marginBottom: 12 }}>404</h1>
      <p style={{ fontSize: 18, marginBottom: 24 }}>
        Oops! The page you’re looking for could not be found.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "12px 18px",
          borderRadius: 10,
          background: "var(--primary)",
          color: "var(--primary-contrast)",
          fontWeight: 600,
          textDecoration: "none"
        }}
      >
        ← Back to Home
      </Link>
    </main>
  );
}
