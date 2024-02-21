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
   * Barwidth automacally adjusted based upon given parent width, data and scale.
   * If barwidth given through prop, then is shold be less than given formula.
   * If not, graph will adjust and your value may not be reflected.
   * Formula: width of parent div / (Number Of Groups * (Number Of single bars in group + 2))
   * Note: By changing barwidth manually it may cause some spatial and graph override issues,
   * better to avoid using this prop.
   */
  barwidth?: number;

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
