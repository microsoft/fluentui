import { ICartesianChartStyleProps, ICartesianChartStyles } from './CartesianChart.types';
import { FontSizes, FontWeights, HighContrastSelectorBlack, HighContrastSelector } from '@fluentui/react/lib/Styling';
import { NeutralColors, isIE11 } from '@fluentui/react';

const isIE11Var: boolean = isIE11();

export const getStyles = (props: ICartesianChartStyleProps): ICartesianChartStyles => {
  const { className, theme, isRtl, shouldHighlight, href, lineColor = 'transparent', toDrawShape } = props;
  const { fonts } = theme!;
  return {
    root: [
      theme.fonts.medium,
      {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      className,
    ],
    chartWrapper: {
      overflow: 'auto',
    },
    axisTitle: [
      theme.fonts.xSmall,
      {
        textAlign: 'center',
        fontWeight: FontWeights.semibold,
        fontStyle: 'normal',
        lineHeight: FontSizes.medium,
        color: NeutralColors.gray160,
        fill: theme.semanticColors.bodyText,
      },
    ],
    xAxis: {
      selectors: {
        text: [
          theme.fonts.tiny,
          {
            fill: theme.semanticColors.bodyText,
            fontWeight: '600',
            selectors: {
              [HighContrastSelectorBlack]: {
                fill: 'rgb(179, 179, 179)',
              },
            },
          },
        ],
        line: {
          opacity: 0.2,
          stroke: theme.semanticColors.bodyText,
          width: '1px',
          selectors: {
            [HighContrastSelectorBlack]: {
              opacity: 0.1,
              stroke: 'rgb(179, 179, 179)',
            },
          },
        },
        path: {
          display: 'none',
        },
      },
    },
    yAxis: {
      selectors: {
        text: [
          theme.fonts.tiny,
          {
            fill: theme.semanticColors.bodyText,
            fontWeight: '600',
            selectors: {
              [HighContrastSelectorBlack]: {
                fill: 'rgb(179, 179, 179)',
              },
            },
          },
        ],
        path: {
          display: 'none',
        },
        line: {
          opacity: 0.2,
          stroke: theme.semanticColors.bodyText,
          selectors: {
            [HighContrastSelectorBlack]: {
              opacity: 0.1,
              stroke: 'rgb(179, 179, 179)',
            },
          },
        },
        g: [
          isRtl &&
            !isIE11Var && {
              textAnchor: 'end',
            },
        ],
      },
    },

    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
    },

    legendContainer: [
      {
        marginTop: '8px',
        marginLeft: '20px',
      },
    ],
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
        ...fonts.small,
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
      ...fonts.small,
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
        ...fonts.mediumPlus,
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
