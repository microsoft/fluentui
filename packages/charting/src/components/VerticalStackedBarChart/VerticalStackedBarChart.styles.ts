import { IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles } from './VerticalStackedBarChart.types';
import { HighContrastSelectorBlack, FontWeights } from 'office-ui-fabric-react/lib/Styling';

export const getStyles = (props: IVerticalStackedBarChartStyleProps): IVerticalStackedBarChartStyles => {
  const { className, theme, shouldHighlight, href } = props;

  return {
    root: [
      theme.fonts.medium,
      {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      className,
    ],

    chartLabel: [
      {
        textAlign: 'center',
        ...theme.fonts.mediumPlus,
      },
    ],

    xAxis: [
      {
        selectors: {
          line: {
            opacity: 0.3,
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
    ],

    yAxis: [
      {
        selectors: {
          text: [
            theme.fonts.tiny,
            {
              fontWeight: FontWeights.semibold,
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
    ],

    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
    },

    legendContainer: [
      {
        marginTop: '8px',
        marginLeft: '20px',
      },
    ],

    xAxisText: [
      theme.fonts.tiny,
      {
        fontWeight: FontWeights.semibold,
        fill: theme.semanticColors.bodyText,
        selectors: {
          [HighContrastSelectorBlack]: {
            fill: 'rgb(179, 179, 179)',
          },
        },
      },
    ],
  };
};
