import { IDataPoint } from '../../../../../charting/src/components/VerticalBarChart';

export enum ChartType {
  VerticalBarChart,
  LineChart
}

export enum ChartWidth {
  compact,
  wide
}

export enum ChartHeight {
  short,
  tall
}

export interface IChartInternalProps extends IChartProps {
  width: ChartWidth;
  height: ChartHeight;
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
   * Width of each bar in the chart (only for bar charts)
   */
  barWidth?: number;

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
