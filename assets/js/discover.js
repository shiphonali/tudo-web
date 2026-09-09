/* classic build: scope isolated */
(function(){
/* ============================================================
   TUDO — discover interactions (grid + swipe deck + match)
   ============================================================ */

boot('discover.html');

const params = new URLSearchParams(location.search);
const grid = document.getElementById('discover-grid');
const deck = document.getElementById('discover-deck');
const emptyEl = document.getElementById('discover-empty');

let pool = PROFILES.slice();
if (params.get('country')) pool = pool.filter(p => p.country === params.get('country'));
if (params.get('goal')) pool = pool.filter(p => p.goal === params.get('goal'));
if (params.get('ageFrom')) pool = pool.filter(p => p.age >= +params.get('ageFrom'));
if (params.get('ageTo')) pool = pool.filter(p => p.age <= +params.get('ageTo'));

const filterNote = document.getElementById('filterNote');
if (filterNote && [...params].length) {
  const bits = [];
  if (params.get('country')) bits.push(params.get('country'));
  if (params.get('goal')) bits.push(params.get('goal'));
  if (params.get('ageFrom') || params.get('ageTo')) bits.push(`${params.get('ageFrom') || 18}–${params.get('ageTo') || 70}`);
  filterNote.textContent = bits.length ? `Showing: ${bits.join(' · ')}` : '';
}

/* Grid render with pagination */
const PAGE_SIZE = 12;
let page = 1;
let pageWrap = null;
if (grid) {
  pageWrap = document.createElement('nav');
  pageWrap.id = 'discover-pagination';
  pageWrap.className = 'pagination';
  pageWrap.setAttribute('aria-label', 'Discover pages');
  grid.after(pageWrap);
  pageWrap.addEventListener('click', (e) => {
    const b = e.target.closest('[data-page]'); if (!b || b.disabled) return;
    page = +b.dataset.page; renderGrid();
    const y = grid.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
}
const totalPages = () => Math.max(1, Math.ceil(pool.length / PAGE_SIZE));

function renderPagination(tp) {
  if (!pageWrap) return;
  if (pool.length <= PAGE_SIZE) { pageWrap.innerHTML = ''; return; }
  const btn = (label, p, cls = '', dis = false) => `<button class="page-btn ${cls}" ${dis ? 'disabled' : ''} data-page="${p}" ${cls === 'active' ? 'aria-current="page"' : ''}>${label}</button>`;
  const show = [];
  for (let i = 1; i <= tp; i++) if (i === 1 || i === tp || Math.abs(i - page) <= 1) show.push(i);
  let nums = '', last = 0;
  for (const i of show) { if (i - last > 1) nums += '<span class="page-ellipsis">…</span>'; nums += btn(i, i, i === page ? 'active' : ''); last = i; }
  const from = (page - 1) * PAGE_SIZE + 1, to = Math.min(page * PAGE_SIZE, pool.length);
  pageWrap.innerHTML = btn('‹ Prev', page - 1, '', page === 1) + nums + btn('Next ›', page + 1, '', page === tp)
    + `<span class="page-count">Showing ${from}–${to} of ${pool.length} people</span>`;
}

function renderGrid() {
  if (!grid) return;
  if (!pool.length) { grid.innerHTML = ''; emptyEl.hidden = false; if (pageWrap) pageWrap.innerHTML = ''; return; }
  emptyEl.hidden = true;
  const tp = totalPages();
  if (page > tp) page = tp;
  const start = (page - 1) * PAGE_SIZE;
  grid.innerHTML = pool.slice(start, start + PAGE_SIZE).map(p => profileCard(p)).join('');
  grid.querySelectorAll('[data-reveal]').forEach(e => e.classList.add('in'));
  renderPagination(tp);
}
renderGrid();

/* Swipe deck (mobile) */
let deckIdx = 0;
function renderDeck() {
  if (!deck) return;
  const remaining = pool.slice(deckIdx, deckIdx + 3).reverse();
  if (!remaining.length) { deck.innerHTML = `<div class="empty"><p class="lead">You've seen everyone for now.</p><button class="btn btn--primary" id="deckReset">Start over</button></div>`; document.getElementById('deckReset')?.addEventListener('click', () => { deckIdx = 0; renderDeck(); }); return; }
  deck.innerHTML = remaining.map((p, k) => {
    const top = k === remaining.length - 1;
    return `<div style="position:absolute;inset:0;transform:scale(${1 - (remaining.length - 1 - k) * 0.04}) translateY(${(remaining.length - 1 - k) * 10}px);z-index:${k}">${profileCard(p, { actions: top })}</div>`;
  }).join('');
}
renderDeck();

/* Actions (shared) */
function doAct(act, id, cardEl) {
  const liked = store.get('liked', []);
  if (act === 'pass') { if (cardEl) cardEl.style.opacity = '.3'; toast('Passed.', 'x'); }
  if (act === 'fav') { const f = store.get('favs', []); if (!f.includes(id)) f.push(id); store.set('favs', f); toast('Saved to favourites.', 'star'); }
  if (act === 'spark') { toast('Spark sent ✨', 'spark'); maybeMatch(id, true); }
  if (act === 'like') {
    if (!liked.includes(id)) liked.push(id); store.set('liked', liked);
    toast('Liked!', 'heart'); maybeMatch(id, false);
  }
  // advance deck
  if (deck && cardEl && cardEl.closest('#discover-deck')) { deckIdx++; setTimeout(renderDeck, 260); }
}

/* Mutual match — some profiles "like back" */
function maybeMatch(id, spark) {
  const p = PROFILES.find(x => x.id === id); if (!p) return;
  const chance = spark ? 0.7 : (p.match >= 88 ? 0.55 : 0.28);
  if (Math.random() < chance) {
    const matches = store.get('matches', []); if (!matches.includes(id)) { matches.push(id); store.set('matches', matches); }
    setTimeout(() => celebrate(p), 350);
  }
}

function celebrate(p) {
  const me = 'assets/images/women/afsana.jpg';
  const { close } = modal(`
    <div class="match-cele">
      <p class="eyebrow" style="justify-content:center">Mutual interest</p>
      <h2 class="grad-text">It's a Match!</h2>
      <div class="match-cele__pair">
        <div class="match-cele__ava" style="background-image:url('${me}')"></div>
        <div class="match-cele__ava" style="background-image:url('${p.img}')"></div>
      </div>
      <p class="lead">You and <strong>${p.name}</strong> liked each other.</p>
      <div class="flex gap-1 wrap-f" style="justify-content:center;margin-top:1rem">
        <a class="btn btn--primary" href="messages.html">Say Hello</a>
        <button class="btn btn--ghost" data-close>Keep Discovering</button>
      </div>
    </div>`, { wide: false });
  confetti(close);
}

/* Lightweight canvas confetti for celebration */
function confetti() {
  const c = document.createElement('canvas');
  c.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none';
  document.body.appendChild(c);
  const ctx = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
  const colors = ['#2FCF9E', '#D9B56D', '#E66B7A', '#F8F6F0'];
  const parts = Array.from({ length: 120 }, () => ({ x: innerWidth / 2, y: innerHeight / 2, vx: (Math.random() - 0.5) * 14, vy: (Math.random() - 1) * 14, s: Math.random() * 6 + 3, c: colors[Math.random() * 4 | 0], a: 1, r: Math.random() * 6 }));
  let t = 0;
  (function loop() {
    ctx.clearRect(0, 0, c.width, c.height); t++;
    parts.forEach(p => { p.vy += 0.3; p.x += p.vx; p.y += p.vy; p.a -= 0.008; p.r += 0.1; ctx.globalAlpha = Math.max(0, p.a); ctx.fillStyle = p.c; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); ctx.restore(); });
    if (t < 140) requestAnimationFrame(loop); else c.remove();
  })();
}

document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  e.preventDefault();
  b.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 280 });
  doAct(b.dataset.act, b.dataset.id, b);
});

/* Keyboard support (desktop): ← pass, → like, ↑ spark, f fav on first card */
document.addEventListener('keydown', (e) => {
  if (/input|textarea|select/i.test(document.activeElement.tagName)) return;
  const first = grid?.querySelector('.pcard:not([style*="0.3"])') || deck?.querySelector('.pcard');
  if (!first) return;
  const id = first.dataset.id;
  const map = { ArrowLeft: 'pass', ArrowRight: 'like', ArrowUp: 'spark', f: 'fav', F: 'fav' };
  if (map[e.key]) { e.preventDefault(); const btn = first.parentElement.querySelector(`[data-act="${map[e.key]}"]`) || first.querySelector(`[data-act="${map[e.key]}"]`); doAct(map[e.key], id, first); }
});

/* Touch swipe on deck */
if (deck) {
  let x0 = 0, y0 = 0, drag = null;
  deck.addEventListener('touchstart', (e) => { const card = e.target.closest('.pcard'); if (!card) return; drag = card; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  deck.addEventListener('touchmove', (e) => { if (!drag) return; const dx = e.touches[0].clientX - x0, dy = e.touches[0].clientY - y0; drag.style.transform = `translate(${dx}px,${dy}px) rotate(${dx / 18}deg)`; }, { passive: true });
  deck.addEventListener('touchend', (e) => {
    if (!drag) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; const id = drag.dataset.id;
    if (dy < -90) { drag.classList.add('gone-up'); doAct('spark', id, drag); }
    else if (dx > 90) { drag.classList.add('gone-right'); doAct('like', id, drag); }
    else if (dx < -90) { drag.classList.add('gone-left'); doAct('pass', id, drag); }
    else drag.style.transform = '';
    drag = null;
  });
}

})();
