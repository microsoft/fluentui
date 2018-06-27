import { IHorizontalBarChartStyleProps, IHorizontalBarChartStyles } from './HorizontalBarChart.types';

export const getStyles = (props: IHorizontalBarChartStyleProps): IHorizontalBarChartStyles => {
  const { className, theme, width, height } = props;

  const chartWidth = width + 30;
  const chartPadding = 20;
  const chartHeight = height + 10;
  const xOffset = 30;
  const yOffset = 30;

  return {
    root: [
      'ms-HorizontalBarChart',
      className,
      {
        width: chartWidth + 2 * chartPadding
      }
    ],
    chart: [
      {
        padding: chartPadding,
        width: chartWidth,
        height: chartHeight
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
        transform: `translate(${xOffset}px, -15px)`
      }
    ]
  };
};
