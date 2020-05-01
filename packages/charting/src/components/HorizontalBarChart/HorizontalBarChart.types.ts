import { IChartProps } from './index';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IHorizontalBarChartProps {
  /**
   * An array of chart data points for the Horizontal bar chart
   */
  data?: IChartProps[];

  /**
   * Width of bar chart
   */
  width?: number;

  /**
   * Height of bar chart
   * @default 15
   */
  barHeight?: number;

  /**
   * Additional CSS class(es) to apply to the StackedBarChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * This property tells whether to show ratio on top of stacked bar chart or not.
   */
  hideRatio?: boolean[];

  /**
   * This property tells how to show data text on top right of bar chart.
   * @default 'default'
   */
  chartDataMode?: ChartDataMode;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IHorizontalBarChartStyleProps, IHorizontalBarChartStyles>;
}

export interface IHorizontalBarChartStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;

  /**
   * Additional CSS class(es) to apply to the StackedBarChart.
   */
  className?: string;

  /**
   * Width of the chart.
   */
  width: number | undefined;

  /**
   * line color for callout
   */
  color?: string;

  /**
   * Height of bar chart
   * @default 15
   */
  barHeight?: number;
}

export interface IHorizontalBarChartStyles {
  /**
   * Styling for the root container
   */
  root: IStyle;

  /**
   * Styling for each item in the container
   */
  items: IStyle;
  /**
   * Style for the chart.
   */
  chart: IStyle;

  /**
   * Style for the chart Title.
   */
  chartTitle: IStyle;

  /**
   * Style for the bars.
   */
  barWrapper: IStyle;

  /**
   * Style for the chart data text.
   */
  chartDataText: IStyle;

  /**
   * Style for the chart data text denominator.
   */
  chartDataTextDenominator: IStyle;

  /**
   * styles for hover card root
   */
  hoverCardRoot?: IStyle;

  /**
   * styles for hover card text
   */
  hoverCardTextStyles?: IStyle;

  /**
   * styles for hover card data
   */
  hoverCardDataStyles?: IStyle;

  /**
   * Style for the benchmark triangle
   */
  triangle: IStyle;
}

/**
 * Chart data mode for chart data text
 * default: show the datapoint.x value
 * fraction: show the fraction of datapoint.x/datapoint.y
 * percentage: show the percentage of (datapoint.x/datapoint.y)%
 */
export type ChartDataMode = 'default' | 'fraction' | 'percentage';
