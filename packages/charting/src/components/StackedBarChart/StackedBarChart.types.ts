import { ITheme, IStyle } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

export interface IStackedBarChart {}
export interface IDataPoint {
  /**
   * Label for data to render in the chart.
   */
  label: string;
  /**
   * Value for data to render in the chart.
   */
  value: number;
}

export interface IStackedBarChartProps {
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
   * Colors from which to select the color of each bar.
   */
  colors?: string[];

  /**
   * Title to apply to the whole chart.
   */
  chartTitle?: string;

  /**
   * Additional CSS class(es) to apply to the StackedBarChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IStackedBarChartStyleProps, IStackedBarChartStyles>;
}

export interface IStackedBarChartStyleProps {
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
  width: number;

  /**
   * Height of the chart.
   */
  height: number;

  /**
   * Height of bar in the chart.
   */
  barHeight?: number;
}

export interface IStackedBarChartStyles {
  /**
   *  Style for the root element.
   */
  root: IStyle;

  /**
   * Style for the chart.
   */
  chart: IStyle;

  /**
   * Style for the chart Title.
   */
  chartTitle: IStyle;

  /**
   * Style for the element containing all the bars in the chart.
   */
  bars: IStyle;
  /**
   * Style for the element containing all the Legends in the chart.
   */
  legend: IStyle;
}
