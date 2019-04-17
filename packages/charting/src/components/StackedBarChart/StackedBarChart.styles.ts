import { IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';
import { FontSizes, FontWeights } from 'office-ui-fabric-react/lib/Styling';

export const getStyles = (props: IStackedBarChartStyleProps): IStackedBarChartStyles => {
  const { className, width, barHeight, legendColor, shouldHighlight, theme, href } = props;
  return {
    root: [
      theme.fonts.medium,
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
      marginBottom: '12px'
    },
    chartTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      fontSize: FontSizes.small
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
      fontSize: FontSizes.xxLarge,
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
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
      stroke: theme.palette.white,
      strokeWidth: 2
    },
    ratioNumerator: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.semibold,
      color: theme.palette.black
    },
    ratioDenominator: {
      fontSize: FontSizes.small,
      color: theme.palette.black,
      opacity: '0.6'
    }
  };
};
