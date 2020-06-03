import { IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles } from './VerticalStackedBarChart.types';

export const getStyles = (props: IVerticalStackedBarChartStyleProps): IVerticalStackedBarChartStyles => {
  const { className, theme, width, height, legendColor, shouldHighlight, href } = props;
  const { fonts } = theme!;

  const chartWidth = width! + 50;
  const chartHeight = height! + 50;
  const chartMargin = { left: 35, right: 0, top: 35, bottom: 0 };

  return {
    root: [
      theme.fonts.medium,
      className,
      {
        width: chartWidth,
      },
    ],

    chartLabel: [
      {
        textAlign: 'center',
        ...theme.fonts.mediumPlus,
      },
    ],

    chart: [
      {
        width: chartWidth,
        height: chartHeight,
      },
    ],

    xAxis: [
      {
        transform: `translate(${chartMargin.left}px, ${height - chartMargin.bottom + 10}px)`,
      },
      {
        selectors: {
          text: {
            ...theme.fonts.tiny,
          },
          line: {
            opacity: 0.3,
            width: '1px',
          },
          path: {
            display: 'none',
          },
        },
      },
    ],

    yAxis: [
      {
        transform: `translate(${chartMargin.left}px, 10px)`,
      },
      {
        selectors: {
          text: {
            ...theme.fonts.medium,
            opacity: 1,
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
    ],

    bars: [
      {
        transform: `translate(${chartMargin.left}px, 10px)`,
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
      color: theme.semanticColors.bodySubtext,
    },
    calloutContentY: [
      {
        ...fonts.xxLarge,
        fontWeight: 'bold',
        lineHeight: '36px',
        color: legendColor ? legendColor : theme.semanticColors.bodySubtext,
      },
    ],

    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
    },

    legendContainer: {
      marginTop: '8px',
      marginLeft: '35px',
    },

    xAxisText: [],
  };
};
