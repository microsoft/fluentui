import { IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';

export const getStyles = (props: IDonutChartStyleProps): IDonutChartStyles => {
  const { className, height, width } = props;

  return {
    root: [
      'ms-DonutChart',
      {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: width
      },
      className
    ],
    chart: {
      width: height,
      height: height,
      boxSizing: 'content-box',
      overflow: 'visible'
    },
    legend: [
      {
        display: 'flex',
        width: height,
        justifyContent: 'space-evenly'
      }
    ],
    legendItem: [
      {
        display: 'flex',
        alignItems: 'center'
      }
    ],
    legendBox: [
      {
        width: 10,
        height: 10,
        marginRight: 5
      }
    ]
  };
};
