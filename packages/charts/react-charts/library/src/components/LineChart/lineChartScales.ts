import { scaleLinear, scaleLog, scalePoint, scaleTime, scaleUtc } from 'd3-scale';
import { format as d3Format } from 'd3-format';
import type { AxisProps } from '../../types/index';
import {
  ChartTypes,
  createDateXAxis,
  createNumericXAxis,
  defaultYAxisTickFormatter,
  generateDateTicks,
  generateNumericTicks,
  getDomainPaddingForMarkers,
  prepareDatapoints,
  sortAxisCategories,
} from '../../utilities/index';
import type {
  LineChartInsets,
  LineChartPlotContext,
  LineChartProps,
  LineChartResolvedAxis,
  LineChartResolvedTick,
  LineChartResolvedXScale,
  LineChartResolvedYScale,
  LineChartYScaleOptions,
} from './LineChart.types';

/** Internal effective options, including the existing string formatter and domain hints. */
export type LineChartEffectiveYScaleOptions = Omit<LineChartYScaleOptions, 'tickFormat' | 'tick0'> & {
  tickFormat?: string | ((value: number, index: number) => string);
  tick0?: AxisProps['tick0'];
  yMinValue?: number;
  yMaxValue?: number;
};

type NumericScale = ReturnType<typeof scaleLinear<number, number>>;
type YScaleState = {
  options: LineChartEffectiveYScaleOptions;
  scale: NumericScale;
  ticks: readonly LineChartResolvedTick[];
  width: number;
};

const xTicksByPlot = new WeakMap<LineChartPlotContext, readonly LineChartResolvedTick[]>();
const yTicksByPlot = new WeakMap<LineChartPlotContext, Map<string, readonly LineChartResolvedTick[]>>();
const emptyTicks: readonly LineChartResolvedTick[] = [];

/** Retains native x ticks for label rows even when no native x axis is drawn. */
export function getLineChartXAxisTicks(plot: LineChartPlotContext): readonly LineChartResolvedTick[] {
  return xTicksByPlot.get(plot) ?? plot.axes.find(axis => axis.orientation === 'x')?.ticks ?? emptyTicks;
}

/** Internal frame handoff used when motion creates a new displayed scene. */
export function setLineChartXAxisTicks(plot: LineChartPlotContext, ticks: readonly LineChartResolvedTick[]): void {
  xTicksByPlot.set(plot, ticks);
}

/** Returns current-frame y ticks independently of axis visibility. */
export function getLineChartYScaleTicks(plot: LineChartPlotContext, key: string): readonly LineChartResolvedTick[] {
  return yTicksByPlot.get(plot)?.get(key) ?? plot.axes.find(axis => axis.scaleKey === key)?.ticks ?? emptyTicks;
}

/** Internal frame handoff for independently visible grids on hidden axes. */
export function setLineChartYScaleTicks(
  plot: LineChartPlotContext,
  key: string,
  ticks: readonly LineChartResolvedTick[],
): void {
  let byKey = yTicksByPlot.get(plot);
  if (!byKey) {
    byKey = new Map();
    yTicksByPlot.set(plot, byKey);
  }
  byKey.set(key, ticks);
}

function mergeDefined<T extends object>(...sources: (Partial<T> | undefined)[]): T {
  const result: Partial<T> = {};
  for (const source of sources) {
    if (source) {
      for (const key of Object.keys(source) as (keyof T)[]) {
        if (source[key] !== undefined) {
          result[key] = source[key];
        }
      }
    }
  }
  return result as T;
}

function mergeAxis(
  base: LineChartYScaleOptions['axis'],
  override: LineChartYScaleOptions['axis'],
): LineChartYScaleOptions['axis'] {
  if (override === false) {
    return false;
  }
  if (override !== undefined) {
    return mergeDefined(base === false ? undefined : base, override);
  }
  return base;
}

/** Resolves reserved-scale inheritance field by field without leaking primary units to custom scales. */
export function getLineChartYScaleOptions(props: LineChartProps, key: string): LineChartEffectiveYScaleOptions {
  const definition = props.yScales?.find(option => option.key === key);
  const primary = key === 'y';
  const secondary = key === 'secondaryY';
  const reserved = primary || secondary;
  const legacy = primary ? props.yAxis : secondary ? props.secondaryYScaleOptions : undefined;
  const defaults: LineChartEffectiveYScaleOptions = {
    key,
    scaleType:
      (primary ? props.yScaleType : secondary ? props.secondaryYScaleType : undefined) === 'log' ? 'log' : 'linear',
    tickCount: reserved ? props.yAxisTickCount ?? 4 : 4,
    tickPolicy: reserved ? 'legacy' : 'continuous',
    tickValues: reserved ? (props.yAxisTickValues as number[] | undefined) : undefined,
    tickFormat: reserved ? props.yAxisTickFormat : undefined,
    axis: reserved
      ? { side: primary ? 'left' : 'right', title: primary ? props.yAxisTitle : props.secondaryYAxistitle }
      : false,
    line: { visible: false },
    grid: { visible: primary },
    yMinValue: primary ? props.yMinValue : secondary ? props.secondaryYScaleOptions?.yMinValue : undefined,
    yMaxValue: primary
      ? props.yMaxValue
      : secondary && props.secondaryYScaleOptions
      ? props.secondaryYScaleOptions.yMaxValue ?? 100
      : undefined,
  };
  const result = mergeDefined<LineChartEffectiveYScaleOptions>(defaults, legacy, definition);
  result.axis = mergeAxis(mergeAxis(defaults.axis, legacy?.axis), definition?.axis);
  result.inset = mergeDefined<LineChartInsets>(legacy?.inset, definition?.inset);
  result.line = mergeDefined(defaults.line, legacy?.line, definition?.line);
  result.grid = mergeDefined(defaults.grid, legacy?.grid, definition?.grid);
  result.includeZero = result.includeZero ?? result.scaleType !== 'log';
  return result;
}

/** Resolves x presentation while preserving the existing axis/tick API. */
export function getLineChartXOptions(props: LineChartProps): NonNullable<LineChartProps['xAxis']> {
  return {
    ...props.xAxis,
    axis: mergeAxis({ title: props.xAxisTitle }, props.xAxis?.axis),
    line: mergeDefined({ visible: false }, props.xAxis?.line),
    grid: mergeDefined({ visible: false }, props.xAxis?.grid),
  };
}

function requireNonnegative(value: number | undefined, name: string): number {
  if (value === undefined) {
    return 0;
  }
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`LineChart: ${name} must be finite and nonnegative.`);
  }
  return value;
}

function requireCount(value: number | undefined, fallback: number): number {
  const count = value ?? fallback;
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error('LineChart: tick count must be a positive integer.');
  }
  return count;
}

function validatePresentation(options: LineChartEffectiveYScaleOptions | NonNullable<LineChartProps['xAxis']>): void {
  for (const stroke of [options.line, options.grid]) {
    requireNonnegative(stroke?.strokeWidth, 'strokeWidth');
    if (
      stroke?.opacity !== undefined &&
      (!Number.isFinite(stroke.opacity) || stroke.opacity < 0 || stroke.opacity > 1)
    ) {
      throw new Error('LineChart: axis opacity must be between zero and one.');
    }
  }
}

function numericDomain(domain: readonly number[], log: boolean, name: string): [number, number] {
  if (
    domain.length !== 2 ||
    !domain.every(value => typeof value === 'number' && Number.isFinite(value)) ||
    domain[0] >= domain[1] ||
    (log && domain[0] <= 0)
  ) {
    throw new Error(`LineChart: ${name} requires two finite increasing${log ? ' positive' : ''} endpoints.`);
  }
  return [domain[0], domain[1]];
}

function finiteExtent(min: number, max: number, log: boolean): [number, number] {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return log ? [1, 10] : [0, 1];
  }
  if (min === max) {
    if (min === 0) {
      return [0, 1];
    }
    if (log) {
      const lower = min / 10;
      const upper = min * 10;
      return [lower > 0 ? lower : min, Number.isFinite(upper) ? upper : max];
    }
    const delta = Math.max(Math.abs(min) * 0.1, Number.MIN_VALUE);
    return [Math.max(-Number.MAX_VALUE, min - delta), Math.min(Number.MAX_VALUE, max + delta)];
  }
  return [min, max];
}

function insetRange(
  start: number,
  end: number,
  inset: LineChartInsets | undefined,
  name: string,
  drawable = true,
): [number, number] {
  const a = requireNonnegative(inset?.start, `${name} inset.start`);
  const b = requireNonnegative(inset?.end, `${name} inset.end`);
  const span = Math.abs(end - start);
  if (span === 0 || !drawable) {
    return [start, end];
  }
  if (a + b >= span) {
    throw new Error(`LineChart: ${name} insets must leave a positive scale range.`);
  }
  const direction = end > start ? 1 : -1;
  return [start + direction * a, end - direction * b];
}

function createYScale(
  props: LineChartProps,
  options: LineChartEffectiveYScaleOptions,
  extent: { min: number; max: number; integral: boolean },
): NumericScale {
  validatePresentation(options);
  const log = options.scaleType === 'log';
  if (log && (options.includeZero === true || options.tickPolicy === 'integer')) {
    throw new Error('LineChart: logarithmic scales cannot include zero or use integer tick policy.');
  }
  const count = requireCount(options.tickCount, 4);
  let domain: [number, number];
  if (options.domain !== undefined) {
    domain = numericDomain(options.domain, log, `${options.key} domain`);
  } else {
    let { min, max } = extent;
    for (const [hint, isMin] of [
      [options.yMinValue, true],
      [options.yMaxValue, false],
    ] as const) {
      if (hint !== undefined) {
        if (!Number.isFinite(hint)) {
          throw new Error('LineChart: domain hints must be finite.');
        }
        if (!log || hint > 0) {
          if (isMin) {
            min = Math.min(min, hint);
          } else {
            max = Math.max(max, hint);
          }
        }
      }
    }
    if (Number.isFinite(min) && !Number.isFinite(max)) {
      max = min;
    } else if (!Number.isFinite(min) && Number.isFinite(max)) {
      min = max;
    }
    if (options.includeZero) {
      min = Math.min(min, 0);
      max = Math.max(max, 0);
    }
    domain = finiteExtent(min, max, log);
    if (options.nice === undefined && (options.key === 'y' || options.key === 'secondaryY') && !log) {
      const values = prepareDatapoints(domain[1], domain[0], count, extent.integral, props.roundedTicks);
      domain = finiteExtent(values[0], values[values.length - 1], false);
    }
  }
  const scale = (log ? scaleLog() : scaleLinear()).domain(domain) as NumericScale;
  if (
    options.domain === undefined &&
    (options.nice === true || (options.nice === undefined && options.key !== 'y' && options.key !== 'secondaryY'))
  ) {
    scale.nice(count);
  }
  return scale;
}

function createYTicks(state: YScaleState, props: LineChartProps, integral: boolean): readonly LineChartResolvedTick[] {
  const { options, scale } = state;
  const count = requireCount(options.tickCount, 4);
  const domain = scale.domain();
  let candidates = options.tickValues;
  if (candidates === undefined && options.tickStep !== undefined) {
    candidates = generateNumericTicks(
      options.scaleType === 'log' ? 'log' : undefined,
      options.tickStep,
      options.tick0,
      domain,
    );
  }
  if (candidates === undefined) {
    candidates =
      options.tickPolicy === 'legacy' && options.scaleType !== 'log' && options.nice !== false
        ? prepareDatapoints(domain[1], domain[0], count, integral, props.roundedTicks)
        : scale.ticks(count);
  }
  if (options.tickValues === undefined && options.tickPolicy === 'integer') {
    candidates = candidates.filter(Number.isInteger);
  }
  const nativeFormat = scale.tickFormat(count);
  const formatter = options.tickFormat;
  const stringFormatter = typeof formatter === 'string' ? d3Format(formatter) : undefined;
  const ticks: LineChartResolvedTick[] = [];
  candidates.forEach((value, index) => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new Error('LineChart: numeric tick values must be finite numbers.');
    }
    if (value < domain[0] || value > domain[1] || (options.scaleType === 'log' && value <= 0)) {
      return;
    }
    const label =
      options.tickText?.[index] ??
      (typeof formatter === 'function'
        ? formatter(value, index)
        : stringFormatter
        ? stringFormatter(value)
        : nativeFormat(value) === ''
        ? ''
        : defaultYAxisTickFormatter(value));
    ticks.push({
      key: `${options.key}-tick-${index}`,
      value,
      label,
      position: scale(value),
      labelVisible: options.axis !== false && options.axis?.labelsVisible !== false && label !== '',
    });
  });
  return ticks;
}

/**
 * Creates the immutable scale/layout part of a LineChart scene in full-root SVG units.
 * Mutable D3 handles remain private to the frame-bound projection closures.
 */
export function createLineChartLayout(
  props: LineChartProps,
  width: number,
  height: number,
  isRtl: boolean,
  idPrefix: string,
  rowHeights?: ReadonlyMap<string, number>,
  axisWidths?: ReadonlyMap<string, number>,
): LineChartPlotContext {
  requireNonnegative(width, 'width');
  requireNonnegative(height, 'height');
  const definitions = new Map<string, LineChartYScaleOptions>();
  for (const definition of props.yScales ?? []) {
    if (
      !definition ||
      typeof definition.key !== 'string' ||
      !definition.key.trim() ||
      definition.key === 'x' ||
      definitions.has(definition.key)
    ) {
      throw new Error('LineChart: y scale keys must be nonempty, unique, and different from x.');
    }
    definitions.set(definition.key, definition);
  }
  const extents = new Map<string, { min: number; max: number; integral: boolean }>();
  const ensureExtent = (key: string) => {
    let extent = extents.get(key);
    if (!extent) {
      extent = { min: Infinity, max: -Infinity, integral: true };
      extents.set(key, extent);
    }
    return extent;
  };
  definitions.forEach((_definition, key) => ensureExtent(key));
  const optionsByKey = new Map<string, LineChartEffectiveYScaleOptions>();
  const getOptions = (key: string) => {
    let options = optionsByKey.get(key);
    if (!options) {
      options = getLineChartYScaleOptions(props, key);
      optionsByKey.set(key, options);
    }
    return options;
  };
  const seriesKeys = new Set<string>();
  let family: 'number' | 'date' | 'category' | undefined;
  let xMin = Infinity;
  let xMax = -Infinity;
  const categories: Record<string, number[]> = Object.create(null);
  let hasMarkers = false;
  for (const [index, series] of (props.data.lineChartData ?? []).entries()) {
    const seriesKey = props.getSeriesKey?.(series, index) ?? `series-${index}`;
    if (typeof seriesKey !== 'string' || !seriesKey.trim() || seriesKeys.has(seriesKey)) {
      throw new Error('LineChart: series keys must be nonempty and unique.');
    }
    seriesKeys.add(seriesKey);
    const key = props.getSeriesYScaleKey?.(series, index) ?? (series.useSecondaryYScale ? 'secondaryY' : 'y');
    if (typeof key !== 'string' || !key.trim() || (key !== 'y' && key !== 'secondaryY' && !definitions.has(key))) {
      throw new Error(`LineChart: unknown y scale key ${String(key)}.`);
    }
    const extent = ensureExtent(key);
    const options = getOptions(key);
    hasMarkers = hasMarkers || !!series.lineOptions?.mode?.includes('markers');
    for (const point of series.data) {
      if (!(point.x instanceof Date) && typeof point.x !== 'number' && typeof point.x !== 'string') {
        continue;
      }
      const kind = point.x instanceof Date ? 'date' : typeof point.x === 'string' ? 'category' : 'number';
      if (family !== undefined && kind !== family) {
        throw new Error('LineChart: x values must use one homogeneous numeric, Date, or category family.');
      }
      family = kind;
      const x = point.x instanceof Date ? point.x.getTime() : point.x;
      if ((typeof x === 'number' && !Number.isFinite(x)) || !Number.isFinite(point.y)) {
        continue;
      }
      if (kind === 'number' && props.xScaleType === 'log' && (x as number) <= 0) {
        continue;
      }
      if (typeof x === 'string') {
        (categories[x] ?? (categories[x] = [])).push(point.y);
      } else {
        xMin = Math.min(xMin, x);
        xMax = Math.max(xMax, x);
      }
      if (options.scaleType !== 'log' || point.y > 0) {
        extent.min = Math.min(extent.min, point.y);
        extent.max = Math.max(extent.max, point.y);
        extent.integral = extent.integral && Number.isInteger(point.y);
      }
    }
  }
  if (props.secondaryYScaleOptions !== undefined) {
    ensureExtent('secondaryY');
  }
  if (extents.size === 0) {
    ensureExtent('y');
  }
  const states: YScaleState[] = [];
  const yByKey = new Map<string, YScaleState>();
  const orderedKeys = [
    ...definitions.keys(),
    ...['y', 'secondaryY'].filter(key => extents.has(key) && !definitions.has(key)),
  ];
  for (const key of orderedKeys) {
    const extent = extents.get(key)!;
    const options = getOptions(key);
    const state: YScaleState = { options, scale: createYScale(props, options, extent), ticks: [], width: 0 };
    state.ticks = createYTicks(state, props, extent.integral);
    const presentation = options.axis;
    if (presentation !== false) {
      const fontSize =
        typeof presentation?.tickLabelStyle?.fontSize === 'number' ? presentation.tickLabelStyle.fontSize : 10;
      const estimatedLabelWidth =
        presentation?.labelsVisible === false
          ? 0
          : state.ticks.reduce((max, tick) => Math.max(max, tick.label.length * fontSize * 0.6), 0);
      state.width = requireNonnegative(
        axisWidths?.get(`y:${key}`) ?? estimatedLabelWidth + 16 + (presentation?.title ? 24 : 0),
        `${key} axis width`,
      );
    }
    states.push(state);
    yByKey.set(key, state);
  }
  const xOptions = getLineChartXOptions(props);
  validatePresentation(xOptions);
  const xCount = requireCount(props.xAxisTickCount, 6);
  family =
    family ??
    (xOptions.domain?.[0] instanceof Date || props.tickValues?.[0] instanceof Date
      ? 'date'
      : xOptions.domain === undefined && typeof props.tickValues?.[0] === 'string'
      ? 'category'
      : 'number');
  if (
    family === 'category' &&
    (xOptions.domain !== undefined ||
      xOptions.nice !== undefined ||
      props.xScaleType === 'log' ||
      xOptions.tickStep !== undefined)
  ) {
    throw new Error('LineChart: category x axes do not support continuous domain or tick controls.');
  }
  const rows = (props.xAxisLabelRows ?? []).map(row => {
    const min =
      row.layout === 'measured'
        ? requireNonnegative(row.minHeight, 'row minHeight')
        : requireNonnegative(row.height, 'row height');
    const max =
      row.layout === 'measured' && row.maxHeight !== undefined
        ? requireNonnegative(row.maxHeight, 'row maxHeight')
        : Infinity;
    if (min > max || !row.key?.trim()) {
      throw new Error('LineChart: label rows require nonempty keys and minHeight <= maxHeight.');
    }
    const measured =
      row.layout === 'measured' ? requireNonnegative(rowHeights?.get(row.key) ?? min, 'measured row height') : min;
    return { row, height: Math.max(min, Math.min(max, measured)), gap: requireNonnegative(row.gap, 'row gap') };
  });
  if (new Set(rows.map(entry => entry.row.key)).size !== rows.length) {
    throw new Error('LineChart: label row keys must be unique.');
  }
  const xPresentation = xOptions.axis;
  const xLabelsHeight =
    xPresentation === false || xPresentation?.labelsVisible === false
      ? 0
      : requireNonnegative(axisWidths?.get('x') ?? 30, 'x label height');
  const xTitleHeight =
    xPresentation !== false && xPresentation?.title
      ? requireNonnegative(axisWidths?.get('x-title') ?? 24, 'x title height')
      : 0;
  // Native captions use the root SVG, independently of axis visibility and scale insets.
  const hasHeader = props.xAxisAnnotation !== undefined && props.xAxisAnnotation !== '';
  const fontSize =
    typeof props.titleStyles?.titleFont?.size === 'number' && Number.isFinite(props.titleStyles.titleFont.size)
      ? Math.max(0, props.titleStyles.titleFont.size)
      : 13;
  const padTop = props.titleStyles?.titlePad?.t ?? 0;
  const padBottom = props.titleStyles?.titlePad?.b ?? 0;
  const headerPosition = Math.max(fontSize + 8, 12) + padTop - padBottom;
  const headerOverhang =
    props.titleStyles?.titleYAnchor === 'top'
      ? fontSize
      : props.titleStyles?.titleYAnchor === 'middle'
      ? fontSize / 2
      : 0;
  const headerHeight = hasHeader ? Math.max(40, headerPosition + headerOverhang + 8) : 0;
  const hasVerticalCaption =
    props.yAxisAnnotation !== undefined && props.yAxisAnnotation !== '' && !props.secondaryYAxistitle;
  const verticalCaptionWidth = hasVerticalCaption ? 24 + 13 : 0;
  const leftWidth = states.reduce(
    (sum, state) => sum + (state.options.axis !== false && state.options.axis?.side !== 'right' ? state.width : 0),
    0,
  );
  const rightWidth = states.reduce(
    (sum, state) => sum + (state.options.axis !== false && state.options.axis?.side === 'right' ? state.width : 0),
    0,
  );
  const left = Math.min(
    width,
    Math.max(
      requireNonnegative(props.margins?.left ?? 40, 'left margin'),
      leftWidth + (isRtl ? verticalCaptionWidth : 0),
    ),
  );
  const right = Math.min(
    width - left,
    Math.max(
      requireNonnegative(props.margins?.right ?? 20, 'right margin'),
      rightWidth + (isRtl ? 0 : verticalCaptionWidth),
    ),
  );
  const top = Math.min(height, Math.max(requireNonnegative(props.margins?.top ?? 20, 'top margin'), headerHeight));
  const rowHeight = rows.reduce((sum, row) => sum + row.height + row.gap, 0);
  const bottom = Math.min(
    height - top,
    Math.max(
      requireNonnegative(props.margins?.bottom ?? 35, 'bottom margin'),
      xLabelsHeight + rowHeight + xTitleHeight,
    ),
  );
  const plotRect = {
    x: left,
    y: top,
    width: Math.max(0, width - left - right),
    height: Math.max(0, height - top - bottom),
  };
  const drawable = plotRect.width > 0 && plotRect.height > 0;
  const xRange = insetRange(
    isRtl ? left + plotRect.width : left,
    isRtl ? left : left + plotRect.width,
    xOptions.inset,
    'x',
    drawable,
  );
  let xScale: LineChartResolvedXScale;
  let projectX: LineChartPlotContext['projectX'];
  let xTicks: LineChartResolvedTick[];
  const nativeParams = {
    domainNRangeValues: { dStartValue: 0, dEndValue: 1, rStartValue: xRange[0], rEndValue: xRange[1] },
    margins: { left, right, top, bottom },
    containerWidth: width,
    containerHeight: height,
    xAxisCount: xCount,
    calcMaxLabelWidth: (labels: (string | number)[]) =>
      labels.reduce<number>((max, label) => Math.max(max, String(label).length * 6), 0),
    tickText: xOptions.tickText,
  };
  if (family === 'category') {
    const domain = sortAxisCategories(categories, props.xAxisCategoryOrder);
    const scale = scalePoint<string>().domain(domain).range(xRange);
    xScale = { kind: 'category', domain, range: xRange };
    projectX = value => (drawable && typeof value === 'string' ? scale(value) : undefined);
    const values = props.tickValues ?? domain;
    xTicks = values
      .map((value, index) => {
        if (typeof value !== 'string') {
          throw new Error('LineChart: category ticks must be strings.');
        }
        return {
          key: `x-tick-${index}`,
          value,
          position: scale(value) ?? NaN,
          label: xOptions.tickText?.[index] ?? value,
          labelVisible: true,
        };
      })
      .filter(tick => Number.isFinite(tick.position));
  } else {
    const date = family === 'date';
    const log = !date && props.xScaleType === 'log';
    let domain: [number, number];
    if (xOptions.domain !== undefined) {
      if (date !== xOptions.domain[0] instanceof Date || date !== xOptions.domain[1] instanceof Date) {
        throw new Error('LineChart: exact x domain endpoints must match the active x family.');
      }
      domain = numericDomain(
        xOptions.domain.map(value => +value),
        log,
        'x domain',
      );
    } else {
      if (date) {
        for (const tick of props.tickValues ?? []) {
          if (!(tick instanceof Date) || !Number.isFinite(+tick)) {
            throw new Error('LineChart: date ticks must be valid Dates.');
          }
          xMin = Math.min(xMin, +tick);
          xMax = Math.max(xMax, +tick);
        }
      }
      domain = finiteExtent(xMin, xMax, log);
      if (hasMarkers) {
        const padding = getDomainPaddingForMarkers(
          domain[0],
          domain[1],
          log ? 'log' : undefined,
          props.xMinValue,
          props.xMaxValue,
        );
        domain = [domain[0] - padding.start, domain[1] + padding.end];
      }
      if (!date) {
        if (props.xMinValue !== undefined && Number.isFinite(props.xMinValue) && (!log || props.xMinValue > 0)) {
          domain[0] = Math.min(domain[0], props.xMinValue);
        }
        if (props.xMaxValue !== undefined && Number.isFinite(props.xMaxValue) && (!log || props.xMaxValue > 0)) {
          domain[1] = Math.max(domain[1], props.xMaxValue);
        }
      }
    }
    if (date) {
      const utc = props.useUTC === true || props.useUTC === 'utc';
      const scale = (utc ? scaleUtc() : scaleTime()).domain(domain.map(value => new Date(value))).range(xRange);
      if (xOptions.domain === undefined && xOptions.nice !== false) {
        scale.nice(xOptions.nice === true ? xCount : undefined);
      }
      const resolvedDomain = scale.domain() as [Date, Date];
      xScale = { kind: 'date', domain: resolvedDomain, range: xRange };
      projectX = value => (drawable && value instanceof Date && Number.isFinite(+value) ? scale(value) : undefined);
      const values =
        props.tickValues ??
        generateDateTicks(xOptions.tickStep, xOptions.tick0, resolvedDomain, utc) ??
        scale.ticks(xCount);
      if (values.some(value => !(value instanceof Date) || !Number.isFinite(+value))) {
        throw new Error('LineChart: date ticks must be valid Dates.');
      }
      const result = createDateXAxis(
        {
          ...nativeParams,
          domainNRangeValues: {
            ...nativeParams.domainNRangeValues,
            dStartValue: resolvedDomain[0],
            dEndValue: resolvedDomain[1],
          },
        },
        { tickValues: values as Date[], tickFormat: props.tickFormat },
        props.culture,
        props.dateLocalizeOptions,
        props.timeFormatLocale,
        props.customDateTimeFormatter,
        props.useUTC,
        ChartTypes.LineChart,
      );
      xTicks = result.tickValues
        .map((value, index) => ({
          key: `x-tick-${index}`,
          value,
          position: scale(value),
          label: result.tickLabels[index],
          labelVisible: true,
        }))
        .filter(tick => +tick.value >= +resolvedDomain[0] && +tick.value <= +resolvedDomain[1]);
    } else {
      const scale = (log ? scaleLog() : scaleLinear()).domain(domain).range(xRange);
      if (xOptions.domain === undefined && xOptions.nice !== false) {
        scale.nice(xOptions.nice === true ? xCount : undefined);
      }
      const resolvedDomain = scale.domain() as [number, number];
      xScale = { kind: 'number', scaleType: log ? 'log' : 'linear', domain: resolvedDomain, range: xRange };
      projectX = value =>
        drawable && typeof value === 'number' && Number.isFinite(value) && (!log || value > 0)
          ? scale(value)
          : undefined;
      const values =
        props.tickValues ??
        generateNumericTicks(log ? 'log' : undefined, xOptions.tickStep, xOptions.tick0, resolvedDomain) ??
        scale.ticks(xCount);
      if (values.some(value => typeof value !== 'number' || !Number.isFinite(value))) {
        throw new Error('LineChart: numeric x ticks must be finite numbers.');
      }
      const result = createNumericXAxis(
        {
          ...nativeParams,
          domainNRangeValues: {
            ...nativeParams.domainNRangeValues,
            dStartValue: resolvedDomain[0],
            dEndValue: resolvedDomain[1],
          },
        },
        { tickValues: values as number[], tickFormat: props.tickFormat },
        ChartTypes.LineChart,
        props.culture,
        log ? 'log' : undefined,
      );
      xTicks = result.tickValues
        .map((value, index) => ({
          key: `x-tick-${index}`,
          value,
          position: scale(value),
          label: result.tickLabels[index],
          labelVisible: true,
        }))
        .filter(tick => tick.value >= resolvedDomain[0] && tick.value <= resolvedDomain[1]);
    }
  }
  // Keep every resolved tick for row renderers; visibility describes only the native labels.
  let lastLabelEnd = -Infinity;
  const orderedTicks = [...xTicks].sort((a, b) => a.position - b.position);
  const visibleKeys = new Set<string>();
  for (const tick of orderedTicks) {
    const halfWidth =
      requireNonnegative(axisWidths?.get(`x-tick:${tick.key}`) ?? tick.label.length * 6, 'x tick width') / 2;
    if (props.hideTickOverlap === false || tick.position - halfWidth >= lastLabelEnd + 4) {
      visibleKeys.add(tick.key);
      lastLabelEnd = tick.position + halfWidth;
    }
  }
  xTicks = xTicks.map(tick => ({
    ...tick,
    labelVisible: xPresentation !== false && xPresentation?.labelsVisible !== false && visibleKeys.has(tick.key),
  }));
  const axes: LineChartResolvedAxis[] = [];
  const yScales: LineChartResolvedYScale[] = [];
  let leftOffset = 0;
  let rightOffset = 0;
  for (const state of states) {
    const range = insetRange(top + plotRect.height, top, state.options.inset, state.options.key, drawable);
    state.scale.range(range);
    state.ticks = state.ticks.map(tick => ({ ...tick, position: state.scale(tick.value as number) }));
    yScales.push({
      key: state.options.key,
      scaleType: state.options.scaleType === 'log' ? 'log' : 'linear',
      domain: state.scale.domain() as [number, number],
      range,
    });
    if (state.options.axis !== false) {
      const side = state.options.axis?.side ?? 'left';
      const x = side === 'left' ? left - leftOffset - state.width : left + plotRect.width + rightOffset;
      axes.push({
        orientation: 'y',
        scaleKey: state.options.key,
        side,
        rect: { x, y: top, width: state.width, height: plotRect.height },
        ticks: state.ticks,
      });
      if (side === 'left') {
        leftOffset += state.width;
      } else {
        rightOffset += state.width;
      }
    }
  }
  if (xPresentation !== false) {
    axes.push({
      orientation: 'x',
      scaleKey: 'x',
      side: 'bottom',
      rect: {
        x: left,
        y: top + plotRect.height,
        width: plotRect.width,
        height: xLabelsHeight + rowHeight + xTitleHeight,
      },
      ticks: xTicks,
    });
  }
  let rowTop = top + plotRect.height + xLabelsHeight;
  const xAxisLabelRows = rows.map(({ row, height: rowSize, gap }) => {
    rowTop += gap;
    const result = {
      key: row.key,
      layout: row.layout,
      measuredHeight: rowSize,
      rect: { x: left, y: rowTop, width: plotRect.width, height: rowSize },
    };
    rowTop += rowSize;
    return result;
  });
  const padding = props.markerClipPadding;
  const clip = typeof padding === 'number' ? { top: padding, right: padding, bottom: padding, left: padding } : padding;
  const clipTop = requireNonnegative(clip?.top, 'marker clip top');
  const clipRight = requireNonnegative(clip?.right, 'marker clip right');
  const clipBottom = requireNonnegative(clip?.bottom, 'marker clip bottom');
  const clipLeft = requireNonnegative(clip?.left, 'marker clip left');
  const plot: LineChartPlotContext = {
    frameId: 0,
    geometryVersion: 0,
    layoutEpoch: 0,
    frameTimeMs: 0,
    reducedMotion: false,
    svgRect: { x: 0, y: 0, width, height },
    plotRect,
    markerClipRect: {
      x: left - clipLeft,
      y: top - clipTop,
      width: plotRect.width + clipLeft + clipRight,
      height: plotRect.height + clipTop + clipBottom,
    },
    isRtl,
    plotClipPathId: `${idPrefix}-plot-clip`,
    markerClipPathId: `${idPrefix}-marker-clip`,
    xScale,
    yScales,
    axes,
    xAxisLabelRows,
    series: [],
    interaction: {},
    inspection: {},
    projectX,
    projectY: (key, value) => {
      const state = yByKey.get(key);
      return drawable && state && Number.isFinite(value) && (state.options.scaleType !== 'log' || value > 0)
        ? state.scale(value)
        : undefined;
    },
  };
  setLineChartXAxisTicks(plot, xTicks);
  for (const state of states) {
    setLineChartYScaleTicks(plot, state.options.key, state.ticks);
  }
  return plot;
}
