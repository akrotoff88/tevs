import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { services, servicePath } from '../scripts/services-content.mjs';

const root = new URL('../static-build/', import.meta.url);
const read = (route) => readFile(new URL(`${route.replace(/^\//, '')}index.html`, root), 'utf8');

test('all service pages have reciprocal language routes, real content and working local calls to action', async () => {
  const descriptions = new Set();
  for (const lang of ['ru', 'kk']) {
    for (const service of services) {
      const route = servicePath(lang, service.slug);
      const html = await read(route);
      assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, route);
      assert.ok(html.includes(`<link rel="canonical" href="https://tevs.kz${route}">`), route);
      assert.ok(html.includes(`hreflang="ru-KZ" href="https://tevs.kz${servicePath('ru', service.slug)}"`), route);
      assert.ok(html.includes(`hreflang="kk-KZ" href="https://tevs.kz${servicePath('kk', service.slug)}"`), route);
      assert.ok(html.includes(service[lang].prepare), route);
      assert.ok(html.includes('href="tel:+77055445554"'), route);
      assert.ok(html.includes('mailto:natalia@tevs.kz'), route);
      assert.ok(html.includes('analytics-ga4-v5.js'), route);
      assert.doesNotMatch(html, /index-owner-|hydrateRoot|__TEVS_|\+77142751220/);
      const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
      assert.ok(schema['@graph'].some((n) => n['@type'] === 'Service' && n.url === `https://tevs.kz${route}`));
      assert.ok(schema['@graph'].some((n) => n['@type'] === 'BreadcrumbList' && n.itemListElement.at(-1).item === `https://tevs.kz${route}`));
      descriptions.add(service[lang].description);
    }
  }
  assert.equal(descriptions.size, services.length * 2);
});

test('home pages link into the service catalogue without losing current contact and analytics details', async () => {
  for (const lang of ['ru', 'kk']) {
    const home = await read(lang === 'ru' ? '/' : '/kk/');
    for (const service of services) assert.ok(home.includes(`href="${servicePath(lang, service.slug)}"`), service.slug);
    assert.ok(home.includes(`href="${servicePath(lang)}"`));
    assert.ok(home.includes('G-SFZWMX2953'));
    assert.ok(home.includes('natalia@tevs.kz'));
    assert.ok(home.includes('https://t.me/+77055445554'));
    assert.doesNotMatch(home, /\+77142751220|15 лет|15 жылдан/);
  }
  const privacy = await read('/privacy/');
  assert.ok(privacy.includes('data-analytics-choice="denied"'));
  assert.ok(privacy.includes('Статистика посещений включена по умолчанию'));
});

test('sitemap exposes every service and language pair as canonical URLs', async () => {
  const sitemap = await readFile(new URL('sitemap.xml', root), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((x) => x[1]);
  assert.equal(urls.length, 20);
  assert.equal(new Set(urls).size, 20);
  for (const lang of ['ru', 'kk']) {
    for (const slug of ['', ...services.map((x) => x.slug)]) assert.ok(urls.includes(`https://tevs.kz${servicePath(lang, slug)}`));
  }
  assert.ok(urls.every((x) => !x.includes('index.html') && !x.includes('#')));
});
