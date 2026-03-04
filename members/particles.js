(() => {
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  let W = 0, H = 0, dpr = 1;
  const P = [];

  const rand = (a,b) => a + Math.random() * (b-a);

  function resize(){
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function init(){
    P.length = 0;
    const COUNT = Math.round(Math.sqrt(W*H) / 1.05);
    for(let i=0;i<COUNT;i++){
      P.push({
        x: rand(0, W),
        y: rand(0, H),
        r: rand(0.9, 2.4),
        vx: rand(-0.38, 0.38),
        vy: rand(-0.30, 0.30),
        a: rand(0.10, 0.45),
        t: rand(0, Math.PI*2)
      });
    }
  }

  function draw(){
    ctx.clearRect(0,0,W,H);

    // dots
    for(const p of P){
      p.t += 0.007;
      p.x += p.vx + Math.sin(p.t) * 0.06;
      p.y += p.vy + Math.cos(p.t) * 0.06;

      if(p.x < -20) p.x = W + 20;
      if(p.x > W + 20) p.x = -20;
      if(p.y < -20) p.y = H + 20;
      if(p.y > H + 20) p.y = -20;

      ctx.beginPath();
      // dourado suave + teal suave misturados pelo alpha
      const goldA = p.a * 0.85;
      ctx.fillStyle = `rgba(247,201,72,${goldA})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }

    // lines
    for(let i=0;i<P.length;i++){
      for(let j=i+1;j<P.length;j++){
        const a = P[i], b = P[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if(d < 165){
          const alpha = (1 - d/165) * 0.18;
          ctx.strokeStyle = `rgba(94,234,212,${alpha})`;
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

  window.addEventListener("resize", () => { resize(); init(); });
  resize();
  init();
  draw();
})();
