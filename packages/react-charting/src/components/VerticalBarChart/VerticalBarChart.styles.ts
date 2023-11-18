import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { IVerticalBarChartStyleProps, IVerticalBarChartStyles } from '../../index';

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
