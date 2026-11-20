/* Focused real-browser regression, not the shared visual harness.
 * Run via react-charts:format --command=node --args=<absolute path to this file>.
 * Set LINE_POINTER_OUTPUT to a fresh absolute TEMP directory. Uses private Edge only.
 */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
// eslint-disable-next-line import/no-extraneous-dependencies -- Existing workspace browser test dependency.
const { chromium } = require('playwright');

const output = process.env.LINE_POINTER_OUTPUT;
assert(output && path.isAbsolute(output), 'Set an absolute LINE_POINTER_OUTPUT directory');
fs.mkdirSync(output, { recursive: false });
const report = { cases: [], failures: [], pageErrors: [], consoleErrors: [] };
const storyId = 'charts-vegadeclarativechart--filtered-multiline-tooltips';
const label = 'Day: 5; Requests: 24; Operational note: Traffic recovered\nNo intervention needed';

async function settled(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise(resolve => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
  });
  await page.waitForFunction(() => document.getAnimations().every(animation => animation.playState !== 'running'));
}

async function check(name, run) {
  const entry = { name };
  report.cases.push(entry);
  try {
    await run(entry);
    entry.passed = true;
  } catch (error) {
    entry.passed = false;
    report.failures.push({ name, message: error.stack });
  }
}

async function hitFacts(mark) {
  return mark.evaluate(element => {
    const bounds = element.getBoundingClientRect();
    const x = bounds.x + bounds.width / 2;
    const y = bounds.y + bounds.height / 2;
    const describe = node =>
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
  page.on('pageerror', error => report.pageErrors.push(error.stack));
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
      await settled(page);
      await check(`${mode}: visible final marker owns center hit`, async entry => {
        assert.equal(await chart.locator('circle[role="option"]').count(), 4);
        assert.equal(await mark.getAttribute('aria-label'), label);
        entry.facts = await hitFacts(mark);
        await chart.screenshot({ path: path.join(output, `${mode}-before-interaction.png`) });
        assert.equal(entry.facts.marker.opacity, '1');
        assert.equal(entry.facts.top.id, entry.facts.marker.id);
      });
      for (const interaction of ['hover', 'focus']) {
        await check(`${mode}: final marker actual ${interaction}`, async entry => {
          await page.mouse.move(0, 0);
          await page.keyboard.press('Tab');
          await settled(page);
          if (interaction === 'hover') {
            // Deliberately use the real actionability check. No force or synthetic mouse events.
            await mark.hover({ timeout: 3500 });
          } else {
            await mark.focus();
          }
          const tooltip = page.locator('.fui-PopoverSurface [role="tooltip"]');
          await tooltip.waitFor({ timeout: 5000 });
          await settled(page);
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
        await settled(page);
        await page.keyboard.press('Escape');
        await settled(page);
      }
    }

    await page.goto('http://localhost:6317/iframe.html?id=charts-linechart--line-chart-basic&viewMode=story');
    const lineOnlyMark = page.locator('path[role="option"][id$="L"]').first();
    const latch = page.locator('circle[id$="D"]').first();
    await lineOnlyMark.waitFor();
    await lineOnlyMark.scrollIntoViewIfNeeded();
    await settled(page);
    await check('line only: radius-8 magnetic area still receives real mouse', async entry => {
      assert.equal(await latch.getAttribute('r'), '8');
      assert.equal(await latch.getAttribute('opacity'), '0');
      assert.notEqual(await latch.evaluate(element => getComputedStyle(element).pointerEvents), 'none');
      // Outside the tiny inactive path and its stroke; still within the radius-8 latch.
      entry.facts = await latch.evaluate(element => {
        const bounds = element.getBoundingClientRect();
        const x = bounds.x + bounds.width / 2;
        const y = bounds.y + bounds.height / 2 + 6;
        return { x, y, id: element.id, hitId: document.elementFromPoint(x, y)?.id };
      });
      assert.equal(entry.facts.hitId, entry.facts.id);
      await page.mouse.move(entry.facts.x, entry.facts.y);
      const surface = page.locator('.fui-PopoverSurface');
      await surface.waitFor();
      await settled(page);
      entry.text = await surface.innerText();
      assert.match(entry.text, /218[,.]?000/);
      assert.match(entry.text, /298[,.]?000/);
      await page.screenshot({ path: path.join(output, 'line-only-enlarged-hover.png'), fullPage: true });
    });
    await settled(page);
    await page.keyboard.press('Escape');
    await settled(page);
    await check('line only: final path keeps keyboard focus and callout', async entry => {
      await page.mouse.move(0, 0);
      await page.keyboard.press('Tab');
      await settled(page);
      await lineOnlyMark.focus();
      const surface = page.locator('.fui-PopoverSurface');
      await surface.waitFor();
      await settled(page);
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
  process.stderr.write(`${error.stack}\n`);
  process.exitCode = 1;
});
