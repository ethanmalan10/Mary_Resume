document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const exp = experiences.find(e => e.id === id);

  if (!exp) {
    window.location.href = 'index.html';
    return;
  }

  document.title = `${exp.company} — Mary Burchett`;
  renderHeader(exp);
  renderBody(exp);
  initNav();
});

function renderHeader(exp) {
  const header = document.getElementById('expHeader');
  header.style.setProperty('--exp-accent', exp.accent);

  header.innerHTML = `
    <div class="exp-accent-bar" style="background:${exp.accent}"></div>
    <div class="exp-header-content">
      <span class="exp-category-label">${exp.category}</span>
      <h1 class="exp-title">${exp.company}</h1>
      <p class="exp-role-large">${exp.role}</p>
      <div class="exp-meta-row">
        <span class="exp-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${exp.location}
        </span>
        <span class="exp-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${exp.dates}
        </span>
      </div>
      ${exp.subRoles ? `
        <div class="sub-roles">
          <span class="sub-roles-label">Roles included</span>
          <div class="sub-roles-list">
            ${exp.subRoles.map(r => `
              <div class="sub-role">
                <strong>${r.company}</strong>
                <span>${r.dates}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function renderBody(exp) {
  const body = document.getElementById('expBody');

  body.innerHTML = `
    <div class="exp-section">
      <h2 class="exp-section-title">Overview</h2>
      <p class="exp-overview-text">${exp.summary}</p>
    </div>

    <div class="exp-section">
      <h2 class="exp-section-title">Key Highlights</h2>
      <div class="highlights-row">
        ${exp.highlights.map(h => `
          <div class="highlight-pill" style="border-color:${exp.accent}; color:${exp.accent}">
            ${h}
          </div>
        `).join('')}
      </div>
    </div>

    <div class="exp-section">
      <h2 class="exp-section-title">Responsibilities &amp; Achievements</h2>
      <ul class="responsibilities-list" id="responsibilityList">
        ${exp.bullets.map((b, i) => `
          <li class="responsibility-item" style="transition-delay:${i * 0.06}s">
            <span class="bullet-dot" style="background:${exp.accent}"></span>
            <span>${b}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div class="exp-section">
      <h2 class="exp-section-title">Other Experience</h2>
      <div class="other-exp-grid">
        ${experiences
          .filter(e => e.id !== exp.id)
          .slice(0, 3)
          .map(e => `
            <a href="experience.html?id=${e.id}" class="other-exp-card" style="--other-accent:${e.accent}">
              <span class="other-cat">${e.category}</span>
              <strong class="other-company">${e.company}</strong>
              <span class="other-role">${e.role}</span>
              <span class="other-arrow">&#8594;</span>
            </a>
          `).join('')}
      </div>
    </div>
  `;

  // Staggered animate-in for list items
  requestAnimationFrame(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.responsibility-item, .exp-section').forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  });
}

function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}
