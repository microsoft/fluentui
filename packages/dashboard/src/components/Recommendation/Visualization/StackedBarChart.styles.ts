import { IStackedBarChartVisualizationStyles } from './StackedBarChart.types';

export const getStackedBarChartVisualizationStyles = (): IStackedBarChartVisualizationStyles => {
  return {
    chartVisualizationContainerStyle: {
      flex: 1,
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center'
    },
    chartVisualizationStyle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }
  };
};
