/* ==========================================================================
   ATMA CREATIVE - CMS ADMIN PANEL MANAGEMENT SCRIPT
   Handles Dashboard Analytics, CRUD Tables, Inbox Statuses, and Admin Actions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile sidebar toggle
  const mobileToggle = document.getElementById('admin-mobile-toggle');
  const sidebar = document.querySelector('.admin-sidebar');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Bind logout buttons
  const logoutButtons = document.querySelectorAll('.logout-btn');
  logoutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Apakah Anda yakin ingin keluar dari panel admin?')) {
        Auth.logout();
      }
    });
  });

  // Display user name in sidebar
  const currentUser = Auth.getCurrentUser();
  if (currentUser) {
    const adminNameEl = document.getElementById('admin-user-name');
    if (adminNameEl) adminNameEl.textContent = currentUser.name;
  }

  // Update badge for unread messages in sidebar
  const sidebarUnreadBadge = document.getElementById('sidebar-unread-count');
  if (sidebarUnreadBadge && typeof DataStore !== 'undefined') {
    const analytics = DataStore.getAnalytics();
    if (analytics.unreadMessages > 0) {
      sidebarUnreadBadge.textContent = analytics.unreadMessages;
      sidebarUnreadBadge.style.display = 'inline-flex';
    } else {
      sidebarUnreadBadge.style.display = 'none';
    }
  }

  // ----------------------------------------------------
  // PAGE SPECIFIC LOGIC
  // ----------------------------------------------------

  // 1. DASHBOARD PAGE
  const statUnreadEl = document.getElementById('stat-unread-count');
  if (statUnreadEl) {
    const analytics = DataStore.getAnalytics();
    statUnreadEl.textContent = analytics.unreadMessages;
    document.getElementById('stat-services-count').textContent = analytics.totalServices;
    document.getElementById('stat-portfolio-count').textContent = analytics.totalPortfolios;
    document.getElementById('stat-team-count').textContent = analytics.totalTeam;

    // Render Recent Messages Table
    const recentMessagesBody = document.getElementById('recent-messages-tbody');
    if (recentMessagesBody) {
      const messages = DataStore.getMessages().slice(0, 5);
      if (messages.length === 0) {
        recentMessagesBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">Belum ada pesan masuk.</td></tr>`;
      } else {
        recentMessagesBody.innerHTML = messages.map(m => `
          <tr>
            <td><strong>${escapeHtml(m.name)}</strong><br><span style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(m.email)}</span></td>
            <td><span class="badge badge-secondary">${escapeHtml(m.service)}</span></td>
            <td>${formatDate(m.date)}</td>
            <td>${renderStatusBadge(m.status)}</td>
            <td>
              <a href="pesan.html?id=${m.id}" class="btn btn-secondary btn-sm">Buka Pesan</a>
            </td>
          </tr>
        `).join('');
      }
    }
  }

  // 2. INBOX / PESAN MASUK PAGE
  const inboxTableBody = document.getElementById('inbox-messages-tbody');
  if (inboxTableBody) {
    renderInboxTable();

    // Check if URL has ?id= to open specific message
    const urlParams = new URLSearchParams(window.location.search);
    const msgId = urlParams.get('id');
    if (msgId) {
      openMessageModal(msgId);
    }
  }

  function renderInboxTable() {
    if (!inboxTableBody) return;
    const messages = DataStore.getMessages();
    if (messages.length === 0) {
      inboxTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 3rem;">Kotak masuk pesan kosong.</td></tr>`;
      return;
    }

    inboxTableBody.innerHTML = messages.map((m, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>
          <strong>${escapeHtml(m.name)}</strong><br>
          <span style="font-size: 0.82rem; color: var(--text-muted);">${escapeHtml(m.email)} • ${escapeHtml(m.phone)}</span>
        </td>
        <td><span class="badge ${m.service.includes('UI/UX') ? 'badge-primary' : 'badge-secondary'}">${escapeHtml(m.service)}</span></td>
        <td style="max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(m.message)}</td>
        <td>${renderStatusBadge(m.status)}</td>
        <td>
          <div class="table-actions">
            <button class="btn btn-secondary btn-sm view-msg-btn" data-id="${m.id}">Detail</button>
            <button class="btn btn-outline btn-sm delete-msg-btn" data-id="${m.id}" style="color: #DC2626; border-color: #FECACA;">Hapus</button>
          </div>
        </td>
      </tr>
    `).join('');

    // Attach actions
    document.querySelectorAll('.view-msg-btn').forEach(btn => {
      btn.addEventListener('click', () => openMessageModal(btn.dataset.id));
    });
    document.querySelectorAll('.delete-msg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Hapus pesan ini secara permanen?')) {
          DataStore.deleteMessage(btn.dataset.id);
          renderInboxTable();
          updateSidebarBadge();
        }
      });
    });
  }

  function openMessageModal(id) {
    const msg = DataStore.getMessages().find(m => m.id === id);
    if (!msg) return;

    // Automatically mark as "Dibaca" if currently "Baru"
    if (msg.status === 'Baru') {
      DataStore.updateMessageStatus(id, 'Dibaca');
      msg.status = 'Dibaca';
      renderInboxTable();
      updateSidebarBadge();
    }

    const modal = document.getElementById('message-detail-modal');
    const container = document.getElementById('message-modal-body');
    if (!modal || !container) return;

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
        <div>
          <h3 style="font-size: 1.25rem; margin-bottom: 0.25rem;">${escapeHtml(msg.name)}</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">
            Email: <a href="mailto:${escapeHtml(msg.email)}" style="color: var(--primary);">${escapeHtml(msg.email)}</a> |
            WhatsApp: <a href="https://wa.me/${escapeHtml(msg.phone.replace(/[^0-9]/g, ''))}" target="_blank" style="color: #10B981; font-weight: 600;">${escapeHtml(msg.phone)}</a>
          </p>
        </div>
        <div>${renderStatusBadge(msg.status)}</div>
      </div>

      <div style="background: var(--bg-page); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border: 1px solid var(--border-light);">
        <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">Layanan Yang Diminati</div>
        <div style="font-weight: 600; color: var(--text-main); margin-bottom: 1rem;">${escapeHtml(msg.service)}</div>

        <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">Isi Pesan Konsultasi</div>
        <div style="color: var(--text-body); line-height: 1.6; white-space: pre-line;">${escapeHtml(msg.message)}</div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <label style="font-size: 0.88rem; font-weight: 600;">Ubah Status:</label>
          <select id="update-status-select" class="form-control" style="width: auto; padding: 0.4rem 0.8rem; font-size: 0.85rem;">
            <option value="Baru" ${msg.status === 'Baru' ? 'selected' : ''}>Baru</option>
            <option value="Dibaca" ${msg.status === 'Dibaca' ? 'selected' : ''}>Dibaca</option>
            <option value="Selesai" ${msg.status === 'Selesai' ? 'selected' : ''}>Selesai</option>
          </select>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <a href="https://wa.me/${escapeHtml(msg.phone.replace(/[^0-9]/g, ''))}?text=Halo%20${encodeURIComponent(msg.name)},%20terima%20kasih%20telah%20menghubungi%20Atma%20Creative." target="_blank" class="btn btn-primary btn-sm" style="background-color: #25D366; border-color: #25D366;">
            Balas via WhatsApp
          </a>
        </div>
      </div>
    `;

    modal.classList.add('active');

    // Status change listener
    const statusSelect = document.getElementById('update-status-select');
    if (statusSelect) {
      statusSelect.addEventListener('change', () => {
        DataStore.updateMessageStatus(id, statusSelect.value);
        renderInboxTable();
        updateSidebarBadge();
      });
    }
  }

  // 3. KELOLA PROFIL PAGE
  const profileForm = document.getElementById('profile-manage-form');
  if (profileForm) {
    const prof = DataStore.getProfile();
    // Fill form
    document.getElementById('prof-brandName').value = prof.brandName || '';
    document.getElementById('prof-tagline').value = prof.tagline || '';
    document.getElementById('prof-history').value = prof.history || '';
    document.getElementById('prof-vision').value = prof.vision || '';
    document.getElementById('prof-email').value = prof.contact?.email || '';
    document.getElementById('prof-phone').value = prof.contact?.phone || '';
    document.getElementById('prof-address').value = prof.contact?.address || '';
    document.getElementById('prof-instagram').value = prof.socials?.instagram || '';
    document.getElementById('prof-linkedin').value = prof.socials?.linkedin || '';

    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        ...prof,
        brandName: document.getElementById('prof-brandName').value.trim(),
        tagline: document.getElementById('prof-tagline').value.trim(),
        history: document.getElementById('prof-history').value.trim(),
        vision: document.getElementById('prof-vision').value.trim(),
        contact: {
          ...prof.contact,
          email: document.getElementById('prof-email').value.trim(),
          phone: document.getElementById('prof-phone').value.trim(),
          address: document.getElementById('prof-address').value.trim()
        },
        socials: {
          ...prof.socials,
          instagram: document.getElementById('prof-instagram').value.trim(),
          linkedin: document.getElementById('prof-linkedin').value.trim()
        }
      };
      DataStore.saveProfile(updated);
      alert('Profil perusahaan berhasil diperbarui!');
    });
  }

  // Helper functions
  function updateSidebarBadge() {
    if (sidebarUnreadBadge) {
      const analytics = DataStore.getAnalytics();
      if (analytics.unreadMessages > 0) {
        sidebarUnreadBadge.textContent = analytics.unreadMessages;
        sidebarUnreadBadge.style.display = 'inline-flex';
      } else {
        sidebarUnreadBadge.style.display = 'none';
      }
    }
  }

  function renderStatusBadge(status) {
    if (status === 'Baru') return '<span class="badge badge-new">Baru</span>';
    if (status === 'Dibaca') return '<span class="badge badge-read">Dibaca</span>';
    return '<span class="badge badge-done">Selesai</span>';
  }

  function formatDate(str) {
    if (!str) return '-';
    return str.replace('T', ' ');
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Universal Modal close buttons
  document.querySelectorAll('.modal-close, .modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    });
  });
});
