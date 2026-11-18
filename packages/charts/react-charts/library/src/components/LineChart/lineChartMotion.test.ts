import * as React from 'react';
import { act, render } from '@testing-library/react';
import type { LineChartPoints } from '../../types/index';
import type { LineChartMotionOptions, LineChartPlotContext, LineChartProps } from './LineChart.types';
import {
  advanceLineChartMotion,
  getLineChartMotionStage,
  getLineChartSeriesPresentation,
  parseLineChartEasing,
} from './lineChartMotion';
import { createLineChartGeometry } from './lineChartGeometry';
import {
  createLineChartLayout,
  getLineChartXAxisTicks,
  getLineChartYScaleTicks,
  setLineChartXAxisTicks,
  setLineChartYScaleTicks,
} from './lineChartScales';
import { useLineChartSceneMotion } from './useLineChartSceneMotion';
import { useLineChartSceneInteraction } from './useLineChartSceneInteraction';

const motion: LineChartMotionOptions = {
  enter: { durationMs: 100, easing: 'linear' },
  update: { durationMs: 100, easing: 'linear' },
  exit: { durationMs: 50, easing: 'linear' },
};

function line(key: string, values = [2, 6]): LineChartPoints {
  return {
    color: '#0078d4',
    data: values.map((y, index) => ({ x: index * 5, y })),
    legend: key,
    lineOptions: { curve: 'linear' },
  };
}

function scene(series: LineChartPoints[], maximum = 10, epoch = 1, width = 400): LineChartPlotContext {
  const props: LineChartProps = {
    data: { lineChartData: series },
    getSeriesKey: value => value.legend,
    xAxis: { domain: [0, 10] },
    tickValues: [0, 5, 10],
    yAxis: { domain: [0, maximum], tickValues: [0, maximum / 2, maximum] },
  };
  const base = createLineChartLayout(props, width, 300, false, 'motion-test');
  const layout = { ...base, layoutEpoch: epoch };
  const result = { ...layout, series: createLineChartGeometry(props, layout, 'motion-test') };
  setLineChartXAxisTicks(result, getLineChartXAxisTicks(base));
  for (const scale of base.yScales) {
    setLineChartYScaleTicks(result, scale.key, getLineChartYScaleTicks(base, scale.key));
  }
  return result;
}

function dateScene(source: LineChartPoints): LineChartPlotContext {
  const props: LineChartProps = {
    data: { lineChartData: [source] },
    getSeriesKey: value => value.legend,
    xAxis: { domain: [new Date(0), new Date(100)] },
    tickValues: [new Date(0), new Date(50), new Date(100)],
    yAxis: { domain: [0, 10], tickValues: [0, 5, 10] },
  };
  const layout = createLineChartLayout(props, 400, 300, false, 'date-motion');
  const result = { ...layout, series: createLineChartGeometry(props, layout, 'date-motion') };
  setLineChartXAxisTicks(result, getLineChartXAxisTicks(layout));
  for (const scale of layout.yScales) {
    setLineChartYScaleTicks(result, scale.key, getLineChartYScaleTicks(layout, scale.key));
  }
  return result;
}

function withTiming(enter: number, update: number, exit: number): LineChartMotionOptions {
  return {
    enter: { durationMs: enter, easing: 'linear' },
    update: { durationMs: update, easing: 'linear' },
    exit: { durationMs: exit, easing: 'linear' },
  };
}

describe('LineChart shared motion timeline', () => {
  it('samples idle commit time without rebuilding static geometry or projections', () => {
    const target = scene([line('a')]);
    const initial = advanceLineChartMotion(undefined, target, undefined, 0, false);
    const idle = advanceLineChartMotion(initial, target, undefined, 500, false);
    expect(initial.active).toBe(false);
    expect(idle.plot.series).toBe(initial.plot.series);
    expect(idle.plot.projectX).toBe(initial.plot.projectX);
    expect(idle.plot.projectY).toBe(initial.plot.projectY);
    expect(idle.plot.geometryVersion).toBe(initial.plot.geometryVersion);
    expect(idle.plot.frameId).toBe(initial.plot.frameId + 1);
    expect(idle.plot.frameTimeMs).toBe(500);
    expect(initial.plot.series[0].phase).toBe('present');
    expect(initial.plot.series[0].transition).toEqual({
      durationMs: 0,
      entranceEndMs: 0,
      exitDelayMs: 0,
      progress: 1,
      revealProgress: 1,
      startMs: 0,
    });
    expect(initial.plot.series[0].points).toBe(target.series[0].points);
    expect(initial.plot.projectX).toBe(target.projectX);
    expect(initial.plot.projectY).toBe(target.projectY);
  });

  it('advances reveal stages without rebuilding geometry or replaying entry on equivalent options', () => {
    const source = line('a');
    source.baselineFill = {
      value: 0,
      gradient: {
        direction: 'vertical',
        stops: [
          { offset: 0, color: '#fff' },
          { offset: 1, color: '#0078d4' },
        ],
      },
    };
    const target = scene([source]);
    const options = { ...motion, stages: { marks: 20, labels: 40, axes: 10, grid: 0 } };
    const first = advanceLineChartMotion(undefined, target, options, 0, false);
    const next = advanceLineChartMotion(first, target, { ...options }, 50, false);
    expect(next.plot.series[0].transition.revealProgress).toBeCloseTo(0.3);
    expect(getLineChartMotionStage(next.plot, 'labels', next.plot.series[0]).revealProgress).toBeCloseTo(0.1);
    expect(getLineChartMotionStage(next.plot, 'axes').revealProgress).toBeCloseTo(0.4);
    expect(next.plot.series[0].points).toBe(first.plot.series[0].points);
    expect(next.plot.series[0].segments).toBe(first.plot.series[0].segments);
    expect(next.plot.series[0].baselineFill).toBe(first.plot.series[0].baselineFill);
    expect(next.plot.projectX).toBe(first.plot.projectX);
    expect(next.plot.geometryVersion).toBe(first.plot.geometryVersion);
    expect(next.plot.frameId).toBeGreaterThan(first.plot.frameId);
    const settled = advanceLineChartMotion(next, target, options, 140, false);
    expect(settled.active).toBe(false);
    expect(settled.plot.series[0].phase).toBe('present');
    expect(settled.plot.series[0].revealMaskId).toBe(first.plot.series[0].revealMaskId);
    expect(settled.plot.series[0].transition.revealProgress).toBe(1);
  });

  it('captures reverse stage delays from the entrance window, not removal order or wall time', () => {
    const input = [line('a'), line('b'), line('c')];
    const target = scene(input);
    const options = { ...withTiming(100, 0, 50), staggerMs: 30, stages: { labels: 20 } };
    let state = advanceLineChartMotion(undefined, target, options, 0, false);
    state = advanceLineChartMotion(state, target, options, 200, false);
    state = advanceLineChartMotion(state, scene([input[2], input[1], input[0]]), options, 300, false);
    const removed = advanceLineChartMotion(state, scene([]), options, 500, false);
    const a = removed.plot.series.find(series => series.key === 'a')!;
    const c = removed.plot.series.find(series => series.key === 'c')!;
    expect(a.phase).toBe('exit');
    expect(a.transition.entranceEndMs).toBe(100);
    expect(a.transition.exitDelayMs).toBe(40);
    expect(a.transition.startMs).toBe(540);
    expect(a.transition.durationMs).toBe(50);
    expect(c.transition.exitDelayMs).toBe(10);
    expect(getLineChartMotionStage(removed.plot, 'labels', a).startMs).toBe(530);
    const complete = advanceLineChartMotion(removed, removed.target, options, 600, false);
    expect(complete.plot.series).toHaveLength(0);
    expect(complete.active).toBe(false);
  });

  it('interpolates geometry while retaining actual source observations and baseline configuration', () => {
    const options = withTiming(0, 100, 50);
    const from = scene([{ ...line('a', [2, 6]), baselineFill: { value: 2 } }]);
    const target = scene([{ ...line('a', [8, 12]), baselineFill: { value: 4 } }], 20);
    let state = advanceLineChartMotion(undefined, from, options, 0, false);
    state = advanceLineChartMotion(state, target, options, 10, false);
    const middle = advanceLineChartMotion(state, target, options, 60, false);
    const series = middle.plot.series[0];
    const point = series.points[0];
    expect(middle.plot.yScales[0].domain[1]).toBe(15);
    expect(point.data).toBe(target.series[0].points[0].data);
    expect(point.data.y).toBe(8);
    expect(point.position.y).toBeCloseTo(middle.plot.projectY(series.scaleKey, 5)!);
    expect(point.position.x).toBeCloseTo(middle.plot.projectX(point.data.x)!);
    expect(series.segments[0].curve.pieces[0].start.y).toBeCloseTo(point.position.y);
    expect(series.baselineFill?.baselineValue).toBeCloseTo(3);
    expect(series.baselineFill?.baselinePosition).toBeCloseTo(middle.plot.projectY(series.scaleKey, 3)!);
    expect(series.data).toBe(target.series[0].data);
    expect(series.data.baselineFill?.value).toBe(4);
    for (const axis of middle.plot.axes) {
      for (const tick of axis.ticks) {
        const expected =
          axis.orientation === 'x'
            ? middle.plot.projectX(tick.value)
            : middle.plot.projectY(axis.scaleKey, Number(tick.value));
        expect(tick.position).toBeCloseTo(expected!);
      }
    }
    expect(middle.plot.geometryVersion).toBeGreaterThan(state.plot.geometryVersion);
    expect(middle.plot.series[0].transition.revealProgress).toBe(1);
  });

  it('preserves an in-flight deadline when target geometry is recreated with fresh presentation metadata', () => {
    const options = withTiming(0, 100, 0);
    const from = scene([line('a', [2, 6])]);
    const target = scene([line('a', [8, 12])], 20);
    let state = advanceLineChartMotion(undefined, from, options, 0, false);
    state = advanceLineChartMotion(state, target, options, 10, false);
    state = advanceLineChartMotion(state, target, options, 40, false);
    const callback = jest.fn();
    for (const time of [50, 70, 90]) {
      const source = { ...line('a', [8, 12]), color: '#f00', onLineClick: callback };
      const fresh = scene([source], 20);
      state = advanceLineChartMotion(state, fresh, options, time, false);
      expect(state.plot.series[0].transition.startMs).toBe(10);
      expect(state.plot.series[0].transition.durationMs).toBe(100);
      expect(state.plot.series[0].transition.progress).toBeCloseTo((time - 10) / 100);
      expect(state.plot.series[0].data).toBe(source);
      expect(state.plot.series[0].data.onLineClick).toBe(callback);
      expect(state.plot.series[0].stroke.color).toBe('#f00');
    }
    const finalTarget = scene([line('a', [8, 12])], 20);
    const settled = advanceLineChartMotion(state, finalTarget, options, 110, false);
    expect(settled.reflow).toBeUndefined();
    expect(settled.active).toBe(false);
    expect(settled.plot.series[0].phase).toBe('present');
    expect(settled.plot.series[0].points[0].position).toEqual(finalTarget.series[0].points[0].position);
  });

  it('filters visible and hidden tick candidates against each interpolated scale range', () => {
    const tickScene = (start: number, hidden: boolean): LineChartPlotContext => {
      const props: LineChartProps = {
        data: { lineChartData: [line('a')] },
        xAxis: { domain: [start, start + 10], axis: hidden ? false : {} },
        tickValues: [start, start + 5, start + 10],
        yScales: [
          {
            key: 'y',
            domain: [start, start + 10],
            axis: hidden ? false : { side: 'left' },
            tickValues: [start, start + 5, start + 10],
          },
        ],
      };
      const layout = createLineChartLayout(props, 400, 300, false, 'tick-motion');
      const result = { ...layout, series: createLineChartGeometry(props, layout, 'tick-motion') };
      setLineChartXAxisTicks(result, getLineChartXAxisTicks(layout));
      setLineChartYScaleTicks(result, 'y', getLineChartYScaleTicks(layout, 'y'));
      return result;
    };
    for (const hidden of [false, true]) {
      const options = withTiming(0, 100, 0);
      const from = tickScene(0, hidden);
      const target = tickScene(20, hidden);
      let state = advanceLineChartMotion(undefined, from, options, 0, false);
      state = advanceLineChartMotion(state, target, options, 10, false);
      for (const time of [35, 85]) {
        const middle = advanceLineChartMotion(state, target, options, time, false).plot;
        const withinRange = (position: number, range: readonly [number, number]): boolean =>
          position >= Math.min(...range) - 1e-7 && position <= Math.max(...range) + 1e-7;
        for (const axis of middle.axes) {
          const range =
            axis.orientation === 'x'
              ? middle.xScale.range
              : middle.yScales.find(scale => scale.key === axis.scaleKey)!.range;
          expect(axis.ticks.every(tick => withinRange(tick.position, range))).toBe(true);
        }
        const xTicks = getLineChartXAxisTicks(middle);
        const yTicks = getLineChartYScaleTicks(middle, 'y');
        expect(xTicks.every(tick => withinRange(tick.position, middle.xScale.range))).toBe(true);
        expect(yTicks.every(tick => withinRange(tick.position, middle.yScales[0].range))).toBe(true);
        expect(xTicks.map(tick => tick.value)).not.toContain(time === 35 ? 0 : 30);
        expect(yTicks.map(tick => tick.value)).not.toContain(time === 35 ? 0 : 30);
      }
    }
  });

  it('keeps category-reorder paths, point positions and projections on the same interpolated frame', () => {
    const categoryScene = (domain: string[]): LineChartPlotContext => {
      const base = scene([]);
      const range = base.xScale.range;
      const projectX = (value: unknown): number | undefined => {
        const index = typeof value === 'string' ? domain.indexOf(value) : -1;
        return index < 0 ? undefined : range[index];
      };
      const ticks = domain.map(value => ({
        key: value,
        value,
        position: projectX(value)!,
        label: value,
        labelVisible: true,
      }));
      const layout: LineChartPlotContext = {
        ...base,
        axes: base.axes.map(axis => (axis.orientation === 'x' ? { ...axis, ticks } : axis)),
        projectX,
        xScale: { kind: 'category', domain, range },
      };
      const props: LineChartProps = {
        data: {
          lineChartData: [
            {
              legend: 'a',
              data: [
                { x: 'a', y: 2 },
                { x: 'b', y: 6 },
              ],
            },
          ],
        },
        getSeriesKey: source => source.legend,
      };
      return { ...layout, series: createLineChartGeometry(props, layout, 'category-motion') };
    };
    const options = withTiming(0, 100, 0);
    const from = categoryScene(['a', 'b']);
    const target = categoryScene(['b', 'a']);
    let state = advanceLineChartMotion(undefined, from, options, 0, false);
    state = advanceLineChartMotion(state, target, options, 10, false);
    const middle = advanceLineChartMotion(state, target, options, 35, false);
    expect(middle.plot.projectX('a')).toBeCloseTo(from.projectX('a')! * 0.75 + target.projectX('a')! * 0.25);
    for (const point of middle.plot.series[0].points) {
      expect(point.position.x).toBeCloseTo(middle.plot.projectX(point.data.x)!);
    }
    expect(middle.plot.series[0].segments[0].curve.pieces[0].start.x).toBeCloseTo(middle.plot.projectX('a')!);
    expect(middle.plot.projectX('missing')).toBeUndefined();
  });

  it('preserves displayed screen points when a compatible series switches to a logarithmic projection', () => {
    const options = withTiming(0, 100, 0);
    const from = scene([line('a', [-2, 6])]);
    const source = line('a', [2, 8]);
    const base = scene([source]);
    const scale = { ...base.yScales[0], scaleType: 'log' as const, domain: [1, 10] as const };
    const projectY = (key: string, value: number): number | undefined =>
      key !== scale.key || value <= 0
        ? undefined
        : scale.range[0] + (scale.range[1] - scale.range[0]) * Math.log10(value);
    const layout: LineChartPlotContext = {
      ...base,
      axes: base.axes.map(axis =>
        axis.orientation === 'y'
          ? {
              ...axis,
              ticks: axis.ticks
                .filter(tick => Number(tick.value) > 0)
                .map(tick => ({ ...tick, position: projectY(axis.scaleKey, Number(tick.value))! })),
            }
          : axis,
      ),
      projectY,
      yScales: [scale],
    };
    const props: LineChartProps = { data: { lineChartData: [source] }, getSeriesKey: value => value.legend };
    const target = { ...layout, series: createLineChartGeometry(props, layout, 'log-motion') };
    const first = advanceLineChartMotion(undefined, from, options, 0, false);
    const changed = advanceLineChartMotion(first, target, options, 10, false);
    expect(changed.plot.series[0].points[0].position.y).toBeCloseTo(first.plot.series[0].points[0].position.y);
    const middle = advanceLineChartMotion(changed, target, options, 60, false);
    for (const point of middle.plot.series[0].points) {
      expect(point.data).toBe(target.series[0].points[point.dataIndex].data);
      const range = scale.range;
      const oldValue = Math.pow(
        10,
        (from.series[0].points[point.dataIndex].position.y - range[0]) / (range[1] - range[0]),
      );
      expect(point.position.y).toBeCloseTo(middle.plot.projectY(scale.key, (oldValue + point.data.y) / 2)!);
    }
  });

  it('starts interrupted updates from the last displayed scene instead of the previous target', () => {
    const options = withTiming(0, 100, 50);
    const from = scene([line('a', [2, 6])]);
    const target = scene([line('a', [8, 12])], 20);
    let state = advanceLineChartMotion(undefined, from, options, 0, false);
    state = advanceLineChartMotion(state, target, options, 10, false);
    state = advanceLineChartMotion(state, target, options, 60, false);
    const interrupted = advanceLineChartMotion(state, scene([line('a', [4, 16])], 30), options, 70, false);
    for (let index = 0; index < state.plot.series[0].points.length; index++) {
      expect(interrupted.plot.series[0].points[index].position.x).toBeCloseTo(
        state.plot.series[0].points[index].position.x,
      );
      expect(interrupted.plot.series[0].points[index].position.y).toBeCloseTo(
        state.plot.series[0].points[index].position.y,
      );
    }
    expect(interrupted.plot.yScales[0].domain).toEqual(state.plot.yScales[0].domain);
  });

  it('switches changed gap segmentation atomically instead of morphing through a gap', () => {
    const options = withTiming(0, 100, 50);
    const from = scene([line('a', [2, 4, 6, 8])]);
    const next = line('a', [3, 5, 7, 9]);
    next.lineOptions = { ...next.lineOptions, connectGaps: false };
    next.gaps = [{ startIndex: 1, endIndex: 2 }];
    const target = scene([next]);
    const first = advanceLineChartMotion(undefined, from, options, 0, false);
    const changed = advanceLineChartMotion(first, target, options, 10, false);
    expect(changed.plot.series[0].segments.map(segment => segment.pointKeys)).toEqual(
      target.series[0].segments.map(segment => segment.pointKeys),
    );
    expect(changed.plot.series[0].path).not.toBe(first.plot.series[0].path);
    expect(
      changed.plot.series[0].segments.every(
        segment => !segment.pointKeys.includes('point-1') || !segment.pointKeys.includes('point-2'),
      ),
    ).toBe(true);
  });

  it('freezes exiting geometry, source presentation and clips through same-epoch domain reflow', () => {
    const source = line('a');
    const options = withTiming(0, 100, 50);
    const target = scene([source, line('b')]);
    const first = advanceLineChartMotion(undefined, target, options, 0, false);
    const removed = advanceLineChartMotion(first, scene([line('b', [4, 12])], 20), options, 10, false);
    const exit = removed.plot.series.find(series => series.phase === 'exit')!;
    expect(exit.path).toBe(first.plot.series[0].path);
    expect(exit.points[0].position).toEqual(first.plot.series[0].points[0].position);
    expect(getLineChartSeriesPresentation(exit)?.plotClipRect).toEqual(first.plot.plotRect);
    source.data[0].y = 999;
    source.color = '#f00';
    expect(exit.data.data[0].y).toBe(2);
    expect(exit.data.color).toBe('#0078d4');
    const later = advanceLineChartMotion(removed, removed.target, options, 30, false);
    const retained = later.plot.series.find(series => series.phase === 'exit')!;
    expect(retained.path).toBe(exit.path);
    expect(retained.points).toBe(exit.points);
    expect(getLineChartSeriesPresentation(retained)?.plotClipRect).toEqual(first.plot.plotRect);
    expect(retained.revealMaskId).toBeDefined();
  });

  it('retains presentation identity, displayed reveal, and screen positions on reentry', () => {
    const target = scene([line('a')]);
    const options = withTiming(100, 100, 50);
    let state = advanceLineChartMotion(undefined, target, options, 0, false);
    state = advanceLineChartMotion(state, target, options, 100, false);
    state = advanceLineChartMotion(state, scene([]), options, 110, false);
    state = advanceLineChartMotion(state, state.target, options, 130, false);
    const exit = state.plot.series[0];
    const returned = advanceLineChartMotion(state, scene([line('a', [4, 8])], 20), options, 140, false);
    const current = returned.plot.series[0];
    expect(current.phase).toBe('enter');
    expect(getLineChartSeriesPresentation(current)?.key).toBe(getLineChartSeriesPresentation(exit)?.key);
    expect(current.transition.revealProgress).toBeCloseTo(exit.transition.revealProgress);
    expect(current.revealMaskId).toBe(exit.revealMaskId);
    expect(current.points[0].position.y).toBeCloseTo(exit.points[0].position.y);
  });

  it('drops incompatible-epoch captures in the same returned frame', () => {
    const options = withTiming(0, 100, 50);
    const target = scene([line('a')]);
    let state = advanceLineChartMotion(undefined, target, options, 0, false);
    state = advanceLineChartMotion(state, scene([]), options, 10, false);
    expect(state.plot.series.some(series => series.phase === 'exit')).toBe(true);
    const resized = advanceLineChartMotion(state, scene([], 10, 2, 500), options, 20, false);
    expect(resized.plot.series).toHaveLength(0);
    expect(resized.plot.layoutEpoch).toBe(2);
  });

  it('settles reduced motion and zero phase durations without waiting for animation events', () => {
    const target = scene([line('a'), line('b')]);
    const delayed = { ...motion, staggerMs: 1000, stages: { marks: 1000, labels: 2000 } };
    const initial = advanceLineChartMotion(undefined, target, delayed, 0, false);
    const reduced = advanceLineChartMotion(initial, target, { ...delayed, reducedMotion: false }, 20, true);
    expect(reduced.active).toBe(false);
    expect(
      reduced.plot.series.every(series => series.phase === 'present' && series.transition.revealProgress === 1),
    ).toBe(true);
    const zero = advanceLineChartMotion(
      initial,
      target,
      { ...delayed, enter: { durationMs: 0, easing: 'linear' } },
      20,
      false,
    );
    expect(zero.active).toBe(false);
    expect(zero.plot.series.every(series => series.phase === 'present')).toBe(true);
    for (const stage of ['grid', 'axes', 'marks', 'labels'] as const) {
      expect(getLineChartMotionStage(zero.plot, stage)).toMatchObject({
        progress: 1,
        revealProgress: 1,
        durationMs: 0,
      });
      for (const series of zero.plot.series) {
        expect(getLineChartMotionStage(zero.plot, stage, series)).toMatchObject({
          progress: 1,
          revealProgress: 1,
          durationMs: 0,
        });
      }
    }
    const removed = advanceLineChartMotion(
      initial,
      scene([]),
      { ...delayed, exit: { durationMs: 0, easing: 'linear' } },
      20,
      false,
    );
    expect(removed.plot.series).toHaveLength(0);
    const noMotion = advanceLineChartMotion(initial, scene([]), undefined, 20, false);
    expect(noMotion.plot.series).toHaveLength(0);
    expect(noMotion.active).toBe(false);
  });

  it('rejects invalid timing values instead of creating unfinishable timelines', () => {
    const target = scene([line('a')]);
    expect(() => advanceLineChartMotion(undefined, target, { ...motion, staggerMs: Infinity }, 0, false)).toThrow();
    expect(() => advanceLineChartMotion(undefined, target, withTiming(-1, 100, 50), 0, false)).toThrow();
  });
});

describe('LineChart CSS easing', () => {
  it('solves cubic bezier x before sampling y and supports standard keywords', () => {
    expect(parseLineChartEasing('cubic-bezier(0, 0, 1, 1)')(0.25)).toBeCloseTo(0.25);
    expect(parseLineChartEasing('ease-in')(0.5)).toBeCloseTo(0.31536, 4);
    expect(parseLineChartEasing('ease-out')(0.5)).toBeCloseTo(0.68464, 4);
    expect(parseLineChartEasing('cubic-bezier(.42, 0, .58, 1)')(0.5)).toBeCloseTo(0.5);
    expect(parseLineChartEasing('steps(4, end)')(0.4)).toBe(0.25);
    expect(parseLineChartEasing('step-start')(0)).toBe(1);
  });

  it('does not accept declarations, invalid control x coordinates or invalid step counts', () => {
    for (const value of [
      'linear; opacity: 0',
      'cubic-bezier(-1, 0, 1, 1)',
      'cubic-bezier(0, NaN, 1, 1)',
      'steps(0)',
      'steps(1, jump-none)',
    ]) {
      expect(() => parseLineChartEasing(value)).toThrow();
    }
  });
});

describe('useLineChartSceneMotion', () => {
  const originalMatchMedia = window.matchMedia;
  let now: number;
  let nextHandle: number;
  let frames: Map<number, FrameRequestCallback>;
  let preferenceChange: ((event: MediaQueryListEvent) => void) | undefined;

  beforeEach(() => {
    now = 0;
    nextHandle = 0;
    frames = new Map();
    preferenceChange = undefined;
    jest.spyOn(window.performance, 'now').mockImplementation(() => now);
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      frames.set(++nextHandle, callback);
      return nextHandle;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(handle => {
      frames.delete(handle);
    });
    window.matchMedia = jest.fn().mockReturnValue({
      matches: false,
      addEventListener: (_event: string, callback: (event: MediaQueryListEvent) => void) => {
        preferenceChange = callback;
      },
      removeEventListener: () => {
        preferenceChange = undefined;
      },
    });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    jest.restoreAllMocks();
  });

  function frame(time: number): void {
    now = time;
    const pending = Array.from(frames.values());
    frames.clear();
    act(() => pending.forEach(callback => callback(time)));
  }

  it.each([false, true])(
    'keeps actual Date slots and controlled references while positions tween (pointOnly=%s)',
    pointOnly => {
      const options = withTiming(0, 100, 0);
      const oldSource: LineChartPoints = {
        legend: 'a',
        data: [
          { x: new Date(10), y: 2 },
          { x: new Date(50), y: 6 },
        ],
      };
      const source: LineChartPoints = {
        legend: 'a',
        data: [
          { x: new Date(30), y: 6 },
          { x: new Date(70), y: 8 },
        ],
      };
      const from = dateScene(oldSource);
      const target = dateScene(source);
      const activePoint = { seriesKey: 'a', pointKey: 'point-0' };
      const onChange = jest.fn();
      let displayed: LineChartPlotContext | undefined;
      let interaction: ReturnType<typeof useLineChartSceneInteraction> | undefined;
      const Probe = (props: { target: LineChartPlotContext; state: LineChartProps['interactionState'] }) => {
        const ref = React.useRef<SVGSVGElement>(null);
        displayed = useLineChartSceneMotion(props.target, options);
        interaction = useLineChartSceneInteraction(
          {
            data: { lineChartData: props.target.series.map(series => series.data) },
            interactionState: props.state,
            interactionOptions: { xValues: props.target.series[0].points.map(point => point.data.x) },
            onInteractionChange: onChange,
          },
          displayed,
          ref,
        );
        return React.createElement('svg', { ref });
      };
      const initialState = pointOnly ? { activePoint } : { activePoint, activeX: oldSource.data[0].x };
      const state = pointOnly ? { activePoint } : { activePoint, activeX: source.data[0].x };
      const view = render(React.createElement(Probe, { target: from, state: initialState }));
      view.rerender(React.createElement(Probe, { target, state }));
      onChange.mockClear();
      frame(25);
      expect(interaction!.state.activePoint).toEqual(activePoint);
      expect(interaction!.state.activeX).toEqual(source.data[0].x);
      expect(displayed!.series[0].data).toBe(source);
      expect(displayed!.series[0].points[0].data).toBe(source.data[0]);
      expect(displayed!.series[0].points[0].data.x).toBe(source.data[0].x);
      expect(displayed!.series[0].points[0].data.y).toBe(6);
      expect(displayed!.series[0].points[0].position.x).toBeCloseTo(displayed!.projectX(new Date(15))!);
      expect(displayed!.series[0].points[0].position.y).toBeCloseTo(displayed!.projectY('y', 3)!);
      frame(50);
      expect(interaction!.state.activePoint).toEqual(activePoint);
      expect(displayed!.series[0].points[0].data.x).toBe(source.data[0].x);
      expect(onChange.mock.calls.every(([change]) => change.reason !== 'data-change')).toBe(true);
      expect(source.data.map(point => ({ x: +point.x, y: point.y }))).toEqual([
        { x: 30, y: 6 },
        { x: 70, y: 8 },
      ]);
      view.unmount();
    },
  );

  it('uses RAF for actual progress and cancels the chart clock when settled or unmounted', () => {
    const target = scene([line('a')]);
    let displayed: LineChartPlotContext | undefined;
    const Probe = (props: { target: LineChartPlotContext; motion: LineChartMotionOptions }): null => {
      displayed = useLineChartSceneMotion(props.target, props.motion);
      return null;
    };
    const view = render(React.createElement(Probe, { target, motion }));
    expect(frames.size).toBe(1);
    frame(50);
    expect(displayed!.series[0].transition.revealProgress).toBeCloseTo(0.5);
    const pointerSnapshot = displayed;
    view.rerender(React.createElement(Probe, { target, motion: { ...motion } }));
    expect(displayed).toBe(pointerSnapshot);
    expect(frames.size).toBe(1);
    frame(100);
    expect(displayed!.series[0].phase).toBe('present');
    expect(frames.size).toBe(0);
    view.rerender(React.createElement(Probe, { target: scene([line('b')]), motion }));
    expect(frames.size).toBe(1);
    view.unmount();
    expect(frames.size).toBe(0);
  });

  it('honors dynamic OS reduction even when the prop explicitly requests false', () => {
    const target = scene([line('a')]);
    let displayed: LineChartPlotContext | undefined;
    const Probe = (): null => {
      displayed = useLineChartSceneMotion(target, { ...motion, reducedMotion: false });
      return null;
    };
    const view = render(React.createElement(Probe));
    frame(25);
    expect(displayed!.series[0].phase).toBe('enter');
    act(() => preferenceChange!({ matches: true } as MediaQueryListEvent));
    expect(displayed!.reducedMotion).toBe(true);
    expect(displayed!.series[0].phase).toBe('present');
    expect(displayed!.series[0].transition.revealProgress).toBe(1);
    expect(frames.size).toBe(0);
    view.unmount();
    expect(preferenceChange).toBeUndefined();
  });
});
