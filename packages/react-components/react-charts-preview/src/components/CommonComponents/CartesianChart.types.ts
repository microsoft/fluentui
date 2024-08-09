import * as React from 'react';
import { IOverflowSetProps } from '@fluentui/react/lib/OverflowSet';
import { IFocusZoneProps, FocusZoneDirection } from '@fluentui/react-focus';
import { ILegendsProps } from '../Legends/index';
import { IAccessibilityProps, IMargins } from '../../types/index';
import { ChartTypes, IChartHoverCardProps, XAxisTypes, YAxisType } from '../../utilities/index';
import { TimeLocaleDefinition } from 'd3-time-format';
import { IPopoverComponentProps } from './Popover.types';
/**
 * Cartesian Chart style properties
 * {@docCategory CartesianChart}
 */
export interface ICartesianChartStyleProps {
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
   * prop to check if the chart is selected or hovered upon to determine opacity
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

/**
 * Cartesian Chart styles
 * {@docCategory CartesianChart}
 */
export interface ICartesianChartStyles {
  /**
   *  Style for the root element.
   */
  root?: string;

  /**
   * Style for the element containing the x-axis.
   */
  xAxis?: string;

  /**
   * Style for the element containing the y-axis.
   */
  yAxis?: string;

  /**
   * Style for legend container
   */
  legendContainer?: string;

  /**
   * line hover box css
   */
  hover?: string;

  /**
   * styles for callout root-content
   */
  calloutContentRoot?: string;

  /**
   * styles for callout x-content
   */
  calloutContentX?: string;

  /**
   * styles for callout y-content
   */
  calloutContentY?: string;

  /**
   * styles for description message
   */
  descriptionMessage?: string;

  /**
   * styles for callout Date time container
   */
  calloutDateTimeContainer?: string;

  /**
   * styles for callout info container
   */
  calloutInfoContainer?: string;

  /**
   * styles for callout block container
   */
  calloutBlockContainer?: string;

  /**
   * Styles for callout block container when toDrawShape is false
   */
  calloutBlockContainertoDrawShapefalse?: string;

  /**
   * Styles for callout block container when toDrawShape is true
   */
  calloutBlockContainertoDrawShapetrue?: string;

  /**
   * styles for callout legend text
   */
  calloutlegendText?: string;

  /**
   * styles for tooltip
   */
  tooltip?: string;

  /**
   * styles for tooltip
   */
  axisTitle?: string;

  /**
   * Style for the chart Title.
   */
  chartTitle?: string;

  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover?: string;

  /**
   * styles for the shape object in the callout
   */
  shapeStyles?: string;

  /**
   * Styles for the chart wrapper div
   */
  chartWrapper?: string;
}

/**
 * Cartesian Chart properties
 * {@docCategory CartesianChart}
 */
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
   * the format for the data on x-axis. For date object this can be specified to your requirement. Eg: '%m/%d', '%d'
   * Please look at https://github.com/d3/d3-time-format for all the formats supported for date axis
   * Only applicable for date axis. For y-axis format use yAxisTickFormat prop.
   */
  tickFormat?: string;

  /**
   * Width of line stroke
   */
  strokeWidth?: number;

  /**
   * x Axis labels tick padding. This defines the gap between tick labels and tick lines.
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
   * Secondary y-scale options
   * By default this is not defined, meaning there will be no secondary y-scale.
   */
  secondaryYScaleOptions?: {
    /** Minimum value (0 by default) */
    yMinValue?: number;
    /** Maximum value (100 by default) */
    yMaxValue?: number;
  };

  /**
   * minimum  data value point in y-axis
   */
  yMinValue?: number;

  /**
   * maximum data value point in y-axis
   */
  yMaxValue?: number;

  /**
   * maximum data value point in x-axis
   */
  xMaxValue?: number;

  /**
   * Number of ticks on the y-axis.
   * Tick count should be factor of difference between (yMinValue, yMaxValue)?
   * @default 4
   */
  yAxisTickCount?: number;

  /**
   * defines the number of ticks on the x-axis. Tries to match the nearest interval satisfying the count.
   * Does not work for string axis.
   * @default 6
   */
  xAxisTickCount?: number;

  /**
   * define the size of the tick lines on the x-axis
   * @default 10
   */
  xAxistickSize?: number;

  /**
   * defines the space between the tick line and the data label
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
   * Used to wrap x axis labels values (whole value)
   */
  wrapXAxisLables?: boolean;

  /**
   * @default false
   * Used to rotate x axis labels by 45 degrees
   */
  rotateXAxisLables?: boolean;

  /**
   * The prop used to define the date time localization options
   */
  dateLocalizeOptions?: Intl.DateTimeFormatOptions;

  /**
   * The prop used to define a custom locale for the date time format.
   */
  timeFormatLocale?: TimeLocaleDefinition;

  /**
   * The prop used to define a custom datetime formatter for date axis.
   */
  customDateTimeFormatter?: (dateTime: Date) => string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: ICartesianChartStyles;

  /**
   * Callout customization props
   */
  calloutProps: Partial<IPopoverComponentProps>;

  /**
   * props for the svg; use this to include aria-* or other attributes on the tag
   */
  svgProps?: React.SVGProps<SVGSVGElement>;

  /**
   * Prop to disable shrinking of the chart beyond a certain limit and enable scrolling when the chart overflows
   * @default True for LineChart but False for other charts
   */
  enableReflow?: boolean;

  /**
   * Prop to set the x axis title
   * @default undefined
   * Minimum bottom margin required for x axis title is 55px
   */

  xAxisTitle?: string;

  /**
   * Prop to set the y axis title
   * @default undefined
   * Minimum left margin required for y axis title is 60px and for RTL is 40px
   * Minimum right margin required for y axis title is 40px and for RTL is 60px
   */
  yAxisTitle?: string;

  /**
   * Prop to set the secondary y axis title
   * @default undefined
   * If RTL is enabled, minimum left and right margins required for secondary y axis title is 60px
   */
  secondaryYAxistitle?: string;
}

export interface IYValueHover {
  legend?: string;
  y?: number;
  color?: string;
  data?: string | number;
  shouldDrawBorderBottom?: boolean;
  yAxisCalloutData?: string | { [id: string]: number };
  index?: number;
  callOutAccessibilityData?: IAccessibilityProps;
}

export interface IChildProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xScale?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yScale?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yScaleSecondary?: any;
  containerHeight?: number;
  containerWidth?: number;
  optimizeLargeData?: boolean;
}

// Only used for Cartesian chart base
export interface IModifiedCartesianChartProps extends ICartesianChartProps {
  /**
   * Define the chart title
   */
  chartTitle?: string;

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
   * Legends of the chart.
   */
  legendBars: JSX.Element | null;

  /**
   * Callout props
   */
  calloutProps: Partial<IPopoverComponentProps> & {
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
   * Tick params are applicable for date axis only.
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

  /**
   * Children elements specific to derived chart types.
   */
  children(props: IChildProps): React.ReactNode;

  /**
   * To enable callout for individualbar or complete stack. Using for only Vertical stacked bar chart.
   * @default false
   * @type \{boolean \}
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

  /**
   * The prop used to define the culture to localize the numbers and date
   */
  culture?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAxisData?: any;

  /**
   * Callback method used when mouse leaves the chart boundary.
   */
  onChartMouseLeave?: () => void;

  /** Callback method to get extra margins for domain */
  getDomainMargins?: (containerWidth: number) => IMargins;

  /** Padding between each bar/line-point */
  xAxisInnerPadding?: number;

  /** Padding before first bar/line-point and after last bar/line-point */
  xAxisOuterPadding?: number;

  /**
   *@default false
   *Used for to elipse y axis labes and show tooltip on x axis labels
   */
  showYAxisLablesTooltip?: boolean;

  /**
   *@default false
   *Used for showing complete y axis lables   */
  showYAxisLables?: boolean;

  /**
   * @default false
   * Used to control the first render cycle Performance optimization code.
   */
  enableFirstRenderOptimization?: boolean;
}
