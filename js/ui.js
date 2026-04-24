/* ═══════════════════════════════════════════════
   LUXURY HUB EVO — UI Utilities v4.0
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
  const sections = ['hero', 'features', 'products', 'topup', 'reviews', 'contact'];

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
  }, { threshold: 0.08 });

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

// ── Nav Scroll Effect ──────────────────────────
(() => {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ── Back to Top ────────────────────────────────
(() => {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
})();

// ── Mobile Menu ────────────────────────────────
function openMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileOverlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Loading Screen ─────────────────────────────
function hideLoadingScreen() {
  const loader = document.getElementById('loadingScreen');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 1900);
    setTimeout(() => { loader.style.display = 'none'; }, 2500);
  }
}

// ── Particle System ────────────────────────────
const ParticleSystem = (() => {
  let canvas, ctx, particles = [], animId;

  const init = () => {
    canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    createParticles();
    animate();
  };

  const resize = () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const createParticles = () => {
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 25), 50);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.05,
        pulse: Math.random() * Math.PI * 2
      });
    }
  };

  const animate = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += 0.01;
      const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 160, 85, ${alpha})`;
      ctx.fill();
    });
    animId = requestAnimationFrame(animate);
  };

  return { init };
})();
