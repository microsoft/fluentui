import { FontSizes, FontWeights, HighContrastSelector } from '@fluentui/react/lib/Styling';
import { IVerticalBarChartStyleProps, IVerticalBarChartStyles } from '../../index';
import { getTooltipStyles } from '../../CartesianChart';

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

    tooltip: getTooltipStyles(theme),

    barLabel: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.semibold,
      fill: theme.palette.neutralPrimary,
      selectors: {
        [HighContrastSelector]: {
          fill: 'CanvasText',
        },
      },
    },
  };
};
