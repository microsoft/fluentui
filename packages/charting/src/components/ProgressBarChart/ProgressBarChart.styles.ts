import { IProgressBarChartStyleProps, IProgressBarChartStyles } from './ProgressBarChart.types';

export const getStyles = (props: IProgressBarChartStyleProps): IProgressBarChartStyles => {
  const { className, theme, width, barHeight } = props;
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
      'progress',
      {
        width: chartWidth,
        height: barHeight,
        backgroundColor: '#FFFFFF',
        color: 'blue'
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
        transform: `translate( 0px,0px)`
      }
    ],
    legend: [
      {
        transform: `translate( 20px,${barHeight! + 30}px)`
      }
    ],
    subHeading: [
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
