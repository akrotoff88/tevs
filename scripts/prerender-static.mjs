import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outputRoot = path.join(projectRoot, "static-build");
const ssrEntry = path.join(projectRoot, ".static-ssr", "ssr.mjs");
const { render } = await import(`${pathToFileURL(ssrEntry).href}?v=${Date.now()}`);

const pages = {
  ru: {
    htmlLang: "ru",
    locale: "ru_KZ",
    canonical: "https://tevs.kz/",
    title: "Юрист в Костанае — Тевс Наталья Геннадьевна | TEVS.KZ",
    description:
      "Юридическая помощь в Костанае и по Казахстану: консультации, судебные споры, недвижимость, регистрация ТОО и сопровождение бизнеса.",
  },
  kk: {
    htmlLang: "kk",
    locale: "kk_KZ",
    canonical: "https://tevs.kz/kk/",
    title: "Қостанайдағы заңгер — Тевс Наталья Геннадьевна | TEVS.KZ",
    description:
      "Қостанайда және Қазақстан бойынша заң көмегі: кеңес беру, сот даулары, жылжымайтын мүлік, ЖШС тіркеу және бизнесті сүйемелдеу.",
  },
};

const legalPractice = {
  "@type": "LegalService",
  "@id": "https://tevs.kz/#legal-service",
  name: "TEVS.KZ — юридическая практика Тевс Натальи Геннадьевны",
  url: "https://tevs.kz/",
  image: "https://tevs.kz/natalia-tevs-1333.webp",
  telephone: ["+77055445554", "+77142751220"],
  email: "natalia@tevs.kz",
  priceRange: "от 15 000 ₸",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Алтынсарина, д. 34, н.п. 190",
    addressLocality: "Костанай",
    addressCountry: "KZ",
  },
  areaServed: {
    "@type": "Country",
    name: "Казахстан",
  },
  founder: { "@id": "https://tevs.kz/#natalia-tevs" },
};

function pageSchema(lang) {
  const page = pages[lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      legalPractice,
      {
        "@type": "Person",
        "@id": "https://tevs.kz/#natalia-tevs",
        name: "Тевс Наталья Геннадьевна",
        jobTitle: "Юрист",
        url: "https://tevs.kz/#about",
        image: "https://tevs.kz/natalia-tevs-1333.webp",
        worksFor: { "@id": legalPractice["@id"] },
      },
      {
        "@type": "WebSite",
        "@id": "https://tevs.kz/#website",
        url: "https://tevs.kz/",
        name: "TEVS.KZ",
        inLanguage: ["ru-KZ", "kk-KZ"],
        publisher: { "@id": legalPractice["@id"] },
      },
      {
        "@type": "WebPage",
        "@id": `${page.canonical}#webpage`,
        url: page.canonical,
        name: page.title,
        description: page.description,
        inLanguage: lang === "ru" ? "ru-KZ" : "kk-KZ",
        isPartOf: { "@id": "https://tevs.kz/#website" },
        mainEntity: { "@id": legalPractice["@id"] },
        about: { "@id": "https://tevs.kz/#natalia-tevs" },
      },
    ],
  };
}

function noScriptContact(lang) {
  return lang === "ru"
    ? 'Для консультации <a href="tel:+77055445554">позвоните +7 705 544 55 54</a> или <a href="https://wa.me/77055445554">напишите в WhatsApp</a>.'
    : 'Кеңес алу үшін <a href="tel:+77055445554">+7 705 544 55 54 нөміріне қоңырау шалыңыз</a> немесе <a href="https://wa.me/77055445554">WhatsApp арқылы жазыңыз</a>.';
}

const template = await readFile(path.join(outputRoot, "index.html"), "utf8");

function buildPage(lang) {
  const page = pages[lang];
  const appHtml = render(lang);
  return template
    .replace('<html lang="ru">', `<html lang="${page.htmlLang}">`)
    .replaceAll("__TEVS_TITLE__", page.title)
    .replaceAll("__TEVS_DESCRIPTION__", page.description)
    .replaceAll("__TEVS_LOCALE__", page.locale)
    .replaceAll("__TEVS_CANONICAL__", page.canonical)
    .replace("__TEVS_JSONLD__", JSON.stringify(pageSchema(lang)).replaceAll("<", "\\u003c"))
    .replace("__TEVS_NOSCRIPT__", noScriptContact(lang))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

await writeFile(path.join(outputRoot, "index.html"), buildPage("ru"));
await mkdir(path.join(outputRoot, "kk"), { recursive: true });
await writeFile(path.join(outputRoot, "kk", "index.html"), buildPage("kk"));

const stylesheetTag = template.match(/<link[^>]+rel="stylesheet"[^>]*>/i)?.[0] ?? "";

const privacy = {
  ru: {
    lang: "ru",
    dir: "privacy",
    canonical: "https://tevs.kz/privacy/",
    title: "Политика конфиденциальности | TEVS.KZ",
    description: "Политика обработки персональных данных на сайте TEVS.KZ.",
    back: "← Вернуться на сайт",
    heading: "Политика конфиденциальности",
    updated: "Редакция от 29 октября 2026 года",
    sections: [
      ["1. Общие положения", "Настоящая политика описывает порядок обработки данных, которые посетитель добровольно передаёт через сайт TEVS.KZ. Оператором является ИП Тевс Наталья Геннадьевна."],
      ["2. Какие данные обрабатываются", "При обращении могут обрабатываться имя, номер телефона, адрес электронной почты, содержание сообщения и техническая информация, необходимая для работы сайта."],
      ["3. Цели обработки", "Данные используются исключительно для связи с посетителем, проведения первичной консультации, подготовки ответа и дальнейшего оказания юридических услуг по согласованию сторон."],
      ["4. Передача сообщения", "Форма на сайте не сохраняет данные на сервере TEVS.KZ. После нажатия кнопки браузер открывает WhatsApp с подготовленным сообщением. Дальнейшая обработка в WhatsApp регулируется условиями соответствующего сервиса."],
      ["5. Права посетителя", "Вы можете запросить уточнение, прекращение обработки или удаление ранее переданных данных, обратившись по электронной почте или телефону, указанным ниже."],
      ["6. Контакты", "E-mail: natalia@tevs.kz. Телефон: +7 705 544 55 54. Адрес: г. Костанай, ул. Алтынсарина, д. 34, н.п. 190."],
    ],
  },
  kk: {
    lang: "kk",
    dir: path.join("kk", "privacy"),
    canonical: "https://tevs.kz/kk/privacy/",
    title: "Құпиялық саясаты | TEVS.KZ",
    description: "TEVS.KZ сайтындағы дербес деректерді өңдеу саясаты.",
    back: "← Сайтқа қайту",
    heading: "Құпиялық саясаты",
    updated: "2026 жылғы 29 қазандағы редакция",
    sections: [
      ["1. Жалпы ережелер", "Бұл саясат келуші TEVS.KZ сайты арқылы ерікті түрде беретін деректерді өңдеу тәртібін сипаттайды. Оператор — Тевс Наталья Геннадьевна ЖК."],
      ["2. Өңделетін деректер", "Өтініш жасаған кезде аты-жөні, телефон нөмірі, электрондық пошта мекенжайы, хабарлама мазмұны және сайт жұмысына қажетті техникалық ақпарат өңделуі мүмкін."],
      ["3. Өңдеу мақсаттары", "Деректер келушімен байланысу, алғашқы кеңес беру, жауап дайындау және тараптардың келісімі бойынша заңгерлік қызмет көрсету үшін ғана пайдаланылады."],
      ["4. Хабарламаны жіберу", "Сайттағы нысан деректерді TEVS.KZ серверінде сақтамайды. Түйме басылғаннан кейін браузер дайын хабарламамен WhatsApp-ты ашады. WhatsApp-тағы кейінгі өңдеу тиісті сервистің шарттарымен реттеледі."],
      ["5. Келушінің құқықтары", "Төменде көрсетілген электрондық пошта немесе телефон арқылы бұрын берілген деректерді нақтылауды, өңдеуді тоқтатуды немесе жоюды сұрай аласыз."],
      ["6. Байланыс", "E-mail: natalia@tevs.kz. Телефон: +7 705 544 55 54. Мекенжай: Қостанай қ., Алтынсарин көш., 34-үй, 190-тұрғын емес үй-жай."],
    ],
  },
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function privacyHtml(page) {
  const sections = page.sections
    .map(([title, body]) => `<section><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p></section>`)
    .join("\n");
  return `<!doctype html>
<html lang="${page.lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#061d33" />
    <link rel="canonical" href="${page.canonical}" />
    <link rel="alternate" hreflang="ru-KZ" href="https://tevs.kz/privacy/" />
    <link rel="alternate" hreflang="kk-KZ" href="https://tevs.kz/kk/privacy/" />
    <link rel="alternate" hreflang="x-default" href="https://tevs.kz/privacy/" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    ${stylesheetTag}
    <title>${escapeHtml(page.title)}</title>
  </head>
  <body>
    <main class="legal-page">
      <header class="legal-header"><div class="container"><a class="legal-logo" href="${page.lang === "ru" ? "/" : "/kk/"}">TEVS.KZ</a><a class="legal-back" href="${page.lang === "ru" ? "/" : "/kk/"}">${page.back}</a></div></header>
      <article class="legal-content"><h1>${page.heading}</h1><p class="legal-updated">${page.updated}</p>${sections}</article>
      <footer class="legal-footer">© 2026 TEVS.KZ</footer>
    </main>
  </body>
</html>`;
}

for (const page of Object.values(privacy)) {
  const directory = path.join(outputRoot, page.dir);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), privacyHtml(page));
}

// Include the existing indexable pages, keeping language pairs reciprocal.
const sitemapGroups = [
  { ru: "https://tevs.kz/", kk: "https://tevs.kz/kk/" },
  { ru: privacy.ru.canonical, kk: privacy.kk.canonical },
];
const sitemapEntries = sitemapGroups.flatMap((group) =>
  [group.ru, group.kk].map((url) => `  <url>
    <loc>${url}</loc>
    <lastmod>2026-10-29</lastmod>
    <xhtml:link rel="alternate" hreflang="ru-KZ" href="${group.ru}" />
    <xhtml:link rel="alternate" hreflang="kk-KZ" href="${group.kk}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${group.ru}" />
  </url>`),
).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries}
</urlset>
`;

await writeFile(path.join(outputRoot, "robots.txt"), "User-agent: *\nAllow: /\n\nSitemap: https://tevs.kz/sitemap.xml\n");
await writeFile(path.join(outputRoot, "sitemap.xml"), sitemap);

const htaccess = `Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html
AddDefaultCharset UTF-8

<IfModule mod_rewrite.c>
  RewriteEngine On
  # Only redirect explicitly requested index.html; allow DirectoryIndex internally.
  RewriteCond %{THE_REQUEST} "\\s/+(.*/)?index\\.html(?:[?\\s])" [NC]
  RewriteRule ^(.*/)?index\\.html$ /$1 [R=301,L,NE]
  RewriteRule ^(?:app|build|db|drizzle|examples|scripts|static-src|tests|worker|public|\\.openai)(?:/|$) - [F,L,NC]
</IfModule>

<FilesMatch "^(?:package(?:-lock)?\\.json|README\\.md|tsconfig\\.json|vite(?:\\.static|\\.static\\.ssr)?\\.config\\.ts|next\\.config\\.ts|drizzle\\.config\\.ts|postcss\\.config\\.mjs|eslint\\.config\\.mjs)$">
  Require all denied
</FilesMatch>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Strict-Transport-Security "max-age=15552000"
  Header always set Content-Security-Policy "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://wa.me; frame-ancestors 'self'; upgrade-insecure-requests"

  <FilesMatch "\\.(?:css|js|webp|jpg|jpeg|png|svg)$">
    Header set Cache-Control "public, max-age=86400, must-revalidate"
  </FilesMatch>
  <FilesMatch "-[A-Za-z0-9_-]{8,}\\.(?:css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(?:html)$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>
`;

await writeFile(path.join(outputRoot, ".htaccess"), htaccess);

const notFound = `<!doctype html><html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><link rel="icon" href="/favicon.svg">${stylesheetTag}<title>Страница не найдена | TEVS.KZ</title></head><body><main class="legal-page"><header class="legal-header"><div class="container"><a class="legal-logo" href="/">TEVS.KZ</a></div></header><article class="legal-content"><h1>Страница не найдена</h1><p>Запрошенной страницы нет или её адрес изменился.</p><p><a class="legal-back" href="/">Вернуться на главную</a></p></article></main></body></html>`;
await writeFile(path.join(outputRoot, "404.html"), notFound);

for (const staleAsset of ["file.svg", "globe.svg", "window.svg", "tevs-hero.png"]) {
  await rm(path.join(outputRoot, staleAsset), { force: true });
}

console.log("Prerendered RU/KK pages, privacy pages, SEO files, headers, and 404 page.");

