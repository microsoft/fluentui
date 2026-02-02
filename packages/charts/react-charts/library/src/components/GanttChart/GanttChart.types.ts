import { RenderFunction } from '../../utilities/index';
import { CartesianChartProps, CartesianChartStyleProps, CartesianChartStyles, GanttChartDataPoint } from '../../index';

/**
 * Position of an annotation relative to the task bar.
 * - 'above': Annotation appears above the task bar
 * - 'below': Annotation appears below the task bar
 * - 'on': Annotation appears on the task bar
 * - 'header': Annotation appears above the chart area (for chart-level annotations)
 * {@docCategory GanttChart}
 */
export type GanttChartAnnotationPosition = 'above' | 'below' | 'on' | 'header';

/**
 * Style properties for a Gantt Chart annotation.
 * {@docCategory GanttChart}
 */
export interface GanttChartAnnotationStyle {
  /**
   * Color of the annotation text.
   */
  textColor?: string;

  /**
   * Font size of the annotation text in pixels.
   */
  fontSize?: number;

  /**
   * Font weight of the annotation text.
   */
  fontWeight?: string | number;

  /**
   * Background color of the annotation.
   */
  backgroundColor?: string;

  /**
   * Border color of the annotation.
   */
  borderColor?: string;
}

/**
 * Arrow properties for a Gantt Chart annotation.
 * {@docCategory GanttChart}
 */
export interface GanttChartAnnotationArrow {
  /**
   * Whether to show the arrow.
   * @default false
   */
  show?: boolean;

  /**
   * Style of the arrow head.
   * @default 'triangle'
   */
  headStyle?: 'triangle' | 'none';

  /**
   * Color of the arrow.
   */
  color?: string;

  /**
   * Width of the arrow line in pixels.
   * @default 1
   */
  width?: number;

  /**
   * Size of the arrow head in pixels.
   * @default 6
   */
  headSize?: number;

  /**
   * Direction of the arrow relative to the annotation text.
   * - 'left': Arrow points left from the text toward the bar
   * - 'right': Arrow points right from the text toward the bar
   * - 'vertical': Arrow points vertically (up or down depending on position)
   * @default 'vertical'
   */
  direction?: 'left' | 'right' | 'vertical';

  /**
   * Offset in pixels for horizontal arrows (ax value from Plotly).
   * Positive values mean text is to the right of the arrow point.
   * @default 0
   */
  offsetX?: number;
}

/**
 * Represents an annotation on the Gantt Chart.
 * {@docCategory GanttChart}
 */
export interface GanttChartAnnotation {
  /**
   * The text content of the annotation.
   */
  text: string;

  /**
   * The index of the task row (0-based) where the annotation should appear.
   */
  taskIndex: number;

  /**
   * The date position of the annotation on the x-axis.
   */
  date: Date | number;

  /**
   * Position of the annotation relative to the task bar.
   * @default 'above'
   */
  position?: GanttChartAnnotationPosition;

  /**
   * Style properties for the annotation.
   */
  style?: GanttChartAnnotationStyle;

  /**
   * Arrow properties for the annotation.
   */
  arrow?: GanttChartAnnotationArrow;

  /**
   * Unique identifier for the annotation.
   */
  id?: string;

  /**
   * Accessible label for the annotation.
   */
  ariaLabel?: string;
}

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

  /**
   * An array of annotations to be rendered on the chart.
   */
  ganttAnnotations?: GanttChartAnnotation[];
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
