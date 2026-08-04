const fs = require('fs');
const path = require('path');

// 📌 1. 프로젝트 베이스 경로 정의
const PROJECTS = [
  { category: "*SC", baseUrl: "https://sc-sistarcompany.web.app", baseDir: "apps/project1-core/landing" },
  { category: "SCARLET AI", baseUrl: "https://sc-scarletai.web.app", baseDir: "apps/project2-scarlet/scarlet-ai" },
  { category: "QUBIT BIZ", baseUrl: "https://sc-qubitbiz.web.app", baseDir: "apps/project3-qubitbiz/qubit-biz" },
  { category: "BIZ HUB", baseUrl: "https://sc-bizhub.web.app", baseDir: "apps/project4-bizhub/biz-hub" },
  { category: "BIZ GALAXY", baseUrl: "https://sc-bizgalaxy.web.app", baseDir: "apps/project5-bizgalaxy/biz-galaxy" }
];

// 📌 Helper: HTML 파일에서 <title> 추출하는 함수
function getHtmlTitle(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const htmlContent = fs.readFileSync(filePath, 'utf-8');
      const match = htmlContent.match(/<title>(.*?)<\/title>/i);
      if (match && match[1].trim()) {
        return match[1].trim();
      }
    }
  } catch (e) {
    console.error(`Error reading title from ${filePath}:`, e);
  }
  return null;
}

// 📌 2. 각 프로젝트 폴더 스캔
const navData = PROJECTS.map(proj => {
  const items = [];
  const projPath = path.join(__dirname, proj.baseDir);

  if (fs.existsSync(projPath)) {
    // 🔥 [핵심 추가] 1. 해당 프로젝트 대문(루트/index.html)의 <title> 먼저 가져오기 시도
    const mainIndexPath = path.join(projPath, 'index.html');
    const mainTitle = getHtmlTitle(mainIndexPath);

    // 대문 타이틀이 존재하면 메인 게이트웨이 이름으로 지정 (기본값: "Main Gateway")
    const rootName = mainTitle || "Main Gateway";
    items.push({
      name: rootName,
      folder: "root",
      url: `${proj.baseUrl}/`
    });

    // 2. 1단계 하위 폴더 스캔 (서브 메뉴용)
    const folderContents = fs.readdirSync(projPath);
    
    folderContents.forEach(folder => {
      if (['common', 'data'].includes(folder.toLowerCase()) || folder.startsWith('.')) return;

      const folderPath = path.join(projPath, folder);
      
      if (fs.statSync(folderPath).isDirectory()) {
        const files = fs.readdirSync(folderPath);
        const indexFile = files.find(f => f.toLowerCase() === 'index.html');
        
        if (indexFile) {
          const indexPath = path.join(folderPath, indexFile);
          const subTitle = getHtmlTitle(indexPath) || folder;
          
          items.push({
            name: subTitle,
            folder: folder,
            url: `${proj.baseUrl}/${folder}/index.html`
          });
        }
      }
    });
  } else {
    // 폴더 자체가 없을 때 예외 처리
    items.push({ name: "Main Gateway", url: `${proj.baseUrl}/` });
  }

  return {
    category: proj.category,
    baseUrl: proj.baseUrl,
    items: items
  };
});

// 📌 3. common/nav-data.json 저장
const commonDir = path.join(__dirname, 'common');
if (!fs.existsSync(commonDir)) {
  fs.mkdirSync(commonDir);
}

fs.writeFileSync(path.join(commonDir, 'nav-data.json'), JSON.stringify(navData, null, 2));
console.log('✅ 스캔 완료! [common/nav-data.json] 파일이 갱신되었습니다.');
