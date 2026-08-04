const fs = require('fs');
const path = require('path');

// 📌 1. 배포 파일(deploy.yml)에 명시된 5개 프로젝트 베이스 경로
const PROJECTS = [
  { category: "*SC", baseUrl: "https://sc-sistarcompany.web.app", baseDir: "apps/project1-core/landing" },
  { category: "SCARLET AI", baseUrl: "https://sc-scarletai.web.app", baseDir: "apps/project2-scarlet/scarlet-ai" },
  { category: "QUBIT BIZ", baseUrl: "https://sc-qubitbiz.web.app", baseDir: "apps/project3-qubitbiz/qubit-biz" },
  { category: "BIZ HUB", baseUrl: "https://sc-bizhub.web.app", baseDir: "apps/project4-bizhub/biz-hub" },
  { category: "BIZ GALAXY", baseUrl: "https://sc-bizgalaxy.web.app", baseDir: "apps/project5-bizgalaxy/biz-galaxy" }
];

// 📌 2. 각 프로젝트 폴더를 스캔하여 메뉴 데이터 생성
const navData = PROJECTS.map(proj => {
  const items = [];
  const projPath = path.join(__dirname, proj.baseDir);

  if (fs.existsSync(projPath)) {
    const folderContents = fs.readdirSync(projPath);
    
    folderContents.forEach(folder => {
      // common, data, 숨김 폴더 제외
      if (['common', 'data'].includes(folder.toLowerCase()) || folder.startsWith('.')) return;

      const folderPath = path.join(projPath, folder);
      
      if (fs.statSync(folderPath).isDirectory()) {
        const files = fs.readdirSync(folderPath);
        // index.html 파일 존재 여부 확인 (대소문자 무관)
        const indexFile = files.find(f => f.toLowerCase() === 'index.html');
        
        if (indexFile) {
          const indexPath = path.join(folderPath, indexFile);
          const htmlContent = fs.readFileSync(indexPath, 'utf-8');
          
          // <title> 태그 추출
          const match = htmlContent.match(/<title>(.*?)<\/title>/i);
          const title = match ? match[1].trim() : folder;
          
          items.push({
            name: title,
            folder: folder,
            url: `${proj.baseUrl}/${folder}/index.html`
          });
        }
      }
    });
  }

  return {
    category: proj.category,
    baseUrl: proj.baseUrl,
    items: items.length > 0 ? items : [{ name: "Main Gateway", url: `${proj.baseUrl}/` }]
  };
});

// 📌 3. common/nav-data.json 저장
const commonDir = path.join(__dirname, 'common');
if (!fs.existsSync(commonDir)) {
  fs.mkdirSync(commonDir);
}

fs.writeFileSync(path.join(commonDir, 'nav-data.json'), JSON.stringify(navData, null, 2));
console.log('✅ 네비게이션 스캔 및 [common/nav-data.json] 생성 완료!');
