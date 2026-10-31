# *SC — SISTAR Company | Master Tech Stack & Architecture

## 1. Hybrid Web Architecture
- **Gate & Showcase Webs:** Pure Static MPA (`index.html`, inline/common CSS & JS, `gsap@3.12.5`) deployed on Cloudflare Pages via GitHub.
- **2-Depth Navigator Rule:** Top `Universe Navigator` displays Root Domain + 1st-level sub-folders. Deeper Companies/Projects render via in-page tabs/modals.
- **Commercial Apps:** Decoupled SPA/Apps backed by Supabase, Dify, and Cloud Run.

## 2. Mandatory Rules for `agy cli` & Copilot
- **Ms. Scarlet RAG First:** Query `C:\projects\ms_scarlet\ask_scarlet.ps1` before generating domain-specific copy or business rules.
- **Supabase & Dify MCP:** Use connected MCPs in `agy cli` for schema inspection and workflow deployment.
