import { IAreaChartStyleProps, IAreaChartStyles } from './AreaChart.types';

export const getStyles = (props: IAreaChartStyleProps): IAreaChartStyles => {
  const { className, theme } = props;
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
        text: {
          ...fonts.small,
        },
        line: {
          opacity: 0.2,
          width: '1px',
        },
        path: {
          display: 'none',
        },
      },
    },
    yAxis: {
      selectors: {
        text: {
          ...fonts.small,
        },
        path: {
          display: 'none',
        },
        line: {
          opacity: 0.2,
          width: '1px',
        },
      },
    },

    hoverCardRoot: {
      paddingLeft: '16px',
      paddingRight: '22px',
      paddingTop: '15px',
      paddingBottom: '8px',
    },

    legendContainer: [
      {
        marginTop: '8px',
        marginLeft: '20px',
      },
    ],

    hoverCardTextStyles: [
      theme.fonts.small,
      {
        lineHeight: '14px',
      },
    ],

    calloutContentRoot: [
      {
        display: 'grid',
        overflow: 'hidden',
        padding: '10px 16px 10px 16px',
        backgroundColor: theme.semanticColors.bodyBackground,
      },
    ],

    calloutDateTimeContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

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

    calloutContentX: [
      {
        ...fonts.small,
        lineHeight: '16px',
        opacity: '0.8',
        color: theme.semanticColors.bodySubtext,
      },
    ],

    calloutContentY: [
      {
        ...fonts.mediumPlus,
        fontWeight: 'bold',
        lineHeight: '22px',
      },
    ],
  };
};
