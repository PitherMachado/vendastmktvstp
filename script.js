// ===== CONFIG =====
const WHATS_NUMBER = "5548988640496"; // DDI+DDD+numero (somente numeros)

// ano no footer
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});

// form WhatsApp
function handleContact(e){
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const whats = document.getElementById("whats").value.trim();
  const msg = document.getElementById("msg").value.trim();

  const text =
`Olá! Quero falar sobre a mentoria do Método Vendas de Alto Ticket.

Nome: ${nome}
WhatsApp: ${whats}

Contexto:
${msg}

(Enviado pela página do método)`;

  const url = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener");
  return false;
}

// copiar CSV
function copyCSV(){
  const el = document.getElementById("csv");
  if(!el) return;

  el.select();
  el.setSelectionRange(0, 999999);

  // compat
  try{
    document.execCommand("copy");
    alert("Modelo CSV copiado! Agora cole no Excel/Google Sheets.");
  }catch(err){
    // fallback
    navigator.clipboard?.writeText(el.value).then(() => {
      alert("Modelo CSV copiado! Agora cole no Excel/Google Sheets.");
    });
  }
}

// ===== PARTICLES (estilo N1, dourado premium) =====
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

function init(){
  P.length = 0;
  // densidade controlada (leve, não pesa)
  const COUNT = Math.round(Math.sqrt(innerWidth*innerHeight)/1.25);
  for(let i=0;i<COUNT;i++){
    P.push({
      x: rand(0, innerWidth),
      y: rand(0, innerHeight),
      r: rand(0.9, 2.2),
      vx: rand(-0.36, 0.36),
      vy: rand(-0.28, 0.28),
      a: rand(0.10, 0.42)
    });
  }
}
init();
addEventListener("resize", init);

function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);

  // dots
  for(const p of P){
    p.x += p.vx; p.y += p.vy;

    if(p.x < -20) p.x = innerWidth + 20;
    if(p.x > innerWidth + 20) p.x = -20;
    if(p.y < -20) p.y = innerHeight + 20;
    if(p.y > innerHeight + 20) p.y = -20;

    ctx.beginPath();
    ctx.fillStyle = `rgba(230,195,92,${p.a})`; // dourado
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
  }

  // lines
  for(let i=0;i<P.length;i++){
    for(let j=i+1;j<P.length;j++){
      const a = P[i], b = P[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx*dx + dy*dy);

      if(d < 170){
        const alpha = (1 - d/170) * 0.22;
        ctx.strokeStyle = `rgba(243,214,127,${alpha})`; // dourado claro
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
