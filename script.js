
// Ajuste o WhatsApp aqui (DDD + número, só números). Ex: 5548999999999
const WHATS_NUMBER = "5548988640496";

function qs(sel, root = document){ return root.querySelector(sel); }

document.addEventListener("DOMContentLoaded", () => {
  // ano automático
  const yearEl = qs("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // form WhatsApp
  const form = qs("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = qs("#nome")?.value.trim();
      const whats = qs("#whats")?.value.trim();
      const msg = qs("#msg")?.value.trim();

      const text =
`Olá! Quero falar sobre a mentoria do Método Vendas de Alto Ticket.

Nome: ${nome}
WhatsApp: ${whats}

Contexto:
${msg}

(Enviado pela página do método)`;

      const url = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener");
    });
  }

  // copiar CSV (botão com data-copy-csv)
  const copyBtn = qs("[data-copy-csv]");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const el = qs("#csv");
      if (!el) return;

      const csv = el.value.trim();
      // clipboard moderno
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(csv).then(() => {
          alert("Modelo CSV copiado! Agora cole no Excel/Google Sheets.");
        }).catch(() => fallbackCopy(el));
      } else {
        fallbackCopy(el);
      }
    });
  }

  // detalhe: fecha outros <details> quando abrir um (opcional, premium)
  const details = Array.from(document.querySelectorAll("details"));
  details.forEach(d => {
    d.addEventListener("toggle", () => {
      if (d.open) details.forEach(o => (o !== d) && (o.open = false));
    });
  });
});

function fallbackCopy(textareaEl){
  textareaEl.focus();
  textareaEl.select();
  textareaEl.setSelectionRange(0, 999999);
  document.execCommand("copy");
  alert("Modelo CSV copiado! Agora cole no Excel/Google Sheets.");
}
