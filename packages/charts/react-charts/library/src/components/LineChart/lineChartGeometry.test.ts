import type { CurveFactory } from 'd3-shape';
import { curveMonotoneX } from 'd3-shape';
import type { LineChartPoints } from '../../types/index';
import type { LineChartCurvePiece, LineChartPlotContext, LineChartProps, LineChartRect } from './LineChart.types';
import {
  createLineChartGeometry,
  getLineChartCurveBounds,
  hitTestLineChart,
  reprojectLineChartSeries,
  resolveLineChartCurve,
} from './lineChartGeometry';

const plotRect: LineChartRect = { x: 0, y: 0, width: 100, height: 100 };

function layout(isRtl = false): LineChartPlotContext {
  return {
    frameId: 0,
    geometryVersion: 0,
    layoutEpoch: 3,
    frameTimeMs: 0,
    reducedMotion: false,
    svgRect: plotRect,
    plotRect,
    markerClipRect: plotRect,
    isRtl,
    plotClipPathId: 'test-plot',
    markerClipPathId: 'test-marker',
    xScale: { kind: 'number', scaleType: 'linear', domain: [0, 100], range: isRtl ? [100, 0] : [0, 100] },
    yScales: [
      { key: 'y', scaleType: 'linear', domain: [0, 100], range: [0, 100] },
      { key: 'secondaryY', scaleType: 'linear', domain: [0, 100], range: [0, 100] },
    ],
    axes: [],
    xAxisLabelRows: [],
    series: [],
    interaction: {},
    inspection: {},
    projectX: value => {
      const x = value instanceof Date ? value.getTime() : value;
      return typeof x === 'number' && Number.isFinite(x) ? (isRtl ? 100 - x : x) : undefined;
    },
    projectY: (_, y) => (Number.isFinite(y) ? y : undefined),
  };
}

function source(
  values = [
    [0, 50],
    [100, 50],
  ],
): LineChartPoints {
  return { legend: 'series', data: values.map(([x, y]) => ({ x, y })) };
}

function geometry(series: LineChartPoints[], options: Partial<LineChartProps> = {}, frame = layout()) {
  return createLineChartGeometry({ data: { lineChartData: series }, ...options }, frame, 'chart');
}

/** A native curve factory that emits one exact cubic, without an SVG/DOM intermediate. */
function cubicCurve(control1: [number, number], control2: [number, number]): CurveFactory {
  return context => {
    let first = true;
    return {
      areaStart: () => undefined,
      areaEnd: () => undefined,
      lineStart() {
        first = true;
      },
      lineEnd: () => undefined,
      point(x, y) {
        if (first) {
          context.moveTo(x, y);
          first = false;
        } else {
          context.bezierCurveTo(control1[0], control1[1], control2[0], control2[1], x, y);
        }
      },
    };
  };
}

describe('LineChart shared geometry', () => {
  it('keeps original identity indexes across unplottable points without modifying input', () => {
    const input = source([
      [0, 10],
      [20, NaN],
      [40, 30],
    ]);
    const getSeriesKey = jest.fn(() => 'stable');
    const getPointKey = jest.fn((point, series, index) => `observation-${index}`);
    Object.freeze(input.data);
    Object.freeze(input);
    const [result] = geometry([input], { getSeriesKey, getPointKey });
    expect(getSeriesKey).toHaveBeenCalledWith(input, 0);
    expect(getPointKey).toHaveBeenNthCalledWith(3, input.data[2], input, 2);
    expect(result.key).toBe('stable');
    expect(result.points.map(point => [point.key, point.dataIndex])).toEqual([
      ['observation-0', 0],
      ['observation-2', 2],
    ]);
    expect(result.segments).toHaveLength(2);
    expect(result.capturedLayoutEpoch).toBe(3);
    expect(result.phase).toBe('present');
    expect(result.transition.progress).toBe(1);
  });

  it('rejects duplicate or empty identities rather than using legend text', () => {
    expect(() => geometry([source(), source()], { getSeriesKey: () => 'same' })).toThrow(/unique/);
    expect(() => geometry([source()], { getPointKey: () => '' })).toThrow(/nonempty/);
    expect(geometry([source(), source()]).map(series => series.key)).toEqual(['series-0', 'series-1']);
  });

  it.each(['linear', 'natural', 'step', 'stepAfter', 'stepBefore'] as const)(
    'cuts original gap edges before %s interpolation and preserves every endpoint',
    curve => {
      const input = source([
        [0, 10],
        [25, 20],
        [50, 30],
        [75, 40],
        [100, 50],
      ]);
      input.lineOptions = { curve, connectGaps: false };
      input.gaps = [Object.freeze({ startIndex: 3, endIndex: 4 }), Object.freeze({ startIndex: 0, endIndex: 1 })];
      Object.freeze(input.gaps);
      const [result] = geometry([input], { optimizeLargeData: true });
      expect(result.points).toHaveLength(5);
      expect(result.segments.map(segment => segment.pointKeys)).toEqual([
        ['point-0'],
        ['point-1', 'point-2', 'point-3'],
        ['point-4'],
      ]);
      expect(input.gaps.map(gap => gap.startIndex)).toEqual([3, 0]);
    },
  );

  it('unions overlapping intervals, with start=end representing no cut', () => {
    const input = source([
      [0, 10],
      [20, 20],
      [40, 30],
      [60, 40],
      [80, 50],
    ]);
    input.lineOptions = { connectGaps: false };
    input.gaps = [
      { startIndex: 2, endIndex: 3 },
      { startIndex: 1, endIndex: 2 },
      { startIndex: 4, endIndex: 4 },
    ];
    const [result] = geometry([input]);
    expect(result.segments.map(segment => segment.pointKeys)).toEqual([
      ['point-0', 'point-1'],
      ['point-2'],
      ['point-3', 'point-4'],
    ]);
  });

  it('retains omitted legacy path-branch gaps, but honors explicit false and true', () => {
    const input = { ...source(), gaps: [{ startIndex: 0, endIndex: 1 }] };
    expect(geometry([input])[0].segments).toHaveLength(2);
    expect(geometry([input], { optimizeLargeData: true })[0].segments).toHaveLength(1);
    expect(geometry([{ ...input, lineOptions: { curve: 'natural' } }])[0].segments).toHaveLength(1);
    expect(geometry([{ ...input, lineOptions: { curve: 'natural', connectGaps: false } }])[0].segments).toHaveLength(2);
    expect(geometry([{ ...input, lineOptions: { connectGaps: true } }])[0].segments).toHaveLength(1);
  });

  it.each([
    { startIndex: -1, endIndex: 1 },
    { startIndex: 0, endIndex: 2 },
    { startIndex: 0.5, endIndex: 1 },
    { startIndex: 1, endIndex: 0 },
  ])('rejects invalid opted-in gap indexes %j', gap => {
    const input = { ...source(), lineOptions: { connectGaps: false }, gaps: [gap] };
    expect(() => geometry([input])).toThrow(/original point index/);
  });

  it('does not connect nonfinite measurements even when connectGaps is true', () => {
    const input = source([
      [0, 50],
      [50, Infinity],
      [100, 50],
    ]);
    input.lineOptions = { curve: 'natural', connectGaps: true };
    const result = geometry([input]);
    expect(result[0].segments).toHaveLength(2);
    const hit = hitTestLineChart(result, { x: 50, y: 50 }, 5, plotRect);
    expect(hit?.distance).toBe(50);
    expect(hit?.segmentKey).toBeUndefined();
  });

  it('records native cubics and classifies actual RTL traversal', () => {
    const input = source([
      [0, 20],
      [50, 80],
      [100, 20],
    ]);
    input.lineOptions = { curve: curveMonotoneX };
    const [result] = geometry([input], {}, layout(true));
    expect(result.segments[0].curve.status).toBe('supported');
    expect(result.segments[0].curve.xDirection).toBe('decreasing');
    expect(result.segments[0].curve.pieces.every(piece => piece.kind === 'cubic')).toBe(true);
    expect(result.segments[0].screenXBounds).toEqual([0, 100]);
    expect(result.segments[0].pointKeys).toEqual(['point-0', 'point-1', 'point-2']);
  });

  it('detects interior x reversals and keeps exact unsupported pieces for baseline closure and hits', () => {
    const input = source([
      [0, 20],
      [100, 80],
    ]);
    input.lineOptions = { curve: cubicCurve([200, 20], [-100, 80]) };
    input.baselineFill = { value: 0 };
    const result = geometry([input]);
    expect(result[0].segments[0].curve).toMatchObject({ status: 'unsupported', reason: 'non-monotone-x' });
    expect(result[0].baselineFill?.geometry.status).toBe('ready');
    const hit = hitTestLineChart(result, { x: 50, y: 50 }, 1, plotRect);
    expect(hit?.distance).toBeCloseTo(0, 8);
    expect(hit?.position.x).toBeCloseTo(50, 8);
    expect(hit?.pointKey).toBeUndefined();
  });

  it('does not mistake reversed control points for a nonmonotone cubic', () => {
    const pieces: LineChartCurvePiece[] = [
      {
        kind: 'cubic',
        start: { x: 0, y: 0 },
        control1: { x: 0.8, y: 0 },
        control2: { x: 0.2, y: 1 },
        end: { x: 1, y: 1 },
      },
    ];
    expect(resolveLineChartCurve(pieces)).toMatchObject({ status: 'supported', xDirection: 'increasing' });
  });

  it('includes interior extrema in exact bounds, including curves with coincident endpoints', () => {
    const pieces: LineChartCurvePiece[] = [
      {
        kind: 'cubic',
        start: { x: 0, y: 0 },
        control1: { x: 100, y: 100 },
        control2: { x: -100, y: 100 },
        end: { x: 0, y: 0 },
      },
    ];
    const bounds = getLineChartCurveBounds(pieces);
    expect(bounds.x).toBeCloseTo((-100 * Math.sqrt(3)) / 6, 8);
    expect(bounds.width).toBeCloseTo((100 * Math.sqrt(3)) / 3, 8);
    expect(bounds.height).toBeCloseTo(75, 8);
    expect(resolveLineChartCurve(pieces).status).toBe('unsupported');
  });

  it('records vertical step pieces without classifying them as an x reversal', () => {
    const input = source([
      [0, 10],
      [100, 90],
    ]);
    input.lineOptions = { curve: 'stepBefore' };
    const [result] = geometry([input]);
    expect(result.segments[0].curve.xDirection).toBe('increasing');
    expect(result.segments[0].curve.pieces.some(piece => piece.start.x === piece.end.x)).toBe(true);
  });

  it('converts a native quadratic to an algebraically exact cubic', () => {
    const curve: CurveFactory = context => {
      let first = true;
      return {
        areaStart: () => undefined,
        areaEnd: () => undefined,
        lineStart: () => undefined,
        lineEnd: () => undefined,
        point(x, y) {
          if (first) {
            context.moveTo(x, y);
            first = false;
          } else {
            context.quadraticCurveTo(50, 100, x, y);
          }
        },
      };
    };
    const input = source([
      [0, 0],
      [100, 0],
    ]);
    input.lineOptions = { curve };
    const result = geometry([input]);
    const hit = hitTestLineChart(result, { x: 50, y: 50 }, 1, plotRect);
    expect(result[0].segments[0].curve.pieces[0].kind).toBe('cubic');
    expect(hit?.distance).toBeCloseTo(0, 8);
  });

  it('rejects arbitrary arc commands rather than reparsing or approximating their SVG', () => {
    const curve: CurveFactory = context => ({
      areaStart: () => undefined,
      areaEnd: () => undefined,
      lineStart: () => undefined,
      lineEnd: () => undefined,
      point() {
        context.arc(50, 50, 20, 0, Math.PI);
      },
    });
    const input = source();
    input.lineOptions = { curve };
    expect(() => geometry([input])).toThrow(/only exact line, cubic and quadratic/);
  });

  it('closes each exact run to its own baseline without stacking any series', () => {
    const first = {
      ...source([
        [0, 20],
        [100, 40],
      ]),
      baselineFill: { value: 5 },
    };
    const second = {
      ...source([
        [0, 30],
        [100, 60],
      ]),
      baselineFill: { value: 5 },
    };
    const result = geometry([first, second]);
    expect(result.map(series => series.baselineFill?.baselinePosition)).toEqual([5, 5]);
    expect(result[1].points[0].position.y).toBe(30);
    for (const series of result) {
      const fill = series.baselineFill!;
      expect(fill.opacity).toBe(0.2);
      if (fill.geometry.status === 'ready') {
        expect(fill.geometry.runs[0].path).toBe(`${series.path}L100,5L0,5Z`);
      } else {
        throw new Error('Expected nonempty fill');
      }
    }
  });

  it('keeps fills separate at gaps and reports singleton-only fills explicitly empty', () => {
    const input = source([
      [0, 20],
      [50, 40],
      [100, 30],
    ]);
    input.baselineFill = { value: 0 };
    input.lineOptions = { connectGaps: false };
    input.gaps = [{ startIndex: 0, endIndex: 2 }];
    const [result] = geometry([input]);
    expect(result.baselineFill?.geometry).toEqual({ status: 'empty', reason: 'zero-width' });
  });

  it('validates gradient recipes and uses chart-scoped safe stable gradient identities', () => {
    const input = source();
    input.baselineFill = {
      value: 0,
      gradient: {
        direction: 'vertical',
        stops: [
          { offset: 0, color: 'red' },
          { offset: 1, color: 'blue', opacity: 0 },
        ],
      },
    };
    const [result] = geometry([input], { getSeriesKey: () => 'unsafe #" key' });
    expect(result.baselineFill?.gradientId).toMatch(/^chart-gradient-[a-f0-9-]+$/);
    const invalid = { ...input, baselineFill: { value: 0, opacity: 2 } };
    expect(() => geometry([invalid])).toThrow(/opacity/);
    expect(() => geometry([{ ...input, baselineFill: { value: NaN } }])).toThrow(/finite/);
  });

  it('reprojects native curves and baseline geometry on the same motion frame', () => {
    const input = { ...source(), baselineFill: { value: 5 } };
    const [original] = geometry([input]);
    const points = original.points.map(point => ({ ...point, position: { x: point.position.x, y: 25 } }));
    const result = reprojectLineChartSeries(original, points, { ...layout(), projectY: (_, value) => value * 2 });
    expect(result.path).toBe('M0,25L100,25');
    expect(result.baselineFill?.baselinePosition).toBe(10);
    expect(original.path).toBe('M0,50L100,50');
  });

  it('supports existing scatter string x observations without narrowing the datum union', () => {
    const input: LineChartPoints = {
      legend: 'categories',
      data: [
        { x: 'a', y: 20 },
        { x: 'b', y: 80 },
      ],
    };
    const frame: LineChartPlotContext = {
      ...layout(),
      xScale: { kind: 'category', domain: ['a', 'b'], range: [0, 100] },
      projectX: x => (x === 'a' ? 0 : x === 'b' ? 100 : undefined),
    };
    const result = geometry([input], {}, frame);
    expect(result[0].path).toBe('M0,20L100,80');
    expect(hitTestLineChart(result, { x: 50, y: 50 }, 1, plotRect, 'b')?.pointKey).toBe('point-1');
  });

  it('resolves line options on the same frame and preserves zero-valued explicit widths', () => {
    const input = source();
    input.lineOptions = {
      strokeWidth: 0,
      strokeDasharray: '4 2',
      strokeDashoffset: 2,
      strokeLinecap: 'square',
      strokeLinejoin: 'bevel',
      lineBorderWidth: 3,
      lineBorderColor: 'red',
    };
    const [result] = geometry([input], { strokeWidth: 8 });
    expect(result.stroke).toMatchObject({
      width: 0,
      dashArray: '4 2',
      dashOffset: 2,
      lineCap: 'square',
      lineJoin: 'bevel',
      borderWidth: 3,
      borderColor: 'red',
      opacity: 1,
    });
  });
});

describe('LineChart exact clipped hits', () => {
  it('returns the unsnapped closest position even outside the hit threshold', () => {
    const result = geometry([source()]);
    const hit = hitTestLineChart(result, { x: 37, y: 80 }, 12, plotRect);
    expect(hit).toMatchObject({ position: { x: 37, y: 50 }, distance: 30, withinRadius: false });
    expect(hit?.pointKey).toBeUndefined();
    expect(hitTestLineChart(result, { x: 37, y: 80 }, 12, plotRect, 0)?.pointKey).toBe('point-0');
    expect(hitTestLineChart(result, { x: 37, y: 80 }, 12, plotRect, 37)?.pointKey).toBeUndefined();
  });

  it('reuses the geometry index when reveal-only frames replace series wrappers', () => {
    const [original] = geometry([source()]);
    const readPoints = jest.fn(() => original.points);
    const revealFrame = {
      ...original,
      transition: { ...original.transition, revealProgress: 0.5 },
      get points() {
        return readPoints();
      },
    };
    expect(hitTestLineChart([revealFrame], { x: 37, y: 80 }, 12, plotRect, 0)?.pointKey).toBe('point-0');
    expect(readPoints).not.toHaveBeenCalled();
  });

  it('does not create an edge target in marker-only mode', () => {
    const input = source();
    input.lineOptions = { mode: 'markers' };
    const result = geometry([input]);
    expect(result[0].path).toBe('');
    expect(result[0].segments).toHaveLength(0);
    expect(hitTestLineChart(result, { x: 50, y: 50 }, 12, plotRect)?.distance).toBe(50);
    expect(hitTestLineChart(result, { x: 50, y: 50 }, 12, plotRect)?.segmentKey).toBeUndefined();
    expect(
      hitTestLineChart(geometry([{ ...input, lineOptions: { mode: 'none' } }]), { x: 0, y: 50 }, 12, plotRect),
    ).toBeUndefined();
  });

  it('never hits the missing edge between singleton observations', () => {
    const input = source();
    input.lineOptions = { connectGaps: false };
    input.gaps = [{ startIndex: 0, endIndex: 1 }];
    const hit = hitTestLineChart(geometry([input]), { x: 50, y: 50 }, 12, plotRect);
    expect(hit).toMatchObject({ position: { x: 0, y: 50 }, withinRadius: false, distance: 50 });
    expect(hit?.segmentKey).toBeUndefined();
  });

  it('clips linear geometry before finding the nearest position', () => {
    const result = geometry([
      source([
        [-100, 50],
        [200, 50],
      ]),
    ]);
    const hit = hitTestLineChart(result, { x: -50, y: 50 }, 12, plotRect);
    expect(hit?.position.x).toBeCloseTo(0, 8);
    expect(hit?.distance).toBeCloseTo(50, 8);
    expect(
      hitTestLineChart(
        geometry([
          source([
            [-100, -10],
            [200, -10],
          ]),
        ]),
        { x: 50, y: 0 },
        12,
        plotRect,
      ),
    ).toBeUndefined();
  });

  it('finds the true interior cubic minimum, including clipped cubic portions', () => {
    const input = source([
      [0, 0],
      [100, 0],
    ]);
    input.lineOptions = { curve: cubicCurve([0, 100], [100, 100]) };
    const result = geometry([input]);
    const center = hitTestLineChart(result, { x: 50, y: 80 }, 12, plotRect);
    expect(center?.position.x).toBeCloseTo(50, 8);
    expect(center?.position.y).toBeCloseTo(75, 8);
    const clipped = hitTestLineChart(result, { x: 0, y: 75 }, 12, { x: 40, y: 0, width: 20, height: 100 });
    expect(clipped?.position.x).toBeCloseTo(40, 8);
    expect(clipped?.distance).toBeGreaterThanOrEqual(40 - 1e-8);
  });

  it('uses stable series order at crossings and skips retained exits', () => {
    const result = geometry([
      source([
        [0, 0],
        [100, 100],
      ]),
      source([
        [0, 100],
        [100, 0],
      ]),
    ]);
    expect(hitTestLineChart(result, { x: 50, y: 50 }, 12, plotRect)?.seriesKey).toBe('series-0');
    expect(
      hitTestLineChart([{ ...result[0], phase: 'exit' }, result[1]], { x: 50, y: 50 }, 12, plotRect)?.seriesKey,
    ).toBe('series-1');
  });

  it('requires singleton centers inside plotRect, regardless of visual marker bleed', () => {
    const outside = geometry([source([[-1, 50]])]);
    expect(hitTestLineChart(outside, { x: 0, y: 50 }, 12, plotRect)).toBeUndefined();
    const inside = geometry([source([[0, 50]])]);
    expect(hitTestLineChart(inside, { x: 0, y: 50 }, 0, plotRect)).toMatchObject({ withinRadius: true, distance: 0 });
  });
});
