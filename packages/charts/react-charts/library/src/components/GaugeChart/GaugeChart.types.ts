import * as React from 'react';
import { LegendsProps } from '../Legends/index';
import { AccessibilityProps, Chart } from '../../types/index';
import { ChartPopoverProps } from '../CommonComponents/ChartPopover.types';
import type { TitleStyles } from '../../utilities/Common.styles';

/**
 * Position type for gauge annotations relative to the arc
 * {@docCategory GaugeChart}
 */
export type GaugeChartAnnotationPosition = 'inner' | 'outer' | 'arc';

/**
 * Coordinate specification for gauge annotations
 * {@docCategory GaugeChart}
 */
export interface GaugeChartAnnotationCoordinate {
  /**
   * The value on the gauge where the annotation should be placed.
   * Will be clamped between minValue and maxValue.
   */
  value: number;

  /**
   * Radial position relative to the gauge arc
   * - 'inner': Inside the arc (towards center)
   * - 'outer': Outside the arc
   * - 'arc': On the arc itself
   * @default 'outer'
   */
  position?: GaugeChartAnnotationPosition;

  /**
   * Pixel offset from the calculated position (positive = outward from center)
   * @default 0
   */
  radialOffset?: number;
}

/**
 * Style properties for gauge annotations
 * {@docCategory GaugeChart}
 */
export interface GaugeChartAnnotationStyle {
  /** Text color */
  textColor?: string;

  /** Background color */
  backgroundColor?: string;

  /** Border color */
  borderColor?: string;

  /** Border width in pixels */
  borderWidth?: number;

  /** Border radius in pixels */
  borderRadius?: number;

  /** Font size */
  fontSize?: string;

  /** Font weight */
  fontWeight?: React.CSSProperties['fontWeight'];

  /** Padding around text */
  padding?: string;

  /** Custom CSS class */
  className?: string;
}

/**
 * Annotation configuration for GaugeChart
 * {@docCategory GaugeChart}
 */
export interface GaugeChartAnnotation {
  /** Unique identifier for the annotation */
  id?: string;

  /** Text content to display */
  text: string;

  /** Position specification */
  coordinates: GaugeChartAnnotationCoordinate;

  /** Visual styling */
  style?: GaugeChartAnnotationStyle;

  /** Accessibility label for screen readers */
  ariaLabel?: string;
}

/**
 * Gauge Chart segment interface.
 * {@docCategory GaugeChart}
 */
export interface GaugeChartSegment {
  /**
   * Legend text for a segment
   */
  legend: string;

  /**
   * Size of the segment
   */
  size: number;

  /**
   * Color of the segment
   */
  color?: string;

  /**
   * Gradient color of the segment
   */
  gradient?: [string, string];

  /**
   * Accessibility data for the segment
   */
  accessibilityData?: AccessibilityProps;
}

/**
 * {@docCategory GaugeChart}
 */
export type GaugeValueFormat = 'percentage' | 'fraction';

/**
 * {@docCategory GaugeChart}
 */
export type GaugeChartVariant = 'single-segment' | 'multiple-segments';

/**
 * Gauge Chart properties
 * {@docCategory GaugeChart}
 */
export interface GaugeChartProps {
  /**
   * Title styles configuration for the chart title
   */
  titleStyles?: TitleStyles;

  /**
   * Width of the chart
   */
  width?: number;

  /**
   * Height of the chart
   */
  height?: number;

  /**
   * Title of the chart
   */
  chartTitle?: string;

  /**
   * Current value of the gauge
   */
  chartValue: number;

  /**
   * Sections of the gauge
   */
  segments: GaugeChartSegment[];

  /**
   * Minimum value of the gauge
   * @defaultvalue 0
   */
  minValue?: number;

  /**
   * Maximum value of the gauge
   */
  maxValue?: number;

  /**
   * Additional text to display below the chart value
   */
  sublabel?: string;

  /**
   * Hide the min and max values of the gauge
   * @defaultvalue false
   */
  hideMinMax?: boolean;

  /**
   * Format of the chart value
   * @defaultvalue GaugeValueFormat.Percentage
   */
  chartValueFormat?: GaugeValueFormat | ((sweepFraction: [number, number]) => string);

  /**
   * Decides whether to show/hide legends
   * @defaultvalue false
   */
  hideLegend?: boolean;

  /*
   * Props for the legends in the chart
   */
  legendProps?: Partial<LegendsProps>;

  /**
   * Do not show tooltips in chart
   * @defaultvalue false
   */
  hideTooltip?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: GaugeChartStyles;

  /**
   * Defines the culture to localize the numbers and dates
   */
  culture?: string;

  /**
   * Props for the callout in the chart
   */
  calloutProps?: Partial<ChartPopoverProps>;

  /**
   * Specifies the variant of GaugeChart to be rendered
   * @defaultvalue GaugeChartVariant.MultipleSegments
   */
  variant?: GaugeChartVariant;

  /**
   * Prop to enable the gradient in the chart
   * @default false
   */
  enableGradient?: boolean;

  /**
   * Prop to enable the round corners in the chart
   * @default false
   */
  roundCorners?: boolean;

  /**
   * Optional callback to access the Chart interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.Ref<Chart>;

  /**
   * Annotations to display on the gauge chart.
   * Annotations can be used to highlight specific values, thresholds, or targets.
   */
  annotations?: GaugeChartAnnotation[];

  /**
   * Custom renderer for annotations.
   * Use this to provide a custom rendering for annotations.
   */
  onRenderAnnotation?: (
    annotation: GaugeChartAnnotation,
    defaultRender: (annotation: GaugeChartAnnotation) => React.ReactNode,
  ) => React.ReactNode;
}

/**
 * Gauge Chart styles
 * {@docCategory GaugeChart}
 */
export interface GaugeChartStyles {
  /**
   * Styles for the root element
   */
  root?: string;

  /**
   * Styles for the chart
   */
  chart?: string;

  /**
   * Styles for the min and max values
   */
  limits?: string;

  /**
   * Styles for the chart value
   */
  chartValue?: string;

  /**
   * Styles for the sublabel
   */
  sublabel?: string;

  /**
   * Styles for the needle
   */
  needle?: string;

  /**
   * Styles for the chart title
   */
  chartTitle?: string;

  /**
   * Style for SVG tooltip text
   */
  svgTooltip?: string;

  /**
   * Styles for the segments
   */
  segment?: string;

  /**
   * Styles for gradient segments
   */
  gradientSegment?: string;

  /**
   * Styles for the legends container
   */
  legendsContainer?: string;

  /**
   * Styles for callout root-content
   */
  calloutContentRoot?: string;

  /**
   * Styles for callout x-content
   */
  calloutContentX?: string;

  /**
   * Styles for callout y-content
   */
  calloutContentY?: string;

  /**
   * Styles for description message
   */
  descriptionMessage?: string;

  /**
   * Styles for callout Date time container
   */
  calloutDateTimeContainer?: string;

  /**
   * Styles for callout info container
   */
  calloutInfoContainer?: string;

  /**
   * Styles for callout block container
   */
  calloutBlockContainer?: string;

  /**
   * Styles for callout legend text
   */
  calloutlegendText?: string;

  /**
   * Styles for the shape object in the callout
   */
  shapeStyles?: string;

  /**
   * Styles for the chart wrapper div
   */
  chartWrapper?: string;

  /**
   * Styles for the annotation container
   */
  annotationContainer?: string;

  /**
   * Styles for annotation text
   */
  annotationText?: string;
}
