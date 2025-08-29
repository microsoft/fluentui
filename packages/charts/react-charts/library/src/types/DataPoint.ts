import { SVGProps } from 'react';
import { LegendShape } from '../components/Legends/Legends.types';
import { CurveFactory } from 'd3-shape';
import { SankeyLink, SankeyNode } from 'd3-sankey';

export interface Basestate {
  _width?: number;
  _height?: number;
  activeLegend?: string;
  color?: string;
  dataForHoverCard?: number | string;
  isCalloutVisible: boolean;
  isLegendSelected?: boolean;
  isLegendHovered?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refSelected?: any;
  YValueHover?: { legend?: string; y?: number | string; color?: string }[];
  hoverYValue?: string | number | null;
  hoverXValue?: string | number | null;
  xCalloutValue?: string;
  yCalloutValue?: string;
  lineColor?: string;
  hoveredLineColor?: string;
  selectedLegend?: string;
  containerWidth?: number;
  containerHeight?: number;
}

export interface RefArrayData {
  index?: string;
  refElement?: SVGGElement;
}

/**
 * {@docCategory ChartProps}
 */
export interface Margins {
  /**
   * left margin for the chart.
   */
  left?: number;
  /**
   * Right margin for the chart.
   */
  right?: number;
  /**
   * Top margin for the chart.
   */
  top?: number;
  /**
   * Bottom margin for the chart.
   */
  bottom?: number;
}

/**
 * {@docCategory ChartData}
 */
export interface DataPoint {
  /**
   * Independent value of the data point, rendered along the x-axis.
   * If x is a number, then each y-coordinate is plotted at its x-coordinate.
   * If x is a string, then the data is evenly spaced along the x-axis.
   */
  x: number | string;

  /**
   * Dependent value of the data point, rendered along the y-axis.
   */
  y: number;

  // NOTE: VerticalStackedBarChart, PieChart
  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;
}

/**
 * {@docCategory ChartData}
 */
export interface VerticalStackedBarDataPoint extends Omit<DataPoint, 'x'> {
  /**
   * Independent value of the data point, rendered along the x-axis.
   * If x is a number, then each y-coordinate is plotted at its x-coordinate.
   * If x is a string, then the data is evenly spaced along the x-axis.
   * If data type on x is Date, then the data is spaced evenly by d3-scale.
   */
  x: number | string | Date;
}

/**
 * {@docCategory ChartData}
 */
export interface HorizontalDataPoint {
  /**
   * Independent value of the data point, rendered along the x-axis.
   * If x is a number, then each y-coordinate is plotted at its x-coordinate.
   * If x is a string, then the data is evenly spaced along the x-axis.
   */
  x: number;

  /**
   * Total value of a single point bar chart.
   */
  total?: number;
}

/**
 * {@docCategory ChartData}
 */
export interface ChartDataPoint {
  /**
   * Legend text for the datapoint in the chart
   */
  legend?: string;

  /**
   * data the datapoint in the chart
   */
  data?: number;

  /**
   * data the datapoint in the chart
   */
  horizontalBarChartdata?: HorizontalDataPoint;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;

  /**
   * Color for the legend in the chart. If not provided, it will fallback on the default color palette.
   */
  color?: string;

  /**
   * placeholder data point
   */
  placeHolder?: boolean;

  /**
   * Callout data for x axis
   * This is an optional prop, If haven't given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: AccessibilityProps;
}

/**
 * {@docCategory ChartData}
 */
export interface VerticalBarChartDataPoint {
  /**
   * Independent value of the data point, rendered along the x-axis.
   * If x is a number, then each y-coordinate is plotted at its x-coordinate.
   * If x is a string, then the data is evenly spaced along the x-axis.
   */
  x: number | string | Date;

  /**
   * Dependent value of the data point, rendered along the y-axis.
   */
  y: number;

  /**
   * Legend text for the datapoint in the chart
   */
  legend?: string;

  /**
   * color for the legend in the chart
   */
  color?: string;

  /**
   * Callout data for x axis
   * This is an optional prop, If haven't given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;

  /**
   * data to render the line along with bars
   */
  lineData?: LineDataInVerticalBarChart;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: AccessibilityProps;
}

/**
 * {@docCategory ChartData}
 */
export interface HorizontalBarChartWithAxisDataPoint {
  /**
   * Dependent value of the data point, rendered along the x-axis.
   */
  x: number;

  /**
   * Independent value of the data point, rendered along the y-axis.
   * If y is a number, then each y-coordinate is plotted at its y-coordinate.
   * If y is a string, then the data is evenly spaced along the y-axis.
   */
  y: number | string;

  /**
   * Legend text for the datapoint in the chart
   */
  legend?: string;

  /**
   * color for the legend in the chart
   */
  color?: string;

  /**
   * Callout data for x axis
   * This is an optional prop, If haven't given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: AccessibilityProps;
}

/**
 * {@docCategory ChartData}
 */
export interface LineDataInVerticalBarChart {
  y: VerticalBarChartDataPoint['y'];
  yAxisCalloutData?: string | undefined;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;
  /**
   * Whether to use the secondary y scale or not
   * False by default.
   */
  useSecondaryYScale?: boolean;
}

/**
 * {@docCategory ChartData}
 */
interface BaseDataPoint {
  /**
   * Defines the function that is executed on clicking  line
   */
  onDataPointClick?: () => void;

  /**
   * Callout data for x axis
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   */
  yAxisCalloutData?: string | { [id: string]: number };

  /**
   * Whether to hide callout data for the point.
   */
  hideCallout?: boolean;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: AccessibilityProps;

  /**
   * X axis Accessibility data for callout
   */
  xAxisCalloutAccessibilityData?: AccessibilityProps;

  /**
   * Marker size of the points
   */
  markerSize?: number;
}

/**
 * {@docCategory ChartData}
 */
export interface LineChartDataPoint extends BaseDataPoint {
  /**
   * Independent value of the data point, rendered along the x-axis.
   */
  x: number | Date;

  /**
   * Dependent value of the data point, rendered along the y-axis.
   */
  y: number;

  /**
   * text labels of marker points
   */
  text?: string;
}

/**
 * {@docCategory ChartData}
 * ScatterChartDataPoint interface.
 */
export interface ScatterChartDataPoint extends BaseDataPoint {
  /**
   * Independent value of the data point, rendered along the x-axis.
   */
  x: number | Date | string;

  /**
   * Dependent value of the data point, rendered along the y-axis.
   */
  y: number;

  /**
   * Marker size of the points
   */
  markerSize?: number;

  /**
   * text labels of marker points
   */
  text?: string;
}

/**
 * {@docCategory ChartData}
 */
export interface LineChartGap {
  /**
   * Starting index of the gap.
   */
  startIndex: number;

  /**
   * Ending index of the gap.
   */
  endIndex: number;
}

/**
 * {@docCategory ChartProps}
 */
export interface LineChartLineOptions extends SVGProps<SVGPathElement> {
  /**
   * Width of the line/stroke.
   * Overrides the strokeWidth set on ICartesianChartProps level.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width
   */
  strokeWidth?: number | string;

  /**
   * Pattern of dashes and gaps.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray
   */
  strokeDasharray?: string | number;

  /**
   * Offset on rendering of stroke dash array.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset
   */
  strokeDashoffset?: string | number;

  /**
   * Shape at the end of a subpath.
   * Default round.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
   */
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';

  /**
   * Width of border around the line. Default no border.
   */
  lineBorderWidth?: string | number;

  /**
   * Color of border around the line. Default white.
   */
  lineBorderColor?: string;

  /**
   * Defines the type of interpolation used to render the line.
   * @default 'linear'
   */
  curve?: 'linear' | 'natural' | 'step' | 'stepAfter' | 'stepBefore' | CurveFactory;

  /**
   * Defines the mode of points to be rendered.
   */
  mode?:
    | 'lines'
    | 'markers'
    | 'text'
    | 'lines+markers'
    | 'text+markers'
    | 'text+lines'
    | 'text+lines+markers'
    | 'none'
    | 'gauge'
    | 'number'
    | 'delta'
    | 'number+delta'
    | 'gauge+number'
    | 'gauge+number+delta'
    | 'gauge+delta'
    | 'markers+text'
    | 'lines+text'
    | 'lines+markers+text';
}

/**
 * {@docCategory ChartData}
 */
export interface LineChartPoints {
  /**
   * Legend text for the datapoint in the chart
   */
  legend: string;

  /**
   * The shape for the legend
   * default: show the rect legend
   */
  legendShape?: LegendShape;

  /**
   * dataPoints for the line chart
   */
  data: LineChartDataPoint[] | ScatterChartDataPoint[];

  /**
   * gaps in the line chart where a line is not drawn
   */
  gaps?: LineChartGap[];

  /**
   * color for the legend in the chart
   */
  color?: string;

  /**
   * opacity for chart fill color
   */
  opacity?: number;

  /**
   * options for the line drawn
   */
  lineOptions?: LineChartLineOptions;

  /**
   * hide dots for points that are not active
   */
  hideNonActiveDots?: boolean;

  /**
   * Defines the function that is executed on clicking this legend
   */
  onLegendClick?: (selectedLegend: string | null | string[]) => void;

  /**
   * Defines the function that is executed on clicking  line
   */
  onLineClick?: () => void;

  /**
   * Whether to use the secondary y scale or not
   * False by default.
   */
  useSecondaryYScale?: boolean;
}

/**
 * {@docCategory ChartProps}
 */
export interface ChartProps {
  /**
   * chart title for the chart
   */
  chartTitle?: string;

  /**
   * Accessibility data for chart title
   */
  chartTitleAccessibilityData?: AccessibilityProps;
  /**
   * data for the points in the chart
   */
  chartData?: ChartDataPoint[];

  /**
   * Accessibility data for chart data
   */
  chartDataAccessibilityData?: AccessibilityProps;

  /**
   * data for the points in the line chart
   */
  lineChartData?: LineChartPoints[];

  /**
   * data for the points in the scatter chart
   */
  scatterChartData?: ScatterChartPoints[];

  /**
   * data for the points in the line chart
   */
  SankeyChartData?: SankeyChartData;

  /**
   * data for the points in the line chart
   */
  pointOptions?: SVGProps<SVGCircleElement>;

  /**
   * data for the dotted line on hovering the point
   */
  pointLineOptions?: SVGProps<SVGLineElement>;
}

/**
 * {@docCategory ChartProps}
 */
export interface AccessibilityProps {
  /**
   * Accessibility aria-label
   */
  ariaLabel?: string;

  /**
   * Accessibility aria-labelledBy
   */
  ariaLabelledBy?: string;

  /**
   * Accessibility aria-describedBy
   */
  ariaDescribedBy?: string;
}

/**
 * {@docCategory ChartData}
 */
export interface VSChartDataPoint {
  /**
   * data the datapoint in the chart
   */
  data: number | string;

  /**
   * Legend text for the datapoint in the chart
   */
  legend: string;

  /**
   * color for the legend in the chart
   */
  color?: string;

  /**
   * Callout data for x axis
   * This is an optional prop, If haven't given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: AccessibilityProps;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;
}

/**
 * {@docCategory ChartProps}
 */
export interface VerticalStackedChartProps {
  /**
   * data for the points in the chart
   */
  chartData: VSChartDataPoint[];

  /**
   * Data for x axis label for multistacked Vertical bar chart
   */
  xAxisPoint: number | string | Date;

  /**
   * Callout data for x axis
   * This is an optional prop, If haven't given, legend will take
   */
  xAxisCalloutData?: string;
  /**
   * line data to render lines on stacked bar chart
   */
  lineData?: LineDataInVerticalStackedBarChart[];
  /**
   * Accessibility data for Whole stack callout
   */
  stackCallOutAccessibilityData?: AccessibilityProps;
}

/**
 * {@docCategory ChartData}
 */
export interface LineDataInVerticalStackedBarChart {
  y: number | string;
  color: string;
  legend: string;
  /**
   * The shape for the legend
   * default: show the rect legend
   */
  legendShape?: LegendShape;
  /**
   * Data to show in callout
   */
  data?: number | string;
  yAxisCalloutData?: string;
  /**
   * Whether to use the secondary y scale or not
   * False by default.
   */
  useSecondaryYScale?: boolean;
  /**
   * options for the line drawn
   */
  lineOptions?: LineChartLineOptions;
}

/**
 * {@docCategory ChartData}
 */
export interface GVBarChartSeriesPoint {
  /**
   * Text for // need to check use of this
   */
  key: string;

  /**
   * Data for bar height of Grouped vertical bar chart
   */
  data: number;

  /**
   * Color for the legend in the chart
   */
  color: string;

  /**
   * Legend text in the chart
   */
  legend: string;

  /**
   * Callout data for x axis
   * This is an optional prop, If haven't given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: AccessibilityProps;

  /**
   * Whether to use the secondary y scale or not
   * False by default.
   */
  useSecondaryYScale?: boolean;
}

/**
 * {@docCategory ChartData}
 */
export interface GroupedVerticalBarChartData {
  /**
   * Data for X axis label
   */
  name: string;

  /**
   * Data points for Grouped vertical bar chart
   */
  series: GVBarChartSeriesPoint[];

  /**
   * Accessibility data for Group Bars Stack Callout
   */
  stackCallOutAccessibilityData?: AccessibilityProps;
}

export interface GVDataPoint {
  /**
   * This interface used for - While forming datapoints from given prop "data" in code
   * datapoints are used for to draw graph
   */
  [key: string]: number | string;
}

export interface GVSingleDataPoint {
  /**
   * While forming datapoints from given prop "data" in code.
   * These datapoints are used for to draw graph easily.
   */
  [key: string]: GVDataPoint;
}

export interface GVForBarChart {
  /**
   * While forming datapoints from given prop "data"
   * These datapoints are used for to draw graph.
   */
  [key: string]: GVBarChartSeriesPoint;
}

/**
 * {@docCategory ChartData}
 */
export interface CustomizedCalloutDataPoint {
  legend: string;
  y: number;
  color: string;
  xAxisCalloutData?: string;
  yAxisCalloutData?: string | { [id: string]: number };
}

/**
 * Used for custom callout data interface. As Area chart callout data will be prepared from given props.data,
 * Those required data passing to onRenderCalloutPerDataPoint and onRenderCalloutPerStack.
 * {@docCategory ChartData}
 */
export interface CustomizedCalloutData {
  x: number | string | Date;
  values: CustomizedCalloutDataPoint[];
}

/**
 * {@docCategory Chart}
 */
export interface Chart {
  chartContainer: HTMLElement | null;
  toImage?: (opts?: ImageExportOptions) => Promise<string>;
}

/**
 * {@docCategory Chart}
 */
export interface ImageExportOptions {
  width?: number;
  height?: number;
  scale?: number;
  background?: string;
}

export interface HeatMapChartDataPoint {
  x: string | Date | number;
  y: string | Date | number;
  value: number;
  /**
   * The value/ text to be rendered in the rectange
   */
  rectText?: string | number;
  /**
   * denomination to show in the callout
   */
  ratio?: [number, number];
  /**
   * description message to the callout
   */
  descriptionMessage?: string;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;
  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: AccessibilityProps;
}

/**
 * {@docCategory ChartData}
 */
export interface HeatMapChartData {
  /**
   * name of the legend
   */
  legend: string;
  data: HeatMapChartDataPoint[];
  /**
   * This  number will be used to get the color for the legend
   */
  value: number;
}

/**
 * {@docCategory ChartData}
 */
export interface SankeyChartData {
  nodes: SNode[];
  links: SLink[];
}

interface SNodeExtra {
  /**
   * A unique identifier for this node.
   */
  nodeId: number | string;
  /**
   * The display name for this node in the UX.
   */
  name: string;
  color?: string;
  borderColor?: string;
  actualValue?: number;
  layer?: number;
}

interface SLinkExtra {
  /**
   * The index within `ISankeyChartData.nodes` of the source node.
   */
  source: number;
  /**
   * The index within `ISankeyChartData.nodes` of the target node.
   */
  target: number;
  /**
   * The weight of this link between the two nodes.
   */
  value: number;
  unnormalizedValue?: number;
}

export type SNode = SankeyNode<SNodeExtra, SLinkExtra>;
export type SLink = SankeyLink<SNodeExtra, SLinkExtra>;

/**
 * Specifies the ordering options for axis categories in Cartesian charts.
 *
 * - `'default'`: Uses the original order before custom ordering was supported.
 *   In some charts, this behaves the same as `'data'`.
 * - `'data'`: Preserves the order of categories as provided in the input data.
 * - `string[]`: Explicitly defines the custom order of categories as an array of category names.
 * - `'category ascending' | 'category descending'`: Orders categories alphanumerically.
 * - `'total ascending' | 'total descending'`: Orders categories by the total of their associated values.
 * - `'min ascending' | 'min descending'`: Orders by the minimum value within each category.
 * - `'max ascending' | 'max descending'`: Orders by the maximum value within each category.
 * - `'sum ascending' | 'sum descending'`: Orders by the sum of values for each category (same as 'total').
 * - `'mean ascending' | 'mean descending'`: Orders by the average of values in each category.
 * - `'median ascending' | 'median descending'`: Orders by the median value of each category.
 *
 * {@docCategory CartesianChart}
 */
export type AxisCategoryOrder =
  | 'default'
  | 'data'
  | string[]
  | 'category ascending'
  | 'category descending'
  | 'total ascending'
  | 'total descending'
  | 'min ascending'
  | 'min descending'
  | 'max ascending'
  | 'max descending'
  | 'sum ascending'
  | 'sum descending'
  | 'mean ascending'
  | 'mean descending'
  | 'median ascending'
  | 'median descending';

/**
 * {@docCategory IChartData}
 */
export interface GanttChartDataPoint {
  /**
   * Dependent value of the data point, rendered along the x-axis.
   */
  x: {
    start: Date | number;
    end: Date | number;
  };

  /**
   * Independent value of the data point, rendered along the y-axis.
   * If y is a number, then each y-coordinate is plotted at its y-coordinate.
   * If y is a string, then the data is evenly spaced along the y-axis.
   */
  y: number | string;

  /**
   * Legend text for the datapoint in the chart
   */
  legend?: string;

  /**
   * color for the legend in the chart
   */
  color?: string;

  /**
   * Gradient for the legend in the chart. If not provided, it will fallback on the default color palette.
   * If provided, it will override the color prop. granted `enableGradient` is set to true for the chart.
   */
  gradient?: [string, string];

  /**
   * Callout data for x axis
   * This is an optional prop, If haven't given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: AccessibilityProps;
}

/**
 * {@docCategory IChartData}
 */
export interface ScatterChartPoints {
  /**
   * Legend text for the datapoint in the chart
   */
  legend: string;

  /**
   * The shape for the legend
   * default: show the rect legend
   */
  legendShape?: LegendShape;

  /**
   * dataPoints for the line chart
   */
  data: ScatterChartDataPoint[];

  /**
   * color for the legend in the chart
   */
  color?: string;

  /**
   * opacity for chart fill color
   */
  opacity?: number;

  /**
   * hide dots for points that are not active
   */
  hideNonActiveDots?: boolean;

  /**
   * Defines the function that is executed on clicking this legend
   */
  onLegendClick?: (selectedLegend: string | null | string[]) => void;

  /**
   * Whether to use the secondary y scale or not
   * False by default.
   */
  useSecondaryYScale?: boolean;
}

/**
 * Available scale types for axes.
 *
 * - `'default'`: Uses an automatic scale (linear, band, or time) based on axis data type.
 * - `'log'`: Uses a logarithmic scale. Only supported for numeric axes in LineChart and ScatterChart.
 *
 * {@docCategory CartesianChart}
 */
export type AxisScaleType = 'default' | 'log';

/**
 * Configuration options for an axis.
 *
 * {@docCategory CartesianChart}
 */
export type AxisProps = {
  /**
   * Defines the step between tick marks on the axis.
   * Works in combination with `tick0`.
   * Must be a positive number.
   *
   * - **Log scale**:
   *   - Ticks are placed at `10^(n * tickStep)` where `n` is the tick index.
   *     - Example: `tickStep = 2` → ticks at 1, 100, 10,000...
   *     - Example: `tickStep = log10(5)` → ticks at 1, 5, 25, 125...
   *   - Special format `"L<f>"`: Creates ticks that are linearly spaced in value (not position).
   *     - Example: `tick0 = 0.1`, `tickStep = "L0.5"` → ticks at 0.1, 0.6, 1.1, 1.6...
   *
   * - **Date axis**:
   *   - Must be in milliseconds.
   *     - Example: one day = `tickStep = 86400000`.
   *   - Special format `"M<n>"`: Places ticks every `n` months.
   *     - Example: `tick0 = "2000-01-15"`, `tickStep = "M3"` → ticks on the 15th every third month.
   *     - Example: `tickStep = "M48"` → ticks every 4 years.
   */
  tickStep?: number | string;

  /**
   * Sets the reference value for axis ticks.
   * Works in combination with `tickStep`.
   *
   * - **Log scale**:
   *   - `tick0` must be given as the logarithm of the reference tick.
   *     - Example: to align ticks with 100, use `tick0 = 2`.
   *   - Exception: when `tickStep` uses `"L<f>"`, you can specify the raw value directly.
   */
  tick0?: number | Date;
};
