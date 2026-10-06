import * as React from 'react';
import { createRoot } from 'react-dom/client';
import type { Alignment, Position, PositioningShorthandValue } from '@fluentui/react-positioning';
import { usePositioning } from '../usePositioning';
import type { PositioningProps } from '../types';

/**
 * The JavaScript fallback is compared with what the browser does with CSS anchor positioning: the same component is rendered
 * twice, once as usual and once pretending that the browser doesn't support anchor positioning, and the rects must match.
 */

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Scenario {
  options: PositioningProps;
  anchor: Rect;
  popup: { width: number; height: number };
  dir?: 'ltr' | 'rtl';
  /** Wraps the content in an element that creates a containing block */
  wrapper?: React.CSSProperties;
  /** Renders an arrow */
  arrow?: boolean;
}

const POSITIONS: Position[] = ['above', 'below', 'before', 'after'];
const ALIGNMENTS: Alignment[] = ['start', 'center', 'end'];

const Content: React.FC<Scenario> = ({ options, anchor, popup, dir, wrapper, arrow }) => {
  const { targetRef, containerRef, arrowRef } = usePositioning(options);

  const content = (
    <>
      <div ref={targetRef} data-testid="anchor" style={{ position: 'absolute', ...anchor }} />
      <div ref={containerRef} data-testid="popup" style={{ background: 'lightgray' }}>
        {/* The hook controls the width of the container, the size comes from the content */}
        <div style={{ width: options.matchTargetSize === 'width' ? '100%' : popup.width, height: popup.height }} />
        {arrow && <div ref={arrowRef} data-testid="arrow" style={{ position: 'absolute', width: 10, height: 10 }} />}
      </div>
    </>
  );

  return (
    <div dir={dir} style={{ position: 'absolute', inset: 0 }}>
      {wrapper ? <div style={wrapper}>{content}</div> : content}
    </div>
  );
};

const nextFrame = () =>
  new Promise<void>(resolve => {
    requestAnimationFrame(() => resolve());
  });

interface Result {
  rect: Rect;
  details: { arrow: string | null; maxHeight: string; maxWidth: string; hidden: boolean; escaped: boolean };
}

async function render(scenario: Scenario, fallback: boolean): Promise<Result> {
  const win = window;
  const originalSupports = win.CSS.supports;

  if (fallback) {
    // Anchor positioning is not supported
    win.CSS.supports = () => false;
  }

  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);

  try {
    root.render(<Content {...scenario} />);
    // Rendering, layout effects and position updates
    await nextFrame();
    await nextFrame();
    await nextFrame();

    const popup = host.querySelector<HTMLElement>('[data-testid="popup"]') as HTMLElement;
    const { left, top, width, height } = popup.getBoundingClientRect();

    const arrowElement = host.querySelector<HTMLElement>('[data-testid="arrow"]');

    return {
      rect: { left, top, width, height },
      details: {
        arrow: arrowElement && `${arrowElement.style.left}|${arrowElement.style.top}`,
        maxHeight: popup.style.maxHeight,
        maxWidth: popup.style.maxWidth,
        hidden: popup.hasAttribute('data-positioning-hidden'),
        escaped: popup.hasAttribute('data-positioning-escaped'),
      },
    };
  } finally {
    root.unmount();
    host.remove();
    win.CSS.supports = originalSupports;
  }
}

async function compare(scenarios: Array<[string, Scenario]>, tolerance = 1) {
  const mismatches: string[] = [];

  for (const [name, scenario] of scenarios) {
    const css = await render(scenario, false);
    const js = await render(scenario, true);

    const diff = (key: keyof Rect) => Math.abs(css.rect[key] - js.rect[key]);
    if (
      diff('left') > tolerance ||
      diff('top') > tolerance ||
      diff('width') > tolerance ||
      diff('height') > tolerance
    ) {
      mismatches.push(`${name}\n  css: ${JSON.stringify(css.rect)}\n  js:  ${JSON.stringify(js.rect)}`);
    } else if (JSON.stringify(css.details) !== JSON.stringify(js.details)) {
      mismatches.push(`${name}\n  css: ${JSON.stringify(css.details)}\n  js:  ${JSON.stringify(js.details)}`);
    }
  }

  return mismatches;
}

const anchor = { left: 450, top: 300, width: 100, height: 40 };
const popup = { width: 200, height: 100 };

// A pseudo random generator, the scenarios are the same on every run
function createRandom(seed: number) {
  let state = seed;
  const next = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  return {
    int: (min: number, max: number) => Math.floor(min + next() * (max - min + 1)),
    pick: <T,>(values: T[]): T => values[Math.floor(next() * values.length)],
    chance: (probability: number) => next() < probability,
  };
}

/**
 * The fallback follows current browsers: older versions of Chromium let boxes overflow the viewport and center them on the anchor
 * with `place-self: anchor-center`, and the results can't be compared with them.
 */
function supportsSafeAlignment(): boolean {
  if (typeof CSS === 'undefined' || !CSS.supports('anchor-name: --a') || !CSS.supports('position-area: top')) {
    return false;
  }

  const probeAnchor = document.createElement('div');
  probeAnchor.style.cssText = 'position:absolute;left:100px;top:20px;width:20px;height:20px;anchor-name:--probe';
  const box = document.createElement('div');
  box.style.cssText =
    'position:fixed;inset:auto;margin:0;width:20px;height:100px;position-anchor:--probe;position-area:block-start';
  document.body.append(probeAnchor, box);
  const { top } = box.getBoundingClientRect();
  probeAnchor.remove();
  box.remove();

  // Above the anchor the box would start at -80px
  return top === 0;
}

describe('usePositioning fallback', () => {
  before(function () {
    // There is nothing to compare with
    if (!supportsSafeAlignment()) {
      this.skip();
    }
  });

  beforeEach(() => {
    cy.viewport(1000, 700);
    document.body.style.margin = '0';
  });

  it('matches every position and alignment', () => {
    const scenarios: Array<[string, Scenario]> = [];
    for (const position of POSITIONS) {
      for (const align of ALIGNMENTS) {
        scenarios.push([`${position}-${align}`, { options: { position, align }, anchor, popup }]);
        scenarios.push([
          `${position}-${align} with offset`,
          { options: { position, align, offset: 8 }, anchor, popup },
        ]);
        scenarios.push([
          `${position}-${align} with a cross offset`,
          { options: { position, align, offset: { mainAxis: 6, crossAxis: 3 } }, anchor, popup },
        ]);
        scenarios.push([`${position}-${align} in rtl`, { options: { position, align }, anchor, popup, dir: 'rtl' }]);
      }
    }

    return cy.wrap(compare(scenarios), { timeout: 20000 }).should('deep.equal', []);
  });

  it('matches flipping close to the edges of the viewport', () => {
    const scenarios: Array<[string, Scenario]> = [];
    const edges: Array<[string, Rect]> = [
      ['top', { left: 450, top: 20, width: 100, height: 40 }],
      ['bottom', { left: 450, top: 640, width: 100, height: 40 }],
      ['left', { left: 10, top: 300, width: 100, height: 40 }],
      ['right', { left: 890, top: 300, width: 100, height: 40 }],
      ['top left', { left: 10, top: 20, width: 100, height: 40 }],
      ['bottom right', { left: 890, top: 640, width: 100, height: 40 }],
    ];

    for (const [edge, edgeAnchor] of edges) {
      for (const position of POSITIONS) {
        for (const align of ALIGNMENTS) {
          for (const dir of ['ltr', 'rtl'] as const) {
            scenarios.push([
              `${position}-${align} at ${edge} (${dir})`,
              { options: { position, align, offset: 4 }, anchor: edgeAnchor, popup, dir },
            ]);
          }
        }
      }
    }

    return cy.wrap(compare(scenarios), { timeout: 20000 }).should('deep.equal', []);
  });

  it('matches custom fallbackPositions and pinned', () => {
    const fallbacks: PositioningShorthandValue[][] = [
      ['after', 'below'],
      ['before-top', 'above'],
      ['below-end', 'above-start'],
    ];
    const scenarios: Array<[string, Scenario]> = [];
    const edgeAnchors: Rect[] = [
      { left: 450, top: 20, width: 100, height: 40 },
      { left: 890, top: 640, width: 100, height: 40 },
    ];

    edgeAnchors.forEach((edgeAnchor, index) => {
      for (const position of POSITIONS) {
        for (const align of ALIGNMENTS) {
          fallbacks.forEach((fallbackPositions, fallbacksIndex) => {
            scenarios.push([
              `${position}-${align} with fallbacks ${fallbacksIndex} at ${index}`,
              { options: { position, align, fallbackPositions }, anchor: edgeAnchor, popup },
            ]);
          });
          scenarios.push([
            `${position}-${align} pinned at ${index}`,
            { options: { position, align, pinned: true }, anchor: edgeAnchor, popup },
          ]);
        }
      }
    });

    return cy.wrap(compare(scenarios), { timeout: 20000 }).should('deep.equal', []);
  });

  it('matches coverTarget and matchTargetSize', () => {
    const scenarios: Array<[string, Scenario]> = [];

    for (const position of POSITIONS) {
      for (const align of ALIGNMENTS) {
        scenarios.push([
          `${position}-${align} cover`,
          { options: { position, align, coverTarget: true }, anchor, popup: { width: 60, height: 20 } },
        ]);
        scenarios.push([
          `${position}-${align} cover with offset`,
          { options: { position, align, coverTarget: true, offset: 4 }, anchor, popup: { width: 60, height: 20 } },
        ]);
        scenarios.push([
          `${position}-${align} match width`,
          { options: { position, align, matchTargetSize: 'width' }, anchor, popup },
        ]);
      }
    }

    return cy.wrap(compare(scenarios), { timeout: 20000 }).should('deep.equal', []);
  });

  it('matches positions inside a containing block', () => {
    const wrappers: Array<[string, React.CSSProperties, 'absolute' | 'fixed']> = [
      ['positioned parent', { position: 'relative', margin: '120px 0 0 140px', width: 500, height: 300 }, 'absolute'],
      [
        'positioned parent with border and padding',
        {
          position: 'relative',
          margin: '80px 0 0 60px',
          width: 500,
          height: 300,
          border: '6px solid black',
          padding: 10,
        },
        'absolute',
      ],
      [
        'scrolled parent',
        { position: 'relative', margin: '80px 0 0 60px', width: 500, height: 300, overflow: 'auto' },
        'absolute',
      ],
      [
        'transformed parent (fixed)',
        { margin: '80px 0 0 60px', width: 500, height: 300, transform: 'translate(10px, 20px)' },
        'fixed',
      ],
      [
        'filtered parent (absolute)',
        { margin: '80px 0 0 60px', width: 500, height: 300, filter: 'blur(0px)' },
        'absolute',
      ],
    ];
    const scenarios: Array<[string, Scenario]> = [];

    for (const [name, wrapper, strategy] of wrappers) {
      for (const position of POSITIONS) {
        for (const align of ALIGNMENTS) {
          scenarios.push([
            `${name}: ${position}-${align}`,
            {
              options: { position, align, strategy, offset: 4 },
              anchor: { left: 200, top: 120, width: 100, height: 40 },
              popup: { width: 160, height: 80 },
              wrapper,
            },
          ]);
        }
      }
      scenarios.push([
        `${name}: flips near the edge`,
        {
          options: { position: 'above', align: 'start', strategy },
          anchor: { left: 440, top: 30, width: 60, height: 40 },
          popup: { width: 160, height: 80 },
          wrapper,
        },
      ]);
    }

    return cy.wrap(compare(scenarios), { timeout: 20000 }).should('deep.equal', []);
  });

  it('matches the plugins that work with both', () => {
    const scenarios: Array<[string, Scenario]> = [];

    for (const position of POSITIONS) {
      for (const align of ALIGNMENTS) {
        scenarios.push([
          `${position}-${align} arrow`,
          { options: { position, align, arrowPadding: 6, offset: 8 }, anchor, popup, arrow: true },
        ]);
        scenarios.push([
          `${position}-${align} arrow at the edge`,
          {
            options: { position, align, arrowPadding: 6 },
            anchor: { left: 880, top: 20, width: 100, height: 40 },
            popup,
            arrow: true,
          },
        ]);
        scenarios.push([
          `${position}-${align} autoSize`,
          {
            options: { position, align, autoSize: true, offset: 4, pinned: true },
            anchor: { left: 450, top: 150, width: 100, height: 40 },
            popup: { width: 300, height: 600 },
          },
        ]);
      }
    }

    for (const top of [20, 220, 420]) {
      scenarios.push([
        `target at ${top} in a scrolled container`,
        {
          options: { position: 'below', align: 'center' },
          anchor: { left: 40, top, width: 60, height: 30 },
          popup: { width: 120, height: 60 },
          wrapper: { position: 'relative', margin: '100px 0 0 100px', width: 300, height: 150, overflow: 'hidden' },
        },
      ]);
    }

    return cy.wrap(compare(scenarios), { timeout: 30000 }).should('deep.equal', []);
  });

  it('matches random scenarios', () => {
    const random = createRandom(7);
    const scenarios: Array<[string, Scenario]> = [];

    // Anchors that stick out of the viewport are not covered, the browser has special cases for them
    const randomAnchor = (generator: ReturnType<typeof createRandom>): Rect => {
      const width = generator.int(20, 150);
      const height = generator.int(20, 80);
      return { left: generator.int(20, 980 - width), top: generator.int(20, 680 - height), width, height };
    };

    for (let index = 0; index < 300; index++) {
      const options: PositioningProps = {
        position: random.pick(POSITIONS),
        align: random.pick(ALIGNMENTS),
        offset: random.chance(0.4) ? { mainAxis: random.pick([0, 8]), crossAxis: random.pick([0, 4]) } : undefined,
        pinned: random.chance(0.1),
        coverTarget: random.chance(0.1),
      };
      scenarios.push([
        `random ${index} ${JSON.stringify(options)}`,
        {
          options,
          anchor: randomAnchor(random),
          popup: { width: random.int(50, 260), height: random.int(30, 220) },
          dir: random.chance(0.2) ? 'rtl' : 'ltr',
        },
      ]);
    }

    return cy.wrap(compare(scenarios), { timeout: 30000 }).should('deep.equal', []);
  });
});
