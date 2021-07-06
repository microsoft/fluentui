import * as React from 'react';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { ITheme, IStyle } from '@fluentui/react/lib/Styling';
import { IOverflowSetProps } from '@fluentui/react/lib/OverflowSet';
import { IFocusZoneProps, FocusZoneDirection } from '@fluentui/react-focus';
import { ICalloutProps } from '@fluentui/react/lib/Callout';
import { ILegendsProps } from '../Legends/index';
import { IMargins } from '../../types/index';
import { ChartTypes, IChartHoverCardProps, XAxisTypes, YAxisType } from '../../utilities/index';

export interface ICartesianChartStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;

  /**
   * Additional CSS class(es) to apply to the Chart.
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
   * Color of the chart.
   */
  color?: string;

  /**
   * Link to redirect if click action for graph
   */
  href?: string;

  /**
   * prop to check if the chart is selcted or hovered upon to determine opacity
   */
  shouldHighlight?: boolean;

  /**
   * prop to check if the Page is in Rtl
   */
  isRtl?: boolean;

  /**
   * color of the line
   */
  lineColor?: string;

  /**
   * boolean flag which determines if shape is drawn in callout
   */
  toDrawShape?: boolean;
}

export interface ICartesianChartStyles {
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

  /**
   * styles for description message
   */
  descriptionMessage?: IStyle;

  /**
   * styles for callout Date time container
   */
  calloutDateTimeContainer?: IStyle;

  /**
   * styles for callout Date time container
   */
  calloutInfoContainer?: IStyle;

  /**
   * styles for callout Date time container
   */
  calloutBlockContainer?: IStyle;

  /**
   * styles for callout y-content
   */
  calloutlegendText?: IStyle;

  tooltip?: IStyle;

  /**
   * Style for the chart Title.
   */
  chartTitle?: IStyle;

  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover?: IStyle;

  /**
   * styles set for the shape object in the callout
   */
  shapeStyles?: IStyle;
}

export interface ICartesianChartProps {
  /**
   * Below height used for resizing of the chart
   * Wrap chart in your container and send the updated height and width to these props.
   * These values decide wheather chart re render or not. Please check examples for reference
   */
  height?: number;

  /**
   * Below width used for resizing of the chart
   * Wrap chart in your container and send the updated height and width to these props.
   * These values decide wheather chart re render or not. Please check examples for reference
   */
  width?: number;

  /**
   * this prop takes its parent as a HTML element to define the width and height of the chart
   */
  parentRef?: HTMLElement | null;

  /**
   * Additional CSS class(es) to apply to the Chart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Margins for the chart
   * @default `{ top: 20, bottom: 35, left: 40, right: 20 }`
   * To avoid edge cuttings to the chart, we recommend you use default values or greater then default values
   */
  margins?: IMargins;

  /** decides wether to show/hide legends
   * @defaultvalue false
   */
  hideLegend?: boolean;

  /**
   * Do not show tooltips in chart
   * @default false
   */
  hideTooltip?: boolean;

  /**
   * this prop takes values that you want the chart to render on x-axis
   * This is a optional parameter if not specified D3 will decide which values appear on the x-axis for you
   * Please look at https://github.com/d3/d3-scale for more information on how D3 decides what data to appear on the axis of chart
   */
  tickValues?: number[] | Date[];

  /**
   * the format in for the data on x-axis. For date object this can be specified to your requirement. Eg: '%m/%d', '%d'
   * Please look at https://www.npmjs.com/package/d3-time-format for all the formats supported
   */
  tickFormat?: string;

  /**
   * Width of line stroke
   */
  strokeWidth?: number;

  /**
   * x Axis labels tick padding
   * @default 10
   */
  xAxisTickPadding?: number;

  /**
   * the format in for the data on y-axis. For data object this can be specified to your requirement.
   *  Eg: d3.format(".0%")(0.123),d3.format("+20")(42);
   * Please look at https://github.com/d3/d3-format for all the formats supported
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yAxisTickFormat?: any;

  /**
   * minimum  data value point in y-axis
   */
  yMinValue?: number;

  /**
   * maximum data value point in y-axis
   */
  yMaxValue?: number;

  /**
   * Number of ticks on the y-axis.
   * Tick count should be factor of difference between (yMinValue, yMaxValue)
   * @default 4
   */
  yAxisTickCount?: number;

  /**
   * defines the number of ticks on the x-axis
   * @default 6
   */
  xAxisTickCount?: number;

  /**
   * define the size of the tick on the x-axis
   * @default 10
   */
  xAxistickSize?: number;

  /**
   * define the space between the tick and the data point
   * @default 10
   */
  tickPadding?: number;

  /**
   * Url that the data-viz needs to redirect to upon clicking on it
   */
  href?: string;

  /**
   * Label to apply to the whole chart.
   * @deprecated - Use your chart label for the chart.
   */
  chartLabel?: string;

  /**
   * overflow props for the legends
   */
  legendsOverflowProps?: Partial<IOverflowSetProps>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legendsOverflowText?: any;

  /**
   * focus zone props in hover card for legends
   */
  focusZonePropsForLegendsInHoverCard?: IFocusZoneProps;

  /**
   * Enable the legends to wrap lines if there is not enough space to show all legends on a single line
   */
  enabledLegendsWrapLines?: boolean;

  /*
   * props for the legends in the chart
   */
  legendProps?: Partial<ILegendsProps>;

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
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ICartesianChartStyleProps, ICartesianChartStyles>;

  /**
   * Callout customization props
   */
  calloutProps?: Partial<ICalloutProps>;

  /**
   * props for the svg; use this to include aria-* or other attributes on the tag
   */
  svgProps?: React.SVGProps<SVGSVGElement>;
}

export interface IYValueHover {
  legend?: string;
  y?: number;
  color?: string;
  data?: string | number;
  shouldDrawBorderBottom?: boolean;
  yAxisCalloutData?: string | { [id: string]: number };
  index?: number;
}

export interface IChildProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xScale?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yScale?: any;
  containerHeight?: number;
  containerWidth?: number;
}

// Only used for Cartesian chart base
export interface IModifiedCartesianChartProps extends ICartesianChartProps {
  /**
   * Only used for Area chart
   * Value used to draw y axis of that chart.
   */
  maxOfYVal?: number;

  /**
   * Data of the chart
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  points: any;

  /**
   * Define type of the chart
   */
  chartType: ChartTypes;

  /** X axis type */
  xAxisType: XAxisTypes;

  /** Y axis type */
  yAxisType?: YAxisType;

  /**
   * Legeds of the chart.
   */
  legendBars: JSX.Element;

  /**
   * Callout props
   */
  calloutProps: Partial<ICalloutProps> & {
    isCalloutVisible: boolean;
    id: string;
    YValueHover?: IYValueHover[];
    hoverXValue?: string | number | null;
    legend?: string;
    color?: string;
    YValue?: string | number;
    XValue?: string;
    descriptionMessage?: string;
  };

  /**
   * Callback method used for to get margins to the chart.
   */
  getmargins?: (margins: IMargins) => void;

  /**
   * This is a call back method to the chart from cartesian chart.
   * params are xScale, yScale, containerHeight, containerWidth. These values were used to draw the graph.
   * It also contians an optional param xAxisElement - defines as x axis scale element.
   * This param used to enable feature word wrap of Xaxis.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getGraphData?: any;

  /**
   * Used for bar chart graphs.
   * To define width of the bar
   */
  barwidth?: number;

  /**
   * Used for tick styles of the x axis of the chart
   */
  tickParams?: {
    tickValues?: number[] | Date[];
    tickFormat?: string;
  };

  /**
   * it's padding between bar's or lines in the graph
   */
  xAxisPadding?: number;

  /**
   * it's padding between bar's or lines in the graph
   */
  yAxisPadding?: number;

  children(props: IChildProps): React.ReactNode;

  /**
   * To enable callout for bar. Using for only Vertical stacked bar chart.
   * @default false
   * @type {boolean}
   */
  isCalloutForStack?: boolean;

  /** dataset values to find out domain of the String axis
   * Present using for only vertical stacked bar chart and grouped vertical bar chart
   */
  datasetForXAxisDomain?: string[];

  /** Own callout design */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customizedCallout?: any;

  /**
   * if the data points for the y-axis is of type string, then we need to give this
   * prop to construct the y-axis
   */
  stringDatasetForYAxisDomain?: string[];

  /**
   * Focus zone direction to the chart
   * @default FocusZoneDirection.horizontal
   */
  focusZoneDirection?: FocusZoneDirection;

  /**
   * props to send into the chart hover card
   */
  chartHoverProps?: IChartHoverCardProps;

  /**
   * props to send to the focuszone
   */
  svgFocusZoneProps?: IFocusZoneProps;
}
