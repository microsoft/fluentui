import { IProgressBarChartStyleProps, IProgressBarChartStyles } from './ProgressBarChart.types';

export const getStyles = (props: IProgressBarChartStyleProps): IProgressBarChartStyles => {
  const { className, theme, width, barHeight, colors } = props;
  const chartWidth = width;
  const chartPadding = 20;
  return {
    root: [
      'ms-ProgressBarChart',
      {
        width: chartWidth,
        padding: chartPadding
      },
      className
    ],
    chart: [
      {
        width: chartWidth,
        height: barHeight,
        color: colors![0],
        // color:   '#0063a6',
        background: colors![1],
        border: 'none'
        // selectors: {
        //   'progress::-webkit-progress-bar': {
        //     background: 'red'
        //   }
        // }
      }
    ],
    chartTitle: [
      {
        textAlign: 'center',
        ...theme.fonts.mediumPlus
      }
    ],
    bars: [
      {
        transform: `translate( 0px,0px)`
      }
    ],
    subHeading: [
      {
        float: 'right'
      }
    ],
    value: [
      {
        float: 'left'
      }
    ]
  };
};
