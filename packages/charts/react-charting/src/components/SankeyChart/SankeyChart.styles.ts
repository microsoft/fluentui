import { ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';
import { HighContrastSelectorBlack } from '@fluentui/react/lib/Styling';

export const getStyles = (props: ISankeyChartStyleProps): ISankeyChartStyles => {
  const { className, theme, pathColor } = props;
  const { effects } = theme;
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
    links: {
      stroke: pathColor ? pathColor : theme.palette.black,
      fill: theme ? theme.semanticColors.bodyBackground : '#F5F5F5',
      strokeWidth: 3,
      selectors: {
        [HighContrastSelectorBlack]: {
          fill: '#000000',
        },
      },
    },
    nodes: {
      fill: '#F5F5F5',
      selectors: {
        [HighContrastSelectorBlack]: {
          fill: '#000000',
        },
      },
    },
    toolTip: {
      ...props.theme!.fonts.medium,
      display: 'flex',
      flexDirection: 'column',
      padding: '8px',
      position: 'absolute',
      textAlign: 'center',
      top: '0px',
      background: props.theme!.semanticColors.bodyBackground,
      borderRadius: '2px',
      pointerEvents: 'none',
    },
    nodeTextContainer: {
      selectors: {
        text: {
          selectors: {
            [HighContrastSelectorBlack]: {
              fill: 'rgb(179, 179, 179)',
            },
          },
        },
      },

      marginTop: '4px',
      marginLeft: '8px',
      marginBottom: '4px',
      marginRight: '8px',
    },
    calloutContentRoot: {
      boxShadow: effects.elevation4,
    },
    chartWrapper: {
      overflow: 'auto',
    },
  };
};
