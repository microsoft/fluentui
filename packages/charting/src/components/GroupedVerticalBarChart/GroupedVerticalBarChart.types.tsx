import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IOverflowSetProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { IFocusZoneProps } from '@fluentui/react-focus';
import { IGroupedVerticalBarChartData } from '../../types/index';

export interface IGroupedVerticalBarChartProps {
  /**
   * Data to render in the chart.
   */
  data: IGroupedVerticalBarChartData[];

  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of the chart.
   */
  height?: number;

  /**
   * Barwidth automacally adjusted based upon given parent width, data and scale.
   * If barwidth given through prop, then is shold be less than given formula.
   * If not, graph will adjust and your value may not be reflected.
   * Formula: width of parent div / (Number Of Groups * (Number Of single bars in group + 2))
   * Note: By changing barwidth manually it may cause some spatial and graph override issues,
   * better to avoid using this prop.
   */
  barwidth?: number;

  /**
   * Number of ticks on the y-axis.
   * This is a optional parameter and default value is 5.
   */
  yAxisTickCount?: number;

  /**
   * This prop used to draw X axis grid line on tha chart. Default value will be false
   */
  showXAxisGridLines?: boolean;

  /**
   * This prop used to draw Y axis grid lines on the chart. Default value will be false
   */
  showYAxisGridLines?: boolean;

  /**
   * Additional CSS class(es) to apply to the VerticalStackedBarChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IGroupedVerticalBarChartStyleProps, IGroupedVerticalBarChartStyles>;

  /**
   * this prop takes its parent as a HTML element to define the width and height of the line chart
   */
  parentRef?: HTMLElement | null;

  /**
   * This prop takes the boolean value and used for to display x-axis path or transparent.
   * This is a optional prop and default value is false. It dont show X-Axis path as tranparent.
   *
   */
  showXAxisPath?: boolean;

  /**
   * This prop takes the boolean value and used for to display y-axis path or transparent.
   * This is a optional prop and default value is false. It dont show X-Axis path as tranparent.
   */
  showYAxisPath?: boolean;

  /**
   * Url that the data-viz needs to redirect to upon clicking on it
   */
  href?: string;

  /**
   * overflow props for the legends
   */
  legendsOverflowProps?: Partial<IOverflowSetProps>;

  /**
   * focus zone props in hover card for legends
   */
  focusZonePropsForLegendsInHoverCard?: IFocusZoneProps;

  /**
   * Enable the legends to wrap lines if there is not enough space to show all legends on a single line
   */
  enabledLegendsWrapLines?: boolean;

  /**
   * color of the datapoint legend
   */
  legendColor?: string;

  /**
   * Do not show tooltips in chart
   *
   * @default false
   */
  hideTooltip?: boolean;

  /**
   * x Axis labels tick padding
   * @default 10
   */
  xAxisTickPadding?: number;

  /**
   *@default false
   *Used for to elipse x axis labes and show tooltip on x axis labels
   */
  showXAxisLablesTooltip?: boolean;

  /**
   * @default 4
   * Used for X axis labels
   * While Giving showXAxisLablesTooltip prop, need to define after how many chars, we need to truncate the word.
   */
  noOfCharsToTruncate?: number;

  /**
   * @default false
   * Used to display x axis labels values (whole value)
   */
  wrapXAxisLables?: boolean;
}

export interface IGroupedVerticalBarChartStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;

  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of the chart.
   */
  height?: number;

  /**
   * Additional CSS class(es) to apply to the StackedBarChart.
   */
  className?: string;

  /**
   * Link to redirect if click action for graph
   */
  href?: string;

  /**
   * color of the datapoint legend
   */
  legendColor?: string;

  /**
   * Prop to display or transparent of x-axis path
   */
  showXAxisPath?: boolean;

  /**
   * Prop to display or transparent of y-axis path
   */
  showYAxisPath?: boolean;
}

export interface IGroupedVerticalBarChartStyles {
  /**
   *  Style for the root element.
   */
  root?: IStyle;

  /**
   * Style for the element containing the x-axis.
   */
  xAxis?: IStyle;

  /**
   * Style for the element containing the y-axis.
   */
  yAxis?: IStyle;

  /**
   * Style for the legends container
   */
  legendContainer?: IStyle;

  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover: IStyle;

  tooltip: IStyle;
}
