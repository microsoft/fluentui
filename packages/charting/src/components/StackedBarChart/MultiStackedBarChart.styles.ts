import { IMultiStackedBarChartStyles } from '@uifabric/charting/lib/StackedBarChart';
import { IMultiStackedBarChartStyleProps } from './MultiStackedBarChart.types';

export const getMultiStackedBarChartStyles = (props: IMultiStackedBarChartStyleProps): IMultiStackedBarChartStyles => {
  const { className, width, barHeight, legendColor, shouldHighlight, theme, href } = props;
  return {
    root: [
      theme.fonts.medium,
      'ms-StackedBarChart',
      {
        display: 'flex',
        flexDirection: 'column',
        width: width ? width : '100%'
      },
      className
    ],
    items: {
      marginBottom: '11px'
    },
    chart: {
      width: '100%',
      height: barHeight ? barHeight : 16
    },
    chartTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      fontSize: '12px',
      fontFamily: 'Segoe UI'
    },
    singleChartRoot: {
      width: width ? width : '100%',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '16px'
    },
    hoverCardTextStyles: {
      fontFamily: 'Segoe UI',
      fontSize: '12px',
      lineHeight: '14px'
    },
    hoverCardDataStyles: {
      color: legendColor === '' ? theme.palette.black : legendColor,
      fontSize: '28px',
      fontFamily: 'Segoe UI',
      fontWeight: 'bold',
      lineHeight: '31px'
    },
    hoverCardRoot: {
      paddingLeft: '16px',
      paddingRight: '22px',
      paddingTop: '15px',
      paddingBottom: '8px'
    },
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
      stroke: theme.palette.white,
      strokeWidth: 2
    },
    placeHolderOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: 'default',
      stroke: theme.palette.white,
      strokeWidth: '2'
    },
    legendContainer: {
      marginTop: '5px'
    },
    noData: {
      cursor: href ? 'pointer' : 'default'
    }
  };
};
