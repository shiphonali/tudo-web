/* ============================================================
   TUDO — shared profile-card renderer + compatibility helpers
   ============================================================ */

/* Compatibility insights — honest, explainable (never "predicts love"). */
function insights(p, me = { interests: ['Travel', 'Food', 'Photography', 'Music', 'Books'], goal: 'Serious Relationship' }) {
  const out = [];
  const shared = p.interests.filter(i => me.interests.includes(i));
  if (shared.length) out.push(`You share ${shared.length} interest${shared.length > 1 ? 's' : ''}${shared.length ? ` — ${shared.slice(0, 2).join(', ')}` : ''}.`);
  if (p.goal === me.goal) out.push(`You are both looking for a ${p.goal.toLowerCase()}.`);
  if (p.interests.includes('Travel')) out.push('You both enjoy travelling.');
  if (p.langs && p.langs.includes('বাংলা')) out.push('You can both speak Bangla.');
  return out.slice(0, 3);
}

function verifyBadge(level) {
  if (!level) return '';
  return `<span class="badge-verify" title="Verified (level ${level})">${ICON.verify}Verified</span>`;
}

/* Full discovery card with action bar */
function profileCard(p, { compact = false, actions = true } = {}) {
  return `
  <article class="pcard" data-id="${p.id}">
    <a class="pcard__img" href="profile.html?id=${p.id}" style="background-image:url('${p.img}')" aria-label="View ${p.name}'s profile">
      <div class="pcard__top">
        ${p.verified ? verifyBadge(p.verified) : '<span></span>'}
        <span class="match-ring">${p.match}% Match</span>
      </div>
      <div class="pcard__body">
        <h3 class="pcard__name">${p.name}, ${p.age}</h3>
        <p class="pcard__meta">${p.city}, ${p.country} · ${p.job}</p>
        ${compact ? '' : `<div class="pcard__tags">
          <span class="tag">${p.goal}</span>
          ${p.interests.slice(0, 2).map(i => `<span class="tag">${i}</span>`).join('')}
        </div>`}
      </div>
    </a>
    ${actions ? `<div class="pcard__actions" style="padding:0 1rem 1.1rem">
      <button class="act act--pass" data-act="pass" data-id="${p.id}" aria-label="Pass on ${p.name}">${ICON.x}</button>
      <button class="act act--fav" data-act="fav" data-id="${p.id}" aria-label="Favourite ${p.name}">${ICON.star}</button>
      <button class="act act--like act--like" data-act="like" data-id="${p.id}" aria-label="Like ${p.name}">${ICON.heart}</button>
      <button class="act act--spark" data-act="spark" data-id="${p.id}" aria-label="Send Spark to ${p.name}">${ICON.spark}</button>
    </div>` : ''}
  </article>`;
}
