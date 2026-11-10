import { IVerticalBarChartStyleProps, IVerticalBarChartStyles } from '../../index';
import { getBarLabelStyle, getTooltipStyle } from '../../utilities/index';

export const getStyles = (props: IVerticalBarChartStyleProps): IVerticalBarChartStyles => {
  const { shouldHighlight, theme } = props;
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
    tooltip: getTooltipStyle(theme),
    barLabel: getBarLabelStyle(theme),
  };
};
