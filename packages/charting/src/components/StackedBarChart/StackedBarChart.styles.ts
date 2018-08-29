import { IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';

export const getStyles = (props: IStackedBarChartStyleProps): IStackedBarChartStyles => {
  const { className, width, barHeight, isMultiStackedBarChart, legendColor } = props;
  return {
    root: [
      'ms-StackedBarChart',
      {
        width: width ? width : '100%',
        display: 'flex',
        flexDirection: 'column'
      },
      className
    ],
    chart: {
      width: '100%',
      height: barHeight,
      marginBottom: isMultiStackedBarChart ? '' : '13px'
    },
    chartTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      fontSize: '12px'
    },
    legendContainer: {
      paddingTop: '4px'
    },
    hoverCardTextStyles: {
      fontFamily: 'Segoe UI',
      fontSize: '12px',
      lineHeight: '14px'
    },
    hoverCardDataStyles: {
      color: legendColor === '' ? '#000000' : legendColor,
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
    }
  };
};
