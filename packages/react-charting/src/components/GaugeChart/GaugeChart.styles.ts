import { FontSizes, FontWeights } from '@fluentui/react';
import { IGaugeChartStyleProps, IGaugeChartStyles } from './GaugeChart.types';

export const getStyles = (props: IGaugeChartStyleProps): IGaugeChartStyles => {
  const { theme, fontSize, width, height, className } = props;

  return {
    root: [theme.fonts.medium, 'ms-GaugeChart', { width }, className],

    chart: {
      display: 'block',
      width,
      height,
    },

    limits: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.semibold,
    },

    chartValue: {
      fontSize,
      fontWeight: FontWeights.semibold,
    },

    sublabel: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.semibold,
    },

    needle: {
      fill: theme.palette.black,
      stroke: theme.palette.white,
    },

    chartTitle: {
      fontSize: FontSizes.small,
    },

    legendContainer: {},
  };
};
