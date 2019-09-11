import { IChartProps } from './index';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

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
   */
  hideRatio?: boolean[];

  /**
   * Do not show the legend at the bottom of chart
   *
   * @default false
   */
  hideLegend?: boolean;

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
   */
  hideDenominator?: boolean[];
}

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
}

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
}
