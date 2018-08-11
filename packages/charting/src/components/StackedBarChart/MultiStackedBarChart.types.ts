import { IDataPoint, ILegendDataItem } from './StackedBarChart.types';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IMultiStackedBarChartProps {
  /**
   * An array of datapoints , each datapoint
   * renders a stacked bar chart
   */
  data: IDataPoint[][];

  /**
   * An array of bar chart titles, each title in the
   * order is applicable to each bar chart
   */
  chartTitles: string[];

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
   * Data for rendering the legend
   */
  legendData?: ILegendDataItem[];

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
