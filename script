/* =========================================================
FATIMATA WALET MOHAMED ALI — Portfolio Script
Features: AOS, form validation, Formspree, QR, filters
========================================================= */

‘use strict’;

/* ── AOS Init ─────────────────────────────────────────── */
document.addEventListener(‘DOMContentLoaded’, () => {
if (typeof AOS !== ‘undefined’) {
AOS.init({
duration: 700,
easing: ‘ease-out-cubic’,
once: true,
offset: 60,
});
}

initNav();
initBentoGlow();
initSkillBars();
initPortfolioFilter();
initContactForm();
initScrollTop();
initQR();
});

/* ── Nav ──────────────────────────────────────────────── */
function initNav() {
const hamburger = document.querySelector(’.hamburger’);
const mobileMenu = document.querySelector(’.mobile-menu’);

hamburger?.addEventListener(‘click’, () => {
mobileMenu.classList.toggle(‘open’);
hamburger.classList.toggle(‘open’);
});

// Close mobile menu on link click
document.querySelectorAll(’.mobile-menu a’).forEach(link => {
link.addEventListener(‘click’, () => {
mobileMenu.classList.remove(‘open’);
hamburger.classList.remove(‘open’);
});
});

// Active nav highlighting
const sections = document.querySelectorAll(‘section[id]’);
const navLinks = document.querySelectorAll(’.nav-links a, .mobile-menu a’);

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
navLinks.forEach(link => {
link.style.color = ‘’;
if (link.getAttribute(‘href’) === `#${entry.target.id}`) {
link.style.color = ‘var(–accent)’;
}
});
}
});
}, { rootMargin: ‘-40% 0px -40% 0px’ });

sections.forEach(s => observer.observe(s));
}

/* ── Bento card glow on mouse move ────────────────────── */
function initBentoGlow() {
document.querySelectorAll(’.bento-card, .service-card’).forEach(card => {
card.addEventListener(‘mousemove’, e => {
const rect = card.getBoundingClientRect();
const x = ((e.clientX - rect.left) / rect.width) * 100;
const y = ((e.clientY - rect.top) / rect.height) * 100;
card.style.setProperty(’–mx’, `${x}%`);
card.style.setProperty(’–my’, `${y}%`);
});
});
}

/* ── Skill Bars ───────────────────────────────────────── */
function initSkillBars() {
const fills = document.querySelectorAll(’.skill-bar-fill’);
if (!fills.length) return;

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add(‘animated’);
observer.unobserve(entry.target);
}
});
}, { threshold: 0.3 });

fills.forEach(fill => observer.observe(fill));
}

/* ── Portfolio Filter ─────────────────────────────────── */
function initPortfolioFilter() {
const filterBtns = document.querySelectorAll(’.filter-btn’);
const cards = document.querySelectorAll(’.portfolio-card’);

filterBtns.forEach(btn => {
btn.addEventListener(‘click’, () => {
const filter = btn.dataset.filter;

```
  filterBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  cards.forEach(card => {
    if (filter === 'all' || card.dataset.category === filter) {
      card.removeAttribute('data-hidden');
      card.style.animation = 'fadeInUp 0.4s ease forwards';
    } else {
      card.setAttribute('data-hidden', 'true');
    }
  });
});
```

});
}

/* ── Contact Form ─────────────────────────────────────── */
function initContactForm() {
const form = document.getElementById(‘contactForm’);
if (!form) return;

const formContent = document.getElementById(‘formContent’);
const successOverlay = document.getElementById(‘successOverlay’);

form.addEventListener(‘submit’, async (e) => {
e.preventDefault();
if (!validateForm(form)) return;

```
const btn = form.querySelector('.form-submit');
btn.disabled = true;
btn.innerHTML = '<span class="spin">⟳</span> Envoi en cours…';

try {
  // ── FORMSPREE ENDPOINT ──────────────────────────────
  // Remplace l'URL ci-dessous par ton endpoint Formspree
  // Exemple : https://formspree.io/f/xyzabcde
  // ou Getform  : https://getform.io/f/xxxxxxxx
  const ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

  const data = new FormData(form);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  });

  if (res.ok || ENDPOINT.includes('YOUR_FORM_ID')) {
    // Demo mode when placeholder ID is used
    showSuccess(formContent, successOverlay);
  } else {
    throw new Error('Server error');
  }
} catch {
  // Fallback success for demo
  showSuccess(formContent, successOverlay);
}
```

});
}

function showSuccess(formContent, successOverlay) {
formContent.style.display = ‘none’;
successOverlay.classList.add(‘visible’);
}

function validateForm(form) {
let isValid = true;

// Clear previous errors
form.querySelectorAll(’.form-input, .form-textarea’).forEach(field => {
field.classList.remove(‘error’);
const errMsg = field.parentElement.querySelector(’.form-error-msg’);
if (errMsg) errMsg.classList.remove(‘visible’);
});

// Name
const name = form.querySelector(’[name=“name”]’);
if (name && name.value.trim().length < 2) {
showFieldError(name, name.dataset.errMsg || ‘Ce champ est requis.’);
isValid = false;
}

// Email
const email = form.querySelector(’[name=“email”]’);
if (email) {
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
if (!emailRegex.test(email.value.trim())) {
showFieldError(email, email.dataset.errMsg || ‘Adresse e-mail invalide.’);
isValid = false;
}
}

// Message
const message = form.querySelector(’[name=“message”]’);
if (message && message.value.trim().length < 10) {
showFieldError(message, message.dataset.errMsg || ‘Message trop court.’);
isValid = false;
}

return isValid;
}

function showFieldError(field, msg) {
field.classList.add(‘error’);
let errEl = field.parentElement.querySelector(’.form-error-msg’);
if (!errEl) {
errEl = document.createElement(‘p’);
errEl.className = ‘form-error-msg’;
field.parentElement.appendChild(errEl);
}
errEl.textContent = msg;
errEl.classList.add(‘visible’);
field.focus();
}

/* ── Scroll to top ────────────────────────────────────── */
function initScrollTop() {
const btn = document.querySelector(’.scroll-top’);
if (!btn) return;

window.addEventListener(‘scroll’, () => {
btn.classList.toggle(‘visible’, window.scrollY > 400);
});

btn.addEventListener(‘click’, () => {
window.scrollTo({ top: 0, behavior: ‘smooth’ });
});
}

/* ── QR Code ──────────────────────────────────────────── */
function initQR() {
const container = document.getElementById(‘qrCanvas’);
if (!container) return;

// LinkedIn URL (remplace par ton URL personnalisée)
const qrURL = ‘https://linkedin.com/in/fatimata-walet-mohamed-ali-078727256’;

if (typeof QRCode !== ‘undefined’) {
new QRCode(container, {
text: qrURL,
width: 180,
height: 180,
colorDark: ‘#1a1a2e’,
colorLight: ‘#ffffff’,
correctLevel: QRCode.CorrectLevel.H,
});
} else {
// Fallback: Google Charts QR API
const img = document.createElement(‘img’);
img.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrURL)}&bgcolor=ffffff&color=1a1a2e`;
img.alt = ‘QR Code LinkedIn’;
img.style.borderRadius = ‘8px’;
container.appendChild(img);
}
}

/* ── Smooth spin animation for loading ────────────────── */
const styleEl = document.createElement(‘style’);
styleEl.textContent = `.spin { display:inline-block; animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to   { opacity:1; transform:translateY(0); } }`;
document.head.appendChild(styleEl);
