/* TEVS.KZ: analytics loads only after the visitor opts in. */
(() => {
  'use strict';

  const measurementId = document.currentScript?.dataset.measurementId;
  if (!/^G-[A-Z0-9]+$/.test(measurementId || '')) return;
  if (!['tevs.kz', 'www.tevs.kz'].includes(location.hostname)) return;
  if (window.tevsAnalyticsLoaded) return;
  window.tevsAnalyticsLoaded = true;

  const storageKey = 'tevs.analytics.consent.v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const isKazakh = document.documentElement.lang === 'kk';
  const copy = isKazakh ? {
    title: 'Сайт аналитикасы',
    text: 'Google Analytics — сайтқа кіру статистикасы.',
    accept: 'Рұқсат беру',
    decline: 'Бас тарту',
    policy: 'Толығырақ',
    policyUrl: '/kk/privacy/'
  } : {
    title: 'Аналитика сайта',
    text: 'Google Analytics — статистика посещений сайта.',
    accept: 'Разрешить',
    decline: 'Отказаться',
    policy: 'Подробнее',
    policyUrl: '/privacy/'
  };

  let started = false;
  let banner = null;
  let previousFocus = null;
  let granted = false;
  window['ga-disable-' + measurementId] = true;

  function readChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved && saved.expires > Date.now() && ['granted', 'denied'].includes(saved.choice)) return saved.choice;
    } catch (_) { /* Storage can be disabled by the browser. */ }
    return null;
  }

  function forgetAnalyticsCookies() {
    document.cookie.split(';').forEach((entry) => {
      const name = entry.split('=')[0].trim();
      if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) return;
      ['', '; domain=' + location.hostname, '; domain=.tevs.kz'].forEach((domain) => {
        document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax; Secure';
      });
    });
  }

  function startAnalytics() {
    window['ga-disable-' + measurementId] = false;
    if (started) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      return;
    }
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    let referrer = '';
    try { if (document.referrer) referrer = new URL(document.referrer).origin + '/'; } catch (_) {}
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: location.origin + location.pathname,
      page_referrer: referrer,
      cookie_expires: lifetime / 1000,
      cookie_flags: 'SameSite=Lax;Secure'
    });
    const tag = document.createElement('script');
    tag.id = 'tevs-google-tag';
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(tag);
  }

  function applyChoice(choice, persist) {
    granted = choice === 'granted';
    if (persist) {
      try { localStorage.setItem(storageKey, JSON.stringify({ choice, expires: Date.now() + lifetime })); } catch (_) {}
    }
    if (granted) {
      startAnalytics();
    } else {
      window['ga-disable-' + measurementId] = true;
      if (started) window.gtag('consent', 'update', { analytics_storage: 'denied' });
      forgetAnalyticsCookies();
    }
    if (banner) {
      banner.remove();
      banner = null;
      if (previousFocus?.isConnected) previousFocus.focus();
      previousFocus = null;
    }
  }

  function showChoices(focus) {
    if (banner) return;
    previousFocus = focus ? document.activeElement : null;
    banner = document.createElement('section');
    banner.className = 'tevs-analytics-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', copy.title);
    const description = document.createElement('p');
    description.textContent = copy.text + ' ';
    const policy = document.createElement('a');
    policy.href = copy.policyUrl;
    policy.textContent = copy.policy;
    const actions = document.createElement('div');
    actions.className = 'tevs-analytics-actions';
    const accept = document.createElement('button');
    accept.type = 'button';
    accept.textContent = copy.accept;
    accept.addEventListener('click', () => applyChoice('granted', true));
    const decline = document.createElement('button');
    decline.type = 'button';
    decline.textContent = copy.decline;
    decline.addEventListener('click', () => applyChoice('denied', true));
    actions.append(accept, decline);
    description.appendChild(policy);
    banner.append(description, actions);
    document.body.appendChild(banner);
    if (focus) accept.focus();
  }

  function ready() {
    const style = document.createElement('style');
    style.textContent = `
      .tevs-analytics-banner{position:fixed;z-index:1000;bottom:max(12px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);width:min(600px,calc(100% - 24px));max-height:80vh;max-height:calc(100dvh - 24px);overflow:auto;box-sizing:border-box;padding:12px 14px;background:#fffdfa;color:#061d33;border:1px solid #d9c4a7;border-radius:12px;box-shadow:0 6px 28px #061d3326;font:14px/1.45 Arial,sans-serif;text-align:left}
      .tevs-analytics-banner p{margin:0;color:#505965}.tevs-analytics-banner a{color:#715027;text-decoration:underline;text-underline-offset:3px}.tevs-analytics-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}.tevs-analytics-actions button{min-width:0;min-height:44px;padding:8px 10px;font:inherit;font-weight:600;border:1px solid #061d33;border-radius:7px;background:#061d33;color:#fff;cursor:pointer}.tevs-analytics-actions button+button{background:#fffdfa;color:#061d33}.tevs-analytics-banner :focus-visible,[data-analytics-settings]:focus-visible{outline:3px solid #b48242;outline-offset:3px}[data-analytics-settings]{min-height:44px;padding:10px 16px;border:1px solid #b48242;border-radius:8px;background:#fffdfa;color:#061d33;font:inherit;cursor:pointer}
    `;
    document.head.appendChild(style);
    const saved = readChoice();
    if (saved) applyChoice(saved, false);
    else showChoices(false);

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('[data-analytics-settings]')) {
        showChoices(true);
        return;
      }
      if (!granted || !started) return;
      const link = target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      let method = '';
      if (/^tel:/i.test(href)) method = 'phone';
      else if (/^mailto:/i.test(href)) method = 'email';
      else {
        try {
          const url = new URL(href, location.origin);
          if (['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)) method = 'whatsapp';
          else if (['t.me', 'telegram.me'].includes(url.hostname)) method = 'telegram';
        } catch (_) {}
      }
      if (method) window.gtag('event', 'contact_click', {
        contact_method: method,
        site_language: isKazakh ? 'kk' : 'ru',
        transport_type: 'beacon'
      });
    });

    window.addEventListener('storage', (event) => {
      if (event.key !== storageKey && event.key !== null) return;
      const savedChoice = readChoice();
      applyChoice(savedChoice || 'denied', false);
      if (!savedChoice) showChoices(false);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
})();

