import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IDataPoint } from '../../types/IDataPoint';
import { IOverflowSetProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { IFocusZoneProps } from '@fluentui/react-focus';
import { ILegendsProps } from '../Legends/index';

export { IDataPoint, IVerticalBarChartDataPoint } from '../../types/IDataPoint';

export interface IVerticalBarChart {}

export interface IVerticalBarChartProps {
  /**
   * Data to render in the chart.
   */
  data?: IDataPoint[];

  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of the chart.
   */
  height?: number;

  /**
   * Width of each bar in the chart.
   */
  barWidth?: number;

  /**
   * Number of ticks on the y-axis.
   */
  yAxisTickCount?: number;

  /**
   * Colors from which to select the color of each bar.
   */
  colors?: string[];

  /**
   * Label to apply to the whole chart.
   */
  chartLabel?: string;

  /**
   * Additional CSS class(es) to apply to the VerticalBarChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IVerticalBarChartStyleProps, IVerticalBarChartStyles>;

  /**
   * Enable the legends to wrap lines if there is not enough space to show all legends on a single line
   */
  enabledLegendsWrapLines?: boolean;

  /**
   * overflow props for the legends
   */
  legendsOverflowProps?: Partial<IOverflowSetProps>;

  /**
   * focus zone props in hover card for legends
   */
  focusZonePropsForLegendsInHoverCard?: IFocusZoneProps;

  /**
   * text for overflow legends string
   */
  legendsOverflowText?: string;

  /**
   * decides wether to show/hide legends
   * @defaultvalue false
   */
  hideLegend?: boolean;

  /**
   * Do not show tooltips in chart
   *
   * @default false
   */
  hideTooltip?: boolean;

  /**
   * this prop takes its parent as a HTML element to define the width and height of the line chart
   */
  parentRef?: HTMLElement | null;

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

  /**
   * @default 5
   * tickPadding - used for space between x line and tick valeus
   */
  XAxistickPadding?: number;
  /*
   * props for the legends in the chart
   */
  legendProps?: Partial<ILegendsProps>;
}

export interface IVerticalBarChartStyleProps {
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
   * Height of the chart.
   */
  height?: number;

  /**
   * color of the datapoint legend
   */
  legendColor?: string;

  /**
   * Link to redirect if click action for graph
   */
  href?: string;

  /**
   * prop to check if the chart is selcted or hovered upon to determine opacity
   */
  shouldHighlight?: boolean;
}

export interface IVerticalBarChartStyles {
  /**
   *  Style for the root element.
   */
  root?: IStyle;

  /**
   * Style for the chart label.
   */
  chartLabel?: IStyle;

  /**
   * Style for the element containing the x-axis.
   */
  xAxis?: IStyle;

  /**
   * Style for the line representing the domain of the x-axis.
   */
  xAxisDomain?: IStyle;

  /**
   * Style for the lines representing the ticks along the x-axis.
   */
  xAxisTicks?: IStyle;

  /**
   * Style for the text labeling each tick along the x-axis.
   */
  xAxisText?: IStyle;

  /**
   * Style for the element containing the y-axis.
   */
  yAxis?: IStyle;

  /**
   * Style for the line representing the domain of the y-axis.
   */
  yAxisDomain?: IStyle;

  /**
   * Style for the lines representing the ticks along the y-axis.
   */
  yAxisTicks?: IStyle;

  /**
   * Style for the text labeling each tick along the y-axis.
   */
  yAxisText?: IStyle;

  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover: IStyle;

  /**
   * Style for the legends container
   */
  legendContainer?: IStyle;

  /**
   * Style for tick values tooltip
   */
  tooltip: IStyle;
}
