# *SC — SISTAR Company | Master Integrated Tech Stack (Infra & Web Architecture)

## [PART 1] Web Generation & AI Agent Orchestration Rules (Latest Confirmed)
- **Hybrid Web Architecture:**
  - **Showcase & Gate Webs:** Pure Static MPA (index.html, inline/common CSS & JS, pinned CDN gsap@3.12.5) deployed on Cloudflare Pages via GitHub. Zero authentication barrier.
  - **2-Depth Navigator Rule:** Top Universe Navigator displays Root Domain + 1st-level sub-folders. Deeper Companies/Projects render via in-page interactive tabs/modals.
  - **Commercial Apps:** Decoupled SPA/Apps backed by Supabase, Dify, and Cloud Run.
- **Mandatory Pre-Flight Rules for gy cli & GitHub Copilot:**
  1. **Ms. Scarlet RAG First:** Before writing domain-specific copy or business rules, query Ms. Scarlet via C:\projects\ms_scarlet\ask_scarlet.ps1.
  2. **Database & Workflow Sync:** Use supabase-db MCP for table schemas and dify MCP/API for workflows.
  3. **Dual AI Workflow:** Generate structure/design with Antigravity (gy), and review/fix responsiveness & semantics with GitHub Copilot.

---

## [PART 2] Initial Infrastructure, Domain & Deployment Specifications
# TECH STACK & ARCHITECTURE CONSTITUTION (v4.0)

## 1. 프론트엔드 아키텍처 이원화 (Gate Web vs Active App)

### Type A — 통합 게이트 및 브랜드 웹 (`denniiku/sc-sistarcompany`)
- **목적:** 설명, 정보 전달, 신뢰성 확보, 앱 이동 관문(Gate), 자동화된 콘텐츠/블로그 포스팅 수용.
- **기술 원칙 (No Complex SPA):** 
  - 무거운 클라이언트 라우팅(SPA) 및 불필요한 인증(Auth) 로직 완전 배제.
  - 초고속 로딩과 검색엔진 최적화(SEO)를 위해 **Static HTML/CSS/JS** 또는 **SSG(Static Site Generation - Astro / Next.js Static Export)** 방식 채택.
  - 단일 레포지토리(`denniiku/sc-sistarcompany`)에서 메인 랜딩 및 4대 서브도메인 게이트 페이지를 통합 관리.
- **배포 타겟:** **Cloudflare Pages** (무제한 무료 트래픽, 글로벌 에지 캐싱, 상업적 이용 100% 무료 허용) 및 Firebase Hosting 연동.

### Type B — 실제 구동형 상용 웹앱 (Qubit & Scarlet Active Apps)
- **목적:** 사용자 로그인, 실시간 AI 에이전트 구동, 알고리즘 연산, 결제 및 데이터 처리가 일어나는 실제 애플리케이션.
- **기술 원칙:** 각 앱은 게이트 웹과 분리된 **독립 GitHub 저장소**를 가지며, Docker 컨테이너 표준을 따른다.
- **배포 타겟:** 
  1. **Google Cloud Run (주력):** Docker 기반 서버리스 컨테이너 (Scale-to-Zero로 유휴 비용 0원, 무거운 연산 및 웹소켓 완벽 지원).
  2. **Cloudflare Pages/Workers:** 경량 프론트엔드 웹앱.
  3. **Vercel (Hobby Only):** 상용화 전 `sistarcompany-ai` 목업/트라이얼의 빠른 내부 프리뷰 용도로만 제한 사용.

---

## 2. 백엔드 3원화 전략 (3-Pillar Backend Strategy)
통합 게이트 웹은 백엔드 의존성을 최소화(Static)하고, 실제 구동되는 앱들은 성격에 맞춰 아래 3대 백엔드를 사용한다.

### Pillar 1 — NoSQL Backend: Google Firebase (프로젝트별 격리)
- **`sc-sistarcompany`:** 통합 게이트 웹 관련 경량 데이터(문의 접수, 자동 포스팅 메타데이터 등) 관리.
- **`sc-scarletai`:** Scarlet AI 브랜드 산하 구동형 앱들의 Auth 및 NoSQL(Firestore) 백엔드.
- **`sc-qubitbiz`:** Qubit Algorithm 기반 구동형 사업 앱들의 Auth 및 NoSQL 백엔드.
- **`sc-bizgalaxy` / `sc-bizhub`:** 갤러리 및 허브 관련 앱 전용 백엔드.
- **`sistarcompany-ai`:** 상용화 전 AI 트라이얼/목업 전용 샌드박스 (AI Studio 연동).

### Pillar 2 — SQL Backend: Self-Hosted Supabase (ERP & 정형 데이터)
- **용도:** 사내 핵심 ERP(`sc-erp-ai-centers`) 및 정형 데이터/트랜잭션이 필요한 Qubit/Scarlet 상용 앱 백엔드.
- **격리 규칙 (Schema Isolation):** 신규 SQL 앱은 단일 Supabase 내 **독립 PostgreSQL Schema**를 생성하여 ERP 데이터(`public` 스키마)와 철저히 분리. 대형 상용 앱만 신규 GCP VM으로 독립 증설.
- **보안 규칙:** 모든 테이블 생성 시 `ENABLE ROW LEVEL SECURITY (RLS)` 필수 적용 및 Cloudflare HTTPS(`supabase.sistarcompany.com`) 보안 경유.

### Pillar 3 — Intelligence & RAG Backend: Vertex AI & Dify
- **Ms. Scarlet Core:** Google Cloud Vertex AI (Agent Platform & Agent Registry 기반 MCP 도구 제어).
- **Dify Knowledges (`dify.sistarcompany.com`):** 사내 전체 지식(ERP 연동) 및 개별 프로젝트(웹/앱)별 전용 RAG(검색 증강 생성) 데이터베이스 역할 수행.
