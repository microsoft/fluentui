import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import { tokens } from '@fluentui/react-theme';
import { LineChart, VegaDeclarativeChart } from '../../index';
import { transformVegaLiteToLineChartProps } from './VegaLiteSchemaAdapter';
import type { VegaLiteSpec, VegaLiteUnitSpec } from './VegaLiteTypes';

const values = Array.from({ length: 7 }, (_, index) => ({ x: index + 1, y: index * 2 }));

function lineSpec(point?: boolean): VegaLiteSpec & VegaLiteUnitSpec {
  return {
    width: 640,
    height: 320,
    data: { values },
    mark: { type: 'line', ...(point !== undefined && { point }) },
    encoding: {
      x: { field: 'x', type: 'quantitative' },
      y: { field: 'y', type: 'quantitative' },
      color: { value: tokens.colorBrandForeground1 },
    },
  };
}

function adapt(spec: VegaLiteSpec, mode: 'legacy' | 'strict' = 'strict') {
  return transformVegaLiteToLineChartProps(spec, { current: new Map() }, false, { mode });
}

function layeredSpec(firstPoint?: boolean, secondPoint?: boolean): VegaLiteSpec {
  const first = lineSpec(firstPoint);
  const second = lineSpec(secondPoint);
  return {
    width: 640,
    height: 320,
    layer: [first, { ...second, data: { values: values.slice(0, 4) } }],
  };
}

describe('native Vega line options', () => {
  it.each(['legacy', 'strict'] as const)('enables visible markers for point:true in %s mode', mode => {
    const spec = lineSpec(true);
    const original = JSON.stringify(spec);
    const props = adapt(spec, mode);
    expect(props.data.lineChartData).toHaveLength(1);
    expect(props.data.lineChartData![0]).toMatchObject({
      hideNonActiveDots: false,
      lineOptions: { mode: 'lines+markers' },
      data: values,
    });
    expect(props).toMatchObject({ width: 640, height: 320, hideLegend: false });
    expect(JSON.stringify(spec)).toBe(original);
  });

  it.each([undefined, false])('preserves default line-only options for point:%s', point => {
    const series = adapt(lineSpec(point)).data.lineChartData![0];
    expect(series.hideNonActiveDots).toBe(true);
    expect(series.lineOptions).toBeUndefined();
  });

  it.each([
    { first: true, second: false },
    { first: false, second: true },
    { first: true, second: undefined },
    { first: undefined, second: true },
  ])('retains each unit marker option: $first / $second', ({ first, second }) => {
    const spec = layeredSpec(first, second);
    const original = JSON.stringify(spec);
    const series = adapt(spec).data.lineChartData!;
    expect(series.map(line => line.data.length)).toEqual([7, 4]);
    expect(series.map(line => line.hideNonActiveDots)).toEqual([!first, !second]);
    expect(series.map(line => line.lineOptions?.mode)).toEqual([
      first ? 'lines+markers' : undefined,
      second ? 'lines+markers' : undefined,
    ]);
    expect(JSON.stringify(spec)).toBe(original);
  });

  it('keeps a point companion without duplicating either line unit', () => {
    const spec = layeredSpec(false, false);
    spec.layer!.unshift({ ...lineSpec(), mark: 'point' });
    const series = adapt(spec).data.lineChartData!;
    expect(series.map(line => line.data.length)).toEqual([7, 4]);
    expect(series.every(line => line.hideNonActiveDots === false)).toBe(true);
    expect(series.every(line => line.lineOptions?.mode === 'lines+markers')).toBe(true);
  });

  it('preserves curve, dash and stroke width alongside markers, including extra line units', () => {
    const spec = layeredSpec(true, true);
    spec.layer![1].mark = { type: 'line', point: true, interpolate: 'step-after', strokeDash: [4, 3], strokeWidth: 2 };
    expect(adapt(spec).data.lineChartData![1].lineOptions).toEqual({
      mode: 'lines+markers',
      curve: 'stepAfter',
      strokeDasharray: '4 3',
      strokeWidth: 2,
    });
  });

  it.each([
    { legend: null, hidden: true },
    { legend: undefined, hidden: false },
    { legend: { disable: true }, hidden: true },
    { legend: { disable: false }, hidden: false },
  ])('respects explicit legend settings without suppressing static defaults: $legend', ({ legend, hidden }) => {
    const spec = lineSpec(true);
    spec.encoding!.color!.legend = legend;
    expect(adapt(spec).hideLegend).toBe(hidden);
  });

  it('reads legend:null from the primary line unit, not the layer root', () => {
    const spec = layeredSpec(true, false);
    spec.layer![0].encoding!.color!.legend = null;
    expect(adapt(spec).hideLegend).toBe(true);
  });
});

describe('actual native line markers', () => {
  beforeEach(() => {
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
      const width = this.tagName.toLowerCase() === 'text' ? Math.max(1, this.textContent?.length ?? 0) * 7 : 640;
      const height = this.tagName.toLowerCase() === 'text' ? 18 : 320;
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

  it.each([4, 7])('renders all %s point:true markers visibly before hover or focus', async count => {
    const spec = { ...lineSpec(true), data: { values: values.slice(0, count) } };
    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode="strict" />);
    await waitFor(() => expect(container.querySelectorAll('svg circle[role="option"]')).toHaveLength(count));
    container.querySelectorAll('svg circle[role="option"]').forEach(point => {
      expect(point).toHaveAttribute('r', '3.5');
      expect(point).toHaveAttribute('opacity', '1');
      expect(point.getAttribute('fill')).toBeTruthy();
      expect(point.getAttribute('fill')).not.toBe('none');
      expect(point.getAttribute('stroke')).toBeTruthy();
      expect(point.outerHTML).not.toMatch(/NaN|Infinity/);
    });
  });

  it.each([false, undefined])('leaves default point:%s paths hidden at rest', async point => {
    const { container } = render(<LineChart {...adapt(lineSpec(point))} />);
    await waitFor(() => expect(container.querySelectorAll('svg path[role="option"]')).toHaveLength(7));
    expect(container.querySelectorAll('svg circle[role="option"]')).toHaveLength(0);
    container.querySelectorAll('svg path[role="option"]').forEach(mark => {
      expect(mark).toHaveAttribute('opacity', '0.01');
    });
  });

  it('renders seven visible circles and four unchanged hidden paths from separate units', async () => {
    const { container } = render(<LineChart {...adapt(layeredSpec(true, false))} />);
    await waitFor(() => {
      expect(container.querySelectorAll('svg circle[role="option"]')).toHaveLength(7);
      expect(container.querySelectorAll('svg path[role="option"]')).toHaveLength(4);
    });
    container.querySelectorAll('svg circle[role="option"]').forEach(point => {
      expect(point).toHaveAttribute('r', '3.5');
      expect(point).toHaveAttribute('opacity', '1');
    });
    container.querySelectorAll('svg path[role="option"]').forEach(point => {
      expect(point).toHaveAttribute('opacity', '0.01');
    });
  });

  it.each([null, undefined])('renders native legend suppression only when requested: %s', async legend => {
    const spec = lineSpec(true);
    spec.encoding!.color!.legend = legend;
    const { container } = render(<LineChart {...adapt(spec)} />);
    await waitFor(() => expect(container.querySelectorAll('svg circle[role="option"]')).toHaveLength(7));
    const legends = Array.from(container.querySelectorAll('[role="listbox"]')).filter(
      element => !element.closest('svg'),
    );
    expect(legends).toHaveLength(legend === null ? 0 : 1);
  });
});
