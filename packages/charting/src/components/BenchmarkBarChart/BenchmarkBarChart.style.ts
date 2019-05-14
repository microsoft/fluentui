import { IBenchmarkBarChartStyleProps, IBenchmarkBarChartStyle } from './BenchmarkBarChart.types';

export const getBenchmarkBarChartStyles = (props: IBenchmarkBarChartStyleProps): IBenchmarkBarChartStyle => {
  const { theme, width, benchmarkColor } = props;
  const { palette } = theme!;

  return {
    root: {
      width: width || 300,
      fontFamily: `'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif`,
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
      borderTopColor: benchmarkColor || palette.blue
    },
    barChart: {
      width: '100%'
    }
  };
};
