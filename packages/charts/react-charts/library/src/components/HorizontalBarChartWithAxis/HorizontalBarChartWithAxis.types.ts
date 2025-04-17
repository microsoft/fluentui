import { RenderFunction } from '../../utilities/index';
import {
  CartesianChartProps,
  CartesianChartStyleProps,
  CartesianChartStyles,
  HorizontalBarChartWithAxisDataPoint,
} from '../../index';

/**
 * Horizontal Bar Chart with Axis properties
 * {@docCategory HorizontalBarChartWithAxis}
 */
export interface HorizontalBarChartWithAxisProps extends CartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data?: HorizontalBarChartWithAxisDataPoint[];

  /**
   * Define a custom callout renderer for a data point.
   */
  onRenderCalloutPerDataPoint?: RenderFunction<HorizontalBarChartWithAxisDataPoint>;

  /**
   * Width of each bar in the chart.
   */
  barHeight?: number;

  /**
   * Colors from which to select the color of each bar.
   */
  colors?: string[];

  /**
   * chart title for the chart
   */
  chartTitle?: string;

  /**
   * This prop makes sure that all the bars are of same color.
   * it will take the first color from the array of colors in
   * prop `colors` or if  `colors` prop is not given then default color is  palette.blueLight
   * @default false
   */
  useSingleColor?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: HorizontalBarChartWithAxisStyles;

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
}

/**
 * Horizontal Bar Chart with Axis style properties
 * {@docCategory HorizontalBarChartWithAxis}
 */
export interface HorizontalBarChartWithAxisStyleProps extends CartesianChartStyleProps {
  /**
   * color of the datapoint legend
   */
  legendColor?: string;
}

/**
 * Horizontal Bar Chart with Axis styles
 * {@docCategory HorizontalBarChartWithAxis}
 */
export interface HorizontalBarChartWithAxisStyles extends CartesianChartStyles {
  /**
   * Style for the chart label.
   *
   */
  chartLabel?: string;

  /**
   * Style for the line representing the domain of the x-axis.
   *
   */
  xAxisDomain?: string;

  /**
   * Style for the lines representing the ticks along the x-axis.
   *
   */
  xAxisTicks?: string;

  /**
   * Style for the text labeling each tick along the x-axis.
   *
   */
  xAxisText?: string;

  /**
   * Style for the line representing the domain of the y-axis.
   *
   */
  yAxisDomain?: string;

  /**
   * Style for the lines representing the ticks along the y-axis.
   *
   */
  yAxisTicks?: string;

  /**
   * Style for the text labeling each tick along the y-axis.
   *
   */
  yAxisText?: string;

  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover: string;
}
