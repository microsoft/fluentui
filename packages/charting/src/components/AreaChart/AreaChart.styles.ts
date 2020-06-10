import { IAreaChartStyleProps, IAreaChartStyles } from './AreaChart.types';

export const getStyles = (props: IAreaChartStyleProps): IAreaChartStyles => {
  const { className, theme, showXAxisPath, showYAxisPath } = props;
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
          display: showXAxisPath ? 'block' : 'none',
        },
      },
    },
    yAxis: {
      selectors: {
        text: {
          ...fonts.small,
        },
        path: {
          display: showYAxisPath ? 'block' : 'none',
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
    calloutContentX: [
      {
        ...fonts.medium,
        lineHeight: '14px',
      },
    ],
    calloutContentY: [
      {
        color: theme.semanticColors.bodyText,
        ...fonts.large,
        fontWeight: 'bold',
        lineHeight: '31px',
      },
    ],
  };
};
