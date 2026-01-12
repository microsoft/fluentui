import { ChartAnnotation, ChartAnnotationArrowHead } from '../../../types/ChartAnnotation';

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
}

export interface ChartAnnotationLayerProps {
  annotations?: ChartAnnotation[];
  context: ChartAnnotationContext;
  className?: string;
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
