import { IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';

export const getStyles = (props: IDonutChartStyleProps): IDonutChartStyles => {
  const { className, width, height } = props;

  return {
    root: [
      'ms-DonutChart',
      {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
      },
      className
    ],
    chart: {
      width: width,
      height: height,
      boxSizing: 'content-box',
      overflow: 'visible',
      alignmentAdjust: 'center'
    },
    legendContainer: {
      paddingTop: '16px'
    },
    callOut: {
      padding: '10px 16px 10px 16px',
      fontSize: '12px',
      color: '#0078D7',
      fontFamily: 'Segoe UI',
      fontWeight: 'bold',
      backgroundColor: 'white'
    }
  };
};
