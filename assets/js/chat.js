/* classic build: scope isolated */
(function(){
/* ============================================================
   TUDO — messaging (demo). Wire to Supabase Realtime in prod.
   ============================================================ */

boot('');

const byId = id => PROFILES.find(p => p.id === id);
const listEl = document.getElementById('convList');
const mainEl = document.getElementById('chatMain');
const asideEl = document.getElementById('chatAside');
const chatRoot = document.getElementById('chatRoot');
let activeId = CONVERSATIONS[0].id;

/* Conversation list */
function renderList() {
  listEl.innerHTML = CONVERSATIONS.map(c => {
    const p = byId(c.pid);
    return `<div class="conv ${c.id === activeId ? 'active' : ''}" data-c="${c.id}">
      <div class="avatar ${c.online ? 'avatar--online' : ''}" style="background-image:url('${p.img}')"></div>
      <div style="flex:1;min-width:0">
        <div class="flex between"><strong>${p.name}</strong><span class="text-xs muted">${c.time}</span></div>
        <div class="flex between"><span class="text-sm muted" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:170px">${c.last}</span>${c.unread ? `<span class="chip" style="padding:.1rem .45rem;font-size:.68rem">${c.unread}</span>` : ''}</div>
      </div>
    </div>`;
  }).join('');
}

/* Active thread */
function renderThread() {
  const c = CONVERSATIONS.find(x => x.id === activeId);
  const p = byId(c.pid);
  mainEl.innerHTML = `
    <header class="flex items-center gap-1" style="padding:.9rem 1.4rem;border-bottom:1px solid var(--line)">
      <button class="btn btn--icon btn--ghost mobile-only" id="backList" aria-label="Back">${ICON.arrowL}</button>
      <a class="avatar ${c.online ? 'avatar--online' : ''}" href="profile.html?id=${p.id}" style="background-image:url('${p.img}')"></a>
      <div style="flex:1">
        <div class="flex items-center gap-1"><strong>${p.name}, ${p.age}</strong>${p.verified ? '<span class="badge-verify">'+ICON.verify+'</span>' : ''}</div>
        <div class="text-xs muted" id="statusLine">${c.online ? 'Online now' : 'Active ' + (p.active || 'recently')}</div>
      </div>
      <button class="btn btn--icon btn--ghost" id="callVoice" aria-label="Voice call">📞</button>
      <button class="btn btn--icon btn--ghost" id="callVideo" aria-label="Video call">🎥</button>
      <button class="btn btn--icon btn--ghost" id="chatMenu" aria-label="More">⋯</button>
    </header>
    <div class="msgs" id="msgs" role="log" aria-live="polite">
      <div class="center" style="margin:1rem 0"><span class="chip chip--gold">You matched — say hello 👋</span></div>
      ${c.thread.map(m => bubble(m)).join('')}
    </div>
    <div class="flex gap-1" style="padding:.4rem 1.4rem 0">
      <button class="btn btn--ghost btn--sm" id="starterBtn">${ICON.bolt} Need an opener?</button>
    </div>
    <form class="composer" id="composer">
      <button type="button" class="btn btn--icon btn--ghost" aria-label="Add image">🖼️</button>
      <button type="button" class="btn btn--icon btn--ghost" aria-label="Voice note">🎙️</button>
      <input class="input" id="msgInput" placeholder="Message ${p.name}…" autocomplete="off" style="flex:1" />
      <button class="btn btn--primary btn--icon" type="submit" aria-label="Send">${ICON.send}</button>
    </form>`;

  renderAside(p, c);
  wireThread(c, p);
  scrollMsgs();
  if (chatRoot) chatRoot.classList.add('viewing');
}

function bubble(m) {
  const status = m.from === 'me' ? ' · Read' : '';
  return `<div class="bubble bubble--${m.from === 'me' ? 'out' : 'in'}">${m.text}<span class="bubble__time">${m.time}${status}</span></div>`;
}
function scrollMsgs() { const m = document.getElementById('msgs'); if (m) m.scrollTop = m.scrollHeight; }

/* Right panel */
function renderAside(p, c) {
  if (!asideEl) return;
  asideEl.innerHTML = `
    <a href="profile.html?id=${p.id}" class="pcard" style="display:block">
      <div class="pcard__img" style="background-image:url('${p.img}');aspect-ratio:1"></div>
    </a>
    <h3 class="h3 mt-2" style="font-size:1.2rem">${p.name}, ${p.age}</h3>
    <p class="muted text-sm">${p.city}, ${p.country} · ${p.job}</p>
    <div class="match-ring mt-1">${c.match}% Match</div>
    <h4 class="mt-3" style="text-transform:uppercase;letter-spacing:.1em;font-size:.72rem;color:var(--tudo-gold-soft)">Compatibility insights</h4>
    <ul class="stack mt-1">${insights(p).map(t => `<li class="flex gap-1 text-sm">${ICON.check}<span>${t}</span></li>`).join('')}</ul>
    <h4 class="mt-3" style="text-transform:uppercase;letter-spacing:.1em;font-size:.72rem;color:var(--tudo-gold-soft)">Shared interests</h4>
    <div class="pcard__tags mt-1">${p.interests.slice(0, 4).map(i => `<span class="tag">${i}</span>`).join('')}</div>
    <button class="btn btn--ghost btn--block mt-3" id="shareDate">📍 Share My Date</button>`;
  document.getElementById('shareDate').onclick = shareDate;
}

function wireThread(c, p) {
  const form = document.getElementById('composer');
  const input = document.getElementById('msgInput');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim(); if (!text) return;
    // Message safety check (demo)
    if (/\b(hate|idiot|stupid|kill)\b/i.test(text)) {
      const { close } = modal(`<h3 class="h3">A quick check</h3><p class="muted">This message may come across differently than you intend. Would you like to review it?</p>
        <div class="flex gap-1 mt-2"><button class="btn btn--ghost btn--block" id="editMsg">Edit Message</button><button class="btn btn--rose btn--block" id="sendAny">Send Anyway</button></div>`);
      document.getElementById('editMsg').onclick = () => close();
      document.getElementById('sendAny').onclick = () => { close(); push(text); };
      return;
    }
    push(text);
  });
  const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  function push(text) {
    const m = document.getElementById('msgs');
    m.insertAdjacentHTML('beforeend', bubble({ from: 'me', text, time: now() }));
    input.value = ''; scrollMsgs();
    // typing + auto reply
    const t = document.createElement('div'); t.className = 'bubble bubble--in typing'; t.innerHTML = '<span></span><span></span><span></span>';
    m.appendChild(t); scrollMsgs();
    const replies = ['That\'s lovely to hear 😊', 'Haha totally agree!', 'Tell me more…', 'You have great taste.', 'I was just thinking the same thing.'];
    setTimeout(() => { t.remove(); m.insertAdjacentHTML('beforeend', bubble({ from: 'them', text: replies[Math.random() * replies.length | 0], time: now() })); scrollMsgs(); }, 1300 + Math.random() * 900);
  }

  document.getElementById('backList')?.addEventListener('click', () => chatRoot.classList.remove('viewing'));
  document.getElementById('starterBtn').onclick = () => starters(p);
  document.getElementById('callVoice').onclick = () => callUI(p, false);
  document.getElementById('callVideo').onclick = () => callUI(p, true);
  document.getElementById('chatMenu').onclick = () => {
    modal(`<h3 class="h3">${p.name}</h3><div class="stack mt-2">
      <button class="btn btn--ghost btn--block" onclick="this.closest('.modal-root').querySelector('[data-close]').click()">View profile</button>
      <button class="btn btn--ghost btn--block" id="dmDelete">Delete conversation</button>
      <button class="btn btn--ghost btn--block" id="dmBlock">Block ${p.name}</button>
      <button class="btn btn--rose btn--block" id="dmReport">Report</button></div>`);
    document.getElementById('dmReport').onclick = (e) => { e.target.closest('.modal-root').querySelector('[data-close]').click(); toast('Thank you. Your report has been received.', 'shield'); };
    document.getElementById('dmBlock').onclick = (e) => { e.target.closest('.modal-root').querySelector('[data-close]').click(); toast(`${p.name} blocked.`, 'shield'); };
    document.getElementById('dmDelete').onclick = (e) => { e.target.closest('.modal-root').querySelector('[data-close]').click(); toast('Conversation deleted.', 'check'); };
  };
}

function starters(p) {
  const opts = [
    p.interests.includes('Travel') ? `You both love travelling. Ask ${p.name} about their favourite destination.` : `Ask ${p.name} what their perfect weekend looks like.`,
    p.interests.includes('Food') || p.interests.includes('Cooking') ? `You both mentioned food — perfect conversation starter. Ask about their go-to comfort meal.` : `You share ${p.interests[0]} — ask what got them into it.`,
    `${p.name} is from ${p.origin}. Ask about a place there they always love visiting.`,
  ];
  const { close } = modal(`<h3 class="h3">${ICON.bolt} Conversation starters</h3>
    <p class="muted text-sm">Tap one to drop it in your message box. You always choose whether to send.</p>
    <div class="stack mt-2">${opts.map(o => `<button class="btn btn--ghost btn--block starter" style="text-align:left;justify-content:flex-start">${o}</button>`).join('')}</div>`);
  document.querySelectorAll('.starter').forEach(b => b.onclick = () => { document.getElementById('msgInput').value = b.textContent.trim(); close(); document.getElementById('msgInput').focus(); });
}

function callUI(p, video) {
  modal(`<div class="center">
    <div class="avatar" style="width:120px;height:120px;margin:0 auto 1rem;background-image:url('${p.img}')"></div>
    <h3 class="h3">${video ? 'Video' : 'Voice'} call with ${p.name}</h3>
    <p class="muted">Connecting… <span class="text-xs">(demo — no real call is placed)</span></p>
    <p class="text-xs muted">Personal phone numbers are never shared on TUDO.</p>
    <div class="flex gap-1" style="justify-content:center;margin-top:1.4rem">
      <button class="btn btn--ghost btn--icon" aria-label="Mute">🔇</button>
      ${video ? '<button class="btn btn--ghost btn--icon" aria-label="Camera">📷</button>' : ''}
      <button class="btn btn--rose btn--icon" data-close aria-label="End call">📵</button>
    </div></div>`, { wide: false });
}

function shareDate() {
  const { close } = modal(`<h3 class="h3">📍 Share My Date</h3>
    <p class="muted text-sm">Privately share your plans with someone you trust. Only they receive this.</p>
    <div class="field mt-2"><label>Trusted contact</label><input class="input" placeholder="Name or phone"/></div>
    <div class="grid cols-2" style="gap:1rem"><div class="field"><label>Venue</label><input class="input" placeholder="Café name"/></div><div class="field"><label>Person meeting</label><input class="input" value="Nadia"/></div></div>
    <div class="grid cols-2" style="gap:1rem"><div class="field"><label>Date</label><input class="input" type="date"/></div><div class="field"><label>Time</label><input class="input" type="time"/></div></div>
    <div class="field"><label>Note <span class="muted">(optional)</span></label><textarea class="textarea" placeholder="I'll check in by 10pm."></textarea></div>
    <button class="btn btn--primary btn--block" id="shareGo">Share safely</button>`);
  document.getElementById('shareGo').onclick = () => { close(); toast('Date details shared with your trusted contact.', 'shield'); };
}

listEl.addEventListener('click', (e) => {
  const c = e.target.closest('[data-c]'); if (!c) return;
  activeId = c.dataset.c; renderList(); renderThread();
});

renderList(); renderThread();

})();
