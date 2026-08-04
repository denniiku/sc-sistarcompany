const fs = require('fs');
const path = require('path');

// 5대 핵심 프로젝트 및 파이어베이스 도메인 정의
const PROJECTS = [
  { category: "*SC", baseUrl: "https://sc-sistarcompany.web.app", prefix: "project1-" },
  { category: "Scarlet Ai", baseUrl: "https://sc-scarletai.web.app", prefix: "project2-" },
  { category: "Qubit Biz", baseUrl: "https://sc-qubitbiz.web.app", prefix: "project3-" },
  { category: "Biz Hub", baseUrl: "https://sc-bizhub.web.app", prefix: "project4-" },
  { category: "Biz Galaxy", baseUrl: "https://sc-bizgalaxy.web.app", prefix: "project5-" }
];

const appsDir = path.join(__dirname, 'apps'); // Apps 폴더 위치

const navData = PROJECTS.map(proj => {
  const items = [];
  
  // Apps 폴더 내 projectX- 로 시작하는 폴더 탐색
  if (fs.existsSync(appsDir)) {
    const subDirs = fs.readdirSync(appsDir);
    subDirs.forEach(subDir => {
      if (subDir.startsWith(proj.prefix)) {
        const projPath = path.join(appsDir, subDir);
        const folderContents = fs.readdirSync(projPath);
        
        folderContents.forEach(folder => {
          const indexPath = path.join(projPath, folder, 'index.html');
          if (fs.existsSync(indexPath)) {
            const htmlContent = fs.readFileSync(indexPath, 'utf-8');
            // <title> 태그 자동 추출
            const match = htmlContent.match(/<title>(.*?)<\/title>/i);
            const title = match ? match[1].trim() : folder;
            
            items.push({
              name: title,
              folder: folder,
              url: `${proj.baseUrl}/${folder}/index.html`
            });
          }
        });
      }
    });
  }

  return {
    category: proj.category,
    baseUrl: proj.baseUrl,
    items: items.length > 0 ? items : [{ name: "Main Gateway", url: `${proj.baseUrl}/` }]
  };
});

// nav-data.json 파일로 저장
fs.writeFileSync(path.join(__dirname, 'common', 'nav-data.json'), JSON.stringify(navData, null, 2));
console.log('✅ 네비게이션 자동 생성 완료!');
