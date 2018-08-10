import { IDataPoint, ILegendDataItem } from './StackedBarChart.types';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

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
