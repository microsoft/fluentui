import * as React from 'react';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IOverflowSetProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { IFocusZoneProps } from '@fluentui/react-focus';
import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { ILegendsProps } from '../Legends/index';
import { IMargins, IDataPoint } from '../../types/index';
import { ChartTypes, XAxisTypes } from '../../utilities/index';

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
}

export interface ICartesianChartProps {
  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of the chart.
   */
  height?: number;

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
   * Url that the data-viz needs to redirect to upon clicking on it
   */
  href?: string;

  /**
   * Label to apply to the whole chart.
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
}

export interface IYValueHover {
  legend?: string;
  y?: number;
  color?: string;
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
  maxOfYVal?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  points: any;
  chartType: ChartTypes;
  getmargins: (margins: IMargins) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getGraphData?: any;
  legendBars: JSX.Element;
  /**
   * Only using in area chart, as it won't re render after every change
   * Used for to check re render of the graph or not.
   * @memberof IModifiedCartesianChartProps
   */
  getRerenderProp?: (isReRender: boolean) => void;
  barwidth?: number;
  tickParams?: {
    tickValues?: number[] | Date[];
    tickFormat?: string;
  };
  children(props: IChildProps): React.ReactNode;
  /**
   * To enable multi callout or single callout
   *
   * @type {boolean}
   */
  isMultiStackCallout: boolean;
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
  };

  /** X axis type */
  xAxisType: XAxisTypes;

  /** dataset values to find out domain of the String axis
   * Present using for only vertical stacked bar chart
   */
  datasetForXAxisDomain?: IDataPoint[];
}
