import { IVerticalBarChartStyleProps, IVerticalBarChartStyles } from '../../index';

export const getStyles = (props: IVerticalBarChartStyleProps): IVerticalBarChartStyles => {
  const { shouldHighlight } = props;
  return {
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
    },

    xAxisTicks: [],

    yAxisTicks: [
      {
        transform: 'scaleX(-1)',
      },
    ],
    yAxisDomain: [
      {
        transform: 'scaleX(-1)',
      },
    ],
  };
};
