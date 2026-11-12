import { VegaDeclarativeChart } from '../../index';
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies -- Supplied by the monorepo for adjacent tests.
import { render } from '@testing-library/react';
import { classifyPreparedVegaChart, nativeTooltipBinding, vegaSemanticMarkChannels } from './VegaLiteCapabilities';
import type { VegaNativeChartKind } from './VegaLiteCapabilities';
import type { VegaLiteSpec } from './VegaLiteTypes';
import * as adapter from './VegaLiteSchemaAdapter';
import { validateVegaLiteSpec } from './VegaLiteDiagnostics';
import { integrationLineSpec } from '../../testing/fixtures/integration';

// Observe dispatch, but retain real preparation, binding, native renderers and DOM.
jest.mock('./VegaLiteSchemaAdapter', () => {
  const actual = jest.requireActual<typeof import('./VegaLiteSchemaAdapter')>('./VegaLiteSchemaAdapter');
  return {
    ...actual,
    transformVegaLiteToLineChartProps: jest.fn(actual.transformVegaLiteToLineChartProps),
    transformVegaLiteToVerticalBarChartProps: jest.fn(actual.transformVegaLiteToVerticalBarChartProps),
    transformVegaLiteToVerticalStackedBarChartProps: jest.fn(actual.transformVegaLiteToVerticalStackedBarChartProps),
    transformVegaLiteToGroupedVerticalBarChartProps: jest.fn(actual.transformVegaLiteToGroupedVerticalBarChartProps),
    transformVegaLiteToHorizontalBarChartProps: jest.fn(actual.transformVegaLiteToHorizontalBarChartProps),
    transformVegaLiteToAreaChartProps: jest.fn(actual.transformVegaLiteToAreaChartProps),
    transformVegaLiteToScatterChartProps: jest.fn(actual.transformVegaLiteToScatterChartProps),
    transformVegaLiteToDonutChartProps: jest.fn(actual.transformVegaLiteToDonutChartProps),
    transformVegaLiteToHeatMapChartProps: jest.fn(actual.transformVegaLiteToHeatMapChartProps),
    transformVegaLiteToHistogramProps: jest.fn(actual.transformVegaLiteToHistogramProps),
    transformVegaLiteToPolarChartProps: jest.fn(actual.transformVegaLiteToPolarChartProps),
  };
});

function freeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

const x = { field: 'x', type: 'quantitative' } as const;
const y = { field: 'y', type: 'quantitative' } as const;
const category = { field: 'category', type: 'nominal' } as const;
const series = { field: 'series', type: 'nominal' } as const;
const base: VegaLiteSpec = {
  ...integrationLineSpec,
  data: {
    values: [
      { x: 1, y: 2, category: 'A', series: 'First' },
      { x: 2, y: 4, category: 'B', series: 'Second' },
    ],
  },
};
const nativeCases = [
  ['line', 'line', { x, y }, 'transformVegaLiteToLineChartProps', { strategy: 'xy-series', series: 'lineChartData' }],
  ['bar', 'bar', { x: category, y }, 'transformVegaLiteToVerticalBarChartProps', { strategy: 'points' }],
  [
    'stacked-bar',
    'bar',
    { x: category, y, color: series },
    'transformVegaLiteToVerticalStackedBarChartProps',
    { strategy: 'stacked' },
  ],
  [
    'grouped-bar',
    'bar',
    { x: category, y, color: series, xOffset: { field: 'series' } },
    'transformVegaLiteToGroupedVerticalBarChartProps',
    { strategy: 'grouped' },
  ],
  ['horizontal-bar', 'bar', { x, y: category }, 'transformVegaLiteToHorizontalBarChartProps', { strategy: 'points' }],
  ['area', 'area', { x, y }, 'transformVegaLiteToAreaChartProps', { strategy: 'xy-series', series: 'lineChartData' }],
  [
    'scatter',
    'point',
    { x, y },
    'transformVegaLiteToScatterChartProps',
    { strategy: 'xy-series', series: 'scatterChartData' },
  ],
  ['donut', 'arc', { theta: y, color: series }, 'transformVegaLiteToDonutChartProps', { strategy: 'donut' }],
  [
    'heatmap',
    'rect',
    { x: category, y: series, color: y },
    'transformVegaLiteToHeatMapChartProps',
    { strategy: 'heatmap' },
  ],
  [
    'histogram',
    'bar',
    { x: { ...x, bin: true }, y: { aggregate: 'count', type: 'quantitative' } },
    'transformVegaLiteToHistogramProps',
    { strategy: 'points' },
  ],
  ['polar', 'arc', { theta: x, radius: y }, 'transformVegaLiteToPolarChartProps', { strategy: 'polar' }],
] as const;

beforeEach(() => {
  jest.clearAllMocks();
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

describe('private native capabilities', () => {
  it('has exactly the eleven independently enumerated native kinds', () => {
    const kinds: VegaNativeChartKind[] = nativeCases.map(([kind]) => kind);
    expect(Object.keys(nativeTooltipBinding).sort()).toEqual([...kinds].sort());
    expect(new Set(kinds).size).toBe(11);
  });

  it.each(nativeCases)('classifies, binds and actually dispatches %s', (kind, mark, encoding, transformer, binding) => {
    const spec = freeze({ ...base, mark, encoding: { ...encoding, tooltip: [{ field: 'y' }] } } as VegaLiteSpec);
    const before = JSON.stringify(spec);
    expect(classifyPreparedVegaChart(spec)).toEqual({ type: kind, mark });
    expect(adapter.getChartType(spec)).toEqual({ type: kind, mark });
    expect(nativeTooltipBinding[kind]).toEqual(binding);
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    const props = adapter[transformer](spec, { current: new Map() }, false, { mode: 'legacy' });
    expect(Object.getOwnPropertyDescriptor(props, 'onRenderCalloutPerDataPoint')?.value).toEqual(expect.any(Function));
    expect(typeof Object.getOwnPropertyDescriptor(props, 'onRenderCalloutPerStack')?.value).toBe(
      ['line', 'area', 'scatter', 'stacked-bar', 'grouped-bar'].includes(kind) ? 'function' : 'undefined',
    );
    expect(typeof Object.getOwnPropertyDescriptor(props, 'onRenderCalloutPerPoint')?.value).toBe(
      kind === 'scatter' ? 'function' : 'undefined',
    );
    jest.clearAllMocks();
    const { container } = render(React.createElement(VegaDeclarativeChart, { chartSchema: { vegaLiteSpec: spec } }));
    expect(container.querySelector('[role="alert"]')).toBeNull();
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('[data-ranged-mark], [data-centered-point]')).toBeNull();
    expect(adapter[transformer]).toHaveBeenCalledTimes(1);
    expect(container.querySelector('svg')!.outerHTML).not.toMatch(/NaN|Infinity/);
    expect(JSON.stringify(spec)).toBe(before);
  });

  it('retains the exact diagnostic mark/channel table, including annotation exceptions', () => {
    expect(vegaSemanticMarkChannels).toEqual({
      line: ['x', 'y', 'color', 'size', 'tooltip'],
      point: ['x', 'y', 'color', 'size', 'tooltip'],
      circle: ['x', 'y', 'color', 'size', 'tooltip'],
      square: ['x', 'y', 'color', 'size', 'tooltip'],
      bar: ['x', 'y', 'color', 'tooltip'],
      area: ['x', 'y', 'color', 'tooltip'],
      rect: ['x', 'y', 'color', 'tooltip'],
      rule: ['x', 'y'],
      text: ['x', 'y', 'text'],
      arc: ['theta', 'radius', 'color', 'tooltip'],
      tick: ['x', 'y', 'x2', 'y2', 'xOffset', 'yOffset', 'color', 'tooltip'],
    });
  });

  it.each(['trail', 'errorbar', 'errorband', 'image', 'geoshape'])(
    'does not admit classifier fallback mark %s',
    mark => {
      const spec = { ...base, mark } as unknown as VegaLiteSpec;
      expect(classifyPreparedVegaChart(spec).type).toBe('line');
      expect(validateVegaLiteSpec(spec)).toContainEqual(
        expect.objectContaining({ code: 'unsupported-mark', path: '$.mark' }),
      );
    },
  );

  it('keeps auto-correction and transform preparation outside pure classification', () => {
    const spec = freeze({
      ...base,
      mark: 'bar',
      data: { values: [{ x: 'A', y: 'B' }] },
      encoding: { x, y: { ...y, type: 'nominal' } },
    } as VegaLiteSpec);
    expect(classifyPreparedVegaChart(spec)).toEqual({ type: 'horizontal-bar', mark: 'bar' });
    expect(adapter.getChartType(spec)).toEqual({ type: 'bar', mark: 'bar' });
    const transformed = freeze({
      ...base,
      mark: 'bar',
      transform: [{ calculate: '0', as: 'x' }],
      encoding: { x, y },
    } as VegaLiteSpec);
    expect(classifyPreparedVegaChart(transformed)).toEqual({ type: 'bar', mark: 'bar' });
    expect(adapter.getChartType(transformed)).toEqual({ type: 'stacked-bar', mark: 'bar' });
    expect(transformed.data!.values![1].x).toBe(2);
  });

  it.each([
    [{ ...base, mark: 'bar', encoding: { x: { ...x, bin: {} }, y: category } }, 'histogram', 'bar'],
    [{ ...base, mark: 'bar', encoding: { x: { ...x, bin: 'binned' }, y } }, 'bar', 'bar'],
    [{ ...base, mark: 'bar', encoding: { x: { ...x, bin: false }, y } }, 'bar', 'bar'],
    [{ ...base, mark: 'bar', encoding: { x, y: category, color: series, xOffset: {} } }, 'horizontal-bar', 'bar'],
    [{ ...base, mark: 'bar', encoding: { x: category, y, color: series, xOffset: {} } }, 'grouped-bar', 'bar'],
    [{ ...base, mark: 'bar', encoding: { theta: x, radius: y } }, 'polar', 'bar'],
    [{ ...base, mark: 'tick' }, 'scatter', 'tick'],
    [{ ...base, mark: 'circle' }, 'scatter', 'circle'],
    [{ ...base, mark: 'square' }, 'scatter', 'square'],
    [{ ...base, mark: 'rule' }, 'line', 'rule'],
    [{ ...base, mark: 'text' }, 'line', 'text'],
    [{ ...base, mark: undefined }, 'line', 'line'],
    [{ ...base, layer: [] }, 'line', 'line'],
    [{ ...base, layer: [{ mark: 'point' }, { mark: 'line' }] }, 'scatter', 'point'],
    [{ ...base, layer: [{ mark: 'line' }, { mark: 'bar' }] }, 'stacked-bar', 'bar'],
    [{ ...base, layer: [{ mark: 'point' }, { mark: 'bar' }] }, 'stacked-bar', 'bar'],
    [{ ...base, mark: 'bar', data: { values: [{ x: 1 }, { x: 1 }] } }, 'stacked-bar', 'bar'],
    [{ ...base, layer: [{ mark: 'bar', encoding: { x, y }, data: { values: [{ x: 1 }, { x: 1 }] } }] }, 'bar', 'bar'],
  ])('preserves classifier priority for %j', (input, type, mark) => {
    const spec = freeze(input as VegaLiteSpec);
    const before = JSON.stringify(spec);
    expect(classifyPreparedVegaChart(spec)).toEqual({ type, mark });
    expect(JSON.stringify(spec)).toBe(before);
  });
});
