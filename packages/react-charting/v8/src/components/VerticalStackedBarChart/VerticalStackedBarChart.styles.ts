import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles } from './VerticalStackedBarChart.types';

export const getStyles = (props: IVerticalStackedBarChartStyleProps): IVerticalStackedBarChartStyles => {
  const { shouldHighlight, href, theme } = props;
  return {
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
    },

    tooltip: {
      ...theme.fonts.medium,
      display: 'flex',
      flexDirection: 'column',
      padding: '8px',
      position: 'absolute',
      textAlign: 'center',
      top: '0px',
      background: theme.semanticColors.bodyBackground,
      borderRadius: '2px',
      pointerEvents: 'none',
    },

    barLabel: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.semibold,
      fill: theme.palette.neutralPrimary,
    },
  };
};
