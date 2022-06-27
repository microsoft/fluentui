import { ITheme, IStyle } from '@fluentui/react/lib/Styling';
import { IChartProps } from '../../types/IDataPoint';

export interface ISparklineStyleProps {}

export interface ISparklineProps {
  /**
   * An array of chart data points for the Horizontal bar chart
   */
  data?: IChartProps;

  /**
   * Width of bar chart
   */
  width?: number;

  /**
   * Height of bar chart
   * @default 15
   */
  height?: number;

  /**
   * Additional CSS class(es) to apply to the StackedBarChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  color?: string;
}

export interface ISparklineStyles {}
