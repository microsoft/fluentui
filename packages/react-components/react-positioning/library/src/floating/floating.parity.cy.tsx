/* eslint-disable @typescript-eslint/no-explicit-any */
import * as upstream from '@floating-ui/dom';
import * as local from './index';
import type { Placement } from './index';

/**
 * Parity checks between the inlined `floating` module and the upstream `@floating-ui/dom` it was ported from.
 * Both implementations measure the very same layout in a real browser, so any difference in the output is a regression.
 */

type Lib = 'local' | 'upstream';

interface ScenarioElements {
  reference: any;
  floating: HTMLElement;
  arrow?: HTMLElement;
  boundary?: HTMLElement;
  /** Document that owns the scenario, defaults to the test document */
  win?: Window;
}

type Scenario = (root: HTMLElement) => ScenarioElements;

const PLACEMENTS: Placement[] = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
];

function box(parent: Element, styles: Partial<CSSStyleDeclaration>, doc: Document = document): HTMLElement {
  const el = doc.createElement('div');
  Object.assign(el.style, styles);
  parent.appendChild(el);
  return el;
}

function createArrow(floating: HTMLElement): HTMLElement {
  return box(floating, { position: 'absolute', width: '10px', height: '10px', background: 'red' });
}

const floatingStyles: Partial<CSSStyleDeclaration> = {
  position: 'absolute',
  left: '0',
  top: '0',
  width: '200px',
  height: '120px',
  background: 'lightgray',
};

const bigFloatingStyles: Partial<CSSStyleDeclaration> = { ...floatingStyles, width: '420px', height: '360px' };

const referenceAt = (parent: HTMLElement, left: number, top: number): HTMLElement =>
  box(parent, {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '90px',
    height: '34px',
    background: 'blue',
  });

const scenarios: Record<string, Scenario> = {
  'viewport center': root => {
    const reference = referenceAt(root, 400, 300);
    const floating = box(root, floatingStyles);
    return { reference, floating, arrow: createArrow(floating) };
  },
  'viewport top-left corner': root => {
    const reference = referenceAt(root, 4, 6);
    const floating = box(root, floatingStyles);
    return { reference, floating, arrow: createArrow(floating) };
  },
  'viewport bottom-right corner overflowing': root => {
    const reference = referenceAt(root, window.innerWidth - 96, window.innerHeight - 40);
    const floating = box(root, bigFloatingStyles);
    return { reference, floating, arrow: createArrow(floating) };
  },
  'narrow reference, big floating': root => {
    const reference = box(root, { position: 'absolute', left: '30px', top: '200px', width: '8px', height: '8px' });
    const floating = box(root, bigFloatingStyles);
    return { reference, floating, arrow: createArrow(floating) };
  },
  'scroll container clipping the reference': root => {
    const container = box(root, {
      position: 'absolute',
      left: '200px',
      top: '120px',
      width: '320px',
      height: '180px',
      overflow: 'auto',
      border: '3px solid black',
    });
    const content = box(container, { position: 'relative', width: '900px', height: '900px' });
    const reference = referenceAt(content, 250, 150);
    container.scrollLeft = 120;
    container.scrollTop = 90;
    const floating = box(container, floatingStyles);
    return { reference, floating, arrow: createArrow(floating), boundary: container };
  },
  'scroll container, reference scrolled out of view': root => {
    const container = box(root, {
      position: 'relative',
      margin: '100px 0 0 100px',
      width: '300px',
      height: '160px',
      overflow: 'hidden',
    });
    const content = box(container, { position: 'relative', width: '800px', height: '800px' });
    const reference = referenceAt(content, 500, 500);
    const floating = box(root, floatingStyles);
    return { reference, floating, arrow: createArrow(floating), boundary: container };
  },
  'scaled & translated ancestor': root => {
    const container = box(root, {
      position: 'absolute',
      left: '150px',
      top: '90px',
      width: '500px',
      height: '300px',
      transform: 'translate(20px, 10px) scale(0.75)',
      transformOrigin: '0 0',
      border: '2px solid black',
    });
    const reference = referenceAt(container, 380, 20);
    const floating = box(container, floatingStyles);
    return { reference, floating, arrow: createArrow(floating), boundary: container };
  },
  'positioned offset parent with border, padding and scroll': root => {
    const container = box(root, {
      position: 'relative',
      margin: '80px 0 0 60px',
      width: '420px',
      height: '260px',
      overflow: 'scroll',
      border: '6px solid black',
      padding: '12px',
    });
    const content = box(container, { position: 'relative', width: '1000px', height: '1000px' });
    const reference = referenceAt(content, 300, 220);
    container.scrollTop = 60;
    container.scrollLeft = 40;
    const floating = box(container, floatingStyles);
    return { reference, floating, arrow: createArrow(floating), boundary: container };
  },
  'scrolled document': root => {
    const spacer = box(root, { position: 'absolute', left: '0', top: '0', width: '3000px', height: '3000px' });
    const reference = referenceAt(spacer, 700, 900);
    const floating = box(spacer, floatingStyles);
    window.scrollTo(520, 760);
    return { reference, floating, arrow: createArrow(floating) };
  },
  'virtual element': root => {
    const context = referenceAt(root, 300, 200);
    const floating = box(root, floatingStyles);
    const reference = {
      contextElement: context,
      getBoundingClientRect: () => ({
        x: 310,
        y: 220,
        left: 310,
        top: 220,
        width: 0,
        height: 0,
        right: 310,
        bottom: 220,
      }),
    };
    return { reference, floating, arrow: createArrow(floating) };
  },
  'floating in a popover (top layer)': root => {
    const reference = referenceAt(root, 500, 300);
    const floating = box(root, floatingStyles);
    floating.setAttribute('popover', 'manual');
    // Popover UA styles (inset, margin) are overridden by the inline position
    floating.style.margin = '0';
    if (typeof floating.showPopover === 'function') {
      floating.showPopover();
    }
    return { reference, floating, arrow: createArrow(floating) };
  },
  'shadow DOM': root => {
    const host = box(root, { position: 'absolute', left: '0', top: '0' });
    const shadow = host.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    Object.assign(wrapper.style, {
      position: 'relative',
      overflow: 'auto',
      width: '500px',
      height: '300px',
      margin: '60px',
    });
    shadow.appendChild(wrapper);
    const reference = referenceAt(wrapper, 350, 40);
    const floating = box(wrapper, floatingStyles);
    return { reference, floating, arrow: createArrow(floating), boundary: wrapper };
  },
  'reference inside an iframe': root => {
    const iframe = document.createElement('iframe');
    Object.assign(iframe.style, {
      position: 'absolute',
      left: '140px',
      top: '110px',
      width: '420px',
      height: '260px',
      border: '4px solid black',
      padding: '0',
    });
    root.appendChild(iframe);
    const reference = referenceAt(iframe.contentDocument!.body, 200, 100);
    reference.ownerDocument.body.style.margin = '0';
    const floating = box(root, floatingStyles);
    return { reference, floating, arrow: createArrow(floating) };
  },
  'floating inside an iframe': root => {
    const iframe = document.createElement('iframe');
    Object.assign(iframe.style, {
      position: 'absolute',
      left: '140px',
      top: '110px',
      width: '420px',
      height: '260px',
      border: '4px solid black',
    });
    root.appendChild(iframe);
    const doc = iframe.contentDocument!;
    doc.body.style.margin = '0';
    const reference = referenceAt(doc.body, 200, 100);
    const floating = box(doc.body, floatingStyles, doc);
    return { reference, floating, arrow: createArrow(floating) };
  },
};

type Config = (lib: Lib, els: ScenarioElements) => Array<Record<string, any>>;

const sizeApply = ({ elements, availableWidth, availableHeight }: any) => {
  Object.assign(elements.floating.style, {
    maxWidth: `${Math.max(0, availableWidth)}px`,
    maxHeight: `${Math.max(0, availableHeight)}px`,
  });
};

const probe = (lib: Lib, name: string, options: any): Record<string, any> => ({
  name,
  fn: (state: any) =>
    lib === 'local'
      ? { data: { overflow: local.detectOverflow(state, options) } }
      : upstream.detectOverflow(state, options).then(overflow => ({ data: { overflow } })),
});

const middlewareConfigs: Record<string, Config> = {
  'offset, flip, shift, arrow, hide': (lib, els) => {
    const m: any = lib === 'local' ? local : upstream;
    return [
      m.offset(8),
      m.flip({ fallbackPlacements: undefined }),
      m.shift({ padding: 6 }),
      els.arrow && m.arrow({ element: els.arrow, padding: 6 }),
      m.hide({ strategy: 'referenceHidden' }),
      m.hide({ strategy: 'escaped' }),
    ];
  },
  'object offset, explicit fallbacks, cross-axis limited shift, size': (lib, els) => {
    const m: any = lib === 'local' ? local : upstream;
    const limiter = m.limitShift({ crossAxis: true, mainAxis: false });
    return [
      m.offset({ mainAxis: 4, crossAxis: 2, alignmentAxis: 3 }),
      m.flip({ fallbackPlacements: ['top', 'right-end', 'left-start'] }),
      m.shift({ crossAxis: true, limiter }),
      m.size({ apply: sizeApply }),
      els.arrow && m.arrow({ element: els.arrow, padding: 4 }),
      m.hide({ strategy: 'referenceHidden' }),
      m.hide({ strategy: 'escaped' }),
    ];
  },
  'function offset, tethered shift': (lib, els) => {
    const m: any = lib === 'local' ? local : upstream;
    return [
      m.offset(({ rects, placement }: any) => ({
        mainAxis: rects.floating.height / 10,
        crossAxis: placement.includes('-') ? 5 : 0,
      })),
      m.flip(),
      m.shift({ limiter: m.limitShift() }),
      els.arrow && m.arrow({ element: els.arrow }),
    ];
  },
  'custom boundaries and padding': (lib, els) => {
    const m: any = lib === 'local' ? local : upstream;
    const boundary = els.boundary ?? 'clippingAncestors';
    const boundaryList = els.boundary ? [els.boundary] : 'clippingAncestors';
    return [
      m.offset(6),
      m.flip({ boundary, altBoundary: true, padding: { top: 4, left: 8 } }),
      m.shift({ boundary: boundaryList, padding: { bottom: 10, right: 3 } }),
      m.size({ boundary: { x: 20, y: 20, width: 500, height: 300 }, apply: sizeApply }),
      m.hide({ strategy: 'escaped', boundary }),
    ];
  },
  'detectOverflow probes': (lib, els) => [
    probe(lib, 'probeFloating', {}),
    probe(lib, 'probeReference', { elementContext: 'reference' }),
    probe(lib, 'probeAlt', { altBoundary: true, padding: 7 }),
    probe(lib, 'probeBoundary', els.boundary ? { boundary: els.boundary } : {}),
    probe(lib, 'probeRect', { boundary: { x: 10, y: 10, width: 300, height: 200 } }),
  ],
};

function collectDiffs(a: any, b: any, path: string, diffs: string[]): void {
  if (typeof a === 'number' && typeof b === 'number') {
    // NaN, Infinity and tiny float noise should match as well
    if (!(Object.is(a, b) || Math.abs(a - b) < 1e-6)) {
      diffs.push(`${path}: local=${a} upstream=${b}`);
    }
    return;
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    keys.forEach(key => collectDiffs(a[key], b[key], `${path}.${key}`, diffs));
    return;
  }
  if (a !== b) {
    diffs.push(`${path}: local=${String(a)} upstream=${String(b)}`);
  }
}

const normalize = (result: any) => JSON.parse(JSON.stringify({ ...result }, (_, v) => (v === undefined ? null : v)));

async function run(
  lib: Lib,
  scenarioName: string,
  configName: string,
  placement: Placement,
  strategy: 'absolute' | 'fixed',
  dir: 'ltr' | 'rtl',
) {
  const root = box(document.body, { position: 'relative', width: '100%', height: '100%' });
  document.documentElement.dir = dir;
  document.documentElement.scrollTo(0, 0);
  window.scrollTo(0, 0);

  try {
    const els = scenarios[scenarioName](root);
    els.floating.style.position = strategy;
    const middleware = middlewareConfigs[configName](lib, els).filter(Boolean);
    const result: any =
      lib === 'local'
        ? local.computePosition(els.reference, els.floating, { placement, strategy, middleware: middleware as any })
        : await upstream.computePosition(els.reference, els.floating, {
            placement,
            strategy,
            middleware: middleware as any,
          });
    return normalize(result);
  } finally {
    root.remove();
    window.scrollTo(0, 0);
    document.documentElement.removeAttribute('dir');
  }
}

describe('floating (inlined Floating UI) parity with @floating-ui/dom', () => {
  beforeEach(() => {
    cy.viewport(1000, 700);
    document.body.style.margin = '0';
  });

  Object.keys(scenarios).forEach(scenarioName => {
    Object.keys(middlewareConfigs).forEach(configName => {
      it(`${scenarioName} | ${configName}`, () => {
        const mismatches: string[] = [];
        let compared = 0;

        const runAll = async () => {
          for (const strategy of ['absolute', 'fixed'] as const) {
            for (const dir of ['ltr', 'rtl'] as const) {
              for (const placement of PLACEMENTS) {
                const actual = await run('local', scenarioName, configName, placement, strategy, dir);
                const expected = await run('upstream', scenarioName, configName, placement, strategy, dir);
                const diffs: string[] = [];
                collectDiffs(actual, expected, '', diffs);
                compared++;
                if (diffs.length) {
                  mismatches.push(`[${placement} ${strategy} ${dir}] ${diffs.join('; ')}`);
                }
              }
            }
          }
        };

        return cy.wrap(runAll(), { timeout: 30000 }).then(() => {
          expect(compared).to.equal(PLACEMENTS.length * 4);
          expect(mismatches, mismatches.slice(0, 5).join('\n')).to.have.length(0);
        });
      });
    });
  });
});
