import { IBenchmarkBarChartStyleProps, IBenchmarkBarChartStyle } from './BenchmarkBarChart.types';

export const getBenchmarkBarChartStyles = (props: IBenchmarkBarChartStyleProps): IBenchmarkBarChartStyle => {
  const { width, benchmarkColor } = props;

  return {
    root: {
      width: width || 300,
      fontFamily: 'Segoe UI',
      fontSize: '13px'
    },
    chartHeader: {
      margin: '5px 0'
    },
    chartTitle: {
      float: 'left'
    },
    percentage: {
      float: 'right'
    },
    chartBody: {
      clear: 'both',
      paddingTop: '3px'
    },
    triangle: {
      width: '0',
      height: '0',
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderTop: '8px solid',
      borderTopColor: benchmarkColor || '#00A5B0'
    },
    barChart: {
      width: '100%'
    }
  };
};
