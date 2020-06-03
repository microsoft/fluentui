import { IGroupedVerticalBarChartStyleProps, IGroupedVerticalBarChartStyles } from './GroupedVerticalBarChart.types';

export const getStyles = (props: IGroupedVerticalBarChartStyleProps): IGroupedVerticalBarChartStyles => {
  const { theme, className, showXAxisPath, showYAxisPath, legendColor, href } = props;
  const { fonts } = theme!;
  return {
    root: [
      theme.fonts.medium,
      {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      },
      className,
    ],

    xAxis: {
      selectors: {
        text: {
          ...theme!.fonts.tiny,
        },
        line: {
          opacity: 0.2,
          width: '1px',
        },
        path: {
          display: showXAxisPath ? 'block' : 'none',
        },
      },
    },

    yAxis: {
      selectors: {
        text: {
          ...theme.fonts.medium,
        },
        line: {
          opacity: 0.2,
          width: '1px',
        },
        path: {
          display: showYAxisPath ? 'block' : 'none',
        },
      },
    },

    legendContainer: {
      marginTop: '8px',
      marginLeft: '35px',
    },

    hoverCardRoot: {
      paddingLeft: '16px',
      paddingRight: '22px',
      paddingTop: '15px',
      paddingBottom: '8px',
    },

    hoverCardTextStyles: [
      theme.fonts.small,
      {
        lineHeight: '14px',
      },
    ],

    hoverCardDataStyles: [
      theme.fonts.xxLarge,
      {
        lineHeight: '31px',
        color: legendColor === '' ? theme.palette.black : legendColor,
      },
    ],

    opacityChangeOnHover: {
      cursor: href ? 'pointer' : 'default',
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
        ...fonts.small,
        lineHeight: '16px',
        opacity: '0.8',
        color: theme.semanticColors.bodySubtext,
      },
    ],
    calloutBlockContainer: {
      ...fonts.xxLarge,
      marginTop: '13px',
      paddingLeft: '8px',
      lineHeight: '22px',
      color: theme.semanticColors.bodyText,
      borderLeft: `4px solid ${legendColor}`,
    },
    calloutlegendText: {
      ...fonts.small,
      lineHeight: '16px',
      color: theme.semanticColors.bodyText,
    },
    calloutContentY: [
      {
        ...fonts.xxLarge,
        color: legendColor ? legendColor : theme.semanticColors.bodyText,
        fontWeight: 'bold',
        lineHeight: '36px',
      },
    ],
  };
};
