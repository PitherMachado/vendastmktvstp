(() => {
  const STORAGE = {
    done: "mvat_done_v1",
    last: "mvat_last_v1"
  };

  // ===== DATA (módulos 1..8) =====
  const items = [
    {
      id: "m1",
      badge: "Módulo 1",
      tag: "Base mental",
      title: "Mentalidade de Dono e Alto Ticket",
      desc: "Como dono pensa, por que comissão pequena trava sua vida e como posicionar alto ticket com execução real.",
      href: "./modulo-1.html",
      group: "modules",
      status: "Não iniciado"
    },
    {
      id: "m2",
      badge: "Módulo 2",
      tag: "Bastidores",
      title: "Entendendo o Mercado Automotivo",
      desc: "Como a loja pensa, onde existe margem e como operar comissão dentro do lucro e do giro.",
      href: "./modulo-2.html",
      group: "modules",
      status: "Bloqueado"
    },
    {
      id: "m3",
      badge: "Módulo 3",
      tag: "Parcerias",
      title: "Estratégia das 10 Lojas",
      desc: "Como mapear lojas e fechar parcerias para nunca ficar refém de um único ponto de venda.",
      href: "./modulo-3.html",
      group: "modules",
      status: "Bloqueado"
    },
    {
      id: "m4",
      badge: "Módulo 4",
      tag: "Estrutura",
      title: "Estrutura da Parceria",
      desc: "Checklist de alinhamento, combinados, como proteger comissão e como conduzir negociação sem ruído.",
      href: "./modulo-4.html",
      group: "modules",
      status: "Bloqueado"
    },
    {
      id: "m5",
      badge: "Módulo 5",
      tag: "Captação",
      title: "Captação Digital",
      desc: "Leads, canais, abordagem e consistência para gerar oportunidade sem depender de indicação aleatória.",
      href: "./modulo-5.html",
      group: "modules",
      status: "Bloqueado"
    },
    {
      id: "m6",
      badge: "Módulo 6",
      tag: "Atendimento",
      title: "Atendimento Estratégico",
      desc: "Como conduzir conversa, proteger valor e manter o cliente no trilho até o fechamento.",
      href: "./modulo-6.html",
      group: "modules",
      status: "Bloqueado"
    },
    {
      id: "m7",
      badge: "Módulo 7",
      tag: "Controle",
      title: "Controle e Blindagem",
      desc: "Registros, rotinas e acompanhamento para previsibilidade de comissão e proteção do pipeline.",
      href: "./modulo-7.html",
      group: "modules",
      status: "Bloqueado"
    },
    {
      id: "m8",
      badge: "Módulo 8",
      tag: "Escala",
      title: "Primeiras Vendas e Escala",
      desc: "Como consolidar operação, corrigir gargalos e repetir o processo para aumentar consistência.",
      href: "./modulo-8.html",
      group: "modules",
      status: "Bloqueado"
    },

    // Materiais (opcional). Pode editar depois.
    {
      id: "mat1",
      badge: "Material",
      tag: "Operação",
      title: "Checklist Operacional",
      desc: "Lista rápida para organizar rotina e execução semanal (copiar e aplicar).",
      href: "./modulo-1.html#parte-4",
      group: "materials",
      status: "Disponível"
    }
  ];

  // ===== Helpers =====
  const $ = (q, el=document) => el.querySelector(q);
  const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

  function load(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    }catch(e){ return fallback; }
  }
  function save(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); }catch(e){}
  }

  // done state: { [id]: true/false }
  const doneState = load(STORAGE.done, {});
  const lastState = load(STORAGE.last, { id: null, ts: 0 });

  function setLast(id){
    save(STORAGE.last, { id, ts: Date.now() });
  }

  function computeProgress(){
    const moduleItems = items.filter(i => i.group === "modules");
    const total = moduleItems.length;
    const done = moduleItems.filter(i => doneState[i.id]).length;
    const pct = total ? Math.round((done/total) * 100) : 0;
    return { total, done, pct };
  }

  function applyProgressUI(){
    const { pct } = computeProgress();
    const bar = $("#progressBar");
    const pctEl = $("#progressPct");
    const txt = $("#progressText");
    if(bar) bar.style.width = pct + "%";
    if(pctEl) pctEl.textContent = pct + "%";
    if(txt) txt.textContent = pct + "%";
  }

  function pillClass(status){
    const s = (status || "").toLowerCase();
    if(s.includes("conclu")) return "pillOk";
    if(s.includes("andamento")) return "pillWarn";
    if(s.includes("bloq")) return "pillBad";
    if(s.includes("dispon")) return "pillOk";
    return "";
  }

  function cardTemplate(item){
    const done = !!doneState[item.id];
    const statusText = done ? "Concluído" : (item.status || "Não iniciado");
    const badgeGold = item.badge.toLowerCase().includes("módulo") ? "badgeGold" : "";
    const pillCls = done ? "pillOk" : pillClass(statusText);

    return `
      <article class="card" data-id="${item.id}" data-href="${item.href}" data-group="${item.group}">
        <div class="cardTop">
          <span class="badge ${badgeGold}">${item.badge}</span>
          <span class="pillSoft ${pillCls}">${statusText}</span>
        </div>
        <div class="cardBody">
          <div class="cardTag">${item.tag}</div>
          <h3 class="cardTitle">${item.title}</h3>
          <p class="cardDesc">${item.desc}</p>
        </div>
        <div class="cardFoot">
          <span class="pillSoft">Abrir →</span>
          <span class="pillSoft">${done ? "✓" : "•"}</span>
        </div>
      </article>
    `;
  }

  function renderRails(filterText=""){
    const q = filterText.trim().toLowerCase();

    const modules = items.filter(i => i.group === "modules")
      .filter(i => {
        if(!q) return true;
        return (
          i.badge.toLowerCase().includes(q) ||
          i.tag.toLowerCase().includes(q) ||
          i.title.toLowerCase().includes(q) ||
          i.desc.toLowerCase().includes(q)
        );
      });

    const materials = items.filter(i => i.group === "materials")
      .filter(i => !q || i.title.toLowerCase().includes(q) || i.tag.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q));

    // Continue: last item + not done items
    const cont = [];
    if(lastState && lastState.id){
      const last = items.find(i => i.id === lastState.id);
      if(last) cont.push(last);
    }
    // Add “in progress” modules: not done
    modules.forEach(m => { if(!doneState[m.id] && !cont.some(x => x.id === m.id)) cont.push(m); });
    // limit continue row
    const contFinal = cont.slice(0, 8);

    const railModules = $("#railModules");
    const railMaterials = $("#railMaterials");
    const railContinue = $("#railContinue");

    if(railModules) railModules.innerHTML = modules.map(cardTemplate).join("");
    if(railMaterials) railMaterials.innerHTML = materials.map(cardTemplate).join("");
    if(railContinue) railContinue.innerHTML = contFinal.length ? contFinal.map(cardTemplate).join("") : `<div style="padding:14px;color:rgba(255,255,255,.65)">Nada para continuar ainda.</div>`;

    // hide continue row if empty
    const continueRow = $("#continueRow");
    if(continueRow){
      continueRow.style.display = contFinal.length ? "" : "none";
    }
  }

  // ===== Modal =====
  const modal = $("#modal");
  const mBadge = $("#mBadge");
  const mTag = $("#mTag");
  const mTitle = $("#mTitle");
  const mDesc = $("#mDesc");
  const mStatus = $("#mStatus");
  const mGo = $("#mGo");
  const mDone = $("#mDone");

  let currentModalId = null;

  function openModal(itemId){
    const item = items.find(i => i.id === itemId);
    if(!item || !modal) return;

    currentModalId = item.id;

    const done = !!doneState[item.id];
    const statusText = done ? "Concluído" : (item.status || "Não iniciado");

    mBadge.textContent = item.badge;
    mTag.textContent = item.tag;
    mTitle.textContent = item.title;
    mDesc.textContent = item.desc;
    mStatus.textContent = statusText;

    mGo.href = item.href;
    mGo.onclick = () => { setLast(item.id); return true; };

    mDone.checked = done;
    mDone.onchange = () => {
      doneState[item.id] = !!mDone.checked;
      save(STORAGE.done, doneState);
      applyProgressUI();
      renderRails($("#search")?.value || "");
      // update status pill inside modal
      mStatus.textContent = mDone.checked ? "Concluído" : (item.status || "Não iniciado");
    };

    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(){
    if(!modal) return;
    modal.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    currentModalId = null;
  }

  function bindModalClose(){
    if(!modal) return;
    $$("[data-close]", modal).forEach(el => el.addEventListener("click", closeModal));
    window.addEventListener("keydown", (e) => {
      if(e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
    });
  }

  // ===== Rails arrows =====
  function scrollRail(railEl, dir){
    if(!railEl) return;
    const step = Math.max(280, Math.floor(railEl.clientWidth * 0.85));
    railEl.scrollBy({ left: dir === "left" ? -step : step, behavior:"smooth" });
  }

  function bindArrows(){
    $$(".rowSection").forEach(section => {
      const railName = section.querySelector(".rail")?.getAttribute("data-rail");
      const list =
        railName === "modules" ? $("#railModules") :
        railName === "materials" ? $("#railMaterials") :
        railName === "continue" ? $("#railContinue") : null;

      $$(".arrow", section).forEach(btn => {
        btn.addEventListener("click", () => {
          const dir = btn.getAttribute("data-dir");
          scrollRail(list, dir);
        });
      });
    });
  }

  // ===== Click cards -> modal =====
  function bindCardClicks(){
    const root = $(".page");
    if(!root) return;

    root.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if(!card) return;

      const id = card.getAttribute("data-id");
      if(!id) return;

      openModal(id);
    });

    root.addEventListener("keydown", (e) => {
      if(e.key !== "Enter") return;
      const card = e.target.closest(".card");
      if(!card) return;
      const id = card.getAttribute("data-id");
      if(!id) return;
      openModal(id);
    });
  }

  // ===== Continue button =====
  function bindContinue(){
    const btn = $("#focusContinue");
    if(!btn) return;
    btn.addEventListener("click", () => {
      const id = load(STORAGE.last, { id:null }).id;
      const item = id ? items.find(i => i.id === id) : null;
      if(item){
        setLast(item.id);
        window.location.href = item.href;
        return;
      }
      // fallback: first not done module
      const first = items.find(i => i.group === "modules" && !doneState[i.id]);
      window.location.href = (first ? first.href : "./modulo-1.html");
    });
  }

  // ===== Reset =====
  function bindReset(){
    const btn = $("#resetBtn");
    if(!btn) return;
    btn.addEventListener("click", () => {
      if(!confirm("Tem certeza que deseja resetar seu progresso neste dispositivo?")) return;
      localStorage.removeItem(STORAGE.done);
      localStorage.removeItem(STORAGE.last);
      Object.keys(doneState).forEach(k => delete doneState[k]);
      applyProgressUI();
      renderRails($("#search")?.value || "");
    });
  }

  // ===== Search =====
  function bindSearch(){
    const input = $("#search");
    if(!input) return;
    input.addEventListener("input", () => renderRails(input.value));
  }

  // ===== Boot =====
  function boot(){
    // year
    const y = $("#year");
    if(y) y.textContent = new Date().getFullYear();

    applyProgressUI();
    renderRails("");
    bindArrows();
    bindCardClicks();
    bindModalClose();
    bindContinue();
    bindReset();
    bindSearch();
  }

  boot();
})();
