import type {
  LineChartMotionOptions,
  LineChartPhase,
  LineChartPlotContext,
  LineChartPointData,
  LineChartRect,
  LineChartResolvedPoint,
  LineChartResolvedSeries,
  LineChartResolvedTick,
  LineChartResolvedXScale,
  LineChartResolvedYScale,
  LineChartXValue,
} from './LineChart.types';
import { reprojectLineChartSeries } from './lineChartGeometry';
import {
  getLineChartXAxisTicks,
  getLineChartYScaleTicks,
  setLineChartXAxisTicks,
  setLineChartYScaleTicks,
} from './lineChartScales';

type Stage = 'grid' | 'axes' | 'marks' | 'labels';
type Easing = (progress: number) => number;
const stages: readonly Stage[] = ['grid', 'axes', 'marks', 'labels'];
const clamp = (value: number): number => Math.max(0, Math.min(1, value));
const mix = (from: number, to: number, progress: number): number => from + (to - from) * progress;

const keywords: Record<string, readonly [number, number, number, number]> = {
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
};

/** Parses a single CSS timing function, never a CSS declaration. */
export function parseLineChartEasing(value: string): Easing {
  const keyword = value.trim().toLowerCase();
  if (keyword === 'linear') {
    return clamp;
  }
  const step =
    /^(?:steps\(\s*(\d+)\s*(?:,\s*(start|end|jump-start|jump-end|jump-none|jump-both)\s*)?\)|(step-start|step-end))$/.exec(
      keyword,
    );
  if (step) {
    const count = step[3] ? 1 : Number(step[1]);
    const position = step[3] === 'step-start' ? 'start' : step[3] === 'step-end' ? 'end' : step[2] ?? 'end';
    if (count < 1 || !Number.isSafeInteger(count) || (position === 'jump-none' && count < 2)) {
      throw new Error('LineChart motion steps() requires a positive integer and a valid jump count.');
    }
    const jumpsAtStart = position === 'start' || position === 'jump-start' || position === 'jump-both';
    const denominator = count + (position === 'jump-both' ? 1 : position === 'jump-none' ? -1 : 0);
    return progress => clamp((Math.floor(clamp(progress) * count) + (jumpsAtStart ? 1 : 0)) / denominator);
  }
  const number = '([+-]?(?:\\d*\\.\\d+|\\d+)(?:e[+-]?\\d+)?)';
  const match = new RegExp(
    `^cubic-bezier\\(\\s*${number}\\s*,\\s*${number}\\s*,\\s*${number}\\s*,\\s*${number}\\s*\\)$`,
  ).exec(keyword);
  const control = keywords[keyword] || (match ? match.slice(1).map(Number) : undefined);
  if (
    !control ||
    control.some(item => !Number.isFinite(item)) ||
    control[0] < 0 ||
    control[0] > 1 ||
    control[2] < 0 ||
    control[2] > 1
  ) {
    throw new Error('LineChart motion easing must be linear, a CSS easing keyword, or a valid cubic-bezier().');
  }
  const [x1, y1, x2, y2] = control;
  const coordinate = (t: number, first: number, second: number): number =>
    3 * (1 - t) * (1 - t) * t * first + 3 * (1 - t) * t * t * second + t * t * t;
  return progress => {
    if (progress <= 0 || progress >= 1) {
      return clamp(progress);
    }
    // Bisection also handles legal flat endpoint tangents where Newton iteration is unstable.
    let low = 0;
    let high = 1;
    for (let index = 0; index < 30; index++) {
      const t = (low + high) / 2;
      if (coordinate(t, x1, x2) < progress) {
        low = t;
      } else {
        high = t;
      }
    }
    return clamp(coordinate((low + high) / 2, y1, y2));
  };
}

type Timing = { duration: number; easing: Easing };
type Configuration = {
  enter: Timing;
  exit: Timing;
  update: Timing;
  offsets: Record<Stage, number>;
  stagger: number;
};

function nonnegative(value: number, name: string): number {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`LineChart motion ${name} must be finite and nonnegative.`);
  }
  return value;
}

function configure(options: LineChartMotionOptions | undefined): Configuration | undefined {
  if (!options) {
    return undefined;
  }
  const timing = (phase: 'enter' | 'update' | 'exit'): Timing => ({
    duration: nonnegative(options[phase].durationMs, `${phase}.durationMs`),
    easing: parseLineChartEasing(options[phase].easing),
  });
  return {
    enter: timing('enter'),
    exit: timing('exit'),
    update: timing('update'),
    offsets: {
      grid: nonnegative(options.stages?.grid ?? 0, 'stages.grid'),
      axes: nonnegative(options.stages?.axes ?? 0, 'stages.axes'),
      marks: nonnegative(options.stages?.marks ?? 0, 'stages.marks'),
      labels: nonnegative(options.stages?.labels ?? 0, 'stages.labels'),
    },
    stagger: nonnegative(options.staggerMs ?? 0, 'staggerMs'),
  };
}

/** Inline option objects must not restart an in-flight geometry transition. */
export function equalLineChartMotionOptions(
  a: LineChartMotionOptions | undefined,
  b: LineChartMotionOptions | undefined,
): boolean {
  return (
    a === b ||
    (!!a &&
      !!b &&
      a.enter.durationMs === b.enter.durationMs &&
      a.enter.easing === b.enter.easing &&
      a.update.durationMs === b.update.durationMs &&
      a.update.easing === b.update.easing &&
      a.exit.durationMs === b.exit.durationMs &&
      a.exit.easing === b.exit.easing &&
      (a.staggerMs ?? 0) === (b.staggerMs ?? 0) &&
      stages.every(stage => (a.stages?.[stage] ?? 0) === (b.stages?.[stage] ?? 0)) &&
      !!a.reducedMotion === !!b.reducedMotion)
  );
}

type Schedule = {
  duration: number;
  easing: Easing;
  entranceEnd: number;
  exitDelay: number;
  from: number;
  start: number;
  to: number;
};
type StageSchedules = Record<Stage, Schedule>;

/** Internal metadata consumed by the core renderer, not an additional public scene API. */
export type LineChartSeriesPresentation = {
  readonly key: string;
  readonly markerClipPathId: string;
  readonly markerClipRect: LineChartRect;
  readonly plotClipPathId: string;
  readonly plotClipRect: LineChartRect;
};

const presentations = new WeakMap<LineChartResolvedSeries, LineChartSeriesPresentation>();
const seriesSchedules = new WeakMap<LineChartResolvedSeries, StageSchedules>();
const plotSchedules = new WeakMap<LineChartPlotContext, StageSchedules>();
const sceneSchedules = new WeakMap<readonly LineChartResolvedSeries[], StageSchedules>();
const presentationFills = new WeakMap<
  LineChartResolvedSeries,
  { key: string; fill: LineChartResolvedSeries['baselineFill'] }
>();

function getPresentationFill(series: LineChartResolvedSeries, key: string): LineChartResolvedSeries['baselineFill'] {
  if (!series.baselineFill?.gradientId) {
    return series.baselineFill;
  }
  const cached = presentationFills.get(series);
  if (cached?.key === key) {
    return cached.fill;
  }
  const fill = { ...series.baselineFill, gradientId: `${key}-baseline-gradient` };
  presentationFills.set(series, { key, fill });
  return fill;
}

/** The same presentation token survives updates, interrupted exits, and reentry. */
export function getLineChartSeriesPresentation(
  series: LineChartResolvedSeries,
): LineChartSeriesPresentation | undefined {
  return presentations.get(series);
}

/** Appearance stages share the plot clock; they never offset geometric interpolation. */
export function getLineChartMotionStage(
  plot: LineChartPlotContext,
  stage: Stage,
  series?: LineChartResolvedSeries,
): {
  readonly progress: number;
  readonly revealProgress: number;
  readonly startMs: number;
  readonly durationMs: number;
} {
  const schedule = (
    series ? seriesSchedules.get(series) : plotSchedules.get(plot) ?? sceneSchedules.get(plot.series)
  )?.[stage];
  if (!schedule) {
    return { progress: 1, revealProgress: 1, startMs: 0, durationMs: 0 };
  }
  return {
    progress: progressAt(schedule, plot.frameTimeMs),
    revealProgress: revealAt(schedule, plot.frameTimeMs),
    startMs: schedule.start,
    durationMs: schedule.duration,
  };
}

type Track = {
  entranceEnds: Record<Stage, number>;
  entranceWindowEnd: number;
  phase: LineChartPhase;
  presentation: LineChartSeriesPresentation;
  revealMaskId?: string;
  schedules: StageSchedules;
  series: LineChartResolvedSeries;
};
type Reflow = {
  from: LineChartPlotContext;
  start: number;
  timing: Timing;
};

/** Pure state machine used by the hook and lifecycle tests. */
export type LineChartMotionState = {
  readonly active: boolean;
  readonly configuration?: Configuration;
  readonly options?: LineChartMotionOptions;
  readonly plot: LineChartPlotContext;
  readonly reflow?: Reflow;
  readonly reducedMotion: boolean;
  readonly serial: number;
  readonly shared?: StageSchedules;
  readonly target: LineChartPlotContext;
  readonly tracks: readonly Track[];
};

function progressAt(schedule: Schedule, time: number): number {
  return schedule.duration === 0 ? 1 : clamp((time - schedule.start) / schedule.duration);
}

function revealAt(schedule: Schedule, time: number): number {
  return clamp(mix(schedule.from, schedule.to, schedule.easing(progressAt(schedule, time))));
}

function finished(schedules: StageSchedules, time: number): boolean {
  return stages.every(stage => progressAt(schedules[stage], time) === 1);
}

function settledSchedules(ends: Record<Stage, number>, starts?: StageSchedules): StageSchedules {
  const schedule = (stage: Stage): Schedule => ({
    duration: 0,
    easing: clamp,
    entranceEnd: ends[stage],
    exitDelay: 0,
    from: 1,
    start: starts?.[stage].start ?? 0,
    to: 1,
  });
  return { grid: schedule('grid'), axes: schedule('axes'), marks: schedule('marks'), labels: schedule('labels') };
}

function entranceSchedules(
  config: Configuration,
  time: number,
  index: number,
  previous?: Track,
  displayedTime = time,
): StageSchedules {
  const schedule = (stage: Stage): Schedule => {
    const start =
      config.enter.duration === 0
        ? time
        : time + config.offsets[stage] + (stage === 'marks' || stage === 'labels' ? index * config.stagger : 0);
    return {
      duration: config.enter.duration,
      easing: config.enter.easing,
      entranceEnd: start + config.enter.duration,
      exitDelay: 0,
      from: previous ? revealAt(previous.schedules[stage], displayedTime) : 0,
      start,
      to: 1,
    };
  };
  return { grid: schedule('grid'), axes: schedule('axes'), marks: schedule('marks'), labels: schedule('labels') };
}

function exitSchedules(track: Track, config: Configuration, time: number, displayedTime: number): StageSchedules {
  const ratio =
    config.enter.duration > 0 && config.exit.duration > 0 ? config.enter.duration / config.exit.duration : 0;
  const schedule = (stage: Stage): Schedule => {
    const delay = ratio === 0 ? 0 : Math.max(0, track.entranceWindowEnd - track.entranceEnds[stage]) / ratio;
    return {
      duration: config.exit.duration,
      easing: config.exit.easing,
      entranceEnd: track.entranceEnds[stage],
      exitDelay: delay,
      from: revealAt(track.schedules[stage], displayedTime),
      start: time + delay,
      to: 0,
    };
  };
  return { grid: schedule('grid'), axes: schedule('axes'), marks: schedule('marks'), labels: schedule('labels') };
}

function endsOf(schedules: StageSchedules): Record<Stage, number> {
  return {
    grid: schedules.grid.entranceEnd,
    axes: schedules.axes.entranceEnd,
    marks: schedules.marks.entranceEnd,
    labels: schedules.labels.entranceEnd,
  };
}

function capturePresentation(plot: LineChartPlotContext, key: string): LineChartSeriesPresentation {
  return {
    key,
    markerClipPathId: `${key}-marker-clip`,
    markerClipRect: { ...plot.markerClipRect },
    plotClipPathId: `${key}-plot-clip`,
    plotClipRect: { ...plot.plotRect },
  };
}

function snapshotPoint(data: Readonly<LineChartPointData>): LineChartPointData {
  return {
    ...data,
    x: data.x instanceof Date ? new Date(data.x.getTime()) : data.x,
    ...(typeof data.yAxisCalloutData === 'object' ? { yAxisCalloutData: { ...data.yAxisCalloutData } } : {}),
    ...(data.callOutAccessibilityData ? { callOutAccessibilityData: { ...data.callOutAccessibilityData } } : {}),
    ...(data.xAxisCalloutAccessibilityData
      ? { xAxisCalloutAccessibilityData: { ...data.xAxisCalloutAccessibilityData } }
      : {}),
  };
}

function captureSeries(series: LineChartResolvedSeries): LineChartResolvedSeries {
  const data = series.data;
  return {
    ...series,
    data: {
      ...data,
      data: data.data.map(snapshotPoint),
      gaps: data.gaps?.map(gap => ({ ...gap })),
      lineOptions: data.lineOptions
        ? { ...data.lineOptions, style: data.lineOptions.style ? { ...data.lineOptions.style } : undefined }
        : undefined,
      baselineFill: data.baselineFill
        ? {
            ...data.baselineFill,
            gradient: data.baselineFill.gradient
              ? {
                  ...data.baselineFill.gradient,
                  stops: data.baselineFill.gradient.stops.map(stop => ({ ...stop })),
                }
              : undefined,
          }
        : undefined,
    },
    points: series.points.map(point => ({ ...point, data: snapshotPoint(point.data) })),
    stroke: { ...series.stroke },
  };
}

function sameArray<T>(from: readonly T[], to: readonly T[], compare: (a: T, b: T) => boolean): boolean {
  return from.length === to.length && from.every((value, index) => compare(value, to[index]));
}

function sameRect(from: LineChartRect, to: LineChartRect): boolean {
  return from.x === to.x && from.y === to.y && from.width === to.width && from.height === to.height;
}

function sameDomain(from: LineChartResolvedXScale, to: LineChartResolvedXScale): boolean {
  return (
    from.kind === to.kind &&
    sameArray<LineChartXValue>(from.domain, to.domain, (a, b) =>
      a instanceof Date && b instanceof Date ? +a === +b : a === b,
    )
  );
}

function sameScale(from: LineChartResolvedYScale, to: LineChartResolvedYScale): boolean {
  return (
    from.key === to.key &&
    from.scaleType === to.scaleType &&
    sameArray(from.domain, to.domain, (a, b) => a === b) &&
    sameArray(from.range, to.range, (a, b) => a === b)
  );
}

function sameTicks(from: readonly LineChartResolvedTick[], to: readonly LineChartResolvedTick[]): boolean {
  return sameArray(
    from,
    to,
    (a, b) => a.key === b.key && a.position === b.position && a.label === b.label && a.labelVisible === b.labelVisible,
  );
}

function sameGeometry(from: LineChartPlotContext, to: LineChartPlotContext): boolean {
  return (
    from.layoutEpoch === to.layoutEpoch &&
    sameRect(from.svgRect, to.svgRect) &&
    sameRect(from.plotRect, to.plotRect) &&
    sameRect(from.markerClipRect, to.markerClipRect) &&
    sameDomain(from.xScale, to.xScale) &&
    sameArray(from.xScale.range, to.xScale.range, (a, b) => a === b) &&
    ('scaleType' in from.xScale ? from.xScale.scaleType : undefined) ===
      ('scaleType' in to.xScale ? to.xScale.scaleType : undefined) &&
    sameArray(from.yScales, to.yScales, sameScale) &&
    sameArray(
      from.axes,
      to.axes,
      (a, b) =>
        a.orientation === b.orientation &&
        a.scaleKey === b.scaleKey &&
        a.side === b.side &&
        sameRect(a.rect, b.rect) &&
        sameTicks(a.ticks, b.ticks),
    ) &&
    sameTicks(getLineChartXAxisTicks(from), getLineChartXAxisTicks(to)) &&
    to.yScales.every(scale =>
      sameTicks(getLineChartYScaleTicks(from, scale.key), getLineChartYScaleTicks(to, scale.key)),
    ) &&
    sameArray(
      from.xAxisLabelRows,
      to.xAxisLabelRows,
      (a, b) => a.key === b.key && a.measuredHeight === b.measuredHeight && sameRect(a.rect, b.rect),
    ) &&
    sameArray(
      from.series.filter(series => series.phase !== 'exit'),
      to.series,
      (a, b) =>
        a.key === b.key &&
        a.scaleKey === b.scaleKey &&
        a.path === b.path &&
        a.baselineFill?.baselinePosition === b.baselineFill?.baselinePosition &&
        sameArray(
          a.points,
          b.points,
          (point, other) =>
            point.key === other.key && point.position.x === other.position.x && point.position.y === other.position.y,
        ) &&
        sameArray(
          a.segments,
          b.segments,
          (segment, other) =>
            segment.key === other.key &&
            segment.path === other.path &&
            sameArray(segment.pointKeys, other.pointKeys, (key, otherKey) => key === otherKey),
        ),
    )
  );
}

function compatible(from: LineChartResolvedSeries, to: LineChartResolvedSeries): boolean {
  return (
    from.data.lineOptions?.curve === to.data.lineOptions?.curve &&
    sameArray(
      from.points,
      to.points,
      (a, b) =>
        a.key === b.key && typeof a.data.x === typeof b.data.x && a.data.x instanceof Date === b.data.x instanceof Date,
    ) &&
    sameArray(
      from.segments,
      to.segments,
      (a, b) =>
        a.key === b.key &&
        sameArray(a.pointKeys, b.pointKeys, (key, other) => key === other) &&
        sameArray(a.curve.pieces, b.curve.pieces, (piece, other) => piece.kind === other.kind),
    )
  );
}

function mixRect(from: LineChartRect, to: LineChartRect, progress: number): LineChartRect {
  return {
    x: mix(from.x, to.x, progress),
    y: mix(from.y, to.y, progress),
    width: mix(from.width, to.width, progress),
    height: mix(from.height, to.height, progress),
  };
}

function projectNumeric(
  value: number,
  domain: readonly [number, number],
  range: readonly [number, number],
  log: boolean,
): number | undefined {
  if (!Number.isFinite(value) || (log && value <= 0)) {
    return undefined;
  }
  const transform = log ? Math.log : (number: number) => number;
  const start = transform(domain[0]);
  const span = transform(domain[1]) - start;
  return mix(range[0], range[1], span === 0 ? 0.5 : (transform(value) - start) / span);
}

function unprojectNumeric(
  position: number,
  domain: readonly [number, number],
  range: readonly [number, number],
  log: boolean,
): number {
  const progress = range[0] === range[1] ? 0.5 : (position - range[0]) / (range[1] - range[0]);
  return log ? Math.exp(mix(Math.log(domain[0]), Math.log(domain[1]), progress)) : mix(domain[0], domain[1], progress);
}

function projectX(scale: LineChartResolvedXScale, value: LineChartXValue): number | undefined {
  if (scale.kind === 'category') {
    if (typeof value !== 'string') {
      return undefined;
    }
    const index = scale.domain.indexOf(value);
    return index < 0
      ? undefined
      : mix(scale.range[0], scale.range[1], scale.domain.length < 2 ? 0.5 : index / (scale.domain.length - 1));
  }
  if (scale.kind === 'date') {
    return value instanceof Date
      ? projectNumeric(+value, [+scale.domain[0], +scale.domain[1]], scale.range, false)
      : undefined;
  }
  return typeof value === 'number'
    ? projectNumeric(value, scale.domain, scale.range, scale.scaleType === 'log')
    : undefined;
}

function interpolateLayout(
  from: LineChartPlotContext,
  to: LineChartPlotContext,
  progress: number,
): LineChartPlotContext {
  const range: readonly [number, number] = [
    mix(from.xScale.range[0], to.xScale.range[0], progress),
    mix(from.xScale.range[1], to.xScale.range[1], progress),
  ];
  let xScale: LineChartResolvedXScale = to.xScale;
  if (from.xScale.kind === 'number' && to.xScale.kind === 'number' && from.xScale.scaleType === to.xScale.scaleType) {
    xScale = {
      ...to.xScale,
      domain: [
        mix(from.xScale.domain[0], to.xScale.domain[0], progress),
        mix(from.xScale.domain[1], to.xScale.domain[1], progress),
      ],
      range,
    };
  } else if (from.xScale.kind === 'date' && to.xScale.kind === 'date') {
    xScale = {
      ...to.xScale,
      domain: [
        new Date(mix(+from.xScale.domain[0], +to.xScale.domain[0], progress)),
        new Date(mix(+from.xScale.domain[1], +to.xScale.domain[1], progress)),
      ],
      range,
    };
  } else if (from.xScale.kind === 'category' && to.xScale.kind === 'category') {
    xScale = { ...to.xScale, range };
  }
  const yScales = to.yScales.map(scale => {
    const previous = from.yScales.find(item => item.key === scale.key && item.scaleType === scale.scaleType);
    return previous
      ? {
          ...scale,
          domain: [
            mix(previous.domain[0], scale.domain[0], progress),
            mix(previous.domain[1], scale.domain[1], progress),
          ] as const,
          range: [
            mix(previous.range[0], scale.range[0], progress),
            mix(previous.range[1], scale.range[1], progress),
          ] as const,
        }
      : scale;
  });
  const yByKey = new Map(yScales.map(scale => [scale.key, scale]));
  const categoryPositions =
    xScale.kind === 'category' && from.xScale.kind === 'category'
      ? new Map(
          xScale.domain.map(value => {
            const previous = from.projectX(value);
            const next = to.projectX(value)!;
            return [value, previous === undefined ? projectX(xScale, value)! : mix(previous, next, progress)] as const;
          }),
        )
      : undefined;
  const projectCurrentX = (value: LineChartXValue): number | undefined =>
    categoryPositions
      ? typeof value === 'string'
        ? categoryPositions.get(value)
        : undefined
      : projectX(xScale, value);
  const projectY = (key: string, value: number): number | undefined => {
    const scale = yByKey.get(key);
    return scale ? projectNumeric(value, scale.domain, scale.range, scale.scaleType === 'log') : undefined;
  };
  const ticks = (values: readonly LineChartResolvedTick[], key: string): readonly LineChartResolvedTick[] =>
    values.reduce<LineChartResolvedTick[]>((result, tick) => {
      const position =
        key === 'x'
          ? projectCurrentX(tick.value)
          : typeof tick.value === 'number'
          ? projectY(key, tick.value)
          : undefined;
      const range = key === 'x' ? xScale.range : yByKey.get(key)?.range;
      if (
        position !== undefined &&
        range &&
        position >= Math.min(range[0], range[1]) - 1e-7 &&
        position <= Math.max(range[0], range[1]) + 1e-7
      ) {
        result.push({ ...tick, position });
      }
      return result;
    }, []);
  const axes = to.axes.map(axis => {
    const previous = from.axes.find(item => item.scaleKey === axis.scaleKey && item.side === axis.side);
    const currentTicks = previous && progress < 0.5 ? previous.ticks : axis.ticks;
    return {
      ...axis,
      rect: previous ? mixRect(previous.rect, axis.rect, progress) : axis.rect,
      ticks: ticks(currentTicks, axis.scaleKey),
    };
  });
  const plot = {
    ...to,
    axes,
    markerClipRect: mixRect(from.markerClipRect, to.markerClipRect, progress),
    plotRect: mixRect(from.plotRect, to.plotRect, progress),
    projectX: projectCurrentX,
    projectY,
    svgRect: mixRect(from.svgRect, to.svgRect, progress),
    xAxisLabelRows: to.xAxisLabelRows.map(row => {
      const previous = from.xAxisLabelRows.find(item => item.key === row.key);
      return previous
        ? {
            ...row,
            rect: mixRect(previous.rect, row.rect, progress),
            measuredHeight: mix(previous.measuredHeight, row.measuredHeight, progress),
          }
        : row;
    }),
    xScale,
    yScales,
  };
  setLineChartXAxisTicks(plot, ticks(getLineChartXAxisTicks(progress < 0.5 ? from : to), 'x'));
  for (const scale of yScales) {
    setLineChartYScaleTicks(
      plot,
      scale.key,
      ticks(getLineChartYScaleTicks(progress < 0.5 ? from : to, scale.key), scale.key),
    );
  }
  return plot;
}

// Displayed domain coordinates are geometry, not observations. Keep them private so
// inspection, point callbacks and accessibility always receive the target source datum.
const displayedPointValues = new WeakMap<LineChartResolvedPoint, { x: LineChartXValue; y: number }>();

function interpolateSeries(
  from: LineChartResolvedSeries | undefined,
  to: LineChartResolvedSeries,
  previous: LineChartPlotContext,
  layout: LineChartPlotContext,
  progress: number,
): LineChartResolvedSeries {
  const canInterpolate = from && compatible(from, to);
  const oldScale = previous.yScales.find(scale => scale.key === to.scaleKey);
  const currentScale = layout.yScales.find(scale => scale.key === to.scaleKey);
  const sameYTransform = oldScale?.scaleType === currentScale?.scaleType;
  const previousScale = sameYTransform ? oldScale : currentScale;
  const previousXScale =
    previous.xScale.kind === 'number' &&
    layout.xScale.kind === 'number' &&
    previous.xScale.scaleType !== layout.xScale.scaleType
      ? layout.xScale
      : previous.xScale;
  const points = to.points.map((point, index): LineChartResolvedPoint => {
    const old = canInterpolate ? from.points[index] : undefined;
    const displayed = old ? displayedPointValues.get(old) ?? old.data : undefined;
    let x = point.data.x;
    let y = point.data.y;
    if (old) {
      if (typeof x === 'number' && previousXScale.kind === 'number') {
        const start =
          from?.phase !== 'exit' && previousXScale === previous.xScale && typeof displayed?.x === 'number'
            ? displayed.x
            : unprojectNumeric(
                old.position.x,
                previousXScale.domain,
                previousXScale.range,
                previousXScale.scaleType === 'log',
              );
        x = mix(start, x, progress);
      } else if (x instanceof Date && previous.xScale.kind === 'date') {
        const start =
          from?.phase !== 'exit' && displayed?.x instanceof Date
            ? +displayed.x
            : unprojectNumeric(
                old.position.x,
                [+previous.xScale.domain[0], +previous.xScale.domain[1]],
                previous.xScale.range,
                false,
              );
        x = new Date(mix(start, +x, progress));
      }
      if (previousScale) {
        const start =
          from?.phase !== 'exit' && from?.scaleKey === to.scaleKey && sameYTransform
            ? displayed!.y
            : unprojectNumeric(
                old.position.y,
                previousScale.domain,
                previousScale.range,
                previousScale.scaleType === 'log',
              );
        y = mix(start, y, progress);
      }
    }
    const position = { x: layout.projectX(x)!, y: layout.projectY(to.scaleKey, y)! };
    const resolved = { ...point, position };
    displayedPointValues.set(resolved, { x, y });
    return resolved;
  });
  const fill = to.data.baselineFill;
  if (canInterpolate && from.baselineFill && fill && previousScale) {
    const start =
      from.phase !== 'exit' && from.scaleKey === to.scaleKey && sameYTransform
        ? from.baselineFill.baselineValue
        : unprojectNumeric(
            from.baselineFill.baselinePosition,
            previousScale.domain,
            previousScale.range,
            previousScale.scaleType === 'log',
          );
    const baselineValue = mix(start, fill.value, progress);
    const geometry = reprojectLineChartSeries(
      { ...to, data: { ...to.data, baselineFill: { ...fill, value: baselineValue } } },
      points,
      layout,
    );
    return { ...geometry, data: to.data };
  }
  return reprojectLineChartSeries(to, points, layout);
}

function decorate(
  track: Track,
  series: LineChartResolvedSeries,
  layout: LineChartPlotContext,
  time: number,
  reflow: Reflow | undefined,
): LineChartResolvedSeries {
  const marks = track.schedules.marks;
  const update = track.phase === 'update' && reflow;
  const result: LineChartResolvedSeries = {
    ...series,
    phase: track.phase,
    capturedLayoutEpoch: track.phase === 'exit' ? series.capturedLayoutEpoch : layout.layoutEpoch,
    revealMaskId: track.revealMaskId,
    baselineFill: getPresentationFill(series, track.presentation.key),
    transition: {
      durationMs: update ? update.timing.duration : marks.duration,
      entranceEndMs: marks.entranceEnd,
      exitDelayMs: track.phase === 'exit' ? marks.exitDelay : 0,
      progress: update ? clamp((time - update.start) / update.timing.duration) : progressAt(marks, time),
      revealProgress: revealAt(marks, time),
      startMs: update ? update.start : marks.start,
    },
  };
  presentations.set(
    result,
    track.phase === 'exit' ? track.presentation : capturePresentation(layout, track.presentation.key),
  );
  seriesSchedules.set(result, track.schedules);
  return result;
}

/** Advances a chart-local timeline without mutating its prior committed snapshot or caller data. */
export function advanceLineChartMotion(
  previous: LineChartMotionState | undefined,
  target: LineChartPlotContext,
  options: LineChartMotionOptions | undefined,
  timeMs: number,
  osReducedMotion: boolean,
): LineChartMotionState {
  const time = Math.max(previous?.plot.frameTimeMs ?? 0, timeMs);
  const sameOptions = !!previous && equalLineChartMotionOptions(options, previous.options);
  const changed =
    !previous ||
    target !== previous.target ||
    !sameOptions ||
    (osReducedMotion || !!options?.reducedMotion) !== previous.reducedMotion;
  if (previous && !changed) {
    if (time === previous.plot.frameTimeMs) {
      return previous;
    }
    if (!previous.active) {
      const plot = { ...previous.plot, frameId: previous.plot.frameId + 1, frameTimeMs: time };
      setLineChartXAxisTicks(plot, getLineChartXAxisTicks(previous.plot));
      for (const scale of plot.yScales) {
        setLineChartYScaleTicks(plot, scale.key, getLineChartYScaleTicks(previous.plot, scale.key));
      }
      return { ...previous, plot };
    }
  }
  const configuration = previous && sameOptions ? previous.configuration : configure(options);
  const reducedMotion = osReducedMotion || !!options?.reducedMotion;
  const animated = configuration && !reducedMotion;
  const epochChanged = !!previous && previous.plot.layoutEpoch !== target.layoutEpoch;
  let serial = previous?.serial ?? 0;
  let tracks: Track[] = previous ? [...previous.tracks] : [];
  let shared = previous?.shared;
  let reflow = previous?.reflow;
  let geometryChanged = false;
  if (changed) {
    const oldByKey = new Map(tracks.map(track => [track.series.key, track]));
    const displayed = new Map(previous?.plot.series.map(series => [series.key, series]));
    const targetKeys = new Set(target.series.map(series => series.key));
    geometryChanged = !previous || !sameGeometry(previous.plot, target);
    const continueReflow = !!previous?.reflow && sameGeometry(previous.target, target);
    reflow =
      previous && geometryChanged && animated && configuration.update.duration > 0 && !epochChanged
        ? continueReflow
          ? previous.reflow
          : { from: previous.plot, start: time, timing: configuration.update }
        : undefined;
    const entering: Track[] = [];
    tracks = target.series.map((series, index) => {
      const old = oldByKey.get(series.key);
      const isEntrance = !old || old.phase === 'exit';
      let track: Track;
      if (isEntrance) {
        const schedules =
          animated && configuration.enter.duration > 0
            ? entranceSchedules(configuration, time, index, old, previous?.plot.frameTimeMs)
            : settledSchedules({ grid: 0, axes: 0, marks: 0, labels: 0 });
        const presentation =
          old?.presentation ?? capturePresentation(target, `${target.plotClipPathId}-presentation-${++serial}`);
        track = {
          entranceEnds: endsOf(schedules),
          entranceWindowEnd: 0,
          phase: animated && configuration.enter.duration > 0 ? 'enter' : 'present',
          presentation,
          revealMaskId:
            old?.revealMaskId ??
            (animated && configuration.enter.duration > 0 ? `${presentation.key}-reveal` : undefined),
          schedules,
          series,
        };
        entering.push(track);
      } else {
        const settleEntrance = !animated || configuration.enter.duration === 0;
        track = {
          ...old,
          phase: old.phase === 'enter' && !settleEntrance ? 'enter' : reflow ? 'update' : 'present',
          presentation: capturePresentation(target, old.presentation.key),
          schedules: settleEntrance ? settledSchedules(old.entranceEnds, old.schedules) : old.schedules,
          series,
        };
      }
      return track;
    });
    if (entering.length) {
      const windowEnd = Math.max(...entering.flatMap(track => stages.map(stage => track.entranceEnds[stage])));
      tracks = tracks.map(track => (entering.includes(track) ? { ...track, entranceWindowEnd: windowEnd } : track));
      shared = entering[0].schedules;
    }
    if (previous && animated && configuration.exit.duration > 0 && !epochChanged) {
      for (const old of previous.tracks) {
        if (targetKeys.has(old.series.key)) {
          continue;
        }
        if (old.phase === 'exit') {
          tracks.push(old);
        } else {
          const captured = displayed.get(old.series.key) ?? old.series;
          tracks.push({
            ...old,
            phase: 'exit',
            revealMaskId: old.revealMaskId ?? `${old.presentation.key}-reveal`,
            series: captureSeries(captured),
            presentation: capturePresentation(previous.plot, old.presentation.key),
            schedules: exitSchedules(old, configuration, time, previous.plot.frameTimeMs),
          });
        }
      }
    }
    if (target.series.length === 0 && tracks.length > 0) {
      shared = tracks[0].schedules;
    }
    if (target.series.length === 0 && tracks.length === 0) {
      shared = undefined;
    }
    if (!animated || (configuration.enter.duration === 0 && target.series.length > 0)) {
      shared = shared ? settledSchedules(endsOf(shared), shared) : undefined;
    }
    if (!animated || configuration.update.duration === 0) {
      reflow = undefined;
    }
  }
  const reflowProgress = reflow ? clamp((time - reflow.start) / reflow.timing.duration) : 1;
  const geometricProgress = reflow ? reflow.timing.easing(reflowProgress) : 1;
  const layout = reflow && reflowProgress < 1 ? interpolateLayout(reflow.from, target, geometricProgress) : target;
  const previousSeries = reflow ? new Map(reflow.from.series.map(series => [series.key, series])) : undefined;
  if (reflow && time !== previous?.plot.frameTimeMs) {
    geometryChanged = true;
  }
  if (reflowProgress === 1) {
    reflow = undefined;
  }
  tracks = tracks
    .filter(
      track =>
        track.phase !== 'exit' ||
        (track.series.capturedLayoutEpoch === target.layoutEpoch && !finished(track.schedules, time)),
    )
    .map(track => {
      if (track.phase === 'enter' && finished(track.schedules, time)) {
        return {
          ...track,
          phase: reflow ? 'update' : 'present',
          schedules: settledSchedules(track.entranceEnds, track.schedules),
        };
      }
      if (track.phase === 'update' && !reflow) {
        return { ...track, phase: 'present', schedules: settledSchedules(track.entranceEnds, track.schedules) };
      }
      return track;
    });
  if (
    previous &&
    (tracks.length !== previous.tracks.length ||
      tracks.some((track, index) => track.phase !== previous.tracks[index]?.phase))
  ) {
    geometryChanged = true;
  }
  const series = tracks.map(track => {
    const geometry =
      track.phase === 'exit'
        ? track.series
        : reflow
        ? interpolateSeries(previousSeries?.get(track.series.key), track.series, reflow.from, layout, geometricProgress)
        : track.series;
    return decorate(track, geometry, layout, time, reflow);
  });
  const plot: LineChartPlotContext = {
    ...layout,
    frameId: (previous?.plot.frameId ?? -1) + 1,
    frameTimeMs: time,
    geometryVersion: (previous?.plot.geometryVersion ?? 0) + (geometryChanged ? 1 : 0),
    reducedMotion,
    series,
  };
  setLineChartXAxisTicks(plot, getLineChartXAxisTicks(layout));
  for (const scale of layout.yScales) {
    setLineChartYScaleTicks(plot, scale.key, getLineChartYScaleTicks(layout, scale.key));
  }
  if (shared) {
    plotSchedules.set(plot, shared);
    sceneSchedules.set(series, shared);
  }
  const active =
    !!reflow ||
    tracks.some(track => (track.phase === 'enter' || track.phase === 'exit') && !finished(track.schedules, time)) ||
    (!!shared && !finished(shared, time));
  return { active, configuration, options, plot, reflow, reducedMotion, serial, shared, target, tracks };
}
