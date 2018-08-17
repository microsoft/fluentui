import { IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';

export const getStyles = (props: IStackedBarChartStyleProps): IStackedBarChartStyles => {
  const { className, width, barHeight } = props;

  const chartWidth = width;
  const chartHeight = barHeight;
  return {
    root: [
      'ms-StackedBarChart',
      {
        width: chartWidth
      },
      className
    ],
    chart: {
      width: chartWidth,
      height: chartHeight
    },
    chartTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      fontSize: '12px'
    },
    legendContainer: {
      paddingTop: '4px'
    }
  };
};
