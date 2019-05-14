import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IBenchmarkBarChartProps {
  /**
   * Chart data point for the benchmark bar chart
   */
  data: IChartingProps;

  /**
   * This property tells whether to show benchmark triangle on top of benchmark bar chart or not
   * @default false
   */
  hideBenchmark?: boolean;

  /**
   * This property tells whether to show pencentage or fraction on top right of benchmark bar chart
   * @default false
   */
  isPercentage?: boolean;

  /**
   * Height of bar chart
   * @default 10
   */
  height?: number;

  /**
   * Width of bar chart, it could be number or percentage.
   * Number represents pixel and string is used to display the percentage
   * For example: 10, 10%
   * @default 300
   */
  width?: number | string;

  /**
   * Color for the bar chart
   */
  color?: string;

  /**
   * Color for the benchmark triangle
   */
  benchmarkColor?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IBenchmarkBarChartStyleProps, IBenchmarkBarChartStyle>;
}

export interface IChartingProps {
  /**
   * Chart title for the chart
   */
  chartTitle?: string;

  /**
   * Localized string of the benchmark triangle label for screen reader
   */
  benchmarkLabel?: string;

  /**
   * The datapoint in the chart
   */
  data: number;

  /**
   * The benchmark datapoint in the chart
   */
  benchmarkData?: number;

  /**
   * The maximum data in the chart
   */
  totalData: number;
}

export interface IBenchmarkBarChartStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;

  /**
   * Width of the chart.
   */
  width?: number | string;

  /**
   * Color for the benchmark triangle
   */
  benchmarkColor?: string;
}

export interface IBenchmarkBarChartStyle {
  /**
   * Style for the root container
   */
  root: IStyle;

  /**
   * Style for the chart Header
   */
  chartHeader: IStyle;

  /**
   * Style for the chart Title
   */
  chartTitle: IStyle;

  /**
   * Style for the percentage data
   */
  percentage: IStyle;

  /**
   * Style for the chart body
   */
  chartBody: IStyle;

  /**
   * Style for the benchmark triangle
   */
  triangle: IStyle;

  /**
   * Style for the bar chart
   */
  barChart: IStyle;
}
