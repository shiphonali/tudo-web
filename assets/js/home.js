/* classic build: scope isolated */
(function(){
/* ============================================================
   TUDO — homepage dynamic content
   ============================================================ */

boot('index.html');

/* Apply admin CMS overrides (edited in Admin → Homepage) */
try {
  const cms = store.get('cms', {});
  const setTxt = (id, v) => { const el = document.getElementById(id); if (el && v) el.textContent = v; };
  setTxt('premiumEyebrow', cms.premiumEyebrow);
  setTxt('premiumSub', cms.premiumSub);
  const h = document.getElementById('premiumHeading');
  if (h && cms.premiumHeading) h.innerHTML = cms.premiumHeading.replace(/(Premium|Elite)/, '<span class="serif-accent grad-text">$1</span>');
} catch (e) {}

/* Age selects for quick search */
const ageFrom = document.getElementById('ageFrom'), ageTo = document.getElementById('ageTo');
if (ageFrom && ageTo) {
  for (let a = 18; a <= 70; a++) {
    ageFrom.insertAdjacentHTML('beforeend', `<option ${a === 24 ? 'selected' : ''}>${a}</option>`);
    ageTo.insertAdjacentHTML('beforeend', `<option ${a === 36 ? 'selected' : ''}>${a}</option>`);
  }
}

/* Stats */
const sg = document.getElementById('stats-grid');
if (sg) sg.innerHTML = STATS.map((s, i) => `
  <div class="stat" data-reveal data-reveal-delay="${i}">
    <div class="stat__num"><span data-count="${s.value}" data-suffix="${s.suffix}" data-short="${!!s.short}">0</span></div>
    <div class="stat__label">${s.label}</div>
  </div>`).join('');

/* Discover preview (8 profiles) */
const hp = document.getElementById('home-profiles');
const previewPool = PROFILES.filter(p => (p.img || '').includes('women/'));
if (hp) hp.innerHTML = previewPool.slice(0, 8).map(p => profileCard(p, { compact: true })).join('');

/* Community */
const cg = document.getElementById('community-grid');
if (cg) cg.innerHTML = COMMUNITY.map((c, i) => `
  <a href="discover.html?country=${encodeURIComponent(c.c)}" class="pcard" data-reveal data-reveal-delay="${i % 3}" style="aspect-ratio:16/11">
    <div class="pcard__img" style="aspect-ratio:16/11;background-image:url('${c.img}')"></div>
    <div class="pcard__body"><h3 class="pcard__name" style="font-size:1.25rem">${c.c}</h3><p class="pcard__meta" style="margin:0">${c.n} members</p></div>
  </a>`).join('');

/* Stories */
const st = document.getElementById('stories-track');
if (st) st.innerHTML = STORIES.map(s => `
  <article class="story card">
    <div class="story__img" style="background-image:url('${s.img}')"></div>
    <div class="chip chip--gold mb-1">${s.milestone}</div>
    <h3 class="h3" style="font-size:1.3rem;margin:.2rem 0">${s.names}</h3>
    <p class="text-sm muted" style="margin:0 0 .6rem">${s.loc}</p>
    <p class="serif-accent" style="font-size:1.05rem;line-height:1.5">${s.text}</p>
  </article>`).join('');

/* Pricing (home preview) — currency-aware */
const pricing = document.getElementById('home-pricing');
const check = ICON.check;
function renderHomePricing() {
  if (!pricing) return;
  const cur = currencyList()[activeCurrency()];
  const note = document.getElementById('homeCurrencyNote');
  if (note) note.textContent = `Prices shown in ${cur.code} (${cur.symbol}) for Bangladeshis in ${cur.who}. Free is always free.`;
  pricing.innerHTML = `
  <div class="card price" data-reveal>
    <div class="chip chip--muted mb-1">TUDO Free</div>
    <div class="price__amt">${money(cur, 0)} <small>/ forever</small></div>
    <ul>
      <li>${check}Create your profile</li><li>${check}Basic discovery &amp; matching</li>
      <li>${check}Limited daily likes</li><li>${check}All safety tools</li>
    </ul>
    <a class="btn btn--ghost btn--block" href="register.html">Start free</a>
  </div>
  <div class="card price price--featured" data-reveal data-reveal-delay="1">
    <div class="chip mb-1">Most popular · TUDO Premium</div>
    <div class="price__amt">${money(cur, cur.premium)} <small>/ month</small></div>
    <ul>
      <li>${check}Unlimited likes &amp; Sparks</li><li>${check}See who liked you</li>
      <li>${check}Advanced filters &amp; Incognito</li><li>${check}Undo pass &amp; profile boost</li>
    </ul>
    <a class="btn btn--primary btn--block" href="premium.html">Go Premium</a>
  </div>
  <div class="card price" data-reveal data-reveal-delay="2">
    <div class="chip chip--gold mb-1">TUDO Elite</div>
    <div class="price__amt">${money(cur, cur.elite)} <small>/ month</small></div>
    <ul>
      <li>${check}Priority discovery</li><li>${check}Monthly boosts &amp; Travel Mode</li>
      <li>${check}Premium profile styling</li><li>${check}Advanced compatibility insights</li>
    </ul>
    <a class="btn btn--gold btn--block" href="premium.html">Explore Elite</a>
  </div>`;
}
renderHomePricing();
mountCurrency('homeCurrency', renderHomePricing);

/* FAQ accordion */
const faqs = [
  ['Is TUDO only for people in Bangladesh?', 'No. TUDO is for Bangladeshi adults everywhere — in Bangladesh and across the diaspora in the UK, US, Canada, Australia, Europe and the Middle East.'],
  ['Do I have to pay to stay safe?', 'Never. Blocking, reporting, verification and privacy controls are free for everyone. Premium only adds convenience features.'],
  ['How does verification work?', 'There are three levels — email, phone and photo/selfie verification. Badges build confidence but are not a guarantee that another person is safe or truthful.'],
  ['Who can message me?', 'By default, private messaging opens after mutual interest. You control who can send you match requests and messages in your privacy settings.'],
  ['Is my exact location shown?', 'No. TUDO only ever shows approximate location. Your exact address, email and phone number are never public.'],
];
const fl = document.getElementById('faq-list');
if (fl) fl.innerHTML = faqs.map(([q, a], i) => `
  <details class="card" data-reveal ${i === 0 ? 'open' : ''}>
    <summary style="cursor:pointer;font-weight:700;font-family:var(--font-display);list-style:none;display:flex;justify-content:space-between;gap:1rem;align-items:center">${q}<span class="gold" style="font-size:1.4rem">+</span></summary>
    <p class="muted" style="margin:.8rem 0 0">${a}</p>
  </details>`).join('');

/* Interactions on preview cards (likes etc.) */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-act]'); if (!btn) return;
  const act = btn.dataset.act, id = btn.dataset.id;
  const liked = store.get('liked', []);
  if (act === 'like' && !liked.includes(id)) { liked.push(id); store.set('liked', liked); toast('Liked! We\'ll let you know if it\'s mutual.', 'heart'); }
  if (act === 'spark') toast('Spark sent ✨ They\'ll be notified.', 'spark');
  if (act === 'fav') { const f = store.get('favs', []); if (!f.includes(id)) { f.push(id); store.set('favs', f); } toast('Added to favourites.', 'star'); }
  if (act === 'pass') { btn.closest('.pcard').style.opacity = '.35'; }
  btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'ease-out' });
});

/* PWA install (demo) */
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
document.getElementById('installBtn')?.addEventListener('click', async () => {
  if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; }
  else modal(`<h3 class="h3">Install TUDO</h3><p class="muted">On mobile, tap your browser's <strong>Share</strong> button, then <strong>“Add to Home Screen.”</strong> On desktop, use the install icon in the address bar.</p><button class="btn btn--primary btn--block mt-2" data-close>Got it</button>`);
});

})();
