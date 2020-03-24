import { IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles } from './VerticalStackedBarChart.types';

export const getStyles = (props: IVerticalStackedBarChartStyleProps): IVerticalStackedBarChartStyles => {
  const { className, theme, width, height, legendColor, shouldHighlight, href } = props;

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
