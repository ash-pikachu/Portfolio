/**
 * theme-toggle.js
 * Handles Light / Dark mode switching via class toggling.
 * CSS transitions handle all the smooth animation.
 * The navbar (.site-header) is never modified.
 */

(function () {
  // ── Inject light-mode styles for content elements (not navbar) ──────────────
  const style = document.createElement('style');
  style.id = 'theme-toggle-styles';
  style.textContent = `
    /* ── SMOOTH TRANSITIONS ─────────────────────────────────────────── */
    .about-terminal, .stat-orb, .skill-category, .skill,
    .panel, .project-card, .edu-card, .contact-card,
    .btn, .terminal, main h1, main h2, main h3, main p,
    main li, main span, main a, .section-title h2, .section-title p {
      transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  background 0.7s cubic-bezier(0.23, 1, 0.32, 1),
                  background-color 0.7s cubic-bezier(0.23, 1, 0.32, 1),
                  border-color 0.5s ease,
                  color 0.5s ease,
                  box-shadow 0.5s ease !important;
    }

    /* ── SECTION TITLES ─────────────────────────────────────────────── */
    body.light-mode .section-title h2 {
      color: #0f172a !important;
      text-shadow: none !important;
    }
    body.light-mode .section-title p {
      color: #475569 !important;
    }

    /* ── GENERAL PANELS / CARDS ─────────────────────────────────────── */
    body.light-mode .panel,
    body.light-mode .project-card,
    body.light-mode .edu-item,
    body.light-mode .contact-card {
      background: rgba(255, 255, 255, 0.90) !important;
      border-color: rgba(148, 163, 184, 0.3) !important;
      color: #1e293b !important;
      box-shadow: 0 8px 32px rgba(15, 23, 42, 0.08) !important;
    }

    body.light-mode main h1, body.light-mode main h2,
    body.light-mode main h3 { color: #0f172a !important; }

    body.light-mode main p, body.light-mode main li {
      color: #334155 !important;
    }

    /* ── PROJECT CARD ───────────────────────────────────────────────── */
    body.light-mode .proj-badge {
      color: #0b8a42 !important;
      background: rgba(11, 138, 66, 0.08) !important;
      border-color: rgba(11, 138, 66, 0.25) !important;
    }
    body.light-mode .proj-badge::before {
      background: #0b8a42 !important;
      box-shadow: 0 0 6px #0b8a42 !important;
    }
    body.light-mode .tag {
      color: #1c7ed6 !important;
      background: rgba(28, 126, 214, 0.08) !important;
      border-color: rgba(28, 126, 214, 0.22) !important;
    }

    /* ── EDUCATION SECTION ──────────────────────────────────────────── */
    body.light-mode .edu-item {
      background: rgba(255, 255, 255, 0.90) !important;
      border-color: rgba(148, 163, 184, 0.35) !important;
    }
    body.light-mode .edu-item.edu-btech {
      --edu-color: #1c7ed6 !important;
      --edu-bg: rgba(28, 126, 214, 0.07) !important;
      --edu-border: rgba(28, 126, 214, 0.2) !important;
    }
    body.light-mode .edu-item.edu-12 {
      --edu-color: #ae3ec9 !important;
      --edu-bg: rgba(174, 62, 201, 0.07) !important;
      --edu-border: rgba(174, 62, 201, 0.2) !important;
    }
    body.light-mode .edu-item.edu-10 {
      --edu-color: #0b8a42 !important;
      --edu-bg: rgba(11, 138, 66, 0.07) !important;
      --edu-border: rgba(11, 138, 66, 0.2) !important;
    }
    body.light-mode .edu-item h3 {
      color: #0f172a !important;
    }
    body.light-mode .edu-item p {
      color: #475569 !important;
    }
    body.light-mode .edu-score {
      background: rgba(15, 23, 42, 0.06) !important;
      border-color: rgba(15, 23, 42, 0.12) !important;
      color: #0f172a !important;
    }

    /* ── CONTACT SECTION ────────────────────────────────────────────── */
    body.light-mode .contact-card {
      background: rgba(255, 255, 255, 0.90) !important;
      border-color: rgba(148, 163, 184, 0.3) !important;
    }
    body.light-mode .contact-card.cc-email {
      --cc-color: #e03131 !important;
      --cc-border: rgba(224, 49, 49, 0.25) !important;
    }
    body.light-mode .contact-card.cc-li {
      --cc-color: #1c7ed6 !important;
      --cc-border: rgba(28, 126, 214, 0.25) !important;
    }
    body.light-mode .contact-card.cc-gh {
      --cc-color: #9c36b5 !important;
      --cc-border: rgba(156, 54, 181, 0.25) !important;
    }
    body.light-mode .contact-card .cc-fill {
      background: rgba(255, 255, 255, 0.96) !important;
    }
    body.light-mode .contact-card .cc-label {
      color: #1e293b !important;
    }
    body.light-mode .contact-card .cc-value {
      color: #475569 !important;
    }

    /* ── ABOUT — TERMINAL (always stays dark — intentional contrast) ── */
    body.light-mode .about-terminal {
      background: #090e1a !important;
      border-color: rgba(53, 255, 135, 0.3) !important;
      box-shadow:
        0 0 0 1px rgba(53, 255, 135, 0.12),
        0 24px 64px rgba(0, 0, 0, 0.22) !important;
    }
    body.light-mode .term-bar {
      background: rgba(0,0,0,0.25) !important;
      border-bottom-color: rgba(53,255,135,0.15) !important;
    }

    /* ── ABOUT — STAT ORBS ──────────────────────────────────────────── */
    body.light-mode .stat-orb {
      border-color: rgba(0, 0, 0, 0.06) !important;
    }
    body.light-mode .stat-orb .orb-fill {
      background: rgba(255, 255, 255, 0.97) !important;
    }
    /* Tinted background per orb color */
    body.light-mode .stat-orb.orb-blue  { background: rgba(116,192,252,0.09) !important; }
    body.light-mode .stat-orb.orb-green { background: rgba(53,255,135,0.08)  !important; }
    body.light-mode .stat-orb.orb-purple{ background: rgba(218,119,242,0.09) !important; }

    /* orb-icon label (SGPA / CLASS X / XII) */
    body.light-mode .stat-orb .orb-icon {
      opacity: 1 !important;
      color: var(--orb-color) !important;
      text-shadow: none !important;
      font-weight: 900 !important;
    }
    /* The big number keeps its neon color */
    body.light-mode .stat-orb .orb-value {
      text-shadow: 0 0 14px var(--orb-glow) !important;
    }
    /* Bottom label — dark and legible */
    body.light-mode .stat-orb .orb-label {
      color: #475569 !important;
      opacity: 1 !important;
    }
    body.light-mode .stat-orb:hover {
      box-shadow: 0 0 28px var(--orb-glow), 0 18px 50px rgba(15,23,42,0.12) !important;
      transform: translateY(-4px) scale(1.02) !important;
    }

    /* ── SKILLS — CATEGORY CARDS ────────────────────────────────────── */
    body.light-mode .skill-category {
      background: rgba(255, 255, 255, 0.88) !important;
      border-color: rgba(0, 0, 0, 0.05) !important;
      box-shadow: 0 6px 24px rgba(15, 23, 42, 0.07) !important;
    }
    body.light-mode .skill-category:hover {
      background: rgba(255, 255, 255, 0.97) !important;
      box-shadow:
        0 0 0 1px var(--cat-border),
        0 20px 56px rgba(15, 23, 42, 0.13),
        0 0 36px var(--cat-glow-outer) !important;
    }
    body.light-mode .skill-cat-count {
      color: rgba(15, 23, 42, 0.38) !important;
    }
    body.light-mode .skill-cat-divider {
      opacity: 0.4 !important;
    }

    /* ── SKILLS — PILLS ─────────────────────────────────────────────── */
    body.light-mode .skill {
      background: rgba(255, 255, 255, 0.7) !important;
      border-color: rgba(0, 0, 0, 0.08) !important;
      color: #1e293b !important;
    }
    body.light-mode .skill:hover {
      background: var(--cat-pill-bg) !important;
      border-color: var(--cat-border) !important;
      color: #0f172a !important;
      box-shadow: 0 0 12px var(--cat-glow-outer) !important;
    }

    /* ── BUTTONS ────────────────────────────────────────────────────── */
    body.light-mode .btn:not(.primary) {
      background: rgba(255,255,255,0.95) !important;
      border-color: rgba(148,163,184,0.4) !important;
      color: #0f172a !important;
    }
    body.light-mode .btn.primary {
      background: linear-gradient(135deg,#0284c7,#0d9488) !important;
      color: #fff !important;
      border: none !important;
    }

    /* ── CODE TERMINAL (project section) ────────────────────────────── */
    body.light-mode .terminal {
      background: #0f172a !important;
      color: #38bdf8 !important;
    }

    /* ── CUSTOM CURSOR ──────────────────────────────────────────────── */
    body.light-mode .cursor-dot {
      background-color: #ff3b30 !important;
      box-shadow: 0 0 10px rgba(255, 59, 48, 0.85) !important;
    }

    /* Navbar is intentionally NOT listed here — it stays dark */


  `;
  document.head.appendChild(style);

  // ── Wait for DOM ────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const holoToggle = document.getElementById('holo-toggle');
    if (!holoToggle) return;

    // Always start in DARK mode on every page load
    holoToggle.checked = false;
    document.body.classList.remove('light-mode');

    // Toggle on switch change (session only — reloading always resets to dark)
    holoToggle.addEventListener('change', function () {
      if (this.checked) {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
    });
  });
})();
