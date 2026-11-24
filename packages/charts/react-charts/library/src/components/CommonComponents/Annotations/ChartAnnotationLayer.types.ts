import type * as React from 'react';
import type {
  LineChartPlotContext,
  LineChartPosition,
  LineChartRect,
  LineChartResolvedYScale,
} from '../../LineChart/LineChart.types';
import type { RenderFunction } from '../../../utilities/index';
import type { ChartAnnotation, ChartAnnotationArrowHead } from '../../../types/ChartAnnotation';

/**
 * Measured collision placement for native LineChart annotations.
 * {@docCategory LineChart}
 */
export interface LineChartAnnotationLayoutOptions {
  /** Collision policy. @default allow */
  collision?: 'allow' | 'hide' | 'shift';
  /** Finite nonnegative spacing in root SVG units. @default 0 */
  spacing?: number;
  /** Maximum finite nonnegative vertical shift. @default 24 */
  maxShift?: number;
  /** Finite priority, higher first; ties preserve annotation order. */
  getPriority?: (annotation: Readonly<ChartAnnotation>, index: number) => number;
}

/**
 * Measured, read-only native annotation visual properties.
 * {@docCategory LineChart}
 */
export interface LineChartAnnotationRenderProps {
  readonly annotation: Readonly<ChartAnnotation>;
  readonly annotationIndex: number;
  readonly plot: LineChartPlotContext;
  readonly anchor: LineChartPosition;
  readonly labelRect: LineChartRect;
  readonly connectorStart: LineChartPosition;
  readonly connectorEnd: LineChartPosition;
}

export interface AnnotationPoint {
  x: number;
  y: number;
}

export interface AnnotationPlotRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ChartAnnotationContext {
  /** Rectangle describing the drawable area of the chart (without margins) */
  plotRect: AnnotationPlotRect;
  /** Size of the owning SVG element */
  svgRect: { width: number; height: number };
  /** Indicates if layout should be mirrored */
  isRtl?: boolean;
  /** Primary x scale mapping data domain to pixels */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xScale?: (value: any) => number;
  /** Primary y scale mapping data domain to pixels */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yScalePrimary?: (value: any) => number;
  /** Secondary y scale when present */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yScaleSecondary?: (value: any) => number;
  /** Read-only keyed scales, supplied only by supporting LineChart scenes. */
  readonly yScales?: readonly LineChartResolvedYScale[];
  /** Current committed scene frame. */
  readonly frameId?: number;
  /** External coordinate-basis epoch. */
  readonly layoutEpoch?: number;
  /** Projects numeric data using a keyed y scale without exposing mutable scales. */
  readonly projectY?: (scaleKey: string, value: number) => number | undefined;
}

export interface ChartAnnotationLayerProps {
  annotations?: ChartAnnotation[];
  context: ChartAnnotationContext;
  className?: string;
  /** Shared current-frame scene; enables LineChart-only annotation capabilities. */
  plot?: LineChartPlotContext;
  /** Chart entry point used when a focused annotation is removed. */
  chartRef?: React.RefObject<SVGSVGElement | null>;
  /** Optional measured collision placement. */
  annotationLayout?: LineChartAnnotationLayoutOptions;
  /** Noninteractive measured content; core retains the note or button host. */
  onRenderAnnotationContent?: RenderFunction<LineChartAnnotationRenderProps>;
  /** Decorative SVG connector content. */
  onRenderAnnotationConnector?: RenderFunction<LineChartAnnotationRenderProps>;
  /**
   * When true, removes default border, shadow, and background styling from annotations.
   * @default false
   */
  hideDefaultStyles?: boolean;
}

export interface ResolvedAnnotationPosition {
  /** Final absolute position after applying layout and offsets */
  point: AnnotationPoint;
  /** Raw anchor position before offsets (used for connectors) */
  anchor: AnnotationPoint;
}

export type ConnectorRenderData = {
  key: string;
  start: AnnotationPoint;
  end: AnnotationPoint;
  strokeColor: string;
  strokeWidth: number;
  dashArray?: string;
  arrow: ChartAnnotationArrowHead;
  markerSize: number;
  markerStrokeWidth: number;
};
