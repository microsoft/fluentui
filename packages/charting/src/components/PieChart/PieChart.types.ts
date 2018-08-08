import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IDataPoint } from '../../types/IDataPoint';
export { IDataPoint } from '../../types/IDataPoint';
export interface IPieChart {}

export interface IPieChartProps {
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
   * colors to render in the chart.
   */
  colors?: string[];

  /**
   * Title to apply to the whole chart.
   */
  chartTitle?: string;

  /**
   * Additional CSS class(es) to apply to the PieChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IPieChartStyleProps, IPieChartStyles>;

  /**
   * Width of line stroke
   */
  strokeWidth?: number;
}

export type IPieChartStyleProps = Required<Pick<IPieChartProps, 'theme' | 'width' | 'height'>> &
  Pick<IPieChartProps, 'className'>;
export interface IPieChartStyles {
  /**
   *  Style for the root element.
   */
  root?: IStyle;

  /**
   * Style for the chart.
   */
  chart?: IStyle;

  /**
   * Style for the chart Title.
   */
  chartTitle?: IStyle;
}
