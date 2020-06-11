import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IOverflowSetProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { IFocusZoneProps } from '@fluentui/react-focus';
import { IAreaChartData } from '../../types/index';

export interface IAreaChartProps {
  /**
   * Chart title for title of the chart
   */
  chartTitle?: string;

  /**
   * Data to render in the chart.
   */
  data: IAreaChartData;

  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of the chart.
   */
  height?: number;

  /**
   * Additional CSS class(es) to apply to the AreaChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IAreaChartStyleProps, IAreaChartStyles>;

  /**
   * Width of line stroke
   */
  strokeWidth?: number;

  /**
   * Number of ticks on the y-axis.
   * This is a optional parameter and default value is 5.
   * @default 4
   */
  yAxisTickCount?: number;

  /**
   * This prop used to draw X axis grid line on tha chart.
   * @default false
   */
  showXAxisGridLines?: boolean;

  /**
   * This prop used to draw Y axis grid lines on the chart.
   * @default false
   */
  showYAxisGridLines?: boolean;

  /**
   * This prop takes the boolean value and used for to display x-axis path or transparent.
   * This is a optional prop and default value is false. It dont show X-Axis path as tranparent.
   *@default false
   */
  showXAxisPath?: boolean;

  /**
   * This prop takes the boolean value and used for to display y-axis path or transparent.
   * This is a optional prop and default value is false. It dont show X-Axis path as tranparent.
   * @default false
   */
  showYAxisPath?: boolean;

  /**
   * This prop used for to check is given x axis date or numeric.
   * @default false;
   */
  isXAxisDateType?: boolean;

  /**
   * this prop takes values that you want the Area chart to render on x-axis
   * This is a optional parameter if not specified D3 will decide which values appear on the x-axis for you
   * Please look at https://github.com/d3/d3-scale for more information on how D3 decides what data to appear on the axis of chart
   */
  tickValues?: number[] | Date[];

  /**
   * minimum  data value point in y-axis
   */
  yMinValue?: number; // ?

  /**
   * maximum data value point in y-axis
   */
  yMaxValue?: number; // ?

  /**
   * the format in for the data on x-axis. For date object this can be specified to your requirement. Eg: '%m/%d', '%d'
   * Please look at https://www.npmjs.com/package/d3-time-format for all the formats supported
   */
  tickFormat?: string;

  /**
   * this prop takes its parent as a HTML element to define the width and height of the line chart
   */
  parentRef?: HTMLElement | null;

  /**
   * Enable the legends to wrap lines if there is not enough space to show all legends on a single line
   */
  enabledLegendsWrapLines?: boolean;

  /**
   * overflow props for the legends
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
   * the format in for the data on y-axis. For data object this can be specified to your requirement.
   *  Eg: d3.format(".0%")(0.123),d3.format("+20")(42);
   * Please look at https://github.com/d3/d3-format for all the formats supported
   */
  // tslint:disable-next-line: no-any
  yAxisTickFormat?: any;

  /** decides wether to show/hide legends
   * @defaultvalue false
   */
  hideLegend?: boolean;

  /**
   * Do not show tooltips in chart
   *
   * @default false
   */
  hideTooltip?: boolean;
}

export interface IAreaChartStyleProps {
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
   * Prop to display or transparent of x-axis path
   */
  showXAxisPath?: boolean;

  /**
   * Prop to display or transparent of y-axis path
   */
  showYAxisPath?: boolean;
}

export interface IAreaChartStyles {
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
   * Style for legend container
   */
  legendContainer?: IStyle;

  /**
   * Style for the root of the hover card
   */
  hoverCardRoot: IStyle;

  /**
   * Style for the legend card title displayed in the hover card
   */
  hoverCardTextStyles: IStyle;

  /**
   * Style for the data displayed in the hover card
   */
  hoverCardDataStyles?: IStyle;

  /**
   * line hover box css
   */
  hover?: IStyle;

  /**
   * styles for callout root-content
   */
  calloutContentRoot?: IStyle;

  /**
   * styles for callout x-content
   */
  calloutContentX?: IStyle;

  /**
   * styles for callout y-content
   */
  calloutContentY?: IStyle;
}
