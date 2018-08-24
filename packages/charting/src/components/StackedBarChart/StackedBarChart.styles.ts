import { IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';

export const getStyles = (props: IStackedBarChartStyleProps): IStackedBarChartStyles => {
  const { className, width, barHeight, isMultiStackedBarChart } = props;
  return {
    root: [
      'ms-StackedBarChart',
      {
        width: width ? width : '100%',
        display: 'flex',
        flexDirection: 'column'
      },
      className
    ],
    chart: {
      width: '100%',
      height: barHeight,
      marginBottom: isMultiStackedBarChart ? '' : '13px'
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
