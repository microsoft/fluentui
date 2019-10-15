import { IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';

export const getStyles = (props: IDonutChartStyleProps): IDonutChartStyles => {
  const { className, width, height, theme, color } = props;
  return {
    root: [
      theme.fonts.medium,
      'ms-DonutChart',
      {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
      },
      className
    ],
    chart: {
      width: width,
      height: height,
      boxSizing: 'content-box',
      overflow: 'visible',
      alignmentAdjust: 'center'
    },
    legendContainer: {
      paddingTop: '16px',
      width: `${width}px`
    },
    hoverCardTextStyles: {
      ...theme.fonts.medium,
      lineHeight: '14px'
    },
    hoverCardDataStyles: {
      color: color === '' ? theme.palette.black : color,
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
