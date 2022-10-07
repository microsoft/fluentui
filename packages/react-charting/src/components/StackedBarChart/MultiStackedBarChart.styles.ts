import { IMultiStackedBarChartStyleProps, IMultiStackedBarChartStyles } from './MultiStackedBarChart.types';
import { FontWeights } from '@fluentui/react/lib/Styling';

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
      marginBottom: '3px',
    },
    chartTitleLeft: {
      fontWeight: FontWeights.bold,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      display: 'block',
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
      selectors: {
        '&:focus': {
          stroke: theme.palette.black,
          strokeWidth: '2px',
        },
      },
    },
    placeHolderOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: 'default',
      stroke: theme.palette.white,
      strokeWidth: '2',
      selectors: {
        '&:focus': {
          stroke: theme.palette.black,
          strokeWidth: '2px',
        },
      },
    },
    legendContainer: {
      margin: '5px 0px 0px 4px',
    },
    noData: {
      cursor: href ? 'pointer' : 'default',
    },
  };
};
