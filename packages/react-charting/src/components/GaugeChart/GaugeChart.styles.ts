import { FontWeights } from '@fluentui/react';
import { IGaugeChartStyleProps, IGaugeChartStyles } from './GaugeChart.types';

export const getStyles = (props: IGaugeChartStyleProps): IGaugeChartStyles => {
  const { theme, fontSize } = props;

  return {
    limits: {
      ...theme.fonts.small,
      fontWeight: FontWeights.semibold,
    },

    chartValue: {
      ...theme.fonts.xLarge,
      fontSize,
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
