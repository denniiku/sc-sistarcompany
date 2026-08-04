(function () {
  // 📌 1. 5대 파이어베이스 기본 네비게이션 백업 데이터 (네트워크 오류 방지용)
  const DEFAULT_NAV_DATA = [
    {
      "category": "*SC",
      "baseUrl": "https://sc-sistarcompany.web.app",
      "items": [{ "name": "Head Quarter", "url": "https://sc-sistarcompany.web.app/" }]
    },
    {
      "category": "Scarlet Ai",
      "baseUrl": "https://sc-scarletai.web.app",
      "items": [{ "name": "Scarlet Gateway", "url": "https://sc-scarletai.web.app/" }]
    },
    {
      "category": "Qubit Biz",
      "baseUrl": "https://sc-qubitbiz.web.app",
      "items": [{ "name": "Qubit Trade", "url": "https://sc-qubitbiz.web.app/" }]
    },
    {
      "category": "Biz Hub",
      "baseUrl": "https://sc-bizhub.web.app",
      "items": [{ "name": "SISTAR &Co", "url": "https://sc-bizhub.web.app/" }]
    },
    {
      "category": "Biz Galaxy",
      "baseUrl": "https://sc-bizgalaxy.web.app",
      "items": [
        { "name": "SISPet App", "url": "https://sc-bizgalaxy.web.app/sispet/index.html" }
      ]
    }
  ];

  // 📌 2. Navigation Bar 동적 생성
  async function renderHeader() {
    const headerContainer = document.getElementById('common-header');
    if (!headerContainer) return;

    let navData = DEFAULT_NAV_DATA;

    // 동적으로 생성된 nav-data.json 불러오기 시도
    try {
      const response = await fetch('/common/nav-data.json');
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
            <a href="https://sc-sistarcompany.web.app/">*SC.</a>
          </div>
          <ul class="nav-menu">
      `;

      navData.forEach(cat => {
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
      console.error('[*SC Nav Error]:', error);
      headerContainer.innerHTML = `<div class="nav-container"><span style="color:#ff2a2a; font-family:'Orbitron';">SYSTEM ERROR</span></div>`;
    }
  }

  // 📌 3. 클립보드 복사 및 사이버틱 토스트 메시지
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

  // 📌 4. Footer 동적 생성 (요청사항 100% 반영)
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
