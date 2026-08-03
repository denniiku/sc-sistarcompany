(function () {
  // 1. 현재 HTML 위치에 기반한 상대 경로(prefix) 자동 계산 함수
  function getRelativePrefix() {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const isFile = window.location.pathname.includes('.');
    const steps = Math.max(0, depth - (isFile ? 1 : 0));
    return steps > 0 ? '../'.repeat(steps) : './';
  }

  // 2. Navigation Bar 동적 생성
  async function renderHeader() {
    const headerContainer = document.getElementById('common-header');
    if (!headerContainer) return;

    const prefix = getRelativePrefix();

    try {
      // 1차 시도: 동적 계산된 상대 경로로 호출 (예: ../data/nav-data.json)
      let response = await fetch(prefix + 'data/nav-data.json');

      // 2차 시도: 상대 경로 호출 실패(404) 시 루트 절대 경로(/data/nav-data.json)로 재시도
      if (!response.ok) {
        response = await fetch('/data/nav-data.json');
      }

      if (!response.ok) throw new Error('Failed to load nav-data.json');
      const categories = await response.json();

      let navHtml = `
        <div class="nav-container">
          <div class="nav-logo">
            <a href="https://sc-sistarcompany.web.app/">🏢 Master Hub</a>
          </div>
          <ul class="nav-menu">
      `;

      categories.forEach(cat => {
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

  // 3. Footer 동적 생성
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
