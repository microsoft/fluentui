import { IChartProps, IChartDataPoint } from './index';
import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { ICalloutProps } from '@fluentui/react/lib/Callout';
import { IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';

/**
 * Horizontal Bar Chart properties
 * {@docCategory HorizontalBarChart}
 */
export interface IHorizontalBarChartProps {
  /**
   * An array of chart data points for the Horizontal bar chart
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
   */
  hideRatio?: boolean[];

  /**
   * Do not show tooltips in chart
   *
   * @default false
   */
  hideTooltip?: boolean;

  /**
   * This property tells how to show data text on top right of bar chart.
   * If barChartCustomData props added, then this props will be overrided.
   * @default 'default'
   */
  chartDataMode?: ChartDataMode;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IHorizontalBarChartStyleProps, IHorizontalBarChartStyles>;

  /**
   * Define a custom callout renderer for a horizontal bar
   */
  onRenderCalloutPerHorizontalBar?: IRenderFunction<IChartDataPoint>;

  /**
   * props for the callout in the chart
   */
  calloutProps?: Partial<ICalloutProps>;

  /**
   * Custom text to the chart (right side of the chart)
   * IChartProps will be available as props to the method prop.
   * If this method not given, default values (IHorizontalDataPoint \{x,y\})
   * will be used to display the data/text based on given chartModeData prop.
   */
  barChartCustomData?: IRenderFunction<IChartProps>;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   * Prop to define the variant of HorizontalBarChart to render
   * @default HorizontalBarChartVariant.PartToWhole
   */
  variant?: HorizontalBarChartVariant;

  /**
   * Prop to hide the bar labels
   * @default false
   */
  hideLabels?: boolean;
}

/**
 * Horizontal Bar Chart style properties
 * {@docCategory HorizontalBarChart}
 */
export interface IHorizontalBarChartStyleProps {
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
  width: number | undefined;

  /**
   * line color for callout
   */
  color?: string;

  /**
   * Height of bar chart
   * @default 15
   */
  barHeight?: number;

  /**
   * prop to check if benchmark data is provided
   */
  showTriangle?: boolean;

  /**
   * Prop to define the variant of HorizontalBarChart to render
   */
  variant?: HorizontalBarChartVariant;

  /**
   * Prop to hide the bar labels
   */
  hideLabels?: boolean;
}

/**
 * Horizontal Bar Chart styles
 * {@docCategory HorizontalBarChart}
 */
export interface IHorizontalBarChartStyles {
  /**
   * Styling for the root container
   */
  root: IStyle;

  /**
   * Styling for each item in the container
   */
  items: IStyle;

  /**
   * Style for the chart.
   */
  chart: IStyle;

  /**
   * Style for the chart Title.
   */
  chartTitle: IStyle;

  /**
   * Style for the bars.
   */
  barWrapper: IStyle;

  /**
   * Style for left side text of the chart title
   */
  chartTitleLeft: IStyle;

  /**
   * Style for right side text of the chart title
   */
  chartTitleRight: IStyle;

  /**
   * Style for the chart data text denominator.
   */
  chartDataTextDenominator: IStyle;

  /**
   * Style for the benchmark container
   */
  benchmarkContainer: IStyle;

  /**
   * Style for the benchmark triangle
   */
  triangle: IStyle;

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
 * Chart data mode for chart data text
 * default: show the datapoint.x value
 * fraction: show the fraction of datapoint.x/datapoint.y
 * percentage: show the percentage of (datapoint.x/datapoint.y)%
 * {@docCategory HorizontalBarChart}
 */
export type ChartDataMode = 'default' | 'fraction' | 'percentage';

/**
 * {@docCategory HorizontalBarChart}
 */
export enum HorizontalBarChartVariant {
  PartToWhole = 'part-to-whole',
  AbsoluteScale = 'absolute-scale',
}
