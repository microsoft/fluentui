import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IMargins } from '../../utilities/index';
import { IChildProps, ILineChartPoints } from '../../types/IDataPoint';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

export interface IChartHelperStyleProps {
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
}

export interface IChartHelperStyles {
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
}

export interface IYValueHover {
  legend?: string;
  y?: number;
  color?: string;
}

export interface IChartHelperProps {
  /**
   * Data to render in the chart.
   */
  points: ILineChartPoints[];

  /**
   * the format in for the data on y-axis. For data object this can be specified to your requirement.
   *  Eg: d3.format(".0%")(0.123),d3.format("+20")(42);
   * Please look at https://github.com/d3/d3-format for all the formats supported
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yAxisTickFormat?: any;

  /**
   * Legend data to render as child to wrap component
   */
  legendBars: JSX.Element;

  /**
   * Maximum value of Y-axis Domain value.
   * Used for axis building.
   * If not given, will take maximum of given data.
   */
  maxOfYVal?: number;

  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of the chart.
   */
  height?: number;

  /**
   * minimum  data value point in y-axis
   */
  yMinValue?: number;

  /**
   * maximum data value point in y-axis
   */
  yMaxValue?: number;

  /** decides wether to show/hide legends
   * @defaultvalue false
   */
  hideLegend?: boolean;

  /**
   * this prop takes its parent as a HTML element to define the width and height of the line chart
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
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IChartHelperStyleProps, IChartHelperStyles>;

  /**
   * Margins for the chart
   */
  margins?: IMargins;

  /**
   * Maximum value of X-axis Domain value.
   * Used for axis building.
   * If not given, will take minimun of given data.
   */
  domainXMin?: number;

  /**
   * Maximum value of Y-axis Domain value.
   * Used for axis building.
   * If not given, will take maximum of given data.
   */
  domainXMax?: number;

  /**
   * Number of ticks on the y-axis.
   * Tick count should be factor of difference between (yMinValue, yMaxValue)
   * @default 4
   */
  yAxisTickCount?: number;

  hideTooltip?: boolean;

  /**
   * Type of x axis
   * @default false that means if prop not provided, it x axis will be considered as numberic axis.
   */
  isXAxisDateType: boolean;

  /**
   * A method to call back after wrapper base called.
   * It will pass data - xAxis, yAxis, Height and Width
   * If not given, these callback details may not be available
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getGraphData?: any;

  /**
   * This object used to give x axis tick format.
   * If not given default values will consider from given data.
   */
  tickParams?: {
    tickValues?: number[] | Date[];
    tickFormat?: string;
  };

  /**
   * Callout props used to call callout in wrapper base.
   */
  calloutProps: {
    isCalloutVisible: boolean;
    directionalHint: DirectionalHint;
    id: string;
    gapSpace: number;
    target: SVGAElement;
    YValueHover?: IYValueHover[];
    hoverXValue?: string | number | null;
    isBeakVisible?: boolean;
  };

  /**
   * Using renderProps to get data after data change in parent component
   */
  children(props: IChildProps): React.ReactNode;
}
