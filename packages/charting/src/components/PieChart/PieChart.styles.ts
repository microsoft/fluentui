import { IPieChartStyleProps, IPieChartStyles } from './PieChart.types';

export const getStyles = (props: IPieChartStyleProps): IPieChartStyles => {
  const { className, theme, width, height } = props;

  const chartWidth = width + 30;
  const chartPadding = 20;
  const chartHeight = height + 10;

  return {
    root: [
      'ms-PieChart',
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
    chartTitle: [
      {
        textAlign: 'center',
        ...theme.fonts.mediumPlus
      }
    ]
  };
};
