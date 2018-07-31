import { IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';

export const getStyles = (props: IStackedBarChartStyleProps): IStackedBarChartStyles => {
  const { className, width, height } = props;

  const chartWidth = width;
  const chartPadding = 10;
  const chartHeight = height;
  return {
    root: [
      'ms-StackedBarChart',
      {
        width: chartWidth + 2 * chartPadding
      },
      className
    ],
    chart: [
      {
        padding: chartPadding,
        width: chartWidth,
        height: chartHeight
      }
    ],
    chartTitle: [
      {
        padding: chartPadding,
        display: 'flex'
      }
    ],
    bars: [],
    legend: [
      {
        listStyle: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: '30px',
        paddingRight: '30px'
      }
    ],
    subTitle: [{ width: '100%' }],
    value: [
      {
        width: '100%',
        textAlign: 'right'
      }
    ],
    legendBar: [{ display: 'flex', padding: '10px 10px 0px 0px' }],
    legendText: [{ marginTop: '-5px', paddingLeft: '5px' }]
  };
};
