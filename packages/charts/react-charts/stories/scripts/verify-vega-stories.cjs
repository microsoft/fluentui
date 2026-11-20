/*
 * Audit an ALREADY RUNNING real Storybook; never starts/builds a server or updates goldens.
 * Nx: yarn nx run-many --projects=react-charts-stories --targets=test-browser:vega
 * Forward --mode=stories, --mode=docs or --mode=all (default). --self-test is browser/network-free.
 * --filter=substring selects IDs/export names for iteration; discovery always verifies all 32 stories.
 * VEGA_STORYBOOK_URL defaults to http://localhost:6317.
 * VEGA_VISUAL_OUTPUT defaults to <stories>/test-results/vega-visual (gitignored).
 * Relative output overrides resolve against <stories>. Use a fresh output directory for each run.
 * Screenshots and facts are evidence for HUMAN visual review, not pixel-golden certification.
 */
/* eslint-disable no-console -- Standalone verification CLI deliberately reports assertion failures and artifact paths. */
/* eslint-disable import/no-extraneous-dependencies -- Node-only audit uses existing monorepo dev tools; none are bundled into stories or published runtime. */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createRequire, Module } = require('node:module');
const ts = require('typescript');
const { format: numberFormat } = require('d3-format');
const { utcFormat } = require('d3-time-format');
const { color: parseColor } = require('d3-color');
const { toId, storyNameFromExport } = require('storybook/internal/csf');

const storiesDirectory = path.resolve(__dirname, '..');
const title = 'Charts/VegaDeclarativeChart';
const timeout = 45000;
const evidenceTimeout = 5000;
const maxEventSamples = 20;
const maxConsoleText = 8000;
const viewport = { width: 1440, height: 1100 };
const pointSelector = '[role="option"][aria-label], [data-ranged-mark], [data-centered-point]';
const omissions = [
  'Screenshots require human visual analysis; targeted source-derived colors/geometry/order are regression contracts, NOT pixel goldens or an upstream Vega runtime oracle.',
  'Only values projected into real point ARIA are asserted. Unexposed columns are listed per view; expected tables in story chrome are NEVER actual results.',
  'Geometry checks cover normalized SVG boxes and targeted category centers/stack fractions, not rounded-end curvature or general axis scale fidelity.',
  'Legend text ranges are checked against capture bounds and every overflow ancestor. Captured tooltip surfaces include conservative computed shadow bounds, not pixel-exact paint or arbitrary CSS clip-path/mask certification.',
  'Desktop, light theme, en-US, UTC, one headless Chromium-family browser only; not cross-browser, mobile, forced-colors or screen-reader certification.',
  'Default captures its initially selected inline example, not every dropdown option or remote Show more gallery.',
  'Docs checks source availability and enabled addon actions, not compilation/execution in external sandboxes or the playground.',
];

// These are UI labels, not implementation selectors. Keep in sync intentionally when authoring controls changes.
const semanticControls = {
  AggregateAndWindowStatistics: {
    label: 'Include tied peers in the frame',
    summaries: ['Peer-aware frame:', 'Row-only frame:'],
    points: [
      ['Release: Atlas', 'Cumulative hours: 6'],
      ['Release: Atlas', 'Cumulative hours: 2'],
    ],
  },
  FilteredMultilineTooltips: {
    label: 'Show operational tooltips',
    summaries: ['Tooltips are enabled.', 'Tooltips are disabled.'],
    pointCounts: [4, 4],
  },
  RangedGroupedBars: {
    label: 'Place proposed scenario first',
    summaries: ['Current occupies', 'Proposed occupies'],
    pointCounts: [6, 6],
  },
  NormalizedStackOrder: {
    label: 'Stack self-service first',
    summaries: ['Assisted starts', 'Self-service starts'],
    pointCounts: [6, 6],
    points: [
      ['Month: April', 'Raw tickets: 30'],
      ['Month: April', 'Raw tickets: 30'],
    ],
  },
  CenteredArea: {
    label: 'Include Storage load',
    summaries: ['maximum weekly total is 32', 'maximum weekly total is 18'],
    pointCounts: [10, 5],
    points: [['Week: 1', 'Service: Search', 'Raw load (requests/s): 12']],
  },
  FacetMissingCells: {
    label: 'Include records with a missing region',
    summaries: ['six cells', 'four cells'],
    cells: [6, 4],
    emptyCells: [3, 2],
    plots: [3, 2],
  },
  RepeatMatrix: {
    label: 'Place throughput in the first row',
    summaries: ['Latency is the first row.', 'Throughput is the first row.'],
    cells: [4, 4],
    plots: [4, 4],
    pointCounts: [16, 16],
  },
  ManagedDataResource: { label: 'Enable offline resolver' },
};

function loadMetadata(filename) {
  // Two trusted, local metadata modules ONLY. No require hooks, ts-node, browser transpilation or adapter imports.
  const { outputText, diagnostics } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    fileName: filename,
    reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  assert(!diagnostics.some(diagnostic => diagnostic.category === ts.DiagnosticCategory.Error), filename);
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.require = createRequire(filename);
  loaded._compile(outputText, filename);
  return loaded.exports.specificationCorpus;
}

function metadata() {
  const normative = loadMetadata(
    path.resolve(storiesDirectory, '../library/src/components/VegaDeclarativeChart/testing/specs/manifest.ts'),
  );
  const fixtures = loadMetadata(
    path.join(storiesDirectory, 'src/VegaDeclarativeChart/VegaDeclarativeChartCorpus.fixtures.ts'),
  );
  assert.deepEqual(fixtures, normative, 'Story fixtures differ from independent normative manifest');
  assert.equal(normative.length, 23, 'Expected exactly 23 normative corpus fixtures');
  const entries = [
    { exportName: 'Default', kind: 'default' },
    ...Object.keys(semanticControls).map(exportName => ({ exportName, kind: 'semantic' })),
    ...normative.map(entry => ({
      exportName: `Corpus${entry.file
        .replace(/\.vl\.json$/, '')
        .split('-')
        .map(part => part[0].toUpperCase() + part.slice(1))
        .join('')}`,
      kind: 'corpus',
      expected: entry,
    })),
  ].map(entry => ({ ...entry, id: toId(title, storyNameFromExport(entry.exportName)) }));
  assert.equal(new Set(entries.map(entry => entry.id)).size, 32);
  return entries;
}

function verifyIndex(index, entries) {
  assert(index.entries && typeof index.entries === 'object', 'Actual /index.json has no entries');
  const actual = Object.values(index.entries).filter(entry => entry.title === title && entry.type === 'story');
  assert.deepEqual(
    actual.map(entry => entry.id).sort(),
    entries.map(entry => entry.id).sort(),
    'Actual index must contain Default + all eight semantic exports + all 23 corpus stems, and no extras',
  );
  const docs = Object.values(index.entries).filter(entry => entry.title === title && entry.type === 'docs');
  assert.equal(docs.length, 1, 'Expected one real Vega docs entry');
  return docs[0].id;
}

function knownReactKeyWarning(text) {
  return /Each child in a list should have a unique ["']?key["']? prop|Encountered two children with the same key/.test(
    text,
  );
}

function consoleCategory(event) {
  if (event.type === 'error') {
    let url;
    try {
      url = new URL(event.location.url);
    } catch {
      return 'consoleErrors';
    }
    return url.pathname === '/favicon.ico' &&
      /^Failed to load resource: the server responded with a status of 404 \(Not Found\)$/.test(event.text)
      ? 'infrastructureWarnings'
      : 'consoleErrors';
  }
  return knownReactKeyWarning(event.text) ? 'reactKeyWarnings' : undefined;
}

function eventRecorder(report) {
  const categories = ['pageErrors', 'consoleErrors', 'reactKeyWarnings', 'infrastructureWarnings', 'offlineRequests'];
  report.eventCounts = Object.fromEntries(categories.map(name => [name, 0]));
  report.omittedEventCounts = Object.fromEntries(categories.map(name => [name, 0]));
  const samples = Object.fromEntries(categories.map(name => [name, new Map()]));
  categories.forEach(name => (report[name] = []));
  return (name, event) => {
    report.eventCounts[name]++;
    const key = JSON.stringify(event);
    const previous = samples[name].get(key);
    if (previous) {
      previous.count++;
    } else if (report[name].length < maxEventSamples) {
      // Preserve complete pageerror stacks; bound console samples and deduplicate recurring render loops.
      const sample = { ...event, count: 1 };
      if (name !== 'pageErrors' && sample.text?.length > maxConsoleText) {
        sample.omittedTextCharacters = sample.text.length - maxConsoleText;
        sample.text = sample.text.slice(0, maxConsoleText);
      }
      samples[name].set(key, sample);
      report[name].push(sample);
    } else {
      report.omittedEventCounts[name]++;
    }
  };
}

async function attempt(report, name, operation) {
  try {
    return await operation();
  } catch (error) {
    report.failures.push({ check: name, message: error.stack || String(error) });
    console.error(`FAIL ${report.id}: ${name}: ${error.message}`);
    return undefined;
  }
}

function watchPage(page, report) {
  const record = eventRecorder(report);
  page.on('pageerror', error => record('pageErrors', { text: error.stack || error.message }));
  page.on('console', message => {
    const event = { text: message.text(), location: message.location(), type: message.type() };
    const category = consoleCategory(event);
    if (category) {
      record(category, event);
    }
  });
  page.on('request', request => {
    if (new URL(request.url()).hostname === 'fixtures.example.test') {
      record('offlineRequests', { url: request.url(), method: request.method() });
    }
  });
}

function finishPage(report) {
  for (const [name, errors] of Object.entries({
    pageErrors: report.pageErrors,
    consoleErrors: report.consoleErrors,
    offlineRequests: report.offlineRequests,
  })) {
    if (report.eventCounts[name]) {
      report.failures.push({
        check: name,
        message: `${report.eventCounts[name]} occurrence(s); ${errors.length} retained sample(s), ${
          report.omittedEventCounts[name]
        } omitted occurrence(s). First sample: ${JSON.stringify(errors[0]).slice(0, 2000)}`,
      });
    }
  }
}

async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise(resolve => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
  });
  // Fluent enter/focus animations can otherwise move a surface during measurement or Escape cleanup.
  await page.waitForFunction(
    () => document.getAnimations().every(animation => animation.playState !== 'running'),
    undefined,
    { timeout: evidenceTimeout },
  );
}

async function ready(page, root, plots) {
  await root.waitFor({ state: 'visible', timeout });
  const handle = await root.elementHandle();
  try {
    await page.waitForFunction(
      ({ element, expected }) => {
        if (element.querySelector('[role="alert"]:not([style*="opacity: 0"])')) {
          return true; // Collect and report the actual alert rather than masking it with a timeout.
        }
        const svgs = [...element.querySelectorAll('svg')].filter(
          svg =>
            svg.getAttribute('role') === 'region' || svg.querySelector('[data-ranged-mark], [data-centered-point]'),
        );
        return (
          (expected === undefined ? svgs.length > 0 : svgs.length === expected) &&
          svgs.every(svg =>
            [...svg.querySelectorAll('path, rect, circle, line')].some(mark => {
              if (mark.closest('defs')) {
                return false;
              }
              const bounds = mark.getBBox();
              return bounds.width > 0 && bounds.height > 0;
            }),
          )
        );
      },
      { element: handle, expected: plots },
      { timeout, polling: 'raf' },
    );
    await settle(page);
  } finally {
    await handle.dispose();
  }
}

// This function runs in the real page, scoped to chart DOM, never the displayed expected tables.
function collectFacts(root, selector) {
  const rect = element => {
    const { x, y, width, height } = element.getBoundingClientRect();
    return { x, y, width, height };
  };
  const attributes = element => Object.fromEntries([...element.attributes].map(attr => [attr.name, attr.value]));
  const visible = element => {
    for (let ancestor = element; ancestor; ancestor = ancestor.parentElement) {
      const style = getComputedStyle(ancestor);
      if (
        style.display === 'none' ||
        ['hidden', 'collapse'].includes(style.visibility) ||
        style.contentVisibility === 'hidden' ||
        Number(style.opacity) === 0
      ) {
        return false;
      }
    }
    return element.getBoundingClientRect().width > 0 && element.getBoundingClientRect().height > 0;
  };
  const name = element =>
    element.getAttribute('aria-label') ||
    (element.getAttribute('aria-labelledby') || '')
      .split(/\s+/)
      .map(id => element.ownerDocument.getElementById(id)?.textContent || '')
      .join(' ')
      .trim();
  const allSvgs = [...root.querySelectorAll('svg')];
  const plots = allSvgs.filter(
    svg => svg.getAttribute('role') === 'region' || svg.querySelector('[data-ranged-mark], [data-centered-point]'),
  );
  const invalidAttributes = [...root.querySelectorAll('*')].flatMap(element =>
    [...element.attributes]
      .filter(attr => /NaN|Infinity/.test(attr.value))
      .map(attr => ({ tag: element.tagName, attribute: attr.name, value: attr.value })),
  );
  const clipping = [];
  for (const element of [root, ...root.querySelectorAll('*')]) {
    if (
      element instanceof HTMLElement &&
      element.clientWidth > 2 &&
      visible(element) &&
      element.scrollWidth > element.clientWidth + 2
    ) {
      clipping.push({
        tag: element.tagName,
        className: element.className,
        scroll: element.scrollWidth,
        client: element.clientWidth,
      });
    }
  }
  const plotFacts = plots.map(svg => {
    const svgBounds = rect(svg);
    if (svgBounds.x < -2 || svgBounds.x + svgBounds.width > innerWidth + 2) {
      clipping.push({ kind: 'viewport', bounds: svgBounds });
    }
    const marks = [...svg.querySelectorAll('path, rect, circle, line, polygon, ellipse')]
      .filter(mark => !mark.closest('defs'))
      .map(mark => {
        const bounds = mark.getBBox();
        const clip = mark
          .closest('[clip-path]')
          ?.getAttribute('clip-path')
          ?.match(/#([^)'"\s]+)/)?.[1];
        const plot = clip && svg.querySelector(`[id="${clip}"] rect`);
        const plotWidth = plot && Number(plot.getAttribute('width'));
        const plotHeight = plot && Number(plot.getAttribute('height'));
        const computed = getComputedStyle(mark);
        return {
          tag: mark.tagName,
          attributes: attributes(mark),
          label: name(mark),
          bounds: [bounds.x, bounds.y, bounds.width, bounds.height],
          screen: rect(mark),
          fill: computed.fill,
          stroke: computed.stroke,
          opacity: computed.opacity,
          visible: visible(mark),
          effectiveOpacity: (() => {
            let opacity = 1;
            for (let ancestor = mark; ancestor; ancestor = ancestor.parentElement) {
              opacity *= Number(getComputedStyle(ancestor).opacity);
            }
            return opacity;
          })(),
          radius: mark.tagName.toLowerCase() === 'circle' ? parseFloat(computed.r || mark.getAttribute('r')) : null,
          plot: plot ? { width: plotWidth, height: plotHeight } : null,
          normalized200x100:
            plotWidth > 0 && plotHeight > 0
              ? [
                  (bounds.x / plotWidth) * 200,
                  (bounds.y / plotHeight) * 100,
                  (bounds.width / plotWidth) * 200,
                  (bounds.height / plotHeight) * 100,
                ]
              : null,
        };
      });
    for (const element of svg.querySelectorAll(`${selector}, text`)) {
      if (!visible(element) || element.closest('defs')) {
        continue;
      }
      const bounds = rect(element);
      if (bounds.x < svgBounds.x - 2 || bounds.x + bounds.width > svgBounds.x + svgBounds.width + 2) {
        clipping.push({ kind: 'svg-content', tag: element.tagName, text: element.textContent, bounds, svgBounds });
      }
    }
    return {
      attributes: attributes(svg),
      accessibleName: name(svg),
      description: svg.querySelector('desc')?.textContent,
      bounds: svgBounds,
      view: svg.closest('[data-vega-view]')?.getAttribute('data-vega-view') || null,
      marks,
      points: [...svg.querySelectorAll(selector)].map(point => ({
        tag: point.tagName,
        label: name(point),
        attributes: attributes(point),
        bounds: rect(point),
      })),
      text: [...svg.querySelectorAll('text')].map(text => ({
        text: text.textContent,
        attributes: attributes(text),
        screen: rect(text),
        visible: visible(text),
      })),
    };
  });
  return {
    root: { bounds: rect(root), accessibleName: name(root), attributes: attributes(root) },
    svgCount: allSvgs.length,
    ignoredLegendOrIconSvgCount: allSvgs.length - plots.length,
    plotCount: plots.length,
    plots: plotFacts,
    cells: [...root.querySelectorAll('[data-vega-view]')].map(cell => ({
      path: cell.getAttribute('data-vega-view'),
      title: cell.querySelector('h3')?.textContent,
      label: name(cell),
      empty: [...cell.querySelectorAll('p')].some(p => p.textContent.trim() === 'No data'),
    })),
    legends: [...root.querySelectorAll('[role="listbox"]')]
      .filter(legend => !legend.closest('svg'))
      .map(legend => ({
        label: name(legend),
        text: legend.textContent,
        html: legend.outerHTML,
        items: [...legend.querySelectorAll('[role="option"]')].map(item => ({
          label: name(item),
          text: item.textContent.trim(),
          selected: item.getAttribute('aria-selected'),
        })),
      })),
    labels: [...root.querySelectorAll('[aria-label], [aria-labelledby]')].map(element => ({
      tag: element.tagName,
      role: element.getAttribute('role'),
      label: name(element),
    })),
    alerts: [...root.querySelectorAll('[role="alert"]')].filter(visible).map(alert => alert.textContent || name(alert)),
    statuses: [...root.querySelectorAll('[role="status"]')].map(status => status.textContent),
    controls: [...root.querySelectorAll('[role="switch"]')].map(control => ({
      label: name(control),
      checked: control.checked ?? control.getAttribute('aria-checked'),
      disabled: control.disabled ?? control.getAttribute('aria-disabled'),
    })),
    invalidAttributes,
    horizontalClipping: clipping,
    privateValueExposed: root.innerHTML.includes('PRIVATE_CORPUS_VALUE'),
  };
}

// Browser-side paint evidence. Range fragments measure the rendered text, including wrapped lines;
// a nonzero button/tooltip getBoundingClientRect alone does not establish that its text is visible.
function collectPaintBounds(element) {
  const document = element.ownerDocument;
  const view = document.defaultView;
  const rect = node => {
    const { left, top, right, bottom, width, height } = node.getBoundingClientRect();
    return { left, top, right, bottom, width, height };
  };
  const ancestors = node => {
    const result = [];
    for (let ancestor = node; ancestor; ancestor = ancestor.parentElement) {
      const style = view.getComputedStyle(ancestor);
      const bounds = rect(ancestor);
      const scaleX = ancestor.offsetWidth ? bounds.width / ancestor.offsetWidth : 1;
      const scaleY = ancestor.offsetHeight ? bounds.height / ancestor.offsetHeight : 1;
      result.push({
        tag: ancestor.tagName,
        className: ancestor.getAttribute('class'),
        hidden:
          style.display === 'none' ||
          ['hidden', 'collapse'].includes(style.visibility) ||
          style.contentVisibility === 'hidden' ||
          Number(style.opacity) === 0,
        overflowX: style.overflowX,
        overflowY: style.overflowY,
        // Overflow clips at the client/padding box, not the outer border or scrollable content size.
        bounds: {
          left: bounds.left + ancestor.clientLeft * scaleX,
          top: bounds.top + ancestor.clientTop * scaleY,
          right: bounds.left + (ancestor.clientLeft + ancestor.clientWidth) * scaleX,
          bottom: bounds.top + (ancestor.clientTop + ancestor.clientHeight) * scaleY,
        },
      });
    }
    return result;
  };
  const walker = document.createTreeWalker(element, view.NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  const text = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!node.textContent.trim() || node.parentElement.closest('script, style')) {
      continue;
    }
    range.selectNodeContents(node);
    text.push({
      text: node.textContent,
      fragments: [...range.getClientRects()].map(({ left, top, right, bottom, width, height }) => ({
        left,
        top,
        right,
        bottom,
        width,
        height,
      })),
      ancestors: ancestors(node.parentElement),
    });
  }
  const surfaceStyle = view.getComputedStyle(element);
  return {
    bounds: rect(element),
    ancestors: ancestors(element.parentElement),
    text,
    filter: surfaceStyle.filter,
    boxShadow: surfaceStyle.boxShadow,
    viewport: { left: 0, top: 0, right: view.innerWidth, bottom: view.innerHeight },
  };
}

function assertContained(bounds, container, context, x = true, y = true) {
  assert(
    (!x || (bounds.left >= container.left - 1 && bounds.right <= container.right + 1)) &&
      (!y || (bounds.top >= container.top - 1 && bounds.bottom <= container.bottom + 1)),
    `${context}: ${JSON.stringify(bounds)} outside ${JSON.stringify(container)}`,
  );
}

function assertOverflowBounds(bounds, ancestors, context) {
  for (const ancestor of ancestors) {
    assert(!ancestor.hidden, `${context}: hidden by ${ancestor.tag}`);
    assertContained(
      bounds,
      ancestor.bounds,
      `${context}: overflow ancestor ${ancestor.tag} ${ancestor.className || ''}`,
      /^(auto|scroll|hidden|clip)$/.test(ancestor.overflowX),
      /^(auto|scroll|hidden|clip)$/.test(ancestor.overflowY),
    );
  }
}

function assertPaintText(facts, context, capture) {
  assert(facts.text.length, `${context}: no rendered text nodes`);
  for (const text of facts.text) {
    const fragments = text.fragments.filter(fragment => fragment.width > 0 && fragment.height > 0);
    assert(fragments.length, `${context}: no visible text range for ${JSON.stringify(text.text)}`);
    for (const fragment of fragments) {
      assertOverflowBounds(fragment, text.ancestors, `${context}: ${JSON.stringify(text.text)}`);
      if (capture) {
        assertContained(fragment, capture, `${context}: text outside capture`);
      }
    }
  }
}

async function gatherFacts(chart) {
  const facts = await chart.evaluate(collectFacts, pointSelector, { timeout: evidenceTimeout });
  facts.visibleHeadings = await chart.locator('h1,h2,h3').evaluateAll(elements =>
    elements
      .filter(element => {
        const bounds = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return bounds.width > 0 && bounds.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
      })
      .map(element => element.textContent.trim()),
  );
  facts.legends ||= [];
  facts.legendPaint = [];
  if (facts.legends?.length) {
    // Exclude the SVG plot's own listbox/option semantics, without excluding portal tooltips elsewhere.
    for (const item of await chart.locator('[role="listbox"] [role="option"]:not(svg *)').all()) {
      facts.legendPaint.push(await item.evaluate(collectPaintBounds));
    }
  }
  return facts;
}

function assertHealthy(facts, allowAlert = false) {
  assert.deepEqual(facts.invalidAttributes, [], 'NaN/Infinity in actual chart attributes');
  assert.deepEqual(facts.horizontalClipping, [], 'Horizontal scrolling/clipping at desktop size');
  assert(!facts.privateValueExposed, 'Private corpus value leaked into chart DOM');
  if (!allowAlert) {
    assert.deepEqual(facts.alerts, [], 'Chart rendered an error alert');
  }
  if (facts.legendPaint) {
    assert.equal(
      facts.legendPaint.length,
      facts.legends.reduce((count, legend) => count + legend.items.length, 0),
      'Every legend option needs rendered text/overflow evidence',
    );
    for (const legend of facts.legendPaint) {
      const bounds = facts.root.bounds;
      assertPaintText(legend, 'Legend', {
        left: bounds.x,
        top: bounds.y,
        right: bounds.x + bounds.width,
        bottom: bounds.y + bounds.height,
      });
    }
  }
  facts.plots.forEach(plot => {
    assert(plot.bounds.width > 0 && plot.bounds.height > 0, 'Zero-sized plot SVG');
    assert(plot.accessibleName, 'Plot SVG has no accessible name');
    assert(plot.points.length, 'Plot SVG has no accessible data marks');
    plot.points.forEach(point => assert(point.label, 'Data mark has no accessible label'));
  });
}

function assertGeometry(actual, expected) {
  assert.equal(actual.length, expected.length, 'Ranged mark count');
  actual.forEach((rectangle, index) => {
    assert(rectangle && rectangle.length === 4, 'Missing SVG clip viewport for normalization');
    rectangle.forEach((value, axis) =>
      assert(
        Number.isFinite(value) && Math.abs(value - expected[index][axis]) < 0.1,
        `Normalized rectangle ${index}, coordinate ${axis}: ${value} != ${expected[index][axis]}`,
      ),
    );
  });
}

// Independent, hand-worked visible contracts. NEVER populate these from browser captures,
// transformed adapter output, snapshots, or the expected-value tables in story chrome.
// Sources: original bin-transform.vl.json / normalized-bar-order.vl.json and the authored
// Default/Semantics story specs. Palette literals below are the documented light-theme
// DataVizPalette color1/3/4 values (utilities/colors.ts), not adapter-generated expectations.
const visibleContracts = {
  bin: {
    // [-4,-.1], [0,3.9], [4,8] => counts 2,2,2 (maximum is included in final bin).
    // x domain [-4,8], y domain [0,4], 200x100 plot => width 200/3, y=50, height=50, baseline=0.
    rectangles: Array.from({ length: 3 }, (_, index) => [(index * 200) / 3, 50, 200 / 3, 50]),
    plot: { width: 200, height: 100 },
  },
  linePoints: { AggregateAndWindowStatistics: 8, FilteredMultilineTooltips: 4, ManagedDataResource: 4 },
  strokes: { FacetMissingCells: '#2aa0a4', RepeatMatrix: '#9373c0' },
  months: ['April', 'May', 'June'],
  monthlyLegends: ['Self-service', 'Assisted'],
  corpusLegends: ['First', 'Second', 'Absent'],
  defaultColors: [
    // Authored ctr domain min=2.4, max=4.5; blues stops at t=0,.25,.5,.75,1:
    // #deebf7, #9ecae1, #4292c6, #2171b5, #084594 (local palette contract, NOT upstream scheme fidelity).
    // Hand RGB interpolation: p=4*(ctr-2.4)/2.1, then round each channel between adjacent stops.
    ['Summer Sale', '#d2e5f3'], // ctr=2.5, p=4/21
    ['Back to School', '#3f8fc4'], // ctr=3.5, p=44/21
    ['Holiday Special', '#91c2dd'], // ctr=3.0, p=8/7
    ['Flash Deal', '#206fb3'], // ctr=4.0, p=64/21
    ['Spring Collection', '#3f8fc4'],
    ['Clearance', '#deebf7'], // min: exact first palette endpoint
    ['Black Friday', '#084594'], // max: exact last palette endpoint
  ],
};

function dataMarks(facts) {
  return facts.plots.flatMap(plot =>
    plot.marks.filter(
      mark =>
        (mark.attributes.role === 'option' && mark.attributes['aria-label']) ||
        'data-ranged-mark' in mark.attributes ||
        'data-centered-point' in mark.attributes,
    ),
  );
}

function assertStroke(mark, expected) {
  assert.equal(parseColor(mark.stroke)?.formatHex(), expected, `Actual rendered stroke for ${mark.label}`);
  assert(mark.visible && mark.effectiveOpacity > 0, `Colored mark is not visible: ${mark.label}`);
}

function assertLegendOrder(facts, expected) {
  assert.equal(facts.legends.length, 1, 'Expected one ordered color-domain legend');
  assert.deepEqual(
    facts.legends[0].items.map(item => item.label),
    expected,
    'Authored color-domain legend order, including absent entries, must stay stable',
  );
}

function assertCategoryCenters(facts, expected, field) {
  const plot = facts.plots[0];
  const centers = expected.map(category => {
    const ticks = plot.text.filter(text => text.text === category);
    assert.equal(ticks.length, 1, `Exactly one actual x-axis tick for ${category}`);
    assert(ticks[0].visible, `Hidden category tick ${category}`);
    const center = ticks[0].screen.x + ticks[0].screen.width / 2;
    assert(Number.isFinite(center), `Non-numeric category center ${category}`);
    if (field) {
      const marks = dataMarks(facts).filter(mark => mark.label.split('; ').includes(`${field}: ${category}`));
      assert.equal(marks.length, 2, `${category}: both actual stack segments`);
      for (const mark of marks) {
        assert(Math.abs(mark.screen.x + mark.screen.width / 2 - center) < 2, `${category}: mark/tick x alignment`);
      }
    }
    return center;
  });
  centers
    .slice(1)
    .forEach((center, index) =>
      assert(center > centers[index] + 1, `Actual numeric x centers must order ${expected.join(', ')}: ${centers}`),
    );
}

function assertVisibleOutcomes(facts, entry, state = 'initial') {
  const marks = dataMarks(facts);
  const name = entry.exportName;
  if (entry.expected?.file === 'bin-transform.vl.json') {
    const bars = marks.filter(mark => 'data-ranged-mark' in mark.attributes);
    assert.equal(bars.length, 3, 'Exactly three real binned bars, not a strip or phantom bins');
    bars.forEach(mark => {
      assert.deepEqual(mark.plot, visibleContracts.bin.plot, 'Authored 272x172 minus 72px framing = 200x100 plot');
      assert(mark.visible, 'Binned rectangle must be visible');
    });
    assertGeometry(
      bars.map(mark => mark.normalized200x100),
      visibleContracts.bin.rectangles,
    );
    assertGeometry(
      bars.map(mark => mark.bounds),
      visibleContracts.bin.rectangles,
    );
  }
  const pointCount = visibleContracts.linePoints[name];
  if (pointCount && facts.plotCount > 0) {
    const lineMarks = dataMarks({ plots: [facts.plots[0]] }); // Aggregate's lower view is an unrelated window bar.
    // Counts come from 2 series x 4 months, 4 non-null readings, and 4 authored offline CSV rows.
    assert.equal(lineMarks.length, pointCount, 'Authored line point:true data mark count');
    lineMarks.forEach(mark => {
      assert.equal(mark.tag.toLowerCase(), 'circle', 'point:true must paint a circle, not an invisible hit path');
      assert(mark.radius > 0 && mark.visible, 'point:true circle needs r>0 and visible geometry');
      assert.equal(Number(mark.opacity), 1, 'point:true circle opacity');
      assert.equal(mark.effectiveOpacity, 1, 'point:true circle/ancestor effective opacity');
    });
  }
  if (visibleContracts.strokes[name]) {
    const expectedCount = name === 'RepeatMatrix' ? 16 : state === 'toggled' ? 4 : 5;
    assert.equal(marks.length, expectedCount, 'Authored static-color scatter point count');
    marks.forEach(mark => assertStroke(mark, visibleContracts.strokes[name]));
  }
  if (name === 'Default') {
    assert(
      facts.visibleHeadings.includes('Ad Performance - CTR Analysis'),
      'Authored Default chart title must be visibly rendered, not only an SVG accessible name',
    );
    assert.equal(facts.legends.length, 0, 'Initial Default scatter explicitly suppresses its color legend');
    assert.equal(marks.length, 7, 'Seven authored campaigns');
    for (const [campaign, expected] of visibleContracts.defaultColors) {
      const matches = marks.filter(mark => mark.label.split('; ').includes(`campaign: ${campaign}`));
      assert.equal(matches.length, 1, `One actual campaign point: ${campaign}`);
      assertStroke(matches[0], expected);
    }
  }
  if (name === 'NormalizedStackOrder') {
    assertCategoryCenters(facts, visibleContracts.months, 'Month');
    assertLegendOrder(facts, visibleContracts.monthlyLegends);
    for (const [index, month] of visibleContracts.months.entries()) {
      const segments = marks.filter(mark => mark.label.split('; ').includes(`Month: ${month}`));
      const baselineChannel = state === 'toggled' ? 'Self-service' : 'Assisted';
      const bottom = Math.max(...segments.map(mark => mark.bounds[1] + mark.bounds[3]));
      const top = Math.min(...segments.map(mark => mark.bounds[1]));
      const baseline = segments.find(mark => mark.label.split('; ').includes(`Channel: ${baselineChannel}`));
      assert(Math.abs(baseline.bounds[1] + baseline.bounds[3] - bottom) < 0.1, `${month}: ${baselineChannel} baseline`);
      for (const segment of segments) {
        const selfService = segment.label.split('; ').includes('Channel: Self-service');
        const share = index === 1 ? 0.6 : 0.75; // 45/75 in May; 30/40 and 60/80 otherwise.
        assert(
          Math.abs(segment.bounds[3] / (bottom - top) - (selfService ? share : 1 - share)) < 0.01,
          `${month}: normalized segment must retain hand-calculated share`,
        );
      }
    }
  }
  if (entry.expected?.file === 'normalized-bar-order.vl.json') {
    assertCategoryCenters(facts, ['A', 'B']);
    assertLegendOrder(facts, visibleContracts.corpusLegends);
  }
}

function unitSpecs(spec, inheritedEncoding = {}) {
  const encoding = { ...inheritedEncoding, ...spec.encoding };
  const children = spec.concat || spec.hconcat || spec.vconcat;
  if (children) {
    return children.flatMap(child => unitSpecs(child, encoding));
  }
  if (spec.repeat) {
    const rows = spec.repeat.row || [null];
    const columns = spec.repeat.column || [null];
    const bind = (value, bindings) => {
      if (Array.isArray(value)) {
        return value.map(child => bind(child, bindings));
      }
      if (value && typeof value === 'object') {
        return typeof value.repeat === 'string'
          ? bindings[value.repeat]
          : Object.fromEntries(Object.entries(value).map(([key, child]) => [key, bind(child, bindings)]));
      }
      return value;
    };
    return rows.flatMap(row => columns.flatMap(column => unitSpecs(bind(spec.spec, { row, column }), encoding)));
  }
  if (spec.facet) {
    return [{ ...spec.spec, encoding: { ...encoding, ...spec.spec.encoding } }];
  }
  return [{ ...spec, encoding }];
}

function fieldTitle(definition) {
  if (definition.title !== undefined) {
    return definition.title;
  }
  if (definition.aggregate === 'count') {
    return 'Count of Records';
  }
  if (typeof definition.aggregate === 'string') {
    return `${definition.aggregate[0].toUpperCase()}${definition.aggregate.slice(1)} of ${definition.field || ''}`;
  }
  return definition.field || '';
}

function displayValue(value, definition) {
  if (value === null) {
    return 'null';
  }
  if (definition.type === 'temporal') {
    return utcFormat(definition.format || '%b %d, %Y')(new Date(value));
  }
  return definition.type === 'quantitative' || (typeof value === 'number' && definition.format)
    ? numberFormat(definition.format || '')(value)
    : String(value);
}

function projection(table, spec) {
  const encoding = spec.encoding;
  // Plain numeric native line/scatter defaults expose coordinates, NOT authored field labels.
  // Opt in from the independent specification, never from an observed label or a failed assertion.
  const nativeDefault =
    ['line', 'point', 'circle', 'square'].includes(typeof spec.mark === 'string' ? spec.mark : spec.mark?.type) &&
    Object.keys(encoding).every(channel => channel === 'x' || channel === 'y') &&
    ['x', 'y'].every(channel => encoding[channel]?.type === 'quantitative' && encoding[channel].tooltip !== false);
  const definitions = Array.isArray(encoding.tooltip)
    ? encoding.tooltip.map((definition, tooltip) => ({ definition, tooltip }))
    : ['x', 'y', 'color', 'size', 'x2', 'y2']
        .filter(channel => encoding[channel]?.field !== undefined)
        .map(channel => ({ definition: encoding[channel], channel }));
  const used = new Set();
  const checks = definitions.flatMap(({ definition, tooltip, channel }) => {
    if (definition.tooltip === false || definition.filter || typeof definition.field === 'object') {
      return []; // Filtered tooltip fixtures have independent exact labels checked separately.
    }
    const channelIndex = channel === undefined ? -1 : table.columns.findIndex(column => column.channel === channel);
    const index =
      channelIndex >= 0
        ? channelIndex
        : table.columns.findIndex(column => {
            if (tooltip !== undefined && column.tooltip === tooltip) {
              return true;
            }
            if (column.field !== undefined) {
              return column.field === definition.field;
            }
            const bound = encoding[column.channel];
            return (
              (channel !== undefined && column.channel === channel) ||
              (bound &&
                bound.field === definition.field &&
                JSON.stringify(bound.aggregate) === JSON.stringify(definition.aggregate) &&
                JSON.stringify(bound.timeUnit) === JSON.stringify(definition.timeUnit))
            );
          });
    if (index < 0) {
      return [];
    }
    used.add(index);
    return [{ index, definition, channel }];
  });
  if (nativeDefault) {
    assert.deepEqual(
      checks.map(check => check.channel),
      ['x', 'y'],
      'Native defaults must compare BOTH coordinates',
    );
  }
  return {
    checks,
    labelFormat: nativeDefault ? 'native-default-xy' : 'semantic',
    unexposedColumns: table.columns.filter((_, index) => !used.has(index)),
    expectedRows: table.rows.map(row =>
      checks.map(({ index, definition, channel }) => {
        if (nativeDefault) {
          assert.equal(typeof row[index], 'number', 'Native coordinate oracle requires independently expected numbers');
          assert(Number.isFinite(row[index]), 'Native coordinate oracle requires finite numbers');
          return `${channel}: ${row[index]}`;
        }
        return `${fieldTitle(definition)}: ${displayValue(row[index], definition)}`;
      }),
    ),
  };
}

function matchRows(labels, expectedRows, labelFormat = 'semantic') {
  const available = labels.map(label => {
    if (labelFormat === 'native-default-xy') {
      // Exact native default grammar: `${x}. default, ${y}.` No substring/numeric-token matching.
      const match =
        /^(-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)\. default, (-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)\.$/i.exec(
          label,
        );
      assert(match, `Unexpected native default point ARIA: ${JSON.stringify(label)}`);
      return [`x: ${match[1]}`, `y: ${match[2]}`];
    }
    return label.split('; ');
  });
  expectedRows.forEach((row, index) => {
    assert(row.length, `Expected row ${index} has no independently checkable public projection`);
    const found = available.findIndex(parts => row.every(part => parts.includes(part)));
    assert(
      found >= 0,
      `No distinct actual point ARIA for expected row ${index}: ${JSON.stringify(row)}; actual=${JSON.stringify(
        available,
      )}`,
    );
    available.splice(found, 1);
  });
}

function assertCorpus(facts, entry, report) {
  assert.equal(facts.plotCount, entry.publicSvgCount, 'publicSvgCount (legend SVGs excluded)');
  assert.equal(facts.cells.length, entry.composed ? entry.expectedTables.length : 0, 'Composed cell count');
  assert.equal(
    facts.cells.filter(cell => cell.empty).length,
    entry.expectedTables.filter(table => !table.rows.length).length,
    'Empty facet cell count',
  );
  const specs = unitSpecs(entry.spec);
  let plotIndex = 0;
  report.rowComparisons = entry.expectedTables.map((table, tableIndex) => {
    if (!table.rows.length) {
      assert.equal(facts.cells[tableIndex].title, table.title, 'Empty facet title');
      return { tableIndex, empty: true };
    }
    const plot = facts.plots[plotIndex++];
    if (table.title) {
      assert.equal(facts.cells[tableIndex].title, table.title, 'Facet title/order');
    }
    const projected = projection(table, specs[tableIndex] || specs[0]);
    const labels = plot.points.map(point => point.label);
    if (entry.tooltipLabels) {
      assert.deepEqual(
        labels.slice().sort(),
        entry.tooltipLabels.slice().sort(),
        'Exact point tooltip/ARIA projection',
      );
    } else {
      assert.equal(labels.length, table.rows.length, 'Rendered point count versus independent expected rows');
      matchRows(labels, projected.expectedRows, projected.labelFormat);
    }
    return { tableIndex, expected: table, actualLabels: labels, ...projected };
  });
  if (entry.geometry) {
    assertGeometry(
      facts.plots.flatMap(plot =>
        plot.marks.filter(mark => 'data-ranged-mark' in mark.attributes).map(mark => mark.normalized200x100),
      ),
      entry.geometry.rectangles,
    );
  }
}

function shadowBounds(facts) {
  const bounds = { ...facts.bounds };
  const lengths = shadow => [...shadow.matchAll(/-?(?:\d*\.)?\d+px\b/g)].map(match => Number.parseFloat(match[0]));
  const expand = (original, shadow) => {
    const [x, y, blur = 0, spread = 0] = lengths(shadow);
    assert(Number.isFinite(x) && Number.isFinite(y) && blur >= 0, `Unrecognized computed shadow: ${shadow}`);
    // Conservative 2*blur envelope: CSS shadows have soft tails, not a pixel-exact paint boundary.
    const extent = Math.max(0, blur * 2 + spread);
    return {
      left: Math.min(original.left, original.left + x - extent),
      right: Math.max(original.right, original.right + x + extent),
      top: Math.min(original.top, original.top + y - extent),
      bottom: Math.max(original.bottom, original.bottom + y + extent),
    };
  };
  if (facts.boxShadow && facts.boxShadow !== 'none') {
    for (const shadow of facts.boxShadow.split(/,(?![^(]*\))/).filter(value => !value.includes('inset'))) {
      const ink = expand(facts.bounds, shadow);
      bounds.left = Math.min(bounds.left, ink.left);
      bounds.right = Math.max(bounds.right, ink.right);
      bounds.top = Math.min(bounds.top, ink.top);
      bounds.bottom = Math.max(bounds.bottom, ink.bottom);
    }
  }
  if (facts.filter && facts.filter !== 'none') {
    // Filter drop-shadows compose sequentially, unlike independent box shadows.
    const drops = [...facts.filter.matchAll(/drop-shadow\(((?:[^()]|\([^()]*\))*)\)/g)];
    assert(
      drops.length && facts.filter.replace(/drop-shadow\(((?:[^()]|\([^()]*\))*)\)/g, '').trim() === '',
      `Unsupported tooltip filter needs manual review: ${facts.filter}`,
    );
    for (const drop of drops) {
      Object.assign(bounds, expand(bounds, drop[1]));
    }
  }
  bounds.width = bounds.right - bounds.left;
  bounds.height = bounds.bottom - bounds.top;
  return bounds;
}

function assertTooltipPaint(facts) {
  assertPaintText(facts, 'Tooltip');
  assert(
    (facts.filter && facts.filter !== 'none') || (facts.boxShadow && facts.boxShadow !== 'none'),
    'Tooltip surface shadow must not be disabled to avoid clipping',
  );
  const ink = shadowBounds(facts);
  assertContained(ink, facts.viewport, 'Tooltip surface/shadow outside viewport');
  assertOverflowBounds(ink, facts.ancestors, 'Tooltip surface/shadow');
  for (const text of facts.text) {
    for (const fragment of text.fragments.filter(value => value.width > 0 && value.height > 0)) {
      assertContained(fragment, facts.viewport, 'Tooltip text outside viewport');
    }
  }
  return ink;
}

async function tooltipChecks(page, chart, labels, report, output, phase = 'tooltip') {
  report.tooltipInteractions ||= [];
  await page.keyboard.press('Tab'); // Activate real Tabster navigation before specific SVG focus.
  await settle(page);
  for (let index = 0; index < labels.length; index++) {
    for (const interaction of ['hover', 'focus']) {
      await attempt(report, `${phase} ${index} ${interaction}`, async () => {
        const label = labels[index];
        // JSON string escaping is NOT CSS escaping (notably for the authored newlines).
        const marks = chart.locator('svg').locator(pointSelector);
        const markIndex = await marks.evaluateAll(
          (elements, expected) => elements.findIndex(element => element.getAttribute('aria-label') === expected),
          label,
        );
        assert(markIndex >= 0, `No actual mark with exact ARIA ${JSON.stringify(label)}`);
        const mark = marks.nth(markIndex);
        await mark.scrollIntoViewIfNeeded();
        await page.mouse.move(0, 0);
        await page.evaluate(() => document.activeElement?.blur());
        if (interaction === 'hover') {
          await mark.hover();
        } else {
          await mark.focus();
        }
        if (await mark.getAttribute('data-centered-point')) {
          assert(
            await mark.evaluate(element => !element.closest('[clip-path]')),
            'Centered endpoint focus indicators must extend into the SVG gutter without plot clipping',
          );
        }
        const tooltips = page.getByRole('tooltip');
        await page.waitForFunction(
          expected =>
            [...document.querySelectorAll('[role="tooltip"]')].some(
              element => element.getAttribute('aria-label') === expected && element.getBoundingClientRect().width > 0,
            ),
          label,
          { timeout },
        );
        const tooltipIndex = await tooltips.evaluateAll(
          (elements, expected) => elements.findIndex(element => element.getAttribute('aria-label') === expected),
          label,
        );
        assert(tooltipIndex >= 0, 'No tooltip with the exact authored multiline label');
        const tooltip = tooltips.nth(tooltipIndex);
        await tooltip.waitFor({ state: 'visible', timeout });
        assert.equal(await tooltip.getAttribute('aria-label'), label, 'Exact visible tooltip label');
        const text = await tooltip.textContent();
        assert(text && !text.includes('PRIVATE_CORPUS_VALUE'), 'Tooltip text missing or leaks private data');
        for (const pair of label.split('; ')) {
          const value = pair.slice(pair.indexOf(': ') + 2);
          assert(text.includes(value), `Visible tooltip is missing ${JSON.stringify(value)}`);
        }
        await settle(page);
        const surfaces = [];
        // Query the full page: native and shell popovers are portaled outside the chart capture root.
        for (const surface of await page.locator('.fui-PopoverSurface').all()) {
          if (await surface.isVisible()) {
            const facts = await surface.evaluate(collectPaintBounds);
            surfaces.push(facts);
          }
        }
        assert(surfaces.length, 'Expected a visible native/shell PopoverSurface for the captured tooltip');
        const filename = `${report.id}--${phase}-${index}-${interaction}.png`;
        await page.screenshot({ path: path.join(output, filename) });
        report.tooltipInteractions.push({ phase, index, interaction, label, text, surfaces, screenshot: filename });
        for (const facts of surfaces) {
          facts.shadowBounds = assertTooltipPaint(facts);
        }
        await page.mouse.move(0, 0);
        await mark.evaluate(element => element.blur());
        await tooltip.waitFor({ state: 'hidden', timeout });
      });
    }
  }
}

async function rightmostTooltipChecks(page, chart, entry, report, output) {
  // Extend the existing multiline captures with the rightmost marks from the two shell routes
  // and a semantic native line. No new expected tooltip text is learned from the renderer.
  const prefixes = {
    RangedGroupedBars: ['Region: West', 'Scenario: Proposed', 'Team: Platform', 'Start (ms): 9', 'End (ms): 24'],
    CenteredArea: ['Week: 5', 'Service: Storage', 'Raw load (requests/s): 10'],
    FilteredMultilineTooltips: [
      'Day: 5',
      'Requests: 24',
      'Operational note: Traffic recovered\nNo intervention needed',
    ],
  };
  if (!prefixes[entry.exportName] && !entry.expected?.tooltipLabels) {
    return;
  }
  const candidates = await chart
    .locator('svg')
    .locator(pointSelector)
    .evaluateAll(elements =>
      elements.map(element => ({
        label: element.getAttribute('aria-label'),
        right: element.getBoundingClientRect().right,
      })),
    );
  assert(candidates.length, 'Rightmost tooltip requires real chart points');
  const right = Math.max(...candidates.map(point => point.right));
  const rightmost = candidates.filter(point => Math.abs(point.right - right) < 1);
  const expected = prefixes[entry.exportName];
  if (expected) {
    const point = rightmost.find(candidate => expected.every(pair => candidate.label.split('; ').includes(pair)));
    assert(point, `Rightmost actual mark must match independently authored tooltip ${JSON.stringify(expected)}`);
    await tooltipChecks(page, chart, [expected.join('; ')], report, output, 'rightmost-tooltip');
  } else {
    const label = entry.expected.tooltipLabels.find(expectedLabel =>
      rightmost.some(point => point.label === expectedLabel),
    );
    assert(label, 'Rightmost corpus tooltip must match an independent normative label');
    await tooltipChecks(page, chart, [label], report, output, 'rightmost-tooltip');
  }
}

async function failureEvidence(page, report, result, output) {
  result.pageText = await attempt(report, `${result.state}: full page error text`, () =>
    page.locator('body').innerText({ timeout: evidenceTimeout }),
  );
  await attempt(report, `${result.state}: full page failure screenshot`, async () => {
    const filename = `${report.id}--${result.state}--full-page.png`;
    await page.screenshot({
      path: path.join(output, filename),
      fullPage: true,
      animations: 'disabled',
      timeout: evidenceTimeout,
    });
    result.failureScreenshot = filename;
  });
}

async function snapshot(page, root, chart, report, state, output, options = {}) {
  const result = { state, expectedPlots: options.plots };
  report.states.push(result);
  result.ready = Boolean(
    await attempt(report, `${state}: ready`, async () => {
      await ready(page, root, options.plots);
      return true;
    }),
  );
  if (!result.ready) {
    report.abortedAt = `${state}: ready`;
    // A surviving but stale chart is useful evidence (e.g. rejected resolver still showing success data).
    // isVisible does not wait for a missing root; never incur another readiness timeout here.
    if (await root.isVisible()) {
      result.facts = await attempt(report, `${state}: failure DOM facts`, () => gatherFacts(chart));
    }
    await failureEvidence(page, report, result, output);
    return result;
  }
  result.facts = await attempt(report, `${state}: collect DOM facts`, () => gatherFacts(chart));
  if (result.facts) {
    await attempt(report, `${state}: healthy DOM`, () => assertHealthy(result.facts, options.allowAlert));
  }
  const captured = await attempt(report, `${state}: screenshot`, async () => {
    const filename = `${report.id}${state === 'initial' ? '' : `--${state}`}.png`;
    await root.screenshot({ path: path.join(output, filename), animations: 'disabled', timeout: evidenceTimeout });
    result.screenshot = filename;
    return true;
  });
  if (!captured || !result.facts) {
    if (!result.facts) {
      report.abortedAt = `${state}: collect DOM facts`;
    }
    await failureEvidence(page, report, result, output);
  }
  return result;
}

function assertSemantic(facts, control, index) {
  for (const [key, actual] of Object.entries({
    plots: facts.plotCount,
    cells: facts.cells.length,
    emptyCells: facts.cells.filter(cell => cell.empty).length,
    pointCounts: facts.plots.reduce((sum, plot) => sum + plot.points.length, 0),
  })) {
    if (control[key]) {
      assert.equal(actual, control[key][index], `Semantic ${key}`);
    }
  }
  const expected = control.points?.[index] || control.points?.[0];
  if (expected) {
    matchRows(
      facts.plots.flatMap(plot => plot.points.map(point => point.label)),
      [expected],
    );
  }
}

function graphSignature(facts) {
  return facts.plots.map(plot => ({
    points: plot.points.map(point => point.label),
    text: plot.text.map(text => text.text),
    geometry: plot.marks.map(mark => ({
      bounds: mark.bounds,
      d: mark.attributes.d,
      fill: mark.fill,
      stroke: mark.stroke,
    })),
  }));
}

async function semanticStates(page, root, report, entry, initial, output) {
  const control = semanticControls[entry.exportName];
  if (entry.exportName === 'ManagedDataResource') {
    const resolver = root.getByRole('switch', { name: control.label, exact: true });
    const failure = root.getByRole('switch', { name: 'Simulate host failure', exact: true });
    report.controlTransitions = [];
    for (const state of [
      { name: 'resolver-disabled', enabled: false, rejected: false, plots: 0 },
      { name: 'resolver-enabled', enabled: true, rejected: false, plots: 1 },
      { name: 'host-failure', enabled: true, rejected: true, plots: 0 },
      { name: 'recovered', enabled: true, rejected: false, plots: 1 },
    ]) {
      await attempt(report, `${state.name}: controls`, async () => {
        if ((await resolver.isChecked()) !== state.enabled) {
          await resolver.click();
        }
        if (state.enabled && (await failure.isChecked()) !== state.rejected) {
          await failure.click();
        }
        const actual = {
          state: state.name,
          resolverEnabled: await resolver.isChecked(),
          simulateFailure: await failure.isChecked(),
          failureDisabled: await failure.isDisabled(),
          status: await root.locator('p[role="status"]').textContent(),
        };
        report.controlTransitions.push(actual);
        assert.equal(actual.resolverEnabled, state.enabled, 'Resolver switch did not reach requested state');
        assert.equal(actual.simulateFailure, state.rejected, 'Failure switch did not reach requested state');
        assert.equal(actual.failureDisabled, !state.enabled, 'Failure switch disabled state');
        assert(
          actual.status.includes(
            !state.enabled ? 'Resolver disabled:' : state.rejected ? 'Host failure selected:' : 'Offline CSV selected:',
          ),
          'Resource control status',
        );
      });
      const captured = await snapshot(page, root, root, report, state.name, output, {
        plots: state.plots,
        allowAlert: state.rejected,
      });
      if (!captured.ready || !captured.facts) {
        return;
      }
      await attempt(report, `${state.name}: assertions`, async () => {
        assert.equal(captured.facts.plotCount, state.plots);
        assertVisibleOutcomes(captured.facts, entry, state.name);
        if (!state.enabled) {
          assert(await failure.isDisabled(), 'Failure control must be disabled while paused');
          assert((await root.textContent()).includes('Resolver disabled: the chart is paused'));
        } else if (state.rejected) {
          assert.equal(captured.facts.alerts.length, 1);
          assert(captured.facts.alerts[0].includes('The offline host rejected this fixture.'));
        } else {
          matchRows(
            captured.facts.plots.flatMap(plot => plot.points.map(point => point.label)),
            [['Requests: 0']],
          );
        }
      });
    }
    return;
  }
  await attempt(report, 'semantic initial state', async () => {
    assert((await root.locator('p[role="status"]').textContent()).includes(control.summaries[0]));
    assertSemantic(initial.facts, control, 0);
  });
  const toggle = root.getByRole('switch', { name: control.label, exact: true });
  const checked = await attempt(report, 'read initial switch', () => toggle.isChecked());
  await attempt(report, 'semantic keyboard toggle', async () => {
    await toggle.focus();
    await page.keyboard.press('Space');
    assert.equal(await toggle.isChecked(), !checked, 'Actual keyboard-operated switch did not change');
    await root.locator('p[role="status"]').filter({ hasText: control.summaries[1] }).waitFor();
  });
  const toggled = await snapshot(page, root, root, report, 'toggled', output, { plots: control.plots?.[1] });
  if (!toggled.ready || !toggled.facts) {
    return;
  }
  await attempt(report, 'semantic toggled graph', () => {
    assertSemantic(toggled.facts, control, 1);
    assertVisibleOutcomes(toggled.facts, entry, 'toggled');
    assert.notDeepEqual(
      graphSignature(toggled.facts),
      graphSignature(initial.facts),
      'Control changed status but not the rendered graph',
    );
  });
  await attempt(report, 'restore semantic control', async () => {
    if ((await toggle.isChecked()) !== checked) {
      await toggle.focus();
      await page.keyboard.press('Space');
    }
    assert.equal(await toggle.isChecked(), checked);
  });
  const restored = await snapshot(page, root, root, report, 'restored', output, { plots: control.plots?.[0] });
  if (!restored.ready || !restored.facts) {
    return;
  }
  await attempt(report, 'semantic restored graph', () => {
    assertSemantic(restored.facts, control, 0);
    assertVisibleOutcomes(restored.facts, entry, 'restored');
  });
}

async function corpusLegendStates(page, root, entry, report, output) {
  if (entry.expected?.file !== 'normalized-bar-order.vl.json') {
    return;
  }
  for (const [state, selected, pointCount] of [
    ['legend-selected', true, 2],
    ['legend-restored', false, 4],
  ]) {
    await attempt(report, `${state}: keyboard legend`, async () => {
      const option = root
        .getByRole('listbox', { name: 'Legends', exact: true })
        .getByRole('option', { name: 'First', exact: true });
      await option.focus();
      await page.keyboard.press('Space');
      const handle = await option.elementHandle();
      try {
        await page.waitForFunction(
          ({ element, expected }) => element.getAttribute('aria-selected') === String(expected),
          { element: handle, expected: selected },
          { timeout },
        );
      } finally {
        await handle.dispose();
      }
      // Remove hover highlighting before measuring the selected/restored chart.
      await page.mouse.move(0, 0);
      await option.evaluate(element => element.blur());
    });
    const captured = await snapshot(page, root, root, report, state, output, { plots: 1 });
    if (!captured.ready || !captured.facts) {
      return;
    }
    await attempt(report, `${state}: stable domain and graph`, () => {
      assertVisibleOutcomes(captured.facts, entry, state);
      assert.equal(
        captured.facts.plots[0].points.length,
        pointCount,
        'Real legend selection must filter/restore marks',
      );
      assert.equal(captured.facts.legends[0].items[0].selected, String(selected));
      if (!selected) {
        assertCorpus(captured.facts, entry.expected, {});
      }
    });
  }
}

function urlFor(base, id, mode) {
  const url = new URL('iframe.html', base);
  url.searchParams.set('id', id);
  url.searchParams.set('viewMode', mode);
  return url.href;
}

async function auditStory(context, base, entry, output) {
  const report = {
    id: entry.id,
    exportName: entry.exportName,
    kind: entry.kind,
    expected: entry.expected,
    failures: [],
    states: [],
  };
  const page = await context.newPage();
  page.setDefaultTimeout(timeout);
  watchPage(page, report);
  try {
    await attempt(report, 'story navigation', () =>
      page.goto(urlFor(base, entry.id, 'story'), { waitUntil: 'domcontentloaded', timeout: 90000 }),
    );
    const story = page.locator('#storybook-root');
    const root =
      entry.kind === 'corpus'
        ? story.locator('[data-corpus-chart]')
        : entry.kind === 'semantic'
        ? story.locator('section').first()
        : story;
    const initial = await snapshot(page, root, root, report, 'initial', output, {
      plots: entry.expected?.publicSvgCount,
    });
    if (!initial.ready || !initial.facts) {
      return report; // finally still persists full errors/evidence; no downstream controls/tooltips/timeouts.
    }
    await attempt(report, 'source-derived visible outcomes', () => assertVisibleOutcomes(initial.facts, entry));
    if (entry.expected) {
      await attempt(report, 'actual corpus fixture identity', async () => {
        assert.equal(await root.getAttribute('data-corpus-chart'), entry.expected.file);
      });
    }
    if (initial.facts && entry.expected) {
      await attempt(report, 'independent corpus expectations', () =>
        assertCorpus(initial.facts, entry.expected, report),
      );
      if (entry.expected.tooltipLabels) {
        await tooltipChecks(page, root, entry.expected.tooltipLabels, report, output);
      }
    }
    if (entry.kind === 'semantic') {
      await attempt(report, 'rightmost tooltip captures', () =>
        rightmostTooltipChecks(page, root, entry, report, output),
      );
      await semanticStates(page, root, report, entry, initial, output);
    }
    if (entry.kind === 'corpus') {
      await attempt(report, 'rightmost tooltip captures', () =>
        rightmostTooltipChecks(page, root, entry, report, output),
      );
      await corpusLegendStates(page, root, entry, report, output);
    }
  } catch (error) {
    report.failures.push({ check: 'story audit', message: error.stack || String(error) });
    report.failureEvidence = { state: 'story-audit' };
    await failureEvidence(page, report, report.failureEvidence, output);
  } finally {
    await page.close();
    finishPage(report);
    fs.writeFileSync(path.join(output, `${entry.id}.json`), `${JSON.stringify(report, null, 2)}\n`);
    console.log(`${report.failures.length ? 'FAIL' : 'PASS'} ${entry.id} (${report.states.length} captures)`);
  }
  return report;
}

// Inspect live rendered text, not textContent from a clone: Storybook keeps hidden error templates in body.
function collectVisibleErrors(root) {
  const document = root.ownerDocument;
  const view = document.defaultView;
  const walker = document.createTreeWalker(root, view.NodeFilter.SHOW_TEXT);
  const styles = new Map();
  const styleOf = element => {
    if (!styles.has(element)) {
      styles.set(element, view.getComputedStyle(element));
    }
    return styles.get(element);
  };
  const text = [];
  const range = document.createRange();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!parent || parent.closest('pre, code, textarea, script, style')) {
      continue;
    }
    if (['hidden', 'collapse'].includes(styleOf(parent).visibility)) {
      continue;
    }
    let hidden = false;
    for (let element = parent; element; element = element.parentElement) {
      const style = styleOf(element);
      if (style.display === 'none' || style.opacity === '0' || style.contentVisibility === 'hidden') {
        hidden = true;
        break;
      }
    }
    if (!hidden) {
      range.selectNodeContents(node);
      if ([...range.getClientRects()].some(rect => rect.width > 0 && rect.height > 0)) {
        text.push(node.textContent);
      }
    }
  }
  return (
    text
      .join('')
      .match(
        /TypeError:|ReferenceError:|Cannot convert undefined or null to object|Module build failed|Error rendering chart:|No Preview|Couldn't find source/g,
      ) || []
  );
}

async function auditDocsPreview(page, entry, report) {
  const anchor = page.locator(`[id="anchor--${entry.id}"], [id="anchor--primary--${entry.id}"]`).first();
  const preview = anchor.locator('.docs-story').first();
  const root =
    entry.kind === 'corpus'
      ? preview.locator('[data-corpus-chart]')
      : entry.kind === 'semantic'
      ? preview.locator('section').first()
      : preview;
  const item = { id: entry.id };
  report.previews.push(item);
  await attempt(report, `docs ${entry.exportName}: preview DOM`, async () => {
    await anchor.waitFor({ state: 'visible' });
    await anchor.scrollIntoViewIfNeeded();
    await ready(page, root, entry.expected?.publicSvgCount);
    item.facts = await gatherFacts(root);
  });
  if (item.facts) {
    await attempt(report, `docs ${entry.exportName}: healthy DOM`, () => {
      assertHealthy(item.facts);
      assert(item.facts.plotCount > 0, 'Docs preview has no actual chart');
    });
    await attempt(report, `docs ${entry.exportName}: source-derived visible outcomes`, () =>
      assertVisibleOutcomes(item.facts, entry),
    );
    if (entry.expected) {
      await attempt(report, `docs ${entry.exportName}: independent corpus expectations`, () =>
        assertCorpus(item.facts, entry.expected, item),
      );
    }
  }
  // Source/addon availability is independent of chart health (including real overflow failures).
  await attempt(report, `docs ${entry.exportName}: source and addons`, async () => {
    const code = anchor.getByRole('button', { name: 'Show code', exact: true });
    assert.equal(await code.count(), 1, 'Missing per-preview source control');
    assert(await code.isEnabled(), 'Show code is disabled');
    await code.click();
    try {
      const source = anchor
        .locator('pre')
        .filter({ hasText: `export const ${entry.exportName}` })
        .first();
      await source.waitFor({ state: 'visible' });
      item.source = await source.textContent();
      assert(
        item.source.includes('VegaDeclarativeChart') && item.source.includes(`export const ${entry.exportName}`),
        'Missing/non-runnable full source for this export',
      );
      const addons = anchor.getByRole('button', { name: /Open in (?:CodeSandbox|StackBlitz|Playground|new tab)/i });
      assert((await addons.count()) > 0, 'No source addon action was mounted');
      item.addons = [];
      for (const addon of await addons.all()) {
        const text = await addon.textContent();
        assert(
          (await addon.isEnabled()) && (await addon.getAttribute('aria-disabled')) !== 'true',
          `${text} is disabled`,
        );
        item.addons.push(text);
      }
    } finally {
      await anchor.getByRole('button', { name: 'Hide code', exact: true }).click();
    }
  });
}

async function auditDocs(context, base, docsId, entries, output) {
  const report = { id: docsId, failures: [], previews: [] };
  const page = await context.newPage();
  page.setDefaultTimeout(timeout);
  watchPage(page, report);
  try {
    await page.goto(urlFor(base, docsId, 'docs'), { waitUntil: 'domcontentloaded', timeout: 90000 });
    for (const entry of entries) {
      await auditDocsPreview(page, entry, report);
    }
    await attempt(report, 'docs preview inventory', async () => {
      // Count the mounted DOM, not source checks that a chart assertion might have skipped.
      report.inventory = { mountedPreviews: await page.locator('.docs-story').count(), selectedPreviews: [] };
      for (const entry of entries) {
        const anchor = page.locator(`[id="anchor--${entry.id}"], [id="anchor--primary--${entry.id}"]`);
        report.inventory.selectedPreviews.push({ id: entry.id, count: await anchor.locator('.docs-story').count() });
      }
      assert.equal(report.inventory.mountedPreviews, 32, 'Docs must mount all 32 previews');
      for (const preview of report.inventory.selectedPreviews) {
        assert.equal(preview.count, 1, `Docs must mount exactly one preview for ${preview.id}`);
      }
    });
    await attempt(report, 'docs visible error text', async () => {
      report.visibleErrors = await page.locator('body').evaluate(collectVisibleErrors);
      assert.deepEqual(report.visibleErrors, [], 'Storybook/code addon displayed errors');
    });
    await settle(page);
    await page.screenshot({ path: path.join(output, `${docsId}.png`) });
  } catch (error) {
    report.failures.push({ check: 'docs audit', message: error.stack || String(error) });
    report.failureEvidence = { state: 'docs-audit' };
    await failureEvidence(page, report, report.failureEvidence, output);
  } finally {
    await page.close();
    finishPage(report);
    fs.writeFileSync(path.join(output, `${docsId}.json`), `${JSON.stringify(report, null, 2)}\n`);
  }
  return report;
}

async function launchBrowser(summary) {
  const { chromium } = require('playwright');
  if (process.platform === 'win32') {
    try {
      const browser = await chromium.launch({ channel: 'msedge', headless: true });
      summary.browserChannel = 'msedge';
      return browser;
    } catch (error) {
      summary.edgeLaunchFailure = error.message;
      console.warn('Microsoft Edge unavailable; trying installed Playwright Chromium.');
    }
  }
  summary.browserChannel = 'chromium';
  return chromium.launch({ headless: true });
}

function selectEntries(entries, filter) {
  if (filter === undefined) {
    return entries;
  }
  assert(filter.trim(), '--filter requires a nonempty substring');
  const substring = filter.toLowerCase();
  const selected = entries.filter(entry =>
    [entry.id, entry.exportName].some(value => value.toLowerCase().includes(substring)),
  );
  assert(selected.length, `No story ID/export matches --filter=${filter}`);
  return selected;
}

function fullCoverage(summary) {
  return (
    summary.mode === 'all' &&
    summary.filter === undefined &&
    summary.indexVerifiedStories === 32 &&
    summary.stories.length === 32 &&
    summary.stories.every(story => !story.abortedAt) &&
    summary.docs?.previews === 32
  );
}

function selfTestVisibleOutcomes(entries) {
  // Synthetic positive/negative controls exercise the assertions, not a renderer or a visual oracle.
  const mark = (label, stroke = '#2aa0a4') => ({
    tag: 'circle',
    label,
    attributes: { role: 'option', 'aria-label': label },
    radius: 3.5,
    visible: true,
    opacity: '1',
    effectiveOpacity: 1,
    stroke,
    bounds: [0, 0, 10, 10],
    screen: { x: 0, y: 0, width: 10, height: 10 },
  });
  const factsFor = marks => ({
    plotCount: 1,
    legends: [],
    visibleHeadings: ['Ad Performance - CTR Analysis'],
    plots: [{ marks, text: [] }],
  });
  const defaultFacts = factsFor(
    visibleContracts.defaultColors.map(([campaign, stroke]) => mark(`campaign: ${campaign}`, stroke)),
  );
  assertVisibleOutcomes(defaultFacts, { exportName: 'Default' });
  assert.throws(
    () => assertVisibleOutcomes({ ...defaultFacts, visibleHeadings: [] }, { exportName: 'Default' }),
    /chart title must be visibly rendered/,
  );
  for (const [index, color] of [
    [0, '#637cef'],
    [5, '#084594'],
    [6, '#deebf7'],
  ]) {
    const wrong = structuredClone(defaultFacts);
    wrong.plots[0].marks[index].stroke = color;
    assert.throws(
      () => assertVisibleOutcomes(wrong, { exportName: 'Default' }),
      /Actual rendered stroke/,
      'Reject categorical substitution and reversed continuous endpoints',
    );
  }
  const unwantedLegend = structuredClone(defaultFacts);
  unwantedLegend.legends.push({ items: [{ label: 'default' }] });
  assert.throws(() => assertVisibleOutcomes(unwantedLegend, { exportName: 'Default' }), /suppresses its color legend/);
  for (const [exportName, stroke] of Object.entries(visibleContracts.strokes)) {
    const count = exportName === 'RepeatMatrix' ? 16 : 5;
    const facts = factsFor(Array.from({ length: count }, (_, index) => mark(`Point ${index}`, stroke)));
    assertVisibleOutcomes(facts, { exportName });
    const wrong = structuredClone(facts);
    wrong.plots[0].marks[0].stroke = '#637cef';
    assert.throws(
      () => assertVisibleOutcomes(wrong, { exportName }),
      /Actual rendered stroke/,
      'A present scatter hit target with the wrong actual stroke must fail',
    );
  }
  for (const [exportName, count] of Object.entries(visibleContracts.linePoints)) {
    const facts = factsFor(Array.from({ length: count }, (_, index) => mark(`Point ${index}`)));
    if (exportName === 'AggregateAndWindowStatistics') {
      facts.plots.push({ marks: [mark('Separate window bar')], text: [] });
      facts.plotCount = 2;
    }
    assertVisibleOutcomes(facts, { exportName });
    for (const mutation of [
      { tag: 'path' },
      { radius: 0 },
      { opacity: '0.01' },
      { effectiveOpacity: 0.1 },
      { visible: false },
    ]) {
      const wrong = structuredClone(facts);
      Object.assign(wrong.plots[0].marks[0], mutation);
      assert.throws(() => assertVisibleOutcomes(wrong, { exportName }), /point:true/);
    }
  }
  const binEntry = entries.find(entry => entry.expected?.file === 'bin-transform.vl.json');
  const binFacts = factsFor(
    visibleContracts.bin.rectangles.map((rectangle, index) => ({
      ...mark(`Count: 2`),
      tag: 'rect',
      attributes: { 'data-ranged-mark': String(index) },
      bounds: rectangle,
      normalized200x100: rectangle,
      plot: visibleContracts.bin.plot,
    })),
  );
  assertVisibleOutcomes(binFacts, binEntry);
  for (const rectangle of [
    [0, 47.5, 200 / 3, 5],
    [0, 50, 200 / 3, 1],
    [0, 0, 200 / 3, 50],
  ]) {
    const wrong = structuredClone(binFacts);
    wrong.plots[0].marks[0].bounds = rectangle;
    wrong.plots[0].marks[0].normalized200x100 = rectangle;
    assert.throws(
      () => assertVisibleOutcomes(wrong, binEntry),
      /Normalized rectangle/,
      'Reject centered thin strips, missing zero-baseline height and wrong vertical placement',
    );
  }
  const legend = labels => [{ items: labels.map(label => ({ label })) }];
  const monthly = factsFor(
    visibleContracts.months.flatMap((month, index) => {
      const share = index === 1 ? 0.6 : 0.75;
      return [
        {
          ...mark(`Month: ${month}; Channel: Self-service`),
          bounds: [index * 100, 0, 10, 100 * share],
          screen: { x: index * 100, width: 10 },
        },
        {
          ...mark(`Month: ${month}; Channel: Assisted`),
          bounds: [index * 100, 100 * share, 10, 100 * (1 - share)],
          screen: { x: index * 100, width: 10 },
        },
      ];
    }),
  );
  monthly.legends = legend(visibleContracts.monthlyLegends);
  monthly.plots[0].text = visibleContracts.months.map((text, index) => ({
    text,
    visible: true,
    screen: { x: index * 100, width: 10 },
  }));
  assertVisibleOutcomes(monthly, { exportName: 'NormalizedStackOrder' });
  const toggled = structuredClone(monthly);
  toggled.plots[0].marks.forEach((segment, index) => {
    segment.bounds[1] = index % 2 ? 0 : toggled.plots[0].marks[index + 1].bounds[3];
  });
  assertVisibleOutcomes(toggled, { exportName: 'NormalizedStackOrder' }, 'toggled');
  assert.throws(() => assertVisibleOutcomes(monthly, { exportName: 'NormalizedStackOrder' }, 'toggled'), /baseline/);
  const alphabetic = structuredClone(monthly);
  alphabetic.plots[0].text[1].screen.x = 200;
  alphabetic.plots[0].text[2].screen.x = 100;
  assert.throws(
    () => assertVisibleOutcomes(alphabetic, { exportName: 'NormalizedStackOrder' }),
    /alignment|numeric x centers/,
  );
  const swappedLegend = structuredClone(monthly);
  swappedLegend.legends[0].items.reverse();
  assert.throws(() => assertVisibleOutcomes(swappedLegend, { exportName: 'NormalizedStackOrder' }), /legend order/);
  const corpus = factsFor([]);
  corpus.legends = legend(visibleContracts.corpusLegends);
  corpus.plots[0].text = ['A', 'B'].map((text, index) => ({
    text,
    visible: true,
    screen: { x: index * 100, width: 10 },
  }));
  const corpusEntry = entries.find(entry => entry.expected?.file === 'normalized-bar-order.vl.json');
  for (const state of ['initial', 'legend-selected', 'legend-restored']) {
    assertVisibleOutcomes(corpus, corpusEntry, state);
  }
  const absentMissing = structuredClone(corpus);
  absentMissing.legends[0].items.pop();
  assert.throws(() => assertVisibleOutcomes(absentMissing, corpusEntry), /legend order/);

  const bounds = { left: 100, top: 100, right: 200, bottom: 150, width: 100, height: 50 };
  const paint = {
    bounds,
    ancestors: [],
    filter: 'drop-shadow(rgb(0, 0, 0) 0px 0px 2px) drop-shadow(rgba(0, 0, 0, 0.2) 0px 8px 16px)',
    boxShadow: 'none',
    viewport: { left: 0, top: 0, right: 500, bottom: 400 },
    text: [{ text: 'Visible legend or tooltip', fragments: [bounds], ancestors: [] }],
  };
  assert.deepEqual(assertTooltipPaint(paint), { left: 64, right: 236, top: 72, bottom: 194, width: 172, height: 122 });
  assertPaintText(paint, 'Legend', { left: 0, top: 0, right: 300, bottom: 200 });
  const ancestor = {
    tag: 'DIV',
    bounds: { left: 0, top: 0, right: 180, bottom: 140 },
    overflowX: 'auto',
    overflowY: 'auto',
  };
  const clipped = structuredClone(paint);
  clipped.text[0].ancestors = [{ ...ancestor, overflowX: 'visible', overflowY: 'visible' }, ancestor];
  assert.throws(
    () => assertPaintText(clipped, 'Legend'),
    /overflow ancestor/,
    'Inspect every ancestor, not just the immediate parent or a nonzero legend rect',
  );
  for (const axis of ['X', 'Y']) {
    const clippedAxis = structuredClone(paint);
    clippedAxis.text[0].ancestors = [
      { ...ancestor, overflowX: 'visible', overflowY: 'visible', [`overflow${axis}`]: 'hidden' },
    ];
    assert.throws(() => assertPaintText(clippedAxis, 'Legend'), /overflow ancestor/);
  }
  const noText = structuredClone(paint);
  noText.text[0].fragments = [];
  assert.throws(() => assertPaintText(noText, 'Legend'), /no visible text range/);
  const shadowClipped = structuredClone(paint);
  shadowClipped.ancestors = [{ ...ancestor, bounds, overflowX: 'hidden', overflowY: 'hidden' }];
  assert.throws(() => assertTooltipPaint(shadowClipped), /surface\/shadow.*overflow ancestor/);
  assert.throws(
    () => assertTooltipPaint({ ...paint, viewport: { ...paint.viewport, right: 220 } }),
    /outside viewport/,
  );
  assert.throws(
    () => assertTooltipPaint({ ...paint, filter: 'none', boxShadow: 'none' }),
    /shadow must not be disabled/,
  );
  assert.deepEqual(
    shadowBounds({
      ...paint,
      filter: 'none',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px 1px, rgb(0, 0, 0) 3px 0px 2px 0px',
    }),
    { left: 91, top: 93, right: 209, bottom: 161, width: 118, height: 68 },
    'Parse computed multi-shadow RGB colors without splitting their internal commas',
  );
  assert.throws(
    () => assertPaintText(paint, 'Legend', { left: 0, top: 0, right: 300, bottom: 140 }),
    /outside capture/,
  );
  return defaultFacts;
}

async function selfTestDocs(entries, output, defaultFacts) {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM(`<!doctype html><body>
    <style>.sb-nopreview { display: none; }</style>
    <div class="sb-nopreview"><span>No Preview</span>TypeError:</div>
    <div hidden><span>Module build failed</span></div>
    <div style="visibility: hidden">ReferenceError:</div>
    <div style="opacity: 0"><span>Error rendering chart:</span></div>
    <div style="content-visibility: hidden"><span>Couldn't find source</span></div>
    <div data-no-layout>No Preview</div>
    <pre><span>TypeError:</span></pre><code>No Preview</code><textarea>ReferenceError:</textarea>
    <script>Module build failed</script>
    <p>Healthy story and source addon controls.</p>
  </body>`);
  const document = dom.window.document;
  // JSDOM has no layout. Model nonempty/empty text ranges; real computed CSS still controls visibility.
  document.createRange = () => ({
    selectNodeContents(node) {
      this.node = node;
    },
    getClientRects() {
      return this.node.parentElement.hasAttribute('data-no-layout') ? [] : [{ width: 10, height: 10 }];
    },
  });
  try {
    assert.deepEqual(collectVisibleErrors(document.body), [], 'Hidden templates/source snippets are not errors');
    document.querySelector('.sb-nopreview').style.display = 'block';
    assert.deepEqual(
      collectVisibleErrors(document.body),
      ['No Preview', 'TypeError:'],
      'The same Storybook error template must fail when visible',
    );
    document.querySelector('.sb-nopreview').style.display = 'none';
    const visibleError = document.createElement('div');
    visibleError.innerHTML = `No <b>Preview</b> ReferenceError: Cannot convert undefined or null to object
      Module build failed Error rendering chart: Couldn't find source`;
    document.body.append(visibleError);
    assert.deepEqual(collectVisibleErrors(document.body), [
      'No Preview',
      'ReferenceError:',
      'Cannot convert undefined or null to object',
      'Module build failed',
      'Error rendering chart:',
      "Couldn't find source",
    ]);
  } finally {
    dom.window.close();
  }

  const selected = entries.slice(0, 3).map((entry, index) => ({
    ...entry,
    exportName: `SelfTestPreview${index}`,
    kind: 'default',
    expected: undefined,
  }));
  const healthy = {
    invalidAttributes: [],
    horizontalClipping: [],
    privateValueExposed: false,
    alerts: [],
    plotCount: 1,
    plots: [
      { bounds: { width: 640, height: 350 }, accessibleName: 'Chart', points: [{ label: 'x: 1; y: 2' }], marks: [] },
    ],
  };
  const run = async options => {
    const noop = () => undefined;
    const sourceAttempts = [];
    const hiddenSources = [];
    let closed = false;
    const anchors = selected.map((entry, index) => {
      const locator = {
        first() {
          return this;
        },
        filter() {
          return this;
        },
        locator() {
          return this;
        },
        async count() {
          return options.missingPreview === index ? 0 : 1;
        },
        waitFor: noop,
        scrollIntoViewIfNeeded: noop,
        async elementHandle() {
          return { dispose: noop };
        },
        async evaluateAll() {
          return ['Ad Performance - CTR Analysis'];
        },
        async evaluate() {
          if (index === 0 && options.defaultFacts) {
            return {
              ...healthy,
              ...options.defaultFacts,
              plots: options.defaultFacts.plots.map(plot => ({
                ...healthy.plots[0],
                ...plot,
                points: plot.marks.map(mark => ({ label: mark.label })),
              })),
            };
          }
          return {
            ...healthy,
            horizontalClipping: options.overflow === index ? [{ kind: 'svg-content' }] : [],
          };
        },
        async textContent() {
          return `export const ${entry.exportName} = () => <VegaDeclarativeChart />;`;
        },
        getByRole(role, { name }) {
          assert.equal(role, 'button');
          if (name === 'Show code') {
            sourceAttempts.push(entry.id);
            return {
              async count() {
                return options.missingSource === index ? 0 : 1;
              },
              async isEnabled() {
                return true;
              },
              click: noop,
            };
          }
          if (name === 'Hide code') {
            return {
              async click() {
                hiddenSources.push(entry.id);
              },
            };
          }
          return {
            async count() {
              return 1;
            },
            async all() {
              return [
                {
                  async textContent() {
                    return 'Open in Playground';
                  },
                  async isEnabled() {
                    return true;
                  },
                  async getAttribute() {
                    return null;
                  },
                },
              ];
            },
          };
        },
      };
      return locator;
    });
    const page = {
      setDefaultTimeout(value) {
        assert.equal(value, timeout);
      },
      on: noop,
      goto: noop,
      waitForFunction: noop,
      evaluate: noop,
      screenshot: noop,
      async close() {
        closed = true;
      },
      locator(selector) {
        if (selector === 'body') {
          return {
            async evaluate() {
              return options.visibleErrors || [];
            },
          };
        }
        if (selector === '.docs-story') {
          return {
            async count() {
              return 32;
            },
          };
        }
        const index = selected.findIndex(entry => selector.includes(entry.id));
        assert(index >= 0, `Unexpected self-test selector: ${selector}`);
        return anchors[index];
      },
    };
    const report = await auditDocs(
      {
        async newPage() {
          return page;
        },
      },
      'http://localhost:6317/',
      'self-test-docs',
      selected,
      output,
    );
    assert(closed, 'Docs page must close after independent failures');
    assert.deepEqual(
      sourceAttempts,
      selected.map(entry => entry.id),
      'Check every source despite chart failures',
    );
    assert.equal(report.previews.length, selected.length);
    assert.deepEqual(
      hiddenSources,
      selected.filter((entry, index) => index !== options.missingSource).map(entry => entry.id),
      'Close every opened source panel',
    );
    return report;
  };
  console.log(
    'Expected negative controls: real docs overflow/source/inventory/visible errors still fail independently.',
  );
  const overflow = await run({ overflow: 0 });
  assert.deepEqual(
    overflow.failures.map(failure => failure.check),
    [`docs ${selected[0].exportName}: healthy DOM`],
  );
  assert(overflow.failures[0].message.includes('Horizontal scrolling/clipping'));
  assert.equal(overflow.previews.filter(item => item.source && item.addons.length).length, selected.length);
  assert.equal(overflow.inventory.mountedPreviews, 32);
  const missingSource = await run({ missingSource: 1 });
  assert.deepEqual(
    missingSource.failures.map(failure => failure.check),
    [`docs ${selected[1].exportName}: source and addons`],
  );
  const missingPreview = await run({ missingPreview: 2 });
  assert.deepEqual(
    missingPreview.failures.map(failure => failure.check),
    ['docs preview inventory'],
  );
  const visibleErrors = await run({ visibleErrors: ['No Preview', 'TypeError:'] });
  assert.deepEqual(
    visibleErrors.failures.map(failure => failure.check),
    ['docs visible error text'],
  );
  selected[0].exportName = 'Default';
  const correctColors = await run({ defaultFacts });
  assert.deepEqual(correctColors.failures, [], 'Docs must execute the positive source-derived color contract');
  const wrongDefault = structuredClone(defaultFacts);
  wrongDefault.plots[0].marks[0].stroke = '#637cef';
  const wrongColors = await run({ defaultFacts: wrongDefault });
  assert.deepEqual(
    wrongColors.failures.map(failure => failure.check),
    ['docs Default: source-derived visible outcomes'],
    'Docs must reject wrong painted colors even when point values, preview and addons pass',
  );
}

async function selfTest(entries) {
  const defaultFacts = selfTestVisibleOutcomes(entries);
  assert.equal(entries.filter(entry => entry.kind === 'semantic').length, 8);
  assert.equal(entries.filter(entry => entry.kind === 'corpus').length, 23);
  const index = {
    entries: Object.fromEntries(entries.map(entry => [entry.id, { id: entry.id, title, type: 'story' }])),
  };
  index.entries.docs = { id: 'real-docs-id', title, type: 'docs' };
  assert.equal(verifyIndex(index, entries), 'real-docs-id');
  assert.throws(() =>
    verifyIndex({ entries: { ...index.entries, extra: { id: 'unexpected', title, type: 'story' } } }, entries),
  );
  assert(knownReactKeyWarning('Warning: Each child in a list should have a unique "key" prop.'));
  assert(!knownReactKeyWarning('TypeError: Cannot convert undefined or null to object'));
  const resource404 = {
    type: 'error',
    text: 'Failed to load resource: the server responded with a status of 404 (Not Found)',
    location: { url: 'http://localhost:6317/favicon.ico' },
  };
  assert.equal(consoleCategory(resource404), 'infrastructureWarnings');
  assert.equal(
    consoleCategory({ ...resource404, location: { url: 'http://localhost:6317/chart.js' } }),
    'consoleErrors',
  );
  assert.equal(consoleCategory({ ...resource404, text: 'Maximum update depth exceeded.' }), 'consoleErrors');
  assert.equal(consoleCategory({ ...resource404, text: resource404.text.replace('404', '500') }), 'consoleErrors');
  assert.equal(
    consoleCategory({ ...resource404, text: 'Each child in a list should have a unique "key" prop.' }),
    'consoleErrors',
  );
  const eventReport = { failures: [] };
  const record = eventRecorder(eventReport);
  for (let count = 0; count < 5609; count++) {
    record('consoleErrors', { text: 'Maximum update depth exceeded.' });
  }
  for (let count = 0; count < 30; count++) {
    record('consoleErrors', { text: `${count}: ${'x'.repeat(10000)}` });
  }
  record('infrastructureWarnings', resource404);
  const fullStack = `TypeError: full page failure\n${'    at originalFrame\n'.repeat(1000)}`;
  record('pageErrors', { text: fullStack });
  assert.equal(eventReport.consoleErrors[0].count, 5609);
  assert.equal(eventReport.eventCounts.consoleErrors, 5639);
  assert.equal(eventReport.consoleErrors.length, maxEventSamples);
  assert.equal(eventReport.omittedEventCounts.consoleErrors, 11);
  assert.equal(eventReport.pageErrors[0].text, fullStack, 'Do not truncate pageerror stacks');
  assert(JSON.stringify(eventReport).length < 200000, 'Bound repeated/oversized console evidence');
  finishPage(eventReport);
  assert.deepEqual(
    eventReport.failures.map(failure => failure.check),
    ['pageErrors', 'consoleErrors'],
  );
  const faviconOnly = { failures: [] };
  eventRecorder(faviconOnly)('infrastructureWarnings', resource404);
  finishPage(faviconOnly);
  assert.deepEqual(faviconOnly.failures, []);
  assert.equal(selectEntries(entries, 'CorpusWindowForward')[0].exportName, 'CorpusWindowForwardFrame');
  assert.equal(selectEntries(entries, 'corpus-repeat-matrix').length, 1);
  assert.throws(() => selectEntries(entries, 'does-not-exist'));
  assert.throws(() => selectEntries(entries, ''));
  const incompleteIndex = { entries: { ...index.entries } };
  delete incompleteIndex.entries[entries[0].id];
  assert.throws(() => verifyIndex(incompleteIndex, entries), 'Filtering must not weaken full index discovery');
  const coverage = { mode: 'all', indexVerifiedStories: 32, stories: entries, docs: { previews: 32 } };
  assert(fullCoverage(coverage));
  assert(!fullCoverage({ ...coverage, filter: 'corpus' }));
  assert(!fullCoverage({ ...coverage, mode: 'stories' }));
  assert(!fullCoverage({ ...coverage, stories: [{ abortedAt: 'initial: ready' }, ...entries.slice(1)] }));
  matchRows(
    ['x: 2; y: 6', 'x: 1; y: 4'],
    [
      ['x: 1', 'y: 4'],
      ['x: 2', 'y: 6'],
    ],
  );
  assert.throws(() => matchRows(['x: 1; y: 9'], [['x: 1', 'y: 4']]));
  matchRows(
    ['1. default, 6.', '-2.5. default, 0.'],
    [
      ['x: 1', 'y: 6'],
      ['x: -2.5', 'y: 0'],
    ],
    'native-default-xy',
  );
  for (const label of ['2. default, 6.', '1. default, 16.', '6. default, 1.', '1. other, 6.', '1. default, 6. extra']) {
    assert.throws(() => matchRows([label], [['x: 1', 'y: 6']], 'native-default-xy'));
  }
  assert.throws(() =>
    matchRows(
      ['1. default, 6.'],
      [
        ['x: 1', 'y: 6'],
        ['x: 1', 'y: 6'],
      ],
      'native-default-xy',
    ),
  );
  const nativeCases = {
    'window-ignore-peers.vl.json': [['1. default, 2.', '2. default, 6.', '3. default, 12.', '4. default, 24.']],
    'window-forward-frame.vl.json': [['1. default, 6.', '2. default, 14.', '3. default, 24.', '4. default, 16.']],
    'recursive-concat-dataset.vl.json': [
      ['1. default, 5.', '2. default, 9.'],
      ['1. default, 5.', '2. default, 9.'],
      ['2. default, 8.'],
    ],
    'repeat-matrix.vl.json': [
      ['1. default, 1.', '2. default, 2.'],
      ['10. default, 1.', '20. default, 2.'],
      ['1. default, 10.', '2. default, 20.'],
      ['10. default, 10.', '20. default, 20.'],
    ],
  };
  for (const [file, labels] of Object.entries(nativeCases)) {
    const expected = entries.find(entry => entry.expected?.file === file).expected;
    const facts = {
      plotCount: labels.length,
      cells: expected.composed ? expected.expectedTables.map(() => ({ empty: false })) : [],
      plots: labels.map(points => ({ points: points.map(label => ({ label })) })),
    };
    assertCorpus(facts, expected, {});
    const wrongX = structuredClone(facts);
    wrongX.plots[0].points[0].label = wrongX.plots[0].points[0].label.replace(/^1\./, '999.');
    assert.throws(() => assertCorpus(wrongX, expected, {}), `${file}: must independently reject wrong x`);
    const wrongY = structuredClone(facts);
    wrongY.plots[0].points[0].label = wrongY.plots[0].points[0].label.replace(/, [^.]+\.$/, ', 999.');
    assert.throws(() => assertCorpus(wrongY, expected, {}), `${file}: must independently reject wrong y`);
  }
  assert.throws(
    () =>
      assertHealthy({
        invalidAttributes: [],
        horizontalClipping: [{ kind: 'svg-content', overflow: 'visible' }],
        privateValueExposed: false,
        alerts: [],
        plots: [],
      }),
    /Horizontal scrolling\/clipping/,
    'Do not relax clipping automatically',
  );
  assert.equal(semanticControls.FilteredMultilineTooltips.label, 'Show operational tooltips');
  assert(
    'Four valid readings remain. Tooltips are enabled.'.includes(
      semanticControls.FilteredMultilineTooltips.summaries[0],
    ),
  );
  assertGeometry([[0, 25, 100, 75]], [[0, 25, 100, 75]]);
  assert.throws(() => assertGeometry([[0, 25, 100, 70]], [[0, 25, 100, 75]]));
  const ema = entries.find(entry => entry.expected?.file === 'ema-encoding.vl.json').expected;
  assert.deepEqual(projection(ema.expectedTables[0], ema.spec).expectedRows, [
    ['EMA: 8.857', 'Rows: 4', 'Valid: 3'],
    ['EMA: 7.200', 'Rows: 2', 'Valid: 2'],
  ]);
  for (const { expected } of entries.filter(entry => entry.kind === 'corpus')) {
    if (expected.tooltipLabels) {
      continue;
    }
    const units = unitSpecs(expected.spec);
    expected.expectedTables.forEach((table, tableIndex) => {
      const projected = projection(table, units[tableIndex] || units[0]);
      projected.expectedRows.forEach(row => assert(row.length, `${expected.file}: no public projection`));
    });
  }
  const output = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'vega-harness-selftest-'));
  const events = {};
  let closed = false;
  let fullPageScreenshot = false;
  let rootWaits = 0;
  const root = {
    locator() {
      return this;
    },
    first() {
      return this;
    },
    async waitFor() {
      rootWaits++;
      throw new Error('Expected self-test missing initial story root');
    },
    async isVisible() {
      return false;
    },
    getByRole() {
      assert.fail('Must abort controls after initial readiness fails');
    },
  };
  const page = {
    setDefaultTimeout(value) {
      assert.equal(value, timeout);
    },
    on(name, callback) {
      events[name] = callback;
    },
    async goto() {
      events.pageerror(new Error(fullStack));
    },
    locator(selector) {
      return selector === 'body'
        ? {
            async innerText() {
              return fullStack;
            },
          }
        : root;
    },
    async screenshot(options) {
      fullPageScreenshot = options.fullPage;
    },
    async close() {
      closed = true;
    },
  };
  console.log('Expected negative control: initial readiness fails once, without launching a browser.');
  const aborted = await auditStory(
    {
      async newPage() {
        return page;
      },
    },
    'http://localhost:6317/',
    entries[1],
    output,
  );
  assert.equal(rootWaits, 1, 'No cascading 45-second waits');
  assert(closed && fullPageScreenshot, 'Close page and capture full-page evidence without story root');
  assert.equal(aborted.states.length, 1);
  assert.equal(aborted.abortedAt, 'initial: ready');
  assert.equal(aborted.states[0].pageText, fullStack);
  assert(aborted.pageErrors[0].text.includes(fullStack));
  assert.deepEqual(
    aborted.failures.map(failure => failure.check),
    ['initial: ready', 'pageErrors'],
  );
  await selfTestDocs(entries, output, defaultFacts);
  console.log(
    `PASS browser-free harness checks: metadata/index32, native x/y, exact scatter colors/endpoints, binned zero-baseline/strip negatives, point:true visibility, numeric month centers/stack fractions/domain legends, text-range overflow on both axes/all ancestors, tooltip shadow/viewport, console classification/count caps, filter coverage, root-missing fail-fast/evidence, visible-only errors, independent Docs chart/source/inventory/painted-color checks. Self-test artifacts: ${output}`,
  );
}

async function main() {
  const args = process.argv.slice(2);
  const mode = args.find(arg => arg.startsWith('--mode='))?.slice('--mode='.length) || 'all';
  const filter = args.find(arg => arg.startsWith('--filter='))?.slice('--filter='.length);
  assert(['all', 'stories', 'docs'].includes(mode), 'Use --mode=all, --mode=stories or --mode=docs');
  assert(
    args.every(arg => arg === '--self-test' || arg.startsWith('--mode=') || arg.startsWith('--filter=')),
    `Unknown arguments: ${args.join(' ')}`,
  );
  const entries = metadata();
  const selected = selectEntries(entries, filter);
  if (args.includes('--self-test')) {
    await selfTest(entries);
    return;
  }
  const base = `${(process.env.VEGA_STORYBOOK_URL || 'http://localhost:6317').replace(/\/+$/, '')}/`;
  const output = path.resolve(storiesDirectory, process.env.VEGA_VISUAL_OUTPUT || 'test-results/vega-visual');
  fs.mkdirSync(output, { recursive: true });
  const summary = {
    started: new Date().toISOString(),
    base,
    output,
    mode,
    filter,
    scope: filter === undefined ? mode : 'filtered',
    discoveredStories: entries.length,
    selectedStories: selected.length,
    viewport,
    metadataParity: true,
    visibleRegressionBasis:
      'Hand-worked authored specs plus explicit local light-theme palette contract; no adapter-derived or upstream runtime oracle.',
    visibleRegressionContracts: visibleContracts,
    omissions,
    failures: [],
    stories: [],
  };
  let browser;
  try {
    const response = await fetch(new URL('index.json', base), { signal: AbortSignal.timeout(timeout) });
    assert(response.ok, `/index.json: HTTP ${response.status}`);
    const index = await response.json();
    const docsId = verifyIndex(index, entries);
    summary.indexVerifiedStories = entries.length;
    fs.writeFileSync(path.join(output, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
    browser = await launchBrowser(summary);
    summary.browserVersion = browser.version();
    const context = await browser.newContext({
      viewport,
      locale: 'en-US',
      timezoneId: 'UTC',
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    if (mode !== 'docs') {
      for (const entry of selected) {
        const report = await auditStory(context, base, entry, output);
        summary.stories.push({
          id: report.id,
          failures: report.failures.length,
          states: report.states.length,
          abortedAt: report.abortedAt,
          eventCounts: report.eventCounts,
        });
        summary.failures.push(...report.failures.map(failure => ({ id: report.id, ...failure })));
      }
    }
    if (mode !== 'stories') {
      const docs = await auditDocs(context, base, docsId, selected, output);
      summary.docs = { id: docsId, previews: docs.previews.length, failures: docs.failures.length };
      summary.failures.push(...docs.failures.map(failure => ({ id: docsId, ...failure })));
    }
    await context.close();
  } catch (error) {
    summary.failures.push({ check: 'audit setup/execution', message: error.stack || String(error) });
  } finally {
    if (browser) {
      await browser.close();
    }
    summary.finished = new Date().toISOString();
    summary.passed = summary.failures.length === 0;
    summary.coverageComplete = fullCoverage(summary);
    summary.fullAuditPassed = summary.passed && summary.coverageComplete;
    fs.writeFileSync(path.join(output, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
    console.log(
      `${summary.passed ? 'PASS' : 'FAIL'} Vega browser audit (${mode}); ${
        summary.failures.length
      } failure(s). Reports: ${output}`,
    );
    if (!summary.coverageComplete) {
      console.log(
        `INCOMPLETE full-audit coverage: mode=${mode}, filter=${JSON.stringify(filter) || '(none)'}, selected=${
          selected.length
        }/32. Scoped pass is NOT a complete audit.`,
      );
    }
    if (!summary.passed) {
      process.exitCode = 1;
    }
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.stack || error);
    process.exitCode = 1;
  });
}
