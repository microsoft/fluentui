import { IVerticalBarChartStyleProps, IVerticalBarChartStyles } from './VerticalBarChart.types';
import { HighContrastSelectorBlack } from 'office-ui-fabric-react/lib/Styling';

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
        text: [
          theme.fonts.tiny,
          {
            fill: theme.semanticColors.bodyText,
            selectors: {
              [HighContrastSelectorBlack]: {
                fill: 'rgb(179, 179, 179)',
              },
            },
          },
        ],
        line: {
          opacity: 0.1,
          width: '1px',
          selectors: {
            [HighContrastSelectorBlack]: {
              opacity: 0.1,
              stroke: 'rgb(179, 179, 179)',
            },
          },
        },
        path: {
          display: 'none',
        },
      },
    },

    yAxis: {
      selectors: {
        text: [
          theme.fonts.tiny,
          {
            fill: theme.semanticColors.bodyText,
            selectors: {
              [HighContrastSelectorBlack]: {
                fill: 'rgb(179, 179, 179)',
              },
            },
          },
        ],
        line: {
          opacity: 0.2,
          width: '1px',
          stroke: theme.semanticColors.bodyText,
          selectors: {
            [HighContrastSelectorBlack]: {
              stroke: 'rgb(179, 179, 179)',
            },
          },
        },
        path: {
          display: 'none',
        },
      },
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
