import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { ICalloutContentStyleProps, ICalloutContentStyles } from '@fluentui/react/lib/Callout';
import { ILegendsProps } from '../Legends/index';
import { ICalloutProps } from '@fluentui/react/lib/Callout';

export interface IFunnelChartDataPoint {
  stage: string | number;
  subValues?: Array<{ category: string; value: number; color: string }>;
  value?: number;
  color?: string;
}

export interface IFunnelChartProps {
  data: IFunnelChartDataPoint[];
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

  /*
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

  componentRef?: React.RefObject<any>;

  /**
   * Additional CSS class(es) to apply to the chart
   */
  className?: string;

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
 * Gauge Chart styles
 * {@docCategory GaugeChart}
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

  text?: IStyle;
  subComponentStyles: {
    calloutStyles: IStyleFunctionOrObject<ICalloutContentStyleProps, ICalloutContentStyles>;
  };
}
