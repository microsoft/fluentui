import type { VegaLiteSpec } from './VegaLiteTypes';
import { readVegaOwnData } from './VegaLiteField';

/** Private native IDs and the point-container strategy used by semantic tooltip binding. */
export const nativeTooltipBinding = {
  line: { strategy: 'xy-series', series: 'lineChartData' },
  bar: { strategy: 'points' },
  'stacked-bar': { strategy: 'stacked' },
  'grouped-bar': { strategy: 'grouped' },
  'horizontal-bar': { strategy: 'points' },
  area: { strategy: 'xy-series', series: 'lineChartData' },
  scatter: { strategy: 'xy-series', series: 'scatterChartData' },
  donut: { strategy: 'donut' },
  heatmap: { strategy: 'heatmap' },
  histogram: { strategy: 'points' },
  polar: { strategy: 'polar' },
} as const;

export type VegaNativeChartKind = keyof typeof nativeTooltipBinding;
export type VegaPreparedChartType = { type: VegaNativeChartKind; mark: string };

/** Semantic admission, not classifier fallbacks. Rule/text are annotation-only exceptions. */
export const vegaSemanticMarkChannels = {
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
} as const;

/**
 * Classify an already prepared, type-corrected adapter spec. No cloning, transforms, inference or
 * mutation belongs here. Native fallback classification deliberately does not imply semantic admission.
 */
export function classifyPreparedVegaChart(spec: VegaLiteSpec): VegaPreparedChartType {
  const markTypeOf = (mark: VegaLiteSpec['mark']): string | undefined => (typeof mark === 'string' ? mark : mark?.type);
  if (spec.layer && spec.layer.length > 1) {
    const marks = spec.layer.map(layer => markTypeOf(layer.mark));
    if (marks.includes('bar') && (marks.includes('line') || marks.includes('point'))) {
      return { type: 'stacked-bar', mark: 'bar' };
    }
  }
  const mark = spec.layer ? spec.layer[0]?.mark : spec.mark;
  const markType = markTypeOf(mark);
  const encoding = spec.layer ? spec.layer[0]?.encoding : spec.encoding;
  const hasColorEncoding = !!encoding?.color?.field;
  if (markType === 'arc' && encoding?.theta && encoding?.radius) {
    return { type: 'polar', mark: markType };
  }
  if (markType === 'arc' && encoding?.theta) {
    return { type: 'donut', mark: markType };
  }
  if (encoding?.theta && encoding?.radius) {
    return { type: 'polar', mark: markType! };
  }
  if (markType === 'rect' && encoding?.x?.field && encoding?.y?.field && encoding?.color?.field) {
    return { type: 'heatmap', mark: markType };
  }
  if (markType === 'bar') {
    const bin = readVegaOwnData(encoding?.x, 'bin');
    // Pre-binned interval endpoints must never trigger histogram rebinning.
    if (bin === true || (bin !== null && typeof bin === 'object' && !Array.isArray(bin))) {
      return { type: 'histogram', mark: markType };
    }
    const isXNominal = encoding?.x?.type === 'nominal' || encoding?.x?.type === 'ordinal';
    const isYNominal = encoding?.y?.type === 'nominal' || encoding?.y?.type === 'ordinal';
    if (isYNominal && !isXNominal) {
      return { type: 'horizontal-bar', mark: markType };
    }
    if (hasColorEncoding) {
      return { type: encoding?.xOffset ? 'grouped-bar' : 'stacked-bar', mark: markType };
    }
    const xField = encoding?.x?.field;
    const dataValues = spec.data?.values;
    if (xField && Array.isArray(dataValues) && dataValues.length > 0) {
      const xValues = dataValues.map(row => row[xField]);
      if (new Set(xValues).size < xValues.length) {
        return { type: 'stacked-bar', mark: markType };
      }
    }
    return { type: 'bar', mark: markType };
  }
  if (markType === 'area') {
    return { type: 'area', mark: markType };
  }
  if (markType === 'point' || markType === 'circle' || markType === 'square' || markType === 'tick') {
    return { type: 'scatter', mark: markType };
  }
  if (markType === 'trail' || markType === 'errorbar' || markType === 'errorband') {
    return { type: 'line', mark: 'line' };
  }
  return { type: 'line', mark: markType || 'line' };
}
