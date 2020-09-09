import { IFocusZoneProps } from '@fluentui/react-focus';
import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { IOverflowSetProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IRenderFunction, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IVerticalStackedChartProps, IVSChartDataPoint } from '../../types/index';
import { IMargins } from '../../utilities/index';
import { ILegendsProps } from '../Legends/index';

export interface IVerticalStackedBarChartProps {
  /**
   * Data to render in the chart.
   */
  data: IVerticalStackedChartProps[];

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
   * Margins for the chart (note that these values are not adjusted for RTL)
   */
  margins?: IMargins;

  /**
   * Number of ticks on the y-axis.
   */
  yAxisTickCount?: number;

  /**
   * maximum data value point in y-axis
   */
  yMaxValue?: number;

  /**
   * the format for the data on y-axis. For data object this can be specified to your requirement.
   *  Eg: d3.format(".0%")(0.123),d3.format("+20")(42);
   * Please look at https://github.com/d3/d3-format for all the formats supported
   */
  yAxisTickFormat?: (n: number) => string;

  /**
   * Colors from which to select the color of each bar.
   */
  colors?: string[];

  /**
   * Label to apply to the whole chart.
   */
  chartLabel?: string;

  /**
   * Additional CSS class(es) to apply to the VerticalStackedBarChart.
   */
  className?: string;

  /**
   * this prop takes its parent as a HTML element to define the width and height of the line chart
   */
  parentRef?: HTMLElement | null;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Url that the data-viz needs to redirect to upon clicking on it
   */
  href?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles>;

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
   * props for the legends in the chart
   */
  legendProps?: Partial<ILegendsProps>;

  /**
   * Do not show tooltips (callout) in chart
   *
   * @default false
   */
  hideTooltip?: boolean;

  /**
   * Define a custom callout renderer for a stack; default is to render per data point
   */
  onRenderCalloutPerStack?: IRenderFunction<IVerticalStackedChartProps>;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<IVSChartDataPoint>;

  /**
   * props for the callout in the chart
   */
  calloutProps?: Partial<ICalloutProps>;
}

export interface IVerticalStackedBarChartStyleProps {
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
}

export interface IVerticalStackedBarChartStyles {
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
   * Style for the text labeling each tick along the x-axis.
   */
  xAxisText?: IStyle;

  /**
   * Style for the element containing the y-axis.
   */
  yAxis?: IStyle;

  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover: IStyle;

  /**
   * Style for the legends container
   */
  legendContainer?: IStyle;
}
