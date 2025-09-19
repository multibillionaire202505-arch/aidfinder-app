// File: pages/404.js
import Link from "next/link";
import { motion } from "framer-motion";

export default function Custom404() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "72vh",
        textAlign: "center",
        padding: "32px 16px",
        background: "var(--bg)",
        color: "var(--fg)",
      }}
    >
      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
        style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}
      >
        <img
          src="/icons/icon-192.png"
          alt="AidFinder logo"
          style={{ height: 48, width: 48, borderRadius: 10 }}
        />
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>AidFinder</h1>
      </motion.div>

      {/* Big 404 */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, delay: 0.05 } }}
        style={{ fontSize: 56, margin: "8px 0 6px", color: "#16a34a", lineHeight: 1 }}
      >
        404
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.12 } }}
        style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}
      >
        Oops! Page not found
      </motion.p>

      {/* Body */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.18 } }}
        style={{ color: "var(--muted)", maxWidth: 520, margin: "0 0 24px" }}
      >
        The page you’re looking for doesn’t exist or may have been moved.
        Don’t worry — let’s get you back on track!
      </motion.p>

      {/* Back button */}
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.25 } }}>
        <Link href="/" className="af-btn">
          ← Back to Home
        </Link>
      </motion.div>

      {/* Tiny local styles for the button */}
      <style jsx>{`
        .af-btn {
          display: inline-block;
          padding: 12px 22px;
          background: #16a34a;
          color: #fff;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          box-shadow: 0 6px 18px rgba(22, 163, 74, 0.25);
          transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
        }
        .af-btn:hover { transform: translateY(-1px); filter: brightness(0.98); }
        .af-btn:active { transform: translateY(0); box-shadow: 0 4px 12px rgba(22, 163, 74, 0.22); }
      `}</style>
    </main>
  );
}
