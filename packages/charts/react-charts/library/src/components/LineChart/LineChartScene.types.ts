import type * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import type { AxisProps, LineChartLineOptions, LineChartPoints } from '../../types/index';

/**
 * X-value union accepted by the existing line and scatter point arrays.
 * {@docCategory ChartData}
 */
export type LineChartXValue = LineChartPoints['data'][number]['x'];

/**
 * Existing line or scatter point data, retaining the numeric y field.
 * {@docCategory ChartData}
 */
export type LineChartPointData = LineChartPoints['data'][number];

/**
 * Stable scale key; x, y and secondaryY are reserved keys.
 * {@docCategory ChartData}
 */
export type LineChartScaleKey = string;

/**
 * Current lifecycle phase of a keyed series presentation.
 * {@docCategory ChartData}
 */
export type LineChartPhase = 'enter' | 'present' | 'update' | 'exit';

/**
 * Read-only position in the root SVG coordinate system.
 * {@docCategory ChartData}
 */
export interface LineChartPosition {
  readonly x: number;
  readonly y: number;
}

/**
 * Read-only rectangle in the root SVG coordinate system.
 * {@docCategory ChartData}
 */
export interface LineChartRect extends LineChartPosition {
  readonly width: number;
  readonly height: number;
}

/**
 * Screen-space insets at the data-order start and end of a scale.
 * {@docCategory LineChart}
 */
export interface LineChartInsets {
  start?: number;
  end?: number;
}

/**
 * Additional marker clipping space on each physical side of the plot.
 * {@docCategory LineChart}
 */
export interface LineChartClipPadding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/**
 * Visual properties for an axis rule or its grid lines.
 * {@docCategory LineChart}
 */
export interface LineChartAxisStrokeProps {
  visible?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  dashArray?: string;
  opacity?: number;
}

/**
 * Label, title and text-style properties for a visible axis.
 * {@docCategory LineChart}
 */
export interface LineChartAxisPresentationProps {
  labelsVisible?: boolean;
  title?: string;
  tickLabelStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
}

/**
 * Numeric y-axis domain, tick, range and presentation options.
 * {@docCategory LineChart}
 */
export interface LineChartNumericAxisOptions {
  /**
   * Exact increasing endpoints; bypass automatic expansion, zero inclusion and nicing.
   */
  domain?: [number, number];
  /**
   * Whether to nice an automatic domain. Omission preserves the corresponding legacy policy.
   */
  nice?: boolean;
  /**
   * Whether to include zero in an automatic linear domain. Exact domain takes precedence.
   */
  includeZero?: boolean;
  /**
   * Screen-space scale-range inset; does not change the plot rectangle.
   */
  inset?: LineChartInsets;
  /**
   * Explicit tick values, replacing automatic ticks without redefining the domain.
   */
  tickValues?: number[];
  /**
   * Desired positive tick count, used when explicit tick sources are absent.
   */
  tickCount?: number;
  /**
   * Policy for generated ticks; reserved scales preserve legacy behavior when omitted.
   */
  tickPolicy?: 'legacy' | 'continuous' | 'integer';
  /**
   * Formats a generated numeric tick unless explicit tickText supplies its label.
   */
  tickFormat?: (value: number, index: number) => string;
  /**
   * Visual properties for the axis rule.
   */
  line?: LineChartAxisStrokeProps;
  /**
   * Visual properties for the scale grid, independently of axis visibility.
   */
  grid?: LineChartAxisStrokeProps;
  /**
   * Axis presentation; false hides the axis but leaves the scale available.
   */
  axis?: false | LineChartAxisPresentationProps;
}

/**
 * Exact-domain, range and presentation options for the existing x axis.
 * {@docCategory LineChart}
 */
export interface LineChartXAxisOptions {
  /**
   * Exact increasing numeric or Date endpoints matching the active x data family.
   */
  domain?: [number, number] | [Date, Date];
  /**
   * Whether to nice an automatic numeric or Date domain. Exact domain takes precedence.
   */
  nice?: boolean;
  /**
   * Screen-space x-range inset in data order, mirrored on screen in RTL.
   */
  inset?: LineChartInsets;
  /**
   * Visual properties for the x-axis rule.
   */
  line?: LineChartAxisStrokeProps;
  /**
   * Visual properties for the x grid.
   */
  grid?: LineChartAxisStrokeProps;
  /**
   * X-axis label and title presentation; false hides the native axis.
   */
  axis?: false | LineChartAxisPresentationProps;
}

/**
 * Configuration for one keyed y scale, including hidden projection-only scales.
 * {@docCategory LineChart}
 */
export interface LineChartYScaleOptions extends LineChartNumericAxisOptions {
  /**
   * Nonempty y-scale key. The x key is reserved and cannot be used here.
   */
  key: LineChartScaleKey;
  /**
   * Numeric scale type. Custom scales default to linear.
   */
  scaleType?: 'linear' | 'log';
  /**
   * Physical side and presentation, or false for a scale-only entry.
   */
  axis?:
    | false
    | (LineChartAxisPresentationProps & {
        side?: 'left' | 'right';
      });
  /**
   * Explicit labels mapped to the effective tick source before out-of-domain filtering.
   */
  tickText?: AxisProps['tickText'];
  /**
   * Explicit tick step, taking precedence over count-driven generation.
   */
  tickStep?: AxisProps['tickStep'];
  /**
   * Origin for step-driven tick generation.
   */
  tick0?: number;
}

/**
 * Options for closing each resolved series run to a numeric baseline.
 * {@docCategory LineChart}
 */
export interface LineChartBaselineFillOptions {
  value: number;
  color?: string;
  opacity?: number;
  gradient?: {
    direction: 'vertical' | 'horizontal';
    stops: LineChartGradientStop[];
  };
}

/**
 * One color stop in a series baseline-fill gradient.
 * {@docCategory LineChart}
 */
export interface LineChartGradientStop {
  offset: number;
  color: string;
  opacity?: number;
}

/**
 * An exact line or cubic piece recorded during native curve generation.
 * {@docCategory ChartData}
 */
export type LineChartCurvePiece =
  | Readonly<{
      kind: 'line';
      start: LineChartPosition;
      end: LineChartPosition;
    }>
  | Readonly<{
      kind: 'cubic';
      start: LineChartPosition;
      control1: LineChartPosition;
      control2: LineChartPosition;
      end: LineChartPosition;
    }>;

/**
 * Exact pieces and their eligibility for monotone-x comparison construction.
 * {@docCategory ChartData}
 */
export type LineChartCurveRepresentation =
  | Readonly<{
      status: 'supported';
      xDirection: 'increasing' | 'decreasing' | 'constant';
      pieces: readonly LineChartCurvePiece[];
    }>
  | Readonly<{
      status: 'unsupported';
      xDirection: 'unsupported';
      reason: 'non-monotone-x';
      pieces: readonly LineChartCurvePiece[];
    }>;

/**
 * Original point identity and its current projected position.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedPoint {
  readonly key: string;
  readonly dataIndex: number;
  readonly data: Readonly<LineChartPointData>;
  readonly position: LineChartPosition;
}

/**
 * Exact native path, piece direction and point identities for one contiguous run.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedSegment {
  readonly key: string;
  readonly path: string;
  readonly pointKeys: readonly string[];
  readonly screenXBounds: readonly [number, number];
  readonly curve: LineChartCurveRepresentation;
}

/**
 * Resolved stroke and border values, preserving existing SVG option types.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedStroke {
  readonly color: string;
  readonly width: NonNullable<LineChartLineOptions['strokeWidth']>;
  readonly dashArray?: LineChartLineOptions['strokeDasharray'];
  readonly dashOffset?: LineChartLineOptions['strokeDashoffset'];
  readonly lineCap: NonNullable<React.SVGProps<SVGPathElement>['strokeLinecap']>;
  readonly lineJoin: NonNullable<React.SVGProps<SVGPathElement>['strokeLinejoin']>;
  readonly borderWidth?: LineChartLineOptions['lineBorderWidth'];
  readonly borderColor?: string;
  readonly opacity: number;
}

/**
 * Captured phase timing, progress and reveal state on the shared timeline.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedTransition {
  readonly startMs: number;
  readonly durationMs: number;
  readonly progress: number;
  readonly revealProgress: number;
  readonly entranceEndMs: number;
  readonly exitDelayMs: number;
}

/**
 * One closed baseline-fill path derived from the current native curve.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedFillRun {
  readonly key: string;
  readonly path: string;
  readonly sourceSegmentKeys: readonly string[];
  readonly screenXBounds: readonly [number, number];
}

/**
 * Resolved baseline-fill runs, or an explicit empty result.
 * {@docCategory ChartData}
 */
export type LineChartFillGeometry =
  | Readonly<{
      status: 'ready';
      runs: readonly LineChartResolvedFillRun[];
    }>
  | Readonly<{
      status: 'empty';
      reason: 'no-observations' | 'zero-width';
    }>;

/**
 * Projected baseline, resolved fill geometry and presentation-scoped gradient metadata.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedBaselineFill {
  readonly baselineValue: number;
  readonly baselinePosition: number;
  readonly geometry: LineChartFillGeometry;
  readonly color: string;
  readonly opacity: number;
  readonly gradientId?: string;
}

/**
 * Current or captured-exit series geometry, appearance and lifecycle metadata.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedSeries {
  readonly key: string;
  readonly scaleKey: LineChartScaleKey;
  readonly data: Readonly<LineChartPoints>;
  readonly phase: LineChartPhase;
  readonly transition: LineChartResolvedTransition;
  readonly revealMaskId?: string;
  readonly capturedLayoutEpoch: number;
  readonly stroke: LineChartResolvedStroke;
  readonly path: string;
  readonly points: readonly LineChartResolvedPoint[];
  readonly segments: readonly LineChartResolvedSegment[];
  readonly baselineFill?: LineChartResolvedBaselineFill;
}

/**
 * Current numeric y-scale domain and range, including hidden scales.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedYScale {
  readonly key: LineChartScaleKey;
  readonly scaleType: 'linear' | 'log';
  readonly domain: readonly [number, number];
  readonly range: readonly [number, number];
}

/**
 * Current numeric, date or category x-scale domain and range.
 * {@docCategory ChartData}
 */
export type LineChartResolvedXScale =
  | Readonly<{
      kind: 'number';
      scaleType: 'linear' | 'log';
      domain: readonly [number, number];
      range: readonly [number, number];
    }>
  | Readonly<{
      kind: 'date';
      domain: readonly [Date, Date];
      range: readonly [number, number];
    }>
  | Readonly<{
      kind: 'category';
      domain: readonly string[];
      range: readonly [number, number];
    }>;

/**
 * A resolved tick value, screen position, label and visibility decision.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedTick {
  readonly key: string;
  readonly value: LineChartXValue;
  readonly position: number;
  readonly label: string;
  readonly labelVisible: boolean;
}

/**
 * Current drawn-axis bounds and resolved ticks.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedAxis {
  readonly orientation: 'x' | 'y';
  readonly scaleKey: LineChartScaleKey;
  readonly side: 'bottom' | 'left' | 'right';
  readonly rect: LineChartRect;
  readonly ticks: readonly LineChartResolvedTick[];
}

/**
 * Stable series and point identity, independent of labels and DOM IDs.
 * {@docCategory ChartData}
 */
export interface LineChartPointReference {
  readonly seriesKey: string;
  readonly pointKey: string;
}

/**
 * Logical inspection selection shared by controlled input and resolved scenes.
 * {@docCategory ChartData}
 */
export interface LineChartInteractionState {
  readonly activeX?: LineChartXValue;
  readonly activePoint?: LineChartPointReference;
  readonly emphasizedSeriesKeys?: readonly string[];
}

/**
 * Closest eligible rendered-curve hit, independent of observation availability.
 * {@docCategory ChartData}
 */
export interface LineChartCurveHit {
  readonly seriesKey: string;
  readonly segmentKey?: string;
  readonly pointKey?: string;
  readonly position: LineChartPosition;
  readonly distance: number;
  readonly withinRadius: boolean;
}

/**
 * Matching SVG and viewport positions for the current inspection anchor.
 * {@docCategory ChartData}
 */
export interface LineChartAnchor {
  readonly svg: LineChartPosition;
  readonly client: LineChartPosition;
}

/**
 * Current pointer, curve-hit, anchor and physical-focus metadata.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedInspection {
  readonly hit?: LineChartCurveHit;
  readonly pointer?: LineChartPosition;
  readonly clientPointer?: LineChartPosition;
  readonly anchor?: LineChartAnchor;
  readonly focusedPoint?: LineChartPointReference;
}

/**
 * Inspection proposal and frame metadata delivered by the interaction callback.
 * {@docCategory ChartData}
 */
export interface LineChartInteractionChange {
  readonly frameId: number;
  readonly geometryVersion: number;
  readonly layoutEpoch: number;
  readonly state: LineChartInteractionState;
  readonly reason: 'pointer' | 'focus' | 'leave' | 'blur' | 'escape' | 'data-change' | 'layout' | 'focus-reconcile';
  readonly inspection: LineChartResolvedInspection;
}

/**
 * Inspection mode, hit radius, slots and native-feedback options.
 * {@docCategory LineChart}
 */
export interface LineChartInteractionOptions {
  /**
   * Inspection policy used for normalized interaction.
   * @default nearest-x
   */
  mode?: 'nearest-x' | 'nearest-series';
  /**
   * Curve-hit threshold in root SVG units, not CSS pixels.
   * @default 12
   */
  hitRadius?: number;
  /**
   * Inspection slots, including unavailable slots without invented numeric points.
   */
  xValues?: LineChartXValue[];
  /**
   * Whether to render native guide feedback; omission preserves native defaults.
   */
  showDefaultGuide?: boolean;
  /**
   * Whether to render native highlight feedback; omission preserves native defaults.
   */
  showDefaultHighlight?: boolean;
}

/**
 * Duration and easing options for one transition phase.
 * {@docCategory LineChart}
 */
export interface LineChartTimingOptions {
  /**
   * Finite nonnegative phase duration in milliseconds; zero settles immediately.
   */
  durationMs: number;
  /**
   * CSS easing keyword or timing function for the shared timeline.
   */
  easing: string;
}

/**
 * Options for the shared enter, update and exit timeline.
 * {@docCategory LineChart}
 */
export interface LineChartMotionOptions {
  /**
   * Timing for the entrance phase.
   */
  enter: LineChartTimingOptions;
  /**
   * Timing for compatible current-frame geometry updates.
   */
  update: LineChartTimingOptions;
  /**
   * Timing for retained exits; durations also determine the reversed speed ratio.
   */
  exit: LineChartTimingOptions;
  /**
   * Delay between series entrances, in milliseconds.
   * @default 0
   */
  staggerMs?: number;
  /**
   * Non-geometric stage offsets in milliseconds; all stages share one geometry frame.
   */
  stages?: Partial<Record<'grid' | 'axes' | 'marks' | 'labels', number>>;
  /**
   * Requests reduced motion in addition to the operating-system preference.
   * @default false
   */
  reducedMotion?: boolean;
}

/**
 * Current reserved row bounds and measured height.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedXAxisLabelRow {
  readonly key: string;
  readonly rect: LineChartRect;
  readonly layout: 'reserved' | 'measured';
  readonly measuredHeight: number;
}

/**
 * Read-only snapshot of the currently displayed scene and its frame-bound projections.
 * {@docCategory ChartData}
 */
export interface LineChartPlotContext {
  readonly frameId: number;
  readonly geometryVersion: number;
  readonly layoutEpoch: number;
  readonly frameTimeMs: number;
  readonly reducedMotion: boolean;
  readonly svgRect: LineChartRect;
  readonly plotRect: LineChartRect;
  readonly markerClipRect: LineChartRect;
  readonly isRtl: boolean;
  readonly plotClipPathId: string;
  readonly markerClipPathId: string;
  readonly xScale: LineChartResolvedXScale;
  readonly yScales: readonly LineChartResolvedYScale[];
  readonly axes: readonly LineChartResolvedAxis[];
  readonly xAxisLabelRows: readonly LineChartResolvedXAxisLabelRow[];
  readonly series: readonly LineChartResolvedSeries[];
  readonly interaction: LineChartInteractionState;
  readonly inspection: LineChartResolvedInspection;
  projectX(value: LineChartXValue): number | undefined;
  projectY(scaleKey: LineChartScaleKey, value: number): number | undefined;
}

/**
 * SVG elements returned for the ordered plot-layer slots.
 * {@docCategory ChartData}
 */
export interface LineChartPlotLayers {
  readonly defs?: JSXElement | null;
  readonly belowGrid?: JSXElement | null;
  readonly belowSeries?: JSXElement | null;
  readonly aboveSeries?: JSXElement | null;
}
/**
 * Resolved props passed to the series stroke render callback.
 * {@docCategory LineChart}
 */
export interface LineChartSeriesProps {
  readonly series: LineChartResolvedSeries;
  readonly plot: LineChartPlotContext;
}

/**
 * Resolved props passed to the point marker render callback.
 * {@docCategory LineChart}
 */
export interface LineChartMarkerProps {
  readonly point: LineChartResolvedPoint;
  readonly series: LineChartResolvedSeries;
  readonly plot: LineChartPlotContext;
  readonly active: boolean;
  readonly focused: boolean;
}

/**
 * Resolved props passed to the axis decoration callback.
 * {@docCategory LineChart}
 */
export interface LineChartAxisDecorationProps {
  readonly axis: LineChartResolvedAxis;
  readonly plot: LineChartPlotContext;
}

/**
 * Resolved layout and render-pass props for an extra x-axis label row.
 * {@docCategory LineChart}
 */
export interface LineChartXAxisLabelRowProps {
  readonly row: LineChartResolvedXAxisLabelRow;
  readonly ticks: readonly LineChartResolvedTick[];
  readonly plot: LineChartPlotContext;
  readonly pass: 'measure' | 'paint';
}

/**
 * A reserved SVG or measured HTML row below the native x-axis labels.
 * {@docCategory LineChart}
 */
export type LineChartXAxisLabelRow =
  | {
      key: string;
      layout: 'reserved';
      height: number;
      gap?: number;
      onRender: (props: LineChartXAxisLabelRowProps) => JSXElement | null;
    }
  | {
      key: string;
      layout: 'measured';
      minHeight?: number;
      maxHeight?: number;
      gap?: number;
      onRender: (props: LineChartXAxisLabelRowProps) => JSXElement | null;
    };
