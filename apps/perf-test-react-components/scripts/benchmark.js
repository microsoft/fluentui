#!/usr/bin/env node
/**
 * benchmark.js — per-iteration layout/script/task duration measurement
 *
 * Navigates each scenario with iterations=1 (one mount), captures Chrome
 * DevTools performance metrics via page.metrics() delta, repeats N times,
 * and reports medians.
 *
 * Usage:
 *   # Build the bundle first (only needed once or after code changes):
 *   yarn nx run perf-test-react-components:perf-test:bundle
 *
 *   # Run the benchmark:
 *   node apps/perf-test-react-components/scripts/benchmark.js
 *
 *   # Custom runs and scenarios:
 *   node apps/perf-test-react-components/scripts/benchmark.js --runs 20 \
 *     --scenarios OverflowNoOptOutOverflow,OverflowNoOptOutOverflowFlat
 */

'use strict';

const puppeteer = require('puppeteer');
const path = require('path');

// ── CLI args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const get = (flag, def) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};

const RUNS = parseInt(get('--runs', '30'), 10);
const RENDER_TYPE = get('--renderType', 'mount');
const CPU_THROTTLE = parseFloat(get('--cpuThrottle', '1'));
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const BASE_URL = `file://${DIST_DIR}/index.html`;

const DEFAULT_SCENARIOS = [
  'OverflowNoOptOutOverflow',
  'OverflowMenuOptOutOverflow',
  'OverflowItemsOptOutOverflow',
  'OverflowBothOptOutOverflow',
  'OverflowNoOptOutOverflowFlat',
  'OverflowMenuOptOutOverflowFlat',
  'OverflowItemsOptOutOverflowFlat',
  'OverflowBothOptOutOverflowFlat',
];

const scenarioArg = get('--scenarios', null);
const SCENARIOS = scenarioArg ? scenarioArg.split(',') : DEFAULT_SCENARIOS;

// ── Helpers ─────────────────────────────────────────────────────────────────

const median = arr => {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const fmt = n => n.toFixed(4);
const pct = (a, b) => (((b - a) / a) * 100).toFixed(1);
const sign = n => (n > 0 ? '+' : '') + n;

// ── Measurement ─────────────────────────────────────────────────────────────

/**
 * Measures one iteration of a scenario.
 * Returns { layout, script, task, recalcStyle } in seconds.
 *
 * Chrome resets DevTools performance metrics on each page navigation, so
 * the absolute values captured after #render-done represent the cost of
 * loading + executing that single-iteration scenario run.
 */
async function measure(page, scenario) {
  const url = `${BASE_URL}?scenario=${scenario}&iterations=1&renderType=${RENDER_TYPE}`;

  page.setDefaultTimeout(15_000);
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForSelector('#render-done', { timeout: 15_000 });

  const m = await page.metrics();

  return {
    layout: m.LayoutDuration,
    script: m.ScriptDuration,
    task: m.TaskDuration,
    recalcStyle: m.RecalcStyleDuration,
  };
}

// ── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const results = {};

  for (const scenario of SCENARIOS) {
    const page = await browser.newPage();

    if (CPU_THROTTLE > 1) {
      await page.emulateCPUThrottling(CPU_THROTTLE);
    }

    // Warm-up run (JIT, caches)
    await measure(page, scenario);

    const samples = { layout: [], script: [], task: [], recalcStyle: [] };

    process.stdout.write(`  ${scenario.padEnd(40)}`);
    for (let i = 0; i < RUNS; i++) {
      const m = await measure(page, scenario);
      samples.layout.push(m.layout);
      samples.script.push(m.script);
      samples.task.push(m.task);
      samples.recalcStyle.push(m.recalcStyle);
      process.stdout.write('.');
    }
    process.stdout.write('\n');

    results[scenario] = {
      layout: median(samples.layout),
      script: median(samples.script),
      task: median(samples.task),
      recalcStyle: median(samples.recalcStyle),
    };

    await page.close();
  }

  await browser.close();

  // ── Report ──────────────────────────────────────────────────────────────────

  const PAIRS = [
    ['OverflowNoOptOutOverflow', 'OverflowNoOptOutOverflowFlat'],
    ['OverflowMenuOptOutOverflow', 'OverflowMenuOptOutOverflowFlat'],
    ['OverflowItemsOptOutOverflow', 'OverflowItemsOptOutOverflowFlat'],
    ['OverflowBothOptOutOverflow', 'OverflowBothOptOutOverflowFlat'],
  ].filter(([a, b]) => results[a] && results[b]);

  const COL = 22;

  for (const metric of ['layout', 'script', 'task', 'recalcStyle']) {
    const LABELS = {
      layout: 'LayoutDuration (s)',
      script: 'ScriptDuration (s)',
      task: 'TaskDuration (s)',
      recalcStyle: 'RecalcStyleDuration (s)',
    };
    const throttleNote = CPU_THROTTLE > 1 ? ` — CPU throttle ${CPU_THROTTLE}x` : '';
    console.log(`\n${'─'.repeat(80)}`);
    console.log(`  ${LABELS[metric]}  (median of ${RUNS} single-mount runs${throttleNote})`);
    console.log(`${'─'.repeat(80)}`);
    console.log(
      `  ${'Scenario'.padEnd(COL)} ${'Original'.padStart(12)} ${'Flat'.padStart(12)} ${'Delta%'.padStart(10)}`,
    );
    console.log(`  ${'─'.repeat(COL + 36)}`);

    for (const [orig, flat] of PAIRS) {
      const label = orig.replace('Overflow', '').replace('OptOut', '').replace('Overflow', '').padEnd(COL);
      const o = results[orig][metric];
      const f = results[flat][metric];
      const d = pct(o, f);
      const marker = Number(d) < -5 ? ' ✓' : Number(d) > 5 ? ' ✗' : '  ';
      console.log(`  ${label} ${fmt(o).padStart(12)} ${fmt(f).padStart(12)} ${sign(d).padStart(8)}%${marker}`);
    }
  }

  // Also print standalone results if no pairs were found (custom scenarios)
  if (PAIRS.length === 0) {
    console.log(`\n${'─'.repeat(80)}`);
    console.log(`  Results  (median of ${RUNS} single-mount runs)`);
    console.log(`${'─'.repeat(80)}`);
    console.log(`  ${'Scenario'.padEnd(40)} ${'Layout'.padStart(10)} ${'Script'.padStart(10)} ${'Task'.padStart(10)}`);
    for (const [s, m] of Object.entries(results)) {
      console.log(
        `  ${s.padEnd(40)} ${fmt(m.layout).padStart(10)} ${fmt(m.script).padStart(10)} ${fmt(m.task).padStart(10)}`,
      );
    }
  }
})();
