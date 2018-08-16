import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IDataPoint } from '../../types/IDataPoint';
export { IDataPoint } from '../../types/IDataPoint';

export interface IHorizontalBarChart {}

export interface IHorizontalBarChartProps {
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
   * Height of each bar in the chart.
   */
  barHeight?: number;

  /**
   * Number of ticks on the y-axis.
   */
  yAxisTickCount?: number;

  /**
   * Colors from which to select the color of each bar.
   */
  colors?: string[];

  /**
   * Label to apply to the whole chart.
   */
  chartLabel?: string;

  /**
   * Additional CSS class(es) to apply to the HorizontalBarChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IHorizontalBarChartStyleProps, IHorizontalBarChartStyles>;
}

export interface IHorizontalBarChartStyleProps {
  theme: ITheme;
  className?: string;
  width: number;
  height: number;
}

export interface IHorizontalBarChartStyles {
  /**
   *  Style for the root element.
   */
  root: IStyle;

  /**
   * Style for the chart.
   */
  chart: IStyle;

  /**
   * Style for the chart label.
   */
  chartLabel: IStyle;

  /**
   * Style for the element containing the x-axis.
   */
  xAxis: IStyle;

  /**
   * Style for the line representing the domain of the x-axis.
   */
  xAxisDomain: IStyle;

  /**
   * Style for the lines representing the ticks along the x-axis.
   */
  xAxisTicks: IStyle;

  /**
   * Style for the text labeling each tick along the x-axis.
   */
  xAxisText: IStyle;

  /**
   * Style for the element containing the y-axis.
   */
  yAxis: IStyle;

  /**
   * Style for the line representing the domain of the y-axis.
   */
  yAxisDomain: IStyle;

  /**
   * Style for the lines representing the ticks along the y-axis.
   */
  yAxisTicks: IStyle;

  /**
   * Style for the text labeling each tick along the y-axis.
   */
  yAxisText: IStyle;

  /**
   * Style for the element containing all the bars in the chart.
   */
  bars: IStyle;
}
