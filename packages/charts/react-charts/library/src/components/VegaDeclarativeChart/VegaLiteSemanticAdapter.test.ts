import * as React from 'react';
import { render, fireEvent, screen, cleanup, waitFor } from '@testing-library/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { LineChart, GroupedVerticalBarChart, HeatMapChart, PolarChart, VegaDeclarativeChart } from '../../index';
import { buildVegaViewTree, getVegaViewSourceSpec } from './VegaLiteViewTree';
import { prepareVegaLiteSpec } from './VegaLiteDataTransforms';
import type { VegaLiteSpec, VegaLiteAggregate } from './VegaLiteTypes';
import { buildVegaTooltip } from './VegaLiteTooltip';
import {
  getChartType,
  transformVegaLiteToLineChartProps as line,
  transformVegaLiteToVerticalBarChartProps as bar,
  transformVegaLiteToVerticalStackedBarChartProps as stacked,
  transformVegaLiteToGroupedVerticalBarChartProps as grouped,
  transformVegaLiteToHorizontalBarChartProps as horizontal,
  transformVegaLiteToAreaChartProps as area,
  transformVegaLiteToScatterChartProps as scatter,
  transformVegaLiteToDonutChartProps as donut,
  transformVegaLiteToHeatMapChartProps as heatmap,
  transformVegaLiteToHistogramProps as histogram,
  transformVegaLiteToPolarChartProps as polar,
} from './VegaLiteSchemaAdapter';
import {
  aggregateSpec,
  stackSpec,
  tooltipSpec,
  freezeSpec,
  layeredEmaSpec,
  categoricalDomainSpec,
} from './testing/fixtures/adapter-semantics';

const colors = () => ({ current: new Map<string, string>() });
const strict = { mode: 'strict' as const };
const tooltipFields = (element: React.ReactNode) =>
  (element as React.ReactElement<{ tooltip: { fields: Array<{ title: string; value: string }> } }>).props.tooltip
    .fields;

describe('VegaLite semantic adapter integration', () => {
  it.each([line, area, scatter, bar, horizontal] as const)(
    'maps numeric explicit x extents to native props',
    transform => {
      const spec = tooltipSpec();
      spec.encoding!.x!.scale = { domain: [-10, 20] };
      const props = transform(freezeSpec(spec), colors(), false, strict);
      expect([props.xMinValue, props.xMaxValue]).toEqual([-10, 20]);
    },
  );

  it('seeds x/y categorical coordinates with absent domain entries and preserves tuple callouts', () => {
    const props = line(freezeSpec(categoricalDomainSpec()), colors(), false, strict);
    expect(props.tickValues).toEqual(['B', 'empty', 'A']);
    expect([props.xMinValue, props.xMaxValue]).toEqual([0, 2]);
    expect(props.yAxisTickValues).toEqual([0, 1, 2]);
    expect(typeof props.yAxisTickFormat === 'function' && props.yAxisTickFormat(1)).toBe('empty');
    expect(props.data!.lineChartData![0].data.map(p => [p.x, p.y])).toEqual([
      [0, 0],
      [2, 2],
    ]);
    expect(
      tooltipFields(props.onRenderCalloutPerDataPoint?.({ x: 2, values: [{ legend: 'default', y: 2, color: '' }] })),
    ).toEqual([
      { title: 'Category', value: 'A' },
      { title: 'Level', value: 'low' },
    ]);
  });

  it('keeps legacy first-seen category coordinates when no domain is declared', () => {
    const spec = categoricalDomainSpec();
    delete spec.encoding!.x!.scale;
    delete spec.encoding!.y!.scale;
    const props = line(spec, colors());
    expect(props.tickValues).toEqual(['A', 'B']);
    expect(props.data!.lineChartData![0].data.map(p => [p.x, p.y])).toEqual([
      [0, 0],
      [1, 1],
    ]);
  });

  it('reverses supported categorical native y coordinates without inventing a numeric reversal prop', () => {
    const spec = categoricalDomainSpec();
    spec.encoding!.y!.scale!.reverse = true;
    const props = line(freezeSpec(spec), colors(), false, strict);
    expect(props.data!.lineChartData![0].data.map(point => point.y)).toEqual([2, 0]);
    expect(typeof props.yAxisTickFormat === 'function' && props.yAxisTickFormat(0)).toBe('low');
    expect(typeof props.yAxisTickFormat === 'function' && props.yAxisTickFormat(2)).toBe('high');
  });

  it('seeds categorical scatter y ticks including empty levels', () => {
    const spec = categoricalDomainSpec();
    spec.mark = 'point';
    spec.encoding!.x = { field: 'x', type: 'quantitative' };
    spec.data!.values = [
      { x: 1, y: 'low' },
      { x: 2, y: 'high' },
    ];
    const props = scatter(spec, colors(), false, strict);
    expect(props.yAxisTickValues).toEqual([0, 1, 2]);
    expect(props.data!.scatterChartData![0].data.map(p => p.y)).toEqual([2, 0]);
  });

  it('uses shared temporal view-tree domains on raw provenance specs', () => {
    const spec: VegaLiteSpec = {
      data: {
        values: [
          { facet: 'A', when: '2024-01-01', y: 1 },
          { facet: 'B', when: '2024-02-01', y: 2 },
        ],
      },
      facet: { field: 'facet', type: 'nominal' },
      spec: {
        mark: 'line',
        encoding: { x: { field: 'when', type: 'temporal' }, y: { field: 'y', type: 'quantitative' } },
      },
    };
    const tree = buildVegaViewTree(spec, strict);
    if (tree.type !== 'concat') {
      throw new Error('Expected facet composition');
    }
    expect(tree.children).toHaveLength(2);
    const props = tree.children.map(child => {
      if (child.type !== 'unit') {
        throw new Error('Expected unit facet');
      }
      return line(getVegaViewSourceSpec(child.spec), colors(), false, strict);
    });
    props.forEach(result => {
      expect(result.tickValues).toEqual([new Date('2024-01-01'), new Date('2024-02-01')]);
      expect([result.xMinValue, result.xMaxValue]).toEqual([Date.parse('2024-01-01'), Date.parse('2024-02-01')]);
    });
  });

  it('parses inline values before calculate/filter and removes consumed format declarations', () => {
    const spec = tooltipSpec();
    spec.data = {
      values: [{ x: '1', y: '2', group: 'one', when: '02/01/2024' }],
      format: { parse: { x: 'number', y: 'number', when: "utc:'%d/%m/%Y'" } },
    };
    spec.transform = [{ calculate: 'datum.y + 1', as: 'y' }, { filter: { field: 'y', equal: 3 } }];
    spec.encoding!.x = { field: 'when', type: 'temporal' };
    spec.encoding!.tooltip = [
      { field: 'when', type: 'temporal', format: '%Y-%m-%d', formatType: 'utc' },
      { field: 'y' },
    ];
    const props = line(freezeSpec(spec), colors(), false, strict);
    expect(props.data!.lineChartData![0].data[0]).toMatchObject({ x: new Date('2024-01-02'), y: 3 });
    expect(props.data!.lineChartData![0].data[0].callOutAccessibilityData?.ariaLabel).toBe('when: 2024-01-02; y: 3');
    expect(
      line(
        { ...spec, data: { values: [{ when: new Date('2024-01-02'), x: 1, y: 2, group: 'one' }] } },
        colors(),
        false,
        strict,
      ).data,
    ).toEqual(props.data);
  });

  it('honors encoding field tooltip:false without an explicit tooltip channel', () => {
    const spec = tooltipSpec();
    spec.encoding = { x: { field: 'x', type: 'quantitative' }, y: { field: 'y', type: 'quantitative' } };
    Object.assign(spec.encoding.y!, { tooltip: false });
    const props = line(spec, colors(), false, strict);
    expect(props.data!.lineChartData![0].data[0].callOutAccessibilityData?.ariaLabel).toBe('x: 1');
    expect(
      tooltipFields(props.onRenderCalloutPerDataPoint?.({ x: 1, values: [{ legend: 'default', y: 2, color: '' }] })),
    ).toEqual([{ title: 'x', value: '1' }]);
  });

  it('does not restore excluded coordinate details when the semantic ARIA projection is empty', () => {
    const spec = tooltipSpec();
    spec.encoding = {
      x: { field: 'x', type: 'quantitative' },
      y: { field: 'y', type: 'quantitative' },
    };
    Object.assign(spec.encoding.x!, { tooltip: false });
    Object.assign(spec.encoding.y!, { tooltip: false });
    const props = line(spec, colors(), false, strict);
    expect(props.data!.lineChartData![0].data.map(point => point.callOutAccessibilityData?.ariaLabel)).toEqual([
      'Data point',
      'Data point',
      'Data point',
    ]);
    expect(props.hideTooltip).toBe(true);
  });

  it('does not duplicate a point companion placed before two independently prepared line layers', () => {
    const spec = layeredEmaSpec();
    spec.layer!.unshift({ mark: 'point', encoding: { y: { field: 'amount', type: 'quantitative' } } });
    const props = line(freezeSpec(spec), colors(), false, strict);
    expect(props.data!.lineChartData).toHaveLength(2);
    expect(props.data!.lineChartData!.every(series => series.hideNonActiveDots === false)).toBe(true);
    expect(props.data!.lineChartData![0].data.map(point => point.y)).toEqual([14 / 3, 20 / 3]);
  });

  it.each(['csv', 'tsv'] as const)('parses inline %s text before aggregate projection', type => {
    const separator = type === 'csv' ? ',' : '\t';
    const spec = aggregateSpec('sum');
    spec.data = {
      values: `category${separator}amount\nA${separator}2\nA${separator}3` as unknown as Array<Record<string, unknown>>,
      format: { type, parse: { amount: 'number' } },
    };
    expect(bar(freezeSpec(spec), colors(), false, strict).data?.map(point => point.y)).toEqual([5]);
  });

  it('retains config-only tooltip formats and generated aggregate titles after an appended transform pipeline', () => {
    const spec: VegaLiteSpec = {
      mark: 'line',
      config: { mark: { tooltip: { content: 'encoding' } }, numberFormat: '.2f' },
      data: {
        values: [
          { x: 1, amount: '2' },
          { x: 1, amount: '6' },
        ],
      },
      transform: [{ calculate: 'toNumber(datum.amount) + 1', as: 'amount' }],
      encoding: {
        x: { field: 'x', type: 'quantitative' },
        y: { field: 'amount', type: 'quantitative', aggregate: { exponential: 0.5 } },
      },
    };
    const props = line(freezeSpec(spec), colors(), false, strict);
    expect(props.yAxisTitle).toBe('EMA of amount');
    expect(props.data!.lineChartData![0].data[0].callOutAccessibilityData?.ariaLabel).toBe(
      'x: 1.00; EMA of amount: 5.67',
    );
  });

  it('preserves every EMA line layer and its aggregate tooltip provenance', () => {
    const props = line(freezeSpec(layeredEmaSpec()), colors(), false, strict);
    expect(props.data!.lineChartData!.map(series => series.legend)).toEqual(['Line 1', 'Line 2']);
    expect(props.data!.lineChartData![0].data.map(point => point.y)).toEqual([14 / 3, 20 / 3]);
    // Biased EMA starts from zero: .5 * (.5 * 4 + 12) = 7.
    expect(props.data!.lineChartData![1].data.map(point => point.y)).toEqual([7, 10]);
    expect(props.yAxisTitle).toBe('EMA of amount');
    expect(
      tooltipFields(props.onRenderCalloutPerDataPoint?.({ x: 1, values: [{ legend: 'Line 2', y: 7, color: '' }] })),
    ).toEqual([{ title: 'Overlay', value: '7.00' }]);
  });

  it.each<[VegaLiteAggregate, number[]]>([
    ['median', [3, 15]],
    ['q1', [2, 12.5]],
    ['q3', [5.5, 17.5]],
    ['mean', [4, 15]],
    ['valid', [3, 2]],
    ['missing', [1, 0]],
    ['product', [24, 200]],
    ['variancep', [26 / 3, 25]],
    [{ exponential: 0.5 }, [39 / 7, 50 / 3]],
  ])('uses the shared encoding aggregate kernel for %j', (op, expected) => {
    expect(bar(aggregateSpec(op), colors(), false, strict).data?.map(point => point.y)).toEqual(expected);
  });

  it('retains aliases from the shared joinaggregate and window pipeline', () => {
    const spec = aggregateSpec();
    spec.encoding!.y = { field: 'rank', type: 'quantitative' };
    spec.transform = [
      { filter: { field: 'amount', valid: true } },
      { joinaggregate: [{ op: 'median', field: 'amount', as: 'middle' }], groupby: ['category'] },
      { window: [{ op: 'dense_rank', as: 'rank' }], sort: [{ field: 'middle', order: 'descending' }] },
    ];
    expect(bar(spec, colors(), false, strict).data?.map(point => point.y)).toEqual([1, 1, 2, 2, 2]);
  });

  it('prepares parent and layer transforms exactly once and inherits encodings', () => {
    const spec: VegaLiteSpec = {
      data: {
        values: [
          { x: 1, value: 2 },
          { x: 2, value: 4 },
        ],
      },
      transform: [{ calculate: 'datum.value + 1', as: 'value' }],
      encoding: { x: { field: 'x', type: 'quantitative' }, y: { field: 'value', type: 'quantitative' } },
      layer: [{ mark: 'line', transform: [{ calculate: 'datum.value * 2', as: 'value' }] }],
    };
    expect(line(freezeSpec(spec), colors(), false, strict).data?.lineChartData?.[0].data.map(p => p.y)).toEqual([
      6, 10,
    ]);
    expect(
      line(prepareVegaLiteSpec(spec, strict), colors(), false, strict).data?.lineChartData?.[0].data.map(p => p.y),
    ).toEqual([6, 10]);
  });

  it('makes chart routing pure even when legacy type correction extracts object values', () => {
    const spec: VegaLiteSpec = {
      mark: 'bar',
      data: { values: [{ x: 'A', y: { value: 3 } }] },
      encoding: { x: { field: 'x', type: 'quantitative' }, y: { field: 'y', type: 'quantitative' } },
    };
    const before = JSON.stringify(spec);
    expect(getChartType(freezeSpec(spec))).toEqual({ type: 'bar', mark: 'bar' });
    expect(JSON.stringify(spec)).toBe(before);
  });

  it.each([false, true])('does not rebin an interval declaration after standalone bin transform=%s', transformed => {
    const spec: VegaLiteSpec = {
      mark: 'bar',
      data: { values: transformed ? [{ raw: 1 }, { raw: 4 }] : [{ lo: 0, hi: 2, amount: 3 }] },
      ...(transformed && { transform: [{ bin: { step: 2, extent: [0, 6] }, field: 'raw', as: ['lo', 'hi'] }] }),
      encoding: {
        x: { field: 'lo', type: 'quantitative' },
        x2: { field: 'hi' },
        y: { field: transformed ? 'raw' : 'amount', type: 'quantitative' },
      },
    };
    Object.assign(spec.encoding!.x!, { bin: 'binned' });
    const before = JSON.stringify(spec);
    expect(getChartType(freezeSpec(spec))).toEqual({ type: 'bar', mark: 'bar' });
    const prepared = prepareVegaLiteSpec(spec, strict);
    expect(prepared.data!.values!.map(row => [row.lo, row.hi])).toEqual(
      transformed
        ? [
            [0, 2],
            [4, 6],
          ]
        : [[0, 2]],
    );
    expect(JSON.stringify(spec)).toBe(before);
  });

  it.each([true, { maxbins: 5 }])('retains histogram routing for authored bin=%j', bin => {
    const spec = aggregateSpec('count');
    spec.encoding!.x!.bin = bin;
    expect(getChartType(freezeSpec(spec))).toEqual({ type: 'histogram', mark: 'bar' });
  });

  it('supports nested fields without exposing generated aliases as titles', () => {
    const spec = aggregateSpec();
    spec.data = {
      values: [
        { category: 'A', nested: { amount: 4 } },
        { category: 'A', nested: { amount: 8 } },
      ],
    };
    spec.encoding!.y!.field = 'nested.amount';
    const result = bar(freezeSpec(spec), colors(), false, strict);
    expect(result.data?.map(p => p.y)).toEqual([6]);
    expect(result.yAxisTitle).toBe('Median of nested.amount');
  });

  it('treats day as weekday and does not implicitly average timeUnit tuples', () => {
    const spec: VegaLiteSpec = {
      mark: 'line',
      data: {
        values: [
          { when: '2024-01-01T12:00:00Z', y: 2 },
          { when: '2024-01-08T12:00:00Z', y: 6 },
        ],
      },
      encoding: { x: { field: 'when', type: 'temporal', timeUnit: 'utcday' }, y: { field: 'y', type: 'quantitative' } },
    };
    const points = line(freezeSpec(spec), colors(), false, strict).data?.lineChartData?.[0].data;
    expect(points?.map(p => p.y)).toEqual([2, 6]);
    expect(points?.map(p => (p.x as Date).getUTCDay())).toEqual([1, 1]);
    expect(points?.[0].x).toEqual(points?.[1].x);
  });

  it('forwards actual strict options while preserving the legacy default', () => {
    const spec = aggregateSpec();
    spec.transform = [{ unsupportedOperation: 'x' }];
    expect(() => bar(spec, colors())).not.toThrow();
    expect(() => bar(spec, colors(), false, strict)).toThrow(/unsupported|unknown/);
  });

  it('orders actual nominal stack segments by color domain, not grouped or simple bars', () => {
    const spec = stackSpec();
    expect(stacked(spec, colors()).data?.[0].chartData.map(p => p.legend)).toEqual(['first', 'second']);
    spec.encoding!.xOffset = { field: 'group' };
    expect(grouped(spec, colors()).data?.[0].series.map(p => p.legend)).toEqual(['second', 'first']);
    expect(bar(spec, colors()).data?.map(p => p.legend)).toEqual(['second', 'first', 'second', 'first']);
    spec.encoding!.color!.type = 'quantitative';
    expect(stacked(spec, colors()).data?.[0].chartData.map(p => p.legend)).toEqual(['second', 'first']);
  });

  it('normalizes native stacked data and percent labels', () => {
    const result = stacked(stackSpec('normalize'), colors(), false, strict);
    expect(result.data?.map(p => p.chartData.map(segment => segment.data))).toEqual([
      [0.25, 0.75],
      [0.5, 0.5],
    ]);
    expect(result.data?.[0].chartData.map(p => p.barLabel)).toEqual(['25%', '75%']);
    expect([result.yMinValue, result.yMaxValue]).toEqual([0, 1]);
  });

  it('normalizes positive and negative totals separately and preserves zero stacks', () => {
    const spec = stackSpec('normalize');
    spec.data!.values = [
      { category: 'A', group: 'first', amount: 2 },
      { category: 'A', group: 'second', amount: 6 },
      { category: 'A', group: 'third', amount: -3 },
      { category: 'A', group: 'fourth', amount: -1 },
      { category: 'B', group: 'first', amount: 0 },
    ];
    const result = stacked(spec, colors(), false, strict);
    expect(result.data?.map(p => p.chartData.map(segment => segment.data))).toEqual([[0.25, 0.75, -0.75, -0.25], [0]]);
    expect([result.yMinValue, result.yMaxValue]).toEqual([-1, 1]);
  });

  it.each(['ascending', 'descending'] as const)(
    'sorts normalized native segments by explicit %s order before normalizing',
    sort => {
      const spec = stackSpec('normalize');
      spec.encoding!.order = { field: 'priority', type: 'quantitative', sort };
      spec.encoding!.tooltip = [
        { field: 'group', title: 'Series' },
        { field: 'amount', title: 'Raw', type: 'quantitative', format: '.2f' },
      ];
      spec.encoding!.x!.sort = ['B', 'A'];
      spec.data!.values = [
        { category: 'A', group: 'first', amount: 2, priority: 2 },
        { category: 'A', group: 'second', amount: 6, priority: 1 },
        { category: 'B', group: 'first', amount: 3, priority: 1 },
        { category: 'B', group: 'second', amount: 1, priority: 2 },
      ];
      const props = stacked(freezeSpec(spec), colors(), false, strict);
      expect(props.data!.map(stack => stack.xAxisPoint)).toEqual(['B', 'A']);
      expect(props.data!.map(stack => stack.chartData.map(point => [point.legend, point.data]))).toEqual(
        sort === 'ascending'
          ? [
              [
                ['first', 0.75],
                ['second', 0.25],
              ],
              [
                ['second', 0.75],
                ['first', 0.25],
              ],
            ]
          : [
              [
                ['second', 0.25],
                ['first', 0.75],
              ],
              [
                ['first', 0.25],
                ['second', 0.75],
              ],
            ],
      );
      const point = props.data![1].chartData[0];
      expect(tooltipFields(props.onRenderCalloutPerDataPoint?.(point))).toEqual([
        { title: 'Series', value: point.legend! },
        { title: 'Raw', value: sort === 'ascending' ? '6.00' : '2.00' },
      ]);
    },
  );

  it('uses materialized nested string order fields and stable ties across positive and negative segments', () => {
    const spec = stackSpec('normalize');
    spec.encoding!.order = { field: 'nested.priority', type: 'nominal', sort: 'ascending' };
    spec.encoding!.y!.aggregate = 'sum';
    spec.data!.values = [
      { category: 'A', group: 'first', amount: 2, nested: { priority: 'z' } },
      { category: 'A', group: 'second', amount: -3, nested: { priority: 'a' } },
      { category: 'A', group: 'third', amount: 6, nested: { priority: 'a' } },
      { category: 'A', group: 'fourth', amount: -1, nested: { priority: 'z' } },
    ];
    const props = stacked(freezeSpec(spec), colors(), false, strict);
    expect(props.data![0].chartData.map(point => [point.legend, point.data])).toEqual([
      ['second', -0.75],
      ['third', 0.75],
      ['first', 0.25],
      ['fourth', -0.25],
    ]);
    expect([props.yMinValue, props.yMaxValue]).toEqual([-1, 1]);
  });

  it('preserves distinct aggregate groups with different explicit order values', () => {
    const spec = stackSpec();
    spec.encoding!.y!.aggregate = 'sum';
    spec.encoding!.order = { field: 'priority', type: 'quantitative', sort: 'descending' };
    spec.data!.values = [
      { category: 'A', group: 'first', amount: 1, priority: 1 },
      { category: 'A', group: 'first', amount: 2, priority: 2 },
      { category: 'A', group: 'first', amount: 4, priority: 1 },
    ];
    expect(stacked(freezeSpec(spec), colors(), false, strict).data![0].chartData.map(point => point.data)).toEqual([
      2, 5,
    ]);
  });

  it('retains insertion order when stack order sorting is explicitly disabled', () => {
    const spec = stackSpec('normalize');
    spec.encoding!.order = { field: 'group', type: 'nominal' };
    Object.assign(spec.encoding!.order, { sort: false });
    expect(stacked(freezeSpec(spec), colors(), false, strict).data![0].chartData.map(point => point.legend)).toEqual([
      'second',
      'first',
    ]);
  });

  it('orders actual area series by the explicit source order instead of the color domain', () => {
    const spec = stackSpec('normalize');
    spec.mark = 'area';
    spec.encoding!.order = { field: 'priority', type: 'quantitative', sort: 'ascending' };
    spec.data!.values!.forEach(row => {
      row.priority = row.group === 'second' ? 1 : 2;
    });
    const props = area(freezeSpec(spec), colors(), false, strict);
    expect(props.data!.lineChartData!.map(series => [series.legend, series.data.map(point => point.y)])).toEqual([
      ['second', [0.75, 0.5]],
      ['first', [0.25, 0.5]],
    ]);
  });

  it('normalizes native area contributions and honors explicit stack:null', () => {
    const spec = stackSpec('normalize');
    spec.mark = 'area';
    spec.encoding!.x!.type = 'nominal';
    const result = area(spec, colors(), false, strict);
    expect(result.mode).toBe('tonexty');
    expect(result.data?.lineChartData?.map(s => s.data.map(p => p.y))).toEqual([
      [0.25, 0.5],
      [0.75, 0.5],
    ]);
    spec.encoding!.y!.stack = null;
    expect(area(spec, colors()).mode).toBe('tozeroy');
  });

  it('rejects center stacks instead of silently drawing a zero baseline', () => {
    expect(() => stacked(stackSpec('center'), colors(), false, strict)).toThrow(
      /center.*unsupported|unsupported.*center/,
    );
    const spec = stackSpec('center');
    spec.mark = 'area';
    expect(() => area(spec, colors(), false, strict)).toThrow(/center.*unsupported|unsupported.*center/);
  });

  it('sorts categories by a separate source field rather than plotted values', () => {
    const spec = aggregateSpec('sum');
    spec.data!.values = [
      { category: 'A', amount: 100, order: 2 },
      { category: 'B', amount: 1, order: 9 },
      { category: 'C', amount: 40, order: 5 },
    ];
    spec.encoding!.x!.sort = { field: 'order', op: 'median', order: 'descending' };
    const result = bar(spec, colors(), false, strict);
    expect(result.xAxisCategoryOrder).toEqual(['B', 'C', 'A']);
    expect(result.data?.map(p => p.x)).toEqual(['B', 'C', 'A']);
    spec.encoding = { x: { field: 'amount', type: 'quantitative' }, y: { ...spec.encoding!.x! } };
    const horizontalResult = horizontal(spec, colors(), false, strict);
    expect(horizontalResult.yAxisCategoryOrder).toEqual(['B', 'C', 'A']);
    expect(horizontalResult.data?.map(p => p.y)).toEqual(['B', 'C', 'A']);
  });

  it('remaps categorical line coordinates and labels for source-field sorts', () => {
    const spec = aggregateSpec('sum');
    spec.mark = 'line';
    spec.data!.values = [
      { category: 'A', amount: 100, order: 2 },
      { category: 'B', amount: 1, order: 9 },
      { category: 'C', amount: 40, order: 5 },
    ];
    spec.encoding!.x!.sort = { field: 'order', op: 'median', order: 'descending' };
    const result = line(spec, colors(), false, strict);
    expect(result.tickValues).toEqual(['B', 'C', 'A']);
    expect(result.data?.lineChartData?.[0].data.map(p => [p.x, p.y])).toEqual([
      [0, 1],
      [1, 40],
      [2, 100],
    ]);
  });

  it.each<[VegaLiteAggregate, number]>([
    ['median', 3],
    ['q1', 2],
    ['q3', 5.5],
    ['valid', 3],
    ['missing', 1],
    ['variancep', 26 / 3],
    [{ exponentialb: 0.5 }, 4.875],
  ])('uses shared scalar %j inside histogram bins including nulls', (op, expected) => {
    const spec = aggregateSpec(op);
    spec.data!.values = [
      { x: 1, amount: 1 },
      { x: 2, amount: 3 },
      { x: 3, amount: 8 },
      { x: 4, amount: null },
    ];
    spec.encoding!.x = { field: 'x', type: 'quantitative', bin: { extent: [0, 10], step: 10 } };
    const result = histogram(spec, colors(), false, strict);
    expect(result.data?.map(p => p.y)).toEqual([expected]);
    expect(typeof result.yAxisTitle).toBe('string');
  });

  it('projects histogram aggregate callouts from the entire bin', () => {
    const spec = aggregateSpec('median');
    spec.data!.values = [
      { x: 1, amount: 1 },
      { x: 2, amount: 3 },
      { x: 3, amount: 8 },
      { x: 4, amount: null },
    ];
    spec.encoding!.x = { field: 'x', type: 'quantitative', bin: { extent: [0, 10], step: 10 } };
    spec.encoding!.tooltip = [
      { field: 'amount', aggregate: 'median', title: 'Median', type: 'quantitative', format: '.2f' },
    ];
    const props = histogram(spec, colors(), false, strict);
    expect(tooltipFields(props.onRenderCalloutPerDataPoint?.(props.data![0]))).toEqual([
      { title: 'Median', value: '3.00' },
    ]);
    spec.encoding!.tooltip = null;
    expect(histogram(spec, colors(), false, strict).hideTooltip).toBe(true);
  });

  it('binds shared tooltip content to the selected prepared tuple and series', () => {
    const result = line(freezeSpec(tooltipSpec()), colors(), false, strict);
    const point = result.data!.lineChartData![0].data[1];
    expect(point.callOutAccessibilityData?.ariaLabel).toBe('Label: second row; Amount: 4.00; Later: 2');
    const content = result.onRenderCalloutPerDataPoint?.({ x: 2, values: [{ legend: 'one', y: 4, color: '' }] });
    expect(tooltipFields(content)).toEqual([
      { title: 'Label', value: 'second row' },
      { title: 'Amount', value: '4.00' },
      { title: 'Later', value: '2' },
    ]);
    const stack = result.onRenderCalloutPerStack?.({ x: 1, values: [{ legend: 'two', y: 6, color: '' }] });
    expect(tooltipFields(stack)).toEqual([
      { title: 'Label', value: 'other series' },
      { title: 'Amount', value: '6.00' },
    ]);
    expect(JSON.stringify(content)).not.toContain('SECRET');
    expect(result.onRenderCalloutPerDataPoint?.(undefined)).toBeNull();
  });

  it('reads full aggregate aliases for callouts instead of aggregating one row again', () => {
    const spec = aggregateSpec('variancep');
    spec.encoding!.tooltip = [{ field: 'amount', aggregate: 'variancep', type: 'quantitative', format: '.2f' }];
    const result = bar(spec, colors(), false, strict);
    expect(tooltipFields(result.onRenderCalloutPerDataPoint?.(result.data![0]))).toEqual([
      { title: 'Variancep of amount', value: '8.67' },
    ]);
  });

  it('preserves explicit field and axis titles through aggregate projection', () => {
    const spec = aggregateSpec();
    spec.encoding!.y!.axis = { title: 'Axis amount' };
    expect(bar(spec, colors(), false, strict).yAxisTitle).toBe('Axis amount');
    spec.encoding!.y!.title = 'Custom amount';
    expect(bar(spec, colors(), false, strict).yAxisTitle).toBe('Custom amount');
  });

  it('does not replace an entirely missing quantitative aggregate with a row count', () => {
    const spec = aggregateSpec();
    spec.data!.values = [
      { category: 'A', amount: null },
      { category: 'A', amount: null },
    ];
    expect(bar(spec, colors(), false, strict).data).toEqual([]);
  });

  it('binds native scatter callbacks to the selected series', () => {
    const spec = tooltipSpec();
    spec.mark = 'point';
    const props = scatter(spec, colors(), false, strict);
    expect(
      tooltipFields(props.onRenderCalloutPerDataPoint?.({ x: 1, values: [{ legend: 'two', y: 6, color: '' }] })),
    ).toEqual([
      { title: 'Label', value: 'other series' },
      { title: 'Amount', value: '6.00' },
    ]);
  });

  it('binds native grouped point identity and group callbacks without adding unrequested text fields', () => {
    const spec = tooltipSpec();
    spec.mark = 'bar';
    spec.encoding!.xOffset = { field: 'group', type: 'nominal' };
    const props = grouped(freezeSpec(spec), colors(), false, strict);
    const group = props.data!.find(data => data.name === '1')!;
    expect(tooltipFields(props.onRenderCalloutPerDataPoint?.(group.series[1]))).toEqual([
      { title: 'Label', value: 'other series' },
      { title: 'Amount', value: '6.00' },
    ]);
    const content = props.onRenderCalloutPerStack?.(group) as React.ReactElement<{ children: React.ReactElement[] }>;
    expect(content.props.children.flatMap(tooltipFields)).toEqual([
      { title: 'Label', value: 'first row' },
      { title: 'Amount', value: '2.00' },
      { title: 'Label', value: 'other series' },
      { title: 'Amount', value: '6.00' },
    ]);
    const second = props.data!.find(data => data.name === '2')!;
    expect(tooltipFields(props.onRenderCalloutPerStack?.(second))[0]).toEqual({ title: 'Label', value: 'second row' });
    expect(group.series[0].xAxisCalloutData).toBeUndefined();
    expect(group.series[0].yAxisCalloutData).toBeUndefined();
    expect(props.onRenderCalloutPerStack?.(undefined)).toBeNull();
    expect(JSON.stringify(content)).not.toContain('SECRET');
  });

  it.each(['heatmap', 'polar'] as const)('binds native %s point identity and retains native label metadata', kind => {
    const spec = tooltipSpec();
    let content: React.ReactNode;
    if (kind === 'heatmap') {
      spec.mark = 'rect';
      spec.encoding!.color = { field: 'y', type: 'quantitative' };
      const props = heatmap(freezeSpec(spec), colors(), false, strict);
      const point = props.data.flatMap(group => group.data).find(data => data.x === '2' && data.y === '4')!;
      content = props.onRenderCalloutPerDataPoint?.(point);
      expect(point.rectText).toBe(4);
      expect(point.descriptionMessage).toBeUndefined();
    } else {
      spec.mark = 'point';
      spec.encoding!.theta = spec.encoding!.x;
      spec.encoding!.radius = spec.encoding!.y;
      const props = polar(freezeSpec(spec), colors(), false, strict);
      const point = props.data!.flatMap(group => group.data).find(data => data.theta === 2)!;
      content = props.onRenderCalloutPerDataPoint?.(point);
      expect(point.angularAxisCalloutData).toBeUndefined();
      expect(point.radialAxisCalloutData).toBeUndefined();
    }
    expect(tooltipFields(content)).toEqual([
      { title: 'Label', value: 'second row' },
      { title: 'Amount', value: '4.00' },
      { title: 'Later', value: '2' },
    ]);
    expect(JSON.stringify(content)).not.toContain('SECRET');
  });

  it('does not leak private fields into the shared default encoding projection', () => {
    const spec = tooltipSpec();
    delete spec.encoding!.tooltip;
    expect(buildVegaTooltip(spec, spec.data!.values![0])).toEqual({
      fields: [
        { title: 'x', value: '1' },
        { title: 'y', value: '2' },
        { title: 'group', value: 'one' },
      ],
      ariaLabel: 'x: 1; y: 2; group: one',
      disabled: false,
    });
  });

  it('returns blank content for a filtered-out tuple without hiding other native groups', () => {
    const spec = tooltipSpec();
    spec.encoding!.tooltip = [{ field: 'label', title: 'Label', filter: { equal: 'second row' } }];
    const props = grouped(freezeSpec(spec), colors(), false, strict);
    const first = props.data!.find(group => group.name === '1')!;
    const second = props.data!.find(group => group.name === '2')!;
    expect(props.hideTooltip).not.toBe(true);
    expect(props.onRenderCalloutPerDataPoint?.(first.series[0])).toBeNull();
    expect(props.onRenderCalloutPerStack?.(first)).toBeNull();
    expect(tooltipFields(props.onRenderCalloutPerStack?.(second))).toEqual([{ title: 'Label', value: 'second row' }]);
    expect(grouped({ ...spec, encoding: { ...spec.encoding, tooltip: [] } }, colors(), false, strict).hideTooltip).toBe(
      true,
    );
    expect(
      grouped({ ...spec, encoding: { ...spec.encoding, tooltip: null } }, colors(), false, strict).hideTooltip,
    ).toBe(true);
  });

  it('binds native single bar and stack callbacks without losing category provenance', () => {
    const spec = tooltipSpec();
    spec.mark = 'bar';
    const bars = bar(spec, colors(), false, strict);
    expect(tooltipFields(bars.onRenderCalloutPerDataPoint?.(bars.data![1]))[0]).toEqual({
      title: 'Label',
      value: 'second row',
    });
    const stacks = stacked(spec, colors(), false, strict);
    expect(tooltipFields(stacks.onRenderCalloutPerDataPoint?.(stacks.data![1].chartData[0]))[0]).toEqual({
      title: 'Label',
      value: 'second row',
    });
    const stackContent = stacks.onRenderCalloutPerStack?.(stacks.data![1]);
    expect(tooltipFields(stackContent)[0]).toEqual({ title: 'Label', value: 'second row' });
    spec.encoding!.x = { field: 'y', type: 'quantitative' };
    spec.encoding!.y = { field: 'group', type: 'nominal' };
    const horizontalBars = horizontal(spec, colors(), false, strict);
    expect(tooltipFields(horizontalBars.onRenderCalloutPerDataPoint?.(horizontalBars.data![1]))[0]).toEqual({
      title: 'Label',
      value: 'second row',
    });
  });

  it('materializes supported color conditions on cloned rows without overwriting a user alias', () => {
    const spec = tooltipSpec();
    spec.encoding!.color = { condition: { test: 'datum.y > 3', value: 'selected' }, value: 'otherwise' };
    spec.data!.values![0].__conditional_color__ = 'source value';
    const getter = jest.fn(() => 'SECRET');
    Object.defineProperty(spec.data!.values![0], 'accessor', { get: getter, enumerable: true });
    const before = JSON.stringify({
      ...spec,
      data: { values: spec.data!.values!.map(row => ({ x: row.x, y: row.y })) },
    });
    const props = line(freezeSpec(spec), colors(), false, strict);
    expect(props.data?.lineChartData?.map(series => series.legend)).toEqual(['otherwise', 'selected']);
    expect(spec.data!.values![0].__conditional_color__).toBe('source value');
    expect(getter).not.toHaveBeenCalled();
    expect(JSON.stringify({ ...spec, data: { values: spec.data!.values!.map(row => ({ x: row.x, y: row.y })) } })).toBe(
      before,
    );
  });

  it.each(['encoding', 'mark', 'config'] as const)(
    'honors explicit tooltip null at %s without leaking secret ARIA',
    source => {
      const spec = tooltipSpec();
      delete spec.encoding!.tooltip;
      if (source === 'encoding') {
        spec.encoding!.tooltip = null;
      }
      if (source === 'mark') {
        spec.mark = Object.assign({ type: 'line' as const }, { tooltip: null });
      }
      if (source === 'config') {
        spec.config = { mark: { tooltip: null } };
      }
      const result = line(spec, colors(), false, strict);
      expect(result.hideTooltip).toBe(true);
      expect(result.data?.lineChartData?.[0].data[0].callOutAccessibilityData?.ariaLabel).not.toContain('SECRET');
    },
  );

  it('preserves native default callouts when no tooltip is explicit', () => {
    const result = line({ ...tooltipSpec(), encoding: { x: { field: 'x' }, y: { field: 'y' } } }, colors());
    expect(result.onRenderCalloutPerDataPoint).toBeUndefined();
    expect(result.onRenderCalloutPerStack).toBeUndefined();
  });

  it.each(['grouped', 'heatmap', 'polar'] as const)(
    'preserves legacy native %s callouts when no tooltip is authored',
    kind => {
      const spec = tooltipSpec();
      delete spec.encoding!.tooltip;
      spec.encoding!.theta = spec.encoding!.x;
      spec.encoding!.radius = spec.encoding!.y;
      const props =
        kind === 'grouped'
          ? grouped(spec, colors())
          : kind === 'heatmap'
          ? heatmap(spec, colors())
          : polar(spec, colors());
      expect(props.onRenderCalloutPerDataPoint).toBeUndefined();
      expect(props.hideTooltip).not.toBe(true);
    },
  );

  it.each([
    ['line', line],
    ['bar', bar],
    ['stacked', stacked],
    ['grouped', grouped],
    ['horizontal', horizontal],
    ['area', area],
    ['scatter', scatter],
    ['donut', donut],
    ['heatmap', heatmap],
    ['histogram', histogram],
    ['polar', polar],
  ] as const)('does not mutate frozen input across repeated %s transforms', (name, transform) => {
    const spec: VegaLiteSpec = {
      mark: name === 'donut' ? 'arc' : name === 'heatmap' ? 'rect' : 'bar',
      data: {
        values: [
          { x: 1, y: 2, group: 'one' },
          { x: 2, y: 4, group: 'two' },
        ],
      },
      transform: [{ calculate: 'datum.y + 1', as: 'y' }],
      encoding: {
        x: { field: 'x', type: 'quantitative', ...(name === 'histogram' && { bin: true }) },
        y: { field: 'y', type: 'quantitative' },
        color: { field: 'group', type: 'nominal' },
        theta: { field: 'x', type: 'quantitative' },
        radius: { field: 'y', type: 'quantitative' },
      },
    };
    const before = JSON.stringify(spec);
    const first = transform(freezeSpec(spec), colors(), false, strict);
    expect(transform(spec, colors(), false, strict)).toEqual(first);
    expect(JSON.stringify(spec)).toBe(before);
  });
});

describe('semantic tooltip native activation', () => {
  beforeEach(() => {
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 650,
      height: 350,
      top: 0,
      left: 0,
      bottom: 350,
      right: 650,
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
        getPropertyValue: (property: string) => style.getPropertyValue(property),
      } as CSSStyleDeclaration;
    });
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it.each(['grouped', 'heatmap', 'polar'] as const)(
    'renders requested fields in actual native %s tooltips',
    async kind => {
      const spec = tooltipSpec();
      spec.mark = kind === 'heatmap' ? 'rect' : kind === 'polar' ? 'point' : 'bar';
      let element: React.ReactElement;
      if (kind === 'grouped') {
        spec.encoding!.xOffset = { field: 'group', type: 'nominal' };
        element = React.createElement(GroupedVerticalBarChart, {
          ...grouped(spec, colors(), false, strict),
          width: 650,
          height: 350,
          hideLegend: true,
        });
      } else if (kind === 'heatmap') {
        spec.encoding!.color = { field: 'y', type: 'quantitative' };
        const props = heatmap(spec, colors(), false, strict);
        expect(props.data[0].data.find(point => point.x === '2' && point.y === '4')?.rectText).toBe(4);
        element = React.createElement(HeatMapChart, { ...props, width: 650, height: 350 });
      } else {
        spec.encoding!.theta = spec.encoding!.x;
        spec.encoding!.radius = spec.encoding!.y;
        element = React.createElement(PolarChart, {
          ...polar(spec, colors(), false, strict),
          width: 650,
          height: 350,
          hideLegend: true,
        });
      }
      const view = render(React.createElement(FluentProvider, { theme: webLightTheme }, element));
      const point = await screen.findByLabelText('Label: second row; Amount: 4.00; Later: 2');
      fireEvent.focus(point);
      await waitFor(() => expect(view.container.querySelector('.fui-PopoverSurface')).not.toBeNull());
      const tooltip = view.container.querySelector('.fui-PopoverSurface')!;
      expect(tooltip.textContent).toContain('second row');
      expect(tooltip.querySelector('[role="tooltip"]')?.getAttribute('aria-label')).toBe(
        'Label: second row; Amount: 4.00; Later: 2',
      );
      expect(Array.from(tooltip.querySelectorAll('dt')).map(field => field.textContent)).toEqual([
        'Label',
        'Amount',
        'Later',
      ]);
      expect(Array.from(tooltip.querySelectorAll('dd')).map(field => field.textContent)).toEqual([
        'second row',
        '4.00',
        '2',
      ]);
      expect(tooltip.textContent).not.toContain('SECRET');
      fireEvent.mouseOver(point);
      expect(view.container.querySelector('.fui-PopoverSurface')!.textContent).toContain('second row');
    },
  );

  it('renders exclusive native grouped-stack fields for the active category', async () => {
    const spec = tooltipSpec();
    spec.mark = 'bar';
    spec.encoding!.xOffset = { field: 'group', type: 'nominal' };
    const props = grouped(freezeSpec(spec), colors(), false, strict);
    const { container } = render(
      React.createElement(
        FluentProvider,
        { theme: webLightTheme },
        React.createElement(GroupedVerticalBarChart, {
          ...props,
          width: 650,
          height: 350,
          hideLegend: true,
          isCalloutForStack: true,
        }),
      ),
    );
    fireEvent.focus(await screen.findByLabelText('Label: first row; Amount: 2.00'));
    await waitFor(() => expect(container.querySelectorAll('.fui-PopoverSurface [role="tooltip"]')).toHaveLength(2));
    const tooltip = container.querySelector('.fui-PopoverSurface')!;
    expect(
      Array.from(tooltip.querySelectorAll('[role="tooltip"]')).map(element => element.getAttribute('aria-label')),
    ).toEqual(['Label: first row; Amount: 2.00', 'Label: other series; Amount: 6.00']);
    expect(tooltip.textContent).not.toContain('second row');
    expect(tooltip.textContent).not.toContain('SECRET');
  });

  it('renders both transformed EMA layers through the public component and preserves its ref', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const spec = layeredEmaSpec();
    const { container } = render(
      React.createElement(VegaDeclarativeChart, {
        ref,
        chartSchema: { vegaLiteSpec: freezeSpec(spec) },
        semanticMode: 'strict',
      }),
    );
    expect(ref.current).toBe(container.firstElementChild);
    expect(await screen.findByLabelText('EMA: 4.67')).toBeTruthy();
    const overlay = await screen.findByLabelText('Overlay: 7.00');
    fireEvent.focus(overlay);
    expect((await screen.findByRole('tooltip', { name: 'Overlay: 7.00' })).textContent).toContain('7.00');
    expect(container.textContent).toContain('Line 1');
    expect(container.textContent).toContain('Line 2');
  });

  it('renders an empty categorical tick from an explicit domain through the public component', () => {
    const spec = categoricalDomainSpec();
    spec.width = 650;
    spec.height = 350;
    const { container } = render(
      React.createElement(VegaDeclarativeChart, {
        chartSchema: { vegaLiteSpec: spec },
        semanticMode: 'strict',
      }),
    );
    const ticks = Array.from(container.querySelectorAll('svg .tick text')).map(element => element.textContent);
    expect(ticks).toContain('empty');
    expect(screen.getByLabelText('Category: A; Level: low')).toBeTruthy();
    expect(screen.getByLabelText('Category: B; Level: high')).toBeTruthy();
  });

  it('renders shared temporal x coordinates rather than centering each single-point facet locally', () => {
    const spec: VegaLiteSpec = {
      data: {
        values: [
          { facet: 'A', when: '2024-01-01', amount: 2 },
          { facet: 'B', when: '2024-02-01', amount: 4 },
        ],
      },
      facet: { field: 'facet', type: 'nominal' },
      spec: {
        width: 650,
        height: 350,
        mark: 'line',
        encoding: {
          x: { field: 'when', type: 'temporal' },
          y: { field: 'amount', type: 'quantitative' },
          tooltip: [{ field: 'when', type: 'temporal', title: 'When', format: '%Y-%m-%d', formatType: 'utc' }],
        },
      },
    };
    render(React.createElement(VegaDeclarativeChart, { chartSchema: { vegaLiteSpec: spec }, semanticMode: 'strict' }));
    const first = screen.getByLabelText('When: 2024-01-01');
    const last = screen.getByLabelText('When: 2024-02-01');
    expect(Number(first.getAttribute('cx'))).toBeLessThan(Number(last.getAttribute('cx')));
  });

  it('renders numeric x domain bounds, not just adapter metadata', () => {
    const spec = tooltipSpec();
    spec.width = 650;
    spec.height = 350;
    spec.encoding!.x!.scale = { domain: [0, 100] };
    spec.encoding!.tooltip = [{ field: 'label', title: 'Label' }];
    const { container } = render(
      React.createElement(VegaDeclarativeChart, {
        chartSchema: { vegaLiteSpec: spec },
        semanticMode: 'strict',
      }),
    );
    expect(Array.from(container.querySelectorAll('svg .tick text')).map(element => element.textContent)).toContain(
      '100',
    );
  });

  it('renders independent composed y domains and local legends without changing the public ref', () => {
    const first = tooltipSpec();
    first.width = 650;
    first.height = 350;
    first.encoding!.y!.scale = { domain: [0, 20] };
    first.encoding!.tooltip = [{ field: 'label', title: 'Label' }];
    const second = tooltipSpec();
    second.width = 650;
    second.height = 350;
    second.data!.values = [{ x: 1, y: 100, group: 'third', label: 'independent' }];
    second.encoding!.y!.scale = { domain: [0, 200] };
    second.encoding!.tooltip = [{ field: 'label', title: 'Label' }];
    const spec: VegaLiteSpec = {
      hconcat: [first, second],
      resolve: { scale: { y: 'independent', color: 'independent' } },
    };
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      React.createElement(VegaDeclarativeChart, {
        ref,
        chartSchema: { vegaLiteSpec: spec },
        semanticMode: 'strict',
      }),
    );
    expect(ref.current).toBe(container.firstElementChild);
    const cells = container.querySelectorAll('[data-vega-view]');
    expect(cells).toHaveLength(2);
    expect(cells[0].textContent).toContain('20');
    expect(cells[0].textContent).not.toContain('200');
    expect(cells[1].textContent).toContain('200');
    expect(cells[0].textContent).toContain('one');
    expect(cells[0].textContent).not.toContain('third');
    expect(cells[1].textContent).toContain('third');
  });

  it.each(['focus', 'hover'] as const)('renders filtered shared fields on native %s', async activation => {
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 650,
      height: 350,
      top: 0,
      left: 0,
      bottom: 350,
      right: 650,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    const props = line(tooltipSpec(), colors(), false, strict);
    const view = render(
      React.createElement(
        FluentProvider,
        { theme: webLightTheme },
        React.createElement(LineChart, {
          ...props,
          width: 650,
          height: 350,
          enablePerfOptimization: true,
          hideLegend: true,
        }),
      ),
    );
    const point = await screen.findByLabelText('Label: second row; Amount: 4.00; Later: 2');
    if (activation === 'focus') {
      fireEvent.focus(point);
    } else {
      fireEvent.mouseOver(point);
    }
    const tooltip = await screen.findByRole('tooltip', { name: 'Label: second row; Amount: 4.00; Later: 2' });
    expect(tooltip.textContent).toContain('second row');
    expect(tooltip.textContent).toContain('4.00');
    expect(tooltip.textContent).not.toContain('SECRET');
    expect(view.container.textContent).not.toContain('SECRET');
  });
});
