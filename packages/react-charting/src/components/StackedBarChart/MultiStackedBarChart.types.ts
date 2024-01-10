import { IChartProps, IChartDataPoint } from './index';
import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { ICalloutProps } from '@fluentui/react/lib/Callout';
import { IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IOverflowSetProps } from '@fluentui/react/lib/OverflowSet';
import { IFocusZoneProps } from '@fluentui/react-focus';
import { ILegendsProps } from '../Legends/index';

/**
 * Multi Stacked Bar Chart properties
 * {@docCategory MultiStackedBarChart}
 */
export interface IMultiStackedBarChartProps {
  /**
   * An array of chart data points for the multistacked bar chart
   */
  data?: IChartProps[];

  /**
   * Width of bar chart
   */
  width?: number;

  /**
   * Height of bar chart
   * @default 15
   */
  barHeight?: number;

  /**
   * Additional CSS class(es) to apply to the StackedBarChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * This property tells whether to show ratio on top of stacked bar chart or not.
   * This property is applicable only if there are 1 or 2 datapoints.
   */
  hideRatio?: boolean[];

  /**
   * Do not show the legend at the bottom of chart
   *
   * @default false
   */
  hideLegend?: boolean;

  /**
   * Do not show tooltips in chart
   *
   * @default false
   */
  hideTooltip?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IMultiStackedBarChartStyleProps, IMultiStackedBarChartStyles>;

  /**
   * Url that the data-viz needs to redirect to upon clicking on it
   */
  href?: string;

  /**
   * If this value is set to true the denominator will not be shown for the ratio above the chart
   * This prop is applicable only if hide ratio is false and there are exactly 2 datapoints.
   */
  hideDenominator?: boolean[];

  /**
   * overflow props for legend
   */
  legendsOverflowProps?: Partial<IOverflowSetProps>;

  /**
   * text for overflow legends string
   */
  legendsOverflowText?: string;

  /**
   * focus zone props in hover card for legends
   */
  focusZonePropsForLegendsInHoverCard?: IFocusZoneProps;

  /**
   * props for the legends in the chart
   */
  legendProps?: Partial<ILegendsProps>;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<IChartDataPoint>;

  /**
   * props for the callout in the chart
   */
  calloutProps?: Partial<ICalloutProps>;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   * Prop to define the variant of MultiStackedBarChart to render
   * @default MultiStackedBarChartVariant.PartToWhole
   */
  variant?: MultiStackedBarChartVariant;

  /**
   * Prop to hide the bar labels
   * @default false
   */
  hideLabels?: boolean;
}

/**
 * Multi Stacked Bar Chart style properties
 * {@docCategory MultiStackedBarChart}
 */
export interface IMultiStackedBarChartStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;

  /**
   * Additional CSS class(es) to apply to the StackedBarChart.
   */
  className?: string;

  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * barHeight for each chart
   */
  barHeight?: number;

  /**
   * color of the datapoint legend
   */
  legendColor?: string;

  /**
   * prop to check if the chart is selcted or hovered upon to determine opacity
   */
  shouldHighlight?: boolean;

  /**
   * prop to check to decide cursor type
   */
  href?: string;

  /**
   * Prop to define the variant of MultiStackedBarChart to render
   */
  variant?: MultiStackedBarChartVariant;

  /**
   * Prop to hide the bar labels
   */
  hideLabels?: boolean;
}

/**
 * Multi Stacked Bar Chart styles
 * {@docCategory MultiStackedBarChart}
 */
export interface IMultiStackedBarChartStyles {
  /**
   * Styling for the root container
   */
  root: IStyle;

  /**
   * Styling for the root container of each chart in the multistacked bar chart
   */
  singleChartRoot: IStyle;

  /**
   * Styling for each item in the container
   */
  items: IStyle;

  /**
   * Styling for each svg in the multistacked bar chart
   */
  chart: IStyle;

  /**
   * Styling for chart title of the stacked bar chart
   */
  chartTitle: IStyle;

  /**
   * Style for left side text of the chart title
   */
  chartTitleLeft: IStyle;

  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover: IStyle;

  /**
   * Style for the chart ratio numerator
   */
  ratioNumerator: IStyle;

  /**
   * Style for the chart ratio denominator
   */
  ratioDenominator: IStyle;

  /**
   * Style to change the opacity of placeholder data point when we hover a single bar or legend
   */
  placeHolderOnHover: IStyle;

  /**
   * Style for the legends container
   */
  legendContainer: IStyle;

  /**
   * Style for stacked bar chart with no data
   */
  noData: IStyle;

  /**
   * Style for the bar labels
   */
  barLabel: IStyle;

  /**
   * Style for the div containing the chart
   */
  chartWrapper: IStyle;
}

/**
 * {@docCategory MultiStackedBarChart}
 */
export enum MultiStackedBarChartVariant {
  PartToWhole = 'part-to-whole',
  AbsoluteScale = 'absolute-scale',
}
