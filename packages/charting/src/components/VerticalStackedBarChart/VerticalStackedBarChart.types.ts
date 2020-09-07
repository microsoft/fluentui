import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import {
  IVerticalStackedChartProps,
  IMargins,
  IBasestate,
  IRefArrayData,
  IDataPoint,
  IVSChartDataPoint,
} from '../../types/index';
import {
  ICartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles,
  IChildProps,
} from '../CommonComponents/index';
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
   */
  colors?: string[];

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles>;
}

export interface IVerticalStackedBarChartStyleProps extends ICartesianChartStyleProps {
  /**
   * color of the datapoint legend
   */
  legendColor?: string;
}

export interface IVerticalStackedBarChartStyles extends ICartesianChartStyles {
  /**
   * Style for the chart.
   */
  chart?: IStyle;

  /**
   * Style for the chart label.
   */
  chartLabel?: IStyle;

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
