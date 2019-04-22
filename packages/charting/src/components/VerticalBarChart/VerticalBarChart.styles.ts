import { IVerticalBarChartStyleProps, IVerticalBarChartStyles } from './VerticalBarChart.types';

export const getStyles = (props: IVerticalBarChartStyleProps): IVerticalBarChartStyles => {
  const { className, theme, width, height } = props;

  const chartWidth = width + 30;
  const chartPadding = 20;
  const chartHeight = height + 10;
  const xOffset = 30;
  const yOffset = 20;

  return {
    root: [
      theme.fonts.small,
      'ms-VerticalBarChart',
      className,
      {
        width: chartWidth + 2 * chartPadding
      }
    ],
    chart: [
      {
        padding: chartPadding,
        width: chartWidth,
        height: chartHeight,
        boxSizing: 'content-box'
      }
    ],
    chartLabel: [
      {
        textAlign: 'center',
        ...theme.fonts.smallPlus
      }
    ],
    xAxis: [
      {
        transform: `translate(${xOffset}px, ${height}px)`
      }
    ],
    xAxisTicks: [],
    yAxis: [
      {
        transform: `translate(${yOffset}px, 0px)`
      }
    ],
    yAxisTicks: [
      {
        transform: 'scaleX(-1)'
      }
    ],
    yAxisDomain: [
      {
        transform: 'scaleX(-1)'
      }
    ],
    bars: [
      {
        transform: `translate(${xOffset}px, 0px)`
      }
    ]
  };
};
