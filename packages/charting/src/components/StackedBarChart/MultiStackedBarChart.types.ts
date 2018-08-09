import { IDataPoint } from '@uifabric/charting/lib/types/IDataPoint';
import { ILegendDataItem } from '@uifabric/charting/lib/components/Legend/Legend.types';

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
  chartTitle: string[];

  /**
   * Width of each bar chart in that order
   */
  width?: number[];

  /**
   * Height of each bar chart in that order
   * if none specified will default to 15px
   */
  barHeight?: number[];

  /**
   * Data for rendering the legend
   */
  legendData?: ILegendDataItem[];
}
