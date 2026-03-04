(function(){
  function safeParse(raw){
    try{ return raw ? JSON.parse(raw) : {}; }catch(e){ return {}; }
  }

  function loadState(key){
    return safeParse(localStorage.getItem(key));
  }

  function saveState(key, state){
    try{ localStorage.setItem(key, JSON.stringify(state)); }catch(e){}
  }

  function init(opts){
    const STORAGE_KEY = opts.storageKey;
    const boxes = Array.from(document.querySelectorAll(opts.checklistSelector));
    const bar = document.getElementById(opts.barId);
    const pctEls = (opts.pctIds || []).map(id => document.getElementById(id)).filter(Boolean);

    function compute(){
      const total = boxes.length || 1;
      const done = boxes.filter(b => b.checked).length;
      const percent = Math.round((done/total)*100);

      if(bar) bar.style.width = percent + "%";
      pctEls.forEach(el => el.textContent = percent + "%");
    }

    const state = loadState(STORAGE_KEY);

    boxes.forEach(b => {
      const k = b.getAttribute("data-key");
      if(state && typeof state[k] === "boolean") b.checked = state[k];

      b.addEventListener("change", () => {
        const s = loadState(STORAGE_KEY);
        s[k] = b.checked;
        saveState(STORAGE_KEY, s);
        compute();
      });
    });

    compute();
  }

  window.MVATModule = { init };
})();
