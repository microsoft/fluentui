import { FontSizes, FontWeights } from '@fluentui/react';
import { IGaugeChartStyleProps, IGaugeChartStyles } from './GaugeChart.types';

export const getStyles = (props: IGaugeChartStyleProps): IGaugeChartStyles => {
  const { theme, chartValueSize, chartWidth, chartHeight, className } = props;

  return {
    root: [
      theme.fonts.medium,
      'ms-GaugeChart',
      {
        width: '100%',
        height: '100%',
      },
      className,
    ],

    chart: {
      display: 'block',
      width: chartWidth,
      height: chartHeight,
    },

    limits: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.semibold,
      fill: theme.palette.neutralPrimary,
    },

    chartValue: {
      fontSize: chartValueSize,
      fontWeight: FontWeights.semibold,
      fill: theme.palette.neutralPrimary,
    },

    sublabel: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.semibold,
      fill: theme.palette.neutralPrimary,
    },

    needle: {
      fill: theme.palette.black,
      stroke: theme.palette.white,
    },

    chartTitle: {
      fontSize: FontSizes.small,
      fill: theme.palette.neutralPrimary,
    },

    segment: {
      outline: 'none',
      stroke: theme.semanticColors.focusBorder,
    },

    legendsContainer: {
      width: chartWidth,
    },

    calloutContentRoot: {
      ...theme.fonts.medium,
      color: theme.semanticColors.bodyText,
      padding: '16px',
      backgroundColor: theme.semanticColors.bodyBackground,
      backgroundBlendMode: 'normal, luminosity',
    },

    calloutDateTimeContainer: {
      marginBottom: '8px',
    },

    calloutContentX: {
      fontWeight: FontWeights.semibold,
    },

    calloutBlockContainer: {
      display: 'flex',
      alignItems: 'center',
    },

    shapeStyles: {
      marginRight: '8px',
      flexShrink: 0,
    },

    calloutlegendText: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      flexGrow: 1,
    },

    calloutContentY: {
      fontWeight: FontWeights.semibold,
      flexShrink: 0,
    },

    divider: {
      height: '1px',
      backgroundColor: '#c8c8c8',
      marginTop: '8px',
      marginBottom: '8px',
    },

    descriptionMessage: {
      fontSize: FontSizes.small,
    },

    updatedTime: {
      marginTop: '8px',
      fontSize: FontSizes.small,
    },
  };
};
