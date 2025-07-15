import { IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import {
  ICartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles,
  IGanttChartDataPoint,
} from '../../index';

/**
 * Gantt Chart properties
 * {@docCategory GanttChart}
 */
export interface IGanttChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data?: IGanttChartDataPoint[];

  /**
   * Define a custom callout renderer for a data point.
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<IGanttChartDataPoint>;

  /**
   * Width of each bar in the chart.
   */
  barHeight?: number;

  /**
   * chart title for the chart
   */
  chartTitle?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IGanttChartStyleProps, IGanttChartStyles>;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   * it's padding between bar's or lines in the graph
   */
  yAxisPadding?: number;

  /**
   *@default false
   *Used for to elipse y axis labes and show tooltip on x axis labels
   */
  showYAxisLablesTooltip?: boolean;

  /**
   *@default false
   *Used for showing complete y axis lables   */
  showYAxisLables?: boolean;

  /**
   * @default false
   * The prop used to enable gradient fill color for the chart.
   */
  enableGradient?: boolean;

  /**
   * @default false
   * The prop used to enable rounded corners for the bars.
   */
  roundCorners?: boolean;

  /**
   * Maximum height of a bar, in pixels.
   * @default 24
   */
  maxBarHeight?: number;
}

/**
 * Gantt Chart style properties
 * {@docCategory GanttChart}
 */
export interface IGanttChartStyleProps extends ICartesianChartStyleProps {}

/**
 * Gantt Chart styles
 * {@docCategory GanttChart}
 */
export interface IGanttChartStyles extends ICartesianChartStyles {}
