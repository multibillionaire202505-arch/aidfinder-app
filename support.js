// pages/index.js
import { useMemo, useState, useEffect } from "react";
import Head from "next/head";

/** ===== Robust logo (fallback to /icons/icon-192.png) ===== */
const BrandLogo = ({ size = 40 }) => (
  <img
    src="/logo.png"
    alt="AidFinder logo"
    width={size}
    height={size}
    style={{ width: size, height: size, borderRadius: 8, objectFit: "contain" }}
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/icons/icon-192.png";
    }}
  />
);

/** ===== Heart icon ===== */
const HeartIcon = ({ on = false, size = 20, animate = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={animate ? "pulse" : ""}
    style={{ display: "block" }}
  >
    <path
      d="M12.001 20.727s-7.2-4.315-10.285-8.32C-0.03 9.74 1.1 6.2 4.14 5.146c1.92-.68 4.02-.12 5.36 1.327l.5.537.5-.537c1.34-1.447 3.44-2.007 5.36-1.327 3.04 1.054 4.17 4.594 2.424 7.261-3.085 4.005-10.283 8.32-10.283 8.32z"
      fill={on ? "#e11d48" : "none"}
      stroke="#e11d48"
      strokeWidth="1.8"
    />
  </svg>
);

export default function Home() {
  const [query, setQuery] = useState("");
  const [reveal, setReveal] = useState(false);
  useEffect(() => { setReveal(true); }, []);

  return (
    <>
      <Head>
        <title>AidFinder — Find Aid Programs Easily</title>
        <meta
          name="description"
          content="Explore programs across Food, Health, Housing, Utilities, Education, and Income — all in one place."
        />
      </Head>

      {/* Header with slim nav */}
      <header className="nav">
        <div className="container headerRow">
          <div className="brandRow">
            <BrandLogo size={40} />
            <strong>AidFinder</strong>
          </div>
        </div>
        <nav className="miniNav">
          <div className="container miniNavRow">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/support">Support</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>
          </div>
        </nav>
      </header>

      <main className="container">
        {/* Hero */}
        <section className="hero">
          <h1>Find Aid Programs Easily</h1>
          <p>
            Explore programs across Food, Health, Housing, Utilities, Education, and Income — all in one place.
          </p>
        </section>

        {/* Search bar with green icons */}
        <section className="toolbar">
          <form
            className="searchInlineForm"
            onSubmit={(e)=>e.preventDefault()}
            role="search"
            aria-label="Search aid programs"
          >
            <div className="searchInline">
              <input
                className="searchInlineInput"
                placeholder="Search e.g. housing, food, health…"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                aria-label="Search input"
              />
              <div className="searchInlineActions">
                {query.trim().length > 0 && (
                  <button type="submit" className="searchInlineBtn iconOnly" aria-label="Search">
                    🔎
                  </button>
                )}
                {query && (
                  <button
                    type="button"
                    className="searchInlineBtn iconOnly"
                    onClick={()=>setQuery("")}
                    aria-label="Clear"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </form>
        </section>

        {/* Demo programs grid */}
        <section className={`grid ${reveal ? "reveal" : ""}`}>
          <article className="card" style={{ "--i": 0 }}>
            <h3>SNAP (Food Stamps)</h3>
            <p>Helps low-income individuals and families buy food each month.</p>
            <a href="https://www.fns.usda.gov/snap" target="_blank" rel="noreferrer">Apply Now</a>
          </article>
          <article className="card" style={{ "--i": 1 }}>
            <h3>Medicaid</h3>
            <p>Health coverage for eligible low-income adults, children, pregnant women, and seniors.</p>
            <a href="https://www.medicaid.gov" target="_blank" rel="noreferrer">Apply Now</a>
          </article>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div style={{display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap"}}>
            <a href="/about">About</a>
            <span>•</span>
            <a href="/support">Support</a>
            <span>•</span>
            <a href="/privacy">Privacy</a>
            <span>•</span>
            <a href="/terms">Terms</a>
            <span>•</span>
            <a href="/contact">Contact</a>
          </div>
          <div style={{marginTop:8}}>Demo preview • © AidFinder</div>
        </footer>
      </main>

      <style jsx global>{`
        .miniNav { border-top:1px solid #e5e7eb; border-bottom:1px solid #e5e7eb; background:#fafafa; }
        .miniNavRow { display:flex; gap:14px; padding:8px 0; flex-wrap:wrap; }
        .miniNav a { color:#374151; text-decoration:none; font-weight:600; }
        .miniNav a:hover { text-decoration:underline; }

        .searchInlineForm { width:100%; margin:20px 0; }
        .searchInline { position:relative; width:100%; }
        .searchInlineInput {
          width:100%; padding:12px 86px 12px 14px;
          border-radius:12px; border:1px solid #d1d5db; outline:none;
          font-size:16px; background:#fff;
        }
        .searchInlineInput:focus {
          border-color:#16a34a; box-shadow:0 0 0 3px rgba(22,163,74,.15);
        }
        .searchInlineActions {
          position:absolute; right:6px; top:50%; transform:translateY(-50%);
          display:flex; gap:6px;
        }
        .searchInlineBtn.iconOnly {
          height:34px; width:34px; border-radius:8px; border:none;
          background:transparent; color:#16a34a; font-size:18px; cursor:pointer;
        }
        .searchInlineBtn.iconOnly:hover { background:rgba(22,163,74,0.08); }

        .grid .card {
          background:#fff; border:1px solid #e5e7eb; border-radius:12px;
          padding:16px; margin:10px 0;
          box-shadow:0 1px 2px rgba(0,0,0,.05);
          opacity:0; transform:translateY(16px);
          transition:opacity .5s ease, transform .5s ease;
        }
        .grid.reveal .card { opacity:1; transform:translateY(0); }
        .card:hover { transform:translateY(-2px); box-shadow:0 6px 18px rgba(0,0,0,.1); }
      `}</style>
    </>
  );
}
