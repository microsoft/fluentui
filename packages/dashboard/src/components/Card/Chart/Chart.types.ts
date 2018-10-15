import { IChartProps as IChartingProps, IDataPoint, ILegendDataItem } from '@uifabric/charting/lib/StackedBarChart';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export enum ChartType {
  DonutChart,
  PieChart,
  StackedBarChart,
  VerticalBarChart,
  LineChart,
  HorizontalBarChart
}

export enum ChartWidth {
  /**
   * Compact chart
   */
  compact,

  /**
   * Wide chart
   */
  wide
}

export enum ChartHeight {
  /**
   * Short chart
   */
  short,

  /**
   * Tall chart
   */
  tall
}

export interface IChartProps {
  /**
   * Label to apply to the whole chart.
   */
  chartLabels?: string[];

  /**
   * Colors from which to select the color of each bar.
   */
  legendColors?: ILegendDataItem[];

  /**
   * Width of each bar in the chart (only for vertical bar chart)
   */
  barWidth?: number;

  /**
   * Width of each bar in the chart (only for horizontal bar chart)
   */
  barHeight?: number;

  /**
   * Data to render for single charts.
   */
  dataPoints?: IDataPoint[];

  /**
   * Data to render for multiple charts.
   */
  data?: IDataPoint[][];

  /**
   * Data for the dataviz
   */
  chartData?: IChartingProps[];

  /**
   * This property tells whether to show ratio on top of stacked bar chart or not.
   */
  hideRatio?: boolean[];

  /**
   * Type of chart to render
   */
  chartType: ChartType;

  /**
   * custom width for a compact chart
   *
   * @default 250
   */
  compactChartWidth?: number;

  /**
   * text to display when the chart
   * was last updated
   */
  chartUpdatedOn?: string;

  /**
   * Width of each stroke in the line chart
   */
  strokeWidth?: number;

  /**
   * The time range for the x-axis data of line chart. Only '7, 30, 90, 180 day' formats are supported.
   * One of the timeRange must be specified to line chart when Date type data is selected for line chart. The default is 180Days format
   */
  timeRange?: '7Days' | '30Days' | '90Days' | '180Days';
}

export interface IChartInternalProps extends IChartProps {
  width: ChartWidth;
  height: ChartHeight;
}

export interface IChartStyles {
  /**
   * wrapper component that sits on top of each chart
   */
  chartWrapper: IStyle;
}
