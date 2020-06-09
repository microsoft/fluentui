import { IGroupedVerticalBarChartStyleProps, IGroupedVerticalBarChartStyles } from './GroupedVerticalBarChart.types';

export const getStyles = (props: IGroupedVerticalBarChartStyleProps): IGroupedVerticalBarChartStyles => {
  const { theme, className, showXAxisPath, showYAxisPath, href } = props;
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

    xAxis: {
      selectors: {
        text: {
          ...theme!.fonts.tiny,
        },
        line: {
          opacity: 0.2,
          width: '1px',
        },
        path: {
          display: showXAxisPath ? 'block' : 'none',
        },
      },
    },

    yAxis: {
      selectors: {
        text: {
          ...theme.fonts.medium,
        },
        line: {
          opacity: 0.2,
          width: '1px',
        },
        path: {
          display: showYAxisPath ? 'block' : 'none',
        },
      },
    },

    legendContainer: {
      marginTop: '8px',
      marginLeft: '35px',
    },
    opacityChangeOnHover: {
      cursor: href ? 'pointer' : 'default',
    },
  };
};
