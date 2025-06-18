import { FontSizes, FontWeights, HighContrastSelector } from '@fluentui/react/lib/Styling';
import { IGroupedVerticalBarChartStyleProps, IGroupedVerticalBarChartStyles } from '../../index';
import { getTooltipStyles } from '../../CartesianChart';

export const getStyles = (props: IGroupedVerticalBarChartStyleProps): IGroupedVerticalBarChartStyles => {
  const { theme, href } = props;
  return {
    opacityChangeOnHover: {
      cursor: href ? 'pointer' : 'default',
    },
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
