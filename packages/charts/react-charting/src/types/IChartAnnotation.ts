import * as React from 'react';

export type ChartAnnotationCoordinate = {
  /** Cartesian data coordinates mapped through the chart scales or
   * Normalised coordinates within the plot area (0-1) or
   * Absolute pixel position relative to the chart's SVG origin
   */
  type: 'data' | 'relative' | 'pixel';
  /** x-axis value in the data domain */
  x: number | string | Date;
  /** y-axis value in the data domain */
  y: number | string | Date;
  /** Use the secondary y scale when available */
  yAxis?: 'primary' | 'secondary';
};

export type ChartAnnotationHorizontalAlign = 'start' | 'center' | 'end';
export type ChartAnnotationVerticalAlign = 'top' | 'middle' | 'bottom';

export type ChartAnnotationArrowHead = 'none' | 'start' | 'end' | 'both';

export interface IChartAnnotationConnectorProps {
  /** Distance in pixels between the annotation element and the start of the connector. */
  startPadding?: number;
  /** Distance in pixels between the anchor point and the end of the connector. */
  endPadding?: number;
  /** Stroke colour for the connector. */
  strokeColor?: string;
  /** Stroke width in pixels. */
  strokeWidth?: number;
  /** SVG stroke dash array for dashed connectors. */
  dashArray?: string;
  /** Arrow head placement. Defaults to `'end'`. */
  arrow?: ChartAnnotationArrowHead;
}

export interface IChartAnnotationLayoutProps {
  /** Horizontal alignment of the annotation relative to the anchor point */
  align?: ChartAnnotationHorizontalAlign;
  /** Vertical alignment of the annotation relative to the anchor point */
  verticalAlign?: ChartAnnotationVerticalAlign;
  /** Horizontal offset in pixels applied after alignment */
  offsetX?: number;
  /** Vertical offset in pixels applied after alignment */
  offsetY?: number;
  /** Optional maximum width for wrapped text */
  maxWidth?: number;
  /** Whether the annotation should remain inside the plot area */
  clipToBounds?: boolean;
  /** Additional CSS classes applied to the annotation wrapper */
  className?: string;
}

export interface IChartAnnotationStyleProps {
  /** Text colour */
  textColor?: string;
  /** Background colour for the annotation container */
  backgroundColor?: string;
  /** Border colour */
  borderColor?: string;
  /** Border width */
  borderWidth?: number;
  /** Border style (solid, dashed, etc.) */
  borderStyle?: React.CSSProperties['borderStyle'];
  /** Border radius */
  borderRadius?: number;
  /** Box shadow applied to annotation */
  boxShadow?: string;
  /** Font size override */
  fontSize?: string;
  /** Font weight override */
  fontWeight?: React.CSSProperties['fontWeight'];
  /** Padding around the text. Accepts CSS shorthand notation */
  padding?: string;
  /** Opacity for the annotation container */
  opacity?: number;
  /** Optional class name applied to the annotation element */
  className?: string;
  /** Rotation, in degrees, applied to the annotation container */
  rotation?: number;
}

export interface IChartAnnotationAccessibilityProps {
  /** Accessible label announced by assistive technologies */
  ariaLabel?: string;
  /** Accessible description id */
  ariaDescribedBy?: string;
  /** Custom role */
  role?: string;
}

export interface IChartAnnotation {
  /** Optional id for React reconciliation */
  id?: string;
  /** Primary textual content */
  text: string;
  /** Coordinates describing where the annotation should be anchored */
  coordinates: ChartAnnotationCoordinate;
  /** Layout customisation */
  layout?: IChartAnnotationLayoutProps;
  /** Visual styling */
  style?: IChartAnnotationStyleProps;
  /** Optional connector line that links the annotation to its anchor. */
  connector?: IChartAnnotationConnectorProps;
  /** Accessibility metadata */
  accessibility?: IChartAnnotationAccessibilityProps;
  /** Optional application specific metadata */
  data?: Record<string, unknown>;
}
