import { ITheme, IStyle } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

export interface IProgressBarChart {}
export interface Idata {
  /**
   * Label for data to render in the chart.
   */
  value: number;
  /**
   * Value for data to render in the chart.
   */
  total: number;
}

export interface IProgressBarChartProps {
  /**
   * Data to render in the chart.
   */
  data?: Idata;

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
   * Title of  the chart.
   */
  chartTitle?: String;

  /**
   * Additional CSS class(es) to apply to the ProgressBarChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IProgressBarChartStyleProps, IProgressBarChartStyles>;
}

export interface IProgressBarChartStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;
  /**
   * Additional CSS class(es) to apply to the ProgressBarChart.
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
  /**
   * colors for bar .
   */
  colors?: string[];
}

export interface IProgressBarChartStyles {
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
   * Style for element conatinning subHeading
   */
  subHeading: IStyle;
  /**
   * Style for element containing value
   */
  value: IStyle;
}
