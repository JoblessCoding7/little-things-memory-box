(() => {
  const hero = document.querySelector('.city-landing');
  const zones = [...document.querySelectorAll('.city-zone')];
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  let pending, requested = 'split';
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
  function show(city) {
    clearTimeout(pending); requested = city;
    hero.dataset.view = city;
    zones.forEach(zone => zone.setAttribute('aria-expanded', String(zone.dataset.city === city)));
  }
  // The two hit areas stay fixed while the photographs expand, preventing
  // moving edges from producing hover loops. The quiet central strip resets.
  hero.addEventListener('pointermove', event => {
    if (!mouse.matches || event.pointerType === 'touch') return;
    const bounds = hero.getBoundingClientRect();
    const x = event.clientX - bounds.left, middle = bounds.width / 2;
    const city = Math.abs(x - middle) < 24 ? 'split' : x < middle ? 'vancouver' : 'kaohsiung';
    if (city === requested) return;
    clearTimeout(pending); requested = city;
    pending = setTimeout(() => show(city), city === 'split' ? 80 : 160);
  });
  hero.addEventListener('pointerleave', () => show('split'));
  zones.forEach(zone => {
    zone.addEventListener('click', event => { if (event.detail === 0) show(zone.dataset.city); });
    zone.addEventListener('focus', () => { if (zone.matches(':focus-visible')) show(zone.dataset.city); });
  });
  hero.addEventListener('focusout', event => { if (!hero.contains(event.relatedTarget)) show('split'); });
  window.addEventListener('keydown', event => { if (event.key === 'Escape') { show('split'); document.activeElement?.blur(); } });
  window.addEventListener('blur', () => show('split'));
  mouse.addEventListener('change', () => show('split'));
})();
