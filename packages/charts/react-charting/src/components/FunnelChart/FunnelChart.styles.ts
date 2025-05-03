import { FontWeights } from '@fluentui/react/lib/Styling';
import { IFunnelChartStyleProps, IFunnelChartStyles } from './FunnelChart.types';

export const getFunnelChartStyles = (props: IFunnelChartStyleProps): IFunnelChartStyles => {
  const { theme } = props;
  return {
    root: {},
    text: [
      theme.fonts.medium,
      {
        pointerEvents: 'none',
        fontWeight: FontWeights.semibold,
        fill: theme.palette.neutralPrimary,
      },
    ],
    subComponentStyles: {
      calloutStyles: {
        root: {
          maxWidth: '238px',
        },
      },
    },
  };
};
