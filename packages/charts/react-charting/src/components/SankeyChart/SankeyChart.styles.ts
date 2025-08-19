import { ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';
import { HighContrastSelector } from '@fluentui/react/lib/Styling';
import { getTooltipStyle } from '../../utilities/index';

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
    toolTip: getTooltipStyle(props.theme!),
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
    chart: {
      display: 'block',
    },
  };
};
