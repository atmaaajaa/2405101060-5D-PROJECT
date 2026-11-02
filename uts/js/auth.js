/* ==========================================================================
   ATMA CREATIVE - AUTHENTICATION & SESSION MANAGER
   Handles Admin Login, Logout, Change Password, and Route Protection
   ========================================================================== */

const AUTH_CONFIG = {
  SESSION_KEY: 'atma_admin_session',
  CREDS_KEY: 'atma_admin_credentials',
  DEFAULT_ADMIN: {
    email: 'admin@atmacreative.com',
    password: 'admin123',
    name: 'Administrator',
    role: 'Lead Admin'
  }
};

const Auth = {
  // Get stored admin credentials or default
  getCredentials() {
    try {
      const creds = localStorage.getItem(AUTH_CONFIG.CREDS_KEY);
      return creds ? JSON.parse(creds) : AUTH_CONFIG.DEFAULT_ADMIN;
    } catch (e) {
      return AUTH_CONFIG.DEFAULT_ADMIN;
    }
  },

  // Set credentials
  setCredentials(creds) {
    localStorage.setItem(AUTH_CONFIG.CREDS_KEY, JSON.stringify(creds));
  },

  // Check if current user is logged in
  isAuthenticated() {
    try {
      const session = localStorage.getItem(AUTH_CONFIG.SESSION_KEY);
      if (!session) return false;
      const parsed = JSON.parse(session);
      return !!parsed && !!parsed.isLoggedIn;
    } catch (e) {
      return false;
    }
  },

  // Current session user details
  getCurrentUser() {
    try {
      const session = localStorage.getItem(AUTH_CONFIG.SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch (e) {
      return null;
    }
  },

  // Login execution
  login(email, password) {
    const creds = this.getCredentials();
    if (email.trim().toLowerCase() === creds.email.toLowerCase() && password === creds.password) {
      const sessionData = {
        isLoggedIn: true,
        email: creds.email,
        name: creds.name,
        role: creds.role,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(AUTH_CONFIG.SESSION_KEY, JSON.stringify(sessionData));
      return { success: true };
    }
    return { success: false, message: 'Email atau password yang Anda masukkan salah.' };
  },

  // Logout
  logout() {
    localStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
    window.location.href = 'login.html';
  },

  // Change Password
  changePassword(oldPassword, newPassword) {
    const creds = this.getCredentials();
    if (creds.password !== oldPassword) {
      return { success: false, message: 'Password lama tidak sesuai.' };
    }
    if (!newPassword || newPassword.length < 6) {
      return { success: false, message: 'Password baru minimal harus 6 karakter.' };
    }
    creds.password = newPassword;
    this.setCredentials(creds);
    return { success: true, message: 'Password berhasil diperbarui!' };
  },

  // Route Protection for Admin Pages
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'login.html';
    }
  },

  // Redirect if already logged in (used on login.html)
  redirectIfAuthenticated() {
    if (this.isAuthenticated()) {
      window.location.href = 'dashboard.html';
    }
  }
};
