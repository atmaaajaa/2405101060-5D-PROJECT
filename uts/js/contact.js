/* ==========================================================================
   ATMA CREATIVE - CONTACT FORM & REAL-TIME VALIDATION
   Validates Name, Email, Indonesian Phone Number, Service Dropdown, Message
   Submits directly to local DataStore inbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('consultation-form');
  const alertContainer = document.getElementById('form-alert-container');

  if (!contactForm) return;

  const fields = {
    name: {
      el: document.getElementById('input-name'),
      feedback: document.getElementById('name-feedback'),
      validate: (val) => {
        if (!val.trim()) return 'Nama lengkap wajib diisi.';
        if (val.trim().length < 3) return 'Nama minimal terdiri dari 3 karakter.';
        return '';
      }
    },
    email: {
      el: document.getElementById('input-email'),
      feedback: document.getElementById('email-feedback'),
      validate: (val) => {
        if (!val.trim()) return 'Email wajib diisi.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return 'Format email tidak valid (contoh: nama@perusahaan.com).';
        return '';
      }
    },
    phone: {
      el: document.getElementById('input-phone'),
      feedback: document.getElementById('phone-feedback'),
      validate: (val) => {
        if (!val.trim()) return 'Nomor HP/WhatsApp wajib diisi.';
        // Indonesian phone pattern: starts with 08 or 628, 9-14 digits
        const phoneRegex = /^(08|628|\+628)[0-9]{8,12}$/;
        const cleanVal = val.trim().replace(/[\s-]/g, '');
        if (!phoneRegex.test(cleanVal)) return 'Nomor HP tidak valid. Gunakan format 08xxxxxxxxxx (10-13 digit).';
        return '';
      }
    },
    service: {
      el: document.getElementById('input-service'),
      feedback: document.getElementById('service-feedback'),
      validate: (val) => {
        if (!val || val === '') return 'Silakan pilih layanan yang Anda minati.';
        return '';
      }
    },
    message: {
      el: document.getElementById('input-message'),
      feedback: document.getElementById('message-feedback'),
      validate: (val) => {
        if (!val.trim()) return 'Pesan konsultasi wajib diisi.';
        if (val.trim().length < 10) return 'Pesan minimal terdiri dari 10 karakter.';
        return '';
      }
    }
  };

  // Real-time validation listeners on input and blur
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    if (!field.el) return;

    const validateField = () => {
      const errorMsg = field.validate(field.el.value);
      if (errorMsg) {
        field.el.classList.add('is-invalid');
        if (field.feedback) field.feedback.textContent = errorMsg;
        return false;
      } else {
        field.el.classList.remove('is-invalid');
        if (field.feedback) field.feedback.textContent = '';
        return true;
      }
    };

    field.el.addEventListener('input', validateField);
    field.el.addEventListener('blur', validateField);
  });

  // Handle Form Submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(fields).forEach((key) => {
      const field = fields[key];
      if (!field.el) return;
      const errorMsg = field.validate(field.el.value);
      if (errorMsg) {
        field.el.classList.add('is-invalid');
        if (field.feedback) field.feedback.textContent = errorMsg;
        isValid = false;
      } else {
        field.el.classList.remove('is-invalid');
      }
    });

    if (!isValid) {
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-danger" role="alert">
            <span>Mohon periksa kembali formulir Anda. Masih terdapat kolom yang belum diisi dengan benar.</span>
          </div>
        `;
      }
      return;
    }

    // Prepare submission object
    const newSubmission = {
      name: fields.name.el.value.trim(),
      email: fields.email.el.value.trim(),
      phone: fields.phone.el.value.trim(),
      service: fields.service.el.value,
      message: fields.message.el.value.trim()
    };

    // Save to DataStore
    if (typeof DataStore !== 'undefined') {
      DataStore.addMessage(newSubmission);
    }

    // Display Success Alert Banner
    if (alertContainer) {
      alertContainer.innerHTML = `
        <div class="alert alert-success" role="alert">
          <div>
            <strong>Notifikasi berhasil terkirim!</strong>
            <p style="margin: 0.25rem 0 0; font-size: 0.88rem;">Terima kasih telah menghubungi Atma Creative. Konsultan kami akan segera merespons ke email atau WhatsApp Anda dalam 1x24 jam kerja.</p>
          </div>
        </div>
      `;
      alertContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Reset Form
    contactForm.reset();
  });
});
