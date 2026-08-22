import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { after, before, describe, it } from 'node:test';

import { chromium } from 'playwright';

import { distRoot, serveStatic } from './static-server.mjs';

const require = createRequire(import.meta.url);
const axeSource = require('fs').readFileSync(require.resolve('axe-core'), 'utf8');

const PAGES = ['/docs/react/components/button/', '/docs/react/', '/docs/'];

let server;
let browser;

before(async () => {
  server = await serveStatic(distRoot, 8975);
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  await server?.close();
});

/**
 * Runs axe against a page and returns only serious/critical violations.
 *
 * Moderate/minor findings are reported but not failed on, so this gate stays actionable
 * rather than becoming noise the team learns to ignore.
 */
async function analyse(path) {
  const page = await browser.newPage();

  await page.goto(`${server.origin}${path}`, { waitUntil: 'networkidle' });
  await page.addScriptTag({ content: axeSource });

  const results = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    return await axe.run(document, { resultTypes: ['violations'] });
  });

  await page.close();

  return results.violations;
}

describe('accessibility', () => {
  for (const path of PAGES) {
    it(`has no serious or critical violations on ${path}`, async () => {
      const violations = await analyse(path);
      const blocking = violations.filter(v => v.impact === 'serious' || v.impact === 'critical');

      const detail = blocking.map(v => `${v.impact} · ${v.id} · ${v.help} (${v.nodes.length} node(s))`).join('\n  ');

      assert.equal(blocking.length, 0, blocking.length ? `\n  ${detail}` : undefined);
    });
  }

  it('renders the component page with a coherent heading order', async () => {
    const page = await browser.newPage();
    await page.goto(`${server.origin}/docs/react/components/button/`, { waitUntil: 'networkidle' });

    const levels = await page
      .locator('h1, h2, h3')
      .evaluateAll(nodes => nodes.map(node => Number(node.tagName.slice(1))));

    await page.close();

    assert.ok(levels.length > 0, 'expected headings on the component page');

    for (let index = 1; index < levels.length; index++) {
      assert.ok(
        levels[index] - levels[index - 1] <= 1,
        `heading level jumped from h${levels[index - 1]} to h${levels[index]}`,
      );
    }
  });
});
