import { ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';

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
      stroke: pathColor ? pathColor : theme.palette.blue,
      fill: 'none',
    },
    nodes: {
      selectors: {
        text: [
          theme.fonts.small,
          {
            fill: theme.semanticColors.bodyText,
          },
        ],
      },
    },
  };
};
