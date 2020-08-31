import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import {
  IChartProps,
  IRefArrayData,
  IBasestate,
  ILineChartDataPoint,
  ILineChartPoints,
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
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ICartesianChartStyleProps, ICartesianChartStyles>;
}

export interface IAreaChartStyles extends ICartesianChartStyles {}

export interface IAreaChartStyleProps extends ICartesianChartStyleProps {}
