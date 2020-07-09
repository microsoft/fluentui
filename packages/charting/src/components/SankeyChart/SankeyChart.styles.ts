import { ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';

export const getStyles = (props: ISankeyChartStyleProps): ISankeyChartStyles => {
  const { className, theme } = props;
  return {
    root: [
      theme.fonts.medium,
      {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      className,
    ],
  };
};
