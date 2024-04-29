import * as React from 'react';
import { IStyle } from '@fluentui/react/lib/Styling';
import { ICalloutProps } from '@fluentui/react/lib/Callout';
import { IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import {
  ICartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles,
  ILineChartLineOptions,
  IVerticalStackedChartProps,
  IVSChartDataPoint,
} from '../../index';

/**
 * Vertical Stacked Bar Chart properties
 * {@docCategory VerticalStackedBarChart}
 */
export interface IVerticalStackedBarChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: IVerticalStackedChartProps[];

  /**
   * Width of each bar in the chart. When set to `undefined` or `'default'`, the bar width defaults to 16px,
   * which may decrease to prevent overlap. When set to `'auto'`, the bar width is calculated from padding values.
   */
  barWidth?: number | 'default' | 'auto';

  /**
   * Gap (max) between bars in a stack. When non-zero, the bars in a stack will
   * be separated by gaps. The actual size of each gap is calculated as 20% of
   * the height of that stack, with a minimum size of 1px and a maximum given by
   * this prop.
   * @default 0
   */
  barGapMax?: number;

  /**
   * Corner radius of the bars
   * @default 0
   */
  barCornerRadius?: number;

  /**
   * The minimum height of a bar; bars below this height will be displayed at
   * this height. Note that this setting will result in the height of these data
   * points not being to scale.
   * @default 0
   */
  barMinimumHeight?: number;

  /**
   * Colors from which to select the color of each bar.
   * @deprecated Not using this prop. DIrectly taking color from given data.
   */
  colors?: string[];

  /**
   * chart title for the chart
   */
  chartTitle?: string;

  /**
   * To display multi stack callout or single callout
   * @default flase
   */
  isCalloutForStack?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles>;

  /**
   * Define a custom callout renderer for a stack; default is to render per data point
   */
  onRenderCalloutPerStack?: IRenderFunction<IVerticalStackedChartProps>;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<IVSChartDataPoint>;

  /**
   * props for the callout in the chart
   */
  calloutProps?: Partial<ICalloutProps>;

  /**
   * yMinValue is not supported for bar charts, so only allow "undefined"
   */
  yMinValue?: undefined;

  /**
   * Allow hover actions on the legend
   * @default true
   */
  allowHoverOnLegend?: boolean;

  /**
   * Click handler for bars; type of data is dependant on isCalloutForStack
   */
  onBarClick?: (event: React.MouseEvent<SVGElement>, data: IVerticalStackedChartProps | IVSChartDataPoint) => void;

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
 * Vertical Stacked Bar Chart style properties
 * {@docCategory VerticalStackedBarChart}
 */
export interface IVerticalStackedBarChartStyleProps extends ICartesianChartStyleProps {}

/**
 * Vertical Stacked Bar Chart styles
 * {@docCategory VerticalStackedBarChart}
 */
export interface IVerticalStackedBarChartStyles extends ICartesianChartStyles {
  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover?: IStyle;

  /**
   * Style for the bar labels
   */
  barLabel: IStyle;

  /**
   * Style for the chart.
   * @deprecated use root instead.
   */
  chart?: IStyle;

  /**
   * Style for the line representing the domain of the x-axis.
   * @deprecated - use xAxis instead.
   */
  xAxisDomain?: IStyle;

  /**
   * Style for the lines representing the ticks along the x-axis.
   * @deprecated - use xAxis instead.
   */
  xAxisTicks?: IStyle;

  /**
   * Style for the text labeling each tick along the x-axis.
   * @deprecated - use xAxis instead.
   */
  xAxisText?: IStyle;

  /**
   * Style for the line representing the domain of the y-axis.
   * @deprecated - use xAxis instead.
   */
  yAxisDomain?: IStyle;

  /**
   * Style for the lines representing the ticks along the y-axis.
   * @deprecated - use xAxis instead.
   */
  yAxisTicks?: IStyle;

  /**
   * Style for the text labeling each tick along the y-axis.
   * @deprecated - use xAxis instead.
   */
  yAxisText?: IStyle;
}
