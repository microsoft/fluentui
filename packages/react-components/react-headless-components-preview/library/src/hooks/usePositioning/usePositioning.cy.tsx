import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider_unstable as Provider } from '@fluentui/react-shared-contexts';
import type { Alignment, Position } from '@fluentui/react-positioning';
import { usePositioning } from './usePositioning';
import type { UsePositioningOptions } from './types';

/**
 * Without CSS anchor positioning, or with options that need JavaScript, the container is positioned by `usePositioning()`
 * from `@fluentui/react-positioning`. Both must put it at the same place when there is enough room.
 */

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Scenario {
  options: UsePositioningOptions;
  /**
   * The direction of the document: CSS resolves logical values with the containing block, and
   * `@fluentui/react-positioning` uses the direction of the Fluent provider
   */
  dir?: 'ltr' | 'rtl';
  /** Renders an arrow, it needs JavaScript */
  arrow?: boolean;
  /** The height of the content of the container */
  height?: number;
}

interface Result {
  rect: Rect;
  anchorName: string;
  arrow: Rect | null;
  maxHeight: string;
}

const POSITIONS: Position[] = ['above', 'below', 'before', 'after'];
const ALIGNMENTS: Alignment[] = ['start', 'center', 'end'];
const ANCHOR = { left: 450, top: 300, width: 100, height: 40 };

const Content: React.FC<Scenario> = ({ options, arrow, height = 100 }) => {
  const { targetRef, containerRef, arrowRef } = usePositioning(options);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div ref={targetRef} data-testid="anchor" style={{ position: 'absolute', ...ANCHOR }} />
      <div ref={containerRef} data-testid="popup" style={{ background: 'lightgray' }}>
        <div style={{ width: 200, height }} />
        {arrow && <div ref={arrowRef} data-testid="arrow" style={{ position: 'absolute', width: 10, height: 10 }} />}
      </div>
    </div>
  );
};

const nextFrame = () =>
  new Promise<void>(resolve => {
    requestAnimationFrame(() => resolve());
  });

const toRect = (element: Element): Rect => {
  const { left, top, width, height } = element.getBoundingClientRect();
  return { left, top, width, height };
};

async function render(scenario: Scenario, withoutAnchors: boolean): Promise<Result> {
  const originalSupports = window.CSS.supports;

  if (withoutAnchors) {
    window.CSS.supports = () => false;
  }

  const host = document.createElement('div');
  document.body.appendChild(host);
  document.documentElement.dir = scenario.dir ?? 'ltr';
  const root = createRoot(host);

  try {
    root.render(
      <Provider value={{ dir: scenario.dir ?? 'ltr', targetDocument: document }}>
        <Content {...scenario} />
      </Provider>,
    );
    // Rendering, layout effects and position updates
    await nextFrame();
    await nextFrame();
    await nextFrame();

    const popup = host.querySelector('[data-testid="popup"]') as HTMLElement;
    const anchor = host.querySelector('[data-testid="anchor"]') as HTMLElement;
    const arrow = host.querySelector('[data-testid="arrow"]');

    return {
      rect: toRect(popup),
      anchorName: anchor.style.getPropertyValue('anchor-name'),
      arrow: arrow && toRect(arrow),
      maxHeight: popup.style.maxHeight,
    };
  } finally {
    root.unmount();
    host.remove();
    document.documentElement.removeAttribute('dir');
    window.CSS.supports = originalSupports;
  }
}

async function compare(scenarios: Array<[string, Scenario]>) {
  const mismatches: string[] = [];

  for (const [name, scenario] of scenarios) {
    const css = await render(scenario, false);
    const js = await render(scenario, true);

    if (!css.anchorName || js.anchorName) {
      mismatches.push(`${name}: anchor-name is "${css.anchorName}" with CSS and "${js.anchorName}" without`);
    }

    const keys: Array<keyof Rect> = ['left', 'top', 'width', 'height'];
    if (keys.some(key => Math.abs(css.rect[key] - js.rect[key]) > 1)) {
      mismatches.push(`${name}\n  css: ${JSON.stringify(css.rect)}\n  js:  ${JSON.stringify(js.rect)}`);
    }
  }

  return mismatches;
}

/**
 * Older versions of Chromium (Electron 130) center the container on the anchor in both axes with
 * `place-self: anchor-center`, the CSS path can't be compared with them for centered alignments.
 */
function supportsSafeAnchorCenter(): boolean {
  const probeAnchor = document.createElement('div');
  probeAnchor.style.cssText = 'position:absolute;left:100px;top:20px;width:20px;height:20px;anchor-name:--probe';
  const box = document.createElement('div');
  box.style.cssText =
    'position:fixed;inset:auto;margin:0;width:20px;height:100px;position-anchor:--probe;position-area:block-end;place-self:anchor-center';
  document.body.append(probeAnchor, box);
  const { top } = box.getBoundingClientRect();
  probeAnchor.remove();
  box.remove();

  // Centered on the anchor the box would start at -20px
  return top === 40;
}

describe('usePositioning', () => {
  beforeEach(() => {
    cy.viewport(1000, 700);
    document.body.style.margin = '0';
  });

  it('puts the container at the same place with CSS anchor positioning and @fluentui/react-positioning', () => {
    const scenarios: Array<[string, Scenario]> = [];
    const alignments = supportsSafeAnchorCenter() ? ALIGNMENTS : ALIGNMENTS.filter(align => align !== 'center');

    for (const position of POSITIONS) {
      for (const align of alignments) {
        scenarios.push([`${position}-${align}`, { options: { position, align } }]);
        scenarios.push([`${position}-${align} with offset`, { options: { position, align, offset: 8 } }]);
        scenarios.push([`${position}-${align} in rtl`, { options: { position, align }, dir: 'rtl' }]);
      }
    }

    scenarios.push(['coverTarget', { options: { position: 'below', align: 'start', coverTarget: true } }]);
    scenarios.push(['strategy: absolute', { options: { position: 'below', align: 'end', strategy: 'absolute' } }]);
    scenarios.push(['align: top', { options: { position: 'after', align: 'top' } }]);
    scenarios.push([
      'fallbackPositions',
      { options: { position: 'before', align: 'end', fallbackPositions: ['after-top'] } },
    ]);

    return cy.wrap(compare(scenarios), { timeout: 20000 }).should('deep.equal', []);
  });

  it('positions in JavaScript when there is an arrow', () => {
    return cy
      .wrap(render({ options: { position: 'below' }, arrow: true }, false), { timeout: 10000 })
      .should((result: Result) => {
        expect(result.anchorName).to.equal('');
        // Below the target, centered
        expect(result.rect).to.deep.equal({ left: 400, top: 340, width: 200, height: 100 });
        // The arrow points to the center of the target
        expect(result.arrow!.left + result.arrow!.width / 2).to.be.closeTo(ANCHOR.left + ANCHOR.width / 2, 1);
      });
  });

  it('positions in JavaScript with autoSize', () => {
    // There are 360px below the target
    return cy
      .wrap(render({ options: { position: 'below', autoSize: true, pinned: true }, height: 500 }, false), {
        timeout: 10000,
      })
      .should((result: Result) => {
        expect(result.anchorName).to.equal('');
        expect(result.maxHeight).to.equal('360px');
        expect(result.rect.top).to.equal(340);
        expect(result.rect.height).to.equal(360);
      });
  });
});
