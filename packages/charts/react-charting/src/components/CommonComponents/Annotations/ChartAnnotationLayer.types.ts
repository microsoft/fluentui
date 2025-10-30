import { ITheme } from '@fluentui/react/lib/Styling';
import { IChartAnnotation, ChartAnnotationArrowHead } from '../../../types/IChartAnnotation';

export interface IAnnotationPoint {
  x: number;
  y: number;
}

export interface IAnnotationPlotRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IChartAnnotationContext {
  /** Rectangle describing the drawable area of the chart (without margins) */
  plotRect: IAnnotationPlotRect;
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

export interface IChartAnnotationLayerProps {
  annotations?: IChartAnnotation[];
  context: IChartAnnotationContext;
  theme: ITheme;
  className?: string;
}

export interface IResolvedAnnotationPosition {
  /** Final absolute position after applying layout and offsets */
  point: IAnnotationPoint;
  /** Raw anchor position before offsets (used for connectors) */
  anchor: IAnnotationPoint;
}

export type ConnectorRenderData = {
  key: string;
  start: IAnnotationPoint;
  end: IAnnotationPoint;
  strokeColor: string;
  strokeWidth: number;
  dashArray?: string;
  arrow: ChartAnnotationArrowHead;
  markerSize: number;
  markerStrokeWidth: number;
};
