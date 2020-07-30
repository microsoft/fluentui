import { ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';

export const getStyles = (props: ISankeyChartStyleProps): ISankeyChartStyles => {
  const { className, theme, pathColor, calloutColor } = props;
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
    links: {
      stroke: pathColor ? pathColor : theme.palette.blue,
      fill: 'none',
    },
    nodes: {
      selectors: {
        text: [
          theme.fonts.small,
          {
            lineHeight: '16px',
            fill: theme.semanticColors.bodyText,
          },
        ],
      },
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
      theme.fonts.small,
      {
        lineHeight: '16px',
        opacity: '0.8',
        color: theme.semanticColors.bodySubtext,
      },
    ],
    calloutBlockContainer: [
      theme.fonts.xxLarge,
      {
        // marginTop: XValue ? '13px' : 'unset',
        paddingLeft: '8px',
        lineHeight: '22px',
        color: theme.semanticColors.bodyText,
        borderLeft: `4px solid ${calloutColor}`,
      },
    ],
    calloutlegendText: [
      theme.fonts.small,
      {
        lineHeight: '16px',
        color: theme.semanticColors.bodyText,
      },
    ],
    calloutContentY: [
      theme.fonts.xxLarge,
      {
        color: calloutColor ? calloutColor : theme.semanticColors.bodyText,
        fontWeight: 'bold',
        lineHeight: '36px',
      },
    ],
  };
};
