import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies -- Supplied by the monorepo for adjacent tests.
import { render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
// Import the public barrel before native chart modules initialize responsive wrappers.
import { VegaDeclarativeChart } from '../../index';
import type { VegaLiteSpec } from '../../VegaDeclarativeChart';

const ranged = (mark: 'rect' | 'tick'): VegaLiteSpec => ({
  width: 640,
  height: 400,
  mark,
  data: { values: [{ x: 1, y: 2, color: 50, when: '2026-01-01' }] },
  encoding: {
    x: { field: 'x', type: 'quantitative' },
    x2: { datum: 0 },
    y: { field: 'y', type: 'quantitative' },
    color: { field: 'color', type: 'quantitative', scale: { domain: [0, 100], range: ['#000', '#fff'] } },
  },
});

beforeEach(() => {
  // Model native chart layout; do not mock renderers, routes, diagnostics, or suppress console errors.
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    const text = this.tagName.toLowerCase() === 'text';
    const legend = this.getAttribute('role') === 'listbox' || /legend/i.test(this.getAttribute('class') ?? '');
    const height = text ? 18 : legend ? 32 : 400;
    const width = text ? Math.max(1, this.textContent?.length ?? 0) * 7 : 640;
    return { width, height, top: 0, left: 0, right: width, bottom: height, x: 0, y: 0, toJSON: () => ({}) };
  });
  const computedStyle = globalThis.getComputedStyle;
  jest.spyOn(globalThis, 'getComputedStyle').mockImplementation(element => {
    const style = computedStyle(element);
    return {
      ...style,
      marginTop: '0px',
      marginBottom: '0px',
      getPropertyValue: (property: string) => style.getPropertyValue(property),
    } as CSSStyleDeclaration;
  });
});

afterEach(() => jest.restoreAllMocks());

describe.each(['rect', 'tick'] as const)('public ranged %s continuous color', mark => {
  it.each([false, true])('fails strict rendering instead of painting midpoint 50 black (composed: %s)', composed => {
    const spec = ranged(mark);
    const onDiagnostics = jest.fn();
    expect(() =>
      renderToString(
        <VegaDeclarativeChart
          chartSchema={{ vegaLiteSpec: composed ? { hconcat: [spec] } : spec }}
          semanticMode="strict"
          onDiagnostics={onDiagnostics}
        />,
      ),
    ).toThrow(composed ? '$.hconcat[0].encoding.color' : '$.encoding.color');
    expect(onDiagnostics).not.toHaveBeenCalled();
  });

  describe.each([false, true])('layered colors (composed: %s)', composed => {
    it.each(['inherited', 'authored'] as const)('fails strict rendering at the %s color path', source => {
      const { mark: layerMark, ...base } = ranged(mark);
      const spec: VegaLiteSpec = {
        ...base,
        encoding: source === 'inherited' ? base.encoding : undefined,
        layer: [{ mark: layerMark!, ...(source === 'authored' ? { encoding: base.encoding } : {}) }],
      };
      expect(() =>
        renderToString(
          <VegaDeclarativeChart
            chartSchema={{ vegaLiteSpec: composed ? { hconcat: [spec] } : spec }}
            semanticMode="strict"
          />,
        ),
      ).toThrow(
        `${composed ? '$.hconcat[0]' : '$'}${source === 'inherited' ? '.encoding.color' : '.layer[0].encoding.color'}`,
      );
    });

    it.each(['inherited', 'authored'] as const)('retains the native legacy fallback with %s warnings', source => {
      const { mark: layerMark, ...base } = ranged(mark);
      const spec: VegaLiteSpec = {
        ...base,
        encoding: source === 'inherited' ? base.encoding : undefined,
        layer: [{ mark: layerMark!, ...(source === 'authored' ? { encoding: base.encoding } : {}) }],
      };
      const onDiagnostics = jest.fn();
      const { container } = render(
        <VegaDeclarativeChart
          chartSchema={{ vegaLiteSpec: composed ? { hconcat: [spec] } : spec }}
          onDiagnostics={onDiagnostics}
        />,
      );
      expect(onDiagnostics).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            code: 'unsupported-color',
            path: `${composed ? '$.hconcat[0]' : '$'}${
              source === 'inherited' ? '.encoding.color' : '.layer[0].encoding.color'
            }`,
            severity: 'warning',
          }),
        ]),
      );
      expect(container.querySelector('[data-ranged-mark]')).toBeNull();
      expect(
        container.querySelector(mark === 'rect' ? 'g[role="option"] > rect' : 'circle[role="option"]'),
      ).not.toBeNull();
    });
  });

  it.each([false, true])('warns truthfully and keeps the native legacy fallback (composed: %s)', composed => {
    const spec = ranged(mark);
    const onDiagnostics = jest.fn();
    const { container } = render(
      <VegaDeclarativeChart
        chartSchema={{ vegaLiteSpec: composed ? { hconcat: [spec] } : spec }}
        onDiagnostics={onDiagnostics}
      />,
    );
    expect(onDiagnostics).toHaveBeenLastCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'unsupported-color',
          path: composed ? '$.hconcat[0].encoding.color' : '$.encoding.color',
          severity: 'warning',
          message: expect.stringMatching(/continuous field color.*not implemented/i),
        }),
      ]),
    );
    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.querySelector('[data-ranged-mark]')).toBeNull();
    expect(
      container.querySelector(mark === 'rect' ? 'g[role="option"] > rect' : 'circle[role="option"]'),
    ).not.toBeNull();
  });

  it.each([
    { field: 'when', type: 'temporal' as const },
    { field: 'color', type: 'nominal' as const, scale: { type: 'linear' as const } },
  ])('rejects other unsupported continuous declarations through public strict rendering: %j', color => {
    const spec = ranged(mark);
    spec.encoding = { ...spec.encoding, color };
    expect(() =>
      renderToString(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode="strict" />),
    ).toThrow('$.encoding.color');
  });

  it.each(['nominal', 'ordinal', undefined, 'static'] as const)(
    'still publicly renders legitimate %s colors through ranged geometry',
    type => {
      const spec = ranged(mark);
      spec.data = { values: [{ x: 1, y: 2, color: 'Category' }] };
      spec.encoding = {
        ...spec.encoding,
        color: type === 'static' ? { value: '#000' } : { field: 'color', type },
      };
      const onDiagnostics = jest.fn();
      const { container } = render(
        <VegaDeclarativeChart
          chartSchema={{ vegaLiteSpec: spec }}
          semanticMode="strict"
          onDiagnostics={onDiagnostics}
        />,
      );
      expect(onDiagnostics).toHaveBeenLastCalledWith([]);
      expect(container.querySelectorAll('[data-ranged-mark]')).toHaveLength(1);
    },
  );
});

it.each([false, true])('still publicly renders native continuous-color heatmaps (composed: %s)', composed => {
  const spec = ranged('rect');
  spec.encoding = {
    x: { field: 'x', type: 'nominal' },
    y: { field: 'y', type: 'nominal' },
    color: spec.encoding!.color,
  };
  const onDiagnostics = jest.fn();
  const { container } = render(
    <VegaDeclarativeChart
      chartSchema={{ vegaLiteSpec: composed ? { hconcat: [spec] } : spec }}
      semanticMode="strict"
      onDiagnostics={onDiagnostics}
    />,
  );
  expect(onDiagnostics).toHaveBeenLastCalledWith([]);
  expect(container.querySelector('svg')).not.toBeNull();
  expect(container.querySelector('[data-ranged-mark]')).toBeNull();
  expect(container.querySelectorAll('g[role="option"] > rect')).toHaveLength(1);
});
