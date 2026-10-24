import type { RenderFunction } from '../../utilities/index';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  LineChartAxisDecorationProps,
  LineChartClipPadding,
  LineChartInteractionChange,
  LineChartInteractionOptions,
  LineChartInteractionState,
  LineChartMarkerProps,
  LineChartMotionOptions,
  LineChartNumericAxisOptions,
  LineChartPlotContext,
  LineChartPlotLayers,
  LineChartPointData,
  LineChartScaleKey,
  LineChartSeriesProps,
  LineChartXAxisLabelRow,
  LineChartXAxisOptions,
  LineChartYScaleOptions,
} from './LineChartScene.types';
import type {
  LineChartAnnotationLayoutOptions,
  LineChartAnnotationRenderProps,
} from '../CommonComponents/Annotations/ChartAnnotationLayer.types';
import type {
  ChartProps,
  ChartAnnotation,
  LineChartPoints,
  Margins,
  Basestate,
  RefArrayData,
  CustomizedCalloutData,
} from '../../types/index';
import type { EventAnnotation } from '../../types/EventAnnotation';
import type {
  CartesianChartProps,
  CartesianChartStyleProps,
  CartesianChartStyles,
  ChildProps,
} from '../CommonComponents/index';

export type { ChildProps, LineChartPoints, Margins, Basestate, RefArrayData };
export type {
  LineChartXValue,
  LineChartPointData,
  LineChartScaleKey,
  LineChartPhase,
  LineChartPosition,
  LineChartRect,
  LineChartInsets,
  LineChartClipPadding,
  LineChartAxisStrokeProps,
  LineChartAxisPresentationProps,
  LineChartNumericAxisOptions,
  LineChartXAxisOptions,
  LineChartYScaleOptions,
  LineChartBaselineFillOptions,
  LineChartGradientStop,
  LineChartCurvePiece,
  LineChartCurveRepresentation,
  LineChartResolvedPoint,
  LineChartResolvedSegment,
  LineChartResolvedStroke,
  LineChartResolvedTransition,
  LineChartResolvedFillRun,
  LineChartFillGeometry,
  LineChartResolvedBaselineFill,
  LineChartResolvedSeries,
  LineChartResolvedYScale,
  LineChartResolvedXScale,
  LineChartResolvedTick,
  LineChartResolvedAxis,
  LineChartPointReference,
  LineChartInteractionState,
  LineChartCurveHit,
  LineChartAnchor,
  LineChartResolvedInspection,
  LineChartInteractionChange,
  LineChartInteractionOptions,
  LineChartTimingOptions,
  LineChartMotionOptions,
  LineChartResolvedXAxisLabelRow,
  LineChartPlotContext,
  LineChartPlotLayers,
  LineChartSeriesProps,
  LineChartMarkerProps,
  LineChartAxisDecorationProps,
  LineChartXAxisLabelRowProps,
  LineChartXAxisLabelRow,
} from './LineChartScene.types';
export type {
  LineChartAnnotationLayoutOptions,
  LineChartAnnotationRenderProps,
} from '../CommonComponents/Annotations/ChartAnnotationLayer.types';
export type { ChartAnnotationActionOptions, LineChartKeyedAnnotationCoordinate } from '../../types/ChartAnnotation';

/**
 * Line Chart properties
 * {@docCategory LineChart}
 */
export interface LineChartProps extends CartesianChartProps {
  /**
   * Optional collision layout for native annotations. Omit to retain native placement.
   */
  annotationLayout?: LineChartAnnotationLayoutOptions;

  /**
   * Returns additional native annotations in the current root SVG frame.
   * Appended after annotations; pure, with stable ids for generated semantic hosts.
   * Supplying the accessor, even when it returns an empty array, opts into the scene.
   */
  getAnnotations?: (plot: LineChartPlotContext) => readonly ChartAnnotation[];

  /**
   * Returns a nonempty stable point key within its original input series.
   */
  getPointKey?: (point: LineChartPointData, series: LineChartPoints, index: number) => string;

  /**
   * Returns a nonempty stable series key, independent of its legend text.
   */
  getSeriesKey?: (series: LineChartPoints, index: number) => string;

  /**
   * Returns the y-scale key for an original input series. Omission uses useSecondaryYScale.
   */
  getSeriesYScaleKey?: (series: LineChartPoints, index: number) => LineChartScaleKey;

  /**
   * Options for normalized pointer and keyboard inspection.
   */
  interactionOptions?: LineChartInteractionOptions;

  /**
   * Controlled inspection state. Omit for uncontrolled state; an empty object clears it.
   */
  interactionState?: LineChartInteractionState;

  /**
   * Additional visual marker bleed in root SVG units; does not enlarge the hit surface.
   * @default 0
   */
  markerClipPadding?: number | LineChartClipPadding;

  /**
   * Options for geometric transitions and retained series visuals. Omit for static behavior.
   */
  motion?: LineChartMotionOptions;

  /**
   * Callback issued for inspection proposals, anchor updates and focus reconciliation.
   */
  onInteractionChange?: (change: LineChartInteractionChange) => void;

  /**
   * Defines a custom annotation connector or tail without another focus target.
   */
  onRenderAnnotationConnector?: RenderFunction<LineChartAnnotationRenderProps>;

  /**
   * Defines custom measured annotation content while retaining native semantics.
   */
  onRenderAnnotationContent?: RenderFunction<LineChartAnnotationRenderProps>;

  /**
   * Defines a custom SVG decoration in the resolved axis layout band.
   */
  onRenderAxisDecoration?: (props: LineChartAxisDecorationProps) => JSXElement | null;

  /**
   * Defines a custom point marker visual using the native RenderFunction convention.
   */
  onRenderMarker?: RenderFunction<LineChartMarkerProps>;

  /**
   * Returns the definition and ordered decorative SVG layers for the current frame.
   */
  onRenderPlotLayers?: (context: LineChartPlotContext) => LineChartPlotLayers;

  /**
   * Defines a custom series stroke visual using the native RenderFunction convention.
   */
  onRenderSeries?: RenderFunction<LineChartSeriesProps>;

  /**
   * Secondary y-axis domain, ticks, insets and presentation, preserving forwarded legacy options.
   */
  secondaryYScaleOptions?: NonNullable<CartesianChartProps['secondaryYScaleOptions']> & LineChartNumericAxisOptions;

  /**
   * X-axis domain, insets and presentation, preserving forwarded legacy options and formatting.
   */
  xAxis?: NonNullable<CartesianChartProps['xAxis']> & LineChartXAxisOptions;

  /**
   * Additional noninteractive x-label rows in display order. Omission adds no rows.
   */
  xAxisLabelRows?: LineChartXAxisLabelRow[];

  /**
   * Primary y-axis domain, ticks, insets and presentation, preserving forwarded legacy options.
   */
  yAxis?: NonNullable<CartesianChartProps['yAxis']> & LineChartNumericAxisOptions;

  /**
   * Configuration for each keyed y scale. Reserved keys retain field-by-field legacy precedence.
   * @default undefined
   */
  yScales?: LineChartYScaleOptions[];

  /**
   * Data to render in the chart.
   */
  data: ChartProps;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: LineChartStyles;

  /**
   * Show event annotation
   */
  eventAnnotationProps?: EventsAnnotationProps;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: RenderFunction<CustomizedCalloutData>;

  /**
   * Define a custom callout renderer for a stack; default is to render per data point
   */
  onRenderCalloutPerStack?: RenderFunction<CustomizedCalloutData>;

  /**
   * Callback for getting callout description message
   */
  getCalloutDescriptionMessage?: (calloutDataProps: CustomizedCalloutData) => string | undefined;

  /*
   * Color fill bars for the chart,
   */
  colorFillBars?: ColorFillBarsProps[];

  /**
   * if this is set to true, then for each line there will be a unique shape assigned to the point,
   * there are total 8 shapes which are as follow circle, square, triangele, diamond, pyramid,
   *  hexagon, pentagon and octagon, which will get assigned as respectively, if there are more
   * than 8 lines in the line chart then it will again start from cicle to octagon.
   * setting this flag to true will also change the behavior of the points, like for a
   * line, last point shape and first point shape will be visible all the times, and all
   * other points will get enlarge only when hovered over them
   * if set to false default shape will be circle, with the existing behavior
   * @default false
   */
  allowMultipleShapesForPoints?: boolean;

  /*
   * Optimize line chart rendering for large data set. If this prop is enabled, line chart
   * can easily render over 10K datapoints with multiple lines smoothly.
   * This rendering mechanism does not support gaps in lines.
   */
  optimizeLargeData?: boolean;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   * @default false
   * The prop used to enable the perf optimization
   */
  enablePerfOptimization?: boolean;

  /**
   * To enable callout for individual line or complete stack.
   * @default true
   * @type \{boolean \}
   */
  isCalloutForStack?: boolean;
}

/**
 * {@docCategory LineChart}
 */
export interface EventsAnnotationProps {
  events: EventAnnotation[];
  strokeColor?: string;
  labelColor?: string;
  labelHeight?: number;
  labelWidth?: number;
  mergedLabel: (count: number) => string;
}

/**
 * Line Chart styles
 * {@docCategory LineChart}
 */
export interface LineChartStyles extends CartesianChartStyles {
  /**
   * styles for line border
   */
  lineBorder?: string;

  /**
   * styles for marker label
   */
  markerLabel?: string;
}

/**
 * Line Chart style properties
 * {@docCategory LineChart}
 */
export interface LineChartStyleProps extends CartesianChartStyleProps {}

/**
 * {@docCategory LineChart}
 */
export interface ColorFillBarsProps {
  legend: string;
  color: string;
  data: ColorFillBarData[];
  applyPattern?: boolean;
  onLegendClick?: (selectedLegend: string | string[] | null) => void | undefined;
}

/**
 * {@docCategory LineChart}
 */
export interface ColorFillBarData {
  startX: number | Date;
  endX: number | Date;
}
