import { ICartesianChartStyleProps, ICartesianChartStyles } from './CartesianChart.types';
import { HighContrastSelector } from '@fluentui/react/lib/Styling';
import { isIE11 } from '@fluentui/react';
import { getAxisTitleStyle, getTooltipStyle } from '../../utilities/index';

const isIE11Var: boolean = isIE11();

export const getStyles = (props: ICartesianChartStyleProps): ICartesianChartStyles => {
  const {
    className,
    theme,
    isRtl,
    shouldHighlight,
    href,
    lineColor = 'transparent',
    toDrawShape,
    enableReflow,
  } = props;
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
      ...(enableReflow ? { overflow: 'auto' } : {}),
    },
    axisTitle: getAxisTitleStyle(theme!, theme.fonts.xSmall),
    axisAnnotation: getAxisTitleStyle(theme!, theme.fonts.small),
    xAxis: {
      selectors: {
        text: [
          theme.fonts.tiny,
          {
            fill: theme.semanticColors.bodyText,
            fontWeight: '600',
            selectors: {
              [HighContrastSelector]: {
                fill: 'CanvasText',
              },
            },
          },
        ],
        line: {
          opacity: 0.2,
          stroke: theme.semanticColors.bodyText,
          width: '1px',
          selectors: {
            [HighContrastSelector]: {
              opacity: 0.1,
              stroke: 'CanvasText',
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
              [HighContrastSelector]: {
                fill: 'CanvasText',
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
            [HighContrastSelector]: {
              opacity: 0.1,
              stroke: 'CanvasText',
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
        [HighContrastSelector]: {
          color: 'CanvasText',
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
          [HighContrastSelector]: {
            color: 'CanvasText',
          },
        },
      },
    ],
    descriptionMessage: [
      theme.fonts.small,
      {
        selectors: {
          [HighContrastSelector]: {
            color: 'CanvasText',
          },
        },
        color: theme.semanticColors.bodyText,
        marginTop: '10px',
        paddingTop: '10px',
        borderTop: `1px solid ${theme.semanticColors.menuDivider}`,
      },
    ],
    tooltip: getTooltipStyle(theme),
    svgTooltip: {
      fill: theme.semanticColors.bodyBackground,
      [HighContrastSelector]: {
        fill: 'Canvas',
      },
    },
  };
};
