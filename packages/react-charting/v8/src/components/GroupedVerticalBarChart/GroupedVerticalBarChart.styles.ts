import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { IGroupedVerticalBarChartStyleProps, IGroupedVerticalBarChartStyles } from '../../index';

export const getStyles = (props: IGroupedVerticalBarChartStyleProps): IGroupedVerticalBarChartStyles => {
  const { theme, href } = props;
  return {
    opacityChangeOnHover: {
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
