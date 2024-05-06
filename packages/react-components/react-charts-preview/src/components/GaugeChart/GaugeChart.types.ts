import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { ILegendsProps } from '../Legends/index';
import { IAccessibilityProps } from '../../types/index';
import { ICalloutProps } from '@fluentui/react/lib/Callout';

/**
 * Gauge Chart segment interface.
 * {@docCategory GaugeChart}
 */
export interface IGaugeChartSegment {
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
   * Accessibility data for the segment
   */
  accessibilityData?: IAccessibilityProps;
}

/**
 * {@docCategory GaugeChart}
 */
export enum GaugeValueFormat {
  Percentage = 'percentage',
  Fraction = 'fraction',
}

/**
 * {@docCategory GaugeChart}
 */
export enum GaugeChartVariant {
  SingleSegment = 'single-segment',
  MultipleSegments = 'multiple-segments',
}

/**
 * Gauge Chart properties
 * {@docCategory GaugeChart}
 */
export interface IGaugeChartProps {
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
  segments: IGaugeChartSegment[];

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
  legendProps?: Partial<ILegendsProps>;

  /**
   * Do not show tooltips in chart
   * @defaultvalue false
   */
  hideTooltip?: boolean;

  /**
   * Additional CSS class(es) to apply to the chart
   */
  className?: string;

  /**
   * Theme (provided through customization)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IGaugeChartStyleProps, IGaugeChartStyles>;

  /**
   * Defines the culture to localize the numbers and dates
   */
  culture?: string;

  /**
   * Props for the callout in the chart
   */
  calloutProps?: Partial<ICalloutProps>;

  /**
   * Specifies the variant of GaugeChart to be rendered
   * @defaultvalue GaugeChartVariant.MultipleSegments
   */
  variant?: GaugeChartVariant;
}

/**
 * Gauge Chart style properties
 * {@docCategory GaugeChart}
 */
export interface IGaugeChartStyleProps {
  /**
   * Theme (provided through customization)
   */
  theme: ITheme;

  /**
   * Font size of the chart value
   */
  chartValueSize?: number;

  /**
   * Width of the chart
   */
  chartWidth?: number;

  /**
   * Height of the chart
   */
  chartHeight?: number;

  /**
   * Additional CSS class(es) to apply to the chart
   */
  className?: string;

  /**
   * Color of the line
   */
  lineColor?: string;

  /**
   * Boolean flag which determines if shape is drawn in callout
   */
  toDrawShape?: boolean;
}

/**
 * Gauge Chart styles
 * {@docCategory GaugeChart}
 */
export interface IGaugeChartStyles {
  /**
   * Styles for the root element
   */
  root?: IStyle;

  /**
   * Styles for the chart
   */
  chart?: IStyle;

  /**
   * Styles for the min and max values
   */
  limits?: IStyle;

  /**
   * Styles for the chart value
   */
  chartValue?: IStyle;

  /**
   * Styles for the sublabel
   */
  sublabel?: IStyle;

  /**
   * Styles for the needle
   */
  needle?: IStyle;

  /**
   * Styles for the chart title
   */
  chartTitle?: IStyle;

  /**
   * Styles for the segments
   */
  segment?: IStyle;

  /**
   * Styles for the legends container
   */
  legendsContainer?: IStyle;

  /**
   * Styles for callout root-content
   */
  calloutContentRoot?: IStyle;

  /**
   * Styles for callout x-content
   */
  calloutContentX?: IStyle;

  /**
   * Styles for callout y-content
   */
  calloutContentY?: IStyle;

  /**
   * Styles for description message
   */
  descriptionMessage?: IStyle;

  /**
   * Styles for callout Date time container
   */
  calloutDateTimeContainer?: IStyle;

  /**
   * Styles for callout info container
   */
  calloutInfoContainer?: IStyle;

  /**
   * Styles for callout block container
   */
  calloutBlockContainer?: IStyle;

  /**
   * Styles for callout legend text
   */
  calloutlegendText?: IStyle;

  /**
   * Styles for the shape object in the callout
   */
  shapeStyles?: IStyle;
}
