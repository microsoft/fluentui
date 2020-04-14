import { IGroupedVerticalBarChartProps, IGroupedVerticalBarChartStyles } from './GroupedVerticalBarChart.types';

export const getStyles = (props: IGroupedVerticalBarChartProps): IGroupedVerticalBarChartStyles => {
  const { theme, className, showXAxisPath, showYAxisPath, legendColor, href } = props;
  return {
    root: [
      theme!.fonts.medium,
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
          ...theme!.fonts.medium,
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

    hoverCardRoot: {
      paddingLeft: '16px',
      paddingRight: '22px',
      paddingTop: '15px',
      paddingBottom: '8px',
    },

    hoverCardTextStyles: [
      theme!.fonts.small,
      {
        lineHeight: '14px',
      },
    ],

    hoverCardDataStyles: [
      theme!.fonts.xxLarge,
      {
        lineHeight: '31px',
        color: legendColor === '' ? theme!.palette.black : legendColor,
      },
    ],

    opacityChangeOnHover: {
      cursor: href ? 'pointer' : 'default',
    },
  };
};
