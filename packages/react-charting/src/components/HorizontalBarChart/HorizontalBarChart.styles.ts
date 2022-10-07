import { FontWeights } from '@fluentui/react/lib/Styling';
import { IHorizontalBarChartStyleProps, IHorizontalBarChartStyles } from './HorizontalBarChart.types';

export const getHorizontalBarChartStyles = (props: IHorizontalBarChartStyleProps): IHorizontalBarChartStyles => {
  const { className, theme, width } = props;
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
      height: '32px',
      marginTop: '5px',
      position: 'relative',
    },
    chart: {
      width: '100%',
      height: '8px',
      marginBottom: '11px',
    },
    barWrapper: {
      stroke: theme.palette.white,
      strokeWidth: 2,
    },
    chartTitle: {
      ...theme.fonts.small,
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '3px',
    },
    chartTitleLeft: {
      fontWeight: FontWeights.bold,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      display: 'block',
    },
    chartTitleRight: {
      fontWeight: FontWeights.bold,
    },
    chartDataTextDenominator: {
      fontWeight: FontWeights.semibold,
    },
    triangle: {
      width: '0',
      height: '0',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: '8px solid',
      borderTopColor: palette.blue,
      marginBottom: '4px',
      position: 'absolute',
      top: '12px',
    },
  };
};
