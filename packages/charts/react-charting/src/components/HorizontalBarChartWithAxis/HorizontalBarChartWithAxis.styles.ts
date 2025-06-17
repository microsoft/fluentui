import { IHorizontalBarChartWithAxisStyleProps, IHorizontalBarChartWithAxisStyles } from '../../index';

export const getStyles = (props: IHorizontalBarChartWithAxisStyleProps): IHorizontalBarChartWithAxisStyles => {
  const { shouldHighlight } = props;
  return {
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
    },

    xAxisTicks: [],
  };
};
