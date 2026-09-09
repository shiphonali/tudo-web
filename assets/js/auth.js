/* classic build: scope isolated */
(function(){
/* ============================================================
   TUDO — auth (login + register validation), demo mode
   ============================================================ */

boot('');

// Fill standalone logo marks (auth pages have no rendered nav)
document.querySelectorAll('.logo__mark:empty').forEach(m => m.innerHTML = ICON.logo);

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
function setError(field, msg) {
  const wrap = field.closest('.field'); if (!wrap) return;
  wrap.classList.toggle('field--error', !!msg);
  const e = wrap.querySelector('.error-msg'); if (e) e.textContent = msg || '';
  return !msg;
}
function ok(field) { const w = field.closest('.field'); w && w.classList.add('field--ok'); return true; }

/* ---------- LOGIN ---------- */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.email, pass = loginForm.password;
    let valid = true;
    valid = setError(email, isEmail(email.value) ? '' : 'Enter a valid email address.') && valid;
    valid = setError(pass, pass.value.length >= 6 ? '' : 'Password must be at least 6 characters.') && valid;
    if (!valid) return;
    const btn = loginForm.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Signing in…';
    store.set('session', { email: email.value, name: 'Aria', loggedIn: true });
    setTimeout(() => { window.location.href = 'discover.html'; }, 700);
  });
  document.querySelectorAll('.pw-toggle').forEach(t => t.addEventListener('click', () => {
    const inp = t.parentElement.querySelector('input');
    inp.type = inp.type === 'password' ? 'text' : 'password';
    t.setAttribute('aria-pressed', inp.type === 'text');
  }));
}

/* ---------- REGISTER (multi-step) ---------- */
const reg = document.getElementById('registerForm');
if (reg) {
  const steps = [...reg.querySelectorAll('.reg-step')];
  const dots = [...document.querySelectorAll('.step-dot')];
  const stepLabel = document.getElementById('stepLabel');
  const backBtn = document.getElementById('regBack');
  const nextBtn = document.getElementById('regNext');
  let i = 0;
  const labels = ['Account', 'Location', 'Intent', 'Photos', 'About You', 'Preferences', 'Verify', 'Privacy'];

  const show = (n) => {
    i = Math.max(0, Math.min(steps.length - 1, n));
    steps.forEach((s, k) => s.hidden = k !== i);
    dots.forEach((d, k) => { d.classList.toggle('done', k < i); d.classList.toggle('active', k === i); });
    stepLabel.textContent = `Step ${i + 1} of ${steps.length} — ${labels[i]}`;
    backBtn.style.visibility = i === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = i === steps.length - 1 ? 'Create my profile' : 'Continue';
    reg.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  function validateStep() {
    const cur = steps[i]; let valid = true;
    cur.querySelectorAll('[required]').forEach(f => {
      let msg = '';
      if (!f.value.trim()) msg = 'This field is required.';
      else if (f.type === 'email' && !isEmail(f.value)) msg = 'Enter a valid email.';
      else if (f.name === 'password' && f.value.length < 6) msg = 'At least 6 characters.';
      else if (f.name === 'confirm' && f.value !== cur.querySelector('[name=password]').value) msg = 'Passwords do not match.';
      valid = setError(f, msg) && valid;
    });
    // Age 18+ checkbox on step 1
    const ageChk = cur.querySelector('#age18');
    if (ageChk && !ageChk.checked) { valid = false; toast('You must confirm you are 18 or older.', 'shield'); }
    // DOB 18+
    const dob = cur.querySelector('[name=dob]');
    if (dob && dob.value) {
      const age = (Date.now() - new Date(dob.value)) / 3.15576e10;
      if (age < 18) { valid = setError(dob, 'You must be at least 18 to join TUDO.') && false; }
    }
    return valid;
  }

  nextBtn.addEventListener('click', () => {
    if (!validateStep()) return;
    if (i === steps.length - 1) {
      nextBtn.disabled = true; nextBtn.textContent = 'Creating…';
      const data = Object.fromEntries(new FormData(reg));
      store.set('session', { name: data.firstName || 'You', email: data.email, loggedIn: true });
      store.set('profileDraft', data);
      setTimeout(() => window.location.href = 'onboarding.html', 800);
      return;
    }
    show(i + 1);
  });
  backBtn.addEventListener('click', () => show(i - 1));
  show(0);

  // photo upload preview (demo)
  const drop = document.getElementById('photoDrop');
  const grid = document.getElementById('photoGrid');
  if (drop) {
    const addPhoto = (src) => {
      const cell = document.createElement('div');
      cell.className = 'photo-cell';
      cell.style.cssText = 'position:relative;aspect-ratio:3/4;border-radius:14px;background:#0d1d17 center/cover no-repeat;border:1px solid var(--line);overflow:hidden';
      cell.style.backgroundImage = `url('${src}')`;
      cell.innerHTML = `<button type="button" class="modal__close" style="top:6px;right:6px;width:28px;height:28px" aria-label="Remove">${ICON.x}</button>
        <span class="chip" style="position:absolute;bottom:6px;left:6px;font-size:.66rem">Primary</span>`;
      cell.querySelector('button').addEventListener('click', () => cell.remove());
      grid.insertBefore(cell, drop);
    };
    const handle = (files) => [...files].slice(0, 6).forEach(f => { const r = new FileReader(); r.onload = () => addPhoto(r.result); r.readAsDataURL(f); });
    const input = drop.querySelector('input[type=file]');
    drop.addEventListener('click', () => input.click());
    input.addEventListener('change', () => handle(input.files));
    drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.style.borderColor = 'var(--tudo-green)'; });
    drop.addEventListener('dragleave', () => drop.style.borderColor = '');
    drop.addEventListener('drop', (e) => { e.preventDefault(); drop.style.borderColor = ''; handle(e.dataTransfer.files); });
  }

  // OTP demo
  document.getElementById('sendOtp')?.addEventListener('click', () => toast('Demo OTP sent: 4821 (any code works here).', 'lock'));
}

})();
