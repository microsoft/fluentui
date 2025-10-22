import * as React from 'react';

export type ChartAnnotationCoordinateValue = number | string | Date;

export type ChartAnnotationCoordinates =
  | {
      type: 'data';
      x: ChartAnnotationCoordinateValue;
      y: ChartAnnotationCoordinateValue;
      /** Which y axis the annotation should bind to when rendered against a Cartesian surface. */
      yAxis?: 'primary' | 'secondary';
    }
  | {
      type: 'relative';
      /** Fractional value across the horizontal domain (0-1). */
      x: number;
      /** Fractional value across the vertical domain (0-1). */
      y: number;
    }
  | {
      type: 'pixel';
      /** Offset in device pixels from the left edge of the plot area. */
      x: number;
      /** Offset in device pixels from the top edge of the plot area. */
      y: number;
    };

export interface IChartAnnotationLayout {
  /** Horizontal alignment of the annotation container. */
  align?: 'start' | 'center' | 'end';
  /** Vertical alignment of the annotation container. */
  verticalAlign?: 'top' | 'middle' | 'bottom';
  /** Pixel offset applied after coordinate resolution along the X axis. */
  offsetX?: number;
  /** Pixel offset applied after coordinate resolution along the Y axis. */
  offsetY?: number;
  /** Maximum width (in pixels) allowed for the annotation content. */
  maxWidth?: number;
  /** When true, the annotation position is clamped to the visible plot bounds. */
  clipToBounds?: boolean;
  /** Additional className applied to the annotation container. */
  className?: string;
}

export interface IChartAnnotationStyle {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: React.CSSProperties['borderStyle'];
  borderRadius?: number | string;
  padding?: number | string;
  boxShadow?: string;
  opacity?: number;
  textColor?: string;
  fontSize?: number | string;
  fontWeight?: React.CSSProperties['fontWeight'];
  className?: string;
}

export type ChartAnnotationConnectorArrow = 'none' | 'start' | 'end' | 'both';

export interface IChartAnnotationConnector {
  startPadding?: number;
  endPadding?: number;
  strokeColor?: string;
  strokeWidth?: number;
  dashArray?: string;
  arrow?: ChartAnnotationConnectorArrow;
}

export interface IChartAnnotationAccessibilityInfo {
  role?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface IChartAnnotation {
  id?: string;
  text?: string;
  coordinates?: ChartAnnotationCoordinates;
  layout?: IChartAnnotationLayout;
  style?: IChartAnnotationStyle;
  connector?: IChartAnnotationConnector;
  accessibility?: IChartAnnotationAccessibilityInfo;
}
