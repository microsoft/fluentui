import { ITheme, IStyle } from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface IVerticalBarChart {

}

export interface IDataPoint {
  x: number | string;
  y: number;
}

export interface IVerticalBarChartProps {
  /**
   * The data to render in the chart.
   */
  data?: IDataPoint[];

  /**
   * The width of the chart.
   */
  width?: number;

  /**
   * The height of the chart.
   */
  height?: number;

  /**
   * The width of each bar in the chart.
   */
  barWidth?: number;

  /**
   * The number of ticks on the y-axis.
   */
  yAxisTickCount?: number;

  /**
   * The colors from which to select the color of each bar.
   */
  colors?: string[];

  /**
   * The label to apply to the whole chart.
   */
  chartLabel?: string;

  /**
   * Additional CSS class(es) to apply to the VerticalBarChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IVerticalBarChartStyleProps, IVerticalBarChartStyles>;
}

export interface IVerticalBarChartStyleProps {
  theme: ITheme;
  className?: string;
  width: number;
  height: number;
}

export interface IVerticalBarChartStyles {
  /**
   *  Root div containing everything in the VerticalBarChart.
   */
  root?: IStyle;

  /**
   * SVG element containing the chart.
   */
  chart?: IStyle;

  /**
   * Label for the chart.
   */
  chartLabel?: IStyle;

  /**
   * SVG element containing the x-axis.
   */
  xAxis?: IStyle;
  xAxisDomain?: IStyle;
  xAxisTicks?: IStyle;
  xAxisText?: IStyle;

  /**
   * SVG element containing the y-axis.
   */
  yAxis?: IStyle;
  yAxisDomain?: IStyle;
  yAxisTicks?: IStyle;
  yAxisText?: IStyle;

  /**
   * SVG element containing all of the bars in the chart.
   */
  bars?: IStyle;
}