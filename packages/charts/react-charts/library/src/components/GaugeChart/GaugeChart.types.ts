import { LegendsProps } from '../Legends/index';
import { AccessibilityProps, Chart } from '../../types/index';
import { ChartPopoverProps } from '../CommonComponents/ChartPopover.types';

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
  componentRef?: React.RefObject<Chart>;
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
}
