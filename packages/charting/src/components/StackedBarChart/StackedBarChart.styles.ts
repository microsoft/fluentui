import { IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';

export const getStyles = (props: IStackedBarChartStyleProps): IStackedBarChartStyles => {
  const { className, theme, width, height, barHeight } = props;

  const chartWidth = width + 30;
  const chartPadding = 30;
  const chartHeight = height;
  return {
    root: [
      'ms-StackedBarChart',
      {
        width: chartWidth + 2 * chartPadding
      },
      className
    ],
    chart: [
      {
        padding: chartPadding,
        width: chartWidth,
        height: chartHeight
      }
    ],
    chartTitle: [
      {
        textAlign: 'center',
        ...theme.fonts.mediumPlus
      }
    ],
    bars: [
      {
        transform: `translate(0px, 0px)`
      }
    ],
    legend: [
      {
        transform: `translate(20px, ${barHeight! + 30}px)`
      }
    ]
  };
};
