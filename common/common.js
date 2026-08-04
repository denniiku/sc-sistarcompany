(function () {
  // 📌 1. 현재 HTML 위치에 기반한 상대 경로(prefix) 자동 계산 함수
  function getRelativePrefix() {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const isFile = window.location.pathname.includes('.');
    const steps = Math.max(0, depth - (isFile ? 1 : 0));
    return steps > 0 ? '../'.repeat(steps) : './';
  }

  // 📌 2. 네비게이션 데이터 (폴더 동적 매핑)
  // 새로운 서브 폴더를 깃허브에 만들었다면, 아래 items 배열에 {"name": "메뉴명", "folder": "폴더명"} 만 추가하면 됩니다.
  const NAV_DATA = [
    {
      "category": "*SC",
      "prefix": "project1-",
      "items": [
        { "name": "Head Quarter", "folder": "hq" },
        { "name": "Int'l Bases", "folder": "intl" }
      ]
    },
    {
      "category": "Scarlet Ai",
      "prefix": "project2-",
      "items": [
        { "name": "B2B Gateway", "folder": "b2b" },
        { "name": "Shoppable Media", "folder": "media" }
      ]
    },
    {
      "category": "Qubit Biz",
      "prefix": "project3-",
      "items": [
        { "name": "Trade Finance", "folder": "trade" },
        { "name": "Arbitrage Flow", "folder": "flow" }
      ]
    },
    {
      "category": "Biz Hub",
      "prefix": "project4-",
      "items": [
        { "name": "SISTAR &Co", "folder": "co" },
        { "name": "Franchise Partners", "folder": "franchise" }
      ]
    },
    {
      "category": "Biz Galaxy",
      "prefix": "project5-",
      "items": [
        { "name": "SISPet", "folder": "sispet" },
        { "name": "SISTAR Studio", "folder": "studio" }
      ]
    }
  ];

  // 📌 3. Navigation Bar 동적 생성
  function renderHeader() {
    const headerContainer = document.getElementById('common-header');
    if (!headerContainer) return;

    const pathPrefix = getRelativePrefix();

    try {
      let navHtml = `
        <div class="nav-container">
          <div class="nav-logo">
            <a href="https://sc-sistarcompany.web.app/">*SC.</a>
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
          // url 값이 명시되어 있으면 그것을 쓰고, 없으면 동적 폴더 경로 생성
          let targetUrl = item.url ? item.url : `${pathPrefix}${cat.prefix}${item.folder}/index.html`;
          
          navHtml += `
            <li>
              <a href="${targetUrl}" class="dropdown-link">${item.name}</a>
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

  // 📌 4. 사이버틱 토스트 메시지 생성 및 클립보드 복사 기능
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
    
    // 3초 후 사라짐
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
  };

  // 📌 5. Footer 동적 생성
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

  // DOM 로드 완료 후 실행
  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
  });
})();
