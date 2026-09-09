/* ============================================================
   TUDO — core app engine (ES module)
   Shared UI: nav, footer, slider, particles, reveal, counters,
   toasts, modals, i18n, storage. Imported by every page.
   ============================================================ */

/* ---------- Icons (inline SVG, single source) ---------- */
const ICON = {
  logo: `<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2FCF9E"/><stop offset="1" stop-color="#D9B56D"/></linearGradient></defs><path d="M6 9h28M20 9v9" stroke="url(#lg)" stroke-width="2.6" stroke-linecap="round"/><path d="M20 32c-6-4-10-8-10-13 0-3.4 2.7-5.6 5.6-5.6 2 0 3.5 1 4.4 2.6.9-1.6 2.4-2.6 4.4-2.6 2.9 0 5.6 2.2 5.6 5.6 0 5-4 9-10 13Z" fill="url(#lg)" opacity="0.92"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21c-5-3.3-8-6.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 3.5C20 14.4 17 17.7 12 21Z"/></svg>`,
  heartOutline: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 20c-4.6-3-7.5-6-7.5-9.6A4 4 0 0 1 12 7.4 4 4 0 0 1 19.5 10.4C19.5 14 16.6 17 12 20Z"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.1 6.4L20 10l-5.9 1.6L12 18l-2.1-6.4L4 10l5.9-1.6L12 2Z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l2.6 5.6L20 9.3l-4 4 1 5.7L12 16.9 7 19l1-5.7-4-4 5.4-.7L12 3Z"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 6.5"/></svg>`,
  verify: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.9 1 2.9-2.5 1.7-.9 2.9-3-.2L12 22l-2.4-1.9-3 .2-.9-2.9L3.2 16l1-2.9-1-2.9L5.7 8.5l.9-2.9 3 .2L12 2Z"/><path d="M8.5 12l2.5 2.5 4.5-5" stroke="#07130F" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowL: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`,
  arrowR: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z" fill="currentColor" opacity=".9"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-4 3v-3H4V5Z"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="4.5" y="10" width="15" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8Z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18-3-4-3-14.5 0-18Z"/></svg>`,
  send: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 11l18-8-8 18-2-7-8-3Z"/></svg>`,
  fb: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h2V5h-2c-1.9 0-3 1.4-3 3.2V10H9v3h2v6h3v-6h2.2l.3-3H14V8.6c0-.4.3-.6.6-.6Z"/></svg>`,
  ig: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.4"/><circle cx="16.5" cy="7.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  tt: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15 3c.4 2.3 1.8 3.7 4 4v3c-1.5 0-2.9-.4-4-1.1V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v3.1a2.5 2.5 0 1 0 1.6 2.3V3H15Z"/></svg>`,
  yt: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 8.5c-.2-1.3-.9-2-2.2-2.2C16.7 6 12 6 12 6s-4.7 0-6.8.3C3.9 6.5 3.2 7.2 3 8.5 2.7 10 2.7 12 2.7 12s0 2 .3 3.5c.2 1.3.9 2 2.2 2.2C7.3 18 12 18 12 18s4.7 0 6.8-.3c1.3-.2 2-.9 2.2-2.2.3-1.5.3-3.5.3-3.5s0-2-.3-3.5ZM10 15V9l5 3-5 3Z"/></svg>`,
  boost: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c3.5 2 5 5 5 8 0 1.6-.6 3-1.6 4H8.6C7.6 14 7 12.6 7 11c0-3 1.5-6 5-8Z"/><circle cx="12" cy="10" r="1.6" fill="currentColor" stroke="none"/><path d="M8 20c0-1.5.8-2.5 2-3M16 20c0-1.5-.8-2.5-2-3"/></svg>`,
};
function icon(name, cls = '') { return `<span class="ico ${cls}" style="display:inline-flex">${ICON[name] || ''}</span>`; }

/* ---------- Brand logo (custom lockup) ---------- */
const LOGO_SRC = 'assets/images/tudo_logo.svg';
const LOGO_ALT = 'TUDO — Bangladeshi Dating Site';
function mountLogos() {
  document.querySelectorAll('.logo').forEach(a => {
    a.innerHTML = `<img class="logo__img" src="${LOGO_SRC}" alt="${LOGO_ALT}">`;
  });
  const lm = document.querySelector('.loader .logo__mark, .loader .loader__mark');
  if (lm) lm.outerHTML = `<img src="${LOGO_SRC}" alt="TUDO" style="height:64px;width:auto;margin:auto">`;
}

/* ---------- Currency / pricing (BDT · USD · GBP · EUR) ---------- */
function currencyList() {
  const ov = store.get('pricing', {});
  const out = {};
  for (const k of CURRENCY_ORDER) out[k] = { ...CURRENCIES[k], ...(ov[k] || {}) };
  return out;
}
function activeCurrency() {
  const c = store.get('currency', null);
  return (c && CURRENCIES[c]) ? c : store.get('defaultCurrency', 'BDT');
}
function setActiveCurrency(c) { store.set('currency', c); window.dispatchEvent(new CustomEvent('tudo:currency', { detail: c })); }
function money(cur, amt) {
  if (!amt) return cur.symbol + '0';
  const n = cur.decimals ? (+amt).toFixed(cur.decimals) : Math.round(amt).toLocaleString();
  return cur.symbol + n;
}
function currencySwitcher() {
  const cur = activeCurrency(), list = currencyList();
  return `<div class="cur-switch" role="group" aria-label="Currency">` +
    CURRENCY_ORDER.map(k => `<button class="cur-btn ${k === cur ? 'active' : ''}" data-cur="${k}" title="${list[k].who}">${list[k].flag} ${list[k].symbol} ${k}</button>`).join('') +
    `</div>`;
}
/* Render the switcher into hostId and call onChange() whenever it changes */
function mountCurrency(hostId, onChange) {
  const host = document.getElementById(hostId); if (!host) return;
  const paint = () => { host.innerHTML = currencySwitcher(); };
  paint();
  host.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cur]'); if (!b) return;
    setActiveCurrency(b.dataset.cur); paint(); onChange && onChange();
  });
}

/* ---------- Storage ---------- */
const NS = 'tudo:';
const store = {
  get(k, d = null) { try { const v = localStorage.getItem(NS + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(NS + k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(NS + k); } catch {} },
};

/* ---------- Toast ---------- */
let toastWrap;
function toast(msg, iconName = 'check') {
  if (!toastWrap) { toastWrap = document.createElement('div'); toastWrap.className = 'toast-wrap'; document.body.appendChild(toastWrap); }
  const t = document.createElement('div'); t.className = 'toast';
  t.innerHTML = `${ICON[iconName] || ICON.check}<span>${msg}</span>`;
  toastWrap.appendChild(t);
  setTimeout(() => { t.classList.add('leaving'); setTimeout(() => t.remove(), 320); }, 3200);
}

/* ---------- Modal ---------- */
function modal(html, opts = {}) {
  const root = document.createElement('div'); root.className = 'modal-root';
  root.innerHTML = `<div class="modal-backdrop" data-close></div>
    <div class="modal glass ${opts.wide ? 'modal--wide' : ''}" role="dialog" aria-modal="true">
      <button class="modal__close" data-close aria-label="Close">${ICON.x}</button>
      <div class="modal__content" style="padding: clamp(24px,3vw,40px)">${html}</div>
    </div>`;
  document.body.appendChild(root);
  requestAnimationFrame(() => root.classList.add('open'));
  const close = () => { root.classList.remove('open'); setTimeout(() => root.remove(), 300); document.removeEventListener('keydown', onKey); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  root.addEventListener('click', (e) => { if (e.target.hasAttribute('data-close')) close(); });
  document.addEventListener('keydown', onKey);
  const focusable = root.querySelector('input, button, a, select, textarea'); focusable && focusable.focus();
  return { root, close };
}

/* ---------- i18n ---------- */
function getLang() { return store.get('lang', 'en'); }
function setLang(lang) {
  store.set('lang', lang);
  applyLang(lang);
  document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
}
function applyLang(lang) {
  const dict = I18N[lang] || I18N.en;
  document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  window.dispatchEvent(new CustomEvent('tudo:lang', { detail: { lang, dict } }));
}

/* ---------- Shared nav ---------- */
const NAV_LINKS = [
  { href: 'discover.html', key: 'nav.discover', label: 'Discover' },
  { href: 'matches.html', key: 'nav.matches', label: 'Matches' },
  { href: 'success-stories.html', key: 'nav.stories', label: 'Success Stories' },
  { href: 'safety.html', key: 'nav.safety', label: 'Safety' },
  { href: 'premium.html', key: 'nav.premium', label: 'Premium' },
  { href: 'about.html', key: 'nav.about', label: 'About' },
];

function renderNav(current = '') {
  const host = document.querySelector('[data-nav]'); if (!host) return;
  const links = NAV_LINKS.map(l => `<a class="nav__link" href="${l.href}" data-i18n="${l.key}" ${current === l.href ? 'aria-current="page"' : ''}>${l.label}</a>`).join('');
  host.innerHTML = `
  <nav class="nav" id="nav" aria-label="Primary">
    <div class="nav__inner">
      <a class="logo" href="index.html" aria-label="TUDO home"><span class="logo__mark">${ICON.logo}</span>TU<b>DO</b></a>
      <div class="nav__links">${links}</div>
      <div class="nav__right">
        <div class="lang" role="group" aria-label="Language">
          <button data-lang="en">EN</button><button data-lang="bn" class="bn">বাংলা</button>
        </div>
        <a class="nav__link desktop-only" href="login.html" data-i18n="nav.login">Log In</a>
        <a class="btn btn--primary btn--sm" href="register.html" data-i18n="nav.join">Join TUDO</a>
        <button class="hamb" id="hamb" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </nav>
  <div class="drawer" id="drawer">
    ${NAV_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
    <a href="login.html">Log In</a>
    <div class="drawer__cta">
      <a class="btn btn--primary btn--block" href="register.html">Join TUDO</a>
    </div>
    <div class="lang" style="margin-top:1.4rem;width:max-content" role="group" aria-label="Language">
      <button data-lang="en">EN</button><button data-lang="bn" class="bn">বাংলা</button>
    </div>
  </div>`;

  // scroll state
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // hamburger
  const hamb = document.getElementById('hamb'), drawer = document.getElementById('drawer');
  hamb.addEventListener('click', () => {
    const open = drawer.classList.toggle('open'); hamb.classList.toggle('open', open);
    hamb.setAttribute('aria-expanded', open); document.body.style.overflow = open ? 'hidden' : '';
  });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    drawer.classList.remove('open'); hamb.classList.remove('open'); document.body.style.overflow = '';
  }));

  // language buttons
  document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  const lang = getLang();
  document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  applyLang(lang);
}

/* ---------- Shared footer ---------- */
function renderFooter() {
  const host = document.querySelector('[data-footer]'); if (!host) return;
  const col = (title, items) => `<div><h4>${title}</h4>${items.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</div>`;
  host.innerHTML = `
  <footer class="footer">
    <div class="jamdani-layer"></div>
    <div class="wrap" style="position:relative;z-index:1">
      <div class="footer__grid">
        <div class="footer__brand">
          <a class="logo" href="index.html"><span class="logo__mark">${ICON.logo}</span>TU<b>DO</b></a>
          <p class="muted" style="margin-top:1rem;max-width:34ch" data-i18n="foot.tag">Bangladeshi Hearts. Real Connections.</p>
          <p class="serif-accent gold bn" style="margin-top:.4rem">মন থেকে মন — বাংলাদেশ থেকে বিশ্বজুড়ে।</p>
          <p class="text-sm" style="margin-top:1rem"><strong>Tudo Devloy</strong><br><a href="tel:+447944497722" class="gold" style="font-weight:600">📞 Call 07944 497722</a></p>
          <div class="socials" style="margin-top:1.2rem">
            <a href="#" aria-label="Facebook">${ICON.fb}</a>
            <a href="#" aria-label="Instagram">${ICON.ig}</a>
            <a href="#" aria-label="TikTok">${ICON.tt}</a>
            <a href="#" aria-label="YouTube">${ICON.yt}</a>
          </div>
        </div>
        ${col('Discover', [['Browse Profiles', 'discover.html'], ['Success Stories', 'success-stories.html'], ['Premium', 'premium.html'], ['How It Works', 'index.html#how']])}
        ${col('Company', [['About', 'about.html'], ['Contact', 'contact.html'], ['Careers', 'about.html#careers'], ['Press', 'about.html#press']])}
        ${col('Safety', [['Safety Centre', 'safety.html'], ['Community Guidelines', 'community-guidelines.html'], ['Report', 'safety.html#report'], ['Help Centre', 'help.html']])}
        ${col('Legal', [['Privacy Policy', 'privacy.html'], ['Terms', 'terms.html'], ['Cookie Policy', 'privacy.html#cookies']])}
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} TUDO. All rights reserved. <span class="muted">Demo build — profiles &amp; statistics are fictional.</span></span>
        <div class="lang" role="group" aria-label="Language"><button data-lang="en">EN</button><button data-lang="bn" class="bn">বাংলা</button></div>
      </div>
    </div>
  </footer>`;
  host.querySelectorAll('.lang button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === getLang());
    b.addEventListener('click', () => setLang(b.dataset.lang));
  });
}

/* ---------- Mobile bottom nav (app pages) ---------- */
function renderBottomNav(current = '') {
  const host = document.querySelector('[data-bottomnav]'); if (!host) return;
  document.body.classList.add('app');
  const items = [
    ['discover.html', 'compass', 'Discover'],
    ['likes.html', 'heartOutline', 'Likes'],
    ['matches.html', 'spark', 'Matches'],
    ['messages.html', 'chat', 'Messages'],
    ['settings.html', 'user', 'Profile'],
  ];
  host.innerHTML = `<nav class="bottom-nav" aria-label="App"><ul>${items.map(([h, ic, l]) =>
    `<li><a href="${h}" ${current === h ? 'aria-current="page"' : ''}>${ICON[ic]}<span>${l}</span></a></li>`).join('')}</ul></nav>`;
}

/* ---------- Scroll reveal ----------
   Observes existing [data-reveal] AND any injected later (via a
   MutationObserver), so dynamically-rendered sections reveal correctly. */
let _revealIO = null;
function _observeReveal(el) {
  if (el.dataset.revealBound) return; el.dataset.revealBound = '1';
  // already in view on bind? reveal immediately (handles above-the-fold injects)
  const r = el.getBoundingClientRect();
  if (r.top < window.innerHeight && r.bottom > 0) { el.classList.add('in'); return; }
  _revealIO.observe(el);
}
function initReveal() {
  if (!('IntersectionObserver' in window)) { document.querySelectorAll('[data-reveal]').forEach(e => e.classList.add('in')); return; }
  if (!_revealIO) {
    _revealIO = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); _revealIO.unobserve(e.target); } });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    // pick up elements injected after boot
    const mo = new MutationObserver((muts) => {
      for (const m of muts) for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches?.('[data-reveal]')) _observeReveal(node);
        node.querySelectorAll?.('[data-reveal]').forEach(_observeReveal);
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }
  document.querySelectorAll('[data-reveal]').forEach(_observeReveal);
}

/* ---------- Animated counters ---------- */
function initCounters() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;
  const fmt = (n, short) => short ? (n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M' : n.toLocaleString()) : n.toLocaleString();
  const run = (el) => {
    const target = +el.dataset.count, suffix = el.dataset.suffix || '', short = el.dataset.short === 'true';
    const dur = 1600, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased), short) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
}

/* ---------- Hero slider ---------- */
/* Effective hero slides = defaults merged with admin overrides (Admin → Hero Slider) */
function heroSlides() {
  const ov = store.get('cms_hero', []);
  const merged = HERO_SLIDES.map((s, i) => {
    const o = ov[i] || {};
    return {
      img: o.img || s.img,
      eyebrow: (o.eyebrow) ? o.eyebrow : s.eyebrow,
      title: (o.headline) ? [o.headline] : s.title,
      sub: (o.sub) ? o.sub : s.sub,
      ctas: s.ctas,
      visible: o.visible !== false,
    };
  }).filter(s => s.visible);
  return merged.length ? merged : HERO_SLIDES;
}

function initHero() {
  const root = document.querySelector('[data-hero]'); if (!root) return;
  const slidesWrap = root.querySelector('.slides');
  const content = root.querySelector('[data-hero-content]');
  const dur = 6000;
  root.style.setProperty('--slide-dur', dur + 'ms');
  const SLIDES = heroSlides();

  slidesWrap.innerHTML = SLIDES.map((s, i) => `
    <div class="slide ${i === 0 ? 'active' : ''}" data-slide="${i}">
      <div class="slide__bg" style="background-image:url('${s.img}')"></div>
      <div class="slide__overlay"></div>
    </div>`).join('');

  const progressHost = root.querySelector('[data-progress]');
  progressHost.innerHTML = SLIDES.map((_, i) => `<div class="progress__bar ${i === 0 ? 'active' : ''}" data-go="${i}" role="button" tabindex="0" aria-label="Slide ${i + 1}"><span></span></div>`).join('');

  let idx = 0, timer, paused = false;
  const slides = [...slidesWrap.children];
  const bars = [...progressHost.children];

  const renderContent = (i) => {
    const s = SLIDES[i];
    content.innerHTML = `
      <p class="eyebrow hero__eyebrow">${s.eyebrow}</p>
      <h1 class="hero__title">${s.title.map((l, k) => `<span class="line"><span style="animation-delay:${0.15 + k * 0.12}s">${l}</span></span>`).join('')}</h1>
      <p class="hero__sub">${s.sub}</p>
      <div class="hero__cta">${s.ctas.map(c => `<a class="btn btn--${c.kind}${c.kind === 'ghost' ? '' : ' btn--lg'}" href="${c.href}">${c.label}</a>`).join('')}</div>`;
  };
  renderContent(0);

  const go = (i, dir = 1) => {
    slides[idx].classList.remove('active');
    bars[idx].classList.remove('active');
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add('active');
    bars.forEach(b => b.classList.remove('active'));
    bars[idx].classList.add('active');
    renderContent(idx);
    restart();
  };
  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);
  const restart = () => { clearTimeout(timer); if (!paused) timer = setTimeout(next, dur); };

  restart();
  root.querySelector('[data-next]')?.addEventListener('click', next);
  root.querySelector('[data-prev]')?.addEventListener('click', prev);
  bars.forEach(b => {
    b.addEventListener('click', () => go(+b.dataset.go));
    b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(+b.dataset.go); } });
  });

  // pause on hover/focus
  const pause = () => { paused = true; root.classList.add('paused'); clearTimeout(timer); };
  const resume = () => { paused = false; root.classList.remove('paused'); restart(); };
  root.addEventListener('mouseenter', pause); root.addEventListener('mouseleave', resume);
  root.addEventListener('focusin', pause); root.addEventListener('focusout', resume);
  document.addEventListener('visibilitychange', () => document.hidden ? pause() : resume());

  // touch swipe
  let x0 = null;
  root.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; pause(); }, { passive: true });
  root.addEventListener('touchend', (e) => {
    if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)(); else resume();
    x0 = null;
  });

  // keyboard
  root.tabIndex = 0;
  root.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); });
}

/* ---------- Rotating word ---------- */
function initRotator() {
  const el = document.querySelector('[data-rotator]'); if (!el) return;
  let i = 0;
  const swap = () => {
    const out = el.querySelector('.rotator__word.in');
    const word = ROTATOR_WORDS[i % ROTATOR_WORDS.length];
    const span = document.createElement('span');
    span.className = 'rotator__word in'; span.textContent = word;
    el.appendChild(span);
    if (out) { out.classList.remove('in'); out.classList.add('out'); setTimeout(() => out.remove(), 600); }
    i++;
  };
  swap();
  setInterval(swap, 2600);
}

/* ---------- Particle connection field ---------- */
function initParticles() {
  const canvas = document.getElementById('tudo-particles');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let w, h, pts, raf;
  const COUNT = Math.min(64, Math.floor(window.innerWidth / 26));
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.width = canvas.offsetWidth * dpr; h = canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
  };
  const make = () => {
    pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.6 + 0.6,
    }));
  };
  const draw = () => {
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = 'rgba(47,207,158,0.7)'; ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(217,181,109,${0.14 * (1 - d / 130)})`; ctx.lineWidth = 1; ctx.stroke(); }
    }
    raf = requestAnimationFrame(draw);
  };
  resize(); make(); draw();
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { cancelAnimationFrame(raf); resize(); make(); draw(); }, 200); });
}

/* ---------- Parallax background layers ---------- */
function initParallax() {
  const layers = [...document.querySelectorAll('[data-parallax]')];
  if (!layers.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    layers.forEach(l => l.style.transform = 'translateZ(0) scale(1.12)');
    return;
  }
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    layers.forEach(l => {
      const speed = parseFloat(l.dataset.parallax) || 0.28;
      const host = l.parentElement.getBoundingClientRect();
      // distance of the section's centre from the viewport centre
      const centre = host.top + host.height / 2 - vh / 2;
      if (host.bottom < -200 || host.top > vh + 200) return; // skip off-screen
      l.style.transform = `translate3d(0, ${(-centre * speed).toFixed(1)}px, 0) scale(1.2)`;
    });
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

/* ---------- Magnetic hover for CTAs ---------- */
function initMagnetic() {
  if (matchMedia('(hover:none)').matches) return;
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ---------- Cookie consent ---------- */
function initConsent() {
  if (store.get('consent')) return;
  const bar = document.createElement('div');
  bar.className = 'glass';
  bar.setAttribute('role', 'dialog'); bar.setAttribute('aria-label', 'Cookie preferences');
  bar.style.cssText = 'position:fixed;z-index:250;left:50%;transform:translateX(-50%);bottom:18px;width:min(680px,94vw);padding:1.1rem 1.2rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap;box-shadow:var(--shadow-lg)';
  bar.innerHTML = `<p style="margin:0;flex:1;min-width:220px;font-size:.9rem" class="muted">We use essential cookies to keep TUDO secure. With your consent we also use cookies to improve matching &amp; analytics. <a href="privacy.html#cookies" style="color:var(--tudo-gold-soft);text-decoration:underline">Learn more</a>.</p>
    <div class="flex gap-1 wrap-f">
      <button class="btn btn--ghost btn--sm" data-c="essential">Essential Only</button>
      <button class="btn btn--ghost btn--sm" data-c="manage">Manage</button>
      <button class="btn btn--primary btn--sm" data-c="all">Accept All</button>
    </div>`;
  document.body.appendChild(bar);
  bar.addEventListener('click', (e) => {
    const c = e.target.closest('[data-c]'); if (!c) return;
    if (c.dataset.c === 'manage') { toast('Preference centre is a demo placeholder.', 'shield'); return; }
    store.set('consent', c.dataset.c);
    bar.style.transition = 'opacity .3s, transform .3s'; bar.style.opacity = '0'; bar.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => bar.remove(), 300);
    toast(c.dataset.c === 'all' ? 'Thanks — all cookies accepted.' : 'Only essential cookies enabled.', 'check');
  });
}

/* ---------- Quick search (homepage) ---------- */
function initQuickSearch() {
  const form = document.querySelector('[data-quicksearch]'); if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const params = new URLSearchParams(new FormData(form));
    window.location.href = 'discover.html?' + params.toString();
  });
}

/* ---------- Boot ---------- */
function boot(current = '') {
  renderNav(current);
  renderFooter();
  mountLogos();
  initReveal();
  initCounters();
  initHero();
  initRotator();
  initParticles();
  initMagnetic();
  initParallax();
  initQuickSearch();
  initConsent();

  // loader fade — content is ready now, don't wait for every image to download
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.querySelectorAll('.logo__mark:empty').forEach(m => m.innerHTML = ICON.logo);
    const hide = () => loader.classList.add('hidden');
    // reveal as soon as the first paint after boot completes, with a short, graceful minimum
    requestAnimationFrame(() => setTimeout(hide, 500));
    setTimeout(hide, 1400); // hard cap
  }
}

