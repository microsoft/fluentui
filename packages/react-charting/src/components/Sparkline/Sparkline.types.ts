import { ITheme, IStyle } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IChartProps } from '../../types/IDataPoint';
import { ICartesianChartStyleProps } from '../CommonComponents/index';

export interface ISparklineStyleProps extends ICartesianChartStyleProps {}

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

  showLegend?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ISparklineStyleProps, ISparklineStyles>;
}

export interface ISparklineStyles {
  titleText?: IStyle;
}
