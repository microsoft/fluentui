import { IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';

export const getStyles = (props: IDonutChartStyleProps): IDonutChartStyles => {
  const { className, width, height, legendX, legendY } = props;

  const chartWidth = width;
  const chartHeight = height;

  return {
    root: [
      'ms-DonutChart',
      {
        width: chartWidth,
        height: chartHeight,
        textAlign: 'center'
      },
      className
    ],
    chart: {
      width: chartHeight,
      height: chartHeight
    },
    legend: [
      {
        transform: `translate( ${legendX}px,
          ${legendY}px)`
      }
    ]
  };
};
