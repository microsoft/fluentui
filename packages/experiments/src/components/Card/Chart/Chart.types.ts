import { IDataPoint } from '../../../../../charting/src/components/VerticalBarChart';
import { CardSize } from '../Card.types';

export enum ChartType {
  VerticalBarChart,
  LineChart
}

export interface IChartInternalProps extends IChartProps {
  cardSize: CardSize;
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
