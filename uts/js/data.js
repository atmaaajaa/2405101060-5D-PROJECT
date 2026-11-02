/* ==========================================================================
   ATMA CREATIVE - UNIFIED CLIENT-SIDE DATA STORE & STORAGE MANAGER
   Persists into localStorage, powers both Public Pages & Admin CMS
   ========================================================================== */

const STORAGE_KEYS = {
  PROFILE: 'atma_profile',
  SERVICES: 'atma_services',
  PORTFOLIO: 'atma_portfolio',
  TEAM: 'atma_team',
  TESTIMONIALS: 'atma_testimonials',
  CLIENTS: 'atma_clients',
  MESSAGES: 'atma_messages',
  AUTH: 'atma_auth_user'
};

// Initial Default Dataset (Rich realistic data for Atma Creative)
const DEFAULT_DATA = {
  profile: {
    brandName: 'Atma Creative',
    tagline: 'UI/UX Design & IT Consulting Agency',
    shortBio: 'Kami adalah studio desain produk digital dan konsultasi teknologi yang berfokus menciptakan pengalaman digital intuitif serta arsitektur TI yang skalabel.',
    history: 'Didirikan dengan semangat memberdayakan transformasi digital bisnis di Indonesia, Atma Creative telah bertumbuh dari konsultan desain butik menjadi mitra teknologi terpercaya bagi puluhan startup dan korporasi. Kami memadukan riset pengguna yang mendalam dengan rekayasa perangkat lunak modern.',
    vision: 'Menjadi agensi konsultan UI/UX dan arsitektur TI terdepan di Asia Tenggara yang menginspirasi inovasi digital berdampak tinggi dan berpusat pada manusia.',
    mission: [
      'Menghadirkan solusi desain pengalaman pengguna (UI/UX) yang estetis, teruji, dan mendorong konversi bisnis.',
      'Menyediakan konsultasi strategi dan arsitektur teknologi informasi modern yang aman, andal, dan siap berkembang.',
      'Menjadi mitra kolaboratif jangka panjang yang mengedepankan transparansi dan efisiensi eksekusi.'
    ],
    values: [
      { title: 'User-Centric Empathy', desc: 'Setiap keputusan desain dan teknologi berakar pada pemahaman mendalam tentang kebutuhan riil pengguna akhir.' },
      { title: 'Scalable Architecture', desc: 'Kami merancang sistem teknologi yang tahan masa depan, modular, dan siap mendukung pertumbuhan volume tinggi.' },
      { title: 'Radical Transparency', desc: 'Komunikasi terbuka, dokumentasi menyeluruh, dan estimasi realistis dalam setiap tahap proyek.' },
      { title: 'Impactful Innovation', desc: 'Fokus pada metrik bisnis terukur dan hasil konkrit, bukan sekadar tren teknologi sesaat.' }
    ],
    contact: {
      email: 'halo@atmacreative.com',
      phone: '+62 812-3456-7890',
      whatsapp: '6281234567890',
      address: 'Jl. Babarsari No. 43, Caturtunggal, Sleman, D.I. Yogyakarta 55281',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.090623631835!2d110.40715377588383!3d-7.780183177196023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bdc495%3A0xaa6229b311d9e917!2sUniversitas%20Atma%20Jaya%20Yogyakarta%20-%20Kampus%203%20Gedung%20Bonaventura!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid'
    },
    socials: {
      instagram: 'https://instagram.com/atmacreative',
      linkedin: 'https://linkedin.com/company/atmacreative',
      github: 'https://github.com/atmacreative'
    }
  },

  services: [
    {
      id: 'srv-1',
      title: 'UI/UX Design & Product Strategy',
      category: 'UI/UX Design',
      icon: 'palette',
      order: 1,
      shortDesc: 'Riset pengguna komprehensif, desain antarmuka responsif, perancangan design system, serta prototipe interaktif bernilai konversi tinggi.',
      description: 'Layanan UI/UX kami mencakup audit kegunaan, riset persona, arsitektur informasi, kawat kerja (wireframing), perancangan sistem desain modular, dan uji usability untuk aplikasi web maupun mobile.',
      scope: [
        'User Research & Usability Testing',
        'Wireframing & Interactive Prototyping (Figma)',
        'Comprehensive Design System (Tokens, Components)',
        'Mobile App (iOS/Android) & Web Responsive UI'
      ],
      workflow: [
        { step: '01', title: 'Discovery & Research', desc: 'Wawancara stakeholder, audit produk eksisting, dan riset persona target pengguna.' },
        { step: '02', title: 'Information Architecture', desc: 'Pemetaan alur pengguna (user journey), sitemap terstruktur, dan wireframe presisi.' },
        { step: '03', title: 'Hi-Fi UI & Design System', desc: 'Desain visual berkelas, konsistensi token warna & tipografi, serta prototype interaktif.' },
        { step: '04', title: 'Testing & Handoff', desc: 'Pengujian pengguna langsung dan penyerahan aset desain siap koding kepada tim developer.' }
      ]
    },
    {
      id: 'srv-2',
      title: 'IT Consulting & Cloud Architecture',
      category: 'IT Consulting',
      icon: 'server',
      order: 2,
      shortDesc: 'Konsultasi arsitektur perangkat lunak modern, audit keamanan sistem, strategi integrasi API, dan migrasi infrastruktur komputasi awan.',
      description: 'Kami mendampingi korporasi dan perusahaan rintisan dalam merancang roadmap teknologi, audit kode & performa, modernisasi arsitektur monolith ke microservices, serta strategi CI/CD terotomasi.',
      scope: [
        'Enterprise IT Roadmap & Technical Assessment',
        'Cloud Infrastructure Design (AWS, GCP, Azure)',
        'Database Optimization & Scalability Planning',
        'Security & Performance Code Auditing'
      ],
      workflow: [
        { step: '01', title: 'Technical Audit', desc: 'Evaluasi infrastruktur TI, profil performa database, dan celah keamanan saat ini.' },
        { step: '02', title: 'Blueprint Architecture', desc: 'Penyusunan arsitektur sistem baru yang modular, berbiaya efisien, dan elastis.' },
        { step: '03', title: 'Proof-of-Concept & Pilot', desc: 'Uji coba implementasi skala kecil untuk memvalidasi performa dan integrasi sistem.' },
        { step: '04', title: 'Rollout & Maintenance Guide', desc: 'Transisi bertahap tanpa downtime beserta SOP pemeliharaan sistem terpadu.' }
      ]
    }
  ],

  portfolios: [
    {
      id: 'port-1',
      title: 'Bank Syariah Digital: Mobile Banking Experience',
      category: 'UI/UX Design',
      client: 'Bank Syariah Mandiri Digital',
      year: '2024',
      image: 'assets/images/portfolio/port-banking.svg',
      summary: 'Perancangan ulang end-to-end aplikasi perbankan digital untuk meningkatkan adopsi generasi muda.',
      background: 'Klien menghadapi angka drop-off sebesar 58% saat proses pembukaan rekening online dan rating aplikasi yang stagnan di 3.2.',
      role: 'Lead UI/UX Designer & Product Researcher',
      methodology: 'Design Thinking, Double Diamond Framework, Heatmap Analysis, Lab Usability Testing.',
      metrics: '+145% Peningkatan Registrasi Akun Baru | Rating App Store naik ke 4.8 | Waktu transaksi 40% lebih cepat.',
      quote: '"Atma Creative mengubah platform digital kami menjadi sangat intuitif dan elegan, melipatgandakan kepuasan nasabah kami."',
      clientPerson: 'Ahmad Fauzi - Head of Digital Products'
    },
    {
      id: 'port-2',
      title: 'AgriLogistics: Smart Supply Chain ERP',
      category: 'IT Consulting',
      client: 'PT Agro Nusantara Logistik',
      year: '2024',
      image: 'assets/images/portfolio/port-logistics.svg',
      summary: 'Modernisasi sistem manajemen armada dan pergudangan dengan arsitektur microservices.',
      background: 'Sistem lama sering mengalami kegagalan sinkronisasi inventaris antar cabang dan lambat menangani lebih dari 10.000 pesanan serentak.',
      role: 'Enterprise Solutions Architect & Tech Lead',
      methodology: 'Domain-Driven Design (DDD), Event-Driven Architecture via Apache Kafka & Redis Caching.',
      metrics: 'Zero Downtime selama Peak Season | Latensi API terpangkas dari 1.8s menjadi 120ms | Efisiensi rute armada hemat 22% BBM.',
      quote: '"Arsitektur yang dibangun Atma Creative memberi kestabilan luar biasa saat ekspansi ke 14 provinsi baru."',
      clientPerson: 'Hendro Prasetyo - VP of Technology'
    },
    {
      id: 'port-3',
      title: 'MedikaGo: Integrated Telemedicine Ecosystem',
      category: 'UI/UX Design',
      client: 'Medika Hospital Group',
      year: '2023',
      image: 'assets/images/portfolio/port-health.svg',
      summary: 'Platform konsultasi dokter spesialis, resep obat instan, dan integrasi riwayat medis rekam medik elektronik.',
      background: 'Pasien membutuhkan proses temu dokter yang cepat tanpa antrean fisik dan dokter memerlukan interface rekam medik yang ringkas.',
      role: 'Senior UI/UX Designer & Accessibility Specialist',
      methodology: 'WCAG 2.1 AA Compliance, Rapid Interactive Prototyping, Card Sorting, Accessibility Testing.',
      metrics: '350.000+ Sesi Telekonsultasi Sukses | 92% Kepuasan Pasien Lansia | Sertifikasi Aksesibilitas Nasional.',
      quote: '"Desain yang humanis dan ramah pengguna membuat pasien dari berbagai rentang usia sangat nyaman menggunakannya."',
      clientPerson: 'dr. Ratna Wulandari - Direktur Pelayanan Medis'
    },
    {
      id: 'port-4',
      title: 'Cloud FinOps & Infrastructure Automation',
      category: 'IT Consulting',
      client: 'Fintech Maju Bersama',
      year: '2023',
      image: 'assets/images/portfolio/port-cloud.svg',
      summary: 'Optimasi biaya komputasi awan dan otomasi pipeline CI/CD Kubernetes.',
      background: 'Biaya cloud bulanan melonjak tajam tanpa visibilitas alokasi beban kerja yang jelas.',
      role: 'DevOps & Cloud FinOps Consultant',
      methodology: 'Terraform Infrastructure as Code, Kubernetes HPA, FinOps Observability Dashboard.',
      metrics: 'Penghematan Biaya Cloud sebesar 38% per Bulan | Waktu rilis fitur dipercepat dari 2 minggu ke 2 hari.',
      quote: '"Rekomendasi arsitektur Atma Creative langsung menghemat ratusan juta rupiah per bulan tanpa kompromi performa."',
      clientPerson: 'Kevin Gunawan - Chief Technology Officer'
    },
    {
      id: 'port-5',
      title: 'EduKarier: AI-Powered Edutech Portal',
      category: 'UI/UX Design',
      client: 'Yayasan Insan Cerdas',
      year: '2023',
      image: 'assets/images/portfolio/port-edu.svg',
      summary: 'Platform pembelajaran digital interaktif dengan sistem rekomendasi kursus berbasis minat bakat.',
      background: 'Tingkat penyelesaian kursus online rendah (hanya 14%) karena antarmuka kaku dan minim gamifikasi.',
      role: 'UI Designer & Gamification Consultant',
      methodology: 'Gamification UX, Interactive Micro-interactions, A/B Testing Onboarding Flow.',
      metrics: 'Tingkat penyelesaian kursus melonjak hingga 64% | Retensi pengguna mingguan naik 78%.',
      quote: '"Hasil desain Atma Creative berhasil meningkatkan keterlibatan siswa secara drastis."',
      clientPerson: 'Siti Nurhaliza - Head of Curriculum & Tech'
    },
    {
      id: 'port-6',
      title: 'OmniChannel Retail API & Microservice Modernization',
      category: 'IT Consulting',
      client: 'Retailindo Mega Store',
      year: '2022',
      image: 'assets/images/portfolio/port-retail.svg',
      summary: 'Integrasi API terpadu antara kasir POS toko fisik dan sistem toko online e-commerce.',
      background: 'Stok barang di toko fisik sering tidak sinkron dengan toko daring sehingga terjadi pesanan ganda.',
      role: 'Systems Integration Consultant',
      methodology: 'RESTful & GraphQL Hybrid API, Real-time Webhooks, Distributed Database Locking.',
      metrics: 'Akurasi sinkronisasi stok 99.98% realtime | Mengurangi pembatalan order akibat overstock hingga 95%.',
      quote: '"Solusi integrasi yang sangat handal dan kokoh, menjadi pondasi omni-channel kami."',
      clientPerson: 'Bambang Sudibyo - Head of Retail Ops'
    }
  ],

  team: [
    {
      id: 'tm-1',
      name: 'Arya Wicaksono, M.Sc.',
      role: 'Principal Lead UI/UX Designer',
      avatar: 'assets/images/team/team-arya.svg',
      skills: ['Design Thinking', 'Figma Specialist', 'User Research', 'Product Strategy']
    },
    {
      id: 'tm-2',
      name: 'Dian Permatasari, S.Kom.',
      role: 'Senior Solutions & Cloud Architect',
      avatar: 'assets/images/team/team-dian.svg',
      skills: ['AWS / GCP Cloud', 'Microservices', 'Enterprise Security', 'PostgreSQL']
    },
    {
      id: 'tm-3',
      name: 'Bima Satria Nugraha',
      role: 'Lead Frontend & Creative Engineer',
      avatar: 'assets/images/team/team-bima.svg',
      skills: ['Frontend Architecture', 'Design Systems', 'Web Accessibility', 'Performance']
    },
    {
      id: 'tm-4',
      name: 'Nadia Safitri, B.Des.',
      role: 'Senior Interaction & Visual Designer',
      avatar: 'assets/images/team/team-nadia.svg',
      skills: ['Micro-interactions', 'Design Tokens', 'Prototyping', 'Usability Testing']
    }
  ],

  testimonials: [
    {
      id: 'tst-1',
      name: 'Ahmad Fauzi',
      company: 'Bank Syariah Mandiri Digital',
      avatar: 'assets/images/team/team-arya.svg',
      text: 'Atma Creative benar-benar memahami perpaduan antara keindahan visual dan kenyamanan transaksi finansial. Konversi nasabah baru kami melonjak 145% sejak peluncuran desain baru.',
      rating: 5
    },
    {
      id: 'tst-2',
      name: 'Hendro Prasetyo',
      company: 'PT Agro Nusantara Logistik',
      avatar: 'assets/images/team/team-bima.svg',
      text: 'Konsultasi IT dan arsitektur microservices yang dirancang tim Atma Creative memberi kestabilan tanpa celah selama periode peak season bisnis kami. Sangat profesional!',
      rating: 5
    },
    {
      id: 'tst-3',
      name: 'dr. Ratna Wulandari',
      company: 'Medika Hospital Group',
      avatar: 'assets/images/team/team-nadia.svg',
      text: 'Pasien kami dari berbagai kalangan usia merasa aplikasi kami sekarang sangat mudah dimengerti. Komunikasi tim Atma Creative juga sangat transparan dan tepat waktu.',
      rating: 5
    }
  ],

  clients: [
    { name: 'Bank Nusantara', label: 'BANK NUSANTARA' },
    { name: 'AgriTech Asia', label: 'AGRITECH ASIA' },
    { name: 'Medika Healthcare', label: 'MEDIKA HEALTH' },
    { name: 'LogistikGo', label: 'LOGISTIK GO' },
    { name: 'Edukasi Pintar', label: 'EDUKASI PINTAR' }
  ],

  messages: [
    {
      id: 'msg-101',
      name: 'Reza Pratama',
      email: 'reza.pratama@techinvest.co.id',
      phone: '081298765432',
      service: 'UI/UX Design',
      message: 'Halo tim Atma Creative, kami sedang merencanakan perancangan ulang aplikasi B2B Procurement kami. Bisakah kami menjadwalkan sesi konsultasi daring minggu ini?',
      date: '2026-11-02 14:30',
      status: 'Baru'
    },
    {
      id: 'msg-102',
      name: 'Siti Rahmawati',
      email: 'siti@karyalogistik.com',
      phone: '085712348899',
      service: 'IT Consulting',
      message: 'Kami memerlukan audit arsitektur database dan konsultasi migrasi sistem ke AWS Cloud. Mohon informasi paket konsultasi dan estimasi timeline.',
      date: '2026-11-01 09:15',
      status: 'Dibaca'
    },
    {
      id: 'msg-103',
      name: 'Budi Santoso',
      email: 'budi@primamedika.org',
      phone: '081377889900',
      service: 'UI/UX Design',
      message: 'Terima kasih atas proposal yang telah dikirimkan. Kami ingin melanjutkan ke tahap penandatanganan NDA dan kick-off meeting.',
      date: '2026-10-30 16:45',
      status: 'Selesai'
    }
  ]
};

// Initialize Storage with Defaults if Empty
function initDataStore() {
  if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_DATA.profile));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_DATA.services));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PORTFOLIO)) {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(DEFAULT_DATA.portfolios));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TEAM)) {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(DEFAULT_DATA.team));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(DEFAULT_DATA.testimonials));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CLIENTS)) {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(DEFAULT_DATA.clients));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(DEFAULT_DATA.messages));
  }
}

// Data Access API
const DataStore = {
  // Profile & Contact
  getProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : DEFAULT_DATA.profile;
    } catch (e) {
      return DEFAULT_DATA.profile;
    }
  },
  saveProfile(profileData) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profileData));
  },

  // Services
  getServices() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return data ? JSON.parse(data) : DEFAULT_DATA.services;
    } catch (e) {
      return DEFAULT_DATA.services;
    }
  },
  saveServices(servicesList) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(servicesList));
  },
  addService(service) {
    const list = this.getServices();
    service.id = 'srv-' + Date.now();
    service.order = list.length + 1;
    list.push(service);
    this.saveServices(list);
    return service;
  },
  updateService(id, updatedData) {
    const list = this.getServices();
    const idx = list.findIndex(s => s.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedData };
      this.saveServices(list);
      return list[idx];
    }
    return null;
  },
  deleteService(id) {
    let list = this.getServices();
    list = list.filter(s => s.id !== id);
    this.saveServices(list);
  },

  // Portfolios
  getPortfolios(category = 'Semua') {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
      const list = data ? JSON.parse(data) : DEFAULT_DATA.portfolios;
      if (!category || category === 'Semua') return list;
      return list.filter(p => p.category === category);
    } catch (e) {
      return DEFAULT_DATA.portfolios;
    }
  },
  getPortfolioById(id) {
    const list = this.getPortfolios('Semua');
    return list.find(p => p.id === id) || null;
  },
  savePortfolios(portfolioList) {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolioList));
  },
  addPortfolio(portfolio) {
    const list = this.getPortfolios('Semua');
    portfolio.id = 'port-' + Date.now();
    list.unshift(portfolio);
    this.savePortfolios(list);
    return portfolio;
  },
  updatePortfolio(id, updatedData) {
    const list = this.getPortfolios('Semua');
    const idx = list.findIndex(p => p.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedData };
      this.savePortfolios(list);
      return list[idx];
    }
    return null;
  },
  deletePortfolio(id) {
    let list = this.getPortfolios('Semua');
    list = list.filter(p => p.id !== id);
    this.savePortfolios(list);
  },

  // Teams
  getTeam() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEAM);
      return data ? JSON.parse(data) : DEFAULT_DATA.team;
    } catch (e) {
      return DEFAULT_DATA.team;
    }
  },
  saveTeam(teamList) {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(teamList));
  },
  addTeamMember(member) {
    const list = this.getTeam();
    member.id = 'tm-' + Date.now();
    list.push(member);
    this.saveTeam(list);
    return member;
  },
  updateTeamMember(id, updatedData) {
    const list = this.getTeam();
    const idx = list.findIndex(t => t.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedData };
      this.saveTeam(list);
      return list[idx];
    }
    return null;
  },
  deleteTeamMember(id) {
    let list = this.getTeam();
    list = list.filter(t => t.id !== id);
    this.saveTeam(list);
  },

  // Testimonials & Clients
  getTestimonials() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return data ? JSON.parse(data) : DEFAULT_DATA.testimonials;
    } catch (e) {
      return DEFAULT_DATA.testimonials;
    }
  },
  saveTestimonials(testimonials) {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  },
  getClients() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLIENTS);
      return data ? JSON.parse(data) : DEFAULT_DATA.clients;
    } catch (e) {
      return DEFAULT_DATA.clients;
    }
  },

  // Messages (Inbox System)
  getMessages() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return data ? JSON.parse(data) : DEFAULT_DATA.messages;
    } catch (e) {
      return DEFAULT_DATA.messages;
    }
  },
  saveMessages(messagesList) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messagesList));
  },
  addMessage(message) {
    const list = this.getMessages();
    message.id = 'msg-' + Date.now();
    message.date = new Date().toISOString().replace('T', ' ').substring(0, 16);
    message.status = 'Baru';
    list.unshift(message);
    this.saveMessages(list);
    return message;
  },
  updateMessageStatus(id, newStatus) {
    const list = this.getMessages();
    const msg = list.find(m => m.id === id);
    if (msg) {
      msg.status = newStatus;
      this.saveMessages(list);
      return msg;
    }
    return null;
  },
  deleteMessage(id) {
    let list = this.getMessages();
    list = list.filter(m => m.id !== id);
    this.saveMessages(list);
  },

  // Analytics Counters
  getAnalytics() {
    const messages = this.getMessages();
    const services = this.getServices();
    const portfolios = this.getPortfolios('Semua');
    const team = this.getTeam();

    const unreadMessagesCount = messages.filter(m => m.status === 'Baru').length;

    return {
      unreadMessages: unreadMessagesCount,
      totalMessages: messages.length,
      totalServices: services.length,
      totalPortfolios: portfolios.length,
      totalTeam: team.length
    };
  },

  // Reset to Factory Settings
  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_DATA.profile));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_DATA.services));
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(DEFAULT_DATA.portfolios));
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(DEFAULT_DATA.team));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(DEFAULT_DATA.testimonials));
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(DEFAULT_DATA.clients));
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(DEFAULT_DATA.messages));
  }
};

// Initialize on Load
initDataStore();
