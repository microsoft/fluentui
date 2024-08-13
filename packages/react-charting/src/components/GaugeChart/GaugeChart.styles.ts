import { FontSizes, FontWeights, HighContrastSelector, HighContrastSelectorBlack } from '@fluentui/react';
import { IGaugeChartStyleProps, IGaugeChartStyles } from './GaugeChart.types';

export const getStyles = (props: IGaugeChartStyleProps): IGaugeChartStyles => {
  const { theme, chartValueSize, chartWidth, chartHeight, className, lineColor, toDrawShape } = props;

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
      stroke: theme.semanticColors.bodyBackground,
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

    calloutContentRoot: [
      {
        display: 'grid',
        overflow: 'hidden',
        padding: '11px 16px 10px 16px',
        backgroundColor: theme.semanticColors.bodyBackground,
        backgroundBlendMode: 'normal, luminosity',
      },
    ],
    calloutDateTimeContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    calloutContentX: [
      {
        ...theme.fonts.small,
        lineHeight: '16px',
        opacity: '0.85',
        color: theme.semanticColors.bodySubtext,
      },
    ],
    calloutBlockContainer: [
      theme.fonts.mediumPlus,
      {
        marginTop: '13px',
        color: theme.semanticColors.bodyText,
      },
      !toDrawShape && {
        selectors: {
          [HighContrastSelector]: {
            forcedColorAdjust: 'none',
          },
        },
        borderLeft: `4px solid ${lineColor}`,
        paddingLeft: '8px',
      },
      toDrawShape && {
        display: 'flex',
      },
    ],
    shapeStyles: {
      marginRight: '8px',
    },
    calloutlegendText: {
      ...theme.fonts.small,
      lineHeight: '16px',
      selectors: {
        [HighContrastSelectorBlack]: {
          color: 'rgb(255, 255, 255)',
        },
      },
      color: theme.semanticColors.bodySubtext,
    },
    calloutContentY: [
      {
        ...theme.fonts.mediumPlus,
        fontWeight: 'bold',
        lineHeight: '22px',
        selectors: {
          [HighContrastSelectorBlack]: {
            color: 'rgb(255, 255, 255)',
          },
        },
      },
    ],
    descriptionMessage: [
      theme.fonts.small,
      {
        selectors: {
          [HighContrastSelectorBlack]: {
            color: 'rgb(255, 255, 255)',
          },
        },
        color: theme.semanticColors.bodyText,
        marginTop: '10px',
        paddingTop: '10px',
        borderTop: `1px solid ${theme.semanticColors.menuDivider}`,
      },
    ],
  };
};
