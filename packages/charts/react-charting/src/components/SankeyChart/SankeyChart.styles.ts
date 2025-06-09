import { ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';
import { HighContrastSelector } from '@fluentui/react/lib/Styling';

export const getStyles = (props: ISankeyChartStyleProps): ISankeyChartStyles => {
  const { className, theme, pathColor, enableReflow } = props;
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
        [HighContrastSelector]: {
          fill: 'Canvas',
        },
      },
    },
    nodes: {
      fill: '#F5F5F5',
      selectors: {
        [HighContrastSelector]: {
          fill: 'Canvas',
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
            [HighContrastSelector]: {
              fill: 'CanvasText',
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
      ...(enableReflow ? { overflow: 'auto' } : {}),
    },
  };
};
