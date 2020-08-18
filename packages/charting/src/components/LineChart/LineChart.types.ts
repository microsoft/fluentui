import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IOverflowSetProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { IFocusZoneProps } from '@fluentui/react-focus';
import { IChartProps } from '../../types/IDataPoint';
import { IEventAnnotation } from '../../types/IEventAnnotation';
import { IMargins } from '../../utilities/index';
export {
  IChartProps,
  IDataPoint,
  ILineChartDataPoint,
  ILineChartPoints,
  IBasestate,
  IChildProps,
} from '../../types/IDataPoint';
import { IChartHelperStyles, IChartHelperStyleProps, IChartHelperProps } from '@uifabric/charting';

// export interface ILineChart {}

export interface ILineChartProps extends Partial<IChartHelperProps> {
  /**
   * Data to render in the chart.
   */
  data: IChartProps;

  /**
   * Chart title for title of the chart
   */
  chartTitle?: string;

  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of the chart.
   */
  height?: number;

  /**
   * Additional CSS class(es) to apply to the Chart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  // /**
  //  * Call to provide customized styling that will layer on top of the variant rules.
  //  */
  // styles?: IStyleFunctionOrObject<ILineChartStyleProps, ILineChartStyles>;

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
   * this prop takes values that you want the line chart to render on x-axis
   * This is a optional parameter if not specified D3 will decide which values appear on the x-axis for you
   * Please look at https://github.com/d3/d3-scale for more information on how D3 decides what data to appear on the axis of chart
   */
  tickValues?: number[] | Date[];

  /**
   * minimum  data value point in y-axis
   */
  yMinValue?: number;

  /**
   * maximum data value point in y-axis
   */
  yMaxValue?: number;

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  /**
   * Show event annotation
   */
  eventAnnotationProps?: IEventsAnnotationProps;

  /**
   * Margins for the chart
   */
  margins?: IMargins;

  /*
   * Color fill bars for the chart,
   */
  colorFillBars?: IColorFillBarsProps[];
}

export interface IEventsAnnotationProps {
  events: IEventAnnotation[];
  strokeColor: string;
  labelColor: string;
  labelHeight?: number;
  labelWidth?: number;
  mergedLabel: (count: number) => string;
}

export interface ILineChartStyles extends IChartHelperStyles {}

export interface ILineChartStyleProps extends IChartHelperStyleProps {}

export interface IColorFillBarsProps {
  name: string;
  color: string;
  data: IColorFillBarData[];
  applyPattern?: boolean;
  onLegendClick?: (selectedLegend: string | null) => void | undefined;
}

export interface IColorFillBarData {
  startX: number | Date;
  endX: number | Date;
}
