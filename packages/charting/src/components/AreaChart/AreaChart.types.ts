import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IChartProps } from '../../types/IDataPoint';
import { ICommonChartStyleProps, ICommonChartStyles, ICommonChartProps } from '../../types/ICommonTypes';

export interface IAreaChartProps extends ICommonChartProps {
  /**
   * Data to render in the chart.
   */
  data: IChartProps;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ICommonChartStyleProps, ICommonChartStyles>;
}

export interface IAreaChartStyles extends ICommonChartStyles {}

export interface IAreaChartStyleProps extends ICommonChartStyleProps {}
