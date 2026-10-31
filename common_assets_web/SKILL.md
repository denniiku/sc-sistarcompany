---
name: sc-motionsites-web-builder
description: Build award-level, cinematic Gate Webs and Landing Pages for *SC (SISTAR Company) and its 4 core subdomains using MotionSites techniques and *SC Brand Tokens.
---

# *SC MotionSites Web Builder (Customized for SISTAR Company)

Follow this workflow to build or upgrade any web portal in the *SC ecosystem (`sistarcompany.com`, `scarlet-ai`, `qubit-biz`, `biz-galaxy`, `biz-hub`).

## 1. *SC Mandatory Brand & Tech Stack Rules
- **Target Architecture:** Pure Static Single-File `index.html` (Inline `<style>` and `<script>`, Google Fonts, pinned CDN `gsap@3.12.5`), deployed via Cloudflare Pages.
- **Brand Mood:** Luminous Prismatic, Quantum-Tech, Architectural, Authoritative.

- **Color & Gradient Tokens:**
  - **Background Canvas (Prismatic Gradient):**
    - Fallback: `#f7f0ac`
    - Webkit: `-webkit-linear-gradient(to right, #f0acf7, #acf7f0, #f7f0ac)`
    - Standard: `linear-gradient(to right, #f0acf7, #acf7f0, #f7f0ac)`
  - **Typography & UI Palette (Color Hunt Slate Series):**
    - Primary Text / Headlines (`--sc-ink-primary`): `#27374D` (Deep Slate Navy)
    - Secondary Text / Body (`--sc-ink-secondary`): `#526D82` (Muted Steel Blue)
    - Borders & Dividers (`--sc-border`): `#9DB2BF` (Soft Cool Grey)
    - Glass Card Surface (`--sc-surface`): `#DDE6ED` (`rgba(221, 230, 237, 0.58)` with `backdrop-filter: blur(20px)`)

- **Core Corporate Copy (Must be preserved on HQ Gate Web):**
  1. "Starting November 2026, PT. SISTAR Indonesia (a SISTAR Company) is fully integrating the SISTAR family groups and proudly launching our new corporate identity: *SC — SISTAR Company."
  2. "Pioneering new ways of working and doing global business, *SC operates as a Full-Stack AI Commerce & International AI Trading enterprise—equipped with our proprietary Qubit Algorithm, developed by *SC for brand-new AI commerce and global trading."
  3. "Furthermore, this web portal is currently being fully upgraded into a next-generation platform to deliver brand-new AI experiences for our global partners and clients."

## 2. Execution Workflow
1. Apply the Prismatic Gradient background and `#27374D` / `#526D82` typography hierarchy on `html, body`.
2. Use GSAP (`gsap@3.12.5`) staggered reveal animations and frosted glass cards.
3. Include Ecosystem Navigation cards linking to `scarlet-ai.sistarcompany.com`, `qubit-biz.sistarcompany.com`, `biz-galaxy.sistarcompany.com`, and `biz-hub.sistarcompany.com`.
4. Respect `prefers-reduced-motion`, semantic HTML, and mobile responsiveness.