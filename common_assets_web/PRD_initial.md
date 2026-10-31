# PRD: *SC (SISTAR Company) AI App Factory & Gate Ecosystem (v4.1 Final)

## 1. 기업 정체성 및 핵심 브랜드 철학 (*SC Identity)
- **Company Name:** SISTAR Company (약칭: **`*SC`**)
- **AI Executive Secretary (`Ms. Scarlet`):** 
  - `*SC`의 총괄 AI 비서이자 자율 에이전트.
  - 사내 ERP(`sc-erp-ai-centers`), 사내 RAG(Dify Knowledges), 모든 자동화 파이프라인에 전권 접근.
  - 아이디어 입력 -> 프로젝트 생성 -> 5대 기획 문서(`.md`) 작성 -> 웹/앱 개발(`agy cli`) -> 자동 배포 및 웹 포스팅까지 전 과정 총괄.
- **양대 핵심 코어 브랜드:**
  1. **`Qubit` (Qubit Biz):** 독자 개발한 **Qubit Algorithm**을 비즈니스에 적용한 모든 상용 사업 브랜드 (`Qubit` 타이틀 부여).
  2. **`Scarlet` (Scarlet AI):** AI Agent 기반의 모든 상용 웹앱 및 지능형 서비스를 대표하는 플래그십 AI 브랜드.

## 2. 웹(Gate)과 앱(App)의 역할 분리 원칙
- **Gate Web (설명·정보·신뢰·관문):** 무거운 기능이나 복잡한 인증, 인위적인 SPA 방식을 배제하고, 한 페이지 안에서 명확한 정보 전달과 신뢰성 구축, 그리고 실제 앱으로 이동시키는 게이트(Gate) 역할에 집중한다.
- **Active App (실제 구동 앱):** 실제 구동과 DB 연산이 필요한 웹앱은 게이트 웹의 링크를 통해 이동하며, 별도의 GitHub 레포지토리(`C:\projects\sc_app`)와 독립 백엔드에서 구동된다.

## 3. 도메인 및 GitHub 레포지토리 최종 매핑 구조 (SC Web)
로컬 PC의 `C:\projects\sc_web\` 하위 폴더와 GitHub 저장소, 도메인을 1:1로 매칭하여 관리한다.

1. **메인 본부 웹 (`sistarcompany.com`)**
   - **하위 섹션:** `/headquarters`, `/intelligence-core`, `/qubit-algorithm`, `/command-centers`
   - **GitHub Repo:** `denniiku/sc-sistarcompany`
   - **Local Path:** `C:\projects\sc_web\sc-sistarcompany`
2. **Scarlet AI 게이트 웹 (`scarlet-ai.sistarcompany.com`)**
   - **GitHub Repo:** `denniiku/scarlet-ai`
   - **Local Path:** `C:\projects\sc_web\scarlet-ai`
3. **Qubit Biz 게이트 웹 (`qubit-biz.sistarcompany.com`)**
   - **GitHub Repo:** `denniiku/qubit-biz`
   - **Local Path:** `C:\projects\sc_web\qubit-biz`
4. **Biz Galaxy 게이트 웹 (`biz-galaxy.sistarcompany.com`)**
   - **GitHub Repo:** `denniiku/biz-galaxy`
   - **Local Path:** `C:\projects\sc_web\biz-galaxy`
5. **Biz Hub 게이트 웹 (`biz-hub.sistarcompany.com`)**
   - **GitHub Repo:** `denniiku/biz-hub`
   - **Local Path:** `C:\projects\sc_web\biz-hub`

## 4. 특수 목적 및 개별 프로젝트 저장소
- **AI Trials & Mockups (`denniiku/sistarcompany-ai`):** 상용화 전 사내 테스트, 목업(Mockup), 실험용 AI 프로젝트 관리 (`C:\projects\sistarcompany-ai`).
- **Commercial Active Apps:** `Qubit` 및 `Scarlet` 산하의 실제 구동형 상용 앱들은 프로젝트별 독립 GitHub 레포지토리로 생성 및 배포.