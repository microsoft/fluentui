import { IChartProps, IHorizontalBarChartWithAxisDataPoint } from '../../index';

export const isHorizontalBarChartEmpty = (data: IChartProps[] | undefined): boolean => {
  return !(data && data.length > 0);
};

export const isHorizontalBarChartWithAxisEmpty = (
  data: IHorizontalBarChartWithAxisDataPoint[] | undefined,
): boolean => {
  return !(data && data.length > 0);
};
