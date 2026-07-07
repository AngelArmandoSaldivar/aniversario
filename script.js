// ── PARTÍCULAS ──
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: -Math.random() * 0.5 - 0.2,
    alpha: Math.random() * 0.5 + 0.1,
    heart: Math.random() > 0.85
  };
}

for (let i = 0; i < 80; i++) particles.push(createParticle());

function drawHeart(x, y, size, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#c9a84c';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - size, x - size * 2, y - size, x - size * 2, y + size * 0.5);
  ctx.bezierCurveTo(x - size * 2, y + size * 1.5, x, y + size * 2.5, x, y + size * 3);
  ctx.bezierCurveTo(x, y + size * 2.5, x + size * 2, y + size * 1.5, x + size * 2, y + size * 0.5);
  ctx.bezierCurveTo(x + size * 2, y - size, x, y - size, x, y);
  ctx.fill();
  ctx.restore();
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    if (p.heart) {
      drawHeart(p.x, p.y, p.r * 1.5, p.alpha);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
      ctx.fill();
    }
    p.x += p.dx;
    p.y += p.dy;
    if (p.y < -10) particles[i] = createParticle();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ── CONTADOR ──
const now = new Date();
const weddingDate = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());

function updateTimer() {
  const n = new Date();
  const diff = n - weddingDate;
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById('years').textContent = 2;
  document.getElementById('months').textContent = 0;
  document.getElementById('days').textContent = 0;
  document.getElementById('hours').textContent = n.getHours();
}
updateTimer();
setInterval(updateTimer, 60000);

// ── FRASES ROTATIVAS ──
const quotes = [
  'Dos años de risas, de crecer juntos, de elegirte cada día.',
  'Contigo aprendí que el amor no es un destino, es el camino.',
  'Cada mañana a tu lado es el mejor regalo que me da la vida.',
  'Eres mi persona favorita en todo el universo.',
  'Dos años y aún me pones nervioso cuando sonríes.'
];
let qi = 0;
const qEl = document.getElementById('quote-text');

setInterval(() => {
  qEl.style.opacity = 0;
  setTimeout(() => {
    qi = (qi + 1) % quotes.length;
    qEl.textContent = quotes[qi];
    qEl.style.opacity = 1;
  }, 500);
}, 4000);

// ── LIGHTBOX ──
const photoQuotes = [
  '"Contigo, cada momento se vuelve eterno."',
  '"Tu sonrisa es mi lugar favorito en el mundo."',
  '"Dos años eligiéndote, y lo haría mil veces más."',
  '"Eres la mejor historia que me ha pasado."',
  '"Juntos somos exactamente lo que necesitamos ser."',
  '"Mi corazón te reconoció antes de conocerte."',
  '"Cada foto contigo es un tesoro que guardo para siempre."',
  '"Eres mi calma y mi aventura al mismo tiempo."',
  '"Gracias por hacer de cada día algo especial."',
  '"Contigo aprendí que el amor se construye cada día."',
  '"Eres mi persona, hoy y siempre."'
];

const images = Array.from(document.querySelectorAll('.gallery-item img')).map(i => i.src);
let current = 0;
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbQuote = document.getElementById('lb-quote');

document.querySelectorAll('.gallery-item').forEach((item, i) => {
  // Frase en overlay al hacer hover
  const overlay = item.querySelector('.gallery-overlay');
  overlay.innerHTML = `<span class="overlay-phrase">${photoQuotes[i]}</span>`;

  item.addEventListener('click', () => {
    current = i;
    lbImg.src = images[i];
    lbQuote.textContent = photoQuotes[i];
    lb.classList.remove('hidden');
  });
});

document.querySelector('.lb-close').addEventListener('click', () => lb.classList.add('hidden'));
document.querySelector('.lb-prev').addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  lbImg.src = images[current];
  lbQuote.textContent = photoQuotes[current];
});
document.querySelector('.lb-next').addEventListener('click', () => {
  current = (current + 1) % images.length;
  lbImg.src = images[current];
  lbQuote.textContent = photoQuotes[current];
});
lb.addEventListener('click', e => { if (e.target === lb) lb.classList.add('hidden'); });

document.addEventListener('keydown', e => {
  if (lb.classList.contains('hidden')) return;
  if (e.key === 'ArrowRight') document.querySelector('.lb-next').click();
  if (e.key === 'ArrowLeft') document.querySelector('.lb-prev').click();
  if (e.key === 'Escape') lb.classList.add('hidden');
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.counter-box, .gallery-item, .reason-card, .quote-card');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));
