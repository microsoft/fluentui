import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IStackedBarChart {}
import { IDataPoint } from '../../types/IDataPoint';

export { IDataPoint, ILegendDataItem } from '../../types';

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
   * Height of each bar in the chart.
   */
  barHeight?: number;

  /**
   * Do not show the legend at the bottom of chart
   * when there are more than two datapoints
   *
   * @default false
   */
  hideLegend?: boolean;

  /**
   * Do not show number/ratio on top of bar
   *
   * @default false
   */
  hideNumberDisplay?: boolean;

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
   * Style for the legend container div
   */
  legendContainer: IStyle;
}
