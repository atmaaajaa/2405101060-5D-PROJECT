/* ==========================================================================
   ATMA CREATIVE - PORTFOLIO FILTERING & DETAIL MODAL
   Dynamic DOM Filtering (Semua, UI/UX Design, IT Consulting) & Project Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioContainer = document.getElementById('portfolio-grid-container');
  const modalOverlay = document.getElementById('portfolio-detail-modal');
  const modalContent = document.getElementById('modal-project-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!portfolioContainer) return;

  // Render Portfolios based on category
  function renderPortfolios(category = 'Semua') {
    if (typeof DataStore === 'undefined') return;
    const items = DataStore.getPortfolios(category);

    if (items.length === 0) {
      portfolioContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
          <p style="color: var(--text-muted); font-size: 1.1rem;">Belum ada proyek dalam kategori ini.</p>
        </div>
      `;
      return;
    }

    portfolioContainer.innerHTML = items.map(item => `
      <div class="card portfolio-card" data-id="${item.id}" data-category="${item.category}">
        <div class="portfolio-img-wrapper">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="portfolio-overlay">
            <button class="btn btn-primary btn-sm view-detail-btn" data-id="${item.id}">
              Lihat Studi Kasus
            </button>
          </div>
        </div>
        <div class="portfolio-body">
          <div class="portfolio-meta">
            <span class="badge ${item.category === 'UI/UX Design' ? 'badge-primary' : 'badge-secondary'}">
              ${item.category}
            </span>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">${item.year || '2024'}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <div class="portfolio-footer-link view-detail-btn" data-id="${item.id}" style="cursor: pointer;">
            <span>Eksplorasi Detail</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click events for cards & buttons to open modal
    document.querySelectorAll('.view-detail-btn, .portfolio-card').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = el.getAttribute('data-id') || el.closest('.portfolio-card').getAttribute('data-id');
        openProjectModal(id);
      });
    });
  }

  // Filter tab buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderPortfolios(category);
    });
  });

  // Open Project Detail Modal
  function openProjectModal(id) {
    if (!modalOverlay || !modalContent) return;
    const project = DataStore.getPortfolioById(id);
    if (!project) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem;">
          <span class="badge ${project.category === 'UI/UX Design' ? 'badge-primary' : 'badge-secondary'}">${project.category}</span>
          <span style="font-size: 0.85rem; color: var(--text-muted);">${project.client || ''} • ${project.year || ''}</span>
        </div>
        <h2 style="font-size: 1.65rem; margin-bottom: 0.5rem;">${project.title}</h2>
        <p style="color: var(--text-body); font-size: 1.05rem;">${project.summary}</p>
      </div>

      <div style="margin-bottom: 1.75rem; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-light);">
        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: auto; display: block;">
      </div>

      <div style="display: grid; grid-template-columns: 1fr; gap: 1.25rem; margin-bottom: 1.75rem;">
        <div style="background: var(--bg-page); padding: 1.25rem; border-radius: var(--radius-md); border-left: 4px solid var(--primary);">
          <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary); margin-bottom: 0.4rem;">Latar Belakang &amp; Tantangan</h4>
          <p style="font-size: 0.92rem; margin: 0; color: var(--text-body);">${project.background || '-'}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-light); padding: 1rem; border-radius: var(--radius-sm);">
            <strong style="display: block; font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">Peran Agensi</strong>
            <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-main);">${project.role || '-'}</span>
          </div>
          <div style="background: var(--bg-surface); border: 1px solid var(--border-light); padding: 1rem; border-radius: var(--radius-sm);">
            <strong style="display: block; font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">Metodologi &amp; Tech Stack</strong>
            <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-main);">${project.methodology || '-'}</span>
          </div>
        </div>

        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; padding: 1.25rem; border-radius: var(--radius-md);">
          <h4 style="font-size: 0.95rem; color: #166534; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Hasil Terukur &amp; Metrik Dampak
          </h4>
          <p style="font-size: 0.92rem; margin: 0; color: #14532D; font-weight: 600;">${project.metrics || '-'}</p>
        </div>

        ${project.quote ? `
          <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-md); font-style: italic; color: var(--text-body);">
            ${project.quote}
            ${project.clientPerson ? `<div style="font-style: normal; font-weight: 600; font-size: 0.85rem; color: var(--text-main); margin-top: 0.5rem;">— ${project.clientPerson}</div>` : ''}
          </div>
        ` : ''}
      </div>

      <div style="text-align: right;">
        <a href="kontak.html" class="btn btn-primary btn-sm">Konsultasikan Proyek Serupa</a>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close Modal handlers
  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Initial render
  renderPortfolios('Semua');
});
