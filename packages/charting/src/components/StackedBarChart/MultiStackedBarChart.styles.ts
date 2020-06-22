import { IMultiStackedBarChartStyleProps, IMultiStackedBarChartStyles } from './MultiStackedBarChart.types';

export const getMultiStackedBarChartStyles = (props: IMultiStackedBarChartStyleProps): IMultiStackedBarChartStyles => {
  const { className, width, barHeight, shouldHighlight, theme, href } = props;
  return {
    root: [
      theme.fonts.medium,
      'ms-StackedBarChart',
      {
        display: 'flex',
        flexDirection: 'column',
        width: width ? width : '100%',
      },
      className,
    ],
    items: {
      marginBottom: '11px',
    },
    chart: {
      width: '100%',
      height: barHeight ? barHeight : 16,
    },
    chartTitle: {
      ...theme.fonts.small,
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
    },
    singleChartRoot: {
      width: width ? width : '100%',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '16px',
    },
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
      stroke: theme.palette.white,
      strokeWidth: 2,
    },
    placeHolderOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: 'default',
      stroke: theme.palette.white,
      strokeWidth: '2',
    },
    legendContainer: {
      marginTop: '5px',
    },
    noData: {
      cursor: href ? 'pointer' : 'default',
    },
  };
};
