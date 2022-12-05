import { IMultiStackedBarChartStyleProps, IMultiStackedBarChartStyles } from './MultiStackedBarChart.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';

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
      height: barHeight ? barHeight : 12,
      display: 'block',
    },
    chartTitle: {
      ...theme.fonts.small,
      display: 'flex',
      justifyContent: 'space-between',
    },
    chartTitleLeft: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      display: 'block',
      color: '#171717',
      marginBottom: '5px',
    },
    singleChartRoot: {
      width: width ? width : '100%',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '10px',
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
    ratioNumerator: {
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semibold,
      color: theme.palette.neutralPrimary,
    },
    ratioDenominator: {
      fontSize: FontSizes.medium,
      color: theme.palette.neutralPrimary,
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
