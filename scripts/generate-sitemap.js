const fs = require('fs');
const path = require('path');

// 프로젝트별 기본 호스팅 도메인 매핑
const PROJECT_DOMAINS = {
  'project1-core': 'https://sc-sistarcompany.web.app',
  'project2-scarlet': 'https://sc-scarletai.web.app',
  'project3-qubitbiz': 'https://sc-qubitbiz.web.app',
  'project4-bizhub': 'https://sc-bizhub.web.app',
  'project5-bizgalaxy': 'https://sc-bizgalaxy.web.app'
};

const appsDir = path.join(__dirname, '../apps');
const siteMapPath = path.join(__dirname, '../site-map.json');

let sitemap = [];

// 1. 기본 메인 프로젝트 도메인 등록
Object.entries(PROJECT_DOMAINS).forEach(([key, domain]) => {
  sitemap.push({
    title: key.toUpperCase(),
    url: domain
  });
});

// 2. apps/ 폴더 탐색 함수
function scanDirectory(dirPath, projectKey) {
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file.name);

    if (file.isDirectory()) {
      // node_modules, dist, .git 등 제외
      if (!['node_modules', 'dist', '.git', 'build'].includes(file.name)) {
        scanDirectory(fullPath, projectKey);
      }
    } else if (file.isFile() && file.name.endsWith('.html')) {
      // index.html 및 서브 html 경로 계산
      const baseUrl = PROJECT_DOMAINS[projectKey];
      let relativePath = fullPath
        .replace(path.join(appsDir, projectKey), '')
        .replace(/\\/g, '/'); // Windows 경로 대응

      // public/ 또는 dist/ 등 내부 폴더명 제거
      relativePath = relativePath.replace(/^\/(landing|scarlet-ai|qubit-biz|biz-hub|biz-galaxy|public|dist)/, '');

      if (relativePath.endsWith('/index.html')) {
        relativePath = relativePath.replace('/index.html', '');
      }

      const finalUrl = `${baseUrl}${relativePath}`;
      const pageName = file.name === 'index.html' 
        ? relativePath.split('/').filter(Boolean).pop() || projectKey
        : file.name.replace('.html', '');

      // 중복 체크 후 추가
      if (!sitemap.some((item) => item.url === finalUrl)) {
        sitemap.push({
          title: pageName.charAt(0).toUpperCase() + pageName.slice(1),
          url: finalUrl
        });
      }
    }
  });
}

// apps/ 하위 탐색 실행
if (fs.existsSync(appsDir)) {
  const projects = fs.readdirSync(appsDir);
  projects.forEach((proj) => {
    if (PROJECT_DOMAINS[proj]) {
      scanDirectory(path.join(appsDir, proj), proj);
    }
  });
}

// 3. site-map.json 업데이트 및 저장
fs.writeFileSync(siteMapPath, JSON.stringify(sitemap, null, 2), 'utf8');
console.log(`✅ site-map.json 이 성공적으로 업데이트되었습니다! (총 ${sitemap.length}개 링크)`);
