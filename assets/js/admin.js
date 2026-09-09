/* classic build: scope isolated */
(function(){
/* ============================================================
   TUDO — admin dashboard (demo). Protect behind auth + RLS in prod.
   ============================================================ */

/* language buttons on admin bar */
document.querySelectorAll('.lang button').forEach(b => { b.classList.toggle('active', b.dataset.lang === getLang()); b.addEventListener('click', () => setLang(b.dataset.lang)); });
applyLang(getLang());

const view = document.getElementById('adminView');
const nav = document.getElementById('adminNav');
let active = 'Dashboard';

const sections = ['Dashboard','Users','Verification','Reports','Moderation','Subscriptions','Payments','Pricing','Hero Slider','Homepage','Success Stories','Notifications','Support','Analytics','Settings'];
const esc = s => String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
nav.innerHTML = sections.map(s => `<button data-s="${s}" class="${s === active ? 'active' : ''}">${s}</button>`).join('');
nav.addEventListener('click', e => { const b = e.target.closest('[data-s]'); if (!b) return; active = b.dataset.s; nav.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b)); document.getElementById('adminDrawer')?.classList.remove('open'); render(); });

/* ---- helpers ---- */
function barChart(data, { h = 160, color = 'var(--tudo-green)' } = {}) {
  const max = Math.max(...data.map(d => d.v));
  const w = 100 / data.length;
  return `<svg viewBox="0 0 100 ${100}" preserveAspectRatio="none" style="width:100%;height:${h}px" role="img" aria-label="Bar chart">
    ${data.map((d, i) => { const bh = (d.v / max) * 88; return `<rect x="${i * w + w * 0.18}" y="${100 - bh}" width="${w * 0.64}" height="${bh}" rx="1.2" fill="${color}" opacity="${0.55 + 0.45 * (d.v / max)}"><title>${d.l}: ${d.v}</title></rect>`; }).join('')}
  </svg><div class="flex between text-xs muted" style="margin-top:.3rem">${data.map(d => `<span>${d.l}</span>`).join('')}</div>`;
}
function lineChart(vals, { h = 160 } = {}) {
  const max = Math.max(...vals), min = Math.min(...vals);
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * 100},${100 - ((v - min) / (max - min || 1)) * 84 - 8}`);
  return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100%;height:${h}px" role="img" aria-label="Line chart">
    <defs><linearGradient id="lgc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(24,166,121,.4)"/><stop offset="1" stop-color="rgba(24,166,121,0)"/></linearGradient></defs>
    <polygon points="0,100 ${pts.join(' ')} 100,100" fill="url(#lgc)"/>
    <polyline points="${pts.join(' ')}" fill="none" stroke="var(--tudo-green-soft)" stroke-width="1.4" vector-effect="non-scaling-stroke"/>
    ${pts.map(p => `<circle cx="${p.split(',')[0]}" cy="${p.split(',')[1]}" r="1" fill="var(--tudo-gold)"/>`).join('')}
  </svg>`;
}
function donut(data) {
  let acc = 0; const colors = ['#18A679', '#D9B56D', '#E66B7A', '#2FCF9E', '#6E827A'];
  const total = data.reduce((s, d) => s + d.v, 0);
  const seg = data.map((d, i) => { const frac = d.v / total; const dash = frac * 100; const s = `<circle r="15.9" cx="18" cy="18" fill="none" stroke="${colors[i % 5]}" stroke-width="5" stroke-dasharray="${dash} ${100 - dash}" stroke-dashoffset="${-acc}" transform="rotate(-90 18 18)"/>`; acc += dash; return s; }).join('');
  return `<div class="flex gap-2 items-center"><svg viewBox="0 0 36 36" width="130" height="130">${seg}</svg>
    <ul class="stack text-sm">${data.map((d, i) => `<li class="flex gap-1 items-center"><span style="width:10px;height:10px;border-radius:2px;background:${colors[i % 5]}"></span>${d.l} <span class="muted">${Math.round(d.v / total * 100)}%</span></li>`).join('')}</ul></div>`;
}
const statCard = (label, val, delta, up = true) => `<div class="card"><div class="text-xs muted" style="text-transform:uppercase;letter-spacing:.1em">${label}</div><div class="stat__num" style="font-size:2rem;margin:.2rem 0">${val}</div><div class="text-xs ${up ? '' : 'rose'}" style="color:${up ? 'var(--tudo-green-soft)' : 'var(--tudo-rose-soft)'}">${up ? '▲' : '▼'} ${delta}</div></div>`;

function confirmAction(msg, onYes, danger) {
  const { root } = modal(`<h3 class="h3">${msg}</h3><p class="muted text-sm">This action is logged in the audit trail.</p><div class="flex gap-1 mt-2"><button class="btn btn--ghost btn--block" data-close>Cancel</button><button class="btn ${danger ? 'btn--rose' : 'btn--primary'} btn--block" id="cy">Confirm</button></div>`);
  root.querySelector('#cy').onclick = () => { root.querySelector('[data-close]').click(); onYes(); };
}

/* ---- render sections ---- */
function render() {
  document.getElementById('adminTitle').textContent = active;
  if (active === 'Dashboard') return renderDashboard();
  if (active === 'Users') return renderUsers();
  if (active === 'Verification') return renderVerification();
  if (active === 'Reports') return renderReports();
  if (active === 'Hero Slider') return renderHero();
  if (active === 'Homepage') return renderHomepage();
  if (active === 'Pricing') return renderPricingAdmin();
  if (active === 'Success Stories' || active === 'Notifications' || active === 'Settings') return renderCMS();
  return renderGeneric();
}

function renderDashboard() {
  view.innerHTML = `
    <div class="grid cols-4 mb-3">
      ${statCard('Total Users', '96,412', '4.1% this week')}
      ${statCard('Active Today', '18,204', '2.6%')}
      ${statCard('New Registrations', '842', '11% today')}
      ${statCard('Verified Profiles', '71,338', '3.0%')}
      ${statCard('Matches Today', '5,271', '6.4%')}
      ${statCard('Reports Pending', '23', '5 new', false)}
      ${statCard('Premium Members', '9,860', '1.9%')}
      ${statCard('Revenue (mo)', '৳48.2L', '8.2%')}
    </div>
    <div class="grid cols-2 mb-3">
      <div class="panel"><h3 class="h3" style="font-size:1.1rem">Registrations over time</h3>${lineChart([120,180,150,230,280,260,340,420,390,470,520,610])}</div>
      <div class="panel"><h3 class="h3" style="font-size:1.1rem">Match activity (7 days)</h3>${barChart([{l:'Mon',v:420},{l:'Tue',v:510},{l:'Wed',v:480},{l:'Thu',v:620},{l:'Fri',v:790},{l:'Sat',v:910},{l:'Sun',v:680}])}</div>
    </div>
    <div class="grid cols-2">
      <div class="panel"><h3 class="h3" style="font-size:1.1rem">Country distribution</h3>${donut([{l:'Bangladesh',v:48},{l:'UK',v:22},{l:'USA',v:14},{l:'Canada',v:9},{l:'Other',v:14}])}</div>
      <div class="panel"><h3 class="h3" style="font-size:1.1rem">Subscription conversions</h3>${barChart([{l:'Jan',v:210},{l:'Feb',v:260},{l:'Mar',v:240},{l:'Apr',v:320},{l:'May',v:380},{l:'Jun',v:410}],{color:'var(--tudo-gold)'})}</div>
    </div>`;
}

function renderUsers() {
  const rows = PROFILES.map(p => ({ ...p, status: p.verified >= 3 ? 'Verified' : p.verified ? 'Active' : 'Unverified' }));
  view.innerHTML = `
    <div class="flex between items-center wrap-f mb-2"><input class="input" id="userSearch" placeholder="Search users…" style="max-width:280px"/>
      <select class="select" id="userFilter" style="max-width:180px"><option value="">All statuses</option><option>Verified</option><option>Active</option><option>Unverified</option></select></div>
    <div class="panel" style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;min-width:640px">
      <thead><tr style="text-align:left"><th style="padding:.7rem">Member</th><th>Location</th><th>Goal</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody id="userRows"></tbody></table></div>`;
  const body = document.getElementById('userRows');
  const draw = (list) => body.innerHTML = list.map(p => `<tr style="border-top:1px solid var(--line)" data-id="${p.id}" data-status="${p.status}">
    <td style="padding:.7rem"><div class="flex items-center gap-1"><div class="avatar" style="width:34px;height:34px;background-image:url('${p.img}')"></div>${p.name}, ${p.age}</div></td>
    <td>${p.city}, ${p.country}</td><td>${p.goal}</td>
    <td><span class="chip user-chip ${p.status==='Verified'?'':p.status==='Unverified'?'chip--muted':'chip--gold'}">${p.status}</span></td>
    <td><a class="btn btn--ghost btn--sm" href="profile.html?id=${p.id}" target="_blank" rel="noopener">View</a> <button class="btn btn--ghost btn--sm" data-u-suspend="${p.id}">Suspend</button> <button class="btn btn--rose btn--sm" data-u-ban="${p.id}">Ban</button></td></tr>`).join('');
  draw(rows);
  document.getElementById('userSearch').addEventListener('input', e => draw(rows.filter(p => (p.name + p.city + p.country).toLowerCase().includes(e.target.value.toLowerCase()))));
  document.getElementById('userFilter').addEventListener('change', e => draw(e.target.value ? rows.filter(p => p.status === e.target.value) : rows));
  const setChip = (row, label, cls) => { const c = row.querySelector('.user-chip'); if (c) { c.className = 'chip user-chip ' + cls; c.textContent = label; } };
  body.addEventListener('click', e => {
    const row = e.target.closest('tr'); if (!row) return;
    const s = e.target.closest('[data-u-suspend]'), b = e.target.closest('[data-u-ban]'), re = e.target.closest('[data-u-react]');
    if (s) confirmAction(`Suspend ${row.children[0].textContent.trim()} for 7 days?`, () => {
      setChip(row, 'Suspended', 'chip--rose');
      s.textContent = 'Reactivate'; s.className = 'btn btn--gold btn--sm'; s.removeAttribute('data-u-suspend'); s.setAttribute('data-u-react', row.dataset.id);
      toast('User suspended for 7 days. Logged to audit trail.', 'shield');
    });
    if (re) {
      setChip(row, row.dataset.status || 'Active', row.dataset.status === 'Verified' ? '' : 'chip--gold');
      re.textContent = 'Suspend'; re.className = 'btn btn--ghost btn--sm'; re.removeAttribute('data-u-react'); re.setAttribute('data-u-suspend', row.dataset.id);
      toast('User reactivated.', 'check');
    }
    if (b) confirmAction(`Permanently ban ${row.children[0].textContent.trim()}? This cannot be undone.`, () => {
      setChip(row, 'Banned', 'chip--rose');
      row.style.transition = 'opacity .3s'; row.style.opacity = '.4';
      row.querySelectorAll('button').forEach(btn => { btn.disabled = true; });
      toast('User banned. Logged to audit trail.', 'shield');
    }, true);
  });
}

function renderVerification() {
  const q = PROFILES.slice(0, 6);
  view.innerHTML = `<div class="tabs mb-2"><button class="tab active">Pending (6)</button><button class="tab">Approved</button><button class="tab">Rejected</button><button class="tab">Needs Review</button></div>
    <p class="text-sm muted mb-2">🔒 Identity documents are access-controlled and never shown publicly. Only masked previews appear here.</p>
    <div class="grid cols-3">${q.map(p => `<div class="card"><div class="flex gap-1 items-center mb-1"><div class="avatar" style="width:40px;height:40px;background-image:url('${p.img}')"></div><div><strong>${p.name}, ${p.age}</strong><div class="text-xs muted">${p.city}</div></div></div>
      <div class="glass" style="padding:.6rem;text-align:center;filter:none"><span class="text-xs muted">Selfie ✓ · ID doc (masked)</span></div>
      <div class="flex gap-1 mt-1"><button class="btn btn--primary btn--sm btn--block" data-v-ok="${p.id}">Approve</button><button class="btn btn--ghost btn--sm btn--block" data-v-no="${p.id}">Reject</button></div></div>`).join('')}</div>`;
}

function renderReports() {
  const reasons = ['Harassment', 'Fake profile', 'Spam', 'Scam', 'Inappropriate content'];
  const reports = reasons.map((r, i) => ({ id: 'R-' + (1024 + i), reporter: PROFILES[i].name, reported: PROFILES[i + 5].name, reason: r, when: `${i + 1}h ago`, prior: i }));
  view.innerHTML = `<div class="panel" style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;min-width:680px">
    <thead><tr style="text-align:left"><th style="padding:.7rem">ID</th><th>Reporter</th><th>Reported</th><th>Reason</th><th>Prior</th><th>Time</th><th>Actions</th></tr></thead>
    <tbody>${reports.map(r => `<tr style="border-top:1px solid var(--line)"><td style="padding:.7rem">${r.id}</td><td>${r.reporter}</td><td>${r.reported}</td><td><span class="chip chip--rose">${r.reason}</span></td><td>${r.prior}</td><td class="muted">${r.when}</td>
      <td><button class="btn btn--ghost btn--sm" data-r="dismiss">Dismiss</button> <button class="btn btn--ghost btn--sm" data-r="warn">Warn</button> <button class="btn btn--ghost btn--sm" data-r="suspend">Suspend</button> <button class="btn btn--rose btn--sm" data-r="ban">Ban</button></td></tr>`).join('')}</tbody></table></div>`;
}

/* Single delegated listener for section-level actions (no leak across re-renders) */
view.addEventListener('click', e => {
  const ok = e.target.closest('[data-v-ok]'), no = e.target.closest('[data-v-no]'), rep = e.target.closest('[data-r]');
  if (ok) { ok.closest('.card').style.opacity = '.4'; toast('Verification approved.', 'check'); }
  if (no) { no.closest('.card').style.opacity = '.4'; toast('Verification rejected. User notified with appeal option.', 'shield'); }
  if (rep) { const map = { dismiss: 'Report dismissed.', warn: 'Warning issued to user.', suspend: 'User suspended.', ban: 'User banned.' }; confirmAction(`${rep.dataset.r.charAt(0).toUpperCase() + rep.dataset.r.slice(1)} — record moderator action?`, () => toast(map[rep.dataset.r] + ' Logged.', 'shield'), rep.dataset.r === 'ban'); }
});

/* Resize an uploaded image on a canvas and return a JPEG data URL (keeps localStorage small) */
function fileToDataURL(file, maxW) {
  return new Promise((res) => {
    const r = new FileReader();
    r.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
        const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
        cv.getContext('2d').drawImage(img, 0, 0, w, h);
        try { res(cv.toDataURL('image/jpeg', 0.78)); } catch (e) { res(r.result); }
      };
      img.onerror = () => res(r.result);
      img.src = r.result;
    };
    r.readAsDataURL(file);
  });
}

function renderHero() {
  const ov = store.get('cms_hero', []);
  const slides = HERO_SLIDES.map((s, i) => {
    const o = ov[i] || {};
    return {
      img: o.img || s.img,
      eyebrow: o.eyebrow || s.eyebrow,
      headline: o.headline || s.title.join(' ').replace(/<[^>]+>/g, ''),
      sub: o.sub || s.sub,
      visible: o.visible !== false,
    };
  });
  const uploaded = {};
  view.innerHTML = `
    <p class="text-sm muted mb-2">Manage the homepage hero slider — <strong>attach a new image</strong>, edit the text, and show/hide each slide. Publishing updates the live homepage instantly.</p>
    <div class="stack">${slides.map((s, i) => `
      <div class="panel">
        <div class="flex between items-center mb-1"><strong>Slide ${i + 1}</strong>
          <label class="switch" style="width:48px;height:28px" title="Show this slide"><input type="checkbox" ${s.visible ? 'checked' : ''} data-vis="${i}"><span></span></label></div>
        <div class="grid cols-2" style="gap:1.2rem;align-items:start">
          <div>
            <div data-thumb="${i}" style="aspect-ratio:16/9;border-radius:12px;background:#0d1d17 center/cover no-repeat;border:1px solid var(--line);background-image:url('${esc(s.img)}')"></div>
            <label class="btn btn--ghost btn--sm btn--block mt-1" style="cursor:pointer">📷 Attach / replace image<input type="file" accept="image/*" data-img="${i}" hidden></label>
            <p class="hint">Wide landscape (16:9) works best. Auto-resized to ~1400px.</p>
          </div>
          <div>
            <div class="field" style="margin:0 0 .6rem"><label>Eyebrow</label><input class="input" value="${esc(s.eyebrow)}" data-f="eyebrow" data-i="${i}"/></div>
            <div class="field" style="margin:0 0 .6rem"><label>Headline</label><input class="input" value="${esc(s.headline)}" data-f="headline" data-i="${i}"/></div>
            <div class="field" style="margin:0"><label>Subtitle</label><textarea class="textarea" data-f="sub" data-i="${i}" style="min-height:70px">${esc(s.sub)}</textarea></div>
          </div>
        </div>
      </div>`).join('')}</div>
    <div class="flex gap-1 mt-2"><button class="btn btn--primary" id="saveSlides">Publish slider</button><button class="btn btn--ghost" id="resetSlides">Reset to default</button></div>`;
  view.querySelectorAll('input[data-img]').forEach(inp => inp.addEventListener('change', () => {
    const i = inp.dataset.img, file = inp.files[0]; if (!file) return;
    fileToDataURL(file, 1400).then(url => { uploaded[i] = url; const t = view.querySelector(`[data-thumb="${i}"]`); if (t) t.style.backgroundImage = `url('${url}')`; toast('Image attached — press Publish to go live.', 'check'); });
  }));
  document.getElementById('saveSlides').onclick = () => {
    const out = slides.map((s, i) => ({
      img: uploaded[i] || (ov[i] && ov[i].img) || undefined,
      eyebrow: view.querySelector(`[data-f="eyebrow"][data-i="${i}"]`).value,
      headline: view.querySelector(`[data-f="headline"][data-i="${i}"]`).value,
      sub: view.querySelector(`[data-f="sub"][data-i="${i}"]`).value,
      visible: view.querySelector(`[data-vis="${i}"]`).checked,
    }));
    try { store.set('cms_hero', out); toast('Hero slider published — live on the homepage.', 'check'); }
    catch (e) { toast('Images too large to save. Try smaller files.', 'shield'); }
  };
  document.getElementById('resetSlides').onclick = () => { store.del('cms_hero'); toast('Slider reset to default.', 'check'); render(); };
}

function renderPricingAdmin() {
  const list = currencyList();
  const def = store.get('defaultCurrency', 'BDT');
  view.innerHTML = `
    <p class="text-sm muted mb-2">Set membership prices per currency for the Bangladeshi diaspora. These drive the <strong>Home</strong> &amp; <strong>Premium</strong> pages (Free is always 0). Demo — no real payments.</p>
    <div class="panel" style="max-width:760px">
      <div class="field"><label>Default currency (shown first to new visitors)</label>
        <select class="select" id="defCur" style="max-width:280px">${CURRENCY_ORDER.map(k => `<option value="${k}" ${k === def ? 'selected' : ''}>${list[k].flag} ${k} — Bangladeshis in ${list[k].who}</option>`).join('')}</select></div>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;min-width:520px">
        <thead><tr style="text-align:left"><th style="padding:.5rem">Currency</th><th>Premium / month</th><th>Elite / month</th></tr></thead>
        <tbody>${CURRENCY_ORDER.map(k => `<tr style="border-top:1px solid var(--line)">
          <td style="padding:.6rem">${list[k].flag} ${k} (${list[k].symbol}) · ${list[k].who}</td>
          <td><div class="flex items-center gap-1"><span class="muted">${list[k].symbol}</span><input class="input" style="max-width:120px" type="number" step="0.01" min="0" data-k="${k}" data-t="premium" value="${list[k].premium}"/></div></td>
          <td><div class="flex items-center gap-1"><span class="muted">${list[k].symbol}</span><input class="input" style="max-width:120px" type="number" step="0.01" min="0" data-k="${k}" data-t="elite" value="${list[k].elite}"/></div></td></tr>`).join('')}</tbody>
      </table></div>
      <div class="flex gap-1 mt-2"><button class="btn btn--primary" id="savePricing">Publish prices</button><button class="btn btn--ghost" id="resetPricing">Reset to defaults</button></div>
    </div>`;
  document.getElementById('savePricing').onclick = () => {
    const ov = {};
    view.querySelectorAll('input[data-k]').forEach(inp => { (ov[inp.dataset.k] = ov[inp.dataset.k] || {})[inp.dataset.t] = parseFloat(inp.value) || 0; });
    store.set('pricing', ov);
    store.set('defaultCurrency', document.getElementById('defCur').value);
    toast('Prices published — live on Home & Premium.', 'check');
  };
  document.getElementById('resetPricing').onclick = () => { store.del('pricing'); store.del('defaultCurrency'); store.del('currency'); toast('Reset to default prices.', 'check'); render(); };
}

function renderHomepage() {
  const cms = store.get('cms', {});
  const eb = cms.premiumEyebrow || 'Membership';
  const hd = cms.premiumHeading || 'Do more with TUDO Premium.';
  const sb = cms.premiumSub || 'Upgrade for unlimited likes, advanced filters and more — while every safety tool stays free, forever.';
  const gold = t => esc(t).replace(/(Premium|Elite)/, '<span class="grad-text">$1</span>');
  view.innerHTML = `
    <p class="text-sm muted mb-2">Edit the homepage <strong>“Do more with TUDO Premium”</strong> section. Publishing updates the live homepage instantly.</p>
    <div class="grid cols-2" style="gap:1.2rem;align-items:start">
      <div class="panel">
        <h3 class="h3" style="font-size:1.1rem">Premium section</h3>
        <div class="field"><label>Eyebrow</label><input class="input" id="cmsEyebrow" value="${esc(eb)}"/></div>
        <div class="field"><label>Heading</label><input class="input" id="cmsHeading" value="${esc(hd)}"/><p class="hint">“Premium” or “Elite” is highlighted in gold automatically.</p></div>
        <div class="field"><label>Subheading</label><textarea class="textarea" id="cmsSub">${esc(sb)}</textarea></div>
        <div class="flex gap-1"><button class="btn btn--primary" id="cmsPublish">Publish to homepage</button><button class="btn btn--ghost" id="cmsReset">Reset to default</button></div>
      </div>
      <div class="panel">
        <div class="text-xs muted" style="text-transform:uppercase;letter-spacing:.12em;margin-bottom:.6rem">Live preview</div>
        <p class="eyebrow" id="pvEb" style="justify-content:flex-start">${esc(eb)}</p>
        <h2 class="h2" id="pvHd" style="font-size:1.9rem">${gold(hd)}</h2>
        <p class="muted" id="pvSb">${esc(sb)}</p>
      </div>
    </div>`;
  const g = id => document.getElementById(id);
  const sync = () => { g('pvEb').textContent = g('cmsEyebrow').value; g('pvHd').innerHTML = gold(g('cmsHeading').value); g('pvSb').textContent = g('cmsSub').value; };
  ['cmsEyebrow', 'cmsHeading', 'cmsSub'].forEach(id => g(id).addEventListener('input', sync));
  g('cmsPublish').onclick = () => { store.set('cms', { ...store.get('cms', {}), premiumEyebrow: g('cmsEyebrow').value, premiumHeading: g('cmsHeading').value, premiumSub: g('cmsSub').value }); toast('Published — live on the homepage Premium section.', 'check'); };
  g('cmsReset').onclick = () => { const c = store.get('cms', {}); delete c.premiumEyebrow; delete c.premiumHeading; delete c.premiumSub; store.set('cms', c); toast('Reset to default.', 'check'); render(); };
}

function renderCMS() {
  view.innerHTML = `<p class="text-sm muted mb-2">Edit ${active.toLowerCase()} content. Changes publish to the live site.</p>
    <div class="panel"><div class="field"><label>Section heading</label><input class="input" value="${active === 'Success Stories' ? 'Some stories begin with a simple hello.' : active}"/></div>
    <div class="field"><label>Body</label><textarea class="textarea" rows="5">Edit this content...</textarea></div>
    <button class="btn btn--primary" id="cmsSave">Publish</button></div>`;
  document.getElementById('cmsSave').onclick = () => toast('Content published (demo).', 'check');
}

function renderGeneric() {
  const map = {
    Moderation: ['Human moderation queue', 'Automated spam & image/text moderation feed with human review. No automated system makes irreversible decisions alone.'],
    Subscriptions: ['Subscriptions', 'Plan distribution, churn, MRR and upgrade funnels.'],
    Payments: ['Payments', 'Transactions via certified providers (Stripe, Apple/Google Pay, bKash, Nagad). No card data stored.'],
    Support: ['Support tickets', 'Incoming help requests by category with SLA tracking.'],
    Analytics: ['Analytics', 'Cohorts, retention, match rates and geographic breakdowns.'],
  };
  const m = map[active] || [active, ''];
  view.innerHTML = `<div class="panel"><h2 class="h3">${m[0]}</h2><p class="muted">${m[1]}</p>
    ${active === 'Analytics' ? `<div class="grid cols-2 mt-2"><div>${lineChart([20,35,28,45,52,48,63,71,66,80,88,96])}</div><div>${donut([{l:'Serious',v:44},{l:'Marriage',v:31},{l:'Dating',v:15},{l:'Friendship',v:10}])}</div></div>` : ''}
    ${active === 'Subscriptions' ? `<div class="mt-2">${barChart([{l:'Free',v:86},{l:'Premium',v:10},{l:'Elite',v:4}])}</div>` : ''}
    <button class="btn btn--ghost mt-2" id="gExport">Export CSV</button></div>`;
  document.getElementById('gExport').onclick = () => toast('Export started (demo).', 'check');
}

render();

/* mobile drawer */
document.getElementById('adminMenu')?.addEventListener('click', () => document.getElementById('adminDrawer').classList.toggle('open'));

})();
