import { IRenderFunction, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import {
  IChartProps,
  IRefArrayData,
  IBasestate,
  ILineChartDataPoint,
  ILineChartPoints,
  ICustomizedCalloutData,
  IMargins,
} from '../../types/index';
import {
  ICartesianChartStyles,
  ICartesianChartStyleProps,
  ICartesianChartProps,
  IChildProps,
} from '../CommonComponents/CartesianChart.types';

export { IChildProps, IRefArrayData, IBasestate, ILineChartDataPoint, ILineChartPoints, IMargins };
export interface IAreaChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: IChartProps;

  /**
   * This prop is used to draw Y axis grid lines on the chart. Default value will be false
   * @deprecated now lines are shown by default
   * no need to use this prop
   */
  showYAxisGridLines?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ICartesianChartStyleProps, ICartesianChartStyles>;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<ICustomizedCalloutData>;

  /**
   * Define a custom callout renderer for a stack; default is to render per data point
   */
  onRenderCalloutPerStack?: IRenderFunction<ICustomizedCalloutData>;
}

export interface IAreaChartStyles extends ICartesianChartStyles {}

export interface IAreaChartStyleProps extends ICartesianChartStyleProps {}
