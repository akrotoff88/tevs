import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { pages, entities, origin } from './site-config.mjs';
import { services, servicePath } from './services-content.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const output = path.join(root, 'static-build');
const { render } = await import(pathToFileURL(path.join(root, '.static-ssr/ssr.mjs')).href);
// Retain Vite's unrendered shell so rerunning this step cannot turn KK into RU.
const templateCache = path.join(root, '.static-ssr/template.html');
let template = await readFile(path.join(output, 'index.html'), 'utf8');
if (template.includes('__TEVS_TITLE__')) {
  await writeFile(templateCache, template);
} else {
  template = await readFile(templateCache, 'utf8');
}
if (!template.includes('__TEVS_TITLE__')) throw new Error('Missing unrendered template; run build:static');
const stylesheet = template.match(/<link[^>]+rel="stylesheet"[^>]*>/i)?.[0];
if (!stylesheet) throw new Error('Missing compiled stylesheet');
const updated = '2026-10-31';
const home = (lang) => lang === 'ru' ? '/' : '/kk/';
const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const jsonld = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');
const graph = (nodes) => ({ '@context': 'https://schema.org', '@graph': [...entities, ...nodes] });

function webPage(lang, url, title, description, mainEntity, type = 'WebPage') {
  return {
    '@type': type, '@id': `${url}#webpage`, url, name: title, description,
    inLanguage: `${lang}-KZ`, isPartOf: { '@id': `${origin}/#website` },
    mainEntity: { '@id': mainEntity }, about: { '@id': `${origin}/#natalia-tevs` },
  };
}

const rendered = {};
for (const lang of ['ru', 'kk']) {
  rendered[lang] = render(lang);
  const page = pages[lang];
  const noScript = lang === 'ru'
    ? 'Для консультации <a href="tel:+77055445554">позвоните +7 705 544 55 54</a> или <a href="https://wa.me/77055445554">напишите в WhatsApp</a>.'
    : 'Кеңес алу үшін <a href="tel:+77055445554">+7 705 544 55 54 нөміріне қоңырау шалыңыз</a> немесе <a href="https://wa.me/77055445554">WhatsApp арқылы жазыңыз</a>.';
  const html = template
    .replace('<html lang="ru">', `<html lang="${lang}">`)
    .replaceAll('__TEVS_TITLE__', esc(page.title))
    .replaceAll('__TEVS_DESCRIPTION__', esc(page.description))
    .replaceAll('__TEVS_LOCALE__', page.locale)
    .replaceAll('__TEVS_CANONICAL__', page.canonical)
    .replace('__TEVS_JSONLD__', jsonld(graph([webPage(lang, page.canonical, page.title, page.description, `${origin}/#legal-service`)])))
    .replace('__TEVS_NOSCRIPT__', noScript)
    .replace('<div id="root"></div>', `<div id="root">${rendered[lang]}</div>`);
  await writeRoute(home(lang), html);
}

const copy = {
  ru: {
    home: 'Главная', services: 'Услуги', geography: 'Костанай · дистанционно по Казахстану',
    catalogTitle: 'Юридические услуги в Казахстане',
    catalogIntro: 'Помогаю частным лицам и бизнесу с документами, сделками и спорами. Здесь можно подробнее узнать о каждом направлении и выбрать, с чего начать.',
    choose: 'Выбрать услугу', more: 'Подробнее', priceLabel: 'Стоимость услуг',
    priceNote: 'Объём работы, сроки и итоговую стоимость согласуем после обсуждения задачи.',
    whatsapp: 'Обсудить в WhatsApp', phone: '+7 705 544 55 54',
    appointment: 'Приём в Костанае по предварительной записи.',
    consultation: 'Записаться на консультацию', experience: 'Более 20 лет юридической практики',
    related: 'По вашей ситуации также может быть полезно', author: 'Тевс Наталья Геннадьевна',
    openMenu: 'Открыть меню', closeMenu: 'Закрыть меню', official: 'Официальная информация',
    catalogMessage: 'Здравствуйте! Хочу обсудить юридический вопрос.',
  },
  kk: {
    home: 'Басты бет', services: 'Қызметтер', geography: 'Қостанай · Қазақстан бойынша қашықтан',
    catalogTitle: 'Қазақстандағы заңгерлік қызметтер',
    catalogIntro: 'Жеке тұлғалар мен бизнеске құжаттар, мәмілелер және даулар бойынша көмектесемін. Мұнда әр бағыт туралы толығырақ біліп, неден бастауға болатынын таңдауға болады.',
    choose: 'Қызметті таңдау', more: 'Толығырақ', priceLabel: 'Қызметтердің құны',
    priceNote: 'Жұмыс көлемін, мерзімін және нақты құнын міндетті талқылағаннан кейін келісеміз.',
    whatsapp: 'WhatsApp-та талқылау', phone: '+7 705 544 55 54',
    appointment: 'Қостанайда алдын ала жазылу бойынша қабылдау.',
    consultation: 'Кеңеске жазылу', experience: '20 жылдан астам заңгерлік тәжірибе',
    related: 'Жағдайыңызға қатысты басқа қызметтер', author: 'Тевс Наталья Геннадьевна',
    openMenu: 'Мәзірді ашу', closeMenu: 'Мәзірді жабу', official: 'Ресми ақпарат',
    catalogMessage: 'Сәлеметсіз бе! Заң мәселесін талқылағым келеді.',
  },
};

// Inner pages use the same rendered branding and navigation as the home page.
// They are static HTML with a small menu script, so reading them needs no React.
function sharedParts(lang, slug) {
  const catalog = servicePath(lang);
  const local = servicePath(lang, slug);
  const base = home(lang);
  const rebase = (html) => html
    .replace(/href="#top"/g, `href="${base}"`)
    .replace(/href="#services"/g, `href="${catalog}"`)
    .replace(/href="#([^\"]+)"/g, `href="${base}#$1"`)
    .replace(/ aria-current="location"/g, '')
    .replace(/ class="active"/g, '')
    .replace(/<div class="lang-switcher"[^>]*>[\s\S]*?<\/div>/g, (block) => block
      .replace(/href="\/"/g, `href="${servicePath('ru', slug)}"`)
      .replace(/href="\/kk\/"/g, `href="${servicePath('kk', slug)}"`))
    .replace(`href="${catalog}" class=""`, `href="${catalog}" class="active"${slug ? '' : ' aria-current="page"'}`);
  const source = rendered[lang];
  return {
    header: rebase(source.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0] ?? ''),
    footer: rebase(source.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0] ?? ''),
    path: local,
  };
}

function crumbs(lang, pageName, slug) {
  const t = copy[lang];
  const items = [
    { name: t.home, url: `${origin}${home(lang)}` },
    { name: t.services, url: `${origin}${servicePath(lang)}` },
  ];
  if (slug) items.push({ name: pageName, url: `${origin}${servicePath(lang, slug)}` });
  return {
    html: `<nav class="service-breadcrumbs" aria-label="${lang === 'ru' ? 'Хлебные крошки' : 'Бет жолы'}"><ol>${items.map((x, i) => `<li>${i === items.length - 1 ? `<span aria-current="page">${esc(x.name)}</span>` : `<a href="${esc(x.url)}">${esc(x.name)}</a>`}</li>`).join('')}</ol></nav>`,
    schema: {
      '@type': 'BreadcrumbList', '@id': `${items.at(-1).url}#breadcrumbs`,
      itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: x.url })),
    },
  };
}

function contactCard(lang, service) {
  const t = copy[lang];
  const message = service
    ? (lang === 'ru' ? `Здравствуйте! Хочу обсудить вопрос: ${service[lang].name.toLowerCase()}.` : `Сәлеметсіз бе! Осы мәселені талқылағым келеді: ${service[lang].name.toLowerCase()}.`)
    : t.catalogMessage;
  return `<aside class="service-contact-card" aria-label="${esc(t.consultation)}">
    <div class="service-specialist"><img src="/natalia-tevs-720.webp" alt="${esc(t.author)}" width="72" height="86" decoding="async"><div><strong>${esc(t.author)}</strong><span>${esc(t.experience)}</span></div></div>
    ${service ? `<p class="service-price-label">${esc(t.priceLabel)}</p><p class="service-price">${esc(service[lang].price)}</p><p class="service-price-note">${esc(t.priceNote)}</p>` : ''}
    <a class="button button-primary" href="https://wa.me/77055445554?text=${encodeURIComponent(message)}" target="_blank" rel="noreferrer">${esc(t.whatsapp)}<span aria-hidden="true">↗</span></a>
    <a class="service-phone" href="tel:+77055445554">${t.phone}</a>
    <div class="service-contact-links"><a href="https://t.me/+77055445554" target="_blank" rel="noreferrer">Telegram</a><a href="mailto:natalia@tevs.kz">natalia@tevs.kz</a></div>
    <a class="service-appointment" href="${home(lang)}#contacts">${esc(t.appointment)}</a>
  </aside>`;
}

const menuScript = `(() => {
  const button = document.querySelector('.menu-button');
  const nav = document.querySelector('.desktop-nav');
  if (!button || !nav) return;
  const kk = document.documentElement.lang === 'kk';
  function close() { nav.classList.remove('mobile-open'); button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-label', kk ? 'Мәзірді ашу' : 'Открыть меню'); }
  button.addEventListener('click', () => { const open = button.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('mobile-open', open); button.setAttribute('aria-expanded', String(open)); button.setAttribute('aria-label', open ? (kk ? 'Мәзірді жабу' : 'Закрыть меню') : (kk ? 'Мәзірді ашу' : 'Открыть меню')); });
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { close(); button.focus(); } });
  document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) close(); });
})();`;
const menuAsset = `/assets/services-menu-${createHash('sha256').update(menuScript).digest('hex').slice(0, 8)}.js`;
await writeFile(path.join(output, menuAsset.slice(1)), menuScript);

function documentHtml(lang, slug, title, description, content, structured) {
  const shared = sharedParts(lang, slug);
  const url = `${origin}${shared.path}`;
  const name = `${title} | TEVS.KZ`;
  return `<!doctype html>
<html lang="${lang}"><head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(name)}</title><meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large"><meta name="theme-color" content="#061d33">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="ru-KZ" href="${origin}${servicePath('ru', slug)}">
  <link rel="alternate" hreflang="kk-KZ" href="${origin}${servicePath('kk', slug)}">
  <link rel="alternate" hreflang="x-default" href="${origin}${servicePath('ru', slug)}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta property="og:type" content="website"><meta property="og:site_name" content="TEVS.KZ">
  <meta property="og:locale" content="${lang === 'ru' ? 'ru_KZ' : 'kk_KZ'}"><meta property="og:title" content="${esc(name)}">
  <meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}">
  <meta property="og:image" content="${origin}/natalia-tevs.jpg"><meta property="og:image:alt" content="Тевс Наталья Геннадьевна">
  <meta name="twitter:card" content="summary"><meta name="twitter:title" content="${esc(name)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${origin}/natalia-tevs.jpg">
  ${stylesheet}
  <script type="application/ld+json">${jsonld(structured)}</script>
  <script defer src="/assets/analytics-ga4-v5.js" data-measurement-id="G-SFZWMX2953"></script>
  <script defer src="${menuAsset}"></script>
</head><body class="service-shell">
  <a class="service-skip" href="#content">${lang === 'ru' ? 'К содержанию' : 'Мазмұнға өту'}</a>
  ${shared.header}<main id="content">${content}</main>${shared.footer}
  <noscript><style>.menu-button{display:none}</style></noscript>
</body></html>`;
}

for (const lang of ['ru', 'kk']) {
  const t = copy[lang];
  for (const service of services) {
    const s = service[lang];
    const url = `${origin}${servicePath(lang, service.slug)}`;
    const breadcrumb = crumbs(lang, s.name, service.slug);
    const related = s.related.map((slug) => services.find((x) => x.slug === slug));
    const content = `<section class="service-hero"><div class="container">${breadcrumb.html}<p class="service-geography">${esc(t.geography)}</p><h1>${esc(s.title)}</h1><p class="service-intro">${esc(s.intro)}</p></div></section>
      <div class="container service-detail-layout"><article class="service-article"><h2>${esc(s.heading)}</h2><p>${esc(s.body)}</p><ul class="service-includes">${s.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><section class="service-preparation"><h2>${esc(s.prepareTitle)}</h2><p>${esc(s.prepare)}</p></section><details class="service-faq"><summary>${esc(s.question)}<span aria-hidden="true">+</span></summary><p>${esc(s.answer)}</p></details>${s.source ? `<p class="service-official">${esc(t.official)}: <a href="${esc(s.source[0])}" target="_blank" rel="noreferrer">${esc(s.source[1])}<span aria-hidden="true"> ↗</span></a></p>` : ''}</article>${contactCard(lang, service)}</div>
      <section class="container service-related"><h2>${esc(t.related)}</h2><div class="service-related-links">${related.map((x) => `<a href="${servicePath(lang, x.slug)}">${esc(x[lang].name)}<span aria-hidden="true">↗</span></a>`).join('')}</div><a class="service-all-link" href="${servicePath(lang)}">← ${esc(lang === 'ru' ? 'Все юридические услуги' : 'Барлық заңгерлік қызметтер')}</a></section>`;
    const structured = graph([
      webPage(lang, url, s.title, s.description, `${url}#service`),
      { '@type': 'Service', '@id': `${url}#service`, name: s.title, serviceType: s.name, description: s.description, url, areaServed: { '@type': 'Country', name: 'Казахстан' }, provider: { '@id': `${origin}/#legal-service` } },
      breadcrumb.schema,
    ]);
    await writeRoute(servicePath(lang, service.slug), documentHtml(lang, service.slug, s.title, s.description, content, structured));
  }
  const breadcrumb = crumbs(lang, t.services);
  const cards = services.map((s, index) => `<a class="service-index-card${s.slug === 'konsultaciya' ? ' service-index-consultation' : ''}" href="${servicePath(lang, s.slug)}"><span class="service-index-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><h2>${esc(s[lang].name)}</h2><p>${esc(s[lang].intro)}</p><span class="service-index-more">${esc(t.more)} <span aria-hidden="true">↗</span></span></a>`).join('');
  const content = `<section class="service-hero"><div class="container">${breadcrumb.html}<p class="service-geography">${esc(t.geography)}</p><h1>${esc(t.catalogTitle)}</h1><p class="service-intro">${esc(t.catalogIntro)}</p></div></section><section class="container service-index" aria-label="${esc(t.choose)}">${cards}</section>`;
  const url = `${origin}${servicePath(lang)}`;
  const structured = graph([
    webPage(lang, url, t.catalogTitle, t.catalogIntro, `${url}#services`, 'CollectionPage'),
    { '@type': 'ItemList', '@id': `${url}#services`, itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s[lang].name, url: `${origin}${servicePath(lang, s.slug)}` })) },
    breadcrumb.schema,
  ]);
  await writeRoute(servicePath(lang), documentHtml(lang, '', t.catalogTitle, t.catalogIntro, content, structured));
}

// Keep the latest privacy choices and GA4 text rather than regenerating older copy.
for (const route of ['/privacy/', '/kk/privacy/']) {
  const original = await readFile(path.join(root, 'public', route, 'index.html'), 'utf8');
  const html = original.replace(/<link[^>]+rel="stylesheet"[^>]*>/gi, '').replace('</head>', `  ${stylesheet}\n</head>`);
  await writeRoute(route, html);
}
await writeFile(path.join(output, '.htaccess'), await readFile(path.join(root, 'public/.htaccess')));
await writeFile(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);

const groups = [
  { ru: '/', kk: '/kk/', date: updated },
  { ru: '/privacy/', kk: '/kk/privacy/', date: '2026-10-29' },
  ...['', ...services.map((x) => x.slug)].map((slug) => ({ ru: servicePath('ru', slug), kk: servicePath('kk', slug), date: updated })),
];
const entries = groups.flatMap((g) => [g.ru, g.kk].map((route) => `  <url><loc>${origin}${route}</loc><lastmod>${g.date}</lastmod><xhtml:link rel="alternate" hreflang="ru-KZ" href="${origin}${g.ru}"/><xhtml:link rel="alternate" hreflang="kk-KZ" href="${origin}${g.kk}"/><xhtml:link rel="alternate" hreflang="x-default" href="${origin}${g.ru}"/></url>`));
await writeFile(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`);

const notFound = `<!doctype html><html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><link rel="icon" href="/favicon.svg">${stylesheet}<title>Страница не найдена | TEVS.KZ</title></head><body><main class="legal-page"><header class="legal-header"><div class="container"><a class="legal-logo" href="/">TEVS.KZ</a></div></header><article class="legal-content"><h1>Страница не найдена</h1><p>Запрошенной страницы нет или её адрес изменился.</p><p><a class="legal-back" href="/">Вернуться на главную</a></p></article></main></body></html>`;
await writeFile(path.join(output, '404.html'), notFound);
for (const asset of ['file.svg', 'globe.svg', 'window.svg', 'tevs-hero.png']) await rm(path.join(output, asset), { force: true });
console.log(`Prerendered 2 home pages, 2 service indexes, ${services.length * 2} service pages and 2 current privacy pages.`);

async function writeRoute(route, html) {
  const dir = path.join(output, route.replace(/^\//, ''));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}
