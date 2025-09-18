// File: pages/_app.js
// Global layout for every page: Header + Footer + page transitions.
// One-time install if you haven't:  npm install framer-motion

import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

function Header() {
  const router = useRouter();
  const isActive = (href) => router.pathname === href;

  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="AidFinder Home">
          <span className="logo">🧭</span>
          <span className="brand-text">AidFinder</span>
        </Link>

        <nav className="nav" aria-label="Main">
          <Link href="/about" className={isActive("/about") ? "active" : ""}>About</Link>
          <Link href="/legal/privacy-policy" className={isActive("/legal/privacy-policy") ? "active" : ""}>Privacy</Link>
          <Link href="/legal/terms-of-service" className={isActive("/legal/terms-of-service") ? "active" : ""}>Terms</Link>
          <Link href="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
        </nav>
      </div>

      <style jsx>{`
        .site-header {
          position: sticky; top: 0; z-index: 50;
          background: #ffffffcc; backdrop-filter: blur(8px);
          border-bottom: 1px solid #eee;
        }
        .wrap {
          max-width: 1040px; margin: 0 auto; padding: 12px 16px;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
        }
        .brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: inherit; }
        .logo { font-size: 22px; line-height: 1; }
        .brand-text { font-weight: 800; font-size: 18px; letter-spacing: .2px; }
        .nav { display: inline-flex; gap: 14px; align-items: center; flex-wrap: wrap; }
        .nav :global(a) {
          color: #444; text-decoration: none; padding: 8px 10px; border-radius: 10px;
          transition: background .2s ease, color .2s ease;
        }
        .nav :global(a:hover) { background: #f2f4f7; color: #111; }
        .nav :global(a.active) { background: #eef2ff; color: #1d4ed8; font-weight: 600; }
        @media (max-width:640px){ .wrap{ padding:10px 12px } .nav{ gap:8px } .brand-text{ font-size:16px } }
      `}</style>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <nav className="foot-nav" aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/legal/privacy-policy">Privacy Policy</Link>
          <Link href="/legal/terms-of-service">Terms of Service</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <p className="copy">© {new Date().getFullYear()} AidFinder</p>
      </div>

      <style jsx>{`
        .site-footer { border-top: 1px solid #eee; margin-top: 32px; background: #fff; }
        .wrap { max-width: 1040px; margin: 0 auto; padding: 16px; }
        .foot-nav { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 8px; }
        .foot-nav :global(a) {
          color: #444; text-decoration: none; padding: 6px 8px; border-radius: 8px; transition: background .2s ease;
        }
        .foot-nav :global(a:hover) { background: #f2f4f7; }
        .copy { margin: 0; color: #666; font-size: 14px; }
      `}</style>
    </footer>
  );
}

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="page-wrap">{children}</main>
      <Footer />
      <style jsx global>{`
        html, body, #__next { height: 100%; }
        body {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI,
            Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial,
            "Apple Color Emoji", "Segoe UI Emoji";
          background: #fbfbfd; color: #111827;
        }
        .page-wrap { max-width: 1040px; margin: 24px auto 0; padding: 0 16px; }
      `}</style>
    </>
  );
}

// Page transition animation
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

export default function MyApp({ Component, pageProps, router }) {
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div key={router.route} variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
