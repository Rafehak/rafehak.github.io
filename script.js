// utilities
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// typing effect
const typedEl = $('#typed');
const phrases = [
  'Backend Developer • Database Expert',
  'Oracle Database (Advanced) • PL/SQL',
  'Automation Engineer • Encryption Specialist'
];
let tIndex = 0, chIndex = 0, deleting = false;
function typeTick(){
  if(!typedEl) return;
  const cur = phrases[tIndex];
  if(!deleting){
    typedEl.textContent = cur.slice(0, chIndex + 1);
    chIndex++;
    if(chIndex === cur.length){ deleting = true; setTimeout(typeTick, 1200); return; }
  } else {
    typedEl.textContent = cur.slice(0, chIndex - 1);
    chIndex--;
    if(chIndex === 0){ deleting = false; tIndex = (tIndex + 1) % phrases.length; }
  }
  setTimeout(typeTick, deleting ? 40 : 60);
}
typeTick();

// nav toggle for mobile
const navToggle = $('#navToggle');
const navMenu = $('#navMenu');
navToggle && navToggle.addEventListener('click', () => {
  const is = navMenu.classList.toggle('show');
  navToggle.setAttribute('aria-expanded', is ? 'true' : 'false');
});

// modals
document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-open');
    const modal = document.getElementById('modal-' + id);
    if(modal) openModal(modal);
  });
});
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => {
  const modal = b.closest('.modal'); closeModal(modal);
}));
function openModal(modal){
  if(!modal) return;
  modal.setAttribute('aria-hidden','false');
  modal.focus();
  document.body.style.overflow = 'hidden';
}
function closeModal(modal){
  if(!modal) return;
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') document.querySelectorAll('.modal[aria-hidden="false"]').forEach(m => closeModal(m));
});

// tilt effect for profile-card (desktop)
const card = $('#profileCard');
if(card && !window.matchMedia('(pointer: coarse)').matches){
  card.addEventListener('mousemove', ev => {
    const r = card.getBoundingClientRect();
    const dx = (ev.clientX - (r.left + r.width/2)) / (r.width/2);
    const dy = (ev.clientY - (r.top + r.height/2)) / (r.height/2);
    card.style.transform = `rotateX(${(-dy*6).toFixed(2)}deg) rotateY(${(dx*6).toFixed(2)}deg) translateZ(4px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
}

// set year
const y = new Date().getFullYear();
const yEl = $('#year'); if(yEl) yEl.textContent = y;

// keyboard accessibility for project cards
$$('.project-card').forEach(pc => {
  pc.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') {
      const id = pc.getAttribute('data-project');
      const modal = document.getElementById('modal-' + id);
      if(modal) openModal(modal);
    }
  });
});
