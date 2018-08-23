import { IChartProps } from './index';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IMultiStackedBarChartProps {
  /**
   * An array of chart data points for the multistacked bar chart
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
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IMultiStackedBarChartStyleProps, IMultiStackedBarChartStyles>;
}

export interface IMultiStackedBarChartStyleProps {
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
}

export interface IMultiStackedBarChartStyles {
  /**
   * Styling for the root container
   */
  root: IStyle;

  /**
   * Styling for each item in the container
   */
  items: IStyle;
}
