import { IVerticalBarChartStyleProps, IVerticalBarChartStyles } from './VerticalBarChart.types';

export const getStyles = (props: IVerticalBarChartStyleProps): IVerticalBarChartStyles => {
  const { className, theme, width, height, legendColor, shouldHighlight } = props;
  const { fonts } = theme!;

  const chartWidth = width + 50;
  const chartPadding = 20;
  const chartHeight = height + 50;
  const xOffset = 30;
  const yOffset = 23;

  return {
    root: [
      theme.fonts.medium,
      'ms-VerticalBarChart',
      className,
      {
        width: chartWidth + 2 * chartPadding,
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
    },
    chart: [
      {
        padding: chartPadding,
        width: chartWidth,
        height: chartHeight,
        boxSizing: 'content-box',
      },
    ],
    chartLabel: [
      {
        textAlign: 'center',
        ...theme.fonts.mediumPlus,
      },
    ],
    xAxis: [
      {
        transform: `translate(${xOffset}px, ${height}px)`,
      },
    ],
    xAxisTicks: [],
    yAxis: [
      {
        transform: `translate(${yOffset}px, 0px)`,
      },
    ],
    yAxisTicks: [
      {
        transform: 'scaleX(-1)',
      },
    ],
    yAxisDomain: [
      {
        transform: 'scaleX(-1)',
      },
    ],
    bars: [
      {
        transform: `translate(${xOffset}px, 0px)`,
      },
    ],
    legendContainer: {
      marginTop: '8px',
      marginLeft: '35px',
    },
  };
};
