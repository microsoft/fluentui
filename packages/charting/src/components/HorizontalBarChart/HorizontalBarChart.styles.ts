import { IHorizontalBarChartStyleProps, IHorizontalBarChartStyles } from './HorizontalBarChart.types';

export const getHorizontalBarChartStyles = (props: IHorizontalBarChartStyleProps): IHorizontalBarChartStyles => {
  const { className, theme, width, color } = props;
  const { palette, fonts } = theme!;

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
      marginBottom: ''
    },
    chart: {
      width: '100%',
      height: '8px',
      marginBottom: '10px'
    },
    chartTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      fontSize: '12px'
    },
    calloutPadding: [
      {
        padding: '10px 16px 10px 16px',
        backgroundColor: palette.white,
        fontSize: fonts.xxLarge.fontSize,
        color: color !== '' ? `${color}` : palette.black,
        fontFamily: fonts.xxLarge.fontFamily,
        fontWeight: 'bold',
        border: color !== '' ? `1px solid ${color}` : `unset`
      }
    ]
  };
};
