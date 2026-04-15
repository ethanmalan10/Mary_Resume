document.addEventListener('DOMContentLoaded', () => {
  renderExperienceGrid();
  initScrollEffects();
  initNav();
  initHeroParallax();
});

function renderExperienceGrid() {
  const grid = document.getElementById('experienceGrid');
  if (!grid) return;

  experiences.forEach((exp, i) => {
    const card = document.createElement('article');
    card.className = 'exp-card fade-in';
    card.style.setProperty('--card-accent', exp.accent);
    card.style.transitionDelay = `${i * 0.08}s`;

    card.innerHTML = `
      <div class="exp-card-inner">
        <div class="exp-card-header">
          <span class="exp-category">${exp.category}</span>
          <span class="exp-dates">${exp.dates}</span>
        </div>
        <h3 class="exp-company">${exp.company}</h3>
        <p class="exp-role-sub">${exp.role} &middot; ${exp.location}</p>
        <p class="exp-summary">${exp.summary}</p>
        <div class="exp-highlights">
          ${exp.highlights.map(h => `<span class="highlight-tag">${h}</span>`).join('')}
        </div>
        <a href="experience.html?id=${exp.id}" class="exp-link">
          View Full Experience <span class="arrow">&#8594;</span>
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
}

function initScrollEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initHeroParallax() {
  const heroImg = document.querySelector('.hero-img');
  if (!heroImg) return;
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    heroImg.style.transform = `translateY(${offset * 0.25}px)`;
  }, { passive: true });
}
