import { RenderFunction } from '../../utilities/index';
import { CartesianChartProps, CartesianChartStyleProps, CartesianChartStyles, GanttChartDataPoint } from '../../index';

/**
 * Gantt Chart properties
 * {@docCategory GanttChart}
 */
export interface GanttChartProps extends CartesianChartProps {
  /**
   * An array of data points to be rendered in the chart.
   */
  data?: GanttChartDataPoint[];

  /**
   * Callback function to render a custom callout for each data point.
   */
  onRenderCalloutPerDataPoint?: RenderFunction<GanttChartDataPoint>;

  /**
   * Height of each bar, in pixels.
   */
  barHeight?: number;

  /**
   * Title of the chart.
   */
  chartTitle?: string;

  /**
   * Locale identifier string used to format numbers and dates according to the specified culture.
   * Example: 'en-US', 'fr-FR'.
   */
  culture?: string;

  /**
   * Padding between bars as a fraction of the [step](https://d3js.org/d3-scale/band#band_step).
   * Takes a number in the range [0, 1].
   * @default 1/2
   */
  yAxisPadding?: number;

  /**
   * If true, truncates y-axis tick labels longer than `noOfCharsToTruncate` with ellipses
   * and displays them in a tooltip on hover.
   * @default false
   */
  showYAxisLablesTooltip?: boolean;

  /**
   * If true, renders full y-axis tick labels without truncation.
   * @default false
   */
  showYAxisLables?: boolean;

  /**
   * If true, enables gradient fills for the bars.
   * @default false
   */
  enableGradient?: boolean;

  /**
   * If true, applies rounded corners to the bars.
   * @default false
   */
  roundCorners?: boolean;

  /**
   * Maximum height of each bar, in pixels.
   * @default 24
   */
  maxBarHeight?: number;
}

/**
 * Gantt Chart style properties
 * {@docCategory GanttChart}
 */
export interface GanttChartStyleProps extends CartesianChartStyleProps {}

/**
 * Gantt Chart styles
 * {@docCategory GanttChart}
 */
export interface GanttChartStyles extends CartesianChartStyles {}
