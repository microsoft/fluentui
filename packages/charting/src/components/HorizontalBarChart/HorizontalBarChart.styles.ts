import { IHorizontalBarChartStyleProps, IHorizontalBarChartStyles } from './HorizontalBarChart.types';

export const getHorizontalBarChartStyles = (props: IHorizontalBarChartStyleProps): IHorizontalBarChartStyles => {
  const { className, theme, width, color } = props;
  const { palette } = theme!;

  return {
    root: [
      {
        display: 'flex',
        flexDirection: 'column',
        width: width ? width : '100%'
      },
      className
    ],
    items: {
      height: '32px',
      marginTop: '5px'
    },
    chart: {
      width: '100%',
      height: '8px',
      marginBottom: '11px'
    },
    chartTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      fontSize: '12px'
    },
    hoverCardTextStyles: {
      ...theme.fonts.medium,
      lineHeight: '14px'
    },
    hoverCardDataStyles: {
      color: color !== '' ? `${color}` : palette.black,
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
