import { IVerticalBarChartStyleProps, IVerticalBarChartStyles } from './VerticalBarChart.types';

export const getStyles = (props: IVerticalBarChartStyleProps): IVerticalBarChartStyles => {
  const { className, theme, shouldHighlight } = props;

  return {
    root: [
      theme.fonts.medium,
      {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      },
      className,
    ],

    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
    },

    chartLabel: [
      {
        textAlign: 'center',
        ...theme.fonts.mediumPlus,
      },
    ],

    xAxis: {
      selectors: {
        text: {
          ...theme!.fonts.tiny,
        },
        line: {
          opacity: 0.4,
          width: '2px',
        },
        path: {
          display: 'none',
        },
      },
    },

    yAxis: {
      selectors: {
        text: {
          ...theme.fonts.medium,
        },
        line: {
          opacity: 0.4,
          width: '3px',
        },
        path: {
          display: 'none',
        },
      },
    },

    xAxisTicks: [],

    yAxisTicks: [
      {
        transform: 'scaleX(-1)',
      },
    ],
    yAxisDomain: [
      {
        transform: 'scaleX(-1)',
      },
    ],
    legendContainer: {
      marginTop: '8px',
      marginLeft: '35px',
    },
  };
};
