import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IRenderFunction, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import {
  ICartesianChartStyles,
  ICartesianChartStyleProps,
  ICartesianChartProps,
  IGroupedVerticalBarChartData,
  IGVBarChartSeriesPoint,
} from '../../index';

export interface IGroupedVerticalBarChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: IGroupedVerticalBarChartData[];

  /**
   * Barwidth automacally adjusted based upon given parent width, data and scale.
   * If barwidth given through prop, then is shold be less than given formula.
   * If not, graph will adjust and your value may not be reflected.
   * Formula: width of parent div / (Number Of Groups * (Number Of single bars in group + 2))
   * Note: By changing barwidth manually it may cause some spatial and graph override issues,
   * better to avoid using this prop.
   */
  barwidth?: number;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IGroupedVerticalBarChartStyleProps, IGroupedVerticalBarChartStyles>;

  /**
   * color of the datapoint legend
   * @deprecated
   */
  legendColor?: string;

  /**
   * This prop used to draw X axis grid line on tha chart. Default value will be false
   * @deprecated
   */
  showXAxisGridLines?: boolean;

  /**
   * This prop used to draw Y axis grid lines on the chart. Default value will be true
   * @deprecated
   */
  showYAxisGridLines?: boolean;

  /**
   * This prop takes the boolean value and used for to display x-axis path or transparent.
   * This is a optional prop and default value is false. It dont show X-Axis path as tranparent.
   * @deprecated
   */
  showXAxisPath?: boolean;

  /**
   * This prop takes the boolean value and used for to display y-axis path or transparent.
   * This is a optional prop and default value is false. It dont show X-Axis path as tranparent.
   * @deprecated
   */
  showYAxisPath?: boolean;

  /**
   * Define a custom callout renderer for a stack
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<IGVBarChartSeriesPoint>;
}

export interface IGroupedVerticalBarChartStyleProps extends ICartesianChartStyleProps {}

export interface IGroupedVerticalBarChartStyles extends ICartesianChartStyles {
  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover: IStyle;

  // tooltip: IStyle;
}
