import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
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
    barWrapper: {
      stroke: theme.palette.white,
      strokeWidth: 2
    },
    chartTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      fontSize: '12px'
    },
    chartDataText: {
      fontWeight: FontWeights.bold
    },
    chartDataTextDenominator: {
      fontWeight: FontWeights.semibold
    },
    hoverCardTextStyles: {
      ...theme.fonts.medium,
      lineHeight: '14px'
    },
    hoverCardDataStyles: {
      color: color !== '' ? `${color}` : palette.black,
      fontSize: '28px',
      fontFamily: 'Segoe UI',
      fontWeight: FontWeights.bold,
      lineHeight: '31px'
    },
    hoverCardRoot: {
      paddingLeft: '16px',
      paddingRight: '22px',
      paddingTop: '15px',
      paddingBottom: '8px'
    },
    triangle: {
      width: '0',
      height: '0',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: '8px solid',
      borderTopColor: palette.blue,
      marginBottom: '4px'
    }
  };
};
