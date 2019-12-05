import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IStackedBarChart {}
import { IChartProps, IChartDataPoint } from './index';

export interface IStackedBarChartProps {
  /**
   * Data to render in the chart.
   */
  data?: IChartProps;

  /**
   * Benchmark Data to render in the chart.
   */
  benchmarkData?: IChartDataPoint;

  /**
   * Target Data to render in the chart.
   */
  targetData?: IChartDataPoint;

  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of each bar in the chart.
   */
  barHeight?: number;

  /**
   * Do not show the legend at the bottom of chart
   * when there are more than two datapoints
   *
   * @default false
   */
  hideLegend?: boolean;

  /**
   * Do not show number/ratio on top of bar
   *
   * @default false
   */
  hideNumberDisplay?: boolean;

  /**
   * Additional CSS class(es) to apply to the StackedBarChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IStackedBarChartStyleProps, IStackedBarChartStyles>;

  /**
   * Color setting of bar background color, this will show while all data points value is 0
   */
  barBackgroundColor?: string;

  /**
   * Url that the data-viz needs to redirect to upon clicking on it
   */
  href?: string;

  /**
   * If this value is set, the fixed display pattern for less than 2 data points chart will be ignore
   */
  ignoreFixStyle?: boolean;

  /**
   * If this value is set to true the denominator will not be shown for the ratio above the chart
   */
  hideDenominator?: boolean;

  /**
   * Enable the legends to wrap lines if there is not enough space to show all legends on a single line
   */
  enabledLegendsWrapLines?: boolean;
}

export interface IStackedBarChartStyleProps {
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
   * Height of bar in the chart.
   */
  barHeight?: number;

  /**
   * prop to show data of the chart with appropriate legend color
   */
  legendColor?: string;

  /**
   * prop to check if the chart is selcted or hovered upon to determine opacity
   */
  shouldHighlight?: boolean;

  /**
   * prop to check which specific section of the stacked bar chart is selected or hovered upon
   */
  isChartSelected?: boolean;

  /**
   * prop to check to decide cursor type
   */
  href?: string;

  /**
   * the color for the benchmark triangle
   */
  benchmarkColor?: string;

  /**
   * the ratio position for the benchmark triangle
   */
  benchmarkRatio?: number;

  /**
   * the color for the target triangle
   */
  targetColor?: string;

  /**
   * the ratio position for the target triangle
   */
  targetRatio?: number;
}

export interface IStackedBarChartStyles {
  /**
   *  Style for the root element.
   */
  root: IStyle;

  /**
   * Style for the chart.
   */
  chart: IStyle;

  /**
   * Style for the chart Title.
   */
  chartTitle: IStyle;

  /**
   * Style for the legend container div
   */
  legendContainer: IStyle;

  /**
   * Style for the legend card title displayed in the hover card
   */
  hoverCardTextStyles: IStyle;

  /**
   * Style for the data displayed in the hover card
   */
  hoverCardDataStyles: IStyle;

  /**
   * Style for the root of the hover card
   */
  hoverCardRoot: IStyle;

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
   * Style for the benchmark container
   */
  benchmarkContainer: IStyle;

  /**
   * Style for the benchmark triangle
   */
  benchmark: IStyle;

  /**
   * Style for the target triangle
   */
  target: IStyle;
}
