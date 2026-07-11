/* ══════════════════════════════════════════════════════
   main.js — Phylidia & Guillaume — Mariage Bridgerton
══════════════════════════════════════════════════════ */

/* ── CONFIG ──────────────────────────────────────────── */
const LETTER_TEXT = `Chère lectrice,

Il se trouve que nous avons une annonce du plus haut intérêt à vous faire. 
Les familles Themèze et la famille de Phylidia ont le très grand plaisir 
de vous annoncer l'union prochaine de leurs enfants.

Guillaume et Phylidia, dont l'attachement est devenu, nous le croyons, 
l'un des secrets les moins bien gardés de la saison, ont enfin consenti 
à officialiser ce que le ton monde savait déjà.

Nous vous espérons en mesure de vous joindre à cette célébration 
et de partager avec nous ce jour de joie. 

Votre présence sera, à n'en point douter, l'ornement de la fête.

Avec toute notre affection,`;

const SIGNATURE = `Phylidia & Guillaume ♡`;

/* ── TYPEWRITER ──────────────────────────────────────── */
class Typewriter {
  constructor(element, text, speed = 28) {
    this.el = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
    this.done = false;
  }

  start(onDone) {
    this.onDone = onDone;
    this._tick();
  }

  _tick() {
    if (this.index >= this.text.length) {
      this.done = true;
      this.el.classList.add('typing-done');
      if (this.onDone) this.onDone();
      return;
    }
    this.el.textContent = this.text.slice(0, this.index + 1);
    this.index++;

    // Variable speed: pause on punctuation for realism
    let delay = this.speed;
    const char = this.text[this.index - 1];
    if (char === ',') delay = 120;
    else if (char === '.') delay = 200;
    else if (char === '\n') delay = 180;
    else delay = this.speed + Math.random() * 20 - 10;

    setTimeout(() => this._tick(), delay);
  }

  skip() {
    this.index = this.text.length;
    this.el.textContent = this.text;
    this.done = true;
    this.el.classList.add('typing-done');
    if (this.onDone) this.onDone();
  }
}

/* ── ENVELOPE INTERACTION ────────────────────────────── */
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const letter = document.getElementById('letter');
  const letterBody = document.getElementById('letter-body');
  const letterSig = document.getElementById('letter-signature');
  const scrollHint = document.getElementById('scroll-hint');

  if (!envelope) return;

  let opened = false;
  let tw = null;

  envelope.addEventListener('click', () => {
    if (opened) return;
    opened = true;

    // 1. Open flap + break seal
    envelope.classList.add('is-open');

    // 2. Show letter after flap opens
    setTimeout(() => {
      letter.classList.add('is-visible');
      // Start typewriter
      tw = new Typewriter(letterBody, LETTER_TEXT, 28);
      tw.start(() => {
        // Signature appears
        setTimeout(() => {
          letterSig.classList.add('visible');
        }, 400);
        // Scroll hint appears
        setTimeout(() => {
          scrollHint.classList.add('visible');
        }, 1000);
      });
    }, 600);
  });

  // Allow skipping by clicking the letter while typing
  if (letter) {
    letter.addEventListener('click', (e) => {
      if (tw && !tw.done) {
        tw.skip();
        setTimeout(() => letterSig.classList.add('visible'), 200);
        setTimeout(() => scrollHint.classList.add('visible'), 600);
      }
    });
  }
}

/* ── SCROLL REVEAL ───────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── RSVP FORM ───────────────────────────────────────── */
function initRSVP() {
  const form = document.getElementById('rsvp-form');
  const success = document.getElementById('rsvp-success');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    /* 
      TODO: Remplace ici par ton endpoint (Formspree, Netlify Forms, ou ton serveur)
      Exemple Formspree: fetch('https://formspree.io/f/TONID', { method:'POST', body: JSON.stringify(data), headers:{'Content-Type':'application/json'} })
    */

    // Simulation (à remplacer)
    await new Promise(r => setTimeout(r, 600));

    form.style.display = 'none';
    if (success) success.style.display = 'block';
    console.log('RSVP reçu:', data);
  });
}

/* ── GALLERY LIGHTBOX ─────────────────────────────────── */
function initGallery() {
  const items = document.querySelectorAll('.gallery-item[data-src]');
  if (!items.length) return;

  // Create lightbox
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.style.cssText = `
    display:none;position:fixed;inset:0;z-index:1000;
    background:rgba(20,14,6,0.92);
    align-items:center;justify-content:center;cursor:pointer;
  `;
  const lbImg = document.createElement('img');
  lbImg.style.cssText = 'max-width:90vw;max-height:88vh;object-fit:contain;border-radius:4px;';
  lb.appendChild(lbImg);
  document.body.appendChild(lb);

  items.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      lbImg.src = item.dataset.src;
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  lb.addEventListener('click', () => {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  });
}

/* ── COUNTDOWN (optional) ────────────────────────────── */
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;

  const weddingDate = new Date(el.dataset.date); // e.g. "2025-09-20"

  function update() {
    const now = new Date();
    const diff = weddingDate - now;
    if (diff <= 0) {
      el.innerHTML = '<span>C\'est aujourd\'hui !</span>';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    el.innerHTML = `
      <span>${days}<small>jours</small></span>
      <span>${hours}<small>heures</small></span>
      <span>${mins}<small>minutes</small></span>
      <span>${secs}<small>secondes</small></span>
    `;
  }
  update();
  setInterval(update, 1000);
}

/* ── SMOOTH SCROLL BUTTON ────────────────────────────── */
function initScrollDown() {
  const btn = document.getElementById('scroll-down-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.getElementById('page-content').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ── INIT ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initEnvelope();
  initScrollReveal();
  initRSVP();
  initGallery();
  initCountdown();
  initScrollDown();
});
