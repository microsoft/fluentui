import { VegaDeclarativeChart } from '../../index';
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies -- Supplied by the monorepo for adjacent tests.
import { render } from '@testing-library/react';
import type { VegaLiteSemanticMode, VegaLiteSpec } from './VegaLiteTypes';
import { getVegaRenderRoute } from './VegaLiteRenderRoute';
import { classifyPreparedVegaChart } from './VegaLiteCapabilities';
import { validateVegaLiteSpec } from './VegaLiteDiagnostics';
import * as adapter from './VegaLiteSchemaAdapter';
import * as transforms from './VegaLiteDataTransforms';
import { canRenderVegaCenteredAreaSpec } from './VegaLiteCenteredAreaCapabilities';
import { canRenderVegaCenteredAreaSpec as oldCenteredPredicate } from './VegaLiteCenteredArea';
import { integrationLineSpec, integrationRangedSpec } from '../../testing/fixtures/integration';

function freeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}
function layerSpec(spec: VegaLiteSpec, count = 1): VegaLiteSpec {
  const { mark, ...parent } = spec;
  return { ...parent, layer: Array.from({ length: count }, () => ({ mark: mark! })) };
}
const grouped: VegaLiteSpec = freeze({
  ...integrationLineSpec,
  mark: 'bar',
  data: {
    values: [
      { x: 'A', y: 2, series: 'First', offset: 'Left' },
      { x: 'B', y: 4, series: 'Second', offset: 'Right' },
    ],
  },
  encoding: {
    x: { field: 'x', type: 'nominal' },
    y: { field: 'y', type: 'quantitative' },
    color: { field: 'series', type: 'nominal' },
    xOffset: { field: 'series' },
  },
});
const centered: VegaLiteSpec = freeze({
  ...integrationLineSpec,
  mark: 'area',
  encoding: { ...integrationLineSpec.encoding, y: { ...integrationLineSpec.encoding!.y, stack: 'center' } },
});

beforeEach(() => {
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 640,
    height: 400,
    top: 0,
    left: 0,
    right: 640,
    bottom: 400,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });
  const computedStyle = globalThis.getComputedStyle;
  jest.spyOn(globalThis, 'getComputedStyle').mockImplementation(element => {
    const style = computedStyle(element);
    return {
      ...style,
      marginTop: '0px',
      marginBottom: '0px',
      getPropertyValue: (key: string) => style.getPropertyValue(key),
    } as CSSStyleDeclaration;
  });
});
afterEach(() => jest.restoreAllMocks());

describe('spec-dependent render routing', () => {
  it('retains the old centered predicate export without a React dependency in routing', () => {
    expect(oldCenteredPredicate).toBe(canRenderVegaCenteredAreaSpec);
    expect(canRenderVegaCenteredAreaSpec(centered)).toBe(true);
  });

  it.each([
    [integrationLineSpec, 'line', 'native'],
    [{ ...integrationLineSpec, mark: 'area' }, 'area', 'native'],
    [centered, 'area', 'centered-area'],
    [integrationRangedSpec, 'horizontal-bar', 'ranged'],
    [{ ...integrationLineSpec, mark: 'tick' }, 'scatter', 'ranged'],
    [
      {
        ...integrationLineSpec,
        mark: 'arc',
        encoding: { theta: integrationLineSpec.encoding!.x, radius: integrationLineSpec.encoding!.y },
      },
      'polar',
      'native',
    ],
    [
      {
        ...integrationLineSpec,
        mark: 'rect',
        encoding: { ...integrationLineSpec.encoding, color: { field: 'series', type: 'nominal' }, x2: { field: 'y' } },
      },
      'heatmap',
      'ranged',
    ],
  ])('does not assign a static geometry route to native kind %s', (input, kind, expected) => {
    const spec = freeze(input as VegaLiteSpec);
    const before = JSON.stringify(spec);
    expect(classifyPreparedVegaChart(spec).type).toBe(kind);
    expect(getVegaRenderRoute(spec, spec)).toBe(expected);
    expect(getVegaRenderRoute(spec, spec, 'strict')).toBe(expected);
    expect(JSON.stringify(spec)).toBe(before);
  });

  it.each(['typed', 'untyped x', 'untyped aggregate y', 'both untyped', 'one inherited layer'])(
    'keeps %s grouped bars native only in legacy mode',
    variant => {
      const encoding = { ...grouped.encoding };
      if (variant === 'untyped x' || variant === 'both untyped') {
        encoding.x = { ...encoding.x, type: undefined };
      }
      if (variant === 'untyped aggregate y' || variant === 'both untyped') {
        encoding.y = { ...encoding.y, type: undefined, aggregate: 'sum' };
      }
      const unit = { ...grouped, encoding };
      const spec = freeze(variant === 'one inherited layer' ? layerSpec(unit) : unit);
      expect(getVegaRenderRoute(spec, spec)).toBe('native');
      expect(getVegaRenderRoute(spec, spec, 'legacy')).toBe('native');
      expect(getVegaRenderRoute(spec, spec, 'strict')).toBe('ranged');
      expect(validateVegaLiteSpec(spec)).toEqual([]);
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    },
  );

  it.each([
    { ...grouped, encoding: { ...grouped.encoding, xOffset: { field: 'offset' } } },
    { ...grouped, encoding: { ...grouped.encoding, y2: { datum: 0 } } },
    { ...grouped, mark: { type: 'bar', cornerRadiusEnd: 0 } },
    {
      ...grouped,
      encoding: { ...grouped.encoding, xOffset: undefined, y: { ...grouped.encoding!.y, stack: 'center' } },
    },
  ])('does not use legacy compatibility to steal new geometry %j', input => {
    const spec = freeze(input as VegaLiteSpec);
    expect(getVegaRenderRoute(spec, spec)).toBe('ranged');
    expect(getVegaRenderRoute(spec, spec, 'strict')).toBe('ranged');
  });

  it('uses the native source for compatibility, never the projected alias or inferred type', () => {
    const projected = freeze({
      ...grouped,
      encoding: { ...grouped.encoding, color: { field: 'projected', type: 'nominal' as const } },
    });
    expect(getVegaRenderRoute(projected, grouped)).toBe('native');
    expect(getVegaRenderRoute(projected, projected)).toBe('ranged');
    expect(getVegaRenderRoute(projected, grouped, 'strict')).toBe('ranged');
  });

  it.each([
    { ...centered, encoding: { ...centered.encoding, y: { ...centered.encoding!.y, scale: { type: 'log' } } } },
    { ...centered, layer: [{ ...centered }, { ...integrationLineSpec }] },
    { layer: [centered, centered], resolve: { scale: { y: 'independent' } } },
    { layer: [{ layer: [centered] }] },
  ])('does not claim unsupported centered geometry %j', input => {
    const spec = freeze(input as VegaLiteSpec);
    expect(getVegaRenderRoute(spec, spec, 'strict')).toBe('native');
    expect(validateVegaLiteSpec(spec, { mode: 'strict' }).length).toBeGreaterThan(0);
  });

  it('admits flat inherited center areas through the same extracted predicate', () => {
    const spec = freeze(layerSpec(centered, 2));
    expect(getVegaRenderRoute(spec, spec)).toBe('centered-area');
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
  });

  it('preflights inherited bare marks without native classification, preparation or transform evaluation', () => {
    const classify = jest.spyOn(adapter, 'getChartType').mockImplementation(() => {
      throw new Error('must not classify');
    });
    const prepare = jest.spyOn(transforms, 'prepareVegaLiteSpec').mockImplementation(() => {
      throw new Error('must not prepare');
    });
    const evaluate = jest.spyOn(transforms, 'applyVegaTransforms').mockImplementation(() => {
      throw new Error('must not evaluate');
    });
    const spec = freeze({ ...layerSpec(grouped), transform: [{ calculate: 'datum.y + 1', as: 'y' }] });
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    expect(getVegaRenderRoute(spec, spec, 'strict')).toBe('ranged');
    expect(classify).not.toHaveBeenCalled();
    expect(prepare).not.toHaveBeenCalled();
    expect(evaluate).not.toHaveBeenCalled();
  });

  describe.each([false, true])('grouped native axis suppression, inherited=%s', inherited => {
    it.each([undefined, 'legacy', 'strict'] as const)('aligns diagnostics and the actual %s renderer', mode => {
      const unit: VegaLiteSpec = {
        ...grouped,
        encoding: { ...grouped.encoding, x: { ...grouped.encoding!.x, axis: null } },
      };
      const spec = freeze(inherited ? layerSpec(unit) : unit);
      const result = validateVegaLiteSpec(spec, { mode });
      expect(result).toEqual(
        mode === 'strict'
          ? []
          : [expect.objectContaining({ code: 'unsupported-property', path: '$.encoding.x.axis', severity: 'warning' })],
      );
      const onDiagnostics = jest.fn();
      const { container } = render(
        React.createElement(VegaDeclarativeChart, {
          chartSchema: { vegaLiteSpec: spec },
          semanticMode: mode,
          onDiagnostics,
        }),
      );
      expect(container.querySelector('[role="alert"]')).toBeNull();
      expect(container.querySelector('svg')).toBeInTheDocument();
      expect(container.querySelectorAll('[data-ranged-mark]')).toHaveLength(mode === 'strict' ? 2 : 0);
      expect(onDiagnostics).toHaveBeenLastCalledWith(result);
    });
  });

  it.each(['legacy', 'strict'] as VegaLiteSemanticMode[])(
    'renders ordinary area, center area and polar through different real routes in %s',
    mode => {
      for (const [spec, selector] of [
        [{ ...integrationLineSpec, mark: 'area' }, '[data-centered-point]'],
        [centered, '[data-centered-point]'],
        [
          {
            ...integrationLineSpec,
            mark: 'arc',
            encoding: { theta: integrationLineSpec.encoding!.x, radius: integrationLineSpec.encoding!.y },
          },
          'circle[role="img"]',
        ],
      ] as const) {
        const { container, unmount } = render(
          React.createElement(VegaDeclarativeChart, { chartSchema: { vegaLiteSpec: spec }, semanticMode: mode }),
        );
        expect(container.querySelector('[role="alert"]')).toBeNull();
        expect(container.querySelectorAll('svg')).toHaveLength(1);
        expect(container.querySelectorAll(selector).length).toBe(spec === centered || spec.mark === 'arc' ? 2 : 0);
        unmount();
      }
    },
  );
});
