import { IChartStyles } from './Chart.types';

export const getStyles = (): IChartStyles => {
  return {
    chartWrapper: {
      width: '100%',
      height: '100%'
    },
    donutWrapper: {
      display: 'flex',
      justifyContent: 'center'
    }
  };
};
