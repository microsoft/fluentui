import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IDataPoint } from '../../types/IDataPoint';
export { IDataPoint } from '../../types/IDataPoint';
export interface IDonutChart {}

export interface IDonutChartProps {
  /**
   * Data to render in the chart.
   */
  data?: IDataPoint[];

  /**
   * Width of the donut.
   */
  width?: number;

  /**
   * Height of the donut.
   */
  height?: number;

  /**
   * colors to render in the chart.
   */
  colors?: string[];

  /**
   * Additional CSS class(es) to apply to the DonutChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IDonutChartStyleProps, IDonutChartStyles>;

  /**
   * Width of line stroke
   */
  strokeWidth?: number;
  /**
   * legend X position
   */
  legendX?: number;
  /**
   * Legend Y position
   */
  legendY?: number;
}

export type IDonutChartStyleProps = Required<Pick<IDonutChartProps, 'theme' | 'width' | 'height'>> &
  Pick<IDonutChartProps, 'className' | 'legendX' | 'legendY'>;

export interface IDonutChartStyles {
  /**
   *  Style for the root element.
   */
  root?: IStyle;

  /**
   * Style for the chart.
   */
  chart?: IStyle;

  /**
   * Style set for the Pie component Legend
   */
  legend: IStyle;
}
