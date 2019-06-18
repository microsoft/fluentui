import { IVerticalBarChartStyleProps, IVerticalBarChartStyles } from './VerticalBarChart.types';

export const getStyles = (props: IVerticalBarChartStyleProps): IVerticalBarChartStyles => {
  const { className, theme, width, height } = props;

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
        ...theme.fonts.mediumPlus
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
