/**
 * SISTAR Monorepo - Global Common Navigation & Layout Script
 */
(function () {
  // 1. 네비게이션 기본 백업 데이터
  const DEFAULT_NAV_DATA = [
    {
      category: "*SC",
      baseUrl: "https://sc-sistarcompany.web.app",
      items: [{ name: "Main Gateway", url: "https://sc-sistarcompany.web.app/" }]
    },
    {
      category: "SCARLET AI",
      baseUrl: "https://sc-scarletai.web.app",
      items: [{ name: "Main Gateway", url: "https://sc-scarletai.web.app/" }]
    },
    {
      category: "QUBIT BIZ",
      baseUrl: "https://sc-qubitbiz.web.app",
      items: [{ name: "Main Gateway", url: "https://sc-qubitbiz.web.app/" }]
    },
    {
      category: "BIZ HUB",
      baseUrl: "https://sc-bizhub.web.app",
      items: [{ name: "Main Gateway", url: "https://sc-bizhub.web.app/" }]
    },
    {
      category: "BIZ GALAXY",
      baseUrl: "https://sc-bizgalaxy.web.app",
      items: [{ name: "Main Gateway", url: "https://sc-bizgalaxy.web.app/" }]
    }
  ];

  // 2. Navigation Bar 동적 생성
  async function renderHeader() {
    const headerContainer = document.getElementById('common-header');
    if (!headerContainer) return;

    let navData = DEFAULT_NAV_DATA;

    // 타임스탬프(?t=)를 추가하여 브라우저 캐시 현상을 강제로 무력화합니다.
    try {
      const response = await fetch('/common/nav-data.json?t=' + new Date().getTime());
      if (response.ok) {
        navData = await response.json();
      }
    } catch (e) {
      console.log('Using default nav data matrix');
    }

    try {
      let navHtml = `
        <div class="nav-container">
          <div class="nav-logo">
            <a href="https://sc-sistarcompany.web.app/">*SC</a>
          </div>
          <ul class="nav-menu">
      `;

      navData.forEach(cat => {
        navHtml += `
          <li class="nav-item">
            <a href="${cat.baseUrl}/" class="nav-link" onclick="return false;">${cat.category} ▾</a>
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
      console.error('[*SC Nav Error]:', error);
      headerContainer.innerHTML = `<div class="nav-container"><span style="color:#ff2a2a; font-family:'Orbitron';">SYSTEM ERROR</span></div>`;
    }
  }

  // 3. 클립보드 복사 및 사이버 토스트
  window.copyToCyberClipboard = function(text, message) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textarea);

    let toast = document.getElementById("cyber-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cyber-toast";
      document.body.appendChild(toast);
    }
    
    toast.innerHTML = message.replace(/\\n/g, '<br>');
    toast.className = "show";
    
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
  };

  // 4. Footer 동적 생성
  function renderFooter() {
    const footerContainer = document.getElementById('common-footer');
    if (!footerContainer) return;

    const mailIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
    const chatIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;

    footerContainer.innerHTML = `
      <div class="footer-content">
        <div class="footer-logo-text">*SC SISTAR Company</div>
        
        <div class="footer-link">
          <a href="https://sc-sistarcompany.web.app" target="_blank">sistarcompany.com</a>
        </div>

        <div class="footer-icons">
          <button class="icon-btn" title="Copy Email" onclick="window.copyToCyberClipboard('denniiku@sistarcompany.com', '이메일 주소가 복사되었습니다.\\ndenniiku@sistarcompany.com')">
            ${mailIcon}
          </button>
          
          <button class="icon-btn" title="Copy Contact" onclick="window.copyToCyberClipboard('+82(0)1028400485', '연락처가 복사되었습니다.\\n+82(0)1028400485')">
            ${chatIcon}
          </button>
        </div>
      </div>
    `;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
  });
})();
