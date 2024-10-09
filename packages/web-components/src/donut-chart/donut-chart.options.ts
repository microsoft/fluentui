export interface IChartDataPoint {
  /**
   * Legend text for the datapoint in the chart
   */
  legend?: string;

  /**
   * data the datapoint in the chart
   */
  data?: number;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;

  /**
   * Color for the legend in the chart. If not provided, it will fallback on the default color palette.
   */
  color?: string;

  /**
   * Callout data for x axis
   * This is an optional prop, If haven;t given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;
}

export interface IChartProps {
  /**
   * chart title for the chart
   */
  chartTitle?: string;

  /**
   * data for the points in the chart
   */
  chartData?: IChartDataPoint[];
}
