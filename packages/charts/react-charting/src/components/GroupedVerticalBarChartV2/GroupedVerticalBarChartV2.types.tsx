import { IStandardBarSeries, IStandardLineSeries } from '../../types/IDataPoint';
import { IGroupedVerticalBarChartProps } from '../GroupedVerticalBarChart/GroupedVerticalBarChart.types';

export interface IGroupedVerticalBarChartV2Props extends Omit<IGroupedVerticalBarChartProps, 'data'> {
  data: (IStandardBarSeries<string, number> | IStandardLineSeries<string, number>)[];
}
