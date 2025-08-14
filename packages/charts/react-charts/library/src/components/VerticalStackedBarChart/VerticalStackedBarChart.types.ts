import * as React from 'react';
//import { ICalloutProps } from '@fluentui/react/lib/Callout';
import { RenderFunction } from '../../utilities/index';
import {
  CartesianChartProps,
  CartesianChartStyleProps,
  CartesianChartStyles,
  LineChartLineOptions,
  VerticalStackedChartProps,
  VSChartDataPoint,
} from '../../index';

/**
 * Vertical Stacked Bar Chart properties
 * {@docCategory VerticalStackedBarChart}
 */
export interface VerticalStackedBarChartProps extends CartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: VerticalStackedChartProps[];

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
  styles?: Partial<VerticalStackedBarChartStyles>;

  /**
   * Define a custom callout renderer for a stack; default is to render per data point
   */
  onRenderCalloutPerStack?: RenderFunction<VerticalStackedChartProps>;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: RenderFunction<VSChartDataPoint>;

  /**
   * yMinValue is supported for bar charts that has only lines
   */
  yMinValue?: number | undefined;

  /**
   * Allow hover actions on the legend
   * @default true
   */
  allowHoverOnLegend?: boolean;

  /**
   * Click handler for bars; type of data is dependant on isCalloutForStack
   */
  onBarClick?: (event: React.MouseEvent<SVGElement>, data: VerticalStackedChartProps | VSChartDataPoint) => void;

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
  lineOptions?: LineChartLineOptions;

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

  /**
   * @default false
   * The prop used to enable gradient fill color for the chart.
   */
  enableGradient?: boolean;

  /**
   * @default false
   * The prop used to enable rounded corners for the chart.
   */
  roundCorners?: boolean;

  /**
   * Specifies the mode of the chart.
   * @default 'default'
   */
  mode?: 'default' | 'plotly';

  /**
   *@default false
   *Used for to elipse y axis labes and show tooltip on x axis labels
   */
  showYAxisLablesTooltip?: boolean;

  /**
   *@default false
   *Used for showing complete y axis lables   */
  showYAxisLables?: boolean;
}

/**
 * Vertical Stacked Bar Chart style properties
 * {@docCategory VerticalStackedBarChart}
 */
export interface VerticalStackedBarChartStyleProps extends CartesianChartStyleProps {}

/**
 * Vertical Stacked Bar Chart styles
 * {@docCategory VerticalStackedBarChart}
 */
export interface VerticalStackedBarChartStyles extends CartesianChartStyles {
  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover?: string;

  /**
   * Style for the bar labels
   */
  barLabel: string;
}
