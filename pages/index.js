// pages/index.js
import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";

/** ===== Robust logo (fallback to /icons/icon-192.png) ===== */
const BrandLogo = ({ size = 40 }) => (
  <img
    src="/logo.png"
    alt="AidFinder logo"
    width={size}
    height={size}
    style={{ width: size, height: size, borderRadius: 10, objectFit: "contain" }}
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/icons/icon-192.png";
    }}
  />
);

/** ===== Heart icon (red fill inside only; pulse optional) ===== */
const HeartIcon = ({ on = false, size = 18, animate = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={animate ? "af-pulse" : ""}
    style={{ display: "block" }}
  >
    <path
      d="M12.001 20.727s-7.2-4.315-10.285-8.32C-0.03 9.74 1.1 6.2 4.14 5.146c1.92-.68 4.02-.12 5.36 1.327l.5.537.5-.537c1.34-1.447 3.44-2.007 5.36-1.327 3.04 1.054 4.17 4.594 2.424 7.261-3.085 4.005-10.283 8.32-10.283 8.32Z"
      fill={on ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

/** ===== Simple icons (inline SVG) ===== */
const IconSearch = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block" }}>
    <path
      d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm0-2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
      fill="currentColor"
    />
    <path d="M16.8 16.8 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconShare = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block" }}>
    <path
      d="M16 8a3 3 0 1 0-2.83-4H13a3 3 0 0 0 3 4ZM6 14a3 3 0 1 0 2.83 4H9a3 3 0 0 0-3-4Zm10 7a3 3 0 1 0-2.83-4H13a3 3 0 0 0 3 4Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.7 15.3 15.3 18.7M15.3 5.3 8.7 8.7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconExternal = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block" }}>
    <path
      d="M14 5h5v5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 14 19 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function safeUrl(u) {
  if (!u) return "";
  try {
    const url = new URL(u);
    return url.toString();
  } catch {
    return "";
  }
}

async function shareProgram({ title, text, url }) {
  const shareData = {
    title: title || "AidFinder",
    text: text || "",
    url: url || (typeof window !== "undefined" ? window.location.href : ""),
  };

  // 1) Web Share API (mobile-friendly)
  try {
    if (navigator?.share) {
      await navigator.share(shareData);
      return { ok: true, method: "native" };
    }
  } catch {
    // user cancelled or error — fall through
  }

  // 2) Clipboard fallback
  try {
    const toCopy = shareData.url || "";
    if (navigator?.clipboard?.writeText && toCopy) {
      await navigator.clipboard.writeText(toCopy);
      return { ok: true, method: "clipboard" };
    }
  } catch {
    // fall through
  }

  // 3) Final fallback: prompt
  try {
    // eslint-disable-next-line no-alert
    window.prompt("Copy this link:", shareData.url || "");
    return { ok: true, method: "prompt" };
  } catch {
    return { ok: false, method: "none" };
  }
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [pulseFavId, setPulseFavId] = useState(null);
  const [toast, setToast] = useState(null);
  const [details, setDetails] = useState(null);

  const toastTimer = useRef(null);

  const programs = useMemo(() => {
    // ✅ 34 programs (broad + useful). Replace URLs later with official links per country/state.
    // Tip: keep "id" stable to avoid UI jumps.
    const base = [
      // Food
      { name: "SNAP (Food Stamps)", category: "Food", summary: "Monthly grocery help for eligible households.", url: "https://www.fns.usda.gov/snap" },
      { name: "WIC", category: "Food", summary: "Nutrition support for pregnant people, infants, and children.", url: "https://www.fns.usda.gov/wic" },
      { name: "National School Lunch Program", category: "Food", summary: "Free/reduced-price school meals for kids.", url: "https://www.fns.usda.gov/nslp" },
      { name: "School Breakfast Program", category: "Food", summary: "School breakfast support for children.", url: "https://www.fns.usda.gov/sbp" },
      { name: "Summer EBT (SUN Bucks)", category: "Food", summary: "Summer grocery benefits for eligible students.", url: "https://www.fns.usda.gov/summer/sunbucks" },
      { name: "Food Pantries (Local Finder)", category: "Food", summary: "Find nearby food pantries and community meals.", url: "" },

      // Health
      { name: "Medicaid", category: "Health", summary: "Low-cost health coverage for eligible people.", url: "https://www.medicaid.gov/" },
      { name: "CHIP (Kids Coverage)", category: "Health", summary: "Health insurance for kids in eligible families.", url: "https://www.insurekidsnow.gov/" },
      { name: "Affordable Care Act Marketplace", category: "Health", summary: "Shop health plans and subsidies.", url: "https://www.healthcare.gov/" },
      { name: "Community Health Centers", category: "Health", summary: "Low-cost clinics and primary care near you.", url: "https://findahealthcenter.hrsa.gov/" },
      { name: "Prescription Assistance (State/Nonprofit)", category: "Health", summary: "Help paying for meds (varies by program).", url: "" },

      // Housing
      { name: "Section 8 (Housing Choice Voucher)", category: "Housing", summary: "Rental assistance for eligible households.", url: "https://www.hud.gov/program_offices/public_indian_housing/programs/hcv" },
      { name: "Public Housing", category: "Housing", summary: "Affordable apartments managed by local PHAs.", url: "https://www.hud.gov/topics/rental_assistance/phprog" },
      { name: "Emergency Rental Assistance", category: "Housing", summary: "Help with rent/utility arrears (availability varies).", url: "https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/emergency-rental-assistance-program" },
      { name: "Homelessness Help (HUD Exchange)", category: "Housing", summary: "Resources and local support systems.", url: "https://www.hudexchange.info/homelessness-assistance/" },
      { name: "Shelter & Crisis Housing (Local)", category: "Housing", summary: "Find emergency shelters and temporary housing.", url: "" },

      // Utilities
      { name: "LIHEAP (Energy/Heating Help)", category: "Utilities", summary: "Help paying energy bills and weatherization.", url: "https://www.acf.hhs.gov/ocs/programs/liheap" },
      { name: "Emergency Utility Bill Help", category: "Utilities", summary: "Local nonprofits or county support for utility shutoffs.", url: "" },
      { name: "Water Bill Assistance (Local)", category: "Utilities", summary: "Support options vary by city/county.", url: "" },

      // Income / Cash
      { name: "TANF (Cash Assistance)", category: "Income", summary: "Temporary cash help for families (state-run).", url: "https://www.acf.hhs.gov/ofa/programs/tanf" },
      { name: "SSI (Supplemental Security Income)", category: "Income", summary: "Support for older adults/disabled with limited income.", url: "https://www.ssa.gov/ssi/" },
      { name: "SSDI (Disability Insurance)", category: "Income", summary: "Benefits for eligible disabled workers.", url: "https://www.ssa.gov/benefits/disability/" },
      { name: "Unemployment Benefits (State)", category: "Income", summary: "Temporary income after job loss (state program).", url: "" },

      // Jobs / Workforce
      { name: "Workforce Centers (American Job Centers)", category: "Jobs", summary: "Job search, training, and career services.", url: "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/american-job-centers.aspx" },
      { name: "Job Training (WIOA)", category: "Jobs", summary: "Training & employment services (eligibility varies).", url: "https://www.dol.gov/agencies/eta/wioa" },

      // Childcare / Family
      { name: "Child Care Assistance (CCDF)", category: "Family", summary: "Help paying for childcare for eligible families.", url: "https://www.acf.hhs.gov/occ/ccdf-fund" },
      { name: "Head Start / Early Head Start", category: "Family", summary: "Early education and family support services.", url: "https://www.acf.hhs.gov/ohs" },
      { name: "Child Support Services (State)", category: "Family", summary: "Help establishing/enforcing child support.", url: "" },

      // Education
      { name: "FAFSA (Federal Student Aid)", category: "Education", summary: "Apply for grants, loans, and work-study.", url: "https://studentaid.gov/h/apply-for-aid/fafsa" },
      { name: "Pell Grant", category: "Education", summary: "Need-based grant for eligible students.", url: "https://studentaid.gov/understand-aid/types/grants/pell" },
      { name: "Free/Low-Cost Internet (ACP Successors/Local)", category: "Education", summary: "Connectivity programs vary — find current options.", url: "" },

      // Legal / Protection
      { name: "Legal Aid (Free/Low-Cost)", category: "Legal", summary: "Find local legal help for housing, family, benefits, etc.", url: "https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help" },
      { name: "Domestic Violence Support (National Hotline)", category: "Legal", summary: "24/7 support and local resources.", url: "https://www.thehotline.org/" },

      // Tax / Credits
      { name: "EITC (Earned Income Tax Credit)", category: "Tax", summary: "Tax credit for eligible workers and families.", url: "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc" },
      { name: "CTC (Child Tax Credit)", category: "Tax", summary: "Tax credit for eligible families with children.", url: "https://www.irs.gov/credits-deductions/individuals/child-tax-credit" },

      // Transport / Other
      { name: "Transportation Help (Local)", category: "Transport", summary: "Bus passes, gas vouchers, or ride support (varies).", url: "" },
    ];

    // Ensure exactly 34 (it is 34 now; if you change, keep it at 34)
    const mapped = base.map((p) => {
      const id = slugify(`${p.category}-${p.name}`);
      return {
        id,
        ...p,
        officialUrl: safeUrl(p.url),
        howToApply:
          p.officialUrl
            ? "Use the official link to review eligibility and apply. If you need help, contact your local agency or community partner."
            : "This program varies by location. Tap “Find local help” to search your area or add an official link when available.",
        keywords: [p.name, p.category, p.summary].join(" ").toLowerCase(),
      };
    });

    return mapped;
  }, []);

  const categories = useMemo(() => {
    const set = new Set(programs.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [programs]);

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programs
      .filter((p) => (activeCategory === "All" ? true : p.category === activeCategory))
      .filter((p) => (!q ? true : p.keywords.includes(q)))
      .sort((a, b) => (a.category + a.name).localeCompare(b.category + b.name));
  }, [programs, query, activeCategory]);

  function showToast(message) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }

  function toggleFav(id) {
    setFavorites((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      return next;
    });
    setPulseFavId(id);
    setTimeout(() => setPulseFavId(null), 450);
  }

  function programLink(program) {
    // Deep link to a specific program on this page
    const base = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
    return `${base}#${program.id}`;
  }

  async function onShare(program) {
    const result = await shareProgram({
      title: `AidFinder — ${program.name}`,
      text: `${program.name}: ${program.summary}`,
      url: programLink(program),
    });
    if (result?.method === "clipboard") showToast("Link copied ✅");
    else if (result?.method === "prompt") showToast("Copy the link ✅");
    else if (result?.method === "native") showToast("Shared ✅");
    else showToast("Couldn’t share. Try again.");
  }

  function openDetails(program) {
    setDetails(program);
    setActiveId(program.id);
    // keep URL hash in sync (optional)
    try {
      if (typeof window !== "undefined") window.history.replaceState(null, "", `#${program.id}`);
    } catch {}
  }

  function closeDetails() {
    setDetails(null);
  }

  // Open details if user lands on a hash
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = decodeURIComponent(window.location.hash || "").replace("#", "").trim();
    if (!hash) return;
    const match = programs.find((p) => p.id === hash);
    if (match) openDetails(match);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programs]);

  // Escape closes modal
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closeDetails();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const donateHref = "https://www.paypal.com/donate"; // ✅ replace with your real PayPal donate link (same style)

  return (
    <>
      <Head>
        <title>AidFinder — Find Help Fast</title>
        <meta name="description" content="AidFinder helps you find official aid programs for food, health, housing, utilities, education, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="af-page">
        {/* ===== Header ===== */}
        <header className="af-header">
          <div className="af-brand">
            <BrandLogo size={44} />
            <div className="af-brandText">
              <div className="af-titleRow">
                <h1 className="af-title">AidFinder</h1>
                <span className="af-badge">34 programs</span>
              </div>
              <p className="af-subtitle">Find official help for food, health, housing, utilities, and more.</p>
            </div>
          </div>

          {/* Donate (top) */}
          <a className="af-donateTop" href={donateHref} target="_blank" rel="noreferrer">
            <span className="af-donateSpark" aria-hidden="true" />
            <span className="af-donateText">Donate</span>
            <span className="af-donateSub">Support AidFinder</span>
          </a>
        </header>

        {/* ===== Search ===== */}
        <section className="af-controls">
          <div className="af-searchWrap">
            <span className="af-searchIcon" aria-hidden="true">
              <IconSearch />
            </span>
            <input
              className="af-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programs (SNAP, housing, Medicaid, LIHEAP...)"
              aria-label="Search programs"
            />
          </div>

          {/* ===== Category pills ===== */}
          <div className="af-pills" role="tablist" aria-label="Categories">
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  className={`af-pill ${active ? "isActive" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                  type="button"
                  role="tab"
                  aria-selected={active}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* ===== Grid ===== */}
        <main className="af-main">
          {filtered.length === 0 ? (
            <div className="af-empty">
              <div className="af-emptyCard">
                <div className="af-emptyTitle">No matches</div>
                <div className="af-emptyText">Try a different keyword (e.g., “rent”, “kids”, “electric”, “tax”).</div>
                <button className="af-btn" type="button" onClick={() => setQuery("")}>
                  Clear search
                </button>
              </div>
            </div>
          ) : (
            <div className="af-grid">
              {filtered.map((p) => {
                const isActive = p.id === activeId;
                const isFav = !!favorites[p.id];
                return (
                  <article
                    id={p.id}
                    key={p.id}
                    className={`af-card ${isActive ? "isActive" : ""}`}
                    onClick={() => openDetails(p)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openDetails(p);
                    }}
                    aria-label={`Open details for ${p.name}`}
                  >
                    <div className="af-cardTop">
                      <div className="af-chip">{p.category}</div>

                      <div className="af-actions" onClick={(e) => e.stopPropagation()}>
                        <button
                          className={`af-iconBtn ${isFav ? "isOn" : ""}`}
                          type="button"
                          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                          onClick={() => toggleFav(p.id)}
                          title={isFav ? "Saved" : "Save"}
                        >
                          <span className="af-heartWrap">
                            <HeartIcon on={isFav} animate={pulseFavId === p.id} />
                          </span>
                        </button>

                        <button
                          className="af-iconBtn"
                          type="button"
                          aria-label={`Share ${p.name}`}
                          onClick={() => onShare(p)}
                          title="Share"
                        >
                          <IconShare />
                        </button>
                      </div>
                    </div>

                    <h2 className="af-cardTitle">{p.name}</h2>
                    <p className="af-cardSummary">{p.summary}</p>

                    <div className="af-cardBottom">
                      <button className="af-miniBtn" type="button" onClick={(e) => (e.stopPropagation(), openDetails(p))}>
                        Details
                      </button>

                      {p.officialUrl ? (
                        <a
                          className="af-miniBtn af-miniLink"
                          href={p.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Open official site for ${p.name}`}
                        >
                          Official site <span className="af-miniIcon" aria-hidden="true"><IconExternal size={16} /></span>
                        </a>
                      ) : (
                        <button
                          className="af-miniBtn"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            showToast("Add an official link for your location ✅");
                          }}
                        >
                          Find local help
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>

        {/* ===== Sticky donate bar (modern + eye-catching) ===== */}
        <div className="af-donateBar" role="region" aria-label="Donate">
          <div className="af-donateBarInner">
            <div className="af-donateBarLeft">
              <div className="af-donateBarTitle">Keep AidFinder free</div>
              <div className="af-donateBarSub">Your support helps us add more verified programs.</div>
            </div>
            <a className="af-donateBtn" href={donateHref} target="_blank" rel="noreferrer">
              <span className="af-donateBtnGlow" aria-hidden="true" />
              Donate
            </a>
          </div>
        </div>

        {/* ===== Toast ===== */}
        {toast ? <div className="af-toast" role="status" aria-live="polite">{toast}</div> : null}

        {/* ===== Details Modal ===== */}
        {details ? (
          <div className="af-modalOverlay" onMouseDown={closeDetails} role="dialog" aria-modal="true" aria-label="Program details">
            <div className="af-modal" onMouseDown={(e) => e.stopPropagation()}>
              <div className="af-modalHeader">
                <div className="af-modalChip">{details.category}</div>
                <div className="af-modalHeaderActions">
                  <button
                    className="af-iconBtn"
                    type="button"
                    aria-label={`Share ${details.name}`}
                    onClick={() => onShare(details)}
                    title="Share"
                  >
                    <IconShare />
                  </button>
                  <button className="af-close" type="button" onClick={closeDetails} aria-label="Close details">
                    ✕
                  </button>
                </div>
              </div>

              <h3 className="af-modalTitle">{details.name}</h3>
              <p className="af-modalSummary">{details.summary}</p>

              <div className="af-modalSection">
                <div className="af-modalLabel">How to apply</div>
                <div className="af-modalText">{details.howToApply}</div>
              </div>

              <div className="af-modalActions">
                {details.officialUrl ? (
                  <a className="af-btn af-btnPrimary" href={details.officialUrl} target="_blank" rel="noreferrer">
                    Open official site <span className="af-miniIcon" aria-hidden="true"><IconExternal size={18} /></span>
                  </a>
                ) : (
                  <button className="af-btn af-btnPrimary" type="button" onClick={() => showToast("Local finder coming soon ✅")}>
                    Find local help
                  </button>
                )}
                <button className="af-btn" type="button" onClick={() => onShare(details)}>
                  Share
                </button>
              </div>

              <div className="af-modalFoot">
                Tip: Always apply through official government or trusted nonprofit websites to avoid scams.
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* ✅ Scoped styles only (no conflicts) */}
      <style jsx>{`
        .af-page {
          min-height: 100vh;
          background: radial-gradient(1200px 800px at 20% 0%, rgba(16, 185, 129, 0.10), transparent 60%),
            radial-gradient(900px 700px at 90% 10%, rgba(59, 130, 246, 0.10), transparent 55%),
            #0b1020;
          color: rgba(255, 255, 255, 0.92);
          padding-bottom: 92px; /* space for sticky donate bar */
        }

        .af-header {
          display: flex;
          gap: 16px;
          align-items: stretch;
          justify-content: space-between;
          padding: 20px 16px 10px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .af-brand {
          display: flex;
          gap: 12px;
          align-items: center;
          min-width: 0;
          flex: 1;
        }

        .af-brandText {
          min-width: 0;
        }

        .af-titleRow {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .af-title {
          margin: 0;
          font-size: 22px;
          letter-spacing: 0.2px;
          line-height: 1.1;
        }

        .af-badge {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .af-subtitle {
          margin: 6px 0 0;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.70);
          max-width: 52ch;
        }

        .af-donateTop {
          position: relative;
          display: grid;
          align-content: center;
          gap: 2px;
          padding: 10px 12px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.22), rgba(59, 130, 246, 0.18));
          border: 1px solid rgba(255, 255, 255, 0.14);
          text-decoration: none;
          color: rgba(255, 255, 255, 0.95);
          min-width: 160px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }
        .af-donateTop:hover {
          transform: translateY(-1px);
          transition: transform 160ms ease;
          border-color: rgba(255, 255, 255, 0.22);
        }
        .af-donateSpark {
          position: absolute;
          inset: -60px;
          background: conic-gradient(from 180deg, rgba(16, 185, 129, 0.0), rgba(16, 185, 129, 0.35), rgba(59, 130, 246, 0.35), rgba(16, 185, 129, 0.0));
          filter: blur(12px);
          animation: afSpin 6s linear infinite;
          opacity: 0.7;
        }
        .af-donateText {
          position: relative;
          font-weight: 800;
          letter-spacing: 0.2px;
        }
        .af-donateSub {
          position: relative;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.78);
        }

        .af-controls {
          max-width: 1100px;
          margin: 0 auto;
          padding: 6px 16px 14px;
          display: grid;
          gap: 12px;
        }

        .af-searchWrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .af-searchIcon {
          position: absolute;
          left: 12px;
          color: rgba(255, 255, 255, 0.70);
          pointer-events: none;
        }

        .af-search {
          width: 100%;
          height: 44px;
          padding: 0 12px 0 42px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.92);
          outline: none;
          transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }
        /* ✅ Green border only on focus */
        .af-search:focus {
          border-color: rgba(16, 185, 129, 0.95);
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.16);
          background: rgba(255, 255, 255, 0.08);
        }
        .af-search::placeholder {
          color: rgba(255, 255, 255, 0.52);
        }

        .af-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .af-pill {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.86);
          padding: 8px 12px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 13px;
        }
        .af-pill:hover {
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.08);
        }
        .af-pill.isActive {
          border-color: rgba(16, 185, 129, 0.95);
          background: rgba(16, 185, 129, 0.14);
          color: rgba(255, 255, 255, 0.98);
        }

        .af-main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 10px 16px 24px;
        }

        .af-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .af-card {
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          padding: 14px;
          cursor: pointer;
          transition: transform 140ms ease, border-color 140ms ease, background 140ms ease, box-shadow 140ms ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
          outline: none;
        }
        .af-card:hover {
          transform: translateY(-1px);
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.075);
        }
        /* ✅ Active program green */
        .af-card.isActive {
          border-color: rgba(16, 185, 129, 0.95);
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.14), 0 16px 40px rgba(0, 0, 0, 0.22);
          background: rgba(16, 185, 129, 0.08);
        }

        .af-cardTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
        }

        .af-chip {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.86);
          white-space: nowrap;
        }

        .af-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .af-iconBtn {
          height: 34px;
          width: 34px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.88);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .af-iconBtn:hover {
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.08);
        }
        .af-iconBtn.isOn {
          border-color: rgba(239, 68, 68, 0.8);
          background: rgba(239, 68, 68, 0.10);
          color: rgba(255, 255, 255, 0.96);
        }

        .af-heartWrap {
          color: rgba(239, 68, 68, 0.92);
          display: inline-flex;
        }

        .af-cardTitle {
          margin: 0;
          font-size: 16px;
          line-height: 1.25;
          letter-spacing: 0.1px;
        }

        .af-cardSummary {
          margin: 8px 0 12px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.4;
          min-height: 38px;
        }

        .af-cardBottom {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .af-miniBtn {
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.88);
          padding: 8px 10px;
          font-size: 13px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .af-miniBtn:hover {
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.08);
        }
        .af-miniLink {
          color: rgba(255, 255, 255, 0.92);
        }
        .af-miniIcon {
          opacity: 0.9;
          display: inline-flex;
        }

        .af-empty {
          display: grid;
          place-items: center;
          padding: 40px 0 10px;
        }
        .af-emptyCard {
          max-width: 420px;
          width: 100%;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          padding: 18px;
          text-align: center;
        }
        .af-emptyTitle {
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .af-emptyText {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.70);
          margin-bottom: 12px;
        }

        .af-btn {
          height: 42px;
          padding: 0 14px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.92);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }
        .af-btn:hover {
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.08);
        }
        .af-btnPrimary {
          border-color: rgba(16, 185, 129, 0.85);
          background: rgba(16, 185, 129, 0.14);
          box-shadow: 0 10px 24px rgba(16, 185, 129, 0.10);
        }

        /* ===== Sticky donate bar ===== */
        .af-donateBar {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 10px 12px;
          background: linear-gradient(180deg, rgba(11, 16, 32, 0), rgba(11, 16, 32, 0.85) 30%, rgba(11, 16, 32, 0.95));
          z-index: 30;
        }
        .af-donateBarInner {
          max-width: 1100px;
          margin: 0 auto;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(59, 130, 246, 0.12));
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.30);
          overflow: hidden;
        }
        .af-donateBarLeft {
          min-width: 0;
        }
        .af-donateBarTitle {
          font-weight: 900;
          letter-spacing: 0.2px;
          font-size: 14px;
        }
        .af-donateBarSub {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.74);
          margin-top: 2px;
        }
        .af-donateBtn {
          position: relative;
          height: 42px;
          padding: 0 16px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.96);
          font-weight: 900;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          white-space: nowrap;
        }
        .af-donateBtnGlow {
          position: absolute;
          inset: -40px;
          background: conic-gradient(from 120deg, rgba(16, 185, 129, 0), rgba(16, 185, 129, 0.35), rgba(59, 130, 246, 0.35), rgba(16, 185, 129, 0));
          filter: blur(14px);
          animation: afSpin 5.5s linear infinite;
          opacity: 0.65;
        }
        .af-donateBtn:hover {
          transform: translateY(-1px);
          transition: transform 160ms ease;
          border-color: rgba(255, 255, 255, 0.24);
        }

        /* ===== Modal ===== */
        .af-modalOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: grid;
          place-items: center;
          padding: 16px;
          z-index: 40;
        }
        .af-modal {
          width: min(720px, 100%);
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(13, 18, 36, 0.96);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
          padding: 14px;
        }
        .af-modalHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .af-modalChip {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.86);
        }
        .af-modalHeaderActions {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .af-close {
          height: 34px;
          width: 34px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.92);
          cursor: pointer;
        }
        .af-close:hover {
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.08);
        }
        .af-modalTitle {
          margin: 12px 0 0;
          font-size: 18px;
          letter-spacing: 0.2px;
        }
        .af-modalSummary {
          margin: 8px 0 12px;
          color: rgba(255, 255, 255, 0.75);
          font-size: 13px;
          line-height: 1.5;
        }
        .af-modalSection {
          border-top: 1px solid rgba(255, 255, 255, 0.10);
          padding-top: 12px;
          margin-top: 10px;
        }
        .af-modalLabel {
          font-size: 12px;
          letter-spacing: 0.2px;
          color: rgba(255, 255, 255, 0.66);
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .af-modalText {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.86);
          line-height: 1.55;
        }
        .af-modalActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 14px;
        }
        .af-modalFoot {
          margin-top: 12px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.62);
        }

        /* ===== Toast ===== */
        .af-toast {
          position: fixed;
          left: 50%;
          bottom: 92px;
          transform: translateX(-50%);
          background: rgba(17, 24, 39, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.92);
          padding: 10px 12px;
          border-radius: 14px;
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
          z-index: 50;
          font-size: 13px;
          max-width: calc(100vw - 24px);
          text-align: center;
        }

        /* ===== Animations ===== */
        @keyframes afSpin {
          to {
            transform: rotate(360deg);
          }
        }
        :global(.af-pulse) {
          animation: afPulse 420ms ease-out;
        }
        @keyframes afPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        /* ===== Responsive ===== */
        @media (max-width: 980px) {
          .af-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .af-header {
            flex-direction: column;
            align-items: stretch;
          }
          .af-donateTop {
            width: 100%;
          }
          .af-grid {
            grid-template-columns: 1fr;
          }
          .af-cardSummary {
            min-height: unset;
          }
          .af-toast {
            bottom: 98px;
          }
        }
      `}</style>
    </>
  );
}
