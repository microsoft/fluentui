import { IStyle } from '@fluentui/react/lib/Styling';
import { ICalloutProps } from '@fluentui/react/lib/Callout';
import { IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import {
  ICartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles,
  IVerticalStackedChartProps,
  IVSChartDataPoint,
} from '../../index';

export interface IVerticalStackedBarChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: IVerticalStackedChartProps[];

  /**
   * Width of each bar in the chart.
   */
  barWidth?: number;

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
   * Colors from which to select the color of each bar.
   * @deprecated Not using this prop. DIrectly taking color from given data.
   */
  colors?: string[];

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
}

export interface IVerticalStackedBarChartStyleProps extends ICartesianChartStyleProps {}

export interface IVerticalStackedBarChartStyles extends ICartesianChartStyles {
  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover?: IStyle;

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
