import { readdir, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';

import { chromium } from 'playwright';

import { distRoot, serveStatic } from './static-server.mjs';

/**
 * Full accessibility sweep across every prerendered page.
 *
 * The `test-a11y` gate checks three representative pages on every run; this is the audit that
 * covers the whole site, which is too slow to gate on but is the only way to catch a defect
 * confined to one page type. Reports serious and critical violations, grouped by rule so the
 * output stays actionable rather than page-by-page noise.
 */

const require = createRequire(import.meta.url);
const axeSource = require('fs').readFileSync(require.resolve('axe-core'), 'utf8');

async function* walk(dir) {
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry);

    if ((await stat(full)).isDirectory()) {
      yield* walk(full);
      continue;
    }

    if (entry === 'index.html') {
      yield full;
    }
  }
}

const routes = [];

for await (const file of walk(join(distRoot, 'docs'))) {
  routes.push(`${file.slice(distRoot.length).replace(/\/index\.html$/, '')}/`);
}

routes.sort();

const server = await serveStatic(distRoot, 8977);
const browser = await chromium.launch();
const page = await browser.newPage();

/** rule id -> { impact, help, pages } */
const findings = new Map();
let scanned = 0;

for (const route of routes) {
  await page.goto(`${server.origin}${route}`, { waitUntil: 'domcontentloaded' });
  await page.addScriptTag({ content: axeSource });

  const violations = await page.evaluate(async () => {
    const results = await window.axe.run(document, { resultTypes: ['violations'] });
    return results.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length }));
  });

  scanned++;

  for (const violation of violations) {
    if (violation.impact !== 'serious' && violation.impact !== 'critical') {
      continue;
    }

    if (!findings.has(violation.id)) {
      findings.set(violation.id, { ...violation, pages: [] });
    }

    findings.get(violation.id).pages.push(route);
  }

  if (scanned % 25 === 0) {
    console.log(`  scanned ${scanned}/${routes.length}`);
  }
}

await browser.close();
await server.close();

console.log(`\nscanned ${scanned} page(s)`);

if (findings.size === 0) {
  console.log('no serious or critical accessibility violations');
  process.exit(0);
}

console.error(`\n${findings.size} rule(s) violated:`);

for (const [id, finding] of [...findings].sort((a, b) => b[1].pages.length - a[1].pages.length)) {
  console.error(`\n  ${finding.impact} · ${id} — ${finding.help}`);
  console.error(`    ${finding.pages.length} page(s), e.g. ${finding.pages.slice(0, 3).join(', ')}`);
}

process.exit(1);
