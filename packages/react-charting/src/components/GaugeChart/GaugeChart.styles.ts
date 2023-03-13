import { FontWeights } from '@fluentui/react';
import { IGaugeChartStyleProps, IGaugeChartStyles } from './GaugeChart.types';

export const getStyles = (props: IGaugeChartStyleProps): IGaugeChartStyles => {
  const { theme } = props;

  return {
    limits: {
      ...theme.fonts.small,
      fontWeight: FontWeights.semibold,
    },

    chartValue: {
      ...theme.fonts.xLarge,
      fontWeight: FontWeights.semibold,
    },

    sublabel: {
      ...theme.fonts.small,
      fontWeight: FontWeights.semibold,
    },

    needle: {
      fill: theme.palette.black,
      stroke: theme.palette.white,
    },
  };
};
