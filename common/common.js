document.addEventListener("DOMContentLoaded", async () => {
  // 1. Navigation Bar 및 Logo 주입
  const headerHTML = `
    <header class="global-header">
      <div class="logo">
        <a href="/"><img src="/assets/logo.png" alt="Company Logo" /></a>
      </div>
      <nav><ul id="nav-menu-list"></ul></nav>
    </header>
  `;
  document.getElementById("common-header")?.insertAdjacentHTML("afterbegin", headerHTML);

  // 2. Footer 및 공통 정보 주입
  const footerHTML = `
    <footer class="global-footer">
      <p>© 2026 My App Studio. All rights reserved.</p>
      <p>Contact: support@example.com | Terms of Service</p>
    </footer>
  `;
  document.getElementById("common-footer")?.insertAdjacentHTML("afterbegin", footerHTML);

  // 3. menu.json에서 동적으로 메뉴 불러와서 Nav에 추가
  try {
    const res = await fetch("/data/menu.json");
    const menuData = await res.json();
    const navUl = document.getElementById("nav-menu-list");
    
    menuData.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.url}">${item.title}</a>`;
      navUl.appendChild(li);
    });
  } catch (err) {
    console.error("Navigation menu load failed:", err);
  }
});
