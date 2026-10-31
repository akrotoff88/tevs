/* TEVS.KZ: automatic visit statistics, no popup, advertising disabled; saved opt-outs are respected. */
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
    enabled: 'Аналитика қосулы.',
    disabled: 'Аналитика өшірулі.'
  } : {
    enabled: 'Аналитика включена.',
    disabled: 'Аналитика выключена.'
  };

  let started = false;
  let enabled = false;
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

  function startAnalytics(explicitConsent) {
    window['ga-disable-' + measurementId] = false;
    if (started) {
      if (explicitConsent) window.gtag('consent', 'update', { analytics_storage: 'granted' });
      return;
    }
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    // Keep analytical cookies disabled in the EEA, UK and Switzerland without an explicit opt-in.
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      region: ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
        'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT',
        'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'CH']
    });
    if (explicitConsent) window.gtag('consent', 'update', { analytics_storage: 'granted' });
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
    enabled = choice !== 'denied';
    if (persist) {
      try { localStorage.setItem(storageKey, JSON.stringify({ choice, expires: Date.now() + lifetime })); } catch (_) {}
    }
    if (enabled) {
      startAnalytics(choice === 'granted');
    } else {
      window['ga-disable-' + measurementId] = true;
      if (started) window.gtag('consent', 'update', { analytics_storage: 'denied' });
      forgetAnalyticsCookies();
    }
    updateControls();
  }

  function updateControls() {
    document.querySelectorAll('[data-analytics-status]').forEach((status) => {
      status.textContent = enabled ? copy.enabled : copy.disabled;
    });
    document.querySelectorAll('[data-analytics-choice]').forEach((button) => {
      const selected = button.getAttribute('data-analytics-choice') === (enabled ? 'granted' : 'denied');
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  function ready() {
    const style = document.createElement('style');
    style.textContent = `
      [data-analytics-controls]{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0}
      [data-analytics-controls][hidden]{display:none}
      [data-analytics-choice]{min-height:44px;padding:10px 16px;border:1px solid #b48242;border-radius:8px;background:#fffdfa;color:#061d33;font:inherit;cursor:pointer}
      [data-analytics-choice][aria-pressed="true"]{background:#061d33;color:#fff}
      [data-analytics-choice]:focus-visible{outline:3px solid #b48242;outline-offset:3px}
    `;
    document.head.appendChild(style);
    document.querySelectorAll('[data-analytics-controls]').forEach((controls) => { controls.hidden = false; });
    const saved = readChoice();
    applyChoice(saved || 'automatic', false);

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const choiceButton = target.closest('[data-analytics-choice]');
      if (choiceButton) {
        const choice = choiceButton.getAttribute('data-analytics-choice');
        if (['granted', 'denied'].includes(choice)) applyChoice(choice, true);
        return;
      }
      if (!enabled || !started) return;
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
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
})();

