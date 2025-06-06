import { IHorizontalBarChartWithAxisStyleProps, IHorizontalBarChartWithAxisStyles } from '../../index';

export const getStyles = (props: IHorizontalBarChartWithAxisStyleProps): IHorizontalBarChartWithAxisStyles => {
  const { shouldHighlight, opacity } = props;
  return {
    opacityChangeOnHover: {
      opacity: shouldHighlight ? opacity ?? '' : '0.1',
    },

    xAxisTicks: [],
  };
};
