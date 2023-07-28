import { ICartesianChartStyleProps, ICartesianChartStyles } from './CartesianChart.types';
import { HighContrastSelectorBlack, FontWeights, FontSizes } from '@fluentui/react/lib/Styling';
import { isIE11 } from '@fluentui/react';

const isIE11Var: boolean = isIE11();

export const getStyles = (props: ICartesianChartStyleProps): ICartesianChartStyles => {
  const { className, theme, isRtl, shouldHighlight, href } = props;

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
  };
};
