import { IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';
import { getAxisTitleStyle } from '../../utilities/index';

export const getStyles = (props: IDonutChartStyleProps): IDonutChartStyles => {
  const { className, theme } = props;
  return {
    root: [
      theme.fonts.medium,
      'ms-DonutChart',
      {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      },
      className,
    ],
    chart: {
      boxSizing: 'content-box',
      overflow: 'visible',
      alignmentAdjust: 'center',
      display: 'block',
    },
    legendContainer: {
      paddingTop: '16px',
      width: '100%',
    },
    axisAnnotation: getAxisTitleStyle(theme, theme.fonts.small),
  };
};
