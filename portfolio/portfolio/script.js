/* ============================================================
   DEVELOPER PORTFOLIO — script.js
   ------------------------------------------------------------
   Handles:
   1. Sticky navbar on scroll
   2. Mobile menu toggle
   3. Smooth scroll + closing mobile menu when a link is clicked
   4. Scroll-reveal animations
   5. Back-to-top button
   6. Contact form (basic validation)
   7. Current year in footer
   ============================================================ */

// --- 1. Sticky navbar -----------------------------------------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // Back to top
  const btt = document.getElementById('backToTop');
  if (window.scrollY > 400) btt.classList.add('show');
  else btt.classList.remove('show');
});

// --- 2. Mobile menu toggle ------------------------------------
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});

// --- 3. Close mobile menu on link click -----------------------
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
  });
});

// --- 4. Scroll reveal animations ------------------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- 5. Back to top button ------------------------------------
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- 6. Contact form (basic) ----------------------------------
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    status.style.color = '#f87171';
    status.textContent = 'Please fill in all fields.';
    return;
  }
  // Simple email check
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    status.style.color = '#f87171';
    status.textContent = 'Please enter a valid email address.';
    return;
  }

  // EDIT: hook this up to your backend / email service (e.g. EmailJS, Formspree)
  status.style.color = '#22c55e';
  status.textContent = `Thanks ${name}! Your message has been sent.`;
  form.reset();
});

// --- 7. Footer year -------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();
