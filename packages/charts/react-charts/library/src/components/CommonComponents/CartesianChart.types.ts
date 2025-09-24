import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { LegendsProps } from '../Legends/index';
import {
  AccessibilityProps,
  Chart,
  Margins,
  DataPoint,
  HorizontalBarChartWithAxisDataPoint,
  GroupedVerticalBarChartData,
  HeatMapChartDataPoint,
  LineChartPoints,
  VerticalBarChartDataPoint,
  VerticalStackedBarDataPoint,
  ScatterChartPoints,
  GanttChartDataPoint,
  AxisCategoryOrder,
  AxisProps,
  AxisScaleType,
} from '../../types/index';
import { TimeLocaleDefinition } from 'd3-time-format';
import { ChartPopoverProps } from './ChartPopover.types';
import { ChartTypes, IAxisData, IDomainNRange, IYAxisParams, XAxisTypes, YAxisType } from '../../utilities/utilities';
import { ScaleBand, ScaleLinear } from 'd3-scale';
/**
 * Cartesian Chart style properties
 * {@docCategory CartesianChart}
 */
export interface CartesianChartStyleProps {
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
  useRtl?: boolean;

  /**
   * color of the line
   */
  lineColor?: string;

  /**
   * boolean flag which determines if shape is drawn in callout
   */
  toDrawShape?: boolean;

  /**
   * Prop to disable shrinking of the chart beyond a certain limit and enable scrolling when the chart overflows
   * @deprecated Use `reflowProps` instead.
   */
  enableReflow?: boolean;
}

/**
 * Cartesian Chart styles
 * {@docCategory CartesianChart}
 */
export interface CartesianChartStyles {
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
   * styles for description message
   */
  descriptionMessage?: string;

  /**
   * styles for tooltip
   */
  tooltip?: string;

  /**
   * styles for axis title
   */
  axisTitle?: string;

  /**
   * styles for axis annotation
   */
  axisAnnotation?: string;

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

  /**
   * Styles for the svg tooltip
   */
  svgTooltip?: string;

  /**
   * Styles for the chart svg element
   */
  chart?: string;
}

/**
 * Cartesian Chart properties
 * {@docCategory CartesianChart}
 */
export interface CartesianChartProps {
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
  margins?: Margins;

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
  tickValues?: number[] | Date[] | string[] | undefined;

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legendsOverflowText?: any;

  /**
   * Enable the legends to wrap lines if there is not enough space to show all legends on a single line
   */
  enabledLegendsWrapLines?: boolean;

  /*
   * props for the legends in the chart
   */
  legendProps?: Partial<LegendsProps>;

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
  styles?: CartesianChartStyles;

  /**
   * Callout customization props
   */
  calloutProps?: Partial<ChartPopoverProps>;

  /**
   * props for the svg; use this to include aria-* or other attributes on the tag
   */
  svgProps?: React.SVGProps<SVGSVGElement>;

  /**
   * Prop to disable shrinking of the chart beyond a certain limit and enable scrolling when the chart overflows
   * @deprecated Use `reflowProps` instead.
   */
  enableReflow?: boolean;

  /**
   * Props related to reflow behavior of the chart
   */
  reflowProps?: {
    /**
     * Determines the reflow behavior of the chart.
     * When set to `'min-width'`, the chart will not shrink below a certain width and will enable scrolling if it overflows.
     * @default 'none'
     */
    mode: 'none' | 'min-width';
  };

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

  /**
   * Whether to use UTC time for axis scale, ticks, and the time display in callouts.
   * When set to `true`, time is displayed equally, regardless of the user's timezone settings.
   * @default true
   */
  useUTC?: string | boolean;

  /**
   * @default false
   * The prop used to decide rounded ticks on y axis
   */
  roundedTicks?: boolean;

  /**
   * Determines whether overlapping x-axis tick labels should be hidden.
   * @default true
   */
  hideTickOverlap?: boolean;

  /**
   * Define a custom callout props override
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calloutPropsPerDataPoint?: (dataPointCalloutProps: any) => ChartPopoverProps;

  /**
   * Optional callback to access the Chart interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.RefObject<Chart>;

  /**
   * Prop to set the x axis annotation. Used to display additional information on the x-axis.
   * This is shown on the top of the chart.
   * @default undefined
   */
  xAxisAnnotation?: string;

  /**
   * Prop to set the y axis annotation. Used to display additional information on the y-axis.
   * This is shown on the right side of the chart. Not shown if secondary y-axis is enabled.
   * @default undefined
   */
  yAxisAnnotation?: string;

  /**
   * Specifies the ordering logic for categories (or string tick labels) on the x-axis.
   * @default 'default'
   */
  xAxisCategoryOrder?: AxisCategoryOrder;

  /**
   * Specifies the ordering logic for categories (or string tick labels) on the y-axis.
   * @default 'default'
   */
  yAxisCategoryOrder?: AxisCategoryOrder;

  /**
   * Defines the scale type for the x-axis.
   * @default 'default'
   */
  xScaleType?: AxisScaleType;

  /**
   * Defines the scale type for the primary y-axis.
   * @default 'default'
   */
  yScaleType?: AxisScaleType;

  /**
   * Defines the scale type for the secondary y-axis.
   * @default 'default'
   */
  secondaryYScaleType?: AxisScaleType;

  /**
   * Explicit set of tick values for the y-axis.
   * If provided, these values override automatic tick generation.
   */
  yAxisTickValues?: number[] | Date[] | string[];

  /**
   * Configuration for the x-axis.
   * Use this to control `tickStep`, `tick0`, etc.
   */
  xAxis?: AxisProps;

  /**
   * Configuration for the y-axis.
   * Use this to control `tickStep`, `tick0`, etc.
   */
  yAxis?: AxisProps;
}

export interface YValueHover {
  legend?: string;
  y?: number | string;
  color?: string;
  data?: string | number;
  shouldDrawBorderBottom?: boolean;
  yAxisCalloutData?: string | { [id: string]: number };
  index?: number;
  callOutAccessibilityData?: AccessibilityProps;
}

export interface ChildProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xScale?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yScalePrimary?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yScaleSecondary?: any;
  containerHeight?: number;
  containerWidth?: number;
  optimizeLargeData?: boolean;
}

// Only used for Cartesian chart base
export interface ModifiedCartesianChartProps extends CartesianChartProps {
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
  legendBars: JSXElement | null;

  /**
   * Callout props
   */
  calloutProps?: ChartPopoverProps;

  /**
   * Callback method used for to get margins to the chart.
   */
  getmargins?: (margins: Margins) => void;

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
    tickValues?: number[] | Date[] | string[];
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
  children(props: ChildProps): React.ReactNode;

  /**
   * To enable callout for individual bar or complete stack. Using for only Vertical stacked bar chart.
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
  getDomainMargins?: (containerWidth: number) => Margins;

  /** Callback method to get extra margins for Y-axis domain */
  getYDomainMargins?: (containerHeight: number) => Margins;

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

  /**
   * Get the min and max values of the y-axis
   */
  getMinMaxOfYAxis: (
    points:
      | LineChartPoints[]
      | HorizontalBarChartWithAxisDataPoint[]
      | VerticalBarChartDataPoint[]
      | DataPoint[]
      | ScatterChartPoints[]
      | GanttChartDataPoint[],
    yAxisType: YAxisType | undefined,
    useSecondaryYScale?: boolean,
  ) => { startValue: number; endValue: number };

  /**
   * Create the y-axis
   */
  createYAxis: (
    yAxisParams: IYAxisParams,
    isRtl: boolean,
    axisData: IAxisData,
    isIntegralDataset: boolean,
    chartType: ChartTypes,
    useSecondaryYScale?: boolean,
    roundedTicks?: boolean,
    scaleType?: AxisScaleType,
    _useRtl?: boolean,
  ) => ScaleLinear<number, number, never>;

  /**
   * Get the domain and range values
   */
  getDomainNRangeValues: (
    points:
      | LineChartPoints[]
      | VerticalBarChartDataPoint[]
      | VerticalStackedBarDataPoint[]
      | HorizontalBarChartWithAxisDataPoint[]
      | GroupedVerticalBarChartData[]
      | HeatMapChartDataPoint[]
      | GanttChartDataPoint[],
    margins: Margins,
    width: number,
    chartType: ChartTypes,
    isRTL: boolean,
    xAxisType: XAxisTypes,
    barWidth: number,
    tickValues: Date[] | number[] | string[] | undefined,
    shiftX: number,
  ) => IDomainNRange;

  /**
   * Create the string y-axis
   */
  createStringYAxis: (
    yAxisParams: IYAxisParams,
    dataPoints: string[],
    isRtl: boolean,
    barWidth: number | undefined,
    chartType?: ChartTypes,
  ) => ScaleBand<string>;

  /**
   * Controls whether the numeric x-axis domain should be extended to start and end at nice rounded values.
   * @default true
   */
  showRoundOffXTickValues?: boolean;
}
