
(() => {
  // ========= DATA (conteúdo extraído do seu HTML) =========
  // Observação: os links são os seus (mercadopublicoonline.com/modulo-x etc.)
  const items = [
    {
      id: "m1",
      badge: "Módulo 1",
      tag: "Base mental",
      title: "Mentalidade de Dono e Alto Ticket",
      desc: "Como dono pensa, por que comissão pequena trava sua vida e como posicionar alto ticket com execução real.",
      href: "https://mercadopublicoonline.com/modulo-1",
      status: "Não iniciado",
      group: "modules"
    },
    {
      id: "m2",
      badge: "Módulo 2",
      tag: "Bastidores",
      title: "Entendendo o Mercado Automotivo",
      desc: "Como loja pensa, o que o gerente quer e onde sua comissão existe dentro do lucro e do giro.",
      href: "https://mercadopublicoonline.com/modulo-2",
      status: "Em andamento",
      group: "modules"
    },
    {
      id: "m3",
      badge: "Módulo 3",
      tag: "Parcerias",
      title: "Estratégia das 10 Lojas",
      desc: "Como mapear 10 lojas e fechar pelo menos 3 parcerias para nunca ficar refém de uma só.",
      href: "https://mercadopublicoonline.com/modulo-3",
      status: "Não iniciado",
      group: "modules"
    },
    {
      id: "m4",
      badge: "Módulo 4",
      tag: "Acordo",
      title: "Estrutura da Parceria",
      desc: "Como alinhar comissão, registro, prazo e regras mínimas para reduzir risco e proteger a operação.",
      href: "https://mercadopublicoonline.com/modulo-4",
      status: "Alta prioridade",
      group: "modules"
    },
    {
      id: "m5",
      badge: "Módulo 5",
      tag: "Captação",
      title: "Captação Digital",
      desc: "Marketplace e grupos regionais, copy simples e posicionamento para gerar leads sem parecer “desesperado”.",
      href: "https://mercadopublicoonline.com/modulo-5",
      status: "Não iniciado",
      group: "modules"
    },
    {
      id: "m6",
      badge: "Módulo 6",
      tag: "Atendimento",
      title: "Atendimento Estratégico",
      desc: "Perguntas certas, qualificação, encaminhamento profissional e controle do cliente até o fechamento.",
      href: "https://mercadopublicoonline.com/modulo-6",
      status: "Não iniciado",
      group: "modules"
    },
    {
      id: "m7",
      badge: "Módulo 7",
      tag: "Blindagem",
      title: "Controle e Blindagem",
      desc: "Rotina simples de registro e acompanhamento para reduzir “furo” e garantir rastreio de indicação.",
      href: "https://mercadopublicoonline.com/modulo-7",
      status: "Não iniciado",
      group: "modules"
    },
    {
      id: "m8",
      badge: "Módulo 8",
      tag: "Escala",
      title: "Primeiras Vendas e Escala",
      desc: "Plano de execução e como crescer com mais lojas e região sem bagunçar a operação.",
      href: "https://mercadopublicoonline.com/modulo-8",
      status: "Não iniciado",
      group: "modules"
    },
    {
      id: "manual",
      badge: "Material",
      tag: "Operacional",
      title: "Manual Operacional",
      desc: "Do primeiro contato à primeira comissão. Material para copiar e aplicar.",
      href: "https://mercadopublicoonline.com/manual-operacional/",
      status: "Material",
      group: "materials"
    }
  ];

  // ========= STORAGE =========
  const STORAGE_KEY = "mvat_progress_v2";

  function loadState(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    }catch(e){
      return {};
    }
  }
  function saveState(state){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
  }

  function computeProgress(){
    const state = loadState();
    const trackables = items.map(i => i.id);
    const total = trackables.length;
    const done = trackables.filter(id => state[id] === true).length;
    const pct = total ? Math.round((done/total)*100) : 0;

    const bar = document.getElementById("progressBar");
    const pctEl = document.getElementById("progressPct");
    const txt = document.getElementById("progressText");

    if(bar) bar.style.width = pct + "%";
    if(pctEl) pctEl.textContent = pct + "%";
    if(txt) txt.textContent = pct + "%";

    return { pct, done, total };
  }

  // ========= RENDER =========
  const railModules = document.getElementById("railModules");
  const railContinue = document.getElementById("railContinue");
  const railMaterials = document.getElementById("railMaterials");

  function pillClass(status){
    const s = (status || "").toLowerCase();
    if(s.includes("andamento")) return "pill pillWarn";
    if(s.includes("prioridade")) return "pill pillGood";
    if(s.includes("material")) return "pill pillSoft";
    return "pill pillSoft pillMuted";
  }

  function makeCard(item){
    const state = loadState();
    const done = state[item.id] === true;

    const el = document.createElement("div");
    el.className = "item";
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.dataset.id = item.id;
    el.dataset.title = item.title;
    el.dataset.tag = item.tag;
    el.dataset.status = item.status;
    el.dataset.href = item.href;
    el.dataset.desc = item.desc;
    el.dataset.badge = item.badge;

    el.innerHTML = `
      <div class="meta">
        <span class="badge">${escapeHtml(item.badge)}</span>
        <span class="tagGold">${escapeHtml(item.tag)}</span>
      </div>
      <h3 class="title">${escapeHtml(item.title)}</h3>
      <p class="desc">${escapeHtml(item.desc)}</p>
      <div class="itemFooter">
        <span class="${pillClass(done ? "Concluído" : item.status)}">
          ${escapeHtml(done ? "Concluído" : item.status)}
        </span>
        <a class="cta" href="${escapeAttr(item.href)}" target="_self" rel="noopener">Acessar →</a>
      </div>
    `;

    // abrir modal ao clicar (não se clicar no link)
    el.addEventListener("click", (e) => {
      if(e.target.closest("a")) return;
      openModal(item.id);
    });
    el.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        openModal(item.id);
      }
    });

    return el;
  }

  function renderAll(){
    if(railModules) railModules.innerHTML = "";
    if(railContinue) railContinue.innerHTML = "";
    if(railMaterials) railMaterials.innerHTML = "";

    const state = loadState();

    const modules = items.filter(i => i.group === "modules");
    const materials = items.filter(i => i.group === "materials");

    // Continue: em andamento + não concluídos
    const cont = items
      .filter(i => (i.status || "").toLowerCase().includes("andamento") && state[i.id] !== true)
      .concat(items.filter(i => state[i.id] !== true && i.group === "modules").slice(0, 2))
      .slice(0, 8);

    cont.forEach(i => railContinue?.appendChild(makeCard(i)));
    modules.forEach(i => railModules?.appendChild(makeCard(i)));
    materials.forEach(i => railMaterials?.appendChild(makeCard(i)));

    computeProgress();
  }

  // ========= FILTER (busca) =========
  const search = document.getElementById("search");
  function normalize(s){
    return (s || "")
      .toString()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }
  function filterModules(q){
    if(!railModules) return;
    const query = normalize(q);
    for(const card of railModules.children){
      const title = normalize(card.dataset.title);
      const tag = normalize(card.dataset.tag);
      const status = normalize(card.dataset.status);
      const ok = !query || title.includes(query) || tag.includes(query) || status.includes(query);
      card.style.display = ok ? "" : "none";
    }
  }
  search?.addEventListener("input", (e) => filterModules(e.target.value));

  // ========= MODAL =========
  const modal = document.getElementById("modal");
  const mBadge = document.getElementById("mBadge");
  const mTag = document.getElementById("mTag");
  const mTitle = document.getElementById("mTitle");
  const mDesc = document.getElementById("mDesc");
  const mStatus = document.getElementById("mStatus");
  const mGo = document.getElementById("mGo");
  const mDone = document.getElementById("mDone");

  let currentId = null;

  function openModal(id){
    const item = items.find(x => x.id === id);
    if(!item || !modal) return;

    currentId = id;

    const state = loadState();
    const done = state[id] === true;

    mBadge.textContent = item.badge;
    mTag.textContent = item.tag;
    mTitle.textContent = item.title;
    mDesc.textContent = item.desc;
    mStatus.textContent = done ? "Concluído" : item.status;
    mGo.href = item.href;
    mDone.checked = done;

    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(){
    if(!modal) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentId = null;
  }

  modal?.addEventListener("click", (e) => {
    if(e.target.matches("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeModal();
  });

  mDone?.addEventListener("change", () => {
    if(!currentId) return;
    const state = loadState();
    state[currentId] = mDone.checked;
    saveState(state);
    renderAll();
    // mantém modal atualizado
    const item = items.find(x => x.id === currentId);
    if(item) mStatus.textContent = mDone.checked ? "Concluído" : item.status;
  });

  // ========= CONTINUAR / RESET =========
  document.getElementById("focusContinue")?.addEventListener("click", () => {
    document.getElementById("continueRow")?.scrollIntoView({ behavior:"smooth", block:"start" });
  });

  document.getElementById("resetBtn")?.addEventListener("click", () => {
    if(!confirm("Tem certeza que deseja resetar seu progresso neste dispositivo?")) return;
    localStorage.removeItem(STORAGE_KEY);
    renderAll();
  });

  // ========= YEAR =========
  const year = document.getElementById("year");
  if(year) year.textContent = String(new Date().getFullYear());

  // ========= RAIL CONTROLS (setas + drag) =========
  function setupRail(railEl){
    const list = railEl.querySelector(".cardList");
    const left = railEl.parentElement.querySelector('.rowActions .arrow[data-dir="left"]');
    const right = railEl.parentElement.querySelector('.rowActions .arrow[data-dir="right"]');

    function scrollByCards(dir){
      const card = list.querySelector(".item");
      const amount = card ? (card.getBoundingClientRect().width + 12) * 2.2 : 600;
      list.scrollBy({ left: dir * amount, behavior:"smooth" });
    }
    left?.addEventListener("click", () => scrollByCards(-1));
    right?.addEventListener("click", () => scrollByCards(1));

    // drag / swipe
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const start = (x) => {
      isDown = true;
      startX = x;
      scrollLeft = list.scrollLeft;
      list.classList.add("dragging");
    };
    const move = (x) => {
      if(!isDown) return;
      const walk = (x - startX) * 1.05;
      list.scrollLeft = scrollLeft - walk;
    };
    const end = () => {
      isDown = false;
      list.classList.remove("dragging");
    };

    list.addEventListener("mousedown", (e) => start(e.pageX));
    list.addEventListener("mousemove", (e) => move(e.pageX));
    window.addEventListener("mouseup", end);

    list.addEventListener("touchstart", (e) => start(e.touches[0].pageX), { passive:true });
    list.addEventListener("touchmove", (e) => move(e.touches[0].pageX), { passive:true });
    list.addEventListener("touchend", end);

    // wheel horizontal
    list.addEventListener("wheel", (e) => {
      if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
        list.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive:false });
  }

  document.querySelectorAll(".rail").forEach(setupRail);

  // ========= PARTICLES (dourado) =========
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d", { alpha:true });

  function resize(){
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  addEventListener("resize", resize);
  resize();

  const P = [];
  function rand(a,b){ return a + Math.random()*(b-a); }

  function initParticles(){
    P.length = 0;
    const COUNT = Math.round(Math.sqrt(innerWidth * innerHeight) / 1.06);
    for(let i=0;i<COUNT;i++){
      P.push({
        x: rand(0, innerWidth),
        y: rand(0, innerHeight),
        r: rand(0.9, 2.4),
        vx: rand(-0.42, 0.42),
        vy: rand(-0.34, 0.34),
        a: rand(0.10, 0.52)
      });
    }
  }
  initParticles();
  addEventListener("resize", initParticles);

  function draw(){
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for(const p of P){
      p.x += p.vx; p.y += p.vy;
      if(p.x < -20) p.x = innerWidth + 20;
      if(p.x > innerWidth + 20) p.x = -20;
      if(p.y < -20) p.y = innerHeight + 20;
      if(p.y > innerHeight + 20) p.y = -20;

      ctx.beginPath();
      ctx.fillStyle = `rgba(247,201,72,${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }

    for(let i=0;i<P.length;i++){
      for(let j=i+1;j<P.length;j++){
        const a = P[i], b = P[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if(d < 170){
          const alpha = (1 - d/170) * 0.22;
          ctx.strokeStyle = `rgba(255,224,138,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();

  // ========= HELPERS =========
  function escapeHtml(str){
    return String(str ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }
  function escapeAttr(str){
    return escapeHtml(str).replaceAll("`","&#096;");
  }

  // ========= INIT =========
  renderAll();
  computeProgress();
})();
