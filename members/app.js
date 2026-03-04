
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>Área de Membros • Método Vendas de Alto Ticket</title>
  <meta name="description" content="Área de membros — operação, rotina e execução." />
  <meta name="theme-color" content="#0a0c12" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="./style.css" />
</head>

<body>
  <!-- Fundo vivo -->
  <canvas id="particles" aria-hidden="true"></canvas>
  <div class="bg" aria-hidden="true">
    <div class="aurora"></div>
    <div class="vignette"></div>
    <div class="noise"></div>
  </div>

  <!-- Watermark -->
  <div class="bg-watermark" aria-hidden="true"></div>

  <!-- TOPBAR -->
  <header class="topbar">
    <div class="wrap topbar-inner">
      <a class="brand" href="./index.html" aria-label="Voltar para a Área de Membros">
        <span class="brand-mark" aria-hidden="true">
          <img
            src="https://mercadopublicoonline.com/wp-content/uploads/2026/02/6b0d19db-eff6-49fc-8899-be1d37cdfc49.png"
            alt="Logo"
            loading="lazy"
          />
        </span>
        <span class="brand-col">
          <strong class="brand-name">MÉTODO • ALTO TICKET</strong>
          <span class="brand-sub">Área de Membros • Operação & Execução</span>
        </span>
      </a>

      <div class="top-actions">
        <div class="pill" title="Seu progresso fica salvo neste dispositivo">
          <span class="dot" aria-hidden="true"></span>
          <span>Progresso: <b id="progressText">0%</b></span>
        </div>

        <div class="pill" title="Status da sua assinatura">
          <span class="muted">Acesso</span>
          <b>LIBERADO</b>
        </div>

        <a class="btn-ghost" href="https://mercadopublicoonline.com/login" title="Encerrar sessão">
          Logout
        </a>
      </div>
    </div>
  </header>

  <main class="page">
    <div class="wrap">
      <!-- HERO -->
      <section class="hero">
        <div class="heroGrid">
          <div class="heroMain">
            <div class="heroBadge">
              <span class="chip">Nível 1</span>
              <span class="chip chipGold">Premium</span>
            </div>

            <h1>Bem-vindo ao Método Vendas de Alto Ticket</h1>

            <p class="lead">
              A partir deste ponto você não é mais alguém tentando ganhar dinheiro.
              <b>Você está construindo uma operação.</b><br><br>
              Este treinamento não é informativo. Ele é formativo.
            </p>

            <div class="heroTags">
              <span class="tag">• <strong>Mentalidade</strong> de gestor</span>
              <span class="tag">• <strong>Estrutura</strong> operacional</span>
              <span class="tag">• <strong>Parcerias</strong> estratégicas</span>
              <span class="tag">• <strong>Sistema</strong> de controle</span>
              <span class="tag">• <strong>Acompanhamento</strong> estruturado</span>
              <span class="tag">• <strong>Previsibilidade</strong> de comissão</span>
            </div>

            <div class="heroRule">
              <span class="tag"><strong>Regra:</strong> Você executa → você recebe.</span>
              <span class="tag"><strong>Se só assiste:</strong> nada muda.</span>
            </div>
          </div>

          <aside class="heroSide">
            <div class="kpiCard">
              <div class="kpiTop">
                <span class="kpiLabel">Seu progresso na área</span>
                <span class="kpiPct" id="progressPct">0%</span>
              </div>

              <div class="bar" aria-label="Barra de progresso">
                <i id="progressBar"></i>
              </div>

              <div class="kpiMini">
                <span class="tag"><strong>Foco:</strong> rotina + controle</span>
                <span class="tag"><strong>Resultado:</strong> consequência</span>
              </div>

              <div class="kpiBtns">
                <button class="btn btnPrimary" type="button" id="focusContinue">
                  Continuar de onde parou
                </button>
                <button class="btn" type="button" id="resetBtn">
                  Resetar progresso
                </button>
              </div>

              <p class="small muted2">
                * O progresso salva neste navegador/dispositivo.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <!-- LINHA: CONTINUAR -->
      <section class="rowSection" id="continueRow">
        <div class="rowHead">
          <div>
            <h2>Continuar</h2>
            <p>Itens em andamento e atalhos rápidos.</p>
          </div>
          <div class="rowActions">
            <button class="arrow" type="button" data-dir="left" aria-label="Voltar" title="Voltar">‹</button>
            <button class="arrow" type="button" data-dir="right" aria-label="Avançar" title="Avançar">›</button>
          </div>
        </div>

        <div class="rail" data-rail="continue">
          <div class="cardList" id="railContinue" aria-label="Carrossel Continuar">
            <!-- preenchido via JS -->
          </div>
        </div>
      </section>

      <!-- LINHA: MÓDULOS -->
      <section class="rowSection" id="modulesRow">
        <div class="rowHead">
          <div>
            <h2>Módulos (Nível 1)</h2>
            <p>Um módulo por vez. Execução antes de avançar.</p>
          </div>
          <div class="rowActions">
            <div class="searchWrap">
              <input id="search" class="search" type="search" placeholder="Buscar (ex.: Parceria, Captação, Módulo 4)..." />
            </div>
            <button class="arrow" type="button" data-dir="left" aria-label="Voltar" title="Voltar">‹</button>
            <button class="arrow" type="button" data-dir="right" aria-label="Avançar" title="Avançar">›</button>
          </div>
        </div>

        <div class="rail" data-rail="modules">
          <div class="cardList" id="railModules" aria-label="Carrossel Módulos">
            <!-- preenchido via JS -->
          </div>
        </div>
      </section>

      <!-- LINHA: MATERIAIS -->
      <section class="rowSection" id="materialsRow">
        <div class="rowHead">
          <div>
            <h2>Materiais</h2>
            <p>Conteúdo operacional para copiar e aplicar.</p>
          </div>
          <div class="rowActions">
            <button class="arrow" type="button" data-dir="left" aria-label="Voltar" title="Voltar">‹</button>
            <button class="arrow" type="button" data-dir="right" aria-label="Avançar" title="Avançar">›</button>
          </div>
        </div>

        <div class="rail" data-rail="materials">
          <div class="cardList" id="railMaterials" aria-label="Carrossel Materiais">
            <!-- preenchido via JS -->
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div>
          <strong>Nota:</strong> o progresso é salvo neste navegador (neste dispositivo).
          Se você usar outro celular/PC, o progresso começa do zero.
        </div>
        <div class="muted2">© <span id="year"></span> Método Vendas de Alto Ticket</div>
      </footer>
    </div>
  </main>

  <!-- MODAL (preview Netflix) -->
  <div class="modal" id="modal" aria-hidden="true">
    <div class="modalBackdrop" data-close></div>
    <div class="modalCard" role="dialog" aria-modal="true" aria-label="Detalhes">
      <button class="modalClose" type="button" data-close aria-label="Fechar">×</button>

      <div class="modalTop">
        <div class="modalMeta">
          <span class="modalBadge" id="mBadge">Módulo</span>
          <span class="modalTag" id="mTag">Tag</span>
        </div>
        <h3 class="modalTitle" id="mTitle">Título</h3>
        <p class="modalDesc" id="mDesc">Descrição</p>

        <div class="modalPills">
          <span class="pill pillSoft" id="mStatus">Status</span>
          <span class="pill pillSoft">Progresso local</span>
        </div>
      </div>

      <div class="modalBottom">
        <label class="check">
          <input type="checkbox" id="mDone" />
          <span>Marcar como concluído</span>
        </label>

        <div class="modalBtns">
          <a class="btn btnPrimary" id="mGo" href="#" target="_self" rel="noopener">Acessar →</a>
          <button class="btn" type="button" data-close>Voltar</button>
        </div>
      </div>
    </div>
  </div>

  <script src="./app.js"></script>
</body>
</html>
