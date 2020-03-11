import { IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles } from './VerticalStackedBarChart.types';

export const getStyles = (props: IVerticalStackedBarChartStyleProps): IVerticalStackedBarChartStyles => {
  const { className, theme, width, height, legendColor, shouldHighlight, href } = props;

  const chartWidth = width! + 50;
  const chartPadding = 20;
  const chartHeight = height! + 50;
  const chartMargin = { left: 35, right: 0, top: 35, bottom: 0 };

  return {
    root: [
      theme.fonts.medium,
      'ms-VerticalStackedBarChart',
      className,
      {
        width: chartWidth + 2 * chartPadding
      }
    ],

    chartLabel: [
      {
        textAlign: 'center',
        ...theme.fonts.mediumPlus
      }
    ],

    chart: [
      {
        width: chartWidth,
        height: chartHeight,
        padding: chartPadding,
        boxSizing: 'content-box',
        marginLeft: chartMargin.left,
        marginRight: chartMargin.right,
        marginBottom: chartMargin.bottom,
        marginTop: chartMargin.top
      }
    ],

    xAxis: [
      {
        transform: `translate(${chartMargin.left}px, ${height - chartMargin.bottom}px)`
      },
      {
        selectors: {
          text: {
            ...theme.fonts.tiny
            // opacity: 1
          },
          line: {
            opacity: 0.6, // need to change later
            width: '3px'
          },
          path: {
            display: 'none'
          }
        }
      }
    ],

    yAxis: [
      {
        transform: `translate(${chartMargin.left}px, 0px)`
      },
      {
        selectors: {
          text: {
            ...theme.fonts.medium,
            opacity: 1
          },
          line: {
            opacity: 0.4,
            width: '2px'
          },
          path: {
            display: 'none'
          }
        }
      }
    ],

    bars: [
      {
        transform: `translate(${chartMargin.left}px, 0px)`
      }
    ],

    yAxisTicks: [
      {
        transform: 'scaleX(1)'
      }
    ],

    hoverCardRoot: {
      paddingLeft: '16px',
      paddingRight: '22px',
      paddingTop: '15px',
      paddingBottom: '8px'
    },

    hoverCardTextStyles: {
      fontFamily: 'Segoe UI',
      fontSize: '12px',
      lineHeight: '14px'
    },
    hoverCardDataStyles: {
      color: legendColor === '' ? theme.palette.black : legendColor,
      fontSize: '28px',
      fontFamily: 'Segoe UI',
      fontWeight: 'bold',
      lineHeight: '31px'
    },

    placeHolderOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: 'default'
      // stroke: theme.palette.white
      // strokeWidth: '2'
    },

    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default'
      // stroke: theme.palette.white
      // strokeWidth: 2
    },

    legendContainer: {
      marginTop: '5px'
    }

    // yAxisDomain: [
    //   {
    //     transform: 'scaleX(-1)'
    //   }
    // ]
  };
};
