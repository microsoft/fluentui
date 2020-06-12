import { IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles } from './VerticalStackedBarChart.types';

export const getStyles = (props: IVerticalStackedBarChartStyleProps): IVerticalStackedBarChartStyles => {
  const { className, theme, width, height, shouldHighlight, href } = props;

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
            ...theme.fonts.medium,
            fill: theme.semanticColors.bodyText,
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
            fill: theme.semanticColors.bodyText,
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
