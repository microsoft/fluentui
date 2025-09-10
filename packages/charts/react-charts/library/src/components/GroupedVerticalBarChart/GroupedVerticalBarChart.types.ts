import {
  CartesianChartProps,
  CartesianChartStyleProps,
  CartesianChartStyles,
  GroupedVerticalBarChartData,
} from '../../index';

/**
 * Vertical Bar Chart properties
 * {@docCategory VerticalBarChart}
 */
export interface GroupedVerticalBarChartProps extends CartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data?: GroupedVerticalBarChartData[];

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
   * This prop makes sure that all the bars are of same color.
   * it will take the first color from the array of colors in
   * prop `colors` or if  `colors` prop is not given then default color is  palette.blueLight
   * @default false
   */
  useSingleColor?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: GroupedVerticalBarChartStyles;

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
   * Specifies the mode of the chart.
   * @default 'default'
   */
  mode?: 'default' | 'plotly';

  /**
   * @default false
   * The prop used to enable rounded corners for the chart.
   */
  roundCorners?: boolean;
}

/**
 * Vertical Bar Chart style properties
 * {@docCategory VerticalBarChart}
 */
export interface GroupedVerticalBarChartStyleProps extends CartesianChartStyleProps {}

/**
 * Vertical Bar Chart styles
 * {@docCategory VerticalBarChart}
 */
export interface GroupedVerticalBarChartStyles extends CartesianChartStyles {
  /**
   * Style for the bar labels
   */
  barLabel: string;
}
