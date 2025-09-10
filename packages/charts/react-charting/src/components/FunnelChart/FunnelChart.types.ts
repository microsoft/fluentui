import * as React from 'react';
import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { ICalloutContentStyleProps, ICalloutContentStyles } from '@fluentui/react/lib/Callout';
import { ILegendsProps } from '../Legends/index';
import { ICalloutProps } from '@fluentui/react/lib/Callout';

/**
 * Data point for funnel chart
 * {@docCategory FunnelChart}
 */
export interface IFunnelChartDataPoint {
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
export interface IFunnelChartProps {
  /**
   * Data points for the funnel chart
   */
  data: IFunnelChartDataPoint[];
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
  legendProps?: Partial<ILegendsProps>;

  /**
   * Props for the callout in the chart
   */
  calloutProps?: Partial<ICalloutProps>;

  /**
   * Theme (provided through customization)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IFunnelChartStyleProps, IFunnelChartStyles>;

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
export interface IFunnelChartStyleProps {
  /**
   * Theme (provided through customization)
   */
  theme: ITheme;
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
export interface IFunnelChartStyles {
  /**
   * Styles for the root element
   */
  root?: IStyle;

  /**
   * Styles for the chart
   */
  chart?: IStyle;

  /**
   * Styles for text elements
   */
  text?: IStyle;

  /**
   * Styles for sub-components
   */
  subComponentStyles: {
    calloutStyles: IStyleFunctionOrObject<ICalloutContentStyleProps, ICalloutContentStyles>;
  };
}
