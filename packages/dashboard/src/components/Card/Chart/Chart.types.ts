import { IDataPoint, ILegendDataItem } from '@uifabric/charting/lib/StackedBarChart';

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
}

export interface IChartInternalProps extends IChartProps {
  width: ChartWidth;
  height: ChartHeight;
}
