import { IProgressBarChartStyleProps, IProgressBarChartStyles } from './ProgressBarChart.types';

export const getStyles = (props: IProgressBarChartStyleProps): IProgressBarChartStyles => {
  const { className, width, barHeight, colors, persentage } = props;
  const chartWidth = width;
  const chartPadding = 20;
  return {
    root: [
      'ms-ProgressBarChart',
      {
        width: chartWidth,
        padding: chartPadding
      },
      className
    ],
    chart: [
      {
        width: chartWidth,
        height: barHeight,
        backgroundColor: colors!.backgroundColor,
        border: 'none',
        transform: `translate(0px, 20px)`
      }
    ],
    bar: [
      {
        width: `${persentage}%`,
        height: barHeight,
        backgroundColor: colors!.barColor
      }
    ],
    chartTitle: [
      {
        float: 'right'
      }
    ],
    value: [
      {
        float: 'left'
      }
    ]
  };
};
