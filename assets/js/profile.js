/* classic build: scope isolated */
(function(){
/* ============================================================
   TUDO — profile detail page
   ============================================================ */

boot('');
renderBottomNav('');

const id = new URLSearchParams(location.search).get('id') || 'p29';
const p = PROFILES.find(x => x.id === id) || PROFILES[0];
document.title = `${p.name}, ${p.age} · TUDO`;

const gallery = [p.img, PROFILES[(PROFILES.indexOf(p) + 3) % PROFILES.length].img, PROFILES[(PROFILES.indexOf(p) + 6) % PROFILES.length].img];
const facts = [
  ['Current city', `${p.city}, ${p.country}`],
  ['Hometown', `Originally from ${p.origin}`],
  ['Occupation', p.job],
  ['Education', p.edu],
  ['Languages', p.langs.join(' · ')],
  ['Looking for', p.goal],
];
const promptA = [
  [PROMPTS[4], `${p.interests.includes('Food') ? 'Anything with a good story — but kacchi biryani wins.' : 'Kacchi biryani, no debate.'}`],
  [PROMPTS[0], 'A slow dinner, good music, and someone who actually listens.'],
  [PROMPTS[3], `The ${p.origin} side — it always feels like home.`],
];

const root = document.getElementById('profile-root');
root.innerHTML = `
  <div class="grid" style="grid-template-columns:1.1fr .9fr;gap:clamp(20px,4vw,48px);align-items:start" id="profile-grid">
    <div>
      <div class="pcard" style="box-shadow:var(--shadow-lg)">
        <div class="pcard__img" id="mainPhoto" style="background-image:url('${gallery[0]}');aspect-ratio:4/5">
          <div class="pcard__top">${verifyBadge(p.verified)}<span class="match-ring">${p.match}% Match</span></div>
        </div>
      </div>
      <div class="flex gap-1 mt-1" id="thumbs">
        ${gallery.map((g, i) => `<button class="thumb ${i === 0 ? 'active' : ''}" data-src="${g}" style="flex:1;aspect-ratio:1;border-radius:12px;border:1px solid ${i === 0 ? 'var(--tudo-gold)' : 'var(--line)'};background:url('${g}') center/cover;cursor:pointer" aria-label="Photo ${i + 1}"></button>`).join('')}
      </div>
      <div class="glass mt-2" style="padding:1rem;display:flex;align-items:center;gap:.6rem">
        <span class="chip chip--muted">🔒 Private photos</span>
        <span class="text-sm muted">2 more photos are visible to matches only.</span>
      </div>
    </div>

    <div>
      <p class="eyebrow" style="margin-bottom:.3rem">${p.online ? 'Online now' : 'Active ' + p.active}</p>
      <h1 class="display" style="font-size:clamp(2.2rem,4vw,3.2rem);margin:0 0 .2em">${p.name}, ${p.age}</h1>
      <p class="lead" style="margin:.2rem 0 1rem">${p.bio}</p>

      <div class="flex gap-1 wrap-f mb-3">
        <button class="btn btn--primary" data-act="like" data-id="${p.id}">${ICON.heart} Like</button>
        <button class="btn btn--gold" data-act="spark" data-id="${p.id}">${ICON.spark} Spark</button>
        <button class="btn btn--ghost" data-act="fav" data-id="${p.id}">${ICON.star} Favourite</button>
        <button class="btn btn--ghost btn--icon" id="moreBtn" aria-label="More">⋯</button>
      </div>

      <div class="panel mb-2">
        <h2 class="h3" style="font-size:1.2rem">About ${p.name}</h2>
        <div class="grid cols-2" style="gap:.6rem 1.4rem">
          ${facts.map(([k, v]) => `<div><div class="text-xs muted" style="text-transform:uppercase;letter-spacing:.1em">${k}</div><div>${v}</div></div>`).join('')}
        </div>
      </div>

      <div class="panel mb-2">
        <h2 class="h3" style="font-size:1.2rem">Interests</h2>
        <div class="pcard__tags">${p.interests.map(i => `<span class="tag">${i}</span>`).join('')}</div>
      </div>

      <div class="panel mb-2">
        <h2 class="h3" style="font-size:1.2rem">Compatibility insights</h2>
        <p class="text-xs muted mb-1">Insights help you decide — TUDO never claims to predict love.</p>
        <ul class="stack">${insights(p).map(t => `<li class="flex gap-1 items-center">${ICON.check}<span>${t}</span></li>`).join('')}</ul>
      </div>

      <div class="panel">
        <h2 class="h3" style="font-size:1.2rem">In ${p.name.split(' ')[0]}'s words</h2>
        ${promptA.map(([q, a]) => `<div class="mb-2"><div class="serif-accent gold">${q}</div><div>${a}</div></div>`).join('')}
      </div>
    </div>
  </div>`;

// gallery thumbs
root.addEventListener('click', (e) => {
  const t = e.target.closest('.thumb'); if (!t) return;
  document.getElementById('mainPhoto').style.backgroundImage = `url('${t.dataset.src}')`;
  root.querySelectorAll('.thumb').forEach(x => x.style.borderColor = 'var(--line)');
  t.style.borderColor = 'var(--tudo-gold)';
});

// actions
root.addEventListener('click', (e) => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const act = b.dataset.act;
  if (act === 'like') { const l = store.get('liked', []); if (!l.includes(p.id)) l.push(p.id); store.set('liked', l); toast('Liked!', 'heart'); }
  if (act === 'spark') toast('Spark sent ✨', 'spark');
  if (act === 'fav') { const f = store.get('favs', []); if (!f.includes(p.id)) f.push(p.id); store.set('favs', f); toast('Saved to favourites.', 'star'); }
});

// more menu → share/block/report
document.getElementById('moreBtn').addEventListener('click', () => {
  modal(`<h3 class="h3">More options</h3>
    <div class="stack mt-2">
      <button class="btn btn--ghost btn--block" id="shareP">🔗 Share profile internally</button>
      <button class="btn btn--ghost btn--block" id="blockP">🚫 Block ${p.name}</button>
      <button class="btn btn--rose btn--block" id="reportP">⚑ Report ${p.name}</button>
    </div>`);
  document.getElementById('shareP').onclick = () => { toast('Share link copied (demo).', 'check'); };
  document.getElementById('blockP').onclick = () => { const bl = store.get('blocked', []); bl.push(p.id); store.set('blocked', bl); toast(`${p.name} blocked. They can't contact you.`, 'shield'); };
  document.getElementById('reportP').onclick = () => reportModal();
});

function reportModal() {
  const reasons = ['Fake profile', 'Underage user', 'Harassment', 'Spam', 'Scam', 'Impersonation', 'Inappropriate content', 'Threatening behaviour', 'Other'];
  const { close } = modal(`<h3 class="h3">Report ${p.name}</h3>
    <p class="muted text-sm">Your safety comes before the match. Reports are confidential.</p>
    <div class="field mt-2"><label>Reason</label><select class="select" id="rReason">${reasons.map(r => `<option>${r}</option>`).join('')}</select></div>
    <div class="field"><label>Description <span class="muted">(optional)</span></label><textarea class="textarea" placeholder="Tell us what happened…"></textarea></div>
    <div class="field"><label>Evidence <span class="muted">(optional)</span></label><input class="input" type="file" /></div>
    <button class="btn btn--rose btn--block mt-1" id="rSubmit">Submit report</button>`);
  document.getElementById('rSubmit').onclick = () => { close(); toast('Thank you. Your report has been received.', 'shield'); };
}

})();
