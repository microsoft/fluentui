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
