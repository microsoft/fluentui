/* Real Storybook regression; read-only fixtures, no screenshot baselines or harness changes.
 * Run through react-charts:format with --command=node --args=<absolute path to this file>.
 * VEGA_SHELL_OUTPUT selects a fresh evidence directory; requires Storybook on port 6317.
 */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
// eslint-disable-next-line import/no-extraneous-dependencies -- Browser-only regression uses the existing workspace dev dependency, not a shipping chart dependency.
const { chromium } = require('playwright');

const output = process.env.VEGA_SHELL_OUTPUT;
assert(output && path.isAbsolute(output), 'Set an absolute VEGA_SHELL_OUTPUT evidence directory');
fs.mkdirSync(output, { recursive: true });
const before = process.env.VEGA_SHELL_BEFORE
  ? JSON.parse(fs.readFileSync(process.env.VEGA_SHELL_BEFORE, 'utf8'))
  : undefined;
const report = { cases: [], failures: [], pageErrors: [] };
const stories = [
  ['ranged-grouped-bars', ['Platform', 'Product']],
  ['centered-area', ['Search', 'Storage']],
  ['corpus-xoffset-not-color', ['Warm', 'Cool']],
  ['corpus-yoffset-named-group', ['Warm', 'Cool']],
  ['corpus-center-bars', ['First', 'Second']],
];

async function settled(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise(resolve => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
  });
}

async function check(name, run) {
  try {
    await run();
  } catch (error) {
    report.failures.push({ name, message: error.stack });
  }
}

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  report.browser = browser.version();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    locale: 'en-US',
    timezoneId: 'UTC',
  });
  try {
    for (const [story, expected] of stories) {
      await check(story, async () => {
        const page = await context.newPage();
        page.on('pageerror', error => report.pageErrors.push({ story, message: error.stack }));
        try {
          await page.goto(`http://localhost:6317/iframe.html?id=charts-vegadeclarativechart--${story}&viewMode=story`);
          const svg = page
            .locator('svg')
            .filter({ has: page.locator('[data-ranged-mark], [data-centered-point]') })
            .first();
          await svg.waitFor();
          await settled(page);
          const facts = await svg.evaluate(element => {
            const rect = node => {
              const { x, y, width, height, bottom, right } = node.getBoundingClientRect();
              return { x, y, width, height, bottom, right };
            };
            const shell = element.closest('[role="presentation"]');
            const ancestors = [];
            for (let node = shell; node && node !== document.body; node = node.parentElement) {
              const css = getComputedStyle(node);
              ancestors.push({
                tag: node.tagName,
                style: node.getAttribute('style'),
                bounds: rect(node),
                overflowX: css.overflowX,
                overflowY: css.overflowY,
              });
            }
            return {
              svg: rect(element),
              svgHeight: element.getAttribute('height'),
              shell: rect(shell),
              shellStyle: shell.getAttribute('style'),
              ancestors,
              legends: [...shell.querySelectorAll('[role="option"]')].map(node => {
                const text = [...node.querySelectorAll('span')].find(span => span.textContent.trim());
                const range = document.createRange();
                range.selectNodeContents(text || node);
                const { top, bottom, left, right, width, height } = range.getBoundingClientRect();
                return {
                  text: node.textContent.trim(),
                  bounds: rect(node),
                  textBounds: { top, bottom, left, right, width, height },
                };
              }),
              marks: [...element.querySelectorAll('[data-ranged-mark], [data-centered-point]')].map(node => ({
                label: node.getAttribute('aria-label'),
                d: node.getAttribute('d'),
                cx: node.getAttribute('cx'),
                cy: node.getAttribute('cy'),
              })),
            };
          });
          report.cases.push({ story, ...facts });
          if (before) {
            const previous = before.cases.find(entry => entry.story === story && !entry.interaction);
            assert(previous, `${story}: missing independent before measurements`);
            assert.deepEqual(
              facts.marks,
              previous.marks,
              `${story}: source values, ARIA and mark geometry must not change`,
            );
            assert.equal(facts.svgHeight, previous.svgHeight, `${story}: SVG viewport height must not change`);
            assert.equal(facts.svg.width, previous.svg.width, `${story}: SVG viewport width must not change`);
          }
          await page.screenshot({ path: path.join(output, `${story}.png`), fullPage: true });
          const capture = page.locator('section').first();
          await capture.screenshot({ path: path.join(output, `${story}-element.png`) });
          assert.deepEqual(facts.legends.map(legend => legend.text).sort(), [...expected].sort());
          for (const legend of facts.legends) {
            assert(legend.textBounds.height > 0, `${legend.text}: empty text bounds`);
            assert(
              legend.textBounds.left >= facts.shell.x &&
                legend.textBounds.right <= facts.shell.right + 1 &&
                legend.textBounds.top >= facts.shell.y,
              `${legend.text}: text outside shell capture`,
            );
            assert(
              legend.textBounds.bottom <= facts.shell.bottom + 1,
              `${legend.text}: text bottom ${legend.textBounds.bottom} > shell bottom ${facts.shell.bottom}`,
            );
            for (const ancestor of facts.ancestors.filter(node => /auto|scroll|hidden|clip/.test(node.overflowY))) {
              assert(
                legend.textBounds.bottom <= ancestor.bounds.bottom + 1,
                `${legend.text}: clipped by ${ancestor.tag} ${JSON.stringify(ancestor)}`,
              );
            }
          }
        } finally {
          await page.close();
        }
      });
    }
    for (const story of ['ranged-grouped-bars', 'centered-area', 'corpus-filtered-tooltip-newlines']) {
      for (const interaction of ['hover', 'focus']) {
        await check(`${story}-${interaction}`, async () => {
          const page = await context.newPage();
          page.on('pageerror', error =>
            report.pageErrors.push({
              story,
              interaction,
              name: error.name,
              message: error.message,
              stack: error.stack,
            }),
          );
          try {
            await page.goto(
              `http://localhost:6317/iframe.html?id=charts-vegadeclarativechart--${story}&viewMode=story`,
            );
            const marks = page
              .locator('[data-ranged-mark], [data-centered-point], [role="option"][aria-label]')
              .filter({ hasNot: page.locator('button') });
            await marks.first().waitFor();
            await settled(page);
            const index = await marks.evaluateAll(nodes =>
              nodes.reduce(
                (best, node, i) =>
                  node.getBoundingClientRect().right > nodes[best].getBoundingClientRect().right ? i : best,
                0,
              ),
            );
            const mark = marks.nth(index);
            const label = await mark.getAttribute('aria-label');
            // Activate Tabster with a real Tab before moving focus to a specific SVG mark.
            await page.keyboard.press('Tab');
            await settled(page);
            if (interaction === 'hover') {
              await mark.hover();
            } else {
              await mark.focus();
            }
            const surface = page.locator('.fui-PopoverSurface').filter({ has: page.locator('[role="tooltip"]') });
            await surface.waitFor();
            await settled(page);
            // Measure the final surface, not a transient enter-animation transform.
            await page.waitForFunction(() =>
              document.getAnimations().every(animation => animation.playState !== 'running'),
            );
            const facts = await surface.evaluate(element => {
              const rect = node => {
                const { top, bottom, left, right, width, height } = node.getBoundingClientRect();
                return { top, bottom, left, right, width, height };
              };
              const ancestors = [];
              for (let node = element.parentElement; node && node !== document.body; node = node.parentElement) {
                const css = getComputedStyle(node);
                if (/auto|scroll|hidden|clip/.test(`${css.overflowX} ${css.overflowY}`)) {
                  ancestors.push({
                    tag: node.tagName,
                    bounds: rect(node),
                    overflowX: css.overflowX,
                    overflowY: css.overflowY,
                  });
                }
              }
              return {
                bounds: rect(element),
                text: element.innerText,
                filter: getComputedStyle(element).filter,
                ancestors,
                portal: !!element.closest('[data-portal-node]'),
                viewport: { width: innerWidth, height: innerHeight },
              };
            });
            report.cases.push({ story, interaction, label, ...facts });
            if (before) {
              const previous = before.cases.find(entry => entry.story === story && entry.interaction === interaction);
              assert.equal(label, previous.label, `${story}: original point label must remain unchanged`);
              assert.equal(
                facts.text,
                previous.text,
                `${story}: tooltip values, formatting and newlines must remain unchanged`,
              );
            }
            await page.screenshot({ path: path.join(output, `${story}-${interaction}.png`) });
            assert(facts.text.trim(), 'Tooltip must retain its actual text');
            assert.notEqual(facts.filter, 'none', 'Tooltip shadow must not be disabled');
            // Conservative envelope for Fluent's 2px ambient + (0,8,16px) key drop shadows.
            const shadow = {
              left: facts.bounds.left - 32,
              right: facts.bounds.right + 32,
              top: facts.bounds.top - 32,
              bottom: facts.bounds.bottom + 40,
            };
            assert(
              shadow.left >= 0 &&
                shadow.top >= 0 &&
                shadow.right <= facts.viewport.width &&
                shadow.bottom <= facts.viewport.height,
              `Shadow outside viewport: ${JSON.stringify({ shadow, facts })}`,
            );
            for (const ancestor of facts.ancestors) {
              assert(
                shadow.left >= ancestor.bounds.left &&
                  shadow.right <= ancestor.bounds.right &&
                  shadow.top >= ancestor.bounds.top &&
                  shadow.bottom <= ancestor.bounds.bottom,
                `Tooltip/shadow clipped by ${JSON.stringify(ancestor)}`,
              );
            }
            await page.keyboard.press('Escape');
            await settled(page);
          } finally {
            await page.close();
          }
        });
      }
    }
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(output, 'measurements.json'), `${JSON.stringify(report, null, 2)}\n`);
  }
  assert.equal(report.pageErrors.length, 0, JSON.stringify(report.pageErrors));
  assert.equal(report.failures.length, 0, JSON.stringify(report.failures, null, 2));
}

main().catch(error => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exitCode = 1;
});
