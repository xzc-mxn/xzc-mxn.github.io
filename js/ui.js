/* ═══════════════════════════════════════════════
   LUXURY HUB EVO — UI Utilities
   ═══════════════════════════════════════════════ */

// ── Toast ─────────────────────────────────────
const Toast = (() => {
  let timer = null;

  const show = (icon, title, msg) => {
    clearTimeout(timer);
    const el   = document.getElementById('lxToast');
    const ico  = document.getElementById('toastIcon');
    const head = document.getElementById('toastHead');
    const body = document.getElementById('toastMsg');
    if (!el) return;

    ico.textContent  = icon;
    head.textContent = title;
    body.textContent = msg;
    el.classList.add('show');

    timer = setTimeout(() => el.classList.remove('show'), 3800);
  };

  return { show };
})();

// ── Modal ─────────────────────────────────────
const Modal = (() => {
  const open = (id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = (id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
    document.body.style.overflow = '';
  };

  const closeAll = () => {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  };

  // Close on backdrop click
  document.addEventListener('click', e => {
    if (e.target.classList.contains('modal-backdrop')) closeAll();
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });

  return { open, close, closeAll };
})();

// ── Nav Active Highlight ───────────────────────
const NavHighlight = (() => {
  const links   = document.querySelectorAll('.nav-links a[data-section]');
  const sections = ['hero', 'features', 'products', 'topup', 'contact'];

  const update = () => {
    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.getBoundingClientRect().top <= 100) current = id;
    });

    links.forEach(a => {
      a.classList.toggle('active', a.dataset.section === current);
    });
  };

  window.addEventListener('scroll', update, { passive: true });
  return { update };
})();

// ── Scroll Reveal ─────────────────────────────
const ScrollReveal = (() => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  const init = () => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  return { init };
})();

// ── Smooth Scroll ─────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── Payment tile selection ─────────────────────
function selectPayTile(el) {
  el.closest('.pay-grid').querySelectorAll('.pay-tile').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// ── Amount tile selection ──────────────────────
function selectAmountTile(el, val) {
  document.querySelectorAll('.amount-tile').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const customWrap = document.getElementById('customAmtWrap');
  if (customWrap) customWrap.style.display = val === 'custom' ? 'block' : 'none';
}
