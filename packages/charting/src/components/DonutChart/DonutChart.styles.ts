import { IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';

export const getStyles = (props: IDonutChartStyleProps): IDonutChartStyles => {
  const { className, width, height, LegendX, LegendY } = props;

  const chartWidth = width;
  const chartHeight = height;

  return {
    root: [
      'ms-DonutChart',
      className,
      {
        width: chartWidth,
        height: chartHeight,
        textAlign: 'center'
      }
    ],
    chart: {
      width: chartHeight,
      height: chartHeight
    },
    Legend: [
      {
        transform: `translate( ${LegendX}px,
          ${LegendY}px)`
      }
    ]
  };
};
