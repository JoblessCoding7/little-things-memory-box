(() => {
  const hero = document.querySelector('.city-landing');
  const zones = [...document.querySelectorAll('.city-zone')];
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  let pending, requested = 'split', entering = false, pointerOrigin;
  // Vancouver has used year-round UTC-7 since March 2026; Kaohsiung is UTC+8.
  // https://news.gov.bc.ca/releases/2026CITZ0009-001073
  function clock(id, offset, now) {
    const shifted = new Date(now.getTime() + offset * 3600000);
    const time = document.getElementById(id);
    time.textContent = [shifted.getUTCHours(), shifted.getUTCMinutes(), shifted.getUTCSeconds()].map(n => String(n).padStart(2, '0')).join(':');
    time.dateTime = now.toISOString();
  }
  function tick() { const now = new Date(); clock('vancouver-time', -7, now); clock('kaohsiung-time', 8, now); }
  tick(); setInterval(tick, 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
  let edgeHold = false;
  function show(city) {
    if (entering) return;
    clearTimeout(pending); requested = city;
    hero.dataset.view = city;
    zones.forEach(zone => {
      const active = zone.dataset.city === city;
      zone.setAttribute('aria-expanded', String(active));
      zone.setAttribute('aria-label', city !== 'split' && !active ? '返回双城分屏' : zone.dataset.city === 'vancouver' ? '进入有些碎片 · 温哥华' : '进入有些碎片 · 高雄');
    });
  }
  function schedule(city, delay = 150) {
    if (city === requested) return;
    clearTimeout(pending); requested = city;
    pending = setTimeout(() => show(city), delay);
  }
  hero.addEventListener('pointermove', event => {
    if (entering || !mouse.matches || event.pointerType === 'touch') return;
    const bounds = hero.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const edge = parseFloat(getComputedStyle(hero).getPropertyValue('--return-edge')) || 44;
    const view = hero.dataset.view;
    if (view !== 'split') {
      const onReturn = view === 'vancouver' ? x >= bounds.width - edge : x <= edge;
      if (onReturn) { edgeHold = true; schedule('split', 80); }
      else if (requested === 'split') { clearTimeout(pending); requested = view; }
      return;
    }
    // Keep the split steady while the cursor remains on the return sliver.
    if (edgeHold) {
      if (x < edge + 28 || x > bounds.width - edge - 28) return;
      edgeHold = false;
    }
    const middle = bounds.width / 2;
    if (Math.abs(x - middle) < 18) { clearTimeout(pending); requested = 'split'; return; }
    schedule(x < middle ? 'vancouver' : 'kaohsiung');
  });
  hero.addEventListener('pointerleave', () => { edgeHold = false; show('split'); });
  function activate(zone) {
    const view = hero.dataset.view;
    show(view !== 'split' && zone.dataset.city !== view ? 'split' : zone.dataset.city);
  }
  hero.addEventListener('pointerdown', event => { pointerOrigin = { x: event.clientX, y: event.clientY }; });
  zones.forEach(zone => {
    zone.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (entering) return;
      if (event.detail > 0 && pointerOrigin && Math.hypot(event.clientX - pointerOrigin.x, event.clientY - pointerOrigin.y) > 8) return;
      const view = hero.dataset.view;
      if (view !== 'split' && zone.dataset.city !== view) { edgeHold = true; show('split'); return; }
      clearTimeout(pending); entering = true;
      hero.setAttribute('aria-busy', 'true');
      document.body.classList.add('scene-entry');
      setTimeout(() => location.assign(zone.href), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650);
    });
    zone.addEventListener('focus', () => { if (zone.matches(':focus-visible')) activate(zone); });
  });
  hero.addEventListener('focusout', event => { if (!hero.contains(event.relatedTarget)) show('split'); });
  window.addEventListener('keydown', event => { if (event.key === 'Escape') { edgeHold = false; show('split'); document.activeElement?.blur(); } });
  window.addEventListener('blur', () => { edgeHold = false; show('split'); });
  mouse.addEventListener('change', () => show('split'));
  window.addEventListener('pageshow', () => {
    entering = false; edgeHold = false;
    document.body.classList.remove('scene-entry');
    hero.removeAttribute('aria-busy');
    show('split');
  });
})();
