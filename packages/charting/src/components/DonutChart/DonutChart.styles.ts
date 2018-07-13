import { IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';

export const getStyles = (props: IDonutChartStyleProps): IDonutChartStyles => {
  const { className, theme, width, height, LegendX, LegendY } = props;
  console.log(LegendX, LegendY);

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

    chartTitle: [
      {
        textAlign: 'center',
        ...theme.fonts.mediumPlus
      }
    ],
    Legend: [
      // {`translate(${xOffset}px, ${height}px)`
      {
        transform: `translate( ${LegendX}px,
          ${LegendY}px)`
      }
    ]
  };
};
