import type { ITheme } from '@fluentui/react';
import type { IStyle } from '@fluentui/react/lib/Styling';
import type { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import type { IChartAnnotation } from '../../../types/IChartAnnotation';

export interface IAnnotationPoint {
  x: number;
  y: number;
}

export interface IAnnotationRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IChartAnnotationContext {
  plotRect: IAnnotationRect;
  svgRect: { width: number; height: number };
  isRtl?: boolean;
  xScale?: (((value: unknown) => number) & { bandwidth?: () => number }) | undefined;
  yScalePrimary?: (((value: unknown) => number) & { bandwidth?: () => number }) | undefined;
  yScaleSecondary?: (((value: unknown) => number) & { bandwidth?: () => number }) | undefined;
}

export interface IChartAnnotationLayerProps {
  annotations?: IChartAnnotation[];
  context: IChartAnnotationContext;
  theme: ITheme;
  className?: string;
}

export interface IResolvedAnnotationPosition {
  anchor: IAnnotationPoint;
  point: IAnnotationPoint;
}

export interface ConnectorRenderData {
  key: string;
  start: IAnnotationPoint;
  end: IAnnotationPoint;
  strokeColor: string;
  strokeWidth: number;
  dashArray?: string;
  arrow?: 'none' | 'start' | 'end' | 'both';
  markerSize: number;
  markerStrokeWidth: number;
}

export interface IChartAnnotationLayerStyleProps {
  theme: ITheme;
  className?: string;
}

export interface IChartAnnotationLayerStyles {
  root: IStyle;
  connectorLayer: IStyle;
  connectorGroup: IStyle;
  annotationForeignObject: IStyle;
  annotation: IStyle;
  annotationContent: IStyle;
  measurement: IStyle;
}

export type ChartAnnotationLayerStyleFunction = IStyleFunctionOrObject<
  IChartAnnotationLayerStyleProps,
  IChartAnnotationLayerStyles
>;
