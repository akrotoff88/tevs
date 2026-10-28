import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const output = new URL("../static-build/", import.meta.url);

test("prerenders Russian and Kazakh pages with localized metadata", async () => {
  const ru = await readFile(new URL("index.html", output), "utf8");
  const kk = await readFile(new URL("kk/index.html", output), "utf8");

  assert.match(ru, /<html lang="ru">/);
  assert.match(ru, /Юридическая помощь/);
  assert.match(ru, /rel="canonical" href="https:\/\/tevs\.kz\/"/);
  assert.match(kk, /<html lang="kk">/);
  assert.match(kk, /Қазақстан бойынша/);
  assert.match(kk, /rel="canonical" href="https:\/\/tevs\.kz\/kk\/"/);
  assert.doesNotMatch(ru, /__TEVS_/);
  assert.doesNotMatch(kk, /__TEVS_/);
});

test("ships SEO, privacy, security and optimized image artifacts", async () => {
  const robots = await readFile(new URL("robots.txt", output), "utf8");
  const sitemap = await readFile(new URL("sitemap.xml", output), "utf8");
  const headers = await readFile(new URL(".htaccess", output), "utf8");
  const privacy = await readFile(new URL("privacy/index.html", output), "utf8");

  assert.match(robots, /Sitemap: https:\/\/tevs\.kz\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/tevs\.kz\/kk\//);
  assert.match(headers, /Content-Security-Policy/);
  assert.match(headers, /max-age=31536000/);
  assert.match(privacy, /Политика конфиденциальности/);

  const desktopImage = await stat(new URL("natalia-tevs-1333.webp", output));
  const mobileImage = await stat(new URL("natalia-tevs-720.webp", output));
  assert.ok(desktopImage.size < 60_000);
  assert.ok(mobileImage.size < 30_000);

  await assert.rejects(access(new URL("package.json", output)));
  await assert.rejects(access(new URL("tevs-hero.png", output)));
});
