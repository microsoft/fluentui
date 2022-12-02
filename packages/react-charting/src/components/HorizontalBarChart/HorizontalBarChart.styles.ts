import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { IHorizontalBarChartStyleProps, IHorizontalBarChartStyles } from './HorizontalBarChart.types';

export const getHorizontalBarChartStyles = (props: IHorizontalBarChartStyleProps): IHorizontalBarChartStyles => {
  const { className, theme, width, barHeight, showTriangle } = props;
  const { palette } = theme!;

  return {
    root: [
      {
        display: 'flex',
        flexDirection: 'column',
        width: width ? width : '100%',
      },
      className,
    ],
    items: {
      marginBottom: showTriangle ? '16px' : '10px',
    },
    chart: {
      width: '100%',
      height: barHeight ? barHeight : 12,
      display: 'block',
    },
    barWrapper: {
      stroke: theme.palette.white,
      strokeWidth: 2,
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
    chartTitleRight: {
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semibold,
      color: theme.palette.neutralPrimary,
    },
    chartDataTextDenominator: {
      fontSize: FontSizes.medium,
      color: theme.palette.neutralPrimary,
    },
    benchmarkContainer: {
      position: 'relative',
      height: '7px',
      marginTop: '-3px',
      marginBottom: '-1px',
    },
    triangle: {
      width: '0',
      height: '0',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: '7px solid',
      borderTopColor: palette.blue,
      marginBottom: '4px',
      position: 'absolute',
    },
  };
};
