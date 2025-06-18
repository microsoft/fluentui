import { FontSizes, FontWeights, HighContrastSelector } from '@fluentui/react/lib/Styling';
import { IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles } from './VerticalStackedBarChart.types';
import { getTooltipStyles } from '../../CartesianChart';

export const getStyles = (props: IVerticalStackedBarChartStyleProps): IVerticalStackedBarChartStyles => {
  const { shouldHighlight, href, theme } = props;
  return {
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
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
