import * as React from 'react';
import { ChartPopoverProps } from '../CommonComponents/ChartPopover.types';
import { LegendsProps } from '../Legends/index';

/**
 * Data point for funnel chart
 * {@docCategory FunnelChart}
 */
export interface FunnelChartDataPoint {
  /**
   * Stage name or identifier
   */
  stage: string | number;
  /**
   * Sub-values for stacked funnel charts
   * Each sub-value represents a category within the stage
   */
  subValues?: Array<{ category: string; value: number; color: string }>;
  /**
   * Value for the stage (used for non-stacked funnel charts)
   */
  value?: number;
  /**
   * Color for the stage (used for non-stacked funnel charts)
   */
  color?: string;
}

/**
 * Funnel Chart component props
 * {@docCategory FunnelChart}
 */
export interface FunnelChartProps {
  /**
   * Data points for the funnel chart
   */
  data: FunnelChartDataPoint[];
  /**
   * Title for the chart
   */
  chartTitle?: string;
  /**
   * Width of the chart
   */
  width?: number;

  /**
   * Height of the chart
   */
  height?: number;

  /**
   * Decides whether to show/hide legends
   * @defaultvalue false
   */
  hideLegend?: boolean;

  /**
   * Props for the legends in the chart
   */
  legendProps?: Partial<LegendsProps>;

  /**
   * Props for the callout in the chart
   */
  calloutProps?: ChartPopoverProps;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: FunnelChartStyles;

  /**
   * Defines the culture to localize the numbers and dates
   */
  culture?: string;

  /**
   * Reference to the chart component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentRef?: React.RefObject<any>;

  /**
   * Additional CSS class(es) to apply to the chart
   */
  className?: string;

  /**
   * Orientation of the funnel chart
   * @defaultvalue 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Funnel Chart style properties
 * {@docCategory FunnelChart}
 */
export interface FunnelChartStyleProps {
  /**
   * Additional CSS class(es) to apply to the chart
   */
  className?: string;
  /**
   * Width of the chart
   */
  chartWidth: number;
  /**
   * Height of the chart
   */
  chartHeight: number;
}

/**
 * Funnel Chart styles
 * {@docCategory FunnelChart}
 */
export interface FunnelChartStyles {
  /**
   * Styles for the root element
   */
  root?: string;

  /**
   * Styles for the chart
   */
  chart?: string;

  /**
   * Styles for text elements
   */
  text?: string;

  /**
   * Styles for the callout root element
   */
  calloutContentRoot?: string;
}
