import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { webkit } from '@playwright/test';

let browser;
let source;

before(async () => {
  const result = await build({
    absWorkingDir: fileURLToPath(new URL('../', import.meta.url)),
    stdin: {
      contents: `
        import { computePosition } from './src/engine/computePosition';
        import { computePosition as oracle, shift, hide } from '@floating-ui/dom';
        globalThis.positioningTest = { computePosition, oracle, shift, hide };
      `,
      resolveDir: fileURLToPath(new URL('../', import.meta.url)),
    },
    bundle: true,
    format: 'iife',
    write: false,
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  source = result.outputFiles[0].text;
  browser = await webkit.launch();
});

after(async () => browser?.close());

for (const scenario of ['filter', 'backdropFilter', 'popover', 'dialog', 'containedPopover']) {
  test(`WebKit preserves fixed geometry for ${scenario}`, async () => {
    const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
    try {
      await page.setContent('<!doctype html><body style="margin:0"></body>');
      await page.addScriptTag({ content: source });
      const result = await page.evaluate(async scenario => {
        const { computePosition, oracle, shift, hide } = globalThis.positioningTest;
        const create = (tag, css, parent = document.body) => {
          const node = document.createElement(tag);
          Object.assign(node.style, css);
          parent.append(node);
          return node;
        };
        const target = create('div', {
          position: 'fixed',
          left: '350px',
          top: '240px',
          width: '80px',
          height: '40px',
        });
        const filtered = scenario === 'filter' || scenario === 'backdropFilter';
        const outer = create('div', {
          position: 'absolute',
          left: '50px',
          top: '60px',
          width: '100px',
          height: '100px',
          ...(filtered ? { [scenario]: 'blur(0px)' } : { transform: 'translate(40px, 30px)', overflow: 'hidden' }),
        });
        let parent = outer;
        if (!filtered) {
          parent = create(
            scenario === 'dialog' ? 'dialog' : 'div',
            {
              position: 'fixed',
              left: '100px',
              top: '100px',
              width: '200px',
              height: '200px',
              margin: '0',
              padding: '0',
              border: '0',
              ...(scenario === 'containedPopover' && {
                transform: 'translate(20px, 30px)',
                overflow: 'hidden',
              }),
            },
            outer,
          );
          if (scenario === 'dialog') {
            parent.showModal();
          } else {
            parent.popover = 'manual';
            parent.showPopover();
          }
        }
        const floating = create('div', { position: 'fixed', width: '120px', height: '60px' }, parent);
        const expected = await oracle(target, floating, {
          strategy: 'fixed',
          placement: 'bottom',
          middleware: [shift(), hide(), hide({ strategy: 'escaped' })],
        });
        const actual = await computePosition(target, floating, {
          strategy: 'fixed',
          positioningOptions: { pinned: true },
        });
        Object.assign(floating.style, { left: `${actual.x}px`, top: `${actual.y}px` });
        const rect = floating.getBoundingClientRect();
        return {
          actual: { x: actual.x, y: actual.y, referenceHidden: actual.referenceHidden, escaped: actual.escaped },
          expected: {
            x: expected.x,
            y: expected.y,
            referenceHidden: expected.middlewareData.hide.referenceHidden,
            escaped: expected.middlewareData.hide.escaped,
          },
          rect: { x: rect.x, y: rect.y },
          filtered,
          webkitFilterException: CSS.supports('-webkit-backdrop-filter', 'none'),
        };
      }, scenario);
      assert.equal(result.webkitFilterException, true, 'Must exercise the WebKit-specific filter branch');
      if (result.filtered) {
        // Preserve the pinned oracle's WebKit exception, including on newer WebKit builds.
        assert.deepEqual(result.actual, result.expected);
      } else if (scenario !== 'containedPopover') {
        assert.deepEqual(result.rect, { x: 330, y: 280 }, 'Surface must physically align with the target');
        assert.equal(result.actual.referenceHidden, false);
        assert.equal(result.actual.escaped, false);
      } else {
        assert.deepEqual(result.rect, { x: 200, y: 280 }, 'The top-layer ancestor must still constrain descendants');
      }
    } finally {
      await page.close();
    }
  });
}
