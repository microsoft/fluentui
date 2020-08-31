import { ICartesianChartStyleProps, ICartesianChartStyles } from './CartesianChart.types';
import { HighContrastSelectorBlack } from 'office-ui-fabric-react/lib/Styling';
import { isIE11 } from 'office-ui-fabric-react';

const isIE11Var: boolean = isIE11();

export const getStyles = (props: ICartesianChartStyleProps): ICartesianChartStyles => {
  const { className, theme, isRtl, shouldHighlight, href } = props;
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
    xAxis: {
      selectors: {
        text: [
          theme.fonts.tiny,
          {
            fill: theme.semanticColors.bodyText,
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
          fill: theme.semanticColors.bodyText,
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
        opacity: '0.8',
        color: theme.semanticColors.bodySubtext,
      },
    ],
    calloutBlockContainer: {
      ...fonts.mediumPlus,
      marginTop: '13px',
      paddingLeft: '8px',
      lineHeight: '22px',
      color: theme.semanticColors.bodyText,
    },
    calloutlegendText: {
      ...fonts.small,
      lineHeight: '16px',
      color: theme.semanticColors.bodySubtext,
    },
    calloutContentY: [
      {
        ...fonts.mediumPlus,
        fontWeight: 'bold',
        lineHeight: '22px',
      },
    ],
  };
};
