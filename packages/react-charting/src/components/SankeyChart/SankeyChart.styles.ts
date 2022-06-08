import { ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';
import { FontSizes } from '@fluentui/react/lib/Styling';

export const getStyles = (props: ISankeyChartStyleProps): ISankeyChartStyles => {
  const { className, theme, pathColor, nodes } = props;
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
      fontWeight: nodes?.labelWeight ? nodes.labelWeight : 'normal',
      fontSize: nodes?.labelSize ? nodes.labelSize : FontSizes.medium,
    },
  };
};
