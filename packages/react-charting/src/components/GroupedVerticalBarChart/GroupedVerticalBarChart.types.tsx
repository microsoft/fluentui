import { IStyle } from '@fluentui/react/lib/Styling';
import { IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import {
  ICartesianChartStyles,
  ICartesianChartStyleProps,
  ICartesianChartProps,
  IGroupedVerticalBarChartData,
  IGVBarChartSeriesPoint,
} from '../../index';

/**
 * Grouped Vertical Bar Chart properties
 * {@docCategory GroupedVerticalBarChart}
 */
export interface IGroupedVerticalBarChartProps extends ICartesianChartProps {
  /**
   * chart title for the chart
   */
  chartTitle?: string;
  /**
   * Data to render in the chart.
   */
  data: IGroupedVerticalBarChartData[];

  /**
   * Width of each bar in the chart. When set to `undefined` or `'default'`, the bar width defaults to 16px,
   * which may decrease to prevent overlap. When set to `'auto'`, the bar width is calculated from padding values.
   * @default 16
   */
  barwidth?: number | 'default' | 'auto';

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IGroupedVerticalBarChartStyleProps, IGroupedVerticalBarChartStyles>;

  /**
   * color of the datapoint legend
   * @deprecated Dont use this property. colour will pick from given data
   */
  legendColor?: string;

  /**
   * This prop used to draw X axis grid line on tha chart. Default value will be false
   * @deprecated Dont use this property. Handling with default value.
   */
  showXAxisGridLines?: boolean;

  /**
   * This prop used to draw Y axis grid lines on the chart. Default value will be true
   * @deprecated Dont use this property. Lines are drawn by default
   */
  showYAxisGridLines?: boolean;

  /**
   * This prop takes the boolean value and used for to display x-axis path or transparent.
   * This is a optional prop and default value is false. It dont show X-Axis path as tranparent.
   * @deprecated Dont use this property. Axis line are removed by default
   */
  showXAxisPath?: boolean;

  /**
   * This prop takes the boolean value and used for to display y-axis path or transparent.
   * This is a optional prop and default value is false. It dont show Y-Axis path as tranparent.
   * @deprecated Dont use this property. No need to display Y axis path. Handling default
   */
  showYAxisPath?: boolean;

  /**
   * Define a custom callout renderer for a stack
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<IGVBarChartSeriesPoint>;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   * To display multi stack callout or single callout
   * @default false
   */
  isCalloutForStack?: boolean;

  /**
   * Prop to hide the bar labels
   * @default false
   */
  hideLabels?: boolean;

  /**
   * Maximum width of a bar, in pixels.
   * @default 24
   */
  maxBarWidth?: number;

  /**
   * Padding between groups as a fraction of the [step](https://d3js.org/d3-scale/band#band_step).
   * Takes a number in the range [0, 1]. Only applicable to string x-axis.
   * Note: groupWidthInTermsOfBarWidth is calculated at runtime based on
   * the number of bars in a group and the gap between the bars.
   * @default 2 / (2 + groupWidthInTermsOfBarWidth)
   */
  xAxisInnerPadding?: number;

  /**
   * Padding before the first group and after the last group as a fraction of
   * the [step](https://d3js.org/d3-scale/band#band_step). Takes a number in the range [0, 1].
   * Only applicable to string x-axis.
   */
  xAxisOuterPadding?: number;
}

/**
 * Grouped Vertical Bar Chart style properties
 * {@docCategory GroupedVerticalBarChart}
 */
export interface IGroupedVerticalBarChartStyleProps extends ICartesianChartStyleProps {}

/**
 * Grouped Vertical Bar Chart styles
 * {@docCategory GroupedVerticalBarChart}
 */
export interface IGroupedVerticalBarChartStyles extends ICartesianChartStyles {
  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover: IStyle;

  /**
   * Style for the bar labels
   */
  barLabel: IStyle;
}
