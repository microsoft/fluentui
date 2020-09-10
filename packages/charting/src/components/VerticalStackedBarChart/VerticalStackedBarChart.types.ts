import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import {
  IVerticalStackedChartProps,
  IMargins,
  IBasestate,
  IRefArrayData,
  IDataPoint,
  IVSChartDataPoint,
} from '../../types/index';
import { ICartesianChartProps, IChildProps } from '../CommonComponents/index';
export { IMargins, IBasestate, IRefArrayData, IVerticalStackedChartProps, IDataPoint, IVSChartDataPoint, IChildProps };

export interface IVerticalStackedBarChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: IVerticalStackedChartProps[];

  /**
   * Width of each bar in the chart.
   */
  barWidth?: number;

  /**
   * Colors from which to select the color of each bar.
   * @deprecated Not using this prop. DIrectly taking color from given data.
   */
  colors?: string[];

  /**
   * To display multi stack callout or single callout
   * @default flase
   */
  isMultiStackCallout?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles>;
}

export interface IVerticalStackedBarChartStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;
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

// interface IVerticalStackedBarSubComponentStyles {
//   // CartesianStyles?: ICartesianChartProps['styles'];
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   CartesianStyles?: IStyleFunctionOrObject<ICartesianChartProps, any>;
// }

export interface IVerticalStackedBarChartStyles {
  /**
   * Style for the chart label.
   * @deprecated Use your own chart label to the chart.
   */
  chartLabel?: IStyle;

  // subComponentStyles?: IVerticalStackedBarSubComponentStyles;

  opacityChangeOnHover?: IStyle;

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
}
