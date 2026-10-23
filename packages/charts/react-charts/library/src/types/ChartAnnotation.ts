import type * as React from 'react';

/**
 * Numeric keyed-y coordinates supported by the shared LineChart scene.
 * {@docCategory ChartData}
 */
export type LineChartKeyedAnnotationCoordinate =
  | {
      type: 'data';
      x: number | string | Date;
      y: number;
      yScaleKey: string;
      yAxis?: 'primary' | 'secondary';
    }
  | {
      type: 'mixed';
      xCoordinateType: 'data' | 'relative' | 'pixel';
      yCoordinateType: 'data';
      x: number | string | Date;
      y: number;
      yScaleKey: string;
      yAxis?: 'primary' | 'secondary';
    };

export type ChartAnnotationCoordinate =
  | {
      /** Cartesian data coordinates mapped through the chart scales */
      type: 'data';
      /** x-axis value in the data domain */
      x: number | string | Date;
      /** y-axis value in the data domain */
      y: number | string | Date;
      /** Use the secondary y scale when available */
      yAxis?: 'primary' | 'secondary';
      /** Keyed numeric coordinates use the keyed coordinate variant. */
      yScaleKey?: never;
    }
  | {
      /** Normalised coordinates within the plot area (0-1) */
      type: 'relative';
      /** Fractional x-position inside the plot area */
      x: number;
      /** Fractional y-position inside the plot area */
      y: number;
    }
  | {
      /** Absolute pixel position relative to the chart's plot origin */
      type: 'pixel';
      /** Horizontal pixel offset from the plot origin */
      x: number;
      /** Vertical pixel offset from the plot origin */
      y: number;
    }
  | {
      /** Mixed coordinate systems per axis (e.g., data X + relative Y) */
      type: 'mixed';
      xCoordinateType: 'data' | 'relative' | 'pixel';
      yCoordinateType: 'data' | 'relative' | 'pixel';
      x: number | string | Date;
      y: number | string | Date;
      /** Use the secondary y scale when the Y coordinate maps to data */
      yAxis?: 'primary' | 'secondary';
      /** Keyed numeric coordinates use the keyed coordinate variant. */
      yScaleKey?: never;
    }
  | LineChartKeyedAnnotationCoordinate;

export type ChartAnnotationHorizontalAlign = 'start' | 'center' | 'end';
export type ChartAnnotationVerticalAlign = 'top' | 'middle' | 'bottom';

export type ChartAnnotationArrowHead = 'none' | 'start' | 'end' | 'both';

export interface ChartAnnotationConnectorProps {
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

export interface ChartAnnotationLayoutProps {
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

export interface ChartAnnotationStyleProps {
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

export interface ChartAnnotationAccessibilityProps {
  /** Accessible label announced by assistive technologies */
  ariaLabel?: string;
  /** Accessible description id */
  ariaDescribedBy?: string;
  /** Custom role */
  role?: string;
}

/**
 * Action on a native annotation, initially supported by opted-in LineChart.
 * {@docCategory ChartData}
 */
export interface ChartAnnotationActionOptions {
  /** Nonempty localized accessible name for the native annotation button. */
  label: string;
  /** Called once for native pointer or keyboard activation, never during rendering. */
  onInvoke: (source: 'pointer' | 'keyboard') => void;
}

export interface ChartAnnotation {
  /** Optional id for React reconciliation */
  id?: string;
  /** Optional native action, initially supported by opted-in LineChart. */
  action?: ChartAnnotationActionOptions;
  /** Primary textual content */
  text: string;
  /** Coordinates describing where the annotation should be anchored */
  coordinates: ChartAnnotationCoordinate;
  /** Layout customisation */
  layout?: ChartAnnotationLayoutProps;
  /** Visual styling */
  style?: ChartAnnotationStyleProps;
  /** Optional connector line that links the annotation to its anchor. */
  connector?: ChartAnnotationConnectorProps;
  /** Accessibility metadata */
  accessibility?: ChartAnnotationAccessibilityProps;
  /** Optional application specific metadata */
  data?: Record<string, unknown>;
}
