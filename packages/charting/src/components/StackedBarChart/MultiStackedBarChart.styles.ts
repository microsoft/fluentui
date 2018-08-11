import { IMultiStackedBarChartStyles } from '@uifabric/charting/lib/StackedBarChart';
import { IMultiStackedBarChartStyleProps } from './MultiStackedBarChart.types';

export const getMultiStackedBarChartStyles = (props: IMultiStackedBarChartStyleProps): IMultiStackedBarChartStyles => {
  const { className, width } = props;

  return {
    root: [
      {
        display: 'flex',
        flexDirection: 'column',
        width: width
      },
      className
    ],
    items: {
      marginBottom: '11px'
    }
  };
};
