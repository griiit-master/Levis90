// AURELIUS — script.js

// ── Custom Cursor ──────────────────────────────
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mx = -100, my = -100;
let cx = -100, cy = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});

// Smooth cursor lag
(function tickCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
  requestAnimationFrame(tickCursor);
})();

// Hide cursor when off-window
document.addEventListener('mouseleave', () => { cursor.style.opacity = 0; });
document.addEventListener('mouseenter', () => { cursor.style.opacity = 1; });


// ── Navbar scroll state ────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


// ── Scroll Reveal ──────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in same parent
      const siblings = entry.target.parentElement.querySelectorAll('[data-reveal]');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 90;
      });
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));


// ── Smooth active link highlight ───────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));


// ── Floating WA — show after scroll ───────────
const floatWa = document.querySelector('.float-wa');
floatWa.style.opacity = '0';
floatWa.style.transform = 'translateY(20px) scale(0.9)';
floatWa.style.transition = 'opacity 0.5s, transform 0.5s';
floatWa.style.pointerEvents = 'none';

window.addEventListener('scroll', () => {
  const show = window.scrollY > 300;
  floatWa.style.opacity = show ? '1' : '0';
  floatWa.style.transform = show ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)';
  floatWa.style.pointerEvents = show ? 'auto' : 'none';
}, { passive: true });
