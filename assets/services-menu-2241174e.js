(() => {
  const button = document.querySelector('.menu-button');
  const nav = document.querySelector('.desktop-nav');
  if (!button || !nav) return;
  const kk = document.documentElement.lang === 'kk';
  function close() { nav.classList.remove('mobile-open'); button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-label', kk ? 'Мәзірді ашу' : 'Открыть меню'); }
  button.addEventListener('click', () => { const open = button.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('mobile-open', open); button.setAttribute('aria-expanded', String(open)); button.setAttribute('aria-label', open ? (kk ? 'Мәзірді жабу' : 'Закрыть меню') : (kk ? 'Мәзірді ашу' : 'Открыть меню')); });
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { close(); button.focus(); } });
  document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) close(); });
})();