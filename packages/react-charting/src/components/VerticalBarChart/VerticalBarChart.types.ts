import { IStyle } from '@fluentui/react/lib/Styling';
import { IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import {
  ICartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles,
  IVerticalBarChartDataPoint,
} from '../../index';

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
   * Width of each bar in the chart.
   */
  barWidth?: number;

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
}

export interface IVerticalBarChartStyleProps extends ICartesianChartStyleProps {
  /**
   * color of the datapoint legend
   */
  legendColor?: string;
}

export interface IVerticalBarChartStyles extends ICartesianChartStyles {
  /**
   * Style for the chart label.
   * @deprecated
   */
  chartLabel?: IStyle;

  /**
   * Style for the line representing the domain of the x-axis.
   * @deprecated
   */
  xAxisDomain?: IStyle;

  /**
   * Style for the lines representing the ticks along the x-axis.
   * @deprecated
   */
  xAxisTicks?: IStyle;

  /**
   * Style for the text labeling each tick along the x-axis.
   * @deprecated
   */
  xAxisText?: IStyle;

  /**
   * Style for the line representing the domain of the y-axis.
   * @deprecated
   */
  yAxisDomain?: IStyle;

  /**
   * Style for the lines representing the ticks along the y-axis.
   * @deprecated
   */
  yAxisTicks?: IStyle;

  /**
   * Style for the text labeling each tick along the y-axis.
   * @deprecated
   */
  yAxisText?: IStyle;

  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover: IStyle;
}
