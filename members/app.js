(() => {
  /* =========================
     CONFIG / DATA
  ========================== */

  const STORAGE_KEY = "mvat_members_progress_v2";

  // Ajuste se quiser outro logo (se o ../assets/logo.svg não existir, ele só some)
  // Módulos apontando para /members/modulo-1/index.html etc.
  const items = [
    {
      id: "m1",
      type: "module",
      badge: "Módulo 1",
      tag: "Base mental",
      title: "Mentalidade de Dono e Alto Ticket",
      desc: "Como dono pensa, por que comissão pequena trava sua vida e como posicionar alto ticket com execução real.",
      href: "./modulo-1/index.html",
      locked: false,
    },
    {
      id: "m2",
      type: "module",
      badge: "Módulo 2",
      tag: "Bastidores",
      title: "Entendendo o Mercado Automotivo",
      desc: "Como a loja pensa, onde existe margem e como operar comissão dentro do lucro e do giro.",
      href: "./modulo-2/index.html",
      locked: false,
    },
    {
      id: "m3",
      type: "module",
      badge: "Módulo 3",
      tag: "Parcerias",
      title: "Estratégia das 10 Lojas",
      desc: "Como mapear 10 lojas e fechar parcerias para nunca ficar refém de um único ponto de venda.",
      href: "./modulo-3/index.html",
      locked: false,
    },
    {
      id: "m4",
      type: "module",
      badge: "Módulo 4",
      tag: "Estrutura",
      title: "Estrutura da Parceria",
      desc: "Checklist de alinhamento, combinados, como proteger comissão e conduzir negociação sem ruído.",
      href: "./modulo-4/index.html",
      locked: false,
    },
    {
      id: "m5",
      type: "module",
      badge: "Módulo 5",
      tag: "Captação",
      title: "Captação Digital",
      desc: "Leads, canais, abordagem e consistência para gerar oportunidade sem depender de indicação aleatória.",
      href: "./modulo-5/index.html",
      locked: false,
    },
    {
      id: "m6",
      type: "module",
      badge: "Módulo 6",
      tag: "Atendimento",
      title: "Atendimento Estratégico",
      desc: "Como conduzir conversa, proteger valor e manter o cliente no trilho até o fechamento.",
      href: "./modulo-6/index.html",
      locked: false,
    },
    {
      id: "m7",
      type: "module",
      badge: "Módulo 7",
      tag: "Controle",
      title: "Controle e Blindagem",
      desc: "Registros, rotinas e acompanhamento para previsibilidade de comissão e proteção do pipeline.",
      href: "./modulo-7/index.html",
      locked: false,
    },
    {
      id: "m8",
      type: "module",
      badge: "Módulo 8",
      tag: "Escala",
      title: "Primeiras Vendas e Escala",
      desc: "Como consolidar operação, corrigir gargalos e repetir o processo para aumentar consistência.",
      href: "./modulo-8/index.html",
      locked: false,
    },

    // Materiais (exemplo; ajuste conforme você criar)
    {
      id: "manual",
      type: "material",
      badge: "Material",
      tag: "Operação",
      title: "Manual Operacional",
      desc: "Do primeiro contato à primeira comissão. Checklist e execução na prática.",
      href: "./manual/index.html",
      locked: false,
    },
  ];

  /* =========================
     STATE
     done: concluído (true/false)
     startedAt: timestamp (quando clicou em abrir)
     lastOpenedId: último item aberto
  ========================== */

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }

  function getItemState(state, id) {
    return state[id] || { done: false, startedAt: null };
  }

  function setItemState(state, id, patch) {
    state[id] = { ...(state[id] || { done: false, startedAt: null }), ...patch };
  }

  function isInProgress(s) {
    return !!s.startedAt && !s.done;
  }

  function computeProgress() {
    const state = loadState();
    const track = items.filter(x => x.type === "module" || x.type === "material");
    const total = track.length;
    const done = track.filter(x => (state[x.id]?.done === true)).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { pct, done, total };
  }

  /* =========================
     UI HELPERS
  ========================== */

  const $ = (q) => document.querySelector(q);

  function setProgressUI() {
    const { pct } = computeProgress();
    const bar = $("#progressBar");
    const pctEl = $("#progressPct");
    const txt = $("#progressText");

    if (bar) bar.style.width = pct + "%";
    if (pctEl) pctEl.textContent = pct + "%";
    if (txt) txt.textContent = pct + "%";
  }

  function statusLabel(item, state) {
    if (item.locked) return { text: "Bloqueado", cls: "blocked" };
    if (state.done) return { text: "Concluído", cls: "done" };
    if (isInProgress(state)) return { text: "Em andamento", cls: "progress" };
    return { text: "Não iniciado", cls: "" };
  }

  function createCard(item, mode = "rail") {
    const state = loadState();
    const s = getItemState(state, item.id);
    const st = statusLabel(item, s);

    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = item.id;

    const isGold = item.type === "module";

    card.innerHTML = `
      <div class="cardTop">
        <span class="badge ${isGold ? "badgeGold" : ""}">${escapeHtml(item.badge)}</span>
        <span class="status ${st.cls}">${escapeHtml(st.text)}</span>
      </div>

      <div class="cardTag">${escapeHtml(item.tag)}</div>
      <h3 class="cardTitle">${escapeHtml(item.title)}</h3>
      <p class="cardDesc">${escapeHtml(item.desc)}</p>

      <div class="cardBottom">
        <button class="cardBtn ${isGold ? "cardBtnPrimary" : ""}" type="button" data-open>
          Abrir →
        </button>
        <button class="moreBtn" type="button" title="Detalhes" aria-label="Detalhes" data-more>⋯</button>
      </div>
    `;

    // Abrir: marca como iniciado (se ainda não iniciou) e salva lastOpened
    card.querySelector("[data-open]").addEventListener("click", () => {
      const stt = loadState();
      const cur = getItemState(stt, item.id);
      if (!cur.startedAt) setItemState(stt, item.id, { startedAt: Date.now() });
      stt.lastOpenedId = item.id;
      saveState(stt);
      setProgressUI();
      window.location.href = item.href;
    });

    // Modal
    card.querySelector("[data-more]").addEventListener("click", () => openModal(item.id));

    return card;
  }

  function renderRails() {
    const state = loadState();

    // Modules row (sempre)
    const modules = items.filter(x => x.type === "module");
    const railModules = $("#railModules");
    railModules.innerHTML = "";
    modules.forEach(m => railModules.appendChild(createCard(m)));

    // Materials row
    const materials = items.filter(x => x.type === "material");
    const railMaterials = $("#railMaterials");
    railMaterials.innerHTML = "";
    materials.forEach(m => railMaterials.appendChild(createCard(m)));

    // Continue row (somente em andamento)
    const cont = items.filter(x => {
      const s = getItemState(state, x.id);
      return !x.locked && isInProgress(s);
    });

    const continueRow = $("#continueRow");
    const railContinue = $("#railContinue");
    railContinue.innerHTML = "";

    if (cont.length > 0) {
      continueRow.classList.remove("is-hidden");
      cont.forEach(m => railContinue.appendChild(createCard(m)));
    } else {
      continueRow.classList.add("is-hidden");
    }
  }

  function setupArrows() {
    document.querySelectorAll(".arrow").forEach(btn => {
      btn.addEventListener("click", () => {
        const railName = btn.getAttribute("data-rail");
        const dir = btn.getAttribute("data-dir");
        const rail = document.querySelector(`.rail[data-rail="${railName}"] .cardList`);
        if (!rail) return;

        // passo de scroll = “um card” + gap aproximado
        const card = rail.querySelector(".card");
        const step = card ? (card.getBoundingClientRect().width + 14) : 320;
        rail.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
      });
    });
  }

  /* =========================
     MODAL
  ========================== */

  const modal = $("#modal");
  const mBadge = $("#mBadge");
  const mTag = $("#mTag");
  const mTitle = $("#mTitle");
  const mDesc = $("#mDesc");
  const mStatus = $("#mStatus");
  const mDone = $("#mDone");
  const mGo = $("#mGo");

  let currentModalId = null;

  function openModal(id) {
    const item = items.find(x => x.id === id);
    if (!item) return;

    const state = loadState();
    const s = getItemState(state, id);
    const st = statusLabel(item, s);

    currentModalId = id;

    mBadge.textContent = item.badge;
    mTag.textContent = item.tag;
    mTitle.textContent = item.title;
    mDesc.textContent = item.desc;
    mStatus.textContent = st.text;

    mDone.checked = !!s.done;
    mGo.href = item.href;

    // Ao clicar em “Acessar” também marca como iniciado (se ainda não iniciou)
    mGo.onclick = () => {
      const stt = loadState();
      const cur = getItemState(stt, id);
      if (!cur.startedAt) setItemState(stt, id, { startedAt: Date.now() });
      stt.lastOpenedId = id;
      saveState(stt);
      setProgressUI();
      // deixa seguir pro href normal
      return true;
    };

    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    currentModalId = null;
  }

  // close handlers
  modal.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.hasAttribute("data-close")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
  });

  // done toggle
  mDone.addEventListener("change", () => {
    if (!currentModalId) return;
    const state = loadState();
    setItemState(state, currentModalId, { done: mDone.checked });
    saveState(state);

    setProgressUI();
    renderRails(); // atualiza “Continuar” e status nos cards
    // atualiza texto de status no modal
    const item = items.find(x => x.id === currentModalId);
    const s = getItemState(state, currentModalId);
    const st = statusLabel(item, s);
    mStatus.textContent = st.text;
  });

  /* =========================
     SEARCH (filtra módulos)
  ========================== */

  function setupSearch() {
    const search = $("#search");
    if (!search) return;

    search.addEventListener("input", () => {
      const q = (search.value || "").trim().toLowerCase();
      const rail = $("#railModules");
      rail.innerHTML = "";

      const state = loadState();
      const modules = items.filter(x => x.type === "module");
      const filtered = !q ? modules : modules.filter(m => {
        const hay = `${m.badge} ${m.tag} ${m.title} ${m.desc}`.toLowerCase();
        return hay.includes(q);
      });

      filtered.forEach(m => rail.appendChild(createCard(m)));

      // Se o filtro esvaziar, mantém UX ok (não mostra nada estranho)
      // (não precisa criar mensagem, porque já fica limpo)
      setProgressUI();
    });
  }

  /* =========================
     Buttons: continue + reset
  ========================== */

  function setupButtons() {
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();

    $("#resetBtn").addEventListener("click", () => {
      if (!confirm("Tem certeza que deseja resetar o progresso neste dispositivo?")) return;
      localStorage.removeItem(STORAGE_KEY);
      setProgressUI();
      renderRails();
    });

    $("#focusContinue").addEventListener("click", () => {
      const state = loadState();

      // prioridade: último aberto que NÃO está concluído
      const last = state.lastOpenedId ? items.find(x => x.id === state.lastOpenedId) : null;
      if (last) {
        const s = getItemState(state, last.id);
        if (!s.done) {
          window.location.href = last.href;
          return;
        }
      }

      // fallback: primeiro em andamento
      const inProg = items.find(x => {
        const s = getItemState(state, x.id);
        return isInProgress(s);
      });
      if (inProg) {
        window.location.href = inProg.href;
        return;
      }

      // fallback: módulo 1
      const m1 = items.find(x => x.id === "m1");
      if (m1) window.location.href = m1.href;
    });
  }

  /* =========================
     PARTICLES BG
  ========================== */

  function setupParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let w = 0, h = 0, dpr = 1;
    let P = [];

    function resize() {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      w = window.innerWidth;
      h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    }

    function rand(a, b) { return a + Math.random() * (b - a); }

    function init() {
      const count = Math.round(Math.sqrt(w * h) / 1.25); // densidade equilibrada
      P = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.8, 2.2),
        vx: rand(-0.40, 0.40),
        vy: rand(-0.30, 0.30),
        a: rand(0.10, 0.36)
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // pontos
      for (const p of P) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        ctx.beginPath();
        ctx.fillStyle = `rgba(94,234,212,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // linhas
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const a = P[i], b = P[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 170) {
            const alpha = (1 - d / 170) * 0.18;
            ctx.strokeStyle = `rgba(230,195,92,${alpha})`;
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

    window.addEventListener("resize", resize);
    resize();
    draw();
  }

  /* =========================
     Utils
  ========================== */

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  /* =========================
     INIT
  ========================== */

  function init() {
    setupParticles();
    setupArrows();
    setupSearch();
    setupButtons();
    setProgressUI();
    renderRails();
  }

  init();
})();
