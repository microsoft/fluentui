import { ILineChartStyleProps, ILineChartStyles } from './LineChart.types';

export const getStyles = (props: ILineChartStyleProps): ILineChartStyles => {
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
          ...fonts.tiny,
          stroke: theme.semanticColors.bodyText,
          opacity: 0.6,
        },
        line: {
          opacity: 0.1,
          stroke: theme.semanticColors.bodyText,
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
          opacity: 0.6,
          stroke: theme.semanticColors.bodyText,
        },
        path: {
          display: 'none',
        },
        line: {
          opacity: 0.1,
          stroke: theme.semanticColors.bodyText,
        },
      },
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
