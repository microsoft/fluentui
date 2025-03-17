export enum Variant {
  PartToWhole = 'part-to-whole',
  AbsoluteScale = 'absolute-scale',
  SingleBar = 'single-bar',
}

export interface ChartDataPoint {
  /**
   * Legend text for the datapoint in the chart
   */
  legend: string;

  /**
   * data the datapoint in the chart
   */
  data: number;

  /**
   * total length of bar
   */
  total?: number;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;

  /**
   * Color for the legend in the chart. If not provided, it will fallback on the default color palette.
   */
  color?: string;

  gradient?: [string, string];
}

export interface ChartProps {
  /**
   * title for the data series
   */
  chartSeriesTitle?: string;

  /**
   * data for the points in the chart
   */
  chartData: ChartDataPoint[];

  benchmarkData?: number;

  chartDataText?: string;
}
