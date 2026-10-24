import type { LineChartPoints } from '../../types/index';
import type { LineChartProps } from './LineChart.types';
import { prepareDatapoints } from '../../utilities/index';
import {
  createLineChartLayout,
  getLineChartXAxisTicks,
  getLineChartYScaleOptions,
  getLineChartYScaleTicks,
} from './lineChartScales';

const makeSeries = (values: number[], extra?: Partial<LineChartPoints>): LineChartPoints => ({
  legend: 'Series',
  data: values.map((y, x) => ({ x, y })),
  ...extra,
});
const makeProps = (lineChartData: LineChartPoints[], extra?: Partial<LineChartProps>): LineChartProps => ({
  data: { lineChartData },
  ...extra,
});
const layout = (props: LineChartProps, rtl = false) => createLineChartLayout(props, 600, 400, rtl, 'test');
const yAxis = (plot: ReturnType<typeof layout>, key: string) => plot.axes.find(axis => axis.scaleKey === key)!;

describe('LineChart scale layout', () => {
  it('resolves four independent scales and hidden projections without primary unit inheritance', () => {
    const props = makeProps(
      [makeSeries([10, 20]), makeSeries([100, 200]), makeSeries([-4, -2]), makeSeries([0.2, 0.4])],
      {
        getSeriesYScaleKey: (_series, index) => ['count', 'rate', 'negative', 'hidden'][index],
        yMinValue: -1000,
        yMaxValue: 1000,
        yAxisTickFormat: () => 'primary units',
        yScales: [
          { key: 'count', axis: { side: 'left' }, nice: false },
          { key: 'rate', axis: { side: 'right' }, nice: false },
          { key: 'negative', axis: { side: 'right' }, includeZero: false, nice: false },
          { key: 'hidden', includeZero: false, nice: false },
        ],
      },
    );
    const plot = layout(props);
    expect(plot.yScales.map(scale => scale.domain)).toEqual([
      [0, 20],
      [0, 200],
      [-4, -2],
      [0.2, 0.4],
    ]);
    expect(plot.axes.filter(axis => axis.orientation === 'y').map(axis => axis.scaleKey)).toEqual([
      'count',
      'rate',
      'negative',
    ]);
    expect(plot.projectY('hidden', 0.3)).toBeCloseTo(plot.plotRect.y + plot.plotRect.height / 2);
    expect(yAxis(plot, 'count').ticks.some(tick => tick.label === 'primary units')).toBe(false);
    expect(plot.projectY('missing', 1)).toBeUndefined();
  });

  it('groups bindings [0,0,1] by key rather than by legend or series ordinal', () => {
    const plot = layout(
      makeProps([makeSeries([2, 3]), makeSeries([30, 40]), makeSeries([0.1, 0.2])], {
        getSeriesYScaleKey: (_series, index) => ['group-0', 'group-0', 'group-1'][index],
        yScales: [
          { key: 'group-0', nice: false },
          { key: 'group-1', nice: false },
        ],
      }),
    );
    expect(plot.yScales.map(scale => [scale.key, scale.domain])).toEqual([
      ['group-0', [0, 40]],
      ['group-1', [0, 0.2]],
    ]);
  });

  it('creates a bound secondary scale without requiring legacy secondary options', () => {
    const plot = layout(
      makeProps([makeSeries([200, 240], { useSecondaryYScale: true })], {
        secondaryYScaleOptions: undefined,
      }),
    );
    expect(plot.yScales[0].key).toBe('secondaryY');
    expect(plot.yScales[0].domain[1]).toBeGreaterThanOrEqual(240);
    expect(plot.projectY('secondaryY', 200)).toEqual(expect.any(Number));
  });

  it('keeps reserved secondary defaults and merges each defined reserved field independently', () => {
    const props = makeProps([makeSeries([2, 4]), makeSeries([120, 150], { useSecondaryYScale: true })], {
      yMinValue: -10,
      yMaxValue: 20,
      yAxisTickCount: 7,
      yAxisTitle: 'Native title',
      yAxis: {
        nice: false,
        includeZero: false,
        inset: { start: 3, end: 4 },
        line: { strokeWidth: 2 },
        axis: { labelsVisible: false },
      },
      secondaryYScaleOptions: {},
      yScales: [
        { key: 'y', nice: undefined, inset: { end: 8 }, line: { strokeWidth: 5 }, axis: { labelsVisible: true } },
      ],
    });
    const options = getLineChartYScaleOptions(props, 'y');
    expect(options.nice).toBe(false);
    expect(options.inset).toEqual({ start: 3, end: 8 });
    expect(options.axis).toMatchObject({ side: 'left', title: 'Native title', labelsVisible: true });
    expect(options.line?.strokeWidth).toBe(5);
    expect(layout(props).yScales.find(scale => scale.key === 'y')!.domain).toEqual([-10, 20]);
    const secondaryDomain = layout(props).yScales.find(scale => scale.key === 'secondaryY')!.domain;
    const nativeTicks = prepareDatapoints(150, 0, 7, true);
    expect(secondaryDomain).toEqual([nativeTicks[0], nativeTicks[nativeTicks.length - 1]]);
    expect(secondaryDomain[0]).toBeLessThanOrEqual(0);
    expect(secondaryDomain[1]).toBeGreaterThanOrEqual(150);
    const defaultHintDomain = layout({ ...props, data: { lineChartData: [makeSeries([2, 4])] } }).yScales.find(
      scale => scale.key === 'secondaryY',
    )!.domain;
    expect(defaultHintDomain[0]).toBeLessThanOrEqual(0);
    expect(defaultHintDomain[1]).toBeGreaterThanOrEqual(100);
  });

  it('exact domains override hints, zero inclusion, nice and out-of-domain tick values', () => {
    const props = makeProps([makeSeries([100, 200], { lineOptions: { mode: 'lines+markers' } })], {
      xMinValue: -100,
      xMaxValue: 100,
      yMinValue: -100,
      yMaxValue: 1000,
      tickValues: [-1, 0, 0.5, 2],
      xAxis: { domain: [0, 1], nice: true, tickText: ['outside', 'start', 'middle', 'outside'] },
      yScales: [
        {
          key: 'y',
          domain: [110, 190],
          nice: true,
          includeZero: true,
          tickValues: [100, 120, 180, 200],
          tickText: ['outside', 'low', 'high', 'outside'],
        },
      ],
    });
    const plot = layout(props);
    expect(plot.xScale.domain).toEqual([0, 1]);
    expect(plot.yScales[0].domain).toEqual([110, 190]);
    expect(getLineChartXAxisTicks(plot).map(tick => [tick.value, tick.label])).toEqual([
      [0, 'start'],
      [0.5, 'middle'],
    ]);
    expect(yAxis(plot, 'y').ticks.map(tick => [tick.value, tick.label])).toEqual([
      [120, 'low'],
      [180, 'high'],
    ]);
    expect(plot.projectY('y', 100)!).toBeGreaterThan(plot.plotRect.y + plot.plotRect.height);
  });

  it('mirrors only screen ranges in RTL and keeps data-order inset meaning', () => {
    const props = makeProps([makeSeries([0, 10])], {
      xAxis: { domain: [0, 1], inset: { start: 5, end: 15 } },
      yScales: [{ key: 'y', domain: [0, 10], inset: { start: 7, end: 11 } }],
    });
    const ltr = layout(props);
    const rtl = layout(props, true);
    expect(rtl.xScale.domain).toEqual(ltr.xScale.domain);
    expect(rtl.projectX(0)).toBe(rtl.plotRect.x + rtl.plotRect.width - 5);
    expect(rtl.projectX(1)).toBe(rtl.plotRect.x + 15);
    expect(ltr.projectX(0)).toBe(ltr.plotRect.x + 5);
    expect(ltr.projectY('y', 0)).toBe(ltr.plotRect.y + ltr.plotRect.height - 7);
    expect(ltr.projectY('y', 10)).toBe(ltr.plotRect.y + 11);
    expect(yAxis(rtl, 'y').side).toBe('left');
    expect(ltr.plotRect).toEqual(rtl.plotRect);
  });

  it('uses exact Date domains and native formatter precedence without widening for tick values', () => {
    const start = new Date('2026-01-01T03:20:00Z');
    const end = new Date('2026-01-02T06:40:00Z');
    const outside = new Date('2026-01-03T00:00:00Z');
    const formatter = jest.fn((value: number | Date) => `callback:${+value}`);
    const customDateTimeFormatter = jest.fn(() => 'custom');
    const props = makeProps(
      [
        {
          legend: 'Dates',
          data: [
            { x: start, y: 1 },
            { x: end, y: 2 },
          ],
        },
      ],
      {
        useUTC: true,
        xAxis: { domain: [start, end], nice: true, tickText: ['mapped'] },
        tickValues: [start, end, outside],
        tickFormat: formatter,
        customDateTimeFormatter,
      },
    );
    const plot = layout(props);
    expect(plot.xScale.domain).toEqual([start, end]);
    expect(getLineChartXAxisTicks(plot).map(tick => tick.label)).toEqual(['mapped', `callback:${+end}`]);
    expect(customDateTimeFormatter).not.toHaveBeenCalled();
    expect(plot.projectX(+start)).toBeUndefined();
    expect(plot.projectX(new Date(NaN))).toBeUndefined();
    expect(plot.projectX(start)).toBe(plot.plotRect.x);
    const custom = layout({ ...props, tickFormat: undefined, xAxis: { domain: [start, end] } });
    expect(getLineChartXAxisTicks(custom).every(tick => tick.label === 'custom')).toBe(true);
  });

  it('supports category ordering and tick text without invoking a continuous formatter', () => {
    const formatter = jest.fn(() => 'not-category');
    const plot = layout(
      makeProps(
        [
          {
            legend: 'Categories',
            data: [
              { x: 'B', y: 2 },
              { x: 'A', y: 1 },
            ],
          },
        ],
        {
          xAxisCategoryOrder: ['A', 'B'],
          xAxis: { tickText: ['First', 'Second'] },
          tickFormat: formatter,
        },
      ),
    );
    expect(plot.xScale.domain).toEqual(['A', 'B']);
    expect(getLineChartXAxisTicks(plot).map(tick => tick.label)).toEqual(['First', 'Second']);
    expect(plot.projectX('A')).toBe(plot.plotRect.x);
    expect(plot.projectX('unknown')).toBeUndefined();
    expect(plot.projectX(1)).toBeUndefined();
    expect(formatter).not.toHaveBeenCalled();
  });

  it('applies integer policy independently and keeps explicit fractional ticks authoritative', () => {
    const props = makeProps([makeSeries([0, 2]), makeSeries([0, 2])], {
      getSeriesYScaleKey: (_series, index) => (index === 0 ? 'integer' : 'continuous'),
      yScales: [
        { key: 'integer', axis: {}, domain: [0, 2], tickPolicy: 'integer', tickCount: 8 },
        { key: 'continuous', axis: {}, domain: [0, 2], tickPolicy: 'continuous', tickCount: 8 },
      ],
    });
    const plot = layout(props);
    expect(yAxis(plot, 'integer').ticks.every(tick => Number.isInteger(tick.value))).toBe(true);
    expect(yAxis(plot, 'continuous').ticks.some(tick => !Number.isInteger(tick.value))).toBe(true);
    const explicit = layout({
      ...props,
      yScales: [
        { key: 'integer', axis: {}, domain: [0, 2], tickPolicy: 'integer', tickValues: [0.25, 1.75] },
        props.yScales![1],
      ],
    });
    expect(yAxis(explicit, 'integer').ticks.map(tick => tick.value)).toEqual([0.25, 1.75]);
  });

  it('reuses native numeric and logarithmic tick-step syntax and honors origin', () => {
    const plot = layout(
      makeProps([], {
        yScales: [
          { key: 'linear', axis: {}, domain: [0, 3], tickStep: 1, tick0: 0.5 },
          { key: 'log', axis: {}, scaleType: 'log', domain: [1, 100], tickStep: 1 },
          { key: 'log-linear', axis: {}, scaleType: 'log', domain: [1, 3], tickStep: 'L0.5', tick0: 1 },
        ],
      }),
    );
    expect(yAxis(plot, 'linear').ticks.map(tick => tick.value)).toEqual([0.5, 1.5, 2.5]);
    expect(yAxis(plot, 'log').ticks.map(tick => tick.value)).toEqual([1, 10, 100]);
    expect(yAxis(plot, 'log-linear').ticks.map(tick => tick.value)).toEqual([1, 1.5, 2, 2.5, 3]);
    expect(plot.projectY('log', 0)).toBeUndefined();
    expect(plot.projectY('log', -1)).toBeUndefined();
  });

  it('keeps finite empty/zero-only domains and excludes nonpositive logarithmic data', () => {
    const plot = layout(
      makeProps([makeSeries([0, 0]), makeSeries([-3, 0, 2, 20])], {
        getSeriesYScaleKey: (_series, index) => (index === 0 ? 'zero' : 'positive'),
        yScales: [
          { key: 'zero' },
          { key: 'empty' },
          { key: 'positive', scaleType: 'log', nice: false },
          { key: 'empty-log', scaleType: 'log' },
        ],
      }),
    );
    expect(plot.yScales.map(scale => scale.domain)).toEqual([
      [0, 1],
      [0, 1],
      [2, 20],
      [1, 10],
    ]);
    expect(plot.projectY('zero', NaN)).toBeUndefined();
    expect(plot.projectY('positive', 2)).toEqual(expect.any(Number));
  });

  it('reserves measured axes outward on both physical sides and treats margins as floors', () => {
    const props = makeProps([], {
      margins: { left: 10, right: 10, top: 10, bottom: 10 },
      yScales: [
        { key: 'first', axis: { side: 'right' } },
        { key: 'second', axis: { side: 'left' } },
        { key: 'third', axis: { side: 'right' } },
      ],
    });
    const plot = createLineChartLayout(
      props,
      600,
      400,
      true,
      'axes',
      undefined,
      new Map([
        ['y:first', 40],
        ['y:second', 50],
        ['y:third', 60],
        ['x', 30],
      ]),
    );
    expect(plot.plotRect).toEqual({ x: 50, y: 10, width: 450, height: 360 });
    expect(yAxis(plot, 'first').rect.x).toBe(500);
    expect(yAxis(plot, 'third').rect.x).toBe(540);
    expect(yAxis(plot, 'second').rect.x).toBe(0);
  });

  it('reserves rows once, clamps measured heights, and retains x ticks when the axis is hidden', () => {
    const props = makeProps([makeSeries([0, 1])], {
      margins: { bottom: 100 },
      xAxis: { axis: false, domain: [0, 1] },
      tickValues: [0, 1],
      xAxisLabelRows: [
        { key: 'reserved', layout: 'reserved', height: 20, gap: 3, onRender: () => null },
        { key: 'measured', layout: 'measured', minHeight: 10, maxHeight: 25, gap: 2, onRender: () => null },
      ],
    });
    const plot = createLineChartLayout(props, 600, 400, false, 'rows', new Map([['measured', 70]]));
    expect(plot.plotRect.y + plot.plotRect.height).toBe(300);
    expect(plot.xAxisLabelRows.map(row => [row.rect.y, row.rect.height])).toEqual([
      [303, 20],
      [325, 25],
    ]);
    expect(plot.axes.some(axis => axis.orientation === 'x')).toBe(false);
    expect(getLineChartXAxisTicks(plot).map(tick => tick.value)).toEqual([0, 1]);
    expect(getLineChartXAxisTicks(plot).every(tick => !tick.labelVisible)).toBe(true);
  });

  it('keeps insets independent from plot/grid bounds and marker clipping', () => {
    const plot = layout(
      makeProps([makeSeries([0, 10])], {
        markerClipPadding: { left: 4, top: 8 },
        xAxis: { domain: [0, 1], inset: { start: 10, end: 20 } },
        yScales: [{ key: 'y', domain: [0, 10], inset: { start: 5, end: 15 } }],
      }),
    );
    expect(plot.xScale.range).toEqual([plot.plotRect.x + 10, plot.plotRect.x + plot.plotRect.width - 20]);
    expect(plot.markerClipRect).toEqual({
      x: plot.plotRect.x - 4,
      y: plot.plotRect.y - 8,
      width: plot.plotRect.width + 4,
      height: plot.plotRect.height + 8,
    });
    expect(yAxis(plot, 'y').rect.height).toBe(plot.plotRect.height);
    expect(plot.plotClipPathId).toBe('test-plot-clip');
    expect(plot.markerClipPathId).toBe('test-marker-clip');
  });

  it('does not mutate frozen inputs and produces no drawable projections for an empty host', () => {
    const point = Object.freeze({ x: 0, y: 2 });
    const series = Object.freeze({ legend: 'Frozen', data: Object.freeze([point]) });
    const props = Object.freeze({
      data: Object.freeze({ lineChartData: Object.freeze([series]) }),
      yScales: Object.freeze([Object.freeze({ key: 'y', domain: Object.freeze([1, 3]) })]),
    }) as unknown as LineChartProps;
    expect(layout(props).yScales[0].domain).toEqual([1, 3]);
    const zero = createLineChartLayout(props, 0, 0, false, 'empty');
    expect(zero.projectX(0)).toBeUndefined();
    expect(zero.projectY('y', 2)).toBeUndefined();
    expect(zero.plotRect.width).toBe(0);
    expect(zero.plotRect.height).toBe(0);
  });

  it('retains grid ticks for an explicitly hidden reserved axis', () => {
    const plot = layout(
      makeProps([makeSeries([0, 2])], {
        yScales: [{ key: 'y', axis: false, domain: [0, 2], tickValues: [0, 1, 2], grid: { visible: true } }],
      }),
    );
    expect(plot.axes.some(axis => axis.scaleKey === 'y')).toBe(false);
    expect(getLineChartYScaleTicks(plot, 'y').map(tick => tick.value)).toEqual([0, 1, 2]);
    expect(getLineChartYScaleTicks(plot, 'y').map(tick => tick.position)).toEqual([
      plot.projectY('y', 0),
      plot.projectY('y', 1),
      plot.projectY('y', 2),
    ]);
    expect(getLineChartYScaleTicks(plot, 'y').every(tick => !tick.labelVisible)).toBe(true);
  });

  it('filters generated fractional step ticks under integer policy without changing the domain', () => {
    const plot = layout(
      makeProps([], {
        yScales: [{ key: 'integers', domain: [0, 2], tickPolicy: 'integer', tickStep: 0.5 }],
      }),
    );
    expect(getLineChartYScaleTicks(plot, 'integers').map(tick => tick.value)).toEqual([0, 1, 2]);
    expect(plot.yScales[0].domain).toEqual([0, 2]);
  });

  it('uses supplied actual x-label widths when resolving overlap', () => {
    const props = makeProps([makeSeries([0, 1])], {
      xAxis: { domain: [0, 1], tickText: ['A', 'B', 'C'] },
      tickValues: [0, 0.1, 1],
    });
    const plot = createLineChartLayout(
      props,
      600,
      400,
      false,
      'measured',
      undefined,
      new Map([
        ['x-tick:x-tick-0', 120],
        ['x-tick:x-tick-1', 120],
        ['x-tick:x-tick-2', 120],
      ]),
    );
    expect(getLineChartXAxisTicks(plot).map(tick => tick.labelVisible)).toEqual([true, false, true]);
    expect(getLineChartXAxisTicks(plot).map(tick => tick.value)).toEqual([0, 0.1, 1]);
  });

  it('supports nice:false for automatic numeric and Date extents', () => {
    const numeric = layout(
      makeProps(
        [
          {
            legend: 'Numeric',
            data: [
              { x: 0.13, y: 1 },
              { x: 0.87, y: 2 },
            ],
          },
        ],
        {
          xAxis: { nice: false },
        },
      ),
    );
    expect(numeric.xScale.domain).toEqual([0.13, 0.87]);
    const start = new Date('2026-01-01T03:20:00Z');
    const end = new Date('2026-01-02T06:40:00Z');
    const date = layout(
      makeProps(
        [
          {
            legend: 'Dates',
            data: [
              { x: start, y: 1 },
              { x: end, y: 2 },
            ],
          },
        ],
        {
          xAxis: { nice: false },
          useUTC: true,
        },
      ),
    );
    expect(date.xScale.domain).toEqual([start, end]);
  });

  it('does not change reserved automatic domains when only tick policy changes', () => {
    const data = [makeSeries([1, 3])];
    const legacy = layout(makeProps(data, { yScales: [{ key: 'y', tickPolicy: 'legacy' }] }));
    const continuous = layout(makeProps(data, { yScales: [{ key: 'y', tickPolicy: 'continuous' }] }));
    expect(continuous.yScales[0].domain).toEqual(legacy.yScales[0].domain);
  });

  it('keeps arbitrary y scale keys separate from measured x titles and tick widths', () => {
    const props = makeProps([makeSeries([0, 1]), makeSeries([0, 1])], {
      margins: { left: 0, right: 0, top: 0, bottom: 0 },
      getSeriesYScaleKey: (_series, index) => (index === 0 ? 'x-title' : 'x-tick:x-tick-0'),
      xAxis: { domain: [0, 1], axis: { title: 'Measured x title' } },
      tickValues: [0, 0.1, 1],
      yScales: [
        { key: 'x-title', axis: { side: 'left' }, domain: [0, 1] },
        { key: 'x-tick:x-tick-0', axis: { side: 'right' }, domain: [0, 1] },
      ],
    });
    const dimensions = new Map([
      ['y:x-title', 70],
      ['y:x-tick:x-tick-0', 50],
      ['x', 20],
      ['x-title', 46],
      ['x-tick:x-tick-0', 180],
      ['x-tick:x-tick-1', 180],
      ['x-tick:x-tick-2', 180],
    ]);
    const plot = createLineChartLayout(props, 600, 400, false, 'open-keys', undefined, dimensions);
    expect(plot.plotRect).toEqual({ x: 70, y: 0, width: 480, height: 334 });
    expect(yAxis(plot, 'x-title').rect).toEqual({ x: 0, y: 0, width: 70, height: 334 });
    expect(yAxis(plot, 'x-tick:x-tick-0').rect).toEqual({ x: 550, y: 0, width: 50, height: 334 });
    expect(plot.axes.find(axis => axis.orientation === 'x')!.rect.height).toBe(66);
    expect(getLineChartXAxisTicks(plot).map(tick => tick.labelVisible)).toEqual([true, false, true]);
    expect(plot.projectX(0)).toBe(70);
    expect(plot.projectX(1)).toBe(550);
  });

  it('reserves a native header using its font, padding and baseline without adding user margins twice', () => {
    const props = makeProps([], {
      margins: { left: 0, right: 0, top: 0, bottom: 0 },
      xAxis: { axis: false },
      yScales: [{ key: 'hidden' }],
      xAxisAnnotation: 'Existing header caption',
      titleStyles: { titleFont: { size: 30 }, titlePad: { t: 10, b: 2 }, titleYAnchor: 'top' },
    });
    const plot = layout(props);
    expect(plot.plotRect).toEqual({ x: 0, y: 84, width: 600, height: 316 });
    expect(plot.projectY('hidden', 1)).toBe(84);
    expect(layout({ ...props, margins: { top: 120 } }).plotRect.y).toBe(120);
    expect(layout({ ...props, xAxisAnnotation: '' }).plotRect.y).toBe(0);
    expect(layout({ ...props, titleStyles: undefined }).plotRect.y).toBe(40);
  });

  it.each([false, true])('reserves the native vertical caption outside all axes in RTL=%s', rtl => {
    const props = makeProps([], {
      margins: { left: 0, right: 0, top: 0, bottom: 0 },
      xAxis: { axis: false },
      yAxisAnnotation: 'Existing vertical caption',
      yScales: [
        { key: 'first-left', axis: { side: 'left' } },
        { key: 'second-left', axis: { side: 'left' } },
        { key: 'right', axis: { side: 'right' } },
      ],
    });
    const widths = new Map([
      ['y:first-left', 30],
      ['y:second-left', 40],
      ['y:right', 50],
    ]);
    const plot = createLineChartLayout(props, 600, 400, rtl, 'captions', undefined, widths);
    expect(plot.plotRect).toEqual({ x: rtl ? 107 : 70, y: 0, width: 443, height: 400 });
    expect(yAxis(plot, 'second-left').rect.x).toBe(rtl ? 37 : 0);
    expect(yAxis(plot, 'right').rect.x + 50).toBe(rtl ? 600 : 563);
    const suppressed = createLineChartLayout(
      { ...props, secondaryYAxistitle: 'Native secondary title' },
      600,
      400,
      rtl,
      'captions',
      undefined,
      widths,
    );
    expect(suppressed.plotRect).toEqual({ x: 70, y: 0, width: 480, height: 400 });
    const minimum = createLineChartLayout(
      { ...props, margins: { left: 150, right: 150, top: 0, bottom: 0 } },
      600,
      400,
      rtl,
      'captions',
      undefined,
      widths,
    );
    expect(minimum.plotRect).toEqual({ x: 150, y: 0, width: 300, height: 400 });
  });

  it.each([
    { yScales: [{ key: 'x' }] },
    { yScales: [{ key: 'duplicate' }, { key: 'duplicate' }] },
    { yScales: [{ key: '' }] },
    { getSeriesYScaleKey: () => 'unknown' },
    { yScales: [{ key: 'y', domain: [2, 1] }] },
    { yScales: [{ key: 'y', scaleType: 'log', includeZero: true }] },
    { yScales: [{ key: 'y', scaleType: 'log', tickPolicy: 'integer' }] },
    { yScales: [{ key: 'y', tickCount: 0 }] },
    { xAxis: { inset: { start: 1000 } } },
  ] as Partial<LineChartProps>[])('rejects invalid scale configuration %#', extra => {
    expect(() => layout(makeProps([makeSeries([1, 2])], extra))).toThrow('LineChart:');
  });
});
