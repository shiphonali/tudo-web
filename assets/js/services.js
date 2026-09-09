/* classic build: scope isolated */
(function(){
/* ============================================================
   TUDO — service / adaptor layer
   ------------------------------------------------------------
   Single seam between the UI and the backend. Today every method
   runs in DEMO MODE against localStorage + the fictional dataset.
   In production, swap each method body for a Supabase (or Firebase)
   call — the function signatures stay identical, so pages don't change.

   SECURITY: never place private API keys in this file. The anon/
   publishable key is safe client-side ONLY with Row Level Security
   enabled. Service-role keys and payments run in Edge Functions.

   Example production wiring (commented):
   // import { createClient } from '@supabase/supabase-js'
   // const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
   ============================================================ */

const DEMO = true;               // flip to false once a backend is connected
const delay = (ms = 200) => new Promise(r => setTimeout(r, ms));

/* ---------- Auth ---------- */
const authService = {
  async signUp(payload) {
    if (DEMO) { await delay(); const s = { id: 'u_' + Date.now(), name: payload.firstName, email: payload.email, loggedIn: true }; store.set('session', s); return s; }
    // return supabase.auth.signUp({ email, password })
  },
  async signIn(email) {
    if (DEMO) { await delay(); const s = { id: 'u_demo', name: 'Aria', email, loggedIn: true }; store.set('session', s); return s; }
    // return supabase.auth.signInWithPassword({ email, password })
  },
  async signOut() { store.del('session'); },
  currentUser() { return store.get('session'); },
  onAuthChange(/* cb */) { /* supabase.auth.onAuthStateChange(cb) */ },
};

/* ---------- Profiles ---------- */
const profileService = {
  async list(filters = {}) {
    if (DEMO) { await delay(); return PROFILES.filter(p =>
      (!filters.country || p.country === filters.country) &&
      (!filters.goal || p.goal === filters.goal)); }
    // return supabase.from('profiles').select('*')...
  },
  async get(id) { if (DEMO) { await delay(); return PROFILES.find(p => p.id === id); } },
  async update(patch) { if (DEMO) { store.set('profileDraft', { ...store.get('profileDraft', {}), ...patch }); return patch; } },
  completion() { const d = store.get('profileDraft', {}); const fields = ['bio', 'occupation', 'education', 'interests', 'food']; const done = fields.filter(f => d[f]).length; return Math.min(100, 40 + done * 12); },
};

/* ---------- Matching ---------- */
const matchService = {
  async like(id) { const l = store.get('liked', []); if (!l.includes(id)) l.push(id); store.set('liked', l); return { mutual: Math.random() < 0.4 }; },
  async spark(id) { return { sent: true, id }; },
  async pass(id) { const p = store.get('passed', []); p.push(id); store.set('passed', p); },
  async favourite(id) { const f = store.get('favs', []); if (!f.includes(id)) f.push(id); store.set('favs', f); },
  async matches() { if (DEMO) return store.get('matches', []).map(id => PROFILES.find(p => p.id === id)).filter(Boolean); },
  async unmatch(id) { store.set('matches', store.get('matches', []).filter(m => m !== id)); },
};

/* ---------- Chat ---------- */
const chatService = {
  async conversations() { if (DEMO) { await delay(); return CONVERSATIONS; } },
  async send(convId, text) { if (DEMO) { await delay(120); return { id: 'm_' + Date.now(), text, from: 'me', status: 'sent' }; } },
  subscribe(/* convId, cb */) { /* supabase.channel('messages').on('postgres_changes', ..., cb).subscribe() */ },
};

/* ---------- Notifications ---------- */
const notificationService = {
  async list() { if (DEMO) return NOTIFICATIONS; },
  async markAllRead() { NOTIFICATIONS.forEach(n => n.unread = false); },
};

/* ---------- Verification ---------- */
const verificationService = {
  async requestEmail() { return { sent: true }; },
  async verifyPhone(/* code */) { await delay(); return { verified: true, level: 2 }; },
  async submitSelfie(/* blob */) { await delay(); return { status: 'pending' }; }, // human-reviewed in prod
};

/* ---------- Payments (never store card data client-side) ---------- */
const paymentService = {
  async checkout(plan, provider = 'stripe') {
    // In production: call an Edge Function that creates a provider checkout
    // session (Stripe / Apple Pay / Google Pay / bKash / Nagad) and redirect.
    if (DEMO) { await delay(); store.set('plan', plan); return { ok: true, provider, plan }; }
  },
};

/* ---------- Moderation ---------- */
const moderationService = {
  async report(payload) { const r = store.get('reports', []); r.push({ ...payload, at: Date.now() }); store.set('reports', r); return { received: true }; },
  async block(id) { const b = store.get('blocked', []); if (!b.includes(id)) b.push(id); store.set('blocked', b); },
  // Automated detection assists a HUMAN queue; no automated system makes
  // irreversible high-impact decisions alone, and appeals are always available.
};

const stories = () => STORIES;

})();
