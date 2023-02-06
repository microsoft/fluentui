import { IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';

export const getStyles = (props: IDonutChartStyleProps): IDonutChartStyles => {
  const { className, width, height, theme } = props;
  return {
    root: [
      theme.fonts.medium,
      'ms-DonutChart',
      {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      },
      className,
    ],
    chart: {
      width: width,
      height: height,
      boxSizing: 'content-box',
      overflow: 'visible',
      alignmentAdjust: 'center',
    },
    legendContainer: {
      paddingTop: '16px',
      width: `${width}px`,
    },
    tooltipContainer: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      fill: 'transparent',
      display: 'flex',
      flexDirection: 'column',
    },
    tooltip: {
      ...theme.fonts.medium,
      display: 'flex',
      flexDirection: 'column',
      padding: '8px',
      position: 'absolute',
      textAlign: 'center',
      top: '0px',
      background: theme.semanticColors.bodyBackground,
      borderRadius: '2px',
      pointerEvents: 'none',
    },
  };
};
