import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { usePositioning } from './usePositioning';
import type {
  Alignment,
  OnPositioningEndEventDetail,
  Position,
  PositioningBoundary,
  PositioningImperativeRef,
  PositioningOptions,
  PositioningProps,
  PositioningRect,
} from './types';
import { geometryBaseline } from './usePositioning.geometry-baseline.cy';

type Scenario = {
  name: string;
  dir?: 'ltr' | 'rtl';
  options?: PositioningOptions;
  target?: Partial<PositioningRect>;
  floating?: { width: number; height: number };
  arrow?: boolean;
  boundary?: 'rect' | 'element' | 'array' | 'window' | 'scrollParent' | 'clippingParents';
  boundaryMode?: 'flip' | 'overflow';
  host?: 'scroll' | 'scale' | 'transform';
  virtual?: boolean;
  dpr?: number;
  intrinsic?: boolean;
  updateStateOnEnd?: boolean;
};

// All dimensions in this fixture are deliberate geometry inputs, not product styling.
const positions: Position[] = ['above', 'below', 'before', 'after'];
const alignments: Alignment[] = ['top', 'bottom', 'start', 'end', 'center'];
const scenarios: Scenario[] = [];
for (const dir of ['ltr', 'rtl'] as const) {
  for (const position of positions) {
    for (const align of alignments) {
      scenarios.push({ name: `${dir}-${position}-${align}`, dir, options: { position, align } });
    }
  }
}

scenarios.push(
  { name: 'defaults' },
  { name: 'flip-bottom-edge', target: { y: 560 } },
  { name: 'flip-top-edge', target: { y: 0 }, options: { position: 'above', align: 'start' } },
  { name: 'flip-left-edge', target: { x: 0 }, options: { position: 'before', align: 'top' } },
  { name: 'flip-right-edge', target: { x: 740 }, options: { position: 'after', align: 'bottom' } },
  { name: 'flip-alignment', target: { x: 760 }, options: { align: 'start' } },
  { name: 'pinned-bottom', target: { y: 560 }, options: { pinned: true } },
  { name: 'pinned-still-shifts', target: { x: 780 }, options: { pinned: true, align: 'start' } },
  {
    name: 'fallback-first-fit',
    target: { y: 560 },
    options: { fallbackPositions: ['after-top', 'above-start', 'before-bottom'] },
  },
  {
    name: 'fallback-reversed',
    target: { y: 560 },
    options: { fallbackPositions: ['before-bottom', 'above-start', 'after-top'] },
  },
  {
    name: 'fallback-best-fit',
    target: { x: 360, y: 280 },
    floating: { width: 500, height: 400 },
    options: { fallbackPositions: ['after-top', 'above', 'before-bottom'] },
  },
  {
    name: 'fallback-rtl',
    dir: 'rtl',
    target: { y: 560 },
    options: { fallbackPositions: ['after-top', 'above-start'] },
  },
  { name: 'shift-left', target: { x: -40 } },
  { name: 'shift-right', target: { x: 780 } },
  { name: 'tether-default', target: { y: 650 }, options: { pinned: true } },
  // The boolean form adds cross-axis limiting; this centered placement already overlaps the target.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  { name: 'tether-disabled', target: { y: 650 }, options: { pinned: true, unstable_disableTether: true } },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  { name: 'tether-disabled-all', target: { y: 650 }, options: { pinned: true, unstable_disableTether: 'all' } },
  { name: 'shift-to-cover', target: { y: 570 }, options: { pinned: true, shiftToCoverTarget: true } },
  { name: 'shift-to-cover-limit', target: { y: 650 }, options: { pinned: true, shiftToCoverTarget: true } },
  { name: 'offset-zero', options: { offset: 0 } },
  { name: 'offset-positive', options: { offset: 13 } },
  { name: 'offset-negative', options: { position: 'above', offset: -11 } },
  { name: 'offset-object', options: { align: 'start', offset: { mainAxis: 9, crossAxis: 17 } } },
  { name: 'offset-object-rtl', dir: 'rtl', options: { align: 'start', offset: { mainAxis: 9, crossAxis: 17 } } },
  { name: 'offset-horizontal', options: { position: 'before', offset: { mainAxis: 9, crossAxis: -17 } } },
  {
    name: 'offset-function',
    options: {
      position: 'above',
      align: 'end',
      offset: ({ targetRect, positionedRect, position, alignment }) => ({
        mainAxis: targetRect.height / 4 + (position === 'above' ? 3 : 0),
        crossAxis: positionedRect.width / 10 + (alignment === 'end' ? 5 : 0),
      }),
    },
  },
  { name: 'offset-function-number', options: { offset: ({ targetRect }) => targetRect.width / 8 } },
  { name: 'offset-flipped', target: { y: 560 }, options: { offset: 12 } },
  { name: 'arrow-centered', arrow: true },
  { name: 'arrow-start', arrow: true, options: { align: 'start', offset: 10 } },
  { name: 'arrow-horizontal', arrow: true, options: { position: 'after', align: 'top' } },
  { name: 'arrow-padding', arrow: true, target: { width: 4 }, options: { align: 'start', arrowPadding: 20 } },
  { name: 'arrow-shift', arrow: true, target: { x: 780 }, options: { pinned: true } },
  { name: 'arrow-flip', arrow: true, target: { y: 560 } },
  { name: 'boundary-rect', boundary: 'rect', target: { x: 470, y: 370 } },
  { name: 'boundary-element', boundary: 'element', target: { x: 470, y: 370 } },
  { name: 'boundary-array', boundary: 'array', target: { x: 470, y: 370 } },
  { name: 'boundary-flip-only', boundary: 'rect', boundaryMode: 'flip', target: { x: 470, y: 370 } },
  { name: 'boundary-overflow-only', boundary: 'rect', boundaryMode: 'overflow', target: { x: 470, y: 370 } },
  { name: 'boundary-window', boundary: 'window', target: { x: 780, y: 560 } },
  { name: 'boundary-scroll-parent', boundary: 'scrollParent', host: 'scroll', target: { x: 350, y: 250 } },
  { name: 'boundary-clipping', boundary: 'clippingParents', host: 'scroll', target: { x: 350, y: 250 } },
  { name: 'padding-number', target: { x: 780 }, options: { overflowBoundaryPadding: 16 } },
  {
    name: 'padding-logical-ltr',
    target: { x: 780 },
    options: { overflowBoundaryPadding: { start: 11, end: 27, top: 13, bottom: 19 } },
  },
  {
    name: 'padding-logical-rtl',
    dir: 'rtl',
    target: { x: 780 },
    options: { overflowBoundaryPadding: { start: 11, end: 27, top: 13, bottom: 19 } },
  },
  { name: 'padding-partial', target: { x: -40 }, options: { overflowBoundaryPadding: { start: 23 } } },
  { name: 'match-width', options: { matchTargetSize: 'width' } },
  { name: 'match-intrinsic-width', intrinsic: true, options: { matchTargetSize: 'width' } },
  { name: 'match-width-horizontal', options: { position: 'after', matchTargetSize: 'width' } },
  ...positions.map(position => ({
    name: `cover-${position}`,
    options: { position, coverTarget: true },
  })),
  ...([true, 'height', 'width', 'always', 'height-always', 'width-always', false] as const).map(autoSize => ({
    name: `auto-size-${autoSize}`,
    floating: { width: 900, height: 700 },
    options: { autoSize, pinned: true, overflowBoundaryPadding: 12 },
  })),
  { name: 'auto-size-boundary', boundary: 'rect', floating: { width: 600, height: 500 }, options: { autoSize: true } },
  { name: 'auto-size-match', options: { autoSize: true, matchTargetSize: 'width' } },
  { name: 'strategy-absolute', options: { strategy: 'absolute' } },
  { name: 'strategy-fixed', options: { strategy: 'fixed' } },
  { name: 'strategy-deprecated-fixed', options: { positionFixed: true } },
  { name: 'no-transform-absolute', options: { strategy: 'absolute', useTransform: false } },
  { name: 'no-transform-fixed', options: { strategy: 'fixed', useTransform: false } },
  { name: 'no-transform-fixed-rtl', dir: 'rtl', options: { strategy: 'fixed', useTransform: false, align: 'start' } },
  ...[1, 1.25, 1.5, 2, 3].flatMap(dpr =>
    [true, false].map(useTransform => ({
      name: `fractional-dpr-${dpr}-transform-${useTransform}`,
      dpr,
      target: { x: 300.25, y: 240.25, width: 80.5, height: 40.5 },
      floating: { width: 120.25, height: 60.25 },
      options: { useTransform },
    })),
  ),
  { name: 'nested-scroll', host: 'scroll' },
  { name: 'scaled-containing-block', host: 'scale' },
  { name: 'transformed-containing-block', host: 'transform' },
  { name: 'fixed-transformed-containing-block', host: 'transform', options: { strategy: 'fixed' } },
  { name: 'virtual-target', virtual: true },
  { name: 'virtual-zero-size', virtual: true, target: { width: 0, height: 0 } },
  { name: 'hidden-target', host: 'scroll', target: { x: 450, y: 500 } },
  { name: 'partially-clipped', host: 'scroll', target: { y: 280 }, options: { pinned: true } },
);

type Controls = {
  positioning: PositioningImperativeRef | null;
  setOptions: React.Dispatch<React.SetStateAction<PositioningOptions & PositioningProps>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  rerender: () => void;
  events: OnPositioningEndEventDetail[];
};

const Fixture = ({ scenario, controls }: { scenario: Scenario; controls: Controls }) => {
  const { targetDocument } = useFluent_unstable();
  const [options, setOptions] = React.useState<PositioningOptions & PositioningProps>(scenario.options ?? {});
  const [visible, setVisible] = React.useState(true);
  const [endCount, setEndCount] = React.useState(0);
  const [, forceRender] = React.useReducer(n => n + 1, 0);
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const target = { x: 300, y: 240, width: 80, height: 40, ...scenario.target };
  const floating = scenario.floating ?? { width: 120, height: 60 };
  const layoutBaseline =
    scenario.dpr !== undefined && scenario.options?.useTransform === false
      ? geometryBaseline[scenario.name]
      : undefined;
  const virtualTarget = React.useMemo(
    () => ({
      getBoundingClientRect: () => ({
        ...target,
        top: target.y,
        left: target.x,
        right: target.x + target.width,
        bottom: target.y + target.height,
      }),
      contextElement: targetDocument?.body,
    }),
    // Geometry is fixed for the lifetime of a mounted scenario.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  let resolvedBoundary: PositioningBoundary | undefined;
  if (scenario.boundary === 'rect') {
    resolvedBoundary = { x: 100, y: 100, width: 400, height: 300 };
  } else if (scenario.boundary === 'element' || scenario.boundary === 'array') {
    const innerBoundary = boundary?.querySelector<HTMLElement>('[data-inner-boundary]');
    resolvedBoundary = boundary
      ? scenario.boundary === 'array' && innerBoundary
        ? [boundary, innerBoundary]
        : boundary
      : undefined;
  } else {
    resolvedBoundary = scenario.boundary;
  }
  const refs = usePositioning({
    position: 'below',
    ...options,
    ...(resolvedBoundary && scenario.boundaryMode !== 'overflow' && { flipBoundary: resolvedBoundary }),
    ...(resolvedBoundary && scenario.boundaryMode !== 'flip' && { overflowBoundary: resolvedBoundary }),
    ...(scenario.virtual && { target: virtualTarget }),
    positioningRef: value => {
      controls.positioning = value;
    },
    onPositioningEnd: event => {
      controls.events.push(event.detail);
      // Bound a broken engine's feedback loop so the regression fails rather than hanging capture.
      if (scenario.updateStateOnEnd && endCount < 32) {
        setEndCount(endCount + 1);
      }
      options.onPositioningEnd?.(event);
    },
  });
  controls.setOptions = setOptions;
  controls.setVisible = setVisible;
  controls.rerender = forceRender;

  return (
    <div
      data-enabled={options.enabled !== false}
      style={{ position: 'fixed', inset: 0, direction: scenario.dir ?? 'ltr' }}
    >
      <style>{'[data-host]::-webkit-scrollbar, [data-floating]::-webkit-scrollbar { display: none; }'}</style>
      <div
        ref={setBoundary}
        data-boundary=""
        style={{ position: 'absolute', left: 100, top: 100, width: 400, height: 300, pointerEvents: 'none' }}
      >
        <div data-inner-boundary="" style={{ position: 'absolute', left: 50, top: 20, width: 300, height: 240 }} />
      </div>
      <div
        data-host=""
        style={{
          position: 'absolute',
          left: scenario.host ? 40 : 0,
          top: scenario.host ? 30 : 0,
          width: scenario.host === 'scroll' ? 400 : 800,
          height: scenario.host === 'scroll' ? 300 : 600,
          overflow: scenario.host === 'scroll' ? 'auto' : undefined,
          scrollbarWidth: 'none',
          transform:
            scenario.host === 'scale'
              ? 'scale(1.25)'
              : scenario.host === 'transform'
              ? 'translate(25px, 15px)'
              : undefined,
          transformOrigin: 'top left',
        }}
      >
        <div style={{ position: 'relative', width: scenario.host === 'scroll' ? 900 : 800, height: 900 }}>
          {layoutBaseline && (
            <div
              data-layout-reference=""
              style={{
                position: 'absolute',
                left: layoutBaseline.left,
                top: layoutBaseline.top,
                width: `${layoutBaseline.width}px`,
                height: `${layoutBaseline.height}px`,
                visibility: 'hidden',
                pointerEvents: 'none',
              }}
            />
          )}
          <div
            data-target=""
            ref={refs.targetRef}
            style={{ position: 'absolute', left: target.x, top: target.y, width: target.width, height: target.height }}
          />
          {visible && (
            <div
              data-floating=""
              ref={refs.containerRef}
              style={{
                position: 'absolute',
                width: scenario.intrinsic ? undefined : floating.width,
                height: floating.height,
                scrollbarWidth: 'none',
              }}
            >
              <div style={{ width: floating.width, height: floating.height }} />
              {scenario.arrow && (
                <div data-arrow="" ref={refs.arrowRef} style={{ position: 'absolute', width: 10, height: 10 }} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function mountScenario(scenario: Scenario) {
  const controls: Controls = {
    positioning: null,
    setOptions: () => undefined,
    setVisible: () => undefined,
    rerender: () => undefined,
    events: [],
  };
  cy.window().then(win => {
    // Exercise the real DPR rounding branch without replacing any geometry APIs or engine code.
    Object.defineProperty(win, 'devicePixelRatio', { configurable: true, value: scenario.dpr ?? 1 });
  });
  mount(
    <FluentProvider dir={scenario.dir ?? 'ltr'}>
      <Fixture scenario={scenario} controls={controls} />
    </FluentProvider>,
  );
  cy.get('[data-floating]').should('have.attr', 'data-popper-placement');
  if (scenario.host === 'scroll') {
    cy.get('[data-host]').should($host => {
      expect($host[0].clientWidth, 'scrollbar-free fixture width').to.equal(400);
      expect($host[0].scrollHeight, 'fixture remains scrollable').to.be.greaterThan($host[0].clientHeight);
    });
  }
  cy.window().then(
    win =>
      new Cypress.Promise<void>(resolve => {
        win.requestAnimationFrame(() => win.requestAnimationFrame(() => resolve()));
      }),
  );
  return controls;
}

function rectGeometry(element: HTMLElement) {
  const { x, y, width, height } = element.getBoundingClientRect();
  return { x, y, width, height };
}

function geometry(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const arrow = element.querySelector<HTMLElement>('[data-arrow]');
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    placement: element.getAttribute('data-popper-placement'),
    position: element.style.position,
    transform: element.style.transform,
    left: element.style.left,
    top: element.style.top,
    maxWidth: element.style.maxWidth,
    maxHeight: element.style.maxHeight,
    arrowLeft: arrow?.style.left ?? '',
    arrowTop: arrow?.style.top ?? '',
    flags: ['data-popper-escaped', 'data-popper-reference-hidden', 'data-popper-is-intersecting']
      .filter(attribute => element.hasAttribute(attribute))
      .join(','),
    matchTargetSize: element.style.getPropertyValue('--fui-match-target-size'),
    overflowX: element.style.overflowX,
    overflowY: element.style.overflowY,
  };
}

function expectGeometry(element: HTMLElement, scenario: Scenario) {
  const expected = { ...geometryBaseline[scenario.name] };
  if (scenario.dpr !== undefined && scenario.options?.useTransform === false) {
    const reference = element.parentElement?.querySelector<HTMLElement>('[data-layout-reference]');
    if (!reference) {
      throw new Error('Fractional left/top geometry requires an engine-free layout reference');
    }
    // Native layout quantization varies by host; the reference uses only committed CSS literals.
    const rect = reference.getBoundingClientRect();
    expected.x = rect.x;
    expected.y = rect.y;
  }
  expect(geometry(element)).to.deep.equal(expected);
}

describe('usePositioning browser geometry contracts', () => {
  let originalDpr: PropertyDescriptor | undefined;
  beforeEach(() => {
    cy.viewport(800, 600);
    cy.window().then(win => {
      originalDpr = Object.getOwnPropertyDescriptor(win, 'devicePixelRatio');
    });
  });
  afterEach(() => {
    cy.window().then(win => {
      if (originalDpr) {
        Object.defineProperty(win, 'devicePixelRatio', originalDpr);
      } else {
        Reflect.deleteProperty(win, 'devicePixelRatio');
      }
    });
  });

  it('has exactly one committed baseline for every unique scenario', () => {
    expect(new Set(scenarios.map(scenario => scenario.name)).size).to.equal(scenarios.length);
    expect(Object.keys(geometryBaseline).sort()).to.deep.equal(scenarios.map(scenario => scenario.name).sort());
  });
  scenarios.forEach(scenario => {
    it(scenario.name, () => {
      const controls = mountScenario(scenario);
      cy.get('[data-floating]').should($floating => {
        expectGeometry($floating[0], scenario);
        expect(controls.events[controls.events.length - 1]).to.deep.equal({
          placement: $floating.attr('data-popper-placement'),
          escaped: $floating.is('[data-popper-escaped]'),
          referenceHidden: $floating.is('[data-popper-reference-hidden]'),
        });
      });
    });
  });

  scenarios
    .filter(scenario => [1.5, 3].includes(scenario.dpr ?? 0) && scenario.options?.useTransform === false)
    .forEach(scenario => {
      it(`${scenario.name} rejects style drift even within one native layout step`, () => {
        mountScenario(scenario);
        cy.get('[data-floating]').then($floating => {
          const element = $floating[0];
          expectGeometry(element, scenario);
          const rect = rectGeometry(element);
          for (const property of ['left', 'top'] as const) {
            const original = element.style[property];
            element.style[property] = `${parseFloat(original) - 0.001}px`;
            expect(rectGeometry(element), 'sub-layout-step drift has the same rectangle').to.deep.equal(rect);
            expect(() => expectGeometry(element, scenario), `reject changed ${property}`).to.throw();
            element.style[property] = original;
          }
          element.style.marginLeft = '1px';
          expect(
            () => expectGeometry(element, scenario),
            'reject a displaced rectangle with unchanged left/top',
          ).to.throw();
          element.style.marginLeft = '';
          expectGeometry(element, scenario);
        });
      });
    });

  function expectRect(x: number, y: number, width = 120, height = 60) {
    cy.get('[data-floating]').should($floating => {
      expect(rectGeometry($floating[0])).to.deep.equal({ x, y, width, height });
    });
  }

  function expectIdle(controls: Controls) {
    cy.then(() => {
      const count = controls.events.length;
      // A finite quiet interval also catches asynchronous resize/position feedback loops.
      cy.wait(200, { log: false }).then(() =>
        expect(controls.events.length, 'idle positioning updates').to.equal(count),
      );
    });
  }

  it('an inline end callback that updates state settles instead of recreating the manager', () => {
    const controls = mountScenario({ name: 'stateful-end', updateStateOnEnd: true });
    expectRect(280, 280);
    cy.wait(200, { log: false }).then(() => {
      expect(controls.events.length, 'bounded initial positioning updates').to.be.within(1, 3);
    });
    expectIdle(controls);
    cy.then(() => controls.rerender());
    expectIdle(controls);
  });

  it('callback-only and imperative-ref-only rerenders do not initiate positioning', () => {
    const controls = mountScenario({ name: 'callback-rerender' });
    expectIdle(controls);
    cy.then(() => {
      const count = controls.events.length;
      controls.rerender();
      cy.wait(200, { log: false }).then(() => expect(controls.events.length).to.equal(count));
    });
  });

  it('removing options restores default offset and placement', () => {
    const controls = mountScenario({ name: 'remove-options', options: { position: 'above', offset: 19 } });
    expectRect(280, 161);
    cy.then(() => controls.setOptions({}));
    expectRect(280, 280);
    cy.get('[data-floating]').should('have.attr', 'data-popper-placement', 'bottom');
  });

  it('imperatively updates a moved target and retargets to virtual and original references', () => {
    const controls = mountScenario({ name: 'imperative' });
    cy.get('[data-target]').invoke('css', { left: '400px', top: '200px' });
    cy.then(() => controls.positioning?.updatePosition());
    expectRect(380, 240);
    cy.then(() =>
      controls.positioning?.setTarget({
        getBoundingClientRect: () => ({
          x: 100,
          y: 120,
          left: 100,
          top: 120,
          right: 120,
          bottom: 130,
          width: 20,
          height: 10,
        }),
      }),
    );
    expectRect(50, 130);
    cy.then(() => controls.positioning?.setTarget(null));
    expectRect(380, 240);
  });

  it('supports the target prop and restores the DOM target when it is removed', () => {
    const controls = mountScenario({ name: 'target-prop' });
    cy.then(() =>
      controls.setOptions({
        target: {
          getBoundingClientRect: () => ({
            x: 100,
            y: 120,
            left: 100,
            top: 120,
            right: 120,
            bottom: 130,
            width: 20,
            height: 10,
          }),
        },
      }),
    );
    expectRect(50, 130);
    cy.then(() => controls.setOptions({}));
    expectRect(280, 280);
  });

  it('disables automatic updates and re-enables with current target geometry', () => {
    const controls = mountScenario({ name: 'enabled' });
    expectIdle(controls);
    let count = 0;
    cy.then(() => {
      count = controls.events.length;
      controls.setOptions({ enabled: false });
    });
    cy.get('[data-enabled="false"]').should('exist');
    cy.get('[data-target]').invoke('css', { left: '400px', width: '100px' });
    expectIdle(controls);
    cy.then(() => expect(controls.events.length).to.equal(count));
    expectRect(280, 280);
    cy.then(() => controls.setOptions({ enabled: true }));
    expectRect(390, 280);
  });

  it('tracks target and floating element resize without polling while idle', () => {
    const controls = mountScenario({ name: 'resize' });
    cy.get('[data-target]').invoke('css', { width: '160px', height: '70px' });
    expectRect(320, 310);
    cy.get('[data-floating]').invoke('css', { width: '100px', height: '50px' });
    expectRect(330, 310, 100, 50);
    expectIdle(controls);
  });

  it('disableUpdateOnResize preserves coordinates until explicitly updated', () => {
    const controls = mountScenario({ name: 'resize-disabled', options: { disableUpdateOnResize: true } });
    cy.get('[data-target]').invoke('css', { width: '160px', height: '70px' });
    expectIdle(controls);
    expectRect(280, 280);
    cy.then(() => controls.positioning?.updatePosition());
    expectRect(320, 310);
  });

  it('does not reposition for zero-sized resize observations while the target is display:none', () => {
    const controls = mountScenario({ name: 'display-none' });
    expectIdle(controls);
    let count = 0;
    cy.then(() => {
      count = controls.events.length;
    });
    cy.get('[data-target]').invoke('css', 'display', 'none');
    expectIdle(controls);
    cy.then(() => expect(controls.events.length).to.equal(count));
    expectRect(280, 280);
    cy.get('[data-target]').invoke('css', { display: 'block', width: '160px', height: '70px' });
    expectRect(320, 310);
  });

  it('autoSize releases stale maximum sizes when the viewport grows', () => {
    const controls = mountScenario({
      name: 'auto-size-grow',
      floating: { width: 900, height: 700 },
      options: { autoSize: true, pinned: true, overflowBoundaryPadding: 12 },
    });
    expectRect(12, 280, 776, 308);
    cy.viewport(1000, 1000);
    expectRect(12, 280, 900, 700);
    cy.get('[data-floating]').should($floating => {
      expect([$floating[0].style.maxWidth, $floating[0].style.maxHeight]).to.deep.equal(['976px', '708px']);
    });
    expectIdle(controls);
  });

  it('updates on nested scrolling and window resize', () => {
    const controls = mountScenario({ name: 'scroll-update', host: 'scroll' });
    expectRect(320, 210);
    cy.get('[data-host]').scrollTo(0, 100);
    expectRect(320, 210);
    cy.get('[data-floating]').should('have.attr', 'data-popper-placement', 'bottom');
    cy.get('[data-target]').invoke('css', 'left', '200px');
    cy.window().trigger('resize');
    expectRect(220, 210);
    expectIdle(controls);
  });

  it('removes visibility flags when a clipped target returns into view', () => {
    const controls = mountScenario({ name: 'visibility', host: 'scroll', target: { x: 450, y: 500 } });
    cy.get('[data-floating]').should('have.attr', 'data-popper-reference-hidden');
    cy.get('[data-floating]').should('have.attr', 'data-popper-escaped');
    cy.get('[data-target]').invoke('css', { left: '200px', top: '100px' });
    cy.then(() => controls.positioning?.updatePosition());
    expectRect(220, 170);
    cy.get('[data-floating]').should('not.have.attr', 'data-popper-reference-hidden');
    cy.get('[data-floating]').should('not.have.attr', 'data-popper-escaped');
    expectIdle(controls);
  });

  it('dispatches a native positioning-end event with the final post-flip placement', () => {
    const controls = mountScenario({ name: 'native-event', target: { y: 560 } });
    const details: OnPositioningEndEventDetail[] = [];
    cy.get('[data-floating]').then($floating => {
      $floating[0].addEventListener('fui-positioningend', event => {
        details.push((event as CustomEvent<OnPositioningEndEventDetail>).detail);
      });
    });
    cy.then(() => controls.positioning?.updatePosition());
    cy.wrap(details).should('deep.equal', [{ placement: 'top', escaped: false, referenceHidden: false }]);
  });

  it('cleans up detached containers and remounts without stale updates', () => {
    const controls = mountScenario({ name: 'cleanup' });
    expectIdle(controls);
    let count = 0;
    let detachedEvents = 0;
    let detached: HTMLElement;
    cy.get('[data-floating]').then($floating => {
      detached = $floating[0];
      detached.addEventListener('fui-positioningend', () => detachedEvents++);
    });
    cy.then(() => {
      count = controls.events.length;
      controls.setVisible(false);
    });
    cy.get('[data-floating]').should('not.exist');
    cy.then(() => controls.positioning?.updatePosition());
    cy.get('[data-target]').invoke('css', { width: '160px', height: '70px' });
    cy.window().trigger('resize');
    cy.window().trigger('scroll');
    expectIdle(controls);
    cy.then(() => {
      expect(controls.events.length).to.equal(count);
      expect(detachedEvents, 'events dispatched to detached container').to.equal(0);
      expect(detached.style.transform).to.equal('translate(280px, 280px)');
    });
    cy.then(() => controls.setVisible(true));
    expectRect(320, 310);
    expectIdle(controls);
  });
});
