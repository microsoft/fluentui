import { IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';

export const getStyles = (props: IStackedBarChartStyleProps): IStackedBarChartStyles => {
  const { className, width, height } = props;

  const chartWidth = width;
  const chartHeight = height;
  return {
    root: [
      'ms-StackedBarChart',
      {
        width: chartWidth
      },
      {
        display: 'flex',
        flexDirection: 'column'
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
