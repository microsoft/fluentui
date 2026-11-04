import type {
  LineChartAnnotationInterval,
  LineChartAnnotationIntervalOptions,
} from './LineChartAnnotationIntervals.types';
import type { LineChartPlotContext, LineChartRect } from './LineChartScene.types';
import { createLineChartAnnotationIntervalModel } from './lineChartAnnotationIntervals';

const plotRect: LineChartRect = { x: 0, y: 5, width: 100, height: 40 };

function frame(overrides: Partial<LineChartPlotContext> = {}): LineChartPlotContext {
  return {
    frameId: 0,
    geometryVersion: 0,
    layoutEpoch: 0,
    frameTimeMs: 0,
    reducedMotion: false,
    svgRect: plotRect,
    plotRect,
    markerClipRect: plotRect,
    isRtl: false,
    plotClipPathId: 'plot',
    markerClipPathId: 'marker',
    xScale: { kind: 'number', scaleType: 'linear', domain: [0, 100], range: [0, 100] },
    yScales: [],
    axes: [],
    xAxisLabelRows: [],
    series: [],
    interaction: {},
    inspection: {},
    projectX: value => (typeof value === 'number' ? value : value instanceof Date ? value.getTime() : undefined),
    projectY: (_, value) => value,
    ...overrides,
  };
}

function interval(key: string, start: number, end: number): LineChartAnnotationInterval {
  return { key, start, end };
}

const closed: LineChartAnnotationIntervalOptions = { bounds: 'closed' };
const halfOpen: LineChartAnnotationIntervalOptions = { bounds: 'half-open' };

describe('LineChart annotation interval membership', () => {
  it('retains input order with exact closed boundaries, negative values and singletons', () => {
    const model = createLineChartAnnotationIntervalModel(
      [interval('later', 0, 10), interval('earlier', -10, 0), interval('point', 0, 0)],
      closed,
    );
    expect(model.getActiveKeys(-11)).toEqual([]);
    expect(model.getActiveKeys(-10)).toEqual(['earlier']);
    expect(model.getActiveKeys(-Number.MIN_VALUE)).toEqual(['earlier']);
    expect(model.getActiveKeys(0)).toEqual(['later', 'earlier', 'point']);
    expect(model.getActiveKeys(-0)).toBe(model.getActiveKeys(0));
    expect(model.getActiveKeys(Number.MIN_VALUE)).toEqual(['later']);
    expect(model.getActiveKeys(10)).toEqual(['later']);
    expect(model.getActiveKeys(10.00001)).toEqual([]);
    expect(model.getActiveKeys(-3)).toBe(model.getActiveKeys(-4));
    expect(model.getActiveKeys(0)).toBe(model.getActiveKeys(0));
  });

  it('uses half-open boundaries, omits zero intervals and never combines touching ranges', () => {
    const model = createLineChartAnnotationIntervalModel(
      [interval('right', 30, 50), interval('empty', 30, 30), interval('left', 10, 30)],
      halfOpen,
    );
    expect(model.getActiveKeys(10)).toEqual(['left']);
    expect(model.getActiveKeys(29.99999)).toEqual(['left']);
    expect(model.getActiveKeys(30)).toEqual(['right']);
    expect(model.getActiveKeys(30)).toBe(model.getActiveKeys(40));
    expect(model.getActiveKeys(50)).toEqual([]);
    const result = model.getLayout(frame(), 12);
    expect(result.groups.map(group => group.intervalKeys)).toEqual([['left'], ['right']]);
    expect(result.regions.map(region => [region.rect.x, region.rect.width, region.intervalKeys])).toEqual([
      [10, 20, ['left']],
      [30, 20, ['right']],
    ]);
  });

  it('captures numeric fields, keys and endpoint options without retaining caller mutation', () => {
    const item = { key: 'original', start: 10, end: 20 };
    const options: { bounds: 'closed' | 'half-open' } = { bounds: 'half-open' };
    const model = createLineChartAnnotationIntervalModel([item], options);
    item.key = 'changed';
    item.start = 80;
    item.end = 90;
    options.bounds = 'closed';
    expect(model.getActiveKeys(10)).toEqual(['original']);
    expect(model.getActiveKeys(20)).toEqual([]);
    expect(model.getActiveKeys(85)).toEqual([]);
    expect(model.getLayout(frame(), 4).groups[0].rect).toEqual({ x: 10, y: 5, width: 10, height: 40 });
  });

  it('captures frozen Date input by value and projects fresh Date values in the date family', () => {
    const start = Object.freeze(new Date(10));
    const end = Object.freeze(new Date(20));
    const inputs = Object.freeze([Object.freeze({ key: 'date', start, end })]);
    const model = createLineChartAnnotationIntervalModel(inputs, closed);
    start.setTime(80);
    end.setTime(90);
    expect(model.getActiveKeys(new Date(10))).toEqual(['date']);
    expect(model.getActiveKeys(new Date(20))).toEqual(['date']);
    expect(model.getActiveKeys(new Date(80))).toEqual([]);
    const projectX = jest.fn((value: number | Date | string) =>
      value instanceof Date ? value.getTime() * 2 : undefined,
    );
    const dateFrame = frame({
      xScale: { kind: 'date', domain: [new Date(0), new Date(100)], range: [0, 100] },
      projectX,
    });
    expect(model.getLayout(dateFrame, 4).regions[0].rect).toEqual({ x: 20, y: 5, width: 20, height: 40 });
  });

  it('returns stable empty membership for unsupported or nonfinite inspected values', () => {
    const numeric = createLineChartAnnotationIntervalModel([interval('n', 0, 10)], closed);
    const date = createLineChartAnnotationIntervalModel([{ key: 'd', start: new Date(0), end: new Date(10) }], closed);
    const empty = numeric.getActiveKeys(-1);
    for (const value of [NaN, Infinity, -Infinity, new Date(1), new Date(NaN), '1' as unknown as number]) {
      expect(numeric.getActiveKeys(value)).toBe(empty);
    }
    expect(date.getActiveKeys(1)).toBe(empty);
    expect(date.getActiveKeys(new Date(NaN))).toBe(empty);
    expect(date.getActiveKeys(new Date(1))).toEqual(['d']);
  });

  it.each([
    ['empty key', [interval('', 0, 1)], /nonempty string key/],
    ['duplicate keys', [interval('a', 0, 1), interval('a', 2, 3)], /unique/],
    ['reversed endpoints', [interval('a', 2, 1)], /start <= end/],
    ['NaN', [interval('a', NaN, 1)], /finite endpoints/],
    ['infinite end', [interval('a', 1, Infinity)], /finite endpoints/],
    ['invalid Date', [{ key: 'a', start: new Date(NaN), end: new Date(1) }], /finite endpoints/],
    ['mixed endpoints', [{ key: 'a', start: 0, end: new Date(1) }], /homogeneous/],
    ['mixed intervals', [interval('a', 0, 1), { key: 'b', start: new Date(0), end: new Date(1) }], /homogeneous/],
    ['unsupported endpoints', [{ key: 'a', start: '0', end: '1' }], /homogeneous/],
  ])('rejects %s with a descriptive configuration error', (_, inputs, message) => {
    expect(() =>
      createLineChartAnnotationIntervalModel(inputs as readonly LineChartAnnotationInterval[], closed),
    ).toThrow(message as RegExp);
  });

  it('requires explicit endpoint semantics and a finite positive caller width', () => {
    expect(() =>
      createLineChartAnnotationIntervalModel([], undefined as unknown as LineChartAnnotationIntervalOptions),
    ).toThrow(/bounds/);
    expect(() =>
      createLineChartAnnotationIntervalModel([], { bounds: 'open' } as unknown as LineChartAnnotationIntervalOptions),
    ).toThrow(/bounds/);
    const model = createLineChartAnnotationIntervalModel([], closed);
    for (const width of [0, -1, NaN, Infinity, -Infinity]) {
      expect(() => model.getLayout(frame(), width)).toThrow(/pointWidth.*finite and positive/);
    }
    expect(model.getActiveKeys(0)).toEqual([]);
    expect(model.getLayout(frame(), 1)).toEqual({ regions: [], groups: [] });
  });
});

describe('LineChart annotation interval projection', () => {
  it('partitions partial and transitive overlap without overpainting and retains input member order', () => {
    const model = createLineChartAnnotationIntervalModel(
      [interval('c', 50, 80), interval('a', 10, 40), interval('b', 20, 60)],
      closed,
    );
    const result = model.getLayout(frame(), 4);
    expect(result.regions.map(region => [region.rect.x, region.rect.width, region.intervalKeys])).toEqual([
      [10, 10, ['a']],
      [20, 20, ['a', 'b']],
      [40, 10, ['b']],
      [50, 10, ['c', 'b']],
      [60, 20, ['c']],
    ]);
    expect(result.groups.map(group => [group.intervalKeys, group.rect])).toEqual([
      [['c', 'a', 'b'], { x: 10, y: 5, width: 70, height: 40 }],
    ]);
    for (let i = 1; i < result.regions.length; i++) {
      const previous = result.regions[i - 1].rect;
      expect(previous.x + previous.width).toBeLessThanOrEqual(result.regions[i].rect.x);
    }
    expect(result.regions.reduce((width, region) => width + region.rect.width, 0)).toBe(70);
    expect(model.getActiveKeys(40)).toEqual(['a', 'b']);
    expect(model.getActiveKeys(50)).toEqual(['c', 'b']);
  });

  it('gives disconnected regions with the same membership distinct keys', () => {
    const model = createLineChartAnnotationIntervalModel(
      [interval('outer', 10, 90), interval('inner', 30, 50)],
      closed,
    );
    const { regions, groups } = model.getLayout(frame(), 4);
    expect(regions.map(region => region.intervalKeys)).toEqual([['outer'], ['outer', 'inner'], ['outer']]);
    expect(new Set(regions.map(region => region.key)).size).toBe(3);
    expect(groups).toHaveLength(1);
    expect(Object.isFrozen(regions)).toBe(true);
    expect(Object.isFrozen(regions[0])).toBe(true);
    expect(Object.isFrozen(regions[0].rect)).toBe(true);
    expect(Object.isFrozen(regions[0].intervalKeys)).toBe(true);
    expect(Object.isFrozen(groups)).toBe(true);
    expect(Object.isFrozen(groups[0])).toBe(true);
    expect(Object.isFrozen(groups[0].rect)).toBe(true);
    expect(Object.isFrozen(groups[0].intervalKeys)).toBe(true);
  });

  it('groups closed touching endpoints but not the same half-open intervals', () => {
    const inputs = [interval('a', 10, 30), interval('b', 30, 50), interval('c', 50, 70)];
    const inclusive = createLineChartAnnotationIntervalModel(inputs, closed);
    const exclusive = createLineChartAnnotationIntervalModel(inputs, halfOpen);
    expect(inclusive.getLayout(frame(), 4).groups.map(group => group.intervalKeys)).toEqual([['a', 'b', 'c']]);
    expect(exclusive.getLayout(frame(), 4).groups.map(group => group.intervalKeys)).toEqual([['a'], ['b'], ['c']]);
    expect(inclusive.getActiveKeys(30)).toEqual(['a', 'b']);
    expect(exclusive.getActiveKeys(30)).toEqual(['b']);
  });

  it('expands singleton paint only, without inventing logical overlap or hover membership', () => {
    const model = createLineChartAnnotationIntervalModel([interval('a', 40, 40), interval('b', 42, 42)], closed);
    const result = model.getLayout(frame(), 10);
    expect(result.groups.map(group => group.intervalKeys)).toEqual([['a'], ['b']]);
    expect(result.regions.map(region => [region.rect.x, region.rect.width, region.intervalKeys])).toEqual([
      [35, 2, ['a']],
      [37, 8, ['a', 'b']],
      [45, 2, ['b']],
    ]);
    expect(model.getActiveKeys(40)).toEqual(['a']);
    expect(model.getActiveKeys(41)).toEqual([]);
    expect(model.getActiveKeys(42)).toEqual(['b']);
  });

  it('does not apply the singleton width to narrow but nonzero projected intervals', () => {
    const model = createLineChartAnnotationIntervalModel(
      [interval('narrow', 40, 40.25), interval('point', 42, 42)],
      closed,
    );
    const result = model.getLayout(frame(), 10);
    expect(result.groups.map(group => [group.intervalKeys, group.rect.width])).toEqual([
      [['narrow'], 0.25],
      [['point'], 10],
    ]);
    expect(result.regions.map(region => [region.rect.x, region.rect.width, region.intervalKeys])).toEqual([
      [37, 3, ['point']],
      [40, 0.25, ['narrow', 'point']],
      [40.25, 6.75, ['point']],
    ]);
    expect(model.getActiveKeys(41)).toEqual([]);
  });

  it('clips full-height root-space rectangles and excludes wholly off-plot intervals before grouping or expansion', () => {
    const model = createLineChartAnnotationIntervalModel(
      [
        interval('outside', -20, -1),
        interval('outside-point', -1, -1),
        interval('visible', -2, 10),
        interval('edge', 0, 0),
        interval('right', 90, 120),
        interval('right-edge', 100, 100),
        interval('past-right', 101, 101),
      ],
      closed,
    );
    const result = model.getLayout(frame(), 10);
    expect(result.groups.map(group => [group.intervalKeys, group.rect])).toEqual([
      [['visible', 'edge'], { x: 0, y: 5, width: 10, height: 40 }],
      [['right', 'right-edge'], { x: 90, y: 5, width: 10, height: 40 }],
    ]);
    expect(result.regions.map(region => [region.rect.x, region.rect.width, region.intervalKeys])).toEqual([
      [0, 5, ['visible', 'edge']],
      [5, 5, ['visible']],
      [90, 5, ['right']],
      [95, 5, ['right', 'right-edge']],
    ]);
    expect(model.getActiveKeys(-1)).toEqual(['outside', 'outside-point', 'visible']);
  });

  it.each([false, true])('preserves only included point intersections at plot edges in RTL=%s', isRtl => {
    const inputs = [interval('end-only', -10, 0), interval('start-only', 100, 110)];
    const current = frame({
      isRtl,
      projectX: value => (typeof value === 'number' ? (isRtl ? 100 - value : value) : undefined),
    });
    const inclusive = createLineChartAnnotationIntervalModel(inputs, closed);
    const exclusive = createLineChartAnnotationIntervalModel(inputs, halfOpen);
    const inclusiveLayout = inclusive.getLayout(current, 10);
    expect(inclusiveLayout.groups.map(group => [group.intervalKeys, group.rect])).toEqual([
      [['end-only'], { x: isRtl ? 95 : 0, y: 5, width: 5, height: 40 }],
      [['start-only'], { x: isRtl ? 0 : 95, y: 5, width: 5, height: 40 }],
    ]);
    const exclusiveLayout = exclusive.getLayout(current, 10);
    expect(exclusiveLayout.groups.map(group => [group.intervalKeys, group.rect])).toEqual([
      [['start-only'], { x: isRtl ? 0 : 95, y: 5, width: 5, height: 40 }],
    ]);
    expect(exclusiveLayout.regions[0].rect).toEqual(exclusiveLayout.groups[0].rect);
    expect(inclusive.getActiveKeys(0)).toEqual(['end-only']);
    expect(exclusive.getActiveKeys(0)).toEqual([]);
    expect(exclusive.getActiveKeys(100)).toEqual(['start-only']);
    expect(exclusive.getActiveKeys(99)).toEqual([]);
  });

  it('normalizes RTL projection with nonzero origins and uses only the current frame projection', () => {
    const inputs = [interval('b', 20, 50), interval('a', 10, 30)];
    const model = createLineChartAnnotationIntervalModel(inputs, closed);
    const rootRect = { x: 10, y: 30, width: 100, height: 60 };
    const ltr = frame({ plotRect: rootRect, projectX: value => (typeof value === 'number' ? 10 + value : undefined) });
    const rtl = frame({
      plotRect: rootRect,
      isRtl: true,
      projectX: value => (typeof value === 'number' ? 110 - value : undefined),
    });
    const forward = model.getLayout(ltr, 4);
    const backward = model.getLayout(rtl, 4);
    expect(forward.groups[0].rect).toEqual({ x: 20, y: 30, width: 40, height: 60 });
    expect(backward.groups[0].rect).toEqual({ x: 60, y: 30, width: 40, height: 60 });
    expect(backward.regions.map(region => [region.rect.x, region.rect.width, region.intervalKeys])).toEqual([
      [60, 20, ['b']],
      [80, 10, ['b', 'a']],
      [90, 10, ['a']],
    ]);
    const reordered = createLineChartAnnotationIntervalModel(inputs.slice().reverse(), closed);
    const resized = reordered.getLayout(
      frame({
        plotRect: { ...rootRect, width: 200 },
        projectX: value => (typeof value === 'number' ? 10 + value * 2 : undefined),
      }),
      12,
    );
    expect(backward.groups[0].key).toBe(forward.groups[0].key);
    expect(resized.groups[0].key).toBe(forward.groups[0].key);
    expect(resized.groups[0].intervalKeys).toEqual(['a', 'b']);
    expect(resized.groups[0].rect).toEqual({ x: 30, y: 30, width: 80, height: 60 });
    expect(model.getActiveKeys(20)).toEqual(['b', 'a']);
  });

  it('has collision-free stable group keys even when member keys contain delimiters', () => {
    const one = createLineChartAnnotationIntervalModel(
      [interval('a,b', 10, 20), interval('c', 15, 25)],
      closed,
    ).getLayout(frame(), 4).groups[0];
    const two = createLineChartAnnotationIntervalModel(
      [interval('a', 10, 20), interval('b,c', 15, 25)],
      closed,
    ).getLayout(frame(), 4).groups[0];
    expect(one.key).not.toBe(two.key);
  });

  it('hides wrong-family and unprojectable intervals without changing captured logical coverage', () => {
    const model = createLineChartAnnotationIntervalModel(
      [interval('good', 10, 20), interval('undefined', 30, 40), interval('infinite', 50, 60), interval('nan', 70, 80)],
      closed,
    );
    const current = frame({
      projectX: value => {
        if (value === 40) {
          return undefined;
        }
        if (value === 50) {
          return Infinity;
        }
        return value === 80 ? NaN : typeof value === 'number' ? value : undefined;
      },
    });
    expect(model.getLayout(current, 4).groups.map(group => group.intervalKeys)).toEqual([['good']]);
    expect(model.getActiveKeys(35)).toEqual(['undefined']);
    expect(model.getActiveKeys(55)).toEqual(['infinite']);
    const category = frame({ xScale: { kind: 'category', domain: ['10', '20'], range: [0, 100] } });
    expect(model.getLayout(category, 4)).toEqual({ regions: [], groups: [] });
    expect(
      model.getLayout(
        frame({
          xScale: {
            kind: 'date',
            domain: [new Date(0), new Date(100)],
            range: [0, 100],
          },
        }),
        4,
      ),
    ).toEqual({ regions: [], groups: [] });
    expect(model.getLayout(frame(), 4).groups).toHaveLength(4);
  });

  it('expands a collapsed closed projection but never paints a zero-width half-open projection', () => {
    const current = frame({ projectX: () => 50 });
    const inputs = [interval('collapsed', 10, 20)];
    const inclusive = createLineChartAnnotationIntervalModel(inputs, closed);
    expect(inclusive.getLayout(current, 6).regions[0].rect).toEqual({ x: 47, y: 5, width: 6, height: 40 });
    expect(inclusive.getActiveKeys(15)).toEqual(['collapsed']);
    expect(createLineChartAnnotationIntervalModel(inputs, halfOpen).getLayout(current, 6)).toEqual({
      regions: [],
      groups: [],
    });
  });

  it.each([
    { x: NaN, y: 0, width: 100, height: 40 },
    { x: 0, y: Infinity, width: 100, height: 40 },
    { x: 0, y: 0, width: Infinity, height: 40 },
    { x: 0, y: 0, width: 100, height: NaN },
    { x: 0, y: 0, width: 0, height: 40 },
    { x: 0, y: 0, width: 100, height: -1 },
    { x: Number.MAX_VALUE, y: 0, width: Number.MAX_VALUE, height: 40 },
    { x: 0, y: Number.MAX_VALUE, width: 100, height: Number.MAX_VALUE },
  ])('omits invalid or empty root-space clipping rectangles (%o)', invalid => {
    const model = createLineChartAnnotationIntervalModel([interval('a', 10, 20)], closed);
    expect(model.getLayout(frame({ plotRect: invalid }), 4)).toEqual({ regions: [], groups: [] });
  });

  it('reuses the exact layout and projections on pointer-only frames and snapshots mutable rect scalars', () => {
    const model = createLineChartAnnotationIntervalModel([interval('point', 50, 50)], closed);
    const mutableRect = { ...plotRect };
    const projectX = jest.fn((value: number | Date | string) => (typeof value === 'number' ? value : undefined));
    const initial = frame({ plotRect: mutableRect, projectX });
    const layout = model.getLayout(initial, 4);
    expect(layout.groups[0].rect.width).toBe(4);
    const pointerFrame = frame({
      ...initial,
      frameId: 20,
      frameTimeMs: 200,
      plotRect: { ...mutableRect },
      interaction: { activeX: 50 },
      inspection: { pointer: { x: 50, y: 10 } },
    });
    expect(model.getLayout(pointerFrame, 4)).toBe(layout);
    expect(projectX).toHaveBeenCalledTimes(1);
    mutableRect.y = 15;
    const moved = model.getLayout(initial, 4);
    expect(moved).not.toBe(layout);
    expect(moved.groups[0].rect).toEqual({ x: 48, y: 15, width: 4, height: 40 });
    expect(layout.groups[0].rect.y).toBe(5);
    const wider = model.getLayout(initial, 10);
    expect(wider.groups[0].rect).toEqual({ x: 45, y: 15, width: 10, height: 40 });
    expect(wider.groups[0].key).toBe(layout.groups[0].key);
    const next = model.getLayout(
      frame({
        ...initial,
        projectX: value => (typeof value === 'number' ? value + 10 : undefined),
      }),
      10,
    );
    expect(next.groups[0].rect.x).toBe(55);
  });

  it('invalidates the cache on every clipping scalar and family, not domain or pointer metadata', () => {
    const model = createLineChartAnnotationIntervalModel([interval('a', 10, 90)], closed);
    const initial = frame();
    const original = model.getLayout(initial, 4);
    const metadata = frame({
      ...initial,
      xScale: { kind: 'number', scaleType: 'linear', domain: [-1000, 1000], range: [-50, 500] },
    });
    expect(model.getLayout(metadata, 4)).toBe(original);
    for (const changed of [
      { ...plotRect, x: 20 },
      { ...plotRect, y: 20 },
      { ...plotRect, width: 50 },
      { ...plotRect, height: 10 },
    ]) {
      const result = model.getLayout(frame({ ...initial, plotRect: changed }), 4);
      expect(result).not.toBe(original);
      expect(result.groups[0].rect.y).toBe(changed.y);
      expect(result.groups[0].rect.height).toBe(changed.height);
      expect(result.groups[0].rect.x).toBe(Math.max(10, changed.x));
      expect(result.groups[0].rect.x + result.groups[0].rect.width).toBe(Math.min(90, changed.x + changed.width));
    }
    const unsupported = frame({ ...initial, xScale: { kind: 'category', domain: [], range: [0, 100] } });
    expect(model.getLayout(unsupported, 4)).toEqual({ regions: [], groups: [] });
    expect(model.getLayout(initial, 4).groups[0].intervalKeys).toEqual(['a']);
  });

  it('handles 200 transitive intervals with exact precomputed membership and no arbitrary cap', () => {
    const inputs = Object.freeze(
      Array.from({ length: 200 }, (_, index) => Object.freeze(interval(`i-${index}`, index * 2, index * 2 + 5))),
    );
    const model = createLineChartAnnotationIntervalModel(inputs, halfOpen);
    for (let x = 0; x <= 404; x += 0.5) {
      const expected = inputs
        .filter(item => (item.start as number) <= x && x < (item.end as number))
        .map(item => item.key);
      expect(model.getActiveKeys(x)).toEqual(expected);
      expect(model.getActiveKeys(x)).toBe(model.getActiveKeys(x + 0.125));
    }
    const result = model.getLayout(frame({ plotRect: { ...plotRect, width: 405 } }), 4);
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0].intervalKeys).toEqual(inputs.map(item => item.key));
    expect(result.groups[0].rect).toEqual({ x: 0, y: 5, width: 403, height: 40 });
    expect(result.regions).toHaveLength(399);
    expect(result.regions.reduce((width, region) => width + region.rect.width, 0)).toBe(403);
  });
});
