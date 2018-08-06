import { IDataPoint } from '@uifabric/charting/lib/VerticalBarChart';

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
  chartLabel?: string;

  /**
   * Colors from which to select the color of each bar.
   */
  colors?: string[];

  /**
   * Width of each bar in the chart (only for vertical bar chart)
   */
  barWidth?: number;

  /**
   * Width of each bar in the chart (only for horizontal bar chart)
   */
  barHeight?: number;

  /**
   * Data to render in the chart.
   */
  data?: IDataPoint[];

  /**
   * Type of chart to render
   */
  chartType: ChartType;

  /**
   * Width of each stroke in the line chart
   */
  strokeWidth?: number;
}

export interface IChartInternalProps extends IChartProps {
  width: ChartWidth;
  height: ChartHeight;
}
