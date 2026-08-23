import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';

import { chromium } from 'playwright';

import { distRoot, serveStatic } from './static-server.mjs';

/**
 * Asserts that a page's content is actually visible to a reader.
 *
 * Every other gate reads the DOM, and the DOM was perfectly correct while the site rendered
 * nothing at all: `tabMode="top"` put the tree switcher in the same grid area as the page, and
 * with neither element setting `align-self` the switcher stretched into a full-height opaque
 * bar over every page. Links resolved, content audits passed, axe was satisfied, and 209 pages
 * were blank.
 *
 * Presence is therefore not the property to check. These tests ask whether the content is the
 * thing you would actually hit at its own coordinates, which is what occlusion breaks and what
 * a DOM query cannot see.
 */

/*
 * The minimum is per page rather than global so it stays meaningful: a component page that
 * dropped to a few hundred characters is broken, while the tree landing pages are genuinely
 * brief. A single loose threshold would have to be set low enough to pass the landing pages,
 * at which point it would no longer catch a component page losing its examples.
 */
const PAGES = [
  { path: '/docs/react/components/button/', minVisible: 2000 },
  { path: '/docs/react/concepts/developer/theming/', minVisible: 1000 },
  { path: '/docs/headless/components/avatar/', minVisible: 1000 },
  { path: '/docs/react/', minVisible: 800 },
];

let server;
let browser;

before(async () => {
  server = await serveStatic(distRoot, 8976);
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  await server?.close();
});

/** Loads a page and reports what is actually painted in the content column. */
async function inspect(path) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${server.origin}${path}`, { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const heading = document.querySelector('article h1, article h2');

    if (!heading) {
      return { error: 'no heading found in the article' };
    }

    const box = heading.getBoundingClientRect();
    const topmost = document.elementFromPoint(box.x + Math.min(box.width / 2, 200), box.y + box.height / 2);

    return {
      headingText: heading.textContent?.trim() ?? '',
      // `contains` rather than identity: hitting a <code> or <a> inside the heading is fine.
      occluded: !heading.contains(topmost),
      occludedBy: heading.contains(topmost)
        ? null
        : `${topmost?.tagName.toLowerCase()}.${String(topmost?.className).split(' ').slice(0, 3).join('.')}`,
      visibleText: document.querySelector('article')?.innerText.trim().length ?? 0,
    };
  });

  await page.close();
  return result;
}

describe('rendered pages', () => {
  for (const { path, minVisible } of PAGES) {
    it(`shows its content at ${path}`, async () => {
      const { error, headingText, occluded, occludedBy, visibleText } = await inspect(path);

      assert.equal(error, undefined, error);
      assert.ok(headingText.length > 0, `${path}: the heading is empty`);
      assert.equal(occluded, false, `${path}: "${headingText}" is covered by ${occludedBy}`);
      assert.ok(
        visibleText >= minVisible,
        `${path}: ${visibleText} characters of content are visible, expected at least ${minVisible}`,
      );
    });
  }
});
