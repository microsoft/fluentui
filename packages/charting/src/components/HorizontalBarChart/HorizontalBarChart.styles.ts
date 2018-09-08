import { IHorizontalBarChartStyleProps, IHorizontalBarChartStyles } from './HorizontalBarChart.types';

export const getHorizontalBarChartStyles = (props: IHorizontalBarChartStyleProps): IHorizontalBarChartStyles => {
  const { className, width } = props;

  return {
    root: [
      {
        display: 'flex',
        flexDirection: 'column',
        width: width ? width : '100%'
      },
      className
    ],
    items: {
      height: '32px',
      marginBottom: ''
    },
    chart: {
      width: '100%',
      height: '8px',
      marginBottom: '10px'
    },
    chartTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      fontSize: '12px'
    }
  };
};
