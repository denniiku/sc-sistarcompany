(function () {
  // 📌 네비게이션 데이터 (JSON을 외부에서 불러오지 않고 내장하여 404 에러 완전 차단)
  const NAV_DATA = [
    {
      "category": "Core Platform",
      "items": [
        { "name": "Sistar Company", "url": "https://sc-sistarcompany.web.app/" },
        { "name": "Scarlet AI", "url": "https://sc-scarletai.web.app/" }
      ]
    },
    {
      "category": "Biz Solutions",
      "items": [
        { "name": "Qubit Biz", "url": "https://sc-qubitbiz.web.app/" },
        { "name": "Biz Hub", "url": "https://sc-bizhub.web.app/" }
      ]
    },
    {
      "category": "Biz Galaxy Services",
      "items": [
        { "name": "Sispet Test App", "url": "https://sc-bizgalaxy.web.app/sispet/index.html" },
        { "name": "Test 2 App", "url": "https://sc-bizgalaxy.web.app/test2/index.html" }
      ]
    }
  ];

  // 1. Navigation Bar 동적 생성
  function renderHeader() {
    const headerContainer = document.getElementById('common-header');
    if (!headerContainer) return;

    try {
      let navHtml = `
        <div class="nav-container">
          <div class="nav-logo">
            <a href="https://sc-sistarcompany.web.app/">🏢 Master Hub</a>
          </div>
          <ul class="nav-menu">
      `;

      NAV_DATA.forEach(cat => {
        navHtml += `
          <li class="nav-item">
            <a href="#" class="nav-link" onclick="return false;">${cat.category} ▾</a>
            <ul class="dropdown-menu">
        `;
        cat.items.forEach(item => {
          navHtml += `
            <li>
              <a href="${item.url}" class="dropdown-link">${item.name}</a>
            </li>
          `;
        });
        navHtml += `
            </ul>
          </li>
        `;
      });

      navHtml += `
          </ul>
        </div>
      `;

      headerContainer.innerHTML = navHtml;
    } catch (error) {
      console.error('[Common Nav Error]:', error);
      headerContainer.innerHTML = `<div class="nav-container"><span style="color:red; font-size:12px;">Navigation Load Failed</span></div>`;
    }
  }

  // 2. Footer 동적 생성
  function renderFooter() {
    const footerContainer = document.getElementById('common-footer');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
      <p>© 2026 My App Studio. All rights reserved.</p>
      <div class="footer-links">
        <a href="#">Contact: support@example.com</a> | 
        <a href="#">Terms of Service</a> | 
        <a href="#">Privacy Policy</a>
      </div>
    `;
  }

  // DOM 로드 완료 후 실행
  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
  });
})();
