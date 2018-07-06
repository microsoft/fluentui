import { ITheme, IStyle } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

export interface ILineChart {}

export interface IDataPoint {
  /**
   * Independent value of the data point, rendered along the x-axis.
   * If x is a number, then each y-coordinate is plotted at its x-coordinate.
   * If x is a string, then the data is evenly spaced along the x-axis.
   */
  x: number | string;

  /**
   * Dependent value of the data point, rendered along the y-axis.
   */
  y: number;
}

export interface ILineChartProps {
  /**
   * Data to render in the chart.
   */
  data?: IDataPoint[];

  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of the chart.
   */
  height?: number;

  /**
   * Number of ticks on the y-axis.
   */
  yAxisTickCount?: number;

  /**
   * Color for all the lines in the chart.
   */
  color?: string;

  /**
   * Label to apply to the whole chart.
   */
  chartLabel?: string;

  /**
   * Additional CSS class(es) to apply to the LineChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ILineChartStyleProps, ILineChartStyles>;

  /**
   * Width of line stroke
   */
  strokeWidth?: number;
}

export interface ILineChartStyleProps {
  theme: ITheme;
  className?: string;
  width: number;
  height: number;
}

export interface ILineChartStyles {
  /**
   *  Style for the root element.
   */
  root?: IStyle;

  /**
   * Style for the chart.
   */
  chart?: IStyle;

  /**
   * Style for the chart label.
   */
  chartLabel?: IStyle;

  /**
   * Style for the element containing the x-axis.
   */
  xAxis?: IStyle;

  /**
   * Style for the line representing the domain of the x-axis.
   */
  xAxisDomain?: IStyle;

  /**
   * Style for the lines representing the ticks along the x-axis.
   */
  xAxisTicks?: IStyle;

  /**
   * Style for the text labeling each tick along the x-axis.
   */
  xAxisText?: IStyle;

  /**
   * Style for the element containing the y-axis.
   */
  yAxis?: IStyle;

  /**
   * Style for the line representing the domain of the y-axis.
   */
  yAxisDomain?: IStyle;

  /**
   * Style for the lines representing the ticks along the y-axis.
   */
  yAxisTicks?: IStyle;

  /**
   * Style for the text labeling each tick along the y-axis.
   */
  yAxisText?: IStyle;

  /**
   * Style for the element containing all the lines in the chart.
   */
  lines?: IStyle;
}
