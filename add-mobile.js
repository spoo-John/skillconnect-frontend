const fs = require('fs');
const path = require('path');

const mobileCss = `
  <!-- MOBILE RESPONSIVE STYLES -->
  <style>
    @media (max-width: 768px) {
      html, body { overflow-x: hidden; }
      nav { padding: 0 16px !important; height: 56px !important; gap: 12px !important; }
      .nav-logo { font-size: 17px !important; }
      nav a:not(.nav-logo):not(.nav-btn):not(.nav-avatar):not(#navDash):not(#navMessages):not(.active) { display: none !important; }
      .hamburger { display: flex !important; }
      .mobile-menu.open { display: flex !important; }
      .hero { flex-direction: column !important; padding: 40px 20px !important; gap: 32px !important; min-height: auto !important; text-align: center; }
      .hero-right { display: none !important; }
      .hero-ctas, .cta-banner-btns { justify-content: center !important; }
      .hero-eyebrow { justify-content: center; }
      .stats-bar { display: grid !important; grid-template-columns: repeat(2,1fr) !important; padding: 24px 20px !important; gap: 20px !important; }
      section { padding: 48px 20px !important; }
      .how-grid, .testi-grid, .why-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
      .cat-grid { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
      .cta-banner { margin: 0 16px 48px !important; padding: 36px 20px !important; }
      .cta-banner-btns { flex-direction: column !important; align-items: center; }
      footer { flex-direction: column !important; text-align: center; gap: 12px !important; padding: 24px 20px !important; }
      .footer-links { flex-wrap: wrap; justify-content: center; }
    }
    @media (max-width: 900px) {
      .dash-layout, .admin-layout, .messages-layout { flex-direction: column !important; }
      .dash-nav, .dash-sidebar, .admin-sidebar { width: 100% !important; height: auto !important; position: relative !important; top: 0 !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; padding: 10px 12px !important; display: flex !important; flex-direction: row !important; flex-wrap: wrap !important; gap: 4px !important; overflow-x: auto !important; }
      .dash-user, .sidebar-user, .dash-nav-section, .dash-nav-label, .sidebar-label { display: none !important; }
      .dash-nav-item, .sidebar-item { flex: none !important; padding: 8px 12px !important; font-size: 12px !important; width: auto !important; }
      .dash-main, .admin-main { padding: 20px 16px 40px !important; }
      .stats-row, .stats-grid { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
      .two-col, .post-body { grid-template-columns: 1fr !important; gap: 16px !important; }
      .rec-grid, .pros-grid { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
      .dash-top { flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
      .browse-body { flex-direction: column !important; padding: 0 20px 60px !important; }
      .sidebar { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; padding: 20px 0 !important; }
      .profile-layout { grid-template-columns: 1fr !important; }
      .contact-card { position: relative !important; top: 0 !important; }
      .profile-header { flex-wrap: wrap !important; margin-top: -30px !important; }
      .profile-body { padding: 0 20px 60px !important; }
      .tips-sidebar { position: relative !important; top: 0 !important; }
      .form-row, .contact-options { grid-template-columns: 1fr !important; gap: 0 !important; }
      .submit-area { flex-direction: column !important; }
      .charts-grid { grid-template-columns: 1fr !important; }
      .portfolio-grid { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 600px) {
      .glass { padding: 28px 20px !important; }
      .register-box { padding: 28px 20px !important; }
      .pw-row { grid-template-columns: 1fr !important; }
      .pros-grid, .rec-grid { grid-template-columns: 1fr !important; }
      input, select, textarea { font-size: 16px !important; }
      .full-card, .glass-card { padding: 16px !important; }
      .post-form { padding: 20px 16px !important; }
      .search-input, .filter-select { width: 100% !important; }
      .filter-bar { flex-direction: column !important; gap: 8px !important; }
    }
    @media (max-width: 768px) {
      body.messages-page { overflow: auto !important; }
      .conv-sidebar { width: 100% !important; height: 220px !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; flex-shrink: 0 !important; }
      .chat-window { height: calc(100vh - 276px) !important; min-height: 380px !important; }
      .msg-bubble { max-width: 85% !important; }
    }
    .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
    .hamburger span { display: block; width: 22px; height: 2px; background: rgba(255,255,255,0.8); border-radius: 2px; transition: all 0.3s; }
    .mobile-menu { display: none; position: fixed; top: 56px; left: 0; right: 0; background: rgba(15,32,39,0.97); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; z-index: 99; flex-direction: column; gap: 4px; }
    .mobile-menu a { padding: 12px 16px; border-radius: 10px; color: rgba(255,255,255,0.7) !important; text-decoration: none; font-size: 15px; font-weight: 500; display: block !important; }
    .mobile-menu a:hover { background: rgba(255,255,255,0.07); color: #fff !important; }
    .mobile-menu .menu-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 8px 0; }
    @media (max-width: 768px) { .hamburger { display: flex !important; } }
  </style>
`;

const hamburgerScript = `
  <!-- MOBILE HAMBURGER MENU -->
  <script>
    (function() {
      // Add hamburger button and mobile menu to nav
      window.addEventListener('DOMContentLoaded', function() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        // Create hamburger
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Menu');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        nav.appendChild(hamburger);

        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.id = 'mobileMenu';

        // Get nav links
        const links = nav.querySelectorAll('a:not(.nav-logo)');
        links.forEach(link => {
          const clone = link.cloneNode(true);
          mobileMenu.appendChild(clone);
        });

        // Add sign out if logged in
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user) {
          const divider = document.createElement('div');
          divider.className = 'menu-divider';
          mobileMenu.appendChild(divider);
          const signout = document.createElement('a');
          signout.href = '#';
          signout.textContent = '🚪 Sign Out';
          signout.style.color = '#ff8080';
          signout.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'login.html';
          });
          mobileMenu.appendChild(signout);
        }

        document.body.appendChild(mobileMenu);

        hamburger.addEventListener('click', function() {
          mobileMenu.classList.toggle('open');
        });

        // Close on outside click
        document.addEventListener('click', function(e) {
          if (!nav.contains(e.target)) {
            mobileMenu.classList.remove('open');
          }
        });
      });
    })();
  <\/script>
`;

// Pages to update
const pages = [
  'index.html',
  'login.html',
  'register.html',
  'dashboard.html',
  'browse.html',
  'profile.html',
  'post-need.html',
  'messages.html',
  'admin.html'
];

const frontendDir = process.argv[2] || '.';

let updated = 0;
pages.forEach(page => {
  const filePath = path.join(frontendDir, page);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipped (not found): ${page}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has mobile styles
  if (content.includes('MOBILE RESPONSIVE STYLES')) {
    console.log(`✓  Already updated: ${page}`);
    return;
  }

  // Inject CSS before </head>
  content = content.replace('</head>', mobileCss + '\n</head>');

  // Inject hamburger script before </body>
  content = content.replace('</body>', hamburgerScript + '\n</body>');

  // Add messages-page class to body for messages.html
  if (page === 'messages.html') {
    content = content.replace('<body>', '<body class="messages-page">');
  }

  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated: ${page}`);
  updated++;
});

console.log(`\n🎉 Done! Updated ${updated} files.`);
console.log('Run: git add . && git commit -m "Add mobile responsiveness" && git push');