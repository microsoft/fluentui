/* Focused real-browser regression, not the shared visual harness.
 * Run with Node 22.18+ via yarn nx run react-charts:test-browser:line-pointer.
 * Requires Storybook on port 6317.
 * Set LINE_POINTER_OUTPUT to a fresh absolute TEMP directory. Uses private Edge only.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
// eslint-disable-next-line import/no-extraneous-dependencies -- Existing workspace browser test dependency.
import { chromium } from 'playwright';
import type { Locator } from 'playwright';
import { errorDetails, outputDirectory, settled as settlePage } from './browserTestUtils.ts';

type Case = {
  name: string;
  passed?: boolean;
  facts?: unknown;
  text?: string;
  fields?: string[];
  values?: string[];
};

const output = outputDirectory('LINE_POINTER_OUTPUT');
fs.mkdirSync(output, { recursive: false });
const report = {
  browser: '',
  cases: [] as Case[],
  failures: [] as { name: string; message: string }[],
  pageErrors: [] as string[],
  consoleErrors: [] as string[],
};
const storyId = 'charts-vegadeclarativechart--filtered-multiline-tooltips';
const label = 'Day: 5; Requests: 24; Operational note: Traffic recovered\nNo intervention needed';

async function check(name: string, run: (entry: Case) => Promise<void>) {
  const entry: Case = { name };
  report.cases.push(entry);
  try {
    await run(entry);
    entry.passed = true;
  } catch (error) {
    entry.passed = false;
    report.failures.push({ name, message: errorDetails(error) });
  }
}

async function hitFacts(mark: Locator) {
  return mark.evaluate(element => {
    const bounds = element.getBoundingClientRect();
    const x = bounds.x + bounds.width / 2;
    const y = bounds.y + bounds.height / 2;
    const describe = (node: Element | null) =>
      node && {
        tag: node.tagName,
        id: node.id,
        radius: node.getAttribute('r'),
        opacity: getComputedStyle(node).opacity,
        pointerEvents: getComputedStyle(node).pointerEvents,
        label: node.getAttribute('aria-label'),
      };
    return {
      x,
      y,
      marker: describe(element),
      top: describe(document.elementFromPoint(x, y)),
      stack: document.elementsFromPoint(x, y).map(describe),
    };
  });
}

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  report.browser = browser.version();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    locale: 'en-US',
    timezoneId: 'UTC',
  });
  const page = await context.newPage();
  const settled = () => settlePage(page, true);
  page.on('pageerror', error => report.pageErrors.push(errorDetails(error)));
  page.on('console', message => {
    if (message.type() === 'error') {
      report.consoleErrors.push(message.text());
    }
  });
  try {
    for (const mode of ['story', 'docs']) {
      const id = mode === 'story' ? storyId : 'charts-vegadeclarativechart--docs';
      await page.goto(`http://localhost:6317/iframe.html?id=${id}&viewMode=${mode}`);
      const chart =
        mode === 'story'
          ? page.locator('section').first()
          : page.locator(`[id="anchor--${storyId}"], [id="anchor--primary--${storyId}"]`).locator('.docs-story');
      const mark = chart.locator('circle[role="option"][id$="L"]');
      await mark.waitFor();
      await mark.scrollIntoViewIfNeeded();
      await settled();
      await check(`${mode}: visible final marker owns center hit`, async entry => {
        assert.equal(await chart.locator('circle[role="option"]').count(), 4);
        assert.equal(await mark.getAttribute('aria-label'), label);
        const facts = (entry.facts = await hitFacts(mark));
        await chart.screenshot({ path: path.join(output, `${mode}-before-interaction.png`) });
        assert(facts.marker && facts.top);
        assert.equal(facts.marker.opacity, '1');
        assert.equal(facts.top.id, facts.marker.id);
      });
      for (const interaction of ['hover', 'focus']) {
        await check(`${mode}: final marker actual ${interaction}`, async entry => {
          await page.mouse.move(0, 0);
          await page.keyboard.press('Tab');
          await settled();
          if (interaction === 'hover') {
            // Deliberately use the real actionability check. No force or synthetic mouse events.
            await mark.hover({ timeout: 3500 });
          } else {
            await mark.focus();
          }
          const tooltip = page.locator('.fui-PopoverSurface [role="tooltip"]');
          await tooltip.waitFor({ timeout: 5000 });
          await settled();
          entry.text = await tooltip.innerText();
          entry.fields = await tooltip.locator('dt').allTextContents();
          entry.values = await tooltip.locator('dd').allTextContents();
          assert.deepEqual(entry.fields, ['Day', 'Requests', 'Operational note']);
          assert.deepEqual(entry.values, ['5', '24', 'Traffic recovered\nNo intervention needed']);
          if (interaction === 'focus') {
            assert(await mark.evaluate(element => element === element.ownerDocument.activeElement));
          }
          await page.screenshot({ path: path.join(output, `${mode}-${interaction}-last-point.png`), fullPage: true });
        });
        await settled();
        await page.keyboard.press('Escape');
        await settled();
      }
    }

    await page.goto('http://localhost:6317/iframe.html?id=charts-linechart--line-chart-basic&viewMode=story');
    const lineOnlyMark = page.locator('path[role="option"][id$="L"]').first();
    const latch = page.locator('circle[id$="D"]').first();
    await lineOnlyMark.waitFor();
    await lineOnlyMark.scrollIntoViewIfNeeded();
    await settled();
    await check('line only: radius-8 magnetic area still receives real mouse', async entry => {
      assert.equal(await latch.getAttribute('r'), '8');
      assert.equal(await latch.getAttribute('opacity'), '0');
      assert.notEqual(await latch.evaluate(element => getComputedStyle(element).pointerEvents), 'none');
      // Outside the tiny inactive path and its stroke; still within the radius-8 latch.
      const facts = await latch.evaluate(element => {
        const bounds = element.getBoundingClientRect();
        const x = bounds.x + bounds.width / 2;
        const y = bounds.y + bounds.height / 2 + 6;
        return { x, y, id: element.id, hitId: document.elementFromPoint(x, y)?.id };
      });
      entry.facts = facts;
      assert.equal(facts.hitId, facts.id);
      await page.mouse.move(facts.x, facts.y);
      const surface = page.locator('.fui-PopoverSurface');
      await surface.waitFor();
      await settled();
      entry.text = await surface.innerText();
      assert.match(entry.text, /218[,.]?000/);
      assert.match(entry.text, /298[,.]?000/);
      await page.screenshot({ path: path.join(output, 'line-only-enlarged-hover.png'), fullPage: true });
    });
    await settled();
    await page.keyboard.press('Escape');
    await settled();
    await check('line only: final path keeps keyboard focus and callout', async entry => {
      await page.mouse.move(0, 0);
      await page.keyboard.press('Tab');
      await settled();
      await lineOnlyMark.focus();
      const surface = page.locator('.fui-PopoverSurface');
      await surface.waitFor();
      await settled();
      entry.text = await surface.innerText();
      assert.match(entry.text, /218[,.]?000/);
      assert.match(entry.text, /298[,.]?000/);
      assert(await lineOnlyMark.evaluate(element => element === element.ownerDocument.activeElement));
      await page.screenshot({ path: path.join(output, 'line-only-focus.png'), fullPage: true });
    });
  } finally {
    await context.close();
    await browser.close();
    fs.writeFileSync(path.join(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  }
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  assert.equal(report.pageErrors.length, 0, 'No page errors');
  assert.equal(report.failures.length, 0, 'All focused pointer and keyboard checks pass');
}

main().catch(error => {
  process.stderr.write(`${errorDetails(error)}\n`);
  process.exitCode = 1;
});
