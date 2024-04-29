import { IStyle } from '@fluentui/react/lib/Styling';
import { IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import {
  ICartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles,
  IVerticalBarChartDataPoint,
} from '../../index';
import { ILineChartLineOptions } from '../../types/index';

/**
 * Vertical Bar Chart properties
 * {@docCategory VerticalBarChart}
 */
export interface IVerticalBarChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data?: IVerticalBarChartDataPoint[];

  /**
   * Define a custom callout renderer for a data point.
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<IVerticalBarChartDataPoint>;

  /**
   * Width of each bar in the chart. When set to `undefined` or `'default'`, the bar width defaults to 16px,
   * which may decrease to prevent overlap. When set to `'auto'`, the bar width is calculated from padding values.
   * @default 16
   */
  barWidth?: number | 'default' | 'auto';

  /**
   * Colors from which to select the color of each bar.
   */
  colors?: string[];

  /**
   * chart title for the chart
   */
  chartTitle?: string;

  /**
   * Legend text for the line datapoint in the chart
   */
  lineLegendText?: string;

  /**
   * color for the legend  of the line in the chart
   * @default theme.yellow
   */

  lineLegendColor?: string;

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
  styles?: IStyleFunctionOrObject<IVerticalBarChartStyleProps, IVerticalBarChartStyles>;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   * it's padding between bar's or lines in the graph
   */
  xAxisPadding?: number;

  /**
   * options for the line drawn
   */
  lineOptions?: ILineChartLineOptions;

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
   * Padding between bars as a fraction of the [step](https://d3js.org/d3-scale/band#band_step).
   * Takes a number in the range [0, 1]. Only applicable to string x-axis.
   * @default 2/3
   */
  xAxisInnerPadding?: number;

  /**
   * Padding before the first bar and after the last bar as a fraction of
   * the [step](https://d3js.org/d3-scale/band#band_step). Takes a number in the range [0, 1].
   * Only applicable to string x-axis.
   */
  xAxisOuterPadding?: number;
}

/**
 * Vertical Bar Chart style properties
 * {@docCategory VerticalBarChart}
 */
export interface IVerticalBarChartStyleProps extends ICartesianChartStyleProps {
  /**
   * color of the datapoint legend
   */
  legendColor?: string;
}

/**
 * Vertical Bar Chart styles
 * {@docCategory VerticalBarChart}
 */
export interface IVerticalBarChartStyles extends ICartesianChartStyles {
  /**
   * Style for the chart label.
   * @deprecated This style cannot be customized anymore
   */
  chartLabel?: IStyle;

  /**
   * Style for the line representing the domain of the x-axis.
   * @deprecated This style cannot be customized anymore
   */
  xAxisDomain?: IStyle;

  /**
   * Style for the lines representing the ticks along the x-axis.
   * @deprecated This style cannot be customized anymore
   */
  xAxisTicks?: IStyle;

  /**
   * Style for the text labeling each tick along the x-axis.
   * @deprecated This style cannot be customized anymore
   */
  xAxisText?: IStyle;

  /**
   * Style for the line representing the domain of the y-axis.
   * @deprecated This style cannot be customized anymore
   */
  yAxisDomain?: IStyle;

  /**
   * Style for the lines representing the ticks along the y-axis.
   * @deprecated This style cannot be customized anymore
   */
  yAxisTicks?: IStyle;

  /**
   * Style for the text labeling each tick along the y-axis.
   * @deprecated This style cannot be customized anymore
   */
  yAxisText?: IStyle;

  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover: IStyle;

  /**
   * Style for the bar labels
   */
  barLabel: IStyle;
}
