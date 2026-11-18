import type {
  LineChartAnnotationInterval,
  LineChartAnnotationIntervalLayout,
  LineChartAnnotationIntervalModel,
  LineChartAnnotationIntervalOptions,
  LineChartResolvedAnnotationIntervalGroup,
  LineChartResolvedAnnotationIntervalRegion,
} from './LineChartAnnotationIntervals.types';
import type { LineChartPlotContext, LineChartRect } from './LineChartScene.types';

type IntervalFamily = 'number' | 'date';
type CapturedInterval = {
  key: string;
  start: number;
  end: number;
  projectStart: number | Date;
  projectEnd: number | Date;
  index: number;
};
type BoundaryEvents = { starts: number[]; ends: number[] };
type CoverageBoundary = { value: number; at: readonly string[]; after: readonly string[] };
type ProjectedInterval = { interval: CapturedInterval; left: number; right: number };

const emptyKeys: readonly string[] = Object.freeze([]);
const emptyLayout: LineChartAnnotationIntervalLayout = Object.freeze({
  regions: Object.freeze([]),
  groups: Object.freeze([]),
});

function addEvent(events: Map<number, BoundaryEvents>, value: number, index: number, kind: 'starts' | 'ends'): void {
  let boundary = events.get(value);
  if (!boundary) {
    boundary = { starts: [], ends: [] };
    events.set(value, boundary);
  }
  boundary[kind].push(index);
}

function membership(active: Set<number>, intervals: readonly CapturedInterval[]): readonly string[] {
  if (!active.size) {
    return emptyKeys;
  }
  return Object.freeze(
    Array.from(active)
      .sort((a, b) => a - b)
      .map(index => intervals[index].key),
  );
}

function captureCoverage(intervals: readonly CapturedInterval[], closed: boolean): readonly CoverageBoundary[] {
  const events = new Map<number, BoundaryEvents>();
  for (const interval of intervals) {
    if (closed || interval.start !== interval.end) {
      addEvent(events, interval.start, interval.index, 'starts');
      addEvent(events, interval.end, interval.index, 'ends');
    }
  }
  const active = new Set<number>();
  let previous = emptyKeys;
  return Array.from(events.keys())
    .sort((a, b) => a - b)
    .map(value => {
      const boundary = events.get(value)!;
      if (!closed) {
        boundary.ends.forEach(index => active.delete(index));
      }
      boundary.starts.forEach(index => active.add(index));
      const at = closed && !boundary.starts.length ? previous : membership(active, intervals);
      if (closed) {
        boundary.ends.forEach(index => active.delete(index));
      }
      const after = closed && boundary.ends.length ? membership(active, intervals) : at;
      previous = after;
      return { value, at, after };
    });
}

function rect(left: number, right: number, plot: LineChartRect): LineChartRect {
  return Object.freeze({ x: left, y: plot.y, width: right - left, height: plot.height });
}

function resolveGroups(
  visible: readonly ProjectedInterval[],
  closed: boolean,
  plot: LineChartRect,
): readonly LineChartResolvedAnnotationIntervalGroup[] {
  const groups: LineChartResolvedAnnotationIntervalGroup[] = [];
  let start = 0;
  let end = -Infinity;
  const append = (stop: number) => {
    const members: CapturedInterval[] = [];
    let left = Infinity;
    let right = -Infinity;
    for (let i = start; i < stop; i++) {
      members.push(visible[i].interval);
      left = Math.min(left, visible[i].left);
      right = Math.max(right, visible[i].right);
    }
    members.sort((a, b) => a.index - b.index);
    const intervalKeys = Object.freeze(members.map(interval => interval.key));
    groups.push(
      Object.freeze({
        key: `annotation-interval-group:${JSON.stringify(intervalKeys.slice().sort())}`,
        intervalKeys,
        rect: rect(left, right, plot),
      }),
    );
  };
  for (let i = 0; i < visible.length; i++) {
    const interval = visible[i].interval;
    if (i > start && (closed ? interval.start > end : interval.start >= end)) {
      append(i);
      start = i;
      end = interval.end;
    } else {
      end = Math.max(end, interval.end);
    }
  }
  if (start < visible.length) {
    append(visible.length);
  }
  return Object.freeze(groups);
}

function resolveRegions(
  visible: readonly ProjectedInterval[],
  intervals: readonly CapturedInterval[],
  plot: LineChartRect,
): readonly LineChartResolvedAnnotationIntervalRegion[] {
  const events = new Map<number, BoundaryEvents>();
  for (const item of visible) {
    addEvent(events, item.left, item.interval.index, 'starts');
    addEvent(events, item.right, item.interval.index, 'ends');
  }
  const boundaries = Array.from(events.keys()).sort((a, b) => a - b);
  const active = new Set<number>();
  const regions: LineChartResolvedAnnotationIntervalRegion[] = [];
  for (let i = 0; i < boundaries.length - 1; i++) {
    const left = boundaries[i];
    const right = boundaries[i + 1];
    const boundary = events.get(left)!;
    boundary.ends.forEach(index => active.delete(index));
    boundary.starts.forEach(index => active.add(index));
    if (active.size) {
      const intervalKeys = membership(active, intervals);
      regions.push(
        Object.freeze({
          key: `annotation-interval-region:${JSON.stringify([intervalKeys.slice().sort(), left, right])}`,
          intervalKeys,
          rect: rect(left, right, plot),
        }),
      );
    }
  }
  return Object.freeze(regions);
}

function projectIntervals(
  intervals: readonly CapturedInterval[],
  sorted: readonly CapturedInterval[],
  family: IntervalFamily | undefined,
  closed: boolean,
  plot: LineChartPlotContext,
  pointWidth: number,
): LineChartAnnotationIntervalLayout {
  const plotRect = plot.plotRect;
  const plotRight = plotRect.x + plotRect.width;
  const plotBottom = plotRect.y + plotRect.height;
  if (
    !family ||
    plot.xScale.kind !== family ||
    !Number.isFinite(plotRect.x) ||
    !Number.isFinite(plotRect.y) ||
    !Number.isFinite(plotRect.width) ||
    !Number.isFinite(plotRect.height) ||
    !Number.isFinite(plotRight) ||
    !Number.isFinite(plotBottom) ||
    plotRect.width <= 0 ||
    plotRect.height <= 0
  ) {
    return emptyLayout;
  }
  const visible: ProjectedInterval[] = [];
  for (const interval of sorted) {
    const start = plot.projectX(interval.projectStart);
    const end = interval.start === interval.end ? start : plot.projectX(interval.projectEnd);
    if (start === undefined || end === undefined || !Number.isFinite(start) || !Number.isFinite(end)) {
      continue;
    }
    let left = Math.min(start, end);
    let right = Math.max(start, end);
    // A caller's visual width cannot bring an off-plot logical interval into a group.
    if (right < plotRect.x || left > plotRight) {
      continue;
    }
    left = Math.max(left, plotRect.x);
    right = Math.min(right, plotRight);
    if (left === right) {
      // Preserve an included clipped endpoint, but not a half-open exclusive end or
      // a wholly collapsed half-open projection with no representable interior.
      if (!closed && (start === end || left !== start)) {
        continue;
      }
      left = Math.max(left - pointWidth / 2, plotRect.x);
      right = Math.min(right + pointWidth / 2, plotRight);
    }
    if (left < right) {
      visible.push({ interval, left, right });
    }
  }
  if (!visible.length) {
    return emptyLayout;
  }
  return Object.freeze({
    regions: resolveRegions(visible, intervals, plotRect),
    groups: resolveGroups(visible, closed, plotRect),
  });
}

/**
 * Captures immutable, exact interval membership and caches its current-frame projection.
 * All intervals must have unique nonempty keys and finite, ordered endpoints in one x family.
 * {@docCategory LineChart}
 */
export function createLineChartAnnotationIntervalModel(
  intervals: readonly LineChartAnnotationInterval[],
  options: LineChartAnnotationIntervalOptions,
): LineChartAnnotationIntervalModel {
  if (!options || (options.bounds !== 'closed' && options.bounds !== 'half-open')) {
    throw new Error('LineChart annotation intervals require bounds to be "closed" or "half-open".');
  }
  const closed = options.bounds === 'closed';
  const keys = new Set<string>();
  let family: IntervalFamily | undefined;
  const captured = intervals.map((interval, index): CapturedInterval => {
    if (typeof interval.key !== 'string' || !interval.key.length) {
      throw new Error(`LineChart annotation interval at index ${index} requires a nonempty string key.`);
    }
    if (keys.has(interval.key)) {
      throw new Error(`LineChart annotation interval key "${interval.key}" must be unique.`);
    }
    keys.add(interval.key);
    const startFamily = interval.start instanceof Date ? 'date' : typeof interval.start;
    const endFamily = interval.end instanceof Date ? 'date' : typeof interval.end;
    if (
      (startFamily !== 'number' && startFamily !== 'date') ||
      startFamily !== endFamily ||
      (family !== undefined && family !== startFamily)
    ) {
      throw new Error(
        `LineChart annotation interval "${interval.key}" requires one homogeneous number or Date family.`,
      );
    }
    family = startFamily;
    const start = interval.start instanceof Date ? interval.start.getTime() : interval.start;
    const end = interval.end instanceof Date ? interval.end.getTime() : interval.end;
    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      throw new Error(`LineChart annotation interval "${interval.key}" requires finite endpoints.`);
    }
    if (start > end) {
      throw new Error(`LineChart annotation interval "${interval.key}" requires start <= end.`);
    }
    const projectStart = startFamily === 'date' ? new Date(start) : start;
    const projectEnd = start === end ? projectStart : startFamily === 'date' ? new Date(end) : end;
    return { key: interval.key, start, end, projectStart, projectEnd, index };
  });
  const coverage = captureCoverage(captured, closed);
  const sorted = captured
    .filter(interval => closed || interval.start !== interval.end)
    .sort((a, b) => a.start - b.start || a.end - b.end || a.index - b.index);
  let cachedProjectX: LineChartPlotContext['projectX'] | undefined;
  let cachedRect: LineChartRect | undefined;
  let cachedFamily: LineChartPlotContext['xScale']['kind'] | undefined;
  let cachedWidth: number | undefined;
  let cachedLayout: LineChartAnnotationIntervalLayout | undefined;
  return Object.freeze({
    getActiveKeys(x: number | Date): readonly string[] {
      const xFamily = x instanceof Date ? 'date' : typeof x;
      const value = x instanceof Date ? x.getTime() : x;
      if (xFamily !== family || !Number.isFinite(value)) {
        return emptyKeys;
      }
      let low = 0;
      let high = coverage.length;
      while (low < high) {
        const middle = low + Math.floor((high - low) / 2);
        if (coverage[middle].value <= value) {
          low = middle + 1;
        } else {
          high = middle;
        }
      }
      if (!low) {
        return emptyKeys;
      }
      const boundary = coverage[low - 1];
      return boundary.value === value ? boundary.at : boundary.after;
    },
    getLayout(plot: LineChartPlotContext, pointWidth: number): LineChartAnnotationIntervalLayout {
      if (!Number.isFinite(pointWidth) || pointWidth <= 0) {
        throw new Error('LineChart annotation interval pointWidth must be finite and positive.');
      }
      const current = plot.plotRect;
      if (
        cachedLayout &&
        cachedProjectX === plot.projectX &&
        cachedWidth === pointWidth &&
        cachedFamily === plot.xScale.kind &&
        cachedRect &&
        Object.is(cachedRect.x, current.x) &&
        Object.is(cachedRect.y, current.y) &&
        Object.is(cachedRect.width, current.width) &&
        Object.is(cachedRect.height, current.height)
      ) {
        return cachedLayout;
      }
      const layout = projectIntervals(captured, sorted, family, closed, plot, pointWidth);
      cachedProjectX = plot.projectX;
      cachedRect = { x: current.x, y: current.y, width: current.width, height: current.height };
      cachedFamily = plot.xScale.kind;
      cachedWidth = pointWidth;
      cachedLayout = layout;
      return cachedLayout;
    },
  });
}
