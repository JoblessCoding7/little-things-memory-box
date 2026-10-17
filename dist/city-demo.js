(() => {
  const hero = document.querySelector('.city-landing');
  const content = document.querySelector('#collection');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let opening = false, timer;
  // Vancouver adopted year-round UTC-7 in March 2026. Fixed offsets avoid
  // older browser timezone databases incorrectly falling back in November.
  // Source: https://news.gov.bc.ca/releases/2026CITZ0009-001073
  function clock(id, offset, now) {
    const shifted = new Date(now.getTime() + offset * 3600000);
    const time = document.getElementById(id);
    time.textContent = [shifted.getUTCHours(), shifted.getUTCMinutes(), shifted.getUTCSeconds()].map(n => String(n).padStart(2, '0')).join(':');
    time.dateTime = now.toISOString();
  }
  function tick() { const now = new Date(); clock('vancouver-time', -7, now); clock('kaohsiung-time', 8, now); }
  tick(); setInterval(tick, 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
  function sync() {
    clearTimeout(timer); opening = false;
    document.body.classList.remove('opening');
    document.body.classList.toggle('in-collection', location.hash === '#collection');
    hero.inert = location.hash === '#collection';
    content.inert = location.hash !== '#collection';
  }
  window.addEventListener('hashchange', sync); sync();
  hero.querySelectorAll('a').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); if (opening) return;
    opening = true; content.hidden = false; content.inert = true; hero.inert = true;
    document.body.classList.add('opening');
    timer = setTimeout(() => {
      location.hash = 'collection';
      requestAnimationFrame(() => document.querySelector('.home').focus({ preventScroll: true }));
    }, reduced.matches ? 0 : 1470);
  }));
})();
