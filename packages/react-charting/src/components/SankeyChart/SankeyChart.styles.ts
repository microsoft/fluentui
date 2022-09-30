import { ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';
import { HighContrastSelector, HighContrastSelectorBlack } from '@fluentui/react/lib/Styling';

export const getStyles = (props: ISankeyChartStyleProps): ISankeyChartStyles => {
  const { className, theme, pathColor } = props;
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
      fill: 'none',
      //border: 'solid red',
      strokeWidth: 3,
      selectors: {
        [HighContrastSelector]: {
          forcedColorAdjust: 'none',
        },
      },
    },
    nodes: {
      fill: 'rgb(255,255,255)',
      selectors: {
        [HighContrastSelectorBlack]: {
          fill: 'rgb(0, 0, 0)',
        },
      },
      text: {
        fill: 'rgb(0, 0, 0)',
        selectors: {
          [HighContrastSelectorBlack]: {
            fill: 'rgb(255, 255, 255)',
          },
        },
      },
    },
  };
};
