import { IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';

export const getStyles = (props: IStackedBarChartStyleProps): IStackedBarChartStyles => {
  const { className, width, barHeight, legendColor, shouldHighlight, theme } = props;
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
      height: barHeight ? barHeight : 16,
      marginBottom: '13px'
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
      ...theme.fonts.medium,
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
      opacity: shouldHighlight ? '' : '0.1'
    }
  };
};
