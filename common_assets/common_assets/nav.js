(function() {
  const TREE = [
    { t: "🔺 *sc - sistar company", u: "https://sistarcompany.com", c: [
      { t: "🔸 *sc - sistar company", p: "/a-sistar-company", s: ["signal-star","greetings-team-sistar","sistar-company","identity","pp-dd-m-ccc-p","superior-to","team-sistar","sistar-scm","sistar-crm"] },
      { t: "🔸 sistar int'l", p: "/sistar-intl", s: ["sc-global-nodes"] },
      { t: "🔸 associations int'l", p: "/associations-intl", s: ["ai-trade-alliance","ai-data-alliance"] }
    ]},
    { t: "🔺 qubit-algorithm", u: "https://qubit-algorithm.sistarcompany.com", c: [
      { t: "🔸 qubit algorithm", p: "/qubit-algorithm", s: [] },
      { t: "🔸 cosmoseed biz models", p: "/cosmoseed-biz-models", s: [] }
    ]},
    { t: "🔺 challengers", u: "https://challengers.sistarcompany.com", c: [
      { t: "🔸 sistar challengers", p: "/sistar-challengers", s: ["invitation-letter","spirits","vibe-working","procedures","qna","orientations"] },
      { t: "🔸 vibe-working", p: "/vibe-working", s: ["challengers-intl","sistar-vibe-working"] }
    ]},
    { t: "🔺 ir-pitchdeck", u: "https://ir-pitchdeck.sistarcompany.com", c: [
      { t: "🔸 reports & pitchdecks", p: "/reports", s: [] }
    ]},
    { t: "🔺 media", u: "https://media.sistarcompany.com", c: [
      { t: "🔸 sistar studio", p: "/sistar-studio", s: [] },
      { t: "🔸 the sistar post", p: "/the-sistar-post", s: [] }
    ]},
    { t: "🔺 intelligence-core", u: "https://intelligence-core.sistarcompany.com", c: [
      { t: "🔸 sistar bi", p: "/sistar-bi", s: ["qubit-erp","ai-centers","rag-fine-tuning","intelligence-on-tab","dynamic-pricing","bnpl","smart-logistics","space-sharing","open-accounts","project-generator","scarlet-web-builder","scarlet-web-working"] },
      { t: "🔸 sistar a/c", p: "/sistar-ac", s: [] },
      { t: "🔸 sistar i/t", p: "/sistar-it", s: [] },
      { t: "🔸 sistar s/r", p: "/sistar-sr", s: ["robo-blocks"] },
      { t: "🔸 sistar a/b & w/a", p: "/sistar-wa", s: [] },
      { t: "🔸 sistar exo-brain", p: "/sistar-exo-brain", s: ["and-i"] },
      { t: "🔸 sistar df", p: "/sistar-df", s: [] },
      { t: "🔸 sistar mmd & b/d", p: "/sistar-mmd", s: [] }
    ]},
    { t: "🔺 scarlet-ai", u: "https://scarlet-ai.sistarcompany.com", c: [
      { t: "🔸 int'l ai trading platform", p: "/intl-ai-trading", s: [] },
      { t: "🔸 ai-commerce platform ind.", p: "/ai-commerce-ind", s: [] },
      { t: "🔸 mall.sisTV & ms. scarlet", p: "/mall-sistv", s: [] },
      { t: "🔸 robot market & on-demand", p: "/robot-market", s: [] },
      { t: "🔸 b2b / resell / siscart / sisdiet", p: "/b2b", s: [] }
    ]},
    { t: "🔺 qubit-biz", u: "https://qubit-biz.sistarcompany.com", c: [
      { t: "🔸 qubit erp", p: "/qubit-erp", s: [] },
      { t: "🔸 c.a.n. (ceo action note ai)", p: "/ceo-action-note", s: [] },
      { t: "🔸 qubit marketplace & games", p: "/qubit-marketplace", s: [] },
      { t: "🔸 qubit mkt & bank", p: "/qubit-bank", s: ["affiliators-program","time-space-idea-bank","petfood-bank"] },
      { t: "🔸 exo brain / star / ads / taxes", p: "/qubit-star", s: [] }
    ]},
    { t: "🔺 biz-galaxy", u: "https://biz-galaxy.sistarcompany.com", c: [
      { t: "🔸 sistar mind company", p: "/sistar-mind-company", s: ["mind-navi","nfq","ai-companion","mind-test"] },
      { t: "🔸 sispet & sistar medix", p: "/sispet", s: ["scarlet-the-cat","forever-young-dog","nbs","dazzle","sistar-medix"] },
      { t: "🔸 aquasis / at / ei / sis food", p: "/sis-food", s: ["aquasis-ai","flexkids-ai","sis-proteins","java-nature-premium"] },
      { t: "🔸 life / studio / beauty / dx / pharm / loa", p: "/sistar-life", s: ["studio-butter","sismii","sistar-dx","sispharm","sisloa"] }
    ]},
    { t: "🔺 biz-hub", u: "https://biz-hub.sistarcompany.com", c: [
      { t: "🔸 sistar & co / brands", p: "/sistar-and-co", s: ["petfood-bank","co-branding"] },
      { t: "🔸 int'l tech trading & data factory", p: "/intl-tech-trading", s: [] },
      { t: "🔸 sistar frenz & campaigns", p: "/sistar-frenz", s: ["zero-wastage","sistar-mint","suu","iruka-is-back","sistar-lp","sistar-solutions"] }
    ]}
  ];

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("sc-left-nav")) return;
    document.body.classList.add("sc-nav-open");
    const nav = document.createElement("aside");
    nav.id = "sc-left-nav";
    let html = `<div class="sc-nav-top">
      <a href="https://sistarcompany.com" class="sc-brand"><span class="sc-brand-full">*sc - sistarcompany</span><span class="sc-brand-short">*sc</span></a>
      <div><button class="sc-btn" id="sc-fold-btn">☰</button></div>
    </div><div class="sc-nav-body">`;
    TREE.forEach(g => {
      html += `<div class="sc-l1"><a href="${g.u}">${g.t}</a><div class="sc-l2">`;
      g.c.forEach(c => {
        const hasSub = c.s && c.s.length > 0;
        html += `<div class="sc-l2-wrap"><div class="sc-l2-row"><a href="${g.u}${c.p}">${c.t}</a>${hasSub ? '<span class="sc-tgl">▾</span>' : ''}</div>`;
        if (hasSub) {
          html += `<div class="sc-l3">` + c.s.map(s => `<a href="${g.u}${c.p}/${s}">🔹 ${s.replace(/-/g,' ')}</a>`).join('') + `</div>`;
        }
        html += `</div>`;
      });
      html += `</div></div>`;
    });
    html += `</div>`;
    nav.innerHTML = html;
    document.body.prepend(nav);

    document.getElementById("sc-fold-btn").onclick = () => {
      const f = document.body.classList.toggle("sc-nav-folded");
      document.body.classList.toggle("sc-nav-open", !f);
    };
    nav.querySelectorAll(".sc-l2-row").forEach(r => {
      r.onclick = (e) => {
        if (e.target.classList.contains("sc-tgl") || e.target === r) {
          e.preventDefault();
          r.parentElement.classList.toggle("open");
        }
      };
    });
  });
})();
